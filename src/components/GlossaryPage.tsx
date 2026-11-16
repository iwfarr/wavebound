import React, { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { useUserProgress } from '../context/ProgressContext';
import {
  BookOpen,
  Search,
  ExternalLink,
  Tag,
  CheckCircle2,
  Bookmark,
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Lock,
  Info,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GlossaryPageProps {
  initialTermId?: string | null;
  onNavigateToSection?: (sectionId: string, highlightKeyword?: string) => void;
  onNavigateToConcept?: (conceptId: string) => void;
  onNavigateToResources?: () => void;
}

const CATEGORY_HUBS = [
  { id: 'hub-gov', label: 'Governance & Frameworks', color: '#005EB8', category: 'Governance & Frameworks' },
  { id: 'hub-sem', label: 'Semantic Web & Ontologies', color: '#7c3aed', category: 'Semantic Web & Ontologies' },
  { id: 'hub-sec', label: 'Policy Enforcement & Security', color: '#047857', category: 'Policy Enforcement & Security' },
  { id: 'hub-sdc', label: 'Disclosure Control (SDC)', color: '#b45309', category: 'Disclosure Control (SDC)' },
  { id: 'hub-ai', label: 'AI & Autonomous Agents', color: '#be185d', category: 'AI & Autonomous Agents' },
  { id: 'hub-ops', label: 'Operations & Testing', color: '#2563eb', category: 'Operations & Testing' },
  { id: 'hub-std', label: 'Standards & Clinical Safety', color: '#0f766e', category: 'Standards & Clinical Safety' },
  { id: 'hub-gmm', label: 'Governance Maturity Model', color: '#4f46e5', category: 'Governance Maturity Model' },
];

export const GlossaryPage: React.FC<GlossaryPageProps> = ({
  initialTermId,
  onNavigateToSection,
  onNavigateToConcept,
  onNavigateToResources
}) => {
  const { viewedGlossaryTerms, recordGlossaryTermView } = useUserProgress();
  const [viewMode, setViewMode] = useState<'cards' | 'graph'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<'All' | 'govern-assure' | 'build-deploy'>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [activeTermId, setActiveTermId] = useState<string | null>(initialTermId || 'tre');
  const [edgeDensity, setEdgeDensity] = useState<'clean' | 'bridges'>('clean');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const [modalTerm, setModalTerm] = useState<GlossaryTerm | null>(null);

  const toggleCardExpanded = (termId: string) => {
    setExpandedCardIds((prev) => ({ ...prev, [termId]: !prev[termId] }));
  };

  // Cytoscape Canvas Ref for Knowledge Graph Mode
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (initialTermId) {
      setActiveTermId(initialTermId);
      recordGlossaryTermView(initialTermId);
      const el = document.getElementById(`term-${initialTermId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [initialTermId]);

  const categories = ['All', ...Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)))];
  const alphabet = ['All', ...Array.from(new Set(GLOSSARY_TERMS.map((t) => t.term[0].toUpperCase()))).sort()];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (term.acronym && term.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
      term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.fullDefinition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesLetter = selectedLetter === 'All' || term.term.toUpperCase().startsWith(selectedLetter);

    const matchesTrack =
      selectedTrack === 'All'
        ? true
        : selectedTrack === 'govern-assure'
        ? ['Governance & Frameworks', 'Standards & Clinical Safety', 'Governance Maturity Model', 'Disclosure Control (SDC)'].includes(term.category)
        : ['Semantic Web & Ontologies', 'Policy Enforcement & Security', 'AI & Autonomous Agents', 'Operations & Testing', 'Standards & Clinical Safety'].includes(term.category);

    return matchesSearch && matchesCategory && matchesLetter && matchesTrack;
  });

  const activeTerm = GLOSSARY_TERMS.find((t) => t.id === activeTermId) || GLOSSARY_TERMS[0];

  const handleSelectTerm = (term: GlossaryTerm) => {
    setActiveTermId(term.id);
    recordGlossaryTermView(term.id);
  };

  // Build Cytoscape Knowledge Graph when in 'graph' mode
  useEffect(() => {
    if (viewMode !== 'graph' || !graphContainerRef.current) return;

    const visibleTerms = GLOSSARY_TERMS.filter((t) => {
      if (selectedCategory === 'All') return true;
      return t.category === selectedCategory;
    });

    const activeHubs = CATEGORY_HUBS.filter((h) => {
      if (selectedCategory === 'All') return true;
      return h.category === selectedCategory;
    });

    const hubNodes = activeHubs.map((hub) => ({
      data: {
        id: hub.id,
        label: hub.label,
        color: hub.color,
        type: 'hub'
      }
    }));

    const termNodes = visibleTerms.map((term) => {
      const parentHub = CATEGORY_HUBS.find((h) => h.category === term.category);
      return {
        data: {
          id: `node-${term.id}`,
          label: term.acronym || term.term,
          termId: term.id,
          color: parentHub?.color || '#005EB8',
          type: 'term',
          category: term.category,
          shortDef: term.shortDefinition
        }
      };
    });

    const taxonomyEdges = visibleTerms.map((term) => {
      const parentHub = CATEGORY_HUBS.find((h) => h.category === term.category);
      return {
        data: {
          id: `edge-${parentHub?.id}-${term.id}`,
          source: parentHub?.id || 'hub-gov',
          target: `node-${term.id}`,
          type: 'taxonomic'
        }
      };
    });

    const semanticEdges: any[] = [];
    if (edgeDensity === 'bridges') {
      visibleTerms.forEach((term) => {
        term.relatedTerms?.forEach((relatedId) => {
          if (visibleTerms.some((t) => t.id === relatedId)) {
            semanticEdges.push({
              data: {
                id: `bridge-${term.id}-${relatedId}`,
                source: `node-${term.id}`,
                target: `node-${relatedId}`,
                type: 'semantic'
              }
            });
          }
        });
      });
    }

    const cy = cytoscape({
      container: graphContainerRef.current,
      elements: [...hubNodes, ...termNodes, ...taxonomyEdges, ...semanticEdges],
      style: [
        {
          selector: 'node[type = "hub"]',
          style: {
            label: 'data(label)',
            color: '#0f172a',
            'font-size': '11px',
            'font-weight': 700,
            'font-family': 'Inter, sans-serif',
            'background-color': 'data(color)',
            'border-width': 2,
            'border-color': '#ffffff',
            width: 44,
            height: 44,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'overlay-padding': 6
          }
        },
        {
          selector: 'node[type = "term"]',
          style: {
            label: 'data(label)',
            color: '#334155',
            'font-size': '9px',
            'font-family': 'monospace',
            'font-weight': 600,
            'background-color': '#ffffff',
            'border-width': 2,
            'border-color': 'data(color)',
            width: 26,
            height: 26,
            'text-valign': 'bottom',
            'text-margin-y': 4
          }
        },
        {
          selector: 'edge[type = "taxonomic"]',
          style: {
            width: 1.5,
            'line-color': '#cbd5e1',
            'curve-style': 'bezier',
            opacity: 0.7
          }
        },
        {
          selector: 'edge[type = "semantic"]',
          style: {
            width: 1.5,
            'line-color': '#005EB8',
            'line-style': 'dashed',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#005EB8',
            'curve-style': 'bezier',
            opacity: 0.85
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-width': 3.5,
            'border-color': '#005EB8',
            'background-color': '#e0f2fe',
            opacity: 1
          }
        },
        {
          selector: '.faded',
          style: {
            opacity: 0.2
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: false,
        randomize: false,
        componentSpacing: 120,
        nodeOverlap: 20,
        nodeRepulsion: 600000,
        padding: 50
      } as any
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const termId = node.data('termId');
      if (termId) {
        const found = GLOSSARY_TERMS.find((t) => t.id === termId);
        if (found) {
          setActiveTermId(found.id);
          recordGlossaryTermView(found.id);
          if (window.innerWidth < 1024) {
            setModalTerm(found);
          }
        }
      }

      cy.elements().removeClass('highlighted faded');
      node.addClass('highlighted');
      node.neighborhood().removeClass('faded');
      cy.elements().difference(node.neighborhood().add(node)).addClass('faded');
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted faded');
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [viewMode, selectedCategory, edgeDensity]);

  useEffect(() => {
    if (!cyRef.current || viewMode !== 'graph') return;
    const cy = cyRef.current;

    if (!searchQuery.trim()) {
      cy.elements().removeClass('highlighted faded');
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matches = cy.nodes().filter((n) => {
      const label = (n.data('label') || '').toLowerCase();
      const def = (n.data('shortDef') || '').toLowerCase();
      return label.includes(q) || def.includes(q);
    });

    if (matches.length > 0) {
      cy.elements().addClass('faded').removeClass('highlighted');
      matches.removeClass('faded').addClass('highlighted');
      matches.neighborhood().removeClass('faded');
      cy.animate({ fit: { eles: matches, padding: 60 }, duration: 400 });
    }
  }, [searchQuery, viewMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner - Clean Editorial Standard */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F294A] dark:text-sky-400">
            <BookOpen className="w-4 h-4 text-[#005EB8]" />
            <span>Pillar 2 · Plain-English Definitions &amp; Graph 3 of 3 (Term Relationships)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Governance &amp; Architecture Glossary
          </h1>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Plain-language definitions for the legal, ethical, statistical, and technical words used across safe research environments. Browse alphabetically below or switch to our Terminology Cluster Graph to see how terms connect.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <span>
              Total Terms: <strong className="text-slate-900 dark:text-white font-semibold tabular-nums">{GLOSSARY_TERMS.length}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Explored by You: <strong className="text-[#047857] dark:text-emerald-400 font-semibold tabular-nums">{viewedGlossaryTerms.length}</strong>
            </span>
            {onNavigateToResources && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onNavigateToResources}
                  className="font-semibold text-[#005EB8] dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Browse Further Resources &amp; Official Laws</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Switcher and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>A–Z Card Directory ({filteredTerms.length})</span>
          </button>

          <button
            onClick={() => setViewMode('graph')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              viewMode === 'graph'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
            title="Graph 3 of 3: Interactive visual clusters of glossary terms"
          >
            <Network className="w-4 h-4" />
            <span>Term Cluster Graph (Graph 3 of 3)</span>
          </button>
        </div>

        {/* If in Graph View: Edge Density and Layout Controls */}
        {viewMode === 'graph' && (
          <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setEdgeDensity('clean')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  edgeDensity === 'clean'
                    ? 'bg-[#005EB8] text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Category Hub & Spoke Tree (Guaranteed clean, zero edge clutter)"
              >
                Taxonomic Clusters
              </button>
              <button
                onClick={() => setEdgeDensity('bridges')}
                className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  edgeDensity === 'bridges'
                    ? 'bg-[#005EB8] text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Shows cross-domain semantic relationships between terms"
              >
                Cross-Term Bridges
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.25)}
                className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
                className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => cyRef.current?.fit(undefined, 40)}
                className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer"
                title="Fit to Screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search, Track and Category Filter Bar */}
      <div className="space-y-4">
        {/* Track Filter: All vs Govern & Assure vs Build & Deploy */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold mr-1">Audience Track:</span>
          {[
            { id: 'All', label: 'All Cards', badge: 'Complete' },
            { id: 'govern-assure', label: 'Govern & Assure Track', badge: 'IG / Ethics' },
            { id: 'build-deploy', label: 'Build & Deploy Track', badge: 'Architects / Dev' }
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedTrack === track.id
                  ? 'bg-[#0F294A] text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{track.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${selectedTrack === track.id ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                {track.badge}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search glossary terms (e.g. SDC, SHACL, Quasi-Identifiers, OPA, Caldicott)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-12 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#005EB8] transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#005EB8] font-medium shadow-xs cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Alphabet Bar (in Card Mode) */}
        {viewMode === 'cards' && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
              A–Z:
            </span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-[#0F294A] text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODE 1: INTERACTIVE KNOWLEDGE GRAPH VIEW */}
      {viewMode === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cytoscape Canvas Container */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden h-[420px] sm:h-[540px] lg:h-[680px] shadow-xs">
            <div ref={graphContainerRef} className="w-full h-full" />

            {/* Edge Density Notice in bottom-left */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur rounded-lg p-3 text-[11px] text-slate-700 dark:text-slate-300 space-y-1 max-w-xs shadow-md">
              <div className="font-semibold text-[#005EB8] dark:text-cyan-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Graph 3 of 3 · Term Cluster Network</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[10px] leading-relaxed">
                {edgeDensity === 'clean'
                  ? 'Explores how glossary definitions cluster by topic. Click any term node to inspect details.'
                  : 'Displays cross-domain semantic bridges connecting related statutory and technical definitions.'}
              </p>
            </div>
          </div>

          {/* Right: Selected Term Inspector Card */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 sticky top-24 max-h-[680px] overflow-y-auto shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                {activeTerm.category}
              </span>
              <button
                onClick={() => setModalTerm(activeTerm)}
                className="text-xs text-[#005EB8] dark:text-sky-400 hover:underline font-mono flex items-center gap-1 cursor-pointer"
                title="Open full sheet view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Sheet</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>{activeTerm.term}</span>
                {activeTerm.acronym && (
                  <span className="text-xs font-mono font-semibold text-[#005EB8] dark:text-sky-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {activeTerm.acronym}
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {activeTerm.shortDefinition}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                Full Architectural Definition
              </span>
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-pre-line">
                {activeTerm.fullDefinition}
              </div>
            </div>

            {/* If example code or SDC rules matrix exists */}
            {activeTerm.exampleSnippet && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                  Rules &amp; Code Representation
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto leading-relaxed shadow-xs">
                  <code>{activeTerm.exampleSnippet}</code>
                </pre>
              </div>
            )}

            {/* External Reference Link */}
            {activeTerm.externalUrl && (
              <div className="pt-2">
                <a
                  href={activeTerm.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-[#005EB8] dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-semibold transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#005EB8] dark:text-sky-400" />
                  <span>Authoritative Guidance</span>
                </a>
              </div>
            )}

            {/* Related Concepts */}
            {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                  Related Concepts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTerm.relatedTerms.map((relId) => {
                    const rel = GLOSSARY_TERMS.find((t) => t.id === relId);
                    if (!rel) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => handleSelectTerm(rel)}
                        className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded transition-colors cursor-pointer"
                      >
                        {rel.term}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: CARD DIRECTORY VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => {
            const isViewed = viewedGlossaryTerms.includes(term.id);
            const isSelected = activeTermId === term.id;
            const isExpanded = !!expandedCardIds[term.id];

            return (
              <div
                key={term.id}
                id={`term-${term.id}`}
                onClick={() => handleSelectTerm(term)}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-6 space-y-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-[#005EB8] dark:border-sky-500 ring-2 ring-[#005EB8]/20 dark:ring-sky-500/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Category and View Status */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                      {term.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {isViewed ? (
                        <span className="text-[#047857] dark:text-emerald-400 flex items-center gap-1 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Explored</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] font-mono">Unread</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalTerm(term);
                          recordGlossaryTermView(term.id);
                        }}
                        className="text-slate-400 hover:text-[#005EB8] dark:hover:text-sky-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        title="Open in Full Sheet"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Term Title & Acronym */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-baseline gap-2">
                      <span>{term.term}</span>
                      {term.acronym && (
                        <span className="text-xs font-mono font-semibold text-[#005EB8] dark:text-sky-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {term.acronym}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-1">
                      {term.shortDefinition}
                    </p>
                  </div>

                  {/* Full Definition with Toggle */}
                  <div className="space-y-2">
                    <div className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded ? 'whitespace-pre-line text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800' : 'line-clamp-3'}`}>
                      {term.fullDefinition}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpanded(term.id);
                        }}
                        className="text-[11px] font-semibold text-[#005EB8] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Collapse definition' : 'Read full explanation'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex items-center gap-1.5">
                        {term.externalUrl && (
                          <a
                            href={term.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800 flex items-center gap-1"
                            title="Open external standard / guidance"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Guide</span>
                          </a>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalTerm(term);
                            recordGlossaryTermView(term.id);
                          }}
                          className="text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[#005EB8]" />
                          <span>Focused Sheet</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content: Playbook Context, Snippet & Related Terms */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono text-slate-500 block font-semibold">Enforcement Context:</span>
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                          {term.playbookContext}
                        </p>
                      </div>

                      {term.exampleSnippet && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block font-semibold">Rules &amp; Code:</span>
                          <pre className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[10px] text-[#005EB8] dark:text-cyan-300 overflow-x-auto leading-relaxed max-h-48">
                            <code>{term.exampleSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block font-semibold">Related Primitives:</span>
                          <div className="flex flex-wrap gap-1">
                            {term.relatedTerms.map((relId) => {
                              const rel = GLOSSARY_TERMS.find((t) => t.id === relId);
                              if (!rel) return null;
                              return (
                                <button
                                  key={relId}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalTerm(rel);
                                    recordGlossaryTermView(rel.id);
                                  }}
                                  className="text-[10px] bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#005EB8] dark:text-sky-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded transition-colors cursor-pointer"
                                >
                                  {rel.term}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL GLOSSARY EXPLANATION MODAL / BOTTOM SHEET */}
      {modalTerm && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setModalTerm(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full sm:max-w-2xl max-h-[88vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950 sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    {modalTerm.category}
                  </span>
                  {modalTerm.acronym && (
                    <span className="text-xs font-mono font-semibold text-[#005EB8] dark:text-sky-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {modalTerm.acronym}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {modalTerm.term}
                </h2>
              </div>
              <button
                onClick={() => setModalTerm(null)}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-700 dark:text-slate-200">
              {/* Short definition callout */}
              <div className="p-4 bg-sky-50 dark:bg-cyan-950/30 rounded-lg border border-sky-200 dark:border-cyan-800/40 text-xs sm:text-sm text-slate-800 dark:text-cyan-200 font-medium leading-relaxed">
                {modalTerm.shortDefinition}
              </div>

              {/* Full Unabridged Definition */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                  Full Architectural Explanation &amp; Citations:
                </span>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-pre-line space-y-3">
                  {modalTerm.fullDefinition}
                </div>
              </div>

              {/* Example rules / Code snippet if present */}
              {modalTerm.exampleSnippet && (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                    Rules Representation &amp; Code:
                  </span>
                  <pre className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-[#005EB8] dark:text-cyan-300 overflow-x-auto leading-relaxed shadow-xs">
                    <code>{modalTerm.exampleSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Key Governance Safeguards if present */}
              {modalTerm.governanceSafeguards && modalTerm.governanceSafeguards.length > 0 && (
                <div className="space-y-2 p-4 bg-[#f0fdf9] dark:bg-slate-950 rounded-lg border border-[#a7f3d0] dark:border-slate-800">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#047857] dark:text-emerald-400 block font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mandated Governance Safeguards</span>
                  </span>
                  <ul className="space-y-1.5">
                    {modalTerm.governanceSafeguards.map((safeguard, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                        <span>{safeguard}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Enclave Implementation Context */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                  Enforcement &amp; Playbook Context:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  {modalTerm.playbookContext}
                </p>
              </div>

              {/* External Resource Link */}
              {modalTerm.externalUrl && (
                <div className="pt-2">
                  <a
                    href={modalTerm.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-950 hover:bg-slate-50 text-[#005EB8] dark:text-cyan-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4 text-[#005EB8]" />
                    <span>Open Authoritative Guidance &amp; Reference</span>
                  </a>
                </div>
              )}

              {/* Related terms */}
              {modalTerm.relatedTerms && modalTerm.relatedTerms.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block font-semibold">
                    Related Concepts (Tap to Inspect):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalTerm.relatedTerms.map((relId) => {
                      const rel = GLOSSARY_TERMS.find((t) => t.id === relId);
                      if (!rel) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => {
                            setModalTerm(rel);
                            setActiveTermId(rel.id);
                            recordGlossaryTermView(rel.id);
                          }}
                          className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#005EB8] dark:text-sky-300 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{rel.term}</span>
                          <ArrowRight className="w-3 h-3 text-[#005EB8]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0">
              <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
                <span className="text-slate-500">Playbook reference:</span>{' '}
                <strong className="text-slate-900 dark:text-slate-200 font-semibold">{modalTerm.playbookSection}</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <button
                  onClick={() => setModalTerm(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Close
                </button>

                {onNavigateToResources && (
                  <button
                    onClick={() => {
                      setModalTerm(null);
                      onNavigateToResources();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#005EB8] dark:text-sky-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    Further Resources
                  </button>
                )}

                {onNavigateToSection && (
                  <button
                    onClick={() => {
                      setModalTerm(null);
                      onNavigateToSection(modalTerm.id, modalTerm.term);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Read In Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
