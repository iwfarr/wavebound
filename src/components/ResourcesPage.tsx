import React, { useState } from 'react';
import { COMPREHENSIVE_RESOURCES } from '../data/resourcesData';
import { ProcurementReadinessHub } from './ProcurementReadinessHub';
import {
  ExternalLink,
  Search,
  BookOpen,
  AlertTriangle,
  Calculator,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface ResourcesPageProps {
  initialSearchQuery?: string;
  initialView?: 'compendium' | 'procurement';
  onNavigateToGovernAssure?: () => void;
  onNavigateToSDCHub?: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  initialSearchQuery = '',
  initialView = 'compendium',
  onNavigateToGovernAssure,
  onNavigateToSDCHub
}) => {
  const [activeView, setActiveView] = useState<'compendium' | 'procurement'>(initialView);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Statutory Legislation & Regulatory Guidance',
    'International Standards (ISO) & Clinical Safety (DCB)',
    'Statistical Disclosure Control (SDC) & Airlocks',
    'NHS Information Governance & Security Toolkits',
    'AI Governance, Alignment & MCP Security',
    'Policy-as-Code, IAM & Fine-Grained Access Control'
  ];

  const filteredResources = COMPREHENSIVE_RESOURCES.filter((res) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.playbookRelevance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenSDCGate = () => {
    if (onNavigateToSDCHub) {
      onNavigateToSDCHub();
    } else if (onNavigateToGovernAssure) {
      onNavigateToGovernAssure();
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Clean Dark Navy Card */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-white">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Pillar 2 · Shared Reading Library &amp; External References</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              Further Resources &amp; Official Standards
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Explore the laws, public guidance, and technical specifications behind safe health data environments—bringing UK statutes, SATRE, Statbarn, DataSHIELD, RO-Crate, and European Health Data Space resources together in one place.
            </p>
            {(onNavigateToSDCHub || onNavigateToGovernAssure) && (
              <div className="pt-1">
                <button
                  onClick={handleOpenSDCGate}
                  className="text-sm text-cyan-300 hover:text-white underline font-semibold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Open Quantitative SDC Gate in Simulators &amp; Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-[#07192f]/90 border border-cyan-800/50 rounded-xl p-4 sm:p-5 space-y-2.5 text-sm">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                Compendium Coverage
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 tabular-nums">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                {COMPREHENSIVE_RESOURCES.length} Sources
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Primary Statutory &amp; Standards Bodies</strong>
              UK Parliament, ONS, UKSA, DSA, W3C, DARE UK, MHRA &amp; EU EHDS
            </p>
          </div>
        </div>
      </div>

      {/* View Switcher: Further Resources Compendium vs SATRE Procurement Matrix + Link to SDC Gate in Simulators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0c2340] rounded-xl border border-cyan-900/50 w-full sm:w-auto">
          <button
            onClick={() => setActiveView('compendium')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeView === 'compendium'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#07192f]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Further Resources Library ({COMPREHENSIVE_RESOURCES.length})</span>
          </button>

          <button
            onClick={() => setActiveView('procurement')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeView === 'procurement'
                ? 'bg-[#00A389] text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#07192f]'
            }`}
          >
            <Award className="w-4 h-4 text-teal-400" />
            <span>SATRE &amp; Procurement Matrix</span>
          </button>
        </div>

        {(onNavigateToSDCHub || onNavigateToGovernAssure) && (
          <button
            onClick={handleOpenSDCGate}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#123154] text-cyan-200 border border-cyan-800/70 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            title="Open the comprehensive Quantitative SDC Math & Airlock Governance Gate inside Simulators & Lab"
          >
            <Calculator className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Quantitative SDC &amp; Airlock Gate (Simulators &amp; Lab)</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          </button>
        )}
      </div>

      {/* Conditionally Render Procurement Matrix or Compendium */}
      {activeView === 'procurement' ? (
        <ProcurementReadinessHub />
      ) : (
        <>
          {/* Architectural Governance Precedent Highlight Callout */}
          <div className="p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2.5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Standardised Evidence &amp; Policy Enforcement in Safe Settings</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-amber-100 leading-relaxed">
              In historical security assessments, reliance on manual paperwork audits and unenforced static policies introduces compliance blind spots.
              <strong> Policy-as-Code provides automated decision-support</strong> by encoding authorization directly into zero-trust admission controllers and deterministic OPA Rego rules. If institutional accreditation, annual IG training, or safe setting zero-egress checks fail, access requests are flagged before researchers access the analytical enclave.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search external resources by keyword, law, or author (e.g. Section 251, DSA, ATRS, CSVW, StatBarn, DSPT, MCP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c2340] border border-cyan-900/60 rounded-xl pl-10 pr-12 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00A389] text-white font-bold shadow-sm'
                      : 'bg-[#0c2340] text-slate-300 hover:text-white hover:bg-[#07192f] border border-cyan-900/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Cards Grid */}
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-slate-300 px-1 font-medium tabular-nums">
              Showing {filteredResources.length} of {COMPREHENSIVE_RESOURCES.length} resources
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 sm:p-6 rounded-xl bg-[#0c2340] border border-cyan-900/60 hover:border-cyan-500/60 transition-all flex flex-col justify-between space-y-4 shadow-md text-white h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-mono text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 font-semibold">
                        {res.organization}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {res.isStatutory && (
                          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            Statutory Act
                          </span>
                        )}
                        {res.isCaseStudy && (
                          <span className="text-xs font-bold text-purple-900 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                            Governance Baseline
                          </span>
                        )}
                        {res.isAdvisoryGuidance && (
                          <span className="text-xs font-bold text-sky-200 bg-sky-950/70 px-2 py-0.5 rounded border border-sky-700/70">
                            Open Interoperability Guidance
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-cyan-300 text-base sm:text-lg flex items-start justify-between gap-2 group transition-colors"
                    >
                      <span className="leading-snug">{res.title}</span>
                      <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:text-cyan-200 shrink-0 mt-1 transition-colors" />
                    </a>

                    <p className="text-sm text-slate-200 leading-relaxed">
                      {res.shortDesc}
                    </p>

                    {res.citation && (
                      <div className="text-xs font-mono text-cyan-200 bg-[#07192f] p-2.5 rounded border border-cyan-900/60">
                        {res.citation}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-cyan-900/40 space-y-2.5">
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300 font-semibold">Playbook Mapping:</strong> {res.playbookRelevance}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {res.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-cyan-200 bg-[#07192f] px-2 py-0.5 rounded border border-cyan-900/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
