import React, { useState } from 'react';
import { WaveboundLogo } from './WaveboundLogo';
import { ActiveTab } from './Header';
import { EvidenceDossierModal } from './EvidenceDossierModal';
import { IssueReportModal } from './IssueReportModal';
import {
  ShieldCheck,
  Layers,
  ArrowRight,
  Scale,
  FileCheck2,
  Code2,
  HeartHandshake,
  Filter,
  Sparkles
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
  // Phase 1: Dual-Persona Routing State
  const [personaFocus, setPersonaFocus] = useState<'all' | 'ig-handbook' | 'data-technical'>('all');
  // Phase 2: Evidence Dossier Modal State
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const baselineEvaluation = {
    gates: [
      {
        gateName: 'IRAS Accredited Researcher Credential Validated',
        status: 'PASS' as const,
        rationale: 'Named researcher identity verified against national accreditation registry (UK Health Data Research Alliance). Caldicott Principle 4 satisfied.',
        statutoryBasis: 'Caldicott Principle 4; Digital Economy Act 2017 s64.',
        triggerNode: 'tre:ResearcherCredentialShape § 3.1',
        decisionRef: 'D-003',
        decisionTitle: 'Trusted Inputs & Identity Verification'
      },
      {
        gateName: 'Research Ethics Committee (REC) Favourable Opinion',
        status: 'PASS' as const,
        rationale: 'Independent Research Ethics Committee (REC) favourable ethical opinion confirmed on IRAS register (Ref: 24/LO/0812). Caldicott Principle 1 adhered to.',
        statutoryBasis: 'Caldicott Principle 1; Governance Arrangements for Research Ethics Committees (GAfREC).',
        triggerNode: 'tre:ResearchEthicsApprovalShape § 2.2',
        decisionRef: 'D-004',
        decisionTitle: 'Statutory Research Ethics & Public Benefit'
      },
      {
        gateName: 'NHS Act 2006 Section 251 Statutory Clearance',
        status: 'PASS' as const,
        rationale: 'Active Confidentiality Advisory Group (CAG) statutory support for processing confidential patient information without prior consent.',
        statutoryBasis: 'NHS Act 2006 Section 251; Health Service (Control of Patient Information) Regs 2002.',
        triggerNode: 'tre:StatutoryClearanceShape § 1.4',
        decisionRef: 'D-002',
        decisionTitle: 'Section 251 Statutory Clearance & Legal Basis'
      },
      {
        gateName: 'Least-Privilege Network Isolation Verified',
        status: 'PASS' as const,
        rationale: 'Restricted Kubernetes namespace; non-blocking audit controllers; outbound internet traffic blocked at policy decision point (PDP). Internal package mirrors operational.',
        statutoryBasis: 'NHS Data Security & Protection Toolkit (DSPT) Assertion 1.5; ISO/IEC 27001 A.13.1.',
        triggerNode: 'tre:NetworkEnclaveShape § 4.3',
        decisionRef: 'D-007',
        decisionTitle: 'Enforcement Point Selection & Enclave Network Boundary'
      },
      {
        gateName: 'Safe Outputs: Statistical Disclosure Control (SDC) Passed',
        status: 'PASS' as const,
        rationale: 'Candidate aggregated data satisfies primary cell suppression (min cell k = 14 ≥ 10) and dominance threshold (top-2 share = 54% ≤ 80%). Ready for 2-person airlock review.',
        statutoryBasis: 'Caldicott Principle 8 (Public Transparency); ONS Tabular SDC Guidelines.',
        triggerNode: 'sdc:AirlockOutputShape § 6.3',
        decisionRef: 'D-005',
        decisionTitle: 'Quantitative Statistical Disclosure Control Rules'
      }
    ],
    overallDecision: 'APPROVED' as const,
    decisionColor: 'text-[#047857] bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    decisionReason: 'All statutory compliance, network isolation, and disclosure control constraints satisfied. Standardized baseline evidence pack compiled for DAAG & Caldicott Guardian review.',
    auditHash: 'SHA256:8f3c7e1b9a4d2e5f6c8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e',
    evaluatedAt: new Date().toISOString()
  };

  const baselineParams = {
    researcherStatus: 'accredited',
    ethicsStatus: 'approved',
    s251Status: 'active_exemption',
    dataTier: 'tier2_pseudonymised',
    minCellCount: 14,
    dominanceRatio: 54,
    enclaveEgressBlocked: true,
    aiWorkloadType: 'deterministic_assist',
    aiHumanSponsorLinked: true,
    studyTitle: 'Cardiovascular Risk Stratification & Outcomes in Multi-Site Secondary Care Enclave',
    chiefInvestigator: 'Prof. A. Henderson (Honorary Consultant Cardiologist)',
    leadInstitution: 'NHS Foundation Trust & University Health Partners'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* 1. EXECUTIVE STATUTORY PROPOSITION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Institutional Context Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-semibold text-teal-800 dark:text-teal-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Safe &amp; Secure Data Intelligence Environments</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Caldicott Principles 1–8 · S251 CAG · Five Safes</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#047857] dark:text-emerald-400">
              Ontology-Led Policy Baseline
            </span>
          </div>

          <WaveboundLogo variant="hero" size="lg" className="mx-auto" />

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
              Streamlined Information Governance for Safe &amp; Secure Data Intelligence Environments
            </h1>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Navigation of IG via semantic ontology, standardised evidence packs, clear, structured compliance reviews, and progress tracked and certificated learning.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Designed for patients, public contributors, researchers, governance leads, and engineering teams—start with plain-English foundations, explore the step-by-step Playbook, or test live policy simulators below. A work in progress.{' '}
              <button
                type="button"
                onClick={() => setIsIssueModalOpen(true)}
                className="font-semibold text-[#005EB8] dark:text-sky-400 hover:text-[#0c2340] dark:hover:text-sky-300 underline underline-offset-2 cursor-pointer transition-colors"
              >
                Contributions welcome
              </button>
              .
            </p>
          </div>

          {/* Focused Pathway Filter Bar */}
          <div className="pt-2 pb-1 max-w-2xl mx-auto">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-center gap-1.5">
              <button
                onClick={() => setPersonaFocus('all')}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  personaFocus === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>All 4 Core Pillars</span>
              </button>

              <button
                onClick={() => setPersonaFocus('ig-handbook')}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  personaFocus === 'ig-handbook'
                    ? 'bg-[#00A389] text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#00A389] hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
                title="Filter Overview to Foundations: Plain-English desk reference for Caldicott Guardians, IG Leads, Ethics Committees, researchers, and the public"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Foundations Lens</span>
              </button>

              <button
                onClick={() => setPersonaFocus('data-technical')}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  personaFocus === 'data-technical'
                    ? 'bg-[#005EB8] text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#005EB8] hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
                title="Filter Overview to PaC Playbook: Ontology rules, OPA Rego sandboxes, enclaves, and manifests"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>PaC Playbook Lens</span>
              </button>
            </div>
          </div>

          {/* Caldicott Human Accountability Notice */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left max-w-3xl mx-auto flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#005EB8] dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">
                People First: Technology Assists Human Decisions (Caldicott Principle 8)
              </strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Automation helps check rules consistently, while accountable decisions remain firmly with Caldicott Guardians, Data Access Advisory Groups (DAAG), Research Ethics Committees (REC), and patient oversight panels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC FOCUSED OVERVIEW CONTENT (No Duplicated Grids) */}
      {personaFocus === 'all' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold text-[#005EB8] dark:text-sky-400">
              Explore by Pillar
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Start Where You Need
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Pick any of the four pillars below, or switch the lens filter above to step through a Foundations or PaC Playbook pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {/* Pillar 1: Playbook & Guides */}
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  1. Playbook &amp; Guides
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Read the step-by-step Wavebound PaC Playbook, plan production rollout without breaking services, trace our Ontology Topology Graph, or inspect the Concepts Primer.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectTab('playbook')}
                  className="w-full py-2 px-3 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read PaC Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('implementation-track')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Transitioning to Production &amp; Decisions
                </button>
                <button
                  onClick={() => onSelectTab('graph')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Explore Ontology Topology Graph
                </button>
                <button
                  onClick={() => onSelectTab('concepts')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Concepts Visual Primer
                </button>
              </div>
            </div>

            {/* Pillar 2: Evidence & Resources */}
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#005EB8] dark:text-sky-400">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  2. Evidence &amp; Resources
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open Foundations &amp; 10-Stage Schematic, preview Evidence Packs, explore the A–Z Glossary, or browse Further Resources (UK law, DSA, Statbarn, DataSHIELD, RO-Crate, EHDS).
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectTab('governance-atlas')}
                  className="w-full py-2 px-3 rounded-lg bg-[#005EB8] hover:bg-[#0c2340] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Foundations &amp; Schematic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsEvidenceModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Preview Standardised Evidence Pack
                </button>
                <button
                  onClick={() => onSelectTab('glossary')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Governance &amp; Architecture Glossary
                </button>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Browse Further Resources
                </button>
              </div>
            </div>

            {/* Pillar 3: Interactive Simulators & Review Lab */}
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400">
                  <Scale className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  3. Simulators &amp; Review Lab
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Try interactive tools hands-on: evaluate study protocols, run Statbarn SDC suppression checks, test OPA Rego rules, scrub LLM prompts, or generate manifests.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectTab('govern-assure')}
                  className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Govern &amp; Assure + SDC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('sandbox')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  OPA Rego Policy Sandbox
                </button>
                <button
                  onClick={() => onSelectTab('llm-security')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  LLM Redaction &amp; Enclave Lab
                </button>
              </div>
            </div>

            {/* Pillar 4: Progress Tracked & Certificated Learning */}
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#047857] dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  4. Tracked Quizzes &amp; Learning
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Check your confidence across Five Safes, SHACL, OPA Rego, SDC thresholds, FOIA, and enclave security with downloadable completion certificates.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectTab('quiz')}
                  className="w-full py-2 px-3 rounded-lg bg-[#00A389] hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Launch Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('progress')}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  View Progress &amp; Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOCUSED FILTER: FOUNDATIONS LENS */}
      {personaFocus === 'ig-handbook' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/40 border border-[#a7f3d0] dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <HeartHandshake className="w-5 h-5 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <strong className="text-[#065f46] dark:text-emerald-300 font-bold block text-sm">
                  Foundations Pathway Active (High-Level Desk Reference &amp; Statutory Overview)
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Filtered view for Caldicott Guardians, Information Governance Leads, Research Ethics Committees, researchers, and interested members of the public.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPersonaFocus('all')}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-[#047857] dark:text-emerald-300 text-xs font-semibold shrink-0 cursor-pointer hover:bg-emerald-50"
            >
              Show All Pillars
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#047857] dark:text-emerald-400 uppercase">Step 1 · Statutory Baseline</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Foundations Desk Reference &amp; Schematic</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Walk through the 10-stage IG &amp; Ethics schematic with statutory hand-offs across Caldicott 1–8, Section 251, UK GDPR, Statbarn outputs, and FOIA readiness.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className="w-full py-2.5 rounded-lg bg-[#00A389] hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Foundations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#047857] dark:text-emerald-400 uppercase">Step 2 · Panel Review</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Assurance Workspace &amp; Evidence Packs</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Simulate ethics/IG protocol gates, review Caldicott 8 public register templates, and inspect a standardized evidence pack before committee sign-off.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onSelectTab('govern-assure')}
                  className="w-full py-2.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Review Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsEvidenceModalOpen(true)}
                  className="w-full py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#047857] dark:text-emerald-300 font-medium text-xs cursor-pointer"
                >
                  Preview Evidence Pack
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#047857] dark:text-emerald-400 uppercase">Step 3 · Competency Check</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Certificated IG &amp; SDC Quizzes</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Complete Five Safes, Quantitative SDC, and AI Governance quiz domains with tracked progress and verifiable completion certificates.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('quiz')}
                className="w-full py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOCUSED FILTER: PAC PLAYBOOK LENS */}
      {personaFocus === 'data-technical' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Code2 className="w-5 h-5 text-[#005EB8] dark:text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <strong className="text-[#0c2340] dark:text-sky-300 font-bold block text-sm">
                  PaC Playbook Pathway Active (Architecture, Manifests &amp; Ontologies)
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Filtered engineering route for Data Stewards, Cloud Architects, and SREs implementing W3C SHACL shapes, OPA Rego PDPs, and least-privilege enclaves.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPersonaFocus('all')}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700 text-[#005EB8] dark:text-sky-300 text-xs font-semibold shrink-0 cursor-pointer hover:bg-sky-50"
            >
              Show All Pillars
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase">Step 1 · Ontology &amp; Spec</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">PaC Playbook &amp; Semantic Topology</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Inspect how OWL/RDF metadata resolves Open-World Assumptions via W3C SHACL shapes and compiles to deterministic Rego bundles &amp; PROV-O / RO-Crate records.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onSelectTab('playbook')}
                  className="w-full py-2.5 rounded-lg bg-[#005EB8] hover:bg-[#0c2340] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Read PaC Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('graph')}
                  className="w-full py-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[#005EB8] dark:text-sky-300 font-medium text-xs cursor-pointer"
                >
                  Explore Semantic Topology Graph
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase">Step 2 · Policy &amp; Enclave Hardening</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">OPA Sandbox &amp; AI Enclave Security</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Test fail-closed OPA Rego evaluation, inspect .harness_ignore &amp; AST scrubbing proxies, and enforce air-gapped CRAN/PyPI/Docker mirrors.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onSelectTab('sandbox')}
                  className="w-full py-2.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch OPA Rego Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('llm-security')}
                  className="w-full py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs cursor-pointer"
                >
                  Inspect Enclave &amp; LLM Security
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/70 p-6 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase">Step 3 · Least-Privilege Rollout</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Build, Webhook &amp; Rollout Schedule</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Deploy namespaced evaluate-only ValidatingWebhookConfiguration manifests with break-glass selectors and decision gate traceability.
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onSelectTab('build-deploy')}
                  className="w-full py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Build &amp; Deploy Workstation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTab('implementation-track')}
                  className="w-full py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs cursor-pointer"
                >
                  View Rollout Schedule &amp; Decisions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal Evidence Dossier Modal (Phase 2) */}
      <EvidenceDossierModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        evaluation={baselineEvaluation}
        protocolParams={baselineParams}
        onNavigateToDecisionRegister={(_ref) => {
          setIsEvidenceModalOpen(false);
          onSelectTab('build-deploy');
        }}
      />

      {/* Contributor Issue & Feedback Form Modal */}
      <IssueReportModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        defaultArea="Overview"
      />
    </div>
  );
};
