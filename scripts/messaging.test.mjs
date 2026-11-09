import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('primary descriptions keep the IG ontology central without production claims', async () => {
  const files = ['README.md', 'docs/branding.md', 'docs/positioning.md', 'index.html', 'metadata.json'];
  const contents = await Promise.all(files.map(read));
  contents.forEach((content, index) => {
    assert.match(content, /ontology-led/i, files[index]);
    assert.match(content, /OWL\/RDF/, files[index]);
    assert.doesNotMatch(content, /production-grade|production-ready|provably safe|microsecond|sub-millisecond|v2\.4\.0--prod/i, files[index]);
  });
  assert.match(contents[0], /standalone validated ontology.*not yet delivered/);
  assert.match(contents[0], /browser-side demonstration|Browser-side demonstration/);
  assert.match(contents[2], /Cytoscape visual graph is not itself an OWL\/RDF ontology/);
  assert.match(contents[2], /SHACL validation and runtime policy enforcement are distinct functions/);
});

test('metadata descriptions agree and describe illustrative models', async () => {
  const html = await read('index.html');
  const description = /<meta name="description" content="([^"]+)"/.exec(html)?.[1];
  const socialDescription = /<meta property="og:description" content="([^"]+)"/.exec(html)?.[1];
  assert.ok(description);
  assert.equal(description, socialDescription);
  assert.match(description, /illustrative IG OWL\/RDF models/);
  assert.match(JSON.parse(await read('metadata.json')).description, /Production enforcement is not yet delivered/);
});

test('executive front matter distinguishes meaning, human authority and implementation', async () => {
  const playbook = await read('src/components/PlaybookReader.tsx');
  const frontMatter = playbook.slice(playbook.indexOf("id: 'sec-front-matter'"), playbook.indexOf("id: 'sec-phase-1-1'"));
  assert.ok(frontMatter.length > 0);
  for (const phrase of ['IG OWL/RDF Ontology', 'Human Understanding', 'Operational Translation', 'Current Maturity', 'Dual-Wave Navigation', 'UK Governance Context', 'Authority & Traceability', 'Implementation Gate']) {
    assert.ok(frontMatter.includes(phrase), `Missing ${phrase}`);
  }
  assert.match(frontMatter, /standalone validated IG ontology.*not yet delivered/);
  assert.match(frontMatter, /browser-side demonstration, not a security control/);
  assert.match(frontMatter, /law is not automatically compiled into code/);
  assert.doesNotMatch(frontMatter, /microsecond|sub-millisecond|rdf_to_rego\.py|v2\.4\.0-prod|guarantees verifiable/);
  assert.match(playbook, /id: 'sec-phase-1-2'/);
  assert.match(playbook, /not an existing ontology file/);
});

test('UK context preserves authority and scope with official references', async () => {
  const context = await read('docs/positioning.md');
  assert.match(context, /not a direct UK equivalence/);
  assert.match(context, /England-specific NHS processes/);
  assert.match(context, /Article 6 lawful basis and separate Article 9 condition/);
  assert.match(context, /CAG advises the relevant decision maker/);
  assert.match(context, /not a universal access approval or a substitute for UK GDPR/);
  for (const domain of ['ico.org.uk', 'www.gov.uk', 'www.dsptoolkit.nhs.uk', 'www.hra.nhs.uk']) {
    assert.ok(context.includes(`https://${domain}/`), `Missing official reference: ${domain}`);
  }
  assert.match(context, /Deferred beyond this messaging pass/);
  assert.match(context, /without compliance scores or certification promises/);
});

test('visible brand describes ontology-led governance while retaining the wave design', async () => {
  const [logo, header] = await Promise.all(['src/components/WaveboundLogo.tsx', 'src/components/Header.tsx'].map(read));
  assert.match(logo, /Ontology-led Governance/);
  assert.match(logo, /IG OWL\/RDF model/);
  assert.match(logo, /Inward Enclave Security/);
  assert.match(logo, /Outward Governance/);
  assert.match(header, /title="Wavebound · Ontology-led Information Governance"/);
  assert.doesNotMatch(logo + header, /Policy-as-Code Engine/);
});