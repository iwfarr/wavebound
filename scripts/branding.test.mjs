import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

async function textFiles(directory) {
  const entries = await readdir(new URL(`../${directory}`, import.meta.url), { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const file = `${directory}/${entry.name}`;
    return entry.isDirectory() ? textFiles(file) : /\.(tsx?|md)$/.test(file) ? [file] : [];
  }));
  return files.flat();
}

test('site sections and documentation contain no outdated display branding', async () => {
  const files = ['README.md', ...await textFiles('src'), ...await textFiles('docs')];
  const retainedReferences = /https:\/\/github\.com\/iwfarr\/seawater-playbook[^\s)`"']*|https:\/\/iwfarr\.github\.io\/seawater-playbook\/|cd seawater-playbook|'seawater_theme'|'seawater_user_feedback'|'seawater-problem-space'|'q-seawater-metaphor'|'node-seawater'/g;
  for (const file of files.filter((file) => file !== 'docs/branding.md')) {
    const content = (await read(file)).replace(retainedReferences, '');
    assert.doesNotMatch(content, /seawater/i, `${file} contains outdated branding`);
  }
});

test('page and metadata use Wavebound with base-aware logo URLs', async () => {
  const html = await read('index.html');
  assert.match(html, /<title>Wavebound \| Policy-as-Code Engine<\/title>/);
  assert.match(html, /og:title" content="Wavebound \| Policy-as-Code Engine"/);
  assert.match(html, /content="%BASE_URL%wavebound-logo.png"/);
  assert.match(html, /href="%BASE_URL%wavebound-logo.png"/);
  assert.doesNotMatch(html, /seawater/i);
  assert.equal(JSON.parse(await read('metadata.json')).name, 'Wavebound Policy-as-Code Engine');
});

test('logo retains dual-wave design and uses the existing wave image', async () => {
  const logo = await read('src/components/WaveboundLogo.tsx');
  assert.match(logo, /export const WaveboundLogo/);
  assert.match(logo, /wavebound_wave_logo.png/);
  assert.match(logo, /Dual-Wave Policy-as-Code Architecture/);
  assert.match(logo, /Inward Enclave Security/);
  assert.match(logo, /Outward Governance/);
  assert.doesNotMatch(logo, /seawater/i);
  const source = await readFile(new URL('../src/assets/images/wavebound_wave_logo.png', import.meta.url));
  const publicAsset = await readFile(new URL('../public/wavebound-logo.png', import.meta.url));
  assert.deepEqual(source, publicAsset);
});

test('package and lockfiles agree on the project name', async () => {
  const pkg = JSON.parse(await read('package.json'));
  const lock = JSON.parse(await read('package-lock.json'));
  assert.equal(pkg.name, 'wavebound-policy-as-code-engine');
  assert.equal(lock.name, pkg.name);
  assert.equal(lock.packages[''].name, pkg.name);
  assert.match(await read('bun.lock'), /"name": "wavebound-policy-as-code-engine"/);
});