import { createHash } from 'node:crypto';
import { readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript/unstable/ast';
import { API } from 'typescript/unstable/sync';

const originalPlaybook = 'public/assets/aistudio/Graph-Based_Policy_as_Code_Project_Playbook_4cc57c18';
const inventoryPath = 'policy-as-code/claim-inventory.md';
const columns = ['ID', 'Source', 'Line', 'Wording', 'Match', 'Presence', 'Classification', 'Authority / approval', 'Reviewer', 'Review date', 'Disposition'];
const header = `| ${columns.join(' | ')} |`;
const separator = `| ${columns.map(() => '---').join(' | ')} |`;
const classifications = new Set(['unreviewed', 'illustrative', 'externally sourced', 'formally approved']);
const manualFields = ['classification', 'authority', 'reviewer', 'reviewDate', 'disposition'];

const hash = (text) => createHash('sha256').update(text).digest('hex');
const fingerprint = (source, wording) => hash(`${source}\0${wording}`).slice(0, 20);

export function encodeCell(value) {
  return value.replace(/[&<>|`\\\r\n]/g, (character) => `&#${character.codePointAt(0)};`);
}

export function decodeCell(value) {
  if (/[<>`\\|]/.test(value) || /&(?!#(?:38|60|62|124|96|92|13|10);)/.test(value)) {
    throw new Error('Unsupported table encoding; use the documented numeric entities.');
  }
  return value.replace(/&#(38|60|62|124|96|92|13|10);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function sourceLink(source, line) {
  return `[${encodeCell(source)}](../${source.split('/').map(encodeURIComponent).join('/')}#L${line})`;
}

function validateRow(row) {
  if (!/^(?:src\/(?:data|components)\/[\w./-]+\.(?:ts|tsx)|public\/assets\/aistudio\/[\w.-]+)$/.test(row.source)
      || row.source.split('/').includes('..') || !Number.isSafeInteger(row.line) || row.line < 1) {
    throw new Error(`Invalid source location for ${row.id}.`);
  }
  if (!row.wording || !row.match || !classifications.has(row.classification)
      || !['active', 'absent', 'manual'].includes(row.presence)) {
    throw new Error(`Invalid candidate fields for ${row.id}.`);
  }
  if (row.id.startsWith('MANUAL-')) {
    if (!/^MANUAL-[\w-]+$/.test(row.id) || row.presence !== 'manual') {
      throw new Error(`Invalid manual record ${row.id}.`);
    }
  } else {
    const parts = /^C-([a-f0-9]{20})-([1-9]\d*)-([1-9]\d*)$/.exec(row.id);
    if (!parts || parts[1] !== fingerprint(row.source, row.wording)
        || Number(parts[3]) > Number(parts[2]) || row.presence === 'manual') {
      throw new Error(`Candidate identity mismatch for ${row.id}; do not edit generated wording or IDs.`);
    }
  }
  if (row.reviewDate && (!/^\d{4}-\d{2}-\d{2}$/.test(row.reviewDate)
      || !Number.isFinite(Date.parse(row.reviewDate))
      || new Date(row.reviewDate).toISOString().slice(0, 10) !== row.reviewDate)) {
    throw new Error(`Invalid review date for ${row.id}; use YYYY-MM-DD.`);
  }
  if (row.classification !== 'unreviewed' && (!row.reviewer || !row.reviewDate)) {
    throw new Error(`Reviewed candidate ${row.id} needs a reviewer and review date.`);
  }
  if (['formally approved', 'externally sourced'].includes(row.classification)
      && !/\[[^\]]+\]\([^)]+\)/.test(row.authority)) {
    throw new Error(`${row.id} needs a linked authority or approval record.`);
  }
}

export function parseInventory(text) {
  const lines = text.replace(/\r\n/g, '\n').trimEnd().split('\n');
  const start = lines.indexOf(header);
  if (lines[0] !== '# Candidate policy requirements inventory' || start < 0 || lines[start + 1] !== separator) {
    throw new Error('Unrecognized inventory format; refusing to overwrite review evidence.');
  }
  const prefix = lines.slice(0, start).filter((line) => !/^- \[[^\]]+\]\([^)]+\): \d+ candidates; SHA-256 [a-f0-9]{64}$/.test(line));
  const empty = renderInventory([]).trimEnd().split('\n');
  if (prefix.join('\n') !== empty.slice(0, empty.indexOf(header)).join('\n')) {
    throw new Error('Unexpected inventory preamble; keep review notes in Disposition.');
  }
  const rows = lines.slice(start + 2).map((line) => {
    if (!line.startsWith('| ') || !line.endsWith(' |')) {
      throw new Error('Unexpected content after inventory header; keep notes in Disposition.');
    }
    const cells = line.slice(2, -2).split(' | ');
    if (cells.length !== columns.length) throw new Error('Invalid inventory column count.');
    const [id, link, lineText, ...rest] = cells;
    const sourceMatch = /^\[(.*)\]\((.*)\)$/.exec(link);
    if (!sourceMatch) throw new Error(`Invalid source link for ${id}.`);
    const source = decodeCell(sourceMatch[1]);
    const lineNumber = Number(lineText);
    if (link !== sourceLink(source, lineNumber)) throw new Error(`Source link mismatch for ${id}.`);
    const [wording, match, presence, classification, authority, reviewer, reviewDate, disposition] = rest.map(decodeCell);
    const row = { id, source, line: lineNumber, wording, match, presence, classification, authority, reviewer, reviewDate, disposition };
    validateRow(row);
    return row;
  });
  if (new Set(rows.map((row) => row.id)).size !== rows.length) throw new Error('Duplicate inventory IDs.');
  return rows;
}

export function matchReason(text) {
  if (/\b(must|required?|mandatory|shall|prohibit\w*|only if|cannot|never|den(?:y|ied)|permit\w*|allow(?:ed|s)?|enforc\w*|approv\w*|validat\w*|threshold\w*|suppress\w*|retention|accredit\w*|egress|audit\w*)\b/i.test(text)) {
    return 'requirement or control claim';
  }
  if (/\b(?:OPA|SHACL|Rego|OWL|GitOps|PROV-O)\b/i.test(text)) return 'illustrative policy or implementation claim';
  if (/(?:>=|<=|[<>]=?|≥|≤)\s*\d|\b\d+(?:%|\s*(?:days?|years?|milliseconds?))\b/i.test(text)) return 'quantitative rule candidate';
  return '';
}

export function extractCandidates(source, text) {
  const found = [];
  const add = (wording, position, reason = matchReason(wording)) => {
    if (reason && wording.trim()) {
      found.push({ source, wording, line: text.slice(0, position).split('\n').length, match: reason });
    }
  };
  if (!/\.(ts|tsx)$/.test(source)) {
    let position = 0;
    for (const line of text.split(/(?<=\n)/)) {
      const wording = line.replace(/\r?\n$/, '');
      add(wording, position);
      position += line.length;
    }
    return found;
  }
  const file = path.resolve(source);
  const config = path.resolve('claim-inventory.virtual.tsconfig.json');
  const normalize = (name) => process.platform === 'win32' ? path.normalize(name).toLowerCase() : path.normalize(name);
  const virtual = new Map([
    [normalize(file), text],
    [normalize(config), JSON.stringify({ files: [file], compilerOptions: { noLib: true, noResolve: true, types: [] } })],
  ]);
  const api = new API({ fs: {
    readFile: (name) => virtual.get(normalize(name)),
    fileExists: (name) => virtual.has(normalize(name)) ? true : undefined,
  } });
  try {
    const snapshot = api.updateSnapshot({ openProjects: [config] });
    const project = snapshot.getProject(config);
    if (!project) throw new Error(`Cannot create parsing project for ${source}.`);
    const diagnostics = project.program.getSyntacticDiagnostics(file);
    if (diagnostics.length) throw new Error(`Cannot parse ${source}: ${JSON.stringify(diagnostics[0])}`);
    const tree = project.program.getSourceFile(file);
    if (!tree) throw new Error(`Cannot load syntax tree for ${source}.`);
    const visit = (node) => {
      const position = node.getStart(tree);
      if (ts.isJsxAttribute(node) && /^(?:className|id|key|href|src|style|type)$/.test(node.name.getText(tree))) return;
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const wording = text.slice(position + 1, node.end - 1);
        add(wording, position + 1);
        return;
      }
      if (ts.isTemplateExpression(node) || ts.isJsxText(node)) {
        add(node.getText(tree), position);
        // Template expressions may also contain policy predicates.
      }
      if (source === 'src/components/PolicySandbox.tsx' && ts.isVariableDeclaration(node) && node.initializer
          && /(?:pass|allow|permit|admission|suppression|dominance|egress|threshold)/i.test(node.name.getText(tree))
          && (ts.isBinaryExpression(node.initializer) || ts.isConditionalExpression(node.initializer))) {
        add(node.getText(tree), position, 'sandbox predicate candidate');
      }
      node.forEachChild(visit);
    };
    visit(tree);
  } finally {
    api.close();
  }
  return found;
}

async function readUtf8(file) {
  return new TextDecoder('utf-8', { fatal: true }).decode(await readFile(file));
}

async function listSources(root) {
  const files = [];
  const walk = async (relative) => {
    const entries = await readdir(path.join(root, relative), { withFileTypes: true });
    for (const entry of entries) {
      const name = `${relative}/${entry.name}`;
      if (entry.isDirectory()) await walk(name);
      else if (entry.isFile() && /\.(ts|tsx)$/.test(name)) files.push(name);
      else throw new Error(`Unsupported source entry ${name}; explicitly review scanner coverage before continuing.`);
    }
  };
  await walk('src/data');
  await walk('src/components');
  files.push(originalPlaybook);
  return files.sort();
}

export function mergeCandidates(candidates, previous) {
  const groups = new Map();
  for (const candidate of candidates) {
    const key = fingerprint(candidate.source, candidate.wording);
    const group = groups.get(key) ?? [];
    if (group.length && (group[0].source !== candidate.source || group[0].wording !== candidate.wording)) {
      throw new Error('Candidate fingerprint collision.');
    }
    group.push(candidate);
    groups.set(key, group);
  }
  const oldRows = new Map(previous.map((row) => [row.id, row]));
  const merged = [];
  for (const [key, group] of groups) {
    group.forEach((candidate, index) => {
      const id = `C-${key}-${group.length}-${index + 1}`;
      const old = oldRows.get(id);
      const review = Object.fromEntries(manualFields.map((field) => [field, old?.[field] ?? '']));
      // Reappearing claims need review even if the same wording existed in a past version.
      if (old?.presence !== 'active') {
        Object.assign(review, { classification: 'unreviewed', authority: '', reviewer: '', reviewDate: '',
          disposition: old ? `Reappeared; re-review required. Previous review: ${JSON.stringify(Object.fromEntries(manualFields.map((field) => [field, old[field]])))}` : '' });
      }
      merged.push({ ...candidate, id, presence: 'active', ...review });
      oldRows.delete(id);
    });
  }
  for (const row of oldRows.values()) {
    merged.push({ ...row, presence: row.presence === 'manual' ? 'manual' : 'absent' });
  }
  return merged.sort((a, b) => a.source.localeCompare(b.source, 'en') || a.line - b.line || a.id.localeCompare(b.id, 'en'));
}

export function renderInventory(rows, coverage = []) {
  const lines = [
    '# Candidate policy requirements inventory', '',
    'Local extraction aid for the first [deployment checklist item](checklist.md). Not approved policy or evidence of an implemented engine.',
    'See [review instructions](README.md#requirements-inventory). Edit only review fields; add missed claims using MANUAL IDs. Absent claims are historical, never applicable requirements.',
    'Numeric HTML entities preserve exact source wording, including newlines and Markdown characters. No generation date is a review date.', '',
    '## Scanned sources', '',
    'File hashes identify the scanned source revision, not approval. Changed context still requires human review even when a quoted claim is unchanged.', '',
    ...coverage.map(({ source, digest, count }) => `- ${sourceLink(source, 1)}: ${count} candidates; SHA-256 ${digest}`),
    '', '## Claims', '', header, separator,
  ];
  for (const row of rows) {
    validateRow(row);
    const values = [row.id, sourceLink(row.source, row.line), String(row.line),
      ...['wording', 'match', 'presence', ...manualFields].map((field) => encodeCell(row[field]))];
    lines.push(`| ${values.join(' | ')} |`);
  }
  return `${lines.join('\n')}\n`;
}

export async function generateInventory(root, check = false) {
  const files = await listSources(root);
  const candidates = [];
  const coverage = [];
  for (const source of files) {
    const text = (await readUtf8(path.join(root, source))).replace(/\r\n/g, '\n');
    const extracted = extractCandidates(source, text);
    coverage.push({ source, digest: hash(text), count: extracted.length });
    candidates.push(...extracted);
  }
  const destination = path.join(root, inventoryPath);
  let existing;
  try {
    existing = await readUtf8(destination);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const rows = mergeCandidates(candidates, existing === undefined ? [] : parseInventory(existing));
  const rendered = renderInventory(rows, coverage);
  const changed = existing?.replace(/\r\n/g, '\n') !== rendered;
  if (!check && changed) {
    // Exclusive creation avoids overwriting a concurrent generator's temporary file.
    const temporary = `${destination}.tmp`;
    await writeFile(temporary, rendered, { encoding: 'utf8', flag: 'wx' });
    try {
      let current;
      try {
        current = await readUtf8(destination);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (current !== existing) throw new Error('Inventory changed during generation; retry without overwriting concurrent edits.');
      await rename(temporary, destination);
    } finally {
      try {
        await unlink(temporary);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
  }
  return { changed, candidates: candidates.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) {
      throw new Error('Usage: node scripts/claim-inventory.mjs [--check]');
    }
    const check = args[0] === '--check';
    const root = fileURLToPath(new URL('../', import.meta.url));
    const result = await generateInventory(root, check);
    if (check && result.changed) {
      console.error('Claim inventory is stale or missing. Run npm run claims:update and review the diff.');
      process.exitCode = 1;
    } else {
      console.log(`${check ? 'Checked' : result.changed ? 'Updated' : 'Unchanged'} inventory: ${result.candidates} candidate occurrences scanned. Approval requires human review.`);
    }
  } catch (error) {
    console.error(`Claim inventory failed: ${error.message}`);
    process.exitCode = 1;
  }
}
