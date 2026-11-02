import React, { useState } from 'react';
import {
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Cpu,
  FileCheck2,
  Lock,
  Layers,
  Sparkles
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
  const [mcpRole, setMcpRole] = useState<'ReadOnly' | 'Unrestricted'>('ReadOnly');

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
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Interactive PEP &amp; PDP Simulator &amp; Policy Synthesizer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Policy Enforcement Sandbox
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Synthesize production-grade SHACL shapes and OPA Rego rules from natural language, or test live PEP/PDP evaluation in the Quantitative SDC Airlock and Workspace Admission simulators.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Policy Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('sdc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'sdc'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SDC Airlock Evaluator
            </button>
            <button
              onClick={() => setActiveTab('admission')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'admission'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Workspace Admission PDP
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'generator' && <AIPolicyGenerator />}

      {activeTab === 'sdc' && (
        /* Tab 1: SDC Airlock Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Table Editor */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Candidate Research Output Table</h3>
                <p className="text-xs text-slate-400">
                  Simulate summary figures submitted for airlock export outside the TRE enclave.
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
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Compliant</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Cohort / Subgroup</th>
                    <th className="py-2.5 px-3">Patient Count (k &ge; 10)</th>
                    <th className="py-2.5 px-3">Metric Value / Spend (k% &le; 80%)</th>
                    <th className="py-2.5 px-3">SDC Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {cells.map((cell, idx) => {
                    const isCellViolated = cell.count < 10;
                    return (
                      <tr key={cell.id} className="hover:bg-slate-950/40">
                        <td className="py-3 px-3 font-sans text-slate-200">{cell.name}</td>
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
                            className={`w-20 px-2 py-1 rounded bg-slate-950 border font-bold ${
                              isCellViolated
                                ? 'border-red-500 text-red-400'
                                : 'border-slate-800 text-slate-200'
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
                            className="w-24 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-200 font-bold"
                          />
                        </td>
                        <td className="py-3 px-3">
                          {isCellViolated ? (
                            <span className="text-red-400 font-sans text-[11px] font-semibold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Suppress (k &lt; 10)
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-sans text-[11px] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> OK
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Try editing cell counts to test primary suppression (k &lt; 10) or high spend dominance (&gt; 80%).</span>
            </div>
          </div>

          {/* Right Verdict & OPA PDP Panel */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Airlock PDP Verdict
              </span>
              <h3 className="text-xl font-bold text-white">OPA `egress_permitted` Evaluation</h3>
            </div>

            {/* Verdict Card */}
            <div
              className={`p-5 rounded-xl border flex items-center gap-4 ${
                sdcEgressPermitted
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/30 border-red-500/50 text-red-200'
              }`}
            >
              {sdcEgressPermitted ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-red-400 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="text-lg font-bold">
                  {sdcEgressPermitted ? 'EGRESS AUTHORIZED' : 'EGRESS BLOCKED BY AIRLOCK'}
                </div>
                <div className="text-xs font-mono">
                  `input.dataset.egress_permitted = {sdcEgressPermitted ? 'true' : 'false'}`
                </div>
              </div>
            </div>

            {/* Quantitative Check Results */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primary Cell Count (k &ge; 10):</span>
                  <span
                    className={`font-mono font-bold ${
                      passesPrimarySuppression ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    Min observed: {minObservedCell}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {passesPrimarySuppression
                    ? 'All observed cells have >= 10 individuals.'
                    : `VIOLATION: Found cell with count ${minObservedCell} (< 10). Primary cell suppression required.`}
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dominance Ratio (k% &le; 80%):</span>
                  <span
                    className={`font-mono font-bold ${
                      passesDominance ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {(dominanceRatio * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {passesDominance
                    ? 'Top contributor represents <= 80% of aggregate sum.'
                    : `VIOLATION: Top contributor represents ${(dominanceRatio * 100).toFixed(1)}% (> 80%).`}
                </p>
              </div>
            </div>

            {/* Generated W3C PROV-O Triple preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Emitted W3C PROV-O Audit Triple
              </span>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
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
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="font-bold text-white text-base">Workspace Admission Session Attributes</h3>
              <p className="text-xs text-slate-400">
                Configure attributes for an incoming Jupyter / compute pod provisioning request.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200">Researcher Accreditation</div>
                  <div className="text-xs text-slate-400">Verified institutional identity & registry</div>
                </div>
                <button
                  onClick={() => setAccredited(!accredited)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    accredited ? 'bg-emerald-500 text-slate-950' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {accredited ? 'Accredited (True)' : 'Unaccredited (False)'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200">Information Governance (IG) Training</div>
                  <div className="text-xs text-slate-400">Must be within annual certification validity</div>
                </div>
                <button
                  onClick={() => setIgTrainingValid(!igTrainingValid)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    igTrainingValid ? 'bg-emerald-500 text-slate-950' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {igTrainingValid ? 'Valid (Not Expired)' : 'Expired Certification'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200">NHS Ethics / REC Approval</div>
                  <div className="text-xs text-slate-400">Active project approval or Section 251 exemption</div>
                </div>
                <button
                  onClick={() => setEthicsApproved(!ethicsApproved)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    ethicsApproved ? 'bg-emerald-500 text-slate-950' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {ethicsApproved ? 'Approved (Active)' : 'Missing Ethics'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200">Enclave Egress Locked</div>
                  <div className="text-xs text-slate-400">Hardened cloud setting with internet egress blocked</div>
                </div>
                <button
                  onClick={() => setEgressBlocked(!egressBlocked)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    egressBlocked ? 'bg-emerald-500 text-slate-950' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {egressBlocked ? 'Egress Blocked' : 'Unrestricted Egress (Insecure)'}
                </button>
              </div>
            </div>
          </div>

          {/* Admission Decision */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Kubernetes Admission PEP Verdict
              </span>
              <h3 className="text-xl font-bold text-white">OPA `allow` Evaluation</h3>
            </div>

            <div
              className={`p-5 rounded-xl border flex items-center gap-4 ${
                admissionAllowed
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/30 border-red-500/50 text-red-200'
              }`}
            >
              {admissionAllowed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 text-red-400 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="text-lg font-bold">
                  {admissionAllowed ? 'WORKSPACE ADMITTED' : 'WORKSPACE ADMISSION REJECTED'}
                </div>
                <div className="text-xs font-mono">
                  `package tre.authz: allow = {admissionAllowed ? 'true' : 'false'}`
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-300">SHACL Constraint Violations:</div>
              {admissionAllowed ? (
                <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-emerald-300">
                  Conforms = True. No violations detected against `access-shapes.ttl`.
                </div>
              ) : (
                <ul className="space-y-1.5 font-mono text-[11px] text-red-300">
                  {!accredited && <li>• Violation: sh:minCount 1 on tre:hasAccreditedResearcher</li>}
                  {!igTrainingValid && <li>• Violation: tre:hasValidIGCertification is false / expired</li>}
                  {!ethicsApproved && <li>• Violation: sh:hasValue true on tre:hasEthicsApproval</li>}
                  {!egressBlocked && <li>• Violation: tre:enclaveEgressBlocked is false</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
