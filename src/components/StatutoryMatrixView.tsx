import React, { useState, useMemo } from 'react';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  ExternalLink,
  Info,
  BookOpen,
  FileCheck2,
  Lock,
  Layers,
  FileText
} from 'lucide-react';

export interface StatutoryMatrixRow {
  id: string;
  pillar: 'Safe People' | 'Safe Projects' | 'Safe Settings' | 'Safe Data' | 'Safe Outputs';
  gateName: string;
  statutoryInstrument: string;
  statutorySection: string;
  ukGdprBasis: string;
  caldicottPrinciples: string[];
  machinePolicyNode: string;
  currentStatus: 'PASS' | 'WARN' | 'FAIL';
  liveFinding: string;
  decisionRef: string;
  decisionTitle: string;
  accountableRole: string;
  remedialAction: string;
}

interface StatutoryMatrixViewProps {
  researcherStatus: 'accredited' | 'pending' | 'unaccredited';
  ethicsStatus: 'approved' | 'in_review' | 'none';
  s251Status: 'authorized' | 'exempt' | 'missing';
  dataTier: 'tier1_aggregate' | 'tier2_pseudonymised' | 'tier3_identifiable';
  minCellCount: number;
  dominanceRatio: number;
  enclaveEgressBlocked: boolean;
  aiWorkloadType: 'none' | 'assistive' | 'autonomous_high_risk';
  aiHumanSponsorLinked: boolean;
  onNavigateToDecisionRegister?: (decisionRef: string) => void;
  onOpenEvidenceDossier: () => void;
}

export const StatutoryMatrixView: React.FC<StatutoryMatrixViewProps> = ({
  researcherStatus,
  ethicsStatus,
  s251Status,
  dataTier,
  minCellCount,
  dominanceRatio,
  enclaveEgressBlocked,
  aiWorkloadType,
  aiHumanSponsorLinked,
  onNavigateToDecisionRegister,
  onOpenEvidenceDossier
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedMatrix, setCopiedMatrix] = useState<boolean>(false);

  // Compute live matrix rows based on current simulation state
  const matrixRows: StatutoryMatrixRow[] = useMemo(() => {
    const rows: StatutoryMatrixRow[] = [];

    // Row 1: Safe People - Accreditation & IG Training
    const safePersonPass = researcherStatus === 'accredited';
    const safePersonWarn = researcherStatus === 'pending';
    rows.push({
      id: 'stat_safe_person',
      pillar: 'Safe People',
      gateName: 'Researcher Accreditation & IG Training Mandate',
      statutoryInstrument: 'Digital Economy Act 2017 Part 5; Statistics and Registration Service Act 2007',
      statutorySection: 'DEA 2017 s64 & s70 (Accreditation of research processors)',
      ukGdprBasis: 'UK GDPR Art. 28(3)(h) & Data Protection Act 2018 Schedule 2',
      caldicottPrinciples: ['Principle 4 (Strict need-to-know)', 'Principle 5 (Understand responsibilities)'],
      machinePolicyNode: 'tre:SafePersonShape § 2.1 (SHACL) / opa_admission_rule (Rego)',
      currentStatus: safePersonPass ? 'PASS' : safePersonWarn ? 'WARN' : 'FAIL',
      liveFinding: safePersonPass
        ? 'Accredited Safe Researcher identity verified against national register with current annual NHS IG certification.'
        : safePersonWarn
        ? 'Annual IG certification renewal pending; access restricted to non-production sandbox dry-runs.'
        : 'Access structurally blocked: user holds no accredited researcher credentials under statutory frameworks.',
      decisionRef: 'D-003',
      decisionTitle: 'Trusted Inputs & Identity Verification',
      accountableRole: 'IAM Lead & Information Governance Manager',
      remedialAction: safePersonPass
        ? 'No action required. Credentials in date.'
        : safePersonWarn
        ? 'Submit completed annual NHS DSPT IG training certificate to local DPO.'
        : 'Complete accredited researcher training via UK Health Data Research Alliance / ONS.'
    });

    // Row 2: Safe Projects - HRA Research Ethics (IRAS)
    const ethicsPass = ethicsStatus === 'approved';
    const ethicsWarn = ethicsStatus === 'in_review';
    rows.push({
      id: 'stat_safe_project_ethics',
      pillar: 'Safe Projects',
      gateName: 'HRA Research Ethics Committee (REC) Approval & Public Benefit',
      statutoryInstrument: 'Health Research Authority (HRA) Framework; Care Act 2014 Part 3',
      statutorySection: 'Governance Arrangements for Research Ethics Committees (GAfREC) § 4.3',
      ukGdprBasis: 'UK GDPR Art. 6(1)(e) (Public task) & Art. 9(2)(j) (Research in public interest)',
      caldicottPrinciples: ['Principle 1 (Justify purpose)', 'Principle 8 (Inform patients/public)'],
      machinePolicyNode: 'tre:SafeProjectShape § 3.1 (SHACL) / rec_approval_rule (Rego)',
      currentStatus: ethicsPass ? 'PASS' : ethicsWarn ? 'WARN' : 'FAIL',
      liveFinding: ethicsPass
        ? 'Active NHS Research Ethics Committee favourable ethical opinion confirmed on IRAS register.'
        : ethicsWarn
        ? 'Substantial IRAS protocol amendment under committee review; live cohort attachment locked.'
        : 'Unlawful processing: no research ethics approval on file. All data queries barred.',
      decisionRef: 'D-004',
      decisionTitle: 'Statutory Research Ethics & Public Benefit',
      accountableRole: 'Health Research Authority (HRA) & REC Panel Chair',
      remedialAction: ethicsPass
        ? 'Maintain annual progress reporting on IRAS.'
        : ethicsWarn
        ? 'Await REC favourable opinion letter or submit committee clarification response.'
        : 'Submit comprehensive research protocol via Integrated Research Application System (IRAS).'
    });

    // Row 3: Safe Projects - Section 251 CAG Statutory Clearance
    const s251Fail = dataTier === 'tier3_identifiable' && s251Status === 'missing';
    const s251Pass = s251Status === 'authorized' || s251Status === 'exempt';
    rows.push({
      id: 'stat_s251_cag',
      pillar: 'Safe Projects',
      gateName: 'NHS Act 2006 Section 251 CAG Statutory Clearance',
      statutoryInstrument: 'National Health Service Act 2006 Section 251',
      statutorySection: 'Health Service (Control of Patient Information) Regulations 2002 (Reg 5)',
      ukGdprBasis: 'UK GDPR Art. 6(1)(e) & Art. 9(2)(j) with DPA 2018 Section 10',
      caldicottPrinciples: ['Principle 6 (Comply with the law)', 'Principle 1 (Justify purpose)'],
      machinePolicyNode: 'tre:StatutoryClearanceShape § 1.4 (SHACL) / s251_exemption_rule (Rego)',
      currentStatus: s251Fail ? 'FAIL' : 'PASS',
      liveFinding: s251Fail
        ? 'CRITICAL STATUTORY BREACH: Identifiable patient data requested without Section 251 CAG support or explicit consent.'
        : s251Status === 'authorized'
        ? 'Active Confidentiality Advisory Group (CAG) statutory support for processing confidential patient information.'
        : 'Section 251 not required: pseudonymised cohort (Tier 2) or explicit consent verified.',
      decisionRef: 'D-002',
      decisionTitle: 'Section 251 Statutory Clearance & Legal Basis',
      accountableRole: 'Caldicott Guardian & Data Protection Officer',
      remedialAction: s251Fail
        ? 'Halt microdata attachment immediately. Apply for CAG Section 251 support or switch to Tier 2 pseudonymised data.'
        : 'Review annual CAG renewal date and log approval on institutional IG register.'
    });

    // Row 4: Safe Settings - Zero-Egress Network Isolation & Internal Mirrors
    rows.push({
      id: 'stat_safe_settings',
      pillar: 'Safe Settings',
      gateName: 'Least-Privilege Enclave & Zero-Egress Network Routing',
      statutoryInstrument: 'NHS Data Security and Protection Toolkit (DSPT); ISO/IEC 27001',
      statutorySection: 'DSPT Mandate 3 Assertion 1.5; ISO 27001 Annex A.13 (Communications security)',
      ukGdprBasis: 'UK GDPR Art. 25 (Data protection by design) & Art. 32 (Security of processing)',
      caldicottPrinciples: ['Principle 3 (Minimum necessary)', 'Principle 4 (Strict need-to-know)'],
      machinePolicyNode: 'tre:SafeSettingShape § 1.1 (SHACL) / calico_egress_drop (Rego)',
      currentStatus: enclaveEgressBlocked ? 'PASS' : 'FAIL',
      liveFinding: enclaveEgressBlocked
        ? 'Compute environment runs in a private cloud VPC; outbound WAN routes severed via eBPF/Calico; internal package mirrors active.'
        : 'CRITICAL SECURITY BREACH: Computing environment has open outbound internet routing. Patient data cannot be loaded.',
      decisionRef: 'D-007',
      decisionTitle: 'Enforcement Point Selection & Enclave Network Boundary',
      accountableRole: 'Lead Security Operations Approver & SRE Architect',
      remedialAction: enclaveEgressBlocked
        ? 'Maintain internal CRAN, PyPI, and Docker registry mirrors.'
        : 'Deploy Calico CNI egress deny network policy to enforce air-gapped isolation.'
    });

    // Row 5: Safe Data - De-identification & AI Non-Personhood
    const aiFail = aiWorkloadType === 'autonomous_high_risk' && !aiHumanSponsorLinked;
    rows.push({
      id: 'stat_safe_data_minimisation',
      pillar: 'Safe Data',
      gateName: 'Data Minimisation, Salted Pseudonymisation & AI Governance',
      statutoryInstrument: 'Data Protection Act 2018 Part 2; Stanford UIT Agentic AI Doctrine',
      statutorySection: 'DPA 2018 s35 (Principles of processing); Caldicott Principle 2',
      ukGdprBasis: 'UK GDPR Art. 5(1)(c) (Data minimisation) & Art. 4(5) (Pseudonymisation)',
      caldicottPrinciples: ['Principle 2 (Do not use personal data unless necessary)', 'Principle 3 (Minimum necessary)'],
      machinePolicyNode: 'tre:ClinicalDataTierShape § 4.1 (SHACL) / data_minimisation_rule (Rego)',
      currentStatus: aiFail ? 'FAIL' : 'PASS',
      liveFinding: aiFail
        ? 'Stanford UIT Non-Personhood Doctrine: AI agent lacks an accredited human sponsor holding statutory liability.'
        : `Direct patient identifiers expunged; pseudonymisation hash salting verified (${dataTier}); data minimisation adhered to.`,
      decisionRef: 'D-001',
      decisionTitle: 'First Production Decision & Boundary Scope',
      accountableRole: 'Data Protection Officer & AI Governance Lead',
      remedialAction: aiFail
        ? 'Assign and verify a named accredited human researcher to co-sign all autonomous AI pipelines.'
        : 'Maintain salted HMAC SHA-256 pseudonymisation key separation.'
    });

    // Row 6: Safe Outputs - Primary Cell Suppression (k >= 10)
    const kPass = minCellCount >= 10;
    rows.push({
      id: 'stat_safe_outputs_cell',
      pillar: 'Safe Outputs',
      gateName: 'Statistical Disclosure Control: Primary Cell Suppression (k ≥ 10)',
      statutoryInstrument: 'ONS Statistical Disclosure Control Standard; NHS Caldicott 8',
      statutorySection: 'ONS Tabular SDC Guidelines § 3.2 (Threshold Rule k ≥ 10 for clinical outputs)',
      ukGdprBasis: 'UK GDPR Recital 26 (Principles of protection apply to identified/identifiable persons)',
      caldicottPrinciples: ['Principle 8 (Inform patients/public - No surprises)'],
      machinePolicyNode: 'sdc:AirlockOutputShape § 6.1 (SHACL) / opa_cell_suppression_rule (Rego)',
      currentStatus: kPass ? 'PASS' : 'FAIL',
      liveFinding: kPass
        ? `Primary suppression satisfied (observed cell count k = ${minCellCount} ≥ 10 minimum floor).`
        : `Primary suppression violation: observed cell count (N = ${minCellCount}) is below the mandatory k = 10 floor.`,
      decisionRef: 'D-005',
      decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
      accountableRole: 'Statistical Disclosure Control (SDC) Lead',
      remedialAction: kPass
        ? 'Proceed to top-contributor dominance check.'
        : 'Apply cell suppression, category collapsing, or additive noise perturbation prior to airlock release.'
    });

    // Row 7: Safe Outputs - Top-Contributor Dominance Ceiling (<= 80%)
    const domPass = dominanceRatio <= 80;
    rows.push({
      id: 'stat_safe_outputs_dominance',
      pillar: 'Safe Outputs',
      gateName: 'Statistical Disclosure Control: Top-Contributor Dominance Ceiling (≤ 80%)',
      statutoryInstrument: 'ONS (n, k) Dominance Rule; SAIL Databank Output Review Protocol',
      statutorySection: 'SAIL Review Protocol § 4.1 (Maximum single contributor dominance ≤ 80%)',
      ukGdprBasis: 'UK GDPR Recital 26 & Common Law Duty of Confidentiality',
      caldicottPrinciples: ['Principle 8 (Public transparency & confidentiality preservation)'],
      machinePolicyNode: 'sdc:AirlockOutputShape § 6.2 (SHACL) / opa_dominance_rule (Rego)',
      currentStatus: domPass ? 'PASS' : 'FAIL',
      liveFinding: domPass
        ? `Dominance ceiling satisfied: top contributor represents ${dominanceRatio}% of aggregate value (≤ 80% ceiling).`
        : `Dominance violation: top contributor represents ${dominanceRatio}% of aggregate sum (exceeds the 80% ceiling).`,
      decisionRef: 'D-005',
      decisionTitle: 'Quantitative Statistical Disclosure Control Rules',
      accountableRole: 'Statistical Disclosure Control (SDC) Lead',
      remedialAction: domPass
        ? 'Submit candidate table to independent 2-person airlock review.'
        : 'Aggregate rare classes or truncate upper percentile contributors before exporting.'
    });

    return rows;
  }, [
    researcherStatus,
    ethicsStatus,
    s251Status,
    dataTier,
    minCellCount,
    dominanceRatio,
    enclaveEgressBlocked,
    aiWorkloadType,
    aiHumanSponsorLinked
  ]);

  // Filter rows based on pillar, status, and search query
  const filteredRows = useMemo(() => {
    return matrixRows.filter((row) => {
      if (selectedPillar !== 'all' && row.pillar !== selectedPillar) return false;
      if (selectedStatus !== 'all' && row.currentStatus !== selectedStatus) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          row.gateName.toLowerCase().includes(q) ||
          row.statutoryInstrument.toLowerCase().includes(q) ||
          row.statutorySection.toLowerCase().includes(q) ||
          row.caldicottPrinciples.some((cp) => cp.toLowerCase().includes(q)) ||
          row.machinePolicyNode.toLowerCase().includes(q) ||
          row.liveFinding.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [matrixRows, selectedPillar, selectedStatus, searchQuery]);

  // Build Markdown Export of the Statutory Matrix
  const handleExportMarkdown = () => {
    const lines = [
      `# Seawater Consolidated Statutory Governance Matrix`,
      `**Evaluated Timestamp:** ${new Date().toUTCString()}`,
      `**Baseline Decision-Support Status:** ${matrixRows.every((r) => r.currentStatus === 'PASS') ? 'ALL GATES SATISFIED' : 'REQUIRES AMENDMENT'}`,
      ``,
      `---`,
      ``,
      `| Five Safes Pillar | Statutory Directive & Citation | Caldicott Principles | Machine Policy Node | Live Protocol Finding | Status | Decision Ref |`,
      `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |`,
      ...matrixRows.map(
        (r) =>
          `| **${r.pillar}** | ${r.statutoryInstrument} (${r.statutorySection}) | ${r.caldicottPrinciples.join('; ')} | \`${r.machinePolicyNode}\` | ${r.liveFinding} | **${r.currentStatus}** | [${r.decisionRef}] ${r.decisionTitle} |`
      ),
      ``,
      `---`,
      `*Compiled by Project Seawater · Information Governance Decision-Support for Safe & Secure Data Intelligence Environments*`
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Seawater_Consolidated_Statutory_Matrix.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCsv = () => {
    const headers = ['Pillar', 'Gate Name', 'Statutory Instrument', 'Statutory Section', 'UK GDPR Basis', 'Status', 'Live Finding', 'ADR Ref'];
    const rows = matrixRows.map((r) => [
      `"${r.pillar}"`,
      `"${r.gateName}"`,
      `"${r.statutoryInstrument}"`,
      `"${r.statutorySection}"`,
      `"${r.ukGdprBasis}"`,
      `"${r.currentStatus}"`,
      `"${r.liveFinding.replace(/"/g, '""')}"`,
      `"${r.decisionRef}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    navigator.clipboard.writeText(csvContent);
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
  };

  const passCount = matrixRows.filter((r) => r.currentStatus === 'PASS').length;
  const warnCount = matrixRows.filter((r) => r.currentStatus === 'WARN').length;
  const failCount = matrixRows.filter((r) => r.currentStatus === 'FAIL').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. STATUTORY MATRIX KPI BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 space-y-1 shadow-md text-white">
          <span className="text-[10px] text-cyan-400 uppercase font-mono block font-bold">
            Statutory Directives Mapped
          </span>
          <div className="text-xl font-bold text-white">
            {matrixRows.length} Core Gates
          </div>
          <span className="text-[11px] text-slate-300 block">
            DEA 2017 · NHS s251 · HRA REC · DSPT · ONS
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 space-y-1 shadow-md text-white">
          <span className="text-[10px] text-cyan-400 uppercase font-mono block font-bold">
            Caldicott 1–8 Mapping
          </span>
          <div className="text-xl font-bold text-sky-300">
            8 / 8 Principles
          </div>
          <span className="text-[11px] text-slate-300 block">
            Comprehensive National Data Guardian alignment
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 space-y-1 shadow-md text-white">
          <span className="text-[10px] text-cyan-400 uppercase font-mono block font-bold">
            Live Protocol Compliance
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-teal-400">
              {passCount} Pass
            </span>
            {warnCount > 0 && (
              <span className="text-sm font-bold text-amber-400">
                · {warnCount} Warn
              </span>
            )}
            {failCount > 0 && (
              <span className="text-sm font-bold text-rose-400">
                · {failCount} Block
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-300 block">
            Evaluated in real time from active scenario
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 space-y-2 shadow-md flex flex-col justify-between text-white">
          <span className="text-[10px] text-cyan-400 uppercase font-mono block font-bold">
            Standardized Evidence Pack
          </span>
          <button
            onClick={onOpenEvidenceDossier}
            className="w-full py-1.5 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-teal-500/20"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-slate-950" />
            <span>Generate Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. CONTROLS, SEARCH & EXPORT BAR */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-4 sm:p-5 shadow-xl space-y-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Pillar Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Pillar:</span>
            </span>
            {[
              { id: 'all', label: 'All Five Safes' },
              { id: 'Safe People', label: 'Safe People' },
              { id: 'Safe Projects', label: 'Safe Projects' },
              { id: 'Safe Settings', label: 'Safe Settings' },
              { id: 'Safe Data', label: 'Safe Data' },
              { id: 'Safe Outputs', label: 'Safe Outputs' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedPillar === p.id
                    ? 'bg-[#00A389] text-white shadow-md font-bold'
                    : 'bg-[#07192f] text-slate-300 hover:text-white border border-[#1b3f68]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCsv}
              className="px-3 py-1.5 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 border border-[#1b3f68] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Copy matrix as CSV for spreadsheets"
            >
              {copiedMatrix ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMatrix ? 'CSV Copied!' : 'Copy CSV'}</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/20 transition-colors"
              title="Download full statutory matrix as Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Matrix .md</span>
            </button>
          </div>
        </div>

        {/* Search & Status Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-cyan-900/60">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search statutes, citations, Caldicott principles, or policy nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-cyan-900/60 rounded-lg text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Filter Status:</span>
            {['all', 'PASS', 'WARN', 'FAIL'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-[#07192f] text-slate-300 border border-[#1b3f68]'
                }`}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONSOLIDATED STATUTORY MATRIX DATA TABLE */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl overflow-hidden shadow-xl text-white">
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">
              Five Safes Statutory Assurance Matrix
            </h3>
            <p className="text-xs text-slate-300">
              Cross-cutting statutory basis mapping machine-verifiable constraints to primary UK legislation and Caldicott Principles 1–8.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            Showing {filteredRows.length} of {matrixRows.length} Directives
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#07192f] text-cyan-300 font-mono text-[11px] border-b border-cyan-900/60">
              <tr>
                <th className="p-3 w-28">Pillar</th>
                <th className="p-3">Statutory Directive &amp; Citation</th>
                <th className="p-3">Caldicott 1–8 &amp; UK GDPR</th>
                <th className="p-3">Machine Policy Node</th>
                <th className="p-3">Finding &amp; Remedial Action</th>
                <th className="p-3 w-24 text-center">Status</th>
                <th className="p-3 w-28">ADR Cross-Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/40 bg-slate-950/70">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#112f54]/50 transition-colors text-xs"
                >
                  {/* Pillar */}
                  <td className="p-3 align-top">
                    <span className="font-bold text-slate-900 dark:text-white block font-mono text-[11px]">
                      {row.pillar}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {row.accountableRole.split('&')[0]}
                    </span>
                  </td>

                  {/* Directive & Statutory Citation */}
                  <td className="p-3 align-top space-y-1 max-w-xs">
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold block text-xs">
                      {row.gateName}
                    </strong>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {row.statutoryInstrument}
                    </div>
                    <div className="text-[10px] font-mono text-amber-800 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800 inline-block">
                      {row.statutorySection}
                    </div>
                  </td>

                  {/* Caldicott & UK GDPR Basis */}
                  <td className="p-3 align-top space-y-1.5 max-w-xs">
                    <div className="space-y-0.5">
                      {row.caldicottPrinciples.map((cp, idx) => (
                        <div key={idx} className="text-[10px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <span className="text-[#047857] font-bold">✓</span>
                          <span>{cp}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      Basis: {row.ukGdprBasis}
                    </div>
                  </td>

                  {/* Machine Policy Node */}
                  <td className="p-3 align-top font-mono text-[11px] text-cyan-300">
                    <div className="p-1.5 bg-[#07192f] rounded border border-cyan-900/60 break-all text-[10px] text-cyan-200">
                      {row.machinePolicyNode}
                    </div>
                  </td>

                  {/* Live Protocol Finding & Remedial Action */}
                  <td className="p-3 align-top space-y-1.5 max-w-md">
                    <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                      {row.liveFinding}
                    </p>
                    <div className="p-2 rounded bg-[#07192f] border border-cyan-900/50 text-[10px] text-slate-300">
                      <strong className="text-cyan-300 block font-semibold">
                        Action Required:
                      </strong>
                      <span>{row.remedialAction}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-3 align-top text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        row.currentStatus === 'PASS'
                          ? 'bg-teal-950/80 text-teal-300 border-teal-600'
                          : row.currentStatus === 'WARN'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                          : 'bg-rose-950/80 text-rose-300 border-rose-600'
                      }`}
                    >
                      {row.currentStatus}
                    </span>
                  </td>

                  {/* Decision Ref */}
                  <td className="p-3 align-top">
                    {onNavigateToDecisionRegister ? (
                      <button
                        onClick={() => onNavigateToDecisionRegister(row.decisionRef)}
                        className="font-mono text-xs text-cyan-400 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                        title={`Open Decision ${row.decisionRef}`}
                      >
                        <span>{row.decisionRef}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="font-mono text-xs text-slate-400">{row.decisionRef}</span>
                    )}
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {row.decisionTitle}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. STATUTORY DECISION-SUPPORT NOTICE */}
      <div className="p-4 rounded-xl bg-[#0c2340] border border-cyan-900/60 flex items-start gap-3 text-xs shadow-md text-white">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white font-bold block">
            Statutory Legal Interpretation &amp; Human Governance Notice
          </strong>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            This matrix establishes the deterministic statutory baseline compiled by Project Seawater. In alignment with UK public sector information governance principles, automated evaluation informs human decision-makers (Caldicott Guardians, Data Access Advisory Groups, and Research Ethics Committees); it does not supplant statutory human responsibility.
          </p>
        </div>
      </div>
    </div>
  );
};
