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
    templateMarkdown: `# ISMS Scope Statement & Organisational Context (ISO/IEC 27001:2022 Clauses 4.1–4.3 + Amd 1:2024)

## Document Control
- **Document ID**: ISMS-DOC-04-01 | **Owner**: Executive Sponsor & ISMS Lead | **Review Cadence**: Annual & upon cloud/architecture change

## 1. Organisational Context Checklist (Clause 4.1 & Amendment 1:2024)
- [ ] **External Issues Mapped**: UK regulatory landscape (UK GDPR / DPA 2018, DEA 2017 Part 5 Ch. 5, NHS Act s251, NHS DSPT), UKSA TRE accreditation expectations, and public cloud concentration risk.
- [ ] **Internal Issues Mapped**: Staffing levels across engineering/IG/SDC teams, shared university/NHS identity federation, budget cycles, and release cadence.
- [ ] **Amendment 1:2024 Climate Change Assessment**: Formally document whether climate change is a relevant issue (e.g., extreme-weather power/cooling stress on UK multi-AZ cloud datacentres, grid resilience SLAs, regional failover tested under A.5.30).
- [ ] **Climate Resilience Decision Recorded**: Signed determination retained for Stage 1 Certification Body inspection.

## 2. Interested Parties & Statutory Obligations (Clause 4.2)
| Interested Party | Statutory / Contractual Expectation | Boundary Controls Mapped |
|---|---|---|
| Patients & Public | Caldicott Principle 8 transparency, zero re-identification, NDOO honoured | Data Use Register, SDC Airlock |
| Hosting NHS Trusts / Custodians | DSPT compliance, s251 / CLDC respect, auditability | Split-file ingress, PROV-O audit trail |
| UKSA RAP / ICO / HRA | DEA s70–71 evidence, UK GDPR Art 28/32, REC conditions | SoA, SAQ V3.1, DPIA |
| Accredited Researchers | Reliable air-gapped compute without unapproved egress channels | Pixel VDI, internal mirrors |

## 3. Formal ISMS Boundary Specification (Clause 4.3)
- [ ] **Physical Locations Listed**: UK sovereign cloud regions/AZs, approved admin operations sites, and zero-download VDI termination zones.
- [ ] **Logical Systems & Workloads Bounded**: VPC subnets, Kubernetes cluster(s), identity provider (SSO/FIDO2 MFA), airlock staging/release tooling, SIEM logging, and GitOps repositories.
- [ ] **Interfaces & Dependencies Documented**: Encrypted Trust ingress feeds, honest-broker linkage APIs, and approved airlock egress channels.
- [ ] **Exclusions Explicitly Justified**: Unmanaged university/corporate researcher laptops excluded on the strict condition they cannot cache data locally (pixel-only VDI only, no clipboard/USB/file download).
- [ ] **Executive Approval Signed**: Date: ________ | Executive Sponsor: ________`
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
    templateMarkdown: `# Information Security Policy & Accountability Charter (ISO/IEC 27001:2022 Clauses 5.1–5.3)

## Document Control
- **Document ID**: ISMS-POL-05-01 | **Owner**: Executive Sponsor (Top Management) | **Review Cadence**: Annual

## 1. Planning Checklist (Clauses 5.1–5.2)
- [ ] **Purpose & Strategy Alignment**: Policy explicitly commits Top Management to confidentiality, integrity, and availability of sensitive population and health data.
- [ ] **Framework for Objectives**: Policy links directly to measurable Clause 6.2 Information Security Objectives.
- [ ] **Legal & Continual Improvement Commitments**: Pledges compliance with UK GDPR, DPA 2018, Caldicott Principles, DEA 2017, and continual ISMS improvement.
- [ ] **Internal Publication**: Policy published in staff handbook/intranet and acknowledged by all platform personnel (Annex A.6.3).
- [ ] **External Availability**: Sanitized public summary or Data Use Charter available to hosting NHS Trusts, Ethics Committees, and auditors.

## 2. Role Accountability & Segregation of Duties (Clause 5.3)
| Role | Core Authority & Accountabilities | Segregation Invariant (Must NOT Do) | Named Assignees |
|---|---|---|---|
| Executive Sponsor | Risk appetite, budget, Clause 9.3 chair | Cannot suppress audit findings | ____________ |
| ISMS Lead / SecOps | Risk Register, SoA, SIEM triage, CB liaison | Cannot sign off their own Internal Audit | ____________ |
| Platform Engineers / SREs | IaC, patching, MFA, backups, enclave build | Cannot self-approve clinical data access or exports | ____________ |
| SDC Airlock Officers | Independent statistical disclosure review | Cannot review/approve their own research outputs | ____________ |
| Independent Internal Auditor | Impartial Clause 9.2 audit across Clauses 4–10 | Zero operational control ownership within scope | ____________ |

## 3. Executive Sign-Off
- [ ] **Executive Sponsor Signature**: ____________ | **Date**: ____________ | **Next Review**: ____________`
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
      'Feeds quarterly KPI health flags (\`clause62_kpis_within_target\`) into cluster admission gates so SLA breaches pause high-risk workloads.',
    optionalRuntimeClaim: 'input.governance.clause62_kpis_within_target == true',
    optionalRegoPreview: `objectives_healthy {\n  input.governance.clause62_kpis_within_target == true\n}`,
    templateMarkdown: `# Information Security Objectives & Measurable KPI Plan (ISO/IEC 27001:2022 Clause 6.2)

## Planning Checklist
- [ ] **Aligned to Security Policy**: Each objective traces directly to Clause 5.2 policy commitments and high-priority risks.
- [ ] **Measurable & Timebound**: Numeric target, data source, calculation method, and deadline defined for every KPI.
- [ ] **What / What Resources / Who / When / How Evaluated**: All five Clause 6.2 sub-elements recorded below.
- [ ] **Communicated & Tracked**: Reviewed quarterly and tabled as mandatory input to Clause 9.3 Management Review.

## Objective & Action Matrix
| ID | Measurable Objective & Target | Data Source / Measurement Method | Required Resources | Owner | Target Date & Cadence |
|---|---|---|---|---|---|
| OBJ-01 | Critical CVE remediation <= 14 days (100% SLA); High <= 30 days | Container & OS vulnerability scanner export | Automated image rebuild pipeline | SRE Lead | Monthly review |
| OBJ-02 | 100% staff & accredited researchers hold current IG training prior to access | LMS export reconciled with IdP active groups | HR / IG automated expiry alerts | IG Officer | Monthly check |
| OBJ-03 | 100% phishing-resistant FIDO2/hardware MFA across admins & researchers | Identity Provider authentication telemetry | Hardware security keys / IdP policy | IAM Owner | Quarterly audit |
| OBJ-04 | 100% of airlock releases pass quantitative SDC + dual-reviewer sign-off | Immutable airlock ticketing & provenance ledger | Independent SDC staffing rota | SDC Lead | Per release / Quarterly |
| OBJ-05 | 100% scheduled PITR backup restore drills pass within RTO/RPO | Isolated DR sandbox restore validation report | Dedicated sandbox test account | SecOps Lead | Semi-annual |`
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
    templateMarkdown: `# Role Competence Matrix & Training Evidence Plan (ISO/IEC 27001:2022 Clause 7.2)

## Planning Checklist
- [ ] **Competence Criteria Defined**: Minimum qualifications, certifications, and security/IG training listed per role.
- [ ] **Pre-Employment Screening Evidence Retained**: BPSS / DBS / reference checks logged prior to privileged access (A.6.1).
- [ ] **Auditor Competence Verified**: Independent Internal Auditor's ISO/IEC 27001 Auditor certificate & CV filed.
- [ ] **Annual Refresher Tracking Active**: Automated calendar/LMS alerts prevent silent expiry across admins and researchers.
- [ ] **Clinical Safety Competence Verified (if Health IT / AI)**: Clinical Safety Officer (CSO) DCB0129/0160 registration logged.

## Competence & Evidence Register
| Role | Required Qualification / Training | Verification Evidence Stored | Refresh Cadence | Status / Owner |
|---|---|---|---|---|
| Platform SRE / Cloud Admin | Cloud security cert / IaC peer-review onboarding | CV + cert PDF in /HR-Competence/SRE/ | Annual | [ ] Pending / SRE Lead |
| ISMS Lead | ISO/IEC 27001 Implementer or equivalent experience | Certificate + role spec in /HR-Competence/ISMS/ | Annual | [ ] Pending / HR Lead |
| Independent Internal Auditor | ISO/IEC 27001 Internal/Lead Auditor cert + independence decl. | Auditor cert + signed COI waiver | Per Audit | [ ] Pending / ISMS Lead |
| SDC Airlock Officers | SDAP / ONS Safe Researcher + SDC Output Checker training | Dated certificate + dual-shadow sign-off | Annual | [ ] Pending / SDC Lead |
| Researchers (Safe People) | UKSA/ONS Accredited Researcher + NHS DSPT/IG module | Accredited token ID + LMS export | Annual | [ ] Pending / DAC Secretariat |`
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
    templateMarkdown: `# Operational Planning, Control & Evidence Repository Index (Clauses 8.1–8.3)

## Pre-Stage 2 Readiness Checklist (Target: 60–90 Days Operational Run History)
- [ ] **Change Control Sample Ready (A.8.32)**: >= 10 peer-reviewed production Git PRs/tickets with pre-merge test output & rollback notes.
- [ ] **User Access Review Completed (A.5.18)**: At least one full signed quarterly UAR across cloud admins, DBAs, and project researchers.
- [ ] **External Penetration Test Closed (A.8.8)**: Independent CREST/CHECK enclave + VDI + airlock pen-test executed; High/Critical findings remediated and re-tested.
- [ ] **Vulnerability Remediation Logs Retained**: Monthly Trivy/OS scanner reports proving CVE patching within SLA.
- [ ] **Outsourced Process Control Documented (Clause 8.1)**: Cloud provider, IdP, and external contractor SLAs & assurance packs filed.

## Indexed Evidence Repository Structure
- \`/01-Clauses-4-to-7/\` — Signed Scope, Policy, Risk Methodology, Risk Register, SoA, Competence & Awareness logs
- \`/02-Access-and-JML/\` — Onboarding vetting, NDAs, FIDO2 MFA reports, quarterly UAR sign-offs, offboarding tickets
- \`/03-Changes-and-Config/\` — Git branch protection exports, approved PRs, CIS hardening baselines
- \`/04-Vuln-PenTest-SIEM/\` — Automated CVE scans, annual pen-test report, re-test clearance, monthly SIEM review tickets
- \`/05-Backup-DR-Suppliers/\` — Isolated PITR restore logs, incident tabletop after-action report, vendor SOC 2 / ISO reviews
- \`/06-DEA-and-Airlock/\` — SAQ V3.1 evidence cross-map, DAC project logs, SDC airlock release tickets`
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
    templateMarkdown: `# Monitoring, Measurement & Evaluation Plan (ISO/IEC 27001:2022 Clause 9.1)

## Clause 9.1 Planning Checklist
- [ ] **What & How Defined**: Every technical & governance metric specifies data source, collection frequency, and evaluation threshold.
- [ ] **Validity Reproducible**: Dashboards & SIEM queries preserve immutable query definitions and timestamps.
- [ ] **Human Review Evidenced**: Monthly/quarterly reviewer sign-off confirms logs were actively analysed (not merely collected).
- [ ] **Anomaly Escalation Linked**: Breached thresholds automatically create Clause 10.2 CAPA or incident tickets.

## Core Platform Measurement Schedule
| Control Area | Metric Monitored | Frequency | Evaluated By | Evidence Stored |
|---|---|---|---|---|
| IAM & Perimeter | Failed FIDO2 logins, impossible travel, break-glass events | Daily alert / Monthly roll-up | SecOps Lead | SIEM triage ticket + monthly pack |
| Patch & Container CVE | Mean time to remediate Critical (<=14d) / High (<=30d) | Weekly scan / Monthly review | SRE Lead | Registry scan export |
| Network Zero-Egress | Dropped WAN egress packet counts & DNS block alerts | Continuous / Monthly summary | Network Owner | Calico/VPC flow summary |
| Airlock & SDC | Approved vs. rejected candidate releases & rule triggers | Per release / Quarterly KPI | SDC Lead | Airlock review ledger |
| Backups & Continuity | Nightly backup completion + semi-annual restore integrity | Daily alert / Semi-annual | DR Owner | Signed restore verification log |`
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
    templateMarkdown: `# Internal Audit Programme & Report Outline (ISO/IEC 27001:2022 Clause 9.2)

## Pre-Stage 1 Independence & Coverage Checklist
- [ ] **3-Year Audit Schedule Set**: Maps annual coverage of all Management Clauses (4–10) and full 93-control Annex A rotation.
- [ ] **Auditor Independence Confirmed**: Auditor has ZERO operational authorship over controls/policies being audited (attach external consultant SOW or cross-team charter).
- [ ] **Documented Interviews & Sampling Recorded**: Evidence artifact IDs/ticket numbers cited per sampled control (no vague "looked OK" notes).
- [ ] **Findings Categorized**: Major Nonconformities (0 allowed pre-Stage 1), Minor Nonconformities, and Opportunities for Improvement (OFIs).
- [ ] **CAPA Feed Complete**: Every nonconformity logged directly into Clause 10.2 CAPA Register with target closure date.

## Clause-by-Clause Audit Checklist Sample
| Clause / Control | Audit Question & Evidence Sampled | Sample Reference / Ticket ID | Verdict (Pass / Minor / Major) |
|---|---|---|---|
| Clauses 4.1–4.3 | Is scope consistent with live VPCs & Amd 1:2024 climate note recorded? | [Cite Doc ID] | [ ] Pass / [ ] NC |
| Clauses 6.1–6.2 | Are Risk Register scores repeatable, SoA 93/93 complete & KPIs tracked? | [Cite Sheet Rev] | [ ] Pass / [ ] NC |
| Clauses 7.2–8.3 | Do change tickets, UARs, pen-tests & restore tests cover >= 60–90 days? | [Cite Folder/Tickets] | [ ] Pass / [ ] NC |
| Annex A.8 Sample | Verify non-root pods, FIDO2 MFA, Trivy gates & airlock dual sign-off in prod | [Cite Config/Logs] | [ ] Pass / [ ] NC |`
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
    templateMarkdown: `# Management Review Agenda & Signed Minutes (ISO/IEC 27001:2022 Clause 9.3)

## Attendees & Quorum Checklist
- **Date**: ____________ | **Chair**: Executive Sponsor (Top Management)
- **Attendees**: ISMS Lead, DPO / Caldicott Representative, Engineering Lead, SDC Lead
- [ ] **Slide Deck / Briefing Pack Archived**: Attached alongside signed minutes.

## Mandatory Clause 9.3 Inputs Checklist
- [ ] **(a) Prior Actions**: Status of every action from previous Management Reviews confirmed.
- [ ] **(b) Context & Interested Parties**: Changes in DEA/NHS rules, Trust onboarding, or Amendment 1:2024 climate assumptions reviewed.
- [ ] **(c) Feedback on Performance**:
  - [ ] Nonconformities & CAPA trends (Clause 10.2)
  - [ ] Clause 9.1 monitoring metrics & Clause 6.2 KPI target attainment
  - [ ] Internal Audit (Clause 9.2) & external Stage 1/2 / UKSA assessment results
- [ ] **(d) Interested Party Feedback**: NHS Trust / researcher / patient panel feedback & FOIA queries.
- [ ] **(e) Risk Assessment & RTP Status**: Top residual risks, accepted risk tolerances, and overdue RTP actions.
- [ ] **(f) Opportunities for Continual Improvement**: Automation, staffing, and tooling investments approved.

## Mandatory Clause 9.3 Outputs (Decisions & Sign-Off)
| Decision ID | Improvement Action / Resource Allocation / Scope Change Approved | Owner | Target Date |
|---|---|---|---|
| MR-ACT-01 | [e.g., Approve budget for Q3 external CREST re-test / automated UAR connector] | [Owner] | [Date] |
- **Executive Sponsor Signature**: ____________ | **Date**: ____________`
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
    templateMarkdown: `# Nonconformity & Corrective Action Plan (ISO/IEC 27001:2022 Clause 10.2)

## CAPA Workflow Checklist (Per Finding)
- [ ] **Immediate Containment Logged**: What stopped immediate impact (e.g., revoked token, quarantined container)?
- [ ] **Root-Cause Analysis (5 Whys) Completed**: Underlying systemic cause identified—not just "human error".
- [ ] **Systemic Corrective Action Assigned**: Change to SOP, automation, CI gate, or training with named owner & due date.
- [ ] **Effectiveness Verification Completed**: Independent re-check after 30+ days confirms the issue did not recur.
- [ ] **Risk Register Updated**: Verify whether the finding alters Risk Assessment likelihood/impact scores.

## CAPA Register Schema
| CAPA ID | Date | Source (Audit / Incident / UAR) | Summary & Containment | Root Cause (RCA) | Systemic Action & Owner | Due Date | Effectiveness Verified (Date & By Whom) |
|---|---|---|---|---|---|---|---|
| CAPA-01 | 2026-08-10 | Internal Audit 9.2 | Contractor account remained active 48h post-exit; revoked manually | Manual HR email notification delay | Automated HR-to-IdP offboarding webhook + daily reconciliation (IAM Lead) | 2026-09-01 | Verified 2026-10-05 (Internal Auditor) |`
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
    templateMarkdown: `# Risk Methodology, Register & Treatment Plan (ISO/IEC 27001:2022 Clauses 6.1.2–6.1.3)

## Planning Checklist
- [ ] **Repeatability Criteria Set**: 1–5 Likelihood x 1–5 Impact scale (Confidentiality, Integrity, Availability) explicitly defined.
- [ ] **Risk Acceptance Threshold Approved**: Top Management approves numeric ceiling (e.g., Residual Risk <= 4 accepted; >= 5 requires RTP).
- [ ] **All Platform Data Flows Scored**: Ingress de-identification, linkage broker, compute enclave, AI/LLM endpoints, VDI, backups & airlock.
- [ ] **Risk Owners Sign Residual Risk**: Every named Risk Owner formally signs acceptance of residual scores.

## Starter Platform Risk & Treatment Register
| Risk ID | Asset / Threat Scenario (CIA) | Inherent (L×I) | Treatment Option | Mapped Annex A Control(s) | Residual (L×I) | Risk Owner & Acceptance Status |
|---|---|---|---|---|---|---|
| R-01 | Outbound exfiltration of microdata via WAN or laptop (C) | 4 × 5 = 20 (Critical) | Mitigate | A.8.20–22 Zero-Egress VPC + Pixel VDI + A.8.12 | 1 × 4 = 4 (Low) | SRE Lead / SIRO — [ ] Signed |
| R-02 | Small-cell re-identification or differencing via exports (C) | 4 × 4 = 16 (High) | Mitigate | A.8.12 Quantitative SDC (k>=10) + Dual Airlock | 1 × 3 = 3 (Low) | SDC Lead — [ ] Signed |
| R-03 | Compromised PyPI/CRAN package or container vulnerability (C/I) | 3 × 5 = 15 (High) | Mitigate | A.8.8, A.8.28 Quarantined Mirror + Trivy Gate | 1 × 3 = 3 (Low) | Platform SecOps — [ ] Signed |
| R-04 | AI coding / LLM agent transmitting PID to public SaaS API (C) | 4 × 5 = 20 (Critical) | Mitigate | A.8.12, A.8.20 In-Enclave vLLM / Zero-WAN block | 1 × 3 = 3 (Low) | AI Governance Lead — [ ] Signed |
| R-05 | Ransomware or accidental corruption of audit/data volumes (I/A) | 3 × 5 = 15 (High) | Mitigate | A.8.13, A.5.30 WORM Backups + Semi-Annual PITR | 1 × 3 = 3 (Low) | DR Owner — [ ] Signed |`
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
      'Treats signed SoA approval currency (\`soa_approved_current == true\`) as a mandatory release-gate prerequisite.',
    optionalRuntimeClaim: 'input.governance.soa_approved_current & input.governance.soa_revision_id',
    optionalRegoPreview: `soa_governance_verified {\n  input.governance.soa_approved_current == true\n  startswith(input.governance.soa_revision_id, "SOA-2026-")\n}`,
    templateMarkdown: `# Statement of Applicability Checklist (ISO/IEC 27001:2022 Clause 6.1.3(d) — All 93 Controls)

## Stage 1 Completeness Checklist
- [ ] **All 93 Controls Retained**: A.5 Organizational (37) + A.6 People (8) + A.7 Physical (14) + A.8 Technological (34) = 93 rows present.
- [ ] **No Silent Deletions**: Cloud-inherited physical controls explicitly marked "Applicable (Inherited from UK Sovereign Cloud Provider)" or justified exclusion.
- [ ] **Justification Basis Recorded**: Every row states Legal/Regulatory (L), Business Requirement (B), Contractual (C), or Risk Treatment (R).
- [ ] **Control Owners & Evidence Linked**: Each implemented row points to a live file/ticket folder path in \`/Evidence/\`.
- [ ] **Cross-Checked Against Annex A Updates**: Covers new 2022 controls (A.5.7 Threat Intel, A.5.23 Cloud Services, A.5.30 ICT Continuity, A.8.11 Data Masking, A.8.12 DLP, A.8.23 Web Filtering, A.8.28 Secure Coding).

## High-Priority Enclave Control Starter Matrix
| ID | Annex A Control | Applicable | Basis (L/B/C/R) | Implementation Status | Platform Evidence Location |
|---|---|---|---|---|---|
| A.5.7 | Threat intelligence | Yes | L / R | [ ] Implemented | \`/04-Vuln-PenTest-SIEM/threat-feeds/\` |
| A.5.15–18 | Access control & UARs | Yes | L / C / R | [ ] Implemented | \`/02-Access-and-JML/quarterly-uar/\` |
| A.5.23 | Info security for cloud services | Yes | L / C / R | [ ] Implemented | \`/05-Backup-DR-Suppliers/cloud-sla/\` |
| A.5.30 | ICT readiness for continuity | Yes | B / R | [ ] Implemented | \`/05-Backup-DR-Suppliers/pitr-drills/\` |
| A.6.1–6.6 | Screening, awareness, NDAs | Yes | L / R | [ ] Implemented | \`/02-Access-and-JML/training-ndas/\` |
| A.7.1–7.14 | Physical security & sanitization | Partial/Inherited | C / R | [ ] Implemented | Cloud SOC 2 + Pixel VDI policy |
| A.8.8–8.9 | Vulns & config management | Yes | L / R | [ ] Implemented | \`/04-Vuln-PenTest-SIEM/trivy-cis/\` |
| A.8.11–12 | Data masking & DLP airlock | Yes | L / R | [ ] Implemented | \`/06-DEA-and-Airlock/sdc-airlock/\` |
| A.8.15–16 | Logging & monitoring | Yes | L / R | [ ] Implemented | \`/04-Vuln-PenTest-SIEM/monthly-review/\` |
| A.8.20–24 | Network segregation & crypto | Yes | L / R | [ ] Implemented | Zero-egress IaC + KMS key rotation |`
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
    templateMarkdown: `# Information Asset & Supplier Assurance Register (Annex A.5.9–12, A.5.19–23)

## Asset & Supplier Planning Checklist
- [ ] **All Asset Classes Inventoried**: Clinical/population datasets, KMS encryption keys, Git repos, container images, secrets vaults, VDI pools.
- [ ] **Classification Scheme Applied (A.5.12)**: Every dataset tagged as Tier 1 (Aggregate/Synthetic), Tier 2 (Pseudonymised), or Tier 3 (Sensitive/s251).
- [ ] **Named Information Asset Owner (IAO)**: Accountable owner assigned for retention, disposal, and access authorization per asset.
- [ ] **Sub-Processor Due Diligence Pre-Onboarding (A.5.19–23)**: UK residency, DPA, DSPT/DTAC, SOC 2 Type II or ISO 27001 certificate verified before processing data.
- [ ] **LLM / AI Vendor Check**: Confirm either self-hosted in-enclave inference OR sovereign private endpoint with contractual Zero Data Retention (ZDR).

## Data & Supplier Inventory Templates
| Asset / Supplier ID | Name & Type | Classification / Criticality | UK Residency & Lawful / DPA Status | Assurance Cert Expiry | Accountable Owner |
|---|---|---|---|---|---|
| ASSET-DS-01 | HES / EHR Pseudonymised Cohort | Tier 2 · Confidential | UK GDPR 6(1)(e)/9(2)(j) · Retained 5y | Reviewed Quarterly | IAO (Health Lead) |
| SUP-CLD-01 | Sovereign UK Cloud Host | Critical Sub-Processor | UK South/West Regions · Art 28 DPA | ISO 27001 / SOC 2 [Date] | Procurement / ISMS Lead |
| SUP-IDP-01 | Federated Identity Provider | High Criticality | UK/EU Adequacy · FIDO2 Auth | ISO 27001 [Date] | IAM Control Owner |`
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
      'Emits live OIDC identity claims (\`ig_and_vetting_valid\`, \`mfa_fido2_verified\`) evaluated before workspace launch.',
    optionalRuntimeClaim: 'input.researcher.ig_and_vetting_valid & input.researcher.mfa_fido2_verified',
    optionalRegoPreview: `safe_person_admitted {\n  input.researcher.ig_and_vetting_valid == true\n  input.researcher.mfa_fido2_verified == true\n}`,
    templateMarkdown: `# SOP-01: Access Control, Background Vetting & Joiner/Mover/Leaver (JML) Procedure

## 1. Joiner Onboarding Pre-Access Gate Checklist (A.6.1, A.6.3, A.6.6)
- [ ] **Identity & Right-to-Work Vetted**: BPSS/DBS screening completed and filed prior to account creation.
- [ ] **Confidentiality Undertaking Signed**: Staff NDA or Researcher Data Access Agreement (incl. DEA s67 / DPA s171 notice) countersigned.
- [ ] **Training Completed First**: Annual security awareness & NHS DSPT / ONS Safe Researcher training passed BEFORE SSO token issuance.
- [ ] **Phishing-Resistant MFA Bound**: Hardware FIDO2 key or WebAuthn enrolled; legacy SMS MFA disabled.
- [ ] **Least-Privilege Group Assignment**: Assigned strictly to approved project namespace(s) (no persistent cluster-admin).

## 2. Mover & Quarterly User Access Review Checklist (A.5.18)
- [ ] **Quarterly UAR Triggered (Every 90 Days)**: Extract full member lists for cloud admins, DBAs, SDC reviewers, and research projects.
- [ ] **Manager / Project Lead Recertification**: Written confirmation retaining active users and flagging transfers/exits.
- [ ] **Stale Account Pruning**: Suspend accounts inactive > 45 days; remove deprecated project entitlements immediately.

## 3. Leaver Offboarding Checklist
- [ ] **Target SLA**: Disable SSO, revoke OIDC refresh tokens, and drop VPN/VDI access within <= 4 hours (<= 1 hour for involuntary exit).
- [ ] **Reconciliation Evidence Archived**: Retain timestamped IdP revocation ticket linked to HR exit notice.`
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
      'Uses signed CI/Trivy attestations (\`cve_and_egress_verified\`) in Kubernetes admission controllers.',
    optionalRuntimeClaim: 'input.enclave.cve_and_egress_verified & input.pod.run_as_non_root',
    optionalRegoPreview: `hardened_pod_admitted {\n  input.enclave.cve_and_egress_verified == true\n  input.pod.run_as_non_root == true\n}`,
    templateMarkdown: `# SOP-02: Secure Engineering, Configuration & Vulnerability Management (A.8.8, A.8.9, A.8.28, A.8.32)

## 1. Change Management & SDLC Checklist (A.8.28, A.8.32)
- [ ] **Branch Protection Locked**: Direct commits to \`main\` / \`prod\` disabled; minimum 1 independent peer review required.
- [ ] **Environment Segregation**: Dev/test fixtures use strictly synthetic data—never live production patient microdata (A.8.31).
- [ ] **CI Automated Gates**: Unit tests, SAST/secret scanning, container CVE scan, and schema checks pass prior to merge.
- [ ] **Pre-Approved Rollback Plan**: Every production change ticket documents rollback steps and verification owner.

## 2. Hardening & Mirror Hygiene Checklist (A.8.9)
- [ ] **Container & OS Baselines**: CIS Level 1 benchmarks enforced; researcher containers run \`runAsNonRoot\`, \`readOnlyRootFilesystem: true\`, and drop all Linux capabilities.
- [ ] **Air-Gapped Package Diode Active**: Internal PyPI/CRAN/Harbor mirrors enforce checksum & quarantine review before release.

## 3. Vulnerability Management SLAs (A.8.8)
| Severity (CVSS v3) | Remediation SLA | Escalation Path if Breached | Monthly Evidence Export |
|---|---|---|---|
| Critical (9.0–10.0) | <= 14 days (emergency hotfix <= 48h if exploited) | SecOps Lead -> Executive Sponsor & Risk Register | \`/04-Vuln-PenTest-SIEM/monthly-cve/\` |
| High (7.0–8.9) | <= 30 days | Platform Engineering Manager | Monthly scan delta |
| Medium / Low | <= 90 days / Next maintenance cycle | Tracked in backlog | Quarterly summary |`
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
    templateMarkdown: `# SOP-03: Incident Response, Cryptography & Continuity Playbook (A.5.24–30, A.8.13, A.8.24)

## 1. Security Incident & Breach Triage Checklist (A.5.24–5.28)
- [ ] **Severity Matrix Defined**: P1 (Confirmed Exfiltration / Break-Glass Abuse) triage <= 15 mins; P2 <= 2 hours.
- [ ] **Forensic Evidence Preservation (A.5.28)**: Snapshot compromised pod/IAM logs to immutable WORM bucket prior to termination.
- [ ] **Statutory 72-Hour Clock**: Notify DPO / SIRO / Caldicott Guardian immediately to assess ICO & DSPT Data Security & Protection Incident reporting within 72 hours.
- [ ] **Semi-Annual Tabletop Executed**: Documented scenario (e.g., attempted airlock leak or stolen token) with lessons logged in Clause 10.2 CAPA.

## 2. Cryptographic Key Governance Checklist (A.8.24)
- [ ] **At-Rest Standard**: AES-256-GCM / KMS CMK enforced on all datasets, EBS/object buckets, backups & audit ledgers.
- [ ] **In-Transit Standard**: TLS 1.3 / mTLS 1.3 mandatory; legacy TLS 1.0/1.1 & unencrypted HTTP disabled.
- [ ] **Key Rotation & Destruction**: KMS keys rotated annually; cryptographic erasure procedure tested for decommissioned studies.

## 3. Immutable Backups & DR Restore Drill Checklist (A.8.13, A.5.30)
- [ ] **WORM Immutability Active**: Object lock prevents deletion even by compromised root admins.
- [ ] **RTO / RPO Verified Live**: Semi-annual isolated sandbox PITR restore proves dataset + audit ledger recover cleanly within SLA.`
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
      'Compiles quantitative thresholds and dual-reviewer sign-off flags into fail-closed \`egress_permitted\` release gates.',
    optionalRuntimeClaim: 'input.export.sdc_and_dual_signoff_complete & input.dataset.min_cell_count >= 10',
    optionalRegoPreview: `egress_permitted {\n  input.export.sdc_and_dual_signoff_complete == true\n  input.dataset.min_cell_count >= 10\n}`,
    templateMarkdown: `# SOP-04: Safe Outputs Airlock & Procedural Approval Hand-Offs (Annex A.8.12)

## Stage 1 — Quarantine Intake & Provenance Checklist
- [ ] **Study & Purpose Logged**: Active project ID, approving ethics/RAP reference, and code script SHA-256 captured.
- [ ] **Output Type Classified**: Frequency table, magnitude mean/total, survival curve, regression, or ML model artefact (Statbarn mapping).

## Stage 2 — Quantitative Disclosure & Context Review Checklist
- [ ] **No Microdata / Direct Identifiers**: Zero patient IDs, free-text notes, raw timestamps, or full postcodes present.
- [ ] **Primary Cell Suppression (k >= 10)**: Every frequency cell & model unweighted subgroup N >= 10 (or masked).
- [ ] **Secondary Complementary Suppression**: Margins/totals cannot be subtracted across rows/columns to recover masked cells.
- [ ] **Dominance & Residuals Checked**: Top-1 share <= 80%, Top-2 <= 85%; regression DF >= 10; Kaplan-Meier risk set >= 10.
- [ ] **Cross-Release Differencing Checked**: Compared against researcher's prior approved exports to block nested subset subtraction.

## Stage 3 — Independent Two-Person Hand-Off & Immutable Release Record
- [ ] **Reviewer 1 (Automated/Primary SDC Officer)**: Signed triage outcome + rationale logged (must NOT be submitter).
- [ ] **Reviewer 2 (Independent Approving Officer)**: Independently countersigned approval in airlock ticket.
- [ ] **Cryptographic Release Seal**: Final exported artefact SHA-256 digest & provenance bundle archived to \`/06-DEA-and-Airlock/\`.`
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
      'Binds verified UKSA Processor accreditation (\`dea_rap_accreditation_valid\`) alongside ISO 27001 certification status into dataset mount controls.',
    optionalRuntimeClaim: 'input.project.dea_rap_accreditation_valid & input.enclave.isms_27001_certified',
    optionalRegoPreview: `dea_processor_mount_allowed {\n  input.enclave.isms_27001_certified == true\n  input.project.dea_rap_accreditation_valid == true\n}`,
    templateMarkdown: `# DEA 2017 Section 71 Accredited Processor Planning Dossier (UKSA TRE SOP V1.4)

## Statutory Scope & Benchmark Checklist
- [ ] **Gateway Appropriateness Verified**: Confirm datasets fall within DEA Part 5 Ch. 5 (excluding health & adult social care data under s64 unless a separate gateway such as NHS Act s251 / UK GDPR applies).
- [ ] **UKSA Research Code Alignment**: Processor governance mapped to UKSA Accreditation Policy V1.4 & TRE SOP V1.4.
- [ ] **ISO/IEC 27001 Benchmark & Non-Waiver Evidence Prepared**: Attach UKAS/ANAB ISO 27001 certificate (or NHS DSPT equivalence where applicable) **AND** complete UKSA's evidence-based security assessment—recognizing certification supports applications rather than granting a blanket bypass.
- [ ] **Scope Boundary Match**: Confirm ISO/IEC 27001 Scope Statement (Clause 4.3) explicitly covers the exact DEA ingestion, linkage, compute, and airlock infrastructure.

## Legal & Operational Governance Checklist
- [ ] **Section 67 Criminal Sanctions Notice**: Explicit criminal-liability wording for unlawful re-identification/disclosure embedded in all researcher & staff undertakings.
- [ ] **Split-File Linkage Separation**: Clear functional & key separation between Data Providers, Trusted Third Party / Linkage Broker, and Compute Enclave.
- [ ] **Five Safes Operational Evidence Ready**: Completed UKSA TRE SAQ V3.1 workbook linked to live screenshots, config files, UARs, pen-tests, and airlock tickets.`
  },
  {
    id: 'dea-saq-v31-evidence',
    title: 'UKSA TRE Self-Assessment Questionnaire (SAQ V3.1) Five Safes Evidence Map',
    category: 'DEA 2017 Accreditation Dossier',
    clauseRef: 'DEA 2017 s70 Code of Practice · UKSA TRE SAQ V3.1 (All 5 Safes)',
    practicalFormat: 'Completed SAQ V3.1 workbook cross-referenced across all 5 Safes to ISO Clauses & proof',
    ownerRole: 'Information Security Manager & Platform Architect',
    reviewCadence: 'Submitted at accreditation & major platform revisions',
    purpose:
      'Maps every UKSA Five Safes technical and governance question—Safe People, Safe Projects, Safe Settings, Safe Data, and Safe Outputs—to verifiable platform evidence and ISO/IEC 27001 controls.',
    platformPreparationRequirement:
      'UKSA assessors inspect actual configuration proof, access logs, linkage architecture, and SDC output procedures across all five pillars—never rely on generic assurances inside SAQ V3.1 responses.',
    optionalOpaRuleImpact:
      'Demonstrates zero divergence between SAQ V3.1 questionnaire answers across all Five Safes and live admission/egress policy logic.',
    optionalRuntimeClaim: 'input.governance.soa_approved_current & input.enclave.cve_and_egress_verified',
    optionalRegoPreview: `saq_technical_controls_active {\n  input.enclave.cve_and_egress_verified == true\n  input.governance.soa_approved_current == true\n}`,
    templateMarkdown: `# UKSA TRE Accreditation SAQ V3.1 — Complete Five Safes Planning & Evidence Map

## 1. Safe People (Vetting, Accreditation, Training & Revocation)
- [ ] **Accredited Researcher Check**: Verify active UKSA/ONS Accredited Researcher status & institutional employment prior to project onboarding.
- [ ] **Background Screening & NDA (Annex A.6.1, A.6.6)**: Record BPSS/DBS screening plus signed Researcher Agreement citing DEA 2017 s67 criminal sanctions.
- [ ] **Mandatory Annual Training (Annex A.6.3)**: Verify unexpired ONS/DARE Safe Researcher Training + annual IG compliance certificate.
- [ ] **Joiner/Mover/Leaver Controls (Annex A.5.18)**: Document quarterly UARs and <= 4-hour offboarding token revocation SLAs.

## 2. Safe Projects (Ethics, Public Benefit, DAC & Expiry Enforcement)
- [ ] **Public Benefit & Feasibility Logged**: Formal DAC/UKSA RAP application verifying non-commercial public-benefit research purpose.
- [ ] **Statutory Gateway Confirmed**: Document DEA Part 5 Ch. 5 RAP authorisation (and REC / CAG s251 if health-linked under parallel gateway).
- [ ] **Scope & Expiry Enforcement**: Bind project approval expiry dates and dataset tier entitlements directly to IAM workspace group lifetime.
- [ ] **Caldicott 8 / Public Transparency**: Publish lay project summary and Data Use Register entry within target SLA.

## 3. Safe Settings (Cyber Security, Zero-Egress VPC, VDI & Monitoring)
- [ ] **ISMS & Cyber Baseline (ISO 27001 / NCSC CAF / DSPT)**: Attach current certification scope plus latest independent CREST penetration-test remediation log.
- [ ] **Zero-WAN Egress & Microsegmentation (Annex A.8.20–22)**: Prove outbound public internet routing, raw sockets, and unmanaged DNS are dropped at firewall/CNI layer.
- [ ] **Pixel-Only VDI & Endpoint Containment (Annex A.7 / A.8.12)**: Confirm clipboard sharing, USB redirection, local disk mapping, and screenshots/downloads are disabled.
- [ ] **Strong Authentication & Hardened Compute (Annex A.8.2, A.8.5, A.8.8–9)**: Enforce phishing-resistant FIDO2 MFA, non-root read-only containers, and air-gapped internal PyPI/CRAN mirrors.
- [ ] **Immutable SIEM Audit Logging (Annex A.8.15–16)**: Centralize WORM telemetry of logins, queries, break-glass events, and monthly human triage sign-offs.

## 4. Safe Data (De-Identification, Split-File Linkage, Minimisation & Quality)
- [ ] **Direct Identifier Removal**: Expunge names, NHS/NI numbers, addresses, and full dates of birth prior to research enclave ingress.
- [ ] **Split-File / Trusted Third Party Linkage**: Verify KMS-salted HMAC-SHA256 pseudonymisation where demographic keys remain strictly segregated from clinical/research payload.
- [ ] **Sensitivity Tiering & Minimisation**: Mount strictly approved variables/rows only (Tier 1 Aggregate, Tier 2 Pseudonymous, Tier 3 Special Safeguards).
- [ ] **Data Quality & Disposal Retention (ISO 5259 / A.8.10)**: Profile completeness/validity upon ingestion and enforce scheduled cryptographic erasure at project close.

## 5. Safe Outputs (Statistical Disclosure Control & Dual Airlock Auditability)
- [ ] **Quantitative SDC Enforcement**: Apply small-cell suppression (k >= 10), complementary secondary masking, and dominance caps (<= 80%).
- [ ] **Multi-Model & Residual Checks**: Screen survival curves, regression odds/degrees of freedom, and differential privacy budgets for trained ML models.
- [ ] **Differencing Prevention**: Cross-check candidate exports against researcher's cumulative project release history.
- [ ] **Two-Person Independent Hand-Off**: Require dual approval by accredited SDC officers independent of the submitting researcher, preserving tamper-evident release hashes.`
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
    templateMarkdown: `# UKSA RAP Approved Project & Researcher Entitlement Ledger

## Governance & Offboarding Planning Checklist
- [ ] **Public Benefit Lay Summary Approved**: Plain-English summary verified prior to publishing on the public Data Use Register (FOI s19 & Caldicott 8 ready).
- [ ] **Lawful Gateway Documented per Project**: Explicitly separate DEA Part 5 Ch. 5 RAP approvals from health-data gateways (UK GDPR Art 6(1)(e)/9(2)(j) + NHS Act s251 CAG / REC).
- [ ] **Named Researcher & Amendment Tracking**: Every named Accredited Researcher and project scope amendment recorded with approval dates.
- [ ] **Automated Expiry & Close-Down Trigger**: Calendar + IAM automation suspends compute workspace and initiates data retention/erasure check on expiry date.

## Master Project Registry Template
| Project URI / ID | Lead CI & Institution | Approval Ref (RAP / REC / CAG) | Authorized Dataset Tiers | Start & Expiry Dates | Named Accredited Researchers | Public Register Status |
|---|---|---|---|---|---|---|
| PRJ-2026-001 | [CI / University] | RAP-2026-884 / REC-24-LO-01 | Tier 2 Pseudonymous | 2026-04-01 -> 2028-03-31 | [Name 1, Name 2] | [ ] Published |`
  }
];
