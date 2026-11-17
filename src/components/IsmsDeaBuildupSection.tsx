import React, { useState, useMemo, useEffect } from 'react';
import {
  CORE_ISMS_ROLES,
  SIX_PHASE_PLAYBOOK,
  POST_CERT_CADENCE,
  ISMS_DEA_BUILDUP_ARTEFACTS,
  DOCS_TO_OPA_SWITCHES,
  BuildupSubTab,
  BuildupCategory,
  IsmsBuildupArtefact
} from '../data/ismsDeaBuildupData';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Copy,
  Check,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Cpu,
  Terminal,
  Scale,
  RotateCcw,
  Workflow,
  Users,
  Calendar,
  Map,
  Info
} from 'lucide-react';

interface IsmsDeaBuildupSectionProps {
  onNavigateToDecisionRegister?: (decisionId?: string) => void;
  onNavigateToMatrix?: () => void;
}

const STORAGE_KEY_READY_IDS = 'wavebound_isms_dea_buildup_ready';

export const IsmsDeaBuildupSection: React.FC<IsmsDeaBuildupSectionProps> = ({
  onNavigateToDecisionRegister,
  onNavigateToMatrix
}) => {
  const [activeSubTab, setActiveSubTab] = useState<BuildupSubTab>('roles');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(SIX_PHASE_PLAYBOOK[0].id);
  const [selectedCategory, setSelectedCategory] = useState<'All' | BuildupCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(ISMS_DEA_BUILDUP_ARTEFACTS[0].id);
  const [showOptionalOpaMapping, setShowOptionalOpaMapping] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persisted readiness progress for ISO/DEA build-up artefacts
  const [readyArtefacts, setReadyArtefacts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_READY_IDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage errors in restricted environments
    }
    return {
      'isms-scope-statement': true,
      'isms-soa-register': true,
      'sop-airlock-sdc': true
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_READY_IDS, JSON.stringify(readyArtefacts));
    } catch {
      // Ignore storage errors
    }
  }, [readyArtefacts]);

  // Optional Docs-to-OPA Claim Switches (Sub-tab 5)
  const [claimState, setClaimState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    DOCS_TO_OPA_SWITCHES.forEach((sw) => {
      initial[sw.id] = sw.defaultActive;
    });
    return initial;
  });

  const toggleArtefactReady = (id: string) => {
    setReadyArtefacts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOptionalOpa = (id: string) => {
    setShowOptionalOpaMapping((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClaim = (id: string) => {
    setClaimState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const applyClaimPreset = (
    preset: 'compliant' | 'missing_soa' | 'kpi_competence_fail' | 'cve_airlock_fail'
  ) => {
    const base: Record<string, boolean> = {};
    DOCS_TO_OPA_SWITCHES.forEach((sw) => {
      base[sw.id] = true;
    });

    if (preset === 'missing_soa') {
      base.soaApproved = false;
      base.climateResilienceChecked = false;
    } else if (preset === 'kpi_competence_fail') {
      base.kpiObjectivesMet = false;
      base.competenceVerified = false;
      base.igTrainingValid = false;
    } else if (preset === 'cve_airlock_fail') {
      base.harborCveClean = false;
      base.airlockDualSignoff = false;
    }
    setClaimState(base);
  };

  // Evaluate optional OPA verdicts derived from docs + live processes
  const opaEvaluation = useMemo(() => {
    const governanceBaselineReady =
      Boolean(claimState.ismsCertified) &&
      Boolean(claimState.climateResilienceChecked) &&
      Boolean(claimState.soaApproved);

    const operationalAttestationReady =
      Boolean(claimState.kpiObjectivesMet) &&
      Boolean(claimState.competenceVerified) &&
      Boolean(claimState.deaS71Active) &&
      Boolean(claimState.igTrainingValid) &&
      Boolean(claimState.harborCveClean);

    const admissionAllowed = governanceBaselineReady && operationalAttestationReady;
    const egressPermitted = admissionAllowed && Boolean(claimState.airlockDualSignoff);

    const synthesizedInputJson = {
      governance: {
        soa_approved_current: Boolean(claimState.soaApproved),
        soa_revision_id: claimState.soaApproved ? 'SOA-2026-Q4-SIGNED' : 'UNAPPROVED_DRAFT',
        clause62_kpis_within_target: Boolean(claimState.kpiObjectivesMet),
        clause72_competence_verified: Boolean(claimState.competenceVerified)
      },
      enclave: {
        isms_27001_certified: Boolean(claimState.ismsCertified),
        climate_resilience_assessed: Boolean(claimState.climateResilienceChecked),
        cve_and_egress_verified: Boolean(claimState.harborCveClean),
        scope_boundary: 'uk_sovereign_tre_prod'
      },
      project: {
        dea_rap_accreditation_valid: Boolean(claimState.deaS71Active),
        statutory_gateway: 'DEA_2017_Part5_Ch5'
      },
      researcher: {
        ig_and_vetting_valid: Boolean(claimState.igTrainingValid),
        mfa_fido2_verified: Boolean(claimState.igTrainingValid)
      },
      export: {
        sdc_and_dual_signoff_complete: Boolean(claimState.airlockDualSignoff),
        min_cell_count: claimState.airlockDualSignoff ? 14 : 6
      }
    };

    return {
      governanceBaselineReady,
      operationalAttestationReady,
      admissionAllowed,
      egressPermitted,
      synthesizedInputJson
    };
  }, [claimState]);

  const categories: ('All' | BuildupCategory)[] = [
    'All',
    'Mandatory Clauses 4–10',
    'Risk & Statement of Applicability',
    'Operational SOPs & Annex A',
    'DEA 2017 Accreditation Dossier'
  ];

  const filteredArtefacts = useMemo(() => {
    return ISMS_DEA_BUILDUP_ARTEFACTS.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.clauseRef.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.platformPreparationRequirement.toLowerCase().includes(q) ||
        item.ownerRole.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const readyCount = ISMS_DEA_BUILDUP_ARTEFACTS.filter((a) => readyArtefacts[a.id]).length;
  const totalCount = ISMS_DEA_BUILDUP_ARTEFACTS.length;
  const readinessPct = Math.round((readyCount / totalCount) * 100);
  const stageOneMandatoryCount = ISMS_DEA_BUILDUP_ARTEFACTS.filter((a) => a.stageOneCritical).length;
  const stageOneReadyCount = ISMS_DEA_BUILDUP_ARTEFACTS.filter(
    (a) => a.stageOneCritical && readyArtefacts[a.id]
  ).length;

  const selectedPhase =
    SIX_PHASE_PLAYBOOK.find((p) => p.id === selectedPhaseId) || SIX_PHASE_PLAYBOOK[0];

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportReadinessMarkdown = () => {
    const lines = [
      '# Safe & Secure Data Intelligence Platform — ISO/IEC 27001:2022 ISMS & DEA 2017 Playbook',
      `Generated: ${new Date().toISOString()}`,
      `Build-Up Progress: ${readyCount}/${totalCount} deliverables ready (${readinessPct}%)`,
      `Stage 1 Mandatory Clauses 4–10 Ready: ${stageOneReadyCount}/${stageOneMandatoryCount}`,
      '',
      '## 1. Four Core Audit Accountability Roles',
      ...CORE_ISMS_ROLES.map(
        (r) => `- **${r.roleTitle}** (${r.clauseAnchor}): ${r.accountabilitySummary}`
      ),
      '',
      '## 2. Six-Phase 24-Week Implementation Roadmap',
      ...SIX_PHASE_PLAYBOOK.map(
        (p) => `- **Phase ${p.phaseNumber} (${p.timelineWeeks}): ${p.title}** — ${p.focusSummary}`
      ),
      '',
      '## 3. Mandatory Clauses 4–10, SoA, SOPs & DEA 2017 Deliverables',
      ...ISMS_DEA_BUILDUP_ARTEFACTS.map((a) => {
        const status = readyArtefacts[a.id] ? '[READY]' : '[PENDING]';
        return `- ${status} **${a.title}** (${a.clauseRef}) · Owner: ${a.ownerRole}\n  - Format: ${a.practicalFormat}\n  - Platform Requirement: ${a.platformPreparationRequirement}`;
      }),
      '',
      '## 4. DEA 2017 vs. Formal ISO 27001 Certification Note',
      '- DEA 2017 Part 5 Ch. 5 delegates accreditation rules to the UKSA Research Code of Practice and Accreditation Criteria.',
      '- UKSA benchmarks processor security against ISO/IEC 27001 controls; holding active certification stands an organization in strong stead, yet is NEVER a blanket waiver—applicants must still complete UKSA evidence-based security assessments (e.g. TRE SAQ V3.1).',
      '',
      '## 5. Is Wavebound Consistent with DEA 2017?',
      '- Yes, for DEA Research Code & Accreditation Criteria: Wavebound maps directly to the Five Safes, UKSA SAQ V3.1 controls, W3C PROV-O audit trails, and Research Accreditation Panel (RAP) human governance.',
      '- Statutory Boundary (DEA s64): Health and adult social care data are excluded from DEA Part 5 Ch. 5 research powers and instead require UK GDPR Art 6/9, Common Law Duty of Confidentiality, NHS Act 2006 s251/CAG, and NHS DSPT.',
      '- PaC automates gate verification and immutable audit trails but never replaces human RAP accreditation sign-off.',
      '',
      '## 6. Where Cyber Security Fits',
      '- Technical Cyber Security (NCSC Cyber Assessment Framework, Cyber Essentials Plus, NHS DSPT, ISO/IEC 27001:2022 Annex A.8) forms the operational Safe Settings spine inside the ISMS—covering zero-egress VPC/eBPF, pixel-only VDI, FIDO2 MFA, KMS AES-256, container CVE hardening, and SIEM telemetry.',
      '- It operates alongside—not instead of—Information Governance (legal gateways, Caldicott, ethics) and Statistical Disclosure Control (k >= 10 Safe Outputs airlock).'
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iso27001-dea-platform-playbook.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const subTabs: { id: BuildupSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'roles', label: '1. Core Roles & Independence', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'roadmap', label: '2. 6-Phase Roadmap (24 Wks)', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'artifacts', label: `3. ${totalCount} Mandatory Artifacts & SOPs`, icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'cadence', label: '4. 3-Year Operating Cadence', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'opa_mapper', label: '5. Optional Docs-to-OPA Mapper', icon: <Workflow className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="w-full space-y-6">
      {/* 1. Tech-Agnostic Platform Readiness Header + KPI Strip */}
      <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-200 dark:border-cyan-900/50 pb-5">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-300">
              <span>ISO/IEC 27001:2022 Clauses 4–10</span>
              <span aria-hidden="true">·</span>
              <span>Amendment 1:2024</span>
              <span aria-hidden="true">·</span>
              <span>93 Annex A Controls</span>
              <span aria-hidden="true">·</span>
              <span>DEA 2017 Part 5 Ch. 5</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              ISO/IEC 27001:2022 &amp; DEA 2017 Platform Preparation Playbook
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed">
              What any safe &amp; secure data intelligence platform must establish—people roles, scoping, risk methodology, 93-control Statement of Applicability, 60–90 days of operational evidence, internal audit, and run-state cadence—<strong>independently of any specific policy engine</strong>. Optional Policy-as-Code / OPA automation lives cleanly in Tab 5.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExportReadinessMarkdown}
              className="px-3.5 py-2 rounded-lg bg-[#00A389] hover:bg-teal-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Platform Playbook (.md)</span>
            </button>
            {onNavigateToDecisionRegister && (
              <button
                type="button"
                onClick={() => onNavigateToDecisionRegister('D-001')}
                className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-[#07192f] hover:bg-slate-200 dark:hover:bg-[#123154] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#1b3f68] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-[#005EB8] dark:text-cyan-400" />
                <span>Decision Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Platform Readiness Counters (Technology-Agnostic, Tabular Figures) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full flex flex-col justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Certification Timeline</span>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              16–24 Wks <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(SME / 1 BU)</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">6–12 mos for multi-site enterprise</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full flex flex-col justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Stage 1 Clauses 4–10 Ready</span>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {stageOneReadyCount} / {stageOneMandatoryCount}{' '}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">critical</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Checked first before Stage 2</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full flex flex-col justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Full Build-Up Pack</span>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {readyCount} / {totalCount}{' '}
              <span className="text-sm font-semibold text-[#00A389] dark:text-emerald-400">({readinessPct}%)</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Clauses, SoA, SOPs &amp; DEA</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full flex flex-col justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Audit &amp; Cert Cycle</span>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              3-Year <span className="text-xs font-normal text-slate-500 dark:text-slate-400">+ 60–90d proof</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Yr 1 &amp; 2 surveillance · Yr 3 recert</div>
          </div>
        </div>

        {/* Statutory Clarity Strip: DEA 2017 Accredited Processor vs. ISO 27001 Certification */}
        <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-cyan-900/50 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#005EB8] dark:text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <strong className="text-slate-900 dark:text-white font-semibold block">
              DEA 2017 Fact-Check: Is formal ISO/IEC 27001 certification strictly mandatory for an Accredited Processor?
            </strong>
            <p>
              The Digital Economy Act 2017 statute (Part 5 Ch. 5, s70–71) delegates accreditation criteria to the{' '}
              <strong>UK Statistics Authority (UKSA) Research Code of Practice</strong> and{' '}
              <strong>Research Accreditation Panel (RAP)</strong>. UKSA models its processor security assessment directly on{' '}
              <strong>ISO/IEC 27001 controls</strong>—for Trusted Research Environments (under UKSA TRE SOP V1.4), active UKAS/ANAB ISO 27001 certification is the standard baseline and stands applicants in strong stead. However, UKSA explicitly warns that{' '}
              <strong>ISO 27001 is NOT a blanket waiver or automatic bypass</strong>: applicants must still complete UKSA&apos;s evidence-based security assessment (SAQ V3.1) and prove live operational controls tailored to the TRE scope.
            </p>
          </div>
        </div>

        {/* DEA 2017 Consistency & Where Cyber Security Fits Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-cyan-900/50 space-y-2 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#005EB8] dark:text-cyan-300">
              <Scale className="w-4 h-4 shrink-0" />
              <span>DEA 2017 Consistency · Statutory Scope &amp; Alignment</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Is this wavebound approach consistent with DEA 2017?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
              <strong>Yes—for Research Code mechanics, with an explicit statutory boundary for health data.</strong> Wavebound operationalises DEA Part 5 Ch. 5 (s64–73) and the UKSA TRE SAQ V3.1 Five Safes via pre-execution SHACL/OPA gates and immutable W3C PROV-O evidence, while keeping human{' '}
              <strong>Research Accreditation Panel (RAP)</strong> decisions supreme. Crucially, <strong>DEA s64 excludes health and adult social care data</strong>, which remain governed by UK GDPR Art 6/9, Common Law Duty of Confidentiality, and NHS Act 2006 s251/CAG.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-cyan-900/50 space-y-2 h-full flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00A389] dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Architecture Placement · NCSC CAF · DSPT · Annex A.8</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Where does Cyber Security fit alongside IG &amp; Statistical Disclosure?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
              <strong>Cyber Security forms the technical &ldquo;Safe Settings&rdquo; spine of the ISMS</strong>—distinct from Information Governance (legal basis, Caldicott, s251) and Statistical Disclosure Control (<strong>Safe Outputs</strong> k&ge;10 airlock). It maps <strong>NCSC Cyber Assessment Framework (CAF)</strong>, <strong>Cyber Essentials Plus</strong>, <strong>NHS DSPT</strong>, and <strong>ISO/IEC 27001:2022 Annex A.8</strong> onto zero-egress VPC/eBPF boundaries, pixel-only VDI, FIDO2 MFA, KMS AES-256, read-only rootless pods, and centralised SIEM alerting.
            </p>
          </div>
        </div>

        {/* Clean Sub-Tabs Navigation */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-[#07192f] border border-slate-200 dark:border-cyan-900/50 rounded-lg">
          {subTabs.map((tab) => {
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white dark:bg-[#00A389] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: 4 CORE GOVERNANCE ROLES & AUDITOR INDEPENDENCE */}
      {activeSubTab === 'roles' && (
        <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-200 dark:border-cyan-900/50 pb-4 space-y-1.5">
            <div className="text-xs font-mono font-semibold text-[#005EB8] dark:text-cyan-300">
              Pre-Phase 1 Accountability Assignment · Tech-Agnostic
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Four Distinct Audit Roles Required Before Starting Phase 1
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
              Accredited Certification Bodies verify clear separation between leadership sponsorship, daily ISMS coordination, hands-on control operation, and independent pre-certification auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {CORE_ISMS_ROLES.map((role) => (
              <div
                key={role.id}
                className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-cyan-900/50 flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-300">
                    <span>{role.clauseAnchor}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {role.roleTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                    {role.accountabilitySummary}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {role.keyResponsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00A389] dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-cyan-900/40 text-xs text-slate-600 dark:text-amber-200/90 leading-relaxed">
                  <strong className="text-slate-800 dark:text-amber-300">Audit Checkpoint: </strong>
                  {role.platformAuditRule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: 6-PHASE 24-WEEK IMPLEMENTATION PLAYBOOK */}
      {activeSubTab === 'roadmap' && (
        <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-200 dark:border-cyan-900/50 pb-4 space-y-1.5">
            <div className="text-xs font-mono font-semibold text-[#005EB8] dark:text-cyan-300">
              End-to-End Build-Up · 16–24 Weeks (SME / Single Platform Unit) · 6–12 Months (Multi-Site Enterprise)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Six-Phase ISO/IEC 27001:2022 Implementation Playbook
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
              Select any phase below to inspect concrete platform deliverables, Clauses 4–10 milestones, and operational proof expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Phase Rail */}
            <div className="lg:col-span-5 space-y-2.5">
              {SIX_PHASE_PLAYBOOK.map((phase) => {
                const isSelected = phase.id === selectedPhase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setSelectedPhaseId(phase.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-[#07192f] border-[#005EB8] dark:border-[#00A389]'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-cyan-900/40 hover:border-cyan-500/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="font-bold text-[#005EB8] dark:text-cyan-300 tabular-nums">
                        Phase {phase.phaseNumber} · {phase.timelineWeeks}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {phase.clauseTags[0]}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {phase.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {phase.focusSummary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Detail */}
            <div className="lg:col-span-7 p-5 sm:p-6 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/50 space-y-4">
              <div className="space-y-1.5 border-b border-slate-200 dark:border-cyan-900/40 pb-3.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-300 tabular-nums">
                  <span className="font-bold">Phase {selectedPhase.phaseNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPhase.timelineWeeks}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPhase.clauseTags.join(' · ')}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedPhase.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  {selectedPhase.focusSummary}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Key Execution Steps &amp; Platform Deliverables
                </div>
                {selectedPhase.deliverables.map((deliv, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-white dark:bg-[#0c2340]/80 border border-slate-200 dark:border-cyan-900/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00A389] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-cyan-900/40 text-xs sm:text-sm text-slate-700 dark:text-amber-200 leading-relaxed">
                <strong className="text-slate-900 dark:text-amber-300">Practical Platform Note: </strong>
                {selectedPhase.platformPracticeNote}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 11 MANDATORY CLAUSES 4–10 ARTIFACTS, SoA, SOPs & DEA DOSSIER */}
      {activeSubTab === 'artifacts' && (
        <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-cyan-900/50 pb-4">
            <div className="space-y-1.5 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#005EB8] dark:text-cyan-400" />
                <span>Mandatory Clauses 4–10 Artifacts, SoA, Operational SOPs &amp; DEA Dossier</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                External auditors check the 11 Clauses 4–10 deliverables first during Stage 1—missing any single mandatory document causes an immediate major nonconformity. Expand any item to inspect tech-agnostic preparation steps, copyable outlines, and (optionally) how it bridges to Policy-as-Code.
              </p>
            </div>

            {onNavigateToMatrix && (
              <button
                type="button"
                onClick={onNavigateToMatrix}
                className="text-xs sm:text-sm font-semibold text-[#005EB8] dark:text-cyan-300 hover:underline flex items-center gap-1.5 self-start lg:self-center shrink-0 cursor-pointer whitespace-nowrap"
              >
                <span>Inspect Consolidated Statutory Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Segmented Controls & Search */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-[#07192f] border border-slate-200 dark:border-cyan-900/50 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white dark:bg-[#00A389] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full xl:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clause (e.g. 6.2, 7.2, 9.3), SOP, owner..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-cyan-900/60 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Empty State or Inventory Rows */}
          {filteredArtefacts.length === 0 ? (
            <div className="p-8 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-cyan-900/40 text-center space-y-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
              <div className="text-base font-semibold text-slate-900 dark:text-white">
                No matching ISMS or DEA build-up artefacts
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Adjust your search filter or reset category selection to view all {totalCount} artefacts.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-3.5 py-2 rounded-lg bg-[#005EB8] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-cyan-900/40 border border-slate-200 dark:border-cyan-900/50 rounded-lg overflow-hidden">
              {filteredArtefacts.map((item: IsmsBuildupArtefact) => {
                const isExpanded = expandedId === item.id;
                const isReady = Boolean(readyArtefacts[item.id]);
                const opaVisible = Boolean(showOptionalOpaMapping[item.id]);

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-950/60 transition-colors"
                  >
                    {/* Summary Row */}
                    <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <span className="text-[#005EB8] dark:text-cyan-300 font-semibold">{item.clauseRef}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>Owner: {item.ownerRole}</span>
                          {item.stageOneCritical && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-700 dark:text-amber-300 font-semibold">
                                Stage 1 Mandatory Check
                              </span>
                            </>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.purpose}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleArtefactReady(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isReady
                              ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                              : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{isReady ? 'Documented & Active' : 'Mark Ready'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#07192f] hover:bg-slate-200 dark:hover:bg-[#123154] text-slate-800 dark:text-cyan-300 border border-slate-200 dark:border-cyan-900/60 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Platform Spec' : 'Inspect Format & Template'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details: Tech-Agnostic Preparation + Template + Optional OPA Bridge */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-4 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50/70 dark:bg-[#07192f]/70 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                          <div className="space-y-1.5">
                            <span className="font-semibold text-slate-800 dark:text-cyan-300 block">
                              Practical Audit Format &amp; Cadence
                            </span>
                            <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                              {item.practicalFormat}
                            </p>
                            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                              Review Cadence: {item.reviewCadence}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="font-semibold text-slate-800 dark:text-emerald-300 block">
                              What a Safe Data Intelligence Platform Must Prepare (Tech-Agnostic)
                            </span>
                            <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                              {item.platformPreparationRequirement}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                              Starter Deliverable Outline (Copyable Markdown Template)
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(item.id, item.templateMarkdown)}
                              className="px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                            >
                              {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === item.id ? 'Copied Markdown' : 'Copy Template'}</span>
                            </button>
                          </div>
                          <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                            <code>{item.templateMarkdown}</code>
                          </pre>
                        </div>

                        {/* Optional Policy-as-Code Automation Bridge (Collapsed by default so OPA stays decoupled) */}
                        <div className="pt-2 border-t border-slate-200 dark:border-cyan-900/40">
                          <button
                            type="button"
                            onClick={() => toggleOptionalOpa(item.id)}
                            className="text-xs sm:text-sm font-semibold text-[#005EB8] dark:text-cyan-300 hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            <Workflow className="w-4 h-4" />
                            <span>
                              {opaVisible
                                ? 'Hide Optional OPA / Policy-as-Code Mapping'
                                : 'Optional: View how this document can feed OPA / Policy-as-Code'}
                            </span>
                          </button>

                          {opaVisible && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                              <div className="space-y-1.5">
                                <span className="font-semibold text-slate-800 dark:text-cyan-300 block">
                                  Optional Policy Design Impact
                                </span>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {item.optionalOpaRuleImpact}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <span className="font-semibold text-slate-800 dark:text-emerald-300 block">
                                  Optional JSON Claim &amp; Rego Assertion
                                </span>
                                <code className="block p-2.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-xs overflow-x-auto">
                                  {item.optionalRuntimeClaim}
                                </code>
                                <pre className="p-3 rounded bg-slate-950 text-emerald-300 border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed">
                                  <code>{item.optionalRegoPreview}</code>
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: 3-YEAR POST-CERTIFICATION OPERATING CADENCE */}
      {activeSubTab === 'cadence' && (
        <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-200 dark:border-cyan-900/50 pb-4 space-y-1.5">
            <div className="text-xs font-mono font-semibold text-[#005EB8] dark:text-cyan-300">
              3-Year Certificate Cycle · Year 1 Surveillance 1 · Year 2 Surveillance 2 · Year 3 Recertification
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Post-Certification Run-State Operating Calendar
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
              ISO/IEC 27001 certification is maintained through continuous operational hygiene rather than annual panic ahead of Surveillance Audits 1 &amp; 2 and Year 3 Recertification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {POST_CERT_CADENCE.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-cyan-900/50 flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="font-bold text-[#00A389] dark:text-emerald-300 uppercase">
                      {item.frequency}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{item.clauseAndAnnexRef}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <ul className="space-y-1.5 pt-1">
                    {item.activities.map((act, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#005EB8] dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-cyan-900/40 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-800 dark:text-cyan-300">Audit Evidence Retained: </strong>
                  {item.auditEvidenceProduced}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: OPTIONAL DOCS-TO-OPA PIPELINE & JSON CLAIM MAPPER */}
      {activeSubTab === 'opa_mapper' && (
        <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-cyan-900/50 pb-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#005EB8] dark:text-cyan-300">
                <Workflow className="w-4 h-4" />
                <span>Optional Automation Layer · Interactive Docs-to-OPA Claim Mapper</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                How Governance Documents &amp; ISMS Processes Optionally Feed OPA Decisions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                Documents do not compile verbatim into Rego. Signed ISO/DEA artefacts (SoA, Climate Context, RAP) set policy baselines, while operational processes (Clause 6.2 KPIs, Clause 7.2 Competence Logs, IG training, CVE scans, Airlock sign-off) emit trusted JSON <code className="font-mono text-[#005EB8] dark:text-cyan-300">input.*</code> claims.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => applyClaimPreset('compliant')}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer whitespace-nowrap"
              >
                All Verified
              </button>
              <button
                type="button"
                onClick={() => applyClaimPreset('missing_soa')}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer whitespace-nowrap"
              >
                SoA / Climate Gap
              </button>
              <button
                type="button"
                onClick={() => applyClaimPreset('kpi_competence_fail')}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer whitespace-nowrap"
              >
                KPI / Clause 7.2 Fail
              </button>
              <button
                type="button"
                onClick={() => applyClaimPreset('cve_airlock_fail')}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                CVE / Airlock Fail
              </button>
            </div>
          </div>

          {/* Live OPA Verdict Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                Simulated OPA Enclave Admission Verdict
              </span>
              <div
                className={`text-sm sm:text-base font-bold font-mono flex items-center gap-2 pt-0.5 ${
                  opaEvaluation.admissionAllowed
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}
              >
                {opaEvaluation.admissionAllowed ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0" />
                )}
                <span>
                  {opaEvaluation.admissionAllowed
                    ? 'ALLOW (All ISMS, KPI, Competence & Technical Attestations Valid)'
                    : 'DENY (Missing Required Governance or Process Attestation)'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1.5 h-full">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                Simulated OPA Airlock Egress Verdict
              </span>
              <div
                className={`text-sm sm:text-base font-bold font-mono flex items-center gap-2 pt-0.5 ${
                  opaEvaluation.egressPermitted
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}
              >
                {opaEvaluation.egressPermitted ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0" />
                )}
                <span>
                  {opaEvaluation.egressPermitted
                    ? 'EGRESS PERMITTED (SDC Thresholds + Dual Sign-Off Verified)'
                    : 'FAIL-CLOSED BLOCK (Airlock Release Held)'}
                </span>
              </div>
            </div>
          </div>

          {/* Two-Column Pipeline: Switches vs Synthesized JSON + Rego Evaluation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Document & Process Attestation Switches */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 pb-1">
                Toggle Upstream Documents &amp; Operational Processes (incl. Clauses 6.2, 7.2 &amp; Amd 1:2024)
              </div>
              {DOCS_TO_OPA_SWITCHES.map((sw) => {
                const active = Boolean(claimState[sw.id]);
                return (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => toggleClaim(sw.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                      active
                        ? 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-cyan-900/50 hover:border-cyan-500/60'
                        : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>{sw.clauseRef}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#005EB8] dark:text-cyan-400">{sw.feedLayer}</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {sw.label}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        Source: {sw.sourceDocOrProcess}
                      </div>
                      <div className="text-xs font-mono text-slate-500 dark:text-cyan-300/90 truncate">
                        Emits: {sw.jsonPath} = {active ? 'true' : 'false'}
                      </div>
                      {!active && (
                        <div className="text-xs text-rose-700 dark:text-rose-300 pt-1">
                          Impact: {sw.failureImpact}
                        </div>
                      )}
                    </div>

                    <div
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold shrink-0 flex items-center gap-1 whitespace-nowrap ${
                        active
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                      }`}
                    >
                      {active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{active ? 'TRUE' : 'FALSE'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Live Synthesized OPA JSON Input + Real-Time Rego Trace */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#005EB8] dark:text-cyan-400" />
                    <span>Synthesized Runtime JSON Claim Payload (`input`)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        'opa-input-json',
                        JSON.stringify(opaEvaluation.synthesizedInputJson, null, 2)
                      )
                    }
                    className="text-xs font-mono text-slate-500 dark:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === 'opa-input-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'opa-input-json' ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed tabular-nums">
                  <code>{JSON.stringify(opaEvaluation.synthesizedInputJson, null, 2)}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#00A389] dark:text-emerald-400" />
                  <span>OPA Policy Evaluation (`package tre.isms.authz`)</span>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-slate-400">default allow = false</div>
                  <div className="text-slate-400 pb-1">default egress_permitted = false</div>
                  <div className="pt-1 border-t border-slate-800 space-y-1">
                    <div className={opaEvaluation.admissionAllowed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      allow {'{'} # Verdict: {opaEvaluation.admissionAllowed ? 'TRUE (Admitted)' : 'FALSE (Denied)'}
                    </div>
                    <div className={`pl-4 ${claimState.ismsCertified ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.enclave.isms_27001_certified == true # {claimState.ismsCertified ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.climateResilienceChecked ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.enclave.climate_resilience_assessed == true # {claimState.climateResilienceChecked ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.soaApproved ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.governance.soa_approved_current == true # {claimState.soaApproved ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.kpiObjectivesMet ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.governance.clause62_kpis_within_target == true # {claimState.kpiObjectivesMet ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.competenceVerified ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.governance.clause72_competence_verified == true # {claimState.competenceVerified ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.deaS71Active ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.project.dea_rap_accreditation_valid == true # {claimState.deaS71Active ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.igTrainingValid ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.researcher.ig_and_vetting_valid == true # {claimState.igTrainingValid ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`pl-4 ${claimState.harborCveClean ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.enclave.cve_and_egress_verified == true # {claimState.harborCveClean ? 'PASS' : 'FAIL'}
                    </div>
                    <div className="text-slate-400">{'}'}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className={opaEvaluation.egressPermitted ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      egress_permitted {'{'} # Verdict: {opaEvaluation.egressPermitted ? 'TRUE (Export Cleared)' : 'FALSE (Airlock Blocked)'}
                    </div>
                    <div className={`pl-4 ${opaEvaluation.admissionAllowed ? 'text-emerald-300' : 'text-rose-400'}`}>
                      allow # Prerequisite enclave &amp; ISMS checks
                    </div>
                    <div className={`pl-4 ${claimState.airlockDualSignoff ? 'text-emerald-300' : 'text-rose-400'}`}>
                      input.export.sdc_and_dual_signoff_complete == true # {claimState.airlockDualSignoff ? 'PASS' : 'FAIL'}
                    </div>
                    <div className="text-slate-400">{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
