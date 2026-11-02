import React, { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  FileCheck2,
  Lock,
  Download,
  Building2,
  Bot,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Info,
  Scale,
  FileText,
  Eye,
  Activity,
  Waves,
  Search,
  Network,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  Shield,
  Code2
} from 'lucide-react';

interface GovernanceAtlasProps {
  onNavigateToGlossary?: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSwitchToTechnicalAtlas?: () => void;
}

interface PublicJourneyStep {
  step: number;
  title: string;
  badge: string;
  summary: string;
  patientAssurance: string;
  caldicottLink: string;
  color: string;
}

const PUBLIC_STEPS: PublicJourneyStep[] = [
  {
    step: 1,
    title: 'Hospital Care Records',
    badge: 'Confidentiality at Source',
    summary: 'When you visit an NHS hospital or clinic, your health records are securely recorded. Direct personal details like names, addresses, and NHS numbers remain protected within the hospital database.',
    patientAssurance: 'No researcher is ever given direct access to your hospital medical record or direct contact details.',
    caldicottLink: 'Principle 1 & 2: Purpose justified and personal identifiers avoided.',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400'
  },
  {
    step: 2,
    title: 'Independent Ethics Review',
    badge: 'Safe People & Projects',
    summary: 'Before any medical research begins, an independent NHS Research Ethics Committee (REC) reviews the project to ensure it delivers clear public health benefit. Scientists must undergo rigorous background checks and annual Information Governance training.',
    patientAssurance: 'Commercial advertisers and insurance companies are strictly prohibited from accessing the environment.',
    caldicottLink: 'Principle 4 & 5: Strict need-to-know access and legal accountability.',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400'
  },
  {
    step: 3,
    title: 'The Digital Safe Room',
    badge: 'Safe Settings & Data',
    summary: 'Researchers work inside a digital room where external internet access is completely blocked. They cannot download data to USB drives, email records, or copy files to personal laptops.',
    patientAssurance: 'Data stays in the hospital cloud. Only de-identified codes are visible, with all names permanently removed.',
    caldicottLink: 'Principle 3: Minimum necessary data provided for the specific study.',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400'
  },
  {
    step: 4,
    title: 'Automated Airlock Filter',
    badge: 'Safe Outputs (k >= 10)',
    summary: 'When scientists finish analyzing a question, their summary tables and charts must pass through an automated digital airlock. Mathematical filters verify that small groups (fewer than 10 patients) are permanently suppressed.',
    patientAssurance: 'No individual patient can ever be identified or singled out in any published medical paper.',
    caldicottLink: 'Principle 6 & 7: Complying with law while enabling safe, life-saving sharing.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400'
  },
  {
    step: 5,
    title: 'Medical Breakthroughs',
    badge: 'Public Health Benefit',
    summary: 'Only anonymous statistical findings leave the environment, helping develop earlier cancer detection, personalized medicines, and improved clinical treatments for future patients.',
    patientAssurance: 'Your data contributes to medical science without ever compromising your privacy.',
    caldicottLink: 'Principle 8: Openness with patients about how confidential data protects society.',
    color: 'from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-400'
  }
];

// Governance Knowledge Graph Data (Tailored for Public & Citizen Trust)
interface TrustNode {
  id: string;
  label: string;
  category: 'citizen' | 'legal' | 'enclave' | 'defense' | 'benefit';
  shortDesc: string;
  safeguard: string;
  legalBasis: string;
  color: string;
}

const TRUST_NODES: TrustNode[] = [
  {
    id: 'node-citizen',
    label: 'NHS Patients & Citizens',
    category: 'citizen',
    shortDesc: 'Individuals receiving clinical care across the NHS whose confidential records are protected.',
    safeguard: 'Direct identifiers never leave NHS custody. National Data Opt-Out is respected in full.',
    legalBasis: 'Common Law Duty of Confidentiality & UK GDPR Art. 9(2)(j)',
    color: '#38bdf8'
  },
  {
    id: 'node-hospital',
    label: 'Hospital Cloud Database',
    category: 'citizen',
    shortDesc: 'Confidential Electronic Health Records (EHR), genomic profiles, and clinical imaging.',
    safeguard: 'Zero direct external internet connections; direct patient contact details permanently quarantined.',
    legalBasis: 'Health and Social Care Act 2012 & Caldicott Principle 1',
    color: '#06b6d4'
  },
  {
    id: 'node-caldicott',
    label: 'Caldicott Guardian & SIRO',
    category: 'legal',
    shortDesc: 'Senior clinician and board officer with personal statutory responsibility for patient confidentiality.',
    safeguard: 'Must personally authorize any sensitive data linkage or emergency access protocol.',
    legalBasis: 'Eight Caldicott Principles & National Data Guardian Standards',
    color: '#10b981'
  },
  {
    id: 'node-ethics',
    label: 'NHS Research Ethics Committee (REC)',
    category: 'legal',
    shortDesc: 'Independent committee of doctors, patients, and ethicists reviewing research intent.',
    safeguard: 'Commercial marketing and predatory profiling are strictly prohibited by law.',
    legalBasis: 'NHS Health Research Authority (HRA) & Section 251 CAG Approvals',
    color: '#34d399'
  },
  {
    id: 'node-seawater',
    label: 'Seawater Flow Governance',
    category: 'defense',
    shortDesc: 'The problem space architecture protecting against unverified ingress and unauthorized egress leaks.',
    safeguard: 'Enforces access controls, Safe People, and Safe Projects on ingress, and disclosure control (k >= 10) on egress.',
    legalBasis: 'Project Seawater Policy-as-Code Architecture',
    color: '#0ea5e9'
  },
  {
    id: 'node-enclave',
    label: 'Data Analysis & Intelligence Platform (TRE / SDE)',
    category: 'enclave',
    shortDesc: 'Hardened cloud enclave where approved algorithms analyze partitioned, de-identified data.',
    safeguard: 'Airgapped digital safe room: USB exfiltration, email, and external downloads are permanently disabled.',
    legalBasis: 'UK Health Data Research Alliance & SATRE Specification',
    color: '#8b5cf6'
  },
  {
    id: 'node-iso-dcb',
    label: 'ISO 42001 & DCB0129 / DCB0160 Standards',
    category: 'legal',
    shortDesc: 'Clinical Safety Officer (CSO) hazard logging and international AI management governance.',
    safeguard: 'Ensures AI tools do not cause clinical harm before models touch patient care pathways.',
    legalBasis: 'Health & Social Care Act 2012 DCB0129 & ISO/IEC 42001:2023',
    color: '#a855f7'
  },
  {
    id: 'node-shacl',
    label: 'W3C SHACL Digital Airlock',
    category: 'defense',
    shortDesc: 'Mathematical shape validation verifying that data adheres to Closed-World privacy bounds.',
    safeguard: 'Blocks outputs with small counts or unverified researcher certificates in microseconds.',
    legalBasis: 'W3C Shapes Constraint Language (SHACL) Standard',
    color: '#f59e0b'
  },
  {
    id: 'node-opa',
    label: 'Open Policy Agent (OPA) Rego',
    category: 'defense',
    shortDesc: 'Sub-millisecond policy compiler that blocks unauthorized network or container actions.',
    safeguard: 'Hard fail-closed rule execution: If policy check fails, admission or export is immediately aborted.',
    legalBasis: 'Cloud Native Computing Foundation (CNCF) OPA Security Spec',
    color: '#f97316'
  },
  {
    id: 'node-sdc',
    label: 'Statistical Disclosure Control (k >= 10)',
    category: 'defense',
    shortDesc: 'Mathematical privacy threshold guaranteeing that small patient cohorts cannot be re-identified.',
    safeguard: 'Any result table cell representing fewer than 10 patients is permanently masked.',
    legalBasis: 'ONS & SAIL Databank Statistical Disclosure Control Standards',
    color: '#ec4899'
  },
  {
    id: 'node-benefit',
    label: 'Anonymous Medical Breakthroughs',
    category: 'benefit',
    shortDesc: 'Published statistical models, disease biomarkers, and public health improvements.',
    safeguard: 'Only fully de-identified mathematical aggregates leave; patient identities remain forever safe.',
    legalBasis: 'UK GDPR Recital 26 (Anonymous Data Out of Scope)',
    color: '#10b981'
  }
];

const TRUST_EDGES = [
  { source: 'node-citizen', target: 'node-hospital', label: 'Clinical Care Records' },
  { source: 'node-hospital', target: 'node-seawater', label: 'Flood Tide Ingress' },
  { source: 'node-caldicott', target: 'node-seawater', label: 'Confidentiality Mandate' },
  { source: 'node-ethics', target: 'node-enclave', label: 'Approved Study Protocol' },
  { source: 'node-seawater', target: 'node-enclave', label: 'Partitioned Workspace' },
  { source: 'node-iso-dcb', target: 'node-enclave', label: 'Clinical Safety Case' },
  { source: 'node-enclave', target: 'node-shacl', label: 'Egress Airlock Request' },
  { source: 'node-shacl', target: 'node-opa', label: 'Compiled Rego Decision' },
  { source: 'node-opa', target: 'node-sdc', label: 'k >= 10 Verification' },
  { source: 'node-sdc', target: 'node-benefit', label: 'Ebb Tide Safe Egress' }
];

export const GovernanceAtlas: React.FC<GovernanceAtlasProps> = ({
  onNavigateToGlossary,
  onNavigateToSection,
  onSwitchToTechnicalAtlas
}) => {
  const [activeAtlasTab, setActiveAtlasTab] = useState<'journey' | 'glossary' | 'graph'>('journey');
  const [selectedStep, setSelectedStep] = useState<PublicJourneyStep>(PUBLIC_STEPS[0]);
  const [showFullCharter, setShowFullCharter] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Glossary sub-view state
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('All');
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null);

  // Knowledge graph sub-view state
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<TrustNode | null>(TRUST_NODES[0]);

  const COMPREHENSIVE_CHARTER_MD = `# TRUSTED RESEARCH ENVIRONMENT (TRE) CLINICAL DATA GOVERNANCE CHARTER
*Standard Operating Protocol & Statutory Compliance Specification*
*Document Reference: TRE-PAC-GOV-2026-V4 | Approved by Trust Board & Caldicott Guardian*

---

## 1. Statutory Mandate & Legal Framework
This platform operates in strict accordance with UK health data legislation and international standards:
- **UK General Data Protection Regulation (UK GDPR)**:
  - Article 6(1)(e): Processing is necessary for the performance of a task carried out in the public interest.
  - Article 9(2)(j): Processing of special category health data is necessary for archiving and scientific research purposes in the public interest.
- **Data Protection Act 2018 (DPA 2018)**: Part 2 and Section 19 safeguards for scientific research.
- **National Health Service Act 2006 (Section 251)**: Statutory exemption granted on advice of the Confidentiality Advisory Group (CAG).
- **ISO/IEC 42001:2023**: Artificial Intelligence Management System (AIMS) governance.
- **DCB0129 & DCB0160**: NHS Clinical Risk Management for Health Software and Deployment.
- **UK MDR 2002 & MHRA SaMD**: Software as a Medical Device risk control and classification.
- **Common Law Duty of Confidentiality (CLDC)**: Enforced via the Eight Caldicott Principles.

---

## 2. Institutional Roles & Oversight Structure
- **Caldicott Guardian**: Responsible for championing confidentiality and reviewing all Tier 3 data access requests.
- **Senior Information Risk Owner (SIRO)**: Board-level accountability for technical and cyber risks across the cloud enclave.
- **Clinical Safety Officer (CSO)**: Registered clinician responsible for DCB0129 Hazard Logs and Safety Cases.
- **Data Protection Officer (DPO)**: Conducts Data Protection Impact Assessments (DPIA) and audits compliance with UK GDPR.
- **Research Ethics Committee (REC)**: Independent health ethics body reviewing all research questions for demonstrable public benefit.

---

## 3. The Seawater Tidal Model & Five Safes
- **Flood Tide (Ingress)**: Partitioned EHR and genomic data ingest through cryptographically audited pipelines.
- **Safe Setting**: Airgapped digital safe room; no USB copying, no local downloads, zero outbound internet.
- **Ebb Tide (Egress)**: Safe outputs pass through mathematical airlocks enforcing cell suppression ($k \\ge 10$) and dominance masking.

*Published by the Clinical Information Governance Board.*`;

  const handleDownloadCharter = () => {
    const blob = new Blob([COMPREHENSIVE_CHARTER_MD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CLINICAL_DATA_GOVERNANCE_CHARTER_2026.md';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // Cytoscape initialization for Public Trust Knowledge Graph
  useEffect(() => {
    if (activeAtlasTab !== 'graph' || !graphContainerRef.current) return;

    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const elements = [
      ...TRUST_NODES.map((node) => ({
        data: {
          id: node.id,
          label: node.label,
          color: node.color,
          category: node.category,
          nodeData: node
        }
      })),
      ...TRUST_EDGES.map((edge, idx) => ({
        data: {
          id: `edge-${idx}`,
          source: edge.source,
          target: edge.target,
          label: edge.label
        }
      }))
    ];

    const cy = cytoscape({
      container: graphContainerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': 'data(color)',
            color: '#f8fafc',
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'font-size': '11px',
            'font-weight': 600,
            'text-background-color': '#020617',
            'text-background-opacity': 0.8,
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            width: 38,
            height: 38,
            'border-width': 2,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            width: 46,
            height: 46
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#475569',
            'target-arrow-color': '#38bdf8',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '9px',
            color: '#94a3b8',
            'text-rotation': 'autorotate',
            'text-background-color': '#0f172a',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            'arrow-scale': 1.1
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 40,
        spacingFactor: 1.25
      }
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data('nodeData') as TrustNode;
      if (nodeData) {
        setSelectedGraphNode(nodeData);
      }
    });

    cyRef.current = cy;

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [activeAtlasTab]);

  // Filtered glossary terms for the Public Glossary tab
  const filteredGlossary = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch =
      glossarySearch.trim() === '' ||
      term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      (term.acronym && term.acronym.toLowerCase().includes(glossarySearch.toLowerCase())) ||
      term.shortDefinition.toLowerCase().includes(glossarySearch.toLowerCase());

    const matchesCategory =
      glossaryCategory === 'All' || term.category === glossaryCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Atlas Switcher Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Public Governance Atlas
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold border border-emerald-500/20">
                Citizen & Board View
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Patient safeguards, ethical guarantees, and interactive governance knowledge graphs.
            </p>
          </div>
        </div>

        {/* Clear Toggle to Technical Atlas */}
        <button
          onClick={onSwitchToTechnicalAtlas}
          className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
          title="Switch to the Engineering & Policy-as-Code Platform"
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Switch to Technical Atlas (Engineers & Researchers)</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      {/* Main Public Atlas Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveAtlasTab('journey')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeAtlasTab === 'journey'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Patient Journey & Safeguards</span>
        </button>

        <button
          onClick={() => setActiveAtlasTab('glossary')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeAtlasTab === 'glossary'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Public Glossary</span>
        </button>

        <button
          onClick={() => setActiveAtlasTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeAtlasTab === 'graph'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Knowledge Graph View</span>
        </button>
      </div>

      {/* VIEW 1: PATIENT JOURNEY & SAFEGUARDS */}
      {activeAtlasTab === 'journey' && (
        <div className="space-y-10">
          {/* Hero Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Public, Patient & NHS Trust Board Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                How Your Health Data Is Protected in Research
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A guide to the safety principles, clinical laws, and computer safeguards
                governing modern data analysis & intelligence platforms such as TREs and SDEs, enabling vital medical discoveries while keeping confidential health records strictly anonymous.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCharter}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-xs transition-colors shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloaded ? 'Downloaded Charter (.md)' : 'Download Full Governance Charter (.md)'}</span>
                </button>

                <button
                  onClick={() => setShowFullCharter(true)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl flex items-center gap-2 text-xs transition-colors border border-slate-700"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Read Full Board Charter Online</span>
                </button>
              </div>
            </div>
          </div>

          {/* THE SEAWATER PROBLEM SPACE & TIDAL FLOW CARD */}
          <div className="rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <Waves className="w-4 h-4" />
              <span>The Problem Space: Why Project Seawater?</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Navigating Dynamic Flow: The Tidal Ingress &amp; Egress Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Waves className="w-4 h-4" />
                  <span>The Dynamic Problem Space</span>
                </div>
                <p>
                  Clinical and genomic research does not take place in an isolated, static vacuum. It operates across an active problem space where diverse workloads (from single query scripts to foundation model pipelines) must navigate regulatory requirements, clinical governance channels, and patient confidentiality thresholds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <Activity className="w-4 h-4" />
                  <span>Ingress: Access, Safe People &amp; Projects</span>
                </div>
                <p>
                  The inward tide enforces perimeter access controls, Safe People, and Safe Projects. Before data or compute enters the enclave, the gateway verifies researcher identity, institutional accreditation, mandatory Information Governance training, and REC ethics approvals (including NHS Section 251 exemptions). Inbound data schemas and workloads are validated using W3C SHACL shapes to prevent unauthorized inputs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Egress: Disclosure Control &amp; Safe Outputs</span>
                </div>
                <p>
                  The outward tide governs analytical results leaving the secure boundary. Derived statistical aggregates, trained model parameters, and research summaries pass through automated Statistical Disclosure Control (SDC) checks and microsecond OPA Rego policies enforcing k &ge; 10 cell suppression and dominance masking, ensuring zero confidential patient data leaks outward.
                </p>
              </div>
            </div>
          </div>

          {/* 5-Step Progress Pathway */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                <span>Interactive Patient Data Journey Map</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The 5 Steps from Hospital Bedside to Medical Discovery
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click any stage along the path to learn how your privacy is protected by Caldicott principles and digital locks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {PUBLIC_STEPS.map((step) => {
                const isSelected = selectedStep.step === step.step;
                return (
                  <button
                    key={step.step}
                    onClick={() => setSelectedStep(step)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between relative group ${
                      isSelected
                        ? `bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg`
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-6 h-6 rounded-full font-mono text-xs font-extrabold flex items-center justify-center ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          Stage {step.step}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    <div className="pt-3 text-[11px] text-slate-400 border-t border-slate-800/60 mt-3">
                      <span className="font-medium text-slate-300">{step.badge}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detail Card for the Selected Step */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Stage {selectedStep.step} of 5 · {selectedStep.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedStep.title}
                  </h3>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  {selectedStep.caldicottLink}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {selectedStep.summary}
              </p>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] block">
                    Direct Patient Safeguard Assurance
                  </span>
                  <p className="text-emerald-100 leading-relaxed font-medium">
                    {selectedStep.patientAssurance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The 8 Caldicott Principles */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>UK National Standard</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Eight Caldicott Principles in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Established by Dame Fiona Caldicott, these 8 principles govern every aspect of how NHS and health research data is handled.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                {
                  num: 1,
                  title: 'Justify the Purpose',
                  desc: 'Every proposed use or transfer of confidential patient information must be clearly defined, scrutinized, and documented.'
                },
                {
                  num: 2,
                  title: 'Don’t Use Personal Confidential Data Unless Necessary',
                  desc: 'Identifiable patient information is not used unless there is no alternative. Anonymized data is the mandatory default.'
                },
                {
                  num: 3,
                  title: 'Use the Minimum Necessary',
                  desc: 'Researchers receive only the specific data fields and cohort slices required for their approved research question.'
                },
                {
                  num: 4,
                  title: 'Access on a Strict Need-to-Know Basis',
                  desc: 'Only accredited researchers directly working on an approved study can view the project’s specific data enclave.'
                },
                {
                  num: 5,
                  title: 'Everyone Must Understand Responsibilities',
                  desc: 'Annual Information Governance training and legally binding user agreements ensure strict personal accountability.'
                },
                {
                  num: 6,
                  title: 'Understand and Comply with the Law',
                  desc: 'Every data release must satisfy UK GDPR (Articles 6 & 9) and hold NHS Section 251 statutory approval where applicable.'
                },
                {
                  num: 7,
                  title: 'The Duty to Share for Care is as Important',
                  desc: 'Confidence in safe data protection ensures health professionals and scientists can safely share data to improve public health.'
                },
                {
                  num: 8,
                  title: 'Inform Patients and Service Users',
                  desc: 'Clear communication about how patient data is used, with full respect for the National Data Opt-Out.'
                }
              ].map((principle) => (
                <div
                  key={principle.num}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-800">
                    {principle.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{principle.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-xs">{principle.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PUBLIC GLOSSARY */}
      {activeAtlasTab === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Public Knowledge Base</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Public Governance & Clinical Safety Glossary
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Clear explanations of medical research terms, statutory privacy laws, and international standards.
              </p>
            </div>

            <button
              onClick={() => setActiveAtlasTab('graph')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold rounded-xl text-xs flex items-center gap-2 border border-emerald-500/30 transition-colors shrink-0"
            >
              <Network className="w-4 h-4 text-emerald-400" />
              <span>Switch to Knowledge Graph View</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search public terms (e.g., Caldicott, k-anonymity, Section 251, ISO 42001, DCB0129)..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['All', 'Governance & Frameworks', 'Standards & Clinical Safety', 'Disclosure Control (SDC)', 'AI & Autonomous Agents'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    glossaryCategory === cat
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Glossary Term Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((term) => (
              <div
                key={term.id}
                onClick={() => setSelectedGlossaryTerm(term)}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group hover:shadow-lg hover:shadow-emerald-950/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                      {term.term}
                    </h3>
                    {term.acronym && (
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                        {term.acronym}
                      </span>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-700">
                    {term.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {term.shortDefinition}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="line-clamp-1">{term.playbookSection}</span>
                  <span className="text-emerald-400 group-hover:underline flex items-center gap-1 font-semibold">
                    Read Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: KNOWLEDGE GRAPH VIEW */}
      {activeAtlasTab === 'graph' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Network className="w-4 h-4" />
                <span>Interactive Trust Architecture</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Public Governance Knowledge Graph
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Visualizing how patient confidentiality flows through ethical reviews, digital airlocks, and international safety standards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.25)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 0.8)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => cyRef.current?.fit(undefined, 30)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Cytoscape Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative h-[540px] shadow-2xl">
              <div ref={graphContainerRef} className="w-full h-full" />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono">
                Click any node to inspect patient safeguards and legal anchors
              </div>
            </div>

            {/* Inspector Panel for Selected Graph Node */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
              {selectedGraphNode ? (
                <div className="space-y-4">
                  <div className="space-y-1 pb-3 border-b border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Selected Governance Node
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {selectedGraphNode.label}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">
                      Description & Purpose
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      {selectedGraphNode.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Direct Patient Safeguard</span>
                    </span>
                    <p className="text-xs text-emerald-100 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30 font-medium">
                      {selectedGraphNode.safeguard}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 block">
                      Statutory & Legal Basis
                    </span>
                    <div className="text-xs text-slate-200 font-mono bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      {selectedGraphNode.legalBasis}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Click any node on the graph to view details
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 text-center">
                <button
                  onClick={() => setActiveAtlasTab('journey')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  Return to Patient Journey Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Term Detail */}
      {selectedGlossaryTerm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  {selectedGlossaryTerm.category}
                </span>
                <h3 className="font-bold text-white text-lg">
                  {selectedGlossaryTerm.term} {selectedGlossaryTerm.acronym && `(${selectedGlossaryTerm.acronym})`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGlossaryTerm(null)}
                className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40">
              <div className="space-y-1">
                <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block">
                  Full Explanation
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedGlossaryTerm.fullDefinition}
                </p>
              </div>

              <div className="space-y-1 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-300 text-xs block">
                  Platform & Playbook Context
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {selectedGlossaryTerm.playbookContext}
                </p>
              </div>

              {selectedGlossaryTerm.relatedTerms && selectedGlossaryTerm.relatedTerms.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">
                    Related Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedGlossaryTerm.relatedTerms.map((rt) => (
                      <span
                        key={rt}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {rt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/70">
              <span className="text-xs text-slate-400 font-mono">
                {selectedGlossaryTerm.playbookSection}
              </span>
              <button
                onClick={() => setSelectedGlossaryTerm(null)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Charter Modal */}
      {showFullCharter && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">
                  Official TRE Clinical Data Governance Charter (Full Text)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadCharter}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
                <button
                  onClick={() => setShowFullCharter(false)}
                  className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950/40">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-200">
                {COMPREHENSIVE_CHARTER_MD}
              </pre>
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-950/70">
              <button
                onClick={() => setShowFullCharter(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
