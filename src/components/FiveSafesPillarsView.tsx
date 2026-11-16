import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Users,
  Briefcase,
  Server,
  Database,
  FileCheck2,
  Lock,
  ArrowRight,
  Info,
  Scale
} from 'lucide-react';

interface FiveSafesPillarsViewProps {
  researcherStatus: 'accredited' | 'pending' | 'unaccredited';
  setResearcherStatus: (status: 'accredited' | 'pending' | 'unaccredited') => void;
  ethicsStatus: 'approved' | 'in_review' | 'none';
  setEthicsStatus: (status: 'approved' | 'in_review' | 'none') => void;
  s251Status: 'authorized' | 'exempt' | 'missing';
  setS251Status: (status: 'authorized' | 'exempt' | 'missing') => void;
  dataTier: 'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable';
  setDataTier: (tier: 'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable') => void;
  minCellCount: number;
  setMinCellCount: (n: number) => void;
  dominanceRatio: number;
  setDominanceRatio: (r: number) => void;
  enclaveEgressBlocked: boolean;
  setEnclaveEgressBlocked: (b: boolean) => void;
  aiWorkloadType: 'none' | 'assistive' | 'autonomous_high_risk';
  setAiWorkloadType: (t: 'none' | 'assistive' | 'autonomous_high_risk') => void;
  aiHumanSponsorLinked: boolean;
  setAiHumanSponsorLinked: (b: boolean) => void;
  onOpenEvidenceDossier: () => void;
  onNavigateToDecisionRegister?: (ref: string) => void;
}

export const FiveSafesPillarsView: React.FC<FiveSafesPillarsViewProps> = ({
  researcherStatus,
  setResearcherStatus,
  ethicsStatus,
  setEthicsStatus,
  s251Status,
  setS251Status,
  dataTier,
  setDataTier,
  minCellCount,
  setMinCellCount,
  dominanceRatio,
  setDominanceRatio,
  enclaveEgressBlocked,
  setEnclaveEgressBlocked,
  aiWorkloadType,
  setAiWorkloadType,
  aiHumanSponsorLinked,
  setAiHumanSponsorLinked,
  onOpenEvidenceDossier,
  onNavigateToDecisionRegister
}) => {
  // Evaluated status per pillar
  const safePeopleStatus = researcherStatus === 'accredited' ? 'PASS' : researcherStatus === 'pending' ? 'WARN' : 'FAIL';
  const safeProjectsStatus = ethicsStatus === 'approved' && !(dataTier === 'tier3_identifiable' && s251Status === 'missing') ? 'PASS' : (ethicsStatus === 'in_review' ? 'WARN' : 'FAIL');
  const safeSettingsStatus = enclaveEgressBlocked ? 'PASS' : 'FAIL';
  const safeDataStatus = !(aiWorkloadType === 'autonomous_high_risk' && !aiHumanSponsorLinked) ? 'PASS' : 'FAIL';
  const safeOutputsStatus = minCellCount >= 10 && dominanceRatio <= 80 ? 'PASS' : 'FAIL';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Intro Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Architecture Breakdown</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            The Five Safes Governance Framework Deep-Dive
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Established by the Office for National Statistics (ONS) and adopted across UK Secure Data Environments (SDE) and Trusted Research Environments (TRE).
          </p>
        </div>

        <button
          onClick={onOpenEvidenceDossier}
          className="px-4 py-2 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center gap-2 shrink-0 cursor-pointer shadow-xs transition-colors"
        >
          <FileCheck2 className="w-4 h-4 text-amber-400" />
          <span>Generate Evidence Pack</span>
        </button>
      </div>

      {/* 5 Pillar Cards Grid */}
      <div className="space-y-4">
        {/* PILLAR 1: SAFE PEOPLE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pillar 1: Safe People</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    safePeopleStatus === 'PASS'
                      ? 'bg-emerald-50 text-[#047857] border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                      : safePeopleStatus === 'WARN'
                      ? 'bg-amber-50 text-[#B45309] border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-red-50 text-[#B91C1C] border-red-200 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {safePeopleStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Are the researchers appropriately qualified, trained, and verified to access health microdata?
                </p>
              </div>
            </div>

            {/* In-Pillar Control */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 text-[11px]">Accreditation:</span>
              <select
                value={researcherStatus}
                onChange={(e) => setResearcherStatus(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white"
              >
                <option value="accredited">Accredited (DEA 2017)</option>
                <option value="pending">Pending Renewal</option>
                <option value="unaccredited">Unaccredited</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Statutory Guardrails:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Digital Economy Act 2017 Part 5; Statistics and Registration Service Act 2007; Mandatory annual NHS DSPT Information Governance certification. Caldicott Principle 4 (strict need-to-know).
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Strictly Prohibited:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Credential sharing, non-accredited proxy access, unverified commercial consultants without institutional research sponsors, autonomous AI executing without named human accountability.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Human Panel Check (Caldicott &amp; DAAG):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Has the lead investigator completed the national Safe Researcher accreditation? Does each named collaborator have a signed institutional honorarium on file?
              </p>
            </div>
          </div>
        </div>

        {/* PILLAR 2: SAFE PROJECTS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pillar 2: Safe Projects</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    safeProjectsStatus === 'PASS'
                      ? 'bg-emerald-50 text-[#047857] border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                      : safeProjectsStatus === 'WARN'
                      ? 'bg-amber-50 text-[#B45309] border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-red-50 text-[#B91C1C] border-red-200 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {safeProjectsStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Is the research use of data lawful, ethically approved, and clearly delivering public benefit?
                </p>
              </div>
            </div>

            {/* In-Pillar Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={ethicsStatus}
                onChange={(e) => setEthicsStatus(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white"
              >
                <option value="approved">REC Ethics: Approved</option>
                <option value="in_review">REC Ethics: In Review</option>
                <option value="none">REC Ethics: None</option>
              </select>

              <select
                value={s251Status}
                onChange={(e) => setS251Status(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white"
              >
                <option value="exempt">S251: Exempt (Pseudonymised)</option>
                <option value="authorized">S251: Authorized (Active CAG)</option>
                <option value="missing">S251: Missing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Statutory Guardrails:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                HRA Research Ethics Committee (REC) favourable opinion; NHS Act 2006 Section 251 Confidentiality Advisory Group (CAG) clearance; UK GDPR Art. 6(1)(e) &amp; Art. 9(2)(j); Caldicott Principle 1 (Justify purpose).
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Strictly Prohibited:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Scope creep beyond approved IRAS protocol objectives; processing without documented public interest; unapproved secondary linkage to commercial consumer marketing records.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Human Panel Check (Caldicott &amp; DAAG):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Does the protocol demonstrate clear public benefit for patients? Has patient and public involvement (PPIE) advisory feedback been documented in the evidence pack?
              </p>
            </div>
          </div>
        </div>

        {/* PILLAR 3: SAFE SETTINGS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#005EB8] dark:text-sky-400 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pillar 3: Safe Settings</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    safeSettingsStatus === 'PASS'
                      ? 'bg-emerald-50 text-[#047857] border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-50 text-[#B91C1C] border-red-200 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {safeSettingsStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Does the computing environment prevent unauthorized data extraction and provide air-gapped isolation?
                </p>
              </div>
            </div>

            {/* In-Pillar Control */}
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEnclaveEgressBlocked(!enclaveEgressBlocked)}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                  enclaveEgressBlocked
                    ? 'bg-emerald-50 text-[#047857] border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-red-50 text-[#B91C1C] border-red-300 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {enclaveEgressBlocked ? 'Zero-Egress VPC (Active)' : 'Permissive WAN (Open)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Statutory Guardrails:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                SATRE Specification Pillar 2 (Computing Infrastructure); NHS DSPT Assertion 1.5; ISO/IEC 27001:2022 Annex A.8.20–A.8.22. Zero-egress network policies with eBPF/Calico drop rules.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Air-Gapped Realities:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Researchers work with zero outbound internet. Maintained internal CRAN, PyPI, and Docker registries deliver verified packages without allowing arbitrary data exfiltration.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Human Panel Check (Caldicott &amp; DAAG):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Are researcher sessions streamed via pixel-only remote desktop (VDI)? Are clipboard transfers and local disk mounts disabled at the hypervisor level?
              </p>
            </div>
          </div>
        </div>

        {/* PILLAR 4: SAFE DATA */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pillar 4: Safe Data</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    safeDataStatus === 'PASS'
                      ? 'bg-emerald-50 text-[#047857] border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-50 text-[#B91C1C] border-red-200 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {safeDataStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Is the data appropriately minimised, de-identified, and classified prior to researcher access?
                </p>
              </div>
            </div>

            {/* In-Pillar Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={dataTier}
                onChange={(e) => setDataTier(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white"
              >
                <option value="tier2_pseudonymised">Tier 2: Pseudonymised Cohort</option>
                <option value="tier1_aggregate">Tier 1: Aggregate Synthetic</option>
                <option value="tier3_identifiable">Tier 3: Identifiable Clinical</option>
              </select>

              <select
                value={aiWorkloadType}
                onChange={(e) => setAiWorkloadType(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white"
              >
                <option value="none">AI: Standard Human Analysis</option>
                <option value="assistive">AI: Assistive Autocomplete</option>
                <option value="autonomous_high_risk">AI: Autonomous Agent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Statutory Guardrails:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                UK GDPR Art. 5(1)(c) (Data minimisation) &amp; Art. 4(5) (Pseudonymisation); Caldicott Principle 2 (Do not use personal data unless necessary) &amp; Principle 3 (Minimum necessary).
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Stanford UIT AI Doctrine:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                AI models are NOT Safe People. High-risk autonomous agentic workflows must be backed by a named accredited human sponsor holding statutory civil and criminal liability.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Human Panel Check (Caldicott &amp; DAAG):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Are direct identifiers (NHS number, full name, address, full DOB) replaced by salted HMAC cryptographic hashes prior to enclave ingress?
              </p>
            </div>
          </div>
        </div>

        {/* PILLAR 5: SAFE OUTPUTS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pillar 5: Safe Outputs</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    safeOutputsStatus === 'PASS'
                      ? 'bg-emerald-50 text-[#047857] border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-50 text-[#B91C1C] border-red-200 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {safeOutputsStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Do analytical release tables satisfy quantitative Statistical Disclosure Control (SDC) to prevent patient re-identification?
                </p>
              </div>
            </div>

            {/* In-Pillar Controls */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-[11px]">Min Cell (k):</span>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={minCellCount}
                  onChange={(e) => setMinCellCount(parseInt(e.target.value || '1', 10))}
                  className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-[11px]">Dominance (%):</span>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={dominanceRatio}
                  onChange={(e) => setDominanceRatio(parseInt(e.target.value || '10', 10))}
                  className="w-16 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Quantitative SDC Rules:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Primary suppression threshold of <strong>k ≥ 10</strong> for small cell counts; top-contributor dominance ceiling of <strong>≤ 80%</strong>. Caldicott Principle 8 (Public Transparency).
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Airlock Review Protocol:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Machine-verification via OPA Rego provides the preliminary check; final export requires independent countersignature by 2 trained SDC airlock reviewers.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 block font-semibold text-[11px]">Human Panel Check (Caldicott &amp; DAAG):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Could this table or graph, when combined with public census or hospital records, allow re-identification of an individual patient in a small geographical cohort?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
