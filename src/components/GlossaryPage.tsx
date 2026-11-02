import React, { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { useUserProgress } from '../context/ProgressContext';
import {
  BookOpen,
  Search,
  ExternalLink,
  Code2,
  Tag,
  CheckCircle2,
  Bookmark,
  Layers,
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Lock,
  SlidersHorizontal,
  Info,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GlossaryPageProps {
  initialTermId?: string | null;
  onNavigateToSection?: (sectionId: string, highlightKeyword?: string) => void;
  onNavigateToConcept?: (conceptId: string) => void;
}

const CATEGORY_HUBS = [
  { id: 'hub-gov', label: 'Governance & Frameworks', color: '#06b6d4', category: 'Governance & Frameworks' },
  { id: 'hub-sem', label: 'Semantic Web & Ontologies', color: '#8b5cf6', category: 'Semantic Web & Ontologies' },
  { id: 'hub-sec', label: 'Policy Enforcement & Security', color: '#10b981', category: 'Policy Enforcement & Security' },
  { id: 'hub-sdc', label: 'Disclosure Control (SDC)', color: '#f59e0b', category: 'Disclosure Control (SDC)' },
  { id: 'hub-ai', label: 'AI & Autonomous Agents', color: '#ec4899', category: 'AI & Autonomous Agents' },
  { id: 'hub-ops', label: 'Operations & Testing', color: '#3b82f6', category: 'Operations & Testing' },
  { id: 'hub-std', label: 'Standards & Clinical Safety', color: '#14b8a6', category: 'Standards & Clinical Safety' },
  { id: 'hub-gmm', label: 'Governance Maturity Model', color: '#6366f1', category: 'Governance Maturity Model' },
];

export const GlossaryPage: React.FC<GlossaryPageProps> = ({
  initialTermId,
  onNavigateToSection,
  onNavigateToConcept
}) => {
  const { viewedGlossaryTerms, recordGlossaryTermView } = useUserProgress();
  const [viewMode, setViewMode] = useState<'cards' | 'graph'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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

    return matchesSearch && matchesCategory && matchesLetter;
  });

  const activeTerm = GLOSSARY_TERMS.find((t) => t.id === activeTermId) || GLOSSARY_TERMS[0];

  const handleSelectTerm = (term: GlossaryTerm) => {
    setActiveTermId(term.id);
    recordGlossaryTermView(term.id);
  };

  // Build Cytoscape Knowledge Graph when in 'graph' mode
  useEffect(() => {
    if (viewMode !== 'graph' || !graphContainerRef.current) return;

    // Filter terms based on category filter
    const visibleTerms = GLOSSARY_TERMS.filter((t) => {
      if (selectedCategory === 'All') return true;
      return t.category === selectedCategory;
    });

    const activeHubs = CATEGORY_HUBS.filter((h) => {
      if (selectedCategory === 'All') return true;
      return h.category === selectedCategory;
    });

    // 1. Hub Nodes
    const hubNodes = activeHubs.map((hub) => ({
      data: {
        id: hub.id,
        label: hub.label,
        type: 'hub',
        color: hub.color,
        category: hub.category
      }
    }));

    // 2. Term Nodes
    const termNodes = visibleTerms.map((term) => {
      const parentHub = CATEGORY_HUBS.find((h) => h.category === term.category);
      return {
        data: {
          id: `node-${term.id}`,
          termId: term.id,
          label: term.acronym ? `${term.acronym} (${term.term})` : term.term,
          type: 'term',
          color: parentHub?.color || '#38bdf8',
          category: term.category,
          shortDef: term.shortDefinition
        }
      };
    });

    // 3. Taxonomy Edges (Hub to Term) - zero clutter star topologies
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

    // 4. Optional Cross-Domain Bridges (Semantic Links)
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
            color: '#ffffff',
            'font-size': '11px',
            'font-weight': 700,
            'font-family': 'Plus Jakarta Sans, sans-serif',
            'background-color': 'data(color)',
            'border-width': 3,
            'border-color': '#ffffff',
            width: 48,
            height: 48,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'overlay-padding': 6
          }
        },
        {
          selector: 'node[type = "term"]',
          style: {
            label: 'data(label)',
            color: '#f8fafc',
            'font-size': '9px',
            'font-family': 'JetBrains Mono, monospace',
            'font-weight': 500,
            'background-color': '#0f172a',
            'border-width': 1.5,
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
            'line-color': '#334155',
            'curve-style': 'bezier',
            opacity: 0.6
          }
        },
        {
          selector: 'edge[type = "semantic"]',
          style: {
            width: 1.5,
            'line-color': '#06b6d4',
            'line-style': 'dashed',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#06b6d4',
            'curve-style': 'bezier',
            opacity: 0.8
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-width': 3.5,
            'border-color': '#38bdf8',
            'background-color': '#0284c7',
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

    // Tap node handler
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

  // Handle Search Filtering on Canvas
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
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span>Technical Reference · TRE Playbook Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Governance &amp; Architecture Glossary
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every core technical term, standard, regulatory basis, and abbreviation scanned directly from the
            Trusted Research Environment (TRE) Policy-as-Code Playbook. View as an alphabetical directory or traverse as an interactive concept knowledge graph.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
            <span>
              Total Terms: <strong className="text-slate-200">{GLOSSARY_TERMS.length}</strong>
            </span>
            <span>·</span>
            <span>
              Explored by You: <strong className="text-cyan-300">{viewedGlossaryTerms.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* View Mode Switcher and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'cards'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Card Directory ({filteredTerms.length})</span>
          </button>

          <button
            onClick={() => setViewMode('graph')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'graph'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Knowledge Graph View</span>
          </button>
        </div>

        {/* If in Graph View: Edge Density and Layout Controls */}
        {viewMode === 'graph' && (
          <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setEdgeDensity('clean')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  edgeDensity === 'clean'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Category Hub & Spoke Tree (Guaranteed clean, zero edge clutter)"
              >
                Taxonomic Clusters
              </button>
              <button
                onClick={() => setEdgeDensity('bridges')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  edgeDensity === 'bridges'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Shows cross-domain semantic relationships between terms"
              >
                Cross-Term Bridges
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.25)}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => cyRef.current?.fit(undefined, 40)}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                title="Fit to Screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search glossary terms (e.g. SDC, SHACL, Quasi-Identifiers, OPA, Caldicott)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-medium"
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
                className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
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
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden h-[420px] sm:h-[540px] lg:h-[680px] shadow-inner">
            <div ref={graphContainerRef} className="w-full h-full" />

            {/* Edge Density Notice in bottom-left */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 backdrop-blur rounded-xl p-3 text-[11px] text-slate-300 space-y-1 max-w-xs shadow-lg">
              <div className="font-semibold text-cyan-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Anti-Clutter Concept Topology</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                {edgeDensity === 'clean'
                  ? 'Showing clean star clusters around domain hubs to prevent edge overwhelm. Click any node to inspect.'
                  : 'Displaying cross-domain semantic bridges between related terms and enforcement primitives.'}
              </p>
            </div>
          </div>

          {/* Right: Selected Term Inspector Card */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24 max-h-[680px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                {activeTerm.category}
              </span>
              <button
                onClick={() => setModalTerm(activeTerm)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                title="Open full sheet view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Sheet</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{activeTerm.term}</span>
                {activeTerm.acronym && (
                  <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {activeTerm.acronym}
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {activeTerm.shortDefinition}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                Full Architectural Definition
              </span>
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-line">
                {activeTerm.fullDefinition}
              </div>
            </div>

            {/* If example code or SDC rules matrix exists */}
            {activeTerm.exampleSnippet && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Rules &amp; Code Representation
                </span>
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                  <code>{activeTerm.exampleSnippet}</code>
                </pre>
              </div>
            )}

            {/* Playbook Section Link */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Playbook Section</span>
                <span className="text-slate-300 font-semibold text-[11px]">{activeTerm.playbookSection}</span>
              </div>
              {onNavigateToSection && (
                <button
                  onClick={() => onNavigateToSection(activeTerm.id, activeTerm.term)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors shadow-sm shrink-0"
                >
                  <span>Read In Context</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Related Terms */}
            {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  Related Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTerm.relatedTerms.map((relId) => {
                    const rel = GLOSSARY_TERMS.find((t) => t.id === relId);
                    if (!rel) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => {
                          setActiveTermId(rel.id);
                          recordGlossaryTermView(rel.id);
                        }}
                        className="text-[11px] bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors font-medium"
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

      {/* MODE 2: CARD DIRECTORY VIEW WITH INLINE EXPANSION & FULL MOBILE DEFINITIONS */}
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
                className={`bg-slate-900 border rounded-2xl p-6 space-y-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl bg-slate-850'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850/50'
                }`}
              >
                <div className="space-y-3">
                  {/* Category and View Status */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      {term.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {isViewed ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Explored</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px] font-mono">Unread</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalTerm(term);
                          recordGlossaryTermView(term.id);
                        }}
                        className="text-slate-400 hover:text-cyan-300 p-1 rounded hover:bg-slate-800"
                        title="Open in Full Mobile/Desktop Sheet"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Term Title & Acronym */}
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-baseline gap-2">
                      <span>{term.term}</span>
                      {term.acronym && (
                        <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {term.acronym}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">
                      {term.shortDefinition}
                    </p>
                  </div>

                  {/* Full Definition with Toggle */}
                  <div className="space-y-2">
                    <div className={`text-xs text-slate-400 leading-relaxed ${isExpanded ? 'whitespace-pre-line text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80' : 'line-clamp-3'}`}>
                      {term.fullDefinition}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpanded(term.id);
                        }}
                        className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Collapse definition' : 'Read full explanation'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalTerm(term);
                          recordGlossaryTermView(term.id);
                        }}
                        className="text-[10px] font-mono text-slate-400 hover:text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        <span>Focused Sheet</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content: Playbook Context, Snippet & Related Terms */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Enforcement Context:</span>
                        <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                          {term.playbookContext}
                        </p>
                      </div>

                      {term.exampleSnippet && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">Rules &amp; Code:</span>
                          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[10px] text-cyan-300 overflow-x-auto leading-relaxed max-h-48">
                            <code>{term.exampleSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">Related Primitives:</span>
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
                                  className="text-[10px] bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 px-2 py-0.5 rounded transition-colors"
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

                {/* Footer Meta & Action Links */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-slate-400 line-clamp-1 max-w-[180px]">
                    {term.playbookSection}
                  </span>

                  {onNavigateToSection && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToSection(term.id, term.term);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 shrink-0 ml-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors"
                    >
                      <span>Read in Context</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL GLOSSARY EXPLANATION MODAL / MOBILE BOTTOM SHEET */}
      {modalTerm && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setModalTerm(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 w-full sm:max-w-2xl max-h-[88vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/95 sticky top-0 z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                    {modalTerm.category}
                  </span>
                  {modalTerm.acronym && (
                    <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {modalTerm.acronym}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {modalTerm.term}
                </h2>
              </div>
              <button
                onClick={() => setModalTerm(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-200">
              {/* Short definition callout */}
              <div className="p-4 bg-cyan-950/30 rounded-xl border border-cyan-800/40 text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed">
                {modalTerm.shortDefinition}
              </div>

              {/* Full Unabridged Definition */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                  Full Architectural Explanation &amp; Citations:
                </span>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-line space-y-3">
                  {modalTerm.fullDefinition}
                </div>
              </div>

              {/* Example rules / Code snippet if present */}
              {modalTerm.exampleSnippet && (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                    Rules Representation &amp; Code:
                  </span>
                  <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{modalTerm.exampleSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Enclave Implementation Context */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
                  Enforcement &amp; Playbook Context:
                </span>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {modalTerm.playbookContext}
                </p>
              </div>

              {/* Related terms */}
              {modalTerm.relatedTerms && modalTerm.relatedTerms.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">
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
                          className="text-xs bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                        >
                          <span>{rel.term}</span>
                          <ArrowRight className="w-3 h-3 text-cyan-500" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                <span className="text-slate-500">Playbook reference:</span>{' '}
                <strong className="text-slate-200">{modalTerm.playbookSection}</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setModalTerm(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Close
                </button>

                {onNavigateToSection && (
                  <button
                    onClick={() => {
                      setModalTerm(null);
                      onNavigateToSection(modalTerm.id, modalTerm.term);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Read In Context in Playbook</span>
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
