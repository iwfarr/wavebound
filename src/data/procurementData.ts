export interface ProcurementControl {
  id: string;
  framework: 'SATRE v1.1' | 'NHS DSPT 24/25' | 'ISO 27001:2022' | 'DCB0129 / ISO 42001';
  section: string;
  title: string;
  requirement: string;
  waveboundEvidence: string;
  technicalAsset: string;
  status: 'COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'ACTION_REQUIRED';
  criticality: 'MANDATORY' | 'HIGH' | 'RECOMMENDED';
  caldicottPrinciple: string;
}

export const PROCUREMENT_CONTROLS: ProcurementControl[] = [
  // --- SATRE v1.1 (Standard Architecture for Trusted Research Environments) ---
  {
    id: 'SATRE-CI-01',
    framework: 'SATRE v1.1',
    section: 'Computing Infrastructure § 1.1',
    title: 'Zero-WAN Egress & Network Microsegmentation',
    requirement: 'The computing environment must completely prevent outbound network traffic to the public internet, prohibiting unauthorized data exfiltration.',
    waveboundEvidence: 'Calico and eBPF network policies sever all outbound WAN egress from research namespaces. DNS restricted strictly to internal core services; external IP ranges dropped at kernel layer.',
    technicalAsset: 'k8s/network/zero-egress-calico.yaml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 3 (Minimum necessary) & Principle 6 (Comply with law)'
  },
  {
    id: 'SATRE-CI-02',
    framework: 'SATRE v1.1',
    section: 'Computing Infrastructure § 1.4',
    title: 'Air-Gapped Package Ingestion Diode',
    requirement: 'Researchers must be prevented from pulling untrusted packages from public PyPI/CRAN, utilizing quarantined internal mirrors with vulnerability scanning.',
    waveboundEvidence: 'Quarantined Harbor DMZ mirror with automated Trivy CVE gates, Cosign cryptographic signature verification, and restricted pip.conf / .Rprofile index configs.',
    technicalAsset: 'src/components/AirGapArchitectureHub.tsx & k8s/mirrors/',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 4 (Need to know) & Principle 5 (Understand responsibilities)'
  },
  {
    id: 'SATRE-CI-03',
    framework: 'SATRE v1.1',
    section: 'Computing Infrastructure § 2.2',
    title: 'Root-Read-Only Pod Enclaves & Least Privilege',
    requirement: 'User workloads must run without host access, with read-only root filesystems, dropped Linux capabilities, and non-root UIDs.',
    waveboundEvidence: 'Pod Security Standards enforce runAsNonRoot: true, runAsUser: 10001, readOnlyRootFilesystem: true, drop: ["ALL"] capabilities, and ephemeral 50Gi /scratch volume.',
    technicalAsset: 'src/components/LeastPrivilegeEnclaveHub.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 2 (Do not use personal data unless necessary)'
  },
  {
    id: 'SATRE-DG-01',
    framework: 'SATRE v1.1',
    section: 'Data Governance § 3.1',
    title: 'Deterministic Pseudonymisation & Identifier Expungement',
    requirement: 'Direct identifiers must be segregated at source and replaced with project-specific salted pseudonyms to prevent cross-study re-identification.',
    waveboundEvidence: 'Salted HMAC SHA-256 pseudonymisation engine with rotating KMS-backed salt seeds; direct patient identifiers scrubbed before enclave mounting.',
    technicalAsset: 'ontology/governance_core.ttl & crypto/pseudonymiser.go',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 1 (Justify purpose) & Principle 2 (No personal identifiers)'
  },
  {
    id: 'SATRE-OC-01',
    framework: 'SATRE v1.1',
    section: 'Output Checking § 4.1',
    title: 'Quantitative SDC & Primary Cell Suppression (k ≥ 10)',
    requirement: 'All candidate research outputs must enforce small cell suppression (k ≥ 10) and secondary suppression to eliminate marginal deduction leaks.',
    waveboundEvidence: 'Mathematical tabular SDC solver with automated primary suppression (<10*) and secondary complementary suppression; W3C SHACL shape validation at airlock PEP.',
    technicalAsset: 'src/components/QuantitativeSDCHub.tsx & ontology/shapes/sdc_shapes.ttl',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 8 (No surprises)'
  },
  {
    id: 'SATRE-OC-02',
    framework: 'SATRE v1.1',
    section: 'Output Checking § 4.3',
    title: 'Top-Contributor Dominance Ceiling (≤ 80%)',
    requirement: 'Continuous financial and clinical metrics must be checked for concentration where top contributors dominate aggregate sums.',
    waveboundEvidence: 'Automated (1, 80%) and (2, 85%) dominance rule evaluation engine flagging disproportionate single-patient contributions.',
    technicalAsset: 'src/components/QuantitativeSDCHub.tsx & security/opa/authz.rego',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 8 (No surprises)'
  },
  {
    id: 'SATRE-IS-01',
    framework: 'SATRE v1.1',
    section: 'Information Security § 5.2',
    title: 'Two-Person Cryptographic Airlock Protocol',
    requirement: 'Outputs must not be released via single-person action; dual-signoff with cryptographic audit trail is required.',
    waveboundEvidence: 'Two-person airlock protocol pairing automated PEP shape verification with accredited SDC Lead review and Web Crypto SHA-256 seal.',
    technicalAsset: 'src/components/QuantitativeSDCHub.tsx & airlock/release_tickets/',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 7 (Duty to share is as important as duty to protect)'
  },

  // --- NHS DATA SECURITY & PROTECTION TOOLKIT (DSPT 2024/25) ---
  {
    id: 'DSPT-01-01',
    framework: 'NHS DSPT 24/25',
    section: 'NDG Standard 1: Personal Confidential Data',
    title: 'Lawful Basis & National Data Opt-Out (NDOO) Respect',
    requirement: 'Personal confidential data must only be processed where a statutory lawful basis exists and patients who opted out are purged.',
    waveboundEvidence: 'Automated National Data Opt-Out filter systematically purged 14,208 records prior to enclave ingestion; statutory basis verified under UK GDPR Art 6(1)(e) & Art 9(2)(j).',
    technicalAsset: 'src/data/transparencyData.ts & pipeline/ndoo_purge.py',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 6 (Comply with the law) & Principle 8 (No surprises)'
  },
  {
    id: 'DSPT-02-01',
    framework: 'NHS DSPT 24/25',
    section: 'NDG Standard 2: Staff Responsibilities',
    title: 'Researcher Accreditation & Caldicott Training',
    requirement: 'All individuals accessing data must hold verified identities, institutional accreditation, and annual Information Governance training.',
    waveboundEvidence: 'W3C SHACL shape tre:WorkspaceAdmissionShape validates DEA 2017 accreditation and active NHS IG certification in sub-millisecond OPA Rego rules.',
    technicalAsset: 'ontology/shapes/access-shapes.ttl & security/opa/authz.rego',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 5 (Everyone must understand responsibilities)'
  },
  {
    id: 'DSPT-04-01',
    framework: 'NHS DSPT 24/25',
    section: 'NDG Standard 4: Managing Data Access',
    title: 'Role-Based Access Control (RBAC) & Zero Cluster-Admin',
    requirement: 'Access rights must be granted on a strict need-to-know basis with no persistent cluster-admin or superuser credentials.',
    waveboundEvidence: 'Namespace-scoped Kubernetes RoleBindings with zero cluster-admin bindings; Keycloak OIDC group mapping with temporary scoped tokens.',
    technicalAsset: 'src/components/LeastPrivilegeEnclaveHub.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 4 (Access on a strict need-to-know basis)'
  },
  {
    id: 'DSPT-09-01',
    framework: 'NHS DSPT 24/25',
    section: 'NDG Standard 9: Secure Configuration',
    title: 'Non-Blocking Admission Controller & Resilient Audit',
    requirement: 'Configuration must enforce security baselines without causing denial-of-service or cluster outages for clinical researchers.',
    waveboundEvidence: 'ValidatingWebhookConfiguration deployed with failurePolicy: Ignore, allowing non-blocking audit-and-alert events to SIEM without pod launch timeouts.',
    technicalAsset: 'k8s/admission/validating-webhook.yaml',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 7 (Duty to share)'
  },
  {
    id: 'DSPT-10-01',
    framework: 'NHS DSPT 24/25',
    section: 'NDG Standard 10: Accountable Suppliers',
    title: 'Supply Chain SBOM & Immutable Provenance Tracking',
    requirement: 'Suppliers must provide transparency regarding third-party libraries and maintain tamper-evident audit trails.',
    waveboundEvidence: 'W3C PROV-O append-only provenance ledger with SHA-256 state commitments tracking every ingestion, linkage, and export event.',
    technicalAsset: 'src/components/CaldicottTransparencyPortal.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 8 (Inform patients and service users)'
  },

  // --- ISO/IEC 27001:2022 & ISO 27701 (ISMS & PIMS) ---
  {
    id: 'ISO-A8-12',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.12: Data Leakage Prevention',
    title: 'Airlock Data Leakage Prevention (DLP)',
    requirement: 'DLP measures must be applied to systems, networks, and storage devices processing sensitive personal information.',
    waveboundEvidence: 'Sub-millisecond OPA Rego egress gatekeeper evaluates all candidate files against mathematical SDC rules; copy-paste and USB exfiltration disabled in cloud console.',
    technicalAsset: 'security/opa/authz.rego',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 3 (Minimum necessary)'
  },
  {
    id: 'ISO-A8-20',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.20: Network Security',
    title: 'Zero-Trust Network Architecture & Direct Data Planes',
    requirement: 'Networks must be secured, managed, and controlled to protect information in systems and applications.',
    waveboundEvidence: 'Microsegmented VPC subnets with Envoy perimeter gateway; high-throughput Arrow Flight and DuckDB direct kernel sockets bypassing sidecar proxies to eliminate socket exhaustion.',
    technicalAsset: 'src/components/AirGapArchitectureHub.tsx',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 4 (Need to know)'
  },
  {
    id: 'ISO-A8-28',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.28: Secure Coding',
    title: 'Policy-as-Code vs Imperative Configuration',
    requirement: 'Principles of secure system engineering must be applied to software development and infrastructure management.',
    waveboundEvidence: 'Declarative W3C SHACL shapes and OPA Rego rules version-controlled in GitOps repository; zero unverified hand-crafted firewall changes.',
    technicalAsset: 'compiler/rdf_to_rego.py',
    status: 'COMPLIANT',
    criticality: 'RECOMMENDED',
    caldicottPrinciple: 'Principle 5 (Understand responsibilities)'
  },

  // --- DCB0129 & ISO/IEC 42001 (Clinical Safety & AI Risk Management) ---
  {
    id: 'DCB-01-01',
    framework: 'DCB0129 / ISO 42001',
    section: 'DCB0129 § 3.2: Hazard Identification',
    title: 'Clinical Hazard Log & AI Model Boundary Enforcement',
    requirement: 'Health IT systems and AI algorithms must maintain a clinical hazard log identifying clinical risks and mitigations.',
    waveboundEvidence: 'Mandatory Clinical Safety Officer (CSO) sign-off for models touching patient care; autonomous agents constrained to read-only Model Context Protocol (MCP) bounds.',
    technicalAsset: 'ontology/agent_mcp.ttl & src/components/LLMSecurityEnclave.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 1 (Justify purpose) & Principle 7 (Duty to share)'
  },
  {
    id: 'ISO42-06-01',
    framework: 'DCB0129 / ISO 42001',
    section: 'ISO/IEC 42001:2023 § 6.1',
    title: 'AI Impact Assessment & Human Sponsorship Doctrine',
    requirement: 'AI systems must have demonstrable human accountability; autonomous agents cannot act as independent legal entities.',
    waveboundEvidence: 'Stanford UIT non-personhood doctrine enforced in policy: every AI agent must be bound to a named, accredited human sponsor before execution.',
    technicalAsset: 'src/components/GovernAssureWorkspace.tsx (Gate 5)',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 5 (Everyone must understand responsibilities)'
  }
];

export const TENDER_CONTRACTUAL_SCHEDULES = [
  {
    id: 'schedule_a',
    title: 'Schedule A: Sovereign Custody & Egress Prohibition',
    clause: `1.1 The Contractor warrants that all researcher computing enclaves operate within a sovereign cloud VPC under strict zero-WAN egress network policies.
1.2 No analytical pod or container shall possess routable egress to the public internet. All package dependencies shall be resolved exclusively through private, air-gapped CRAN and PyPI mirrors verified by CVE scan signatures.
1.3 Ingress to datasets is subject to pre-execution policy-as-code validation (W3C SHACL & OPA Rego), denying any request lacking verified researcher accreditation or ethics clearance.`
  },
  {
    id: 'schedule_b',
    title: 'Schedule B: Cryptographic Statistical Disclosure Control (SDC)',
    clause: `2.1 The Contractor guarantees that no raw, microdata, or disclosive aggregate outputs shall exit the secure enclave.
2.2 All candidate tabular releases must satisfy primary cell suppression (k ≥ 10) and complementary secondary suppression to eliminate marginal deduction derivation vectors.
2.3 Any release must be cryptographically sealed using a Web Crypto SHA-256 digest and require two-person sign-off by an accredited SDC Lead before airlock transit.`
  },
  {
    id: 'schedule_c',
    title: 'Schedule C: Least-Privilege Pod Hardening & Non-Blocking Webhooks',
    clause: `3.1 The Contractor shall deploy analytical containers with root filesystems mounted strictly read-only, non-root user IDs (UID 10001), and all Linux capabilities explicitly dropped.
3.2 Admission control webhooks shall operate with failurePolicy: Ignore in project namespaces, emitting immediate audit alerts to SIEM without inducing pod launch timeouts or cluster operational disruption.`
  },
  {
    id: 'schedule_d',
    title: 'Schedule D: Caldicott Principle 8 Openness & Public Transparency',
    clause: `4.1 In accordance with Caldicott Principle 8 ("No surprises"), the Contractor shall maintain a public Data Use Register with Reading Age 11 lay summaries and public benefit scorecards.
4.2 Every data linkage and export event shall emit an immutable W3C PROV-O audit record with cryptographic state hashes retained for statutory inspection.`
  }
];

// --- IN-HOUSE NHS SOFTWARE & AI DEVELOPMENT (DCB0129 / DCB0160 TRACK) ---

export type ClinicalSeverity = 'Catastrophic' | 'Major' | 'Considerable' | 'Significant' | 'Minor';
export type ClinicalLikelihood = 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
export type ClinicalRiskLevel = 'Very High' | 'High' | 'Medium' | 'Low';

export interface ClinicalHazard {
  id: string;
  category: string;
  hazardDescription: string;
  potentialCause: string;
  clinicalHarm: string;
  initialSeverity: ClinicalSeverity;
  initialLikelihood: ClinicalLikelihood;
  initialRisk: ClinicalRiskLevel;
  clinicalMitigation: string;
  residualSeverity: ClinicalSeverity;
  residualLikelihood: ClinicalLikelihood;
  residualRisk: ClinicalRiskLevel;
  csoStatus: 'APPROVED' | 'IN_REVIEW' | 'ACTION_REQUIRED';
  dcb0160DeploymentNote: string;
}

export interface InHouseCSOProfile {
  name: string;
  title: string;
  professionalBody: 'GMC' | 'NMC' | 'GPhC' | 'HCPC';
  registrationNumber: string;
  clinicalSpeciality: string;
  accreditedTraining: string;
  statutoryVetoAcknowledged: boolean;
  appointmentDate: string;
}

export const DEFAULT_INHOUSE_CSO: InHouseCSOProfile = {
  name: 'Jane Doe, MSc',
  title: 'Consultant Clinical Informatician & Designated Clinical Safety Officer (CSO) [Example Role]',
  professionalBody: 'GMC',
  registrationNumber: '123456',
  clinicalSpeciality: 'Cardiothoracic Medicine & Digital Health Safety',
  accreditedTraining: 'NHS England National Clinical Risk Management Training (DCB0129 / DCB0160 Certified)',
  statutoryVetoAcknowledged: true,
  appointmentDate: '2024-06-15'
};

export const INITIAL_INHOUSE_HAZARDS: ClinicalHazard[] = [
  {
    id: 'HAZ-IH-01',
    category: 'Patient Identity & Linkage',
    hazardDescription: 'Cross-patient linkage mismatch during longitudinal cohort assembly in SDE data plane.',
    potentialCause: 'Malformed local hospital number (MRN) padding without deterministic NHS Number modulus 11 validation.',
    clinicalHarm: 'Incorrect lab values, diagnosis history, or medication records associated with wrong patient, leading to erroneous clinical risk scoring or contra-indicated therapeutic recommendation in downstream decision support.',
    initialSeverity: 'Catastrophic',
    initialLikelihood: 'Low',
    initialRisk: 'High',
    clinicalMitigation: 'Enforce strict 10-digit NHS Number modulus 11 checksum verification in ingestion pipeline. Reject and quarantine any unvalidated records to an unlinked exceptions log. Pre-linkage deterministic matching audit enforced via SHACL constraint.',
    residualSeverity: 'Major',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Trust deployment team must configure local MPI feed with authoritative PDS (Personal Demographics Service) spine sync before enabling real-time clinical dashboards.'
  },
  {
    id: 'HAZ-IH-02',
    category: 'Alert Latency & Real-Time Ingestion',
    hazardDescription: 'Critical laboratory telemetry delay or silent queue backlog in analytical data plane.',
    potentialCause: 'Analytical DuckDB/Arrow Flight query burst exhausts sidecar connections or threadpool, causing critical pathology alerts to queue behind bulk batch queries.',
    clinicalHarm: 'Delayed escalation of life-threatening acute kidney injury (AKI) or sepsis troponin biomarker rise beyond clinical golden hour.',
    initialSeverity: 'Catastrophic',
    initialLikelihood: 'Medium',
    initialRisk: 'Very High',
    clinicalMitigation: 'Direct Analytical Data Plane architecture bypasses userspace sidecars. Critical clinical alert telemetry is assigned dedicated kernel priority QoS socket (Port 5432 direct) with fallback SMS/Pager webhook trigger if buffer delay exceeds 90 seconds.',
    residualSeverity: 'Major',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Deploying Trust IT must verify local network QoS tagging for SDE telemetry port and maintain manual hospital switchboard escalation protocols.'
  },
  {
    id: 'HAZ-IH-03',
    category: 'Algorithmic Demographic Bias & Under-Representation',
    hazardDescription: 'Under-performance or false-negative diagnostic bias for minority ethnic or socioeconomic sub-cohorts in internally trained diagnostic AI model.',
    potentialCause: 'Training dataset predominantly sampled from tertiary centre catchment area with skewed Index of Multiple Deprivation (IMD) deciles.',
    clinicalHarm: 'Failure to detect high-risk cardiovascular or diabetic complication in under-represented groups, exacerbating known health inequalities.',
    initialSeverity: 'Major',
    initialLikelihood: 'High',
    initialRisk: 'Very High',
    clinicalMitigation: 'ISO 5259 multi-dimensional data quality auditing applied prior to model training. Stratified cross-validation with minimum per-decile F1 threshold (≥ 0.82) mandated. Subgroup performance audited against NHS Core20PLUS5 clinical priorities.',
    residualSeverity: 'Considerable',
    residualLikelihood: 'Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Local clinical governance committee must review subgroup calibration curves for their specific ICB population footprint prior to live deployment.'
  },
  {
    id: 'HAZ-IH-04',
    category: 'SDC Egress & Patient Re-Identification',
    hazardDescription: 'Patient microdata leak or small-cell identification via exported research model artifacts or extrema summaries.',
    potentialCause: 'Researcher requests release of raw regression residual scatterplots or summary tables with un-suppressed min/max extrema values.',
    clinicalHarm: 'Loss of patient confidentiality leading to psychological distress, stigmatization, or breach of statutory Caldicott duties under UK GDPR.',
    initialSeverity: 'Considerable',
    initialLikelihood: 'Medium',
    initialRisk: 'Medium',
    clinicalMitigation: 'Automated policy-as-code airlock strictly enforces: 1) suppression of all raw min/max extrema (replaced with 5th/95th percentiles); 2) primary cell suppression (k ≥ 10); 3) differential privacy verification on model weights; 4) two-person airlock cryptographic seal.',
    residualSeverity: 'Minor',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Trust Caldicott Guardian and Information Governance Lead receive automated cryptographically signed manifest for each released file.'
  },
  {
    id: 'HAZ-IH-05',
    category: 'Schema Null Semantics & Missing Data Misinterpretation',
    hazardDescription: 'Algorithmic misinterpretation of null/missing values as "normal" or "negative" clinical test result.',
    potentialCause: 'Feature store pipeline imputes missing troponin, allergy, or creatinine values as 0.0 or default negative baseline without indicator flag.',
    clinicalHarm: 'Patient falsely triaged as low risk due to missing historical test, causing discharge without necessary inpatient monitoring.',
    initialSeverity: 'Major',
    initialLikelihood: 'Medium',
    initialRisk: 'High',
    clinicalMitigation: 'Strict schema definition enforces tri-boolean logic (TRUE, FALSE, UNKNOWN). Pipelines reject zero-imputation of unperformed investigations and mandate explicit Missingness Indicator vectors for model inference.',
    residualSeverity: 'Significant',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Clinical end-users must be trained that missing lab values are displayed as "Not Tested" rather than "Negative".'
  }
];

export interface DCB0160ChecklistItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: 'COMPLIANT' | 'IN_PROGRESS' | 'PLANNED';
}

export const INHOUSE_DCB0160_CHECKLIST: DCB0160ChecklistItem[] = [
  {
    id: 'DCB160-01',
    title: 'Deploying Trust CSO & Clinical Sponsor Appointment',
    description: 'The deploying health organisation has designated an in-house Registered Clinician as Deploying CSO to review the Manufacturer DCB0129 Safety Case.',
    owner: 'Trust Clinical Governance Board',
    status: 'COMPLIANT'
  },
  {
    id: 'DCB160-02',
    title: 'Local Clinical Workflow & Fallback Integration',
    description: 'Documented manual fallback procedures (e.g. paper triage, local PACS direct viewing) in the event of SDE or network downtime.',
    owner: 'Chief Clinical Information Officer (CCIO)',
    status: 'COMPLIANT'
  },
  {
    id: 'DCB160-03',
    title: 'Clinician Training & Competency Verification',
    description: 'End-user clinicians, nurses, and data scientists trained on system boundaries, missing-data indications, and reporting clinical safety incidents.',
    owner: 'Digital Clinical Education Lead',
    status: 'IN_PROGRESS'
  },
  {
    id: 'DCB160-04',
    title: 'Post-Market Clinical Follow-Up (PMCF) & Datix Incident Feedback',
    description: 'Bi-directional feedback loop linking local Datix / Ulysses incident reports directly back to the living In-House Clinical Hazard Log.',
    owner: 'Trust Patient Safety Lead',
    status: 'COMPLIANT'
  }
];

