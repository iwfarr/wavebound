export type BuildupCategory =
  | 'ISMS Clauses 4–10'
  | 'Risk & Statement of Applicability'
  | 'Operational SOPs & Annex A'
  | 'DEA 2017 Accreditation Dossier';

export interface IsmsBuildupArtefact {
  id: string;
  title: string;
  category: BuildupCategory;
  clauseRef: string;
  ownerRole: string;
  reviewCadence: string;
  purpose: string;
  opaRuleImpact: string;
  runtimeInputClaim: string;
  regoAssertionPreview: string;
  templateMarkdown: string;
}

export interface DocsToOpaClaimSwitch {
  id: string;
  label: string;
  sourceDocOrProcess: string;
  clauseRef: string;
  feedLayer: 'Design-Time Governance Baseline' | 'Runtime Process Attestation';
  jsonPath: string;
  defaultActive: boolean;
  failureImpact: string;
}

export const DOCS_TO_OPA_SWITCHES: DocsToOpaClaimSwitch[] = [
  {
    id: 'ismsCertified',
    label: 'ISO/IEC 27001:2022 ISMS Certificate Current',
    sourceDocOrProcess: 'Accredited Certification Audit & Clause 9 Management Review',
    clauseRef: 'Clauses 9–10 · DEA s71',
    feedLayer: 'Design-Time Governance Baseline',
    jsonPath: 'input.enclave.isms_27001_certified',
    defaultActive: true,
    failureImpact: 'Blocks DEA Section 71 public authority data mounting; enclave lacks mandatory UKSA Accredited Processor baseline.'
  },
  {
    id: 'soaApproved',
    label: 'Clause 6.1.3(d) Statement of Applicability Signed',
    sourceDocOrProcess: 'SIRO & CISO Annual SoA Sign-Off across Annex A.5–A.8',
    clauseRef: 'Clause 6.1.3(d) · D-001',
    feedLayer: 'Design-Time Governance Baseline',
    jsonPath: 'input.governance.soa_approved_current',
    defaultActive: true,
    failureImpact: 'Policy bundle flagged unverified; admission fails closed until Annex A control justifications are signed.'
  },
  {
    id: 'deaS71Active',
    label: 'UKSA RAP Processor & Project Accreditation Valid',
    sourceDocOrProcess: 'DEA 2017 Research Accreditation Panel Register Sync',
    clauseRef: 'DEA 2017 s70–s71 · Annex A.5.31',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.project.dea_rap_accreditation_valid',
    defaultActive: true,
    failureImpact: 'Pod mount denied for DEA-gated linked datasets under Section 71 statutory rules.'
  },
  {
    id: 'igTrainingValid',
    label: 'Staff Vetting, Annual IG Training & DEA NDA Unexpired',
    sourceDocOrProcess: 'HR Screening + LMS Training Expiry + Signed DAA Workflow',
    clauseRef: 'Annex A.6.1, A.6.3, A.6.6',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.researcher.ig_and_vetting_valid',
    defaultActive: true,
    failureImpact: 'Safe Person gate fails immediately at Keycloak OIDC -> OPA admission webhook.'
  },
  {
    id: 'harborCveClean',
    label: 'Zero-Egress Network & Signed Container CVE Scan Passed',
    sourceDocOrProcess: 'GitOps PySHACL CI + Harbor Trivy Vulnerability Gate',
    clauseRef: 'Annex A.8.8, A.8.20–A.8.22, A.8.32',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.enclave.cve_and_egress_verified',
    defaultActive: true,
    failureImpact: 'Container spawn rejected by admission controller; vulnerable or egress-open image quarantined.'
  },
  {
    id: 'airlockDualSignoff',
    label: 'SDC Output Thresholds & Dual Airlock Review Recorded',
    sourceDocOrProcess: 'Quantitative SDC Solver (k ≥ 10, ≤ 80%) + SDC Lead Co-Sign',
    clauseRef: 'Annex A.8.12, A.8.15 · D-005',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.export.sdc_and_dual_signoff_complete',
    defaultActive: true,
    failureImpact: 'Airlock egress stays fail-closed (`egress_permitted = false`); file cannot leave the enclave.'
  }
];

export const ISMS_DEA_BUILDUP_ARTEFACTS: IsmsBuildupArtefact[] = [
  // --- 1. ISMS Clauses 4–10 ---
  {
    id: 'isms-scope-context',
    title: 'ISMS Scope, Interested Parties & Context Statement',
    category: 'ISMS Clauses 4–10',
    clauseRef: 'ISO/IEC 27001:2022 Clauses 4.1–4.4',
    ownerRole: 'Senior Information Risk Owner (SIRO) & CISO',
    reviewCadence: 'Annual & upon architecture change',
    purpose: 'Defines exact logical, network, and physical boundaries of the Trusted Research Environment (sovereign UK VPCs, VDI gateways, airlock pipelines, and excluded researcher laptops) alongside statutory stakeholders (ICO, UKSA RAP, HRA/CAG, NHS Trusts).',
    opaRuleImpact: 'Establishes which Kubernetes namespaces, VPC subnets, and storage tiers fall inside the governed Policy-as-Code enforcement perimeter (Decision Gate D-001).',
    runtimeInputClaim: 'input.enclave.scope_boundary == "uk_sovereign_tre_prod"',
    regoAssertionPreview: `package tre.isms.scope\n\nvalid_scope_boundary {\n  input.enclave.scope_boundary == "uk_sovereign_tre_prod"\n  input.enclave.uk_residency_verified == true\n}`,
    templateMarkdown: `# ISMS Scope & Context Statement (ISO/IEC 27001:2022 Clause 4)

## 1. Organizational Context & Statutory Drivers (Clause 4.1–4.2)
- Statutory Authorities: UK GDPR / DPA 2018, Digital Economy Act 2017 Part 5 Ch. 5 (Sections 64–73), NHS Act 2006 s251, NHS DSPT.
- Interested Parties: Hosting NHS Trust / Data Controllers, UKSA Research Accreditation Panel (RAP), Patient Contributors, Accredited Researchers.

## 2. In-Scope Interfaces & Boundaries (Clause 4.3)
- Sovereign UK Cloud VPC (zero WAN egress, microsegmented analytical subnets).
- Pixel-only Virtual Desktop (VDI) gateway, internal Harbor/PyPI/CRAN mirrors, and Airlock Egress Service.
- Exclusions: External university laptops and public internet networks (strictly untrusted; VDI pixel-stream only).

## 3. OPA Enforcement Binding
- Every Kubernetes workload inside scope namespaces is intercepted against \`tre:WorkspaceAdmissionShape\`.`
  },
  {
    id: 'isms-leadership-policy',
    title: 'Information Security Policy & Role Accountability Charter',
    category: 'ISMS Clauses 4–10',
    clauseRef: 'ISO/IEC 27001:2022 Clauses 5.1–5.3',
    ownerRole: 'Executive Sponsor / SIRO & Caldicott Guardian',
    reviewCadence: 'Annual executive sign-off',
    purpose: 'Formal top-management commitment setting security objectives, dual-key Caldicott/SIRO escalation authority, and clear segregation between policy authors, platform operators, and airlock output reviewers.',
    opaRuleImpact: 'Forbids single-person privilege escalation or unattributed policy overrides; anchors role separation rules in Keycloak RBAC and two-person airlock checks.',
    runtimeInputClaim: 'input.governance.policy_version & input.reviewer.role != input.researcher.id',
    regoAssertionPreview: `two_person_separation {\n  input.export.submitted_by != input.export.approved_by\n  input.export.approved_by_role == "accredited_sdc_officer"\n}`,
    templateMarkdown: `# Top-Level Information Security Policy (ISO/IEC 27001:2022 Clause 5)

## 1. Security Objectives
- Zero unauthorized external data exfiltration across analytical enclaves.
- Verifiable two-person airlock review and cryptographic provenance (W3C PROV-O) on 100% of exports.

## 2. Role Separation Matrix (Clause 5.3)
- Policy Owner (SIRO / Caldicott Guardian): Approves governance thresholds and SoA exclusions.
- Platform Engineer: Maintains GitOps Terraform/OPA pipelines (zero unapproved access to Tier 2/3 microdata).
- SDC Airlock Officer: Independent reviewer barred from approving their own study exports.`
  },
  {
    id: 'isms-audit-mgmt-review',
    title: 'Internal Audit Programme, Monitoring Metrics & Management Review Minutes',
    category: 'ISMS Clauses 4–10',
    clauseRef: 'ISO/IEC 27001:2022 Clauses 9.1–9.3 & Clause 10',
    ownerRole: 'Information Governance Manager & Internal Audit Lead',
    reviewCadence: 'Quarterly metrics review · Annual full audit',
    purpose: 'Tracks ISMS KPIs (CI PySHACL pass rates, shadow discrepancy rates, vulnerability MTTR, break-glass incident reviews), nonconformities, and corrective action closure ahead of surveillance audits.',
    opaRuleImpact: 'Mandates immutable WORM logging of every OPA allow/deny decision and alerts Management Review when policy drift or webhook failures occur.',
    runtimeInputClaim: 'input.audit.worm_sink_healthy & input.audit.policy_git_sha',
    regoAssertionPreview: `audit_integrity_active {\n  input.audit.worm_sink_healthy == true\n  count(input.audit.policy_git_sha) > 0\n}`,
    templateMarkdown: `# ISMS Performance Evaluation & Management Review (Clauses 9–10)

## 1. Automated Evidence Feeds (Clause 9.1)
- PySHACL CI Harness Pass Rate: 100% on merged policy PRs.
- W3C PROV-O Egress & Admission Events: Shipped continuously to immutable WORM SIEM storage.

## 2. Internal Audit & CAPA Log (Clauses 9.2 & 10)
- Nonconformity ID | Root Cause | Rego / SHACL Remediation PR | Owner | Verification Date`
  },

  // --- 2. Risk & Statement of Applicability ---
  {
    id: 'isms-risk-methodology-rtp',
    title: 'Information Security Risk Assessment & Risk Treatment Plan (RTP)',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'ISO/IEC 27001:2022 Clauses 6.1.1–6.1.3(b) & 8.2–8.3',
    ownerRole: 'CISO & Information Asset Owners (IAO)',
    reviewCadence: 'Bi-annual & pre-major platform change',
    purpose: 'Identifies confidentiality, integrity, and availability threats (re-identification, internet egress, compromised packages, AI prompt leakage, unvetted access) and maps each accepted treatment directly to technical or organizational controls.',
    opaRuleImpact: 'Justifies exact numeric thresholds codified in Decision Register D-005 & D-007 (e.g., k >= 10, dominance <= 80%, token TTL <= 2h for High-Risk AI agents).',
    runtimeInputClaim: 'input.dataset.min_cell_count >= 10 & input.agent.token_ttl_seconds <= 7200',
    regoAssertionPreview: `risk_treatment_thresholds {\n  input.dataset.min_cell_count >= 10\n  input.dataset.max_dominance_ratio <= 0.80\n}`,
    templateMarkdown: `# Risk Assessment & Risk Treatment Plan (ISO/IEC 27001 Clause 6.1.2)

| Risk ID | Threat / Vulnerability | Likelihood / Impact | Treatment Option | Mapped Annex A & Wavebound Control |
|---|---|---|---|---|
| R-01 | Outbound microdata exfiltration via pip/HTTP | High / Catastrophic | Mitigate | Annex A.8.20–A.8.22 Zero-Egress VPC + Harbor DMZ |
| R-02 | Small cell disclosure in exported table | Medium / Major | Mitigate | Annex A.8.12 Airlock OPA Rego (k >= 10) |
| R-03 | AI agent unauthorized raw SQL dump | High / Catastrophic | Mitigate | Annex A.8.2 + MCP Read-Only Human Sponsor Shape |`
  },
  {
    id: 'isms-soa-register',
    title: 'Statement of Applicability (SoA) across Annex A.5–A.8 (93 Controls)',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'ISO/IEC 27001:2022 Clause 6.1.3(d)',
    ownerRole: 'CISO & Compliance Lead',
    reviewCadence: 'Living GitOps register · Signed quarterly',
    purpose: 'The centerpiece ISO 27001 audit document recording every control in Annex A.5 (Organizational), A.6 (People), A.7 (Physical), and A.8 (Technological), its inclusion/exclusion rationale, implementation status, and supporting evidence path.',
    opaRuleImpact: 'Treats signed SoA control currency as a prerequisite attestation in CI/CD release gates (`soa_approved_current == true`) so undocumented rule exceptions cannot ship.',
    runtimeInputClaim: 'input.governance.soa_approved_current & input.governance.soa_revision_id',
    regoAssertionPreview: `soa_governance_verified {\n  input.governance.soa_approved_current == true\n  startswith(input.governance.soa_revision_id, "SOA-2026-")\n}`,
    templateMarkdown: `# Statement of Applicability (SoA) Register Excerpt (Clause 6.1.3(d))

| Control ID | Title (ISO/IEC 27001:2022) | Applicable | Justification & Implementation Evidence |
|---|---|---|---|
| A.5.15 | Access Control | Yes | Keycloak OIDC + SHACL WorkspaceAdmissionShape + OPA authz.rego |
| A.6.3 | Security Awareness & Training | Yes | Annual NHS IG + UKSA Safe Researcher expiry checked at pod ingress |
| A.7.1 | Physical Security Perimeters | Yes (Inherited) | UK Sovereign Tier-3 Cloud DC attestations; VDI blocks local disk |
| A.8.12 | Data Leakage Prevention | Yes | Airlock SDC OPA gate + clipboard/USB block in VDI policy |
| A.8.24 | Use of Cryptography | Yes | KMS-backed AES-256-GCM volumes + mTLS 1.3 service mesh |`
  },
  {
    id: 'isms-asset-supplier-register',
    title: 'Information Asset, Data Flow & Cloud Supplier Register',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'ISO/IEC 27001:2022 Annex A.5.9–A.5.12 & A.5.19–A.5.23',
    ownerRole: 'Information Asset Owners (IAOs) & Procurement Lead',
    reviewCadence: 'Updated on every dataset or sub-processor onboarding',
    purpose: 'Catalogues clinical cohorts (Tier 1–3 sensitivity classification), KMS encryption keys, AI model weights, internal package mirrors, and sovereign cloud / LLM sub-processor DTAC & ZDR agreements.',
    opaRuleImpact: 'Drives dataset-tier matching in OPA (`tre:hospitalDataTier`): preventing Tier 3 identifiable cohorts or foundation model weights from attaching to workspaces lacking s251 clearance.',
    runtimeInputClaim: 'input.dataset.tier & input.dataset.zdr_baa_verified',
    regoAssertionPreview: `tier3_lawful_access {\n  input.dataset.tier == "Tier3_Identifiable"\n  input.project.s251_cag_active == true\n}`,
    templateMarkdown: `# Information Asset & Supplier Register (Annex A.5.9 & A.5.19)

## 1. Classified Data Assets
- GP Primary Care EHR (Tier 2 Pseudonymised) — Owner: IAO Primary Care — Lawful Basis: UK GDPR Art 6(1)(e)/9(2)(j)
- Linked Genomic Cohort (Tier 3 Sensitive) — Owner: IAO Genomics — Requires active CAG Section 251 + DEA RAP

## 2. Cloud & Software Sub-Processors
- Sovereign VPC Host (UK Region) — ISO 27001:2022 Certified, DSPT Standards Met, DTAC Verified.`
  },

  // --- 3. Operational SOPs & Annex A ---
  {
    id: 'sop-access-vetting-training',
    title: 'SOP-01: User Vetting, Annual IG Training & Access Revocation Lifecycle',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.5.15–A.5.18 & Annex A.6.1, A.6.3, A.6.6',
    ownerRole: 'Identity & Access Management (IAM) Lead & IG Officer',
    reviewCadence: 'Annual · Continuous automated identity sync',
    purpose: 'Operational workflow governing researcher onboarding: BPSS/institutional vetting check, verified Safe Researcher / NHS IG training completion date, countersigned User Access Agreement (NDA), FIDO2 MFA enrolment, and automated revocation upon leaver event or expiry.',
    opaRuleImpact: 'Produces live identity claims (`accreditation_valid`, `ig_training_expiry`) injected into Keycloak OIDC tokens and evaluated in sub-millisecond by OPA at every workspace launch.',
    runtimeInputClaim: 'input.researcher.ig_and_vetting_valid & input.researcher.mfa_fido2_verified',
    regoAssertionPreview: `safe_person_admitted {\n  input.researcher.ig_and_vetting_valid == true\n  input.researcher.mfa_fido2_verified == true\n  input.researcher.ig_training_expiry_ns > time.now_ns()\n}`,
    templateMarkdown: `# SOP-01: Researcher Access, Vetting & Revocation (Annex A.5.15–18, A.6)

1. Pre-Admission Verification: HR/Institution confirms employment; IG Office records Safe Researcher & annual NHS IG pass date.
2. Token Minting: Identity Provider (OIDC) issues short-lived claim with \`ig_training_expiry_ns\` and project group binding.
3. Automated Enforcement: If training expires or researcher departs, OIDC claim flips false and OPA blocks session admission automatically.`
  },
  {
    id: 'sop-gitops-change-cve',
    title: 'SOP-02: Secure GitOps Change Management & Container CVE Gatekeeping',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.8.8, A.8.9, A.8.28 & A.8.32',
    ownerRole: 'Platform Security Lead & SRE Architect',
    reviewCadence: 'Enforced on every pull request & nightly mirror sync',
    purpose: 'Requires peer-reviewed Git commits for all infrastructure/Rego edits, PySHACL conformance test suites, Trivy CVE scans on Harbor container/PyPI/CRAN mirrors, and documented rollback playbooks (Decision Gate D-009).',
    opaRuleImpact: 'CI/CD emits signed Cosign/Trivy attestations (`cve_and_egress_verified`); Kubernetes validating webhooks call OPA to reject unsigned, root-privileged, or un-scanned containers.',
    runtimeInputClaim: 'input.enclave.cve_and_egress_verified & input.pod.run_as_non_root',
    regoAssertionPreview: `hardened_pod_admitted {\n  input.enclave.cve_and_egress_verified == true\n  input.pod.run_as_non_root == true\n  input.pod.read_only_root_fs == true\n}`,
    templateMarkdown: `# SOP-02: GitOps Change Control & CVE Vulnerability Gate (Annex A.8.8, A.8.32)

1. Policy Changes: Edit semantic Turtle/Rego -> run \`pytest tests/test_shapes.py\` -> 2-person SRE/IG review.
2. Mirror Ingestion: Upstream PyPI/CRAN/Docker artifacts quarantined in DMZ -> Trivy CVE check (0 Critical/High) -> signed into internal Harbor mirror.
3. Emergency Rollback: Revert to previous signed Git tag per Decision Gate D-009 runbook within < 15 minutes.`
  },
  {
    id: 'sop-incident-continuity-crypto',
    title: 'SOP-03: Incident Response, Break-Glass Escalation, Crypto & PITR Recovery',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.5.24–A.5.30, A.8.13, A.8.15–A.8.16 & A.8.24',
    ownerRole: 'Security Operations Lead & Disaster Recovery Owner',
    reviewCadence: 'Bi-annual tabletop & quarterly PITR restore drill',
    purpose: 'Establishes SLA timelines for anomalous egress/SIEM alerts, mandatory SIRO alerts for emergency break-glass access, KMS AES-256 key rotation & cryptographic erasure, and isolated sandbox Point-in-Time Recovery drills.',
    opaRuleImpact: 'OPA blocks emergency elevation unless a ticket reason is supplied (triggering synchronous SIEM/SIRO alerts) and rejects unencrypted storage volumes (`encryption == "AES-256"`).',
    runtimeInputClaim: 'input.storage.aes256_kms_encrypted & input.session.siem_audit_active',
    regoAssertionPreview: `storage_crypto_compliant {\n  input.storage.aes256_kms_encrypted == true\n  input.session.siem_audit_active == true\n}`,
    templateMarkdown: `# SOP-03: Incident Response, Cryptography & Continuity (Annex A.5.24–30, A.8.13, A.8.24)

1. Detection & Triage: SIEM flags policy violations or anomalous airlock queries within 5 minutes -> isolate pod namespace via Calico drop rule.
2. Break-Glass Protocol: Requires justified ticket ID + triggers immediate SIRO & Caldicott Guardian notification.
3. Backups & Crypto: AES-256 KMS keys rotated annually; encrypted WORM audit logs and PITR snapshots tested quarterly in isolated sandboxes.`
  },
  {
    id: 'sop-airlock-sdc',
    title: 'SOP-04: Two-Person Airlock Output Checking & Quantitative SDC SOP',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.8.12 · SATRE § 4–5 · Decision Gate D-005',
    ownerRole: 'Lead Statistical Disclosure Officer',
    reviewCadence: 'Executed per export request · Reviewed bi-annually',
    purpose: 'Step-by-step protocol requiring candidate research outputs (tables, regression coefficients, survival curves, trained model weights) to pass quantitative SDC thresholds (k >= 10, dominance <= 80%, secondary masking) plus independent two-person human review before release.',
    opaRuleImpact: 'Compiles numeric ceilings into fail-closed `egress_permitted` OPA Rego policy (`default egress_permitted = false`), requiring both machine pass and signed reviewer attestation.',
    runtimeInputClaim: 'input.export.sdc_and_dual_signoff_complete & input.dataset.min_cell_count >= 10',
    regoAssertionPreview: `egress_permitted {\n  input.export.sdc_and_dual_signoff_complete == true\n  input.dataset.min_cell_count >= 10\n  input.dataset.max_dominance_ratio <= 0.80\n}`,
    templateMarkdown: `# SOP-04: Quantitative SDC & Airlock Egress SOP (Annex A.8.12)

1. Automated Pre-Check: Researcher submits output to airlock -> Statbarn solver checks k >= 10, dominance <= 80%, and residual secondary suppression.
2. Independent Review: Second accredited SDC officer verifies context, checks differencing against prior exports, and countersigns manifest.
3. Cryptographic Release: Web Crypto SHA-256 seal + W3C PROV-O triple emitted prior to download.`
  },

  // --- 4. DEA 2017 Accreditation Dossier ---
  {
    id: 'dea-s71-tre-application',
    title: 'DEA 2017 Section 71 Accredited Processing Environment Dossier & ISO Cert',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 Part 5 Ch. 5 (Section 71) & UKSA TRE SOP V1.4',
    ownerRole: 'TRE Director & Compliance Lead',
    reviewCadence: 'Triennial UKSA renewal · Annual ISO surveillance',
    purpose: 'Compiles the statutory submission proving to the UK Statistics Authority Research Accreditation Panel (RAP) that the environment holds current independent ISO/IEC 27001 certification, enforces network air-gapping, and restricts linkage under DEA Section 67 penalties.',
    opaRuleImpact: 'Binds verified UKSA Processor accreditation status (`dea_rap_accreditation_valid == true`) alongside active ISO 27001 certification into dataset mounting policies.',
    runtimeInputClaim: 'input.project.dea_rap_accreditation_valid & input.enclave.isms_27001_certified',
    regoAssertionPreview: `dea_processor_mount_allowed {\n  input.enclave.isms_27001_certified == true\n  input.project.dea_rap_accreditation_valid == true\n}`,
    templateMarkdown: `# DEA 2017 Section 71 Accredited Processor Dossier (UKSA TRE SOP V1.4)

- Processor Legal Entity & Boundary: UK Sovereign TRE Enclave
- Mandatory ISO/IEC 27001:2022 Certification Number & Scope Match: Attached & Active
- UKSA Research Accreditation Panel (RAP) Undertaking & Section 67 Criminal Liability Notice Acknowledged.`
  },
  {
    id: 'dea-saq-v31-evidence',
    title: 'UKSA TRE Self-Assessment Questionnaire (SAQ V3.1) Evidence Mapping',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 s70 Code of Practice · UKSA TRE SAQ V3.1',
    ownerRole: 'Information Security Manager & Platform Architect',
    reviewCadence: 'Submitted at accreditation & major enclave revisions',
    purpose: 'Maps every UKSA Five Safes technical audit question (Safe People vetting, Safe Projects RAP ID, Safe Settings firewall/VDI isolation, Safe Data split-file HMAC linkage, Safe Outputs airlock SDC) directly to verifiable Wavebound artefacts and OPA/SHACL test fixtures.',
    opaRuleImpact: 'Ensures zero divergence between SAQ narrative assurances and the actual Rego admission/egress policies enforced in cluster production.',
    runtimeInputClaim: 'input.governance.soa_approved_current & input.enclave.cve_and_egress_verified',
    regoAssertionPreview: `saq_technical_controls_active {\n  input.enclave.cve_and_egress_verified == true\n  input.governance.soa_approved_current == true\n}`,
    templateMarkdown: `# UKSA TRE Accreditation SAQ V3.1 Traceability Sheet

- SAQ Safe People: SOP-01 + Keycloak OIDC + \`tre:SafePerson\` expiry check.
- SAQ Safe Settings: Zero-egress VPC (A.8.20–22) + Read-only root pods (UID 10001) + FIDO2 MFA.
- SAQ Safe Outputs: Quantitative SDC Solver (k >= 10, Dom <= 80%) + Dual Airlock (SOP-04).`
  },
  {
    id: 'dea-rap-project-registry',
    title: 'UKSA RAP Approved Project, Ethics & Researcher Undertaking Ledger',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 Section 70 & Research Code Criteria',
    ownerRole: 'Data Access Committee (DAC) Secretariat',
    reviewCadence: 'Synchronized daily / per project approval',
    purpose: 'Authoritative registry linking each approved project ID to its public benefit statement, HRA REC / RAP decision date, lawful basis, expiry horizon, and named Accredited Researchers.',
    opaRuleImpact: 'Feeds project eligibility assertions (`dea_rap_accreditation_valid`, `ethics_approval_active`) into OPA so expired or amended projects are automatically halted before compute mount.',
    runtimeInputClaim: 'input.project.dea_rap_accreditation_valid & input.project.ethics_expiry_ns',
    regoAssertionPreview: `safe_project_active {\n  input.project.dea_rap_accreditation_valid == true\n  input.project.ethics_expiry_ns > time.now_ns()\n}`,
    templateMarkdown: `# DEA 2017 RAP Project & Ethics Entitlement Registry

- Project URI: \`tre:Project_DEA_2026_041\`
- UKSA RAP Approval Ref & Expiry Date: Recorded & synced to OPA bundle
- Authorized Dataset Tier & Lawful Basis: DEA 2017 Part 5 Ch. 5 + UK GDPR Art 6(1)(e)/9(2)(j)`
  }
];
