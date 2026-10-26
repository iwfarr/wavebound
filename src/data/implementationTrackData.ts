export interface SprintSchedule {
  sprint: string;
  weeks: string;
  phase: string;
  title: string;
  subtitle: string;
  goal: string;
  accountableRoles: string[];
  operationalDeliverables: {
    artifact: string;
    description: string;
    path?: string;
  }[];
  safeguardsAndNonBreaking: string[];
  exitGates: string[];
}

export interface DecisionRecord {
  id: string;
  title: string;
  status: 'OPEN' | 'APPROVED' | 'IN_REVIEW' | 'SUPERSEDED';
  accountableOwner: string;
  requiredReviewers: string[];
  decisionStatement: string;
  optionsConsidered: string[];
  rationaleAndEvidence: string;
  blocks: string;
  nonBreakingImpact: string;
}

export interface ChecklistItem {
  id: string;
  phaseNumber: number;
  phaseName: string;
  type: 'SETUP' | 'DECISION REQUIRED' | 'IMPLEMENT' | 'VERIFY';
  decisionRef?: string;
  text: string;
  details: string;
  verificationEvidence: string;
}

export interface RolloutStage {
  stage: number;
  name: string;
  mode: 'evaluate-only' | 'shadow' | 'canary' | 'active';
  tagline: string;
  productionImpact: string;
  trafficPercentage: string;
  trafficHandling: string;
  failureMode: string;
  exitCriteria: string[];
  rollbackProcedure: string;
}

export const GRANULAR_16_WEEK_TIMELINE: SprintSchedule[] = [
  {
    sprint: 'Sprint 1',
    weeks: 'Weeks 1–2',
    phase: 'Phase 1: Knowledge Modeling',
    title: 'Inception, System Boundaries & GitOps Scaffolding',
    subtitle: 'Decoupling policy metadata from live cluster telemetry without touching running services',
    goal: 'Establish the repository, CI linting pipelines, and formal definitions of research governance metadata versus ephemeral Kubernetes runtime state.',
    accountableRoles: ['Service Owner', 'Policy Owner', 'DevOps / Infrastructure Lead'],
    operationalDeliverables: [
      {
        artifact: 'GitOps Repository Hierarchy',
        description: 'Standard tree layout (ontology/, compiler/, security/opa/, tests/fixtures/) with pre-commit Turtle linters.',
        path: 'tre-policy-as-code/.github/workflows/ci.yml'
      },
      {
        artifact: 'Metadata vs Runtime Boundary Document',
        description: 'Matrix delineating static assertions (ethics approvals, researcher accreditation) from dynamic state (active pod IPs, node memory).',
        path: 'docs/architecture/boundary-matrix.md'
      },
      {
        artifact: 'Synthetic Testing Sandbox Fixtures',
        description: 'De-identified mock RDF graphs containing non-sensitive test entities for local development.',
        path: 'tests/fixtures/synthetic-cohort-01.ttl'
      }
    ],
    safeguardsAndNonBreaking: [
      'Zero production cluster access is granted or required during this sprint.',
      'All modeling is performed offline using synthetic mock graphs and CI validation pipelines.',
      'Existing LDAP, Active Directory, and manual review queues continue operating untouched.'
    ],
    exitGates: [
      'D-001 (First Production Decision Scope) approved by service and policy owners.',
      'CI pipeline executes `rdfpipe` and Turtle syntax validation on pull requests without error.'
    ]
  },
  {
    sprint: 'Sprint 2',
    weeks: 'Weeks 3–4',
    phase: 'Phase 1: Knowledge Modeling',
    title: 'Baseline Ontologies & Hospital Operational Tiers',
    subtitle: 'Authoring tre-core.ttl and governance_core.ttl to capture Caldicott and SATRE principles',
    goal: 'Formalize the Five Safes (Safe People, Safe Projects, Safe Settings, Safe Data, Safe Outputs) into an extensible OWL 2 ontology mapped to hospital data sensitivity tiers.',
    accountableRoles: ['Information Governance (IG) Lead', 'Clinical Data Steward', 'Ontologist / Knowledge Engineer'],
    operationalDeliverables: [
      {
        artifact: 'Core TRE OWL 2 Ontology',
        description: 'Classes and object properties formalizing researcher accreditation, project ethics clearance, and egress policies.',
        path: 'ontology/tre-core.ttl'
      },
      {
        artifact: 'Governance & Statutory Mapping',
        description: 'Classes encoding NHS Section 251 exemptions, UK GDPR legal bases, and SATRE 4 pillars.',
        path: 'ontology/governance_core.ttl'
      },
      {
        artifact: 'Quantitative SDC Ontology',
        description: 'Formal definitions for primary cell suppression ($k \\ge 10$) and dominance concentration rules.',
        path: 'ontology/sdc_rules.ttl'
      }
    ],
    safeguardsAndNonBreaking: [
      'Ontology files are descriptive specifications only; no PDP daemon is connected to authorization routers.',
      'Hospital data remains in existing databases; only schema terms and class hierarchies are published.'
    ],
    exitGates: [
      'D-002 (Statutory Authority & Interpretation) signed off by clinical governance committee.',
      'Ontology graphs load cleanly in Protégé and pass W3C RDF triple validation.'
    ]
  },
  {
    sprint: 'Sprint 3',
    weeks: 'Weeks 5–6',
    phase: 'Phase 2: Validation Logic',
    title: 'Closed-World Constraint Engineering (SHACL Shapes)',
    subtitle: 'Resolving Open-World Assumption (OWA) into deterministic Closed-World (CWA) security validation',
    goal: 'Write SHACL shapes that reject graphs missing mandatory security assertions (e.g. missing IG certificate or missing zero-egress network tag).',
    accountableRoles: ['Policy Engineer', 'Security Architect', 'Lead QA Engineer'],
    operationalDeliverables: [
      {
        artifact: 'Workspace Admission Shapes',
        description: 'SHACL node shapes validating that researcher nodes possess active IG certifications and valid REC approval.',
        path: 'ontology/shapes/access-shapes.ttl'
      },
      {
        artifact: 'Airlock Output Shapes',
        description: 'SHACL property shapes validating min observed cell counts ($k \\ge 10$) and dominance bounds ($k\\% \\le 80\\%$).',
        path: 'ontology/shapes/sdc_shapes.ttl'
      },
      {
        artifact: 'Autonomous Agent Bounds Shape',
        description: 'SHACL constraints restricting MCP tools to read-only queries (`mcp:ExecuteSQL`, `mcp:ExportSummary`).',
        path: 'ontology/shapes/agent_mcp.ttl'
      }
    ],
    safeguardsAndNonBreaking: [
      'SHACL shapes are evaluated in standalone pytest execution runners against test fixtures.',
      'No latency or load is added to hospital authentication servers.'
    ],
    exitGates: [
      'D-004 (Decision Semantics & Missing Input Handling) formal table approved.',
      'Demonstrated 100% rejection rate for synthetic graphs missing mandatory security properties.'
    ]
  },
  {
    sprint: 'Sprint 4',
    weeks: 'Weeks 7–8',
    phase: 'Phase 2: Validation Logic',
    title: 'Automated Test Harness & PySHACL Regression Suite',
    subtitle: 'Constructing positive, negative, and adversarial test fixtures in CI/CD',
    goal: 'Implement a comprehensive test suite that executes PySHACL against dozens of compliance edge cases, proving that non-compliant sessions are reliably denied.',
    accountableRoles: ['QA Automation Lead', 'Security Reviewer', 'Policy Engineer'],
    operationalDeliverables: [
      {
        artifact: 'Compliant & Non-Compliant Session Fixtures',
        description: '30+ synthetic session graphs representing expired IG certificates, unapproved REC amendments, and small-cell leaks.',
        path: 'tests/fixtures/*.ttl'
      },
      {
        artifact: 'PySHACL Pytest Test Suite',
        description: 'Automated test suite asserting `conforms == True` on valid sessions and `conforms == False` with correct violation messages on invalid ones.',
        path: 'tests/test_shapes.py'
      },
      {
        artifact: 'Adversarial Mutation Tester',
        description: 'CI script that intentionally mutates shapes and asserts that tests fail (proving test sensitivity).',
        path: 'tests/verify_test_rigor.py'
      }
    ],
    safeguardsAndNonBreaking: [
      'Tests execute purely in GitHub Actions runners; zero live infrastructure interaction.',
      'Strict prohibition of real patient identifiers or hospital NHS numbers in test fixture files.'
    ],
    exitGates: [
      '100% pass rate across all positive and negative test cases in CI.',
      'D-005 (Quantitative Disclosure Rules) approved by SDC Lead before airlock testing.'
    ]
  },
  {
    sprint: 'Sprint 5',
    weeks: 'Weeks 9–10',
    phase: 'Phase 3: Public Documentation & Portal',
    title: 'Dual-Persona Portals & Automated Governance Reporting',
    subtitle: 'Generating plain-English FOI charters and interactive Cytoscape knowledge graphs',
    goal: 'Automate the generation of human-readable governance documentation from Turtle ontologies and deploy an interactive explorer for board members, researchers, and patients.',
    accountableRoles: ['Technical Writer', 'Frontend Engineer', 'Patient & Public Involvement (PPI) Representative'],
    operationalDeliverables: [
      {
        artifact: 'Automated Governance Charter Generator',
        description: 'Python script extracting RDF comments, legal bases, and SDC thresholds into Markdown and PDF.',
        path: 'compiler/generate_docs.py'
      },
      {
        artifact: 'Dual-Persona Web Interface',
        description: 'Public-facing React/Cytoscape application presenting plain-English governance journeys alongside semantic graph navigation.',
        path: 'web/index.html & src/components/GovernanceAtlas.tsx'
      },
      {
        artifact: 'Freedom of Information (FOI) Report',
        description: 'Published documentation detailing exact data retention horizons and access criteria for public scrutiny.',
        path: 'dist/GOVERNANCE_CHARTER.md'
      }
    ],
    safeguardsAndNonBreaking: [
      'Public portal is hosted on decoupled static storage (GitHub Pages / Cloud CDN) with zero access to internal TRE subnets.',
      'Public portal cannot execute administrative commands or alter policy files.'
    ],
    exitGates: [
      'Trust Board and Caldicott Guardian review and accept the generated Governance Charter.',
      'Public UI accessibility standards (WCAG 2.1 AA) verified.'
    ]
  },
  {
    sprint: 'Sprint 6',
    weeks: 'Weeks 11–12',
    phase: 'Phase 3: Public Documentation & Portal',
    title: 'OPA Rego Compiler Toolchain & Semantic Drift Verification',
    subtitle: 'Compiling high-level Turtle/SHACL ontologies into sub-millisecond Open Policy Agent rules',
    goal: 'Build the compiler that turns high-level RDF knowledge graphs into compiled OPA Rego rules (`authz.rego`), verifying semantic equivalence between graph constraints and Rego logic.',
    accountableRoles: ['Compiler Engineer', 'Policy-as-Code Architect', 'Security Engineer'],
    operationalDeliverables: [
      {
        artifact: 'RDF-to-Rego Compiler Tool',
        description: 'Deterministic Python compiler reading `tre-core.ttl` and `access-shapes.ttl` and emitting optimized OPA Rego code.',
        path: 'compiler/rdf_to_rego.py'
      },
      {
        artifact: 'Compiled Target PDP Policy',
        description: 'Production-ready Rego rules for workspace admission and airlock release evaluating in <2 milliseconds.',
        path: 'security/opa/authz.rego'
      },
      {
        artifact: 'Semantic Equivalence Verification Script',
        description: 'Bilingual test harness running the identical JSON input against both PySHACL and OPA, verifying identical allow/deny verdicts.',
        path: 'tests/test_compiler_parity.py'
      }
    ],
    safeguardsAndNonBreaking: [
      'Compiler runs as a build-time artifact generator in CI; no dynamic runtime compilation inside production pods.',
      'Generated Rego files are committed to Git with cryptographic SHA-256 hashes to prevent undetected tampering.'
    ],
    exitGates: [
      'D-006 (Engine and Policy Source of Truth) formally signed off.',
      'Parity test verifies 100% identical verdicts between PySHACL and compiled OPA Rego across all test fixtures.'
    ]
  },
  {
    sprint: 'Sprint 7',
    weeks: 'Weeks 13–14',
    phase: 'Phase 4: Runtime Enforcement',
    title: 'PEP Integration & Non-Breaking Shadow Mode Evaluation',
    subtitle: 'Connecting OPA to Kubernetes and API Gateways in Evaluate-Only & Shadow Mode',
    goal: 'Integrate the compiled OPA policy engine with production infrastructure control points without altering live decisions, recording real-world decisions in parallel.',
    accountableRoles: ['Platform / Kubernetes Engineer', 'Site Reliability Engineer (SRE)', 'Security Architect'],
    operationalDeliverables: [
      {
        artifact: 'Kubernetes Admission Webhook (Audit Mode)',
        description: 'ValidatingWebhookConfiguration intercepting JupyterLab workspace pod launches in `failurePolicy: Ignore` / evaluate-only mode.',
        path: 'deploy/k8s/admission-webhook-shadow.yaml'
      },
      {
        artifact: 'Shadow Discrepancy Logger',
        description: 'Microservice logging differences between legacy access control decisions and Seawater Rego evaluations.',
        path: 'deploy/telemetry/discrepancy-logger.py'
      },
      {
        artifact: 'Airlock Shadow Filter',
        description: 'Automated SDC scanner running in parallel with human airlock reviewers, comparing automated flags with human decisions.',
        path: 'deploy/airlock/sdc-shadow-evaluator.py'
      }
    ],
    safeguardsAndNonBreaking: [
      'Evaluate-Only Mode: Seawater PDP returns verdicts, but the webhook always allows traffic. Real researchers never get blocked.',
      'Zero impact on existing workflows: If OPA experiences high latency or crashes, requests fall through to legacy handlers unimpeded.',
      'Weekly discrepancy review meetings analyze edge cases to tune policy rules before enforcement.'
    ],
    exitGates: [
      'D-007 (Enforcement Point & Rollout Mode) approved by operational change authority.',
      'Discrepancy rate between legacy authorization and Seawater Rego drops below 0.1% over 14 consecutive days.'
    ]
  },
  {
    sprint: 'Sprint 8',
    weeks: 'Weeks 15–16',
    phase: 'Phase 4: Runtime Enforcement',
    title: 'Canary Rollout, W3C PROV-O Audit Lineage & Safe Rollback Drills',
    subtitle: 'Transitioning from Canary to Active Enforcement with immutable cryptographic audit trails and tested instant rollback',
    goal: 'Enable active policy enforcement for a canary project, verify W3C PROV-O audit emission, execute a simulated emergency rollback drill, and expand to full production.',
    accountableRoles: ['Lead Operations Approver', 'Service Owner', 'Caldicott Guardian', 'SRE Incident Commander'],
    operationalDeliverables: [
      {
        artifact: 'Production Active Admission Controller',
        description: 'Enforcing Kubernetes Webhook (`failurePolicy: Fail` with fail-open emergency bypass switch).',
        path: 'deploy/k8s/admission-webhook-prod.yaml'
      },
      {
        artifact: 'W3C PROV-O Audit Emitter',
        description: 'Daemon emitting signed RDF provenance triples for every access decision to an append-only object store.',
        path: 'deploy/audit/prov_emitter.py'
      },
      {
        artifact: 'Emergency Rollback Runbook & Feature Flag',
        description: 'Tested 1-command rollback flipping enforcement back to shadow mode in <30 seconds.',
        path: 'docs/runbooks/emergency-rollback.md'
      }
    ],
    safeguardsAndNonBreaking: [
      'Canary deployment: Policy enforcement is first enabled only for 1 non-clinical test namespace.',
      'Emergency Bypass Flag: A cluster-level environment variable immediately reverts the PEP to bypass mode if false-positive denials occur.',
      'Mandatory rollback exercise: The operational team executes a simulated failure drill in staging before production go-live.'
    ],
    exitGates: [
      'D-008 (Audit & Retention) and D-009 (Change & Release Governance) signed and closed.',
      'Live rollback drill successfully executed in staging under 60 seconds.',
      'Formal sign-off by Caldicott Guardian and Service Owner approving production enforcement.'
    ]
  }
];

export const ROLLOUT_STAGES: RolloutStage[] = [
  {
    stage: 0,
    name: 'Stage 0: Synthetic Fixtures & Offline Compilation',
    mode: 'evaluate-only',
    tagline: 'Purely offline sandbox development with zero cluster footprint',
    productionImpact: 'None (0% risk to deployed systems)',
    trafficPercentage: '0% live traffic',
    trafficHandling: 'Executes against mock RDF graphs and de-identified fixture files in local developer workstations and CI/CD runners.',
    failureMode: 'Tests fail locally or in PR checks. Production infrastructure is completely unaffected.',
    exitCriteria: [
      'PySHACL test suite passes 100% on synthetic compliant & non-compliant fixtures.',
      'Compiler parity test confirms OPA Rego produces identical verdicts to PySHACL shapes.',
      'Decision register gates D-001 through D-005 formally signed off by owners.'
    ],
    rollbackProcedure: 'Git branch rejection or revert. No deployed services to rollback.'
  },
  {
    stage: 1,
    name: 'Stage 1: Evaluate-Only Mode (Passive Telemetry)',
    mode: 'evaluate-only',
    tagline: 'PDP evaluates live production requests, but verdicts are purely informational',
    productionImpact: 'Negligible (non-blocking monitoring)',
    trafficPercentage: '100% live requests observed, 0% blocked',
    trafficHandling: 'Kubernetes admission webhook and airlock send input contexts to OPA. OPA evaluates the policy and logs the verdict, but the PEP unconditionally permits the action regardless of outcome.',
    failureMode: 'Fail-Open by default: If OPA crashes, times out (>50ms), or errors, the PEP immediately allows the request and increments a telemetry error metric.',
    exitCriteria: [
      'OPA evaluation latency verified at p99 < 3ms under peak hospital cluster load.',
      'Zero crashes or resource leaks in OPA sidecar daemons over 7 consecutive days.',
      'Discrepancy logs reviewed to confirm absence of unexpected false-positive denies.'
    ],
    rollbackProcedure: 'Set `WEBHOOK_EVALUATE_ONLY=true` or delete the ValidatingWebhookConfiguration object.'
  },
  {
    stage: 2,
    name: 'Stage 2: Shadow Mode (Side-by-Side Discrepancy Auditing)',
    mode: 'shadow',
    tagline: 'Automated discrepancy detection comparing Seawater verdicts with legacy authorizations',
    productionImpact: 'Zero disruption (Legacy rules still make all binding decisions)',
    trafficPercentage: '100% live requests compared',
    trafficHandling: 'Legacy access controls (Active Directory/manual IG ticket queues) continue to enforce decisions. In parallel, Seawater evaluates the request. If `seawater_verdict != legacy_verdict`, an alert is dispatched to the governance triage channel.',
    failureMode: 'Non-blocking: Discrepancy logger failures do not impede user access.',
    exitCriteria: [
      'Zero unexplained discrepancies between legacy approvals and Seawater rules over 14 consecutive days.',
      'All legitimate edge cases (e.g. multi-institution honorary contracts) documented in tre-core.ttl.',
      'D-007 (Enforcement Point & Mode) reviewed by Security Operations Center (SOC).'
    ],
    rollbackProcedure: 'Disable discrepancy logger daemon; system continues running pure legacy authorization.'
  },
  {
    stage: 3,
    name: 'Stage 3: Canary Enforcement (Scoped Pilot Project)',
    mode: 'canary',
    tagline: 'Active policy enforcement restricted to a single low-risk research cohort',
    productionImpact: 'Isolated (Impact strictly bounded to 1 pilot namespace)',
    trafficPercentage: '5–10% of total cluster workloads',
    trafficHandling: 'Seawater actively blocks or permits requests, but only for requests bearing the label `tre.cohort: pilot-synthetic` or targeting a dedicated staging enclave namespace. All other namespaces remain in evaluate-only mode.',
    failureMode: 'Emergency circuit breaker: If Canary pod launch failure rate exceeds 1% or p99 latency exceeds 15ms, automated circuit breaker flips namespace to bypass mode.',
    exitCriteria: [
      'Canary researchers execute full analytics lifecycles (workspace provision, compute run, airlock export) without erroneous blockages.',
      'W3C PROV-O audit records successfully emitted and cryptographically verified in append-only storage.',
      'Live rollback drill executed in staging environment in under 60 seconds.'
    ],
    rollbackProcedure: 'Run `kubectl label namespace canary-ns tre.seawater.enforce=false` or toggle Redis feature flag `seawater:enforce:canary = 0`.'
  },
  {
    stage: 4,
    name: 'Stage 4: Active Multi-PEP Enforcement (Full Production)',
    mode: 'active',
    tagline: 'End-to-end automated enforcement across Kubernetes admission, network, and airlock egress',
    productionImpact: 'Authoritative (Seawater Rego is the authoritative gatekeeper)',
    trafficPercentage: '100% of research workspace admissions and airlock releases',
    trafficHandling: 'Full production PEP integration: Kubernetes ValidatingAdmissionWebhook blocks un-accredited researchers; airlock service blocks tabular outputs violating $k \\ge 10$ or dominance $\\le 80\\%$.',
    failureMode: 'Tiered Fail-Safe: Internal workspace admission fails OPEN with high-priority PagerDuty alert if OPA cluster is partitioned; Airlock egress fails CLOSED (zero data ever leaves without verified policy grant).',
    exitCriteria: [
      'Continuous compliance verified with automated weekly governance report exports.',
      'All 9 Decision Register gates (D-001 through D-009) approved, dated, and archived.',
      'Quarterly review cadence established with Caldicott Guardian and Information Governance Board.'
    ],
    rollbackProcedure: 'Execute tested emergency runbook `make rollback-to-shadow`, flipping admission controllers to shadow telemetry within 30 seconds.'
  }
];

export const DECISION_REGISTER: DecisionRecord[] = [
  {
    id: 'D-001',
    title: 'First Production Decision & Boundary Scope',
    status: 'IN_REVIEW',
    accountableOwner: 'Service Owner and Policy Owner (to be named)',
    requiredReviewers: ['Clinical Governance Lead', 'TRE Operations Manager'],
    decisionStatement: 'Select one bounded operational decision to control, its subjects, scope, protected resource, and explicit exclusions. Workspace admission and output release are candidates; workspace admission is recommended as initial slice.',
    optionsConsidered: [
      'Option A: Narrow Workspace Admission (JupyterLab pod provisioning for accredited researchers)',
      'Option B: Automated Airlock Tabular Output Release (SDC cell suppression)',
      'Option C: Full Platform Big-Bang Enforcement (Not recommended: high operational risk)'
    ],
    rationaleAndEvidence: 'Workspace admission provides an explicit binary decision boundary (permit/deny pod launch) with zero risk of statistical data leakage, allowing the policy pipeline to be verified before tackling complex output differencing.',
    blocks: 'Input contract definition, policy behavior, test fixtures, and PEP webhook deployment.',
    nonBreakingImpact: 'Selecting a narrow decision allows running in Evaluate-Only mode on a single test namespace without affecting general clinical users.'
  },
  {
    id: 'D-002',
    title: 'Statutory Authority & Legal Interpretation',
    status: 'IN_REVIEW',
    accountableOwner: 'Governance/Policy Owner with Qualified Legal/IG Reviewer',
    requiredReviewers: ['Data Protection Officer (DPO)', 'Caldicott Guardian', 'Legal Counsel'],
    decisionStatement: 'Identify applicable jurisdiction, authoritative source documents, statutory versions (NHS Section 251, UK GDPR Art. 6/9, Common Law Duty of Confidentiality), and annual review cadence.',
    optionsConsidered: [
      'Option A: UK GDPR Health & Care Research Protocol (NHS Act 2006 s251 + COPI regulations)',
      'Option B: De-identified Anonymisation Standard (ICO Draft Anonymisation Code 2021)',
      'Option C: Generic Enterprise RBAC (Insufficient for clinical research environments)'
    ],
    rationaleAndEvidence: 'Clinical TREs operating under NHS digital health frameworks require statutory grounding to defend researcher access against public audits and patient advocacy inquiries.',
    blocks: 'All normative policy statements, ethical clearance attributes, and data retention rules.',
    nonBreakingImpact: 'Purely legal and governance documentation; zero technical impact on running infrastructure.'
  },
  {
    id: 'D-003',
    title: 'Trusted Inputs, Data Sources & Provenance',
    status: 'OPEN',
    accountableOwner: 'System/Data Owners & Security Architecture Lead',
    requiredReviewers: ['Identity & Access Management (IAM) Lead', 'Database Administrator'],
    decisionStatement: 'For every input attribute (researcher identity, IG certification date, ethics clearance, hospital data tier), establish the authoritative source, verification method, token freshness (e.g. max 15-minute token age), and offline failure behavior.',
    optionsConsidered: [
      'Option A: Signed OIDC JWT tokens issued by Institutional IdP + cached LDAP attributes',
      'Option B: Real-time query to NHS Digital Central Accreditation Register via API',
      'Option C: Static configuration file committed to Git (Fragile and stale)'
    ],
    rationaleAndEvidence: 'Signed OIDC tokens with cryptographically verified claims provide sub-millisecond local evaluation in OPA without introducing network latency or availability dependencies during pod admission.',
    blocks: 'Reliable runtime evaluations, input contract validation, and admission webhook speed.',
    nonBreakingImpact: 'Can be developed against mock JWT claims; no changes to production Identity Provider until Stage 2.'
  },
  {
    id: 'D-004',
    title: 'Decision Semantics, Missing Inputs & Authorized Exceptions',
    status: 'OPEN',
    accountableOwner: 'Policy Owner and Operational SRE Lead',
    requiredReviewers: ['Lead Security Reviewer', 'Information Governance Manager'],
    decisionStatement: 'Define explicit outcomes (Permit, Deny, Defer); specify exact system behavior when an input attribute is missing, stale, or contradictory; establish temporary emergency exception procedures and expiry limits.',
    optionsConsidered: [
      'Option A: Strict Closed-World (Any missing or unverified attribute defaults to immediate Deny)',
      'Option B: Permissive Fallback with Security Alert (Permits access but pages on-call security)',
      'Option C: Hybrid (Workspace admission fails open with alert; Airlock egress fails closed)'
    ],
    rationaleAndEvidence: 'Hybrid failure semantics guarantee patient confidentiality (data never leaks out) while preventing catastrophic research downtime if an internal identity cache momentarily blips.',
    blocks: 'OPA Rego rule authoring, default rule fallback statements, and automated error handling.',
    nonBreakingImpact: 'Shadow mode testing will surface all missing attributes in real requests before rules become blocking.'
  },
  {
    id: 'D-005',
    title: 'Quantitative Statistical Disclosure Control (SDC) Rules',
    status: 'OPEN',
    accountableOwner: 'Statistical Disclosure Control Lead & Caldicott Representative',
    requiredReviewers: ['Senior Biostatistician', 'Airlock Operations Lead'],
    decisionStatement: 'Approve applicable disclosure thresholds ($k \\ge 10$), dominance concentration ratio ($k\\% \\le 80\\%$), rounding rules, secondary suppression methods, and differencing across repeated queries.',
    optionsConsidered: [
      'Option A: Standard ONS/SAIL Guidelines ($k \\ge 10$, Top 2 dominance $\\le 80\\%$)',
      'Option B: Relaxed Aggregation ($k \\ge 5$ for low-risk regional summaries)',
      'Option C: Differential Privacy Budgeting (Complex algorithmic overhead, experimental)'
    ],
    rationaleAndEvidence: 'ONS/SAIL $k \\ge 10$ guidelines represent the gold standard accepted by UK health research councils and NHS England SDE frameworks.',
    blocks: 'Production airlock export automation; does NOT block workspace admission slices.',
    nonBreakingImpact: 'Airlock shadow mode runs alongside human reviewers to validate automated flags without slowing export queues.'
  },
  {
    id: 'D-006',
    title: 'Runtime Policy Engine & Source of Truth Architecture',
    status: 'OPEN',
    accountableOwner: 'Architecture Owner & Policy-as-Code Engineering Lead',
    requiredReviewers: ['Kubernetes Infrastructure Lead', 'Lead Software Architect'],
    decisionStatement: 'Select runtime execution engine (OPA Rego) and specify whether OWL 2/SHACL serves as authoritative specification compiled into Rego, or whether Rego is authored directly with RDF parity validation.',
    optionsConsidered: [
      'Option A: Dual-Tier (OWL/SHACL is human/legal source of truth; compiler generates OPA Rego for sub-ms runtime)',
      'Option B: Native OPA Rego Only (Fastest execution, but lacks semantic interoperability and FOI graph reporting)',
      'Option C: Native SPARQL/PySHACL in Production (Too high latency for admission webhooks: >250ms)'
    ],
    rationaleAndEvidence: 'Dual-Tier provides the best of both worlds: semantic transparency and graphical auditability for Trust boards and regulators, compiled down to microsecond Rego for Kubernetes admission controllers.',
    blocks: 'Compiler script architecture, CI pipeline build steps, and developer repository workflow.',
    nonBreakingImpact: 'Artifact generation occurs completely in CI before deployment; zero runtime compiler overhead.'
  },
  {
    id: 'D-007',
    title: 'Enforcement Point (PEP) Selection & Rollout Strategy',
    status: 'OPEN',
    accountableOwner: 'Service Owner and Platform Operations Lead',
    requiredReviewers: ['Security Operations Center (SOC)', 'DevOps Lead'],
    decisionStatement: 'Select exact control point (Kubernetes ValidatingAdmissionWebhook, Istio Service Mesh, or Envoy API Gateway); determine staged progression from evaluate-only to shadow, canary, and full enforcement.',
    optionsConsidered: [
      'Option A: Kubernetes ValidatingAdmissionWebhook with Istio Egress Gateway',
      'Option B: Reverse Proxy API Gateway (Envoy/Kong)',
      'Option C: Application-Level Middleware inside researcher notebooks (Insecure: bypassable)'
    ],
    rationaleAndEvidence: 'Kubernetes admission webhooks intercept pod provisioning before containers are scheduled on worker nodes, making bypass impossible from within user code.',
    blocks: 'Production deployment manifests, cluster RBAC bindings, and fail-safe circuit breaker.',
    nonBreakingImpact: 'Webhook starts in `failurePolicy: Ignore` (evaluate-only mode); live services operate without interruption.'
  },
  {
    id: 'D-008',
    title: 'Audit Lineage, Provenance & Retention Horizon',
    status: 'OPEN',
    accountableOwner: 'Audit Lead, Privacy Officer & SRE Operations Lead',
    requiredReviewers: ['Information Security Manager', 'Compliance Auditor'],
    decisionStatement: 'Approve schema for recorded decision logs (policy commit hash, inputs, outcome, reason codes, timestamp), storage destination (append-only S3 bucket with Object Lock), access permissions, and retention duration (e.g. 7 years).',
    optionsConsidered: [
      'Option A: W3C PROV-O RDF Triples written to immutable Write-Once-Read-Many (WORM) storage',
      'Option B: Standard JSON logs ingested into Elasticsearch / Splunk',
      'Option C: Relational SQL audit database'
    ],
    rationaleAndEvidence: 'W3C PROV-O provides mathematical non-repudiation and cryptographic linkage between decisions and specific policy Git commit hashes, satisfying statutory health audit requirements.',
    blocks: 'Production audit verification, forensic replay capabilities, and regulatory compliance sign-off.',
    nonBreakingImpact: 'Audit logs are emitted asynchronously via message queue or sidecar; failure to write audit logs does not block researcher compute during testing.'
  },
  {
    id: 'D-009',
    title: 'Change Governance, Release Authority & Rollback Procedures',
    status: 'OPEN',
    accountableOwner: 'Policy Owner & Service Release Authority',
    requiredReviewers: ['Change Advisory Board (CAB)', 'Caldicott Guardian', 'Incident Commander'],
    decisionStatement: 'Define peer review requirements for policy pull requests, release cadence (SemVer), emergency hotfix bypass protocols, automated rollback triggers, and mandatory rollback drills.',
    optionsConsidered: [
      'Option A: GitOps PR approval requiring 2 reviewers (1 Policy Owner + 1 Security Engineer) + automated PySHACL passing in CI',
      'Option B: Manual change advisory board ticket approval before each release',
      'Option C: Developer ad-hoc commits (Strictly prohibited)'
    ],
    rationaleAndEvidence: 'GitOps with dual-persona sign-off guarantees that every policy change is version-controlled, automatedly verified, and instantly rollbackable with `git revert`.',
    blocks: 'Production deployment rights, release management automation, and operational handover.',
    nonBreakingImpact: 'Ensures the operations team possesses a tested runbook to revert to previous policy releases in under 60 seconds if issues emerge.'
  }
];

export const IMPLEMENTATION_CHECKLIST: ChecklistItem[] = [
  // Phase 0
  {
    id: 'chk-0-1',
    phaseNumber: 0,
    phaseName: 'Scope & Ownership',
    type: 'SETUP',
    text: 'Inventory playbook statements and label as illustrative, externally sourced, or formally approved.',
    details: 'Catalogue every statement, threshold, and assumption in the educational playbook. Record the statutory source, current local status, and review date.',
    verificationEvidence: 'Completed Inventory Spreadsheet linked in repo docs/governance/statement-inventory.md.'
  },
  {
    id: 'chk-0-2',
    phaseNumber: 0,
    phaseName: 'Scope & Ownership',
    type: 'SETUP',
    text: 'Identify named service owner, policy owner, security reviewer, legal/IG reviewer, and operational approver.',
    details: 'Ensure every critical role has a designated, accountable individual with written authority to accept risk and sign off on policy releases.',
    verificationEvidence: 'RACI matrix signed by hospital Trust informatics leadership.'
  },
  {
    id: 'chk-0-3',
    phaseNumber: 0,
    phaseName: 'Scope & Ownership',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-001',
    text: 'Select and approve the first narrow production decision, subjects, and out-of-scope operations.',
    details: 'Narrow initial scope to a single high-value, bounded decision (e.g. Workspace Admission PEP) rather than attempting platform-wide big-bang enforcement.',
    verificationEvidence: 'Approved Decision Record D-001 signed by Service and Policy owners.'
  },
  {
    id: 'chk-0-4',
    phaseNumber: 0,
    phaseName: 'Scope & Ownership',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-002',
    text: 'Approve applicable jurisdictions, authoritative standards, and qualified legal/IG interpretations.',
    details: 'Document applicable UK GDPR articles, NHS Section 251 exemption rules, and SATRE governance pillars.',
    verificationEvidence: 'Approved Decision Record D-002 signed by DPO and Caldicott Guardian.'
  },

  // Phase 1
  {
    id: 'chk-1-1',
    phaseNumber: 1,
    phaseName: 'Decision & Input Contract',
    type: 'SETUP',
    text: 'Draft versioned input contract with field names, data types, freshness, and provenance.',
    details: 'Specify exact JSON schema delivered to the PDP (e.g. `researcher_id`, `accreditation_expiry`, `ethics_approved`, `hospital_data_tier`).',
    verificationEvidence: 'JSON Schema definition committed to `security/opa/input-schema-v1.json`.'
  },
  {
    id: 'chk-1-2',
    phaseNumber: 1,
    phaseName: 'Decision & Input Contract',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-003',
    text: 'Approve authoritative source and trust model for every security-relevant input attribute.',
    details: 'Confirm where identity, training, ethics, and dataset classification claims originate and how they are cryptographically validated.',
    verificationEvidence: 'Approved Decision Record D-003 with IAM integration architecture.'
  },
  {
    id: 'chk-1-3',
    phaseNumber: 1,
    phaseName: 'Decision & Input Contract',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-004',
    text: 'Approve decision semantics, treatment of missing/stale inputs, and emergency exception paths.',
    details: 'Written decision table covering all combinations of valid, missing, expired, and malformed inputs.',
    verificationEvidence: 'Approved Decision Record D-004 with signed truth table.'
  },
  {
    id: 'chk-1-4',
    phaseNumber: 1,
    phaseName: 'Decision & Input Contract',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-005',
    text: 'Approve quantitative statistical disclosure control (SDC) rules, units, and boundary conditions.',
    details: 'Formally approve cell count threshold ($k \\ge 10$) and dominance concentration limit ($k\\% \\le 80\\%$).',
    verificationEvidence: 'Approved Decision Record D-005 signed by SDC Committee.'
  },
  {
    id: 'chk-1-5',
    phaseNumber: 1,
    phaseName: 'Decision & Input Contract',
    type: 'SETUP',
    text: 'Create synthetic input fixtures covering valid, boundary, missing, stale, and contradictory values.',
    details: 'Author non-sensitive test fixtures in `tests/fixtures/` with zero personal patient data.',
    verificationEvidence: 'Fixture test suite passing in CI without personal data flags.'
  },

  // Phase 2
  {
    id: 'chk-2-1',
    phaseNumber: 2,
    phaseName: 'Policy Implementation & Tests',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-006',
    text: 'Select runtime engine, policy source of truth, and generated artifact ownership.',
    details: 'Decide relationship between OWL 2/SHACL ontologies and compiled OPA Rego policies.',
    verificationEvidence: 'Approved Decision Record D-006 with options evaluation matrix.'
  },
  {
    id: 'chk-2-2',
    phaseNumber: 2,
    phaseName: 'Policy Implementation & Tests',
    type: 'IMPLEMENT',
    text: 'Add smallest executable policy for selected decision with SemVer and provenance metadata.',
    details: 'Write initial `authz.rego` and `access-shapes.ttl` covering the approved first decision slice.',
    verificationEvidence: 'Code committed with SHA-256 hash and version metadata tags.'
  },
  {
    id: 'chk-2-3',
    phaseNumber: 2,
    phaseName: 'Policy Implementation & Tests',
    type: 'IMPLEMENT',
    text: 'Add automated tests for permitted, denied, boundary, missing, malformed, and exception cases.',
    details: 'Write PySHACL and OPA unit tests asserting correct verdicts across all test fixtures.',
    verificationEvidence: 'Pytest test report showing 100% pass across 40+ unit test cases.'
  },
  {
    id: 'chk-2-4',
    phaseNumber: 2,
    phaseName: 'Policy Implementation & Tests',
    type: 'VERIFY',
    text: 'Demonstrate tests fail when a key security rule is inverted or removed (mutation testing).',
    details: 'Intentionally comment out cell count check or accreditation check; verify that CI immediately breaks.',
    verificationEvidence: 'CI mutation test logs confirming test failure on inverted security rules.'
  },

  // Phase 3
  {
    id: 'chk-3-1',
    phaseNumber: 3,
    phaseName: 'Enforcement Integration',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-007',
    text: 'Select enforcement point and staged progression mode (evaluate-only, shadow, canary, active).',
    details: 'Confirm deployment target (Kubernetes admission webhook) and operational failure response.',
    verificationEvidence: 'Approved Decision Record D-007 and architecture diagram.'
  },
  {
    id: 'chk-3-2',
    phaseNumber: 3,
    phaseName: 'Enforcement Integration',
    type: 'IMPLEMENT',
    text: 'Integrate policy at selected server-side control point in non-breaking evaluate-only mode.',
    details: 'Deploy ValidatingAdmissionWebhook with `failurePolicy: Ignore` and discrepancy logging.',
    verificationEvidence: 'Kubernetes webhook active in cluster; zero requests blocked; logs flowing to telemetry.'
  },
  {
    id: 'chk-3-3',
    phaseNumber: 3,
    phaseName: 'Enforcement Integration',
    type: 'VERIFY',
    text: 'In staging environment, prove operation is blocked and permitted according to fixtures without bypass.',
    details: 'Attempt to launch non-compliant pod directly via `kubectl`; verify that active webhook rejects provisioning.',
    verificationEvidence: 'Staging cluster audit logs recording rejected admission attempt with exact policy rule cite.'
  },

  // Phase 4
  {
    id: 'chk-4-1',
    phaseNumber: 4,
    phaseName: 'Audit, Release & Operations',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-008',
    text: 'Approve decision evidence schema, access controls, retention schedule, and audit storage destination.',
    details: 'Formally define W3C PROV-O audit emission, immutable storage, and privacy limits.',
    verificationEvidence: 'Approved Decision Record D-008 and DPO review sign-off.'
  },
  {
    id: 'chk-4-2',
    phaseNumber: 4,
    phaseName: 'Audit, Release & Operations',
    type: 'DECISION REQUIRED',
    decisionRef: 'D-009',
    text: 'Approve change review protocol, release authority, rollback procedure, and emergency bypass.',
    details: 'Document GitOps PR requirements, release gates, and incident response runbooks.',
    verificationEvidence: 'Approved Decision Record D-009 signed by Release Authority.'
  },
  {
    id: 'chk-4-3',
    phaseNumber: 4,
    phaseName: 'Audit, Release & Operations',
    type: 'VERIFY',
    text: 'Exercise simulated emergency rollback drill in staging; record observed recovery time.',
    details: 'Simulate policy misconfiguration; execute rollback runbook; verify traffic restored in <60 seconds.',
    verificationEvidence: 'Rollback drill incident report signed by SRE Incident Commander.'
  },
  {
    id: 'chk-4-4',
    phaseNumber: 4,
    phaseName: 'Audit, Release & Operations',
    type: 'VERIFY',
    text: 'Publish operator documentation, known limitations, escalation routes, and approved release record.',
    details: 'Publish production operational handbook and verify escalation paths to on-call governance staff.',
    verificationEvidence: 'Published runbook at `docs/runbooks/operations-handbook.md`.'
  }
];
