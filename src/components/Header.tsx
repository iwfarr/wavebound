import React, { useState, useRef } from 'react';
import { useUserProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
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
  Workflow,
  Scale,
  Code2,
  MessageSquarePlus,
  Sun,
  Terminal,
  FileCheck2,
  ChevronDown,
  Moon
} from 'lucide-react';

export type ActiveTab =
  | 'gateway'
  | 'govern-assure'
  | 'build-deploy'
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
  onOpenFeedback?: () => void;
}

interface NavGroupItem {
  id: ActiveTab;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onNavigateToGlossaryTerm,
  onNavigateToSection,
  onOpenFeedback
}) => {
  const { stats } = useUserProgress();
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (groupId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(groupId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

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

  // Group 1: Govern & Assure (Decisions, Evaluation & Assurance)
  const governAssureGroup: NavGroupItem[] = [
    {
      id: 'govern-assure',
      label: 'Governance Assurance Workspace',
      desc: 'Statutory evaluator, SDC airlock, Caldicott 8 & SATRE/DSPT procurement matrix',
      icon: <Scale className="w-4 h-4 text-amber-400" />
    },
    {
      id: 'sandbox',
      label: 'Policy Decision Sandbox',
      desc: 'Interactive OPA Rego decision testing against mock research requests',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'concepts',
      label: 'Governance Concepts & Caldicott',
      desc: 'Deep dives on Caldicott Principles 1–8, Five Safes & SATRE',
      icon: <BookOpen className="w-4 h-4 text-amber-300" />
    },
    {
      id: 'governance-atlas',
      label: 'IG Quick Guide & Handbook',
      desc: 'Plain-language guide for non-technical leads & PPIE panels',
      icon: <HeartHandshake className="w-4 h-4 text-emerald-300" />
    }
  ];

  // Group 2: Architecture & Manifests (Code, Topology & Deployment)
  const architectureCodeGroup: NavGroupItem[] = [
    {
      id: 'playbook',
      label: 'Technical Playbook',
      desc: 'End-to-end technical specifications & policy-as-code patterns',
      icon: <FileText className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'graph',
      label: 'Semantic Topology Graph',
      desc: 'Curated 4-lens SHACL/RDF knowledge graph & live policy simulator',
      icon: <Layers className="w-4 h-4 text-teal-400" />
    },
    {
      id: 'build-deploy',
      label: 'Build & Deploy Workstation',
      desc: 'Least-privilege deployment manifests, enclave container configs & package mirrors',
      icon: <Code2 className="w-4 h-4 text-sky-300" />
    },
    {
      id: 'implementation-track',
      label: 'Rollout Schedule & Decisions',
      desc: '16-week sprint schedule, rollout stages & architectural decision register',
      icon: <Workflow className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'llm-security',
      label: 'Enclave Security & Defense',
      desc: 'Confidential compute, zero-egress enclaves & model protection',
      icon: <Bot className="w-4 h-4 text-cyan-300" />
    }
  ];

  // Group 3: Standards & Evidence
  const standardsEvidenceGroup: NavGroupItem[] = [
    {
      id: 'glossary',
      label: 'Statutory & Technical Glossary',
      desc: 'Searchable dictionary and interactive concept graph of all IG terms',
      icon: <Bookmark className="w-4 h-4 text-slate-300" />
    },
    {
      id: 'resources',
      label: 'Official Standards & Procurement',
      desc: 'SATRE v1.1, DSPT, ISO 42001, DCB0129, SDC guide & vendor procurement matrix',
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />
    }
  ];

  const isGovernAssureActive = governAssureGroup.some((item) => item.id === activeTab);
  const isArchitectureCodeActive = architectureCodeGroup.some((item) => item.id === activeTab);
  const isStandardsEvidenceActive = standardsEvidenceGroup.some((item) => item.id === activeTab);

  const isAtlasMode = activeTab === 'governance-atlas';

  return (
    <header className="sticky top-0 z-40 bg-[#0c2340] dark:bg-[#071628] border-b border-[#1b3f68] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Platform Wordmark - crisp on Navy */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('gateway')}
              className="flex items-center text-left group transition-opacity hover:opacity-95 cursor-pointer"
              title="Project Seawater · Policy-as-Code Baseline"
            >
              <SeawaterLogo variant="horizontal" size="md" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Caldicott, Section 251, SDC, Rego..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-[#07192f] border border-[#1b3f68] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#0a223f] transition-colors"
            />

            {/* Quick Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1">
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
                    className="w-full text-left p-2 rounded-lg hover:bg-[#123154] text-xs space-y-0.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{item.title}</span>
                      <span className="text-[10px] uppercase font-mono text-cyan-400">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Switcher & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Persona Switcher: IG Handbook vs Data Technical (Hidden on mobile; prominent in mobile drawer) */}
            <div className="hidden sm:flex items-center gap-1 bg-[#07192f] p-1 rounded-lg border border-[#1b3f68]">
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isAtlasMode
                    ? 'bg-[#00A389] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="IG Handbook: Plain-language guidance for Caldicott Guardians, IG Leads & Ethics Reviewers"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>IG Handbook</span>
              </button>
              <button
                onClick={() => onSelectTab('playbook')}
                className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  !isAtlasMode
                    ? 'bg-[#005EB8] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Runtime: Policy-as-code architecture, OPA Rego rules & deployment manifests"
              >
                <Shield className="w-3.5 h-3.5 text-sky-300" />
                <span>Runtime</span>
              </button>
            </div>

            {/* Light / Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="bg-[#07192f] border border-[#1b3f68] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-[#123154] transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden xl:inline text-[11px]">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xl:inline text-[11px]">Light Mode</span>
                </>
              )}
            </button>

            {/* Quick Progress Tracker */}
            <button
              onClick={() => onSelectTab('progress')}
              className="bg-[#07192f] border border-[#1b3f68] px-2.5 py-1.5 rounded-lg text-xs font-mono text-emerald-300 hover:bg-[#123154] transition-colors hidden lg:flex items-center gap-1.5 cursor-pointer"
              title="Overall Governance Progress Tracker"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">{stats.overallProgressPercentage}%</span>
            </button>

            {/* GitHub Repository */}
            <a
              href="https://github.com/iwfarr/seawater-playbook"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#07192f] border border-[#1b3f68] p-2 rounded-lg text-slate-300 hover:text-white transition-colors hidden sm:flex items-center gap-1.5 text-xs shadow-xs"
              title="View Source on GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* Raise Issue / Feedback (Desktop & Tablet only; prominent in mobile drawer) */}
            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="hidden sm:flex bg-amber-500/20 border border-amber-500/50 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition-colors items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                title="Submit Information Governance Feedback or Raise an Issue"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Raise Issue</span>
              </button>
            )}

            {/* Mobile Menu Button - stays pinned on screen */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#07192f] border border-[#1b3f68] text-slate-200 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>
        </div>

        {/* Condensed Floatover Desktop Navigation Row */}
        {!isAtlasMode && (
          <nav className="hidden md:flex items-center space-x-1 py-1.5 border-t border-[#18375b] relative">
            {/* 1. Executive Overview */}
            <button
              onClick={() => onSelectTab('gateway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'gateway'
                  ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Overview</span>
            </button>

            {/* 2. Govern & Assure (Floatover Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('govern-assure')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  onSelectTab('govern-assure');
                  setOpenDropdown(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  isGovernAssureActive
                    ? 'bg-[#133760] text-amber-300 font-bold border-b-2 border-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Govern &amp; Assure</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'govern-assure' && (
                <div
                  className="absolute top-full left-0 mt-1 w-80 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                  onMouseEnter={() => handleMouseEnter('govern-assure')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider border-b border-[#1b3f68]">
                    Governance Decisions &amp; Assurance
                  </div>
                  {governAssureGroup.map((subItem) => {
                    const isSubActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onSelectTab(subItem.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer flex items-start gap-2.5 ${
                          isSubActive
                            ? 'bg-[#153f6d] text-white font-semibold'
                            : 'hover:bg-[#123154] text-slate-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">{subItem.icon}</div>
                        <div>
                          <div className="text-xs font-semibold leading-tight text-white">
                            {subItem.label}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
                            {subItem.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Architecture & Code (Floatover Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('architecture-code')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  onSelectTab('playbook');
                  setOpenDropdown(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  isArchitectureCodeActive
                    ? 'bg-[#133760] text-sky-300 font-bold border-b-2 border-sky-400'
                    : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Architecture &amp; Code</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'architecture-code' && (
                <div
                  className="absolute top-full left-0 mt-1 w-84 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                  onMouseEnter={() => handleMouseEnter('architecture-code')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold text-sky-400 uppercase tracking-wider border-b border-[#1b3f68]">
                    Technical Architecture, Manifests &amp; Ontologies
                  </div>
                  {architectureCodeGroup.map((subItem) => {
                    const isSubActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onSelectTab(subItem.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer flex items-start gap-2.5 ${
                          isSubActive
                            ? 'bg-[#153f6d] text-white font-semibold'
                            : 'hover:bg-[#123154] text-slate-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">{subItem.icon}</div>
                        <div>
                          <div className="text-xs font-semibold leading-tight text-white">
                            {subItem.label}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
                            {subItem.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Standards & Evidence (Floatover Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('standards-evidence')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  onSelectTab('glossary');
                  setOpenDropdown(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  isStandardsEvidenceActive
                    ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-slate-300" />
                <span>Evidence &amp; Standards</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'standards-evidence' && (
                <div
                  className="absolute top-full left-0 mt-1 w-80 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                  onMouseEnter={() => handleMouseEnter('standards-evidence')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider border-b border-[#1b3f68]">
                    Terminology, ISO Standards &amp; SDC
                  </div>
                  {standardsEvidenceGroup.map((subItem) => {
                    const isSubActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onSelectTab(subItem.id);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer flex items-start gap-2.5 ${
                          isSubActive
                            ? 'bg-[#153f6d] text-white font-semibold'
                            : 'hover:bg-[#123154] text-slate-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">{subItem.icon}</div>
                        <div>
                          <div className="text-xs font-semibold leading-tight text-white">
                            {subItem.label}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
                            {subItem.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Knowledge Quiz */}
            <button
              onClick={() => onSelectTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Assurance Quizzes</span>
            </button>

            {/* 6. Progress Tracker */}
            <button
              onClick={() => onSelectTab('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-[#133760] text-emerald-300 font-bold border-b-2 border-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Progress Tracker</span>
            </button>
          </nav>
        )}

        {/* Mobile Dropdown Menu - fully responsive within screen viewport */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-3 border-t border-[#18375b] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain pb-16">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  onSelectTab('governance-atlas');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  isAtlasMode ? 'bg-[#00A389] text-white' : 'bg-[#07192f] text-slate-200'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>IG Handbook</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('playbook');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isAtlasMode ? 'bg-[#005EB8] text-white' : 'bg-[#07192f] text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Runtime</span>
              </button>
            </div>

            {/* Overview */}
            <button
              onClick={() => {
                onSelectTab('gateway');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                activeTab === 'gateway' ? 'bg-[#133760] text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
              }`}
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Overview</span>
            </button>

            {/* Mobile Section 1: Govern & Assure */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Govern &amp; Assure
              </div>
              {governAssureGroup.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                    activeTab === item.id ? 'bg-[#133760] text-amber-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Section 2: Architecture & Code */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                Architecture &amp; Code
              </div>
              {architectureCodeGroup.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                    activeTab === item.id ? 'bg-[#133760] text-sky-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Section 3: Evidence & Standards */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Evidence &amp; Standards
              </div>
              {standardsEvidenceGroup.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                    activeTab === item.id ? 'bg-[#133760] text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Section 4: Quiz & Tracker */}
            <div className="pt-2 border-t border-[#18375b] space-y-1">
              <button
                onClick={() => {
                  onSelectTab('quiz');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-[#133760] text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Assurance Quizzes</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('progress');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 cursor-pointer ${
                  activeTab === 'progress' ? 'bg-[#133760] text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-[#0f2847]'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Progress Tracker ({stats.overallProgressPercentage}%)</span>
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="pt-2 border-t border-[#18375b] space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 bg-[#07192f] flex items-center gap-2 cursor-pointer"
              >
                {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </button>

              {onOpenFeedback && (
                <button
                  onClick={() => {
                    onOpenFeedback();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 flex items-center gap-2 border border-amber-500/40 cursor-pointer"
                >
                  <MessageSquarePlus className="w-4 h-4 text-amber-400" />
                  <span>Raise Issue / Feedback</span>
                </button>
              )}

              <a
                href="https://github.com/iwfarr/seawater-playbook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-[#0f2847] flex items-center gap-2 border border-[#1b3f68]"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
