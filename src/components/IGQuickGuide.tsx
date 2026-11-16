/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { WaveboundLogo } from './WaveboundLogo';
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  FileCheck2,
  Lock,
  Download,
  Building2,
  Bot,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Info,
  Scale,
  FileText,
  Eye,
  Activity,
  Waves,
  Search,
  Network,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  Shield,
  HelpCircle,
  Award,
  Printer,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface IGQuickGuideProps {
  onNavigateToGlossary?: (termId: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToGovernAssure?: () => void;
  onNavigateToQuiz?: (category?: string) => void;
  onNavigateToGraph?: () => void;
  onNavigateToResources?: () => void;
}

interface HandbookChapter {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  badge: string;
  statutoryBasis: string;
  keySafeguards: string[];
  workflowSteps: {
    title: string;
    description: string;
    responsibleParty: string;
  }[];
  executiveCallout: string;
}

const HANDBOOK_CHAPTERS: HandbookChapter[] = [
  {
    id: 'ch-people',
    number: '01',
    title: 'Researcher Accreditation & Safe People',
    shortDesc: 'Verifying researcher identities, accredited institutional affiliations, and annual Information Governance training.',
    badge: 'Safe People & Vetting',
    statutoryBasis: 'Digital Economy Act 2017 Part 5; ONS Approved Researcher Scheme; UKSA Research Accreditation Panel (RAP).',
    keySafeguards: [
      'Zero unaccredited access: Every researcher must hold verified institutional employment and active sponsorship.',
      'Mandatory annual IG training: Must have certified completion of NHS Data Security & Protection Toolkit (DSPT) modules or equivalent.',
      'Formal data access agreements: Bound by statutory penalties under DEA 2017 Section 67 against individual re-identification.'
    ],
    workflowSteps: [
      { title: '1. Identity & Institutional Validation', description: 'Researcher submits proof of employment with an accredited UK university, NHS Trust, or statutory research body.', responsibleParty: 'Sponsoring Organisation' },
      { title: '2. Accreditation Panel Review', description: 'UK Statistics Authority (UKSA) or accredited local research panel verifies qualifications and bona fides.', responsibleParty: 'Research Accreditation Panel (RAP)' },
      { title: '3. Digital Credential Issuance', description: 'Time-bound cryptographic credential issued, linked to annual IG certification with automatic expiry.', responsibleParty: 'Platform Identity Authority' }
    ],
    executiveCallout: 'No AI model, agent, or autonomous script is ever a "Safe Person". All machine workloads must run under the explicit legal sponsorship of an accredited human researcher.'
  },
  {
    id: 'ch-projects',
    number: '02',
    title: 'Statutory Gateways & Ethical Approvals',
    shortDesc: 'Validating public interest justification, HRA Research Ethics Committee (REC) reviews, and Section 251 CAG exemptions.',
    badge: 'Safe Projects & Ethics',
    statutoryBasis: 'UK GDPR Art. 6(1)(e) & 9(2)(j); National Health Service Act 2006 s251; Health Research Authority (HRA) SOPs.',
    keySafeguards: [
      'Demonstrable Public Benefit: Commercial marketing, advertising, insurance underwriting, or individual credit assessment are permanently barred by law.',
      'Ethics Committee Favourable Opinion: Studies involving sensitive health data must hold active favourable opinion from an accredited NHS REC.',
      'Section 251 Confidentiality Advisory Group (CAG): Where identifiable patient data must be processed without prior consent, statutory CAG authorization is mandatory.'
    ],
    workflowSteps: [
      { title: '1. IRAS Protocol Submission', description: 'Chief Investigator registers study protocol detailing scientific hypotheses, population cohort, and public benefit.', responsibleParty: 'Chief Investigator' },
      { title: '2. Independent Ethics Review', description: 'NHS Research Ethics Committee evaluates participant burden, privacy mitigations, and consent models.', responsibleParty: 'NHS Research Ethics Committee (REC)' },
      { title: '3. Section 251 Clearance (if unconsented)', description: 'Confidentiality Advisory Group assesses whether public interest outweighs confidentiality duties.', responsibleParty: 'CAG / Health Research Authority' }
    ],
    executiveCallout: 'Compliance with Caldicott Principle 1 requires clear, recorded evidence of how patient and public health will benefit before any query may execute.'
  },
  {
    id: 'ch-settings',
    number: '03',
    title: 'Secure Enclaves & Perimeter Controls',
    shortDesc: 'Operating within hardened, air-gapped virtual safe rooms where outbound internet, copy-paste, and USB exports are blocked.',
    badge: 'Safe Settings & Infrastructure',
    statutoryBasis: 'SATRE Specification v1.1; ISO/IEC 27001 Annex A.13; NHS DSPT Assertion 1.5.',
    keySafeguards: [
      'Air-gapped Zero-Egress VPC: Compute pods cannot reach the public internet; all outbound WAN routing is severed.',
      'AES-256 Encryption at Rest & In Transit: All storage volumes, database partitions, and internal mTLS tunnels enforce AES-256 cryptographic protection.',
      'Virtual Desktop Infrastructure (VDI): Researchers view pixels only; underlying microdata never resides on local client laptops.',
      'Multi-Factor Authentication (MFA): FIDO2 / hardware token authentication required at entry perimeter.'
    ],
    workflowSteps: [
      { title: '1. MFA Perimeter Ingress', description: 'Researcher passes multi-factor cryptographic handshake to access virtual desktop.', responsibleParty: 'Perimeter Access Gateway' },
      { title: '2. Enclave Sandbox Provisioning', description: 'Isolated compute sandbox provisioned with read-only access to approved study partitions.', responsibleParty: 'Enclave Orchestrator' },
      { title: '3. Egress Containment Enforcement', description: 'Clipboard sharing, network sockets, and file downloading are blocked at the perimeter kernel.', responsibleParty: 'Network Security Boundary' }
    ],
    executiveCallout: 'Bringing the researcher to the data rather than sending data to the researcher guarantees absolute chain of custody.'
  },
  {
    id: 'ch-data',
    number: '04',
    title: 'Data Minimisation & Sensitivity Tiers',
    shortDesc: 'Structuring population data into defined sensitivity tiers with direct identifiers stripped at source.',
    badge: 'Safe Data & De-identification',
    statutoryBasis: 'UK GDPR Art. 5(1)(c) Minimisation; ICO Anonymisation Code; NHS Caldicott Principle 2.',
    keySafeguards: [
      'Direct Identifiers Expunged: Names, NHS numbers, addresses, and full dates of birth are segregated before enclave ingestion.',
      'Salted HMAC Pseudonymisation: Reversible linkage tokens are salted and managed by an independent Trusted Third Party (industry-standard PPRL per ISO/TS 25237, e.g. SAIL Databank split-file & NHS DARS models).',
      'Sensitivity Classification: Data tiered into Tier 1 (Aggregate/Synthetic), Tier 2 (Pseudonymised Cohort), and Tier 3 (Sensitive Clinical under Section 251).'
    ],
    workflowSteps: [
      { title: '1. De-identification at Ingress', description: 'Originating data custodians strip direct identifiers and apply salted cryptographic hashing.', responsibleParty: 'NHS Trust / Data Custodian' },
      { title: '2. Linkage Token Verification', description: 'Trusted Third Party generates project-specific pseudonym tokens preventing multi-study cross-linkage.', responsibleParty: 'Honest Broker / Third Party' },
      { title: '3. Tiered Workspace Attachment', description: 'Only the minimal necessary clinical variables approved in the project protocol are mounted.', responsibleParty: 'Information Governance Lead' }
    ],
    executiveCallout: 'Caldicott Principle 2 mandates that personal confidential data is only used where absolutely essential; aggregate or pseudonymised data must be preferred.'
  },
  {
    id: 'ch-outputs',
    number: '05',
    title: 'Statistical Disclosure Control & Airlocks',
    shortDesc: 'Preventing small-cell re-identification and differencing through automated suppression and two-person airlock reviews.',
    badge: 'Safe Outputs & Disclosure Control',
    statutoryBasis: 'ONS Tabular SDC Guidelines; National Output Review Protocols for Secure Environments; Caldicott Principle 8.',
    keySafeguards: [
      'Primary Cell Suppression (k ≥ 10): Any aggregate table cell representing fewer than 10 individuals is permanently masked.',
      'Dominance Concentration Rule (≤ 80%): Top contributor must not account for more than 80% of any summary value.',
      'Independent Two-Person Airlock Review: Certified output reviewers inspect all candidate charts, tables, and model parameters before release.',
      'Freedom of Information (FOI) Proactive Transparency: Published Caldicott 8 summaries and release registers satisfy FOIA s19 publication schemes while shielding s40(2) personal data and s41 confidential microdata.'
    ],
    workflowSteps: [
      { title: '1. Airlock Export Submission', description: 'Researcher deposits candidate publication table into the enclave airlock staging area.', responsibleParty: 'Approved Researcher' },
      { title: '2. Automated Mathematical Scan', description: 'Statistical rules verify cell frequencies ($k \\ge 10$) and dominance thresholds.', responsibleParty: 'Automated Airlock Evaluator' },
      { title: '3. Two-Person Manual Sign-off', description: 'Certified output review officers independently confirm zero spontaneous re-identification or differencing risk.', responsibleParty: 'Output Review Officers (2)' }
    ],
    executiveCallout: 'Residual disclosure risk is mitigated through secondary suppression: masking neighboring cells so small cell counts cannot be deduced by subtracting from row or column totals.'
  }
];

interface SchematicNode {
  id: string;
  stepNumber: number;
  label: string;
  category: 'origin' | 'governance' | 'boundary' | 'enclave' | 'egress' | 'release';
  categoryLabel: string;
  fiveSafesPillar: 'Safe Data' | 'Safe Projects' | 'Safe People' | 'Safe Settings' | 'Safe Outputs';
  shortDesc: string;
  statutoryRole: string;
  handbookChapterRef: string;
  handbookChapterTitle: string;
  color: string;
  responsibleRoles: string[];
  statutoryHandoffs: string[];
  privacySafeguards: string[];
  operationalActions: string[];
  upstreamHandoff: string;
  downstreamHandoff: string;
}

const SCHEMATIC_NODES: SchematicNode[] = [
  {
    id: 'node-citizen',
    stepNumber: 1,
    label: 'Population Data Sources',
    category: 'origin',
    categoryLabel: 'Source Cohort',
    fiveSafesPillar: 'Safe Data',
    shortDesc: 'Citizens, survey cohorts, and patients whose health and care encounters are held under statutory common law confidentiality.',
    statutoryRole: 'Data Subjects & Primary Cohorts',
    handbookChapterRef: 'ch-data',
    handbookChapterTitle: 'Chapter 04: Data Minimisation & Sensitivity Tiers',
    color: '#06b6d4',
    responsibleRoles: [
      'Data Subjects (Patients & Service Users)',
      'Direct Healthcare Clinicians (GPs, Hospital Consultants)',
      'Primary Care Practice Caldicott Leads'
    ],
    statutoryHandoffs: [
      'Common Law Duty of Confidentiality (CLDC) established at time of clinical consultation',
      'UK GDPR Article 13 & 14 Fair Processing Notices and transparency disclosures',
      'National Data Opt-Out (NDOO) recording via NHS App or central digital spine'
    ],
    privacySafeguards: [
      'Statutory duty of confidence attached to all personal clinical interactions',
      'National Data Opt-Out preference filtering (Type 1 practice-level & National research opt-outs)',
      'Explicit consent protocols for interventional clinical trials and identifiable survey cohorts'
    ],
    operationalActions: [
      'Clinical data capture strictly bounded by individual care delivery and statutory NHS duties',
      'Publication of organizational privacy notices explaining public interest research processing'
    ],
    upstreamHandoff: 'Routine clinical consultation / primary care encounter',
    downstreamHandoff: 'Secure ingress to Data Custodian / Health Organization Data Repository'
  },
  {
    id: 'node-custodian',
    stepNumber: 2,
    label: 'Data Custodian / NHS Trust',
    category: 'origin',
    categoryLabel: 'Data Custodian',
    fiveSafesPillar: 'Safe Data',
    shortDesc: 'Authorised health organizations and trusts holding statutory legal stewardship over primary clinical records.',
    statutoryRole: 'Data Controller (UK GDPR Art. 4(7))',
    handbookChapterRef: 'ch-data',
    handbookChapterTitle: 'Chapter 04: Data Minimisation & Sensitivity Tiers',
    color: '#0ea5e9',
    responsibleRoles: [
      'Trust Senior Information Risk Owner (SIRO)',
      'Institutional Caldicott Guardian',
      'Head of Information Governance & Data Protection Officer (DPO)',
      'Healthcare Records Manager'
    ],
    statutoryHandoffs: [
      'UK GDPR Article 6(1)(e) (Public Task) & Article 9(2)(h) (Health & Social Care Administration)',
      'Data Sharing Agreements (DSA) drafted under DPA 2018 Section 121 statutory code of practice',
      'Data Protection Impact Assessment (DPIA) signed off under UK GDPR Article 35'
    ],
    privacySafeguards: [
      'AES-256 encrypted storage volumes with role-partitioned EHR database clusters',
      'De-identification at source: direct patient identifiers (Name, NHS Number, Full Address) stripped',
      'Salted HMAC tokenisation for longitudinal linkage via honest-broker third parties (international PPRL standard, e.g. SAIL Databank split-file & NHS DARS models)',
      'Immutable database audit logging for all extraction and cohort selection queries'
    ],
    operationalActions: [
      'Execution of de-identification pipelines replacing NHS numbers with project-scoped tokens',
      'Verification of National Data Opt-Out exclusion lists before cohort staging'
    ],
    upstreamHandoff: 'Primary electronic patient records and clinical registries',
    downstreamHandoff: 'Pseudonymised project dataset routed to Governance Review'
  },
  {
    id: 'node-caldicott',
    stepNumber: 3,
    label: 'Caldicott Guardian & DPO',
    category: 'governance',
    categoryLabel: 'Institutional Conscience',
    fiveSafesPillar: 'Safe Projects',
    shortDesc: 'Senior statutory officials ensuring that patient confidentiality duty is preserved, public benefit justified, and Caldicott Principles 1–8 strictly enforced.',
    statutoryRole: 'Statutory Confidentiality & Legal Compliance Oversight',
    handbookChapterRef: 'ch-projects',
    handbookChapterTitle: 'Chapter 02: Statutory Gateways & Ethical Approvals',
    color: '#10b981',
    responsibleRoles: [
      'Institutional Caldicott Guardian',
      'Data Protection Officer (DPO)',
      'Caldicott Advisory Review Panel',
      'Patient & Public Involvement and Engagement (PPIE) Lead'
    ],
    statutoryHandoffs: [
      'Caldicott Principle 1: Purpose justification and necessity validation',
      'Caldicott Principle 8: Public transparency & machine-readable Data Use Register publication',
      'Common Law Duty of Confidentiality clearance (or confirmation of s251 statutory gateway requirement)'
    ],
    privacySafeguards: [
      'Rigorous proportionality test weighing public health benefit against privacy intrusion',
      'Data minimisation audit (Caldicott Principle 3: strictly only approved clinical fields)',
      'Scrutiny of lay summaries to eliminate discriminatory, stigmatising, or commercially exploitative aims',
      'Affirmation that data will never be shared with insurers, employers, or credit agencies'
    ],
    operationalActions: [
      'Evaluation of study protocol against institutional risk appetite and public benefit criteria',
      'Issuance of formal Caldicott Assent and publication of metadata on Open Data Use Register'
    ],
    upstreamHandoff: 'De-identified cohort request and research proposal dossier',
    downstreamHandoff: 'Formal referral to Independent Ethics Committee (REC / HRA)'
  },
  {
    id: 'node-ethics',
    stepNumber: 4,
    label: 'Ethics Committee (REC / HRA)',
    category: 'governance',
    categoryLabel: 'Independent Ethics',
    fiveSafesPillar: 'Safe Projects',
    shortDesc: 'Independent statutory body evaluating study ethical validity, scientific merit, consent frameworks, and public benefit.',
    statutoryRole: 'NHS REC / IRAS Protocol Favourable Opinion',
    handbookChapterRef: 'ch-projects',
    handbookChapterTitle: 'Chapter 02: Statutory Gateways & Ethical Approvals',
    color: '#34d399',
    responsibleRoles: [
      'NHS Research Ethics Committee (REC) Chair & Committee Members',
      'Independent Lay Public Members',
      'Health Research Authority (HRA) Approvals Officer',
      'Confidentiality Advisory Group (CAG) Reviewers'
    ],
    statutoryHandoffs: [
      'Governance Arrangements for Research Ethics Committees (GAfREC) formal opinion',
      'IRAS (Integrated Research Application System) standardized application submission',
      'Section 251 NHS Act 2006 statutory clearance from CAG (if unconsented clinical data)'
    ],
    privacySafeguards: [
      'Scrutiny of participant burden, vulnerable cohort safeguards, and incidental finding policies',
      'Review of PPIE co-design evidence and lay summary clarity',
      'Binding ethical stipulations governing cohort retention and secondary use boundaries'
    ],
    operationalActions: [
      'Convening multi-disciplinary ethics panel including clinicians, ethicists, and lay citizens',
      'Issuing formal Favourable Ethical Opinion with IRAS reference number and expiry schedule'
    ],
    upstreamHandoff: 'Caldicott Assent and IRAS Ethics Application Dossier',
    downstreamHandoff: 'Ethical clearance token provided to Perimeter Access Gateway'
  },
  {
    id: 'node-accreditation',
    stepNumber: 5,
    label: 'Researcher Accreditation (RAP)',
    category: 'governance',
    categoryLabel: 'Safe Person',
    fiveSafesPillar: 'Safe People',
    shortDesc: 'Verifying researcher qualifications, institutional employment, bona fides, and certified annual Information Governance training.',
    statutoryRole: 'Safe Person Accreditation Standard (DEA 2017 / ONS)',
    handbookChapterRef: 'ch-people',
    handbookChapterTitle: 'Chapter 01: Researcher Accreditation & Safe People',
    color: '#38bdf8',
    responsibleRoles: [
      'Research Accreditation Panel (RAP / UKSA / ONS)',
      'Submitting University Research Operations Office',
      'Lead Principal Investigator (PI)',
      'Platform Identity & Access Authority'
    ],
    statutoryHandoffs: [
      'Digital Economy Act 2017 Section 64 (Accredited Researcher Scheme)',
      'Research Passport and Honorary Clinical Research Contracts (HR / Occupational Health)',
      'Certified completion of NHS Data Security & Protection Toolkit (DSPT) / MRC Research Governance modules'
    ],
    privacySafeguards: [
      'Institutional employment verification and formal academic sponsorship',
      'Signed Legal Researcher Undertaking acknowledging criminal sanctions for re-identification (DPA 2018 § 171)',
      'Time-bounded credentials with mandatory annual retraining and re-vetting cycles'
    ],
    operationalActions: [
      'Automated validation against national Accredited Researcher register',
      'Issuance of cryptographic client credential (FIDO2 / mTLS) tied to verified individual identity'
    ],
    upstreamHandoff: 'Researcher application, institutional backing, and training certificates',
    downstreamHandoff: 'Cryptographic credentials minted for Perimeter Access Gateway'
  },
  {
    id: 'node-gateway',
    stepNumber: 6,
    label: 'Perimeter Access Gateway',
    category: 'boundary',
    categoryLabel: 'Access Boundary',
    fiveSafesPillar: 'Safe Settings',
    shortDesc: 'Hardened zero-trust gateway validating multi-factor authentication, active ethical clearance, and project authorization before admitting compute sessions.',
    statutoryRole: 'Policy Enforcement Point (PEP) & Admission Gate',
    handbookChapterRef: 'ch-settings',
    handbookChapterTitle: 'Chapter 03: Secure Enclaves & Perimeter Controls',
    color: '#f59e0b',
    responsibleRoles: [
      'Enclave Platform Security Engineers',
      'Identity & Access Management (IAM / SAML) Administrators',
      'Open Policy Agent (OPA) Evaluation Engine'
    ],
    statutoryHandoffs: [
      'Real-time automated evaluation of project REC ethical validity and Caldicott approval',
      'Sub-millisecond Open Policy Agent (OPA) admission policy evaluation (default allow = false)',
      'mTLS 1.3 mutual certificate verification and FIDO2 WebAuthn hardware token check'
    ],
    privacySafeguards: [
      'Zero direct microdata access: client laptops receive encrypted video pixels only (VDI streaming)',
      'Software-defined perimeter and IP allowlisting blocking untrusted ingress networks',
      'Immediate session termination and token revocation upon project expiry or security suspension'
    ],
    operationalActions: [
      'Matching JWT claims against semantic project authorization graph in memory',
      'Orchestrating ephemeral, isolated compute cleanroom for approved researcher session'
    ],
    upstreamHandoff: 'Verified Credentials from Accreditation + Project Clearance from Ethics & Caldicott',
    downstreamHandoff: 'Spawned isolated workspace inside the Air-Gapped Enclave'
  },
  {
    id: 'node-enclave',
    stepNumber: 7,
    label: 'Air-Gapped Research Enclave',
    category: 'enclave',
    categoryLabel: 'Safe Setting',
    fiveSafesPillar: 'Safe Settings',
    shortDesc: 'Hardened virtual cleanroom with zero outbound WAN internet access, read-only data partitions, internal package mirrors, and GPU acceleration.',
    statutoryRole: 'SATRE v1.1 Pillar 2 Secure Computing Cleanroom',
    handbookChapterRef: 'ch-settings',
    handbookChapterTitle: 'Chapter 03: Secure Enclaves & Perimeter Controls',
    color: '#8b5cf6',
    responsibleRoles: [
      'Accredited Analytical Researchers (Epidemiologists, Biostatisticians)',
      'Enclave Platform Infrastructure Engineers',
      'Accredited Clinical Safety Officer (CSO under DCB0129)'
    ],
    statutoryHandoffs: [
      'SATRE Standard Architecture for Trusted Research Environments (v1.1 baseline)',
      'ISO/IEC 27001:2022 & NHS DSPT Mandatory Technical Controls (zero egress enforcement)',
      'DCB0129 Statutory Clinical Risk Management for in-house analytical models and algorithms'
    ],
    privacySafeguards: [
      'Zero outbound WAN internet connectivity (enforced at Linux kernel & eBPF socket layer)',
      'Internal air-gapped package mirrors (PyPI, CRAN, npm) pre-scanned for vulnerabilities and CVEs',
      'Read-only microdata partitions (no researcher write or DDL privileges on shared database tables)',
      'Ephemeral compute workspaces: all user session memory and temp files wiped on logout'
    ],
    operationalActions: [
      'Execution of DuckDB, PostgreSQL, Python, and R statistical models against de-identified cohorts',
      'Deposition of candidate summary publication tables and model coefficients into airlock staging zone'
    ],
    upstreamHandoff: 'Authorized ingress session from Perimeter Access Gateway',
    downstreamHandoff: 'Candidate aggregate tables and statistical plots routed to SDC Scanner'
  },
  {
    id: 'node-sdc',
    stepNumber: 8,
    label: 'Statistical Disclosure Control (SDC)',
    category: 'egress',
    categoryLabel: 'Mathematical Gate',
    fiveSafesPillar: 'Safe Outputs',
    shortDesc: 'Automated policy-as-code scanner checking primary small-cell suppression (k >= 10), dominance ceilings (<= 80%), and regression degrees of freedom.',
    statutoryRole: 'ONS & NHS SDE Quantitative Output Protection',
    handbookChapterRef: 'ch-outputs',
    handbookChapterTitle: 'Chapter 05: Statistical Disclosure Control & Airlocks',
    color: '#ec4899',
    responsibleRoles: [
      'Automated SDC Rego Policy Engine',
      'SHACL Output Compliance Validator',
      'Lead Analytical Investigator'
    ],
    statutoryHandoffs: [
      'ONS Working Paper No. 22 Statistical Disclosure Control Guidance',
      'SDAP & DARE UK Statbarn Output Classification (5 canonical barns: Frequencies, Quantiles, Means/Totals, Correlation, Shape & Survival)',
      'NHS England Secure Data Environment SDC Standard Operating Procedure',
      'W3C SHACL shape validation of candidate tabular schemas and summary metrics'
    ],
    privacySafeguards: [
      'Minimum cell count suppression (k >= 10): all frequency counts between 1 and 9 replaced with *',
      'Controlled rounding to Base 5 / 10 as alternative suppression technique',
      'Secondary (complementary) suppression preventing margin subtraction deduction',
      'Dominance rules: (1, 80%) single unit and (2, 85%) top-two contributor suppression',
      'Prohibition of raw scatterplots and unbinned regression residual plots (must be binned/hexbin)',
      'Kaplan-Meier survival curve tail smoothing or truncation when remaining risk pool N < 10'
    ],
    operationalActions: [
      'Automated static analysis of candidate files, table matrices, and embedded chart coordinates',
      'Compilation of structured mathematical compliance audit report for human airlock reviewers'
    ],
    upstreamHandoff: 'Candidate analytical outputs submitted from Enclave Workspace',
    downstreamHandoff: 'Scanned files and automated compliance report sent to Airlock Review'
  },
  {
    id: 'node-airlock',
    stepNumber: 9,
    label: 'Airlocked Review',
    category: 'egress',
    categoryLabel: 'Safe Output Gate',
    fiveSafesPillar: 'Safe Outputs',
    shortDesc: 'Independent dual-reviewer sign-off by accredited SDC officers checking candidate outputs against differencing, small-cell disclosure, and inferential risks.',
    statutoryRole: 'Human-in-the-Loop SDC Officer Verification',
    handbookChapterRef: 'ch-outputs',
    handbookChapterTitle: 'Chapter 05: Statistical Disclosure Control & Airlocks',
    color: '#f97316',
    responsibleRoles: [
      'Lead Statistical Disclosure Control (SDC) Officer',
      'Secondary Independent SDC Officer',
      'Enclave Information Governance Lead'
    ],
    statutoryHandoffs: [
      'Safe Output principle of Five Safes framework',
      'SDAP Statbarn & DARE UK SACRO independent airlock checking protocol',
      'Dual-reviewer independent authorization protocol (two distinct accredited SDC officers)',
      'W3C PROV-O non-repudiable audit recording of review decision and officer signatures'
    ],
    privacySafeguards: [
      'Differencing attack analysis against previous project releases and public registries',
      'Computer vision and OCR scanning of plot images for embedded microdata pixels or small numbers',
      'Steganography and zero-width character inspection preventing covert PII exfiltration',
      'Strict prohibition of raw microdata CSVs, uncompiled binaries, and SQL table dumps'
    ],
    operationalActions: [
      'Inspection of candidate files in isolated airlock quarantine viewer',
      'Two-party cryptographic signing (Cosign / ECDSA) of approved release manifest'
    ],
    upstreamHandoff: 'Mathematical validation report from automated SDC scanner',
    downstreamHandoff: 'Signed release bundle unlocked for external researcher egress'
  },
  {
    id: 'node-publication',
    stepNumber: 10,
    label: 'Safe Public Health Output',
    category: 'release',
    categoryLabel: 'Public Domain',
    fiveSafesPillar: 'Safe Outputs',
    shortDesc: 'Fully anonymous epidemiological models, aggregated tables, and peer-reviewed clinical publications released into the public domain.',
    statutoryRole: 'Anonymous Data (UK GDPR Recital 26)',
    handbookChapterRef: 'ch-outputs',
    handbookChapterTitle: 'Chapter 05: Statistical Disclosure Control & Airlocks',
    color: '#10b981',
    responsibleRoles: [
      'Principal Investigator & Study Co-Authors',
      'Peer-Reviewed Scientific Journal Editors',
      'Public & Patient Involvement Co-Authors',
      'NHS SDE Public Communications Lead'
    ],
    statutoryHandoffs: [
      'UK GDPR Recital 26 (data rendered non-identifiable ceases to be personal data)',
      'Caldicott Principle 8 (publication of lay findings and public benefit evidence)',
      'Open Science and FAIR Data principles (Findable, Accessible, Interoperable, Reusable)'
    ],
    privacySafeguards: [
      'Output fully resilient to Motivated Intruder and Prosecutor re-identification models',
      'Inclusion of lay summaries co-authored with lived-experience patient advisory panel',
      'Permanent archival of compliance dossier in non-repudiable institutional repository'
    ],
    operationalActions: [
      'Publication in open-access scientific journals and policy briefings',
      'Updating Public Data Use Register with final published citations and project closure'
    ],
    upstreamHandoff: 'Cryptographically signed release bundle from Airlock Review',
    downstreamHandoff: 'Public health impact, NICE guideline update, and clinical practice improvement'
  }
];

const SCHEMATIC_EDGES = [
  { source: 'node-citizen', target: 'node-custodian', label: 'Primary Care Encounters' },
  { source: 'node-custodian', target: 'node-caldicott', label: 'Caldicott Approval' },
  { source: 'node-caldicott', target: 'node-gateway', label: 'Authorised Cohort' },
  { source: 'node-ethics', target: 'node-gateway', label: 'REC Protocol Clearance' },
  { source: 'node-accreditation', target: 'node-gateway', label: 'Safe Person Credentials' },
  { source: 'node-gateway', target: 'node-enclave', label: 'Provisioned Workspace' },
  { source: 'node-enclave', target: 'node-sdc', label: 'Export Candidate' },
  { source: 'node-sdc', target: 'node-airlock', label: 'Mathematical Clearance' },
  { source: 'node-airlock', target: 'node-publication', label: 'Certified Sign-off' }
];

interface IGQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  statutoryReference: string;
}

const IG_QUIZ_QUESTIONS: IGQuizQuestion[] = [
  {
    id: 'ig-q1',
    question: 'Under UK research governance, what is the mandatory primary suppression threshold for cell counts in tabular outputs to prevent small-cell re-identification?',
    options: [
      'Cells with fewer than 3 individuals (k < 3)',
      'Cells with fewer than 10 individuals (k < 10)',
      'Cells with fewer than 50 individuals (k < 50)',
      'No cell suppression is needed if data is pseudonymised'
    ],
    correctIndex: 1,
    explanation: 'National Information Governance and Statistical Disclosure Control (SDC) guidelines (ONS and secure environment standards) mandate primary suppression for any table cell representing fewer than 10 individuals (k < 10).',
    statutoryReference: 'ONS SDC Standard & National Output Review Protocol § 3.2'
  },
  {
    id: 'ig-q2',
    question: 'Under the Five Safes framework, can an autonomous Artificial Intelligence agent be classified as a "Safe Person"?',
    options: [
      'Yes, if the AI passes a technical benchmark test',
      'Yes, if the AI algorithm was developed in the UK',
      'No. AI is never a Safe Person; it is a delegated workload requiring an accredited human researcher holding statutory liability',
      'Yes, provided the AI runs in an air-gapped container'
    ],
    correctIndex: 2,
    explanation: 'Statutory research governance frameworks (including the Stanford UIT doctrine and ONS standards) establish that AI agents lack legal personhood and cannot hold statutory liability. An accredited human sponsor must bear legal responsibility.',
    statutoryReference: 'Digital Economy Act 2017 Part 5 & Stanford UIT Security Framework'
  },
  {
    id: 'ig-q3',
    question: 'When is a statutory Section 251 exemption from the Confidentiality Advisory Group (CAG) required under the NHS Act 2006?',
    options: [
      'Only when commercial companies sponsor a university study',
      'When confidential patient information is processed for research without explicit patient consent',
      'Only for studies conducted outside the United Kingdom',
      'Whenever an airlock export occurs'
    ],
    correctIndex: 1,
    explanation: 'Section 251 of the NHS Act 2006 enables the common law duty of confidentiality to be temporarily set aside on advice of the CAG when it is not practicable to obtain consent and where public interest outweighs privacy intrusion.',
    statutoryReference: 'National Health Service Act 2006 Section 251 & UK GDPR Art. 9(2)(j)'
  },
  {
    id: 'ig-q4',
    question: 'What is the purpose of "secondary suppression" in Statistical Disclosure Control?',
    options: [
      'Suppressing cells in a second, completely unrelated study',
      'Masking additional non-sensitive cells so that a primary suppressed small cell cannot be deduced by subtracting from totals',
      'Encrypting the hard drive of the researcher',
      'Deleting the entire dataset after 30 days'
    ],
    correctIndex: 1,
    explanation: 'Secondary (or residual) suppression ensures that when a small cell (e.g. 4) is masked in a table with a total of 20 and an adjacent cell of 16, the adjacent cell is also suppressed so that 20 - 16 = 4 cannot be trivially calculated.',
    statutoryReference: 'ONS Guidelines for Tabular Health Statistics'
  },
  {
    id: 'ig-q5',
    question: 'Which Caldicott Principle explicitly establishes that the duty to share information for individual care and public benefit can be as important as the duty to protect confidentiality?',
    options: [
      'Principle 1 (Justify the purpose)',
      'Principle 2 (Do not use personal confidential data unless essential)',
      'Principle 7 (The duty to share can be as important as the duty to protect)',
      'Principle 4 (Access should be on a strict need-to-know basis)'
    ],
    correctIndex: 2,
    explanation: 'Caldicott Principle 7 clarifies that health and social care professionals should have the confidence to share information in the best interests of patients and the public within the framework of the law.',
    statutoryReference: 'National Data Guardian Caldicott Principles (Principle 7)'
  }
];

interface GovernanceTemplate {
  id: string;
  title: string;
  category: 'Universal Planning Proforma' | 'REC / IRAS' | 'CAG Section 251' | 'Data Access Committee (DAC)';
  description: string;
  markdownContent: string;
}

const RESEARCHER_GOVERNANCE_TEMPLATES: GovernanceTemplate[] = [
  {
    id: 'tmpl-master-proforma',
    title: 'Universal Research Ethics & Data Access Planning Proforma (Multi-Agency Model)',
    category: 'Universal Planning Proforma',
    description: 'Expansive, end-to-end research planning dossier integrating HRA/REC, CAG Section 251, and Data Access Committee (DAC) requirements. Captures research rationale, lay summary, funding awards, PPIE co-design, external datasets to be imported, granular cohort phenotypes, professional network affiliations, and stakeholder benefit realization pathways.',
    markdownContent: `# Universal Research Ethics & Data Governance Planning Proforma
A comprehensive, multi-agency planning dossier for research protocols accessing population health datasets across safe data intelligence environments.

---

## SECTION 1: STUDY IDENTIFICATION, FUNDING & INVESTIGATOR TEAM

1.1 Study Full Title: [Insert Full Scientific Title, e.g. Evaluating Socioeconomic Disparities in Post-Myocardial Infarction Outcomes: A Multi-Center Longitudinal Linkage Study]
1.2 Short Title / Study Acronym: [e.g. CARDIO-DISPARITY-UK]
1.3 Plain-English Lay Summary (Max 300 words for Public & Patient Consumption):
    [Provide an accessible, non-technical overview explaining: What is the clinical problem? Why is linked patient data essential? What will change for patients or NHS care as a result of this work? Avoid clinical acronyms; write for a general public audience.]
1.4 Research Funding & Grant Award Information:
    - Primary Funding Body / Grant Agency: [e.g. National Institute for Health and Care Research (NIHR) / Medical Research Council (MRC) / Wellcome Trust / British Heart Foundation]
    - Grant / Award Reference Number: [e.g. NIHR-HTA-142890]
    - Total Grant Award (£ GBP): [e.g. £842,500]
    - Funding Duration: [e.g. 36 Months: 01 Oct 2024 to 30 Sep 2027]
    - Funder Type: [X] Non-commercial Public / Charity   [ ] Commercial Industry Sponsored
    - Financial Conflict of Interest Statement: [Confirm no financial incentives tied to study outcomes]
1.5 Target Ethics, Statutory & Data Governance Approval Bodies:
    [X] HRA Research Ethics Committee (NHS REC)
    [X] Confidentiality Advisory Group (CAG Section 251) - for unconsented secondary care linkage
    [X] Data Access Committee (DAC / Institutional Information Governance Panel)
    [X] National Data Opt-Out (NDOO) Exemption / Compliance Verification
1.6 Chief Investigator (CI) & Professional Affiliations:
    - Name: [Prof. / Dr. Jane Doe]
    - Position & Department: [Professor of Clinical Epidemiology, Faculty of Medicine]
    - Sponsoring / Submitting Institution: [Accredited UK University / NHS Foundation Trust Legal Entity]
    - Professional Network Affiliations: [e.g. British Cardiovascular Society (BCS), Royal College of Physicians (RCP), Society for Social Medicine & Population Health, HDR UK Fellow]
    - Statutory Clinical Registration (if applicable): [GMC / NMC / GPhC Registration Number: 1234567]
    - ONS / UKSA Safe Researcher Accreditation Number: [e.g. ONS-SR-994821; Expiry: 14/10/2027]
    - Mandatory NHS Information Governance Certification: [NHS DSPT Certificate / MRC Research Governance, Date: DD/MM/YYYY]
1.7 Co-Investigators, Analysts & Collaborative Consortia:
    - [List all named personnel with institutional affiliations, orcid IDs, Safe Researcher accreditation numbers, and specific analytical responsibilities]
    - Partner Consortia: [e.g. NHS Integrated Care Board (ICB) Data Partnership, HDR UK National Driver Programme]

---

## SECTION 2: CLINICAL RATIONALE, STAKEHOLDER BENEFIT & PPIE CO-DESIGN (CALDICOTT PRINCIPLE 1)

2.1 Scientific Background & Unmet Need:
    [Explain the clinical or epidemiological knowledge gap, population disease burden, and clinical rationale for study]
2.2 Clear Statement of Public & Health System Benefit:
    - Direct Clinical / Health Improvements: [e.g. Identification of clinical touchpoints to reduce 30-day readmissions by 12%]
    - Health Equity & Resource Allocation: [e.g. Optimizing secondary prevention care pathways in high-deprivation areas]
2.3 Benefit Realization Pathways (Categorize Primary Mechanism):
    - [X] **Scientific & Epidemiological Knowledge**: Generating peer-reviewed open-access clinical evidence, risk stratification models, and updating NICE clinical guidelines.
    - [X] **Health System Operational Improvement**: Providing NHS Integrated Care Boards (ICBs) with capacity planning benchmarks, service pathway audits, and hospital bed-day reduction targets.
    - [ ] **Person-Level / Direct Clinical Intervention**: (Note: Observational TRE research rarely feeds into direct individual care; if claimed, specify clinical feedback protocols and GMC duty of care).
2.4 Patient and Public Involvement and Engagement (PPIE) Co-Design:
    - PPIE Advisory Panel Composition: [e.g. 8 patient representatives with lived experience of acute coronary syndrome, recruited via British Heart Foundation Patient Voice and local ICB patient networks].
    - How PPIE Influenced the Protocol: [Detail specific adjustments made following patient feedback, e.g. panel requested explicit inclusion of mental health comorbidity variables and advised on acceptable aggregation levels].
    - Ongoing PPIE Role: [e.g. Co-designing lay summaries, co-presenting webinar findings to community groups, and reviewing candidate airlock publication tables for stigmatization risks].
2.5 Commercial & Secondary Use Restrictions:
    - Affirmation: Research is strictly public interest. Under no circumstances will cohort data or microdata findings be shared with commercial insurers for underwriting, employers for vetting, or credit rating agencies.

---

## SECTION 3: POPULATION COHORT DEFINITIONS & ELIGIBILITY CRITERIA

3.1 Cohort Inclusion Criteria:
    - Age Range: Adults aged >= 18 years at date of index event (binned in 5-year strata for analysis).
    - Clinical Phenotype & Index Diagnosis:
      * Primary Hospital Admission for Acute Coronary Syndrome (ICD-10 codes: I20.0, I21.0-I21.9, I22.0-I22.9)
      * OR verified Primary Care SNOMED CT clinical concept terms (e.g. Concept ID: 22298006 'Myocardial infarction')
    - Time Period / Observation Window:
      * Index Inpatient Window: 01 January 2016 through 31 December 2022
      * Baseline Pre-Index Comorbidity Lookback: 5 years prior to index admission
      * Post-Index Longitudinal Follow-up Horizon: Up to 31 December 2024 or date of death
3.2 Cohort Exclusion Criteria:
    - Non-residents without valid NHS digital service area coverage.
    - Patients with documented historical National Data Opt-Out (NDOO) preference flags at extraction date.
    - Temporary, overseas, or unlinked administrative encounter records.
3.3 Demographic & Social Stratification Definitions:
    - Demographics: Biological sex at birth; age (5-year bands: 18-24, 25-29, 30-34... 85+); self-reported ethnicity (ONS 18+1 category classification collapsed into 5 high-level census groups if cell counts < 10).
    - Socioeconomic Deprivation: Index of Multiple Deprivation (IMD) national deciles (1 = most deprived, 10 = least deprived) derived at Lower Layer Super Output Area (LSOA) level. Individual street postcodes are strictly excluded.
    - Geographic Bounding: Regional NHS Integrated Care Board (ICB) boundaries or Government Office Regions (GOR).

---

## SECTION 4: MULTI-DATASET SPECIFICATION & GRANULAR VARIABLE CATALOG

| Dataset Identifier | Custodian / National Source | Observation Horizon | Granular Variables Requested | Caldicott Principle 3 Justification (Why Necessary & Minimal) |
| :--- | :--- | :--- | :--- | :--- |
| **Dataset A: Secondary Care Inpatient (HES / SUS / SMR01)** | NHS England / NHS Scotland | 2011-01-01 to 2022-12-31 | - Pseudonymised Study ID<br>- Admission Year & Quarter<br>- Length of Stay (days)<br>- Primary ICD-10 diagnosis (3-digit)<br>- Secondary ICD-10 comorbidities (Charlson Index)<br>- OPCS-4 surgical intervention codes<br>- Admission method (elective vs emergency)<br>- Discharge destination (home, care facility, death) | Essential to establish acute index event, procedural revascularisation (PCI/CABG), and major adverse cardiovascular events (MACE). Exact admission dates suppressed; year/quarter suffices. |
| **Dataset B: Primary Care Electronic Health Records (GP Encounters)** | GP Practice Networks / CPRD / QResearch | 2011-01-01 to 2024-12-31 | - Pseudonymised Study ID<br>- Consultation Year & Month<br>- SNOMED CT codes for hypertension, diabetes, smoking status<br>- Systolic / Diastolic Blood Pressure (mmHg)<br>- Body Mass Index (BMI category)<br>- Serum Cholesterol / eGFR lab values (binned) | Required to control for pre-existing baseline metabolic risk factors and secondary prevention follow-up in primary care. Exact clinic appointment timestamps suppressed. |
| **Dataset C: Community Prescribing & Dispensing (ePACT2 / PIS)** | NHS Business Services Authority (NHSBSA) | 2015-01-01 to 2024-12-31 | - Pseudonymised Study ID<br>- BNF Chemical Chapter 2 (Cardiovascular): Statins, ACE inhibitors, Beta-blockers, Dual antiplatelet therapy<br>- Prescription Year & Quarter<br>- Total quantity dispensed | Tracks post-discharge guideline-directed medical therapy compliance. Non-cardiovascular prescription chapters are excluded to enforce data minimisation. |
| **Dataset D: National Mortality Civil Registrations (ONS / NRS)** | Office for National Statistics (ONS) | 2016-01-01 to 2024-12-31 | - Pseudonymised Study ID<br>- Year & Month of Death<br>- Underlying Cause of Death (ICD-10 4-digit)<br>- Contributing Secondary Causes (ICD-10)<br>- Place of Death (Hospital, Care Home, Hospice, Domestic) | Primary clinical endpoint: all-cause mortality and cardiovascular-specific mortality within 30 days, 1 year, and 5 years. Exact date of death suppressed; interval days to death used. |

---

## SECTION 5: EXTERNAL DATASETS TO BE BROUGHT IN (INGRESS PIPELINE)

5.1 External Reference Datasets Requested for Ingress:
    - [e.g. DEFRA Air Quality Urban Ambient Particulate Matter (PM2.5 / NO2) Annual Grids at 1km² resolution]
    - [e.g. ONS Census 2021 Area Classification for Output Areas (OAC) / Rural-Urban Classification]
    - [e.g. Public Health England Active Lives Physical Activity Survey Index]
5.2 Ingress Governance & Copyright Checks:
    - Confirm all external datasets are published under Open Government Licence (OGL v3.0) or possess explicit third-party data licensing agreements.
    - Confirm NO external patient-level microdata containing direct identifiers will be imported without prior DAC and honest broker approval.
    - Aggregation Level: External attributes will be linked strictly at geographic area level (LSOA / MSOA centroid or 1km grid) to prevent triangulated reverse identification.
5.3 Ingress Sanitisation & Inspection Protocol:
    - All incoming external data files pass through the TRE Ingress Airlock to verify checksums (SHA-256), scan for malicious macros, and ensure zero embedded row-level personal data.

---

## SECTION 6: STATUTORY LAWFUL BASIS & CONFIDENTIALITY SAFEGUARDS

6.1 UK General Data Protection Regulation (UK GDPR):
    - Article 6 Condition: Article 6(1)(e) - Necessary for the performance of a task carried out in the public interest.
    - Article 9 Condition (Special Category Health Data): Article 9(2)(j) - Processing is necessary for archiving purposes in the public interest, scientific or historical research purposes in accordance with Section 19 of the Data Protection Act 2018.
6.2 Data Protection Act 2018 (Section 19 Research Safeguards):
    - Confirmation that processing will NOT cause substantial damage or substantial distress to any data subject.
    - Processing will NOT be used to support decisions or measures regarding any specific individual.
    - Technical and organisational safeguards (pseudonymisation, air-gapped enclaves) are actively applied.
6.3 Common Law Duty of Confidentiality (CLDC):
    - Gateway Selected: [ ] Explicit Informed Consent  [X] Section 251 Exemption (NHS Act 2006)
    - If Section 251: Confidentiality Advisory Group (CAG) Reference: [Insert Pending or Approved CAG Ref]
    - The Feasibility / Impracticability Test:
      * Cohort volume (n > 150,000) spans multi-centre hospital episodes over 8 years.
      * High mortality rate (~24% deceased by study end), making individual re-consent impossible.
      * Selection bias: Seeking consent from surviving, contactable patients would systematically under-represent acute, fatal presentations, introducing catastrophic epidemiological bias.
6.4 National Data Opt-Out (NDOO) Policy Compliance:
    - Data custodian applies NHS NDOO algorithm to purge opted-out patient records prior to honest broker linkage and enclave provisioning.

---

## SECTION 7: ENCLAVE TECHNICAL ENVIRONMENT & ACCESS SAFEGUARDS (SAFE SETTING)

7.1 Target Enclave Specification:
    - Accredited Trusted Research Environment (TRE) / Secure Data Environment (SDE) conforming to SATRE v1.1, NHS DSPT, and ISO/IEC 27001.
    - Network Architecture: Zero-Egress VPC; default outbound internet gateway routes permanently severed.
    - Client Boundary: Secure Virtual Desktop Infrastructure (VDI); local file transfer, clipboard copy-paste, and external device mapping permanently disabled.
7.2 Pseudonymisation & Honest Brokerage:
    - Direct identifiers (NHS numbers, full names, addresses) are stripped by custodians before ingest.
    - Linkage performed via salted one-way HMAC tokens generated by an independent honest broker.

---

## SECTION 8: STATISTICAL DISCLOSURE CONTROL (SDC) & AIRLOCK EGRESS AGREEMENT (SAFE OUTPUT)

8.1 Output Checking Standards:
    - Primary Cell Suppression: Any tabular frequency count representing fewer than 10 individuals (k < 10) is masked.
    - Dominance Rule: No single contributing individual or practice may account for >= 80% of any summary value.
    - Secondary (Complementary) Suppression: Neighboring cells are suppressed to prevent row/column subtraction deduction.
    - Graphical Visualisations: Scatter plots must be rendered as 2D hexbins or kernel density contours; individual outlier coordinates are prohibited; survival curves must truncate right-censored tails when at-risk patient numbers fall below 10.
8.2 Two-Person Review Protocol:
    - All candidate outputs undergo automated mathematical rule checks followed by independent inspection by two certified Safe Output Reviewers.

---

## SECTION 9: DISSEMINATION, KNOWLEDGE TRANSLATION & OPEN SCIENCE

9.1 Academic & Clinical Dissemination:
    - Peer-Reviewed Open Access Publications: Findings targeted at leading high-impact clinical and epidemiological journals conforming to UKRI Open Access policies.
    - Clinical Practice Guidelines: Formal synthesis reports submitted to NICE, British Cardiovascular Society, and NHS England Clinical Reference Groups.
9.2 Public & Patient Knowledge Translation:
    - Plain-English Summary Pamphlets: Co-authored with the PPIE Advisory Panel and published on public university and NHS Trust portals.
    - Community Webinars & Interactive Infographics: Hosting accessible public briefings explaining study insights without statistical jargon.
9.3 Code & Methodological Transparency:
    - Analytical Code Release: All data-cleaning scripts, statistical models (R/Python), and SHACL/Rego policy configurations will be deposited in an open GitHub repository under an MIT License (containing zero patient data).
    - Metadata Registry: Study protocol and Data Use Register (DUR) entries registered on the Health Data Research Innovation Gateway (HDR UK Gateway).
9.4 Legal Undertaking:
    - The Chief Investigator and all named researchers formally commit NOT to attempt re-identification, reverse linkage, or unauthorized disclosure under statutory penalties of the Digital Economy Act 2017 Section 67 and the Data Protection Act 2018 Section 171.`
  },
  {
    id: 'tmpl-iras-rec',
    title: 'HRA IRAS & NHS REC Protocol Schedule: Information Governance & Participant Safeguards',
    category: 'REC / IRAS',
    description: 'Specialized ethics protocol schedule formatted for IRAS submissions, addressing NHS REC Criterion 5.1 (Data Protection & Privacy), public interest justification, and participant safeguards.',
    markdownContent: `# IRAS Research Ethics Protocol Schedule: Information Governance & Participant Privacy
Formatted for HRA Standard Operating Procedures & NHS Research Ethics Committee (REC) Review.

---

## 1. ADMINISTRATIVE & REGULATORY DETAILS
- IRAS Project ID: [6-digit IRAS Identifier]
- Full Study Title: [Full Protocol Title]
- Chief Investigator: [Name, Professional GMC/NMC/HCPC Registration, Institution]
- Sponsor Organisation: [NHS Trust / Academic Institution Legal Entity]
- Lead Data Protection Officer (DPO): [Name and Contact Email]

## 2. SCIENTIFIC RELEVANCE & PATIENT ENGAGEMENT
2.1 Public Benefit Statement: Detail why this study matters to patients, NHS service delivery, and public health.
2.2 Patient & Public Involvement (PPIE):
    - Describe how patient representatives and public advisory panels were consulted on data usage, cohort selection, and privacy acceptability.
    - Summarize feedback received from PPIE panels regarding the use of unconsented retrospective data.

## 3. DATA PRIVACY & LAWFUL GROUNDS
3.1 UK GDPR Processing Bases:
    - Article 6(1)(e): Public Task / Scientific Research.
    - Article 9(2)(j): Special Category Health Data for Scientific Research under DPA 2018 Schedule 1 Part 1 Section 4.
3.2 Data Protection Impact Assessment (DPIA):
    - Confirmed: Institutional DPIA completed and signed off by DPO on [Date].
    - High-risk processing mitigations: Salted pseudonymisation, zero-egress enclaves, and strict output airlock verification.

## 4. PARTICIPANT RE-IDENTIFICATION RISK MITIGATION
4.1 De-identification Standard: Conforms to ICO Anonymisation Code of Practice and Caldicott Principles 2 & 3.
4.2 Linkage Safeguards: Honest broker architecture; project-specific linkage keys prevent multi-database triangulated tracing.
4.3 Transparency: Study summary published on public research registries (e.g. ClinicalTrials.gov, HRA Research Summaries).`
  },
  {
    id: 'tmpl-cag-s251',
    title: 'Confidentiality Advisory Group (CAG) Section 251 Exemption & Feasibility Dossier',
    category: 'CAG Section 251',
    description: 'Detailed statutory application dossier for the Confidentiality Advisory Group, establishing the legal impracticability of consent, cohort scale, risk of survival bias, and public interest proportionality under NHS Act 2006 s251.',
    markdownContent: `# Confidentiality Advisory Group (CAG) Section 251 Application Dossier
Application under Regulation 5 of the Health Service (Control of Patient Information) Regulations 2002.

---

## 1. APPLICANT & STATUTORY GATEWAY
- Applicant: [Chief Investigator, Department, Institutional Host]
- Statutory Basis: Section 251 of the National Health Service Act 2006.
- Purpose: Medical research in the public interest where patient consent is impracticable.

## 2. THE FEASIBILITY & IMPRACTICABILITY TEST (WHY CONSENT CANNOT BE OBTAINED)
2.1 Cohort Magnitude: [e.g. 185,000 patient episodes across 42 acute hospital trusts].
2.2 Historical Cohort & Deceased Rate:
    - The cohort spans historical records from 2012 to 2022.
    - An estimated [32]% of the target cohort are deceased, making re-consent legally and factually impossible.
2.3 Fatal Epidemiological Selection Bias:
    - Patients presenting with severe, acute, or sudden-onset conditions have high early mortality and morbidity.
    - Requiring active opt-in consent would disproportionately skew the cohort toward surviving, healthier, or less socioeconomically deprived patients, invalidating research generalisability.
2.4 Patient Distress & Clinical Burden:
    - Contacting hundreds of thousands of individuals or bereaved relatives years after acute emergency admissions causes unwarranted distress.

## 3. PUBLIC INTEREST & PROPORTIONALITY
3.1 Direct Health System Impact:
    - Quantify the clinical value to NHS clinical guidelines, drug safety, or service configuration.
3.2 Proportionality Assessment:
    - The intrusion into patient privacy is minimal because researchers never view names, NHS numbers, or full addresses; analysis takes place inside an accredited, air-gapped secure data environment.

## 4. NATIONAL DATA OPT-OUT (NDOO) & PATIENT TRANSPARENCY
4.1 NDOO Application:
    - Data custodians will filter out all patients registered with the NHS National Data Opt-Out prior to dataset extraction.
4.2 Fair Processing / Transparency:
    - Project transparency notices will be displayed on participating NHS Trust websites with dedicated contact points for opt-out queries.`
  },
  {
    id: 'tmpl-dac-schedule',
    title: 'Data Access Committee (DAC) Cohort Minimisation & Data Sharing Schedule',
    category: 'Data Access Committee (DAC)',
    description: 'Organization-agnostic operational schedule for institutional Data Access Committees (DAC) and Information Governance Review Boards. Specifies exact clinical tables, column exclusions, temporal windows, and researcher credentials.',
    markdownContent: `# Data Access Committee (DAC) Variable Minimisation & Cohort Schedule
Institutional Review & Data Sharing Approval Specification.

---

## 1. SAFE PERSON & ACCREDITATION AUDIT
- Lead Analyst: [Name, Institutional Title]
- Safe Researcher Accreditation: [Accreditation Token & Expiry Date]
- Annual Information Governance Training: [NHS DSPT / MRC Module, Certificate Verified]
- Data Sharing Agreement (DSA): [Contract Ref executed between Data Custodian and Research Institution]

## 2. COHORT PHENOTYPE & TEMPORAL HORIZON
- Index Diagnosis Codes: [ICD-10 / SNOMED CT Codes]
- Inclusion Window: [Start Date] to [End Date]
- Sample Size Estimated: [N = XX,XXX]

## 3. VARIABLE EXCLUSIONS & DATA MINIMISATION AUDIT
3.1 Direct Identifiers: ALL EXCLUDED (Names, NHS numbers, telephone numbers, postal addresses, email, hospital local numbers).
3.2 Granular Date Reductions:
    - Exact dates of birth reduced to: 5-year age bands or year of birth.
    - Exact dates of admission/discharge reduced to: Year and month, or relative interval days (e.g. Day 0 to Day 14).
3.3 Geography Reductions:
    - Postcodes reduced to: Lower Layer Super Output Area (LSOA) IMD deciles; no coordinates or street names.

## 4. AIRLOCK EXPORT SANCTIONS & RE-IDENTIFICATION PENALTIES
- The applicant agrees that any attempt to reverse pseudonymisation, link unapproved external tables, or bypass airlock checks constitutes a breach of contract and criminal offence under Section 171 of the Data Protection Act 2018 and Section 67 of the Digital Economy Act 2017.`
  }
];

export const IGQuickGuide: React.FC<IGQuickGuideProps> = ({
  onNavigateToGlossary,
  onNavigateToSection,
  onNavigateToGovernAssure,
  onNavigateToQuiz,
  onNavigateToGraph,
  onNavigateToResources
}) => {
  const [activeTab, setActiveTab] = useState<'handbook' | 'schematic' | 'glossary' | 'templates' | 'quiz'>('handbook');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(HANDBOOK_CHAPTERS[0].id);
  const [selectedSchematicNode, setSelectedSchematicNode] = useState<SchematicNode>(SCHEMATIC_NODES[0]);

  // Glossary search & filter & expansion
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<
    'All' | 'Governance & Frameworks' | 'Standards & Clinical Safety' | 'Governance Maturity Model' | 'Disclosure Control (SDC)' | 'AI & Autonomous Agents'
  >('All');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const toggleCardExpanded = (termId: string) => {
    setExpandedCardIds((prev) => ({ ...prev, [termId]: !prev[termId] }));
  };

  // Template copy state
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const handleCopyTemplate = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2000);
  };

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Floating tooltip state for technical terms
  const [activeTooltipTerm, setActiveTooltipTerm] = useState<GlossaryTerm | null>(null);

  // Five Safes filter for Schematic
  const [schematicSafesFilter, setSchematicSafesFilter] = useState<
    'All' | 'Safe Data' | 'Safe Projects' | 'Safe People' | 'Safe Settings' | 'Safe Outputs'
  >('All');

  // Cytoscape ref
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const selectedChapter = HANDBOOK_CHAPTERS.find((c) => c.id === selectedChapterId) || HANDBOOK_CHAPTERS[0];

  // Scan text for known glossary terms / acronyms (e.g. AES-256, HMAC, Statbarn, DPIA, etc.)
  const renderGlossaryBadges = (rawText: string, keyPrefix: string | number = 'term') => {
    if (!rawText) return rawText;

    // Sort terms by length descending so longer compound terms match first
    const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
    const termNames = sortedTerms.map((t) => t.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const acronyms = sortedTerms
      .filter((t) => t.acronym)
      .map((t) => t.acronym!.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const combinedTokens = Array.from(new Set([...termNames, ...acronyms]));

    const regex = new RegExp(`\\b(${combinedTokens.join('|')})\\b`, 'i');
    const pieces = rawText.split(regex);

    if (pieces.length === 1) return rawText;

    return pieces.map((piece, idx) => {
      const matchedTerm = sortedTerms.find(
        (t) =>
          t.term.toLowerCase() === piece.toLowerCase() ||
          (t.acronym && t.acronym.toLowerCase() === piece.toLowerCase())
      );

      if (matchedTerm) {
        return (
          <span key={`${keyPrefix}-${idx}`} className="relative inline-block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigateToGlossary) {
                  onNavigateToGlossary(matchedTerm.id);
                } else {
                  setSelectedGlossaryCategory('All');
                  setSearchTerm(matchedTerm.term);
                  setActiveTab('glossary');
                }
              }}
              onMouseEnter={() => setActiveTooltipTerm(matchedTerm)}
              className="inline-flex items-baseline text-cyan-300 font-semibold underline decoration-cyan-400/60 decoration-1 underline-offset-2 hover:text-cyan-100 hover:decoration-cyan-300 hover:bg-cyan-950/70 px-0.5 rounded transition-colors cursor-pointer"
              title={`Inspect '${matchedTerm.term}' in the Information Governance Dictionary`}
            >
              {piece}
            </button>
          </span>
        );
      }
      return piece;
    });
  };

  // Filter glossary specifically for IG non-technical terms, strictly sorted alphabetically
  const igFilteredGlossary = GLOSSARY_TERMS.filter((term) => {
    // Strictly exclude technical code/ontology/developer categories
    if (
      term.category === 'Semantic Web & Ontologies' ||
      term.category === 'Policy Enforcement & Security' ||
      term.category === 'Operations & Testing'
    ) {
      return false;
    }
    const matchesCategory = selectedGlossaryCategory === 'All' || term.category === selectedGlossaryCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.acronym && term.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      term.shortDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.fullDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));

  // Cytoscape initialization for Schematic
  useEffect(() => {
    if (activeTab !== 'schematic' || !graphContainerRef.current) return;

    const elements = [
      ...SCHEMATIC_NODES.map((node) => ({
        data: {
          id: node.id,
          label: node.label,
          color: node.color,
          nodeData: node
        }
      })),
      ...SCHEMATIC_EDGES.map((edge) => ({
        data: {
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          label: edge.label
        }
      }))
    ];

    const cy = cytoscape({
      container: graphContainerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': 'data(color)',
            color: '#f8fafc',
            'text-valign': 'bottom',
            'text-margin-y': 7,
            'font-size': '11px',
            'font-weight': 600,
            'text-background-color': '#020617',
            'text-background-opacity': 0.85,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            width: 38,
            height: 38,
            'border-width': 2,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            width: 46,
            height: 46
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#475569',
            'target-arrow-color': '#38bdf8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#94a3b8',
            'text-rotation': 'autorotate',
            'text-background-color': '#0f172a',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            'arrow-scale': 1.1
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 40,
        spacingFactor: 1.3
      }
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data('nodeData') as SchematicNode;
      if (nodeData) {
        setSelectedSchematicNode(nodeData);
      }
    });

    cy.on('mouseover', 'node', () => {
      if (graphContainerRef.current) {
        graphContainerRef.current.style.cursor = 'pointer';
      }
    });

    cy.on('mouseout', 'node', () => {
      if (graphContainerRef.current) {
        graphContainerRef.current.style.cursor = 'default';
      }
    });

    cyRef.current = cy;

    // Highlight the selected node initially
    if (selectedSchematicNode) {
      const initialNode = cy.$id(selectedSchematicNode.id);
      if (initialNode && initialNode.length > 0) {
        initialNode.select();
      }
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [activeTab]);

  const handleSelectSchematicStage = (node: SchematicNode) => {
    setSelectedSchematicNode(node);
    if (cyRef.current) {
      cyRef.current.nodes().unselect();
      const cyNode = cyRef.current.$id(node.id);
      if (cyNode && cyNode.length > 0) {
        cyNode.select();
        cyRef.current.animate({
          center: { eles: cyNode },
          zoom: 1.15,
          duration: 300
        });
      }
    }
  };

  const handleQuizAnswer = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    IG_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. HERO BANNER - Unified Deep Navy & Turquoise Card */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-teal-300 bg-[#07192f] px-2.5 py-1 rounded border border-teal-500/40 flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A389]" />
              <span>Foundations Reference Guide</span>
            </span>
            <span className="text-xs font-mono text-slate-300 bg-[#07192f] px-2.5 py-1 rounded border border-cyan-900/60 font-semibold">
              UK GDPR · Caldicott Principles 1–8 · NHS Act 2006 s251 · DEA 2017 · EHDS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Foundations: Information Governance &amp; Statutory Desk Reference
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A clear, jargon-free starting point for Caldicott Guardians, Data Protection Officers, ethics committees, clinical researchers, and interested members of the public—explaining how legal safeguards, the Five Safes, and Statbarn output checks keep data secure.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            {onNavigateToGovernAssure && (
              <button
                onClick={onNavigateToGovernAssure}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-2 shadow-md shadow-teal-500/20 transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4 text-slate-950" />
                <span>Open Scenario Evaluator &amp; Assurance Engine</span>
              </button>
            )}
            {onNavigateToResources && (
              <button
                onClick={onNavigateToResources}
                className="px-4 py-2.5 rounded-xl bg-[#07192f] hover:bg-[#123154] text-cyan-200 border border-cyan-500/40 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Browse Further Resources</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-cyan-900/40 pb-2 overflow-x-auto">
        {[
          { id: 'handbook', label: '1. Foundations Guide', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'schematic', label: '2. Governance Decision Schematic', icon: <Network className="w-4 h-4" /> },
          { id: 'glossary', label: '3. Information Governance Glossary', icon: <FileText className="w-4 h-4" /> },
          { id: 'templates', label: '4. Researcher Governance Templates', icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'quiz', label: '5. IG Knowledge Check', icon: <HelpCircle className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#00A389] text-white shadow-md shadow-teal-950/40 font-bold border border-teal-400'
                : 'bg-[#0c2340] border border-cyan-900/50 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-[#112f54]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: FOUNDATIONS GUIDE */}
      {activeTab === 'handbook' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chapter Selector (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
              Foundations Chapters:
            </span>
            <div className="space-y-2">
              {HANDBOOK_CHAPTERS.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0c2340] border-2 border-[#00A389] text-white shadow-lg shadow-teal-950/50'
                        : 'bg-slate-950/80 border-cyan-900/40 text-slate-300 hover:bg-[#0c2340] hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-teal-400">Chapter {ch.number}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07192f] border border-cyan-900/60 text-slate-300 font-semibold">
                        {ch.badge.split('&')[0]}
                      </span>
                    </div>
                    <strong className="text-sm font-bold block text-white mt-1">{ch.title}</strong>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">{ch.shortDesc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Details (Right 8 cols) */}
          <div className="lg:col-span-8 bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
            <div className="space-y-2 border-b border-cyan-900/60 pb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-300 bg-[#07192f] px-2.5 py-0.5 rounded border border-teal-500/40">
                  Chapter {selectedChapter.number}
                </span>
                <span className="text-xs font-mono text-cyan-300 font-medium">{selectedChapter.badge}</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{selectedChapter.title}</h2>
              <p className="text-xs text-cyan-300 font-mono font-medium">Statutory Authority: {renderGlossaryBadges(selectedChapter.statutoryBasis, 'stat-basis')}</p>
            </div>

            {/* Key Safeguards Callout - Dark Navy & Turquoise Container */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00A389]" />
                <span>Foundational Information Governance Safeguards &amp; Core Rules</span>
              </h3>
              <div className="space-y-2">
                {selectedChapter.keySafeguards.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-teal-500/40 flex items-start gap-3 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#00A389] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">{renderGlossaryBadges(item, `sg-${idx}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Human Workflow - Deep Slate Box with Cyan Accents */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>Procedural Approval Hand-offs</span>
              </h3>
              <div className="space-y-2.5">
                {selectedChapter.workflowSteps.map((wf, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-[#1b3f68] space-y-1 shadow-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-cyan-200 text-xs font-bold">{renderGlossaryBadges(wf.title, `wft-${idx}`)}</strong>
                      <span className="text-[10px] font-mono text-cyan-300 bg-[#07192f] px-2 py-0.5 rounded border border-cyan-700/60 font-semibold">
                        Role: {wf.responsibleParty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{renderGlossaryBadges(wf.description, `wfd-${idx}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Callout - Amber Border on Dark Slate */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <strong className="text-amber-400 font-mono uppercase text-[10px] block tracking-wider font-bold">
                  Caldicott &amp; DPO Executive Directive:
                </strong>
                <p className="text-amber-200 leading-relaxed italic font-medium">{renderGlossaryBadges(selectedChapter.executiveCallout, 'callout')}</p>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE EXECUTIVE DESK REFERENCE: 4 FOUNDATIONAL PILLARS (COL-SPAN 12) */}
          <div className="lg:col-span-12 bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 mt-4 shadow-xl text-white">
            <div className="border-b border-cyan-900/60 pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider bg-[#07192f] px-2.5 py-0.5 rounded border border-teal-500/40">
                  Comprehensive Desk Reference
                </span>
                <span className="text-xs font-mono text-slate-400 font-medium">Statutory &amp; Ethical Foundations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Information Governance Principles &amp; Privacy Safeguards Reference
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                An authoritative overview of UK health data law, the 8 Caldicott Principles, the Five Safes framework, and ethical governance invariants for clinical researchers, IG leads, and review panels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pillar 1: The 8 Caldicott Principles */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-purple-900/60 space-y-3 flex flex-col justify-between shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                    <Scale className="w-4 h-4 text-purple-400" />
                    <span>The 8 Caldicott Principles</span>
                  </div>
                  <h4 className="text-sm font-bold text-purple-200">National Data Guardian Baseline</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                    <li><strong className="text-purple-300">1. Justify Purpose:</strong> Every proposed use must be formally justified.</li>
                    <li><strong className="text-purple-300">2. Essential PCD Only:</strong> Do not use personal confidential data unless essential.</li>
                    <li><strong className="text-purple-300">3. Minimise Data:</strong> Use the strict minimum necessary columns and rows.</li>
                    <li><strong className="text-purple-300">4. Strict Need-to-Know:</strong> Access granted only to those who require it.</li>
                    <li><strong className="text-purple-300">5. Awareness:</strong> All handlers must understand legal duties.</li>
                    <li><strong className="text-purple-300">6. Comply with Law:</strong> Every processing step must be lawful.</li>
                    <li><strong className="text-purple-300">7. Duty to Share:</strong> Sharing for care and public health is vital.</li>
                    <li><strong className="text-purple-300">8. Patient Transparency:</strong> Inform citizens how data is processed.</li>
                  </ul>
                </div>
              </div>

              {/* Pillar 2: Five Safes Framework - Turquoise Accent */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-teal-500/40 space-y-3 flex flex-col justify-between shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider font-mono">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Five Safes Architecture</span>
                  </div>
                  <h4 className="text-sm font-bold text-teal-200">Safe Data Intelligence Model</h4>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li><strong className="text-teal-300">Safe People:</strong> {renderGlossaryBadges('Vetted researchers with annual accredited Information Governance training and institutional sponsorship.', 'fs-1')}</li>
                    <li><strong className="text-teal-300">Safe Projects:</strong> {renderGlossaryBadges('Protocols evaluated by HRA Research Ethics Committees for valid public interest benefit.', 'fs-2')}</li>
                    <li><strong className="text-teal-300">Safe Settings:</strong> {renderGlossaryBadges('Air-gapped, zero-egress enclaves protected by AES-256 encryption where clipboard and outbound internet are severed.', 'fs-3')}</li>
                    <li><strong className="text-teal-300">Safe Data:</strong> {renderGlossaryBadges('Direct identifiers expunged at source; linkage via salted one-way HMAC tokens.', 'fs-4')}</li>
                    <li><strong className="text-teal-300">Safe Outputs:</strong> {renderGlossaryBadges('Mandatory Statistical Disclosure Control (k >= 10), Statbarn classification, and two-person airlock reviews.', 'fs-5')}</li>
                  </ul>
                </div>
              </div>

              {/* Pillar 3: Lawful Basis & Statutory Exemptions - Deep Navy / Sky */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-sky-800/60 space-y-3 flex flex-col justify-between shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider font-mono">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>Lawful Grounds &amp; Gateway</span>
                  </div>
                  <h4 className="text-sm font-bold text-sky-200">UK GDPR, Section 251 &amp; FOIA 2000</h4>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li><strong className="text-sky-300">UK GDPR Article 6(1)(e) &amp; 9(2)(j):</strong> Public interest task paired with DPA 2018 Section 19 research safeguards.</li>
                    <li><strong className="text-sky-300">NHS Act 2006 s251:</strong> Statutory exemption advised by the Confidentiality Advisory Group (CAG) when direct consent is impracticable.</li>
                    <li><strong className="text-sky-300">National Data Opt-Out:</strong> Citizens who register their opt-out preference are systematically purged prior to analytical extraction.</li>
                    <li><strong className="text-sky-300">Freedom of Information Act 2000:</strong> {renderGlossaryBadges('Proactive FOI publication schemes (s19) expose approved governance charters and aggregate outputs while protecting confidential records under s40(2) personal data, s41 confidentiality, and s22 future publication exemptions.', 'foi-pillar')}</li>
                  </ul>
                </div>
              </div>

              {/* Pillar 4: AI & Autonomous Agent Governance - Warm Ochre */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-600/40 space-y-3 flex flex-col justify-between shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>AI &amp; Autonomous Agents</span>
                  </div>
                  <h4 className="text-sm font-bold text-amber-200">Stanford UIT Doctrine</h4>
                  <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li><strong className="text-amber-300">Non-Personhood Doctrine:</strong> AI algorithms possess no legal personhood, cannot sign undertakings, and can NEVER be &ldquo;Safe People&rdquo;.</li>
                    <li><strong className="text-amber-300">Human Sponsor Liability:</strong> Every automated AI workload must be legally bound to an accredited human researcher bearing statutory liability.</li>
                    <li><strong className="text-amber-300">Read-Only Tools:</strong> AI agents are restricted to read-only analytical queries; mutative database actions are barred.</li>
                    <li><strong className="text-amber-300">Automated Token Revocation:</strong> Agent access tokens must be revocable near-instantaneously without long-lived credentials.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCHEMATIC */}
      {activeTab === 'schematic' && (
        <div className="space-y-6">
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 space-y-4 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/60 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold text-teal-300 bg-teal-950/80 border border-teal-700/60 px-2 py-0.5 rounded uppercase tracking-wider">
                    Graph 1 of 3 · Human Governance Workflow &amp; Five Safes Stage Map
                  </span>
                  {onNavigateToGraph && (
                    <button
                      onClick={onNavigateToGraph}
                      className="text-[11px] font-semibold text-cyan-300 hover:text-white underline decoration-cyan-500/60 underline-offset-2 cursor-pointer transition-colors"
                    >
                      Need rule-to-code internals? Switch to Ontology Topology Graph (Graph 2) &rarr;
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  End-to-End Information Governance &amp; Ethics Schematic
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Click any stage node below to inspect statutory hand-offs (including CAG, REC &amp; Statbarn outputs), responsible roles, and privacy safeguards.
                </p>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/40 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2 shadow-xs">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Informational Architecture Reference:</strong> This schematic is provided for educational and illustrative purposes. Individual NHS Trusts, research institutes, and universities maintain differing local governance policies, committee designations (e.g. delegated Caldicott panels or local data access boards), and implementation workflows.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
                  className="p-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-cyan-300 border border-cyan-900/60 text-xs cursor-pointer transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
                  className="p-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-cyan-300 border border-cyan-900/60 text-xs cursor-pointer transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => cyRef.current?.fit(undefined, 30)}
                  className="p-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-cyan-300 border border-cyan-900/60 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Reset Fit"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Five Safes Framework Full Coverage Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-teal-500/40 space-y-2.5 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <strong className="text-white text-xs font-bold">Five Safes Framework End-to-End Representation:</strong>
                  <span className="text-[11px] text-slate-300">All 5 Safes mapped systematically across the 10 stages</span>
                </div>
                <div className="text-[10px] font-mono text-cyan-300">
                  Select a Safe dimension to filter stages
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { pillar: 'All', label: 'All 10 Stages', color: 'bg-slate-800 border-slate-600 text-white' },
                  { pillar: 'Safe Data', label: '1. Safe Data (Stages 1-2)', color: 'bg-cyan-950 border-cyan-600 text-cyan-300' },
                  { pillar: 'Safe Projects', label: '2. Safe Projects (Stages 3-4)', color: 'bg-emerald-950 border-emerald-600 text-emerald-300' },
                  { pillar: 'Safe People', label: '3. Safe People (Stage 5)', color: 'bg-sky-950 border-sky-600 text-sky-300' },
                  { pillar: 'Safe Settings', label: '4. Safe Settings (Stages 6-7)', color: 'bg-purple-950 border-purple-600 text-purple-300' },
                  { pillar: 'Safe Outputs', label: '5. Safe Outputs (Stages 8-10)', color: 'bg-amber-950 border-amber-600 text-amber-300' },
                ].map((item) => {
                  const isActive = schematicSafesFilter === item.pillar;
                  return (
                    <button
                      key={item.pillar}
                      onClick={() => {
                        setSchematicSafesFilter(item.pillar as any);
                        if (item.pillar !== 'All') {
                          const firstMatching = SCHEMATIC_NODES.find((n) => n.fiveSafesPillar === item.pillar);
                          if (firstMatching) handleSelectSchematicStage(firstMatching);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-cyan-400 shadow-md font-bold opacity-100 scale-102'
                          : 'opacity-75 hover:opacity-100 hover:scale-[1.01]'
                      } ${item.color}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pipeline Stage Quick Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>SELECT PIPELINE STAGE (1–10)</span>
                <span className="text-teal-400">Click a stage chip or canvas node to inspect full governance specifications</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-900/60">
                {SCHEMATIC_NODES.filter((node) => schematicSafesFilter === 'All' || node.fiveSafesPillar === schematicSafesFilter).map((node) => {
                  const isSelected = selectedSchematicNode?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => handleSelectSchematicStage(node)}
                      className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md'
                          : 'bg-slate-950/70 hover:bg-[#07192f] text-slate-300 border-cyan-900/50 hover:border-cyan-700/60'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: node.color, color: '#ffffff' }}
                      >
                        {node.stepNumber}
                      </span>
                      <span className="truncate max-w-[130px] font-medium">{node.label}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-teal-300">
                        {node.fiveSafesPillar.replace('Safe ', '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cytoscape Canvas */}
            <div
              ref={graphContainerRef}
              className="w-full h-[450px] bg-slate-950 rounded-xl border border-cyan-900/60 shadow-inner"
            />

            {/* Inspected Node Card with Detailed Statutory, Roles, and Safeguards */}
            {selectedSchematicNode && (
              <div className="rounded-2xl bg-slate-950/95 border border-cyan-500/50 p-5 sm:p-6 space-y-5 shadow-2xl">
                {/* Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyan-900/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wide text-white"
                        style={{ backgroundColor: selectedSchematicNode.color }}
                      >
                        Stage {selectedSchematicNode.stepNumber} of 10
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-teal-950/90 border border-teal-600/80 text-[10px] font-mono font-bold text-teal-300 uppercase">
                        5 Safes: {selectedSchematicNode.fiveSafesPillar}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/80 text-[10px] font-mono font-semibold text-cyan-300 uppercase">
                        {selectedSchematicNode.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                        {selectedSchematicNode.statutoryRole}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <span>{selectedSchematicNode.label}</span>
                    </h3>
                  </div>

                  {selectedSchematicNode.handbookChapterRef && (
                    <button
                      onClick={() => {
                        setSelectedChapterId(selectedSchematicNode.handbookChapterRef);
                        setActiveTab('handbook');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/90 hover:bg-cyan-900/90 text-cyan-200 border border-cyan-700/80 text-xs font-semibold cursor-pointer transition-colors shrink-0 shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedSchematicNode.handbookChapterTitle}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Narrative Summary */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border-l-4 border-l-cyan-400 border border-cyan-950 text-xs text-slate-200 leading-relaxed font-medium">
                  {renderGlossaryBadges(selectedSchematicNode.shortDesc, 'node-desc')}
                </div>

                {/* The 3 Core Information Governance Inspection Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pillar 1: Statutory Hand-Offs & Legal Gateways */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-sky-800/40 space-y-3 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider font-mono border-b border-sky-900/50 pb-2">
                        <Scale className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>Statutory Hand-Offs</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {selectedSchematicNode.statutoryHandoffs.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{renderGlossaryBadges(item, `stat-${idx}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 text-[10px] font-mono text-sky-400/80 uppercase">
                      Legal Compliance Gate
                    </div>
                  </div>

                  {/* Pillar 2: Responsible Roles & Review Panels */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-teal-800/40 space-y-3 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider font-mono border-b border-teal-900/50 pb-2">
                        <Users className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Responsible Roles</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {selectedSchematicNode.responsibleRoles.map((role, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <Shield className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                            <span className="font-medium text-slate-100">{renderGlossaryBadges(role, `role-${idx}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 text-[10px] font-mono text-teal-400/80 uppercase">
                      Governance Accountability
                    </div>
                  </div>

                  {/* Pillar 3: Privacy Safeguards & Technical Controls */}
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-800/40 space-y-3 shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono border-b border-emerald-900/50 pb-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Privacy Safeguards</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-slate-200">
                        {selectedSchematicNode.privacySafeguards.map((safeguard, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{renderGlossaryBadges(safeguard, `priv-${idx}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 text-[10px] font-mono text-emerald-400/80 uppercase">
                      Technical Assurance
                    </div>
                  </div>
                </div>

                {/* Operational Actions & Hand-off Lineage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Operational Actions */}
                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-cyan-950 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                      Execution &amp; Operational Actions
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedSchematicNode.operationalActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{renderGlossaryBadges(action, `act-${idx}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lineage & Hand-offs */}
                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-cyan-950 space-y-2 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                      Governance Hand-off Lineage
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-slate-300">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-300 shrink-0">
                          INPUT
                        </span>
                        <span>{renderGlossaryBadges(selectedSchematicNode.upstreamHandoff, 'up-handoff')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-300">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-emerald-300 shrink-0">
                          OUTPUT
                        </span>
                        <span>{renderGlossaryBadges(selectedSchematicNode.downstreamHandoff, 'down-handoff')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/60 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                Authoritative Desk Dictionary
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Information Governance &amp; Ethics Terminology
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search terms, DPIA, S251..."
                className="w-full bg-slate-950 border border-cyan-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-xs"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {(['All', 'Governance & Frameworks', 'Standards & Clinical Safety', 'Governance Maturity Model', 'Disclosure Control (SDC)', 'AI & Autonomous Agents'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGlossaryCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer font-medium ${
                  selectedGlossaryCategory === cat
                    ? 'bg-[#00A389] text-white font-bold shadow-md shadow-teal-950/40 border border-teal-400'
                    : 'bg-[#07192f] text-slate-300 hover:text-white border border-[#1b3f68]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Term Cards Grid with Expandable Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {igFilteredGlossary.map((term) => {
              const isExpanded = !!expandedCardIds[term.id];

              return (
                <div
                  key={term.id}
                  className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3 hover:border-cyan-500/40 transition-all shadow-md text-slate-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm font-bold">{term.term}</strong>
                        {term.acronym && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07192f] border border-teal-500/40 text-teal-300 font-bold">
                            {term.acronym}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase block font-semibold">{term.category}</span>
                    </div>

                    <button
                      onClick={() => toggleCardExpanded(term.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#07192f] hover:bg-[#123154] text-teal-300 border border-[#1b3f68] text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand full explanation'}
                    >
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{term.shortDefinition}</p>

                  {/* Expanded Section with Statutory Authority & Safeguards */}
                  {isExpanded && (
                    <div className="space-y-3 pt-3 border-t border-cyan-900/50 text-xs animate-in fade-in duration-150">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                          Plain-Language Explanation:
                        </span>
                        <p className="text-slate-200 leading-relaxed bg-[#07192f] p-3 rounded-lg border border-[#1b3f68] whitespace-pre-line">
                          {term.fullDefinition}
                        </p>
                      </div>

                      {term.statutoryBasis && (
                        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-sky-800/60 text-[11px] text-sky-200">
                          <strong className="block font-mono text-[10px] uppercase text-sky-400 font-bold">Statutory / Regulatory Authority:</strong>
                          <span>{term.statutoryBasis}</span>
                        </div>
                      )}

                      {term.governanceSafeguards && term.governanceSafeguards.length > 0 && (
                        <div className="space-y-1.5">
                          <strong className="block font-mono text-[10px] uppercase text-teal-300 font-bold">Key Governance Safeguards:</strong>
                          <ul className="space-y-1">
                            {term.governanceSafeguards.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A389] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {term.externalUrl && (
                        <div className="pt-2 flex items-center justify-between">
                          <a
                            href={term.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-teal-300 hover:text-white font-semibold bg-[#07192f] hover:bg-[#113358] px-3 py-1.5 rounded-lg border border-teal-500/40 transition-colors"
                          >
                            <span>Official Statutory Standard / Resource</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              Related: {term.relatedTerms.slice(0, 2).join(', ')}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {!isExpanded && (
                    <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Click Details for statutory authority &amp; safeguards</span>
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <span>Related: {term.relatedTerms.slice(0, 2).join(', ')}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: RESEARCHER GOVERNANCE TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
          <div className="border-b border-cyan-900/60 pb-4 space-y-1">
            <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
              Practitioner Desk Toolkit
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Researcher Governance &amp; Ethics Submission Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Standard, copyable application templates addressing UK Health Research Authority (HRA), Research Ethics Committee (REC), Section 251 CAG, and institutional Data Access Committee (DAC) requirements.
            </p>
          </div>

          <div className="space-y-6">
            {RESEARCHER_GOVERNANCE_TEMPLATES.map((tmpl) => {
              const isCopied = copiedTemplateId === tmpl.id;

              return (
                <div key={tmpl.id} className="p-6 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-4 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/40 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07192f] border border-teal-500/40 text-teal-300 font-bold uppercase">
                          {tmpl.category}
                        </span>
                        <h3 className="text-base font-bold text-white">{tmpl.title}</h3>
                      </div>
                      <p className="text-xs text-slate-300">{tmpl.description}</p>
                    </div>

                    <button
                      onClick={() => handleCopyTemplate(tmpl.id, tmpl.markdownContent)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                        isCopied
                          ? 'bg-[#00A389] text-white shadow-md'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Template Markdown'}</span>
                    </button>
                  </div>

                  <pre className="p-4 bg-[#07192f] border border-[#1b3f68] rounded-lg font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed max-h-72">
                    <code>{tmpl.markdownContent}</code>
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/60 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                Self-Assessment
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Information Governance &amp; Ethics Knowledge Check
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                5 scenario questions testing knowledge of UK GDPR, Caldicott Principles, SDC thresholds, and Section 251.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onNavigateToQuiz && (
                <button
                  onClick={() => onNavigateToQuiz('Five Safes & Governance')}
                  className="px-4 py-2 rounded-xl bg-[#07192f] hover:bg-[#123154] text-cyan-300 border border-cyan-700/60 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Switch to the full technical 30+ question exam engine"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Launch Full Technical Quiz Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {quizSubmitted && (
                <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-teal-500/40">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm text-white">
                    Score: {calculateScore()} / {IG_QUIZ_QUESTIONS.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {IG_QUIZ_QUESTIONS.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/40 space-y-3 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <strong className="text-sm text-white font-bold">
                      {qIdx + 1}. {q.question}
                    </strong>
                    <span className="text-[10px] font-mono text-cyan-300 shrink-0 bg-[#07192f] px-2 py-0.5 rounded border border-cyan-900/60 font-semibold">
                      {q.statutoryReference}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-[#07192f] border-[#1b3f68] text-slate-200 hover:bg-[#123154]';
                      if (selectedOpt === optIdx) {
                        btnStyle = 'bg-teal-950/80 border-teal-500 text-teal-200 font-bold ring-1 ring-teal-500';
                      }
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-teal-950/90 border-[#00A389] text-teal-200 font-bold ring-1 ring-[#00A389]';
                        } else if (selectedOpt === optIdx && !isCorrect) {
                          btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 ml-2" />
                          )}
                          {quizSubmitted && selectedOpt === optIdx && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {quizSubmitted && (
                    <div className="p-3.5 rounded-xl bg-[#07192f] border border-cyan-900/60 text-xs text-slate-200 space-y-1">
                      <strong className="text-cyan-400 block font-mono text-[10px] uppercase font-bold">Official Explanation:</strong>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-cyan-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                if (quizSubmitted) {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                } else {
                  setQuizSubmitted(true);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-teal-500/20"
            >
              <Award className="w-4 h-4" />
              <span>{quizSubmitted ? 'Retake Quiz' : 'Submit Answers'}</span>
            </button>

            {onNavigateToQuiz && (
              <button
                onClick={() => onNavigateToQuiz('Five Safes & Governance')}
                className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5 bg-[#07192f] px-3.5 py-2 rounded-xl border border-cyan-800 hover:border-teal-400 transition-colors cursor-pointer"
              >
                <span>Want an accredited completion certificate? Take the full 30+ Question Exam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Tooltip / Quick Definition Card when hovering or clicking a technical term */}
      {activeTooltipTerm && (
        <div className="fixed bottom-6 right-6 max-w-sm bg-slate-900/95 backdrop-blur-md border border-cyan-400/60 rounded-xl p-4 shadow-2xl z-50 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
              {activeTooltipTerm.category}
            </span>
            <button
              onClick={() => setActiveTooltipTerm(null)}
              className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close definition"
            >
              ✕
            </button>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{activeTooltipTerm.term}</span>
              {activeTooltipTerm.acronym && (
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                  {activeTooltipTerm.acronym}
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed mt-1 font-medium">
              {activeTooltipTerm.shortDefinition}
            </p>
          </div>
          {activeTooltipTerm.statutoryBasis && (
            <div className="text-[11px] text-teal-300 font-mono bg-teal-950/50 p-2 rounded border border-teal-900/50">
              <strong className="text-teal-200 block text-[10px] uppercase">Statutory Basis:</strong>
              <span>{activeTooltipTerm.statutoryBasis}</span>
            </div>
          )}
          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-400">IG Dictionary</span>
            <button
              onClick={() => {
                const termId = activeTooltipTerm.id;
                setActiveTooltipTerm(null);
                if (onNavigateToGlossary) {
                  onNavigateToGlossary(termId);
                } else {
                  setSelectedGlossaryCategory('All');
                  setSearchTerm(activeTooltipTerm.term);
                  setActiveTab('glossary');
                }
              }}
              className="text-cyan-400 hover:text-cyan-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
