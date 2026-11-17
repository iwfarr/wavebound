import React, { useState, useRef } from 'react';
import { useUserProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { PLAYBOOK_MODULES } from '../data/playbookContent';
import { WaveboundLogo } from './WaveboundLogo';
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

import { GovernAssureView } from './GovernAssureWorkspace';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToGovernAssure?: (view: GovernAssureView) => void;
  onNavigateToConcept?: (conceptId: string) => void;
  onNavigateToQuiz?: (category?: string) => void;
  onOpenFeedback?: () => void;
}

interface NavGroupItem {
  id: ActiveTab;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

interface SearchDestinationItem {
  id: string;
  title: string;
  desc: string;
  keywords: string[];
  badge: string;
  action: 'govern-assure' | 'tab' | 'quiz';
  governAssureView?: GovernAssureView;
  tab?: ActiveTab;
  quizCategory?: string;
}

const SEARCH_SIMULATORS_AND_VIEWS: SearchDestinationItem[] = [
  {
    id: 'sim-iso27001-isms',
    title: 'ISO 27001 ISMS, SoA & DEA Build-Up Simulator',
    desc: '4 audit roles, 6-phase 24-week playbook, 11 mandatory Clauses 4–10 artifacts, 3-year cadence & Docs-to-OPA claim simulator',
    keywords: ['iso27001', 'iso 27001', '27001', 'isms', 'soa', 'statement of applicability', 'dea', 'buildup', 'simulator', 'roles', 'cadence', 'roadmap', 'clause', 'audit'],
    badge: 'Simulator',
    action: 'govern-assure',
    governAssureView: 'isms_dea_buildup'
  },
  {
    id: 'sim-iso27001-procurement',
    title: 'Procurement, SATRE, DSPT & ISO 27001:2022 Matrix',
    desc: 'Interactive ISO/IEC 27001:2022 Annex A.5–A.8, SATRE v1.1, NHS DSPT & DCB0129 compliance matrix and clinical hazard log',
    keywords: ['iso27001', 'iso 27001', 'procurement', 'matrix', 'satre', 'dspt', 'annex a', 'dcb0129', 'compliance', 'simulator'],
    badge: 'Simulator',
    action: 'govern-assure',
    governAssureView: 'procurement_readiness'
  },
  {
    id: 'sim-protocol-evaluator',
    title: 'Governance Protocol Evaluator Simulator',
    desc: 'Test Five Safes, Section 251 CAG, REC ethics, data tiers, AI sponsorship & fail-closed gate verdicts',
    keywords: ['simulator', 'protocol', 'evaluator', 'five safes', 'caldicott', 's251', 'govern', 'assure'],
    badge: 'Simulator',
    action: 'govern-assure',
    governAssureView: 'simulator'
  },
  {
    id: 'sim-sdc-airlock',
    title: 'Quantitative SDC & Airlock Egress Simulator',
    desc: 'Calculate k >= 10 suppression, (1, 80%) dominance checks, Statbarn rules & auditable dual-reviewer airlock release',
    keywords: ['sdc', 'airlock', 'statbarn', 'suppression', 'dominance', 'safe outputs', 'simulator', 'auditable'],
    badge: 'Simulator',
    action: 'govern-assure',
    governAssureView: 'sdc_hub'
  },
  {
    id: 'sim-opa-sandbox',
    title: 'OPA Rego Policy Sandbox',
    desc: 'Interactive Rego policy evaluator testing JSON admission & airlock egress inputs live',
    keywords: ['opa', 'rego', 'sandbox', 'simulator', 'json', 'policy-as-code', 'pac'],
    badge: 'Simulator',
    action: 'tab',
    tab: 'sandbox'
  },
  {
    id: 'sim-llm-enclave',
    title: 'AI & Autonomous LLM Security Enclave Simulator',
    desc: 'Test human sponsorship, read-only MCP tool policies, ZDR boundaries & ISO/IEC 42001 guardrails',
    keywords: ['ai', 'llm', 'mcp', 'agent', 'enclave', 'iso 42001', 'simulator'],
    badge: 'Simulator',
    action: 'tab',
    tab: 'llm-security'
  },
  {
    id: 'view-foundations',
    title: 'Foundations & 10-Stage Schematic (Safe Outputs)',
    desc: 'Plain-English governance desk reference, 10-stage workflow, auditable output approval hand-offs & FOIA transparency',
    keywords: ['foundations', 'schematic', 'safe outputs', 'hand-offs', 'auditable', 'caldicott', 'ig guide'],
    badge: 'Foundations',
    action: 'tab',
    tab: 'governance-atlas'
  },
  {
    id: 'quiz-iso27001-dea',
    title: 'Quiz: ISO 27001 & DEA 2017 (45 Questions)',
    desc: 'Standalone practice exam covering ISO/IEC 27001:2022 Clauses 4–10, Annex A, roles, cadence & UKSA DEA accreditation',
    keywords: ['quiz', 'exam', 'iso27001', 'iso 27001', 'dea', '2017', 'isms', 'test'],
    badge: 'Quiz',
    action: 'quiz',
    quizCategory: 'ISO 27001 & DEA 2017'
  }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onNavigateToGlossaryTerm,
  onNavigateToSection,
  onNavigateToGovernAssure,
  onNavigateToConcept,
  onNavigateToQuiz,
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

  // Global search across interactive simulators, workspaces, glossary terms, and modules
  const searchResults = React.useMemo(() => {
    if (!globalSearch.trim()) return [];
    const raw = globalSearch.toLowerCase().trim();
    const normalized = raw.replace(/[^a-z0-9]/g, '');

    const workspaces = SEARCH_SIMULATORS_AND_VIEWS.filter((item) => {
      const titleNorm = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      const descMatch = item.desc.toLowerCase().includes(raw);
      const kwMatch = item.keywords.some((kw) => {
        const kwNorm = kw.replace(/[^a-z0-9]/g, '');
        return kw.includes(raw) || (normalized.length >= 2 && kwNorm.includes(normalized));
      });
      return item.title.toLowerCase().includes(raw) || titleNorm.includes(normalized) || descMatch || kwMatch;
    }).map((item) => ({
      kind: 'destination' as const,
      id: item.id,
      title: item.title,
      desc: item.desc,
      badge: item.badge,
      destination: item
    }));

    const terms = GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(raw) ||
        t.term.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized) ||
        (t.acronym && t.acronym.toLowerCase().includes(raw)) ||
        t.shortDefinition.toLowerCase().includes(raw)
    ).map((t) => ({
      kind: 'glossary' as const,
      id: t.id,
      title: t.term,
      desc: t.shortDefinition,
      badge: 'Glossary'
    }));

    const modules = PLAYBOOK_MODULES.filter(
      (m) =>
        m.title.toLowerCase().includes(raw) ||
        m.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized) ||
        m.summary.toLowerCase().includes(raw)
    ).map((m) => ({
      kind: 'module' as const,
      id: m.id,
      title: m.title,
      desc: m.shortDesc,
      badge: 'Concept'
    }));

    return [...workspaces.slice(0, 4), ...modules.slice(0, 2), ...terms.slice(0, 3)].slice(0, 8);
  }, [globalSearch]);

  const handleSelectSearchResult = (item: (typeof searchResults)[number]) => {
    if (item.kind === 'destination') {
      const dest = item.destination;
      if (dest.action === 'govern-assure' && dest.governAssureView) {
        if (onNavigateToGovernAssure) {
          onNavigateToGovernAssure(dest.governAssureView);
        } else {
          onSelectTab('govern-assure');
        }
      } else if (dest.action === 'quiz') {
        if (onNavigateToQuiz) {
          onNavigateToQuiz(dest.quizCategory);
        } else {
          onSelectTab('quiz');
        }
      } else if (dest.action === 'tab' && dest.tab) {
        onSelectTab(dest.tab);
      }
    } else if (item.kind === 'glossary') {
      onNavigateToGlossaryTerm(item.id);
    } else if (item.kind === 'module') {
      if (onNavigateToConcept) {
        onNavigateToConcept(item.id);
      } else {
        onSelectTab('concepts');
      }
    }
    setGlobalSearch('');
    setSearchFocused(false);
  };

  // Pillar 1: Playbook & Guides (playbook, rollout, ontology, concepts primer)
  const playbookGuidesGroup: NavGroupItem[] = [
    {
      id: 'playbook',
      label: 'Wavebound PaC Playbook',
      desc: 'Step-by-step plain-English & technical guide from ontology to safeguards',
      icon: <FileText className="w-4 h-4 text-sky-400" />
    },
    {
      id: 'implementation-track',
      label: 'Transitioning to Production: Rollout & Decisions',
      desc: '16-week non-breaking policy adoption roadmap, checklists & D-001–D-009 sign-offs',
      icon: <Workflow className="w-4 h-4 text-purple-400" />
    },
    {
      id: 'graph',
      label: 'Ontology Topology Graph',
      desc: 'Interactive 4-lens knowledge map tracing rules from SHACL into OPA Rego',
      icon: <Layers className="w-4 h-4 text-teal-400" />
    },
    {
      id: 'concepts',
      label: 'Concepts Visual Primer',
      desc: 'Quick visual tour of AI Five Safes, Caldicott 1–8, Data Catalogue & SATRE',
      icon: <BookOpen className="w-4 h-4 text-amber-300" />
    }
  ];

  // Pillar 2: Evidence & Resources (foundations, evidence pack, glossary, further resources)
  const evidenceResourcesGroup: NavGroupItem[] = [
    {
      id: 'governance-atlas',
      label: 'Foundations & 10-Stage Schematic',
      desc: 'Plain-English desk reference, statutory workflow, FOIA summary & templates',
      icon: <HeartHandshake className="w-4 h-4 text-emerald-300" />
    },
    {
      id: 'glossary',
      label: 'Governance & Architecture Glossary',
      desc: 'Alphabetical A–Z dictionary and visual term-relationship map',
      icon: <Bookmark className="w-4 h-4 text-slate-300" />
    },
    {
      id: 'resources',
      label: 'Further Resources & Official Standards',
      desc: 'Searchable library of laws, ISO standards, DSA, Statbarn, DataSHIELD, RO-Crate & EHDS',
      icon: <ExternalLink className="w-4 h-4 text-cyan-300" />
    }
  ];

  // Pillar 3: Simulators & Review Lab (Hands-on Testing & Manifests)
  const simulatorsLabGroup: NavGroupItem[] = [
    {
      id: 'govern-assure',
      label: 'Govern & Assure Review Workspace',
      desc: 'Live protocol gate evaluator, Statbarn SDC simulator & statutory matrix',
      icon: <Scale className="w-4 h-4 text-amber-400" />
    },
    {
      id: 'sandbox',
      label: 'OPA Rego Policy Sandbox',
      desc: 'Test realistic research requests live against fail-closed policy rules',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'llm-security',
      label: 'LLM Redaction & Enclave Security Lab',
      desc: 'Interactive AST prompt scrubber, .harness_ignore & zero-egress firewall controls',
      icon: <Bot className="w-4 h-4 text-cyan-300" />
    },
    {
      id: 'build-deploy',
      label: 'Build & Deploy Workstation',
      desc: 'Interactive SHACL/Rego generator & least-privilege container/mirror manifests',
      icon: <Code2 className="w-4 h-4 text-sky-300" />
    }
  ];

  const isPlaybookGuidesActive = playbookGuidesGroup.some((item) => item.id === activeTab);
  const isEvidenceResourcesActive = evidenceResourcesGroup.some((item) => item.id === activeTab);
  const isSimulatorsLabActive = simulatorsLabGroup.some((item) => item.id === activeTab);

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
              title="Wavebound · Ontology-led Information Governance"
            >
              <WaveboundLogo variant="horizontal" size="md" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ISO 27001, Simulator, Caldicott, Rego..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults.length > 0) {
                  e.preventDefault();
                  handleSelectSearchResult(searchResults[0]);
                }
              }}
              className="w-full bg-[#07192f] border border-[#1b3f68] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#0a223f] transition-colors"
            />

            {/* Quick Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 max-h-96 overflow-y-auto">
                {searchResults.map((item) => (
                  <button
                    key={`${item.kind}-${item.id}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectSearchResult(item);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#123154] text-xs space-y-0.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white truncate">{item.title}</span>
                      <span className="text-[10px] uppercase font-mono text-cyan-400 shrink-0">
                        {item.badge}
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
            {/* Quick Lens Jump: Foundations vs PaC Playbook */}
            <div className="hidden sm:flex items-center gap-1 bg-[#07192f] p-1 rounded-lg border border-[#1b3f68]">
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isAtlasMode
                    ? 'bg-[#00A389] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Foundations: Plain-English desk reference for Caldicott Guardians, IG Leads, Ethics Committees, researchers & the public"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>Foundations</span>
              </button>
              <button
                onClick={() => onSelectTab('playbook')}
                className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'playbook'
                    ? 'bg-[#005EB8] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Wavebound PaC Playbook: Step-by-step guide from ontology to OPA Rego & safe deployment"
              >
                <Shield className="w-3.5 h-3.5 text-sky-300" />
                <span>PaC Playbook</span>
              </button>
            </div>

            {/* Light / Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="bg-[#07192f] border border-[#1b3f68] px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-[#123154] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
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
              className="bg-[#07192f] border border-[#1b3f68] px-2.5 py-1.5 rounded-lg text-xs font-mono text-emerald-300 hover:bg-[#123154] transition-colors hidden lg:flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              title="Overall Learning & Governance Progress"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold tabular-nums">{stats.overallProgressPercentage}%</span>
            </button>

            {/* GitHub Repository */}
            <a
              href="https://github.com/iwfarr/wavebound"
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
                className="hidden sm:flex bg-amber-500/20 border border-amber-500/50 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition-colors items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
                title="Share Governance Feedback or Raise an Issue"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
                <span>Raise Issue</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#07192f] border border-[#1b3f68] text-slate-200 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>
        </div>

        {/* 4-Pillar Aligned Desktop Navigation Row */}
        <nav className="hidden md:flex items-center space-x-1 py-1.5 border-t border-[#18375b] relative">
          {/* Home / Overview */}
          <button
            onClick={() => onSelectTab('gateway')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'gateway'
                ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Overview</span>
          </button>

          {/* Pillar 1: Playbook, Ontology & Guides */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('playbook-guides')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                onSelectTab('playbook');
                setOpenDropdown(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isPlaybookGuidesActive
                  ? 'bg-[#133760] text-sky-300 font-bold border-b-2 border-sky-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Playbook &amp; Guides</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'playbook-guides' && (
              <div
                className="absolute top-full left-0 mt-1 w-88 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                onMouseEnter={() => handleMouseEnter('playbook-guides')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-2.5 py-1 text-[11px] font-semibold text-sky-300 border-b border-[#1b3f68]">
                  Pillar 1 · Playbook, Rollout, Ontology &amp; Concepts Primer
                </div>
                {playbookGuidesGroup.map((subItem) => {
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

          {/* Pillar 2: Evidence, Standards & Further Resources */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('evidence-resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                onSelectTab('governance-atlas');
                setOpenDropdown(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isEvidenceResourcesActive && !isSimulatorsLabActive
                  ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-cyan-300" />
              <span>Evidence &amp; Resources</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'evidence-resources' && (
              <div
                className="absolute top-full left-0 mt-1 w-84 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                onMouseEnter={() => handleMouseEnter('evidence-resources')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-2.5 py-1 text-[11px] font-semibold text-cyan-300 border-b border-[#1b3f68]">
                  Pillar 2 · Foundations, Glossary &amp; Further Resources
                </div>
                {evidenceResourcesGroup.map((subItem) => {
                  const isSubActive = activeTab === subItem.id;
                  return (
                    <button
                      key={`${subItem.id}-${subItem.label}`}
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

          {/* Pillar 3: Simulators & Review Lab */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('simulators-lab')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                onSelectTab('govern-assure');
                setOpenDropdown(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSimulatorsLabActive
                  ? 'bg-[#133760] text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulators &amp; Lab</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openDropdown === 'simulators-lab' && (
              <div
                className="absolute top-full left-0 mt-1 w-88 bg-[#0c2340] border border-[#1b3f68] rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md"
                onMouseEnter={() => handleMouseEnter('simulators-lab')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-2.5 py-1 text-[11px] font-semibold text-amber-300 border-b border-[#1b3f68]">
                  Pillar 3 · Interactive Reviews, SDC, Rego &amp; Enclaves
                </div>
                {simulatorsLabGroup.map((subItem) => {
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

          {/* Pillar 4: Quizzes & Progress */}
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#133760] text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quiz</span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-[#133760] text-emerald-300 font-bold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white hover:bg-[#102b4c]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Progress &amp; Certs</span>
          </button>
        </nav>

        {/* Mobile Dropdown Menu - aligned with the 4 Pillars */}
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
                <span>Foundations</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('playbook');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'playbook' ? 'bg-[#005EB8] text-white' : 'bg-[#07192f] text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>PaC Playbook</span>
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

            {/* Mobile Pillar 1: Playbook & Guides */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[11px] font-semibold text-sky-300">
                1. Playbook, Ontology &amp; Guides
              </div>
              {playbookGuidesGroup.map((item) => (
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

            {/* Mobile Pillar 2: Evidence & Further Resources */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[11px] font-semibold text-cyan-300">
                2. Evidence, Standards &amp; Resources
              </div>
              {evidenceResourcesGroup.map((item) => (
                <button
                  key={`${item.id}-${item.label}`}
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

            {/* Mobile Pillar 3: Simulators & Review Lab */}
            <div className="space-y-1 pt-1">
              <div className="px-3 text-[11px] font-semibold text-amber-300">
                3. Simulators &amp; Review Lab
              </div>
              {simulatorsLabGroup.map((item) => (
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

            {/* Mobile Pillar 4: Quizzes & Progress */}
            <div className="pt-2 border-t border-[#18375b] space-y-1">
              <div className="px-3 text-[11px] font-semibold text-emerald-300">
                4. Quizzes &amp; Progress
              </div>
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
                <span>Quiz</span>
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
                <span>Progress &amp; Certs ({stats.overallProgressPercentage}%)</span>
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
                href="https://github.com/iwfarr/wavebound"
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
