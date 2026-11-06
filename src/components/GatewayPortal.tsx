import React from 'react';
import { SeawaterLogo } from './SeawaterLogo';
import { ActiveTab } from './Header';
import {
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Scale,
  Database,
  Server,
  FileCheck2,
  Lock,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  CheckCircle2,
  Bot,
  Zap,
  Bookmark,
  BookOpen
} from 'lucide-react';

interface GatewayPortalProps {
  onSelectTab: (tab: ActiveTab) => void;
  onNavigateToConcept: (conceptId: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToGlossary: (termId: string) => void;
}

export const GatewayPortal: React.FC<GatewayPortalProps> = ({
  onSelectTab,
  onNavigateToConcept,
  onNavigateToSection,
  onNavigateToGlossary
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* 1. EXECUTIVE HERO PROPOSITION */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
          {/* Institutional Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise Digital Infrastructure</span>
            </span>
            <span className="text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
              SemVer 2.4.0 Production Grade
            </span>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/80 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Organisational Agnostic Architecture</span>
            </span>
          </div>

          <SeawaterLogo variant="hero" size="lg" className="mx-auto" />

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Automated Governance for Health &amp; Population Intelligence
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Translating complex Information Governance, HRA research ethics protocols, and Caldicott principles into executable, sub-millisecond <strong className="text-cyan-300">Policy-as-Code (PaC)</strong> across data intelligence environments such as TRE and SDEs.
          </p>

          {/* Work in progress notice */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-xs text-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Work in progress — active development; contributions, governance reviews, and practitioner feedback are warmly welcomed.</span>
          </div>

          {/* High-Level Improvement Intent Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>Accelerate Onboarding</span>
              </div>
              <div className="text-xs font-semibold text-white">Eliminate Duplicative Reviews</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Central machine-verifiable assurances replace repetitive multi-site Trust information governance checks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>Line-Rate Enforcement</span>
              </div>
              <div className="text-xs font-semibold text-white">Sub-Millisecond Decisions</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Open Policy Agent admission webhooks evaluate complex semantic rules with zero perceptible runtime lag.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>Automated SDC Gates</span>
              </div>
              <div className="text-xs font-semibold text-white">Zero Small-Cell Leakage</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mathematical cell suppression (k ≥ 10) and dominance checks run automatically before human airlock review.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Audit Provenance</span>
              </div>
              <div className="text-xs font-semibold text-white">Cryptographic Lineage</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Append-only W3C PROV-O ledgers connect every runtime decision directly to versioned policy commit hashes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE-PATHWAY STRATEGIC PORTALS */}
      <div className="space-y-4">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Framework Portals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Choose Your Framework Path
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Direct routing for compliance officers, legal and clinical researchers, and technical platform architects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* PATH 1: GOVERN & ASSURE */}
          <div className="rounded-3xl bg-slate-900 border border-amber-900/40 p-6 space-y-5 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/60 transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Govern &amp; Assure</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Compliance &amp; Ethics</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  Assurance Workspace
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive compliance simulator. Input study protocols to test 6 governance gates in real-time, inspect plain-English statutory translations, and export printable audit reports.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: 'Scenario Evaluator', desc: 'Real-time Approved / Blocked gates.' },
                  { title: 'Caldicott & S251 Rules', desc: 'Direct statutory validation.' },
                  { title: 'Digital Assurance Report', desc: 'Printable certificate with SHA-256 hash.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs block">{item.title}</strong>
                      <span className="text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 relative z-10 space-y-2">
              <button
                onClick={() => onSelectTab('govern-assure')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Enter Govern &amp; Assure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateToConcept('caldicott')}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-center font-semibold text-xs transition-colors"
              >
                Caldicott Engine
              </button>
            </div>
          </div>

          {/* PATH 2: IG QUICK GUIDE & REFERENCE HANDBOOK */}
          <div className="rounded-3xl bg-slate-900 border border-emerald-900/40 p-6 space-y-5 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/60 transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>IG Quick Guide</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Desk Reference Handbook</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                  Handbook &amp; Guide
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quick reference and guide for non-technical leadership &amp; readership
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: 'Scannable Chapters', desc: 'People, Projects, Settings, Data & SDC.' },
                  { title: 'Decision Schematic', desc: 'Visual stage-by-stage hand-off graph.' },
                  { title: 'IG Knowledge Check', desc: '5-question self-assessment with answers.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs block">{item.title}</strong>
                      <span className="text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 relative z-10 space-y-2">
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Open IG Quick Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectTab('quiz')}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-center font-semibold text-xs transition-colors"
              >
                General Quizzes
              </button>
            </div>
          </div>

          {/* PATH 3: BUILD & DEPLOY */}
          <div className="rounded-3xl bg-slate-900 border border-cyan-900/40 p-6 space-y-5 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/60 transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Build &amp; Deploy</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Architects &amp; SREs</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Build &amp; Deploy Workspace
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stripe-level developer ergonomics for technical architects. Explore classes, inspect formal W3C RDF schemas, test OPA Rego rules, and copy Kubernetes admission webhooks.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: '3-Column Data Dictionary', desc: 'Classes, properties, and constraints.' },
                  { title: 'Multi-Format Code Viewer', desc: 'Instant JSON-LD, SHACL, and Rego.' },
                  { title: 'Production Manifests', desc: 'Kubernetes PEP and Calico network YAML.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs block">{item.title}</strong>
                      <span className="text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 relative z-10 space-y-2">
              <button
                onClick={() => onSelectTab('build-deploy')}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Enter Build &amp; Deploy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectTab('sandbox')}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-center font-semibold text-xs transition-colors"
              >
                Policy Sandbox
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FAST-TRACK FEATURE DISCOVERY STRIP */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Deep-Link Navigation Directory</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">Integrated Modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { id: 'govern-assure', label: 'Govern & Assure', desc: 'Compliance Engine', icon: <Scale className="w-4 h-4 text-amber-400" /> },
            { id: 'concepts', label: 'Caldicott & SDC', desc: '8 Principles Engine', icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
            { id: 'graph', label: 'Cytoscape Graph', desc: 'Visual Systems DAG', icon: <Layers className="w-4 h-4 text-sky-400" /> },
            { id: 'sandbox', label: 'Policy Sandbox', desc: 'OPA Evaluator', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
            { id: 'llm-security', label: 'LLM & AI Enclave', desc: 'Stanford UIT Model', icon: <Bot className="w-4 h-4 text-cyan-400" /> },
            { id: 'glossary', label: 'Glossary (45+ Terms)', desc: 'Enterprise Lexicon', icon: <Bookmark className="w-4 h-4 text-rose-400" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as ActiveTab)}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 transition-all text-left space-y-1.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {item.icon}
                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                {item.label}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
