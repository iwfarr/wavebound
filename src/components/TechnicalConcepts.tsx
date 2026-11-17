import React, { useState, useEffect } from 'react';
import {
  PLAYBOOK_MODULES,
  ConceptModule,
  SATRE_PILLARS,
  SatrePillarDetail,
  EHDS_CROSSWALK_ROWS,
  EHDS_TIMELINE_MILESTONES,
  EhdsComparisonDomain
} from '../data/playbookContent';
import { CALDICOTT_PRINCIPLES, CaldicottPrincipleDetail } from '../data/caldicottData';
import { DATA_CATALOGUE_ASSETS, DataCatalogueAsset } from '../data/dataCatalogueData';
import { AGENTIC_GOVERNANCE_DATA, SafePersonComparison, FiveSafesAssetMapping, StanfordRiskTier } from '../data/agenticGovernanceData';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { useUserProgress } from '../context/ProgressContext';
import { WaveboundLogo } from './WaveboundLogo';
import {
  ShieldCheck,
  ShieldAlert,
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
  Info,
  Scale,
  Server,
  Database,
  Workflow,
  HelpCircle,
  HeartHandshake,
  Table,
  Filter,
  Lock,
  FileCheck2,
  Eye,
  Tag,
  Sliders,
  Layers,
  FileText,
  UserX,
  UserCheck,
  Key,
  Zap,
  Copy,
  Check,
  Globe,
  Calendar
} from 'lucide-react';

interface TechnicalConceptsProps {
  initialModuleId?: string | null;
  onNavigateToQuiz: (category?: string) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToImplementationTrack?: () => void;
  onNavigateToPlaybook?: (sectionId?: string) => void;
  onNavigateToResources?: () => void;
  onNavigateToGovernAssure?: () => void;
  onNavigateToSandbox?: () => void;
}

type ConceptViewTab = 'architecture' | 'agentic-ai' | 'caldicott' | 'catalogue' | 'satre';

export const TechnicalConcepts: React.FC<TechnicalConceptsProps> = ({
  initialModuleId,
  onNavigateToQuiz,
  onNavigateToGlossaryTerm,
  onNavigateToImplementationTrack,
  onNavigateToPlaybook,
  onNavigateToResources,
  onNavigateToGovernAssure,
  onNavigateToSandbox
}) => {
  const { completedModules, toggleModuleComplete } = useUserProgress();

  // Determine initial view based on props
  const [activeView, setActiveView] = useState<ConceptViewTab>(() => {
    if (initialModuleId === 'agentic-ai' || initialModuleId === 'ai' || initialModuleId?.startsWith('agent-') || initialModuleId?.startsWith('stanford-')) return 'agentic-ai';
    if (initialModuleId === 'caldicott' || initialModuleId?.startsWith('caldicott-')) return 'caldicott';
    if (initialModuleId === 'catalogue' || initialModuleId?.startsWith('asset-')) return 'catalogue';
    if (initialModuleId === 'satre' || initialModuleId?.startsWith('satre-')) return 'satre';
    return 'architecture';
  });

  // State for Architecture Modules
  const [activeModuleId, setActiveModuleId] = useState<string>(
    PLAYBOOK_MODULES.find(m => m.id === initialModuleId)?.id || PLAYBOOK_MODULES[0].id
  );

  // State for Agentic AI & Five Safes Data Assets
  const [selectedAiPillar, setSelectedAiPillar] = useState<string>('Safe Data');
  const [selectedStanfordRiskTier, setSelectedStanfordRiskTier] = useState<string>('high');
  const [selectedPacExampleIdx, setSelectedPacExampleIdx] = useState<number>(0);
  const [copiedAiCode, setCopiedAiCode] = useState<boolean>(false);
  const [selectedComparisonDimension, setSelectedComparisonDimension] = useState<string>('Legal Personhood & Liability');

  // State for Caldicott Principles
  const [selectedPrincipleNum, setSelectedPrincipleNum] = useState<number>(1);
  const selectedPrinciple = CALDICOTT_PRINCIPLES.find(p => p.number === selectedPrincipleNum) || CALDICOTT_PRINCIPLES[0];

  // State for Data Catalogue Assets
  const [selectedAssetId, setSelectedAssetId] = useState<string>(DATA_CATALOGUE_ASSETS[0].id);
  const [catalogueTierFilter, setCatalogueTierFilter] = useState<string>('All');
  const selectedAsset = DATA_CATALOGUE_ASSETS.find(a => a.id === selectedAssetId) || DATA_CATALOGUE_ASSETS[0];

  // State for SATRE Pillars & EHDS Comparison
  const [selectedSatrePillar, setSelectedSatrePillar] = useState<SatrePillarDetail>(SATRE_PILLARS[0]);
  const [ehdsDomainFilter, setEhdsDomainFilter] = useState<EhdsComparisonDomain>('All');
  const [selectedEhdsYear, setSelectedEhdsYear] = useState<string>(EHDS_TIMELINE_MILESTONES[0].year);
  const [activeTooltipTerm, setActiveTooltipTerm] = useState<GlossaryTerm | null>(null);

  // Sync state dynamically if initialModuleId changes from external navigation
  useEffect(() => {
    if (!initialModuleId) return;
    if (initialModuleId === 'agentic-ai' || initialModuleId === 'ai' || initialModuleId.startsWith('agent-') || initialModuleId.startsWith('stanford-')) {
      setActiveView('agentic-ai');
    } else if (initialModuleId === 'caldicott' || initialModuleId.startsWith('caldicott-')) {
      setActiveView('caldicott');
      const numMatch = initialModuleId.match(/caldicott-(\d+)/);
      if (numMatch) {
        setSelectedPrincipleNum(parseInt(numMatch[1], 10));
      }
    } else if (initialModuleId === 'catalogue' || initialModuleId.startsWith('asset-')) {
      setActiveView('catalogue');
      if (initialModuleId.startsWith('asset-')) {
        setSelectedAssetId(initialModuleId);
      }
    } else if (initialModuleId === 'satre' || initialModuleId.startsWith('satre-')) {
      setActiveView('satre');
    } else {
      const found = PLAYBOOK_MODULES.find(m => m.id === initialModuleId);
      if (found) {
        setActiveView('architecture');
        setActiveModuleId(found.id);
      }
    }
  }, [initialModuleId]);

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
      case 'Computing Technology & Infrastructure':
        return <Server className="w-5 h-5 text-purple-400" />;
      case 'Data Management':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Federation':
        return <Globe className="w-5 h-5 text-sky-400" />;
      default:
        return <Workflow className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredAssets = DATA_CATALOGUE_ASSETS.filter((asset) => {
    if (catalogueTierFilter === 'All') return true;
    return asset.sensitivityTier.includes(catalogueTierFilter);
  });

  // Scan text for known glossary terms, acronyms, and aliases (including EHDS & SATRE 2.0) for rollover/click navigation
  const renderGlossaryBadges = (rawText: string, keyPrefix: string | number = 'tc') => {
    if (!rawText) return rawText;
    const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
    const rawTokens = sortedTerms.flatMap((t) => [
      t.term,
      ...(t.acronym ? [t.acronym] : []),
      ...(t.aliases ?? [])
    ]);
    const combinedTokens = Array.from(new Set(rawTokens))
      .sort((a, b) => b.length - a.length)
      .map((tok) => tok.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));

    const regex = new RegExp(`\\b(${combinedTokens.join('|')})\\b`, 'i');
    const pieces = rawText.split(regex);
    if (pieces.length === 1) return rawText;

    return pieces.map((piece, idx) => {
      const lowerPiece = piece.toLowerCase();
      const matchedTerm = sortedTerms.find(
        (t) =>
          t.term.toLowerCase() === lowerPiece ||
          (t.acronym && t.acronym.toLowerCase() === lowerPiece) ||
          (t.aliases && t.aliases.some((alias) => alias.toLowerCase() === lowerPiece))
      );

      if (matchedTerm) {
        return (
          <button
            key={`${keyPrefix}-${idx}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTooltipTerm(null);
              onNavigateToGlossaryTerm(matchedTerm.id);
            }}
            onMouseEnter={() => setActiveTooltipTerm(matchedTerm)}
            className="inline text-[#005EB8] dark:text-cyan-300 font-medium underline decoration-[#005EB8]/40 dark:decoration-cyan-500/50 decoration-1 underline-offset-2 hover:text-cyan-700 dark:hover:text-cyan-100 hover:bg-sky-50 dark:hover:bg-cyan-950/60 px-0.5 rounded transition-colors cursor-pointer text-left"
            title={`Inspect '${matchedTerm.term}' in the Glossary`}
          >
            {piece}
          </button>
        );
      }
      return piece;
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Track Selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <WaveboundLogo variant="badge" size="xs" className="mb-0.5" />
            <div className="text-xs font-semibold text-[#005EB8] dark:text-cyan-400">
              Pillar 1 · Quick-Start Visual Orientation
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Concepts Visual Primer &amp; Governance Frameworks
            </h1>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              A clear visual reference covering our core building blocks, AI &amp; Five Safes, Caldicott Principles 1–8, Data Catalogue tiers, and SATRE 2.0 &amp; EHDS comparison. For full code recipes or live testing, jump into the <strong className="text-slate-900 dark:text-white">Wavebound PaC Playbook</strong> or <strong className="text-slate-900 dark:text-white">Simulators &amp; Lab</strong> below.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-xs self-start lg:self-center">
            <span>Modules Mastered:</span>
            <strong className="text-[#005EB8] dark:text-cyan-300 font-mono text-base tabular-nums">
              {completedModules.length} / {PLAYBOOK_MODULES.length}
            </strong>
          </div>
        </div>

        {/* 5 Major Knowledge Hub Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveView('architecture')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
              activeView === 'architecture'
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Architecture Modules</div>
              <div className="text-xs text-slate-400">6 Core Engines</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('agentic-ai')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
              activeView === 'agentic-ai'
                ? 'bg-sky-500/15 border-sky-400 text-sky-200 font-bold shadow-sm ring-1 ring-sky-500/40'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">AI &amp; Five Safes</div>
              <div className="text-xs text-slate-400">Stanford UIT Framework</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('caldicott')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
              activeView === 'caldicott'
                ? 'bg-purple-500/10 border-purple-500 text-purple-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">8 Caldicott Principles</div>
              <div className="text-xs text-slate-400">Statutory &amp; PaC Detail</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('catalogue')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
              activeView === 'catalogue'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Data Catalogue Assets</div>
              <div className="text-xs text-slate-400">Metadata Constraints</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('satre')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
              activeView === 'satre'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">SATRE Specification</div>
              <div className="text-xs text-slate-400">5 Pillars &amp; EHDS</div>
            </div>
          </button>
        </div>
      </div>

      {/* VIEW 1: ARCHITECTURE MODULES */}
      {activeView === 'architecture' && (
        <div className="space-y-6">
          {/* Sub-selector for the 6 modules */}
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
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {getIcon(mod.icon)}
                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold line-clamp-1 leading-snug">
                      {mod.title.split(':')[0]}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1">{mod.category}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Module Detail */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#005EB8] dark:text-cyan-400 uppercase tracking-wider">
                    {activeModule.category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">{activeModule.playbookSection}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeModule.title}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
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

            {/* Plain-English Overview */}
            <div className="bg-gradient-to-r from-cyan-950/40 to-slate-950 p-5 rounded-xl border border-cyan-800/40 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plain-English Governance Perspective</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {activeModule.plainEnglishSummary}
              </p>
            </div>

            {/* Core Principles */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Core Principles &amp; Governance Rules</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
                {activeModule.keyPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed flex items-start gap-3 h-full"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-cyan-800/60 mt-0.5 tabular-nums">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                  {activeModule.sdcThresholds.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2.5 h-full flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-amber-300">{t.name}</div>
                        <div className="text-lg font-mono font-bold text-white tabular-nums">{t.rule}</div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.rationale}</p>
                      </div>
                      {t.formula && (
                        <div className="text-xs font-mono text-amber-200/90 bg-slate-950 p-2.5 rounded border border-amber-900/40">
                          {t.formula}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Concise Visual Architecture Summary (Full step-by-step code lives in Wavebound PaC Playbook) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#005EB8] dark:text-cyan-400" />
                  <span>Core Technical Building Blocks (At-a-Glance)</span>
                </h3>
                {onNavigateToPlaybook && (
                  <button
                    onClick={() => onNavigateToPlaybook(activeModule.playbookSection)}
                    className="text-xs font-semibold text-[#005EB8] dark:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read full Turtle / Rego guide in PaC Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {activeModule.technicalDetails.map((detail, idx) => (
                  <div key={idx} className="space-y-2.5 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 h-full flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{detail.heading}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.body}</p>
                    </div>
                    {detail.codeSnippet && (
                      <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#005EB8] dark:text-cyan-400">
                        <span>Artifact: {detail.codeSnippet.title}</span>
                        <span className="uppercase">{detail.codeSnippet.language}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                {onNavigateToPlaybook && (
                  <button
                    onClick={() => onNavigateToPlaybook(activeModule.playbookSection)}
                    className="px-4 py-2.5 rounded-xl bg-[#005EB8] hover:bg-[#0c2340] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Full Chapter in PaC Playbook</span>
                  </button>
                )}
                {onNavigateToGovernAssure && (
                  <button
                    onClick={onNavigateToGovernAssure}
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Try Live in Govern &amp; Assure</span>
                  </button>
                )}
                {onNavigateToSandbox && (
                  <button
                    onClick={onNavigateToSandbox}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>OPA Rego Sandbox</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigateToQuiz(activeModule.category)}
                  className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/60 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Quiz on {activeModule.category}</span>
                </button>

                {onNavigateToImplementationTrack && (
                  <button
                    onClick={onNavigateToImplementationTrack}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#005EB8] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Rollout &amp; Decisions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: AGENTIC AI & DATA ASSETS IN FIVE SAFES (STANFORD UIT FRAMEWORK) */}
      {activeView === 'agentic-ai' && (
        <div className="space-y-8">
          {/* Header & Core Dilemma Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-5 relative overflow-hidden shadow-xs">
            <div className="space-y-2 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Stanford UIT &amp; Five Safes Governance Specification</span>
                </span>
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  DEA 2017 &amp; Caldicott P8 Aligned
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                AI Personhood vs. Data Asset Classification in Secure Enclaves
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Resolving the statutory and architectural status of artificial intelligence within Trusted Research Environments (TREs), Secure Data Environments (SDEs), and population health intelligence platforms.
              </p>
            </div>

            {/* Authoritative Ruling Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-sky-900/50 space-y-3 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Authoritative Legal &amp; Architectural Resolution</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {AGENTIC_GOVERNANCE_DATA.governanceDilemma.shortResolution}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {AGENTIC_GOVERNANCE_DATA.governanceDilemma.fullResolution}
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Statutory Doctrine: <strong className="text-slate-200">{AGENTIC_GOVERNANCE_DATA.governanceDilemma.statutoryDoctrine}</strong></span>
                </span>
                <a
                  href="https://uit.stanford.edu/security/agenticai/security-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono hover:underline"
                >
                  <span>Stanford UIT Framework</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* SUB-SECTION 1: ACCREDITED HUMAN (SAFE PERSON) VS AGENTIC AI WORKLOAD */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>The Non-Personhood Doctrine</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Accredited Human Researcher (Safe Person) vs. AI Agent Workload
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compare statutory standing, identity revocation, ethical bounds, and blast radius constraints between humans and autonomous systems.
              </p>
            </div>

            {/* Dimension Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AGENTIC_GOVERNANCE_DATA.safePersonComparison.map((comp) => {
                const isSelected = comp.dimension === selectedComparisonDimension;
                return (
                  <button
                    key={comp.dimension}
                    onClick={() => setSelectedComparisonDimension(comp.dimension)}
                    className={`p-3.5 rounded-xl border text-left transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
                      isSelected
                        ? 'bg-sky-950/80 border-sky-400 text-sky-200 shadow-sm ring-1 ring-sky-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="truncate">{comp.dimension}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Comparison Card */}
            {(() => {
              const activeComp = AGENTIC_GOVERNANCE_DATA.safePersonComparison.find(
                (c) => c.dimension === selectedComparisonDimension
              ) || AGENTIC_GOVERNANCE_DATA.safePersonComparison[0];

              return (
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    {/* Column 1: Accredited Human Researcher (Safe Person) */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-emerald-900/50 space-y-3 flex flex-col justify-between h-full">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                            <UserCheck className="w-4 h-4" />
                            <span>Safe Person (Accredited Human)</span>
                          </span>
                          <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                            {activeComp.accreditedHuman.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base">
                          {activeComp.accreditedHuman.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {activeComp.accreditedHuman.description}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-emerald-400/90 pt-2 border-t border-slate-800/80">
                        Legal Basis: {activeComp.accreditedHuman.legalBasis}
                      </div>
                    </div>

                    {/* Column 2: Agentic AI (Non-Person Machine Workload) */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-sky-900/50 space-y-3 flex flex-col justify-between h-full">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase">
                            <UserX className="w-4 h-4 text-amber-400" />
                            <span>AI Agent (Delegated Workload)</span>
                          </span>
                          <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800 font-bold">
                            {activeComp.agenticAI.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base">
                          {activeComp.agenticAI.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {activeComp.agenticAI.description}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-sky-400/90 pt-2 border-t border-slate-800/80">
                        Statutory Mandate: {activeComp.agenticAI.legalBasis}
                      </div>
                    </div>
                  </div>

                  {/* Architectural Resolution Footer */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                        Architectural Resolution &amp; Enclave Policy
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeComp.architecturalResolution}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* SUB-SECTION 2: WHERE DATA ASSETS & AI MODELS SIT ACROSS THE FIVE SAFES */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>The Five Safes Architectural Matrix</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Where Data Assets &amp; AI Models Sit in the Five Safes Framework
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Understanding how raw population cohorts, model checkpoints, inference execution, and airlocks map to each dimension.
              </p>
            </div>

            {/* Five Safes Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {AGENTIC_GOVERNANCE_DATA.fiveSafesMapping.map((fs) => {
                const isSelected = fs.pillar === selectedAiPillar;
                return (
                  <button
                    key={fs.pillar}
                    onClick={() => setSelectedAiPillar(fs.pillar)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-400 text-white shadow-sm ring-1 ring-purple-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-sm font-bold truncate">{fs.pillar}</div>
                    <div className="text-xs text-slate-400 truncate">{fs.subtitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Card */}
            {(() => {
              const activeFs = AGENTIC_GOVERNANCE_DATA.fiveSafesMapping.find(
                (f) => f.pillar === selectedAiPillar
              ) || AGENTIC_GOVERNANCE_DATA.fiveSafesMapping[0];

              return (
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded border border-purple-800">
                        {activeFs.pillar}
                      </span>
                      <h4 className="text-lg font-bold text-white">{activeFs.subtitle}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 h-full">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span>Data Assets (Cohorts &amp; Registries)</span>
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeFs.whereDataAssetsSit}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 h-full">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Bot className="w-4 h-4 text-sky-400" />
                        <span>AI Agents &amp; Neural Model Weights</span>
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeFs.whereAIModelsAndAgentsSit}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Constraints & Enforcement */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Metadata-Driven Constraints &amp; Architectural Bounds:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                      {activeFs.metadataConstraints.map((constraint, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-mono text-xs">{constraint}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="text-slate-400">Technical Enforcement Mechanism:</span>
                    <span className="font-mono text-cyan-300 font-semibold">{activeFs.enforcementMechanism}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* SUB-SECTION 3: STANFORD UIT AGENTIC AI SECURITY FRAMEWORK INTEGRATION */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Key className="w-4 h-4" />
                <span>Stanford University IT Standards</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Stanford UIT Agentic AI Security Framework Principles
                </h3>
                <a
                  href="https://uit.stanford.edu/security/agenticai/security-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono hover:underline shrink-0"
                >
                  <span>Official Framework Specification</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Four mandatory controls from the Stanford UIT security framework directly implemented inside the Wavebound Policy-as-Code compiler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {AGENTIC_GOVERNANCE_DATA.stanfordFrameworkPrinciples.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between h-full"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="font-bold text-white text-base">{principle.title}</h4>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-amber-200/90 italic leading-relaxed">
                      {principle.stanfordRequirement}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {principle.treImplementation}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/80 text-xs font-mono text-cyan-300 flex items-center justify-between gap-2">
                    <span className="text-slate-400 shrink-0">PaC Pattern:</span>
                    <span className="truncate">{principle.policyAsCodePattern}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUB-SECTION 4: STANFORD UIT 4-TIER RISK MATRIX */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Autonomous Agent Classification</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Stanford UIT Agentic AI Risk Classifications
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <a
                    href="https://uit.stanford.edu/security/agenticai/riskclassifications#section_8702"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline"
                  >
                    <span>High Risk #8702</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://uit.stanford.edu/security/agenticai/riskclassifications#section_8938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
                  >
                    <span>Very High Risk #8938</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Evaluating autonomous agent pipelines against target data sensitivity, blast radius, human oversight, and instantaneous revocability.
              </p>
            </div>

            {/* Risk Tier Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AGENTIC_GOVERNANCE_DATA.stanfordRiskTiers.map((tier) => {
                const isSelected = tier.id === selectedStanfordRiskTier;
                let badgeColor = 'text-emerald-400 border-emerald-800';
                if (tier.id === 'moderate') badgeColor = 'text-sky-400 border-sky-800';
                if (tier.id === 'high') badgeColor = 'text-amber-400 border-amber-800';
                if (tier.id === 'very-high') badgeColor = 'text-rose-400 border-rose-800';

                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedStanfordRiskTier(tier.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-sky-400 text-white shadow-sm ring-1 ring-sky-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold uppercase ${badgeColor}`}>
                        {tier.id.replace('-', ' ')}
                      </span>
                      {tier.permittedInTRE ? (
                        <span className="text-xs text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/70">
                          Permitted
                        </span>
                      ) : (
                        <span className="text-xs text-rose-400 bg-rose-950/70 px-1.5 py-0.5 rounded border border-rose-800/70">
                          Prohibited
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white truncate">{tier.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Risk Tier Deep Dive */}
            {(() => {
              const activeTier = AGENTIC_GOVERNANCE_DATA.stanfordRiskTiers.find(
                (t) => t.id === selectedStanfordRiskTier
              ) || AGENTIC_GOVERNANCE_DATA.stanfordRiskTiers[2];

              return (
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
                          {activeTier.stanfordSectionRef}
                        </span>
                        <h4 className="text-lg font-bold text-white">{activeTier.name}</h4>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">
                        Autonomy Level: <strong className="text-slate-200">{activeTier.autonomyLevel}</strong>
                      </div>
                    </div>

                    {activeTier.stanfordSectionUrl && (
                      <a
                        href={activeTier.stanfordSectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-sky-300 font-mono flex items-center gap-1.5 self-start sm:self-center"
                      >
                        <span>View Stanford Spec</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 h-full">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Target Data Sensitivity
                      </div>
                      <div className="text-sm text-slate-200 leading-relaxed font-semibold">
                        {activeTier.targetDataSensitivity}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 h-full">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Blast Radius &amp; Execution Bounds
                      </div>
                      <div className="text-sm text-slate-200 leading-relaxed">
                        {activeTier.blastRadius}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 h-full">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Human Oversight Requirement
                      </div>
                      <div className="text-sm text-amber-200 leading-relaxed font-medium">
                        {activeTier.humanOversightRequirement}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 h-full">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Workload Identity &amp; Token Ephemerality
                      </div>
                      <div className="text-xs sm:text-sm text-sky-200 leading-relaxed font-mono">
                        {activeTier.identityAndCredentialRules}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Automated Policy-as-Code Controls Enforced:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {activeTier.pacControls.map((ctrl, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ctrl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* SUB-SECTION 5: EXECUTABLE POLICY-AS-CODE ARTIFACTS */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Deterministic Enforcement</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Policy-as-Code Implementation Artifacts
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Inspect the concrete SHACL shapes and OPA Rego policies compiling Stanford UIT machine identity revocation and non-personhood into production PDPs.
              </p>
            </div>

            {/* Code Tab Switcher */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                {AGENTIC_GOVERNANCE_DATA.pacExamples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPacExampleIdx(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      selectedPacExampleIdx === idx
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{ex.language === 'turtle' ? 'W3C SHACL Shape (.ttl)' : 'OPA Rego Policy (.rego)'}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].code);
                  setCopiedAiCode(true);
                  setTimeout(() => setCopiedAiCode(false), 2000);
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedAiCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAiCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Block Container */}
            <div className="space-y-3">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-sm font-semibold text-slate-100">
                  {AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].title}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].explanation}
                </p>
                <pre className="p-4 rounded-lg bg-slate-900 text-sky-200 font-mono text-xs sm:text-sm border border-slate-800 overflow-x-auto leading-relaxed mt-2">
                  <code>{AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].code}</code>
                </pre>
              </div>
            </div>

            {/* Optional Public-Sector Transparency Note: ATRS */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-sky-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sky-300">Algorithmic Transparency Recording Standard (ATRS)</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950/70 text-sky-200 border border-sky-700/60">
                    Recommended Open Guidance
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Alongside Stanford UIT runtime bounds and Caldicott Principle 8 registers, UK GDS/DSA&apos;s optional two-tier ATRS schema provides a public-friendly structure for recording model purpose, data inputs, risks, and human oversight.
                </p>
              </div>
              <button
                onClick={() => onNavigateToGlossaryTerm('atrs')}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-700/50 text-sky-300 font-semibold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>ATRS in Glossary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 8 CALDICOTT PRINCIPLES DISAGGREGATED EXPLORER */}
      {activeView === 'caldicott' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>National Data Guardian &amp; UK Information Governance</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The 8 Caldicott Principles: Complete Statutory &amp; Policy-as-Code Breakdown
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Disaggregating each Caldicott principle into its official statutory mandate, practical application in population health and epidemiological research, and exact machine-executable Policy-as-Code enforcement mechanism.
            </p>
          </div>

          {/* 8 Principles Button Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 items-stretch">
            {CALDICOTT_PRINCIPLES.map((cp) => {
              const isSelected = cp.number === selectedPrincipleNum;
              return (
                <button
                  key={cp.number}
                  onClick={() => setSelectedPrincipleNum(cp.number)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 h-full ${
                    isSelected
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-md ring-1 ring-purple-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-mono tabular-nums ${
                    isSelected ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-purple-400'
                  }`}>
                    {cp.number}
                  </span>
                  <span className="text-xs font-semibold line-clamp-2 leading-tight">
                    {cp.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Caldicott Principle Deep Detail Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-900 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2.5 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                    Principle {selectedPrinciple.number} of 8
                  </span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    {selectedPrinciple.decisionGate}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedPrinciple.title}
                </h3>
                <p className="text-purple-900 dark:text-purple-200 text-sm font-medium italic">
                  "{selectedPrinciple.tagline}"
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-right shrink-0">
                <div className="text-xs text-slate-500 uppercase font-semibold">Accountable Role</div>
                <div className="text-sm font-bold text-purple-900 dark:text-purple-300">{selectedPrinciple.accountableRole}</div>
              </div>
            </div>

            {/* Official Definition vs Population Research Reality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 h-full">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  <span>Official Statutory Definition (National Data Guardian)</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedPrinciple.officialDefinition}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-900/40 space-y-2 h-full">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Population Data &amp; Epidemiology Application</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedPrinciple.populationResearchApplication}
                </p>
              </div>
            </div>

            {/* Technical Policy-as-Code Enforcement */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Deterministic Policy-as-Code Technical Enforcement</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPrinciple.technicalEnforcementMechanism}
              </p>
            </div>

            {/* Code Snippets: SHACL Shape Rule & OPA Rego Policy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-purple-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>W3C SHACL Shape Rule</span>
                  </span>
                  <span className="font-mono text-xs text-slate-500">ontology/shapes/</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 text-purple-200 font-mono text-xs border border-purple-950/80 overflow-x-auto leading-relaxed">
                  <code>{selectedPrinciple.shaclShapeRule}</code>
                </pre>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open Policy Agent (OPA) Rego Rule</span>
                  </span>
                  <span className="font-mono text-xs text-slate-500">security/opa/caldicott.rego</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 text-cyan-200 font-mono text-xs border border-cyan-950/80 overflow-x-auto leading-relaxed">
                  <code>{selectedPrinciple.opaRegoPolicy}</code>
                </pre>
              </div>
            </div>

            {/* Audit Evidence Footer */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Required Audit Evidence: <strong className="text-slate-100">{selectedPrinciple.auditEvidence}</strong></span>
              </div>
              <button
                onClick={() => onNavigateToGlossaryTerm('caldicott')}
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 text-xs shrink-0 cursor-pointer"
              >
                <span>View Caldicott in Glossary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {selectedPrinciple.number === 8 && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="text-slate-300 leading-relaxed">
                  <strong className="text-sky-300">Complementary Open Standard — Algorithmic Transparency Recording Standard (ATRS):</strong>{' '}
                  For studies deploying predictive algorithms or AI models, ATRS offers a recommended UK public-sector two-tier public disclosure format complementing Caldicott Principle 8 registers (advisory guidance only).
                </div>
                <button
                  onClick={() => onNavigateToGlossaryTerm('atrs')}
                  className="text-sky-300 hover:text-sky-200 font-semibold flex items-center gap-1 text-xs shrink-0 cursor-pointer"
                >
                  <span>Explore ATRS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: DATA CATALOGUE ASSETS & ASSET-DEPENDENT CONSTRAINTS */}
      {activeView === 'catalogue' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Data Governance &amp; Asset Metadata Schema</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Data Catalogue Assets: Policy-as-Code Metadata &amp; Dependent Constraints
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              In population data intelligence environments, datasets are not generic files. Each asset in the Data Catalogue possesses specific metadata constraints, including primary cell suppression thresholds (such as k &ge; 10 or k &ge; 5 based on custodian rules), dominance limits, role-based access tiers, and SHACL validation shapes.
            </p>
          </div>

          {/* Architectural Distinction Callout: Metadata Binding vs National Discovery Portal */}
          <div className="p-5 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>Architectural Scope: Policy-as-Code Constraint Binding vs. National Discovery Portals</span>
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                This explorer demonstrates how dataset governance metadata (DCAT schemas + SHACL shapes) compiles directly into runtime OPA PDP policy gates. For discovering population health datasets, cohort exploration, and formal data access requests, use dedicated national catalogues like the <strong>Health Data Research Innovation Gateway</strong>.
              </p>
            </div>
            <a
              href="https://healthdatagateway.org/en"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <span>HDR UK Gateway</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Data Quality Pairing: ISO/IEC 5259 & UK Government Data Quality Framework */}
          <div className="p-5 bg-slate-950/90 border border-sky-800/50 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-sky-300 uppercase tracking-wider text-xs">
                  Data Quality Pairing: ISO/IEC 5259 &amp; UK Government Data Quality Framework
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-sky-950/70 text-sky-200 border border-sky-700/60">
                  Open Interoperability Guidance
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Alongside <strong className="text-white">ISO/IEC 5259</strong> (analytics &amp; ML training data quality), the DSA-backed <strong className="text-white">UK Government Data Quality Framework</strong> provides a shared non-ML vocabulary for operational datasets across six dimensions (<em>Accuracy, Completeness, Consistency, Timeliness, Uniqueness, Validity</em>) and clear <strong className="text-white">Information Asset Owner (IAO) / Data Steward</strong> accountability.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigateToGlossaryTerm('government-data-quality-framework')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-700/60 font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>GDQF &amp; ISO 5259</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="https://www.gov.uk/government/publications/the-government-data-quality-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs inline-flex items-center gap-1"
              >
                <span>GOV.UK Spec</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Tier Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Tier 1', 'Tier 2', 'Tier 3'].map((tier) => (
              <button
                key={tier}
                onClick={() => setCatalogueTierFilter(tier)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  catalogueTierFilter === tier
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tier === 'All' ? 'All Sensitivity Tiers' : `${tier} Datasets`}
              </button>
            ))}
          </div>

          {/* Asset Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {filteredAssets.map((asset) => {
              const isSelected = asset.id === selectedAssetId;
              const tierColor = asset.sensitivityTier.includes('Tier 3')
                ? 'text-rose-400 bg-rose-950/80 border-rose-800'
                : asset.sensitivityTier.includes('Tier 2')
                ? 'text-amber-400 bg-amber-950/80 border-amber-800'
                : 'text-emerald-400 bg-emerald-950/80 border-emerald-800';

              return (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={`p-5 rounded-2xl border text-left transition-all space-y-3 flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                        {asset.acronym}
                      </span>
                      <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${tierColor}`}>
                        {asset.sensitivityTier.split(':')[0]}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-base line-clamp-2 leading-snug">
                      {asset.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {asset.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs w-full">
                    <span className="text-emerald-400 font-mono font-semibold tabular-nums">
                      k &gt;= {asset.minCellSize} suppression
                    </span>
                    <span className="text-slate-400">
                      {asset.refreshCadence.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Asset Detailed Metadata Inspection View */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Asset Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#047857] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    {selectedAsset.acronym}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-300">
                    {selectedAsset.domain}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Custodian: {selectedAsset.dataCustodian}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedAsset.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedAsset.summary}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right shrink-0 space-y-1">
                <div className="text-xs text-slate-400 uppercase font-semibold">Sensitivity Tier</div>
                <div className="text-sm font-bold text-emerald-300 font-mono">{selectedAsset.sensitivityTier}</div>
                <div className="text-xs text-slate-400">{selectedAsset.refreshCadence}</div>
              </div>
            </div>

            {/* Asset-Dependent Suppression Constraints */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Asset-Dependent Statistical Disclosure Control (SDC) Constraints</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm items-stretch">
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 h-full">
                  <div className="text-slate-400 text-xs">Primary Suppression:</div>
                  <div className="font-bold text-slate-100">{selectedAsset.suppressionThreshold}</div>
                </div>
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 h-full">
                  <div className="text-slate-400 text-xs">Dominance Rule:</div>
                  <div className="font-bold text-slate-100">{selectedAsset.dominanceRule}</div>
                </div>
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 h-full">
                  <div className="text-slate-400 text-xs">Secondary Complementary Masking:</div>
                  <div className="font-bold text-slate-100">
                    {selectedAsset.secondaryMaskingRequired ? 'Mandatory for tabular totals' : 'Not required for this tier'}
                  </div>
                </div>
              </div>
            </div>

            {/* Access, Role & Accreditation Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm items-stretch">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 h-full">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Permitted Roles &amp; Accreditation Requirements</span>
                </div>
                <div className="space-y-2.5 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-xs">Permitted Analytical Roles:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {selectedAsset.permittedRoles.map((role, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-800/60">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs pt-1">Statutory Accreditation:</span>
                    <strong className="text-slate-100 block">{selectedAsset.accreditationRequired}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs pt-1">Approval Bodies:</span>
                    <span className="text-slate-200">{selectedAsset.approvalBodies.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 h-full">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <span>De-Identification &amp; Resolution Boundaries</span>
                </div>
                <div className="space-y-3 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-xs">Pseudonymization Method:</span>
                    <p className="text-slate-200 text-sm leading-relaxed">{selectedAsset.pseudonymizationMethod}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate-400 block text-xs">Geographic Level:</span>
                      <span className="text-slate-100 font-mono text-sm">{selectedAsset.geographicGranularity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs">Temporal Granularity:</span>
                      <span className="text-slate-100 font-mono text-sm">{selectedAsset.temporalGranularity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Constraints */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Operational &amp; Compute Isolation Rules:
              </div>
              <div className="grid grid-cols-1 gap-2.5 text-sm">
                {selectedAsset.operationalConstraints.map((constraint, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{constraint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine-Readable Ontological Mappings */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-xs">W3C SHACL Shape Target:</span>
                <div className="font-mono text-cyan-300 font-bold">{selectedAsset.shaclShapeTarget}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-xs">OPA Authorization Rule:</span>
                <div className="font-mono text-purple-300 font-bold">{selectedAsset.opaPolicyRule}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-xs">Sample Schema Columns:</span>
                <div className="font-mono text-slate-300 text-xs">{selectedAsset.sampleAttributes.slice(0, 3).join(', ')}...</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SATRE 2.0 SPECIFICATION & EHDS INTEROPERABILITY */}
      {activeView === 'satre' && (() => {
        const filteredEhdsRows =
          ehdsDomainFilter === 'All'
            ? EHDS_CROSSWALK_ROWS
            : EHDS_CROSSWALK_ROWS.filter((row) => row.domain === ehdsDomainFilter);
        const activeMilestone =
          EHDS_TIMELINE_MILESTONES.find((m) => m.year === selectedEhdsYear) || EHDS_TIMELINE_MILESTONES[0];

        return (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Standard Architecture for Trusted Research Environments (SATRE 2.0)</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The SATRE 2.0 Specification (5 Pillars of Trusted Enclaves)
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                An open, interoperable UK standard authored by DARE UK, HDR UK, and academic consortia. SATRE v1 defined 4 core pillars (Information Governance, Computing Technology, Data Management, and Supporting Capabilities); SATRE 2.0 adds <strong className="text-slate-200">Federation</strong> as Pillar 5 under TREvolution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
              {SATRE_PILLARS.map((pillar, idx) => {
                const isSelected = pillar.id === selectedSatrePillar.id;

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedSatrePillar(pillar)}
                    className={`p-4 rounded-xl border text-left transition-colors space-y-2.5 cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-sm ring-1 ring-cyan-500/40'
                        : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        {getPillarIcon(pillar.name)}
                        <span className="text-xs font-mono tabular-nums text-slate-400">
                          Pillar {idx + 1} of 5
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-base leading-snug">{pillar.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {pillar.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Deep Detail Box */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-400">
                  <span>SATRE 2.0 Specification</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">Pillar {SATRE_PILLARS.findIndex((p) => p.id === selectedSatrePillar.id) + 1} of 5</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedSatrePillar.name}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  {selectedSatrePillar.fullDesc}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Mandatory SATRE Evaluation Statements &amp; Technical Requirements:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm items-stretch">
                  {selectedSatrePillar.keyRequirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2.5 h-full"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/75 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <span className="text-slate-600 dark:text-slate-400">Playbook Repository Implementation:</span>
                <span className="font-mono text-[#005EB8] dark:text-cyan-300 font-semibold">{selectedSatrePillar.playbookMapping}</span>
              </div>
            </div>

            {/* WAVEBOUND & SATRE 2.0 VS. EU EHDS (REGULATION (EU) 2025/327) INTERACTIVE WORKBENCH */}
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#005EB8] dark:text-cyan-300">
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>{renderGlossaryBadges('Regulation (EU) 2025/327', 'ehds-hdr-reg')}</span>
                    <span aria-hidden="true">·</span>
                    <span>Chapter IV Secondary Use (Articles 45–75)</span>
                    <span aria-hidden="true">·</span>
                    <span>UK–EU Regulatory Cross-Walk</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    How Wavebound &amp; {renderGlossaryBadges('SATRE 2.0', 'ehds-h3-satre')} Compare to the{' '}
                    {renderGlossaryBadges('European Health Data Space', 'ehds-h3-name')} ({renderGlossaryBadges('EHDS', 'ehds-h3-abbr')})
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {renderGlossaryBadges(
                      'Regulation (EU) 2025/327 establishes a statutory European Union framework for the secondary use of electronic health data governed by Health Data Access Bodies (HDABs), purpose-bound Data Permits, and zero-download Secure Processing Environments (SPEs). While technical safeguards in SATRE 2.0 and Wavebound exhibit substantial architectural correspondence with Chapter IV, SATRE remains a voluntary UK specification operating within domestic statutory boundaries.',
                      'ehds-intro'
                    )}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
                    {(['All', 'Gateway & Permits', 'SPE Security', 'Output Checking', 'Federation & Standards'] as EhdsComparisonDomain[]).map((domain) => {
                      const isActive = ehdsDomainFilter === domain;
                      return (
                        <button
                          key={domain}
                          type="button"
                          onClick={() => setEhdsDomainFilter(domain)}
                          className={`px-2.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-white dark:bg-[#005EB8] text-slate-900 dark:text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {domain}
                        </button>
                      );
                    })}
                  </div>
                  {(() => {
                    const ehdsTerm = GLOSSARY_TERMS.find((t) => t.id === 'ehds');
                    return ehdsTerm ? (
                      <button
                        type="button"
                        onClick={() => onNavigateToGlossaryTerm('ehds')}
                        onMouseEnter={() => setActiveTooltipTerm(ehdsTerm)}
                        className="text-xs font-medium text-[#005EB8] dark:text-cyan-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Inspect Full EHDS Regulation Entry in Glossary</span>
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>

              {/* Critical Appraisal: Does SATRE Map Cleanly to the EHDS? */}
              <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                    <Scale className="w-4 h-4 text-[#005EB8] dark:text-cyan-400 shrink-0" />
                    <span>Analytical Appraisal · Structural Parity vs. Legal Divergence</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Does SATRE Map Cleanly to the European Health Data Space (EHDS)?
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Partially—at the technical and security-control layer, correspondence is close; at the statutory and institutional layer, it is not a one-to-one mapping.</strong> Treating {renderGlossaryBadges('SATRE', 'appraisal-satre')} conformance as equivalent to {renderGlossaryBadges('EHDS', 'appraisal-ehds')} statutory compliance overlooks three material legal and operational differences:
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm items-stretch">
                  <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 h-full">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                      Where Architecture &amp; Controls Converge
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-4">
                      <li>
                        <strong>Secure Processing Environments (Article 50):</strong> Remote zero-download computation, strict network isolation, Multi-Factor Authentication (MFA), and session logging correspond closely to SATRE Pillar 2.
                      </li>
                      <li>
                        <strong>Output Controls (Article 50(1)(c)):</strong> Restricting exports to anonymised or aggregated outputs aligns directly with SATRE Pillar 3 and UK Statistical Disclosure Control (SDC) conventions.
                      </li>
                      <li>
                        <strong>Federated Interoperability (Article 75):</strong> SATRE 2.0 Pillar 5 (Federation), distributed non-disclosive analysis (DataSHIELD), and portable provenance manifests ({renderGlossaryBadges('RO-Crate', 'appraisal-rocrate')}, {renderGlossaryBadges('W3C PROV-O', 'appraisal-provo')}) support cross-border technical exchange.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 h-full">
                    <div className="font-semibold text-[#005EB8] dark:text-cyan-300">
                      Where Domestic Law &amp; Institutions Diverge
                    </div>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-4">
                      <li>
                        <strong>Voluntary Standard vs. Compulsory Statute:</strong> SATRE is a non-statutory technical specification; EHDS is binding EU law establishing public <strong>Health Data Access Bodies (HDABs)</strong> empowered to compel data holders to supply records under fixed time limits.
                      </li>
                      <li>
                        <strong>Lawful Basis &amp; Opt-Out Regimes:</strong> EHDS creates harmonised Data Permits (Articles 46–49) and an EU secondary-use opt-out (Article 71). UK NHS Trusts remain governed by <strong>UK GDPR</strong> Articles 6 and 9, the <strong>Common Law Duty of Confidentiality</strong>, <strong>NHS Act 2006 Section 251</strong> (advised by the Confidentiality Advisory Group), and the <strong>NHS National Data Opt-Out</strong>.
                      </li>
                      <li>
                        <strong>Post-Brexit Jurisdiction &amp; Metadata Profiles:</strong> As a third country, the UK has no automatic statutory role on <strong>HealthData@EU</strong>; cross-border collaboration relies on international transfer adequacy rules and mapping UK metadata catalogues (HDR UK Gateway) to European <strong>HealthDCAT-AP</strong> specifications.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Side-by-Side Mapping Table (Statutory Boundary BEFORE Wavebound Technical Control) */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4 w-52">EHDS Mandate (Reg. (EU) 2025/327)</th>
                      <th className="py-3 px-4 w-44">SATRE 2.0 Pillar</th>
                      <th className="py-3 px-4 w-80">UK vs. EU Statutory Boundary</th>
                      <th className="py-3 px-4">Wavebound Policy-as-Code &amp; Technical Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredEhdsRows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition-colors align-top"
                      >
                        <td className="py-3.5 px-4 space-y-1">
                          <div className="font-mono text-xs font-semibold text-[#005EB8] dark:text-cyan-300 tabular-nums">
                            {row.ehdsArticle}
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {renderGlossaryBadges(row.ehdsMandate, `${row.id}-mandate`)}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                          {row.satrePillar}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                          {renderGlossaryBadges(row.ukBoundaryNote, `${row.id}-boundary`)}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200 leading-relaxed">
                          {renderGlossaryBadges(row.waveboundControl, `${row.id}-control`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Elaborated Interactive 2025-2031 Phased EHDS Implementation Timeline */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-[#005EB8] dark:text-cyan-400 shrink-0" />
                      <span>Phased EHDS Secondary-Use Implementation Timeline (2025–2031)</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Select a legislative milestone year to inspect EU Implementing Act deliverables and practical operational consequences for UK SDEs, data custodians, and clinical research teams.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg w-fit shrink-0">
                    {EHDS_TIMELINE_MILESTONES.map((m) => {
                      const active = m.year === activeMilestone.year;
                      return (
                        <button
                          key={m.year}
                          type="button"
                          onClick={() => setSelectedEhdsYear(m.year)}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold tabular-nums whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            active
                              ? 'bg-white dark:bg-[#00A389] text-slate-900 dark:text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {m.year}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950/75 border border-slate-200 dark:border-slate-800 space-y-4 text-sm">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3 space-y-1">
                    <span className="font-mono text-xs font-semibold text-[#005EB8] dark:text-cyan-300 tabular-nums">
                      {activeMilestone.dateLabel}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {activeMilestone.phaseTitle}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    <div className="space-y-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 h-full">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        1. European Union Statutory Milestone &amp; Implementing Scope
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {renderGlossaryBadges(activeMilestone.legalDeliverables, `${activeMilestone.year}-legal`)}
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 h-full">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        2. Wavebound &amp; SATRE 2.0 Governance Significance
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {renderGlossaryBadges(activeMilestone.sdeImpact, `${activeMilestone.year}-sde`)}
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 h-full">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        3. Operational Impact on Data Custodians &amp; TRE/SDE Operators
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {renderGlossaryBadges(activeMilestone.custodianImpact, `${activeMilestone.year}-cust`)}
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 h-full">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        4. Impact on Researchers &amp; Multi-Centre Clinical Collaborations
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {renderGlossaryBadges(activeMilestone.researcherImpact, `${activeMilestone.year}-res`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* UNIFIED GATEWAY TO FURTHER RESOURCES & OFFICIAL STANDARDS */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white shadow-lg">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Further Resources &amp; Official Standards Compendium</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Want the Full Set of Primary Laws, Papers &amp; Specifications?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Rather than scattering separate reading lists, all authoritative UKRI, DARE UK, SATRE, HRA, ONS, Statbarn, DataSHIELD, RO-Crate, EHDS, W3C, and CNCF sources live together in our searchable Further Resources Library.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onNavigateToResources && (
            <button
              onClick={onNavigateToResources}
              className="px-5 py-3 rounded-xl bg-[#00A389] hover:bg-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>Browse Further Resources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {onNavigateToPlaybook && (
            <button
              onClick={() => onNavigateToPlaybook('sec-front-matter')}
              className="px-4 py-3 rounded-xl bg-[#07192f] hover:bg-[#123154] text-cyan-200 border border-cyan-500/40 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Open PaC Playbook</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Rollover Tooltip Card for EHDS, SATRE & Glossary Entries */}
      {activeTooltipTerm && (
        <div className="fixed bottom-6 right-6 max-w-md bg-white dark:bg-slate-900/95 backdrop-blur border border-slate-200 dark:border-cyan-500/40 rounded-xl p-5 shadow-2xl z-50 space-y-2.5 text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#005EB8] dark:text-cyan-400">
              {activeTooltipTerm.category}
            </span>
            <button
              type="button"
              onClick={() => setActiveTooltipTerm(null)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Close definition tooltip"
            >
              ✕
            </button>
          </div>
          <h4 className="text-base font-bold flex items-center gap-2">
            <span>{activeTooltipTerm.term}</span>
            {activeTooltipTerm.acronym && (
              <span className="text-xs font-mono text-[#005EB8] dark:text-cyan-300 bg-sky-50 dark:bg-cyan-950 px-2 py-0.5 rounded border border-sky-200 dark:border-cyan-800/50">
                {activeTooltipTerm.acronym}
              </span>
            )}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeTooltipTerm.shortDefinition}
          </p>
          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">{activeTooltipTerm.playbookSection}</span>
            <button
              type="button"
              onClick={() => {
                const id = activeTooltipTerm.id;
                setActiveTooltipTerm(null);
                onNavigateToGlossaryTerm(id);
              }}
              className="text-[#005EB8] dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View in Glossary</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
