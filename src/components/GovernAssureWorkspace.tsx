import React, { useState, useMemo, useEffect } from 'react';
import { WaveboundLogo } from './WaveboundLogo';
import { EvidenceDossierModal } from './EvidenceDossierModal';
import { StatutoryMatrixView } from './StatutoryMatrixView';
import { FiveSafesPillarsView } from './FiveSafesPillarsView';
import { QuantitativeSDCHub } from './QuantitativeSDCHub';
import { CaldicottTransparencyPortal } from './CaldicottTransparencyPortal';
import { ProcurementReadinessHub } from './ProcurementReadinessHub';
import { IsmsDeaBuildupSection } from './IsmsDeaBuildupSection';
import { GovernanceCharterModal } from './GovernanceCharterModal';
import { PrinciplesVsRulesCard, SDCEvaluationMode } from './PrinciplesVsRulesCard';
import {
  Scale,
  ShieldCheck,
  ShieldAlert,
  Calculator,
  HeartHandshake,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck2,
  Download,
  Printer,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Info,
  ExternalLink,
  Lock,
  Database,
  Server,
  UserCheck,
  Layers,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Workflow,
  FileText,
  Sliders,
  Table,
  Filter
} from 'lucide-react';

interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  researcherStatus: 'accredited' | 'pending' | 'unaccredited';
  ethicsStatus: 'approved' | 'in_review' | 'none';
  s251Status: 'authorized' | 'exempt' | 'missing';
  dataTier: 'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable';
  minCellCount: number;
  dominanceRatio: number;
  enclaveEgressBlocked: boolean;
  aiWorkloadType: 'none' | 'assistive' | 'autonomous_high_risk';
  aiHumanSponsorLinked: boolean;
}

const PRESET_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'scen_multi_site',
    name: 'Multi-Site Population Health Linkage',
    description: 'Longitudinal linkage of GP primary care and hospital episodes for cardiovascular epidemiology in an air-gapped enclave.',
    researcherStatus: 'accredited',
    ethicsStatus: 'approved',
    s251Status: 'exempt',
    dataTier: 'tier2_pseudonymised',
    minCellCount: 15,
    dominanceRatio: 45,
    enclaveEgressBlocked: true,
    aiWorkloadType: 'none',
    aiHumanSponsorLinked: true
  },
  {
    id: 'scen_missing_s251',
    name: 'Clinical Microdata without S251 Clearance',
    description: 'Attempt to access confidential patient records without explicit patient consent or statutory Section 251 CAG authorization.',
    researcherStatus: 'accredited',
    ethicsStatus: 'approved',
    s251Status: 'missing',
    dataTier: 'tier3_identifiable',
    minCellCount: 12,
    dominanceRatio: 50,
    enclaveEgressBlocked: true,
    aiWorkloadType: 'none',
    aiHumanSponsorLinked: true
  },
  {
    id: 'scen_small_cell_leak',
    name: 'Rare Disease Table with Small Cell Counts',
    description: 'Candidate research export containing small cell counts (N = 3) and high top-contributor dominance ratio (86%).',
    researcherStatus: 'accredited',
    ethicsStatus: 'approved',
    s251Status: 'exempt',
    dataTier: 'tier2_pseudonymised',
    minCellCount: 3,
    dominanceRatio: 86,
    enclaveEgressBlocked: true,
    aiWorkloadType: 'none',
    aiHumanSponsorLinked: true
  },
  {
    id: 'scen_ai_agent_unsponsored',
    name: 'Autonomous AI Agent without Human Sponsor',
    description: 'Autonomous multi-step SQL querying agent attempting execution on patient microdata without an accredited human researcher sponsor.',
    researcherStatus: 'accredited',
    ethicsStatus: 'approved',
    s251Status: 'exempt',
    dataTier: 'tier2_pseudonymised',
    minCellCount: 12,
    dominanceRatio: 40,
    enclaveEgressBlocked: true,
    aiWorkloadType: 'autonomous_high_risk',
    aiHumanSponsorLinked: false
  }
];

interface GateEvaluation {
  gateName: string;
  pillar: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  triggerNode: string;
  plainEnglishSummary: string;
  statutoryBasis: string;
  codeSnippet: string;
  decisionRef: string; // Linking directly to the Architecture Decision Register (e.g., D-001 through D-009)
  decisionTitle: string;
  decisionRole: string;
}

export type GovernAssureView =
  | 'simulator'
  | 'statutory_matrix'
  | 'five_safes_pillars'
  | 'sdc_hub'
  | 'transparency_ledger'
  | 'procurement_readiness'
  | 'isms_dea_buildup';

interface GovernAssureWorkspaceProps {
  initialView?: GovernAssureView;
  initialViewTrigger?: number;
  onNavigateToBuildDeploy?: () => void;
  onNavigateToDecisionRegister?: (decisionId?: string) => void;
  onNavigateToSandbox?: () => void;
  onNavigateToPlaybook?: (secId?: string) => void;
}

export const GovernAssureWorkspace: React.FC<GovernAssureWorkspaceProps> = ({
  initialView = 'simulator',
  initialViewTrigger,
  onNavigateToBuildDeploy,
  onNavigateToDecisionRegister,
  onNavigateToSandbox,
  onNavigateToPlaybook
}) => {
  // Workspace View Selection (Simulator vs Consolidated Statutory Matrix vs Five Safes Pillar Deep-Dive vs SDC Hub vs Caldicott 8 Transparency vs Procurement Readiness)
  const [workspaceView, setWorkspaceView] = useState<GovernAssureView>(initialView);

  useEffect(() => {
    setWorkspaceView(initialView);
  }, [initialView, initialViewTrigger]);

  // Active Scenario State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('scen_multi_site');
  const [researcherStatus, setResearcherStatus] = useState<'accredited' | 'pending' | 'unaccredited'>('accredited');
  const [ethicsStatus, setEthicsStatus] = useState<'approved' | 'in_review' | 'none'>('approved');
  const [s251Status, setS251Status] = useState<'authorized' | 'exempt' | 'missing'>('exempt');
  const [dataTier, setDataTier] = useState<'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable'>('tier2_pseudonymised');
  const [minCellCount, setMinCellCount] = useState<number>(15);
  const [dominanceRatio, setDominanceRatio] = useState<number>(45);
  const [sdcMode, setSdcMode] = useState<SDCEvaluationMode>('principles_triage');
  const [enclaveEgressBlocked, setEnclaveEgressBlocked] = useState<boolean>(true);
  const [aiWorkloadType, setAiWorkloadType] = useState<'none' | 'assistive' | 'autonomous_high_risk'>('none');
  const [aiHumanSponsorLinked, setAiHumanSponsorLinked] = useState<boolean>(true);

  // Inspector, Report & Governance Charter Modals
  const [inspectedGate, setInspectedGate] = useState<GateEvaluation | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedCharter, setCopiedCharter] = useState<boolean>(false);

  // Load preset scenario
  const handleApplyPreset = (preset: ScenarioPreset) => {
    setSelectedPresetId(preset.id);
    setResearcherStatus(preset.researcherStatus);
    setEthicsStatus(preset.ethicsStatus);
    setS251Status(preset.s251Status);
    setDataTier(preset.dataTier);
    setMinCellCount(preset.minCellCount);
    setDominanceRatio(preset.dominanceRatio);
    setEnclaveEgressBlocked(preset.enclaveEgressBlocked);
    setAiWorkloadType(preset.aiWorkloadType);
    setAiHumanSponsorLinked(preset.aiHumanSponsorLinked);
  };

  // Evaluate the Scenario across the Five Safes & SDC logic tree
  const evaluation = useMemo(() => {
    const gates: GateEvaluation[] = [];

    // Gate 1: Safe Person
    if (researcherStatus === 'accredited') {
      gates.push({
        gateName: 'Researcher Accreditation & IG Certification',
        pillar: 'Safe People',
        status: 'PASS',
        triggerNode: 'tre:SafePersonShape § 2.1',
        plainEnglishSummary: 'Researcher holds verified institutional accreditation and current annual NHS Information Governance certification.',
        statutoryBasis: 'Digital Economy Act 2017 Part 5; ONS Approved Researcher Standard.',
        codeSnippet: `tre:WorkspaceAdmissionShape a sh:NodeShape ;
  sh:property [
    sh:path tre:hasAccreditedResearcher ;
    sh:minCount 1 ;
    sh:message "Session must be bound to an accredited researcher." ;
  ] .`,
        decisionRef: 'D-003',
        decisionTitle: 'Trusted Inputs & Identity Verification',
        decisionRole: 'Identity & Access Management (IAM) Lead'
      });
    } else if (researcherStatus === 'pending') {
      gates.push({
        gateName: 'Researcher Accreditation Pending Verification',
        pillar: 'Safe People',
        status: 'WARN',
        triggerNode: 'tre:SafePersonShape § 2.2',
        plainEnglishSummary: 'Researcher credential renewal is pending annual IG certificate verification; access limited to sandbox dry-runs.',
        statutoryBasis: 'NHS Data Security and Protection Toolkit (DSPT) Mandate 3.',
        codeSnippet: `tre:hasValidIGCertification false -> tre:requiresManualDPOOverride true .`,
        decisionRef: 'D-004',
        decisionTitle: 'Decision Semantics & Missing Inputs',
        decisionRole: 'Information Governance Manager'
      });
    } else {
      gates.push({
        gateName: 'Unaccredited Researcher Access Blocked',
        pillar: 'Safe People',
        status: 'FAIL',
        triggerNode: 'tre:SafePersonShape § 2.3',
        plainEnglishSummary: 'Access denied: user possesses no accredited researcher status under statutory data sharing frameworks.',
        statutoryBasis: 'Digital Economy Act 2017 § 70; Caldicott Principle 4 (Need to know).',
        codeSnippet: `tre:hasAccreditedResearcher minCount 1 -> VIOLATION: Admission aborted.`,
        decisionRef: 'D-001',
        decisionTitle: 'First Production Decision & Boundary Scope',
        decisionRole: 'Policy Owner & Clinical Governance Lead'
      });
    }

    // Gate 2: Safe Project & Ethics
    if (ethicsStatus === 'approved') {
      if (dataTier === 'tier3_identifiable' && s251Status === 'missing') {
        gates.push({
          gateName: 'Missing Section 251 CAG Statutory Exemption',
          pillar: 'Safe Projects',
          status: 'FAIL',
          triggerNode: 'tre:SafeProjectShape § 3.3',
          plainEnglishSummary: 'Identifiable patient data (Tier 3) cannot be loaded without an active Confidentiality Advisory Group (CAG) Section 251 exemption.',
          statutoryBasis: 'National Health Service Act 2006 Section 251; UK GDPR Art. 9(2)(j).',
          codeSnippet: `tre:ClinicalDataTierShape a sh:NodeShape ;
  sh:property [
    sh:path tre:hasSection251Authorization ;
    sh:hasValue true ;
    sh:message "Section 251 statutory exemption required for Tier 3 data." ;
  ] .`,
          decisionRef: 'D-002',
          decisionTitle: 'Statutory Authority & Legal Interpretation',
          decisionRole: 'Caldicott Guardian & Data Protection Officer'
        });
      } else {
        gates.push({
          gateName: 'HRA Research Ethics Committee Approval',
          pillar: 'Safe Projects',
          status: 'PASS',
          triggerNode: 'tre:SafeProjectShape § 3.1',
          plainEnglishSummary: 'Active NHS Research Ethics Committee (REC) approval and demonstrative public benefit verified under Caldicott Principle 1.',
          statutoryBasis: 'Health Research Authority (HRA) Governance Framework; UK GDPR Art. 6(1)(e).',
          codeSnippet: `tre:hasEthicsApproval true ;
tre:demonstratesPublicBenefit true ;
tre:legalBasis "UK_GDPR_Art6_1_e" .`,
          decisionRef: 'D-002',
          decisionTitle: 'Statutory Authority & Legal Interpretation',
          decisionRole: 'Health Research Authority (HRA) & REC Lead'
        });
      }
    } else if (ethicsStatus === 'in_review') {
      gates.push({
        gateName: 'REC Ethics Protocol Under Committee Review',
        pillar: 'Safe Projects',
        status: 'WARN',
        triggerNode: 'tre:SafeProjectShape § 3.2',
        plainEnglishSummary: 'Ethics protocol is undergoing IRAS amendment review; data queries restricted to synthetic mock cohorts.',
        statutoryBasis: 'HRA Research Ethics Committee Standard Operating Procedures § 4.3.',
        codeSnippet: `tre:ethicsStatus "InReview" -> tre:allowMockDataOnly true .`,
        decisionRef: 'D-004',
        decisionTitle: 'Decision Semantics & Missing Inputs',
        decisionRole: 'Research Governance Manager'
      });
    } else {
      gates.push({
        gateName: 'No Research Ethics Clearance on File',
        pillar: 'Safe Projects',
        status: 'FAIL',
        triggerNode: 'tre:SafeProjectShape § 3.4',
        plainEnglishSummary: 'Unlawful processing: no research ethics approval on file. All data queries barred.',
        statutoryBasis: 'Common Law Duty of Confidentiality; UK GDPR Art. 9 prohibition.',
        codeSnippet: `tre:hasEthicsApproval false -> VIOLATION: Absolute PDP denial.`,
        decisionRef: 'D-002',
        decisionTitle: 'Statutory Authority & Legal Interpretation',
        decisionRole: 'Caldicott Guardian & Legal Counsel'
      });
    }

    // Gate 3: Safe Setting (Zero-Egress Network Isolation)
    if (enclaveEgressBlocked) {
      gates.push({
        gateName: 'Air-Gapped Zero-Egress VPC Network Isolation',
        pillar: 'Safe Settings',
        status: 'PASS',
        triggerNode: 'tre:SafeSettingShape § 1.1',
        plainEnglishSummary: 'Compute environment runs in a private cloud VPC with all outbound WAN internet routing severed via eBPF/Calico network policy.',
        statutoryBasis: 'SATRE Computing Infrastructure Pillar 2; ISO/IEC 27001:2022 Annex A.8.20–A.8.22.',
        codeSnippet: `tre:enclaveEgressBlocked true ;
tre:networkIsolationTier "ZeroEgressVPC" .`,
        decisionRef: 'D-007',
        decisionTitle: 'Enforcement Point (PEP) Selection & Staged Rollout',
        decisionRole: 'Platform Operations & Security Architect'
      });
    } else {
      gates.push({
        gateName: 'External Internet Egress Permitted (High Security Risk)',
        pillar: 'Safe Settings',
        status: 'FAIL',
        triggerNode: 'tre:SafeSettingShape § 1.2',
        plainEnglishSummary: 'CRITICAL SECURITY BREACH: Computing environment has open outbound internet routing. Patient data cannot be loaded onto internet-connected nodes.',
        statutoryBasis: 'NHS Data Security and Protection Toolkit (DSPT) Assertion 1.5; ICO Precedents.',
        codeSnippet: `tre:enclaveEgressBlocked false -> CRITICAL_FAILURE: Network route unverified.`,
        decisionRef: 'D-007',
        decisionTitle: 'Enforcement Point (PEP) Selection & Staged Rollout',
        decisionRole: 'Lead Security Operations Approver'
      });
    }

    // Gate 4: Safe Data & AI Workload
    if (aiWorkloadType === 'autonomous_high_risk' && !aiHumanSponsorLinked) {
      gates.push({
        gateName: 'Autonomous AI Workload Lacks Verified Human Sponsor',
        pillar: 'Safe Data & AI',
        status: 'FAIL',
        triggerNode: 'tre:AgenticWorkloadShape § 5.2',
        plainEnglishSummary: 'Stanford UIT Doctrine: AI is NOT a Safe Person and cannot execute autonomous multi-step pipelines without an accredited human sponsor holding statutory liability.',
        statutoryBasis: 'Stanford UIT Agentic AI Security Framework; Digital Economy Act 2017.',
        codeSnippet: `tre:AgenticWorkloadShape a sh:NodeShape ;
  sh:property [
    sh:path tre:sponsoredByHumanResearcher ;
    sh:minCount 1 ;
    sh:message "AI workload must be sponsored by an accredited human researcher." ;
  ] .`,
        decisionRef: 'D-003',
        decisionTitle: 'Trusted Inputs & Identity Verification',
        decisionRole: 'Security Architecture & AI Governance Lead'
      });
    } else {
      gates.push({
        gateName: 'Data Minimisation & Asset Constraints Mapped',
        pillar: 'Safe Data',
        status: 'PASS',
        triggerNode: 'tre:ClinicalDataTierShape § 4.1',
        plainEnglishSummary: 'Direct patient identifiers expunged; pseudonymisation hash salting verified; data minimization adhered to Caldicott Principle 2.',
        statutoryBasis: 'Caldicott Principle 2 (Minimise data); UK GDPR Article 5(1)(c).',
        codeSnippet: `tre:directIdentifiersExcluded true ;
tre:pseudonymisationAlgorithm "Salted_HMAC_SHA256" .`,
        decisionRef: 'D-001',
        decisionTitle: 'First Production Decision & Boundary Scope',
        decisionRole: 'Data Protection Officer & Caldicott Lead'
      });
    }

    // Gate 5: Safe Output & SDC Airlock Verification (Strict Rules-Based vs. Ritchie/SACRO Principles-Based Triage)
    if (sdcMode === 'strict_rules') {
      if (minCellCount < 10) {
        gates.push({
          gateName: 'Primary Cell Suppression Violation (k < 10)',
          pillar: 'Safe Outputs',
          status: 'FAIL',
          triggerNode: 'sdc:AirlockOutputShape § 6.1',
          plainEnglishSummary: `Candidate table contains small cell count (N = ${minCellCount}). Strict rules-based policy configuration rejects any cell below the k ≥ 10 threshold.`,
          statutoryBasis: 'Strict Rules-Based Mode · ONS/SAIL k ≥ 10 Threshold Configuration.',
          codeSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
  sh:property [
    sh:path tre:minObservedCellCount ;
    sh:minInclusive 10 ;
    sh:message "Strict rule: primary cell count must be >= 10." ;
  ] .`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead'
        });
      } else if (dominanceRatio > 80) {
        gates.push({
          gateName: 'Top-Contributor Dominance Ceiling Violation (> 80%)',
          pillar: 'Safe Outputs',
          status: 'FAIL',
          triggerNode: 'sdc:AirlockOutputShape § 6.2',
          plainEnglishSummary: `Candidate table has a single contributor accounting for ${dominanceRatio}% of the aggregate sum (exceeds the strict 80% dominance ceiling).`,
          statutoryBasis: 'Strict Rules-Based Mode · ONS (1, 80%) Dominance Rule.',
          codeSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
  sh:property [
    sh:path tre:topContributorDominanceRatio ;
    sh:maxInclusive 0.80 ;
    sh:message "Strict rule: top contributor must not exceed 80%." ;
  ] .`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead'
        });
      } else {
        gates.push({
          gateName: 'Strict Thresholds Satisfied (k ≥ 10 & Dominance ≤ 80%)',
          pillar: 'Safe Outputs',
          status: 'PASS',
          triggerNode: 'sdc:AirlockOutputShape § 6.3',
          plainEnglishSummary: `Candidate table satisfies strict binary thresholds (k = ${minCellCount} ≥ 10, dominance = ${dominanceRatio}% ≤ 80%). Note: switch to Principles-Based Triage to examine contextual risks beyond thresholds.`,
          statutoryBasis: 'Strict Rules-Based Mode · Automated Threshold Screening.',
          codeSnippet: `tre:minObservedCellCount >= 10 ;
tre:topContributorDominanceRatio <= 0.80 ;
tre:airlockAutoVerification "PASSED" .`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead'
        });
      }
    } else {
      // Principles-Based Triage Mode (Felix Ritchie / DARE UK SACRO)
      if (minCellCount < 10) {
        gates.push({
          gateName: 'Rule-of-Thumb Flagged: Small Cell Triage (k < 10)',
          pillar: 'Safe Outputs',
          status: 'WARN',
          triggerNode: 'sdc:PrinciplesTriageShape § 6.1',
          plainEnglishSummary: `Cell count N = ${minCellCount} is below the k ≥ 10 rule-of-thumb. Under Felix Ritchie / SACRO principles-based checking, automated triage holds for 2-person human review and researcher justification rather than blind refusal (e.g. checking structural zeros, safe regression stats, or complementary suppression).`,
          statutoryBasis: 'Principles-Based Output SDC (Ritchie & Elliot, 2015); DARE UK SACRO & SDAP Statbarn Triage.',
          codeSnippet: `# SACRO Semi-Automated Rule-of-Thumb Triage (Non-Blocking)
sacro:outcome "REVIEW_REQUIRED"
sdc:ruleOfThumbTriggered "min_cell_count_below_10"
sdc:humanAction "Inspect researcher context & Statbarn class before release"`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead & Output Checker'
        });
      } else if (dominanceRatio > 80) {
        gates.push({
          gateName: `Rule-of-Thumb Flagged: Contributor Dominance (${dominanceRatio}%)`,
          pillar: 'Safe Outputs',
          status: 'WARN',
          triggerNode: 'sdc:PrinciplesTriageShape § 6.2',
          plainEnglishSummary: `Top contributor accounts for ${dominanceRatio}% (above 80% rule-of-thumb). Principles-based reviewers inspect whether this identifies an individual or reflects non-sensitive organizational totals before suppression.`,
          statutoryBasis: 'Principles-Based Output SDC (Ritchie & Elliot, 2015); ONS Dominance Rule-of-Thumb.',
          codeSnippet: `# SACRO Semi-Automated Dominance Triage
sacro:outcome "REVIEW_REQUIRED"
sdc:ruleOfThumbTriggered "dominance_above_80_pct"
sdc:humanAction "Assess attribute sensitivity & institutional vs. patient dominance"`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead & Output Checker'
        });
      } else {
        gates.push({
          gateName: 'Safe Outputs: Rules-of-Thumb Met (Contextual Check Confirmed)',
          pillar: 'Safe Outputs',
          status: 'PASS',
          triggerNode: 'sdc:PrinciplesTriageShape § 6.3',
          plainEnglishSummary: `Passes k = ${minCellCount} ≥ 10 and dominance = ${dominanceRatio}% ≤ 80% triage rules-of-thumb. Under principles-based checking, 2-person airlock reviewers still confirm no group disclosure (100% homogeneity) or differencing across prior exports.`,
          statutoryBasis: 'Principles-Based Five Safes (Green & Ritchie, 2023); Caldicott Principle 8.',
          codeSnippet: `sacro:ruleOfThumbChecks "GREEN" ;
sdc:contextualChecks "Verify zero group disclosure & table differencing risk" .`,
          decisionRef: 'D-005',
          decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
          decisionRole: 'Statistical Disclosure Control (SDC) Lead & Output Checker'
        });
      }
    }

    // Gate 6: Caldicott Principle 8 Public Data Use Register & PROV-O Lineage
    gates.push({
      gateName: 'Public Data Use Register (Caldicott Principle 8)',
      pillar: 'Safe Projects',
      status: 'PASS',
      triggerNode: 'tre:PublicTransparencyShape § 8.1',
      plainEnglishSummary: 'Project lay summary, public benefit statement, and PPIE engagement published to public Data Use Register with W3C PROV-O provenance lineage.',
      statutoryBasis: 'NHS Caldicott Principle 8 (No surprises); UK GDPR Art. 13/14 transparency; CAG S251 Public Register.',
      codeSnippet: `tre:PublicTransparencyShape a sh:NodeShape ;
  sh:property [
    sh:path tre:publishedToPublicRegister ;
    sh:hasValue true ;
  ] ;
  sh:property [
    sh:path prov:wasDerivedFrom ;
    sh:minCount 1 ;
  ] .`,
      decisionRef: 'D-008',
      decisionTitle: 'Public Register Transparency & Audit Retention',
      decisionRole: 'Communications Officer, PPIE Lead & Caldicott Guardian'
    });

    // Overall Synthesis
    const hasFail = gates.some((g) => g.status === 'FAIL');
    const hasWarn = gates.some((g) => g.status === 'WARN');

    let overallDecision: 'APPROVED' | 'REQUIRES LOCAL REVIEW' | 'REJECTED / BLOCKED';
    let decisionColor: string;
    let decisionIcon: React.ReactNode;
    let decisionReason: string;

    if (hasFail) {
      overallDecision = 'REJECTED / BLOCKED';
      decisionColor = 'text-rose-400 bg-rose-950/80 border-rose-800';
      decisionIcon = <XCircle className="w-5 h-5 text-rose-400" />;
      decisionReason = 'One or more mandatory statutory or disclosure control gates failed evaluation. Autonomous or airlock execution is structurally barred.';
    } else if (hasWarn) {
      overallDecision = 'REQUIRES LOCAL REVIEW';
      decisionColor = 'text-amber-400 bg-amber-950/80 border-amber-800';
      decisionIcon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
      decisionReason = 'Scenario satisfies minimum safeguards but requires institutional Information Governance or DPO manual verification before live microdata attachment.';
    } else {
      overallDecision = 'APPROVED';
      decisionColor = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
      decisionIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      decisionReason = 'All statutory compliance, network isolation, and disclosure control constraints satisfied. Central assurance verified.';
    }

    return {
      gates,
      overallDecision,
      decisionColor,
      decisionIcon,
      decisionReason,
      auditHash: `SHA256:7f4a9b2c${Math.abs(minCellCount * 137 + dominanceRatio * 29).toString(16)}e819a4d`,
      evaluatedAt: new Date().toISOString()
    };
  }, [
    researcherStatus,
    ethicsStatus,
    s251Status,
    dataTier,
    minCellCount,
    dominanceRatio,
    sdcMode,
    enclaveEgressBlocked,
    aiWorkloadType,
    aiHumanSponsorLinked
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* 1. WORKSPACE HEADER */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 shadow-xl text-white">
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-amber-300 bg-[#07192f] px-2.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-1.5 shadow-xs">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Phase 3: Govern &amp; Assure Operational Workspace</span>
            </span>
            <span className="font-mono text-slate-300 bg-[#07192f] px-2 py-0.5 rounded border border-cyan-900/60">
              Caldicott 1–8 · Section 251 CAG · HRA REC · ONS SDC
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Governance Review Aid &amp; Evidence Summary Compiler
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A practical workspace to help research teams and Information Governance panels check study proposals against standard UK health data rules (Caldicott Principles, Section 251, REC ethics, and SDC thresholds). It evaluates proposal details against working policy shapes and compiles a standardized evidence summary to help human reviewers spot issues early.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-teal-500/20"
            >
              <FileCheck2 className="w-4 h-4 text-slate-950" />
              <span>Compile Standardized Evidence Pack</span>
            </button>
            <button
              onClick={() => setIsCharterModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 border border-[#1b3f68] font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Institutional Governance Charter</span>
            </button>
          </div>

          {/* Practical Note: Mandatory Documents vs Operational Aid */}
          <div className="p-3.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 space-y-1.5 text-left">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Are these decision-support summaries or &quot;dossiers&quot; legally mandatory documents?</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>No.</strong> There is no statutory requirement under UK law to create an automated &quot;compliance dossier&quot;. The actual legally mandated documents are your <strong>Data Protection Impact Assessment (DPIA under UK GDPR Art 35)</strong>, <strong>Data Sharing Agreement (DSA)</strong>, <strong>HRA REC Ethical Approval</strong>, <strong>Section 251 CAG Clearance</strong> (when using confidential patient data without consent), and annual <strong>Data Security &amp; Protection Toolkit (DSPT)</strong> submissions. This evidence summary is simply an operational tool to help Caldicott Guardians and Data Access Committees review applications without tedious manual checklists.
            </p>
          </div>

          {/* Context Strip: Evidence Pack vs Governance Charter */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-cyan-900/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300 text-left">
            <div className="space-y-1 border-b md:border-b-0 md:border-r border-cyan-900/60 pb-2 md:pb-0 md:pr-3">
              <strong className="text-amber-300 block font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Standardized Evidence Pack (Session Decision-Support):</span>
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Compiled when an accredited researcher requests workspace access or airlock export. Evaluates the specific study protocol against working SHACL and policy rules, producing a standardized evidence summary to assist human DAAG and Caldicott review panels.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-cyan-300 block font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Governance Charter (Static Framework Baseline):</span>
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Referenced during <strong>institutional procurement and Trust onboarding</strong>. Sets out the baseline statutory mandates (DEA 2017, UK GDPR, Section 251) and clinical safety standards (DCB0129, DSPT).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 3: CONSOLIDATED NAVIGATION TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-2">
        <div className="flex flex-wrap bg-[#0c2340] p-1 rounded-xl border border-cyan-900/60 gap-1">
          <button
            onClick={() => setWorkspaceView('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'simulator'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive Protocol Evaluator</span>
          </button>
          <button
            onClick={() => setWorkspaceView('statutory_matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'statutory_matrix'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-cyan-300" />
            <span>Consolidated Statutory Matrix</span>
          </button>
          <button
            onClick={() => setWorkspaceView('five_safes_pillars')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'five_safes_pillars'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
            <span>Five Safes Pillar Deep-Dive</span>
          </button>
          <button
            onClick={() => setWorkspaceView('sdc_hub')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'sdc_hub'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-300" />
            <span>Quantitative SDC &amp; Airlock Review</span>
          </button>
          <button
            onClick={() => setWorkspaceView('transparency_ledger')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'transparency_ledger'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-300" />
            <span>Caldicott 8 Transparency &amp; PROV-O Ledger</span>
          </button>
          <button
            onClick={() => setWorkspaceView('procurement_readiness')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'procurement_readiness'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-cyan-300" />
            <span>Procurement &amp; SATRE/DSPT Compliance</span>
          </button>
          <button
            onClick={() => setWorkspaceView('isms_dea_buildup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              workspaceView === 'isms_dea_buildup'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#112f54]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-cyan-300" />
            <span>ISO 27001 ISMS &amp; DEA Build-Up</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Evaluated Baseline:</span>
          <span
            className={`px-2.5 py-0.5 rounded font-bold border ${
              evaluation.overallDecision === 'APPROVED'
                ? 'bg-teal-950/80 text-teal-300 border-teal-600'
                : evaluation.overallDecision === 'REQUIRES LOCAL REVIEW'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                  : 'bg-rose-950/80 text-rose-300 border-rose-600'
            }`}
          >
            {evaluation.overallDecision}
          </span>
        </div>
      </div>

      {/* 2. SCENARIO PRESETS & INTERACTIVE CONFIGURATOR (SIMULATOR VIEW) */}
      {workspaceView === 'simulator' && (
        <>
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Step 1: Select or Customize Research Scenario</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Scenario Inputs &amp; Governance Parameters
            </h2>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Presets:</span>
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedPresetId === preset.id
                    ? 'bg-[#00A389] text-white shadow-md font-bold'
                    : 'bg-[#07192f] text-slate-300 hover:text-white border border-[#1b3f68]'
                }`}
              >
                {preset.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Description Banner */}
        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-cyan-900/60 text-xs text-slate-300 flex items-center justify-between gap-2 shadow-xs">
          <span>{PRESET_SCENARIOS.find((p) => p.id === selectedPresetId)?.description}</span>
          <button
            onClick={() => handleApplyPreset(PRESET_SCENARIOS[0])}
            className="text-[11px] text-cyan-400 hover:text-white hover:underline font-mono flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" />
            <span>Reset Default</span>
          </button>
        </div>

        {/* Safe Outputs SDC Evaluation Mode Toggle */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <Scale className="w-4 h-4 text-teal-400" />
              <span>Safe Outputs Check Mode: Principles-Based Triage vs. Strict Rules-Based</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed max-w-2xl">
              Compare how <strong>k &lt; 10</strong> or <strong>dominance &gt; 80%</strong> behaves under Felix Ritchie&apos;s principles-based triage (flagging human airlock review) versus a rigid automated threshold block. Try the <strong>Rare</strong> preset above to see the difference.
            </p>
          </div>
          <div className="inline-flex p-1 rounded-lg bg-[#07192f] border border-cyan-900/60 shrink-0 self-start lg:self-center">
            <button
              type="button"
              onClick={() => setSdcMode('principles_triage')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                sdcMode === 'principles_triage'
                  ? 'bg-[#00A389] text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Principles-Based Triage (SACRO)
            </button>
            <button
              type="button"
              onClick={() => setSdcMode('strict_rules')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                sdcMode === 'strict_rules'
                  ? 'bg-[#005EB8] text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Strict Rules-Based
            </button>
          </div>
        </div>

        {/* Dynamic Parameter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Parameter 1: Researcher Status */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">Researcher Accreditation</label>
            <select
              value={researcherStatus}
              onChange={(e) => {
                setResearcherStatus(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-[#07192f] border border-cyan-900/60 rounded-md p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="accredited">Accredited (DEA 2017 &amp; DSPT)</option>
              <option value="pending">Renewal Pending (IG Incomplete)</option>
              <option value="unaccredited">Unaccredited / External</option>
            </select>
            <span className="text-[10px] text-slate-400 block font-mono">Safe People Accreditation Gate</span>
          </div>

          {/* Parameter 2: Ethics Approval */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">HRA Research Ethics (REC)</label>
            <select
              value={ethicsStatus}
              onChange={(e) => {
                setEthicsStatus(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-[#07192f] border border-cyan-900/60 rounded-md p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="approved">Approved (Active IRAS Ref)</option>
              <option value="in_review">In Review / Substantial Amendment</option>
              <option value="none">No Ethics Approval</option>
            </select>
            <span className="text-[10px] text-slate-400 block font-mono">Safe Projects Mandate</span>
          </div>

          {/* Parameter 3: Section 251 CAG */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">Section 251 CAG Clearance</label>
            <select
              value={s251Status}
              onChange={(e) => {
                setS251Status(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-[#07192f] border border-cyan-900/60 rounded-md p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="exempt">Not Required (De-identified/Consented)</option>
              <option value="authorized">Authorized (Active CAG Reference)</option>
              <option value="missing">Missing / Unconsented Identifiers</option>
            </select>
            <span className="text-[10px] text-slate-400 block font-mono">NHS Act 2006 Statutory Shield</span>
          </div>

          {/* Parameter 4: Data Sensitivity Tier */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">Data Classification Tier</label>
            <select
              value={dataTier}
              onChange={(e) => {
                setDataTier(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-[#07192f] border border-cyan-900/60 rounded-md p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="tier2_pseudonymised">Tier 2: Pseudonymised Cohort</option>
              <option value="tier1_aggregate">Tier 1: Synthetic / Pre-aggregated</option>
              <option value="tier3_identifiable">Tier 3: Identifiable Clinical Data</option>
            </select>
            <span className="text-[10px] text-slate-400 block font-mono">Hospital Operational Tiering</span>
          </div>

          {/* Parameter 5: SDC Minimum Cell Count (k) */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white">SDC Cell Count (k)</label>
              <span className={`font-mono font-bold ${minCellCount >= 10 ? 'text-teal-400' : 'text-rose-400'}`}>
                N = {minCellCount}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={minCellCount}
              onChange={(e) => {
                setMinCellCount(parseInt(e.target.value, 10));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-[#00A389] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">
              {sdcMode === 'principles_triage'
                ? 'Rule-of-thumb benchmark: k < 10 flags human triage'
                : 'Strict gate: k ≥ 10 required automatically'}
            </span>
          </div>

          {/* Parameter 6: Dominance Ratio */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white">Top Contributor Dominance</label>
              <span className={`font-mono font-bold ${dominanceRatio <= 80 ? 'text-teal-400' : 'text-rose-400'}`}>
                {dominanceRatio}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={dominanceRatio}
              onChange={(e) => {
                setDominanceRatio(parseInt(e.target.value, 10));
                setSelectedPresetId('custom');
              }}
              className="w-full accent-[#00A389] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">
              {sdcMode === 'principles_triage'
                ? 'Rule-of-thumb ceiling: > 80% flags context review'
                : 'Strict ceiling: ≤ 80% maximum contribution'}
            </span>
          </div>

          {/* Parameter 7: Network Egress Isolation */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">Enclave Network Routing</label>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setEnclaveEgressBlocked(true);
                  setSelectedPresetId('custom');
                }}
                className={`px-2.5 py-1.5 rounded text-xs font-semibold flex-1 transition-colors cursor-pointer ${
                  enclaveEgressBlocked
                    ? 'bg-teal-950/80 text-teal-300 border border-teal-600 font-bold'
                    : 'bg-[#07192f] text-slate-300 border border-[#1b3f68]'
                }`}
              >
                Zero-Egress VPC
              </button>
              <button
                type="button"
                onClick={() => {
                  setEnclaveEgressBlocked(false);
                  setSelectedPresetId('custom');
                }}
                className={`px-2.5 py-1.5 rounded text-xs font-semibold flex-1 transition-colors cursor-pointer ${
                  !enclaveEgressBlocked
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-600 font-bold'
                    : 'bg-[#07192f] text-slate-300 border border-[#1b3f68]'
                }`}
              >
                Open WAN
              </button>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">Calico CNI Egress Enforcement</span>
          </div>

          {/* Parameter 8: AI Workload Governance */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2">
            <label className="font-bold text-white block">Assistive AI Model</label>
            <select
              value={aiWorkloadType}
              onChange={(e) => {
                setAiWorkloadType(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-[#07192f] border border-cyan-900/60 rounded-md p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="none">Standard Human Analytics</option>
              <option value="assistive">Assistive Code Completion (Cline/Cursor)</option>
              <option value="autonomous_high_risk">Autonomous Agent (Stanford #8702)</option>
            </select>
            {aiWorkloadType === 'autonomous_high_risk' && (
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiHumanSponsorLinked}
                  onChange={(e) => setAiHumanSponsorLinked(e.target.checked)}
                  className="rounded text-teal-400"
                />
                <span className="text-[11px] text-cyan-300">Human Sponsor Linked</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* 3. VISUALIZING THE ONTOLOGY: REAL-TIME LOGIC TREE */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Step 2: Real-Time Policy-as-Code Decision-Support Evaluation</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Five Safes &amp; SDC Decision-Support Logic Flow
            </h2>
          </div>

          {/* Outcome Status Banner */}
          <div className={`px-4 py-2 rounded-lg border flex items-center gap-2.5 font-bold text-xs ${
            evaluation.overallDecision === 'APPROVED'
              ? 'bg-teal-950/80 text-teal-300 border-teal-600'
              : evaluation.overallDecision === 'REQUIRES LOCAL REVIEW'
                ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                : 'bg-rose-950/80 text-rose-300 border-rose-600'
          }`}>
            {evaluation.overallDecision === 'APPROVED' ? (
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            ) : evaluation.overallDecision === 'REQUIRES LOCAL REVIEW' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>Decision-Support Baseline: {evaluation.overallDecision}</span>
          </div>
        </div>

        {/* Narrative Reason Card */}
        <div className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/60 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block font-bold">Policy Decision Point (PDP) Evidence Rationale:</strong>
            <p className="text-slate-300 leading-relaxed">{evaluation.decisionReason}</p>
          </div>
        </div>

        {/* The 5 Gates Logic Pathway */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono">
            Sequential Compliance Gates (Select Any Gate to Inspect Plain-English Law):
          </div>

          <div className="space-y-2.5">
            {evaluation.gates.map((gate, idx) => {
              let badgeBg = 'bg-teal-950/80 text-teal-300 border-teal-600';
              let icon = <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />;

              if (gate.status === 'WARN') {
                badgeBg = 'bg-amber-950/80 text-amber-300 border-amber-600';
                icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
              } else if (gate.status === 'FAIL') {
                badgeBg = 'bg-rose-950/80 text-rose-300 border-rose-600';
                icon = <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
              }

              return (
                <div
                  key={idx}
                  onClick={() => setInspectedGate(gate)}
                  className="p-4 rounded-lg bg-slate-950/80 border border-cyan-900/40 hover:border-cyan-500/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group shadow-sm text-slate-200"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {icon}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {gate.gateName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07192f] text-cyan-300 border border-cyan-900/60">
                          {gate.pillar}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">{gate.plainEnglishSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {gate.pillar === 'Safe Outputs' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkspaceView('sdc_hub');
                        }}
                        className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Calculator className="w-3 h-3 text-amber-600" />
                        <span>Launch SDC Simulator</span>
                      </button>
                    )}
                    {gate.gateName.includes('Caldicott Principle 8') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkspaceView('transparency_ledger');
                        }}
                        className="text-[11px] font-semibold text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <HeartHandshake className="w-3 h-3 text-[#005EB8]" />
                        <span>View Public Register</span>
                      </button>
                    )}
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase font-bold ${badgeBg}`}>
                      {gate.status}
                    </span>
                    <span className="text-xs text-[#005EB8] dark:text-sky-400 font-medium flex items-center gap-1 group-hover:underline">
                      <span>Inspect Rule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Principles-Based vs. Rules-Based SDC Explainer (Felix Ritchie / Five Safes & SACRO) */}
        <PrinciplesVsRulesCard
          activeMode={sdcMode}
          onSelectMode={setSdcMode}
          variant="navy"
          defaultExpanded={true}
        />
      </div>
    </>
  )}

  {/* CONSOLIDATED STATUTORY MATRIX VIEW (PHASE 3) */}
  {workspaceView === 'statutory_matrix' && (
    <StatutoryMatrixView
      researcherStatus={researcherStatus}
      ethicsStatus={ethicsStatus}
      s251Status={s251Status}
      dataTier={dataTier}
      minCellCount={minCellCount}
      dominanceRatio={dominanceRatio}
      enclaveEgressBlocked={enclaveEgressBlocked}
      aiWorkloadType={aiWorkloadType}
      aiHumanSponsorLinked={aiHumanSponsorLinked}
      onNavigateToDecisionRegister={onNavigateToDecisionRegister}
      onOpenEvidenceDossier={() => setIsReportModalOpen(true)}
    />
  )}

  {/* FIVE SAFES PILLAR DEEP-DIVE (PHASE 3) */}
  {workspaceView === 'five_safes_pillars' && (
    <FiveSafesPillarsView
      researcherStatus={researcherStatus}
      setResearcherStatus={(st) => {
        setResearcherStatus(st);
        setSelectedPresetId('custom');
      }}
      ethicsStatus={ethicsStatus}
      setEthicsStatus={(st) => {
        setEthicsStatus(st);
        setSelectedPresetId('custom');
      }}
      s251Status={s251Status}
      setS251Status={(st) => {
        setS251Status(st);
        setSelectedPresetId('custom');
      }}
      dataTier={dataTier}
      setDataTier={(t) => {
        setDataTier(t);
        setSelectedPresetId('custom');
      }}
      minCellCount={minCellCount}
      setMinCellCount={(k) => {
        setMinCellCount(k);
        setSelectedPresetId('custom');
      }}
      dominanceRatio={dominanceRatio}
      setDominanceRatio={(r) => {
        setDominanceRatio(r);
        setSelectedPresetId('custom');
      }}
      enclaveEgressBlocked={enclaveEgressBlocked}
      setEnclaveEgressBlocked={(b) => {
        setEnclaveEgressBlocked(b);
        setSelectedPresetId('custom');
      }}
      aiWorkloadType={aiWorkloadType}
      setAiWorkloadType={(t) => {
        setAiWorkloadType(t);
        setSelectedPresetId('custom');
      }}
      aiHumanSponsorLinked={aiHumanSponsorLinked}
      setAiHumanSponsorLinked={setAiHumanSponsorLinked}
      onOpenEvidenceDossier={() => setIsReportModalOpen(true)}
      onNavigateToDecisionRegister={onNavigateToDecisionRegister}
    />
  )}

  {/* QUANTITATIVE SDC & AIRLOCK REVIEW HUB (PHASE 6) */}
  {workspaceView === 'sdc_hub' && (
    <QuantitativeSDCHub />
  )}

  {/* CALDICOTT PRINCIPLE 8 TRANSPARENCY & W3C PROV-O LEDGER (PHASE 7) */}
  {workspaceView === 'transparency_ledger' && (
    <CaldicottTransparencyPortal />
  )}

  {/* ENTERPRISE PROCUREMENT READINESS & SATRE/DSPT (PHASE 10) */}
  {workspaceView === 'procurement_readiness' && (
    <ProcurementReadinessHub
      onNavigateToBuildDeploy={onNavigateToBuildDeploy}
      onNavigateToGovernanceAtlas={() => onNavigateToPlaybook?.('sec-caldicott')}
    />
  )}

  {/* ISO/IEC 27001:2022 ISMS, SOA & DEA 2017 BUILD-UP DOCS & DOCS-TO-OPA PIPELINE */}
  {workspaceView === 'isms_dea_buildup' && (
    <IsmsDeaBuildupSection
      onNavigateToDecisionRegister={onNavigateToDecisionRegister}
      onNavigateToMatrix={() => setWorkspaceView('statutory_matrix')}
    />
  )}

  {/* 4. THE PLAIN-ENGLISH POLICY INSPECTOR MODAL/DRAWER */}
  {inspectedGate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
                  Plain-English Statutory Policy Inspector
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{inspectedGate.gateName}</h3>
              </div>
              <button
                onClick={() => setInspectedGate(null)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <strong className="text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] block">
                  Plain-English Statutory Translation:
                </strong>
                <p className="text-slate-900 dark:text-slate-100 text-sm leading-relaxed">{inspectedGate.plainEnglishSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Statutory Authority</span>
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block">{inspectedGate.statutoryBasis}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Triggered Policy Node</span>
                  <span className="text-xs font-mono text-[#005EB8] dark:text-sky-300 block">{inspectedGate.triggerNode}</span>
                </div>
              </div>

              {/* Architecture Decision Register Linkage Block */}
              <div className="p-3.5 bg-sky-50 dark:bg-slate-800 rounded-lg border border-sky-200 dark:border-sky-900/40 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#005EB8] text-white font-bold">
                      {inspectedGate.decisionRef}
                    </span>
                    <strong className="text-slate-900 dark:text-white text-xs">{inspectedGate.decisionTitle}</strong>
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                    Accountable Authority: <span className="font-medium text-slate-800 dark:text-slate-200">{inspectedGate.decisionRole}</span>
                  </span>
                </div>
                {onNavigateToDecisionRegister && (
                  <button
                    onClick={() => {
                      const ref = inspectedGate.decisionRef;
                      setInspectedGate(null);
                      onNavigateToDecisionRegister(ref);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <span>Open Decision Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Scoped Dark Terminal for Rule */}
              <div className="space-y-1.5">
                <span className="text-slate-500 font-mono text-[11px] block">
                  Machine-Executable Constraint Shape:
                </span>
                <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{inspectedGate.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {onNavigateToDecisionRegister ? (
                <button
                  onClick={() => {
                    const ref = inspectedGate.decisionRef;
                    setInspectedGate(null);
                    onNavigateToDecisionRegister(ref);
                  }}
                  className="text-xs font-medium text-[#005EB8] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>View Governance Track ({inspectedGate.decisionRef})</span>
                </button>
              ) : <div />}
              <button
                onClick={() => setInspectedGate(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. STANDARDIZED EVIDENCE PACK & COMPLIANCE DOSSIER MODAL */}
      <EvidenceDossierModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        evaluation={{
          gates: evaluation.gates.map((g) => ({
            gateName: g.gateName,
            status: g.status,
            rationale: g.plainEnglishSummary,
            statutoryBasis: g.statutoryBasis,
            triggerNode: g.triggerNode,
            decisionRef: g.decisionRef,
            decisionTitle: g.decisionTitle
          })),
          overallDecision: evaluation.overallDecision === 'APPROVED' ? 'APPROVED' : 'REQUIRES_AMENDMENT',
          decisionColor: evaluation.decisionColor,
          decisionReason: evaluation.decisionReason,
          auditHash: evaluation.auditHash,
          evaluatedAt: evaluation.evaluatedAt
        }}
        protocolParams={{
          researcherStatus,
          ethicsStatus,
          s251Status,
          dataTier,
          minCellCount,
          dominanceRatio,
          enclaveEgressBlocked,
          aiWorkloadType,
          aiHumanSponsorLinked,
          studyTitle: selectedPresetId ? PRESET_SCENARIOS.find((p) => p.id === selectedPresetId)?.name : 'Cardiovascular Outcomes Observational Cohort Study',
          leadInstitution: 'NHS Foundation Trust & University Health Partners',
          chiefInvestigator: 'Prof. A. Henderson (Honorary Consultant)'
        }}
        onNavigateToDecisionRegister={onNavigateToDecisionRegister}
      />

      {/* 6. EXPANSIVE INSTITUTIONAL GOVERNANCE CHARTER MODAL */}
      <GovernanceCharterModal
        isOpen={isCharterModalOpen}
        onClose={() => setIsCharterModalOpen(false)}
      />
    </div>
  );
};
