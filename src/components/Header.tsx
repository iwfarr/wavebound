import React, { useState } from 'react';
import { useUserProgress } from '../context/ProgressContext';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { PLAYBOOK_MODULES } from '../data/playbookContent';
import { SeawaterLogo } from './SeawaterLogo';
import {
  Shield,
  BookOpen,
  Layers,
  Cpu,
  HelpCircle,
  TrendingUp,
  Search,
  HeartHandshake,
  Menu,
  X,
  FileText,
  Bookmark,
  ExternalLink,
  Bot,
  Workflow
} from 'lucide-react';

export type ActiveTab =
  | 'playbook'
  | 'concepts'
  | 'implementation-track'
  | 'graph'
  | 'sandbox'
  | 'llm-security'
  | 'quiz'
  | 'glossary'
  | 'resources'
  | 'progress'
  | 'governance-atlas';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onNavigateToGlossaryTerm,
  onNavigateToSection
}) => {
  const { stats } = useUserProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Global search across terms, modules, and sections
  const searchResults = React.useMemo(() => {
    if (!globalSearch.trim()) return [];
    const q = globalSearch.toLowerCase();

    const terms = GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        (t.acronym && t.acronym.toLowerCase().includes(q)) ||
        t.shortDefinition.toLowerCase().includes(q)
    ).map((t) => ({ type: 'glossary' as const, id: t.id, title: t.term, desc: t.shortDefinition, section: t.playbookSection }));

    const modules = PLAYBOOK_MODULES.filter(
      (m) => m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q)
    ).map((m) => ({ type: 'module' as const, id: m.id, title: m.title, desc: m.shortDesc, section: m.playbookSection }));

    return [...terms.slice(0, 4), ...modules.slice(0, 3)];
  }, [globalSearch]);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'playbook', label: 'Playbook & Search', icon: <FileText className="w-4 h-4" /> },
    { id: 'concepts', label: 'Key Concepts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'implementation-track', label: 'Implementation & Rollout', icon: <Workflow className="w-4 h-4" /> },
    { id: 'graph', label: 'Cytoscape Graph', icon: <Layers className="w-4 h-4" /> },
    { id: 'sandbox', label: 'Policy Sandbox', icon: <Cpu className="w-4 h-4" /> },
    { id: 'llm-security', label: 'LLM & Enclave Security', icon: <Bot className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quizzes & AI Drill', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'glossary', label: 'Glossary', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'resources', label: 'Further Resources', icon: <ExternalLink className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress & Stats', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const isAtlasMode = activeTab === 'governance-atlas';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('playbook')}
              className="flex items-center text-left group transition-transform active:scale-95"
              title="Project Seawater · Policy-as-Code Engine"
            >
              <SeawaterLogo variant="horizontal" size="md" />
            </button>
          </div>

          {/* Quick Global Search Bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick search terms, SHACL, Rego..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            {/* Quick Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                {searchResults.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onMouseDown={() => {
                      if (item.type === 'glossary') {
                        onNavigateToGlossaryTerm(item.id);
                      } else {
                        onSelectTab('concepts');
                      }
                      setGlobalSearch('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs space-y-0.5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-100">{item.title}</span>
                      <span className="text-[10px] uppercase font-mono text-cyan-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Switcher Button: Public Atlas vs Technical Atlas */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-sm">
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isAtlasMode
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
                title="Switch to Public Governance Atlas (Citizen & Board View)"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Public Atlas</span>
              </button>
              <button
                onClick={() => onSelectTab('playbook')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  !isAtlasMode
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
                title="Switch to Technical Atlas (Engineers & Researchers View)"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Technical Atlas</span>
              </button>
            </div>

            {/* Quick Mastery Badge */}
            <button
              onClick={() => onSelectTab('progress')}
              className="bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:bg-slate-850 transition-colors hidden sm:flex items-center gap-1"
              title="Overall Mastery Progress"
            >
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{stats.overallProgressPercentage}%</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Desktop Navigation Row */}
        {!isAtlasMode && (
          <nav className="hidden md:flex items-center space-x-1 py-1.5 overflow-x-auto border-t border-slate-900">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
              <button
                onClick={() => {
                  onSelectTab('governance-atlas');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isAtlasMode ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Public Atlas</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('playbook');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  !isAtlasMode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Technical Atlas</span>
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
