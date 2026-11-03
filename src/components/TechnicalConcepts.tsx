import React, { useState, useEffect } from 'react';
import { PLAYBOOK_MODULES, ConceptModule, SATRE_PILLARS, EXTERNAL_RESOURCES, SatrePillarDetail } from '../data/playbookContent';
import { CALDICOTT_PRINCIPLES, CaldicottPrincipleDetail } from '../data/caldicottData';
import { DATA_CATALOGUE_ASSETS, DataCatalogueAsset } from '../data/dataCatalogueData';
import { AGENTIC_GOVERNANCE_DATA, SafePersonComparison, FiveSafesAssetMapping, StanfordRiskTier } from '../data/agenticGovernanceData';
import { useUserProgress } from '../context/ProgressContext';
import { SeawaterLogo } from './SeawaterLogo';
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
  Check
} from 'lucide-react';

interface TechnicalConceptsProps {
  initialModuleId?: string | null;
  onNavigateToQuiz: (category?: string) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToImplementationTrack?: () => void;
}

type ConceptViewTab = 'architecture' | 'agentic-ai' | 'caldicott' | 'catalogue' | 'satre';

export const TechnicalConcepts: React.FC<TechnicalConceptsProps> = ({
  initialModuleId,
  onNavigateToQuiz,
  onNavigateToGlossaryTerm,
  onNavigateToImplementationTrack
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

  // State for SATRE Pillars
  const [selectedSatrePillar, setSelectedSatrePillar] = useState<SatrePillarDetail>(SATRE_PILLARS[0]);

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
      case 'Computing Infrastructure':
        return <Server className="w-5 h-5 text-purple-400" />;
      case 'Data Management':
        return <Database className="w-5 h-5 text-emerald-400" />;
      default:
        return <Workflow className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredAssets = DATA_CATALOGUE_ASSETS.filter((asset) => {
    if (catalogueTierFilter === 'All') return true;
    return asset.sensitivityTier.includes(catalogueTierFilter);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header & Track Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <SeawaterLogo variant="badge" size="xs" className="mb-0.5" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technical Concepts &amp; Governance Specifications
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Deep dives into core architectural pillars, the 8 disaggregated Caldicott Principles, data catalogue asset metadata constraints, and the SATRE standard.
            </p>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
            <span>Modules Mastered:</span>
            <strong className="text-cyan-300 font-mono text-sm">
              {completedModules.length} / {PLAYBOOK_MODULES.length}
            </strong>
          </div>
        </div>

        {/* 5 Major Knowledge Hub Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveView('architecture')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
              activeView === 'architecture'
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">Architecture Modules</div>
              <div className="text-[10px] text-slate-400">6 Core Engines</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('agentic-ai')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
              activeView === 'agentic-ai'
                ? 'bg-sky-500/15 border-sky-400 text-sky-200 font-bold shadow-sm ring-1 ring-sky-500/40'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">AI &amp; Five Safes</div>
              <div className="text-[10px] text-slate-400">Stanford UIT Framework</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('caldicott')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
              activeView === 'caldicott'
                ? 'bg-purple-500/10 border-purple-500 text-purple-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Scale className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">8 Caldicott Principles</div>
              <div className="text-[10px] text-slate-400">Statutory &amp; PaC Detail</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('catalogue')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
              activeView === 'catalogue'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">Data Catalogue Assets</div>
              <div className="text-[10px] text-slate-400">Metadata Constraints</div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('satre')}
            className={`p-3 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
              activeView === 'satre'
                ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold shadow-sm'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">SATRE Specification</div>
              <div className="text-[10px] text-slate-400">5 Interoperable Pillars</div>
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

          {/* Selected Module Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-cyan-400 uppercase tracking-wider">
                    {activeModule.category}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="font-mono text-slate-400">{activeModule.playbookSection}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeModule.title}
                </h2>
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

            {/* Plain-English Overview */}
            <div className="bg-gradient-to-r from-cyan-950/40 to-slate-950 p-5 rounded-xl border border-cyan-800/40 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plain-English Governance Perspective</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModule.plainEnglishSummary}
              </p>
            </div>

            {/* Core Principles */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Core Principles &amp; Governance Rules</span>
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

            {/* Technical Specification & Code Snippets */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Technical Specification &amp; Code Implementation</span>
              </h3>

              <div className="space-y-4">
                {activeModule.technicalDetails.map((detail, idx) => (
                  <div key={idx} className="space-y-2 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
                    <h4 className="text-sm font-semibold text-slate-200">{detail.heading}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{detail.body}</p>

                    {detail.codeSnippet && (
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="font-semibold text-slate-400">{detail.codeSnippet.title}</span>
                          <span className="uppercase">{detail.codeSnippet.language}</span>
                        </div>
                        <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800/90 leading-relaxed">
                          <code>{detail.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <button
                onClick={() => onNavigateToQuiz(activeModule.category)}
                className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/60 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Test Knowledge on {activeModule.category}</span>
              </button>

              {onNavigateToImplementationTrack && (
                <button
                  onClick={onNavigateToImplementationTrack}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span>Implementation Track</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: AGENTIC AI & DATA ASSETS IN FIVE SAFES (STANFORD UIT FRAMEWORK) */}
      {activeView === 'agentic-ai' && (
        <div className="space-y-8">
          {/* Header & Core Dilemma Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-800 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Stanford UIT &amp; Five Safes Governance Specification</span>
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  DEA 2017 &amp; Caldicott P8 Aligned
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Personhood vs. Data Asset Classification in Secure Enclaves
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Resolving the statutory and architectural status of artificial intelligence within Trusted Research Environments (TREs), Secure Data Environments (SDEs), and population health intelligence platforms.
              </p>
            </div>

            {/* Authoritative Ruling Banner */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-sky-900/50 space-y-3 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Authoritative Legal &amp; Architectural Resolution</span>
              </div>
              <div className="text-sm font-semibold text-white leading-relaxed">
                {AGENTIC_GOVERNANCE_DATA.governanceDilemma.shortResolution}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {AGENTIC_GOVERNANCE_DATA.governanceDilemma.fullResolution}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
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
                  <ExternalLink className="w-3 h-3" />
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
              <p className="text-xs text-slate-400">
                Compare statutory standing, identity revocation, ethical bounds, and blast radius constraints between humans and autonomous systems.
              </p>
            </div>

            {/* Dimension Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AGENTIC_GOVERNANCE_DATA.safePersonComparison.map((comp) => {
                const isSelected = comp.dimension === selectedComparisonDimension;
                return (
                  <button
                    key={comp.dimension}
                    onClick={() => setSelectedComparisonDimension(comp.dimension)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold ${
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1: Accredited Human Researcher (Safe Person) */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-emerald-900/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                          <UserCheck className="w-4 h-4" />
                          <span>Safe Person (Accredited Human)</span>
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                          {activeComp.accreditedHuman.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {activeComp.accreditedHuman.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeComp.accreditedHuman.description}
                      </p>
                      <div className="text-[11px] font-mono text-emerald-400/90 pt-1">
                        Legal Basis: {activeComp.accreditedHuman.legalBasis}
                      </div>
                    </div>

                    {/* Column 2: Agentic AI (Non-Person Machine Workload) */}
                    <div className="p-5 rounded-xl bg-slate-900 border border-sky-900/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase">
                          <UserX className="w-4 h-4 text-amber-400" />
                          <span>AI Agent (Delegated Workload)</span>
                        </span>
                        <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800 font-bold">
                          {activeComp.agenticAI.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        {activeComp.agenticAI.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeComp.agenticAI.description}
                      </p>
                      <div className="text-[11px] font-mono text-sky-400/90 pt-1">
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
                      <p className="text-xs text-slate-300 leading-relaxed">
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
              <p className="text-xs text-slate-400">
                Understanding how raw population cohorts, model checkpoints, inference execution, and airlocks map to each dimension.
              </p>
            </div>

            {/* Five Safes Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {AGENTIC_GOVERNANCE_DATA.fiveSafesMapping.map((fs) => {
                const isSelected = fs.pillar === selectedAiPillar;
                return (
                  <button
                    key={fs.pillar}
                    onClick={() => setSelectedAiPillar(fs.pillar)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-400 text-white shadow-sm ring-1 ring-purple-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{fs.pillar}</div>
                    <div className="text-[10px] text-slate-400 truncate">{fs.subtitle}</div>
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
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                        {activeFs.pillar}
                      </span>
                      <h4 className="text-lg font-bold text-white">{activeFs.subtitle}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span>Data Assets (Cohorts &amp; Registries)</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeFs.whereDataAssetsSit}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Bot className="w-4 h-4 text-sky-400" />
                        <span>AI Agents &amp; Neural Model Weights</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeFs.whereAIModelsAndAgentsSit}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Constraints & Enforcement */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Metadata-Driven Constraints &amp; Architectural Bounds:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeFs.metadataConstraints.map((constraint, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-mono text-[11px]">{constraint}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
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
              <p className="text-xs text-slate-400">
                Four mandatory controls from the Stanford UIT security framework directly implemented inside the Seawater Policy-as-Code compiler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGENTIC_GOVERNANCE_DATA.stanfordFrameworkPrinciples.map((principle, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="font-bold text-white text-sm">{principle.title}</h4>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-200/90 italic leading-relaxed">
                      {principle.stanfordRequirement}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {principle.treImplementation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                    <span className="text-slate-500">PaC Pattern:</span>
                    <span className="truncate max-w-[280px]">{principle.policyAsCodePattern}</span>
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
              <p className="text-xs text-slate-400">
                Evaluating autonomous agent pipelines against target data sensitivity, blast radius, human oversight, and instantaneous revocability.
              </p>
            </div>

            {/* Risk Tier Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-sky-400 text-white shadow-sm ring-1 ring-sky-500/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold uppercase ${badgeColor}`}>
                        {tier.id.replace('-', ' ')}
                      </span>
                      {tier.permittedInTRE ? (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-800/70">
                          Permitted
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-400 bg-rose-950/70 px-1.5 py-0.2 rounded border border-rose-800/70">
                          Prohibited
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-white truncate">{tier.name}</div>
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
                        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                          {activeTier.stanfordSectionRef}
                        </span>
                        <h4 className="text-lg font-bold text-white">{activeTier.name}</h4>
                      </div>
                      <div className="text-xs text-slate-400">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Target Data Sensitivity
                      </div>
                      <div className="text-xs text-slate-200 leading-relaxed font-semibold">
                        {activeTier.targetDataSensitivity}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Blast Radius &amp; Execution Bounds
                      </div>
                      <div className="text-xs text-slate-200 leading-relaxed">
                        {activeTier.blastRadius}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Human Oversight Requirement
                      </div>
                      <div className="text-xs text-amber-200 leading-relaxed font-medium">
                        {activeTier.humanOversightRequirement}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Workload Identity &amp; Token Ephemerality
                      </div>
                      <div className="text-xs text-sky-200 leading-relaxed font-mono text-[11px]">
                        {activeTier.identityAndCredentialRules}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Automated Policy-as-Code Controls Enforced:
                    </div>
                    <div className="space-y-1.5">
                      {activeTier.pacControls.map((ctrl, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
              <p className="text-xs text-slate-400">
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                {copiedAiCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAiCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Block Container */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-200">
                  {AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].explanation}
                </p>
                <pre className="p-4 rounded-lg bg-slate-900 text-sky-200 font-mono text-xs border border-slate-800 overflow-x-auto leading-relaxed mt-2">
                  <code>{AGENTIC_GOVERNANCE_DATA.pacExamples[selectedPacExampleIdx].code}</code>
                </pre>
              </div>
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
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Disaggregating each Caldicott principle into its official statutory mandate, practical application in population health and epidemiological research, and exact machine-executable Policy-as-Code enforcement mechanism.
            </p>
          </div>

          {/* 8 Principles Button Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {CALDICOTT_PRINCIPLES.map((cp) => {
              const isSelected = cp.number === selectedPrincipleNum;
              return (
                <button
                  key={cp.number}
                  onClick={() => setSelectedPrincipleNum(cp.number)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-md ring-1 ring-purple-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    isSelected ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-purple-400'
                  }`}>
                    {cp.number}
                  </span>
                  <span className="text-[11px] font-semibold line-clamp-1 leading-tight">
                    {cp.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Caldicott Principle Deep Detail Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded border border-purple-800">
                    Principle {selectedPrinciple.number} of 8
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {selectedPrinciple.decisionGate}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedPrinciple.title}
                </h3>
                <p className="text-purple-200/90 text-sm font-medium italic">
                  "{selectedPrinciple.tagline}"
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right shrink-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Accountable Role</div>
                <div className="text-xs font-bold text-purple-300">{selectedPrinciple.accountableRole}</div>
              </div>
            </div>

            {/* Official Definition vs Population Research Reality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  <span>Official Statutory Definition (National Data Guardian)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedPrinciple.officialDefinition}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-900/40 space-y-2">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Population Data &amp; Epidemiology Application</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
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
              <p className="text-xs text-slate-300 leading-relaxed">
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
                  <span className="font-mono text-[10px] text-slate-500">ontology/shapes/</span>
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
                  <span className="font-mono text-[10px] text-slate-500">security/opa/caldicott.rego</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 text-cyan-200 font-mono text-xs border border-cyan-950/80 overflow-x-auto leading-relaxed">
                  <code>{selectedPrinciple.opaRegoPolicy}</code>
                </pre>
              </div>
            </div>

            {/* Audit Evidence Footer */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Required Audit Evidence: <strong className="text-slate-200">{selectedPrinciple.auditEvidence}</strong></span>
              </div>
              <button
                onClick={() => onNavigateToGlossaryTerm('caldicott')}
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 text-xs shrink-0"
              >
                <span>View Caldicott in Glossary</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
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
              Data Catalogue Assets: Governance Metadata &amp; Dependent Constraints
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              In population data research and trusted enclaves, datasets are not generic files. Each asset in the Data Catalogue possesses specific metadata constraints, including primary cell suppression thresholds (k &gt;= 10 or k &gt;= 5), dominance limits, role-based access tiers, and SHACL validation shapes.
            </p>
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
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                {tier === 'All' ? 'All Sensitivity Tiers' : `${tier} Datasets`}
              </button>
            ))}
          </div>

          {/* Asset Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className={`p-4 rounded-2xl border text-left transition-all space-y-3 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {asset.acronym}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tierColor}`}>
                        {asset.sensitivityTier.split(':')[0]}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm line-clamp-2 leading-snug">
                      {asset.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {asset.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-mono font-semibold">
                      k &gt;= {asset.minCellSize} suppression
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      {asset.refreshCadence.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Asset Detailed Metadata Inspection View */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Asset Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    {selectedAsset.acronym}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    {selectedAsset.domain}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400 font-medium">
                    Custodian: {selectedAsset.dataCustodian}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {selectedAsset.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedAsset.summary}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right shrink-0 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Sensitivity Tier</div>
                <div className="text-xs font-bold text-emerald-300 font-mono">{selectedAsset.sensitivityTier}</div>
                <div className="text-[11px] text-slate-400">{selectedAsset.refreshCadence}</div>
              </div>
            </div>

            {/* Asset-Dependent Suppression Constraints */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Asset-Dependent Statistical Disclosure Control (SDC) Constraints</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[11px]">Primary Suppression:</div>
                  <div className="font-bold text-slate-200">{selectedAsset.suppressionThreshold}</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[11px]">Dominance Rule:</div>
                  <div className="font-bold text-slate-200">{selectedAsset.dominanceRule}</div>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[11px]">Secondary Complementary Masking:</div>
                  <div className="font-bold text-slate-200">
                    {selectedAsset.secondaryMaskingRequired ? 'Mandatory for tabular totals' : 'Not required for this tier'}
                  </div>
                </div>
              </div>
            </div>

            {/* Access, Role & Accreditation Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Permitted Roles &amp; Accreditation Requirements</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Permitted Analytical Roles:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedAsset.permittedRoles.map((role, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800/60">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] pt-1">Statutory Accreditation:</span>
                    <strong className="text-slate-200 block">{selectedAsset.accreditationRequired}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] pt-1">Approval Bodies:</span>
                    <span className="text-slate-300">{selectedAsset.approvalBodies.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <span>De-Identification &amp; Resolution Boundaries</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Pseudonymization Method:</span>
                    <p className="text-slate-200 text-[11px]">{selectedAsset.pseudonymizationMethod}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Geographic Level:</span>
                      <span className="text-slate-200 font-mono text-[11px]">{selectedAsset.geographicGranularity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Temporal Granularity:</span>
                      <span className="text-slate-200 font-mono text-[11px]">{selectedAsset.temporalGranularity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Constraints */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Operational &amp; Compute Isolation Rules:
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {selectedAsset.operationalConstraints.map((constraint, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{constraint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machine-Readable Ontological Mappings */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[11px]">W3C SHACL Shape Target:</span>
                <div className="font-mono text-cyan-300 font-bold">{selectedAsset.shaclShapeTarget}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[11px]">OPA Authorization Rule:</span>
                <div className="font-mono text-purple-300 font-bold">{selectedAsset.opaPolicyRule}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[11px]">Sample Schema Columns:</span>
                <div className="font-mono text-slate-300 text-[10px]">{selectedAsset.sampleAttributes.slice(0, 3).join(', ')}...</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SATRE SPECIFICATION */}
      {activeView === 'satre' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Standard Architecture for Trusted Research Environments</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The SATRE Specification (5 Pillars of Trusted Enclaves)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              An open, interoperable UK standard authored by DARE UK, HDR UK, and academic consortia structuring safe, compliant data platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SATRE_PILLARS.map((pillar) => {
              const isSelected = pillar.id === selectedSatrePillar.id;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedSatrePillar(pillar)}
                  className={`p-5 rounded-2xl border text-left transition-all space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
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
                Mandatory SATRE Evaluation Statements &amp; Technical Requirements:
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
      )}

      {/* AUTHORITATIVE EXTERNAL LINKS & STANDARDS DIRECTORY */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ExternalLink className="w-4 h-4" />
            <span>Authoritative Technical &amp; Statutory Standards</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Official Documentation &amp; External Specifications
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
