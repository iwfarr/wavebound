import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  decodeCell, encodeCell, extractCandidates, generateInventory, mergeCandidates,
  parseInventory, renderInventory,
} from './claim-inventory.mjs';

const source = 'src/data/graphData.ts';
const candidate = (wording = 'Users must be accredited.', line = 1) => ({
  source, wording, line, match: 'requirement or control claim',
});
const initialRows = () => mergeCandidates([candidate()], []);
const reviewedRows = () => initialRows().map((row) => ({
  ...row, classification: 'formally approved', authority: '[D-004](decision-register.md#d-004)',
  reviewer: 'Policy owner', reviewDate: '2026-10-26', disposition: 'Selected for scope review.',
}));

test('extracts narrative, graph, JSX, policy examples and sandbox predicates, not plain UI text', () => {
  assert.equal(extractCandidates('public/assets/aistudio/playbook', 'Overview\nUsers must be accredited.\n')[0].line, 2);
  const text = [
    "const nodes = [{description: 'Research requires approval.', sourceFile: 'ontology/proposed.ttl'}];",
    'const snippet = `allow {',
    '  input.count >= 10',
    '}`;',
    'const admissionAllowed = accredited && trained;',
    'const view = <p>Outputs must pass review.</p>;',
    'const structural = <p className="allowed">Open menu</p>;',
    "const label = 'Open menu';",
  ].join('\n');
  const rows = extractCandidates('src/components/PolicySandbox.tsx', text);
  assert.equal(rows.length, 4);
  assert.equal(rows[0].source, 'src/components/PolicySandbox.tsx');
  assert.equal(rows[1].wording, 'allow {\n  input.count >= 10\n}');
  assert.equal(rows[1].line, 2);
  assert.equal(rows[2].wording, 'admissionAllowed = accredited && trained');
  assert.equal(rows[2].match, 'sandbox predicate candidate');
  assert.equal(rows[3].wording, 'Outputs must pass review.');
  assert.equal(extractCandidates('src/components/QuizEngine.tsx', 'const passed = percentage >= 80;').length, 0);
  assert.throws(() => extractCandidates(source, 'const x = {'), /Cannot parse/);
});

test('round-trips exact multiline wording and review fields through Markdown', () => {
  const wording = 'must retain `a | b` < 10 & values\\n\nnext\r\n&amp;';
  assert.equal(decodeCell(encodeCell(wording)), wording);
  assert.throws(() => decodeCell('raw|pipe'), /Unsupported table encoding/);
  const rows = mergeCandidates([candidate(wording)], []);
  rows[0].disposition = 'Example | review\n[reference](decision-register.md)';
  const rendered = renderInventory(rows);
  assert.deepEqual(parseInventory(rendered), rows);
  assert.match(rendered, /\]\(\.\.\/src\/data\/graphData\.ts#L1\)/);
  assert.equal(renderInventory(parseInventory(rendered)), rendered);
});

test('preserves human review when lines move and never supplies an approval date', () => {
  assert.equal(initialRows()[0].classification, 'unreviewed');
  assert.equal(initialRows()[0].reviewDate, '');
  const old = reviewedRows();
  const next = mergeCandidates([candidate(undefined, 12)], old);
  assert.equal(next[0].id, old[0].id);
  assert.equal(next[0].line, 12);
  for (const key of ['classification', 'authority', 'reviewer', 'reviewDate', 'disposition']) {
    assert.equal(next[0][key], old[0][key]);
  }
});

test('changed wording is unreviewed and old review survives as absent history', () => {
  const old = reviewedRows();
  const next = mergeCandidates([candidate('Users must be trained.')], old);
  assert.equal(next.find((row) => row.presence === 'active').classification, 'unreviewed');
  const absent = next.find((row) => row.presence === 'absent');
  assert.equal(absent.classification, 'formally approved');
  assert.equal(absent.id, old[0].id);
  const returned = mergeCandidates([candidate()], [absent])[0];
  assert.equal(returned.classification, 'unreviewed');
  assert.match(returned.disposition, /Previous review.*Policy owner/);
});

test('duplicates have distinct identities and count changes invalidate ambiguous review', () => {
  const duplicates = mergeCandidates([candidate(), candidate(undefined, 5)], []);
  assert.equal(new Set(duplicates.map((row) => row.id)).size, 2);
  duplicates[0] = { ...duplicates[0], ...Object.fromEntries(
    ['classification', 'authority', 'reviewer', 'reviewDate', 'disposition'].map((key) => [key, reviewedRows()[0][key]]),
  ) };
  const moved = mergeCandidates([candidate(undefined, 2), candidate(undefined, 6)], duplicates);
  assert.equal(moved.find((row) => row.line === 2).reviewer, 'Policy owner');
  const reduced = mergeCandidates([candidate()], duplicates);
  assert.equal(reduced.filter((row) => row.presence === 'absent').length, 2);
  assert.equal(reduced.find((row) => row.presence === 'active').reviewer, '');
});

test('manual additions survive regeneration without being mistaken for scanned claims', () => {
  const manual = { ...initialRows()[0], id: 'MANUAL-diagram-1', presence: 'manual',
    wording: 'The diagram claims mandatory approval.', match: 'manual diagram review' };
  assert.deepEqual(mergeCandidates([], parseInventory(renderInventory([manual]))), [manual]);
});

test('rejects malformed, edited or unsafe review data', () => {
  const rendered = renderInventory(initialRows());
  for (const broken of [
    '',
    rendered.replace('Users must be accredited.', 'Users must be trained.'),
    rendered.replace('unreviewed', 'approved'),
    rendered.replace('Users must be accredited.', 'Users must | be accredited.'),
    rendered.replace('Users must be accredited.', 'Users must &nbsp; be accredited.'),
    `${rendered}unexpected notes\n`,
    `${rendered}${rendered.split('\n').at(-2)}\n`,
    rendered.replace('#L1)', '#L2)'),
    rendered.replace('## Claims', 'A review note that must not be silently lost.\n## Claims'),
  ]) assert.throws(() => parseInventory(broken));
  assert.throws(() => renderInventory([{ ...reviewedRows()[0], authority: '' }]), /linked authority/);
  assert.throws(() => renderInventory([{ ...reviewedRows()[0], reviewer: '' }]), /reviewer/);
  assert.throws(() => renderInventory([{ ...reviewedRows()[0], reviewDate: '2026-02-30' }]), /Invalid review date/);
});

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'pac-inventory-test-'));
  t.after(() => rm(root, { recursive: true }));
  for (const dir of ['src/data', 'src/components', 'public/assets/aistudio', 'policy-as-code']) {
    await mkdir(path.join(root, dir), { recursive: true });
  }
  await writeFile(path.join(root, source), "const text = 'Users must be accredited.';\n");
  await writeFile(path.join(root, 'src/components/PolicySandbox.tsx'), 'const admissionAllowed = trained && accredited;\n');
  await writeFile(path.join(root, 'public/assets/aistudio/Graph-Based_Policy_as_Code_Project_Playbook_4cc57c18'), 'Audit required.\n');
  return root;
}

test('generation is deterministic, preserves review, and check never writes', async (t) => {
  const root = await fixture(t);
  const output = path.join(root, 'policy-as-code/claim-inventory.md');
  assert.equal((await generateInventory(root, true)).changed, true);
  await assert.rejects(readFile(output), { code: 'ENOENT' });
  assert.equal((await generateInventory(root)).changed, true);
  const first = await readFile(output, 'utf8');
  assert.equal((await generateInventory(root)).changed, false);
  assert.equal(await readFile(output, 'utf8'), first);
  const rows = parseInventory(first);
  Object.assign(rows.find((row) => row.source === source), reviewedRows()[0]);
  await writeFile(output, renderInventory(rows));
  await generateInventory(root);
  assert.equal(parseInventory(await readFile(output, 'utf8')).find((row) => row.source === source).reviewer, 'Policy owner');
  assert.equal((await generateInventory(root, true)).changed, false);
  await writeFile(path.join(root, source), "\nconst text = 'Users must be accredited.';\n");
  const reviewed = await readFile(output, 'utf8');
  assert.equal((await generateInventory(root, true)).changed, true);
  assert.equal(await readFile(output, 'utf8'), reviewed);
  await generateInventory(root);
  assert.equal(parseInventory(await readFile(output, 'utf8')).find((row) => row.source === source).line, 2);
  const normalized = await readFile(output, 'utf8');
  await writeFile(path.join(root, source), "\r\nconst text = 'Users must be accredited.';\r\n");
  assert.equal((await generateInventory(root, true)).changed, false);
  assert.equal(await readFile(output, 'utf8'), normalized);
});

test('fails explicitly without overwriting malformed inventory or invalid UTF-8', async (t) => {
  const root = await fixture(t);
  const output = path.join(root, 'policy-as-code/claim-inventory.md');
  await writeFile(output, 'broken evidence');
  await assert.rejects(generateInventory(root), /Unrecognized inventory/);
  assert.equal(await readFile(output, 'utf8'), 'broken evidence');
  await writeFile(path.join(root, source), Buffer.from([0xff]));
  await assert.rejects(generateInventory(root), /encoded data/);
});

test('CLI returns failure for stale inventory, success for fresh, and rejects unknown arguments', async (t) => {
  const root = await fixture(t);
  // Copy only the CLI into a fixture rooted beneath this project's dependency directory.
  const projectRoot = fileURLToPath(new URL('../', import.meta.url));
  const cliRoot = await mkdtemp(path.join(projectRoot, 'node_modules', '.pac-cli-test-'));
  t.after(() => rm(cliRoot, { recursive: true }));
  const { cp } = await import('node:fs/promises');
  await cp(root, cliRoot, { recursive: true });
  await mkdir(path.join(cliRoot, 'scripts'));
  const cli = path.join(cliRoot, 'scripts/claim-inventory.mjs');
  await cp(fileURLToPath(new URL('./claim-inventory.mjs', import.meta.url)), cli);
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
  assert.equal(run('--check').status, 1);
  assert.equal(run().status, 0);
  assert.equal(run('--check').status, 0);
  assert.equal(run('--unknown').status, 1);
});
