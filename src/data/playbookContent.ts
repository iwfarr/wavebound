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
    plainEnglishSummary: 'Knowledge graphs are rich for humans and auditors, but microsecond firewalls and Kubernetes cluster controllers need lightning-fast rule evaluation. The compiler automatically translates graph rules into Open Policy Agent (OPA) Rego code.',
    summary: 'To achieve microsecond Policy Enforcement Point (PEP) latencies, the compiler (`compiler/rdf_to_rego.py` and `generate_opa.py`) translates Turtle ontology assertions and SHACL shapes into native Open Policy Agent (OPA) Rego policy documents.',
    keyPrinciples: [
      'Decoupled Policy Engine: OPA evaluates policies as code against JSON inputs at runtime without needing graph database traversals at ingress.',
      'Policy Decision Point (PDP): OPA acts as the PDP evaluating admission and egress requests.',
      'Policy Enforcement Points (PEP): Kubernetes Admission Controllers, Envoy API Gateways, and Secure File Airlocks intercept requests and query OPA.',
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
        heading: 'PEP Kubernetes Admission Integration',
        body: 'When a researcher launches a Jupyter notebook or pod, the Kubernetes validating webhook forwards the admission review to OPA. If `allow` is false, pod creation is rejected with the exact policy violation reason.'
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
      'Zero-Disruption Transition: Kubernetes ValidatingAdmissionWebhooks run in evaluate-only mode (failurePolicy: Ignore) to observe real traffic without blocking pods.',
      'Parallel Shadow Auditing: Wavebound Rego verdicts are evaluated side-by-side with legacy authorization reviews until achieving a 0.00% discrepancy rate over 14 consecutive days.',
      'Canary Scope Gating: Active enforcement is turned on exclusively in isolated non-clinical test namespaces with automatic circuit breakers.',
      'Fail-Safe Dual Semantics: Internal workspace compute fails open with alerts during OPA partitions; external airlock export fails closed to prevent data leakage.',
      'Auditable Decision Gates (D-001–D-009): Formal sign-offs by accountable owners (Caldicott, IG, SRE) before any rule is activated.',
      'Authoritative 16-Week Schedule: The complete week-by-week sprint deliverables and operational checklist are consolidated in the Implementation & Rollout Track.'
    ],
    technicalDetails: [
      {
        heading: 'Safe Transition from Overview into Production Without Breaking Deployed Services',
        body: 'Moving from an educational overview into live enforcement without service disruption requires four strict technical layers: 1) Evaluate-Only Mode (K8s webhook runs OPA in passive observation; failurePolicy: Ignore ensures zero blocked users); 2) Parallel Shadow Auditing (Wavebound Rego verdicts are compared side-by-side against legacy authorization tickets; discrepancies generate Slack/PagerDuty alerts until discrepancy rate reaches 0.00% over 14 days); 3) Canary Scoping (enforcement is activated exclusively on a single non-clinical test namespace or synthetic cohort with an automated circuit breaker); 4) Fail-Safe Defaults (internal workspace admission fails open with alerts during OPA partitions, while external airlock export fails closed to prevent data leakage).'
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
    fullDesc: 'Information Governance is the statutory cornerstone of the SATRE specification. It mandates that any Trusted Research Environment operationally embeds legal compliance into researcher accreditation, project registration, and data sharing protocols. Rather than ad-hoc agreements, SATRE requires machine-auditable mappings between project ethics reviews, Caldicott guardian mandates, and user identity.',
    keyRequirements: [
      'Documented legal basis under UK GDPR Article 6(1)(e) (Public Task) and Article 9(2)(j) (Scientific Research).',
      'Caldicott 8 Principles embedded into researcher verification and data minimization workflows.',
      'NHS Health Research Authority (HRA) Research Ethics Committee (REC) approval letter verification.',
      'Confidentiality Advisory Group (CAG) Section 251 statutory exemption validation for unconsented clinical data.',
      'Mandatory annual Information Governance (IG) training certification tracking.'
    ],
    playbookMapping: 'Modeled in ontology/governance_core.ttl and validated in ontology/shapes/access-shapes.ttl.',
    icon: 'Scale'
  },
  {
    id: 'satre-infra',
    name: 'Computing Infrastructure',
    shortDesc: 'Zero-egress hardened cloud enclaves, microsegmented VPCs, ephemeral compute, and isolated subnets.',
    fullDesc: 'The SATRE Computing Infrastructure pillar specifies technical boundaries guaranteeing that data stays inside the environment. Compute nodes (Kubernetes clusters, Jupyter containers, virtual desktops) are instantiated in locked-down Virtual Private Clouds (VPCs) with external internet routing disabled.',
    keyRequirements: [
      'Zero external internet egress routing (egress disabled at the VPC and network security group level).',
      'Microsegmentation preventing unauthorized inter-project network communication.',
      'Ephemeral workspace lifecycles where compute resources terminate cleanly upon session close.',
      'Centralized identity management with multi-factor authentication (MFA) and single sign-on (SSO).',
      'Strict isolation between raw database tiers and researcher analytics compute nodes.'
    ],
    playbookMapping: 'Enforced via tre:enclaveEgressBlocked true in access-shapes.ttl and OPA allow rules.',
    icon: 'Server'
  },
  {
    id: 'satre-data',
    name: 'Data Management',
    shortDesc: 'Clinical data tiering, de-identification pipelines, data dictionary ontologies, and integrity hashing.',
    fullDesc: 'SATRE Data Management dictates the ingestion, transformation, curation, and preservation of data. It ensures that clinical datasets are structured with rigorous metadata, direct identifiers are permanently expunged, and data is partitioned into distinct sensitivity tiers.',
    keyRequirements: [
      'Formal hospital operational tiering (Tier 1: Aggregate/Synthetic, Tier 2: Pseudonymous, Tier 3: Sensitive Clinical under s251).',
      'Permanent exclusion of direct identifiers (names, NHS numbers, full postcodes, contact info).',
      'Semantic data dictionary mapping tables and columns to standardized clinical ontologies (SNOMED-CT, ICD-10, OPCS-4).',
      'Cryptographic checksumming (SHA-256) verifying dataset immutability throughout project lifecycles.'
    ],
    playbookMapping: 'Formalized in ontology/tre-core.ttl and mapped to clinical hospital tiers in governance_core.ttl.',
    icon: 'Database'
  },
  {
    id: 'satre-ops',
    name: 'Software Operations',
    shortDesc: 'GitOps version control, PySHACL CI linting, automated OPA Rego compilation, and PROV-O audit trails.',
    fullDesc: 'Software Operations governs how software, analytical libraries, and policies are built, maintained, tested, and deployed. SATRE mandates that all policy logic and infrastructure configurations be managed through version-controlled GitOps workflows with automated CI/CD validation and cryptographic provenance logging.',
    keyRequirements: [
      'Version-controlled Policy-as-Code repository with semantic linting and tests in GitHub Actions CI.',
      'PySHACL automated test harness validating test fixtures against Closed-World shapes before release.',
      'Automated compilation pipeline (compiler/rdf_to_rego.py) translating Turtle definitions into low-latency OPA Rego.',
      'Append-only audit lineage using W3C PROV-O RDF triples recording every authorization decision and airlock review.'
    ],
    playbookMapping: 'Implemented across .github/workflows/ci.yml, compiler/, tests/, and Makefile.',
    icon: 'Workflow'
  }
];

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    title: 'SATRE Official Specification',
    organization: 'DARE UK / UKRI / Alan Turing Institute',
    category: 'Standards & Architecture',
    url: 'https://satre-specification.readthedocs.io/',
    description: 'The definitive Standard Architecture for Trusted Research Environments (SATRE) reference specification, defining the 4 pillars and evaluation statements.'
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
