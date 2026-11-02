import React, { useState } from 'react';
import { PLAYBOOK_MODULES, ConceptModule, SATRE_PILLARS, EXTERNAL_RESOURCES, SatrePillarDetail } from '../data/playbookContent';
import { useUserProgress } from '../context/ProgressContext';
import { SeawaterLogo } from './SeawaterLogo';
import {
  ShieldCheck,
  Binary,
  Cpu,
  Calculator,
  Bot,
  GitBranch,
  CheckCircle2,
  Circle,
  Code2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
  Scale,
  Server,
  Database,
  Workflow,
  HelpCircle
} from 'lucide-react';

interface TechnicalConceptsProps {
  initialModuleId?: string | null;
  onNavigateToQuiz: (category?: string) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToImplementationTrack?: () => void;
}

export const TechnicalConcepts: React.FC<TechnicalConceptsProps> = ({
  initialModuleId,
  onNavigateToQuiz,
  onNavigateToGlossaryTerm,
  onNavigateToImplementationTrack
}) => {
  const { completedModules, toggleModuleComplete } = useUserProgress();
  const [activeModuleId, setActiveModuleId] = useState<string>(
    initialModuleId || PLAYBOOK_MODULES[0].id
  );
  const [selectedSatrePillar, setSelectedSatrePillar] = useState<SatrePillarDetail>(SATRE_PILLARS[0]);

  const activeModule =
    PLAYBOOK_MODULES.find((m) => m.id === activeModuleId) || PLAYBOOK_MODULES[0];
  const isMastered = completedModules.includes(activeModule.id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-sky-400" />;
      default:
        return <GitBranch className="w-5 h-5 text-pink-400" />;
    }
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Information Governance':
        return <Scale className="w-5 h-5 text-cyan-400" />;
      case 'Computing Infrastructure':
        return <Server className="w-5 h-5 text-purple-400" />;
      case 'Data Management':
        return <Database className="w-5 h-5 text-emerald-400" />;
      default:
        return <Workflow className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Module Selector Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <SeawaterLogo variant="badge" size="xs" className="mb-0.5" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Project Seawater: Architectural Pillars &amp; Deep Dives
            </h2>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Modules Mastered:</span>
            <strong className="text-cyan-300 font-mono text-sm">
              {completedModules.length} / {PLAYBOOK_MODULES.length}
            </strong>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {PLAYBOOK_MODULES.map((mod) => {
            const isActive = mod.id === activeModule.id;
            const isDone = completedModules.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[92px] ${
                  isActive
                    ? 'bg-cyan-950/50 border-cyan-500 shadow-md ring-1 ring-cyan-500/40 text-white'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  {getIcon(mod.icon)}
                  {isDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-semibold line-clamp-1 leading-snug">
                    {mod.title.split(':')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{mod.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Module Deep-Dive View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Module Header & Completion Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-cyan-400 uppercase tracking-wider">
                {activeModule.category}
              </span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-slate-400">{activeModule.playbookSection}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeModule.title}
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              {activeModule.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleModuleComplete(activeModule.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isMastered
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isMastered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Module Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark as Mastered</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Plain-English Overview Box */}
        <div className="bg-gradient-to-r from-cyan-950/40 to-slate-950 p-5 rounded-xl border border-cyan-800/40 space-y-2">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plain-English Governance Perspective</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {activeModule.plainEnglishSummary}
          </p>
        </div>

        {/* Key Principles Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Core Principles & Governance Rules</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeModule.keyPrinciples.map((principle, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-cyan-800/60 mt-0.5">
                  {idx + 1}
                </span>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SDC Thresholds if relevant */}
        {activeModule.sdcThresholds && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Quantitative Disclosure Control Thresholds</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeModule.sdcThresholds.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2"
                >
                  <div className="text-xs font-bold text-amber-300">{t.name}</div>
                  <div className="text-lg font-mono font-bold text-white">{t.rule}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{t.rationale}</p>
                  {t.formula && (
                    <div className="text-[11px] font-mono text-amber-200/80 bg-slate-950 p-2 rounded border border-amber-900/40">
                      {t.formula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Specification & Code Blocks */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Technical Specification & Code Implementation</span>
          </h3>

          <div className="space-y-4">
            {activeModule.technicalDetails.map((detail, idx) => (
              <div key={idx} className="space-y-2 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
                <h4 className="text-sm font-semibold text-slate-200">{detail.heading}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{detail.body}</p>

                {detail.codeSnippet && (
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-mono text-cyan-400 block">
                      {detail.codeSnippet.title}
                    </span>
                    <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed shadow-inner">
                      <code>{detail.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls & Traps */}
        {activeModule.commonPitfalls.length > 0 && (
          <div className="space-y-3 bg-red-950/15 border border-red-900/30 p-5 rounded-xl">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Architectural Pitfalls to Avoid</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeModule.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Actions & Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            {activeModule.id === 'architecture-gitops-roadmap'
              ? 'Ready to inspect the operational timeline, non-breaking rollout modes, or take the quiz?'
              : 'Ready to test your comprehension of this pillar?'}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {activeModule.id === 'architecture-gitops-roadmap' && onNavigateToImplementationTrack && (
              <button
                onClick={onNavigateToImplementationTrack}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Full 16-Week Implementation &amp; Rollout Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onNavigateToQuiz(
                activeModule.id === 'five-safes' ? 'Five Safes & Governance'
                : activeModule.id === 'owa-to-cwa-shacl' ? 'Semantic Modeling & SHACL'
                : activeModule.id === 'opa-rego-compilation' ? 'OPA Rego & Enforcement'
                : activeModule.id === 'quantitative-sdc' ? 'Quantitative SDC & Airlock'
                : activeModule.id === 'ai-mcp-governance' ? 'AI & MCP Governance'
                : 'Repository & Architecture'
              )}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <span>Take Module Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* EXTENSIVE SATRE SPECIFICATION DEEP-DIVE SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Workflow className="w-4 h-4" />
            <span>UK National Architecture Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The SATRE Specification (Standard Architecture for TREs)
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Developed under the UKRI DARE UK (Data and Analytics Research Environments UK) program by the
            Alan Turing Institute, University of Dundee, and UCL. SATRE provides the reference architecture
            for clinical secure data environments across four core operational pillars.
          </p>
        </div>

        {/* 4 Pillars Interactive Tab Navigator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SATRE_PILLARS.map((pillar) => {
            const isSelected = selectedSatrePillar.id === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedSatrePillar(pillar)}
                className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500 ring-2 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  {getPillarIcon(pillar.name)}
                  <span className="text-[10px] font-mono text-slate-500 uppercase">SATRE Pillar</span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm">{pillar.name}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {pillar.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Detail Box */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                Pillar Specification
              </span>
              <h3 className="text-xl font-bold text-white">{selectedSatrePillar.name}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {selectedSatrePillar.fullDesc}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mandatory SATRE Evaluation Statements & Technical Requirements:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {selectedSatrePillar.keyRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Playbook Repository Implementation:</span>
            <span className="font-mono text-cyan-300 font-semibold">{selectedSatrePillar.playbookMapping}</span>
          </div>
        </div>
      </div>

      {/* AUTHORITATIVE EXTERNAL LINKS & STANDARDS DIRECTORY */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ExternalLink className="w-4 h-4" />
            <span>Authoritative Technical & Statutory Standards</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Official Documentation & External Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Ground your knowledge in primary sources published by UKRI, W3C, NHS, ONS, and open-source standards bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXTERNAL_RESOURCES.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-cyan-500/60 hover:bg-slate-950 transition-all space-y-2 group block text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-900/60">
                  {res.organization}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-200 transition-colors">
                {res.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {res.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
