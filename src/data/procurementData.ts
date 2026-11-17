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

  // --- ISO/IEC 27001:2022 & ISO 27701 (ISMS Clauses 4-10, SoA & Annex A.5-A.8) ---
  {
    id: 'ISO-CL6-SOA',
    framework: 'ISO 27001:2022',
    section: 'Clauses 4–6 & Clause 6.1.3(d): ISMS Scope, Risk Treatment & SoA',
    title: 'ISMS Boundary Definition & Live Statement of Applicability (SoA)',
    requirement: 'The organization must define ISMS scope, conduct repeatable information security risk assessments, and maintain a justified Statement of Applicability across all 93 Annex A controls.',
    waveboundEvidence: 'Version-controlled Decision Register (D-001–D-009) and GitOps control matrix map every applicable Annex A.5–A.8 control to SHACL/OPA enforcement assets and DEA 2017 Section 71 TRE accreditation evidence.',
    technicalAsset: 'src/data/procurementData.ts & docs/GOVERNANCE_CHARTER.md',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 1 (Justify purpose) & Principle 6 (Comply with the law)'
  },
  {
    id: 'ISO-CL9-CL10',
    framework: 'ISO 27001:2022',
    section: 'Clauses 9–10: Performance Evaluation, Internal Audit & Improvement',
    title: 'Continuous Automated Control Verification & Audit Evidence',
    requirement: 'The ISMS must continuously measure control effectiveness, execute planned internal audits, and implement corrective actions for nonconformities.',
    waveboundEvidence: 'PySHACL CI test suites (tests/test_shapes.py) verify policy invariants on every pull request; non-blocking admission alerts and W3C PROV-O telemetry provide continuous Clause 9 audit proof.',
    technicalAsset: 'tests/test_shapes.py & .github/workflows/ci.yml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 5 (Understand responsibilities) & Principle 8 (No surprises)'
  },
  {
    id: 'ISO-A5-15-18',
    framework: 'ISO 27001:2022',
    section: 'Annex A.5.15–A.5.18: Access Control & Rights Lifecycle',
    title: 'Policy-Driven Access Provisioning, Review & Expiry Enforcement',
    requirement: 'Access rights to information and systems must be governed by documented rules, formally provisioned, regularly reviewed, and revoked upon expiration or role change.',
    waveboundEvidence: 'Keycloak OIDC group claims paired with OPA Rego admission rules verify active DEA Researcher accreditation, REC ethics dates, and annual IG training validity on every session launch.',
    technicalAsset: 'ontology/shapes/access-shapes.ttl & security/opa/authz.rego',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 4 (Strict need-to-know basis)'
  },
  {
    id: 'ISO-A5-19-23',
    framework: 'ISO 27001:2022',
    section: 'Annex A.5.19–A.5.23: Supplier Relationships & Cloud Services',
    title: 'Sovereign Cloud Residency, SBOM Transparency & Supply-Chain Governance',
    requirement: 'Information security risks in supplier relationships and cloud service usage must be contractually agreed, monitored, and constrained to approved jurisdictions.',
    waveboundEvidence: 'Contractual Schedules (DTAC, UK residency guarantees, ZDR/BAA addenda for AI endpoints) and air-gapped Harbor container mirror provenance verify all upstream software artifacts.',
    technicalAsset: 'src/components/AirGapArchitectureHub.tsx & sbom/trivy-attestations.json',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 6 (Comply with the law)'
  },
  {
    id: 'ISO-A5-24-30',
    framework: 'ISO 27001:2022',
    section: 'Annex A.5.24–A.5.30: Incident Management & ICT Business Continuity',
    title: 'Security Incident Playbooks, Break-Glass Escalation & ICT Readiness',
    requirement: 'Organizations must plan and execute consistent security incident response, evidence collection, and ICT readiness for business continuity.',
    waveboundEvidence: 'SIEM incident hooks stream anomalous pod/airlock alerts in real time; break-glass access triggers mandatory SIRO notification, while automated DR sandboxes validate RTO/RPO continuity targets.',
    technicalAsset: 'security/runbooks/incident-response.md & k8s/siem-forwarder.yaml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 7 (Duty to share) & Principle 8 (No surprises)'
  },
  {
    id: 'ISO-A5-31-34',
    framework: 'ISO 27001:2022',
    section: 'Annex A.5.31–A.5.34: Statutory Compliance & Privacy Protection',
    title: 'Statutory Legal Gateway Alignment (DEA 2017, UK GDPR & ISO 27701)',
    requirement: 'Legal, statutory, regulatory, and contractual requirements—including privacy and protection of PII—must be explicitly identified and continuously satisfied.',
    waveboundEvidence: 'RDF knowledge graph formally tracks UK GDPR Art 6(1)(e)/9(2)(j), NHS Act s251 CAG exemptions, DEA 2017 Part 5 Ch. 5 RAP accreditation, and ISO/IEC 27701 PIMS roles.',
    technicalAsset: 'ontology/governance_core.ttl',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 6 (Comply with the law)'
  },
  {
    id: 'ISO-A6-1-3-6',
    framework: 'ISO 27001:2022',
    section: 'Annex A.6.1, A.6.3 & A.6.6: People Controls (Screening, Training & NDAs)',
    title: 'Researcher Vetting, Annual IG Awareness & Confidentiality Agreements',
    requirement: 'Personnel must undergo background screening, complete recurring security and privacy awareness education, and sign binding confidentiality agreements prior to data access.',
    waveboundEvidence: 'tre:WorkspaceAdmissionShape enforces BPSS/institutional verification, unexpired Safe Researcher / NHS IG training timestamps, and countersigned User Access Agreements before admission.',
    technicalAsset: 'ontology/shapes/access-shapes.ttl',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 5 (Everyone must understand responsibilities)'
  },
  {
    id: 'ISO-A7-1-14',
    framework: 'ISO 27001:2022',
    section: 'Annex A.7.1–A.7.14: Physical Security & Sovereign Storage Media',
    title: 'UK Sovereign Tier-3 Cloud Perimeters, Pixel-Only VDI & Media Sanitization',
    requirement: 'Physical perimeters must prevent unauthorized physical access and secure equipment and storage media sanitization across their lifecycle.',
    waveboundEvidence: 'Workloads run exclusively in ISO 27001 certified UK sovereign cloud regions; researcher access uses pixel-only VDI (preventing local endpoint disk writes) paired with KMS cryptographic erasure.',
    technicalAsset: 'terraform/uk-sovereign-vpc/ & deploy/vdi-session-policy.yaml',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 3 (Minimum necessary) & Principle 4 (Need to know)'
  },
  {
    id: 'ISO-A8-2-5',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.2 & A.8.5: Privileged Access & Secure Authentication',
    title: 'FIDO2 Multi-Factor Authentication & Zero Persistent Cluster-Admin',
    requirement: 'Allocation and use of privileged access rights must be restricted and managed alongside strong multi-factor authentication mechanisms.',
    waveboundEvidence: 'Hardware FIDO2 MFA enforced at perimeter gateway; analytical pods run non-root (UID 10001) with zero persistent cluster-admin tokens and short-lived OIDC credentials.',
    technicalAsset: 'src/components/LeastPrivilegeEnclaveHub.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 4 (Access on a strict need-to-know basis)'
  },
  {
    id: 'ISO-A8-8-9',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.8 & A.8.9: Vulnerability & Configuration Management',
    title: 'Automated CVE Gatekeeping & Immutable Pod Security Baselines',
    requirement: 'Technical vulnerabilities must be promptly identified and remediated, and hardened system configurations enforced consistently.',
    waveboundEvidence: 'Automated Trivy CVE scanning gates block vulnerable container images or PyPI/CRAN mirrors; Pod Security Standards enforce readOnlyRootFilesystem: true and drop ALL Linux capabilities.',
    technicalAsset: 'k8s/mirrors/harbor-trivy-policy.yaml & deploy/enclaves/hardened-analytic-enclave.yaml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 6 (Comply with the law)'
  },
  {
    id: 'ISO-A8-11',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.11: Data Masking & Pseudonymisation',
    title: 'Salted HMAC-SHA256 Tokenisation & Field-Level Masking',
    requirement: 'Data masking must be used in accordance with access control policies and privacy legislation to limit exposure of sensitive identifiers.',
    waveboundEvidence: 'Honest-broker split-file ingestion strips direct NHS identifiers via KMS-salted HMAC-SHA256 tokens; OpenSearch FLS/DLS masks residual quasi-identifiers by project tier.',
    technicalAsset: 'crypto/pseudonymiser.go & opensearch/fls-dls-roles.yml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 2 (Do not use personal data unless necessary)'
  },
  {
    id: 'ISO-A8-12',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.12: Data Leakage Prevention',
    title: 'Airlock Data Leakage Prevention (DLP)',
    requirement: 'DLP measures must be applied to systems, networks, and storage devices processing sensitive personal information.',
    waveboundEvidence: 'Sub-millisecond OPA Rego egress gatekeeper evaluates all candidate files against mathematical SDC rules (k ≥ 10, dominance ≤ 80%); copy-paste and USB exfiltration disabled in VDI console.',
    technicalAsset: 'security/opa/authz.rego & src/components/QuantitativeSDCHub.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 3 (Minimum necessary)'
  },
  {
    id: 'ISO-A8-13',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.13: Information Backup & Immutable Snapshots',
    title: 'Encrypted WORM Audit Backups & Verified Point-in-Time Recovery',
    requirement: 'Backup copies of information, software, and systems must be maintained and regularly tested in accordance with agreed continuity plans.',
    waveboundEvidence: 'Compliance ledgers and enclave metadata snapshots are written to immutable WORM object storage and periodically restored into isolated DR test sandboxes to verify integrity.',
    technicalAsset: 'infra/backup/worm-retention-policy.tf',
    status: 'COMPLIANT',
    criticality: 'HIGH',
    caldicottPrinciple: 'Principle 7 (Duty to share is as important as duty to protect)'
  },
  {
    id: 'ISO-A8-15-16',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.15 & A.8.16: Logging & Continuous Monitoring',
    title: 'Tamper-Evident W3C PROV-O Lineage & Real-Time SIEM Telemetry',
    requirement: 'Logs recording user activities, exceptions, and security events must be produced, protected against tampering, and actively monitored.',
    waveboundEvidence: 'Every workspace admission, query event, and airlock release emits cryptographically hashed W3C PROV-O audit triples forwarded to WORM SIEM storage with W3C TraceContext correlation IDs.',
    technicalAsset: 'audit/provo_emitter.py & k8s/siem-forwarder.yaml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 8 (No surprises)'
  },
  {
    id: 'ISO-A8-20',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.20–A.8.22: Network Security, Services & Segregation',
    title: 'Zero-Trust Microsegmentation, Web Filtering & Direct Data Planes',
    requirement: 'Networks and network services must be secured, segregated across trust zones, and protected against unauthorized external routing.',
    waveboundEvidence: 'Microsegmented Calico/eBPF zero-egress subnets isolate research tenants and block public WAN egress; Envoy perimeter gateways and direct Arrow Flight/DuckDB data sockets prevent sidecar exhaustion.',
    technicalAsset: 'src/components/AirGapArchitectureHub.tsx & k8s/network/zero-egress-calico.yaml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 4 (Need to know)'
  },
  {
    id: 'ISO-A8-24',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.24: Use of Cryptography',
    title: 'AES-256 Envelope Encryption at Rest & mTLS 1.3 in Transit',
    requirement: 'Rules for the effective use of cryptography, including key generation, rotation, and cryptographic erasure, must be defined and implemented.',
    waveboundEvidence: 'Hardware-accelerated AES-256 encryption protects all clinical volumes, Parquet staging stores, and backups with KMS-managed key rotation; internal service-to-service traffic mandates mTLS 1.3.',
    technicalAsset: 'kms/envelope-encryption-policy.tf',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 6 (Comply with the law)'
  },
  {
    id: 'ISO-A8-28',
    framework: 'ISO 27001:2022',
    section: 'Annex A.8.28 & A.8.32: Secure Coding & Change Management',
    title: 'GitOps Policy-as-Code Lifecycle & Audited Release Rollback',
    requirement: 'Secure engineering principles and formal change management controls must govern all modifications to software, configurations, and security rules.',
    waveboundEvidence: 'Declarative W3C SHACL shapes and OPA Rego rules undergo peer review, automated PySHACL regression testing, canary rollout checks, and Decision Gate D-009 emergency rollback controls.',
    technicalAsset: 'compiler/rdf_to_rego.py & .github/workflows/ci.yml',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
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
  },
  {
    id: 'MHRA-AIC-01',
    framework: 'DCB0129 / ISO 42001',
    section: 'MHRA National Commission (Sept 2026) · 3 Pillars',
    title: 'Proportionate Lifecycle & Staged "L-Plate" Conditional AI Monitoring',
    requirement: 'Health AI systems operating under staged conditional ("L-plate") authorisation require continuous post-market performance, drift telemetry, and shared system-wide accountability across Trust CSOs and developers.',
    waveboundEvidence: '44 Commission recommendations mapped to Wavebound in-enclave drift telemetry, immutable W3C PROV-O safety logs, and CSO kill-switch / DCB0160 rollback controls.',
    technicalAsset: 'src/components/LLMSecurityEnclave.tsx & src/components/InHouseClinicalSafety.tsx',
    status: 'COMPLIANT',
    criticality: 'MANDATORY',
    caldicottPrinciple: 'Principle 6 (Comply with law) & Principle 8 (Inform patients / no surprises)'
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
  },
  {
    id: 'HAZ-IH-06',
    category: 'Adaptive AI Drift & Conditional "L-Plate" Release',
    hazardDescription: 'Silent model calibration degradation or subgroup sensitivity drift during supervised "L-plate" conditional deployment under the 2026 MHRA AI Commission framework.',
    potentialCause: 'Local clinical coding practices or patient acuity shifts post-deployment without triggering automated post-market clinical follow-up (PMCF) thresholds.',
    clinicalHarm: 'Gradual rise in missed deteriorations or inappropriate triage prioritisation across downstream Trust clinical pathways.',
    initialSeverity: 'Major',
    initialLikelihood: 'Medium',
    initialRisk: 'High',
    clinicalMitigation: 'Continuous post-deployment calibration & drift telemetry integrated with Trust Datix/PMCF feeds; automated model quarantine and deterministic rollback triggered if subgroup sensitivity breaches DCB0160 tolerance.',
    residualSeverity: 'Considerable',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'APPROVED',
    dcb0160DeploymentNote: 'Designated Trust CSO must define quarterly "L-plate" conditional authorisation review gates and maintain immediate clinical kill-switch authority.'
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

