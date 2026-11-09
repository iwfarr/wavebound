# Wavebound branding

The public-facing description is **Wavebound: Ontology-led Information Governance**. Wavebound is an ontology-led information governance playbook and reference architecture connecting legal and ethical requirements, institutional decisions and technical safeguards for sensitive research data. The proposed IG OWL/RDF ontology is the architectural foundation, not merely a visualisation feature.

The playbook and dual-wave interpretation remain: inward enclave security and outward governance, using a tidal navigation model for the information governance problem space. **Policy-as-Code Engine** remains a technical direction and compatibility identifier, not a claim of current production enforcement. Package names are unchanged. See [positioning and governance boundaries](positioning.md) for current maturity, the distinct semantic/validation/enforcement layers, UK source references and retained follow-on ideas.

## Logo assets

`src/components/WaveboundLogo.tsx` renders the Wavebound name alongside the existing wave mark, with the same colours, layout, and SVG fallback. The active image is `src/assets/images/wavebound_wave_logo.png`; `public/wavebound-logo.png` is the same mark for the favicon and social preview. No new logo artwork was generated.

Legacy raster assets are retained, but are not used for current branding:

- `public/seawater-logo.jpg` and `public/seawater-logo.png`
- `public/assets/aistudio/seawater_wave_centered.png` and `seawater_wave_clean.png`
- `src/assets/images/seawater_logo.jpg`, `seawater_logo_1792936354525.jpg`, `seawater_horizontal_waves_1793011541899.jpg`, and `seawater_yinyang_logo_1793008933631.jpg`

Do not relabel any raster containing the old wordmark as Wavebound. A final replacement wordmark needs an approved Wavebound asset, retaining the dual-wave imagery and navy/cyan/silver palette, supplied as SVG and PNG. Embedded lettering cannot be updated safely by changing filenames.

## Compatibility and retained references

- GitHub repository, feedback issue links, clone commands, and Pages deployment continue to use the existing `iwfarr/seawater-playbook` location. Branding does not rename the remote repository. No new domain or affiliation is implied.
- `VITE_BASE_PATH` and the Vite fallback retain `/seawater-playbook/` so the current deployment continues working. A later repository rename requires coordinated URL and base-path updates.
- Browser storage keys (`seawater_theme`, `seawater_user_feedback`) and glossary/quiz/graph IDs retain their existing spelling to preserve saved preferences and stable references. These are compatibility identifiers, not current display branding.
- Illustrative Rego packages, ontology URIs, Kubernetes names/labels, alert identifiers, and metrics use Wavebound. When adapting these examples to an existing deployment, migrate resource names and monitoring references together. Example hostnames and ontology URIs do not imply registered domains or affiliations.
- The generated claim inventory retains absent historical wording and review records. Regenerate it with `npm run claims:update`; do not replace text directly inside its fingerprinted records.
- Legacy image filenames and historical source artifacts remain distinguishable from current branding. Generated `dist/` output is rebuilt rather than edited manually.

## Validation

Run `npm run lint`, `npm run branding:test`, `npm run messaging:test`, `npm run claims:test`, `npm run claims:check`, and `npm run build`. Verify the built favicon/social image under the actual Pages base path and review the rendered Wavebound name at narrow viewport widths.