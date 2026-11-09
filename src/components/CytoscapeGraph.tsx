import React, { useEffect, useRef, useState, useMemo } from 'react';
import cytoscape from 'cytoscape';
import {
  GraphLensType,
  LENS_DEFINITIONS,
  getElementsForLens,
  GraphNodeData,
  GRAPH_ELEMENTS
} from '../data/graphData';
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
  Copy,
  Scale,
  Server,
  Workflow,
  Users,
  Lock,
  Download,
  Play,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  Compass
} from 'lucide-react';

export type GraphLayoutType = 'preset' | 'breadthfirst' | 'concentric' | 'cose';

const LAYOUT_GUIDES: Record<GraphLayoutType, { title: string; rationale: string; bestFor: string }> = {
  preset: {
    title: 'Curated Flow DAG (Recommended)',
    rationale: 'Mathematically ordered flow layout with generous spatial clearance and guaranteed zero node overlap.',
    bestFor: 'Tracing clean linear progression from statutory inputs to technical enforcement and audit output.'
  },
  breadthfirst: {
    title: 'Hierarchical Tree',
    rationale: 'Top-down directed acyclic graph rooted at the primary gateway or root policy entity.',
    bestFor: 'Tracing parent-to-child inheritance and seeing how foundational principles branch into concrete rules.'
  },
  concentric: {
    title: 'Enforcement Rings (Orbital)',
    rationale: 'Radial defense-in-depth geometry placing core statutory anchors at the nucleus with runtime PEPs in outer orbits.',
    bestFor: 'Evaluating security blast radius and verifying that patient confidentiality sits at the core.'
  },
  cose: {
    title: 'Force-Directed (Physics Spring)',
    rationale: 'Physics simulation pulling coupled components together while pushing independent rules apart.',
    bestFor: 'Discovering shared dependencies and natural architectural clustering.'
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

  // Active Curated Lens
  const [activeLens, setActiveLens] = useState<GraphLensType>('statutory-policy');
  const [selectedLayout, setSelectedLayout] = useState<GraphLayoutType>('preset');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectorMode, setInspectorMode] = useState<'handbook' | 'technical'>('handbook');
  const [copiedCode, setCopiedCode] = useState(false);

  // Simulator State for In-Node Evaluation
  const [simulatorInputs, setSimulatorInputs] = useState<Record<string, any>>({});
  const [simulationResult, setSimulationResult] = useState<{ allowed: boolean; reason: string; ruleEvaluated: string } | null>(null);

  // Current elements based on active lens
  const currentLensData = useMemo(() => {
    return getElementsForLens(activeLens);
  }, [activeLens]);

  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(
    currentLensData.nodes[0]?.data || null
  );

  // When active lens changes, select first node of new lens
  useEffect(() => {
    if (currentLensData.nodes.length > 0) {
      const defaultNode = currentLensData.nodes[0].data;
      setSelectedNode(defaultNode);
      // Reset simulator inputs
      if (defaultNode.simulatorConfig) {
        const initial: Record<string, any> = {};
        defaultNode.simulatorConfig.fields.forEach((f) => {
          initial[f.key] = f.defaultVal;
        });
        setSimulatorInputs(initial);
        setSimulationResult(defaultNode.simulatorConfig.evaluate(initial));
      } else {
        setSimulatorInputs({});
        setSimulationResult(null);
      }
    }
  }, [activeLens, currentLensData]);

  // When selectedNode changes, reset simulator
  const handleSelectNode = (node: GraphNodeData) => {
    setSelectedNode(node);
    if (node.simulatorConfig) {
      const initial: Record<string, any> = {};
      node.simulatorConfig.fields.forEach((f) => {
        initial[f.key] = f.defaultVal;
      });
      setSimulatorInputs(initial);
      setSimulationResult(node.simulatorConfig.evaluate(initial));
    } else {
      setSimulatorInputs({});
      setSimulationResult(null);
    }
  };

  const handleSimulateFieldChange = (key: string, value: any) => {
    const updated = { ...simulatorInputs, [key]: value };
    setSimulatorInputs(updated);
    if (selectedNode?.simulatorConfig) {
      setSimulationResult(selectedNode.simulatorConfig.evaluate(updated));
    }
  };

  // Initialize and update Cytoscape canvas
  useEffect(() => {
    if (!containerRef.current) return;

    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const { nodes, edges } = currentLensData;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
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
            'text-margin-y': 7,
            'background-color': '#0c2340', // Deep Wavebound Navy
            width: 44,
            height: 44,
            'border-width': 2.5,
            'border-color': '#0284c7', // Turquoise / NHS Cyan
            'overlay-padding': 6,
            'text-background-color': '#071628',
            'text-background-opacity': 0.85,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle'
          }
        },
        // Styling by category
        {
          selector: 'node[category = "Policy"]',
          style: {
            'border-color': '#00a389', // Turquoise
            'background-color': '#0c2340',
            shape: 'round-rectangle',
            width: 48,
            height: 44
          }
        },
        {
          selector: 'node[category = "Shape"]',
          style: {
            'border-color': '#38bdf8', // Cyan
            'background-color': '#0f294a',
            shape: 'diamond',
            width: 46,
            height: 46
          }
        },
        {
          selector: 'node[category = "Rule"]',
          style: {
            'border-color': '#10b981', // Emerald
            'background-color': '#064e3b',
            shape: 'rectangle',
            width: 46,
            height: 42
          }
        },
        {
          selector: 'node[category = "Service"]',
          style: {
            'border-color': '#0284c7', // Sky Blue
            'background-color': '#0c2340',
            shape: 'round-rectangle',
            width: 48,
            height: 44
          }
        },
        {
          selector: 'node[category = "Enclave"]',
          style: {
            'border-color': '#6366f1', // Indigo
            'background-color': '#1e1b4b',
            shape: 'hexagon',
            width: 50,
            height: 48
          }
        },
        {
          selector: 'node[category = "DataAsset"]',
          style: {
            'border-color': '#06b6d4', // Bright Cyan
            'background-color': '#164e63',
            shape: 'ellipse',
            width: 46,
            height: 46
          }
        },
        {
          selector: 'node[category = "HumanRole"]',
          style: {
            'border-color': '#f59e0b', // Amber
            'background-color': '#451a03',
            shape: 'ellipse',
            width: 48,
            height: 48
          }
        },
        {
          selector: 'node[category = "Artifact"]',
          style: {
            'border-color': '#f43f5e', // Rose
            'background-color': '#4c0519',
            shape: 'diamond',
            width: 46,
            height: 46
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2.5,
            'line-color': '#1e293b',
            'target-arrow-color': '#0284c7',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '8px',
            color: '#94a3b8',
            'text-rotation': 'autorotate',
            'text-margin-y': -8,
            'text-background-color': '#071628',
            'text-background-opacity': 0.9,
            'text-background-padding': '2px',
            'arrow-scale': 1.15
          }
        },
        {
          selector: ':selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            'line-color': '#38bdf8',
            'target-arrow-color': '#38bdf8'
          }
        },
        {
          selector: '.highlighted',
          style: {
            'border-width': 4,
            'border-color': '#00a389',
            'background-color': '#0c2340',
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
          return {
            name: 'breadthfirst',
            directed: true,
            padding: 50,
            spacingFactor: 1.8,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            animate: true,
            animationDuration: 400
          };
        }
        if (selectedLayout === 'concentric') {
          return {
            name: 'concentric',
            padding: 50,
            spacingFactor: 2.0,
            minNodeSpacing: 60,
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
          nodeRepulsion: 500000,
          padding: 50
        };
      })() as any
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const data = node.data() as GraphNodeData;
      handleSelectNode(data);

      cy.elements().removeClass('highlighted faded');
      node.addClass('highlighted');
      node.neighborhood().removeClass('faded');
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
  }, [activeLens, selectedLayout, currentLensData]);

  // Handle Search Filtering
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
      const stat = (node.data('statutoryBasis') || '').toLowerCase();
      return label.includes(query) || title.includes(query) || desc.includes(query) || stat.includes(query);
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
    cyRef.current?.elements().removeClass('highlighted faded');
    cyRef.current?.layout({ name: selectedLayout, animate: true }).run();
    cyRef.current?.fit(undefined, 40);
  };

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExportLensTTL = () => {
    const turtleContent = `# W3C TURTLE RDF EXPORT: ${LENS_DEFINITIONS[activeLens].title.toUpperCase()}
# Generated by Project Wavebound Semantic Topology Hub
# Timestamp: ${new Date().toISOString()}

@prefix tre: <https://w3id.org/wavebound/ontology/tre#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

${currentLensData.nodes
  .map(
    (n) => `### ${n.data.title} (${n.data.label})
${n.data.rdfClassSnippet || n.data.shaclSnippet || `# Class: ${n.data.label}\n${n.data.label} a owl:Class ;\n    rdfs:label "${n.data.title}" ;\n    rdfs:comment "${n.data.description}" .`}
`
  )
  .join('\n')}
`;
    const blob = new Blob([turtleContent], { type: 'text/turtle' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wavebound_${activeLens}_ontology.ttl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Semantic Topology Graph &amp; Knowledge Lenses</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Graph-Navigated &amp; Audited Information Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore Wavebound&apos;s living knowledge graph across four curated perspectives. Trace how statutory healthcare mandates compile into W3C SHACL shapes, sub-millisecond OPA Rego gatekeepers, and immutable PROV-O audit commitments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportLensTTL}
              className="px-3.5 py-2 rounded-xl bg-[#0F294A] hover:bg-[#005EB8] text-cyan-200 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              title="Download Turtle RDF ontology for current lens"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Lens (.ttl)</span>
            </button>
            {onNavigateToSandbox && (
              <button
                onClick={onNavigateToSandbox}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>Open Policy Sandbox</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. CURATED LENS SELECTOR BAR */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Curated Knowledge Lens:</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Showing <strong className="text-white">{currentLensData.nodes.length}</strong> curated nodes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                id: 'statutory-policy' as GraphLensType,
                title: '1. Statutory & Policy Lens',
                badge: 'IG Handbook & Law',
                icon: <Scale className="w-4 h-4" />,
                nodes: 8
              },
              {
                id: 'cloud-fabric' as GraphLensType,
                title: '2. Cloud Fabric & PEP Lens',
                badge: 'Zero-Trust K8s',
                icon: <Server className="w-4 h-4" />,
                nodes: 7
              },
              {
                id: 'data-lifecycle' as GraphLensType,
                title: '3. Data Lifecycle & SDC Lens',
                badge: 'Flow & Airlock SDC',
                icon: <Workflow className="w-4 h-4" />,
                nodes: 6
              },
              {
                id: 'human-roles' as GraphLensType,
                title: '4. Human Roles & Oversight',
                badge: 'Caldicott & Ethics',
                icon: <Users className="w-4 h-4" />,
                nodes: 6
              }
            ].map((lens) => {
              const isActive = activeLens === lens.id;
              return (
                <button
                  key={lens.id}
                  onClick={() => setActiveLens(lens.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-[#0c2340] to-[#0f294a] border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg'
                      : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                      {lens.icon}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-cyan-300">
                      {lens.nodes} nodes
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {lens.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {lens.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ACTIVE LENS CONTEXT BANNER */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-800/60 font-bold">
                {LENS_DEFINITIONS[activeLens].badge}
              </span>
              <span className="text-white font-bold">{LENS_DEFINITIONS[activeLens].tagline}</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
              {LENS_DEFINITIONS[activeLens].description}
            </p>
          </div>
          <div className="sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3 max-w-xs text-[11px] text-slate-400">
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Audience Value</span>
            <span className="text-slate-300 font-medium">{LENS_DEFINITIONS[activeLens].rationale}</span>
          </div>
        </div>
      </div>

      {/* 4. CANVAS CONTROLS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0c2340] border border-slate-800 p-3 rounded-xl shadow-xs">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search active lens (e.g. SafePerson, SDC, NDOO, Envoy, Caldicott)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-[10px] font-mono text-slate-400">Layout:</span>
            <select
              value={selectedLayout}
              onChange={(e) => setSelectedLayout(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="preset">Curated Flow DAG (Recommended)</option>
              <option value="breadthfirst">Hierarchical Tree (Top-Down)</option>
              <option value="concentric">Enforcement Rings (Orbital)</option>
              <option value="cose">Force-Directed (Physics Spring)</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleFit}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 cursor-pointer"
              title="Fit to Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. MAIN GRAPH & DUAL-ANGLE INSPECTOR PANE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cytoscape Canvas Container */}
        <div className="lg:col-span-7 bg-[#071628] border border-cyan-950 rounded-2xl relative overflow-hidden h-[620px] shadow-2xl">
          <div ref={containerRef} className="w-full h-full" />

          {/* Topology Overlay Legend */}
          <div className="absolute bottom-3 left-3 bg-[#0c2340]/95 backdrop-blur border border-slate-800 rounded-xl p-3 text-[11px] space-y-1.5 z-10 pointer-events-none shadow-lg">
            <div className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Lens Topology Primitives</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0c2340] border border-[#00a389] inline-block" /> Policy / Statute
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#0f294a] border border-[#38bdf8] inline-block" /> SHACL Shape
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#064e3b] border border-[#10b981] inline-block" /> OPA Rego Rule
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#451a03] border border-[#f59e0b] inline-block" /> Human Oversight
              </span>
            </div>
          </div>
        </div>

        {/* DUAL-ANGLE NODE INSPECTOR */}
        <div className="lg:col-span-5 bg-[#0c2340] border border-cyan-900/50 rounded-2xl p-6 space-y-5 sticky top-6 shadow-2xl">
          {selectedNode ? (
            <div className="space-y-4">
              {/* Header with Dual-Angle Mode Toggle */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setInspectorMode('handbook')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'handbook'
                        ? 'bg-teal-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>IG Handbook Angle</span>
                  </button>
                  <button
                    onClick={() => setInspectorMode('technical')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'technical'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Runtime Angle</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-800/60 font-semibold shrink-0">
                  {selectedNode.tier}
                </span>
              </div>

              {/* Node Title & Identifier */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedNode.label}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {selectedNode.badge}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {selectedNode.title}
                </h2>
              </div>

              {/* ANGLE 1: IG HANDBOOK (Plain-English Governance & Citizen Assurance) */}
              {inspectorMode === 'handbook' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  {/* Summary Callout */}
                  <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <span className="text-cyan-300 font-bold uppercase text-[10px] tracking-wider block font-mono">
                      Governance Meaning &amp; Purpose
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Citizen Reassurance Box */}
                  <div className="p-3.5 bg-teal-950/30 rounded-xl border border-teal-500/30 flex items-start gap-2.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-teal-300 font-bold uppercase text-[10px] tracking-wider block font-mono">
                        Patient &amp; Citizen Safeguard Reassurance
                      </span>
                      <p className="text-teal-100 leading-relaxed">
                        {selectedNode.patientReassurance}
                      </p>
                    </div>
                  </div>

                  {/* Statutory Basis */}
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 flex items-start gap-2.5 text-xs">
                    <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block font-mono">
                        Statutory Mandate &amp; Citations
                      </span>
                      <p className="text-slate-300 font-medium">
                        {selectedNode.statutoryBasis}
                      </p>
                    </div>
                  </div>

                  {/* State Hash & Source File */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                    <div className="p-2 rounded bg-slate-950/40 border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase">Source File</span>
                      <span className="text-cyan-300 truncate block">{selectedNode.sourceFile}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/40 border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase">State Commitment</span>
                      <span className="text-slate-300 truncate block">{selectedNode.stateHash || 'sha256:7f83b165...'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ANGLE 2: DATA TECHNICAL (RDF/OWL, SHACL, Rego & PROV-O) */}
              {inspectorMode === 'technical' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  {/* Detailed Definition */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider block font-mono mb-1">
                      Technical Architecture Specification
                    </span>
                    {selectedNode.fullDefinition}
                  </div>

                  {/* Code Implementation Display */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="font-semibold uppercase text-[10px] tracking-wider text-cyan-300">
                        {selectedNode.shaclSnippet
                          ? 'W3C SHACL Shape Constraint'
                          : selectedNode.regoSnippet
                          ? 'OPA Rego Policy Rule'
                          : selectedNode.rdfClassSnippet
                          ? 'W3C OWL/RDF Ontology Class'
                          : 'Technical Implementation Snippet'}
                      </span>
                      <button
                        onClick={() =>
                          handleCopySnippet(
                            selectedNode.shaclSnippet ||
                              selectedNode.regoSnippet ||
                              selectedNode.rdfClassSnippet ||
                              selectedNode.codeSnippet ||
                              ''
                          )
                        }
                        className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-48 shadow-inner">
                      <code>
                        {selectedNode.shaclSnippet ||
                          selectedNode.regoSnippet ||
                          selectedNode.rdfClassSnippet ||
                          selectedNode.codeSnippet}
                      </code>
                    </pre>
                  </div>

                  {/* PROV-O Triple Trace if available */}
                  {selectedNode.provoSnippet && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        W3C PROV-O Audit Event Triple
                      </span>
                      <pre className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-amber-300 overflow-x-auto leading-relaxed">
                        <code>{selectedNode.provoSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* LIVE IN-NODE POLICY SIMULATOR (Sub-millisecond Rego Evaluator) */}
              {selectedNode.simulatorConfig && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-teal-400" />
                      <span>{selectedNode.simulatorConfig.inputLabel}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">&lt; 0.5ms PEP</span>
                  </div>

                  <div className="space-y-2">
                    {selectedNode.simulatorConfig.fields.map((field) => (
                      <div key={field.key} className="flex items-center justify-between text-xs text-slate-300">
                        <span>{field.label}:</span>
                        {field.type === 'boolean' && (
                          <button
                            onClick={() => handleSimulateFieldChange(field.key, !simulatorInputs[field.key])}
                            className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                              simulatorInputs[field.key]
                                ? 'bg-teal-500 text-slate-950'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {simulatorInputs[field.key] ? 'TRUE' : 'FALSE'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {simulationResult && (
                    <div
                      className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                        simulationResult.allowed
                          ? 'bg-teal-950/40 border-teal-500/40 text-teal-200'
                          : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[11px]">
                        <span className="flex items-center gap-1">
                          {simulationResult.allowed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          )}
                          <span>Decision: {simulationResult.allowed ? 'ALLOW' : 'DENY / BLOCKED'}</span>
                        </span>
                        <span className="font-mono text-[10px] opacity-75">{simulationResult.ruleEvaluated}</span>
                      </div>
                      <p className="text-[11px] leading-snug opacity-90">{simulationResult.reason}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Navigation Links */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                {selectedNode.glossaryTermId && onNavigateToGlossaryTerm ? (
                  <button
                    onClick={() => onNavigateToGlossaryTerm(selectedNode.glossaryTermId!)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View in Glossary</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 font-mono">Phase 9 Curated Lens</span>
                )}

                {selectedNode.conceptModuleId && onNavigateToConcept && (
                  <button
                    onClick={() => onNavigateToConcept(selectedNode.conceptModuleId!)}
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Concept Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-3">
              <Info className="w-8 h-8 mx-auto text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-300">Select Any Node</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click any policy, container, or airlock node on the canvas to inspect its dual-angle definition.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
