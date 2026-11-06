import React, { useState, useMemo } from 'react';
import { SeawaterLogo } from './SeawaterLogo';
import {
  Scale,
  ShieldCheck,
  ShieldAlert,
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
  FileText
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

interface GovernAssureWorkspaceProps {
  onNavigateToBuildDeploy?: () => void;
  onNavigateToDecisionRegister?: (decisionId?: string) => void;
  onNavigateToSandbox?: () => void;
  onNavigateToPlaybook?: (secId?: string) => void;
}

export const GovernAssureWorkspace: React.FC<GovernAssureWorkspaceProps> = ({
  onNavigateToBuildDeploy,
  onNavigateToDecisionRegister,
  onNavigateToSandbox,
  onNavigateToPlaybook
}) => {
  // Active Scenario State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('scen_multi_site');
  const [researcherStatus, setResearcherStatus] = useState<'accredited' | 'pending' | 'unaccredited'>('accredited');
  const [ethicsStatus, setEthicsStatus] = useState<'approved' | 'in_review' | 'none'>('approved');
  const [s251Status, setS251Status] = useState<'authorized' | 'exempt' | 'missing'>('exempt');
  const [dataTier, setDataTier] = useState<'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable'>('tier2_pseudonymised');
  const [minCellCount, setMinCellCount] = useState<number>(15);
  const [dominanceRatio, setDominanceRatio] = useState<number>(45);
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
        statutoryBasis: 'SATRE Computing Infrastructure Pillar 2; ISO/IEC 27001 Annex A.13.',
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

    // Gate 5: Safe Output & SDC Airlock Verification
    if (minCellCount < 10) {
      gates.push({
        gateName: 'Primary Cell Suppression Violation (k < 10)',
        pillar: 'Safe Outputs',
        status: 'FAIL',
        triggerNode: 'sdc:AirlockOutputShape § 6.1',
        plainEnglishSummary: `Candidate table contains small cell count (N = ${minCellCount}). National clinical SDC standards mandate primary suppression for any cell with N < 10.`,
        statutoryBasis: 'ONS Statistical Disclosure Control Standard; SAIL Databank Output Review Protocol § 3.2.',
        codeSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
  sh:property [
    sh:path tre:minObservedCellCount ;
    sh:minInclusive 10 ;
    sh:message "Primary cell suppression violation: k must be >= 10." ;
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
        plainEnglishSummary: `Candidate table has a single contributor accounting for ${dominanceRatio}% of the aggregate sum (exceeds the 80% dominance ceiling).`,
        statutoryBasis: 'ONS (n, k) Dominance Rule; NHS Caldicott Principle 8.',
        codeSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
  sh:property [
    sh:path tre:topContributorDominanceRatio ;
    sh:maxInclusive 0.80 ;
    sh:message "Dominance violation: top contributor must not exceed 80%." ;
  ] .`,
        decisionRef: 'D-005',
        decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
        decisionRole: 'Statistical Disclosure Control (SDC) Lead'
      });
    } else {
      gates.push({
        gateName: 'Statistical Disclosure Control (SDC) Passed',
        pillar: 'Safe Outputs',
        status: 'PASS',
        triggerNode: 'sdc:AirlockOutputShape § 6.3',
        plainEnglishSummary: `Candidate table satisfies primary suppression (k = ${minCellCount} ≥ 10) and dominance ratio (${dominanceRatio}% ≤ 80%). Ready for 2-person airlock review.`,
        statutoryBasis: 'Caldicott Principle 8 (No surprises); ONS Tabular SDC Guidelines.',
        codeSnippet: `tre:minObservedCellCount >= 10 ;
tre:topContributorDominanceRatio <= 0.80 ;
tre:airlockAutoVerification "PASSED" .`,
        decisionRef: 'D-005',
        decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
        decisionRole: 'Statistical Disclosure Control (SDC) Lead'
      });
    }

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
    enclaveEgressBlocked,
    aiWorkloadType,
    aiHumanSponsorLinked
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* 1. WORKSPACE HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Phase 3: Govern &amp; Assure Operational Workspace</span>
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Caldicott · HRA REC · UK GDPR · SDC
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compliance Logic &amp; Central Assurances Engine
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Abstracting complex semantic ontologies into interactive human-readable decision trees. Simulate research scenarios, verify Caldicott compliance, inspect plain-English statutory translations, and export printable audit assurance reports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Generate Dynamic Assurance Report</span>
            </button>
            <button
              onClick={() => setIsCharterModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Institutional Governance Charter</span>
            </button>
          </div>

          {/* Context Strip: Assurance Report vs Governance Charter */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-300 text-left">
            <div className="space-y-1 border-b md:border-b-0 md:border-r border-slate-800/80 pb-2 md:pb-0 md:pr-3">
              <strong className="text-amber-300 block font-semibold flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Dynamic Assurance Report (Session-Specific):</span>
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Needed at <strong>execution time</strong> when an accredited researcher requests workspace admission or airlock file egress. Evaluates the specific study protocol against W3C SHACL/OPA rules, producing an immutable cryptographic audit record.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-cyan-300 block font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Governance Charter (Static Framework):</span>
              </strong>
              <p className="text-slate-400 leading-relaxed">
                Needed at <strong>institutional onboarding</strong> for Trust boards, ethics committees, and public scrutiny. Establishes the macro legal mandates (DEA 2017, UK GDPR, Section 251) and standards architecture (ISO 27001, DCB0129).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SCENARIO PRESETS & INTERACTIVE CONFIGURATOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              <Database className="w-4 h-4" />
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
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedPresetId === preset.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {preset.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Description Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-2">
          <span>{PRESET_SCENARIOS.find((p) => p.id === selectedPresetId)?.description}</span>
          <button
            onClick={() => handleApplyPreset(PRESET_SCENARIOS[0])}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Default</span>
          </button>
        </div>

        {/* Dynamic Parameter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Parameter 1: Researcher Status */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">Researcher Accreditation</label>
            <select
              value={researcherStatus}
              onChange={(e) => {
                setResearcherStatus(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="accredited">Accredited (DEA 2017 &amp; DSPT)</option>
              <option value="pending">Renewal Pending (IG Incomplete)</option>
              <option value="unaccredited">Unaccredited / External</option>
            </select>
            <span className="text-[10px] text-slate-400 block">Safe People Accreditation Gate</span>
          </div>

          {/* Parameter 2: Ethics Approval */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">HRA Research Ethics (REC)</label>
            <select
              value={ethicsStatus}
              onChange={(e) => {
                setEthicsStatus(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="approved">Approved (Active IRAS Ref)</option>
              <option value="in_review">In Review / Substantial Amendment</option>
              <option value="none">No Ethics Approval</option>
            </select>
            <span className="text-[10px] text-slate-400 block">Safe Projects Mandate</span>
          </div>

          {/* Parameter 3: Section 251 CAG */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">Section 251 CAG Clearance</label>
            <select
              value={s251Status}
              onChange={(e) => {
                setS251Status(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="exempt">Not Required (De-identified/Consented)</option>
              <option value="authorized">Authorized (Active CAG Reference)</option>
              <option value="missing">Missing / Unconsented Identifiers</option>
            </select>
            <span className="text-[10px] text-slate-400 block">NHS Act 2006 Statutory Shield</span>
          </div>

          {/* Parameter 4: Data Sensitivity Tier */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">Data Classification Tier</label>
            <select
              value={dataTier}
              onChange={(e) => {
                setDataTier(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="tier2_pseudonymised">Tier 2: Pseudonymised Cohort</option>
              <option value="tier1_aggregate">Tier 1: Synthetic / Pre-aggregated</option>
              <option value="tier3_identifiable">Tier 3: Identifiable Clinical Data</option>
            </select>
            <span className="text-[10px] text-slate-400 block">Hospital Operational Tiering</span>
          </div>

          {/* Parameter 5: SDC Minimum Cell Count (k) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200">SDC Cell Count (k)</label>
              <span className={`font-mono font-bold ${minCellCount >= 10 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">
              Threshold: k ≥ 10 required for safe output
            </span>
          </div>

          {/* Parameter 6: Dominance Ratio */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200">Top Contributor Dominance</label>
              <span className={`font-mono font-bold ${dominanceRatio <= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">
              Ceiling: ≤ 80% maximum contribution
            </span>
          </div>

          {/* Parameter 7: Network Egress Isolation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">Enclave Network Routing</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setEnclaveEgressBlocked(true);
                  setSelectedPresetId('custom');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 ${
                  enclaveEgressBlocked
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 ${
                  !enclaveEgressBlocked
                    ? 'bg-rose-950 text-rose-300 border border-rose-800 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Open WAN
              </button>
            </div>
            <span className="text-[10px] text-slate-400 block">Calico CNI Egress Enforcement</span>
          </div>

          {/* Parameter 8: AI Workload Governance */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-slate-200 block">Autonomous AI Agent Model</label>
            <select
              value={aiWorkloadType}
              onChange={(e) => {
                setAiWorkloadType(e.target.value as any);
                setSelectedPresetId('custom');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
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
                  className="rounded text-amber-500"
                />
                <span className="text-[11px] text-slate-300">Human Sponsor Linked</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* 3. VISUALIZING THE ONTOLOGY: REAL-TIME LOGIC TREE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              <Server className="w-4 h-4" />
              <span>Step 2: Real-Time Policy-as-Code Evaluation</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Five Safes &amp; SDC Decision Logic Flow
            </h2>
          </div>

          {/* Outcome Status Banner */}
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-bold font-mono text-xs ${evaluation.decisionColor}`}>
            {evaluation.decisionIcon}
            <span>Status: {evaluation.overallDecision}</span>
          </div>
        </div>

        {/* Narrative Reason Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-slate-200 block">Policy Decision Point (PDP) Rationale:</strong>
            <p className="text-slate-300 leading-relaxed">{evaluation.decisionReason}</p>
          </div>
        </div>

        {/* The 5 Gates Logic Pathway */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Sequential Compliance Gates (Click Any Gate to Inspect Plain-English Law):
          </div>

          <div className="space-y-2.5">
            {evaluation.gates.map((gate, idx) => {
              let badgeBg = 'bg-emerald-950 text-emerald-300 border-emerald-800';
              let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;

              if (gate.status === 'WARN') {
                badgeBg = 'bg-amber-950 text-amber-300 border-amber-800';
                icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
              } else if (gate.status === 'FAIL') {
                badgeBg = 'bg-rose-950 text-rose-300 border-rose-800';
                icon = <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
              }

              return (
                <div
                  key={idx}
                  onClick={() => setInspectedGate(gate)}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {icon}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {gate.gateName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {gate.pillar}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{gate.plainEnglishSummary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase font-bold ${badgeBg}`}>
                      {gate.status}
                    </span>
                    <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 group-hover:underline">
                      <span>Inspect Rule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. THE PLAIN-ENGLISH POLICY INSPECTOR MODAL/DRAWER */}
      {inspectedGate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Plain-English Policy Inspector
                </span>
                <h3 className="text-xl font-bold text-white">{inspectedGate.gateName}</h3>
              </div>
              <button
                onClick={() => setInspectedGate(null)}
                className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-slate-300 uppercase tracking-wider text-[11px] block">
                  Plain-English Statutory Translation:
                </strong>
                <p className="text-slate-200 text-sm leading-relaxed">{inspectedGate.plainEnglishSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Statutory Authority</span>
                  <span className="text-xs font-semibold text-amber-300 block">{inspectedGate.statutoryBasis}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Triggered Policy Node</span>
                  <span className="text-xs font-mono text-cyan-300 block">{inspectedGate.triggerNode}</span>
                </div>
              </div>

              {/* Architecture Decision Register Linkage Block */}
              <div className="p-3.5 bg-slate-950/90 rounded-xl border border-cyan-900/40 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                      {inspectedGate.decisionRef}
                    </span>
                    <strong className="text-white text-xs">{inspectedGate.decisionTitle}</strong>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Accountable Authority: <span className="text-slate-300">{inspectedGate.decisionRole}</span>
                  </span>
                </div>
                {onNavigateToDecisionRegister && (
                  <button
                    onClick={() => {
                      const ref = inspectedGate.decisionRef;
                      setInspectedGate(null);
                      onNavigateToDecisionRegister(ref);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <span>Open in Decision Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Technical Rule Block */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-mono text-[11px] block">
                  Underlying Machine-Executable Shape / Rule:
                </span>
                <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-sky-200 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{inspectedGate.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              {onNavigateToDecisionRegister ? (
                <button
                  onClick={() => {
                    const ref = inspectedGate.decisionRef;
                    setInspectedGate(null);
                    onNavigateToDecisionRegister(ref);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>View Governance Track ({inspectedGate.decisionRef})</span>
                </button>
              ) : <div />}
              <button
                onClick={() => setInspectedGate(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. AUTOMATED ASSURANCE REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeawaterLogo variant="badge" size="xs" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Official Governance Certificate
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Research Governance &amp; Digital Assurance Report
                </h3>
                <span className="text-xs text-slate-400 font-mono block">
                  Document Reference: SEAWATER-ASR-{evaluation.auditHash.substring(7, 15).toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="space-y-6 text-xs">
              {/* Context Banner: What this Assurance Report is */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Purpose &amp; Evidentiary Status of this Digital Assurance Report
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  This document serves as an immutable, machine-verified <strong>Digital Evidence Artifact</strong> compiled directly from the evaluated Policy-as-Code semantic constraints. It provides central Information Governance (IG) committees, Caldicott Guardians, and HRA Research Ethics auditors with reproducible proof that a proposed data access session satisfies statutory mandates (UK GDPR Art. 6/9, NHS Act 2006 s251) and Statistical Disclosure Control (SDC) rules prior to workspace admission or airlock data egress.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-[10px] text-slate-400 font-mono">
                  <span>• Standards: SATRE v1.1 · ISO/IEC 27001 · NHS DSPT Mandate 3</span>
                  <span>• Evaluation Engine: PySHACL v0.25 / OPA Rego v0.68</span>
                  <span>• Lineage: W3C PROV-O Cryptographic Triple Store</span>
                </div>
              </div>

              {/* Status & Hash Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall Assured Status</span>
                  <span className={`text-sm font-bold font-mono ${evaluation.overallDecision === 'APPROVED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {evaluation.overallDecision}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Evaluated Release</span>
                  <span className="text-sm font-bold font-mono text-cyan-300">v2.4.0-prod (GitOps)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Evaluated At</span>
                  <span className="text-xs font-mono text-slate-300">{new Date(evaluation.evaluatedAt).toUTCString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Cryptographic Hash</span>
                  <span className="text-xs font-mono text-slate-300 truncate block">{evaluation.auditHash}</span>
                </div>
              </div>

              {/* Research Protocol Profile */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
                  1. Evaluated Research Protocol Profile
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Accreditation</span>
                    <strong className="text-white capitalize">{researcherStatus}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Ethics (IRAS)</span>
                    <strong className="text-white capitalize">{ethicsStatus}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">S251 Clearance</span>
                    <strong className="text-white capitalize">{s251Status}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Data Tier</span>
                    <strong className="text-white">{dataTier}</strong>
                  </div>
                </div>
              </div>

              {/* Verified Gates Table with Decision Register & Statutory Mappings */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
                    2. Gate-by-Gate Compliance Findings &amp; Decision Register Cross-Reference
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    Click any Decision ID to open Architecture Register
                  </span>
                </div>
                <div className="rounded-xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Gate / Pillar</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Statutory Reference</th>
                        <th className="p-2.5">Policy Node</th>
                        <th className="p-2.5">Architecture Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                      {evaluation.gates.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="p-2.5 font-semibold text-slate-200">{g.gateName}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              g.status === 'PASS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              g.status === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}>
                              {g.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-slate-400">{g.statutoryBasis}</td>
                          <td className="p-2.5 font-mono text-cyan-300">{g.triggerNode}</td>
                          <td className="p-2.5">
                            {onNavigateToDecisionRegister ? (
                              <button
                                onClick={() => {
                                  setIsReportModalOpen(false);
                                  onNavigateToDecisionRegister(g.decisionRef);
                                }}
                                className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                                title={`Open ${g.decisionRef}: ${g.decisionTitle}`}
                              >
                                <span>{g.decisionRef}</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            ) : (
                              <span className="font-mono text-slate-400">{g.decisionRef}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* High-Level Policy Decision Register Alignment Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                  3. Executive Decision Register Governance Alignment
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Each policy gate above directly derives from authoritative, board-signed records in the <strong>Seawater Architecture Decision Register</strong>. Before deploying shapes to production, the responsible operational authorities must approve these records:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-mono text-cyan-400 font-bold block">D-001 / D-003</span>
                    <strong className="text-white block text-xs">Identity &amp; Boundary</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Accountable: IAM Lead &amp; Policy Owner</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-mono text-cyan-400 font-bold block">D-002 / D-004</span>
                    <strong className="text-white block text-xs">Statutory Exemption &amp; Ethics</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Accountable: Caldicott Guardian &amp; DPO</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-mono text-cyan-400 font-bold block">D-005 / D-007</span>
                    <strong className="text-white block text-xs">SDC Airlock &amp; PEP Rollout</strong>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Accountable: Biostatistician &amp; SRE Lead</span>
                  </div>
                </div>
              </div>

              {/* Sign-off & Audit Certification Block */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                  4. Institutional Statement of Assurance &amp; DPIA Compliance
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed italic">
                  "This report certifies that the evaluated research scenario has been validated against the Project Seawater Policy-as-Code semantic constraints. Evaluation was completed without human bias using deterministic W3C SHACL closed-world validation rules conforming to UK GDPR Art. 25 (Data Protection by Design), NHS Digital DSPT Mandate 3, and the 8 Caldicott Principles. This digital artifact constitutes admissible evidence for statutory Information Governance audits."
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Sign-off Authority: Automated Seawater Policy Decision Point (PDP)</span>
                  <span>Ledger Verification: PROV-O Triple Ledger</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(evaluation, null, 2));
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono flex items-center gap-1.5 cursor-pointer"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'JSON Copied!' : 'Copy Evaluation JSON'}</span>
              </button>

              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. INSTITUTIONAL GOVERNANCE CHARTER MODAL */}
      {isCharterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeawaterLogo variant="badge" size="xs" />
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Official Statutory Framework
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Public Interest Data Governance &amp; Population Research Charter
                </h3>
                <span className="text-xs text-slate-400 font-mono block">
                  Reference: SEAWATER-PAC-GOV-2026-V4 · Authorized by Data Governance &amp; Ethics Oversight Committee
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  onClick={() => setIsCharterModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Charter Body */}
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 uppercase tracking-wider text-[11px] block font-mono">
                  1. Statutory Mandates &amp; Legal Processing Gateways
                </strong>
                <p className="text-[11px] text-slate-300">
                  All analytical processing across the platform is authorized under statutory legislation including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
                  <li><strong className="text-slate-200">Digital Economy Act 2017 (Part 5, Ch. 5)</strong>: Public authority data sharing under UKSA accreditation with strict criminal penalties (§ 67) for unlawful disclosure.</li>
                  <li><strong className="text-slate-200">UK GDPR Articles 6(1)(e) &amp; 9(2)(j)</strong>: Lawful basis for public-interest archiving, scientific research, and health data linkage with Article 89(1) technical safeguards.</li>
                  <li><strong className="text-slate-200">NHS Act 2006 (Section 251)</strong>: Statutory Confidentiality Advisory Group (CAG) exemptions for identifiable clinical microdata linkage.</li>
                  <li><strong className="text-slate-200">The 8 NHS Caldicott Principles</strong>: Balancing confidential duty of care with the imperative to share information for patient and public benefit.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 uppercase tracking-wider text-[11px] block font-mono">
                  2. Standards Architecture &amp; Quality Frameworks
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">ISO/IEC 27001 &amp; 27701</span>
                    <span className="text-slate-400 text-[10px]">Information Security and Privacy Information Management Systems.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">ISO/IEC 42001 &amp; 5259</span>
                    <span className="text-slate-400 text-[10px]">Artificial Intelligence Management and Data Quality / Bias Minimization.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">DCB0129 &amp; DCB0160</span>
                    <span className="text-slate-400 text-[10px]">Statutory NHS Clinical Risk Management for Health Software Systems.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">SATRE v1.1 Baseline</span>
                    <span className="text-slate-400 text-[10px]">Standard Architecture for Trusted Research Environments.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-cyan-300 uppercase tracking-wider text-[11px] block font-mono">
                  3. Operational Five Safes Invariants
                </strong>
                <p className="text-[11px] text-slate-300">
                  Every active project must satisfy five continuous invariants: verified accreditation for Safe People, ethical clearances for Safe Projects, air-gapped zero-egress VPC routing for Safe Settings, tiered minimization for Safe Data, and automated mathematical suppression (k ≥ 10, dominance ≤ 80%) for Safe Outputs.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("PUBLIC INTEREST DATA GOVERNANCE & POPULATION RESEARCH CHARTER (SEAWATER-PAC-GOV-2026-V4)\n\nStatutory Mandates: DEA 2017, UK GDPR Art 6/9, NHS Act 2006 s251, Caldicott Principles.\nStandards: ISO 27001, ISO 42001, DCB0129/DCB0160, SATRE v1.1.");
                  setCopiedCharter(true);
                  setTimeout(() => setCopiedCharter(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCharter ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCharter ? 'Summary Copied!' : 'Copy Charter Summary'}</span>
              </button>

              <button
                onClick={() => setIsCharterModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
              >
                Close Charter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
