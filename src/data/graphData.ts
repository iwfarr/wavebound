export type GraphLensType = 'statutory-policy' | 'cloud-fabric' | 'data-lifecycle' | 'human-roles';

export interface GraphNodeData {
  id: string;
  label: string;
  title: string;
  lensId: GraphLensType;
  category: 'Policy' | 'Shape' | 'Rule' | 'Service' | 'Enclave' | 'DataAsset' | 'HumanRole' | 'Artifact';
  tier: 'Policy Layer' | 'SHACL Constraint Layer' | 'OPA Rego Layer' | 'Cloud Fabric' | 'Audit Layer';
  badge: string;
  description: string;
  patientReassurance: string;
  statutoryBasis: string;
  sourceFile: string;
  fullDefinition: string;
  rdfClassSnippet?: string;
  shaclSnippet?: string;
  regoSnippet?: string;
  provoSnippet?: string;
  codeSnippet?: string;
  glossaryTermId?: string;
  conceptModuleId?: string;
  stateHash?: string;
  simulatorConfig?: {
    inputLabel: string;
    fields: { key: string; label: string; type: 'boolean' | 'number'; defaultVal: any }[];
    evaluate: (vals: Record<string, any>) => { allowed: boolean; reason: string; ruleEvaluated: string };
  };
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship: string;
  lensId: GraphLensType;
}

export interface GraphNodeElement {
  data: GraphNodeData;
  position?: { x: number; y: number };
}

export interface LensMeta {
  id: GraphLensType;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  rationale: string;
  iconName: string;
  nodeCount: number;
}

export const LENS_DEFINITIONS: Record<GraphLensType, LensMeta> = {
  'statutory-policy': {
    id: 'statutory-policy',
    title: 'Statutory & Policy-as-Code Lens',
    badge: 'IG Handbook & Caldicott Foundation',
    tagline: 'From UK Law to Machine-Verifiable RDF & Rego Guardrails',
    description: 'Visualizes how statutory instruments (UK GDPR Art. 6/9, NHS Act 2006 S251, Caldicott Principles 1–8) formalize into W3C OWL/RDF ontologies and compile into sub-millisecond OPA Rego admission gatekeepers.',
    rationale: 'Essential for Caldicott Guardians, DAAG committees, and Data Protection Officers verifying that human law directly governs machine execution.',
    iconName: 'Scale',
    nodeCount: 8
  },
  'cloud-fabric': {
    id: 'cloud-fabric',
    title: 'Cloud Fabric & Enclave PEP Lens',
    badge: 'Zero-Trust Technical Architecture',
    tagline: 'Perimeter Ingress, Ephemeral Workloads & High-Throughput Data Planes',
    description: 'Maps the sovereign cloud execution architecture: perimeter TLS reverse proxies, non-blocking admission policy controllers (failurePolicy: Ignore), air-gapped package ingestion mirrors, root-read-only compute enclaves, and direct high-throughput columnar data planes.',
    rationale: 'Designed for cloud infrastructure architects, platform security engineers, and SATRE v1.1 auditors evaluating technical network boundaries and zero internet egress across any cloud or sovereign data center.',
    iconName: 'Server',
    nodeCount: 7
  },
  'data-lifecycle': {
    id: 'data-lifecycle',
    title: 'Data Lifecycle & SDC Airlock Lens',
    badge: 'Flow Governance & Quantitative Privacy',
    tagline: 'From Raw Hospital Extracts to Cryptographically Sealed Releases',
    description: 'Traces microdata movement from secondary uses ingestion, through National Data Opt-Out (NDOO) purging, salted HMAC pseudonymisation, in-enclave cohort queries, and automated Statistical Disclosure Control (k ≥ 10, dominance ≤ 80%).',
    rationale: 'Critical for disclosure control leads, data custodians, and researchers verifying that confidential records can never be deduced from published summaries.',
    iconName: 'Workflow',
    nodeCount: 6
  },
  'human-roles': {
    id: 'human-roles',
    title: 'Human Roles & Oversight Lens',
    badge: 'Human-in-the-Loop Governance',
    tagline: 'Statutory Accountability & Committee Delegations',
    description: 'Models institutional human accountability: Caldicott Guardian & SIRO authorizations, HRA REC ethics approvals, Accredited Lead Researcher credentials, SDC Output Checker dual-signoff, and Patient & Public Advisory Council co-design.',
    rationale: 'Demonstrates to citizens, trust boards, and regulators that autonomous algorithms remain under strict human-in-the-loop stewardship.',
    iconName: 'Users',
    nodeCount: 6
  }
};

// ==========================================
// 1. STATUTORY & POLICY-AS-CODE LENS NODES
// ==========================================
const STATUTORY_NODES: GraphNodeElement[] = [
  {
    data: {
      id: 'pol_FiveSafes',
      lensId: 'statutory-policy',
      label: 'tre:FiveSafesFramework',
      title: 'Five Safes Governance Core',
      category: 'Policy',
      tier: 'Policy Layer',
      badge: 'Statutory Anchor',
      description: 'Foundational framework mapping clinical data governance, ethics approvals, and operational tiers.',
      patientReassurance: 'Ensures research is only conducted when all five safety dimensions (People, Projects, Settings, Data, Outputs) are simultaneously satisfied.',
      statutoryBasis: 'National Statistician Data Ethics Framework; Caldicott Principles 1–8.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'five-safes',
      conceptModuleId: 'five-safes',
      stateHash: 'sha256:5a91e4f201bc...',
      fullDefinition: 'Formalized in ontology/tre-core.ttl as the root governance dimension aligning NHS Caldicott Principles, UK GDPR, and SATRE standards across People, Projects, Settings, Data, and Outputs.',
      rdfClassSnippet: `tre:FiveSafesDimension a owl:Class .
tre:SafePerson rdfs:subClassOf tre:FiveSafesDimension .
tre:SafeProject rdfs:subClassOf tre:FiveSafesDimension .
tre:SafeSetting rdfs:subClassOf tre:FiveSafesDimension .
tre:SafeData rdfs:subClassOf tre:FiveSafesDimension .
tre:SafeOutput rdfs:subClassOf tre:FiveSafesDimension .`,
      codeSnippet: `tre:FiveSafesDimension a owl:Class .`
    },
    position: { x: 100, y: 180 }
  },
  {
    data: {
      id: 'pol_SafePerson',
      lensId: 'statutory-policy',
      label: 'tre:SafePerson',
      title: 'Safe Person (Accreditation)',
      category: 'Policy',
      tier: 'Policy Layer',
      badge: 'DEA 2017 Part 5',
      description: 'Mandatory researcher institutional accreditation and verified annual NHS Information Governance (IG) training.',
      patientReassurance: 'Only verified scientists with background checks and legal training can access research environments.',
      statutoryBasis: 'Digital Economy Act 2017 § 64; NHS Caldicott Principle 5.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'safe-person',
      conceptModuleId: 'five-safes',
      stateHash: 'sha256:7b42a99c01de...',
      fullDefinition: 'Mandates that any researcher accessing clinical records must hold verified institutional affiliation, have undergone Caldicott-aligned IG training, and hold a valid digital identity.',
      rdfClassSnippet: `tre:SafePerson a owl:Class ;
    tre:requiresAccreditation true ;
    tre:requiresAnnualIGTraining true ;
    tre:maxTrainingValidityDays 365 .`,
      shaclSnippet: `tre:SafePersonShape a sh:NodeShape ;
    sh:targetClass tre:Researcher ;
    sh:property [
        sh:path tre:isAccredited ;
        sh:hasValue true ;
        sh:message "Researcher must hold valid DEA 2017 accreditation." ;
    ] .`,
      regoSnippet: `allow_researcher {
    input.researcher.accredited == true
    input.researcher.ig_training_expiry > time.now_ns()
}`,
      simulatorConfig: {
        inputLabel: 'Evaluate Researcher Credentials',
        fields: [
          { key: 'accredited', label: 'DEA 2017 Accredited', type: 'boolean', defaultVal: true },
          { key: 'igTrained', label: 'Annual NHS IG Training Valid', type: 'boolean', defaultVal: true }
        ],
        evaluate: (vals) => {
          if (!vals.accredited) return { allowed: false, reason: 'Researcher lacks statutory DEA 2017 accreditation.', ruleEvaluated: 'tre:SafePersonShape § 2.1' };
          if (!vals.igTrained) return { allowed: false, reason: 'Mandatory annual NHS IG training is expired.', ruleEvaluated: 'tre:SafePersonShape § 2.2' };
          return { allowed: true, reason: 'Credentials verified: Researcher admitted to authentication tier.', ruleEvaluated: 'opa:tre.authz/allow_researcher' };
        }
      }
    },
    position: { x: 300, y: 70 }
  },
  {
    data: {
      id: 'pol_SafeProject',
      lensId: 'statutory-policy',
      label: 'tre:SafeProject',
      title: 'Safe Project (REC & S251)',
      category: 'Policy',
      tier: 'Policy Layer',
      badge: 'UK GDPR Art 6/9',
      description: 'Policy requiring NHS REC ethics approval, Section 251 exemption, and demonstrative public benefit.',
      patientReassurance: 'No project proceeds without independent ethical review confirming health benefit to society.',
      statutoryBasis: 'Health Research Authority (HRA) Framework; NHS Act 2006 S251.',
      sourceFile: 'ontology/governance_core.ttl',
      glossaryTermId: 'safe-project',
      conceptModuleId: 'five-safes',
      stateHash: 'sha256:1a84f3e992aa...',
      fullDefinition: 'Requires that the research protocol is approved by an independent NHS Research Ethics Committee (REC) and has an approved legal basis under UK GDPR Articles 6(1)(e) and 9(2)(j).',
      shaclSnippet: `tre:SafeProjectShape a sh:NodeShape ;
    sh:targetClass tre:ResearchProject ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Active NHS REC ethics approval is required." ;
    ] .`,
      regoSnippet: `allow_project {
    input.project.rec_approved == true
    input.project.public_benefit_score >= 80
}`
    },
    position: { x: 300, y: 190 }
  },
  {
    data: {
      id: 'pol_SafeSetting',
      lensId: 'statutory-policy',
      label: 'tre:SafeSetting',
      title: 'Safe Setting (Zero-WAN Egress)',
      category: 'Policy',
      tier: 'Policy Layer',
      badge: 'SATRE Pillar 2',
      description: 'Policy requiring zero external internet egress and microsegmented VPC computing enclaves.',
      patientReassurance: 'Data cannot be emailed, copied to USB drives, or leaked onto the external internet.',
      statutoryBasis: 'SATRE v1.1 Computing Infrastructure; ISO/IEC 27001 Annex A.13.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'safe-setting',
      conceptModuleId: 'five-safes',
      stateHash: 'sha256:9c12b77400ef...',
      fullDefinition: 'Mandates that researcher computing nodes run inside egress-disabled subnets with blocked external routing, prohibiting direct outbound internet connections and USB exfiltration.',
      shaclSnippet: `tre:SafeSettingShape a sh:NodeShape ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
    ] .`,
      regoSnippet: `network_isolated {
    input.enclave.external_wan_egress == false
    input.enclave.dns_restricted == true
}`
    },
    position: { x: 300, y: 310 }
  },
  {
    data: {
      id: 'shacl_AdmissionShape',
      lensId: 'statutory-policy',
      label: 'sh:AdmissionShape',
      title: 'SHACL Workspace Admission',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      badge: 'W3C SHACL CWA',
      description: 'Closed-World SHACL shape validating researcher accreditation, ethics approval, and egress status.',
      patientReassurance: 'Rigorous digital validator ensures any missing security attribute immediately halts workspace launch.',
      statutoryBasis: 'W3C Shapes Constraint Language; UK GDPR Art 25 Privacy by Design.',
      sourceFile: 'ontology/shapes/access-shapes.ttl',
      glossaryTermId: 'shacl',
      conceptModuleId: 'owa-to-cwa-shacl',
      stateHash: 'sha256:4d83ee11029c...',
      fullDefinition: 'Translates the Open-World Assumption (OWA) into deterministic Closed-World validation. Any missing attribute causes immediate validation failure before cluster admission.',
      shaclSnippet: `tre:AdmissionShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasAccreditedResearcher ;
        sh:minCount 1 ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
    ] .`
    },
    position: { x: 530, y: 130 }
  },
  {
    data: {
      id: 'shacl_SDCShape',
      lensId: 'statutory-policy',
      label: 'sh:SDCOutputShape',
      title: 'SHACL SDC Airlock Shape',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      badge: 'ONS k ≥ 10',
      description: 'Quantitative SHACL constraints enforcing k >= 10 and dominance ratio <= 0.80.',
      patientReassurance: 'Ensures no single patient or small group can ever be singled out from published tables.',
      statutoryBasis: 'ONS Tabular SDC Handbook; NHS Caldicott Principle 8.',
      sourceFile: 'ontology/shapes/sdc_shapes.ttl',
      glossaryTermId: 'primary-suppression',
      conceptModuleId: 'quantitative-sdc',
      stateHash: 'sha256:6e01a88b33df...',
      fullDefinition: 'Validates candidate tabular export graphs, verifying that every cell count satisfies minInclusive 10 and maxInclusive 0.80 dominance ratio.',
      shaclSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
    sh:targetClass tre:ExportArtifact ;
    sh:property [
        sh:path tre:minObservedCellCount ;
        sh:minInclusive 10 ;
    ] ;
    sh:property [
        sh:path tre:topContributorDominanceRatio ;
        sh:maxInclusive 0.80 ;
    ] .`
    },
    position: { x: 530, y: 270 }
  },
  {
    data: {
      id: 'opa_RuntimePDP',
      lensId: 'statutory-policy',
      label: 'opa:tre.authz/eval',
      title: 'OPA Rego Policy Decision Point',
      category: 'Rule',
      tier: 'OPA Rego Layer',
      badge: 'Sub-ms PEP/PDP',
      description: 'Compiled Rego rule evaluated by Kubernetes Admission Webhooks and Airlocks in < 1ms.',
      patientReassurance: 'High-speed automated gatekeeper executes uncompromising security checks on every single request.',
      statutoryBasis: 'CNCF Open Policy Agent Security Specification.',
      sourceFile: 'security/opa/authz.rego',
      glossaryTermId: 'rego',
      conceptModuleId: 'opa-rego-compilation',
      stateHash: 'sha256:0b29ff1009ee...',
      fullDefinition: 'Compiled directly from RDF/SHACL into low-latency Rego. Returns allow=true only when all statutory conditions are mathematically verified.',
      regoSnippet: `package tre.authz
default allow = false

allow {
    input.researcher.accredited == true
    input.project.rec_approved == true
    input.enclave.egress_blocked == true
}`,
      simulatorConfig: {
        inputLabel: 'Simulate Microsecond OPA Rego Decision',
        fields: [
          { key: 'researcherValid', label: 'Researcher Validated', type: 'boolean', defaultVal: true },
          { key: 'recApproved', label: 'REC Ethics Approved', type: 'boolean', defaultVal: true },
          { key: 'zeroEgress', label: 'Zero-Egress VPC Active', type: 'boolean', defaultVal: true }
        ],
        evaluate: (vals) => {
          if (!vals.researcherValid || !vals.recApproved || !vals.zeroEgress) {
            return {
              allowed: false,
              reason: 'OPA PDP DENIAL: Evaluated in 0.42ms. One or more mandatory statutory preconditions failed.',
              ruleEvaluated: 'opa:tre.authz/allow (Fail-Closed Default)'
            };
          }
          return {
            allowed: true,
            reason: 'OPA PDP ALLOW: Evaluated in 0.38ms. All 3 statutory preconditions verified.',
            ruleEvaluated: 'opa:tre.authz/allow (Authorized)'
          };
        }
      }
    },
    position: { x: 740, y: 140 }
  },
  {
    data: {
      id: 'provo_Ledger',
      lensId: 'statutory-policy',
      label: 'prov:Activity (Audit Ledger)',
      title: 'W3C PROV-O Audit Ledger',
      category: 'Artifact',
      tier: 'Audit Layer',
      badge: 'W3C PROV-O',
      description: 'Immutable RDF provenance triple emitted on every authorization grant or denial.',
      patientReassurance: 'Creates an indelible cryptographic paper trail of who accessed what data, why, and when.',
      statutoryBasis: 'UK GDPR Art 5(2) Accountability Principle; NHS Caldicott 8.',
      sourceFile: 'compiler/rdf_to_rego.py',
      glossaryTermId: 'provo',
      conceptModuleId: 'architecture-gitops-roadmap',
      stateHash: 'sha256:88fa13bc7701...',
      fullDefinition: 'Records who accessed what, when, under which policy version, and with what PDP decision in an append-only cryptographic ledger.',
      provoSnippet: `tre:AdmissionEvent a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_Admission_PDP ;
    prov:startedAtTime "2026-11-08T18:00:00Z"^^xsd:dateTime ;
    tre:decisionResult "ALLOW" ;
    tre:policyHash "sha256:0b29ff1009ee..." .`
    },
    position: { x: 740, y: 280 }
  }
];

const STATUTORY_EDGES: GraphEdgeData[] = [
  { id: 'e_fs_person', source: 'pol_FiveSafes', target: 'pol_SafePerson', label: 'specifiesDimension', relationship: 'Formalizes Safe Person', lensId: 'statutory-policy' },
  { id: 'e_fs_project', source: 'pol_FiveSafes', target: 'pol_SafeProject', label: 'specifiesDimension', relationship: 'Formalizes Safe Project', lensId: 'statutory-policy' },
  { id: 'e_fs_setting', source: 'pol_FiveSafes', target: 'pol_SafeSetting', label: 'specifiesDimension', relationship: 'Formalizes Safe Setting', lensId: 'statutory-policy' },
  { id: 'e_person_shacl', source: 'pol_SafePerson', target: 'shacl_AdmissionShape', label: 'formalizesAs', relationship: 'Compiles into Shape', lensId: 'statutory-policy' },
  { id: 'e_project_shacl', source: 'pol_SafeProject', target: 'shacl_AdmissionShape', label: 'formalizesAs', relationship: 'Compiles into Shape', lensId: 'statutory-policy' },
  { id: 'e_setting_shacl', source: 'pol_SafeSetting', target: 'shacl_AdmissionShape', label: 'formalizesAs', relationship: 'Compiles into Shape', lensId: 'statutory-policy' },
  { id: 'e_setting_sdc', source: 'pol_FiveSafes', target: 'shacl_SDCShape', label: 'enforcesOutput', relationship: 'Compiles into SDC Shape', lensId: 'statutory-policy' },
  { id: 'e_shacl_opa', source: 'shacl_AdmissionShape', target: 'opa_RuntimePDP', label: 'compilesToRego', relationship: 'Sub-ms Policy Compilation', lensId: 'statutory-policy' },
  { id: 'e_sdc_opa', source: 'shacl_SDCShape', target: 'opa_RuntimePDP', label: 'compilesToRego', relationship: 'SDC Egress Rule', lensId: 'statutory-policy' },
  { id: 'e_opa_provo', source: 'opa_RuntimePDP', target: 'provo_Ledger', label: 'emitsProvenance', relationship: 'Cryptographic Audit Triple', lensId: 'statutory-policy' }
];

// ==========================================
// 2. CLOUD FABRIC & ENCLAVE PEP LENS NODES
// ==========================================
const CLOUD_FABRIC_NODES: GraphNodeElement[] = [
  {
    data: {
      id: 'cf_IngressGateway',
      lensId: 'cloud-fabric',
      label: 'pep:PerimeterGateway',
      title: 'Perimeter TLS Ingress Gateway',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: 'mTLS Ingress Proxy',
      description: 'Terminates researcher TLS connections, inspects mTLS client certificates, and injects OIDC bearer tokens.',
      patientReassurance: 'Unauthenticated or unauthorized devices are blocked at the perimeter before touching clinical data networks.',
      statutoryBasis: 'NHS DSPT Assertion 9.4 (Perimeter Defense & Encryption in Transit).',
      sourceFile: 'deploy/gateway/perimeter-ingress.yaml',
      fullDefinition: 'High-performance reverse proxy gateway enforcing mutual TLS (mTLS), rate limiting, and web application firewalling at the perimeter.',
      codeSnippet: `apiVersion: gateway.networking/v1
kind: Gateway
metadata:
  name: tre-ingress-gateway
spec:
  listeners:
  - name: https
    port: 443
    protocol: HTTPS
    tls:
      mode: Terminate
      certificateRefs: [{ name: tre-wildcard-cert }]`,
      stateHash: 'sha256:22c019ba...'
    },
    position: { x: 100, y: 180 }
  },
  {
    data: {
      id: 'cf_AdmissionWebhook',
      lensId: 'cloud-fabric',
      label: 'pep:AdmissionController',
      title: 'Audit & Alert Admission Guard',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: 'failurePolicy: Ignore',
      description: 'Workload admission controller enforcing root-read-only filesystems and dropped capabilities with non-blocking audit-and-alert.',
      patientReassurance: 'Ensures research containers cannot escalate privileges or tamper with host operating systems.',
      statutoryBasis: 'SATRE v1.1 Computing Infrastructure § 2.2; CIS Container Security Standards.',
      sourceFile: 'deploy/admission/validating-policy.yaml',
      fullDefinition: 'Admission guard scoped strictly to project partitions. Emits SIEM alerts without blocking researcher workloads if the policy engine experiences transient network latency.',
      codeSnippet: `apiVersion: admission.policy/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: tre-enclave-guardrails
webhooks:
  - name: guardrails.tre.local
    failurePolicy: Ignore # Audit-and-alert mode prevents compute timeouts
    rules:
      - operations: ["CREATE"]
        resources: ["workloads", "containers"]`,
      stateHash: 'sha256:77bb0091...'
    },
    position: { x: 320, y: 110 }
  },
  {
    data: {
      id: 'cf_PackageDiode',
      lensId: 'cloud-fabric',
      label: 'pkg:SecureDMZMirror',
      title: 'Air-Gapped Package Diode',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: 'Zero-WAN Egress',
      description: 'Internal library, package, and container image repository mirrors quarantined in DMZ with automated CVE scanning and cryptographic signatures.',
      patientReassurance: 'Researchers cannot download untrusted, malicious code from the public internet into the patient environment.',
      statutoryBasis: 'NHS Digital Cyber Security Standard § 7; SATRE § 3.4.',
      sourceFile: 'deploy/mirrors/package-diode.yaml',
      fullDefinition: 'Four-stage air-gapped package ingestion pipeline preventing arbitrary internet package pulls while providing data scientists with verified language runtimes and mathematical libraries.',
      codeSnippet: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: private-package-mirror
spec:
  template:
    spec:
      containers:
      - name: repository-cache
        image: internal-registry.tre/system/pkg-mirror:v2.4`,
      stateHash: 'sha256:88bc4122...'
    },
    position: { x: 320, y: 260 }
  },
  {
    data: {
      id: 'cf_AnalyticPod',
      lensId: 'cloud-fabric',
      label: 'enclave:IsolatedComputeNode',
      title: 'Hardened Analytic Compute Enclave',
      category: 'Enclave',
      tier: 'Cloud Fabric',
      badge: 'UID 10001 / ReadOnly',
      description: 'Interactive analytical workbench environment running with read-only root filesystem, dropped system capabilities, and ephemeral /scratch volume.',
      patientReassurance: 'Isolated compute sandbox guarantees that analyses execute in a sterile, temporary environment that leaves no data behind upon termination.',
      statutoryBasis: 'ISO/IEC 27001 Annex A.12.1.2; NHS DSPT Assertion 9.2.',
      sourceFile: 'deploy/enclaves/hardened-analytic-enclave.yaml',
      fullDefinition: 'Least-privilege analytical node configured with securityContext { readOnlyRootFilesystem: true, runAsNonRoot: true, runAsUser: 10001, capabilities: { drop: ["ALL"] } }.',
      codeSnippet: `securityContext:
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 10001
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]`,
      stateHash: 'sha256:33de1100...'
    },
    position: { x: 540, y: 110 }
  },
  {
    data: {
      id: 'cf_DirectDataPlane',
      lensId: 'cloud-fabric',
      label: 'data:HighThroughputDataPlane',
      title: 'Direct Columnar Data Plane',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: 'Zero Proxy Overhead',
      description: 'Direct in-memory columnar query protocol and analytical engine kernel sockets bypassing userspace proxies to eliminate socket exhaustion on billion-row queries.',
      patientReassurance: 'Enables high-speed clinical research without risking server crashes or connection timeouts.',
      statutoryBasis: 'SATRE Performance & Scalability Specification § 4.1.',
      sourceFile: 'deploy/dataplane/high-throughput-data-service.yaml',
      fullDefinition: 'Direct data path connecting analytical research kernels to the read-only columnar storage engine, eliminating proxy serialization bottlenecks.',
      codeSnippet: `spec:
  ports:
  - name: analytical-flight
    port: 8815
    targetPort: 8815 # Direct TCP socket bypasses userspace proxy`,
      stateHash: 'sha256:44fe0099...'
    },
    position: { x: 540, y: 260 }
  },
  {
    data: {
      id: 'cf_OutputAirlockPEP',
      lensId: 'cloud-fabric',
      label: 'airlock:ReviewPEP',
      title: 'Two-Person Airlock PEP Gateway',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: '2-Person Sign-Off',
      description: 'Cryptographic egress airlock executing mathematical SDC shape verification and requiring dual-person digital signature before export release.',
      patientReassurance: 'No researcher can click "download" alone; every statistical output is scrutinized by automated shapes and an accredited SDC reviewer.',
      statutoryBasis: 'ONS Statistical Disclosure Control Standard; NHS Caldicott 8.',
      sourceFile: 'security/airlock/service.py',
      fullDefinition: 'Microservice intercepting candidate research files, computing SHA-256 digests, running OPA SDC checks, and holding artifacts until an accredited SDC lead co-signs.',
      codeSnippet: `def evaluate_airlock_ticket(candidate_df, sdc_reviewer_sig):
    sha256_hash = hashlib.sha256(candidate_df.to_csv().encode()).hexdigest()
    assert verify_sdc_k_threshold(candidate_df, k=10)
    assert verify_ed25519(sdc_reviewer_sig)
    return emit_release_ticket(sha256_hash)`,
      stateHash: 'sha256:55ab2211...'
    },
    position: { x: 750, y: 180 }
  },
  {
    data: {
      id: 'cf_ProvOLineage',
      lensId: 'cloud-fabric',
      label: 'prov:CloudAuditCollector',
      title: 'W3C PROV-O Cloud Audit Collector',
      category: 'Artifact',
      tier: 'Audit Layer',
      badge: 'Tamper-Evident SIEM',
      description: 'Cryptographic provenance engine capturing container start events, data queries, and airlock exports into an immutable audit stream.',
      patientReassurance: 'Complete accountability: audit records cannot be deleted or altered, even by platform administrators.',
      statutoryBasis: 'UK GDPR Art 30 Records of Processing; NHS DSPT Assertion 1.4.',
      sourceFile: 'audit/provo_collector.py',
      fullDefinition: 'Appends W3C PROV-O triples with SHA-256 state commitments directly to object storage with object-lock write-once-read-many (WORM) policy.',
      codeSnippet: `prov:wasGeneratedBy [
  a prov:Activity ;
  prov:used cf:IsolatedComputeNode ;
  prov:endedAtTime "2026-11-08T18:15:00Z"^^xsd:dateTime
] .`,
      stateHash: 'sha256:99bb1144...'
    },
    position: { x: 750, y: 310 }
  }
];

const CLOUD_FABRIC_EDGES: GraphEdgeData[] = [
  { id: 'e_cf_gw_webhook', source: 'cf_IngressGateway', target: 'cf_AdmissionWebhook', label: 'interceptsSession', relationship: 'Validates Workload Spec', lensId: 'cloud-fabric' },
  { id: 'e_cf_gw_diode', source: 'cf_IngressGateway', target: 'cf_PackageDiode', label: 'routesToMirror', relationship: 'Air-Gapped Package Proxy', lensId: 'cloud-fabric' },
  { id: 'e_cf_webhook_pod', source: 'cf_AdmissionWebhook', target: 'cf_AnalyticPod', label: 'admitsCompute', relationship: 'Least-Privilege Launch', lensId: 'cloud-fabric' },
  { id: 'e_cf_diode_pod', source: 'cf_PackageDiode', target: 'cf_AnalyticPod', label: 'suppliesLibraries', relationship: 'Internal Package Sync', lensId: 'cloud-fabric' },
  { id: 'e_cf_pod_direct', source: 'cf_AnalyticPod', target: 'cf_DirectDataPlane', label: 'executesQuery', relationship: 'Kernel Data Socket', lensId: 'cloud-fabric' },
  { id: 'e_cf_pod_airlock', source: 'cf_AnalyticPod', target: 'cf_OutputAirlockPEP', label: 'submitsExport', relationship: 'Airlock Release Request', lensId: 'cloud-fabric' },
  { id: 'e_cf_airlock_provo', source: 'cf_OutputAirlockPEP', target: 'cf_ProvOLineage', label: 'commitsAudit', relationship: 'Cryptographic PROV-O Emission', lensId: 'cloud-fabric' }
];

// ==========================================
// 3. DATA LIFECYCLE & SDC AIRLOCK LENS NODES
// ==========================================
const DATA_LIFECYCLE_NODES: GraphNodeElement[] = [
  {
    data: {
      id: 'dl_RawExtract',
      lensId: 'data-lifecycle',
      label: 'data:HESRawSecondaryExtract',
      title: 'Hospital Microdata Ingestion',
      category: 'DataAsset',
      tier: 'Cloud Fabric',
      badge: 'Confidential at Source',
      description: 'Secondary uses extract containing admitted patient care, outpatient appointments, and emergency encounters.',
      patientReassurance: 'Direct personal details (names, addresses, phone numbers) are separated at source before entering the research pipeline.',
      statutoryBasis: 'NHS Act 2006 S251; Health and Social Care Act 2012 § 259.',
      sourceFile: 'data/pipelines/ingestion_spec.sql',
      fullDefinition: 'Ingested into an isolated staging bucket with KMS envelope encryption. Accessible only to automated pseudonymisation pipelines.',
      codeSnippet: `SELECT patient_pseudo_key, episode_id, icd10_primary_diag, opcs4_procedure
FROM raw_staging.hes_apc_extract_2026;`,
      stateHash: 'sha256:11aa00ff...'
    },
    position: { x: 90, y: 190 }
  },
  {
    data: {
      id: 'dl_NDOOPurge',
      lensId: 'data-lifecycle',
      label: 'filter:NDOOPurgeEngine',
      title: 'National Data Opt-Out Purge',
      category: 'Service',
      tier: 'Policy Layer',
      badge: 'Statutory Opt-Out',
      description: 'Automated filter matching NHS Spine opt-out registers and systematically purging 14,208 records prior to enclave indexing.',
      patientReassurance: 'If you register a National Data Opt-Out, your records are automatically excluded from secondary research.',
      statutoryBasis: 'NHS National Data Opt-Out Operational Guidance; Caldicott Principle 8.',
      sourceFile: 'pipeline/ndoo_purge.py',
      fullDefinition: 'Executes against the NHS Spine Demographics National Opt-Out list. Any matching NHS number is permanently purged before researcher accessibility.',
      codeSnippet: `DELETE FROM staging_patients
WHERE nhs_number_hash IN (
  SELECT opt_out_hash FROM spine.national_data_opt_outs
); -- 14,208 records purged`,
      stateHash: 'sha256:22bb11ee...'
    },
    position: { x: 280, y: 190 }
  },
  {
    data: {
      id: 'dl_Pseudonymiser',
      lensId: 'data-lifecycle',
      label: 'crypto:SaltedHMACEngine',
      title: 'Salted HMAC SHA-256 Linker',
      category: 'Service',
      tier: 'Cloud Fabric',
      badge: 'Irreversible Pseudonym',
      description: 'Cryptographic engine generating deterministic project-specific pseudonyms using revolving HSM-stored salts.',
      patientReassurance: 'Even if researchers had access to two different projects, the patient pseudonyms would not match, preventing cross-study tracking.',
      statutoryBasis: 'ICO Anonymisation Code of Practice § 3; UK GDPR Recital 26.',
      sourceFile: 'crypto/pseudonymiser.go',
      fullDefinition: 'Computes HMAC-SHA256(patient_id, project_salt_kms). Prevents frequency-analysis attacks and eliminates linkage across unapproved studies.',
      codeSnippet: `func GenerateProjectPseudonym(nhsNumber string, projectID string) string {
    mac := hmac.New(sha256.New, getKmsKey(projectID))
    mac.Write([]byte(nhsNumber))
    return hex.EncodeToString(mac.Sum(nil))
}`,
      stateHash: 'sha256:33cc22dd...'
    },
    position: { x: 470, y: 190 }
  },
  {
    data: {
      id: 'dl_ResearchCohort',
      lensId: 'data-lifecycle',
      label: 'cohort:PediatricCardiology',
      title: 'De-Identified Research Cohort',
      category: 'DataAsset',
      tier: 'Cloud Fabric',
      badge: 'Tier 2 Pseudonymous',
      description: 'Partitioned research dataset containing de-identified clinical events, laboratory biomarkers, and therapeutic outcomes.',
      patientReassurance: 'Scientists work with high-quality clinical variables without knowing any individual patient identity.',
      statutoryBasis: 'UK GDPR Art. 9(2)(j) Scientific Research in the Public Interest.',
      sourceFile: 'data/cohorts/cardiology_cohort.duckdb',
      fullDefinition: 'DuckDB columnar database file mounted read-only inside the researcher pod. Contains no direct identifiers.',
      codeSnippet: `CREATE VIEW cohort_cardiology AS
SELECT pseudo_id, age_band, diagnosis_group, surgical_approach, survival_months
FROM enclave_data.cohort_linked;`,
      stateHash: 'sha256:44dd33cc...'
    },
    position: { x: 660, y: 190 }
  },
  {
    data: {
      id: 'dl_TabularSDC',
      lensId: 'data-lifecycle',
      label: 'sdc:StatisticalDisclosureFilter',
      title: 'Statistical Disclosure Control (SDC)',
      category: 'Rule',
      tier: 'OPA Rego Layer',
      badge: 'k ≥ 10 & Dominance ≤ 80%',
      description: 'Mathematical privacy engine evaluating candidate export tables for primary cell suppression and complementary secondary suppression.',
      patientReassurance: 'Small groups (fewer than 10 individuals) and high-dominance financial/clinical metrics are suppressed so individuals cannot be identified.',
      statutoryBasis: 'ONS Tabular SDC Guidelines § 4.2; Caldicott Principle 8.',
      sourceFile: 'sdc/disclosure_solver.py',
      fullDefinition: 'Evaluates every frequency cell for k >= 10. Solves row/column marginal totals to automatically apply secondary suppression (SUPP*) preventing mathematical subtraction leaks.',
      codeSnippet: `def solve_secondary_suppression(matrix):
    # Primary suppression: k < 10
    primary_mask = matrix < 10
    # Secondary suppression solver eliminates marginal deduction
    return apply_optimization_suppression(matrix, primary_mask)`,
      stateHash: 'sha256:55ee44bb...'
    },
    position: { x: 850, y: 130 }
  },
  {
    data: {
      id: 'dl_ReleaseTicket',
      lensId: 'data-lifecycle',
      label: 'airlock:CryptographicReleaseTicket',
      title: 'Cryptographic Airlock Release Ticket',
      category: 'Artifact',
      tier: 'Audit Layer',
      badge: 'SHA-256 Sealed',
      description: 'Immutable JSON-LD release manifest signed by automated SDC shapes and an accredited human output reviewer.',
      patientReassurance: 'Only verified statistical summaries leave the enclave, ready for open scientific publication for public benefit.',
      statutoryBasis: 'Caldicott Principle 8 Openness; W3C PROV-O Standard.',
      sourceFile: 'airlock/release_tickets/REL-2026-0042.json',
      fullDefinition: 'Contains the cryptographic SHA-256 hash of the exported table, dual reviewer signatures, and PROV-O linkage back to the ethical approval.',
      provoSnippet: `{
  "@context": "https://www.w3.org/ns/prov.jsonld",
  "id": "tre:REL-2026-0042",
  "type": "prov:Entity",
  "tre:sha256Digest": "sha256:6e01a88b...",
  "tre:caldicottApproved": true,
  "tre:sdcLeadSignature": "verified_ed25519"
}`,
      stateHash: 'sha256:66ff55aa...'
    },
    position: { x: 850, y: 270 }
  }
];

const DATA_LIFECYCLE_EDGES: GraphEdgeData[] = [
  { id: 'e_dl_raw_ndoo', source: 'dl_RawExtract', target: 'dl_NDOOPurge', label: 'purgesOptOuts', relationship: 'Filters National Data Opt-Outs', lensId: 'data-lifecycle' },
  { id: 'e_dl_ndoo_pseudo', source: 'dl_NDOOPurge', target: 'dl_Pseudonymiser', label: 'pseudonymises', relationship: 'Salted HMAC Key Derivation', lensId: 'data-lifecycle' },
  { id: 'e_dl_pseudo_cohort', source: 'dl_Pseudonymiser', target: 'dl_ResearchCohort', label: 'provisionsCohort', relationship: 'De-Identified Data Plane', lensId: 'data-lifecycle' },
  { id: 'e_dl_cohort_sdc', source: 'dl_ResearchCohort', target: 'dl_TabularSDC', label: 'extractsSummary', relationship: 'Candidate Aggregate Export', lensId: 'data-lifecycle' },
  { id: 'e_dl_sdc_release', source: 'dl_TabularSDC', target: 'dl_ReleaseTicket', label: 'sealsRelease', relationship: 'Two-Person Cryptographic Seal', lensId: 'data-lifecycle' }
];

// ==========================================
// 4. HUMAN ROLES & OVERSIGHT LENS NODES
// ==========================================
const HUMAN_ROLES_NODES: GraphNodeElement[] = [
  {
    data: {
      id: 'hr_CaldicottGuardian',
      lensId: 'human-roles',
      label: 'role:CaldicottGuardian',
      title: 'Lead Confidentiality Guardian & SIRO',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Statutory Officer',
      description: 'Senior medical leader with personal statutory responsibility for championing patient confidentiality and authorizing high-tier linkage.',
      patientReassurance: 'A senior clinician personally oversees all decisions involving patient data confidentiality.',
      statutoryBasis: 'National Data Guardian Standards 2021; Caldicott Principles 1–8.',
      sourceFile: 'governance/roles/caldicott_charter.md',
      fullDefinition: 'Holds statutory veto authority over high-risk data linkage, Section 251 applications, and emergency overrides.',
      codeSnippet: `tre:CaldicottGuardian a owl:Class ;
    tre:statutoryResponsibility "PatientConfidentiality" ;
    tre:holdsVetoAuthority true .`,
      stateHash: 'sha256:aa112233...'
    },
    position: { x: 120, y: 120 }
  },
  {
    data: {
      id: 'hr_HRA_CAG',
      lensId: 'human-roles',
      label: 'role:REC_CAG_Committee',
      title: 'Ethics Committee (REC) & CAG Advisory',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Independent Oversight',
      description: 'Independent multidisciplinary panel of doctors, scientists, lawyers, and lay members evaluating ethical benefit and legal exemptions.',
      patientReassurance: 'Independent public committees ensure research is ethical and serves genuine health benefits.',
      statutoryBasis: 'NHS Act 2006 S251; Health Research Authority REC SOPs.',
      sourceFile: 'governance/roles/hra_rec_terms.md',
      fullDefinition: 'Reviews study protocols under IRAS. Advises the Secretary of State on Section 251 medical research exemptions.',
      codeSnippet: `tre:ResearchEthicsCommittee a owl:Class ;
    tre:advisesSection251 true ;
    tre:evaluatesPublicBenefit true .`,
      stateHash: 'sha256:bb223344...'
    },
    position: { x: 120, y: 260 }
  },
  {
    data: {
      id: 'hr_AccreditedResearcher',
      lensId: 'human-roles',
      label: 'role:AccreditedResearcher',
      title: 'DEA 2017 Accredited Researcher',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Lead Investigator',
      description: 'Credentialed scientist who has passed UKSA RAP accreditation and bound by legally enforceable non-disclosure agreements.',
      patientReassurance: 'Researchers face criminal penalties for any attempt to re-identify patients or misuse data.',
      statutoryBasis: 'Digital Economy Act 2017 § 67 (Criminal Penalties for Unlawful Disclosure).',
      sourceFile: 'governance/roles/researcher_agreement.md',
      fullDefinition: 'Principal investigator holding institutional affiliation and verified annual NHS Information Governance certification.',
      codeSnippet: `tre:AccreditedResearcher a owl:Class ;
    tre:boundByDEA2017 true ;
    tre:hasSignedCodeOfConduct true .`,
      stateHash: 'sha256:cc334455...'
    },
    position: { x: 420, y: 120 }
  },
  {
    data: {
      id: 'hr_SDCOutputChecker',
      lensId: 'human-roles',
      label: 'role:SDCOutputChecker',
      title: 'Accredited SDC Output Checker',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Gatekeeper',
      description: 'Specialist trained in ONS and UK LLC statistical disclosure control methodologies performing human-in-the-loop review of all exports.',
      patientReassurance: 'A dedicated disclosure expert manually inspects all summary tables and model parameters before they can leave the enclave.',
      statutoryBasis: 'ONS SDC Handbook; NHS England SDE Output Checking Protocol.',
      sourceFile: 'governance/roles/sdc_checker_sop.md',
      fullDefinition: 'Validates automated SHACL shape outputs and performs residual checks for secondary suppression and regression degrees of freedom.',
      codeSnippet: `tre:SDCOutputChecker a owl:Class ;
    tre:certifiedIn "ONS_SDC_Methodology" ;
    tre:mustCoSignExport true .`,
      stateHash: 'sha256:dd445566...'
    },
    position: { x: 420, y: 260 }
  },
  {
    data: {
      id: 'hr_PPIEAdvisoryCouncil',
      lensId: 'human-roles',
      label: 'role:PPIEAdvisoryCouncil',
      title: 'Patient & Public Advisory Council',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Public Voice',
      description: 'Patient representatives and charity advocates co-designing research questions, lay summaries, and public benefit scorecards.',
      patientReassurance: 'Patients and the public directly influence what research gets done and how findings are shared.',
      statutoryBasis: 'NHS Caldicott Principle 8 (No surprises); UK Standards for Public Involvement.',
      sourceFile: 'governance/roles/ppie_charter.md',
      fullDefinition: 'Ensures research studies publish Reading Age 11 lay summaries and address community health priorities.',
      codeSnippet: `tre:PPIEAdvisoryCouncil a owl:Class ;
    tre:coDesignsLaySummaries true ;
    tre:evaluatesCivicValue true .`,
      stateHash: 'sha256:ee556677...'
    },
    position: { x: 720, y: 120 }
  },
  {
    data: {
      id: 'hr_TrustDPO',
      lensId: 'human-roles',
      label: 'role:DataProtectionOfficer',
      title: 'Trust Data Protection Officer (DPO)',
      category: 'HumanRole',
      tier: 'Policy Layer',
      badge: 'Statutory Auditor',
      description: 'Independent officer monitoring UK GDPR compliance, auditing Data Protection Impact Assessments (DPIAs), and interfacing with the ICO.',
      patientReassurance: 'A dedicated legal officer ensures your statutory privacy rights under UK data protection law are strictly enforced.',
      statutoryBasis: 'UK GDPR Articles 37–39; Data Protection Act 2018.',
      sourceFile: 'governance/roles/dpo_oversight.md',
      fullDefinition: 'Maintains records of processing activities and audits institutional Caldicott Principle 8 compliance.',
      codeSnippet: `tre:DataProtectionOfficer a owl:Class ;
    tre:reportsTo "BoardOfDirectors" ;
    tre:auditsDPIA true .`,
      stateHash: 'sha256:ff667788...'
    },
    position: { x: 720, y: 260 }
  }
];

const HUMAN_ROLES_EDGES: GraphEdgeData[] = [
  { id: 'e_hr_cg_rec', source: 'hr_CaldicottGuardian', target: 'hr_HRA_CAG', label: 'liaisesWith', relationship: 'Statutory S251 Consultation', lensId: 'human-roles' },
  { id: 'e_hr_rec_res', source: 'hr_HRA_CAG', target: 'hr_AccreditedResearcher', label: 'authorizesProtocol', relationship: 'IRAS Ethics Approval', lensId: 'human-roles' },
  { id: 'e_hr_res_sdc', source: 'hr_AccreditedResearcher', target: 'hr_SDCOutputChecker', label: 'submitsForReview', relationship: 'Airlock Export Request', lensId: 'human-roles' },
  { id: 'e_hr_cg_sdc', source: 'hr_CaldicottGuardian', target: 'hr_SDCOutputChecker', label: 'delegatesSDC', relationship: 'Appoints SDC Gatekeeper', lensId: 'human-roles' },
  { id: 'e_hr_res_ppie', source: 'hr_AccreditedResearcher', target: 'hr_PPIEAdvisoryCouncil', label: 'coDesignsWith', relationship: 'Lay Summary Co-Production', lensId: 'human-roles' },
  { id: 'e_hr_cg_dpo', source: 'hr_CaldicottGuardian', target: 'hr_TrustDPO', label: 'jointAssurance', relationship: 'DPIA & ICO Statutory Audit', lensId: 'human-roles' }
];

// Combine all elements for backward compatibility and multi-lens query
export const GRAPH_ELEMENTS: GraphNodeElement[] = [
  ...STATUTORY_NODES,
  ...CLOUD_FABRIC_NODES,
  ...DATA_LIFECYCLE_NODES,
  ...HUMAN_ROLES_NODES
];

export const GRAPH_EDGES: { data: GraphEdgeData }[] = [
  ...STATUTORY_EDGES.map((e) => ({ data: e })),
  ...CLOUD_FABRIC_EDGES.map((e) => ({ data: e })),
  ...DATA_LIFECYCLE_EDGES.map((e) => ({ data: e })),
  ...HUMAN_ROLES_EDGES.map((e) => ({ data: e }))
];

export function getElementsForLens(lensId: GraphLensType): { nodes: GraphNodeElement[]; edges: { data: GraphEdgeData }[] } {
  const nodes = GRAPH_ELEMENTS.filter((n) => n.data.lensId === lensId);
  const nodeIds = new Set(nodes.map((n) => n.data.id));
  const edges = GRAPH_EDGES.filter((e) => e.data.lensId === lensId && nodeIds.has(e.data.source) && nodeIds.has(e.data.target));
  return { nodes, edges };
}
