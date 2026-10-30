import React, { useState } from 'react';
import {
  GRANULAR_16_WEEK_TIMELINE,
  ROLLOUT_STAGES,
  DECISION_REGISTER,
  IMPLEMENTATION_CHECKLIST,
  SprintSchedule,
  DecisionRecord,
  RolloutStage,
  ChecklistItem
} from '../data/implementationTrackData';
import { SeawaterLogo } from './SeawaterLogo';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Layers,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Lock,
  Workflow,
  Server,
  Zap,
  Terminal,
  Clock,
  UserCheck,
  RotateCcw,
  Check
} from 'lucide-react';

interface ImplementationTrackProps {
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToGlossary?: (termId: string) => void;
}

export const ImplementationTrack: React.FC<ImplementationTrackProps> = ({
  onNavigateToSection,
  onNavigateToGlossary
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'rollout' | 'decisions' | 'checklist'>('timeline');
  const [selectedSprint, setSelectedSprint] = useState<SprintSchedule>(GRANULAR_16_WEEK_TIMELINE[0]);
  const [selectedStage, setSelectedStage] = useState<RolloutStage>(ROLLOUT_STAGES[1]); // Default to Evaluate-only
  const [decisionFilter, setDecisionFilter] = useState<'ALL' | 'OPEN' | 'IN_REVIEW' | 'APPROVED'>('ALL');
  const [checklistFilter, setChecklistFilter] = useState<'ALL' | 'SETUP' | 'DECISION REQUIRED' | 'IMPLEMENT' | 'VERIFY'>('ALL');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'chk-0-1': true,
    'chk-0-2': true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSprintIndex, setExpandedSprintIndex] = useState<number | null>(0);

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredDecisions = DECISION_REGISTER.filter((d) => {
    const matchesFilter = decisionFilter === 'ALL' || d.status === decisionFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.accountableOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.decisionStatement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredChecklist = IMPLEMENTATION_CHECKLIST.filter((item) => {
    const matchesFilter = checklistFilter === 'ALL' || item.type === checklistFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phaseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / IMPLEMENTATION_CHECKLIST.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SeawaterLogo variant="badge" size="sm" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-semibold">
              <Workflow className="w-3.5 h-3.5" />
              <span>Implementation &amp; Non-Breaking Rollout Framework</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Transitioning from Overview to Production Without Breaking Deployed Services
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            A comprehensive, battle-tested operational engineering roadmap taking an institution from blank ontologies
            to automated Kubernetes admission controls and airlock enforcement. Combines a granular <strong>16-week sprint schedule</strong>,
            staged <strong>non-breaking rollout modes (Evaluate-Only &rarr; Shadow &rarr; Canary &rarr; Active)</strong>, and an accountable <strong>Decision Register (D-001 &ndash; D-009)</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Timeline</span>
              <span className="text-lg font-bold text-cyan-300 font-mono">16 Weeks</span>
              <span className="text-[11px] text-slate-400 block">8 two-week sprints</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Decision Gates</span>
              <span className="text-lg font-bold text-amber-300 font-mono">9 Gates (D-001&ndash;D-009)</span>
              <span className="text-[11px] text-slate-400 block">Mandatory sign-off</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Rollout Stages</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">5 Safe Stages</span>
              <span className="text-[11px] text-slate-400 block">0% live disruption</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Audit Lineage</span>
              <span className="text-lg font-bold text-purple-300 font-mono">W3C PROV-O</span>
              <span className="text-[11px] text-slate-400 block">Immutable RDF triples</span>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
            {[
              { id: 'timeline', label: '1. Granular 16-Week Schedule', icon: <Calendar className="w-3.5 h-3.5" /> },
              { id: 'rollout', label: '2. Safe Non-Breaking Rollout Stages', icon: <Server className="w-3.5 h-3.5" /> },
              { id: 'decisions', label: '3. Policy Decision Register (D-001–D-009)', icon: <Lock className="w-3.5 h-3.5" /> },
              { id: 'checklist', label: '4. Operational Checklist & Progress', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: GRANULAR 16-WEEK OPERATIONAL TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Sprint-by-Sprint Operational Schedule
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Detailed 16-Week Implementation Blueprint
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Unlike high-level summaries, each 2-week sprint defines exact code artifacts, accountable roles,
                zero-disruption safeguards, and binding exit gates before advancing.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-400 block font-mono">Total Sprints</span>
              <span className="text-base font-bold text-white">8 Sprints &middot; 4 Phases</span>
            </div>
          </div>

          <div className="space-y-4">
            {GRANULAR_16_WEEK_TIMELINE.map((sprint, idx) => {
              const isExpanded = expandedSprintIndex === idx;
              return (
                <div
                  key={sprint.sprint}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Sprint Header Row */}
                  <div
                    onClick={() => setExpandedSprintIndex(isExpanded ? null : idx)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-500/30 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold leading-none">WEEKS</span>
                        <span className="text-xs font-bold text-white font-mono mt-0.5">{sprint.weeks.replace('Weeks ', '')}</span>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                            {sprint.phase}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{sprint.sprint}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {sprint.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">{sprint.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span className="text-xs text-cyan-400 font-medium hidden md:inline">
                        {isExpanded ? 'Collapse' : 'Inspect Deliverables & Gates'}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Sprint Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                      {/* Objective & Roles */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                        <div className="md:col-span-2 space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 block">
                            Sprint Objective
                          </span>
                          <p className="text-xs text-slate-200 leading-relaxed">{sprint.goal}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                            Accountable Roles
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {sprint.accountableRoles.map((role) => (
                              <span
                                key={role}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Concrete Code Artifacts */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Code Artifacts &amp; Operational Deliverables:</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {sprint.operationalDeliverables.map((item, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2"
                            >
                              <div>
                                <span className="text-xs font-bold text-white block">{item.artifact}</span>
                                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.description}</p>
                              </div>
                              {item.path && (
                                <code className="text-[10px] font-mono text-cyan-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 block truncate">
                                  {item.path}
                                </code>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Non-Breaking Safeguards & Exit Gates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Zero-Disruption Safeguards</span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {sprint.safeguardsAndNonBreaking.map((sg, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-bold select-none">•</span>
                                <span>{sg}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mandatory Exit Gates</span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {sprint.exitGates.map((gate, gIdx) => (
                              <li key={gIdx} className="flex items-start gap-2">
                                <span className="text-amber-400 font-bold select-none">✓</span>
                                <span>{gate}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SAFE NON-BREAKING ROLLOUT STAGES */}
      {activeTab === 'rollout' && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Non-Breaking Architectural Guardrails</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              How to Introduce Policy Enforcement Without Breaking Live Hospital &amp; Research Workflows
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              The #1 hazard in clinical Policy-as-Code is a "big-bang" deployment that mistakenly locks out accredited researchers
              or halts clinical analytics jobs due to schema drift. Seawater employs a strict <strong>5-Stage Progressive Rollout</strong>:
            </p>

            {/* Stage Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-3">
              {ROLLOUT_STAGES.map((stg) => (
                <button
                  key={stg.stage}
                  onClick={() => setSelectedStage(stg)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedStage.stage === stg.stage
                      ? 'bg-cyan-950/60 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    Stage {stg.stage}
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">{stg.name.split(':')[1]?.trim() || stg.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">{stg.trafficPercentage}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Inspection Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    STAGE {selectedStage.stage}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-400">Mode: {selectedStage.mode}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1.5">{selectedStage.name}</h3>
                <p className="text-slate-300 text-sm mt-1">{selectedStage.tagline}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right shrink-0">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Production Disruption Risk</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{selectedStage.productionImpact}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{selectedStage.trafficPercentage}</span>
              </div>
            </div>

            {/* Mechanics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Traffic Handling &amp; Decision Delegation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedStage.trafficHandling}</p>
              </div>

              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Failure Mode &amp; Safety Defaults</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedStage.failureMode}</p>
              </div>
            </div>

            {/* Exit Criteria & Tested Rollback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Criteria to Advance to Next Stage</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedStage.exitCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold select-none">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-slate-950/70 rounded-2xl border border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Instant Rollback Procedure (Tested &lt;60s)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedStage.rollbackProcedure}</p>
                <div className="pt-2">
                  <code className="text-[11px] font-mono text-rose-300 bg-slate-900 px-2 py-1 rounded border border-rose-950 block">
                    kubectl scale deployment seawater-opa --replicas=0 || make rollback-shadow
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLICY DECISION REGISTER */}
      {activeTab === 'decisions' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Auditable Governance Gates</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Policy Decision Register (D-001 &ndash; D-009)
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Every item below is a binding architectural gate, not a default or assumption. Code must not enforce
              assumed policy thresholds until the accountable owner records a signed approval.
            </p>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                {(['ALL', 'OPEN', 'IN_REVIEW', 'APPROVED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setDecisionFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      decisionFilter === st
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st === 'ALL' ? 'All Decisions (9)' : `${st} (${DECISION_REGISTER.filter((d) => d.status === st).length})`}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search decisions, owners, IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Decisions List */}
          <div className="space-y-4">
            {filteredDecisions.map((dec) => (
              <div
                key={dec.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm font-extrabold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                      {dec.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{dec.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                        dec.status === 'APPROVED'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : dec.status === 'IN_REVIEW'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-rose-950 text-rose-300 border-rose-800'
                      }`}
                    >
                      {dec.status}
                    </span>
                  </div>
                </div>

                {/* Decision Statement */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Decision Statement</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{dec.decisionStatement}</p>
                </div>

                {/* Options Considered */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-cyan-400">Options Considered</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {dec.optionsConsidered.map((opt, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300">
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Accountable Owner</span>
                    <span className="text-slate-200 font-medium">{dec.accountableOwner}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">What It Blocks</span>
                    <span className="text-amber-300 font-medium">{dec.blocks}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Non-Breaking Safeguard</span>
                    <span className="text-emerald-300 font-medium">{dec.nonBreakingImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OPERATIONAL IMPLEMENTATION CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Interactive Audit Readiness Checklist</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Phased Engineering Verification Checklist
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                  Mirrors the repository's <code>policy-as-code/checklist.md</code>. A phase is not complete until every
                  decision gate is approved and verified with attached evidence.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[200px] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Audit Readiness</span>
                  <span className="text-cyan-400 font-bold">{checklistPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${checklistPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 text-right">
                  {completedChecklistCount} of {IMPLEMENTATION_CHECKLIST.length} completed
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
              {(['ALL', 'SETUP', 'DECISION REQUIRED', 'IMPLEMENT', 'VERIFY'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setChecklistFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    checklistFilter === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat} ({cat === 'ALL' ? IMPLEMENTATION_CHECKLIST.length : IMPLEMENTATION_CHECKLIST.filter((i) => i.type === cat).length})
                </button>
              ))}
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {filteredChecklist.map((item) => {
              const isChecked = Boolean(checkedItems[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-slate-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-sm'
                          : 'bg-slate-950 border-slate-700 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        Phase {item.phaseNumber}: {item.phaseName}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          item.type === 'DECISION REQUIRED'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                            : item.type === 'IMPLEMENT'
                            ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80'
                            : item.type === 'VERIFY'
                            ? 'bg-purple-950/80 text-purple-300 border border-purple-800/80'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        [{item.type}]
                      </span>
                      {item.decisionRef && (
                        <span className="text-[10px] font-mono font-bold text-amber-400">
                          Gate: {item.decisionRef}
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        isChecked ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {item.text}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">{item.details}</p>

                    <div className="pt-1 flex items-center gap-2 text-[11px] text-cyan-400/90 font-mono">
                      <span className="text-slate-500">Evidence Required:</span>
                      <span>{item.verificationEvidence}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
