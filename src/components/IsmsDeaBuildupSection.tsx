import React, { useState, useMemo, useEffect } from 'react';
import {
  ISMS_DEA_BUILDUP_ARTEFACTS,
  DOCS_TO_OPA_SWITCHES,
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
  Workflow
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
  const [selectedCategory, setSelectedCategory] = useState<'All' | BuildupCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(ISMS_DEA_BUILDUP_ARTEFACTS[3].id); // Open Risk & SoA or first item cleanly
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persisted readiness progress
  const [readyArtefacts, setReadyArtefacts] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_READY_IDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage errors in restricted environments
    }
    return {
      'isms-scope-context': true,
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

  // Interactive Docs-to-OPA Claim Switches
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

  const toggleClaim = (id: string) => {
    setClaimState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const applyClaimPreset = (preset: 'compliant' | 'missing_soa' | 'expired_ig' | 'cve_fail') => {
    if (preset === 'compliant') {
      setClaimState({
        ismsCertified: true,
        soaApproved: true,
        deaS71Active: true,
        igTrainingValid: true,
        harborCveClean: true,
        airlockDualSignoff: true
      });
    } else if (preset === 'missing_soa') {
      setClaimState({
        ismsCertified: true,
        soaApproved: false,
        deaS71Active: true,
        igTrainingValid: true,
        harborCveClean: true,
        airlockDualSignoff: true
      });
    } else if (preset === 'expired_ig') {
      setClaimState({
        ismsCertified: true,
        soaApproved: true,
        deaS71Active: true,
        igTrainingValid: false,
        harborCveClean: true,
        airlockDualSignoff: true
      });
    } else {
      setClaimState({
        ismsCertified: true,
        soaApproved: true,
        deaS71Active: true,
        igTrainingValid: true,
        harborCveClean: false,
        airlockDualSignoff: false
      });
    }
  };

  // Evaluate OPA decisions derived from docs + live processes
  const opaEvaluation = useMemo(() => {
    const admissionAllowed =
      Boolean(claimState.ismsCertified) &&
      Boolean(claimState.soaApproved) &&
      Boolean(claimState.deaS71Active) &&
      Boolean(claimState.igTrainingValid) &&
      Boolean(claimState.harborCveClean);

    const egressPermitted =
      admissionAllowed && Boolean(claimState.airlockDualSignoff);

    const failedSwitches = DOCS_TO_OPA_SWITCHES.filter((sw) => !claimState[sw.id]);

    const synthesizedInputJson = {
      governance: {
        soa_approved_current: Boolean(claimState.soaApproved),
        soa_revision_id: claimState.soaApproved ? 'SOA-2026-Q4-SIGNED' : 'UNAPPROVED_DRAFT'
      },
      enclave: {
        isms_27001_certified: Boolean(claimState.ismsCertified),
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
      admissionAllowed,
      egressPermitted,
      failedSwitches,
      synthesizedInputJson
    };
  }, [claimState]);

  const categories: ('All' | BuildupCategory)[] = [
    'All',
    'ISMS Clauses 4–10',
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
        item.ownerRole.toLowerCase().includes(q) ||
        item.runtimeInputClaim.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const readyCount = ISMS_DEA_BUILDUP_ARTEFACTS.filter((a) => readyArtefacts[a.id]).length;
  const totalCount = ISMS_DEA_BUILDUP_ARTEFACTS.length;
  const readinessPct = Math.round((readyCount / totalCount) * 100);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportReadinessMarkdown = () => {
    const lines = [
      '# Wavebound ISO/IEC 27001:2022 ISMS & DEA 2017 Build-Up Readiness Pack',
      `Generated: ${new Date().toISOString()}`,
      `Completion: ${readyCount}/${totalCount} artefacts (${readinessPct}%)`,
      '',
      '## How Governance Documents & Processes Feed OPA',
      '1. Design-Time Rule Definition: Signed ISMS Risk Treatments, SoA (Clause 6.1.3(d)), and SOP thresholds define closed-world SHACL shapes compiled to static Rego rules.',
      '2. Runtime Input Claims: Live operational processes (HR/LMS training sync, UKSA RAP registry, Trivy CVE scans, Dual Airlock sign-off) emit trusted JSON `input.*` attributes evaluated fail-closed by OPA.',
      '',
      '## Artefact & Process Checklist'
    ];

    ISMS_DEA_BUILDUP_ARTEFACTS.forEach((a) => {
      const status = readyArtefacts[a.id] ? '[READY]' : '[PENDING]';
      lines.push(`- ${status} **${a.title}** (${a.clauseRef}) — Owner: ${a.ownerRole}`);
      lines.push(`  - OPA Rule Impact: ${a.opaRuleImpact}`);
      lines.push(`  - Runtime JSON Claim: \`${a.runtimeInputClaim}\``);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wavebound-isms-dea-buildup-pack.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Architecture Clarification Header + KPI Strip */}
      <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-200 dark:border-cyan-900/50 pb-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-300">
              <span>ISO/IEC 27001:2022 Clauses 4–10</span>
              <span aria-hidden="true">·</span>
              <span>Clause 6.1.3(d) SoA</span>
              <span aria-hidden="true">·</span>
              <span>DEA 2017 Section 70–71 Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              ISMS Build-Up Documentation, Operational Processes &amp; Docs-to-OPA Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Organizational governance documents do <strong>not</strong> compile verbatim into Rego code. Instead, signed ISMS &amp; DEA artefacts establish the <strong>closed-world policy thresholds</strong> compiled into OPA, while live operational processes emit the <strong>trusted runtime JSON <code className="font-mono text-[#005EB8] dark:text-cyan-300">input.*</code> claims</strong> OPA evaluates fail-closed before admitting containers or releasing outputs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportReadinessMarkdown}
              className="px-3.5 py-2 rounded-lg bg-[#00A389] hover:bg-teal-600 text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Build-Up Pack (.md)</span>
            </button>
            {onNavigateToDecisionRegister && (
              <button
                type="button"
                onClick={() => onNavigateToDecisionRegister('D-001')}
                className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-[#07192f] hover:bg-slate-200 dark:hover:bg-[#123154] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#1b3f68] text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-[#005EB8] dark:text-cyan-400" />
                <span>Decision Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Readiness Summary Counters (Tabular Figures, Single Elevation) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Build-Up Readiness</span>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {readyCount} / {totalCount} <span className="text-sm font-medium text-[#00A389] dark:text-emerald-400">({readinessPct}%)</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Mandatory Annex A Controls</span>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              93 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">across A.5–A.8</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Live OPA Admission Verdict</span>
            <div className={`text-sm font-bold font-mono flex items-center gap-1.5 pt-1 ${opaEvaluation.admissionAllowed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {opaEvaluation.admissionAllowed ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              <span>{opaEvaluation.admissionAllowed ? 'ALLOW (Enclave Ready)' : 'DENY (Missing Attestation)'}</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-cyan-900/40 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Live Airlock Egress Verdict</span>
            <div className={`text-sm font-bold font-mono flex items-center gap-1.5 pt-1 ${opaEvaluation.egressPermitted ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {opaEvaluation.egressPermitted ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              <span>{opaEvaluation.egressPermitted ? 'EGRESS PERMITTED' : 'FAIL-CLOSED BLOCK'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Docs-to-OPA Pipeline & Live JSON Claim Mapper */}
      <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-cyan-900/50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#005EB8] dark:text-cyan-300">
              <Workflow className="w-4 h-4" />
              <span>Interactive Docs-to-OPA Claim Mapper</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Test How Document Sign-Offs &amp; Operational Processes Feed OPA Decisions
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyClaimPreset('compliant')}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
            >
              All Verified
            </button>
            <button
              type="button"
              onClick={() => applyClaimPreset('missing_soa')}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
            >
              Unsigned SoA
            </button>
            <button
              type="button"
              onClick={() => applyClaimPreset('expired_ig')}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
            >
              Expired IG Training
            </button>
            <button
              type="button"
              onClick={() => applyClaimPreset('cve_fail')}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              CVE / Airlock Fail
            </button>
          </div>
        </div>

        {/* Two-Column Interactive Pipeline: Switches vs Synthesized JSON + Rego Evaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Document & Process Attestation Switches */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 pb-1">
              Toggle Upstream Documents &amp; Operational Processes
            </div>
            {DOCS_TO_OPA_SWITCHES.map((sw) => {
              const active = Boolean(claimState[sw.id]);
              return (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => toggleClaim(sw.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                    active
                      ? 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-cyan-900/50 hover:border-cyan-500/60'
                      : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>{sw.clauseRef}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#005EB8] dark:text-cyan-400">{sw.feedLayer}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {sw.label}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      Source: {sw.sourceDocOrProcess}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-cyan-300/90 truncate">
                      Emits: {sw.jsonPath} = {active ? 'true' : 'false'}
                    </div>
                    {!active && (
                      <div className="text-[11px] text-rose-700 dark:text-rose-300 pt-1">
                        Impact: {sw.failureImpact}
                      </div>
                    )}
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold shrink-0 flex items-center gap-1 ${
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
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#005EB8] dark:text-cyan-400" />
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
                  className="text-[11px] font-mono text-slate-500 dark:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'opa-input-json' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'opa-input-json' ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-[11px] sm:text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed tabular-nums">
                <code>{JSON.stringify(opaEvaluation.synthesizedInputJson, null, 2)}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#00A389] dark:text-emerald-400" />
                <span>OPA Policy Evaluation (`package tre.isms.authz`)</span>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px] sm:text-xs">
                <div className="text-slate-400">default allow = false</div>
                <div className="text-slate-400 pb-1">default egress_permitted = false</div>
                <div className="pt-1 border-t border-slate-800 space-y-1">
                  <div className={opaEvaluation.admissionAllowed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    allow {'{'} # Verdict: {opaEvaluation.admissionAllowed ? 'TRUE (Admitted)' : 'FALSE (Denied)'}
                  </div>
                  <div className={`pl-4 ${claimState.ismsCertified ? 'text-emerald-300' : 'text-rose-400'}`}>
                    input.enclave.isms_27001_certified == true # {claimState.ismsCertified ? 'PASS' : 'FAIL'}
                  </div>
                  <div className={`pl-4 ${claimState.soaApproved ? 'text-emerald-300' : 'text-rose-400'}`}>
                    input.governance.soa_approved_current == true # {claimState.soaApproved ? 'PASS' : 'FAIL'}
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

      {/* 3. Full Clause 4–10 ISMS, SoA, Operational SOPs & DEA 2017 Build-Up Catalogue */}
      <div className="bg-white dark:bg-[#0c2340] border border-slate-200 dark:border-cyan-900/60 rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-cyan-900/50 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#005EB8] dark:text-cyan-400" />
              <span>Required Documentation &amp; Process Build-Up Inventory</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Inspect each mandatory ISO/IEC 27001:2022 and DEA 2017 deliverable, toggle institutional readiness, and copy starter Markdown outlines.
            </p>
          </div>

          {onNavigateToMatrix && (
            <button
              type="button"
              onClick={onNavigateToMatrix}
              className="text-xs font-semibold text-[#005EB8] dark:text-cyan-300 hover:underline flex items-center gap-1 self-start lg:self-center shrink-0 cursor-pointer"
            >
              <span>Inspect Consolidated Statutory Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
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

          <div className="relative w-full xl:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clause, SOP, owner, or input claim..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-cyan-900/60 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredArtefacts.length === 0 ? (
          <div className="p-8 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-cyan-900/40 text-center space-y-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto" />
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              No matching ISMS or DEA build-up artefacts
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Adjust your search filter or reset category selection to view all {totalCount} artefacts.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#005EB8] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
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
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
                        <span>{isExpanded ? 'Hide OPA Binding & Template' : 'Inspect OPA Feed & Template'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details: Governance Rule Impact + Runtime Claim + Template */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-200 dark:border-cyan-900/40 bg-slate-50/70 dark:bg-[#07192f]/70 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 dark:text-cyan-300 block">
                            1. Design-Time Rule Defined (How Document Shapes OPA Logic)
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.opaRuleImpact}
                          </p>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                            Review Cadence: {item.reviewCadence}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 dark:text-emerald-300 block">
                            2. Runtime Input Claim Emitted (Process Output Evaluated by OPA)
                          </span>
                          <code className="block p-2 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-[11px] overflow-x-auto">
                            {item.runtimeInputClaim}
                          </code>
                          <pre className="p-2.5 rounded bg-slate-950 text-emerald-300 border border-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed">
                            <code>{item.regoAssertionPreview}</code>
                          </pre>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            Starter Artefact Outline (Copyable Markdown Template)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(item.id, item.templateMarkdown)}
                            className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === item.id ? 'Copied Markdown' : 'Copy Template'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                          <code>{item.templateMarkdown}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
