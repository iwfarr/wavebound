/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SeawaterLogo } from './SeawaterLogo';
import {
  ONTOLOGY_CLASSES,
  DEPLOYMENT_ENDPOINTS,
  OntologyClassItem,
  DeploymentEndpointSnippet
} from '../data/buildDeployData';
import {
  Code2,
  Terminal,
  Layers,
  Search,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Database,
  Server,
  ShieldCheck,
  Cpu,
  FileCode,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface BuildDeployWorkspaceProps {
  onNavigateToGovernAssure?: () => void;
  onNavigateToImplementation?: () => void;
  onNavigateToGraph?: () => void;
  onNavigateToSandbox?: () => void;
}

export const BuildDeployWorkspace: React.FC<BuildDeployWorkspaceProps> = ({
  onNavigateToGovernAssure,
  onNavigateToImplementation,
  onNavigateToGraph,
  onNavigateToSandbox
}) => {
  // Navigation & selection state
  const [selectedClassId, setSelectedClassId] = useState<string>(ONTOLOGY_CLASSES[0].id);
  const [activeCodeFormat, setActiveCodeFormat] = useState<'jsonld' | 'shacl' | 'rego'>('jsonld');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [namespaceFilter, setNamespaceFilter] = useState<'ALL' | 'tre' | 'sdc' | 'agent'>('ALL');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(DEPLOYMENT_ENDPOINTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedClass = ONTOLOGY_CLASSES.find((c) => c.id === selectedClassId) || ONTOLOGY_CLASSES[0];
  const selectedSnippet = DEPLOYMENT_ENDPOINTS.find((s) => s.id === selectedSnippetId) || DEPLOYMENT_ENDPOINTS[0];

  const filteredClasses = ONTOLOGY_CLASSES.filter((c) => {
    const matchesNamespace = namespaceFilter === 'ALL' || c.namespace === namespaceFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNamespace && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getActiveCode = () => {
    if (activeCodeFormat === 'jsonld') return selectedClass.jsonLdSnippet;
    if (activeCodeFormat === 'shacl') return selectedClass.shaclShapeSnippet;
    return selectedClass.regoSnippet;
  };

  const getCodeLanguage = () => {
    if (activeCodeFormat === 'jsonld') return 'json';
    if (activeCodeFormat === 'shacl') return 'turtle';
    return 'rego';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* 1. HERO HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Phase 4: Build &amp; Deploy Workspace</span>
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              W3C OWL 2 · SHACL · OPA Rego · Kubernetes PEP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer Documentation &amp; Ontology Explorer
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Stripe-level developer ergonomics for technical architects and platform engineers. Explore semantic classes, inspect formal W3C RDF schemas, test real-time OPA Rego translations, and copy production Kubernetes admission manifests.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            {onNavigateToImplementation && (
              <button
                onClick={onNavigateToImplementation}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Server className="w-4 h-4" />
                <span>Open 16-Week Rollout Blueprint</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. STRIPE-STYLE THREE-COLUMN ONTOLOGY EXPLORER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              <Database className="w-4 h-4" />
              <span>Interactive Data Dictionary</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Semantic Graph Ontology Explorer
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Format:</span>
            {(['jsonld', 'shacl', 'rego'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveCodeFormat(fmt)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeCodeFormat === fmt
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {fmt === 'jsonld' ? 'JSON-LD' : fmt === 'shacl' ? 'SHACL' : 'OPA Rego'}
              </button>
            ))}
          </div>
        </div>

        {/* The 3-Column Stripe-Style Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: LEFT NAVIGATION & CLASS SELECTOR (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Namespace Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {(['ALL', 'tre', 'sdc', 'agent'] as const).map((ns) => (
                <button
                  key={ns}
                  onClick={() => setNamespaceFilter(ns)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    namespaceFilter === ns
                      ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ns}
                </button>
              ))}
            </div>

            {/* Class Items List */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredClasses.map((cls) => {
                const isSelected = cls.id === selectedClassId;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                        : 'bg-slate-950/80 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs">{cls.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {cls.namespace}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{cls.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: CENTER CONCEPT & ATTRIBUTE DICTIONARY (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedClass.label}</span>
                {selectedClass.subClassOf && (
                  <span className="text-[10px] font-mono text-slate-500">
                    &sube; {selectedClass.subClassOf}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">{selectedClass.name} Entity</h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">{selectedClass.description}</p>
            </div>

            {/* Properties & Cardinality Table */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Class Properties &amp; Constraints:
              </span>

              <div className="space-y-2">
                {selectedClass.properties.map((prop, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-300 text-xs font-semibold">{prop.name}</span>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="text-amber-400 bg-amber-950/60 px-1 rounded">{prop.type}</span>
                        {prop.cardinality && (
                          <span className="text-slate-400 bg-slate-950 px-1 rounded border border-slate-800">
                            [{prop.cardinality}]
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{prop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: RIGHT INTERACTIVE CODE & SNIPPET VIEWER (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  {activeCodeFormat === 'jsonld' ? 'JSON-LD Schema' : activeCodeFormat === 'shacl' ? 'SHACL Validation Shape' : 'OPA Rego Policy'}
                </span>
              </div>

              <button
                onClick={() => handleCopy(`class-code-${selectedClass.id}-${activeCodeFormat}`, getActiveCode())}
                className="px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === `class-code-${selectedClass.id}-${activeCodeFormat}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
              <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{selectedClass.id}.{getCodeLanguage()}</span>
                <span className="text-[10px] text-slate-500 uppercase">Deterministic Target</span>
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-[460px]">
                <code>{getActiveCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 3. COPY-PASTE DEPLOYMENT & INTEGRATION ENDPOINTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              <Server className="w-4 h-4" />
              <span>Production Enclave Manifests</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Deployment Endpoints &amp; PEP Integration Snippets
            </h2>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Zero-Downtime Infrastructure Glue
          </span>
        </div>

        {/* Snippet Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {DEPLOYMENT_ENDPOINTS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setSelectedSnippetId(snippet.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                selectedSnippetId === snippet.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{snippet.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Snippet Display */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{selectedSnippet.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                  {selectedSnippet.category}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                Target File: {selectedSnippet.runtimeLocation}
              </span>
            </div>

            <button
              onClick={() => handleCopy(`snippet-${selectedSnippet.id}`, selectedSnippet.code)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              {copiedId === `snippet-${selectedSnippet.id}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Manifest Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copy Configuration</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{selectedSnippet.summary}</p>

          <pre className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-sky-200 font-mono text-xs overflow-x-auto leading-relaxed">
            <code>{selectedSnippet.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
