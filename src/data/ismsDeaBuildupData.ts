export type BuildupSubTab =
  | 'roles'
  | 'roadmap'
  | 'artifacts'
  | 'cadence'
  | 'opa_mapper';

export type BuildupCategory =
  | 'Mandatory Clauses 4–10'
  | 'Risk & Statement of Applicability'
  | 'Operational SOPs & Annex A'
  | 'DEA 2017 Accreditation Dossier';

export interface IsmsCoreRole {
  id: string;
  roleTitle: string;
  clauseAnchor: string;
  accountabilitySummary: string;
  keyResponsibilities: string[];
  platformAuditRule: string;
}

export interface PlaybookPhase {
  id: string;
  phaseNumber: number;
  title: string;
  timelineWeeks: string;
  focusSummary: string;
  clauseTags: string[];
  deliverables: string[];
  platformPracticeNote: string;
}

export interface CadenceCycleItem {
  id: string;
  frequency: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';
  title: string;
  clauseAndAnnexRef: string;
  activities: string[];
  auditEvidenceProduced: string;
}

export interface IsmsBuildupArtefact {
  id: string;
  title: string;
  category: BuildupCategory;
  clauseRef: string;
  practicalFormat: string;
  ownerRole: string;
  reviewCadence: string;
  purpose: string;
  platformPreparationRequirement: string;
  stageOneCritical?: boolean;
  templateMarkdown: string;
  // Optional automation bridge (only shown if user expands optional PaC/OPA view)
  optionalOpaRuleImpact: string;
  optionalRuntimeClaim: string;
  optionalRegoPreview: string;
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

export const CORE_ISMS_ROLES: IsmsCoreRole[] = [
  {
    id: 'role-exec-sponsor',
    roleTitle: 'Executive Sponsor (Top Management)',
    clauseAnchor: 'ISO/IEC 27001:2022 Clause 5.1–5.3',
    accountabilitySummary:
      'Accountable executive authority ensuring security governance matches platform risk, public-sector trust, and statutory duties.',
    keyResponsibilities: [
      'Approves the formal ISMS Scope Statement (Clause 4.3) covering data ingestion, compute workspaces, and export airlocks.',
      'Signs and sponsors the top-level Information Security Policy (Clause 5.2) across engineering, clinical IG, and research operations.',
      'Sets quantitative organizational risk appetite, allocates budget/tooling, and chairs formal Management Reviews (Clause 9.3).'
    ],
    platformAuditRule:
      'External Certification Body assessors interview Top Management directly during Stage 2 to verify leadership awareness beyond delegated paperwork.'
  },
  {
    id: 'role-isms-lead',
    roleTitle: 'ISMS Lead / Information Security Manager',
    clauseAnchor: 'ISO/IEC 27001:2022 Clauses 4–10',
    accountabilitySummary:
      'Coordinates day-to-day ISMS execution, risk governance, policy lifecycle, and external certification audits.',
    keyResponsibilities: [
      'Maintains the Risk Assessment Methodology, live Risk Register, and Risk Treatment Plan (Clause 6.1.2–6.1.3).',
      'Curates the 93-control Statement of Applicability (SoA) across Annex A.5–A.8 and tracks owner sign-offs.',
      'Coordinates Stage 1 / Stage 2 UKAS or ANAB accredited Certification Body assessments and UKSA DEA accreditation evidence submissions.'
    ],
    platformAuditRule:
      'Must verify that paper policies, cloud/platform telemetry, and 60–90 days of operational tickets match consistently before Stage 1.'
  },
  {
    id: 'role-control-owners',
    roleTitle: 'Control Owners (Engineering, IT, HR, Legal, Facilities)',
    clauseAnchor: 'ISO/IEC 27001:2022 Clause 8 & Annex A.5–A.8',
    accountabilitySummary:
      'Operational practitioners executing daily controls across infrastructure, people screening, contracts, and enclave perimeters.',
    keyResponsibilities: [
      'Platform/SRE Owners: Enforce SSO + FIDO2 MFA, least-privilege RBAC, encryption at rest/in transit, vulnerability patching (A.8.8), and backup restore drills (A.8.13).',
      'HR & People Owners: Execute background screening (A.6.1), mandatory annual IG/security training (A.6.3), and joiner/mover/leaver revocations.',
      'Legal & Facilities Owners: Maintain sub-processor DPAs/SOC 2 reviews (A.5.19–5.23), NDAs (A.6.6), and physical/VDI boundary controls (A.7).'
    ],
    platformAuditRule:
      'Every implemented control requires timestamped operational proof (PR approvals, scan logs, training records, restore reports)—written policies alone fail Stage 2.'
  },
  {
    id: 'role-internal-auditor',
    roleTitle: 'Independent Internal Auditor',
    clauseAnchor: 'ISO/IEC 27001:2022 Clause 9.2',
    accountabilitySummary:
      'Conducts an impartial pre-certification audit across every management clause (4–10) and sampled Annex A controls.',
    keyResponsibilities: [
      'Audits organizational processes, engineering configurations, and operational evidence against ISO/IEC 27001:2022 requirements prior to Stage 1.',
      'Documents audit findings, observations, and nonconformities in a formal Internal Audit Report.',
      'Verifies root-cause analysis and closure evidence inside the Corrective Action Log (Clause 10.2).'
    ],
    platformAuditRule:
      'Strict Independence Invariant: The internal auditor MUST NOT audit their own work. Small teams should retain an external advisor or cross-department peer.'
  }
];

export const SIX_PHASE_PLAYBOOK: PlaybookPhase[] = [
  {
    id: 'phase-1-scope',
    phaseNumber: 1,
    title: 'Establish Governance & Define ISMS Scope',
    timelineWeeks: 'Weeks 1–3',
    focusSummary: 'Foundation setting, leadership commitment, interested parties, and strict platform boundary scoping.',
    clauseTags: ['Clause 4.1–4.3', 'Clause 5.1–5.2', 'Amendment 1:2024'],
    deliverables: [
      'Secure Top Management sign-off on the ISMS Charter and publish a concise Information Security Policy (Clause 5.1–5.2).',
      'Analyze internal/external context (Clause 4.1–4.2): interested parties (patients, NHS Trusts, regulators, UKSA RAP, cloud suppliers), contractual terms, and whether climate change affects facility or cloud resilience (Amendment 1:2024).',
      'Lock the ISMS Scope Statement (Clause 4.3): explicitly bound your core data intelligence platform, cloud accounts, identity providers, airlock pipelines, and support teams—excluding out-of-scope corporate networks where safely isolated.'
    ],
    platformPracticeNote:
      'Keeping the initial scope tightly anchored around the core sovereign data platform and support boundary avoids excessive audit overhead.'
  },
  {
    id: 'phase-2-risk-soa',
    phaseNumber: 2,
    title: 'Run Risk Assessment & Build Statement of Applicability',
    timelineWeeks: 'Weeks 4–6',
    focusSummary: 'Core risk scoring architecture, data-flow threat mapping, Risk Treatment Plan, and 93-control SoA.',
    clauseTags: ['Clause 6.1.2', 'Clause 6.1.3', 'Annex A.5–A.8'],
    deliverables: [
      'Define repeatable Risk Methodology (Clause 6.1.2): Likelihood x Impact matrix across Confidentiality, Integrity, and Availability with a clear numeric risk-acceptance threshold.',
      'Map critical platform data flows (ingress de-identification, linkage brokers, compute enclaves, AI workspaces, output airlocks) and score risks across systems, suppliers, and workflows.',
      'Produce the master Statement of Applicability (SoA) & Risk Treatment Plan (RTP) (Clause 6.1.3): evaluate all 93 Annex A controls, document justification for every inclusion or exclusion, record implementation state, and assign owners and due dates.'
    ],
    platformPracticeNote:
      'Even if your platform automates security via code, auditors inspect human risk reasoning and explicit justification for all 93 Annex A controls in the SoA.'
  },
  {
    id: 'phase-3-controls',
    phaseNumber: 3,
    title: 'Publish Topic-Specific Policies & Implement Controls',
    timelineWeeks: 'Weeks 7–14',
    focusSummary: 'Organization-wide standards paired with technical, people, and physical safeguards.',
    clauseTags: ['Annex A.5–A.8', 'A.8.8 / A.8.9', 'A.8.24 / A.8.28'],
    deliverables: [
      'Publish focused policies: Access Control, Acceptable Use, Cryptography (A.8.24), Secure Development (A.8.28), Configuration Management (A.8.9), Supplier/Cloud Security (A.5.19–5.23), Incident Response (A.5.24), and ICT Business Continuity (A.5.30).',
      'Enforce technical platform controls: SSO with hardware/FIDO2 MFA, least-privilege RBAC, endpoint MDM & disk encryption, centralized immutable SIEM logging (A.8.15–8.16), automated vulnerability scanning (A.8.8), and encrypted immutable backups (A.8.13).',
      'Embed people & physical controls: pre-employment screening (A.6.1), mandatory security & IG awareness training (A.6.3), formal joiner/mover/leaver access workflows, and badge/VDI perimeter rules.'
    ],
    platformPracticeNote:
      'Prepare these platform controls natively via cloud IAM, CI/CD, MDM, and SIEM first—policy engines like OPA are optional automation overlays, not prerequisites for ISO 27001.'
  },
  {
    id: 'phase-4-operate',
    phaseNumber: 4,
    title: 'Operate the ISMS & Accumulate Audit Evidence',
    timelineWeeks: 'Weeks 15–18',
    focusSummary: 'Accumulate 60–90 days of verifiable operational proof and Clause 6.2 security KPIs.',
    clauseTags: ['Clause 6.2', 'Clause 7.2', 'Clause 8.1–8.3', 'Clause 9.1'],
    deliverables: [
      'Execute live control cycles: auditors verify working operation, not policies on paper. Complete and retain at least one full cycle of user access reviews, vulnerability patching, backup restore tests, an incident tabletop drill, and critical vendor reviews.',
      'Build an indexed Evidence Repository structured by Clauses 4–10 and Annex A IDs containing timestamped proof (change tickets, SIEM exports, training logs, restore logs, architecture diagrams).',
      'Track Information Security Objectives (Clause 6.2): measure 3–5 concrete KPIs such as critical CVE remediation <= 14 days, 100% onboarding security/IG training completion, and 100% MFA enforcement.'
    ],
    platformPracticeNote:
      'Certification Bodies normally require 60–90 days of historical evidence proving controls operate continuously before approving Stage 2.'
  },
  {
    id: 'phase-5-audit-review',
    phaseNumber: 5,
    title: 'Execute Internal Audit & Management Review',
    timelineWeeks: 'Weeks 19–21',
    focusSummary: 'Mandatory pre-certification governance gate resolving major findings before external assessment.',
    clauseTags: ['Clause 9.2', 'Clause 9.3', 'Clause 10.2'],
    deliverables: [
      'Conduct the Internal Audit (Clause 9.2): engage an independent internal auditor or external advisor to audit all Clauses 4–10 and sample Annex A controls against live evidence.',
      'Close Nonconformities (Clause 10.2): log every finding in a Corrective Action Log, perform root-cause analysis (RCA), verify fixes, and eliminate all major nonconformities prior to Stage 1.',
      'Hold formal Management Review (Clause 9.3): brief Top Management on audit results, risk posture, Clause 6.2 KPI trends, supplier issues, and improvement actions, capturing signed formal minutes.'
    ],
    platformPracticeNote:
      'Attempting Stage 1 without a completed Internal Audit Report and signed Clause 9.3 Management Review Minutes causes an automatic major nonconformity.'
  },
  {
    id: 'phase-6-certify',
    phaseNumber: 6,
    title: 'Complete Stage 1 & Stage 2 Certification Audits',
    timelineWeeks: 'Weeks 22–24',
    focusSummary: 'Accredited Certification Body assessment leading to 3-year ISO/IEC 27001:2022 certification.',
    clauseTags: ['UKAS / ANAB', 'Stage 1 & Stage 2', 'DEA s71 Alignment'],
    deliverables: [
      'Stage 1 Audit (Documentation Review): A UKAS- or ANAB-accredited Certification Body inspects Scope, Security Policy, Risk Assessment, RTP, SoA, Internal Audit Report, and Management Review Minutes.',
      'Stage 2 Audit (Operational Certification): Typically 2–6 weeks later, assessors interview platform/control owners, inspect live production cloud/database configurations, and sample operational evidence tickets.',
      'Remediation & Certificate Issuance: Close any minor nonconformities within the auditor window (typically 30–90 days) to earn your 3-year ISO/IEC 27001:2022 certificate—and reuse evidence directly for UKSA DEA SAQ V3.1.'
    ],
    platformPracticeNote:
      'Typical end-to-end timeline is 16–24 weeks for an SME or dedicated data platform unit, and 6–12 months for multi-site enterprises.'
  }
];

export const POST_CERT_CADENCE: CadenceCycleItem[] = [
  {
    id: 'cad-monthly',
    frequency: 'Monthly',
    title: 'Vulnerability SLAs, Alerts & Joiner/Mover/Leaver Hygiene',
    clauseAndAnnexRef: 'Clause 9.1 · Annex A.5.18, A.8.8, A.8.16',
    activities: [
      'Review vulnerability scan findings and verify critical/high remediation SLAs (e.g., <= 14 days).',
      'Triage SIEM security alerts, anomalous export/access events, and incident tickets.',
      'Audit joiner/mover/leaver IAM provisioning and timely revocation tickets.'
    ],
    auditEvidenceProduced: 'Signed monthly patching compliance export, SIEM triage log summary, and JML ticket reconciliation.'
  },
  {
    id: 'cad-quarterly',
    frequency: 'Quarterly',
    title: 'Privileged Access Reviews, Clause 6.2 KPIs & Planned Changes',
    clauseAndAnnexRef: 'Clause 6.2, 6.3 · Annex A.5.18, A.8.2, A.8.32',
    activities: [
      'Run formal User Access Reviews (UAR) across production cloud admins, database stewards, and approved project researchers.',
      'Evaluate Clause 6.2 Security Objectives & KPIs against target thresholds.',
      'Review upcoming architecture, dataset onboarding, or infrastructure changes under Clause 6.3 (Planning of Changes).'
    ],
    auditEvidenceProduced: 'Quarter-stamped UAR sign-off sheet, KPI dashboard snapshot, and change-advisory approvals.'
  },
  {
    id: 'cad-semiannual',
    frequency: 'Semi-Annually',
    title: 'Incident Tabletop, Backup Restore Drill & Supplier Assurance',
    clauseAndAnnexRef: 'Annex A.5.22, A.5.24–5.26, A.8.13',
    activities: [
      'Conduct a realistic tabletop incident response exercise (e.g., compromised researcher token or attempted airlock leak).',
      'Execute an isolated sandbox Point-in-Time Recovery (PITR) / backup restoration test verifying integrity and RTO/RPO.',
      'Review updated SOC 2 Type II or ISO 27001 certificates for key cloud hosts, identity providers, and AI sub-processors.'
    ],
    auditEvidenceProduced: 'After-action tabletop lessons report, timestamped restore integrity log, and vendor review tracker.'
  },
  {
    id: 'cad-annual',
    frequency: 'Annually',
    title: 'Full Risk Refresh, Internal Audit, Management Review & Training',
    clauseAndAnnexRef: 'Clauses 6.1, 9.2, 9.3 · Annex A.6.3',
    activities: [
      'Refresh the enterprise Risk Assessment, Risk Treatment Plan, and 93-control Statement of Applicability (SoA).',
      'Execute a complete independent Internal Audit across Clauses 4–10 and sample Annex A controls.',
      'Convene the formal Top Management Review (Clause 9.3) and run mandatory annual security & IG awareness training.'
    ],
    auditEvidenceProduced: 'Updated Risk/SoA baseline, Internal Audit Report, signed Management Review Minutes, and 100% LMS training export—keeping you ready for Year 1/2 Surveillance and Year 3 Recertification.'
  }
];

export const DOCS_TO_OPA_SWITCHES: DocsToOpaClaimSwitch[] = [
  {
    id: 'ismsCertified',
    label: 'ISO/IEC 27001:2022 ISMS Certificate Current',
    sourceDocOrProcess: 'Accredited Certification Audit & Clause 9.3 Management Review',
    clauseRef: 'Clauses 9–10 · DEA s71',
    feedLayer: 'Design-Time Governance Baseline',
    jsonPath: 'input.enclave.isms_27001_certified',
    defaultActive: true,
    failureImpact: 'Blocks DEA Section 71 public authority data mounting when platform policy mandates active certification.'
  },
  {
    id: 'climateResilienceChecked',
    label: 'Amendment 1:2024 Climate & Hosting Resilience Assessed',
    sourceDocOrProcess: 'Clause 4.1 Context Register & Cloud Multi-AZ Continuity Plan',
    clauseRef: 'Clause 4.1 (Amd 1:2024) · A.5.30',
    feedLayer: 'Design-Time Governance Baseline',
    jsonPath: 'input.enclave.climate_resilience_assessed',
    defaultActive: true,
    failureImpact: 'Governance baseline check flags incomplete Clause 4.1 context & regional availability resilience verification.'
  },
  {
    id: 'soaApproved',
    label: 'Clause 6.1.3(d) Statement of Applicability Signed',
    sourceDocOrProcess: 'Executive Sponsor & ISMS Lead Annual SoA Sign-Off (93 Controls)',
    clauseRef: 'Clause 6.1.3(d) · D-001',
    feedLayer: 'Design-Time Governance Baseline',
    jsonPath: 'input.governance.soa_approved_current',
    defaultActive: true,
    failureImpact: 'Policy bundle flagged unverified; admission fails closed until Annex A control justifications are signed.'
  },
  {
    id: 'kpiObjectivesMet',
    label: 'Clause 6.2 Security Objectives & Patching KPIs Within Target',
    sourceDocOrProcess: 'Quarterly Clause 6.2 Dashboard (<=14d Critical CVE, 100% MFA)',
    clauseRef: 'Clause 6.2 · Clause 9.1',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.governance.clause62_kpis_within_target',
    defaultActive: true,
    failureImpact: 'Production cluster admission raises compliance hold until critical patching SLA or MFA KPI breaches clear.'
  },
  {
    id: 'competenceVerified',
    label: 'Clause 7.2 Staff & Control Owner Competence Logs Current',
    sourceDocOrProcess: 'HR Role Competence Matrix, Certifications & Clause 7.2 Records',
    clauseRef: 'Clause 7.2 · Annex A.6.1',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.governance.clause72_competence_verified',
    defaultActive: true,
    failureImpact: 'Privileged admin or airlock reviewer roles fail identity claim validation without verified Clause 7.2 competence.'
  },
  {
    id: 'deaS71Active',
    label: 'UKSA RAP Processor & Project Accreditation Valid',
    sourceDocOrProcess: 'DEA 2017 Research Accreditation Panel Register & SAQ V3.1 Evidence',
    clauseRef: 'DEA 2017 s70–s71 · Annex A.5.31',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.project.dea_rap_accreditation_valid',
    defaultActive: true,
    failureImpact: 'Pod mount denied for DEA-gated linked datasets under Section 71 statutory rules.'
  },
  {
    id: 'igTrainingValid',
    label: 'Researcher Vetting, Annual IG Training & NDA Unexpired',
    sourceDocOrProcess: 'HR Screening + LMS Training Expiry + Signed DAA Workflow',
    clauseRef: 'Annex A.6.1, A.6.3, A.6.6',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.researcher.ig_and_vetting_valid',
    defaultActive: true,
    failureImpact: 'Safe Person gate fails immediately at identity gateway before workspace provisioning.'
  },
  {
    id: 'harborCveClean',
    label: 'Zero-Egress Network & Signed Container CVE Scan Passed',
    sourceDocOrProcess: 'CI Schema Validation + Registry Trivy Vulnerability Gate',
    clauseRef: 'Annex A.8.8, A.8.20–A.8.22, A.8.32',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.enclave.cve_and_egress_verified',
    defaultActive: true,
    failureImpact: 'Container spawn rejected; vulnerable or egress-open image quarantined.'
  },
  {
    id: 'airlockDualSignoff',
    label: 'SDC Output Thresholds & Dual Airlock Review Recorded',
    sourceDocOrProcess: 'Quantitative SDC Check (k >= 10, <= 80%) + Independent Reviewer Co-Sign',
    clauseRef: 'Annex A.8.12, A.8.15 · D-005',
    feedLayer: 'Runtime Process Attestation',
    jsonPath: 'input.export.sdc_and_dual_signoff_complete',
    defaultActive: true,
    failureImpact: 'Airlock egress stays fail-closed (`egress_permitted = false`); file cannot leave the enclave.'
  }
];

export const ISMS_DEA_BUILDUP_ARTEFACTS: IsmsBuildupArtefact[] = [
  // --- 1. Mandatory Clauses 4–10 Audit Artifacts ---
  {
    id: 'isms-scope-statement',
    title: 'ISMS Scope Statement (incl. Context & Amendment 1:2024 Climate Check)',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 4.3 (with 4.1–4.2 & Amd 1:2024)',
    practicalFormat: '1–2 page signed document detailing boundaries, systems, locations & exclusions',
    ownerRole: 'Executive Sponsor & ISMS Lead',
    reviewCadence: 'Annual & upon cloud/architecture change',
    stageOneCritical: true,
    purpose:
      'Defines the exact logical, cloud, physical, and organizational boundaries covered by the ISMS (data ingestion pipelines, sovereign VPCs, VDI gateways, airlock reviewers, and support teams) plus interested parties and climate resilience.',
    platformPreparationRequirement:
      'Any safe & secure data intelligence platform must draw a crisp boundary showing which cloud accounts, Kubernetes clusters, identity providers, and human support desks sit inside the certified ISMS—and clearly justify external exclusions such as researcher laptops accessing pixel-only VDI.',
    optionalOpaRuleImpact:
      'Establishes which infrastructure namespaces and cloud accounts fall inside the governed enforcement perimeter (Decision Gate D-001).',
    optionalRuntimeClaim: 'input.enclave.scope_boundary == "uk_sovereign_tre_prod" & climate_resilience_assessed',
    optionalRegoPreview: `package tre.isms.scope\n\nvalid_scope_boundary {\n  input.enclave.scope_boundary == "uk_sovereign_tre_prod"\n  input.enclave.climate_resilience_assessed == true\n}`,
    templateMarkdown: `# ISMS Scope Statement (ISO/IEC 27001:2022 Clause 4.3)

## 1. Organizational Context & Interested Parties (Clauses 4.1–4.2)
- Regulators & Statutory Stakeholders: ICO, UKSA RAP, HRA/CAG, Hosting NHS Trusts, Accredited Researchers.
- Amendment 1:2024 Climate Change Determination: Cloud hosting relies on multi-AZ UK regions with power/cooling SLAs; extreme-weather continuity tested under ICT Continuity (A.5.30).

## 2. In-Scope Systems, Locations & Functions (Clause 4.3)
- Sovereign UK Cloud VPC, analytical compute enclaves, identity provider (SSO/FIDO2 MFA), airlock egress workflows, and engineering/IG support teams.
- Exclusions: University and researcher corporate laptops (untrusted external endpoints restricted to zero-download pixel VDI streams).`
  },
  {
    id: 'isms-security-policy',
    title: 'Information Security Policy & Governance Accountability Charter',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 5.2 (with 5.1 & 5.3)',
    practicalFormat: 'Executive-signed policy statement accessible to all staff & relevant external parties',
    ownerRole: 'Executive Sponsor (Top Management)',
    reviewCadence: 'Annual executive re-approval',
    stageOneCritical: true,
    purpose:
      'Concise top-level policy signed by Top Management setting security objectives, statutory commitment, and clear separation of duties between platform admins, policy authors, and output reviewers.',
    platformPreparationRequirement:
      'Communicate the signed policy to every platform engineer, analyst, and data steward, and bind role separation in daily operations (engineers cannot silently approve their own clinical data access or statistical exports).',
    optionalOpaRuleImpact:
      'Anchors two-person separation rules preventing self-approval across access requests and airlock egress.',
    optionalRuntimeClaim: 'input.export.submitted_by != input.export.approved_by',
    optionalRegoPreview: `two_person_separation {\n  input.export.submitted_by != input.export.approved_by\n  input.export.approved_by_role == "accredited_sdc_officer"\n}`,
    templateMarkdown: `# Information Security Policy (ISO/IEC 27001:2022 Clause 5.2)

## 1. Leadership Commitment
Signed by Top Management to protect confidentiality, integrity, and availability of sensitive public and clinical data.

## 2. Role Accountability & Segregation (Clause 5.3)
- Executive Sponsor: Owns risk appetite and chairs Management Reviews.
- ISMS Lead: Owns Risk Register, SoA, and Certification Body liaison.
- Control Owners: Operate daily technical, HR, legal, and physical controls.`
  },
  {
    id: 'isms-security-objectives',
    title: 'Information Security Objectives & Measurable KPI Register',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 6.2',
    practicalFormat: 'KPI dashboard or register with numeric targets, owners & measurement frequency',
    ownerRole: 'ISMS Lead & Control Owners',
    reviewCadence: 'Evaluated quarterly · Reported at Management Review',
    stageOneCritical: true,
    purpose:
      'Establishes 3–5 concrete, measurable security objectives demonstrating that the ISMS drives real operational security outcomes rather than passive compliance paperwork.',
    platformPreparationRequirement:
      'Track concrete platform KPIs across engineering and governance: e.g., 100% critical CVE remediation within 14 days, 100% FIDO2 MFA coverage, 100% annual researcher IG training completion, and zero unreviewed airlock exports.',
    optionalOpaRuleImpact:
      'Feeds quarterly KPI health flags (`clause62_kpis_within_target`) into cluster admission gates so SLA breaches pause high-risk workloads.',
    optionalRuntimeClaim: 'input.governance.clause62_kpis_within_target == true',
    optionalRegoPreview: `objectives_healthy {\n  input.governance.clause62_kpis_within_target == true\n}`,
    templateMarkdown: `# Information Security Objectives Register (ISO/IEC 27001:2022 Clause 6.2)

| Objective ID | KPI Metric | Target | Owner | Frequency |
|---|---|---|---|---|
| OBJ-01 | Critical CVE remediation SLA | <= 14 days (100%) | Platform SRE Lead | Monthly |
| OBJ-02 | Onboarding & annual IG training completion | 100% before access | IG Officer / HR | Monthly |
| OBJ-03 | Privileged & researcher FIDO2 MFA coverage | 100% enforced | IAM Control Owner | Quarterly |
| OBJ-04 | Airlock output independent dual review rate | 100% of releases | Lead SDC Officer | Per Release |`
  },
  {
    id: 'isms-competence-evidence',
    title: 'Evidence of Competence, Role Qualifications & Training Logs',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 7.2 (with Annex A.6.1 & A.6.3)',
    practicalFormat: 'Role descriptions, CVs/certifications, security & IG training completion logs',
    ownerRole: 'HR / People Lead & ISMS Lead',
    reviewCadence: 'Upon hire, role change & annually',
    stageOneCritical: true,
    purpose:
      'Proves that personnel executing security-critical platform duties (SREs, DBAs, Internal Auditors, SDC Output Checkers, IG Leads) possess verified education, training, or experience.',
    platformPreparationRequirement:
      'Maintain an indexed folder linking each control role (SRE, Internal Auditor, Clinical Safety Officer, SDC Reviewer) to job descriptions, relevant certifications (e.g., ISO Lead Auditor, ONS Safe Researcher, CSO training), and dated LMS completion exports.',
    optionalOpaRuleImpact:
      'Synchronizes verified competence and Safe Researcher training dates into identity claims checked at workspace launch and airlock sign-off.',
    optionalRuntimeClaim: 'input.governance.clause72_competence_verified == true',
    optionalRegoPreview: `role_competence_verified {\n  input.governance.clause72_competence_verified == true\n}`,
    templateMarkdown: `# Evidence of Competence & Role Qualifications (ISO/IEC 27001:2022 Clause 7.2)

- Control Owners & SREs: Role specs + cloud security certifications + annual secure-coding refresher logs.
- Independent Internal Auditor: ISO/IEC 27001 Internal/Lead Auditor qualification + signed independence declaration.
- Airlock SDC Officers & Researchers: Verified ONS/DARE Safe Researcher Training + annual NHS IG completion.`
  },
  {
    id: 'isms-operational-records',
    title: 'Operational Control & Risk Treatment Evidence Records',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clauses 8.1–8.3',
    practicalFormat: 'Change tickets, access review exports, pen-test reports & backup restore logs',
    ownerRole: 'Control Owners (Engineering, IT, IG, HR)',
    reviewCadence: 'Continuous collection (minimum 60–90 days pre-Stage 2)',
    stageOneCritical: true,
    purpose:
      'Provides timestamped proof that planned operational controls and Risk Treatment Plan actions run reliably in daily production.',
    platformPreparationRequirement:
      'Organize an Evidence Repository folder tree indexed by Clauses 4–10 and Annex A IDs storing PR approvals, quarterly User Access Review exports, CREST penetration-test remediation reports, vendor SOC 2 reviews, and sandbox backup restore logs.',
    optionalOpaRuleImpact:
      'Automated CI tests and immutable decision logs supply continuous machine-verifiable Clause 8 records.',
    optionalRuntimeClaim: 'input.enclave.cve_and_egress_verified == true',
    optionalRegoPreview: `operational_controls_active {\n  input.enclave.cve_and_egress_verified == true\n}`,
    templateMarkdown: `# Operational Evidence Repository Index (Clauses 8.1–8.3)

- /01-Access-Reviews/: Quarterly privileged & researcher UAR exports with manager sign-off
- /02-Change-Logs/: Peer-reviewed Git PR history & production deployment tickets
- /03-Vuln-PenTest/: Monthly Trivy/scanner remediation exports + annual external pen-test report
- /04-Backup-Continuity/: Quarterly isolated sandbox PITR restore verification logs`
  },
  {
    id: 'isms-monitoring-results',
    title: 'Monitoring, Measurement, Analysis & Evaluation Records',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 9.1',
    practicalFormat: 'Monthly/quarterly security metric packs & SIEM log-monitoring review records',
    ownerRole: 'SecOps Lead & ISMS Lead',
    reviewCadence: 'Monthly triage · Quarterly executive reporting',
    stageOneCritical: true,
    purpose:
      'Documents what is measured, how measurements are validated, and who reviewed log alerts and security telemetry to confirm controls remain effective.',
    platformPreparationRequirement:
      'Record monthly evidence showing someone actually reviewed SIEM alerts, access anomalies, failed login spikes, airlock blocks, and backup statuses—collecting logs without documented review fails Stage 2.',
    optionalOpaRuleImpact:
      'Centralized WORM decision logs stream every authorization allow/deny metric into the monitored Clause 9.1 SIEM telemetry pipeline.',
    optionalRuntimeClaim: 'input.audit.worm_sink_healthy == true',
    optionalRegoPreview: `monitoring_sink_healthy {\n  input.audit.worm_sink_healthy == true\n}`,
    templateMarkdown: `# Monitoring & Measurement Results Log (ISO/IEC 27001:2022 Clause 9.1)

- Metric Set: MFA enforcement rate, critical patch MTTR, SIEM alert review SLA, backup success rate.
- Evidence: Monthly signed SecOps review ticket confirming SIEM alert queues and audit logs were inspected.`
  },
  {
    id: 'isms-internal-audit-program',
    title: 'Internal Audit Programme, Audit Report & Independence Proof',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 9.2',
    practicalFormat: 'Annual audit schedule, Clauses 4–10 checklists, findings report & auditor independence proof',
    ownerRole: 'Independent Internal Auditor',
    reviewCadence: 'Pre-Stage 1 mandatory · Annual surveillance cycle',
    stageOneCritical: true,
    purpose:
      'Demonstrates an impartial internal assessment evaluating every mandatory Clause (4–10) and sampled Annex A controls against live operational evidence.',
    platformPreparationRequirement:
      'Engage an independent auditor (never a team member auditing their own engineering or IG work) to run a full gap check and issue a formal signed Internal Audit Report at least 3–4 weeks before Stage 1.',
    optionalOpaRuleImpact:
      'Independent auditors verify that runtime policy bundles match the signed Statement of Applicability and documented risk tolerances.',
    optionalRuntimeClaim: 'input.governance.internal_audit_current == true',
    optionalRegoPreview: `audit_baseline_valid {\n  input.governance.internal_audit_current == true\n}`,
    templateMarkdown: `# Internal Audit Report (ISO/IEC 27001:2022 Clause 9.2)

- Scope: Clauses 4–10 & sampled Annex A.5–A.8 controls across the Sovereign Data Platform.
- Auditor Independence Statement: Confirms zero direct operational authorship of audited controls.
- Summary of Major NCs (0 remaining), Minor NCs, and Opportunities for Improvement.`
  },
  {
    id: 'isms-mgmt-review-minutes',
    title: 'Management Review Agenda, Slide Deck & Signed Minutes',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 9.3',
    practicalFormat: 'Structured agenda, executive deck & formally signed minutes covering Clause 9.3 inputs/outputs',
    ownerRole: 'Executive Sponsor & ISMS Lead',
    reviewCadence: 'Pre-Stage 1 mandatory · Annually (or bi-annually)',
    stageOneCritical: true,
    purpose:
      'Proves Top Management reviewed audit findings, risk changes, KPI performance, supplier status, and resource needs—and recorded concrete improvement decisions.',
    platformPreparationRequirement:
      'Ensure your Management Review minutes explicitly address every bullet of ISO 27001 Clause 9.3(a)–(g) (feedback, risks, nonconformities, audit results, suppliers, resources, improvements) with Executive Sponsor sign-off.',
    optionalOpaRuleImpact:
      'Approves changes to quantitative risk limits or policy exceptions prior to updating production bundles.',
    optionalRuntimeClaim: 'input.governance.mgmt_review_signed_current == true',
    optionalRegoPreview: `mgmt_review_valid {\n  input.governance.mgmt_review_signed_current == true\n}`,
    templateMarkdown: `# Management Review Minutes (ISO/IEC 27001:2022 Clause 9.3)

## Required Inputs Reviewed:
1. Actions from prior reviews & changes in internal/external issues (incl. Amendment 1:2024 climate context)
2. Clause 6.2 KPI trends, Clause 9.2 Internal Audit results & Clause 10.2 CAPA status
3. Supplier performance (cloud host, IdP, AI vendors) & Risk Assessment / RTP changes
## Outputs & Decisions Signed by Executive Sponsor:`
  },
  {
    id: 'isms-capa-log',
    title: 'Nonconformity & Corrective Action Log (CAPA Register)',
    category: 'Mandatory Clauses 4–10',
    clauseRef: 'Clause 10.2',
    practicalFormat: 'Register tracking incidents/audit findings, root causes, fixes & effectiveness verification',
    ownerRole: 'ISMS Lead & Assigned Control Owners',
    reviewCadence: 'Updated continuously upon incident or audit finding',
    stageOneCritical: true,
    purpose:
      'Tracks every security incident, policy breach, and internal/external audit nonconformity through root-cause analysis (RCA), remediation, and post-fix effectiveness verification.',
    platformPreparationRequirement:
      'Do not hide findings—auditors expect a living CAPA log showing honest self-identification of gaps, root-cause fixes (not just quick patches), and verification dates proving issues did not recur.',
    optionalOpaRuleImpact:
      'Root-cause fixes in software/governance workflows can translate into new CI regression tests or SHACL checks so the class of nonconformity cannot return.',
    optionalRuntimeClaim: 'input.governance.major_nonconformities_open == 0',
    optionalRegoPreview: `no_open_major_ncs {\n  input.governance.major_nonconformities_open == 0\n}`,
    templateMarkdown: `# Nonconformity & Corrective Action Log (ISO/IEC 27001:2022 Clause 10.2)

| CAPA ID | Source (Audit / Incident) | Root Cause Analysis | Corrective Action & Owner | Effectiveness Verified Date |
|---|---|---|---|---|
| CAPA-01 | Internal Audit 9.2 | Delayed JML revocation on contractor exit | Automated HR-to-IdP offboarding webhook (IAM Lead) | 2026-09-15 |`
  },

  // --- 2. Risk & Statement of Applicability ---
  {
    id: 'isms-risk-methodology-rtp',
    title: 'Risk Assessment Methodology, Risk Register & Risk Treatment Plan (RTP)',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'Clause 6.1.2 & Clause 6.1.3(a)–(c)',
    practicalFormat: 'Methodology spec + live Risk Register (inherent/residual CIA scores) + RTP action tracker',
    ownerRole: 'ISMS Lead & Information Asset Owners',
    reviewCadence: 'Annual & upon major platform/data change',
    stageOneCritical: true,
    purpose:
      'Defines repeatable risk scoring criteria (Likelihood x Impact across Confidentiality, Integrity, Availability), sets numeric acceptable risk thresholds, scores inherent vs. residual risk, and tracks treatment tasks with owners and deadlines.',
    platformPreparationRequirement:
      'Every high-sensitivity platform hazard—unauthorized WAN egress, small-cell table re-identification, compromised third-party packages, AI prompt leakage, lost backups—must appear in the Risk Register mapped to specific Annex A controls and RTP target dates.',
    optionalOpaRuleImpact:
      'Justifies exact numeric guardrails (e.g., k >= 10, dominance <= 80%, short agent token TTLs) enforced in runtime policy.',
    optionalRuntimeClaim: 'input.dataset.min_cell_count >= 10 & input.agent.token_ttl_seconds <= 7200',
    optionalRegoPreview: `risk_treatment_thresholds {\n  input.dataset.min_cell_count >= 10\n  input.dataset.max_dominance_ratio <= 0.80\n}`,
    templateMarkdown: `# Risk Assessment & Risk Treatment Plan (ISO/IEC 27001:2022 Clauses 6.1.2–6.1.3)

| Risk ID | Threat Scenario | Inherent Score (L×I) | Treatment | Mapped Annex A Control | Residual Score | Owner & Due |
|---|---|---|---|---|---|---|
| R-01 | Outbound data exfiltration from enclave | High (16) | Mitigate | A.8.20–A.8.22 Zero-Egress VPC + VDI | Low (3) | SRE Lead (Done) |
| R-02 | Small-cell disclosure in published table | Medium (12) | Mitigate | A.8.12 Quantitative SDC + Dual Airlock | Low (2) | SDC Lead (Done) |`
  },
  {
    id: 'isms-soa-register',
    title: 'Statement of Applicability (SoA) across all 93 Annex A Controls',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'Clause 6.1.3(d)',
    practicalFormat: 'Master workbook mapping all 93 Annex A.5–A.8 controls, exclusions, status & evidence links',
    ownerRole: 'ISMS Lead & Executive Sponsor',
    reviewCadence: 'Living register · Signed quarterly/annually',
    stageOneCritical: true,
    purpose:
      'The single most scrutinized ISO 27001 audit document: lists every control in A.5 Organizational (37), A.6 People (8), A.7 Physical (14), and A.8 Technological (34), stating whether applicable, why included/excluded, implementation status, and evidence location.',
    platformPreparationRequirement:
      'Do not delete inapplicable controls (e.g., physical datacenter wiring if cloud-hosted)—retain all 93 rows, mark "Inherited from Cloud Provider" or "Excluded" with clear rationale, and link active controls directly to platform evidence paths.',
    optionalOpaRuleImpact:
      'Treats signed SoA approval currency (`soa_approved_current == true`) as a mandatory release-gate prerequisite.',
    optionalRuntimeClaim: 'input.governance.soa_approved_current & input.governance.soa_revision_id',
    optionalRegoPreview: `soa_governance_verified {\n  input.governance.soa_approved_current == true\n  startswith(input.governance.soa_revision_id, "SOA-2026-")\n}`,
    templateMarkdown: `# Statement of Applicability (Clause 6.1.3(d)) — 93 Controls

| Control ID | Title (ISO/IEC 27001:2022) | Applicable | Justification & Evidence Location |
|---|---|---|---|
| A.5.15 | Access Control | Yes | SSO + FIDO2 MFA + RBAC; evidence in /01-Access-Reviews/ |
| A.6.3 | Security Awareness & Training | Yes | Annual IG & Safe Researcher training; evidence in LMS export |
| A.7.1 | Physical Security Perimeters | Inherited / Yes | Cloud DC Tier-3 SOC 2 / ISO 27001 cert + zero-download VDI |
| A.8.12 | Data Leakage Prevention | Yes | Quantitative SDC Airlock + VDI clipboard block |
| A.8.24 | Use of Cryptography | Yes | KMS AES-256-GCM at rest + TLS 1.3 in transit |`
  },
  {
    id: 'isms-asset-supplier-register',
    title: 'Information Asset, Data Classification & Cloud Supplier Register',
    category: 'Risk & Statement of Applicability',
    clauseRef: 'Annex A.5.9–A.5.12 & A.5.19–A.5.23',
    practicalFormat: 'Asset inventory (datasets, KMS keys, repos, VMs) + vendor assurance tracker',
    ownerRole: 'Information Asset Owners & Procurement Lead',
    reviewCadence: 'Updated on dataset or vendor onboarding',
    purpose:
      'Catalogues sensitive health/population datasets by sensitivity tier alongside infrastructure sub-processors, DTAC/DSPT checks, and annual vendor SOC 2 / ISO 27001 reviews.',
    platformPreparationRequirement:
      'Auditors verify that every hosted dataset has a named owner and sensitivity tier, and that cloud/LLM/IdP suppliers undergo documented security due diligence before handling platform workloads.',
    optionalOpaRuleImpact:
      'Drives dataset-tier matching rules preventing Tier 3 cohorts from attaching to workspaces lacking lawful basis or ZDR supplier status.',
    optionalRuntimeClaim: 'input.dataset.tier & input.dataset.zdr_baa_verified',
    optionalRegoPreview: `tier3_lawful_access {\n  input.dataset.tier == "Tier3_Identifiable"\n  input.project.s251_cag_active == true\n}`,
    templateMarkdown: `# Information Asset & Supplier Register (Annex A.5.9 & A.5.19)

- Tier 1/2/3 Cohort Inventory: Dataset ID | Sensitivity Tier | Lawful Basis | IAO Owner | Retention Schedule
- Cloud & Tooling Vendors: UK Sovereign Cloud Host (ISO 27001 + DSPT), Identity Provider, Private LLM (ZDR Verified)`
  },

  // --- 3. Operational SOPs & Annex A ---
  {
    id: 'sop-access-vetting-training',
    title: 'SOP-01: Access Control, Background Screening & JML Lifecycle',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.5.15–A.5.18 & Annex A.6.1, A.6.3, A.6.6',
    practicalFormat: 'Standard Operating Procedure + HR/IAM provisioning & quarterly UAR checklists',
    ownerRole: 'IAM Lead & HR/IG Officer',
    reviewCadence: 'Annual SOP review · Quarterly access reviews',
    purpose:
      'Defines end-to-end human onboarding and offboarding: pre-employment screening, annual IG/security awareness training, signed NDAs, SSO + MFA enforcement, and prompt revocation on role change or departure.',
    platformPreparationRequirement:
      'Essential for any secure data platform even without OPA: enforce single sign-on with phishing-resistant MFA, track JML revocation tickets, and retain quarterly privileged user access review sign-offs.',
    optionalOpaRuleImpact:
      'Emits live OIDC identity claims (`ig_and_vetting_valid`, `mfa_fido2_verified`) evaluated before workspace launch.',
    optionalRuntimeClaim: 'input.researcher.ig_and_vetting_valid & input.researcher.mfa_fido2_verified',
    optionalRegoPreview: `safe_person_admitted {\n  input.researcher.ig_and_vetting_valid == true\n  input.researcher.mfa_fido2_verified == true\n}`,
    templateMarkdown: `# SOP-01: Access Control, Vetting & JML Workflow (Annex A.5.15–18, A.6)

1. Joiner: HR screening (A.6.1) + signed NDA (A.6.6) + mandatory IG training (A.6.3) prior to SSO provisioning.
2. Mover / Quarterly Review: Control owner reviews role permissions every 90 days.
3. Leaver: Revoke SSO sessions and study permissions within SLA upon exit notice.`
  },
  {
    id: 'sop-gitops-change-cve',
    title: 'SOP-02: Secure Development, Configuration & Vulnerability Management',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.8.8, A.8.9, A.8.28 & A.8.32',
    practicalFormat: 'SDLC/Change SOP + CI/CD branch protection, patching SLAs & hardening baselines',
    ownerRole: 'Platform Security Lead & Engineering Manager',
    reviewCadence: 'Enforced on every change · Monthly SLA review',
    purpose:
      'Requires peer-reviewed pull requests, baseline hardening benchmarks (A.8.9), secure coding checks (A.8.28), vulnerability scanning remediation SLAs (A.8.8), and rollback procedures (A.8.32).',
    platformPreparationRequirement:
      'Certification auditors pull random production changes and inspect Jira/GitHub tickets for independent peer approval, test results, and proof that critical CVEs are patched within defined SLA windows.',
    optionalOpaRuleImpact:
      'Uses signed CI/Trivy attestations (`cve_and_egress_verified`) in Kubernetes admission controllers.',
    optionalRuntimeClaim: 'input.enclave.cve_and_egress_verified & input.pod.run_as_non_root',
    optionalRegoPreview: `hardened_pod_admitted {\n  input.enclave.cve_and_egress_verified == true\n  input.pod.run_as_non_root == true\n}`,
    templateMarkdown: `# SOP-02: Secure Change & Vulnerability Management (A.8.8, A.8.9, A.8.28, A.8.32)

1. Change Control: Mandatory PR peer review + automated test pass before production merge.
2. Vulnerability SLAs: Critical CVEs patched <= 14 days; High CVEs <= 30 days.
3. Configuration Baselines: CIS hardened container/OS builds with non-root execution.`
  },
  {
    id: 'sop-incident-continuity-crypto',
    title: 'SOP-03: Incident Response, Cryptography, Backups & Continuity',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.5.24–A.5.30, A.8.13, A.8.15–A.8.16 & A.8.24',
    practicalFormat: 'Incident playbook, crypto key policy & semi-annual PITR restore/tabletop logs',
    ownerRole: 'SecOps Lead & Disaster Recovery Owner',
    reviewCadence: 'Quarterly PITR drill · Semi-annual tabletop',
    purpose:
      'Establishes severity SLAs, ICO/DHSC 72-hour breach escalation paths, KMS AES-256 key rotation, immutable logging, and isolated backup restoration verification.',
    platformPreparationRequirement:
      'A data intelligence platform must prove backups actually restore cleanly (not just that snapshots run) and run at least one documented tabletop incident drill before certification.',
    optionalOpaRuleImpact:
      'Rejects unencrypted persistent volumes and logs emergency break-glass invocations synchronously to SIEM.',
    optionalRuntimeClaim: 'input.storage.aes256_kms_encrypted & input.session.siem_audit_active',
    optionalRegoPreview: `storage_crypto_compliant {\n  input.storage.aes256_kms_encrypted == true\n  input.session.siem_audit_active == true\n}`,
    templateMarkdown: `# SOP-03: Incident Response, Crypto & Continuity (A.5.24–30, A.8.13, A.8.24)

1. Incident Triage: Isolate impacted workspace, escalate break-glass or breach risk to SIRO & DPO within SLA.
2. Cryptography: AES-256 at rest (KMS), TLS 1.3 in transit, annual key rotation.
3. Continuity: Immutable encrypted backups verified via semi-annual isolated sandbox restore drills.`
  },
  {
    id: 'sop-airlock-sdc',
    title: 'SOP-04: Safe Outputs Airlock & Statistical Disclosure Control (SDC)',
    category: 'Operational SOPs & Annex A',
    clauseRef: 'Annex A.8.12 · SATRE § 4–5 · Decision Gate D-005',
    practicalFormat: 'Airlock checking SOP + quantitative SDC rules + auditable dual-signoff manifest',
    ownerRole: 'Lead Statistical Disclosure Control Officer',
    reviewCadence: 'Executed per export request · Reviewed bi-annually',
    purpose:
      'Governs procedural approval hand-offs for every table, plot, or model output leaving the enclave—requiring small-cell suppression (k >= 10), dominance checks (<= 80%), differencing review, and two-person independent sign-off.',
    platformPreparationRequirement:
      'Whether enforced manually or via tooling, output releases must be strictly auditable: preserve the submitted candidate, disclosure checks performed, both independent reviewer identities, and release hash.',
    optionalOpaRuleImpact:
      'Compiles quantitative thresholds and dual-reviewer sign-off flags into fail-closed `egress_permitted` release gates.',
    optionalRuntimeClaim: 'input.export.sdc_and_dual_signoff_complete & input.dataset.min_cell_count >= 10',
    optionalRegoPreview: `egress_permitted {\n  input.export.sdc_and_dual_signoff_complete == true\n  input.dataset.min_cell_count >= 10\n}`,
    templateMarkdown: `# SOP-04: Safe Outputs Airlock & Procedural Hand-offs (Annex A.8.12)

1. Submission Logged: Researcher submits output + study context to quarantine airlock.
2. SDC Evaluation: Verify k >= 10 small-cell masking, dominance <= 80%, and prior-release differencing risk.
3. Independent Approval Hand-off & Audit Record: Two accredited officers sign release manifest stored immutably.`
  },

  // --- 4. DEA 2017 Accreditation Dossier ---
  {
    id: 'dea-s71-tre-application',
    title: 'DEA 2017 Section 71 Processor Dossier & ISO 27001 Evidence Alignment',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 Part 5 Ch. 5 (s70–71) & UKSA TRE SOP V1.4',
    practicalFormat: 'UKSA RAP processor submission + ISO/IEC 27001 scope & live operational evidence pack',
    ownerRole: 'TRE Director & Compliance Lead',
    reviewCadence: 'UKSA accreditation cycle · Annual ISO surveillance',
    purpose:
      'Prepares the processor application for the UKSA Research Accreditation Panel (RAP). Importantly, while UKSA benchmarks processor security against ISO/IEC 27001 controls (and active certification stands an organization in strong stead), ISO 27001 is NOT a blanket waiver—applicants must still pass UKSA’s evidence-based security and data capability assessment.',
    platformPreparationRequirement:
      'Ensure your ISO/IEC 27001 scope explicitly matches the TRE processing boundary, document Section 67 criminal liability safeguards, and compile live operational proof showing policies are enforced—not merely written.',
    optionalOpaRuleImpact:
      'Binds verified UKSA Processor accreditation (`dea_rap_accreditation_valid`) alongside ISO 27001 certification status into dataset mount controls.',
    optionalRuntimeClaim: 'input.project.dea_rap_accreditation_valid & input.enclave.isms_27001_certified',
    optionalRegoPreview: `dea_processor_mount_allowed {\n  input.enclave.isms_27001_certified == true\n  input.project.dea_rap_accreditation_valid == true\n}`,
    templateMarkdown: `# DEA 2017 Section 71 Accredited Processor Dossier (UKSA TRE SOP V1.4)

- Statutory Basis: Digital Economy Act 2017 Part 5 Ch. 5 & UKSA Research Code of Practice.
- ISO/IEC 27001 Role: Security controls benchmarked to ISO/IEC 27001; active UKAS/ANAB certificate attached alongside direct operational evidence (not treated as an automatic waiver).
- DEA Section 67 Notice: Criminal sanctions for unlawful disclosure acknowledged across all researcher agreements.`
  },
  {
    id: 'dea-saq-v31-evidence',
    title: 'UKSA TRE Self-Assessment Questionnaire (SAQ V3.1) Evidence Mapping',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 s70 Code of Practice · UKSA TRE SAQ V3.1',
    practicalFormat: 'Completed SAQ V3.1 workbook cross-referenced to Clause 8 / Annex A proof',
    ownerRole: 'Information Security Manager & Platform Architect',
    reviewCadence: 'Submitted at accreditation & major platform revisions',
    purpose:
      'Maps every UKSA Five Safes technical and governance question (Safe People vetting, Safe Projects RAP ID, Safe Settings firewall/VDI isolation, Safe Data split-file linkage, Safe Outputs airlock SDC) to verifiable platform evidence.',
    platformPreparationRequirement:
      'UKSA assessors inspect actual configuration proof, access logs, and SDC output procedures—never rely on generic marketing assurances inside SAQ V3.1 responses.',
    optionalOpaRuleImpact:
      'Demonstrates zero divergence between SAQ V3.1 questionnaire answers and live admission/egress policy logic.',
    optionalRuntimeClaim: 'input.governance.soa_approved_current & input.enclave.cve_and_egress_verified',
    optionalRegoPreview: `saq_technical_controls_active {\n  input.enclave.cve_and_egress_verified == true\n  input.governance.soa_approved_current == true\n}`,
    templateMarkdown: `# UKSA TRE Accreditation SAQ V3.1 Evidence Map

- Safe People: SOP-01 vetting + annual IG training + NDA undertakings.
- Safe Settings: Zero-egress VPC (A.8.20–22) + hardened compute + FIDO2 MFA.
- Safe Outputs: SOP-04 Quantitative SDC checks + dual-reviewer airlock logs.`
  },
  {
    id: 'dea-rap-project-registry',
    title: 'UKSA RAP Approved Project, Ethics & Researcher Undertaking Ledger',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 Section 70 & Research Code Criteria',
    practicalFormat: 'Active project & researcher entitlement register with expiry & public-benefit records',
    ownerRole: 'Data Access Committee (DAC) Secretariat',
    reviewCadence: 'Updated on every project approval, amendment & expiry',
    purpose:
      'Maintains authoritative project records linking each approved study to its public-benefit justification, HRA REC / RAP decision date, lawful basis, expiry date, and named Accredited Researchers.',
    platformPreparationRequirement:
      'Access to DEA-shared datasets must halt automatically when ethics or RAP project approval expires; keep the project ledger synchronized with IAM project group entitlements.',
    optionalOpaRuleImpact:
      'Feeds project validity & expiry timestamps into runtime authorization so expired studies cannot mount data.',
    optionalRuntimeClaim: 'input.project.dea_rap_accreditation_valid & input.project.ethics_expiry_ns',
    optionalRegoPreview: `safe_project_active {\n  input.project.dea_rap_accreditation_valid == true\n  input.project.ethics_expiry_ns > time.now_ns()\n}`,
    templateMarkdown: `# DEA 2017 RAP Project & Ethics Entitlement Registry

- Project URI / ID: Registered in Public Data Use Register
- UKSA RAP Approval Ref & Expiry Date: Tracked for automated offboarding
- Authorized Dataset Tier & Lawful Basis: DEA 2017 Part 5 Ch. 5 + UK GDPR Art 6(1)(e)/9(2)(j)`
  }
];
