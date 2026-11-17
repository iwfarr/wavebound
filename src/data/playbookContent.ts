export interface ConceptModule {
  id: string;
  title: string;
  shortDesc: string;
  category: 'Governance' | 'Semantic Modeling' | 'Enforcement' | 'AI & MCP' | 'Roadmap';
  icon: string;
  playbookSection: string;
  summary: string;
  plainEnglishSummary: string;
  keyPrinciples: string[];
  technicalDetails: {
    heading: string;
    body: string;
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
    };
  }[];
  sdcThresholds?: {
    name: string;
    rule: string;
    rationale: string;
    formula?: string;
  }[];
  commonPitfalls: string[];
}

export const PLAYBOOK_MODULES: ConceptModule[] = [
  {
    id: 'five-safes',
    title: 'The Five Safes Framework in TREs',
    shortDesc: 'Foundational framework structuring clinical data governance and researcher access tiers.',
    category: 'Governance',
    icon: 'ShieldCheck',
    playbookSection: 'Section 1 & Section 3 (Phase 1)',
    plainEnglishSummary: 'A world-standard data governance framework ensuring that health and personal data is only accessed by trusted people, for approved projects, within secure computer systems, using properly protected data, producing non-identifiable findings.',
    summary: 'The Five Safes framework underpins modern Trusted Research Environments (TREs) and Secure Data Environments (SDEs), aligning NHS Caldicott Principles, UK GDPR, and SATRE standards.',
    keyPrinciples: [
      'Safe People: Accredited researchers with up-to-date Information Governance (IG) training and verified institutional affiliation.',
      'Safe Projects: Ethically approved research protocols (NHS REC approval, HRA consent, Section 251 exemptions where required).',
      'Safe Settings: Hardened, air-gapped or egress-disabled cloud compute enclaves with isolated subnets and multi-factor authentication.',
      'Safe Data: Tiered, de-identified clinical datasets stripped of direct identifiers, mapped to operational hospital tiers.',
      'Safe Outputs: Automated and human-in-the-loop airlock controls enforcing Statistical Disclosure Control (SDC) before research leaves the TRE.'
    ],
    technicalDetails: [
      {
        heading: 'OWL 2 Semantic Representation in tre-core.ttl',
        body: 'In the TRE Policy-as-Code architecture, the Five Safes are formalized as an OWL 2 ontology. Each dimension has explicit classes, object properties, and data properties that link research projects to physical enclave instances and data assets.',
        codeSnippet: {
          language: 'turtle',
          title: 'ontology/tre-core.ttl (Fragment)',
          code: `@prefix tre: <https://w3id.org/tre/core#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:FiveSafesDimension a owl:Class .

tre:SafePerson a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension ;
    rdfs:comment "Accredited researcher with current NHS IG certification." .

tre:SafeSetting a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension ;
    rdfs:comment "Enclave infrastructure with strictly controlled network egress." .

tre:hasIGCertificationDate a owl:DatatypeProperty ;
    rdfs:domain tre:SafePerson ;
    rdfs:range xsd:date .

tre:isEgressDisabled a owl:DatatypeProperty ;
    rdfs:domain tre:SafeSetting ;
    rdfs:range xsd:boolean .`
        }
      },
      {
        heading: 'Mapping to Hospital Operational Tiers',
        body: 'Clinical data is categorized into risk tiers (e.g. Tier 1: Aggregate/Synthetic, Tier 2: De-identified Pseudonymous, Tier 3: Sensitive Genomic/Identifiable under s251). Project clearance requires matching user accreditation with dataset tier.'
      }
    ],
    commonPitfalls: [
      'Confusing metadata policy assertions with real-time runtime state (e.g. assuming a policy statement guarantees the firewall is closed without OPA/PEP enforcement).',
      'Allowing expired IG training certificates to slip through due to lack of automated CI/CD SHACL shape evaluation.'
    ]
  },
  {
    id: 'isms-iso27001-dea',
    title: 'ISO/IEC 27001:2022 ISMS, SoA & DEA 2017 Accreditation',
    shortDesc: 'Mapping ISMS Clauses 4–10, the Statement of Applicability, and Annex A.5–A.8 controls directly to DEA 2017 Section 71 TRE requirements.',
    category: 'Governance',
    icon: 'ShieldCheck',
    playbookSection: 'Section 0, Section 1.2 & Procurement Compliance Matrix',
    plainEnglishSummary: 'An Information Security Management System (ISMS) is not just a binder of policies for annual inspection. By linking ISO/IEC 27001:2022 Clauses 4–10 and Annex A controls to continuous evidence and optional Policy-as-Code gates, a research environment proves live operational adherence—aligning directly with the ISO/IEC 27001 benchmark and evidence-based assessment used by UKSA under the Digital Economy Act 2017.',
    summary: 'Under Part 5, Chapter 5 (Sections 70–71) of the Digital Economy Act 2017 and the UKSA Research Code of Practice, the UKSA Research Accreditation Panel assesses Accredited Processing Environments against ISO/IEC 27001 security controls (with active certification serving as the standard TRE baseline under SOP V1.4, though never acting as an automatic waiver for UKSA SAQ V3.1 evidence verification). Wavebound maps ISMS management Clauses 4–10, Clause 6.1.3(d) Statement of Applicability (SoA), and the four 2022 Annex A themes (A.5 Organizational, A.6 People, A.7 Physical, A.8 Technological) directly into structured operational evidence and declarative SHACL / OPA Rego guardrails.',
    keyPrinciples: [
      'ISMS Clauses 4–10 Lifecycle: Risk treatment plans, competence verification, internal audit (Clause 9), and corrective actions (Clause 10) map onto continuous GitOps CI gates and W3C PROV-O telemetry.',
      'Statement of Applicability (Clause 6.1.3(d)): Every Annex A.5–A.8 control—plus exclusions—links from documented SoA rationale directly to testable technical assets and Decision Register approvals (D-001–D-009).',
      'Four 2022 Annex A Themes: Replaces legacy 2013 sections (A.10, A.12.1.2, A.13.1) with unified A.5 Organizational (access lifecycle, suppliers, statutory compliance), A.6 People (screening, annual IG awareness), A.7 Physical (UK sovereign hosting, VDI perimeter), and A.8 Technological (A.8.12 DLP, A.8.15 logging, A.8.20–A.8.22 network segregation, A.8.24 cryptography, A.8.32 change management).',
      'DEA 2017 Section 70/71 Statutory Bridge: Verifies active UKSA Research Accreditation Panel (RAP) processor certification alongside ISO/IEC 27001:2022 SoA currency and NHS DSPT "Standards Met" status before project mount.'
    ],
    technicalDetails: [
      {
        heading: 'SHACL Mapping: ISMS Clause 6.1.3 SoA & DEA Section 71 Accreditation',
        body: 'In Wavebound, enclave certification and Annex A technological guarantees are evaluated together prior to mounting public authority datasets under DEA 2017 Part 5, Chapter 5.',
        codeSnippet: {
          language: 'turtle',
          title: 'ontology/shapes/isms-soa-shapes.ttl (Illustrative)',
          code: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix iso: <https://w3id.org/iso27001/2022#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:AccreditedEnclaveISMSShape a sh:NodeShape ;
    sh:targetClass tre:SafeSetting ;
    sh:property [
        sh:path iso:hasCertifiedISMS ;
        sh:hasValue true ;
        sh:message "DEA 2017 s71 Violation: Enclave must hold active ISO/IEC 27001:2022 ISMS certification." ;
    ] ;
    sh:property [
        sh:path iso:hasApprovedSoA ;
        sh:minCount 1 ;
        sh:message "ISMS Clause 6.1.3(d): Current Statement of Applicability covering Annex A.5-A.8 is required." ;
    ] ;
    sh:property [
        sh:path iso:controlA8_20_NetworkSegregation ;
        sh:hasValue true ;
        sh:message "Annex A.8.20-A.8.22 Violation: Zero-egress VPC microsegmentation not verified." ;
    ] ;
    sh:property [
        sh:path iso:controlA8_24_Cryptography ;
        sh:hasValue "AES-256-GCM" ;
        sh:message "Annex A.8.24 Violation: KMS-backed AES-256 encryption at rest mandatory." ;
    ] .`
        }
      },
      {
        heading: 'ISO/IEC 27001:2013 to 2022 Reconciliation Across Wavebound',
        body: 'Wavebound enforces strict 2022 terminology across every portal, statutory matrix, and quiz item: Cryptography is cited as Annex A.8.24 (replacing retired A.10), Change Management as Annex A.8.32 (replacing A.12.1.2), and Network Security/Segregation as Annex A.8.20–A.8.22 (replacing A.13 / A.13.1).'
      }
    ],
    commonPitfalls: [
      'Citing retired ISO/IEC 27001:2013 Annex A clauses (e.g. A.10 or A.13.1) inside `:2022` Statements of Applicability or procurement responses.',
      'Treating ISO/IEC 27001 Annex A.8 technical controls in isolation while overlooking Clause 6.1.3(d) SoA justifications and A.5/A.6 organizational and people controls.'
    ]
  },
  {
    id: 'owa-to-cwa-shacl',
    title: 'Deterministic Enforcement: OWA to CWA via SHACL',
    shortDesc: 'Transforming semantic Open-World Assumption into Closed-World security constraints.',
    category: 'Semantic Modeling',
    icon: 'Binary',
    playbookSection: 'Section 1 (Key Goals) & Section 3 (Phase 2)',
    plainEnglishSummary: 'Standard semantic web ontologies operate on an "Open-World Assumption" where unknown facts are assumed missing, not false. For security, we must operate on a "Closed-World Assumption" where any missing permission or safety requirement immediately fails and blocks access.',
    summary: 'W3C OWL 2 RDF ontologies operate under the Open-World Assumption (OWA): if a statement is not explicitly stated, it is merely unknown rather than false. In cybersecurity, OWA is fatal. SHACL (Shapes Constraint Language) resolves OWA into Closed-World Assumption (CWA) validation.',
    keyPrinciples: [
      'Open-World Assumption (OWA): OWL 2 is designed for knowledge discovery, meaning lack of proof is not proof of absence.',
      'Closed-World Assumption (CWA): Security policy requires that if accreditation or ethics approval is not positively verified, access is definitively denied.',
      'SHACL Shapes: Formalize constraints (e.g. sh:minCount 1, sh:datatype xsd:boolean, sh:hasValue true) to generate deterministic pass/fail reports.',
      'PySHACL Test Harness: Executed in CI (`pytest tests/test_shapes.py -v`) against valid and non-compliant session graph fixtures.'
    ],
    technicalDetails: [
      {
        heading: 'SHACL Shape Definition: access-shapes.ttl',
        body: 'The access-shapes.ttl file declares NodeShapes and PropertyShapes that every workspace provisioning request must satisfy before admitted into the cluster.',
        codeSnippet: {
          language: 'turtle',
          title: 'ontology/shapes/access-shapes.ttl',
          code: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:WorkspaceAdmissionShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasAccreditedResearcher ;
        sh:minCount 1 ;
        sh:message "Session must be bound to at least one accredited researcher." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Active NHS REC / s251 ethics approval is strictly required." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Enclave networking must have external egress disabled." ;
    ] .`
        }
      },
      {
        heading: 'Automated CI Test Harness with PySHACL',
        body: 'Tests in `tests/test_shapes.py` feed `valid-session.ttl` (expects conforms=True) and `noncompliant-session.ttl` (expects conforms=False with specific focusNode and resultMessage) into PySHACL.'
      }
    ],
    commonPitfalls: [
      'Attempting to enforce negative security rules using pure OWL DisjointWith without SHACL validation.',
      'Failing to test edge cases where a property is absent versus set to false.'
    ]
  },
  {
    id: 'opa-rego-compilation',
    title: 'OPA Rego Policy Compilation & PEPs',
    shortDesc: 'Compiling high-level semantic graphs into low-latency OPA Rego rules for runtime enforcement.',
    category: 'Enforcement',
    icon: 'Cpu',
    playbookSection: 'Section 1, Section 2 & Section 3 (Phase 4)',
    plainEnglishSummary: 'Knowledge graphs are rich for humans and auditors, but microsecond firewalls and runtime compute admission controllers need lightning-fast rule evaluation. The compiler automatically translates graph rules into Open Policy Agent (OPA) Rego code.',
    summary: 'To achieve microsecond Policy Enforcement Point (PEP) latencies, the compiler (`compiler/rdf_to_rego.py` and `generate_opa.py`) translates Turtle ontology assertions and SHACL shapes into native Open Policy Agent (OPA) Rego policy documents.',
    keyPrinciples: [
      'Decoupled Policy Engine: OPA evaluates policies as code against JSON inputs at runtime without needing graph database traversals at ingress.',
      'Policy Decision Point (PDP): OPA acts as the PDP evaluating admission and egress requests.',
      'Policy Enforcement Points (PEP): Namespaced Admission Controllers (Audit & Alert), Secure File Airlocks, and API Gateways intercept requests and query OPA.',
      'Audit Lineage: Every decision emits a W3C PROV-O RDF triple to an append-only cryptographic ledger.'
    ],
    technicalDetails: [
      {
        heading: 'Compiled Target Rego: security/opa/authz.rego',
        body: 'The compiler translates the ontology into clean, declarative Rego rules that verify session attributes, SDC thresholds, and researcher tokens.',
        codeSnippet: {
          language: 'rego',
          title: 'security/opa/authz.rego',
          code: `package tre.authz

import future.keywords.in

default allow = false
default egress_permitted = false

# Rule 1: Workspace Admission PDP Check
allow {
    input.researcher.accreditation_valid == true
    input.researcher.ig_training_expiry > time.now_ns()
    input.project.ethics_approval_active == true
    input.enclave.egress_blocked == true
}

# Rule 2: Egress Airlock PDP Check (SDC Thresholds)
egress_permitted {
    input.request_type == "airlock_export"
    input.dataset.min_cell_count >= 10
    input.dataset.max_dominance_ratio <= 0.80
    not any_unmasked_pii(input.dataset.columns)
}

any_unmasked_pii(columns) {
    some col in columns
    col in {"nhs_number", "patient_dob", "postcode"}
}`
        }
      },
      {
        heading: 'PEP Service & Container Admission Integration',
        body: 'When a researcher launches a Jupyter notebook or compute session, the admission webhook forwards the review request to OPA. If `allow` is false, session creation is rejected with the exact policy violation reason.'
      }
    ],
    commonPitfalls: [
      'Modifying compiled Rego files directly instead of updating the upstream Turtle ontology and re-running `make build`.',
      'Forgetting to sync time-based IG training expiry timestamps with nanosecond unix timestamps in Rego.'
    ]
  },
  {
    id: 'quantitative-sdc',
    title: 'Quantitative Statistical Disclosure Control (SDC)',
    shortDesc: 'Mathematical thresholds for airlock output compliance (ONS, SAIL, k-anonymity).',
    category: 'Enforcement',
    icon: 'Calculator',
    playbookSection: 'Section 2 & Section 3 (Phase 1 & 4)',
    plainEnglishSummary: 'Before any graph, table, or analysis leaves a research bubble, mathematical filters ensure that rare individuals cannot be identified from tiny counts or dominant contributors.',
    summary: 'Statistical Disclosure Control (SDC) mathematically guards against re-identification in summary tables, regression outputs, and machine learning models leaving the TRE airlock, enforcing ONS (Office for National Statistics) and SAIL Databank standards.',
    keyPrinciples: [
      'Primary Cell Suppression: Any cell in an output table with a count of fewer than 10 individuals ($k < 10$) must be suppressed or grouped.',
      'Dominance Rule ($n, k$ rule): If the top contributor accounts for more than 80% of a total aggregate ($k% > 80%$), the cell must be suppressed to prevent attribute disclosure.',
      'Secondary (Residual) Suppression: Additional non-sensitive cells must be masked to prevent deriving suppressed cells from row or column totals.',
      'Autonomous Egress Checks: Automated SHACL checks (`sdc_shapes.ttl`) combined with human airlock review.'
    ],
    sdcThresholds: [
      {
        name: 'Primary Cell Suppression',
        rule: 'k >= 10',
        rationale: 'Prevents identifying specific rare patients in clinical cohorts (e.g. rare disease counts in small postal sectors).',
        formula: '\\forall c \\in \\text{Cells}, \\quad \\text{Count}(c) \\ge 10'
      },
      {
        name: 'Dominance Rule (p% or n-k rule)',
        rule: 'k% <= 80%',
        rationale: 'If one patient contributes > 80% to a clinical expenditure or metric, external parties can deduce private attributes.',
        formula: '\\frac{\\text{Value}_{\\text{top 1}}}{\\sum_{i=1}^m \\text{Value}_i} \\le 0.80'
      },
      {
        name: 'No Direct PII Columns',
        rule: 'Direct Identifiers = 0',
        rationale: 'Immediate exclusion of NHS numbers, full dates of birth, full postcodes, and clinical trial participant IDs.'
      }
    ],
    technicalDetails: [
      {
        heading: 'SHACL Shape: sdc_shapes.ttl',
        body: 'Formalizes the quantitative constraints in RDF so tabular exports can be validated directly before compiling to Rego.',
        codeSnippet: {
          language: 'turtle',
          title: 'ontology/shapes/sdc_shapes.ttl',
          code: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:AirlockOutputShape a sh:NodeShape ;
    sh:targetClass tre:ExportArtifact ;
    sh:property [
        sh:path tre:minObservedCellCount ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Violation: Minimum cell count must be >= 10 (Primary Cell Suppression)." ;
    ] ;
    sh:property [
        sh:path tre:topContributorDominanceRatio ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 0.80 ;
        sh:message "Violation: Dominance ratio must not exceed 0.80 (80% rule)." ;
    ] .`
        }
      }
    ],
    commonPitfalls: [
      'Omitting secondary cell suppression: when a row total is 50 and one cell is suppressed (count 7), an adversary simply subtracts the remaining cells from 50 to uncover 7.',
      'Neglecting difference disclosure across multiple sequential exports from the same researcher.'
    ]
  },
  {
    id: 'ai-mcp-governance',
    title: 'AI Governance & Model Context Protocol (MCP) Boundaries',
    shortDesc: 'Regulating autonomous analytics agents and LLMs via EU AI Act risk tiers and MCP tool bounds.',
    category: 'AI & MCP',
    icon: 'Bot',
    playbookSection: 'Section 1, 2 & 3 (Phase 1)',
    plainEnglishSummary: 'When AI assistants or autonomous code agents operate inside a secure data enclave, strict boundaries control what database tools they can invoke and what data they can see, mapped to European AI risk levels.',
    summary: 'Modern TREs enable autonomous analytics agents and LLMs to assist researchers. The playbook incorporates EU AI Act risk categorizations and Model Context Protocol (MCP) tool-use boundaries (`agent_mcp.ttl`) to prevent data exfiltration and unauthorized compute execution.',
    keyPrinciples: [
      'EU AI Act Alignment: Strict classification of agent workloads into Minimal, Limited, High (diagnostic / clinical triage), and Unacceptable risk.',
      'Explicit MCP Tool Scopes: Agents are granted access strictly via declarative MCP tools (e.g. `mcp:ExecuteSQL`, `mcp:ExportSummary`).',
      'Read-Only Enforcement: `mcp:ExecuteSQL` is structurally prevented from executing DDL/DML (DROP, ALTER, UPDATE, INSERT) or raw data dumps.',
      'Deterministic Token & Egress Sandboxes: Autonomous agents have zero external network egress and strict per-query token & memory budgets.'
    ],
    technicalDetails: [
      {
        heading: 'Agent Ontology: agent_mcp.ttl',
        body: 'Formalizes agent capabilities, permissions, and tool parameters in OWL 2 RDF.',
        codeSnippet: {
          language: 'turtle',
          title: 'ontology/agent_mcp.ttl',
          code: `@prefix mcp: <https://w3id.org/mcp/governance#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

mcp:AutonomousAgent a owl:Class .

mcp:AnalyticsAgent rdfs:subClassOf mcp:AutonomousAgent ;
    mcp:maxRiskTier "LimitedRisk" ;
    mcp:permittedTool mcp:ExecuteSQLReadOnly , mcp:ExportSummaryWithSDC .

mcp:ExecuteSQLReadOnly a mcp:MCPTool ;
    mcp:toolName "execute_sql_query" ;
    mcp:allowedStatements "SELECT", "EXPLAIN" ;
    mcp:maxRowsReturned 500 ;
    mcp:networkIsolated true .`
        }
      },
      {
        heading: 'Compiled MCP Rego Authz',
        body: 'When an agent issues a tool invocation through the MCP client, the request is intercepted by the OPA PDP to verify tool permissions and risk tier limits.'
      }
    ],
    commonPitfalls: [
      'Permitting unbounded wildcards in agent tool definitions (`mcp:toolName "*"`).',
      'Allowing an agent to pass arbitrary string SQL without query plan analysis or cell-level masking.'
    ]
  },
  {
    id: 'architecture-gitops-roadmap',
    title: 'GitOps Architecture & Safe Transition Patterns',
    shortDesc: 'Non-breaking rollout patterns, evaluate-only webhooks, shadow auditing, and the Decision Register (D-001–D-009).',
    category: 'Roadmap',
    icon: 'GitBranch',
    playbookSection: 'Section 1.1, Section 4.2 & Implementation Track',
    plainEnglishSummary: 'How to transition an institution from high-level governance concepts to automated security enforcement without causing outages, downtime, or false lockouts for researchers.',
    summary: 'The Wavebound Policy-as-Code architecture coordinates compiler scripts, Turtle ontologies, SHACL shapes, OPA Rego policies, and PySHACL tests in a safe, non-breaking rollout framework backed by an auditable Decision Register (D-001 through D-009).',
    keyPrinciples: [
      'Zero-Disruption Transition: Namespaced Admission Controllers run in evaluate-only mode (`failurePolicy: Ignore`) to observe real traffic without blocking pods or requiring cluster-admin privileges.',
      'Parallel Shadow Auditing: Wavebound Rego verdicts are evaluated side-by-side with legacy authorization reviews until achieving a 0.00% discrepancy rate over 14 consecutive days.',
      'Canary Scope Gating: Active enforcement is turned on exclusively in isolated non-clinical test namespaces with automatic circuit breakers.',
      'Fail-Safe Dual Semantics: Internal workspace compute fails open with alerts during OPA partitions; external airlock export fails closed to prevent data leakage.',
      'Auditable Decision Gates (D-001–D-009): Formal sign-offs by accountable human owners (Caldicott, IG, SRE) before any rule is activated.',
      'Authoritative 16-Week Schedule: The complete week-by-week sprint deliverables and operational checklist are consolidated in the Implementation & Rollout Track.'
    ],
    technicalDetails: [
      {
        heading: 'Safe Transition from Overview into Production Without Breaking Deployed Services',
        body: 'Moving from an educational overview into live enforcement without service disruption requires four strict technical layers: 1) Evaluate-Only Namespaced Mode (Admission controller runs OPA in passive observation within research namespaces; failurePolicy: Ignore ensures zero blocked pods or cluster-wide outages); 2) Parallel Shadow Auditing (Wavebound Rego verdicts are compared side-by-side against legacy authorization tickets; discrepancies generate alerts until discrepancy rate reaches 0.00% over 14 days); 3) Canary Scoping (enforcement is activated exclusively on a single non-clinical test namespace or synthetic cohort with an automated circuit breaker); 4) Fail-Safe Defaults (internal workspace admission fails open with alerts during OPA partitions, while external airlock export fails closed to prevent data leakage).'
      },
      {
        heading: 'Repository Directory Layout & Operational Separation',
        body: 'Clean separation of concerns between semantic ontology, compilation toolchain, security policies, tests, and public web interface.',
        codeSnippet: {
          language: 'bash',
          title: 'Repository Structure',
          code: `tre-policy-as-code/
├── .github/workflows/ci.yml # CI: SHACL validation & Pages deploy
├── compiler/
│   ├── build_graph.py       # JSON-LD & Cytoscape graph generation
│   ├── generate_opa.py      # Semantic rules to OPA Rego
│   ├── generate_docs.py     # FOI / Governance Markdown generator
│   └── rdf_to_rego.py       # Full compiler for OWL/SDC to Rego
├── ontology/
│   ├── tre-core.ttl         # Five Safes & NHS Caldicott core
│   ├── governance_core.ttl  # NHS s251, SATRE pillars, legal bases
│   ├── sdc_rules.ttl        # Quantitative SDC (k>=10, dominance)
│   ├── agent_mcp.ttl        # Agent boundaries & MCP tools
│   └── shapes/              # SHACL validation shapes
├── security/opa/            # Production Rego policies (PDP)
├── tests/                   # PySHACL automated test harness
├── web/                     # Dual-persona public interface
├── Makefile                 # Dev automation (install, test, build)
└── requirements.txt         # Python dependencies`
        }
      },
      {
        heading: 'The 9 Binding Decision Gates (D-001 through D-009)',
        body: 'No policy threshold or legal interpretation is assumed or deployed into active enforcement without a recorded sign-off: D-001 (First Production Decision Scope), D-002 (Statutory Authority & Interpretation), D-003 (Trusted Inputs & Provenance), D-004 (Decision Semantics & Missing Input Defaults), D-005 (Quantitative SDC Rules), D-006 (Runtime Engine & Source of Truth), D-007 (Enforcement Point & Mode), D-008 (Audit & Retention Horizon), and D-009 (Change Governance & Emergency Rollback).'
      }
    ],
    commonPitfalls: [
      'Big-bang activation: switching from legacy authorization to active OPA blocking without a 14-day shadow discrepancy evaluation.',
      'Treating example playbook numbers (e.g. k >= 10 or 80%) as approved institutional policy before closing Decision Gate D-005.',
      'Failing to test emergency rollback procedures in staging under simulated network partitions.'
    ]
  }
];

export interface SatrePillarDetail {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  keyRequirements: string[];
  playbookMapping: string;
  icon: string;
}

export type EhdsComparisonDomain =
  | 'All'
  | 'Gateway & Permits'
  | 'SPE Security'
  | 'Output Checking'
  | 'Federation & Standards';

export interface EhdsCrosswalkRow {
  id: string;
  domain: Exclude<EhdsComparisonDomain, 'All'>;
  ehdsArticle: string;
  ehdsMandate: string;
  satrePillar: string;
  waveboundControl: string;
  ukBoundaryNote: string;
}

export interface EhdsTimelineMilestone {
  year: string;
  dateLabel: string;
  phaseTitle: string;
  legalDeliverables: string;
  sdeImpact: string;
  custodianImpact: string;
  researcherImpact: string;
}

export interface ExternalResource {
  title: string;
  organization: string;
  category: 'Standards & Architecture' | 'Governance & Caldicott' | 'Disclosure Control' | 'Policy as Code & Web Standards' | 'AI & Autonomous Agents';
  url: string;
  description: string;
}

export const SATRE_PILLARS: SatrePillarDetail[] = [
  {
    id: 'satre-ig',
    name: 'Information Governance',
    shortDesc: 'Statutory compliance, Caldicott 8 principles, NHS Section 251, UK GDPR Art 6/9, and ethics approvals.',
    fullDesc: 'Pillar 1 of SATRE 2.0 embeds statutory compliance, ethical oversight, Information Governance (IG) risk management, and Patient and Public Involvement and Engagement (PPIE) into researcher accreditation, project registration, and data-sharing protocols through auditable governance assertions.',
    keyRequirements: [
      'Documented lawful basis under UK General Data Protection Regulation (UK GDPR) Article 6(1)(e) (Public Task) and Article 9(2)(j) (Scientific Research), alongside the Common Law Duty of Confidentiality.',
      'Caldicott Eight Principles and Patient and Public Involvement and Engagement (PPIE) embedded into access appraisal workflows.',
      'NHS Health Research Authority (HRA) Research Ethics Committee (REC) favourable opinion verification.',
      'Confidentiality Advisory Group (CAG) Section 251 (NHS Act 2006) statutory support validation where consent is impracticable.',
      'Mandatory annual Information Governance (IG) training certification and accredited Safe Researcher status verification.'
    ],
    playbookMapping: 'Modelled in ontology/governance_core.ttl and evaluated in ontology/shapes/access-shapes.ttl.',
    icon: 'Scale'
  },
  {
    id: 'satre-infra',
    name: 'Computing Technology & Infrastructure',
    shortDesc: 'Zero-egress isolated cloud enclaves, microsegmented VPCs, FIDO2 MFA, and ephemeral compute.',
    fullDesc: 'Pillar 2 (Computing Technology & Information Security) specifies technical boundaries ensuring sensitive health data remains confined within an isolated Trusted Research Environment (TRE)—implementing zero outbound internet (WAN) egress, pixel-only remote desktops, phishing-resistant Multi-Factor Authentication (MFA), and ephemeral non-root workloads.',
    keyRequirements: [
      'Zero external internet egress routing (disabled across Virtual Private Cloud (VPC) gateways, Calico/eBPF kernel policies, and network firewalls).',
      'Microsegmentation preventing unauthorised inter-project network traffic and lateral host traversal.',
      'Ephemeral, non-root read-only workspace lifecycles that terminate cleanly upon session closure.',
      'Centralised identity management enforcing FIDO2 Multi-Factor Authentication (MFA) and short-lived scoped tokens.',
      'Quarantined internal PyPI/CRAN package mirrors and strict network segregation between storage tiers and analytical compute nodes.'
    ],
    playbookMapping: 'Evaluated via tre:enclaveEgressBlocked true in access-shapes.ttl and Open Policy Agent (OPA) admission rules.',
    icon: 'Server'
  },
  {
    id: 'satre-data',
    name: 'Data Management',
    shortDesc: 'Clinical data tiering, de-identification pipelines, data dictionary ontologies, and integrity hashing.',
    fullDesc: 'Pillar 3 (Data Management) governs the complete clinical data lifecycle: ingestion, curation, de-identification, semantic metadata catalogues, SHA-256 cryptographic lineage hashing, and Statistical Disclosure Control (SDC) verification prior to output release.',
    keyRequirements: [
      'Structured hospital operational tiering (Tier 1: Aggregate/Synthetic, Tier 2: De-identified Pseudonymous, Tier 3: Sensitive Clinical under Section 251).',
      'Systematic separation of direct identifiers (names, NHS numbers, full postcodes) paired with upstream NHS National Data Opt-Out (NDOO) exclusion.',
      'Semantic data dictionaries mapping clinical tables to SNOMED-CT, ICD-10, OPCS-4, and DCAT-AP / HealthDCAT-AP metadata standards.',
      'Cryptographic checksumming (SHA-256) and W3C PROV-O lineage records verifying dataset integrity and Statistical Disclosure Control (SDC) output clearance.'
    ],
    playbookMapping: 'Formalised in ontology/tre-core.ttl and mapped to hospital sensitivity tiers in ontology/governance_core.ttl.',
    icon: 'Database'
  },
  {
    id: 'satre-supporting',
    name: 'Supporting Capabilities',
    shortDesc: 'Service management, GitOps Policy-as-Code pipelines, PySHACL validation, training, and continuity.',
    fullDesc: 'Pillar 4 (Supporting Capabilities in SATRE v1 and 2.0) encompasses the organisational, service management, and software engineering processes needed to sustain an environment safely over time—including Information Technology Service Management (ITSM), user training, procurement, business continuity, GitOps policy validation, and immutable provenance logging.',
    keyRequirements: [
      'Information Technology Service Management (ITSM), incident response, business continuity planning, and ISO/IEC 27001 Information Security Management System (ISMS) governance.',
      'Structured researcher onboarding, Safe Researcher Training delivery, and operational helpdesk support.',
      'Version-controlled GitOps Policy-as-Code (PaC) repository with PySHACL closed-world validation and Open Policy Agent (OPA) Rego compilation in Continuous Integration (CI).',
      'Append-only audit lineage using W3C PROV-O RDF triples recording every admission decision and two-person airlock sign-off.'
    ],
    playbookMapping: 'Documented across .github/workflows/ci.yml, compiler/, tests/, and ISMS SOP-01 to SOP-04.',
    icon: 'Workflow'
  },
  {
    id: 'satre-federation',
    name: 'Federation',
    shortDesc: 'SATRE 2.0 fifth pillar: multi-TRE interoperability, federated queries, RO-Crate, and cross-site trust.',
    fullDesc: 'Introduced in SATRE 2.0 (DARE UK TREvolution), Pillar 5 establishes specifications for multi-TRE interoperability—addressing federated dataset discovery, distributed non-disclosive analysis (such as DataSHIELD), portable Five Safes RO-Crate audit bundles, and technical correspondence with European Health Data Space (EHDS) nodes.',
    keyRequirements: [
      'Cross-TRE federated identity federation, mutual accreditation recognition, and harmonised Data Access Committee assurance.',
      'Bring-code-to-data distributed execution (DataSHIELD nfilter disclosure checks or federated workflow containers) without centralising row-level Patient Identifiable Data (PID).',
      'Portable audit packaging via Five Safes RO-Crate (ro-crate-metadata.json) carrying W3C PROV-O traces and airlock release tickets.',
      'Interoperable metadata exchange schemas aligned with the Health Data Research Innovation Gateway (HDR UK) and European HealthDCAT-AP catalogues.'
    ],
    playbookMapping: 'Implemented conceptually via Five Safes RO-Crate packaging, federated OPA bundles, and the EU EHDS cross-walk.',
    icon: 'Globe'
  }
];

export const EHDS_CROSSWALK_ROWS: EhdsCrosswalkRow[] = [
  {
    id: 'ehds-cw-1',
    domain: 'Gateway & Permits',
    ehdsArticle: 'Art. 46–49 · Health Data Access Body (HDAB) Data Permits',
    ehdsMandate: 'Secondary health data access requires a formal, purpose-bound Data Permit issued by a Member State Health Data Access Body (HDAB); raw datasets cannot be requested directly from hospitals.',
    satrePillar: 'Pillar 1 · Information Governance',
    ukBoundaryNote: 'Significant institutional difference: EHDS creates statutory HDABs empowered to compel data holders to share records under mandatory time-limits. In the UK, SATRE is non-statutory; access relies on voluntary Trust/SDE participation, HRA Research Ethics Committee (REC) review, Confidentiality Advisory Group (CAG) Section 251 support, and local Data Access Committees.',
    waveboundControl: 'tre:SafeProject binds verified HRA/REC ethics opinions, Section 251 approvals, and lawful basis assertions to SHACL admission shapes prior to workspace provisioning.'
  },
  {
    id: 'ehds-cw-2',
    domain: 'Gateway & Permits',
    ehdsArticle: 'Art. 51–54 & 71 · Citizen Opt-Out & Prohibited Uses',
    ehdsMandate: 'Prohibits secondary use for commercial advertising, insurance underwriting, or detrimental decisions against individuals; mandates Member State enforcement of citizen secondary-use opt-outs.',
    satrePillar: 'Pillar 1 · Information Governance & Pillar 3 · Data Management',
    ukBoundaryNote: 'Strong functional correspondence: the EHDS EU-wide opt-out parallels the NHS National Data Opt-Out (NDOO) and statutory restrictions under the Data Protection Act 2018. Statutory enforcement mechanisms differ across jurisdictions.',
    waveboundControl: 'Automated NHS National Data Opt-Out (NDOO) exclusion filter applied upstream of ingestion, paired with Open Policy Agent (OPA) Rego purpose allowlists rejecting non-approved analytical scopes.'
  },
  {
    id: 'ehds-cw-3',
    domain: 'SPE Security',
    ehdsArticle: 'Art. 50 · Zero-Download Secure Processing Environment (SPE)',
    ehdsMandate: 'Data users are prohibited from downloading personal or pseudonymised microdata; all computation must execute remotely inside audited Secure Processing Environments (SPEs).',
    satrePillar: 'Pillar 2 · Computing Technology & Infrastructure',
    ukBoundaryNote: 'Very close technical alignment: EHDS Article 50 SPE isolation corresponds directly to UK NHS Secure Data Environment (SDE) specifications and UKSA TRE accreditation criteria (SAQ V3.1), though detailed EU implementing acts are pending until 2027.',
    waveboundControl: 'Calico/eBPF zero-WAN egress policies, pixel-only Virtual Desktop Infrastructure (no clipboard or local drive mounting), FIDO2 Multi-Factor Authentication, and Key Management Service (KMS) AES-256 encryption.'
  },
  {
    id: 'ehds-cw-4',
    domain: 'SPE Security',
    ehdsArticle: 'Art. 50(1)(d)–(f) · Granular Audit Trails & Workload Isolation',
    ehdsMandate: 'Mandates continuous activity logging, identity attribution, session monitoring, and strict isolation between concurrent research workspaces inside the SPE.',
    satrePillar: 'Pillar 2 · Computing Technology & Pillar 4 · Supporting Capabilities',
    ukBoundaryNote: 'Close technical alignment with ISO/IEC 27001:2022 Annex A.8.15 (Logging) and A.8.22 (Network Segregation) expected under UKSA TRE Standard Operating Procedures, subject to formal verification in EU implementing specifications.',
    waveboundControl: 'Non-root readOnlyRootFilesystem containers, per-project namespace microsegmentation, and append-only W3C PROV-O Security Information and Event Management (SIEM) audit logs.'
  },
  {
    id: 'ehds-cw-5',
    domain: 'Output Checking',
    ehdsArticle: 'Art. 50(1)(c) · Strictly Anonymised Output Export',
    ehdsMandate: 'Restricts exports from Secure Processing Environments solely to non-personal, anonymised or aggregated statistical outputs verified against re-identification risk.',
    satrePillar: 'Pillar 3 · Data Management (Output Checking)',
    ukBoundaryNote: 'High methodological alignment: matches UK Safe Data Access Professionals (SDAP) Statbarn and DARE UK SACRO output-checking conventions, while recognising that member-state HDABs will apply harmonised EU anonymisation guidance.',
    waveboundControl: 'Quantitative Statistical Disclosure Control (SDC) rules enforcing primary suppression (k >= 10), complementary secondary masking, dominance ceilings (<= 80%), and two-person SHA-256 airlock release.'
  },
  {
    id: 'ehds-cw-6',
    domain: 'Federation & Standards',
    ehdsArticle: 'Art. 55–57 · Dataset Discovery Catalogues (HealthDCAT-AP)',
    ehdsMandate: 'Requires data holders to publish standardised dataset metadata and data quality and utility labels so authorised applicants can discover cohorts across EU Member States.',
    satrePillar: 'Pillar 3 · Data Management & Pillar 5 · Federation',
    ukBoundaryNote: 'Convergence requires deliberate schema mapping: UK SDEs typically publish via the HDR UK Innovation Gateway, whereas EHDS mandates the European HealthDCAT-AP profile alongside quality labels.',
    waveboundControl: 'Semantic clinical data dictionary (SNOMED-CT, ICD-10, OPCS-4) structured to support bilateral crosswalks between HDR UK metadata records and DCAT-AP / HealthDCAT-AP profiles.'
  },
  {
    id: 'ehds-cw-7',
    domain: 'Federation & Standards',
    ehdsArticle: 'Art. 75 · HealthData@EU Cross-Border Network',
    ehdsMandate: 'Establishes a central cross-border infrastructure connecting national Health Data Access Bodies and authorised SPE nodes for multi-country research and regulatory queries.',
    satrePillar: 'Pillar 5 · Federation (SATRE 2.0 / TREvolution)',
    ukBoundaryNote: 'Critical post-Brexit boundary: as a third country outside the EU, the UK has no automatic statutory seat on HealthData@EU. UK participation depends on international data-transfer adequacy, bilateral consortia agreements, and third-country node rules under Article 63.',
    waveboundControl: 'Portable Five Safes RO-Crate (ro-crate-metadata.json) provenance bundles, DataSHIELD nfilter non-disclosive node checks, and verifiable W3C PROV-O release records.'
  }
];

export const EHDS_TIMELINE_MILESTONES: EhdsTimelineMilestone[] = [
  {
    year: '2025',
    dateLabel: '26 March 2025',
    phaseTitle: 'Regulation (EU) 2025/327 Enters into Force',
    legalDeliverables: 'Publication in the Official Journal of the European Union commences a 24-month legislative transition period. The European Commission begins drafting secondary Implementing Acts defining binding technical specifications for Secure Processing Environments (Article 50), HealthDCAT-AP metadata schemas, Data Permit templates, and HealthData@EU federation protocols.',
    sdeImpact: 'Provides UK SDE architects and DARE UK working groups with the statutory European reference baseline for technical alignment—without creating immediate legal obligations on NHS Trusts.',
    custodianImpact: 'NHS and academic TRE operators should map existing SATRE 2.0 Pillars 2–5 controls against Article 50 SPE criteria and adopt HealthDCAT-AP-compatible metadata fields early to avoid costly retrofits.',
    researcherImpact: 'UK–EU consortium grant bids (e.g., Horizon Europe / NIHR international cohorts) can reference Wavebound and SATRE 2.0 controls as prospective technical equivalence alongside UK GDPR transfer safeguards.'
  },
  {
    year: '2027',
    dateLabel: 'March 2027',
    phaseTitle: 'General Application & National HDAB Designation',
    legalDeliverables: 'General date of application of the Regulation across EU Member States. Each Member State must designate one or more national Health Data Access Bodies (HDABs) with statutory powers, and the European Commission formally adopts core Implementing Acts covering SPE security baselines, fee structures, and cross-border query standards.',
    sdeImpact: 'Formalises the EU-wide single-gateway model (HDABs), sharpens UK–EU bilateral governance requirements (third-country node rules and UK GDPR adequacy), and crystallises technical SPE compliance checklists.',
    custodianImpact: 'EU hospitals and registries begin formal catalogue onboarding with national HDABs; UK platforms partnering with EU institutions must verify dual conformance across UKSA SAQ V3.1 and published EU Article 50 implementing specs.',
    researcherImpact: 'Researchers pursuing multi-country European studies transition toward standardised single-application EU Data Permit workflows rather than negotiating disparate hospital-by-hospital bilateral agreements.'
  },
  {
    year: '2029',
    dateLabel: 'March 2029',
    phaseTitle: 'Core Secondary Use & Mandatory SPE Operations Commence',
    legalDeliverables: 'Binding obligations take effect for primary electronic health record (EHR) systems, patient registries, claims databases, and mortality records. Secondary-use data access must execute exclusively within accredited, zero-download Secure Processing Environments under HDAB Data Permits, enforcing mandatory citizen opt-outs and Article 50(1)(c) anonymised output checks.',
    sdeImpact: 'Zero-download SPEs, quantitative Statistical Disclosure Control airlocks, and machine-readable audit logs shift from best-practice recommendations to legally enforceable cross-border operating requirements across the EEA.',
    custodianImpact: 'Any federated UK TRE acting as a host or partner analytics node in European trials will face stringent external audit expectations covering FIDO2 MFA, kernel egress blocking, and two-person output release provenance.',
    researcherImpact: 'Direct raw microdata transfers between EU and UK research workstations become untenable for core EHR datasets; studies rely predominantly on remote in-SPE analysis or federated bring-code-to-data protocols (e.g., DataSHIELD).'
  },
  {
    year: '2031',
    dateLabel: 'March 2031',
    phaseTitle: 'Full Scope Expansion to Genomics, Biobanks & Clinical Trials',
    legalDeliverables: 'Secondary-use mandates expand to higher-risk data categories: human genetic, genomic, and proteomic data, biobanks, wellness and mobile health applications, and clinical trial datasets—accompanied by stricter safeguards against single-individual re-identification and unauthorised algorithmic extraction.',
    sdeImpact: 'Elevates the criticality of Wavebound multi-tier isolation (Hospital Tiers 1–3), strict AI model weight disclosure review, and non-disclosive omics summary gates within federated TREs.',
    custodianImpact: 'Genomic and multimodal custodians must segregate raw sequencing files behind high-assurance Safe Data controls and validate that trained machine learning checkpoints cannot memorise or leak rare variant carriers.',
    researcherImpact: 'International genomic and clinical-trial meta-analyses operate inside tightly governed cross-border SPE federations, requiring researcher accreditation, ethical provenance, and disclosure-checked outputs packaged in interoperable manifests (such as Five Safes RO-Crate).'
  }
];

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    title: 'SATRE Official Specification',
    organization: 'DARE UK / UKRI / Alan Turing Institute',
    category: 'Standards & Architecture',
    url: 'https://satre-specification.readthedocs.io/',
    description: 'The definitive Standard Architecture for Trusted Research Environments (SATRE) reference specification—spanning the 4 v1 core pillars (Information Governance, Computing Technology, Data Management, Supporting Capabilities) plus Federation in SATRE 2.0.'
  },
  {
    title: 'DARE UK (Data and Analytics Research Environments UK)',
    organization: 'UK Research and Innovation (UKRI)',
    category: 'Standards & Architecture',
    url: 'https://dareuk.org.uk/',
    description: 'National program establishing an interoperable network of secure, trusted data research environments across the United Kingdom.'
  },
  {
    title: 'National Data Guardian for Health and Care & Caldicott Principles',
    organization: 'UK Government & NHS England',
    category: 'Governance & Caldicott',
    url: 'https://www.gov.uk/government/groups/national-data-guardian',
    description: 'Statutory guidance on the 8 Caldicott Principles and safe information sharing across the NHS, social care, and health research.'
  },
  {
    title: 'Health Research Authority (HRA) & Confidentiality Advisory Group',
    organization: 'Health Research Authority (HRA)',
    category: 'Governance & Caldicott',
    url: 'https://www.hra.nhs.uk/approvals-amendments/what-approvals-do-i-need/confidentiality-advisory-group/',
    description: 'Official portal for Section 251 statutory exemptions and NHS Research Ethics Committee (REC) approvals.'
  },
  {
    title: 'Statistical Disclosure Control for Tables & Counts',
    organization: 'Office for National Statistics (ONS)',
    category: 'Disclosure Control',
    url: 'https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/disclosurecontrol',
    description: 'Official UK national statistical guidelines on primary cell suppression (k >= 10), dominance rules, and secondary cell masking.'
  },
  {
    title: 'SAIL Databank Output Review Protocol',
    organization: 'Secure Anonymised Information Linkage (Swansea University)',
    category: 'Disclosure Control',
    url: 'https://saildatabank.com/wp-content/uploads/2022/08/SAIL-POL-024-Output-Review-Policy-v1.2-3.pdf',
    description: 'World-leading clinical TRE output disclosure control standard operating procedures and airlock guidelines.'
  },
  {
    title: 'Open Policy Agent (OPA) Documentation',
    organization: 'Cloud Native Computing Foundation (CNCF)',
    category: 'Policy as Code & Web Standards',
    url: 'https://www.openpolicyagent.org/docs/latest/',
    description: 'Official documentation and Rego language specification for general-purpose decoupled policy enforcement.'
  },
  {
    title: 'W3C Shapes Constraint Language (SHACL) Recommendation',
    organization: 'World Wide Web Consortium (W3C)',
    category: 'Policy as Code & Web Standards',
    url: 'https://www.w3.org/TR/shacl/',
    description: 'The W3C formal standard for describing and validating RDF data with Closed-World constraints and validation reports.'
  },
  {
    title: 'W3C PROV-O: The PROV Ontology',
    organization: 'World Wide Web Consortium (W3C)',
    category: 'Policy as Code & Web Standards',
    url: 'https://www.w3.org/TR/prov-o/',
    description: 'The W3C standard ontology defining entities, activities, and agents for provenance modeling and audit trails.'
  },
  {
    title: 'Model Context Protocol (MCP) Specification',
    organization: 'Anthropic / Model Context Protocol',
    category: 'Policy as Code & Web Standards',
    url: 'https://modelcontextprotocol.io/',
    description: 'Open standard protocol enabling safe, structured tool discovery and execution boundaries for AI models and autonomous agents.'
  },
  {
    title: 'Stanford UIT Agentic AI Security Framework',
    organization: 'Stanford University Information Technology (UIT)',
    category: 'AI & Autonomous Agents',
    url: 'https://uit.stanford.edu/security/agenticai/security-framework',
    description: 'Foundational framework mandating automated near-instantaneous token revocation, blast radius containment, and human sponsor accountability.'
  },
  {
    title: 'Stanford UIT Agentic AI Risk Classifications (Sections 8702 & 8938)',
    organization: 'Stanford University Information Technology (UIT)',
    category: 'AI & Autonomous Agents',
    url: 'https://uit.stanford.edu/security/agenticai/riskclassifications',
    description: 'Four-tier risk classification for autonomous AI agents, mandating human-in-the-loop approvals for High Risk workflows (#8702) and prohibiting autonomous Very High Risk execution (#8938).'
  }
];
