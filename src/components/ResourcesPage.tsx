import React, { useState } from 'react';
import { COMPREHENSIVE_RESOURCES, ResourceItem } from '../data/resourcesData';
import {
  ExternalLink,
  Search,
  BookOpen,
  Scale,
  ShieldAlert,
  FileCheck2,
  Lock,
  Cpu,
  Bookmark,
  Sparkles,
  Tag,
  Building2,
  AlertTriangle
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Statutory Legislation & Regulatory Guidance',
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span>Statutory Compendium & External Architecture Specifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Authoritative Resources & Technical Guidelines
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Direct statutory legislation, NHS standards, SDC rulebooks, Model Context Protocol (MCP) specifications,
            and real-world security case studies supporting the Trusted Research Environment Policy-as-Code platform.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <span>Total Catalogued Resources: <strong className="text-white">{COMPREHENSIVE_RESOURCES.length}</strong></span>
            <span>·</span>
            <span>Primary Sources from UK Parliament, NHS, ONS, W3C, and CNCF</span>
          </div>
        </div>
      </div>

      {/* Real-World Cybersecurity Precedent Highlight Callout */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Why Automated Policy-as-Code Is Critical: Real-World Lessons</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
          In historical healthcare breaches (such as instances where legacy accounts protected only by &ldquo;Password1&rdquo; led to unauthorized extraction of sensitive patient and children&rsquo;s data), the root cause was relying on manual audits and unenforced static policies.
          <strong> Policy-as-Code fundamentally eliminates this vulnerability</strong> by encoding authorization directly into Kubernetes admission controllers and microsecond OPA Rego rules. If institutional accreditation, annual IG training, or enclave zero-egress checks fail, access is structurally blocked at the network perimeter.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search external resources by keyword, law, or author (e.g. Section 251, OpenSearch, StatBarn, Keycloak, DSPT, MCP)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-left ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="space-y-3">
        <div className="text-xs text-slate-400 px-1">
          Showing {filteredResources.length} of {COMPREHENSIVE_RESOURCES.length} resources
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                    {res.organization}
                  </span>
                  {res.isStatutory && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                      Statutory Act
                    </span>
                  )}
                  {res.isCaseStudy && (
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60">
                      Security Precedent
                    </span>
                  )}
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-100 hover:text-cyan-300 text-base flex items-start justify-between gap-2 group transition-colors"
                >
                  <span className="leading-snug">{res.title}</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-1 transition-colors" />
                </a>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {res.shortDesc}
                </p>

                {res.citation && (
                  <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                    {res.citation}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] text-slate-400 leading-snug">
                  <strong className="text-cyan-400">Playbook Mapping:</strong> {res.playbookRelevance}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800"
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
    </div>
  );
};
