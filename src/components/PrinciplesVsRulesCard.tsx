import React, { useState } from 'react';
import {
  Scale,
  Users,
  ShieldAlert,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft
} from 'lucide-react';

export type SDCEvaluationMode = 'strict_rules' | 'principles_triage';

interface PrinciplesVsRulesCardProps {
  activeMode?: SDCEvaluationMode;
  onSelectMode?: (mode: SDCEvaluationMode) => void;
  variant?: 'navy' | 'surface';
  defaultExpanded?: boolean;
}

export const PrinciplesVsRulesCard: React.FC<PrinciplesVsRulesCardProps> = ({
  activeMode,
  onSelectMode,
  variant = 'surface',
  defaultExpanded = true
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const isNavy = variant === 'navy';

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 space-y-4 transition-all ${
        isNavy
          ? 'bg-slate-950/90 border-cyan-900/60 text-white shadow-lg'
          : 'bg-slate-50 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xs'
      }`}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border inline-flex items-center gap-1.5 ${
                isNavy
                  ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Five Safes &amp; SACRO Methodology · Ritchie &amp; Elliot (2015)</span>
            </span>
            {activeMode && (
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded border ${
                  activeMode === 'principles_triage'
                    ? isNavy
                      ? 'bg-teal-950/80 text-teal-300 border-teal-700/70'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : isNavy
                      ? 'bg-sky-950/80 text-sky-300 border-sky-700/70'
                      : 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                }`}
              >
                Active: {activeMode === 'principles_triage' ? 'Principles-Based Triage' : 'Strict Rules-Based'}
              </span>
            )}
          </div>
          <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${isNavy ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            Principles-Based vs. Rules-Based Output Checking (SDC)
          </h3>
          <p className={`text-sm leading-relaxed ${isNavy ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
            Thresholds like <code className="font-mono font-semibold">k ≥ 10</code> and <code className="font-mono font-semibold">dominance ≤ 80%</code> are operational <strong>rules-of-thumb</strong>, not universal legal bans. Understanding the difference helps airlock reviewers avoid both unnecessary research delays and false confidence.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={`self-start sm:self-center px-3.5 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors ${
            isNavy
              ? 'bg-[#07192f] hover:bg-[#112f54] text-cyan-300 border-cyan-900/60'
              : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}
        >
          <span>{expanded ? 'Hide Explainer' : 'Compare Approaches'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="space-y-4 pt-2">
          {/* Two-Column Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm items-stretch">
            {/* Rules-Based */}
            <div
              className={`rounded-xl p-5 border space-y-3 h-full ${
                activeMode === 'strict_rules'
                  ? isNavy
                    ? 'bg-[#07192f] border-sky-400/80 ring-1 ring-sky-400/40'
                    : 'bg-sky-50/70 dark:bg-sky-950/30 border-sky-400 dark:border-sky-600 ring-1 ring-sky-400/30'
                  : isNavy
                    ? 'bg-[#07192f]/80 border-cyan-900/50'
                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <ShieldAlert className={`w-4 h-4 ${isNavy ? 'text-sky-400' : 'text-[#005EB8] dark:text-sky-400'}`} />
                  <span>Strict Rules-Based SDC</span>
                </div>
                {onSelectMode && (
                  <button
                    type="button"
                    onClick={() => onSelectMode('strict_rules')}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                      activeMode === 'strict_rules'
                        ? 'bg-[#005EB8] text-white'
                        : isNavy
                          ? 'bg-slate-900 text-slate-300 hover:text-white border border-cyan-900/60'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {activeMode === 'strict_rules' ? 'Selected' : 'Use Strict Mode'}
                  </button>
                )}
              </div>

              <ul className={`space-y-2.5 leading-relaxed ${isNavy ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold mt-0.5">•</span>
                  <span><strong>Binary Gatekeeping:</strong> Fixed thresholds (<code className="font-mono">k ≥ 10</code>, <code className="font-mono">≤ 80%</code>) act as automatic pass/fail cut-offs with zero exceptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold mt-0.5">•</span>
                  <span><strong>Where It Helps:</strong> Fast, deterministic screening for simple high-volume frequency tables or zero-trust CI policy gates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Blind Spots:</strong> Blocks harmless low counts (e.g., structural zeros, regression parameters) while falsely passing large cells (<code className="font-mono">N ≥ 10</code>) vulnerable to group disclosure or table differencing.</span>
                </li>
              </ul>
            </div>

            {/* Principles-Based */}
            <div
              className={`rounded-xl p-5 border space-y-3 h-full ${
                activeMode === 'principles_triage'
                  ? isNavy
                    ? 'bg-[#07192f] border-teal-400/80 ring-1 ring-teal-400/40'
                    : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-teal-500 dark:border-emerald-600 ring-1 ring-teal-500/30'
                  : isNavy
                    ? 'bg-[#07192f]/80 border-cyan-900/50'
                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <Users className={`w-4 h-4 ${isNavy ? 'text-teal-400' : 'text-[#00A389] dark:text-teal-400'}`} />
                  <span>Principles-Based Triage (Ritchie / SACRO)</span>
                </div>
                {onSelectMode && (
                  <button
                    type="button"
                    onClick={() => onSelectMode('principles_triage')}
                    className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                      activeMode === 'principles_triage'
                        ? 'bg-[#00A389] text-white'
                        : isNavy
                          ? 'bg-slate-900 text-slate-300 hover:text-white border border-cyan-900/60'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {activeMode === 'principles_triage' ? 'Selected' : 'Use Principles Mode'}
                  </button>
                )}
              </div>

              <ul className={`space-y-2.5 leading-relaxed ${isNavy ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
                  <span><strong>Rules-of-Thumb as Triage:</strong> Crossing <code className="font-mono">k &lt; 10</code> raises a review flag rather than blind rejection—asking whether an output <em>actually</em> creates disclosure risk in context.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
                  <span><strong>Trained Researchers as Partners:</strong> Researchers submit context notes alongside flagged <strong>Statbarn</strong> outputs for 2-person human airlock judgement (the <strong>SACRO</strong> semi-automated model).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span><strong>Checks Beyond Thresholds:</strong> Even when <code className="font-mono">k ≥ 10</code>, reviewers inspect for group disclosure (100% category homogeneity) and differencing against earlier releases.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Compensating Controls & Attribution Footer */}
          <div
            className={`p-4 rounded-lg border text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isNavy
                ? 'bg-[#07192f]/90 border-cyan-900/50 text-slate-300'
                : 'bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="flex items-start gap-2">
              <ArrowRightLeft className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
              <span className="leading-relaxed">
                <strong>Five Safes Interdependence (Green &amp; Ritchie, 2023):</strong> Output checking does not work in isolation. Stronger accredited <strong>Safe People</strong> and egress-locked <strong>Safe Settings</strong> act as compensating controls alongside proportionate <strong>Safe Outputs</strong> triage.
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs shrink-0 opacity-90">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ritchie &amp; Elliot (2015) · SDAP · DARE UK SACRO</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
