import React, { useState } from 'react';
import {
  RotateCcw,
  Cpu,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Lock,
  Layers,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { AIPolicyGenerator } from './AIPolicyGenerator';

export const PolicySandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'sdc' | 'admission'>('generator');

  // SDC Simulator State
  const [cells, setCells] = useState<{ id: string; name: string; count: number; spend: number }[]>([
    { id: 'c1', name: 'Cohort A (Type 2 Diabetes)', count: 42, spend: 12500 },
    { id: 'c2', name: 'Cohort B (Early Onset CVD)', count: 18, spend: 8900 },
    { id: 'c3', name: 'Cohort C (Rare Genetic Variant)', count: 4, spend: 3200 },
    { id: 'c4', name: 'Cohort D (Control Group)', count: 95, spend: 14200 }
  ]);

  // Admission Simulator State
  const [accredited, setAccredited] = useState(true);
  const [igTrainingValid, setIgTrainingValid] = useState(true);
  const [ethicsApproved, setEthicsApproved] = useState(true);
  const [egressBlocked, setEgressBlocked] = useState(true);

  // SDC Calculations
  const minObservedCell = Math.min(...cells.map((c) => c.count));
  const totalSpend = cells.reduce((acc, c) => acc + c.spend, 0);
  const maxSpend = Math.max(...cells.map((c) => c.spend));
  const dominanceRatio = totalSpend > 0 ? maxSpend / totalSpend : 0;

  const passesPrimarySuppression = minObservedCell >= 10;
  const passesDominance = dominanceRatio <= 0.8;
  const sdcEgressPermitted = passesPrimarySuppression && passesDominance;

  // Admission Calculation
  const admissionAllowed = accredited && igTrainingValid && ethicsApproved && egressBlocked;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner - Editorial Document Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-[#005EB8] dark:text-sky-400" />
              <span>Interactive Decision-Support &amp; Policy Baseline Synthesizer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Policy &amp; SDC Enforcement Sandbox
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl">
              Synthesize production-grade W3C SHACL shapes and OPA Rego rules from natural language, or test decision-support evaluations in the Quantitative SDC Airlock and Namespaced Admission simulators.
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-[#005EB8] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Policy Synthesizer</span>
            </button>
            <button
              onClick={() => setActiveTab('sdc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'sdc'
                  ? 'bg-[#005EB8] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              SDC Airlock Evaluator
            </button>
            <button
              onClick={() => setActiveTab('admission')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'admission'
                  ? 'bg-[#005EB8] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Namespaced Admission PDP
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'generator' && <AIPolicyGenerator />}

      {activeTab === 'sdc' && (
        /* Tab 1: SDC Airlock Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Table Editor */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Candidate Research Output Table</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simulate aggregate figures submitted for human airlock panel review prior to export outside the SDE/TRE safe setting.
                </p>
              </div>
              <button
                onClick={() =>
                  setCells([
                    { id: 'c1', name: 'Cohort A (Diabetes)', count: 35, spend: 8000 },
                    { id: 'c2', name: 'Cohort B (CVD)', count: 22, spend: 6500 },
                    { id: 'c3', name: 'Cohort C (Genetic)', count: 14, spend: 4000 },
                    { id: 'c4', name: 'Cohort D (Control)', count: 80, spend: 11000 }
                  ])
                }
                className="text-xs text-[#005EB8] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Compliant</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-medium">
                    <th className="py-2.5 px-3">Cohort / Subgroup</th>
                    <th className="py-2.5 px-3">Patient Count (k &ge; 10)</th>
                    <th className="py-2.5 px-3">Metric Value / Spend (k% &le; 80%)</th>
                    <th className="py-2.5 px-3">SDC Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
                  {cells.map((cell) => {
                    const isCellViolated = cell.count < 10;
                    return (
                      <tr key={cell.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-sans text-slate-900 dark:text-slate-200 font-medium">{cell.name}</td>
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            min="0"
                            value={cell.count}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setCells((prev) =>
                                prev.map((c) => (c.id === cell.id ? { ...c, count: val } : c))
                              );
                            }}
                            className={`w-20 px-2 py-1 rounded bg-white dark:bg-slate-950 border font-bold ${
                              isCellViolated
                                ? 'border-red-500 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20'
                                : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            min="0"
                            value={cell.spend}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setCells((prev) =>
                                prev.map((c) => (c.id === cell.id ? { ...c, spend: val } : c))
                              );
                            }}
                            className="w-24 px-2 py-1 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 font-bold"
                          />
                        </td>
                        <td className="py-3 px-3">
                          {isCellViolated ? (
                            <span className="text-red-700 dark:text-red-400 font-sans text-[11px] font-semibold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Suppress (k &lt; 10)
                            </span>
                          ) : (
                            <span className="text-[#047857] dark:text-emerald-400 font-sans text-[11px] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Adjust cell counts to test primary suppression (k &lt; 10) or dominance (&gt; 80%) checks before human airlock submission.</span>
            </div>
          </div>

          {/* Right Verdict & OPA PDP Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#005EB8] dark:text-sky-400 font-mono">
                Airlock Decision-Support Verdict
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">OPA `egress_permitted` Baseline</h3>
            </div>

            {/* Verdict Card */}
            <div
              className={`p-5 rounded-xl border flex items-center gap-4 ${
                sdcEgressPermitted
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-200'
              }`}
            >
              {sdcEgressPermitted ? (
                <CheckCircle2 className="w-10 h-10 text-[#047857] dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="text-base font-bold">
                  {sdcEgressPermitted ? 'EGRESS BASELINE SATISFIED' : 'EGRESS BLOCKED (SDC THRESHOLD VIOLATION)'}
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  `input.dataset.egress_permitted = {sdcEgressPermitted ? 'true' : 'false'}`
                </div>
              </div>
            </div>

            {/* Quantitative Check Results */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Primary Cell Count (k &ge; 10):</span>
                  <span
                    className={`font-mono font-bold ${
                      passesPrimarySuppression ? 'text-[#047857] dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    Min observed: {minObservedCell}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {passesPrimarySuppression
                    ? 'All observed cells have >= 10 individuals satisfying statutory threshold.'
                    : `VIOLATION: Found cell with count ${minObservedCell} (< 10). Primary cell suppression required.`}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Dominance Ratio (k% &le; 80%):</span>
                  <span
                    className={`font-mono font-bold ${
                      passesDominance ? 'text-[#047857] dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {(dominanceRatio * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {passesDominance
                    ? 'Top contributor represents <= 80% of aggregate sum.'
                    : `VIOLATION: Top contributor represents ${(dominanceRatio * 100).toFixed(1)}% (> 80%). Secondary suppression required.`}
                </p>
              </div>
            </div>

            {/* Generated W3C PROV-O Triple preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                Emitted W3C PROV-O Audit Triple (Dossier Evidence)
              </span>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{`tre:AirlockReview_${Date.now().toString(36)} a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_Airlock_PDP ;
    tre:decisionResult "${sdcEgressPermitted ? 'PERMIT' : 'DENY'}" ;
    tre:minCellCount ${minObservedCell} ;
    tre:dominanceRatio ${(dominanceRatio * 100).toFixed(1)}% .`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'admission' && (
        /* Tab 2: Workspace Admission Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 shadow-xs">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Namespaced Admission Session Attributes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure attributes for an incoming research Jupyter / compute pod provisioning request within a restricted namespace.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">Researcher Accreditation</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Verified institutional identity &amp; DEA / ONS registry status</div>
                </div>
                <button
                  onClick={() => setAccredited(!accredited)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    accredited
                      ? 'bg-[#047857] text-white'
                      : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/40'
                  }`}
                >
                  {accredited ? 'Accredited (True)' : 'Unaccredited (False)'}
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">Information Governance (IG) Training</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Must be within annual statutory certification validity</div>
                </div>
                <button
                  onClick={() => setIgTrainingValid(!igTrainingValid)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    igTrainingValid
                      ? 'bg-[#047857] text-white'
                      : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/40'
                  }`}
                >
                  {igTrainingValid ? 'Valid (Not Expired)' : 'Expired Certification'}
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">NHS Ethics / CAG Approval</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Active project approval or Section 251 statutory exemption</div>
                </div>
                <button
                  onClick={() => setEthicsApproved(!ethicsApproved)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    ethicsApproved
                      ? 'bg-[#047857] text-white'
                      : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/40'
                  }`}
                >
                  {ethicsApproved ? 'Approved (Active)' : 'Missing Ethics'}
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-200">Safe Setting Egress Locked</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Hardened cloud setting with outbound internet severed; internal package mirrors only</div>
                </div>
                <button
                  onClick={() => setEgressBlocked(!egressBlocked)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    egressBlocked
                      ? 'bg-[#047857] text-white'
                      : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                  }`}
                >
                  {egressBlocked ? 'Egress Blocked (Airgapped)' : 'Unrestricted Egress (Insecure)'}
                </button>
              </div>
            </div>
          </div>

          {/* Admission Decision */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#005EB8] dark:text-sky-400 font-mono">
                Namespaced Admission Controller (Audit &amp; Alert)
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">OPA Admission Review</h3>
            </div>

            <div
              className={`p-5 rounded-xl border flex items-center gap-4 ${
                admissionAllowed
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-200'
              }`}
            >
              {admissionAllowed ? (
                <CheckCircle2 className="w-10 h-10 text-[#047857] dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="text-base font-bold">
                  {admissionAllowed ? 'ADMISSION AUTHORIZED' : 'ADMISSION REJECTED (INSUFFICIENT CLEARANCE)'}
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  `package tre.authz: allow = {admissionAllowed ? 'true' : 'false'}`
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-300">SHACL Governance Shape Conformance:</div>
              {admissionAllowed ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-lg text-[#047857] dark:text-emerald-300 font-medium">
                  Conforms = True. No violations detected against high-level IG shapes (`access-shapes.ttl`). Standardized evidence pack ready for audit.
                </div>
              ) : (
                <ul className="space-y-1.5 font-mono text-[11px] text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800/40">
                  {!accredited && <li>• Discrepancy: sh:minCount 1 on tre:hasAccreditedResearcher</li>}
                  {!igTrainingValid && <li>• Discrepancy: tre:hasValidIGCertification is false / expired</li>}
                  {!ethicsApproved && <li>• Discrepancy: sh:hasValue true on tre:hasEthicsApproval</li>}
                  {!egressBlocked && <li>• Discrepancy: tre:enclaveEgressBlocked is false</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
