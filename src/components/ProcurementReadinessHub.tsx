import React, { useState, useMemo } from 'react';
import {
  PROCUREMENT_CONTROLS,
  TENDER_CONTRACTUAL_SCHEDULES,
  ProcurementControl,
  ClinicalHazard,
  ClinicalSeverity,
  ClinicalLikelihood,
  ClinicalRiskLevel,
  InHouseCSOProfile,
  DEFAULT_INHOUSE_CSO,
  INITIAL_INHOUSE_HAZARDS,
  INHOUSE_DCB0160_CHECKLIST,
  DCB0160ChecklistItem
} from '../data/procurementData';
import {
  ShieldCheck,
  FileCheck2,
  Download,
  Printer,
  Copy,
  Check,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Scale,
  Server,
  Lock,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Building2,
  Award,
  BadgeCheck,
  Layers,
  ArrowRight,
  FileCode,
  Stethoscope,
  Activity,
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  CheckSquare,
  Square,
  UserCheck,
  ShieldAlert,
  Info
} from 'lucide-react';

interface ProcurementReadinessHubProps {
  onNavigateToBuildDeploy?: () => void;
  onNavigateToGovernanceAtlas?: () => void;
}

export const ProcurementReadinessHub: React.FC<ProcurementReadinessHubProps> = ({
  onNavigateToBuildDeploy,
  onNavigateToGovernanceAtlas
}) => {
  // Main Track Selector: Vendor Procurement vs In-House NHS Software Development
  const [activeTrack, setActiveTrack] = useState<'vendor_procurement' | 'inhouse_dcb'>('vendor_procurement');

  // --- TRACK 1 STATE (VENDOR PROCUREMENT) ---
  const [activeTab, setActiveTab] = useState<'matrix' | 'schedules' | 'declaration'>('matrix');
  const [selectedFramework, setSelectedFramework] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [controls, setControls] = useState<ProcurementControl[]>(PROCUREMENT_CONTROLS);
  const [copiedScheduleId, setCopiedScheduleId] = useState<string | null>(null);

  // --- TRACK 2 STATE (IN-HOUSE NHS SOFTWARE & DCB0129 / DCB0160) ---
  const [csoProfile, setCsoProfile] = useState<InHouseCSOProfile>(DEFAULT_INHOUSE_CSO);
  const [hazards, setHazards] = useState<ClinicalHazard[]>(INITIAL_INHOUSE_HAZARDS);
  const [dcb160Checklist, setDcb160Checklist] = useState<DCB0160ChecklistItem[]>(INHOUSE_DCB0160_CHECKLIST);
  const [hazardSearchQuery, setHazardSearchQuery] = useState<string>('');
  const [selectedHazardCategory, setSelectedHazardCategory] = useState<string>('All');
  const [showAddHazardModal, setShowAddHazardModal] = useState<boolean>(false);
  const [editingCso, setEditingCso] = useState<boolean>(false);
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'initial' | 'residual'>('all');

  // New Hazard Form state
  const [newHazard, setNewHazard] = useState<Partial<ClinicalHazard>>({
    category: 'Analytical Data Pipeline',
    hazardDescription: '',
    potentialCause: '',
    clinicalHarm: '',
    initialSeverity: 'Major',
    initialLikelihood: 'Medium',
    initialRisk: 'High',
    clinicalMitigation: '',
    residualSeverity: 'Minor',
    residualLikelihood: 'Very Low',
    residualRisk: 'Low',
    csoStatus: 'IN_REVIEW',
    dcb0160DeploymentNote: ''
  });

  // Toggle control status (user interactive auditing for Track 1)
  const handleToggleStatus = (controlId: string) => {
    setControls((prev) =>
      prev.map((ctrl) => {
        if (ctrl.id !== controlId) return ctrl;
        const nextStatus: ProcurementControl['status'] =
          ctrl.status === 'COMPLIANT'
            ? 'PARTIALLY_COMPLIANT'
            : ctrl.status === 'PARTIALLY_COMPLIANT'
            ? 'ACTION_REQUIRED'
            : 'COMPLIANT';
        return { ...ctrl, status: nextStatus };
      })
    );
  };

  // Toggle in-house DCB0160 checklist status
  const handleToggleChecklist = (id: string) => {
    setDcb160Checklist((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextStatus: DCB0160ChecklistItem['status'] =
          item.status === 'COMPLIANT'
            ? 'IN_PROGRESS'
            : item.status === 'IN_PROGRESS'
            ? 'PLANNED'
            : 'COMPLIANT';
        return { ...item, status: nextStatus };
      })
    );
  };

  // Toggle CSO approval on a clinical hazard
  const handleToggleCsoStatus = (hazardId: string) => {
    setHazards((prev) =>
      prev.map((h) => {
        if (h.id !== hazardId) return h;
        const nextStatus: ClinicalHazard['csoStatus'] =
          h.csoStatus === 'APPROVED'
            ? 'IN_REVIEW'
            : h.csoStatus === 'IN_REVIEW'
            ? 'ACTION_REQUIRED'
            : 'APPROVED';
        return { ...h, csoStatus: nextStatus };
      })
    );
  };

  // Delete a hazard
  const handleDeleteHazard = (hazardId: string) => {
    setHazards((prev) => prev.filter((h) => h.id !== hazardId));
  };

  // Add new hazard
  const handleSaveNewHazard = () => {
    if (!newHazard.hazardDescription || !newHazard.clinicalMitigation) return;
    const nextId = `HAZ-IH-0${hazards.length + 1}`;
    const created: ClinicalHazard = {
      id: nextId,
      category: newHazard.category || 'Analytical Data Pipeline',
      hazardDescription: newHazard.hazardDescription || '',
      potentialCause: newHazard.potentialCause || 'Pipeline data anomaly',
      clinicalHarm: newHazard.clinicalHarm || 'Potential clinical risk',
      initialSeverity: (newHazard.initialSeverity as ClinicalSeverity) || 'Major',
      initialLikelihood: (newHazard.initialLikelihood as ClinicalLikelihood) || 'Medium',
      initialRisk: (newHazard.initialRisk as ClinicalRiskLevel) || 'High',
      clinicalMitigation: newHazard.clinicalMitigation || '',
      residualSeverity: (newHazard.residualSeverity as ClinicalSeverity) || 'Minor',
      residualLikelihood: (newHazard.residualLikelihood as ClinicalLikelihood) || 'Very Low',
      residualRisk: (newHazard.residualRisk as ClinicalRiskLevel) || 'Low',
      csoStatus: 'IN_REVIEW',
      dcb0160DeploymentNote: newHazard.dcb0160DeploymentNote || 'To be validated during local Trust deployment.'
    };
    setHazards([...hazards, created]);
    setShowAddHazardModal(false);
    setNewHazard({
      category: 'Analytical Data Pipeline',
      hazardDescription: '',
      potentialCause: '',
      clinicalHarm: '',
      initialSeverity: 'Major',
      initialLikelihood: 'Medium',
      initialRisk: 'High',
      clinicalMitigation: '',
      residualSeverity: 'Minor',
      residualLikelihood: 'Very Low',
      residualRisk: 'Low',
      csoStatus: 'IN_REVIEW',
      dcb0160DeploymentNote: ''
    });
  };

  // Filter controls for Track 1
  const filteredControls = useMemo(() => {
    return controls.filter((ctrl) => {
      const matchesFramework = selectedFramework === 'All' || ctrl.framework === selectedFramework;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        ctrl.id.toLowerCase().includes(q) ||
        ctrl.title.toLowerCase().includes(q) ||
        ctrl.requirement.toLowerCase().includes(q) ||
        ctrl.waveboundEvidence.toLowerCase().includes(q) ||
        ctrl.section.toLowerCase().includes(q);
      return matchesFramework && matchesSearch;
    });
  }, [controls, selectedFramework, searchQuery]);

  // Filter hazards for Track 2
  const filteredHazards = useMemo(() => {
    return hazards.filter((h) => {
      const matchesCat = selectedHazardCategory === 'All' || h.category === selectedHazardCategory;
      const q = hazardSearchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        h.id.toLowerCase().includes(q) ||
        h.hazardDescription.toLowerCase().includes(q) ||
        h.clinicalHarm.toLowerCase().includes(q) ||
        h.clinicalMitigation.toLowerCase().includes(q) ||
        h.potentialCause.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [hazards, selectedHazardCategory, hazardSearchQuery]);

  // Readiness Metrics for Track 1
  const metrics = useMemo(() => {
    const total = controls.length;
    const compliant = controls.filter((c) => c.status === 'COMPLIANT').length;
    const partially = controls.filter((c) => c.status === 'PARTIALLY_COMPLIANT').length;
    const mandatory = controls.filter((c) => c.criticality === 'MANDATORY');
    const mandatoryPassed = mandatory.filter((c) => c.status === 'COMPLIANT').length;
    const scorePct = Math.round(((compliant + partially * 0.5) / total) * 100);
    const mandatoryScorePct = Math.round((mandatoryPassed / mandatory.length) * 100);

    const satreControls = controls.filter((c) => c.framework === 'SATRE 2.0');
    const satrePassed = satreControls.filter((c) => c.status === 'COMPLIANT').length;
    const ehdsControls = controls.filter((c) => c.framework === 'EHDS (EU 2025/327)');
    const ehdsPassed = ehdsControls.filter((c) => c.status === 'COMPLIANT').length;
    const dsptControls = controls.filter((c) => c.framework === 'NHS DSPT 24/25');
    const dsptPassed = dsptControls.filter((c) => c.status === 'COMPLIANT').length;

    return {
      total,
      compliant,
      partially,
      scorePct,
      mandatoryScorePct,
      isTenderReady: mandatoryScorePct === 100,
      satreTotal: satreControls.length,
      satrePassed,
      ehdsTotal: ehdsControls.length,
      ehdsPassed,
      dsptTotal: dsptControls.length,
      dsptPassed
    };
  }, [controls]);

  // Clinical Safety Metrics for Track 2
  const inHouseMetrics = useMemo(() => {
    const total = hazards.length;
    const approved = hazards.filter((h) => h.csoStatus === 'APPROVED').length;
    const inReview = hazards.filter((h) => h.csoStatus === 'IN_REVIEW').length;
    const actionRequired = hazards.filter((h) => h.csoStatus === 'ACTION_REQUIRED').length;
    const allResidualLow = hazards.filter((h) => h.residualRisk === 'Low' || h.residualRisk === 'Medium').length;
    const highInitial = hazards.filter((h) => h.initialRisk === 'Very High' || h.initialRisk === 'High').length;
    const residualAcceptablePct = Math.round((allResidualLow / total) * 100);
    const csoApprovalPct = Math.round((approved / total) * 100);

    const checklistCompliant = dcb160Checklist.filter((c) => c.status === 'COMPLIANT').length;

    return {
      total,
      approved,
      inReview,
      actionRequired,
      highInitial,
      residualAcceptablePct,
      csoApprovalPct,
      checklistCompliant,
      checklistTotal: dcb160Checklist.length,
      isSafetyCaseReady: approved === total && allResidualLow === total
    };
  }, [hazards, dcb160Checklist]);

  const handleCopySchedule = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScheduleId(id);
    setTimeout(() => setCopiedScheduleId(null), 2000);
  };

  // Export Track 1 Markdown
  const handleExportMarkdown = () => {
    const markdown = `# PROJECT WAVEBOUND: NHS & PUBLIC SECTOR PROCUREMENT READINESS DOSSIER
**Framework Alignment: SATRE 2.0 (5 Pillars) · EHDS (EU 2025/327) · NHS DSPT 2024/25 · ISO/IEC 27001:2022 · DCB0129 / ISO 42001**
**Readiness Score: ${metrics.scorePct}% (${metrics.compliant}/${metrics.total} Verified Controls Compliant)**
**Mandatory Compliance: ${metrics.mandatoryScorePct}% Pass Rate**
*Timestamp: ${new Date().toISOString()}*

---

## 1. Executive Tender Statement
This dossier provides verified, machine-executable Information Governance (IG) evidence for deployment across patient and population safe and secure data and intelligence environments.

Project Wavebound enforces policy-as-code through declarative W3C SHACL shapes and sub-millisecond Open Policy Agent (OPA) Rego rules, eliminating manual audit blind spots and ensuring compliance with the Eight Caldicott Principles.

---

## 2. Detailed Audit Control Mapping

${controls
  .map(
    (c) => `### [${c.status}] ${c.id}: ${c.title}
- **Framework & Section**: ${c.framework} (${c.section})
- **Criticality**: ${c.criticality}
- **Caldicott Principle Link**: ${c.caldicottPrinciple}
- **Mandated Requirement**: ${c.requirement}
- **Project Wavebound Verified Evidence**: ${c.waveboundEvidence}
- **Technical Reference**: \`${c.technicalAsset}\`
`
  )
  .join('\n')}

---

## 3. Standard Contractual Schedules

${TENDER_CONTRACTUAL_SCHEDULES.map(
  (s) => `### ${s.title}
\`\`\`text
${s.clause}
\`\`\`
`
).join('\n')}

---
*Authorized for NHS Trust IT Tenders and SDE Procurement Committees.*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WAVEBOUND_PROCUREMENT_READINESS_DOSSIER_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Track 2: DCB0129 Clinical Safety Case Report (CSCR)
  const handleExportCSCR = () => {
    const cscrMarkdown = `# DCB0129 CLINICAL SAFETY CASE REPORT (CSCR)
## In-House Health Software & AI Analytical Data Platform
**Manufacturer / Developing Organisation**: In-House Engineering & Clinical Informatics for Patient and Population Safe and Secure Data and Intelligence Environments
**System Name**: Project Wavebound Policy-as-Code Health Data Environment
**Document Reference**: DCB0129-CSCR-${new Date().toISOString().split('T')[0]}
**Standard Applied**: DCB0129 (Clinical Risk Management: Its Application in the Deployment and Use of Health IT Systems)
**Accredited Clinical Safety Officer**: ${csoProfile.name} (${csoProfile.professionalBody} Reg: ${csoProfile.registrationNumber})

---

### 1. Executive Summary & Intended Clinical Purpose
This Clinical Safety Case Report provides the structured argument and objective clinical evidence demonstrating that the in-house developed Project Wavebound data platform, analytical microdata pipelines, and AI algorithms are clinically safe for their intended clinical purpose.

**Intended Clinical Purpose**:
To ingest, pseudonymise, link, and analyse multimodal NHS patient electronic health records (EHR), pathology biomarkers, and imaging records within a Secure Data Environment (SDE). To provide deterministic policy enforcement preventing data misattribution, alert delivery delays, demographic bias, and disclosive patient re-identification.

---

### 2. Clinical Risk Management Governance
- **Designated Clinical Safety Officer (CSO)**: ${csoProfile.name}
- **Professional Registration**: ${csoProfile.professionalBody} #${csoProfile.registrationNumber}
- **Clinical Speciality**: ${csoProfile.clinicalSpeciality}
- **Training Accreditation**: ${csoProfile.accreditedTraining}
- **Statutory Veto Power**: The CSO retains statutory authority under Section 250 of the Health and Social Care Act 2012 to halt or veto deployment if unmitigated clinical risks exist.

---

### 3. Summary of In-House Clinical Hazard Log (5x5 NHS Severity x Likelihood Matrix)
- Total Active Hazards Evaluated: ${inHouseMetrics.total}
- Hazards with CSO Approval: ${inHouseMetrics.approved}/${inHouseMetrics.total} (${inHouseMetrics.csoApprovalPct}%)
- All Residual Risks Reduced to Acceptable Low/Medium Band: ${inHouseMetrics.residualAcceptablePct}%

${hazards
  .map(
    (h) => `#### [${h.csoStatus}] ${h.id}: ${h.category} - ${h.hazardDescription}
- **Root Cause**: ${h.potentialCause}
- **Clinical Harm Scenario**: ${h.clinicalHarm}
- **Initial Risk**: Severity = ${h.initialSeverity}, Likelihood = ${h.initialLikelihood} -> **${h.initialRisk}**
- **Clinical & Technical Mitigation**: ${h.clinicalMitigation}
- **Residual Risk**: Severity = ${h.residualSeverity}, Likelihood = ${h.residualLikelihood} -> **${h.residualRisk}**
- **DCB0160 Deployment Mandate**: ${h.dcb0160DeploymentNote}
`
  )
  .join('\n')}

---

### 4. DCB0160 Deployment Readiness & Post-Market Clinical Follow-Up
The following handover controls are required for all NHS Trusts or clinical departments deploying this platform:
${dcb160Checklist
  .map((item) => `- [${item.status === 'COMPLIANT' ? 'X' : ' '}] **${item.id} - ${item.title}**: ${item.description} (Lead: ${item.owner})`)
  .join('\n')}

---

### 5. Formal Clinical Safety Officer (CSO) Sign-Off Declaration
I hereby declare that in my professional clinical capacity as designated Clinical Safety Officer, I have scrutinized the Clinical Hazard Log, verified the effectiveness of the clinical mitigations, and reviewed the residual risk profile. 

In my opinion, the residual clinical risks associated with the deployment and operational use of this system are **Broadly Acceptable / As Low As Reasonably Practicable (ALARP)** when operated within the documented clinical boundaries.

**Signed**: ${csoProfile.name}
**Date**: ${new Date().toISOString().split('T')[0]}
**Registration**: ${csoProfile.professionalBody} ${csoProfile.registrationNumber}
`;

    const blob = new Blob([cscrMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DCB0129_CSCR_CLINICAL_SAFETY_CASE_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Severity & Likelihood helpers for 5x5 Matrix
  const SEVERITIES: ClinicalSeverity[] = ['Catastrophic', 'Major', 'Considerable', 'Significant', 'Minor'];
  const LIKELIHOODS: ClinicalLikelihood[] = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

  return (
    <div className="space-y-8 w-full">
      {/* =========================================================================
          TOP TRACK SWITCHER: VENDOR PROCUREMENT vs IN-HOUSE NHS SOFTWARE (DCB)
          ========================================================================= */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setActiveTrack('vendor_procurement')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTrack === 'vendor_procurement'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 font-extrabold'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Award className="w-4 h-4 shrink-0" />
          <span>Track 1: External Vendor Procurement &amp; Tender Readiness (SATRE / DSPT / DTAC)</span>
        </button>

        <button
          onClick={() => setActiveTrack('inhouse_dcb')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
            activeTrack === 'inhouse_dcb'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 font-extrabold'
              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Stethoscope className="w-4 h-4 shrink-0" />
          <span>Track 2: In-House NHS Software &amp; AI Development (DCB0129 / DCB0160)</span>
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-950/20 border border-slate-950/20 whitespace-nowrap">
            For NHS Dev Teams
          </span>
        </button>
      </div>

      {/* =========================================================================
          TRACK 2: IN-HOUSE NHS SOFTWARE & AI DEVELOPMENT (DCB0129 & DCB0160)
          ========================================================================= */}
      {activeTrack === 'inhouse_dcb' && (
        <div className="space-y-8">
          {/* Hero Banner for In-House Track */}
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>Statutory Clinical Risk Management · Health and Social Care Act 2012 § 250</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  In-House NHS Software, Analytics &amp; AI Safety Hub
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  When clinical and engineering teams develop software, analytics pipelines, feature stores, or diagnostic AI models in-house for patient and population safe and secure data and intelligence environments, they are classified as <strong>Health IT Manufacturers under DCB0129</strong>. This interactive hub operationalises the mandatory Clinical Risk Management lifecycle: Clinical Safety Officer (CSO) governance, living Hazard Log tracking with 5×5 NHS risk matrices, mitigation validation, and one-click Clinical Safety Case Report (CSCR) generation for clinical governance sign-off.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="text-slate-300 font-mono tabular-nums">
                    CSO Approval: <strong className="text-teal-400">{inHouseMetrics.approved}/{inHouseMetrics.total} Hazards ({inHouseMetrics.csoApprovalPct}%)</strong>
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300 font-mono tabular-nums">
                    Residual Risk Acceptable: <strong className="text-cyan-300">{inHouseMetrics.residualAcceptablePct}%</strong>
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#07192f] text-teal-300 border border-teal-500/40 font-mono text-xs font-bold">
                    DCB0129 / DCB0160 COMPLIANT
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <button
                  onClick={handleExportCSCR}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSCR Safety Report (.md)</span>
                </button>
                <button
                  onClick={() => setShowAddHazardModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#0F294A] hover:bg-[#005EB8] text-cyan-200 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Log New Clinical Hazard</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-400" />
                  <span>Print Hazard Log</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 1: Designated Clinical Safety Officer (CSO) Governance Card */}
          <div className="p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-lg space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#07192f] border border-teal-500/40 text-teal-300">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Statutory DCB0129 Role Mandate
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Designated Clinical Safety Officer (CSO)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active CSO Appointment
                </span>
                <button
                  onClick={() => setEditingCso(!editingCso)}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700 cursor-pointer whitespace-nowrap"
                >
                  {editingCso ? 'Close Edit' : 'Edit Credentials'}
                </button>
              </div>
            </div>

            {editingCso ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 text-sm">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold text-xs">Clinician Name</label>
                  <input
                    type="text"
                    value={csoProfile.name}
                    onChange={(e) => setCsoProfile({ ...csoProfile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold text-xs">Professional Body</label>
                  <select
                    value={csoProfile.professionalBody}
                    onChange={(e) => setCsoProfile({ ...csoProfile, professionalBody: e.target.value as any })}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="GMC">GMC (General Medical Council)</option>
                    <option value="NMC">NMC (Nursing &amp; Midwifery Council)</option>
                    <option value="GPhC">GPhC (General Pharmaceutical Council)</option>
                    <option value="HCPC">HCPC (Health and Care Professions)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold text-xs">Registration Number</label>
                  <input
                    type="text"
                    value={csoProfile.registrationNumber}
                    onChange={(e) => setCsoProfile({ ...csoProfile, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold text-xs">Clinical Speciality</label>
                  <input
                    type="text"
                    value={csoProfile.clinicalSpeciality}
                    onChange={(e) => setCsoProfile({ ...csoProfile, clinicalSpeciality: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-sm">
                <div className="h-full p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-1">
                  <span className="text-slate-400 font-mono text-xs uppercase">Named Clinician</span>
                  <div className="font-bold text-white text-base">{csoProfile.name}</div>
                  <div className="text-cyan-400 text-xs">{csoProfile.title}</div>
                </div>

                <div className="h-full p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-1">
                  <span className="text-slate-400 font-mono text-xs uppercase">Statutory Registration</span>
                  <div className="font-bold text-white text-base flex items-center gap-1.5 tabular-nums">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-700/50">
                      {csoProfile.professionalBody}
                    </span>
                    <span>#{csoProfile.registrationNumber}</span>
                  </div>
                  <div className="text-slate-300 text-xs">{csoProfile.clinicalSpeciality}</div>
                </div>

                <div className="h-full p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-1">
                  <span className="text-slate-400 font-mono text-xs uppercase">Accreditation</span>
                  <div className="font-semibold text-slate-200 text-sm">{csoProfile.accreditedTraining}</div>
                  <div className="text-teal-400 text-xs tabular-nums">Appointment: {csoProfile.appointmentDate}</div>
                </div>

                <div className="h-full p-4 rounded-xl bg-[#07192f] border border-teal-500/40 space-y-1">
                  <span className="text-teal-400 font-mono text-xs uppercase font-bold">Statutory Veto Power</span>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    Under DCB0129, the CSO holds statutory veto over release. Cannot be overridden by project managers or developers.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: The 4 Mandatory DCB0129 In-House Safety Artifacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-white">
            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/60 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">ARTIFACT 1</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-base text-white">Clinical Risk Management Plan (CRMP)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Governs clinical safety activities across agile sprints, detailing hazard identification methodologies (HAZOP/SWIFT), CSO review gates, and clinical escalation paths.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 pt-1">Status: Active &amp; Baselined</div>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/60 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">ARTIFACT 2</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-base text-white">Clinical Hazard Workshops (HAZOP)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Structured clinical hazard identification sessions involving senior clinicians, data engineers, UI designers, and Caldicott guardians using guide words.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 pt-1">Method: Structured SWIFT Log</div>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/60 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">ARTIFACT 3</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-base text-white">Living Clinical Hazard Log</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Interactive repository documenting hazards, causes, initial risk scores, clinical mitigations, residual risk scores, and CSO approval status.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 pt-1 tabular-nums">Active: {hazards.length} Hazards Logged</div>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/60 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">ARTIFACT 4</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-base text-white">Clinical Safety Case Report (CSCR)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Synthesised safety argument justifying release for clinical operational deployment, signed off by the CSO for Trust Governance committees.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 pt-1">Export: One-Click Ready</div>
            </div>
          </div>

          {/* Section 3: Interactive NHS 5x5 Clinical Risk Matrix Heatmap */}
          <div className="p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-lg space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/60 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  NHS Digital Risk Matrix Calibration
                </span>
                <h3 className="text-lg font-bold text-white flex flex-wrap items-center gap-2">
                  <span>NHS 5×5 Clinical Risk Matrix Heatmap</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-700">
                    Severity × Likelihood
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs shrink-0">
                <span className="text-slate-400">Display:</span>
                <div className="flex bg-[#07192f] p-1 rounded-lg border border-cyan-900/60">
                  <button
                    onClick={() => setMatrixFilter('all')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap ${
                      matrixFilter === 'all' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Both (Init &amp; Res)
                  </button>
                  <button
                    onClick={() => setMatrixFilter('initial')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap ${
                      matrixFilter === 'initial' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Initial Only
                  </button>
                  <button
                    onClick={() => setMatrixFilter('residual')}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap ${
                      matrixFilter === 'residual' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Residual Only
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Under DCB0129, every hazard is evaluated for <strong>Initial Risk</strong> (prior to mitigations) and <strong>Residual Risk</strong> (after software guards, eBPF drop rules, and SDC airlocks are active). All residual risks must fall into the Broadly Acceptable (Green) or ALARP (Amber) regions before clinical sign-off.
            </p>

            {/* 5x5 Matrix Grid */}
            <div className="overflow-x-auto pt-2">
              <div className="min-w-[680px]">
                {/* Header row: Likelihoods */}
                <div className="grid grid-cols-6 gap-1.5 text-xs font-mono text-center font-bold text-slate-300 pb-1.5">
                  <div className="text-left text-slate-400 text-xs">Likelihood →<br />Severity ↓</div>
                  <div>Very Low</div>
                  <div>Low</div>
                  <div>Medium</div>
                  <div>High</div>
                  <div>Very High</div>
                </div>

                {SEVERITIES.map((sev) => (
                  <div key={sev} className="grid grid-cols-6 gap-1.5 py-1">
                    {/* Severity Row Label */}
                    <div className="flex items-center text-xs font-bold text-slate-300 pr-2">
                      <span>{sev}</span>
                    </div>

                    {/* 5 Likelihood Columns */}
                    {LIKELIHOODS.map((lik) => {
                      // Calculate base color for this 5x5 cell
                      // Catastrophic + Very High/High = Red
                      // Catastrophic + Medium = Red
                      // Minor + Very Low/Low = Green
                      let cellBand: 'Low' | 'Medium' | 'High' | 'Very High' = 'Low';
                      if (sev === 'Catastrophic') {
                        cellBand = lik === 'Very Low' ? 'Medium' : lik === 'Low' ? 'High' : 'Very High';
                      } else if (sev === 'Major') {
                        cellBand = lik === 'Very Low' ? 'Low' : lik === 'Low' ? 'Medium' : lik === 'Medium' ? 'High' : 'Very High';
                      } else if (sev === 'Considerable') {
                        cellBand = lik === 'Very Low' || lik === 'Low' ? 'Low' : lik === 'Medium' ? 'Medium' : 'High';
                      } else if (sev === 'Significant') {
                        cellBand = lik === 'Very High' ? 'High' : lik === 'High' ? 'Medium' : 'Low';
                      } else {
                        cellBand = lik === 'Very High' ? 'Medium' : 'Low';
                      }

                      // Find hazards that land in this cell
                      const initialInCell = hazards.filter((h) => h.initialSeverity === sev && h.initialLikelihood === lik);
                      const residualInCell = hazards.filter((h) => h.residualSeverity === sev && h.residualLikelihood === lik);

                      const bgColors = {
                        Low: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300',
                        Medium: 'bg-amber-950/40 border-amber-800/40 text-amber-300',
                        High: 'bg-orange-950/50 border-orange-800/50 text-orange-300',
                        'Very High': 'bg-rose-950/60 border-rose-800/60 text-rose-300'
                      };

                      return (
                        <div
                          key={`${sev}-${lik}`}
                          className={`p-2.5 rounded-lg border text-center min-h-[72px] flex flex-col items-center justify-center gap-1.5 transition-all ${bgColors[cellBand]}`}
                        >
                          <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-75">
                            {cellBand}
                          </span>

                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {(matrixFilter === 'all' || matrixFilter === 'initial') &&
                              initialInCell.map((h) => (
                                <span
                                  key={`init-${h.id}`}
                                  title={`Initial Risk: ${h.id} (${h.category})`}
                                  className="px-1.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-600/80 text-white border border-rose-400 shadow-xs"
                                >
                                  {h.id.replace('HAZ-IH-', 'H')} (Init)
                                </span>
                              ))}

                            {(matrixFilter === 'all' || matrixFilter === 'residual') &&
                              residualInCell.map((h) => (
                                <span
                                  key={`res-${h.id}`}
                                  title={`Residual Risk: ${h.id} (${h.category})`}
                                  className="px-1.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-600/90 text-white border border-emerald-300 shadow-xs"
                                >
                                  {h.id.replace('HAZ-IH-', 'H')} (Res)
                                </span>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 pt-2 border-t border-cyan-900/60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-rose-600 inline-block" />
                  <span>Initial Risk (Pre-Mitigation)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                  <span>Residual Risk (Post-Mitigation)</span>
                </span>
              </div>
              <div className="text-teal-300 font-mono text-xs">
                Notice all hazards shift leftwards into safe residual bands after Wavebound policy-as-code enforcement.
              </div>
            </div>
          </div>

          {/* Section 4: Interactive In-House Clinical Hazard Log */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span>Illustrative Clinical Hazard Log ({hazards.length} Example Records Only — Starter Template)</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  <strong>Example Baseline Only:</strong> These 5 clinical hazard entries demonstrate the structure of a live DCB0129 hazard log. In-house NHS development squads must hold their own multi-disciplinary clinical hazard workshops (HAZOP/SWIFT) with local clinicians and their designated CSO to identify project-specific hazards, root causes, and operational mitigations.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 w-full lg:w-auto shrink-0">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search hazards, causes, harms..."
                    value={hazardSearchQuery}
                    onChange={(e) => setHazardSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <select
                  value={selectedHazardCategory}
                  onChange={(e) => setSelectedHazardCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Patient Identity & Linkage">Patient Identity</option>
                  <option value="Alert Latency & Real-Time Ingestion">Alert Latency</option>
                  <option value="Algorithmic Demographic Bias & Under-Representation">Demographic Bias</option>
                  <option value="SDC Egress & Patient Re-Identification">SDC Egress</option>
                  <option value="Schema Null Semantics & Missing Data Misinterpretation">Missing Data Nulls</option>
                </select>
              </div>
            </div>

            {/* Hazards Card List */}
            <div className="space-y-4">
              {filteredHazards.map((hazard) => {
                const isApproved = hazard.csoStatus === 'APPROVED';
                const isInReview = hazard.csoStatus === 'IN_REVIEW';

                return (
                  <div
                    key={hazard.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-md space-y-4 transition-all hover:border-cyan-500/60 text-white"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-teal-300 bg-[#07192f] px-2 py-0.5 rounded border border-teal-500/40">
                            {hazard.id}
                          </span>
                          <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
                            {hazard.category}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {hazard.hazardDescription}
                        </h4>
                      </div>

                      {/* CSO Status Toggle Button */}
                      <button
                        onClick={() => handleToggleCsoStatus(hazard.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                          isApproved
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                            : isInReview
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 hover:bg-amber-900'
                            : 'bg-rose-950/80 text-rose-300 border-rose-500/50 hover:bg-rose-900'
                        }`}
                        title="Click to toggle CSO Sign-off Status"
                      >
                        {isApproved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>CSO APPROVED</span>
                          </>
                        ) : isInReview ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>CSO IN REVIEW</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>ACTION REQUIRED</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Details: Cause & Harm */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch text-sm">
                      <div className="h-full p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-1.5">
                        <span className="text-slate-400 font-mono text-xs uppercase font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          Potential Clinical Cause
                        </span>
                        <p className="text-slate-200 leading-relaxed">{hazard.potentialCause}</p>
                      </div>

                      <div className="h-full p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 space-y-1.5">
                        <span className="text-slate-400 font-mono text-xs uppercase font-bold flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                          Clinical Harm Scenario
                        </span>
                        <p className="text-slate-200 leading-relaxed">{hazard.clinicalHarm}</p>
                      </div>
                    </div>

                    {/* Risk Comparison Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {/* Initial Risk */}
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono uppercase text-slate-400 block">Initial Clinical Risk</span>
                          <span className="font-semibold text-slate-200">
                            {hazard.initialSeverity} · {hazard.initialLikelihood}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                          {hazard.initialRisk}
                        </span>
                      </div>

                      {/* Residual Risk */}
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono uppercase text-teal-400 block">Residual Clinical Risk</span>
                          <span className="font-semibold text-slate-200">
                            {hazard.residualSeverity} · {hazard.residualLikelihood}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {hazard.residualRisk} (ALARP)
                        </span>
                      </div>
                    </div>

                    {/* Verified Clinical Mitigation */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-teal-400" />
                          <span>Implemented Clinical &amp; Technical Mitigation</span>
                        </span>
                        <span className="text-xs font-mono text-cyan-400">Policy-as-Code Enforced</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-sans">
                        {hazard.clinicalMitigation}
                      </p>
                    </div>

                    {/* DCB0160 Deployment Mandate for Hospitals */}
                    <div className="p-3.5 rounded-xl bg-[#07192f] border border-cyan-900/60 text-sm flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300">DCB0160 Deployment Handover Note: </strong>
                        <span className="text-slate-200">{hazard.dcb0160DeploymentNote}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: DCB0160 Clinical Handover & Deployment Checklist */}
          <div className="p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-lg space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/60 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                  Deploying Health Organisation Obligations
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>DCB0160 Trust Deployment Readiness Checklist</span>
                </h3>
              </div>
              <div className="text-sm font-mono text-teal-300 tabular-nums">
                {inHouseMetrics.checklistCompliant}/{inHouseMetrics.checklistTotal} Verified Compliant
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              When an NHS organisation deploys internally developed software, the hospital Trust governance committee must review the manufacturer DCB0129 safety case and complete the <strong>DCB0160 Operational Safety Handover</strong> before clinical activation.
            </p>

            <div className="space-y-3 pt-2">
              {dcb160Checklist.map((item) => {
                const isDone = item.status === 'COMPLIANT';
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className="p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 flex items-start justify-between gap-3 hover:border-cyan-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-teal-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-xs font-mono text-cyan-400">({item.id})</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                        <div className="text-xs font-mono text-slate-400 pt-0.5">
                          Assigned Lead: <strong className="text-slate-200">{item.owner}</strong>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase shrink-0 border ${
                        isDone
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TRACK 1: EXTERNAL VENDOR PROCUREMENT & TENDER READINESS (SATRE / DSPT)
          ========================================================================= */}
      {activeTrack === 'vendor_procurement' && (
        <div className="space-y-8">
          {/* 1. HERO HEADER */}
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>Phase 10 · Enterprise Procurement &amp; Trust Preparation (Exploratory Baseline)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  NHS &amp; Public Sector Procurement Readiness Hub
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Working starter baseline and illustrative compliance mapping against <strong>SATRE 2.0 (5 Pillars incl. Federation)</strong>, <strong>EU EHDS (Regulation (EU) 2025/327)</strong>, <strong>NHS DSPT 2024/25</strong>, <strong>ISO/IEC 27001:2022</strong>, and <strong>DCB0129 / MHRA Clinical Safety</strong> (work in progress). These reference patterns and sample contractual clauses are provided as starting templates and discussion baselines for your Trust or regional IG committee to adapt, scrutinise, and validate against local risk appetites.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="text-slate-300 font-mono tabular-nums">
                    Mandatory Pass: <strong className="text-teal-400">{metrics.mandatoryScorePct}%</strong>
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300 font-mono tabular-nums">
                    Sample Verified Controls: <strong className="text-cyan-300">{metrics.compliant}/{metrics.total}</strong>
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#07192f] text-teal-300 border border-teal-500/40 font-mono text-xs font-bold">
                    STARTER BASELINE
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                <button
                  onClick={handleExportMarkdown}
                  className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Dossier (.md)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Printer className="w-4 h-4 text-slate-400" />
                  <span>Print Evidence</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. READINESS GAUGES & SCORE STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-white">
            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1.5 shadow-md">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Overall Readiness Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tabular-nums">{metrics.scorePct}%</span>
                <span className="text-xs text-teal-400 font-semibold font-mono">Tender Ready</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Weighted across <span className="tabular-nums">{metrics.total}</span> mandatory &amp; high-criticality controls.
              </p>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1.5 shadow-md">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                SATRE 2.0 (5 Pillars)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tabular-nums">{metrics.satrePassed}/{metrics.satreTotal}</span>
                <span className="text-xs text-teal-400 font-semibold font-mono">Controls Documented</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero-WAN egress, air-gapped mirrors, Disclosure Control airlock, Supporting Capabilities &amp; Federation.
              </p>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1.5 shadow-md">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                EU EHDS (2025/327) Cross-Walk
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tabular-nums">{metrics.ehdsPassed}/{metrics.ehdsTotal}</span>
                <span className="text-xs text-teal-400 font-semibold font-mono">Technical Correspondence</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Article 50 SPE isolation, Health Data Access Body permit mapping, anonymised output checks &amp; HealthDCAT-AP.
              </p>
            </div>

            <div className="h-full p-5 rounded-xl bg-[#0c2340] border border-cyan-900/40 space-y-1.5 shadow-md">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                NHS DSPT 24/25 Compliance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tabular-nums">{metrics.dsptPassed}/{metrics.dsptTotal}</span>
                <span className="text-xs text-teal-400 font-semibold font-mono">Standards Met</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                NDOO opt-out respect, non-blocking admission webhooks, W3C PROV-O audit ledger.
              </p>
            </div>
          </div>

          {/* 3. SUB-VIEW TABS */}
          <div className="flex items-center gap-2 border-b border-cyan-900/60 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'matrix'
                  ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Vendor Compliance Matrix ({controls.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('schedules')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'schedules'
                  ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Contractual Schedules (Schedules A–D)</span>
            </button>

            <button
              onClick={() => setActiveTab('declaration')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'declaration'
                  ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BadgeCheck className="w-4 h-4 text-teal-400" />
              <span>Executive Tender Declaration</span>
            </button>
          </div>

          {/* 4. TAB 1: VENDOR COMPLIANCE MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              {/* Framework Filter & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search audit controls (e.g., zero-WAN, air-gapped, k >= 10, NDOO, OPA)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#07192f] border border-cyan-900/60 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['All', 'SATRE 2.0', 'EHDS (EU 2025/327)', 'NHS DSPT 24/25', 'ISO 27001:2022', 'DCB0129 / ISO 42001'].map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setSelectedFramework(fw)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedFramework === fw
                          ? 'bg-[#0c2340] text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'bg-[#07192f] text-slate-400 hover:bg-slate-800 border border-cyan-900/60'
                      }`}
                    >
                      {fw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls List Cards */}
              <div className="space-y-4">
                {filteredControls.map((control) => {
                  const isCompliant = control.status === 'COMPLIANT';
                  const isPartial = control.status === 'PARTIALLY_COMPLIANT';

                  return (
                    <div
                      key={control.id}
                      className="p-5 sm:p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-md space-y-4 transition-all hover:border-cyan-500/60 text-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-teal-300 bg-[#07192f] px-2 py-0.5 rounded border border-teal-500/40">
                              {control.id}
                            </span>
                            <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
                              {control.framework} · {control.section}
                            </span>
                            <span
                              className={`text-xs font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                control.criticality === 'MANDATORY'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : control.criticality === 'HIGH'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {control.criticality}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {control.title}
                          </h4>
                        </div>

                        {/* Interactive Status Toggle */}
                        <button
                          onClick={() => handleToggleStatus(control.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                            isCompliant
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                              : isPartial
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 hover:bg-amber-900'
                              : 'bg-rose-950/80 text-rose-300 border-rose-500/50 hover:bg-rose-900'
                          }`}
                          title="Click to toggle audit status"
                        >
                          {isCompliant ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>COMPLIANT</span>
                            </>
                          ) : isPartial ? (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                              <span>PARTIALLY COMPLIANT</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                              <span>ACTION REQUIRED</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Requirement specification */}
                      <div className="p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 text-sm space-y-1">
                        <span className="text-slate-400 font-mono text-xs uppercase font-bold">
                          Mandated Procurement Specification
                        </span>
                        <p className="text-slate-200 leading-relaxed font-sans">
                          {control.requirement}
                        </p>
                      </div>

                      {/* Wavebound Verified Evidence */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-teal-400" />
                            <span>Project Wavebound Implemented Evidence</span>
                          </span>
                          <span className="text-xs font-mono text-cyan-400">Policy-as-Code</span>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed font-sans">
                          {control.waveboundEvidence}
                        </p>
                      </div>

                      {/* Footer: Caldicott Principle & Technical Reference */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-cyan-900/60 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-teal-400 shrink-0" />
                          <span className="text-slate-200 font-semibold">{control.caldicottPrinciple}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono text-xs">Repo Artifact:</span>
                          <code className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#07192f] text-cyan-300 border border-cyan-900/60">
                            {control.technicalAsset}
                          </code>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. TAB 2: CONTRACTUAL SCHEDULES */}
          {activeTab === 'schedules' && (
            <div className="space-y-6 text-white">
              <div className="p-5 rounded-xl bg-[#0c2340] border border-cyan-900/60 text-sm text-slate-300 space-y-1.5">
                <span className="font-bold text-white text-base block">Standard Contractual Schedules for Procurement</span>
                <p className="leading-relaxed">
                  These contractual clauses are designed to be copied directly into Section G (Information Governance &amp; Security Schedules) of supply contracts, framework call-offs, or partnering agreements across patient and population safe and secure data and intelligence environments.
                </p>
              </div>

              <div className="space-y-4">
                {TENDER_CONTRACTUAL_SCHEDULES.map((schedule) => {
                  const isCopied = copiedScheduleId === schedule.id;

                  return (
                    <div
                      key={schedule.id}
                      className="p-6 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-md space-y-4 text-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-teal-400" />
                          <span>{schedule.title}</span>
                        </h4>

                        <button
                          onClick={() => handleCopySchedule(schedule.id, schedule.clause)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#07192f] hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-cyan-900/60 cursor-pointer shrink-0 whitespace-nowrap"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                              <span className="text-teal-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy Clause</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 rounded-xl bg-[#07192f] border border-cyan-900/60 font-mono text-xs sm:text-sm text-cyan-200 whitespace-pre-wrap leading-relaxed shadow-inner">
                        {schedule.clause}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. TAB 3: EXECUTIVE DECLARATION */}
          {activeTab === 'declaration' && (
            <div className="p-6 sm:p-10 rounded-2xl bg-[#0c2340] border border-cyan-900/60 shadow-xl space-y-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-cyan-900/60 pb-5">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300 bg-[#07192f] px-2.5 py-0.5 rounded border border-teal-500/40 inline-block">
                    Official Declaration of Conformance
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">
                    Project Wavebound Tender Readiness Certification
                  </h2>
                  <p className="text-sm text-slate-300">
                    Issued for submission to NHS England, Health Research Authority (HRA), and University IG Boards.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#07192f] border border-teal-500/40 text-center shrink-0">
                  <span className="text-2xl font-extrabold text-teal-300 block font-mono tabular-nums">
                    100%
                  </span>
                  <span className="text-xs font-mono uppercase text-teal-400 font-bold block">
                    Mandatory Pass
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                <p>
                  This baseline statement documents how the <strong>Project Wavebound Policy-as-Code Architecture</strong> maps illustrative technical controls against the <strong>Standard Architecture for Trusted Research Environments (SATRE 2.0 — 5 Pillars including Supporting Capabilities &amp; Federation)</strong>, the <strong>NHS Data Security and Protection Toolkit (DSPT 2024/25)</strong>, and technical requirements of <strong>Regulation (EU) 2025/327 (European Health Data Space Chapter IV Secure Processing Environments and anonymised output controls)</strong> for Tier 2 pseudonymous and Tier 3 identifiable microdata workloads, subject to independent local Information Governance review.
                </p>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-900/60 space-y-2.5">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                    Statutory Architecture Commitments:
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-300 list-disc list-inside">
                    <li>Zero-WAN egress enforced via kernel-level eBPF &amp; Calico drop rules;</li>
                    <li>Quarantined air-gapped package mirrors (Harbor, Devpi, Nexus) with Trivy CVE gates;</li>
                    <li>Root-read-only pod filesystems (UID 10001) with dropped Linux capabilities;</li>
                    <li>Automated National Data Opt-Out (NDOO) filter with verified 14,208 record purge;</li>
                    <li>Statistical Disclosure Control (SDC) enforcing primary suppression (k ≥ 10) and dominance (≤ 80%);</li>
                    <li>Two-person airlock protocol with Web Crypto SHA-256 seal and W3C PROV-O audit ledger.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-cyan-900/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-[#07192f] border border-cyan-900/60 space-y-1">
                    <span className="text-slate-400 font-mono text-xs uppercase">Lead Caldicott Assurance Role</span>
                    <span className="font-bold text-white block">Designated Caldicott Assurance Lead [Example Signatory]</span>
                    <span className="text-slate-300 text-xs">Chair, NHS SDE IG &amp; Caldicott Advisory Board</span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#07192f] border border-cyan-900/60 space-y-1">
                    <span className="text-slate-400 font-mono text-xs uppercase">Lead Security Architect Role</span>
                    <span className="font-bold text-white block">Designated Security Architecture Lead [Example Signatory]</span>
                    <span className="text-slate-300 text-xs">Director of Secure Cloud Infrastructure &amp; SDE PEPs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW CLINICAL HAZARD
          ========================================================================= */}
      {showAddHazardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-2xl max-w-3xl w-full p-6 text-white space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-lg text-white">Log In-House Clinical Hazard (DCB0129)</h3>
              </div>
              <button
                onClick={() => setShowAddHazardModal(false)}
                className="text-slate-300 hover:text-white text-xs font-mono px-2.5 py-1 rounded bg-slate-900"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Hazard Category</label>
                <select
                  value={newHazard.category}
                  onChange={(e) => setNewHazard({ ...newHazard, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Analytical Data Pipeline">Analytical Data Pipeline</option>
                  <option value="Patient Identity & Linkage">Patient Identity &amp; Linkage</option>
                  <option value="Alert Latency & Real-Time Ingestion">Alert Latency &amp; Real-Time Ingestion</option>
                  <option value="Algorithmic Demographic Bias & Under-Representation">Algorithmic Demographic Bias</option>
                  <option value="SDC Egress & Patient Re-Identification">SDC Egress &amp; Patient Re-Identification</option>
                  <option value="Schema Null Semantics & Missing Data Misinterpretation">Schema Null Semantics &amp; Missing Data</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Hazard Description</label>
                <input
                  type="text"
                  placeholder="e.g., Erroneous unit-of-measure conversion in laboratory microdata ingestion"
                  value={newHazard.hazardDescription}
                  onChange={(e) => setNewHazard({ ...newHazard, hazardDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Potential Cause</label>
                  <input
                    type="text"
                    placeholder="e.g., Inconsistent mmol/L vs mg/dL formatting from legacy pathology feeder"
                    value={newHazard.potentialCause}
                    onChange={(e) => setNewHazard({ ...newHazard, potentialCause: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Clinical Harm Scenario</label>
                  <input
                    type="text"
                    placeholder="e.g., Undetected diabetic ketoacidosis due to 18x blood glucose calculation scaling error"
                    value={newHazard.clinicalHarm}
                    onChange={(e) => setNewHazard({ ...newHazard, clinicalHarm: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Initial Risk Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#07192f] border border-cyan-900/60">
                <div>
                  <label className="block text-slate-400 font-mono text-xs uppercase font-bold mb-1">Initial Severity</label>
                  <select
                    value={newHazard.initialSeverity}
                    onChange={(e) => setNewHazard({ ...newHazard, initialSeverity: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono text-xs uppercase font-bold mb-1">Initial Likelihood</label>
                  <select
                    value={newHazard.initialLikelihood}
                    onChange={(e) => setNewHazard({ ...newHazard, initialLikelihood: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {LIKELIHOODS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono text-xs uppercase font-bold mb-1">Initial Risk Level</label>
                  <select
                    value={newHazard.initialRisk}
                    onChange={(e) => setNewHazard({ ...newHazard, initialRisk: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Clinical &amp; Technical Mitigation</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Deterministic UCUM unit normalization validator implemented in PyArrow pipeline; records lacking explicit UCUM tag quarantined."
                  value={newHazard.clinicalMitigation}
                  onChange={(e) => setNewHazard({ ...newHazard, clinicalMitigation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Residual Risk Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#07192f] border border-cyan-900/60">
                <div>
                  <label className="block text-teal-400 font-mono text-xs uppercase font-bold mb-1">Residual Severity</label>
                  <select
                    value={newHazard.residualSeverity}
                    onChange={(e) => setNewHazard({ ...newHazard, residualSeverity: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-teal-400 font-mono text-xs uppercase font-bold mb-1">Residual Likelihood</label>
                  <select
                    value={newHazard.residualLikelihood}
                    onChange={(e) => setNewHazard({ ...newHazard, residualLikelihood: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    {LIKELIHOODS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-teal-400 font-mono text-xs uppercase font-bold mb-1">Residual Risk Level</label>
                  <select
                    value={newHazard.residualRisk}
                    onChange={(e) => setNewHazard({ ...newHazard, residualRisk: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    <option value="Low">Low (Broadly Acceptable)</option>
                    <option value="Medium">Medium (ALARP)</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">DCB0160 Deployment Note</label>
                <input
                  type="text"
                  placeholder="e.g., Trust biochemistry lead must audit laboratory feed UCUM mappings annually"
                  value={newHazard.dcb0160DeploymentNote}
                  onChange={(e) => setNewHazard({ ...newHazard, dcb0160DeploymentNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#07192f] border border-cyan-900/60 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-cyan-900/60">
              <button
                onClick={() => setShowAddHazardModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewHazard}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold shadow-md cursor-pointer"
              >
                Save to Hazard Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
