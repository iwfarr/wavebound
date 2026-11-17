/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WaveboundLogo } from './WaveboundLogo';
import { AirGapArchitectureHub } from './AirGapArchitectureHub';
import { LeastPrivilegeEnclaveHub } from './LeastPrivilegeEnclaveHub';
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
  BookOpen,
  Filter,
  CheckCircle2,
  Lock,
  WifiOff
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
  // Sub-workspace Navigation: Semantic Ontology & SHACL (Primary) vs Manifests vs Air-Gap Reference
  const [workspaceTab, setWorkspaceTab] = useState<'ontology' | 'manifests' | 'airgap'>('ontology');

  // Navigation & selection state
  const [selectedClassId, setSelectedClassId] = useState<string>(ONTOLOGY_CLASSES[0].id);
  const [activeCodeFormat, setActiveCodeFormat] = useState<'jsonld' | 'shacl' | 'rego'>('jsonld');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [namespaceFilter, setNamespaceFilter] = useState<'ALL' | 'tre' | 'sdc' | 'agent' | 'caldicott' | 'prov'>('ALL');
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. EDITORIAL HEADER & PROCUREMENT BASELINE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#005EB8] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Phases 4 &amp; 5: Air-Gapped Mirrors &amp; Least-Privilege Enclave Manifests</span>
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              Zero-Egress · Audit-and-Alert · Namespaced RBAC · SHACL Shapes
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Developer Documentation &amp; Enterprise Governance Topology
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered for patient and population safe and secure data and intelligence environments. Rather than re-architecting infrastructure from scratch, this workspace demonstrates how to apply graph-navigated, audited Information Governance (IG)—coupling formal W3C RDF/OWL ontologies, closed-world SHACL shapes, and microsecond OPA Rego policies to existing enclaves.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            {onNavigateToImplementation && (
              <button
                onClick={onNavigateToImplementation}
                className="px-4 py-2 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Server className="w-3.5 h-3.5" />
                <span>16-Week Implementation Track</span>
              </button>
            )}
            {onNavigateToGovernAssure && (
              <button
                onClick={onNavigateToGovernAssure}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>View Compliance Dossier Evaluator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Architectural Realities Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 items-stretch">
          <button
            onClick={() => setWorkspaceTab('ontology')}
            className={`h-full flex flex-col justify-start p-4 rounded-lg text-left transition-all border cursor-pointer ${
              workspaceTab === 'ontology'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 ring-1 ring-amber-600'
                : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Decoupled IG Tags</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Decoupled from volatile EHR/SNOMED schemas; scoped to Caldicott 1–8 and S251 under closed-world logic.
            </p>
          </button>

          <button
            onClick={() => setWorkspaceTab('manifests')}
            className={`h-full flex flex-col justify-start p-4 rounded-lg text-left transition-all border cursor-pointer ${
              workspaceTab === 'manifests'
                ? 'bg-sky-50 dark:bg-sky-950/40 border-[#005EB8] ring-1 ring-[#005EB8]'
                : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#005EB8]" />
                <span>Workload Isolation</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              No cluster-admin rights; operates within restricted namespaces with audit-and-alert controllers.
            </p>
          </button>

          <button
            onClick={() => setWorkspaceTab('manifests')}
            className={`h-full flex flex-col justify-start p-4 rounded-lg text-left transition-all border cursor-pointer ${
              workspaceTab === 'manifests'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 ring-1 ring-purple-600'
                : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-purple-600" />
                <span>Direct Analytics Plane</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Heavy queries (DuckDB/PostgreSQL) bypass userspace Envoy proxies to eliminate TCP pool exhaustion.
            </p>
          </button>

          <button
            onClick={() => setWorkspaceTab('airgap')}
            className={`h-full flex flex-col justify-start p-4 rounded-lg text-left transition-all border cursor-pointer ${
              workspaceTab === 'airgap'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#047857] ring-1 ring-[#047857]'
                : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5">
                <WifiOff className="w-4 h-4 text-[#047857]" />
                <span>Air-Gap Reference</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Internal CRAN, PyPI, and Harbor mirrors with 4-stage diode for locked-down clinical infrastructure.
            </p>
          </button>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS (ONTOLOGY & SHACL FIRST) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1">
          <button
            onClick={() => setWorkspaceTab('ontology')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              workspaceTab === 'ontology'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Semantic Graph Ontology &amp; SHACL Shapes</span>
          </button>
          <button
            onClick={() => setWorkspaceTab('manifests')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              workspaceTab === 'manifests'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Least-Privilege Kubernetes Manifests &amp; Admission-and-Alert</span>
          </button>
          <button
            onClick={() => setWorkspaceTab('airgap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              workspaceTab === 'airgap'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Air-Gapped Package Ingestion (Reference)</span>
          </button>
        </div>

        <span className="text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
          Enclave Mode: <strong className="text-[#047857] dark:text-emerald-400">Zero-Egress Airlocked</strong>
        </span>
      </div>

      {/* AIR-GAPPED PACKAGE MIRROR ARCHITECTURE (PHASE 4) */}
      {workspaceTab === 'airgap' && <AirGapArchitectureHub />}

      {/* 2. THREE-COLUMN ONTOLOGY EXPLORER */}
      {workspaceTab === 'ontology' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Statutory Data Dictionary</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Semantic Graph Ontology Explorer
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Target Format:</span>
            {(['jsonld', 'shacl', 'rego'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveCodeFormat(fmt)}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  activeCodeFormat === fmt
                    ? 'bg-[#005EB8] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                {fmt === 'jsonld' ? 'JSON-LD' : fmt === 'shacl' ? 'SHACL' : 'OPA Rego'}
              </button>
            ))}
          </div>
        </div>

        {/* The 3-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: LEFT NAVIGATION & CLASS SELECTOR (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#005EB8]"
              />
            </div>

            {/* Namespace Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {(['ALL', 'tre', 'sdc', 'agent', 'caldicott', 'prov'] as const).map((ns) => (
                <button
                  key={ns}
                  onClick={() => setNamespaceFilter(ns)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    namespaceFilter === ns
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {ns}
                </button>
              ))}
            </div>

            {/* Class Items List */}
            <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
              {filteredClasses.map((cls) => {
                const isSelected = cls.id === selectedClassId;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-[#005EB8] text-slate-900 dark:text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-xs sm:text-sm">{cls.label}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                        {cls.namespace}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">{cls.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: CENTER CONCEPT & ATTRIBUTE DICTIONARY (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400">{selectedClass.label}</span>
                {selectedClass.subClassOf && (
                  <span className="text-xs font-mono text-slate-500">
                    &sube; {selectedClass.subClassOf}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedClass.name} Entity</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">{selectedClass.description}</p>
            </div>

            {/* Properties & Cardinality Table */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Class Properties &amp; Constraints:
              </span>

              <div className="space-y-2">
                {selectedClass.properties.map((prop, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-[#005EB8] dark:text-sky-300 text-xs sm:text-sm font-semibold">{prop.name}</span>
                      <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums">
                        <span className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                          {prop.type}
                        </span>
                        {prop.cardinality && (
                          <span className="text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                            [{prop.cardinality}]
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{prop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: RIGHT DARK TERMINAL CODE & SNIPPET VIEWER (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#005EB8] dark:text-sky-400" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {activeCodeFormat === 'jsonld' ? 'JSON-LD Schema' : activeCodeFormat === 'shacl' ? 'SHACL Validation Shape' : 'OPA Rego Policy'}
                </span>
              </div>

              <button
                onClick={() => handleCopy(`class-code-${selectedClass.id}-${activeCodeFormat}`, getActiveCode())}
                className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedId === `class-code-${selectedClass.id}-${activeCodeFormat}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#047857]" />
                    <span className="text-[#047857] font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Scoped Dark Terminal Mode Container for Code Viewing */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-md">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-200">{selectedClass.id}.{getCodeLanguage()}</span>
                <span className="text-xs text-slate-400 uppercase">Deterministic Target</span>
              </div>
              <pre className="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[480px]">
                <code>{getActiveCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 3. LEAST-PRIVILEGE ENCLAVE HUBS & ARCHITECTURAL MANIFESTS (PHASE 5) */}
      {workspaceTab === 'manifests' && (
        <div className="space-y-8">
          <LeastPrivilegeEnclaveHub />

          {/* Reference Architectural Manifests Library */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  <span>Deployment Endpoints Library</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Reference Manifests &amp; Operational Configurations
                </h3>
              </div>

              <span className="text-xs text-slate-500 font-mono">
                Static Reference Templates
              </span>
            </div>

            {/* Snippet Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {DEPLOYMENT_ENDPOINTS.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => setSelectedSnippetId(snippet.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSnippetId === snippet.id
                      ? 'bg-[#005EB8] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{snippet.title.split('(')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Snippet Display */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedSnippet.title}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[#005EB8] dark:text-sky-400 border border-slate-200 dark:border-slate-700">
                      {selectedSnippet.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono block">
                    Target Manifest: {selectedSnippet.runtimeLocation}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(`snippet-${selectedSnippet.id}`, selectedSnippet.code)}
                  className="px-3.5 py-2 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  {copiedId === `snippet-${selectedSnippet.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Manifest Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Configuration</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedSnippet.summary}</p>

              {/* Scoped Dark Terminal View for Manifests */}
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{selectedSnippet.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
