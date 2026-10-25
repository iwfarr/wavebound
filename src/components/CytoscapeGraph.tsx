import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { GRAPH_ELEMENTS, GRAPH_EDGES, GraphNodeData } from '../data/graphData';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Search,
  Filter,
  FileCode,
  Layers,
  BookOpen,
  Info,
  ExternalLink,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react';

export type GraphLayoutType = 'preset' | 'breadthfirst' | 'concentric' | 'cose';

const LAYOUT_GUIDES: Record<GraphLayoutType, { title: string; rationale: string; bestFor: string }> = {
  preset: {
    title: 'Pipeline DAG (Tiered Flow — Recommended)',
    rationale: 'Mathematically ordered 4-tier compilation architecture (Policy → SHACL Shapes → OPA Rego → W3C PROV-O) with guaranteed zero node overlapping.',
    bestFor: 'Visualizing how abstract clinical governance compiles directly into sub-millisecond Kubernetes admission and airlock gatekeepers.'
  },
  breadthfirst: {
    title: 'Hierarchical Tree',
    rationale: 'Top-down directed acyclic graph (DAG) rooted at Five Safes governance policies, fanning out into leaf validation shapes and rules.',
    bestFor: 'Tracing parent-to-child policy cascades and understanding which shapes enforce which governance charter.'
  },
  concentric: {
    title: 'Enforcement Rings (Orbital)',
    rationale: 'Radial defense-in-depth geometry placing core governance at the center nucleus with validation shapes and runtime PEPs in outer orbital shells.',
    bestFor: 'Evaluating architectural blast radius and verifying that core clinical safety sits at the gravitational center of the system.'
  },
  cose: {
    title: 'Force-Directed (Physics Spring)',
    rationale: 'Organic physics simulation that pulls tightly coupled nodes together while pushing unrelated components apart.',
    bestFor: 'Discovering hidden cross-cutting dependencies, shared shape references, and high-density rule clusters.'
  }
};

interface CytoscapeGraphProps {
  onNavigateToGlossaryTerm?: (termId: string) => void;
  onNavigateToConcept?: (conceptId: string) => void;
  onNavigateToSandbox?: () => void;
}

export const CytoscapeGraph: React.FC<CytoscapeGraphProps> = ({
  onNavigateToGlossaryTerm,
  onNavigateToConcept,
  onNavigateToSandbox
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(
    GRAPH_ELEMENTS[0].data // Default to first node so definition is visible immediately!
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayout, setSelectedLayout] = useState<GraphLayoutType>('preset');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState(false);

  const tiers = ['All', 'Policy Layer', 'SHACL Constraint Layer', 'OPA Rego Layer', 'Audit Layer'];

  // Initialize and update Cytoscape canvas
  useEffect(() => {
    if (!containerRef.current) return;

    // Filter elements based on selected tier
    const filteredNodes = GRAPH_ELEMENTS.filter((node) => {
      if (selectedTier === 'All') return true;
      return node.data.tier === selectedTier;
    });

    const activeNodeIds = new Set(filteredNodes.map((n) => n.data.id));

    const filteredEdges = GRAPH_EDGES.filter((edge) => {
      return activeNodeIds.has(edge.data.source) && activeNodeIds.has(edge.data.target);
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...filteredNodes, ...filteredEdges],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            color: '#f8fafc',
            'font-size': '10px',
            'font-family': 'JetBrains Mono, monospace',
            'font-weight': 600,
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': '#0284c7',
            width: 36,
            height: 36,
            'border-width': 2,
            'border-color': '#38bdf8',
            'overlay-padding': 6
          }
        },
        // Styling by Tier
        {
          selector: 'node[tier = "Policy Layer"]',
          style: {
            'background-color': '#06b6d4',
            'border-color': '#67e8f9',
            shape: 'round-rectangle',
            width: 44,
            height: 34
          }
        },
        {
          selector: 'node[tier = "SHACL Constraint Layer"]',
          style: {
            'background-color': '#8b5cf6',
            'border-color': '#c4b5fd',
            shape: 'diamond',
            width: 42,
            height: 42
          }
        },
        {
          selector: 'node[tier = "OPA Rego Layer"]',
          style: {
            'background-color': '#10b981',
            'border-color': '#6ee7b7',
            shape: 'rectangle',
            width: 44,
            height: 32
          }
        },
        {
          selector: 'node[tier = "Audit Layer"]',
          style: {
            'background-color': '#f59e0b',
            'border-color': '#fcd34d',
            shape: 'ellipse',
            width: 38,
            height: 38
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2.5,
            'line-color': '#475569',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(relationship)',
            'font-size': '8px',
            color: '#94a3b8',
            'text-rotation': 'autorotate',
            'text-margin-y': -7
          }
        },
        {
          selector: ':selected',
          style: {
            'border-width': 4,
            'border-color': '#f59e0b',
            'line-color': '#38bdf8',
            'target-arrow-color': '#38bdf8'
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-width': 4,
            'border-color': '#f59e0b',
            'background-color': '#d97706',
            opacity: 1
          }
        },
        {
          selector: '.faded',
          style: {
            opacity: 0.25
          }
        }
      ],
      layout: (() => {
        if (selectedLayout === 'preset') {
          return {
            name: 'preset',
            fit: true,
            padding: 50,
            animate: true,
            animationDuration: 300
          };
        }
        if (selectedLayout === 'breadthfirst') {
          const roots = filteredNodes
            .filter((n) => n.data.tier === 'Policy Layer')
            .map((n) => '#' + n.data.id);
          return {
            name: 'breadthfirst',
            directed: true,
            roots: roots.length > 0 ? roots : undefined,
            spacingFactor: 1.8,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            padding: 50,
            animate: true,
            animationDuration: 400
          };
        }
        if (selectedLayout === 'concentric') {
          return {
            name: 'concentric',
            concentric: (node: any) => {
              const tier = node.data('tier');
              if (tier === 'Policy Layer') return 4;
              if (tier === 'SHACL Constraint Layer') return 3;
              if (tier === 'OPA Rego Layer') return 2;
              return 1;
            },
            levelWidth: () => 1,
            padding: 50,
            avoidOverlap: true,
            animate: true,
            animationDuration: 400
          };
        }
        return {
          name: 'cose',
          animate: false,
          randomize: false,
          componentSpacing: 100,
          nodeOverlap: 20,
          nodeRepulsion: 400000,
          padding: 50
        };
      })() as any
    });

    // Tap node handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const data = node.data() as GraphNodeData;
      setSelectedNode(data);

      cy.elements().removeClass('highlighted faded');
      node.addClass('highlighted');
      node.neighborhood().removeClass('faded');
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        // Do not clear node completely; keep current for easy reading
        cy.elements().removeClass('highlighted faded');
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [selectedTier, selectedLayout]);

  // Handle Search Filter
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    if (!searchQuery.trim()) {
      cy.elements().removeClass('highlighted faded');
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const matchedNodes = cy.nodes().filter((node) => {
      const label = (node.data('label') || '').toLowerCase();
      const title = (node.data('title') || '').toLowerCase();
      const desc = (node.data('description') || '').toLowerCase();
      return label.includes(query) || title.includes(query) || desc.includes(query);
    });

    if (matchedNodes.length > 0) {
      cy.elements().addClass('faded');
      matchedNodes.removeClass('faded').addClass('highlighted');
      matchedNodes.neighborhood().removeClass('faded');
      cy.fit(matchedNodes, 80);
      setSelectedNode(matchedNodes[0].data());
    }
  }, [searchQuery]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 40);
  const handleReset = () => {
    setSearchQuery('');
    setSelectedTier('All');
    cyRef.current?.elements().removeClass('highlighted faded');
    cyRef.current?.layout({ name: selectedLayout, animate: true }).run();
    cyRef.current?.fit(undefined, 40);
  };

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header and Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Governance Atlas Architecture Visualization</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Policy-to-Code Enforcement Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Visual map illustrating how clinical governance policies formalize into closed-world SHACL shapes
              and compile into production OPA Rego rules for runtime enforcement. Click any node to reveal its complete definition and code.
            </p>
          </div>

          {/* Quick Layout & Tier Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="space-y-1 text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Graph Layout</span>
              <select
                value={selectedLayout}
                onChange={(e) => setSelectedLayout(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                <option value="preset">Pipeline DAG (Tiered Flow — Recommended)</option>
                <option value="breadthfirst">Hierarchical Tree (Top-Down)</option>
                <option value="concentric">Enforcement Rings (Orbital)</option>
                <option value="cose">Force-Directed (Physics Spring)</option>
              </select>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Filter Tier</span>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
              >
                {tiers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar inside Graph Header */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search policies, SHACL shapes, OPA rules (e.g. SafePerson, SDC, Rego)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleFit}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300"
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Layout Strategy Explanation Banner */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-950/70 border border-cyan-900/40 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                Layout Strategy Guide: {LAYOUT_GUIDES[selectedLayout].title}
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {LAYOUT_GUIDES[selectedLayout].rationale}
            </p>
          </div>
          <div className="text-[11px] text-slate-400 shrink-0 sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3 max-w-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Primary Use Case</span>
            <span className="text-slate-200 font-medium">{LAYOUT_GUIDES[selectedLayout].bestFor}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas and Node Inspector Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Canvas Container */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden h-[660px] shadow-inner">
          <div ref={containerRef} className="w-full h-full" />

          {/* Interactive Tier Legend in bottom-left corner */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-3 text-[11px] space-y-1.5 z-10 pointer-events-none">
            <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
              Enforcement Pipeline Tiers
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" /> Policy Layer (OWL 2)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rotate-45 bg-purple-400 inline-block" /> SHACL Constraint Layer
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" /> OPA Rego Layer
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Audit Lineage
              </span>
            </div>
          </div>
        </div>

        {/* Node Inspector & Definition Pane */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <FileCode className="w-4 h-4" />
              <span>Node Definition & Enforcement Spec</span>
            </div>
            {selectedNode && (
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                {selectedNode.tier}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400">{selectedNode.label}</div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {selectedNode.description}
                </p>
              </div>

              {/* Full Technical Definition */}
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider block">
                  Detailed Governance & Technical Definition
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedNode.fullDefinition}
                </p>
              </div>

              {/* Source File Location */}
              <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold text-[11px]">Source File</span>
                <span className="font-mono text-cyan-300 text-[11px]">{selectedNode.sourceFile}</span>
              </div>

              {/* Code Snippet */}
              {selectedNode.codeSnippet && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold uppercase text-[10px] tracking-wider">
                      Policy / Code Implementation
                    </span>
                    <button
                      onClick={() => handleCopySnippet(selectedNode.codeSnippet!)}
                      className="text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-44 shadow-inner">
                    <code>{selectedNode.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Direct Navigation Links to Associated Content */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Navigate to Associated Content
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedNode.glossaryTermId && onNavigateToGlossaryTerm && (
                    <button
                      onClick={() => onNavigateToGlossaryTerm(selectedNode.glossaryTermId!)}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open in Glossary</span>
                    </button>
                  )}

                  {selectedNode.conceptModuleId && onNavigateToConcept && (
                    <button
                      onClick={() => onNavigateToConcept(selectedNode.conceptModuleId!)}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-purple-200 font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Deep Dive Module</span>
                    </button>
                  )}

                  {onNavigateToSandbox && (
                    <button
                      onClick={onNavigateToSandbox}
                      className="sm:col-span-2 py-2 px-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 hover:text-cyan-100 font-medium flex items-center justify-center gap-1.5 transition-colors border border-cyan-800/70"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Test Node in Policy Sandbox (PEP/PDP)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-3">
              <Info className="w-8 h-8 mx-auto text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-300">Select Any Node</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click any policy, SHACL shape, or OPA rule on the canvas to display its formal definition and navigate to associated content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
