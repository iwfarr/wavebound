# Wavebound positioning and governance boundaries

## Core description

**Wavebound is an ontology-led information governance playbook and reference architecture connecting legal and ethical requirements, institutional decisions and technical safeguards for sensitive research data.**

Governance decisions should shape how data is accessed, used and released, rather than sit separately in policy documents. Wavebound's distinction is the shared semantic model connecting those decisions, not a general-purpose compliance dashboard or certification service.

## Three connected layers

| Layer | Architectural role | Current status |
| --- | --- | --- |
| IG OWL/RDF ontology | Represent people, projects, datasets, purposes, permissions, approvals, responsibilities and evidence with explicit relationships | Proposed model illustrated through embedded Turtle snippets and descriptions; no standalone validated ontology release |
| Playbook and governance atlas | Explain responsibilities, proposed safeguards and public accountability to human audiences | Interactive application, visual graphs, learning resources and illustrative charters |
| SHACL and policy-as-code | Validate explicit constraints and translate approved decisions into testable rules and enforcement integrations | Illustrative snippets and implementation planning; no executable semantic compiler or production enforcement integration |

The ontology is the connective tissue of the architecture. It can express which decision authorises which activity, under which conditions, for which data, and with whose accountability. The Cytoscape visual graph is not itself an OWL/RDF ontology, a reasoning service or an operational audit trail.

OWL/RDF represents meaning and relationships. OWL reasoning does not by itself validate an access request, establish legal authority or enforce a permission. SHACL validation and runtime policy enforcement are distinct functions with separate input, trust and testing requirements. Even a technically valid graph can contain stale, unauthorised or legally incorrect assertions.

Human approvals remain distinct from technical checks. An ethics opinion, a data-access decision and a confidentiality authorisation have different purposes; none should be collapsed into a universal `approved` flag. Applicable institutional interpretations need accountable owners, provenance, validity conditions and revocation handling.

The dual-wave model remains: **inward enclave security** governs proposed entry conditions for people, projects, data and workloads; **outward governance** connects output review, decision evidence and public transparency. This application illustrates those boundaries; it does not currently enforce them.

## UK governance context

NEN 7510 is a Netherlands health-information security standard. It is a useful comparison of intent, not a direct UK equivalence asserted by Wavebound. Relevant UK concerns are distributed across legislation, confidentiality duties, guidance, assurance schemes and project-specific decisions. These sources do not have the same authority, territorial scope or applicability. In particular, England-specific NHS processes must not be presented as a single UK-wide regime.

| Source | Type and scope | Mapping boundary |
| --- | --- | --- |
| [UK GDPR and Data Protection Act 2018 — ICO special-category guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/lawful-basis-for-processing/special-category-data/) | Data-protection legislation; health data is special-category personal data | Represent the applicable Article 6 lawful basis and separate Article 9 condition, plus additional safeguards where required. Neither an ontology nor an ethics approval supplies these automatically. Consult current legislation and guidance, including amendments. |
| [Common-law confidentiality — HRA explanation](https://www.hra.nhs.uk/about-us/committees-and-services/confidentiality-advisory-group/confidential-patient-information-and-regulations/) | Duty relating to information given in circumstances of confidence; distinct from data-protection obligations | Preserve the justification for the particular use or disclosure. Do not equate a UK GDPR lawful basis with permission to disclose confidential information. |
| [Caldicott Principles — National Data Guardian](https://www.gov.uk/government/publications/the-caldicott-principles) | Guidance on appropriate use and sharing of confidential health and care information; the publication applies to England | Model justified purpose, necessity, minimisation, need-to-know access, responsibilities and transparency without treating principles as a certification scheme. |
| [NHS England Data Security and Protection Toolkit](https://www.dsptoolkit.nhs.uk/) | Online assurance self-assessment against the National Data Guardian's ten data security standards, for organisations with access to NHS patient data and systems | Preserve the applicable toolkit version, organisation category, evidence and assessment outcome. A proposed control mapping is not a DSPT submission or assurance result. |
| [Section 251 support and CAG — HRA](https://www.hra.nhs.uk/about-us/committees-and-services/confidentiality-advisory-group/confidential-patient-information-and-regulations/) | Support under the Control of Patient Information Regulations in specified circumstances; CAG advises the relevant decision maker | Record the actual decision, purpose, scope, conditions and validity. HRA decides research applications on CAG advice; support is not a universal access approval or a substitute for UK GDPR requirements. Check territorial and project applicability. |
| [Research approvals and decisions — HRA](https://www.hra.nhs.uk/approvals-amendments/what-approvals-do-i-need/) | Research-specific review and approval processes depending on the study and setting | Keep REC review, confidentiality support, institutional permissions and data-access decisions distinct. Not every project requires every process. |

This is a reference explanation, not legal advice or a complete requirements catalogue. The deploying organisation must verify jurisdiction, current source versions, applicability and interpretation with its accountable governance and legal advisers. Source references do not constitute approved Wavebound policy mappings.

### Proposed mapping record

A future ontology and approved policy implementation should retain:

- Source authority, version, clause and jurisdiction.
- Applicable organisation, data, purpose and activity.
- The original requirement separately from its institutional interpretation.
- Accountable decision maker, decision reference, conditions, validity and review state.
- Proposed technical constraint separately from the approved rule and operational evidence.

Relationships between sources should express the specific connection (for example, an overlapping confidentiality concern), not legal equivalence. Conflicting, uncertain or missing requirements remain visible for review rather than becoming inferred permission.

## Maturity and claims

Use **illustrative**, **proposed**, **approved** and **operational** deliberately. Version control alone does not prove correctness or compliance. Do not claim a control is enforced until the [implementation ready-to-claim gate](../policy-as-code/README.md#ready-to-claim-gate) is satisfied.

The retained technical name **Policy-as-Code Engine** describes the implementation direction and existing package identifiers, not current production readiness. Some later playbook sections and historical artifacts still describe target patterns in operational language; those claims remain subject to the claim inventory and human review. This positioning pass is not a complete legal or capability audit.

## Retained follow-on ideas

The earlier comparison with [Seven Wave governance](https://www.sevenwave.com/waves/governance) and [Tidal Control](https://tidalcontrol.com/) suggests useful presentation patterns, not equivalent products or evidence of Wavebound capabilities:

- **Seven Wave:** explain governance inside everyday work; connect policy legitimacy, accountable owners, operational artifacts and review signals.
- **Tidal Control:** lead with the visitor's task, provide audience-specific starting points and make the next step concrete. Do not borrow certification promises, audit figures or time-to-compliance claims.

Deferred beyond this messaging pass:

1. Audience entry points for governance leads, researchers, platform teams, and public/oversight panels.
2. One clearly illustrative journey: approval → access conditions → proposed checks → output review → decision evidence.
3. A readiness checklist linking to relevant playbook sections, without compliance scores or certification promises.

Keep the IG ontology, accountable human authority, sensitive research context and traceability central when developing these ideas. No competitor wording or standard text is reproduced as product copy.