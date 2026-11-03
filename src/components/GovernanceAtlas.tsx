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
    title: 'Primary & Population Registries',
    badge: 'Confidentiality at Source',
    summary: 'When population surveys, public administrative registers, census records, or healthcare encounters are collected, direct personal details (names, addresses, national identifiers) are segregated at source.',
    patientAssurance: 'No researcher is ever given direct access to identifiable records, personal contact details, or unsegregated datasets.',
    caldicottLink: 'Principle 1 & 2: Purpose justified and personal identifiers avoided.',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400'
  },
  {
    step: 2,
    title: 'Independent Ethics & Purpose Review',
    badge: 'Safe People & Projects',
    summary: 'Before any population or epidemiological research begins, independent committees (such as Research Ethics Committees and the UKSA Research Accreditation Panel) verify that the study delivers demonstrable public interest benefit. Researchers must hold accredited credentials and verified Information Governance training.',
    patientAssurance: 'Commercial marketing, unauthorized advertising, and predatory profiling are strictly prohibited by law.',
    caldicottLink: 'Principle 4 & 5: Strict need-to-know access and legal accountability.',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400'
  },
  {
    step: 3,
    title: 'The Partitioned Safe Room',
    badge: 'Safe Settings & Data',
    summary: 'Researchers and epidemiologists work inside a secure, air-gapped digital workspace where external internet access and local downloading are completely blocked. Analysts cannot copy data to USB drives, email datasets, or extract records.',
    patientAssurance: 'Data never leaves the sovereign secure enclave. Only de-identified research datasets are accessible, with all personal identifiers removed.',
    caldicottLink: 'Principle 3: Minimum necessary data provided for the specific study.',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400'
  },
  {
    step: 4,
    title: 'Automated Airlock Filter',
    badge: 'Safe Outputs (k >= 10)',
    summary: 'When scientists and epidemiologists finish analyzing a cohort, their summary tables and regression models must pass through an automated digital airlock. Mathematical filters verify that low-frequency groups (fewer than 10 individuals) and high-dominance cells are permanently suppressed.',
    patientAssurance: 'No individual or household can ever be singled out or re-identified in any published study or statistical report.',
    caldicottLink: 'Principle 6 & 7: Complying with law while enabling safe, life-saving sharing.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400'
  },
  {
    step: 5,
    title: 'Epidemiological Breakthroughs',
    badge: 'Public & Social Benefit',
    summary: 'Only anonymous statistical findings leave the environment, helping develop earlier disease prevention, public health policies, epidemiological interventions, and evidence-based societal improvements.',
    patientAssurance: 'Data contributes to scientific discoveries and evidence-based policy without ever compromising individual privacy.',
    caldicottLink: 'Principle 8: Openness with the public about how confidential data protects society.',
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
    label: 'Citizens & Study Participants',
    category: 'citizen',
    shortDesc: 'Individuals whose demographic, cohort survey, or longitudinal data are protected.',
    safeguard: 'Direct identifiers never leave sovereign custody. Statutory opt-outs and privacy rights are respected in full.',
    legalBasis: 'Common Law Duty of Confidentiality & UK GDPR Art. 6(1)(e) / Art. 9(2)(j)',
    color: '#38bdf8'
  },
  {
    id: 'node-hospital',
    label: 'Population Data Registries',
    category: 'citizen',
    shortDesc: 'Longitudinal cohorts, census registries, administrative databases, and multi-modal records.',
    safeguard: 'Zero direct external internet connections; direct identifying attributes permanently segregated at source.',
    legalBasis: 'Digital Economy Act 2017 & Caldicott Principle 1',
    color: '#06b6d4'
  },
  {
    id: 'node-caldicott',
    label: 'Confidentiality Guardian & SIRO',
    category: 'legal',
    shortDesc: 'Lead officer with personal statutory responsibility for confidentiality and information risk.',
    safeguard: 'Must personally authorize sensitive data linkages or high-tier project access protocols.',
    legalBasis: 'Eight Caldicott Principles & National Data Guardian Standards',
    color: '#10b981'
  },
  {
    id: 'node-ethics',
    label: 'Ethics & Accreditation (REC / RAP)',
    category: 'legal',
    shortDesc: 'Independent committee reviewing research intent, public benefit, and researcher accreditation.',
    safeguard: 'Commercial marketing, predatory profiling, and unauthorized surveillance are prohibited by law.',
    legalBasis: 'UKSA RAP Accreditation & NHS Health Research Authority (HRA)',
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
    label: 'ISO 42001 & Clinical Safety Standards',
    category: 'legal',
    shortDesc: 'Hazard logging, data quality, and international AI management governance.',
    safeguard: 'Ensures predictive and analytical models meet safety cases before deployment in societal or care pathways.',
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
    shortDesc: 'Mathematical privacy threshold guaranteeing that low-frequency counts cannot be re-identified.',
    safeguard: 'Any result table cell representing fewer than 10 individuals is permanently masked.',
    legalBasis: 'ONS & SAIL Databank Statistical Disclosure Control Standards',
    color: '#ec4899'
  },
  {
    id: 'node-benefit',
    label: 'Epidemiological Breakthroughs',
    category: 'benefit',
    shortDesc: 'Published statistical models, population health indicators, and evidence-based policy.',
    safeguard: 'Only fully de-identified mathematical aggregates leave; individual identities remain forever safe.',
    legalBasis: 'UK GDPR Recital 26 (Anonymous Data Out of Scope)',
    color: '#10b981'
  }
];

const TRUST_EDGES = [
  { source: 'node-citizen', target: 'node-hospital', label: 'Population Data Registries' },
  { source: 'node-hospital', target: 'node-seawater', label: 'Tidal Ingress' },
  { source: 'node-caldicott', target: 'node-seawater', label: 'Confidentiality Mandate' },
  { source: 'node-ethics', target: 'node-enclave', label: 'Approved Study Protocol' },
  { source: 'node-seawater', target: 'node-enclave', label: 'Partitioned Workspace' },
  { source: 'node-iso-dcb', target: 'node-enclave', label: 'Safety Case Verification' },
  { source: 'node-enclave', target: 'node-shacl', label: 'Egress Airlock Request' },
  { source: 'node-shacl', target: 'node-opa', label: 'Compiled Rego Decision' },
  { source: 'node-opa', target: 'node-sdc', label: 'k >= 10 Verification' },
  { source: 'node-sdc', target: 'node-benefit', label: 'Safe Egress' }
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

  const COMPREHENSIVE_CHARTER_MD = `# PUBLIC INTEREST DATA GOVERNANCE & POPULATION RESEARCH CHARTER
*Standard Operating Protocol & Statutory Compliance Specification for Data Analysis & Intelligence Platforms*
*Document Reference: SEAWATER-PAC-GOV-2026-V4 | Authorized by the Data Governance & Ethics Oversight Committee*

---

## 1. Purpose & Scope
This Charter establishes the mandatory governance policy, ethical safeguards, and machine-executable controls for modern data analysis and intelligence platforms (including Trusted Research Environments [TREs], Secure Data Environments [SDEs], and AI sandbox enclaves). 

The platform supports high-impact research across population data science, epidemiology, public health, demographic analysis, social statistics, and approved commercial health life-sciences partnerships. All analytical workloads operate under an overarching principle: data subjects and citizens must remain completely protected against individual re-identification, surveillance, or unauthorized exploitation.

---

## 2. Statutory Mandates & Legal Processing Gateways
Processing across this platform is authorized and governed under statutory legislation:
- **Digital Economy Act 2017 (Part 5, Chapter 5: Research)**:
  - Section 64: Disclosure of public authority data for research in the public interest.
  - Section 70 & 71: Statutory Code of Practice and accreditation of processors, environments, and researchers under UK Statistics Authority (UKSA) oversight.
  - Section 67: Strict criminal penalties for unlawful or unauthorized disclosure of identifying data.
- **UK General Data Protection Regulation (UK GDPR)**:
  - Article 5: Principles of data minimization, purpose limitation, integrity, and confidentiality.
  - Article 6(1)(e): Processing is necessary for the performance of a task carried out in the public interest.
  - Article 9(2)(j): Processing of special category data is lawful for archiving and scientific research in the public interest.
  - Article 89(1): Technical and organizational safeguards for research and statistical analysis.
- **Data Protection Act 2018 (DPA 2018)**: Part 2 statutory provisions and Section 19 research safeguards.
- **Statistics and Registration Service Act 2007 (SRSA 2007)**: Authorizing statistical research and linkage under public interest mandates.
- **National Health Service Act 2006 (Section 251)**: Statutory exemption granted on advice of the Confidentiality Advisory Group (CAG) where clinical data linkage is required without consent.
- **Common Law Duty of Confidentiality & The Eight Caldicott Principles**: Ensuring that duty to share for public benefit is balanced with strict confidentiality.

---

## 3. Standards Architecture & Quality Frameworks
The platform compiles and verifies compliance against national and international standards:
- **ISO/IEC 42001:2023**: Artificial Intelligence Management System (AIMS) governing predictive models and in-enclave machine learning.
- **ISO/IEC 27001:2022 & ISO/IEC 27701:2019**: Information Security and Privacy Information Management Systems (ISMS/PIMS).
- **ISO/IEC 5259 Series**: Data quality and bias minimization standards for machine learning and analytical pipelines.
- **DCB0129 & DCB0160**: Statutory clinical risk management standards for health software manufacturers and deploying health organizations.
- **UK Medical Devices Regulations 2002 & MHRA SaMD**: Design and risk controls for Software as a Medical Device developed within enclaves.

---

## 4. Operational Five Safes Framework
Every analytical project is partitioned and controlled across the Five Safes:

### 4.1 Safe People
- Mandatory accreditation by statutory bodies (e.g., UKSA Research Accreditation Panel [RAP] or equivalent).
- Verified institutional identity and background checks.
- Annual certification in Information Governance (IG), data protection, and disclosure control methods.

### 4.2 Safe Projects
- Demonstrable public interest benefit test evaluated by an independent review committee.
- Validated ethics clearances (NHS REC, university ethics, or statutory research panels).
- Clear purpose limitation: use of data is restricted exclusively to the approved research question.
- Strict prohibition on commercial marketing, advertising, insurance underwriting, or individual credit assessment.

### 4.3 Safe Settings
- Fully air-gapped, zero-trust cloud workspaces with no outbound internet access.
- Ephemeral, containerized compute instances isolated per project.
- Prevention of local downloads, copy-paste exfiltration, and removable USB storage.

### 4.4 Safe Data
- Primary data minimization: only fields strictly necessary for the research protocol are provisioned.
- Deterministic pseudonymization and separation of direct personal identifiers at source.
- Multi-tier data classification (Tier 1: Aggregate/Synthetic, Tier 2: De-identified microdata, Tier 3: Controlled sensitive linkage).

### 4.5 Safe Outputs
- Quantitative Statistical Disclosure Control (SDC) enforced on all files leaving the environment.
- Mandatory primary cell suppression: any table cell with frequency fewer than 10 individuals ($k \\ge 10$) is suppressed.
- Dominance rule masking ($p\\% / (n, k)$) to prevent high-contribution values from disclosing individual identities.
- Abstract Syntax Tree (AST) scanning and weight inspection for machine learning model artifacts.

---

## 5. Flow Governance Architecture (Ingress & Egress)
Project Seawater regulates the continuous movement of data through policy-as-code:
- **Ingress Governance (Inbound Flow)**:
  - Enforces perimeter access control, Safe People accreditation, and Safe Projects ethics validation.
  - Automatically verifies inbound schemas and cohort definitions against W3C SHACL shapes to prevent corrupted or unapproved datasets.
- **Egress Governance (Outbound Flow)**:
  - Evaluates all candidate export tables, plots, and model parameters through Open Policy Agent (OPA) Rego rules.
  - Sub-millisecond execution ensures immediate fail-closed protection: if any privacy threshold is breached, export is blocked.

---

## 6. Institutional Oversight & Roles
Accountability is distributed across independent roles without reliance on single-party decisions:
- **Senior Information Risk Owner (SIRO)**: Executive accountability for organizational information risk and cybersecurity.
- **Lead Confidentiality Guardian (Caldicott Officer)**: Independent authority safeguarding citizen confidentiality and reviewing high-tier requests.
- **Data Protection Officer (DPO)**: Monitors regulatory compliance, audits Data Protection Impact Assessments (DPIAs), and interfaces with the ICO.
- **Independent Data Access Committee (DAC)**: Multidisciplinary panel of scientists, ethicists, and public representatives approving project access.
- **Clinical Safety Officer (CSO)**: Registered clinician managing Hazard Logs and Safety Cases for algorithmic tools touching health pathways.

---

## 7. Public Transparency & Auditability
- **W3C PROV-O Lineage**: Every access request, policy decision, and export clearance emits an immutable cryptographic audit record.
- **Public Register of Approved Projects**: Full lay summaries of all research studies are published openly to ensure civic transparency.
- **National Opt-Out Respect**: The platform enforces statutory opt-outs (including the NHS National Data Opt-Out in England), ensuring that individuals who opt out are systematically excluded from secondary research linkage.

*Published by the Data Governance & Access Oversight Authority.*`;

  const handleDownloadCharter = () => {
    const blob = new Blob([COMPREHENSIVE_CHARTER_MD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'POPULATION_DATA_GOVERNANCE_CHARTER_2026.md';
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
          <span>Population Data Journey &amp; Safeguards</span>
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
                <span>Public, Citizen &amp; Research Oversight Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                How Population &amp; Individual Data Is Protected
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A guide to the safety principles, statutory laws, and computer safeguards
                governing modern data analysis &amp; intelligence platforms such as TREs and SDEs, enabling vital epidemiological, demographic, and scientific discoveries while keeping confidential records strictly anonymous.
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
                  <span>Read Full Governance Charter Online</span>
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
                  Population data science, epidemiology, and health research do not operate in an isolated, static vacuum. They function across an active problem space where diverse workloads (from single query scripts to multi-cohort foundation model pipelines) must navigate statutory requirements, data linkage rules, and confidentiality thresholds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <Activity className="w-4 h-4" />
                  <span>Ingress: Access, Safe People &amp; Projects</span>
                </div>
                <p>
                  The inward flow enforces perimeter access controls, Safe People, and Safe Projects. Before data or compute enters the enclave, the gateway verifies researcher identity, institutional accreditation (e.g. UKSA RAP credentials), mandatory Information Governance training, and ethical approvals. Inbound data schemas, cohort criteria, and query payloads are validated using W3C SHACL shapes to prevent unauthorized inputs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Egress: Disclosure Control &amp; Safe Outputs</span>
                </div>
                <p>
                  The outward flow governs analytical results leaving the secure boundary. Derived statistical aggregates, trained model parameters, and epidemiological summaries pass through automated Statistical Disclosure Control (SDC) checks and microsecond OPA Rego policies enforcing k &ge; 10 cell suppression and dominance masking, ensuring zero confidential individual data leaks outward.
                </p>
              </div>
            </div>
          </div>

          {/* 5-Step Progress Pathway */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                <span>Interactive Data Journey &amp; Safeguards Map</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The 5 Steps from Source Records to Public Benefit Discoveries
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click any stage along the path to learn how individual privacy is protected by statutory principles and digital locks.
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
              {['All', 'Governance & Frameworks', 'Governance Maturity Model', 'Standards & Clinical Safety', 'Disclosure Control (SDC)', 'AI & Autonomous Agents'].map((cat) => (
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
                  Public Interest Data Governance &amp; Population Research Charter (Full Text)
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
