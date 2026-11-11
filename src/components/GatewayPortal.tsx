import React, { useState } from 'react';
import { WaveboundLogo } from './WaveboundLogo';
import { ActiveTab } from './Header';
import { EvidenceDossierModal } from './EvidenceDossierModal';
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
  ExternalLink,
  Code2,
  Terminal,
  CheckCircle2,
  Bot,
  Zap,
  Bookmark,
  BookOpen,
  HeartHandshake,
  Users,
  AlertTriangle,
  FileText,
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
          {/* Institutional Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded border border-teal-200 dark:border-teal-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Safe &amp; Secure Data Intelligence Environments</span>
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded border border-slate-300 dark:border-slate-700">
              Caldicott Principles 1–8 · S251 CAG · Five Safes
            </span>
            <span className="font-medium text-[#047857] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Policy-as-Code Baseline</span>
            </span>
          </div>

          <WaveboundLogo variant="hero" size="lg" className="mx-auto" />

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Streamlining Information Governance for Safe &amp; Secure Data Intelligence Environments
            </h1>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Technical navigation of IG semantic ontology, standardising evidence packs, and generating clear, structured compliance reviews.
            </p>
          </div>

          {/* Phase 1: Dual-Persona Routing Toggle */}
          <div className="pt-2 pb-1 max-w-2xl mx-auto">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-center gap-1.5">
              <button
                onClick={() => setPersonaFocus('all')}
                className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  personaFocus === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Comprehensive View
              </button>

              <button
                onClick={() => setPersonaFocus('ig-handbook')}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  personaFocus === 'ig-handbook'
                    ? 'bg-[#00A389] text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#00A389] hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
                title="Filter for Caldicott Guardians, IG Leads, and Research Ethics Panels"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>IG Handbook Pathway</span>
              </button>

              <button
                onClick={() => setPersonaFocus('data-technical')}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  personaFocus === 'data-technical'
                    ? 'bg-[#005EB8] text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#005EB8] hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
                title="Filter for Cloud Architects, Data Stewards, and DevOps Engineers"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Runtime Pathway</span>
              </button>
            </div>

            {/* Persona Callout Banner */}
            {personaFocus === 'ig-handbook' && (
              <div className="mt-3 p-3.5 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/40 border border-[#a7f3d0] dark:border-emerald-800 text-left flex items-start justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-[#065f46] dark:text-emerald-300 font-bold block">
                      IG Handbook Pathway Active (Non-Technical &amp; Statutory Leadership)
                    </strong>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      Optimized for Caldicott Guardians, Information Governance Leads, and Research Ethics Committees. Prioritizing plain-English statutory translations, Section 251 decision gates, and standardized review packs.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTab('governance-atlas')}
                  className="px-3 py-1.5 rounded-lg bg-[#047857] hover:bg-emerald-700 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Open Handbook</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {personaFocus === 'data-technical' && (
              <div className="mt-3 p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-left flex items-start justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <Code2 className="w-4 h-4 text-[#005EB8] dark:text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="text-[#0c2340] dark:text-sky-300 font-bold block">
                      Runtime Pathway Active (Architecture, Manifests &amp; Ontologies)
                    </strong>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      Optimized for Data Stewards, Cloud Architects, and SREs. Prioritizing machine-executable OPA Rego policies, closed-world W3C SHACL shapes, least-privilege enclave manifests, and air-gapped package mirrors.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTab('playbook')}
                  className="px-3 py-1.5 rounded-lg bg-[#005EB8] hover:bg-[#0c2340] text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Open Playbook</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Caldicott Human Accountability Notice */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left max-w-3xl mx-auto flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#005EB8] dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">
                Human Accountability &amp; Public Transparency (Caldicott Principle 8)
              </strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Technology serves human accountability; it does not replace it. Wavebound is not an autonomous gatekeeper. It provides a machine-verifiable governance baseline that assists human Caldicott Guardians, Data Access Advisory Groups (DAAG), and Research Ethics Committees (REC) in making informed statutory decisions.
              </p>
            </div>
          </div>

          {/* Strategic Assurances Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wide">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Review Packs</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Standardized Pack</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Helps replace repetitive multi-site questionnaires with a structured, verifiable review summary.
                </p>
              </div>
              <button
                onClick={() => setIsEvidenceModalOpen(true)}
                className="text-[11px] font-semibold text-[#005EB8] dark:text-sky-400 hover:text-[#0c2340] dark:hover:text-white flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Preview Evidence Pack</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Least-Privilege Enclave</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Audit &amp; Alert Model</div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Operates within restricted namespaces with non-blocking audit controllers, avoiding fragile cluster-admin dependencies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                <Server className="w-3.5 h-3.5" />
                <span>Air-Gapped Realities</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Internal Package Mirrors</div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Maintained internal CRAN, PyPI, and Docker mirrors provide researchers validated libraries with zero outbound internet egress.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                <Database className="w-3.5 h-3.5" />
                <span>Decoupled IG Tags</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Closed-World ABAC</div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Decoupled from volatile EHR/SNOMED schemas; scoped strictly to Caldicott, S251, and Five Safes for deterministic verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE-PATHWAY STRATEGIC WORKSPACES */}
      <div className="space-y-4">
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
            Operational Workspaces
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Role-Based Assurance &amp; Implementation Pathways
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Direct navigation tailored for Information Governance leads, Caldicott Guardians, PPIE panels, and platform architects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* PATH 1: GOVERN & ASSURE */}
          <div
            className={`rounded-xl bg-white dark:bg-slate-900 border p-6 space-y-5 flex flex-col justify-between shadow-xs transition-all ${
              personaFocus === 'ig-handbook'
                ? 'border-[#00A389] ring-2 ring-[#00A389]/20 shadow-md'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Govern &amp; Assure</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Compliance &amp; IG Panels</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Governance Assurance Workspace
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Interactive statutory evaluator. Check study protocols against 6 statutory gates, inspect plain-English legal translations, and compile a standardized evidence pack for human panel review.
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: 'Five Safes Protocol Evaluator', desc: 'Validates Safe People, Projects, Data, Settings, & Outputs.' },
                  { title: 'Consolidated Statutory Matrix', desc: 'Cross-cutting UK GDPR, Section 251, Caldicott 1–8 & ONS SDC.' },
                  { title: 'Caldicott 8 & PROV-O Ledger', desc: 'Open Data Use Register with W3C PROV-O cryptographic lineage.' },
                  { title: 'SATRE & DSPT Procurement Matrix', desc: 'Verified audit controls for tenders across patient and population safe and secure data and intelligence environments.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-slate-100 text-xs block">{item.title}</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onSelectTab('govern-assure')}
                className="w-full py-2.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Enter Govern &amp; Assure Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsEvidenceModalOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-center font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Preview Standardized Evidence Pack</span>
              </button>
              <button
                onClick={() => onNavigateToConcept('caldicott')}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-center font-medium text-xs transition-colors cursor-pointer"
              >
                Inspect Caldicott Principles 1–8
              </button>
            </div>
          </div>

          {/* PATH 2: IG HANDBOOK & DESK REFERENCE */}
          <div
            className={`rounded-xl bg-white dark:bg-slate-900 border p-6 space-y-5 flex flex-col justify-between shadow-xs transition-all ${
              personaFocus === 'ig-handbook'
                ? 'border-[#00A389] ring-2 ring-[#00A389]/20 shadow-md bg-[#f0fdf9]/30 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-[#047857] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>IG Handbook</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">PPIE &amp; Leadership</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  IG Handbook &amp; Desk Reference
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Plain-language reference guide designed for non-technical leadership, Caldicott Guardians, and Patient &amp; Public Involvement (PPIE) advisory representatives.
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: 'Caldicott 8 Transparency', desc: 'Ensures public benefit is visible, accessible, and accountable.' },
                  { title: 'Five Safes Walkthrough', desc: 'Stage-by-stage statutory requirements and safeguards.' },
                  { title: 'Self-Assessment Check', desc: '5-question IG assurance assessment with statutory rationale.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-slate-100 text-xs block">{item.title}</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onSelectTab('governance-atlas')}
                className="w-full py-2.5 rounded-lg bg-[#00A389] hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Open IG Handbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectTab('quiz')}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-center font-medium text-xs transition-colors cursor-pointer"
              >
                Knowledge Assessment Quizzes
              </button>
            </div>
          </div>

          {/* PATH 3: DATA TECHNICAL & MANIFESTS */}
          <div
            className={`rounded-xl bg-white dark:bg-slate-900 border p-6 space-y-5 flex flex-col justify-between shadow-xs transition-all ${
              personaFocus === 'data-technical'
                ? 'border-[#005EB8] ring-2 ring-[#005EB8]/20 shadow-md bg-sky-50/30 dark:bg-sky-950/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-[#005EB8] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Runtime</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Architects &amp; SREs</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Runtime Architecture &amp; Manifests
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enterprise deployment artifacts for multi-tenant research clusters: namespaced audit-and-alert manifests, internal air-gapped CRAN/PyPI mirrors, and direct analytics access patterns.
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="space-y-2 pt-1 text-xs">
                {[
                  { title: 'Least-Privilege Manifests', desc: 'Namespaced admission and non-blocking audit controllers.' },
                  { title: 'Air-Gapped Package Mirrors', desc: 'CRAN, PyPI, and Docker registries with zero internet egress.' },
                  { title: 'Closed-World Rego PDPs', desc: 'Sub-millisecond ABAC/RBAC egress decision-support.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#005EB8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-slate-100 text-xs block">{item.title}</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onSelectTab('build-deploy')}
                className="w-full py-2.5 rounded-lg bg-[#005EB8] hover:bg-[#0c2340] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Open Runtime Workstation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectTab('playbook')}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-center font-medium text-xs transition-colors cursor-pointer"
              >
                Inspect Technical Playbook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOUR CORE ENGINES GRID */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Enterprise Architecture Core
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Governance &amp; Policy Decision Primitives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            The machine-executable architectural layers compiling high-level legal doctrines into deterministic policy enforcement points.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: W3C SHACL Ontology */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                W3C SHACL Ontology
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Deterministic closed-world data models. Encodes Caldicott principles and Section 251 constraints as machine-verifiable data shapes.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('graph')}
              className="text-xs font-semibold text-[#005EB8] dark:text-sky-400 flex items-center gap-1 hover:underline pt-2 cursor-pointer"
            >
              <span>Explore Knowledge Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: OPA Rego Decision Points */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#047857] dark:text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Policy Decision Points (PDP)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sub-millisecond Open Policy Agent (OPA) rule evaluation, verifying identity, dataset tiering, and project ethics dynamically.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('sandbox')}
              className="text-xs font-semibold text-[#047857] dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2 cursor-pointer"
            >
              <span>Launch Policy Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Quantitative SDC Airlock */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Quantitative SDC Airlock
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automated cell suppression (k ≥ 10), dominance thresholds, and controlled perturbation prior to research egress authorization.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('govern-assure')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2 cursor-pointer"
            >
              <span>Launch Quantitative SDC Simulator &amp; Airlock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Multi-Tenant Safe Compute */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-400">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Safe Enclave Compute
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Confidential compute enclaves, restricted namespaces, internal container mirrors, and zero-egress network policies.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('llm-security')}
              className="text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-1 hover:underline pt-2 cursor-pointer"
            >
              <span>Inspect Enclave Security</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
};
