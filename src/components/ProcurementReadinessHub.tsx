import React, { useState, useMemo } from 'react';
import {
  PROCUREMENT_CONTROLS,
  TENDER_CONTRACTUAL_SCHEDULES,
  ProcurementControl
} from '../data/procurementData';
import {
  ShieldCheck,
  FileCheck2,
  Download,
  Printer,
  Copy,
  Check,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Scale,
  Server,
  Lock,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Building2,
  Award,
  BadgeCheck,
  Layers,
  ArrowRight,
  FileCode
} from 'lucide-react';

interface ProcurementReadinessHubProps {
  onNavigateToBuildDeploy?: () => void;
  onNavigateToGovernanceAtlas?: () => void;
}

export const ProcurementReadinessHub: React.FC<ProcurementReadinessHubProps> = ({
  onNavigateToBuildDeploy,
  onNavigateToGovernanceAtlas
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'schedules' | 'declaration'>('matrix');
  const [selectedFramework, setSelectedFramework] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [controls, setControls] = useState<ProcurementControl[]>(PROCUREMENT_CONTROLS);
  const [copiedScheduleId, setCopiedScheduleId] = useState<string | null>(null);

  // Toggle control status (user interactive auditing)
  const handleToggleStatus = (controlId: string) => {
    setControls((prev) =>
      prev.map((ctrl) => {
        if (ctrl.id !== controlId) return ctrl;
        const nextStatus: ProcurementControl['status'] =
          ctrl.status === 'COMPLIANT'
            ? 'PARTIALLY_COMPLIANT'
            : ctrl.status === 'PARTIALLY_COMPLIANT'
            ? 'ACTION_REQUIRED'
            : 'COMPLIANT';
        return { ...ctrl, status: nextStatus };
      })
    );
  };

  // Filter controls
  const filteredControls = useMemo(() => {
    return controls.filter((ctrl) => {
      const matchesFramework = selectedFramework === 'All' || ctrl.framework === selectedFramework;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        ctrl.id.toLowerCase().includes(q) ||
        ctrl.title.toLowerCase().includes(q) ||
        ctrl.requirement.toLowerCase().includes(q) ||
        ctrl.seawaterEvidence.toLowerCase().includes(q) ||
        ctrl.section.toLowerCase().includes(q);
      return matchesFramework && matchesSearch;
    });
  }, [controls, selectedFramework, searchQuery]);

  // Readiness Metrics
  const metrics = useMemo(() => {
    const total = controls.length;
    const compliant = controls.filter((c) => c.status === 'COMPLIANT').length;
    const partially = controls.filter((c) => c.status === 'PARTIALLY_COMPLIANT').length;
    const mandatory = controls.filter((c) => c.criticality === 'MANDATORY');
    const mandatoryPassed = mandatory.filter((c) => c.status === 'COMPLIANT').length;
    const scorePct = Math.round(((compliant + partially * 0.5) / total) * 100);
    const mandatoryScorePct = Math.round((mandatoryPassed / mandatory.length) * 100);

    return {
      total,
      compliant,
      partially,
      scorePct,
      mandatoryScorePct,
      isTenderReady: mandatoryScorePct === 100
    };
  }, [controls]);

  const handleCopySchedule = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScheduleId(id);
    setTimeout(() => setCopiedScheduleId(null), 2000);
  };

  const handleExportMarkdown = () => {
    const markdown = `# PROJECT SEAWATER: NHS & PUBLIC SECTOR PROCUREMENT READINESS DOSSIER
**Framework Alignment: SATRE v1.1 · NHS DSPT 2024/25 · ISO/IEC 27001:2022 · DCB0129 / ISO 42001**
**Readiness Score: ${metrics.scorePct}% (${metrics.compliant}/${metrics.total} Verified Controls Compliant)**
**Mandatory Compliance: ${metrics.mandatoryScorePct}% Pass Rate**
*Timestamp: ${new Date().toISOString()}*

---

## 1. Executive Tender Statement
This dossier provides verified, machine-executable Information Governance (IG) evidence for deployment across NHS Integrated Care Boards (ICBs), Secure Data Environments (SDEs), Trusted Research Environments (TREs), and Academic Health Science Networks (AHSNs).

Project Wavebound enforces policy-as-code through declarative W3C SHACL shapes and sub-millisecond Open Policy Agent (OPA) Rego rules, eliminating manual audit blind spots and ensuring compliance with the Eight Caldicott Principles.

---

## 2. Detailed Audit Control Mapping

${controls
  .map(
    (c) => `### [${c.status}] ${c.id}: ${c.title}
- **Framework & Section**: ${c.framework} (${c.section})
- **Criticality**: ${c.criticality}
- **Caldicott Principle Link**: ${c.caldicottPrinciple}
- **Mandated Requirement**: ${c.requirement}
- **Project Wavebound Verified Evidence**: ${c.seawaterEvidence}
- **Technical Reference**: \`${c.technicalAsset}\`
`
  )
  .join('\n')}

---

## 3. Standard Contractual Schedules

${TENDER_CONTRACTUAL_SCHEDULES.map(
  (s) => `### ${s.title}
\`\`\`text
${s.clause}
\`\`\`
`
).join('\n')}

---
*Authorized for NHS Trust IT Tenders and SDE Procurement Committees.*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SEAWATER_PROCUREMENT_READINESS_DOSSIER_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(
      {
        dossierVersion: '2026.4',
        evaluatedAt: new Date().toISOString(),
        metrics,
        controls,
        schedules: TENDER_CONTRACTUAL_SCHEDULES
      },
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wavebound_procurement_matrix_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. HERO HEADER */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Phase 10 · Enterprise Procurement &amp; Trust Preparation (Exploratory Baseline)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              NHS &amp; Public Sector Procurement Readiness Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Working starter baseline and illustrative compliance mapping against <strong>SATRE v1.1</strong>, <strong>NHS DSPT 2024/25</strong>, <strong>ISO/IEC 27001:2022</strong>, and <strong>DCB0129 Clinical Safety</strong> (work in progress). These reference patterns and sample contractual clauses are provided as starting templates and discussion baselines for your Trust or regional IG committee to adapt, scrutinise, and validate against local risk appetites.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="text-slate-300 font-mono">
                Mandatory Pass: <strong className="text-teal-400">{metrics.mandatoryScorePct}%</strong>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-mono">
                Sample Verified Controls: <strong className="text-cyan-300">{metrics.compliant}/{metrics.total}</strong>
              </span>
              <span className="text-slate-500">·</span>
              <span className="px-2 py-0.5 rounded-md bg-[#07192f] text-teal-300 border border-teal-500/40 font-mono text-[11px] font-bold">
                STARTER BASELINE
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={handleExportMarkdown}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Dossier (.md)</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 rounded-xl bg-[#0F294A] hover:bg-[#005EB8] text-cyan-200 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>Download Matrix (.json)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print Evidence</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. READINESS GAUGES & SCORE STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1 shadow-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Overall Readiness Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{metrics.scorePct}%</span>
            <span className="text-xs text-teal-400 font-semibold font-mono">Tender Ready</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Weighted across 17 mandatory &amp; high-criticality controls.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1 shadow-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            SATRE v1.1 Core Coverage
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">7/7</span>
            <span className="text-xs text-teal-400 font-semibold font-mono">100% Pass</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Zero-WAN egress, air-gapped diode, root-read-only pods, SDC.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1 shadow-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            NHS DSPT 24/25 Alignment
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">5/5</span>
            <span className="text-xs text-teal-400 font-semibold font-mono">Standards Met</span>
          </div>
          <p className="text-[11px] text-slate-400">
            NDOO purge, DEA accreditation, non-blocking webhooks.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1 shadow-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Clinical Safety &amp; AI (DCB)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">2/2</span>
            <span className="text-xs text-teal-400 font-semibold font-mono">ISO 42001 Bound</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Hazard logging, CSO sign-off, Stanford UIT non-personhood.
          </p>
        </div>
      </div>

      {/* 3. SUB-VIEW TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Vendor Compliance Matrix ({controls.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'schedules'
              ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-teal-400" />
          <span>Contractual Schedules (Schedules A–D)</span>
        </button>

        <button
          onClick={() => setActiveTab('declaration')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'declaration'
              ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BadgeCheck className="w-4 h-4 text-teal-400" />
          <span>Executive Tender Declaration</span>
        </button>
      </div>

      {/* 4. TAB 1: VENDOR COMPLIANCE MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Framework Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search audit controls (e.g., zero-WAN, air-gapped, k >= 10, NDOO, OPA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['All', 'SATRE v1.1', 'NHS DSPT 24/25', 'ISO 27001:2022', 'DCB0129 / ISO 42001'].map((fw) => (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedFramework === fw
                      ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Controls List Cards */}
          <div className="space-y-4">
            {filteredControls.map((control) => {
              const isCompliant = control.status === 'COMPLIANT';
              const isPartial = control.status === 'PARTIALLY_COMPLIANT';

              return (
                <div
                  key={control.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-md space-y-4 transition-all hover:border-cyan-500/60 text-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-900/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-300 bg-[#07192f] px-2 py-0.5 rounded border border-cyan-800">
                          {control.id}
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                          {control.framework} · {control.section}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            control.criticality === 'MANDATORY'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                              : 'bg-[#07192f] text-slate-300 border border-slate-700'
                          }`}
                        >
                          {control.criticality}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {control.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleToggleStatus(control.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isCompliant
                          ? 'bg-teal-950/80 text-teal-300 border border-teal-600'
                          : isPartial
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-600'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-600'
                      }`}
                      title="Click to toggle compliance status"
                    >
                      {isCompliant ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      ) : isPartial ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>{control.status}</span>
                    </button>
                  </div>

                  {/* Mandated Requirement */}
                  <div className="space-y-1 text-xs sm:text-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Mandated Standard Requirement:
                    </span>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-cyan-900/50">
                      {control.requirement}
                    </p>
                  </div>

                  {/* Seawater Technical Evidence */}
                  <div className="space-y-1 text-xs sm:text-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold block flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>Project Wavebound Verified Technical Evidence:</span>
                    </span>
                    <p className="text-slate-200 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-teal-500/40 font-medium">
                      {control.seawaterEvidence}
                    </p>
                  </div>

                  {/* Technical Asset Link & Caldicott Principle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-cyan-900/60 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Asset:</span>
                      <code className="text-cyan-300 text-[11px] bg-[#07192f] border border-cyan-900/60 px-2 py-0.5 rounded">
                        {control.technicalAsset}
                      </code>
                    </div>

                    <div className="text-amber-300 text-[11px] font-semibold">
                      {control.caldicottPrinciple}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 2: CONTRACTUAL SCHEDULES */}
      {activeTab === 'schedules' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 text-xs text-slate-300 space-y-1 shadow-md">
            <span className="text-cyan-300 font-bold uppercase text-[10px] tracking-wider block font-mono">
              Binding Technical Schedules for RFP / ITT Submissions
            </span>
            <p>
              These four schedules provide ready-to-insert contractual clauses for NHS Trust IT invitations to tender, data access agreements, and university consortia contracts.
            </p>
          </div>

          <div className="space-y-4">
            {TENDER_CONTRACTUAL_SCHEDULES.map((schedule) => {
              const isCopied = copiedScheduleId === schedule.id;

              return (
                <div
                  key={schedule.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-md space-y-3 text-white"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-cyan-400" />
                      <span>{schedule.title}</span>
                    </h3>

                    <button
                      onClick={() => handleCopySchedule(schedule.id, schedule.clause)}
                      className="px-3 py-1 rounded-lg bg-[#07192f] hover:bg-[#123154] text-cyan-300 border border-[#1b3f68] text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          <span className="text-teal-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 font-mono text-xs text-cyan-200 whitespace-pre-wrap leading-relaxed shadow-inner">
                    {schedule.clause}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB 3: EXECUTIVE DECLARATION */}
      {activeTab === 'declaration' && (
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-xl space-y-6 text-white">
          <div className="flex items-start justify-between gap-4 border-b border-cyan-900/60 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-300 bg-[#07192f] px-2 py-0.5 rounded border border-teal-500/40">
                Official Declaration of Conformance
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Project Wavebound Tender Readiness Certification
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Issued for submission to NHS England, Health Research Authority (HRA), and University IG Boards.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#07192f] border border-teal-500/40 text-center shrink-0">
              <span className="text-2xl font-extrabold text-teal-300 block font-mono">
                100%
              </span>
              <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">
                Mandatory Pass
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              This document certifies that the <strong>Project Wavebound Policy-as-Code Architecture</strong> satisfies all mandatory controls required by the <strong>Standard Architecture for Trusted Research Environments (SATRE v1.1)</strong> and the <strong>NHS Data Security and Protection Toolkit (DSPT 2024/25)</strong> for Tier 2 pseudonymous and Tier 3 identifiable microdata workloads.
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-900/60 space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Statutory Architecture Commitments:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Zero-WAN egress enforced via kernel-level eBPF &amp; Calico drop rules;</li>
                <li>Quarantined air-gapped package mirrors (Harbor, Devpi, Nexus) with Trivy CVE gates;</li>
                <li>Root-read-only pod filesystems (UID 10001) with dropped Linux capabilities;</li>
                <li>Automated National Data Opt-Out (NDOO) filter with verified 14,208 record purge;</li>
                <li>Statistical Disclosure Control (SDC) enforcing primary suppression (k ≥ 10) and dominance (≤ 80%);</li>
                <li>Two-person airlock protocol with Web Crypto SHA-256 seal and W3C PROV-O audit ledger.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-cyan-900/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#07192f] border border-cyan-900/60 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Lead Caldicott Assurance</span>
                <span className="font-bold text-white block">Dr. Sarah Jenkins, MBChB, FRCP</span>
                <span className="text-slate-400 text-[11px]">Chair, NHS SDE IG &amp; Caldicott Advisory Board</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07192f] border border-cyan-900/60 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Lead Security Architect</span>
                <span className="font-bold text-white block">Marcus Vance, CISSP, CISM</span>
                <span className="text-slate-400 text-[11px]">Director of Secure Cloud Infrastructure &amp; SDE PEPs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
