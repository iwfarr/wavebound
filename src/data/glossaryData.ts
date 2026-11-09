export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category:
    | 'Governance & Frameworks'
    | 'Semantic Web & Ontologies'
    | 'Policy Enforcement & Security'
    | 'Disclosure Control (SDC)'
    | 'AI & Autonomous Agents'
    | 'Operations & Testing'
    | 'Standards & Clinical Safety'
    | 'Governance Maturity Model';
  shortDefinition: string;
  fullDefinition: string;
  playbookContext: string;
  playbookSection: string;
  targetSectionId?: string;
  exampleSnippet?: string;
  relatedTerms: string[];
  furtherResourceId?: string;
  externalUrl?: string;
  statutoryBasis?: string;
  governanceSafeguards?: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // --- Governance & Statutory Frameworks ---
  {
    id: 'tre',
    term: 'Trusted Research Environment',
    acronym: 'TRE / SDE',
    category: 'Governance & Frameworks',
    shortDefinition: 'A secure computing environment enabling authorized researchers to analyze sensitive population data without raw data leaving the protected environment.',
    fullDefinition: 'A Trusted Research Environment (TRE), designated alongside Secure Data Environments (SDE) as modern data analysis & intelligence platforms across the NHS and UK health data space, provides remote virtual access to health and administrative microdata under strict, auditable governance controls. Rather than sending data out to researchers, the platform brings researchers and their approved code into a locked digital facility adhering to the Five Safes framework and statutory accreditation standards.',
    playbookContext: 'The core operational subject of this playbook, which specifies a graph-based policy-as-code automation platform for managing data analysis & intelligence platforms such as TREs and SDEs.',
    playbookSection: 'Section 1. Project Overview & Objectives',
    relatedTerms: ['five-safes', 'satre', 'pac', 'safe-setting']
  },
  {
    id: 'five-safes',
    term: 'Five Safes Framework',
    category: 'Governance & Frameworks',
    shortDefinition: 'An internationally recognized framework ensuring secure access to confidential data across 5 dimensions: Person, Project, Setting, Data, Output.',
    fullDefinition: 'Originally developed by the UK Office for National Statistics (ONS), the Five Safes framework breaks clinical data governance into five clear, interdependent dimensions: Safe People (accredited researchers with IG training), Safe Projects (ethics-approved research protocols), Safe Settings (hardened, egress-isolated enclaves), Safe Data (de-identified tiered datasets), and Safe Outputs (disclosure-controlled findings).',
    playbookContext: 'Formalized as the core OWL 2 class hierarchy in ontology/tre-core.ttl.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['safe-person', 'safe-project', 'safe-setting', 'safe-data', 'safe-output']
  },
  {
    id: 'safe-person',
    term: 'Safe Person (Accredited Researcher)',
    category: 'Governance & Frameworks',
    shortDefinition: 'Verifying researcher identity, institutional affiliation, and valid annual NHS Information Governance (IG) training certification.',
    fullDefinition: 'Ensures that only accredited researchers who have verified employment with an accredited institution, signed user agreements, and completed mandatory annual Information Governance (IG) certifications are granted access to clinical data tiers.',
    playbookContext: 'Modeled in tre-core.ttl and validated in access-shapes.ttl via `sh:minCount 1` and `tre:hasValidIGCertification true`.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['five-safes', 'caldicott']
  },
  {
    id: 'safe-project',
    term: 'Safe Project',
    category: 'Governance & Frameworks',
    shortDefinition: 'Ensuring research aims serve demonstrable public benefit with valid NHS Research Ethics Committee (REC) and Section 251 approvals.',
    fullDefinition: 'A governance dimension verifying that the research protocol has undergone independent ethical review by an accredited Research Ethics Committee (REC), has a lawful processing basis under UK GDPR, and holds Section 251 exemption where consent is impracticable.',
    playbookContext: 'Modeled in tre-core.ttl and governance_core.ttl as an ethics approval constraint.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['five-safes', 's251', 'rec-hra']
  },
  {
    id: 'safe-setting',
    term: 'Safe Setting (Enclave)',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'A hardened cloud virtual private cloud (VPC) where internet egress is blocked and remote desktop / compute access is strictly audited.',
    fullDefinition: 'The technological enclave where researcher pods, databases, and analytics engines run. Network egress is blocked at the subnet and firewall layer to prevent unauthorized data exfiltration, and file movement is restricted to airlocks.',
    playbookContext: 'Enforced through SHACL access-shapes.ttl (`tre:enclaveEgressBlocked true`) and OPA Rego rules.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & 4)',
    relatedTerms: ['five-safes', 'pep', 'rego', 'airlock']
  },
  {
    id: 'safe-data',
    term: 'Safe Data (Tiering & De-identification)',
    category: 'Governance & Frameworks',
    shortDefinition: 'De-identified clinical data assets partitioned into sensitivity tiers (aggregate, pseudonymous, identifiable under s251).',
    fullDefinition: 'Structured data management where clinical tables have direct identifiers permanently removed and are partitioned into hospital operational tiers matching project clearance. Researchers are granted access only to the minimal necessary columns and rows.',
    playbookContext: 'Modeled in governance_core.ttl and mapped to clinical hospital tiers.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['five-safes', 'sdc', 'k-anonymity']
  },
  {
    id: 'safe-output',
    term: 'Safe Output (Airlock Review)',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Mathematical Statistical Disclosure Control (SDC) checks on summary tables and models before egress outside the TRE.',
    fullDefinition: 'The final barrier ensuring that all analytical artifacts, regression models, summary tables, and visualizations satisfy quantitative disclosure thresholds ($k \\ge 10$, dominance $\\le 80\%$) before leaving the airlock.',
    playbookContext: 'Formalized in ontology/sdc_rules.ttl and enforced via sdc_shapes.ttl and compiled Rego airlock rules.',
    playbookSection: 'Section 1 & Section 3 (Phase 1 & 4)',
    relatedTerms: ['sdc', 'primary-suppression', 'dominance-rule', 'airlock']
  },
  {
    id: 'caldicott',
    term: 'Caldicott Principles',
    category: 'Governance & Frameworks',
    shortDefinition: 'Eight fundamental principles governing the handling and sharing of patient-identifiable information across the UK NHS.',
    fullDefinition: 'Established by Dame Fiona Caldicott, these principles mandate: (1) Justify the purpose, (2) Do not use personal confidential data unless absolutely necessary, (3) Use the minimum necessary personal confidential data, (4) Access to personal confidential data should be on a strict need-to-know basis, (5) Everyone with access to personal confidential data should be aware of their responsibilities, (6) Understand and comply with the law, (7) The duty to share information for individual care is as important as the duty to protect confidentiality, and (8) Inform patients and service users about how their confidential information is used.',
    playbookContext: 'Embedded into ontology/tre-core.ttl as class annotations, access criteria, and researcher training checks.',
    playbookSection: 'Section 1 & Section 2',
    relatedTerms: ['s251', 'five-safes', 'tre']
  },
  {
    id: 's251',
    term: 'NHS Section 251 (s251)',
    category: 'Governance & Frameworks',
    shortDefinition: 'Statutory exemption under the NHS Act 2006 allowing processing of confidential patient information without prior individual consent.',
    fullDefinition: 'Granted by the Health Research Authority (HRA) on advice from the Confidentiality Advisory Group (CAG), Section 251 permits confidential patient data to be processed for essential medical research when obtaining direct consent is not feasible and the study provides significant public benefit.',
    playbookContext: 'Modeled in governance_core.ttl as an explicit legal basis for accessing Tier 3 clinical data.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['caldicott', 'safe-project', 'safe-data', 'rec-hra']
  },
  {
    id: 'dea-2017',
    term: 'Digital Economy Act 2017 (Part 5, Chapter 5: Research)',
    acronym: 'DEA 2017',
    category: 'Governance & Frameworks',
    shortDefinition: 'Statutory UK gateway enabling public authorities to disclose de-identified data for public-benefit research.',
    fullDefinition: 'Part 5, Chapter 5 of the Digital Economy Act 2017 provides a statutory mechanism for UK public authorities to share non-identifying data for approved research projects that serve the public interest. Overseen by the UK Statistics Authority and the Research Accreditation Panel (RAP), it sets high legal standards, severe criminal penalties for unlawful re-identification or disclosure under Section 67, and mandates accredited safe settings.',
    playbookContext: 'Formalized in ontology/governance_core.ttl as a first-class legal gateway alongside NHS s251 and DPA 2018 Section 19.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['rap-uksa', 'dea-accredited-researcher', 'dea-accredited-processor', 'five-safes', 'safe-project']
  },
  {
    id: 'rap-uksa',
    term: 'Research Accreditation Panel (RAP)',
    acronym: 'RAP / UKSA',
    category: 'Governance & Frameworks',
    shortDefinition: 'Independent statutory committee of the UK Statistics Authority approving projects, researchers, and TRE processors under the DEA.',
    fullDefinition: 'The independent statutory body established under Section 70 of the Digital Economy Act 2017. RAP is responsible for accrediting researchers, evaluating project public benefit and methodology, and accrediting secure data processing facilities (TREs).',
    playbookContext: 'Represented in access-shapes.ttl as `tre:accreditedByRAP true` to validate project and institutional eligibility for public data linkages.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['dea-2017', 'dea-accredited-researcher', 'dea-accredited-processor', 'safe-project']
  },
  {
    id: 'dea-accredited-researcher',
    term: 'DEA Accredited Researcher',
    acronym: 'DEA Researcher',
    category: 'Governance & Frameworks',
    shortDefinition: 'Individual researcher accredited by UKSA/RAP who has completed Safe Researcher Training and signed statutory agreements.',
    fullDefinition: 'An individual certified under the UK Statistics Authority Research Accreditation Framework. Researchers must demonstrate qualifications, complete UKSA Safe Researcher Training, verify employer sponsorship, and sign legally binding commitments subject to statutory penalties for data misuse.',
    playbookContext: 'Directly mapped to the Safe Person verification shape (`tre:hasAccreditedResearcher`) in access-shapes.ttl.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['safe-person', 'dea-2017', 'rap-uksa', 'five-safes']
  },
  {
    id: 'dea-accredited-processor',
    term: 'DEA Accredited Processor (Secure Processing Environment)',
    acronym: 'Accredited Processor',
    category: 'Governance & Frameworks',
    shortDefinition: 'Secure computing environment (TRE) accredited by UKSA under DEA 2017 Section 71 for hosting and linking public authority data.',
    fullDefinition: 'An organization or technological platform formally accredited by the UK Statistics Authority to prepare, link, store, or provide access to de-identified data. Requires verified compliance with ISO 27001, NHS DSPT, airlock egress controls, and full audit logging.',
    playbookContext: 'Corresponds to the `tre:SecureEnclave` and `tre:AirlockGate` classes verified by Wavebound admission webhooks and egress controllers.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & 4)',
    relatedTerms: ['tre', 'safe-setting', 'dea-2017', 'satre', 'airlock']
  },
  {
    id: 'rec-hra',
    term: 'Research Ethics Committee & HRA',
    acronym: 'REC / HRA',
    category: 'Governance & Frameworks',
    shortDefinition: 'Independent statutory bodies that review health research proposals to ensure patient rights, dignity, and safety are upheld.',
    fullDefinition: 'The Health Research Authority (HRA) and its network of Research Ethics Committees (RECs) review research protocols involving NHS patients or their data. An active, unexpired REC approval letter is a mandatory prerequisite for creating any project in the TRE.',
    playbookContext: 'Enforced via `tre:hasEthicsApproval true` in `ontology/shapes/access-shapes.ttl`.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & 2)',
    relatedTerms: ['safe-project', 's251']
  },
  {
    id: 'iras-ig-assurances',
    term: 'IRAS Information Governance Assurances',
    acronym: 'IRAS IG',
    category: 'Governance & Frameworks',
    shortDefinition: 'Statutory Information Governance assurances submitted via IRAS demonstrating lawful bases, transparency, and data protection compliance for ethical approval.',
    fullDefinition: 'Under the Health Research Authority (HRA) framework and the pilot guide to effective IG assurances, researchers applying through the Integrated Research Application System (IRAS) must demonstrate clear evidence across core IG domains: (1) lawful processing bases under UK GDPR Articles 6 and 9; (2) Common Law Duty of Confidentiality compliance (via consent or Section 251 CAG support); (3) Data Protection Impact Assessment (DPIA) completion; (4) institutional controller/processor designations; and (5) robust technical security safeguards conforming to NHS Data Security & Protection Toolkit (DSPT) baselines.',
    playbookContext: 'Directly validated by Wavebound Phase 1 admission shapes, ensuring that no study partition is mounted without verified IRAS IG assurances.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & Phase 2)',
    statutoryBasis: 'HRA Approval Framework; UK GDPR Art. 5, 6, 9 & 35; NHS Act 2006 s251',
    governanceSafeguards: [
      'Documented evidence of lawful processing basis and public interest justification.',
      'Explicit confirmation of Caldicott Guardian approval or Section 251 CAG exemption.',
      'Annual institutional NHS DSPT self-assessment compliance.'
    ],
    furtherResourceId: 'res-hra-iras-ig-guide',
    externalUrl: 'https://www.hra.nhs.uk/planning-and-improving-research/policies-standards-legislation/data-protection-and-information-governance/pilot-a-draft-guide-to-providing-effective-ig-assurances-in-iras-submissions/',
    relatedTerms: ['rec-hra', 's251', 'uk-gdpr', 'dpia', 'five-safes']
  },
  {
    id: 'federated-analysis',
    term: 'Federated Data Analysis & Distributed Analytics',
    acronym: 'FDA',
    category: 'Governance & Frameworks',
    shortDefinition: 'A collaborative research paradigm where analytical code or models travel to distributed, sovereign data custodians, or data is harmonized into secure virtual workspaces without transferring raw microdata.',
    fullDefinition: 'Federated Data Analysis enables multi-institutional health and population research across distinct sovereign data custodians while upholding data residency and statutory confidentiality rules. In practice, federated analysis operates across two principal models: (1) Distributed Algorithm Dispatch: Rather than centralizing sensitive records, approved analytical queries, containerized algorithms, or machine learning model parameters travel to each local secure repository (bringing computation to the data); results are aggregated centrally using mathematical disclosure control or federated averaging; (2) Sovereign Workspace Federation: Disparate custodians harmonize governance metadata and ontologies, enabling accredited researchers to execute standardized analytical pipelines across distributed enclaves via a unified control plane without raw microdata leaving local institutional custody.',
    playbookContext: 'Enforced by Wavebound Policy-as-Code to ensure consistent SHACL admission checks and OPA Rego egress filtering across all federated enclave nodes.',
    playbookSection: 'Section 1. Project Overview & Objectives',
    statutoryBasis: 'UK GDPR Article 28 / 26 (Joint Controllers / Processors); SATRE Specification v1.1',
    governanceSafeguards: [
      'Raw microdata remains in local institutional custody with sovereign perimeter controls.',
      'Only aggregated mathematical parameters or privacy-preserved model updates travel across nodes.',
      'Unified Policy-as-Code enforcement across all participating federated environments.'
    ],
    relatedTerms: ['tre', 'vde', 'dcr', 'safe-setting', 'sdc']
  },
  {
    id: 'uk-gdpr',
    term: 'UK GDPR Articles 6 & 9',
    category: 'Governance & Frameworks',
    shortDefinition: 'Lawful processing bases for public task (Art 6(1)(e)) and scientific research on special category health data (Art 9(2)(j)).',
    fullDefinition: 'Under the UK General Data Protection Regulation and Data Protection Act 2018, health data constitutes special category data. TRE research typically relies on Article 6(1)(e) (public task) and Article 9(2)(j) (archiving and research in the public interest, subject to technical and organizational safeguards).',
    playbookContext: 'Documented in `governance_core.ttl` and synthesized into the FOI Governance Charter.',
    playbookSection: 'Section 1 & Section 3 (Phase 1 & 3)',
    relatedTerms: ['caldicott', 's251', 'foi']
  },
  {
    id: 'satre',
    term: 'SATRE Framework',
    acronym: 'SATRE',
    category: 'Governance & Frameworks',
    shortDefinition: 'Standard Architecture for Trusted Research Environments developed by UK health research consortia across 4 pillars.',
    fullDefinition: 'The Standard Architecture for Trusted Research Environments (SATRE) provides a comprehensive specification spanning four foundational pillars: Information Governance, Computing Infrastructure, Data Management, and Software Operations.',
    playbookContext: 'The project aligns its core ontology definitions and repo architecture with SATRE pillars.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['tre', 'caldicott', 'five-safes']
  },
  {
    id: 'foi',
    term: 'Freedom of Information (FOI) Report',
    acronym: 'FOI',
    category: 'Governance & Frameworks',
    shortDefinition: 'Synthesized public governance charter produced automatically from code for hospital Trust boards and public scrutiny.',
    fullDefinition: 'Public transparency reports generated by `compiler/generate_docs.py` into `GOVERNANCE_CHARTER.md`, ensuring clinical data governance remains transparent to patients, auditors, clinicians, and journalists under the Freedom of Information Act 2000.',
    playbookContext: 'Generated in Phase 3 via `python compiler/generate_docs.py`.',
    playbookSection: 'Section 2 & Section 3 (Phase 3)',
    relatedTerms: ['pac', 'caldicott']
  },

  // --- Semantic Web & Ontologies ---
  {
    id: 'pac',
    term: 'Policy-as-Code',
    acronym: 'PaC',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'Defining governance, clinical access, and network policies in machine-readable code rather than static paper guidelines.',
    fullDefinition: 'Policy-as-Code translates human governance charters into version-controlled declarative code. In this project, high-level OWL 2 ontologies authored by clinical governance teams are validated via SHACL and compiled into OPA Rego policies for real-time automated enforcement.',
    playbookContext: 'The core methodology of this playbook, bridging clinical governance with low-latency Kubernetes and API gateway enforcement.',
    playbookSection: 'Section 1 & Section 2',
    relatedTerms: ['rego', 'opa', 'shacl', 'owl2']
  },
  {
    id: 'owl2',
    term: 'OWL 2 (Web Ontology Language)',
    acronym: 'OWL 2',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'W3C standard ontology language with formal description logics for defining classes, properties, and relationships.',
    fullDefinition: 'OWL 2 provides semantic transparency and rich domain modeling, allowing clinical governance teams, data stewards, and auditors to inspect access hierarchies and data relationships in machine-readable format.',
    playbookContext: 'Used in `tre-core.ttl` and `governance_core.ttl` to author the TRE domain ontology.',
    playbookSection: 'Section 1 & Section 2',
    exampleSnippet: `tre:SafePerson a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension .`,
    relatedTerms: ['rdf', 'turtle', 'owa', 'shacl']
  },
  {
    id: 'rdf',
    term: 'Resource Description Framework',
    acronym: 'RDF',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'Graph data model representing knowledge as subject-predicate-object triples.',
    fullDefinition: 'The foundational W3C semantic data model used to express entity relationships in the form of triples (e.g. `Researcher -> hasAccreditation -> True`).',
    playbookContext: 'Forms the underlying graph data structure for all policy and governance definitions in the platform.',
    playbookSection: 'Section 1 & Section 2',
    relatedTerms: ['owl2', 'turtle', 'provo']
  },
  {
    id: 'turtle',
    term: 'Turtle Syntax',
    acronym: '.ttl',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'A compact, human-readable textual syntax for expressing RDF graphs.',
    fullDefinition: 'Turtle (Terse RDF Triple Language) provides an intuitive prefix-based format for writing RDF graphs, widely preferred over verbose XML representations.',
    playbookContext: 'All ontology and shape definitions in `ontology/*.ttl` and test fixtures in `tests/fixtures/*.ttl` are written in Turtle.',
    playbookSection: 'Section 2 (Repository Structure)',
    relatedTerms: ['rdf', 'owl2']
  },
  {
    id: 'jsonld',
    term: 'JSON-LD',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'A lightweight Linked Data format using standard JSON syntax to serialize RDF graphs.',
    fullDefinition: 'JSON for Linking Data (JSON-LD) serializes RDF graph triples into structured JSON objects. It enables frontend applications (such as Cytoscape.js) and search engines to consume semantic data seamlessly.',
    playbookContext: 'Generated by `compiler/build_graph.py` from RDF/OWL files for ingestion into the Cytoscape web explorer.',
    playbookSection: 'Section 2 (compiler/build_graph.py)',
    relatedTerms: ['rdf', 'cytoscape']
  },
  {
    id: 'owa',
    term: 'Open-World Assumption',
    acronym: 'OWA',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'The reasoning logic where absence of a statement implies it is currently unknown, rather than false.',
    fullDefinition: 'In standard semantic web logic (OWL), knowledge is assumed incomplete. If a researcher graph lacks an explicit `isAccredited true` assertion, an OWA reasoner cannot conclude they are unaccredited; it assumes the fact is merely unstated. This paradigm is unsafe for cybersecurity access control.',
    playbookContext: 'Section 1 explicitly calls out the need to resolve OWA into CWA for deterministic security enforcement.',
    playbookSection: 'Section 1. Project Overview & Objectives',
    relatedTerms: ['cwa', 'shacl', 'owl2']
  },
  {
    id: 'cwa',
    term: 'Closed-World Assumption',
    acronym: 'CWA',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'The security logic where anything not explicitly proven or present is treated as false and access is denied.',
    fullDefinition: 'Zero-trust cybersecurity requires Closed-World reasoning: if a user cannot demonstrate positive proof of ethics approval or valid IG training, access must be unconditionally denied. SHACL shapes enforce CWA over RDF graphs.',
    playbookContext: 'Resolved via SHACL shapes in Phase 2 to ensure deterministic pass/fail security decisions.',
    playbookSection: 'Section 1 & Section 3 (Phase 2)',
    relatedTerms: ['owa', 'shacl', 'rego']
  },
  {
    id: 'shacl',
    term: 'SHACL (Shapes Constraint Language)',
    acronym: 'SHACL',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'W3C standard language for validating RDF graphs against declared node shapes and property constraints.',
    fullDefinition: 'SHACL defines structural rules (NodeShapes and PropertyShapes) that test RDF data for cardinality, datatypes, values, and closed-world constraints, producing standard validation reports.',
    playbookContext: 'Used in `ontology/shapes/access-shapes.ttl` and `sdc_shapes.ttl` to validate workspace sessions and export artifacts.',
    playbookSection: 'Section 2 & Section 3 (Phase 2)',
    exampleSnippet: `tre:WorkspaceAdmissionShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
    ] .`,
    relatedTerms: ['cwa', 'pyshacl', 'sdc', 'nodeshape', 'propertyshape']
  },
  {
    id: 'nodeshape',
    term: 'SHACL NodeShape',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'A shape that applies constraints directly to focus nodes (e.g. instances of a target RDF class).',
    fullDefinition: 'In SHACL, a `sh:NodeShape` targets specific graph nodes (e.g. `sh:targetClass tre:WorkspaceSession`) and binds property constraints that the node must satisfy to pass validation.',
    playbookContext: 'Used in `access-shapes.ttl` (`tre:WorkspaceAdmissionShape`) and `sdc_shapes.ttl` (`tre:AirlockOutputShape`).',
    playbookSection: 'Section 2 & Section 3 (Phase 2)',
    relatedTerms: ['shacl', 'propertyshape']
  },
  {
    id: 'propertyshape',
    term: 'SHACL PropertyShape',
    category: 'Semantic Web & Ontologies',
    shortDefinition: 'A shape that specifies constraints on property values reachable along a specified path.',
    fullDefinition: 'Specifies cardinality (`sh:minCount`, `sh:maxCount`), datatype (`sh:datatype xsd:integer`), numeric bounds (`sh:minInclusive 10`), or value constraints (`sh:hasValue true`) for a given RDF predicate.',
    playbookContext: 'Used to enforce primary suppression (`sh:minInclusive 10`) and dominance (`sh:maxInclusive 0.80`).',
    playbookSection: 'Section 2 & Section 3 (Phase 2)',
    relatedTerms: ['shacl', 'nodeshape']
  },

  // --- Policy Enforcement & Security ---
  {
    id: 'opa',
    term: 'Open Policy Agent',
    acronym: 'OPA',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'An open-source, general-purpose policy engine that enables unified, context-aware policy enforcement across the cloud stack.',
    fullDefinition: 'OPA decouples policy decisions from application code. In this architecture, OPA acts as the high-speed Policy Decision Point (PDP) evaluating admission reviews and airlock requests against compiled Rego files.',
    playbookContext: 'Target runtime engine located in `security/opa/policy.rego` and `authz.rego`.',
    playbookSection: 'Section 1, Section 2 & Section 3 (Phase 4)',
    relatedTerms: ['rego', 'pep', 'pdp']
  },
  {
    id: 'rego',
    term: 'Rego Policy Language',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'The declarative query language used by Open Policy Agent to express complex, low-latency authorization policies.',
    fullDefinition: 'Rego allows policies to be evaluated against JSON request payloads in microseconds. In this playbook, semantic Turtle rules and SDC mathematical thresholds are compiled into Rego by `compiler/rdf_to_rego.py`.',
    playbookContext: 'Written in `security/opa/policy.rego` and `authz.rego`.',
    playbookSection: 'Section 1, Section 2 & Section 3 (Phase 4)',
    exampleSnippet: `package tre.authz
default allow = false
allow {
    input.researcher.accreditation_valid == true
    input.enclave.egress_blocked == true
}`,
    relatedTerms: ['opa', 'pep', 'pac']
  },
  {
    id: 'pep',
    term: 'Policy Enforcement Point',
    acronym: 'PEP',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'The architectural component (e.g. Kubernetes admission controller or API gateway) that intercepts user actions and enforces decisions.',
    fullDefinition: 'PEPs guard entry and exit points. When a researcher creates a compute pod or requests file egress, the PEP intercepts the request and submits it to OPA for an authorization verdict.',
    playbookContext: 'Implemented in Phase 4 for Kubernetes workspace admission and network airlock egress interception.',
    playbookSection: 'Section 3 (Phase 4: Policy Enforcement Points)',
    relatedTerms: ['pdp', 'opa', 'safe-setting', 'k8s-admission']
  },
  {
    id: 'pdp',
    term: 'Policy Decision Point',
    acronym: 'PDP',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'The authorization authority (OPA) that evaluates policy logic against request inputs and returns an allow/deny decision.',
    fullDefinition: 'Decoupled from enforcement points, the PDP ingests context (user role, project status, cell counts) and runs compiled Rego rules to return a boolean verdict and violation reasons.',
    playbookContext: 'Provided by the OPA server running `security/opa/authz.rego`.',
    playbookSection: 'Section 3 (Phase 4)',
    relatedTerms: ['pep', 'opa', 'rego']
  },
  {
    id: 'k8s-admission',
    term: 'Kubernetes Admission Controller',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'Restricted-namespace admission controller that evaluates pod creation against OPA rules using an audit-and-alert pattern.',
    fullDefinition: 'Operates as a Policy Enforcement Point (PEP) within scoped research namespaces (e.g., research-sandbox) under least-privilege RBAC. It avoids fragile cluster-wide blocking webhooks by using an audit-and-alert pattern (`failurePolicy: Ignore`), logging any policy discrepancies for IG committee review without risking cluster instability.',
    playbookContext: 'Audits workspace provisioning requests in Phase 4.',
    playbookSection: 'Section 3 (Phase 4: Workspace Admission)',
    relatedTerms: ['pep', 'opa', 'rego', 'least-privilege']
  },
  {
    id: 'airlock',
    term: 'Secure Airlock Egress Control',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'A gated transfer mechanism ensuring files leaving the TRE are reviewed and sanitized against disclosure risks.',
    fullDefinition: 'The airlock is the sole mechanism through which code, tables, and reports can be exported outside the TRE. All exports undergo automated Statistical Disclosure Control (SDC) shape validation followed by independent human airlock reviewer sign-off.',
    playbookContext: 'Automated via `sdc_shapes.ttl` and `compiler/rdf_to_rego.py` in Phase 4.',
    playbookSection: 'Section 3 (Phase 4: Network & Egress Controls)',
    relatedTerms: ['safe-output', 'sdc', 'primary-suppression']
  },
  {
    id: 'zero-egress',
    term: 'Zero-Egress Network Architecture',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'Network configuration where cloud compute enclaves have external internet routing disabled.',
    fullDefinition: 'Ensures that researcher virtual machines and containers cannot open outbound TCP/UDP connections to public internet hosts, preventing accidental or intentional exfiltration of microdata.',
    playbookContext: 'Enforced via `tre:enclaveEgressBlocked true` in access-shapes.ttl and Rego.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['safe-setting', 'airlock']
  },

  // --- Statistical Disclosure Control (SDC) ---
  {
    id: 'sdc',
    term: 'Statistical Disclosure Control',
    acronym: 'SDC',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Mathematical techniques and rules applied to analytical outputs to prevent identification of individual data subjects.',
    fullDefinition: 'A formal discipline of privacy-preserving computation that evaluates and transforms analytical outputs (tables, model weights, graphs, survival curves) to prevent identity, attribute, and inferential disclosure. SDC operates on the fundamental principle that merely removing direct identifiers (names, addresses) does NOT render person-level data anonymous.',
    playbookContext: 'Defined in `ontology/sdc_rules.ttl` as machine-enforceable thresholds and compiled into automated airlock checks.',
    playbookSection: 'Phase 3 (Section 3.xx) & Phase 4 (Section 4.xx)',
    exampleSnippet: `# Common SDC Rules & Analytical Applications Matrix:
1. Primary Cell Suppression: k >= 10 (or k >= 5). Any count between 1 and k-1 is suppressed.
2. Dominance / (n, k) Rule: Top 1 contributor <= 50%, top 2 contributors <= 80% of aggregate sum.
3. Quasi-Identifiers: Dates of birth, admission/discharge timestamps, partial postcodes, and rare diagnoses form high-dimensional fingerprints that re-identify individuals even without names.
4. Logistic Regression: Suppress extreme odds ratios and parameter estimates where contingency cells are sparse (preventing quasi-complete separation disclosure).
5. Survival Analysis (Kaplan-Meier): Smooth or truncate survival curves when the active risk set falls below 10; suppress individual tick marks for censored patients.
6. Continuous Statistics: Suppress true minimums and maximums; replace with 5th and 95th percentiles.`,
    relatedTerms: ['primary-suppression', 'dominance-rule', 'k-anonymity', 'safe-output', 'quasi-identifiers']
  },
  {
    id: 'quasi-identifiers',
    term: 'Quasi-Identifiers & Longitudinal Linkage',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Indirect attributes (e.g. appointment dates, birth month, partial postcode) that, when combined, uniquely identify individuals despite absence of names.',
    fullDefinition: 'Indirect identifying variables (including appointment timestamps, hospital admission/discharge dates, birth year/month, partial postcode districts e.g. SW1A, sex, ethnicity, and rare clinical diagnosis codes). Sweeney’s landmark theorem demonstrated that 87% of the US/UK population is uniquely identifiable by just 5-digit ZIP code/postcode, gender, and date of birth. In healthcare research, removing patient names does not confer true anonymity: linking multiple quasi-identifiers against voter registries, local news, or obituary notices can immediately re-identify patients. Under UK GDPR and Caldicott Principle 1, such row-level datasets remain confidential personal data requiring strict airlock suppression, k-anonymity grouping, and AST scrubbing.',
    playbookContext: 'Enforced through strict tiering in governance_core.ttl, SHACL validation in sdc_shapes.ttl, and pre-prompt AST scrubbing for LLM queries.',
    playbookSection: 'Phase 1 (Section 1.xx) & Phase 3 (Section 3.xx)',
    exampleSnippet: `# Quasi-Identifier Linkage Risk Vector:
# Patient Record: { Age: 54, Postcode: "PE21 8**", Appt: "2024-03-12 14:30", Diagnosis: "E11.9" }
# External Gazette: "54-year-old local councilor hospitalized following road accident on March 12"
# Result: Direct re-identification without NHS number.
# Defense: Enforce k-anonymity >= 10, date jittering (+/- 14 days), and 2-character postcode aggregation.`,
    relatedTerms: ['sdc', 'safe-data', 'primary-suppression', 'k-anonymity']
  },
  {
    id: 'primary-suppression',
    term: 'Primary Cell Suppression (k >= 10)',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Masking or suppressing any table cell containing fewer than 10 individuals to prevent identification of small cohorts.',
    fullDefinition: 'Under ONS and SAIL guidelines, if a frequency cell has a value between 1 and 9 ($k < 10$), releasing it poses high re-identification risk. The cell count must be replaced with an asterisk or combined with another category.',
    playbookContext: 'Enforced via `tre:minObservedCellCount >= 10` in `sdc_shapes.ttl` and `authz.rego`.',
    playbookSection: 'Section 3 (Phase 1: Quantitative SDC)',
    exampleSnippet: `tre:minObservedCellCount sh:minInclusive 10 .`,
    relatedTerms: ['sdc', 'dominance-rule', 'k-anonymity', 'secondary-suppression']
  },
  {
    id: 'dominance-rule',
    term: 'Dominance Rule (k% <= 80%)',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Ensuring that the single highest contributor does not account for more than 80% of an aggregated metric.',
    fullDefinition: 'Also known as the $(n, k)$ rule or $(1, 80\%)$ rule. If a single clinical patient or clinic accounts for more than 80% of a total numerical value (e.g. drug costs or clinic visits), outsiders can deduce individual attributes.',
    playbookContext: 'Enforced via `tre:topContributorDominanceRatio <= 0.80` in `sdc_shapes.ttl`.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['sdc', 'primary-suppression']
  },
  {
    id: 'secondary-suppression',
    term: 'Secondary (Residual) Suppression',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Suppressing additional non-sensitive cells to prevent deriving primary suppressed cells from row or column totals.',
    fullDefinition: 'If a row has a total of 50 and one cell with count 7 is primary suppressed (masked with *), an adversary can deduce 7 by subtracting the remaining cells from 50. Secondary suppression masks a second non-sensitive cell to preserve the mathematical uncertainty.',
    playbookContext: 'Crucial operational requirement cited in `sdc_rules.ttl` and airlock review procedures.',
    playbookSection: 'Section 2 (sdc_rules.ttl) & Section 3',
    relatedTerms: ['sdc', 'primary-suppression']
  },
  {
    id: 'k-anonymity',
    term: 'k-Anonymity',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'A formal mathematical privacy model where each record is indistinguishable from at least k-1 other individuals.',
    fullDefinition: 'A dataset satisfies $k$-anonymity if the quasi-identifiers (such as age, sex, postcode district) for each person are identical to at least $k-1$ other individuals in the dataset.',
    playbookContext: 'Cited in `sdc_rules.ttl` as a key foundation for tabular clinical output clearance.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['sdc', 'primary-suppression', 'quasi-identifiers']
  },
  {
    id: 'ons-sail',
    term: 'ONS & SAIL Guidelines',
    category: 'Disclosure Control (SDC)',
    shortDefinition: 'Standard disclosure control rulebooks published by the UK Office for National Statistics and the Secure Anonymised Information Linkage Databank.',
    fullDefinition: 'Authoritative clinical and public data governance bodies whose thresholds ($k \\ge 10$, dominance $\\le 80\%$, secondary suppression) form the basis of the quantitative rules in `sdc_rules.ttl`.',
    playbookContext: 'Referenced in `ontology/sdc_rules.ttl` as the authority for quantitative thresholds.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['sdc', 'primary-suppression', 'dominance-rule']
  },

  // --- AI & Autonomous Agents ---
  {
    id: 'eu-ai-act',
    term: 'EU AI Act Risk Tiers',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'European Union legislation categorizing AI applications into Unacceptable, High, Limited, and Minimal risk levels.',
    fullDefinition: 'The European Union artificial intelligence regulatory framework. In the TRE, analytical agent workloads are classified into risk tiers, imposing audit trails, human oversight, and data governance limits on high-risk clinical models.',
    playbookContext: 'Section 1 & Section 3 establish AI governance directly mapped to EU AI Act tiers in `agent_mcp.ttl`.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['mcp', 'agent-mcp']
  },
  {
    id: 'mcp',
    term: 'Model Context Protocol (MCP)',
    acronym: 'MCP',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'An open protocol standardizing how AI models and agents securely discover and invoke external tools and data context.',
    fullDefinition: 'Model Context Protocol defines structured JSON-RPC interfaces for agent tool invocation. In the TRE, MCP boundaries (`agent_mcp.ttl`) strictly govern what tools autonomous agents can call, capping rows and blocking external internet egress.',
    playbookContext: 'Defines autonomous agent boundaries (`mcp:ExecuteSQL`, `mcp:ExportSummary`) in `ontology/agent_mcp.ttl`.',
    playbookSection: 'Section 1, Section 2 & Section 3 (Phase 1)',
    exampleSnippet: `mcp:ExecuteSQLReadOnly a mcp:MCPTool ;
    mcp:allowedStatements "SELECT", "EXPLAIN" ;
    mcp:maxRowsReturned 500 .`,
    relatedTerms: ['eu-ai-act', 'safe-setting', 'mcp-sql', 'mcp-export']
  },
  {
    id: 'mcp-sql',
    term: 'mcp:ExecuteSQL Boundary',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Restricted MCP database tool granting agents read-only SELECT access with max row limits.',
    fullDefinition: 'Constrains autonomous agents to read-only queries (`SELECT`, `EXPLAIN`). Destructive DDL/DML statements (`DROP`, `ALTER`, `UPDATE`, `INSERT`, `TRUNCATE`) are structurally barred at the policy level.',
    playbookContext: 'Declared in `ontology/agent_mcp.ttl` and verified by OPA before query execution.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['mcp', 'eu-ai-act']
  },
  {
    id: 'mcp-export',
    term: 'mcp:ExportSummary Boundary',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'MCP tool routing agent-generated summary tables directly through automated SDC shape verification.',
    fullDefinition: 'When an LLM agent generates an output table or summary, `mcp:ExportSummary` forces the candidate artifact through `sdc_shapes.ttl` before handoff to the human airlock reviewer.',
    playbookContext: 'Modeled in `ontology/agent_mcp.ttl`.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & 4)',
    relatedTerms: ['mcp', 'sdc', 'safe-output']
  },

  // --- Operations, Testing & Provenance ---
  {
    id: 'provo',
    term: 'W3C PROV-O (Provenance Ontology)',
    acronym: 'PROV-O',
    category: 'Operations & Testing',
    shortDefinition: 'W3C standard ontology for representing entities, activities, and agents involved in producing data or making decisions.',
    fullDefinition: 'PROV-O models who accessed what, when, and under which policy version. The TRE Policy-as-Code engine emits immutable PROV-O RDF triples on every workspace provisioning and airlock egress decision to an append-only audit ledger.',
    playbookContext: 'Emitted to an append-only audit ledger in Phase 4 for complete forensic provenance.',
    playbookSection: 'Section 3 (Phase 4: Audit Lineage)',
    exampleSnippet: `tre:AdmissionEvent a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_PDP ;
    prov:generated tre:AuthorizationDecision .`,
    relatedTerms: ['rdf', 'pep', 'opa']
  },
  {
    id: 'pyshacl',
    term: 'PySHACL Test Harness',
    category: 'Operations & Testing',
    shortDefinition: 'A Python validator implementing the W3C SHACL standard, executed in automated CI test suites.',
    fullDefinition: 'PySHACL is used in `tests/test_shapes.py` to evaluate test graph fixtures (`valid-session.ttl`, `noncompliant-session.ttl`) in CI before any code or policy is compiled for production.',
    playbookContext: 'Run via `pytest tests/test_shapes.py -v` during local development and GitHub Actions CI.',
    playbookSection: 'Section 2, Section 3 & Section 4',
    relatedTerms: ['shacl', 'gitops']
  },
  {
    id: 'cytoscape',
    term: 'Cytoscape.js Knowledge Graph',
    category: 'Operations & Testing',
    shortDefinition: 'An open-source graph theory library for interactive graph analysis and visualization in modern web browsers.',
    fullDefinition: 'Cytoscape.js renders the full OWL ontology, SHACL shapes, and MCP tool relationships as an interactive, draggable network diagram in the TRE dual-persona portal.',
    playbookContext: 'Used in `web/app.js` and generated by `compiler/build_graph.py` in Phase 3.',
    playbookSection: 'Section 1, Section 2 & Section 3 (Phase 3)',
    relatedTerms: ['owl2', 'tre', 'jsonld']
  },
  {
    id: 'gitops',
    term: 'GitOps CI/CD Workflow',
    category: 'Operations & Testing',
    shortDefinition: 'Managing infrastructure and governance policies where Git commits automatically trigger semantic linting, tests, and deployment.',
    fullDefinition: 'All changes to Turtle ontologies or SHACL shapes undergo version-controlled pull requests, automated PySHACL testing in `.github/workflows/ci.yml`, and automatic compilation into OPA Rego rules.',
    playbookContext: 'Established in Phase 1 and automated with the project `Makefile`.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    relatedTerms: ['pyshacl', 'rego', 'pac']
  },
  {
    id: 'makefile',
    term: 'Project Makefile Automation',
    category: 'Operations & Testing',
    shortDefinition: 'Standard developer automation commands orchestrating install, test, compilation, and serving.',
    fullDefinition: 'Provides simple developer commands: `make install` (Python dependencies), `pytest tests/test_shapes.py -v` (SHACL tests), `python compiler/generate_docs.py` (FOI docs), `make build` (compiles to Rego and Cytoscape JSON), and `make serve` (local portal).',
    playbookContext: 'Documented in Section 4 of the playbook.',
    playbookSection: 'Section 4. Verification & Developer Workflow Commands',
    relatedTerms: ['gitops', 'pyshacl']
  },

  // --- Safe Digital Data Enclaves Taxonomy ---
  {
    id: 'vde',
    term: 'Virtual Data Enclave',
    acronym: 'VDE',
    category: 'Governance & Frameworks',
    shortDefinition: 'A generic, overarching term for a remote virtual machine or desktop environment providing restricted access to confidential microdata without permitting raw file export.',
    fullDefinition: 'Widely used across academic, census, and social sciences (e.g., ICPSR, NORC, US Census Bureau), a Virtual Data Enclave (VDE) prevents users from moving, printing, or copying data to outside workstations. A TRE or SDE is a specialized healthcare-grade evolution of the broader VDE paradigm with automated clinical governance and quantitative disclosure controls.',
    playbookContext: 'The overarching technical architectural pattern upon which Trusted Research Environments (TREs) and Secure Data Environments (SDEs) are founded.',
    playbookSection: 'Section 1. Project Overview & Objectives',
    relatedTerms: ['tre', 'dcr', 'dsh', 'safe-setting']
  },
  {
    id: 'dcr',
    term: 'Data Clean Room',
    acronym: 'DCR',
    category: 'Governance & Frameworks',
    shortDefinition: 'A privacy-preserving collaboration environment enabling multiple parties to combine and analyze disparate datasets without either party viewing the other\'s raw records.',
    fullDefinition: 'Data Clean Rooms (DCRs) operate on cryptographic, federated, or differential privacy guarantees. Unlike open-ended research enclaves, clean rooms typically restrict interactions to predefined SQL aggregations, homomorphic operations, or machine learning model training without granting exploratory shell access to raw rows.',
    playbookContext: 'Related safe data enclave pattern increasingly used when NHS Trusts partner with pharmaceutical research or external health data providers.',
    playbookSection: 'Section 1. Project Overview & Objectives',
    relatedTerms: ['vde', 'tre', 'sdc']
  },
  {
    id: 'dsh',
    term: 'Data Safe Haven',
    acronym: 'DSH',
    category: 'Governance & Frameworks',
    shortDefinition: 'The statutory UK / Scottish term for an accredited secure computing environment providing managed research access to NHS electronic health records.',
    fullDefinition: 'Established in Scotland (e.g., Electronic Data Research and Innovation Service - eDRIS, and regional NHS Safe Havens), Data Safe Havens operate under the Scottish Health Informatics Programme (SHIP) charter and ISO 27001 standards, embodying the Five Safes framework.',
    playbookContext: 'The Scottish and regional NHS predecessor and counterpart to modern national Secure Data Environments (SDEs).',
    playbookSection: 'Section 1 & Section 3',
    relatedTerms: ['tre', 'vde', 'five-safes']
  },
  {
    id: 'tee',
    term: 'Confidential Computing / TEE',
    acronym: 'TEE',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'Hardware-enforced secure processor enclaves (e.g. AMD SEV, Intel SGX, AWS Nitro) that protect data in memory even from cloud hypervisors and root administrators.',
    fullDefinition: 'Trusted Execution Environments (TEEs) extend enclave protection down to the physical silicon. While traditional TREs protect data at rest and in transit, Confidential Computing protects "data in use" by encrypting CPU memory registers, ensuring that even rogue cloud provider administrators cannot inspect decrypted patient records or model parameters.',
    playbookContext: 'Forms the underlying silicon-level enclave foundation for next-generation sovereign healthcare cloud enclaves.',
    playbookSection: 'Section 3 (Phase 1 & Phase 4: Computing Infrastructure)',
    relatedTerms: ['safe-setting', 'zero-egress']
  },

  // --- LLM & AI Coding Assistant Security ---
  {
    id: 'llm-prompt-leakage',
    term: 'Prompt-Level PII / PHI Leakage',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'The inadvertent transmission of confidential patient names, NHS numbers, or sample rows to external LLM APIs via developer code completions or agent context windows.',
    fullDefinition: 'When developers use coding assistants like GitHub Copilot, Cline, or OpenAI Codex inside an IDE, the tool automatically scrapes surrounding open files, variable previews, active editor buffers, and git diffs to formulate prompt context. If real patient records or sample CSVs are open in the workspace, person-level data is serialized into prompt payloads and transmitted across the network.',
    playbookContext: 'Addressed in agent_mcp.ttl by enforcing strict AST-level masking, context exclusions, and blocking direct external commercial LLM endpoints from the enclave.',
    playbookSection: 'Section 1 & Section 3 (Phase 1: AI Governance)',
    relatedTerms: ['copilot-ignore', 'ast-scrubbing', 'mcp', 'in-enclave-llm']
  },
  {
    id: 'in-enclave-llm',
    term: 'In-Enclave Air-Gapped LLM Inference',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Hosting self-contained, open-weights code generation models (e.g. Qwen-Coder, DeepSeek-Coder, Llama 3) inside the zero-egress enclave GPU cluster.',
    fullDefinition: 'An architectural pattern for AI code assistance within secure digital enclaves: inference runs entirely on local enclave accelerator nodes (via vLLM, Triton, or TensorRT-LLM). No prompt tokens, code snippets, or variable contents exit the isolated enclave perimeter, addressing external exfiltration vectors.',
    playbookContext: 'Direct implementation of the zero-egress mandate in `ontology/tre-core.ttl` and `agent_mcp.ttl`.',
    playbookSection: 'Section 1 & Section 3 (Phase 1 & 4)',
    exampleSnippet: `# Local In-Enclave OpenAI-compatible endpoint:
export OPENAI_BASE_URL="http://vllm-cluster.enclave.internal:8000/v1"
export OPENAI_API_KEY="enclave-internal-token"`,
    relatedTerms: ['zero-egress', 'llm-prompt-leakage', 'copilot-ignore']
  },
  {
    id: 'copilot-ignore',
    term: '.copilotignore & .clineignore Enclave Policies',
    category: 'Policy Enforcement & Security',
    shortDefinition: 'Advisory client-side file exclusion patterns for IDE assistants, requiring non-bypassable host controls for true isolation.',
    fullDefinition: 'Developer tools like GitHub Copilot, Cline, and Cursor honor content exclusion files (`.copilotignore`, `.clineignore`, `.cursorignore`). In a safe digital enclave, automated GitOps scripts synthesize and place these files in repository roots to prevent accidental ingestion of data directories (`/data/`, `*.parquet`, `*.csv`) into prompt context windows.\n\nArchitectural Reference Note: Client-side ignore files are an advisory developer heuristic, NOT a security guarantee. Subprocesses, user shell overrides, or extension parser bugs can bypass client filters. Consequently, trusted research enclaves must back ignore files with non-bypassable host controls: read-only POSIX directory permissions (chmod 400), isolated storage subnets without WAN routing, and pre-prompt AST token proxy inspection.',
    playbookContext: 'Generated during GitOps repository bootstrapping in Phase 1.',
    playbookSection: 'Section 2 & Section 3 (Phase 1)',
    exampleSnippet: `# .clineignore / .copilotignore (Advisory Client Filter - Must be paired with read-only filesystem controls)
/data/**
*.csv
*.parquet
*.feather
*.json
/tests/fixtures/*.ttl`,
    relatedTerms: ['llm-prompt-leakage', 'ast-scrubbing', 'safe-data']
  },
  {
    id: 'ast-scrubbing',
    term: 'AST-Based Pre-Prompt Sanitizer',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'A local language server plugin that parses code Abstract Syntax Trees and replaces string literals, mock records, and identifiers with synthetic tokens before LLM dispatch.',
    fullDefinition: 'Prior to sending prompt buffers to any coding model, an AST pre-processor traverses all syntax tree literal nodes. Any potential NHS numbers, patient dates, or clinical cohort arrays are replaced with dummy synthetic values (`SYNTHETIC_NHS_NUM_001`), ensuring real clinical data never reaches the language model.',
    playbookContext: 'Enforces the Safe Data and Safe Output dimensions for autonomous agents and developer tooling.',
    playbookSection: 'Section 3 (Phase 1: AI Governance)',
    relatedTerms: ['llm-prompt-leakage', 'copilot-ignore', 'sdc']
  },
  {
    id: 'zdr-baa',
    term: 'Zero Data Retention (ZDR) & BAA',
    acronym: 'ZDR / BAA',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Enterprise cloud legal and technical agreements guaranteeing that LLM vendors do not store, log, or train on submitted prompt data.',
    fullDefinition: 'When commercial LLM APIs must be connected via private network interconnects (e.g., Azure OpenAI Private Endpoint, AWS Bedrock VPC Endpoint), Zero Data Retention (ZDR) guarantees that prompt buffers are processed strictly in transient RAM and discarded immediately. A Business Associate Agreement (BAA) and NHS Data Processing Addendum legally enforce these provisions.',
    playbookContext: 'Mandatory statutory and governance prerequisite in `governance_core.ttl` before approving any external cloud model adapter.',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    relatedTerms: ['in-enclave-llm', 'llm-prompt-leakage', 'uk-gdpr']
  },
  // --- Wavebound Problem Space & Flow Governance ---
  {
    id: 'seawater-problem-space',
    term: 'Wavebound Problem Space & Tidal Flow Model',
    acronym: 'Project Wavebound',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'The governance model for data analysis & intelligence platforms: managing dynamic data flows where ingress enforces access controls, Safe People, and Safe Projects, and egress enforces statistical disclosure control.',
    fullDefinition: 'Clinical and genomic research takes place within an active, continuous data problem space dubbed "Wavebound". Analytics workloads (ranging from exploratory query scripts to distributed foundation model pipelines) must navigate regulatory requirements, clinical governance channels, and patient confidentiality thresholds. The tide flows cyclically across two managed boundaries: Ingress and Egress. Ingress enforces gateway access controls, researcher accreditation, institutional identity verification, and Information Governance training (Safe People), alongside approved REC ethics protocols and Section 251 CAG exemptions (Safe Projects). Inbound clinical datasets, multi-omics records, and container workloads are verified at the boundary using W3C SHACL shape validation before admission. Egress regulates the export of derived analytical findings, statistical summaries, and model parameters, requiring automated Statistical Disclosure Control (SDC) checks, k-anonymity (k >= 10), and sub-millisecond Open Policy Agent (OPA) Rego policy evaluations to prevent patient re-identification.',
    playbookContext: 'The overarching architectural concept of Project Wavebound: transforming traditional manual governance into continuous, microsecond-latency policy-as-code navigation.',
    playbookSection: 'Section 0. Executive Summary & Problem Space',
    relatedTerms: ['tre', 'five-safes', 'pac', 'shacl', 'opa']
  },
  // --- International Standards (ISO) & Clinical Safety (DCB) ---
  {
    id: 'iso-42001',
    term: 'ISO/IEC 42001:2023 Artificial Intelligence Management System',
    acronym: 'ISO/IEC 42001 (AIMS)',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'The international standard specifying requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System (AIMS).',
    fullDefinition: 'ISO/IEC 42001:2023 is the world’s first certifiable standard for AI management. Within data analysis & intelligence platforms such as TREs and SDEs, it provides the governance architecture for managing AI risks, algorithmic transparency, automated continuous monitoring, data provenance, and ethical accountability across predictive and generative AI lifecycles.',
    playbookContext: 'Directly mapped into Section 3 (Phase 3 AI Governance) and compiled into SHACL node shapes validating model risk classification and training data lineage.',
    playbookSection: 'Section 3. Implementation Phases (Phase 3: AI & Dual-Persona Enclave Governance)',
    relatedTerms: ['eu-ai-act', 'iso-5259', 'dcb-0129-0160', 'samd-uk-mdr']
  },
  {
    id: 'iso-13485',
    term: 'ISO 13485:2016 Medical Devices Quality Management',
    acronym: 'ISO 13485 (QMS)',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'Harmonized standard specifying requirements for a quality management system where an organization designs and develops medical devices and software (SaMD).',
    fullDefinition: 'ISO 13485 establishes strict quality management system (QMS) requirements for medical device design, risk control, software verification, and traceability. When research algorithms in data analysis & intelligence platforms transition toward clinical decision support or SaMD, compliance with ISO 13485 ensures reproducible pipelines, strict configuration management, and audited deployment controls.',
    playbookContext: 'Governs the transition of models trained in the platform into clinical trials or health technology deployments.',
    playbookSection: 'Section 3. Implementation Phases (Phase 3 & Phase 4)',
    relatedTerms: ['iso-14971', 'samd-uk-mdr', 'dcb-0129-0160']
  },
  {
    id: 'iso-14971',
    term: 'ISO 14971:2019 Medical Device Risk Management',
    acronym: 'ISO 14971',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'The international standard for the application of risk management to medical devices, estimating hazards and evaluating clinical risks throughout the AI/ML lifecycle.',
    fullDefinition: 'ISO 14971 provides the formal methodology for identifying hazards, estimating clinical risks, evaluating risk acceptability, implementing risk control measures, and monitoring post-market effectiveness. In the context of Project Wavebound, it aligns with DCB0129 clinical hazard logs for models exiting the airlock.',
    playbookContext: 'Required risk management framework when evaluating egressed algorithms intended for clinical decision influence.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    relatedTerms: ['iso-13485', 'dcb-0129-0160', 'samd-uk-mdr']
  },
  {
    id: 'dcb-0129-0160',
    term: 'DCB0129 & DCB0160 Clinical Risk Management',
    acronym: 'DCB0129 / DCB0160',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'Mandatory NHS clinical safety standards: DCB0129 governs health software manufacturers; DCB0160 governs deploying healthcare organizations, led by a nominated Clinical Safety Officer (CSO).',
    fullDefinition: 'Under the Health and Social Care Act 2012, DCB0129 and DCB0160 are legally mandatory Information Standards in the NHS. DCB0129 requires software developers to conduct formal Clinical Safety Case Reports and Hazard Logs under a registered clinician acting as Clinical Safety Officer (CSO). DCB0160 requires NHS deployment organizations to evaluate local deployment risks before enabling clinical software or algorithmic tools in care pathways.',
    playbookContext: 'Enforced at the airlock for any analytic tool or clinical algorithm egressed from the platform destined for NHS Trust deployment.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    relatedTerms: ['samd-uk-mdr', 'caldicott', 'iso-14971', 'iso-42001', 'cso', 'cscr', 'hazard-log'],
    furtherResourceId: 'res-dcb-0129',
    externalUrl: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems',
    statutoryBasis: 'Health and Social Care Act 2012; NHS Information Standards DCB0129 & DCB0160',
    governanceSafeguards: [
      'Statutory clinical risk management compliance mandatory for deploying health software.',
      'Nominated Clinical Safety Officer oversight across manufacture and deployment lifecycles.',
      'Living Clinical Hazard Log with quantified clinical severity and probability ratings.'
    ]
  },
  {
    id: 'cso',
    term: 'Clinical Safety Officer (CSO)',
    acronym: 'CSO',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'A clinician registered with a UK regulatory body (GMC, NMC, GPhC, HCPC) holding personal statutory accountability for clinical risk management under DCB0129 and DCB0160.',
    fullDefinition: 'Under NHS Digital Information Standards DCB0129 and DCB0160, the Clinical Safety Officer (CSO) is a suitably qualified, experienced, and actively registered healthcare professional (holding current registration with GMC, NMC, GPhC, or HCPC) who has completed accredited NHS clinical safety training. The CSO holds personal statutory accountability for ensuring that clinical risk management is rigorously conducted throughout the lifecycle of health software. The CSO operates with clinical independence and cannot be overruled by commercial managers or technical leads; they oversee hazard identification, assess clinical consequences, review the Hazard Log, and formally sign off the Clinical Safety Case Report (CSCR) prior to production deployment.',
    playbookContext: 'Enforces clinical accountability for algorithmic tools and data pipelines; CSO sign-off is a prerequisite for Milestone Gate D-006 before health analytics tools deploy to NHS Trusts.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    statutoryBasis: 'Health and Social Care Act 2012; NHS Information Standards DCB0129 § 3.2 & DCB0160 § 3.2',
    governanceSafeguards: [
      'Active UK clinical registration (GMC/NMC/GPhC/HCPC) with accredited NHS clinical risk training.',
      'Unconditional statutory right of veto on clinical deployment regardless of executive or commercial pressure.',
      'Personal sign-off required on Clinical Safety Case Reports and residual risk acceptance.'
    ],
    furtherResourceId: 'res-dcb-0129',
    externalUrl: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems',
    relatedTerms: ['dcb-0129-0160', 'cscr', 'hazard-log', 'samd-uk-mdr', 'iso-14971']
  },
  {
    id: 'cscr',
    term: 'Clinical Safety Case Report (CSCR)',
    acronym: 'CSCR',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'A structured, evidence-based safety argument presenting the clinical risk profile, mitigations, and justification for deploying health software or analytics pipelines into clinical pathways.',
    fullDefinition: 'Mandated under DCB0129 Section 3.4 and DCB0160 Section 3.4, the Clinical Safety Case Report (CSCR) is the formal deliverable synthesizing all clinical risk management activities undertaken during health software development and deployment. The CSCR articulates a structured, evidence-based argument demonstrating that the software or algorithmic pipeline is acceptably safe for its intended clinical use. Key elements include: (1) definition of clinical scope, patient cohort, and intended clinical environment; (2) identification of all potential hazardous situations and failure modes; (3) clinical risk evaluation linking directly to the Hazard Log; (4) evidence verifying that mitigations are effective in practice; and (5) residual risk assessment confirming clinical benefits outweigh acceptable residual risks, personally endorsed by the Clinical Safety Officer (CSO).',
    playbookContext: 'Compiled as an auditable compliance artifact accompanying any machine learning model or analytical tool egressed from the airlock destined for clinical care pathways.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    statutoryBasis: 'NHS Information Standards DCB0129 § 3.4 & DCB0160 § 3.4',
    governanceSafeguards: [
      'Evidence-based safety argument backed by verified test logs and clinical evaluation trials.',
      'Mandatory living document updated whenever code, dependencies, or clinical pathways change.',
      'Must be formally approved and signed by the nominated Clinical Safety Officer before release.'
    ],
    furtherResourceId: 'res-dcb-0129',
    externalUrl: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems',
    relatedTerms: ['cso', 'hazard-log', 'dcb-0129-0160', 'iso-14971']
  },
  {
    id: 'hazard-log',
    term: 'Clinical Hazard Log (DCB0129/0160)',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'A live, version-controlled risk register tracking every identified clinical hazard, clinical consequence, risk score, mitigation measure, and residual risk rating across the health IT lifecycle.',
    fullDefinition: 'Mandated under DCB0129 Section 3.3 and DCB0160 Section 3.3, the Clinical Hazard Log is a continuous, dynamic record that must be initiated during early system architecture and maintained throughout the operational life of health software. For every hazard identified (e.g. demographic model performance disparity, truncated laboratory ranges, alert fatigue, network timeout during critical data transfer), the log records: (1) hazard ID and clinical description; (2) potential clinical causes and failure modes; (3) worst-case clinical consequences to patient care; (4) initial clinical risk rating (Severity × Likelihood); (5) explicit risk control and architectural mitigation measures; and (6) residual risk rating with formal sign-off by the Clinical Safety Officer (CSO).',
    playbookContext: 'Directly linked to Policy-as-Code test suites to guarantee that technical safety bounds (e.g. SDC thresholds, input validation shapes) mirror documented clinical mitigations.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    statutoryBasis: 'NHS Information Standards DCB0129 § 3.3 & DCB0160 § 3.3; ISO 14971:2019',
    governanceSafeguards: [
      'Version-controlled tracking of every potential patient safety hazard throughout the software lifecycle.',
      'Quantitative severity and likelihood scoring with verified mitigation traceability.',
      'No hazard may be closed or residual risk accepted without explicit Clinical Safety Officer endorsement.'
    ],
    furtherResourceId: 'res-dcb-0129',
    externalUrl: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems',
    relatedTerms: ['cso', 'cscr', 'dcb-0129-0160', 'iso-14971']
  },
  {
    id: 'dtac',
    term: 'Digital Technology Assessment Criteria (DTAC)',
    acronym: 'DTAC',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'The national NHS baseline assessment framework evaluating digital health technologies across Clinical Safety, Data Protection, Technical Security, Interoperability, and Usability.',
    fullDefinition: 'Mandated by NHS England Transformation Directorate, the Digital Technology Assessment Criteria (DTAC) gives healthcare organizations, integrated care systems (ICS), and research platforms confidence that digital tools and analytical services meet essential standards. DTAC is divided into five core sections: (1) Clinical Safety (assessing DCB0129 compliance, Clinical Safety Officer sign-off, Hazard Log, and Clinical Safety Case Report); (2) Data Protection (verifying UK GDPR, statutory lawful basis, Data Protection Impact Assessment sign-off, and NHS DSPT "Standards Met" assertion); (3) Technical Security (requiring independent Cyber Essentials Plus accreditation and annual CREST/CHECK penetration testing); (4) Interoperability (adherence to HL7 FHIR, SNOMED CT, NHS login, and Open APIs); and (5) Usability and Accessibility (conformance with WCAG 2.1 Level AA and NHS Service Standards).',
    playbookContext: 'Acts as the unified baseline standard bridging clinical safety, technical cybersecurity, and Information Governance before deploying analytical microservices into research enclaves.',
    playbookSection: 'Section 3. Implementation Phases (Phase 4: Policy Compilation & Runtime Enforcement)',
    statutoryBasis: 'NHS England Transformation Directorate DTAC Framework; Health and Care Act 2022',
    governanceSafeguards: [
      'Mandatory pre-procurement verification across clinical safety, data protection, security, and interoperability.',
      'Enforces DCB0129 clinical safety case reports under registered Clinical Safety Officers.',
      'Demands annual Cyber Essentials Plus certification and verified NHS DSPT compliance.'
    ],
    furtherResourceId: 'res-nhs-dtac',
    externalUrl: 'https://digital.nhs.uk/services/digital-technology-assessment-criteria-dtac',
    relatedTerms: ['dcb-0129-0160', 'cso', 'cscr', 'hazard-log', 'satre', 'tre']
  },
  {
    id: 'samd-uk-mdr',
    term: 'Software as a Medical Device & UK MDR 2002',
    acronym: 'SaMD / UK MDR 2002',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'Statutory regulation under UK Medical Devices Regulations 2002 (as amended) and MHRA guidance for health software and AI intended for diagnostic, prognostic, or therapeutic clinical decision-making.',
    fullDefinition: 'Software as a Medical Device (SaMD) encompasses software intended to be used for diagnostic or therapeutic purposes without being part of a hardware medical device. In the UK, SaMD is regulated by the Medicines and Healthcare products Regulatory Agency (MHRA) under the UK MDR 2002. Research models developed in data analysis & intelligence platforms that provide diagnostic or risk prediction outputs must be assessed against SaMD classification rules before clinical deployment.',
    playbookContext: 'Informed by the dual-persona governance model to separate exploratory research models from regulated clinical decision tools.',
    playbookSection: 'Section 3. Implementation Phases (Phase 3 & Phase 4)',
    relatedTerms: ['iso-13485', 'iso-14971', 'dcb-0129-0160', 'iso-42001']
  },
  {
    id: 'iso-5259',
    term: 'ISO/IEC 5259 Data Quality for Analytics & ML',
    acronym: 'ISO/IEC 5259',
    category: 'Standards & Clinical Safety',
    shortDefinition: 'The ISO standard series defining data quality measures, data governance, and data lifecycle management specifically for machine learning, model training, and analytical pipelines.',
    fullDefinition: 'ISO/IEC 5259 provides benchmark quality dimensions (including completeness, representativeness, bias minimization, and feature consistency) for datasets used in AI model training. Within data analysis & intelligence platforms, it establishes data ingestion quality gates that prevent downstream algorithmic drift and hallucination.',
    playbookContext: 'Modes of data quality verification encoded into SHACL shapes for safe data ingestion.',
    playbookSection: 'Section 2. Architecture: The Policy-as-Code Pipeline',
    relatedTerms: ['iso-42001', 'safe-data', 'owl2', 'shacl']
  },
  // --- Governance Maturity Model (Population Data & Epidemiology) ---
  {
    id: 'governance-maturity-model',
    term: 'Governance Maturity Model for Population Data',
    acronym: 'GMM',
    category: 'Governance Maturity Model',
    shortDefinition: 'A 5-level operational framework measuring an organization\'s progression from ad-hoc manual data handling to automated, policy-as-code research enclaves.',
    fullDefinition: 'The Governance Maturity Model (GMM) provides population data organizations, health registries, and epidemiological research platforms with a structured path to evaluate and advance their Information Governance capabilities. The model defines five progressive tiers: Level 1 (Ad-hoc: fragmented files, bespoke permissions, manual approval bottlenecks); Level 2 (Repeatable: standardized Data Sharing Agreements and manual DPIAs); Level 3 (Defined: formal institutional baselines adhering to the Five Safes, Caldicott Principles, and SATRE specifications); Level 4 (Managed: automated policy-as-code enforcement, quantitative disclosure control, and real-time metric tracking); Level 5 (Optimizing: continuous semantic graph validation, W3C PROV-O audit trails, and automated regulatory drift adaptation).',
    playbookContext: 'Structures the 16-Week Implementation Track, allowing organizations to benchmark their transition toward Level 4 and Level 5 machine-executable governance.',
    playbookSection: 'Section 1. Project Overview & Implementation Track',
    relatedTerms: ['data-stewardship', 'dpia', 'dsa', 'five-safes', 'pac']
  },
  {
    id: 'dpia',
    term: 'Data Protection Impact Assessment',
    acronym: 'DPIA',
    category: 'Governance Maturity Model',
    shortDefinition: 'A mandatory statutory process under UK GDPR Article 35 evaluating necessity, proportionality, and privacy risks in population data processing.',
    fullDefinition: 'A Data Protection Impact Assessment (DPIA) is a formal risk management process mandated under UK GDPR Article 35 and the Data Protection Act 2018 whenever processing is likely to result in a high risk to the rights and freedoms of individuals. In population data research and epidemiology, DPIAs systematically analyze: (1) the lawful basis for processing (e.g. Article 6(1)(e) public interest task and Article 9(2)(j) research exemption); (2) necessity and proportionality relative to research objectives; (3) measures to mitigate re-identification, longitudinal linkage, and inference risks; (4) privacy-enhancing technologies (PETs) deployed; and (5) formal consultation with the Data Protection Officer (DPO) and affected community representatives.',
    playbookContext: 'Formalized within governance ontologies and validated prior to cohort provisioning; serves as a prerequisite for Phase 1 baseline certification.',
    playbookSection: 'Section 1. Foundations & Statutory Compliance',
    relatedTerms: ['dsa', 'data-stewardship', 'uk-gdpr', 'safe-project']
  },
  {
    id: 'dsa',
    term: 'Data Sharing Agreement & Transfer Protocol',
    acronym: 'DSA / DTA / ISA',
    category: 'Governance Maturity Model',
    shortDefinition: 'A legally binding contract governing the terms, lawful basis, purpose limitations, and liabilities under which data is shared between organizations.',
    fullDefinition: 'A Data Sharing Agreement (DSA), also referred to as a Data Transfer Agreement (DTA) or Information Sharing Agreement (ISA), is a legal instrument established between data controllers and processors before any multi-institutional population research commences. A compliant DSA defines: (1) the specific parties and their statutory controller/processor designations; (2) explicit purpose limitation strictly bounding analytical scope; (3) data categories, pseudonymization standards, and transmission security; (4) data retention horizons and secure destruction protocols; (5) intellectual property rights and publication clearances; and (6) breach notification SLAs and legal liability allocation.',
    playbookContext: 'Compiled into machine-readable shape constraints in tre-core.ttl to guarantee that only projects with signed, active DSAs can receive data partitions.',
    playbookSection: 'Section 1. Core Ontologies & Phase 1 Implementation',
    relatedTerms: ['dpia', 'data-stewardship', 'safe-project', 'purpose-limitation']
  },
  {
    id: 'data-stewardship',
    term: 'Data Stewardship & Fiduciary Custodianship',
    category: 'Governance Maturity Model',
    shortDefinition: 'The institutional responsibility and operational practices ensuring data integrity, ethical curation, access governance, and lifecycle preservation.',
    fullDefinition: 'Data Stewardship represents the active management, governance, and ethical custodianship of population, administrative, and epidemiological data assets throughout their entire lifecycle. Unlike traditional IT administration, data stewards act as trusted fiduciaries for research participants and public authorities. Key responsibilities include maintaining FAIR (Findable, Accessible, Interoperable, Reusable) data standards, curating standardized semantic data dictionaries (OMOP CDM, ICD-10, SNOMED CT), ensuring data minimization at ingress, managing project-specific role assignments, and enforcing ethical boundary conditions.',
    playbookContext: 'Modeled in tre-core.ttl as tre:DataSteward, linking human custodians to W3C SHACL shape validation rules and access review gates.',
    playbookSection: 'Section 1.2 & Section 3.1',
    relatedTerms: ['governance-maturity-model', 'ethical-framework', 'dsa', 'five-safes']
  },
  {
    id: 'ethical-framework',
    term: 'Ethical Framework & Public Interest Test',
    category: 'Governance Maturity Model',
    shortDefinition: 'A structured assessment methodology balancing the public health and scientific benefits of research against individual privacy intrusion.',
    fullDefinition: 'The Ethical Framework for population and health research provides principles and decision heuristics for evaluating whether secondary data linkage and analysis are morally and socially justified. Anchored by the UNESCO Universal Declaration on Bioethics and Human Rights, the Belmont Report, and national data guardian principles, the framework evaluates four core pillars: (1) Beneficence (clear societal value, disease mitigation, or policy improvement); (2) Non-maleficence (robust mathematical safeguards preventing group stigma, discriminatory profiling, or re-identification); (3) Autonomy (respect for statutory opt-outs, transparent public registers, and citizen dialogue); and (4) Justice (fair distribution of research benefits across diverse population strata).',
    playbookContext: 'Integrated into the Playbook front matter and encoded into the governance graph to enforce public benefit criteria as machine-checkable preconditions.',
    playbookSection: 'Section 0. Executive Front Matter & Section 1.2',
    relatedTerms: ['data-stewardship', 'caldicott', 'purpose-limitation', 'five-safes']
  },
  {
    id: 'longitudinal-cohort-linkage',
    term: 'Longitudinal Cohort Linkage Protocol',
    category: 'Governance Maturity Model',
    shortDefinition: 'A privacy-preserving methodology for combining records across disparate administrative and epidemiological registries over time without exposing identity.',
    fullDefinition: 'Longitudinal Cohort Linkage is the systematic process of connecting multiple datasets (such as birth cohorts, census returns, health encounters, educational attainment, and environmental exposures) for the same individuals across multi-decade observation periods. To maintain compliance with UK GDPR and the Digital Economy Act 2017, linkage protocols employ privacy-preserving record linkage (PPRL), deterministic cryptographic hash tokens (e.g. Salted HMAC-SHA256), and trusted third-party separation of identity from analytical attributes (the split-file model).',
    playbookContext: 'Encoded into SHACL ingress rules to verify that linkage tokens are irreversible and that row-level datasets cannot be joined without active ethical authorization.',
    playbookSection: 'Section 2. Architecture & Ingress Governance',
    relatedTerms: ['data-stewardship', 'quasi-identifiers', 'dea-2017']
  },
  {
    id: 'purpose-limitation',
    term: 'Purpose Limitation & Secondary Use Controls',
    category: 'Governance Maturity Model',
    shortDefinition: 'The statutory principle restricting data use strictly to the approved research question, prohibiting mission creep or commercial repurposing.',
    fullDefinition: 'Under UK GDPR Article 5(1)(b) and statutory research gateways, data collected for specific administrative, health, or statistical purposes must not be further processed in a manner incompatible with those legitimate purposes. Within data analysis & intelligence platforms, purpose limitation is enforced mechanically through container sandboxing, read-only data mounts, and automated query analysis. Any analytical workload attempting to join unauthorized tables, train unapproved models, or explore variables outside the declared protocol is flagged and aborted.',
    playbookContext: 'Directly enforced by OPA Rego admission webhooks that verify incoming query tokens against approved project claim graphs.',
    playbookSection: 'Section 1.1 & Section 3 (Phase 4)',
    relatedTerms: ['ethical-framework', 'dsa', 'safe-project', 'opa']
  },
  {
    id: 'trusted-data-intermediary',
    term: 'Trusted Data Intermediary',
    acronym: 'TDI',
    category: 'Governance Maturity Model',
    shortDefinition: 'An independent, accredited entity facilitating secure data linkage and exchange between data providers and researchers without holding analytical data.',
    fullDefinition: 'A Trusted Data Intermediary (TDI), recognized under the EU Data Governance Act and the UK Data (Use and Access) legislative framework, is an impartial organization that operates sovereign linkage and identity resolution services between public data custodians and research platforms. TDIs perform pseudonymization, match key generation, and validation of research credentials while remaining legally and technologically barred from accessing either the underlying personal identifiers or the resulting research insights.',
    playbookContext: 'Reflected in the Wavebound architectural ingress tier to ensure independent, cryptographically audited data ingestion into secure enclaves.',
    playbookSection: 'Section 2. Architecture: The Policy-as-Code Pipeline',
    relatedTerms: ['data-stewardship', 'longitudinal-cohort-linkage', 'dea-2017', 'tre']
  },
  {
    id: 'data-access-committee',
    term: 'Data Access Committee & IG Review Panel',
    acronym: 'DAC / IGRP',
    category: 'Governance Maturity Model',
    shortDefinition: 'An independent multidisciplinary body evaluating population health data access requests against statutory, ethical, and scientific criteria.',
    fullDefinition: 'A Data Access Committee (DAC), often functioning alongside an Information Governance Review Panel (IGRP), serves as the institutional gatekeeper for population health cohorts and linked epidemiological registries. Comprising data stewards, Caldicott guardians, methodologists, public representatives, and legal advisers, the DAC evaluates: (1) whether the research question delivers tangible public health benefit; (2) whether the data requested is strictly minimized; (3) whether the analytical team holds requisite accreditations; and (4) whether the risk of deductive re-identification has been controlled. In a mature organization, DAC approvals produce cryptographically signed assertions that activate Policy Enforcement Points (PEPs) automatically.',
    playbookContext: 'Modeled in tre-core.ttl as tre:DataAccessCommittee, emitting decision assertions that unlock enclave workspace provisioning.',
    playbookSection: 'Section 1.1 & Section 1.2',
    relatedTerms: ['data-stewardship', 'dsa', 'dpia', 'caldicott']
  },
  {
    id: 'caldicott-guardian-role',
    term: 'Caldicott Guardian & SIRO Oversight',
    acronym: 'CG / SIRO',
    category: 'Governance Maturity Model',
    shortDefinition: 'Senior organizational leaders appointed to champion confidentiality, oversee clinical information risk, and validate proportionate data sharing.',
    fullDefinition: 'Mandated across public health, social care, and population research organizations in the UK, the Caldicott Guardian acts as the conscience of the organization regarding the handling of confidential patient and population information. Working in partnership with the Senior Information Risk Owner (SIRO) and Data Protection Officer (DPO), the Caldicott Guardian arbitrates complex data-sharing decisions, tests proposed secondary uses against the 8 Caldicott Principles, and ensures that citizen confidentiality is never compromised for administrative expediency.',
    playbookContext: 'Represented as an authoritative approval gate (D-001 through D-009) in the implementation transition track.',
    playbookSection: 'Section 1.2 & Section 3.1',
    relatedTerms: ['caldicott', 'data-stewardship', 'dpia', 'dsa']
  },
  {
    id: 'ai-non-personhood',
    term: 'AI Non-Personhood & Delegated Sponsorship',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'The legal and architectural doctrine establishing that AI models cannot be "Safe People" and must operate under delegated human sponsorship.',
    fullDefinition: 'Under statutory research frameworks (UK Digital Economy Act 2017, ONS SRS, and Caldicott Principles), a "Safe Person" must be an accredited natural person bearing direct legal and criminal liability. An AI model, agent, or LLM possesses no legal personhood, cannot sign statutory undertakings, and cannot be prosecuted. Architecturally, AI operates strictly as a delegated machine workload under the custody of an Accredited Human Researcher (Human Sponsor) who retains 100% legal and ethical accountability.',
    playbookContext: 'Enforced via SHACL shapes rejecting tre:SafePerson status for AI workloads and requiring tre:sponsoredByHumanResearcher with an active accreditation URI.',
    playbookSection: 'Section 2 & Section 3 (Phase 3 & Phase 4)',
    relatedTerms: ['safe-person', 'mcp', 'stanford-agentic-framework', 'five-safes']
  },
  {
    id: 'model-weights-data-asset',
    term: 'Model Weights & Checkpoints as Data Assets',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Classifying neural network weights, embeddings, and vector stores as Data Assets subject to disclosure control due to training data memorization.',
    fullDefinition: 'Pre-trained foundation models imported into a TRE, fine-tuned weights, embeddings, and vector databases are formally categorized as "Data Assets" within the Safe Data pillar. Because deep learning models can memorize private training records (vulnerable to membership inference and model inversion attacks), exporting model weights across the airlock requires statistical disclosure control, differential privacy verification (epsilon <= 1.0), and DCB0129 clinical hazard log sign-off.',
    playbookContext: 'Catalogued under dcat:Dataset / tre:DataAsset and evaluated at the airlock via sdc_shapes.ttl before egress authorization.',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & Phase 4)',
    relatedTerms: ['safe-data', 'safe-output', 'sdc', 'differential-privacy']
  },
  {
    id: 'stanford-agentic-framework',
    term: 'Stanford UIT Agentic AI Security Framework',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Cybersecurity framework requiring automated near-instantaneous token revocation, blast radius containment, and human sponsor accountability.',
    fullDefinition: 'Published by Stanford University IT Information Security Office, this framework establishes essential guardrails for autonomous agents: (1) machine identities must be revocable near-instantaneously in an automated manner without long-lived credentials, (2) agents must operate within a bounded blast radius without direct write access to systems of record, and (3) all agents must have an identified human sponsor (Principal) who is accountable for actions taken by the workload.',
    playbookContext: 'Directly compiled into Wavebound OPA admission controllers (authz.rego) and SHACL agent boundaries (agent-sponsor-shapes.ttl).',
    playbookSection: 'Section 3 (Phase 3 & Phase 4)',
    relatedTerms: ['ai-non-personhood', 'stanford-risk-tiers', 'mcp', 'pep']
  },
  {
    id: 'stanford-risk-tiers',
    term: 'Stanford UIT Agentic AI Risk Classifications',
    category: 'AI & Autonomous Agents',
    shortDefinition: 'Four-tier risk evaluation (Low, Moderate, High #8702, Very High #8938) governing autonomous agent access to sensitive population data.',
    fullDefinition: 'Categorizes agentic AI workloads into four risk levels based on autonomy, target data classification, and potential harm. Section 8702 specifies that High Risk agents operating on pseudonymised microdata require human-in-the-loop approvals, short-lived tokens (<= 2 hours), and read-only tools. Section 8938 mandates that Very High Risk operations (e.g., cross-registry linkage, raw re-identifiable demographic queries) are strictly prohibited from autonomous execution.',
    playbookContext: 'Governs the admission control rules enforced by OPA PDPs when agents attempt tool execution in the research enclave.',
    playbookSection: 'Section 3 (Phase 3 & Phase 4)',
    relatedTerms: ['stanford-agentic-framework', 'ai-non-personhood', 'eu-ai-act', 'mcp-sql']
  }
];

export const GLOSSARY_SECTION_MAP: Record<string, string> = {
  // Foundations & Statutory Frameworks -> Phase 1 Baseline Ontologies & SATRE
  'tre': 'sec-phase-1-2',
  'seawater-problem-space': 'sec-front-matter',
  'iso-42001': 'sec-phase-3-2',
  'iso-13485': 'sec-phase-4-1',
  'iso-14971': 'sec-phase-4-1',
  'dcb-0129-0160': 'sec-phase-4-1',
  'samd-uk-mdr': 'sec-phase-3-2',
  'iso-5259': 'sec-phase-1-1',
  'five-safes': 'sec-phase-1-2',
  'safe-person': 'sec-phase-1-2',
  'safe-project': 'sec-phase-1-2',
  'safe-setting': 'sec-phase-1-2',
  'safe-data': 'sec-phase-1-2',
  'safe-output': 'sec-phase-2-1',
  'caldicott': 'sec-phase-1-2',
  's251': 'sec-phase-1-2',
  'dea-2017': 'sec-phase-1-2',
  'rap-uksa': 'sec-phase-1-2',
  'dea-accredited-researcher': 'sec-phase-1-2',
  'dea-accredited-processor': 'sec-phase-1-2',
  'rec-hra': 'sec-phase-1-2',
  'uk-gdpr': 'sec-phase-1-2',
  'satre': 'sec-phase-1-2',
  'foi': 'sec-phase-3-1',

  // Governance Maturity Model & Stewardship
  'governance-maturity-model': 'sec-phase-1-1',
  'dpia': 'sec-phase-1-2',
  'dsa': 'sec-phase-1-2',
  'data-stewardship': 'sec-phase-1-2',
  'ethical-framework': 'sec-front-matter',
  'longitudinal-cohort-linkage': 'sec-phase-2-1',
  'purpose-limitation': 'sec-phase-4-1',
  'trusted-data-intermediary': 'sec-phase-1-2',
  'data-access-committee': 'sec-phase-1-2',
  'caldicott-guardian-role': 'sec-phase-1-2',

  // Semantic Graph Primitives -> Phase 1 Knowledge Modeling & Phase 2 SHACL
  'pac': 'sec-front-matter',
  'owl2': 'sec-phase-1-2',
  'rdf': 'sec-phase-1-1',
  'turtle': 'sec-phase-1-1',
  'jsonld': 'sec-phase-1-1',
  'owa': 'sec-phase-2-1',
  'cwa': 'sec-phase-2-1',
  'shacl': 'sec-phase-2-1',
  'nodeshape': 'sec-phase-2-1',
  'propertyshape': 'sec-phase-2-1',
  'pyshacl': 'sec-phase-2-2',

  // Policy Compilation & Decision Engines -> Phase 4 Compilation & PEPs
  'opa': 'sec-phase-4-1',
  'rego': 'sec-phase-4-1',
  'pep': 'sec-phase-4-2',
  'pdp': 'sec-phase-4-1',
  'k8s-admission': 'sec-phase-4-2',
  'airlock': 'sec-phase-4-2',
  'zero-egress': 'sec-phase-4-2',
  'cso': 'sec-phase-4-1',
  'cscr': 'sec-phase-4-1',
  'hazard-log': 'sec-phase-4-1',
  'dtac': 'sec-phase-4-1',
  'iras-ig-assurances': 'sec-phase-1-2',
  'federated-analysis': 'sec-front-matter',

  // SDC & Disclosure Controls -> Phase 2 Validation Logic & Shapes
  'sdc': 'sec-phase-2-1',
  'quasi-identifiers': 'sec-phase-2-1',
  'primary-suppression': 'sec-phase-2-1',
  'dominance-rule': 'sec-phase-2-1',
  'secondary-suppression': 'sec-phase-2-1',
  'k-anonymity': 'sec-phase-2-1',
  'ons-sail': 'sec-phase-2-1',

  // AI & Autonomous Agents -> Phase 3 AI & Dual-Persona
  'eu-ai-act': 'sec-phase-3-2',
  'mcp': 'sec-phase-3-2',
  'mcp-sql': 'sec-phase-3-2',
  'mcp-export': 'sec-phase-3-2',
  'llm-prompt-leakage': 'sec-phase-3-2',
  'in-enclave-llm': 'sec-phase-3-2',
  'copilot-ignore': 'sec-phase-3-2',
  'ast-scrubbing': 'sec-phase-3-2',
  'zdr-baa': 'sec-phase-3-2',
  'ai-non-personhood': 'sec-phase-3-2',
  'model-weights-data-asset': 'sec-phase-3-2',
  'stanford-agentic-framework': 'sec-phase-3-2',
  'stanford-risk-tiers': 'sec-phase-3-2',

  // Operations, Provenance & Infrastructure
  'provo': 'sec-phase-4-3',
  'cytoscape': 'sec-phase-3-2',
  'gitops': 'sec-phase-1-1',
  'makefile': 'sec-phase-4-3',
  'vde': 'sec-phase-1-2',
  'dcr': 'sec-phase-1-2',
  'dsh': 'sec-phase-1-2',
  'tee': 'sec-phase-1-2',
};

export function getSectionIdForGlossaryTerm(termId: string): string {
  return GLOSSARY_SECTION_MAP[termId] || 'sec-phase-1-2';
}

