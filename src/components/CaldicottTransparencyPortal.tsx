import React, { useState, useMemo } from 'react';
import {
  TRANSPARENCY_PROJECTS,
  TransparencyProject,
  ProvNode,
  ProvEdge
} from '../data/transparencyData';
import {
  HeartHandshake,
  Network,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Database,
  Cpu,
  Lock,
  Eye,
  FileText,
  FileCheck2,
  Users,
  Sparkles,
  GitBranch,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';

export const CaldicottTransparencyPortal: React.FC = () => {
  // Dual Angle Toggle: Foundations (Lay/Public) vs PaC Playbook (W3C PROV-O Graph)
  const [lensMode, setLensMode] = useState<'ig_handbook' | 'data_technical'>('ig_handbook');

  // Project selection & filters
  const [selectedProjectId, setSelectedProjectId] = useState<string>(TRANSPARENCY_PROJECTS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Data Technical state
  const [selectedProvNodeId, setSelectedProvNodeId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lineageVerifyStatus, setLineageVerifyStatus] = useState<'verified' | 'verifying'>('verified');

  const activeProject = TRANSPARENCY_PROJECTS.find((p) => p.id === selectedProjectId) || TRANSPARENCY_PROJECTS[0];

  const filteredProjects = useMemo(() => {
    return TRANSPARENCY_PROJECTS.filter((proj) => {
      const matchesCategory = categoryFilter === 'All' || proj.category === categoryFilter;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.leadInvestigator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.laySummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const selectedProvNode = useMemo(() => {
    if (!selectedProvNodeId) return activeProject.provGraph.nodes[activeProject.provGraph.nodes.length - 1];
    return activeProject.provGraph.nodes.find((n) => n.id === selectedProvNodeId) || activeProject.provGraph.nodes[0];
  }, [selectedProvNodeId, activeProject]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulateVerifyLineage = () => {
    setLineageVerifyStatus('verifying');
    setTimeout(() => {
      setLineageVerifyStatus('verified');
    }, 600);
  };

  const handleDownloadRegisterMarkdown = () => {
    const md = `# NHS Trust & SDE Public Data Use Register
Governed under Caldicott Principle 8 (Public Transparency & "No Surprises")
Export Date: ${new Date().toISOString()}

---

${TRANSPARENCY_PROJECTS.map((p) => `
## ${p.code}: ${p.title}
- **Category**: ${p.category}
- **Lead Investigator**: ${p.leadInvestigator} (${p.institution})
- **NHS Trust Sponsor**: ${p.nhsTrustSponsor}
- **Airlock Status**: ${p.airlockStatus}

### Plain-English Lay Summary
${p.laySummary}

### Expected Public & Health Benefit
${p.publicBenefitStatement}

### Statutory Legal Basis
- **UK GDPR**: ${p.legalBasis.ukGdprArt6} / ${p.legalBasis.ukGdprArt9}
- **Section 251 NHS Act 2006 Clearance**: ${p.legalBasis.s251Ref}
- **HRA REC Approval**: ${p.legalBasis.recApprovalRef}

### Public & Patient Involvement (PPIE)
- **Score**: ${p.ppieInvolvement.score}
- **Involved Group**: ${p.ppieInvolvement.groupName}
- **Co-Design Summary**: ${p.ppieInvolvement.description}
- **Patient Co-Author**: ${p.ppieInvolvement.patientCoAuthor ? 'Yes' : 'No'}

### National Data Opt-Out (NDOO)
- **Status**: ${p.nationalOptOut.auditStatus} (${p.nationalOptOut.purgedRecordCount.toLocaleString()} opt-outs purged at ingestion)

### Commercial Disclosure
${p.commercialInvolvement}
`).join('\n---\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Caldicott8_Public_Data_Use_Register.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. EDITORIAL HEADER & DUAL-LENS CONTROLLER */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 shadow-xl text-white">
        <div className="space-y-4 w-full">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-cyan-300 bg-[#07192f] px-2.5 py-1 rounded border border-cyan-900/60 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-400" />
              <span>Phase 7: Caldicott Principle 8 Transparency &amp; Lineage (Example Register)</span>
            </span>
            <span className="font-mono text-cyan-200 bg-[#07192f] px-2.5 py-1 rounded border border-cyan-900/50">
              Caldicott 8 &quot;No Surprises&quot; · PPIE Co-Design · W3C PROV-O Graph · SHA-256 DAG
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Caldicott Principle 8 Transparency &amp; Lineage (Example Register)
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Operationalizes NHS Caldicott Principle 8 across two coordinated perspectives: publishing plain-language lay summaries, public benefit statements, and patient involvement scorecards for non-technical stakeholders, while maintaining an immutable, graph-navigated W3C PROV-O provenance ledger for technical security and audit teams. Note: Case studies and project records below are illustrative examples to help teams model their own registers.
          </p>

          {/* DUAL-ANGLE SWITCHER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-t border-cyan-900/50 mt-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                Operating Angle:
              </span>
              <div className="inline-flex flex-wrap p-1 rounded-lg bg-[#07192f] border border-cyan-900/60 gap-1">
                <button
                  onClick={() => setLensMode('ig_handbook')}
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    lensMode === 'ig_handbook'
                      ? 'bg-[#00A389] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Foundations Angle: Public Register &amp; PPIE</span>
                </button>

                <button
                  onClick={() => setLensMode('data_technical')}
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    lensMode === 'data_technical'
                      ? 'bg-[#005EB8] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Network className="w-3.5 h-3.5 text-sky-300" />
                  <span>PaC Playbook Lineage: W3C PROV-O Graph</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleDownloadRegisterMarkdown}
              className="px-3.5 py-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-cyan-900/60 shadow-md self-start lg:self-auto whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Open Register (.md)</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROJECT SELECTOR STRIP */}
      <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-4 sm:p-5 shadow-xl text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sample studies by title, investigator, or topic..."
              className="bg-[#07192f] border border-cyan-900/60 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 w-full sm:max-w-md"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-300 text-xs font-medium mr-1">Category:</span>
            {['All', 'Cardiovascular', 'Rare Diseases', 'Oncology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-[#00A389] text-white font-bold shadow-sm'
                    : 'bg-[#07192f] text-slate-300 hover:text-white hover:bg-[#123154] border border-cyan-900/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 items-stretch">
          {filteredProjects.map((p) => {
            const isSelected = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProjectId(p.id);
                  setSelectedProvNodeId(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer h-full flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-slate-950/90 border-[#00A389] ring-2 ring-[#00A389]/60 shadow-md text-white'
                    : 'bg-[#07192f] border-cyan-900/50 hover:border-cyan-500/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-300 tabular-nums">
                    {p.code} (Example)
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-200 border border-cyan-900/50 whitespace-nowrap">
                    {p.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {p.leadInvestigator}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* LENS A: IG HANDBOOK ANGLE (PUBLIC BENEFIT & CALDICOTT 8 REGISTER) */}
      {lensMode === 'ig_handbook' && (
        <div className="space-y-6">
          {/* Main Active Project Public Record Card */}
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-cyan-900/50 pb-5">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-300 bg-[#07192f] px-2.5 py-0.5 rounded border border-cyan-900/60 tabular-nums">
                    {activeProject.code} (Example)
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Caldicott 8 Registered (Illustrative Template)</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeProject.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-200">
                  <span><strong>Lead:</strong> {activeProject.leadInvestigator}</span>
                  <span>·</span>
                  <span><strong>Institution:</strong> {activeProject.institution}</span>
                  <span>·</span>
                  <span><strong>Sponsor:</strong> {activeProject.nhsTrustSponsor}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="p-3.5 bg-[#07192f] rounded-lg border border-cyan-900/60 text-xs shrink-0 space-y-1 self-start">
                <span className="text-xs text-slate-300 uppercase tracking-wider block font-semibold">
                  Airlock Status:
                </span>
                <span className="font-bold text-teal-300 flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>{activeProject.airlockStatus}</span>
                </span>
              </div>
            </div>

            {/* Plain-English Lay Summary Box (Reading Age 11) */}
            <div className="p-5 rounded-lg bg-[#07192f] border border-cyan-900/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Plain-English Lay Summary (Written for Patients &amp; Public)</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                {activeProject.laySummary}
              </p>
            </div>

            {/* Public Benefit & Health Impact Statement */}
            <div className="p-5 rounded-lg bg-[#07192f] border border-teal-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Anticipated NHS &amp; Societal Health Benefit</span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                {activeProject.publicBenefitStatement}
              </p>
            </div>

            {/* Governance & PPIE Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch text-xs sm:text-sm">
              {/* PPIE Involvement */}
              <div className="p-5 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-2.5 text-slate-200 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-white flex items-center gap-1.5 text-sm">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>Patient &amp; Public Involvement (PPIE)</span>
                    </span>
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#07192f] text-teal-300 border border-teal-500/40 tabular-nums whitespace-nowrap">
                      {activeProject.ppieInvolvement.score} Engagement
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-300 font-semibold">
                    {activeProject.ppieInvolvement.groupName} <span className="text-slate-400 font-normal">(Illustrative Co-Design Advisory Group)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeProject.ppieInvolvement.description}
                  </p>
                </div>
                {activeProject.ppieInvolvement.patientCoAuthor && (
                  <div className="text-xs sm:text-sm text-teal-400 font-semibold flex items-center gap-1.5 pt-1">
                    <Check className="w-4 h-4" />
                    <span>Patient representatives included as study co-authors</span>
                  </div>
                )}
              </div>

              {/* National Data Opt-Out & Commercial Transparency */}
              <div className="p-5 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-3 text-slate-200 h-full flex flex-col justify-between">
                <span className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>National Data Opt-Out (NDOO) &amp; Ethics</span>
                </span>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-300">Opt-Out Filtering:</span>
                    <strong className="text-teal-300 font-mono">
                      Simulated Test Pass (Example Baseline)
                    </strong>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-300">Purged Patient Records:</span>
                    <span className="font-mono text-white tabular-nums">
                      {activeProject.nationalOptOut.purgedRecordCount.toLocaleString()} opt-outs respected
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-300">Section 251 CAG Clearance:</span>
                    <span className="font-mono text-cyan-200 tabular-nums">{activeProject.legalBasis.s251Ref}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-300">HRA REC Ethical Approval:</span>
                    <span className="font-mono text-cyan-200 tabular-nums">{activeProject.legalBasis.recApprovalRef}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Caldicott Principle 8 Lay Checklist */}
            <div className="p-5 rounded-lg bg-slate-950/80 border border-cyan-900/50 space-y-3">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                Caldicott Principle 8 Checklist (Suggested Verification Starting Points)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm items-stretch">
                <div className="p-3 rounded bg-[#07192f] border border-cyan-900/50 flex items-center gap-2.5 text-slate-100 h-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Plain-English summary accessible at Reading Age 11</span>
                </div>
                <div className="p-3 rounded bg-[#07192f] border border-cyan-900/50 flex items-center gap-2.5 text-slate-100 h-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Explicit direct healthcare / NHS benefit demonstrated</span>
                </div>
                <div className="p-3 rounded bg-[#07192f] border border-cyan-900/50 flex items-center gap-2.5 text-slate-100 h-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Patient &amp; public involvement (PPIE) advisory record published</span>
                </div>
                <div className="p-3 rounded bg-[#07192f] border border-cyan-900/50 flex items-center gap-2.5 text-slate-100 h-full">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Zero commercial exclusivity; open-access scientific findings</span>
                </div>
              </div>
            </div>

            {/* Compact Governance Domain Note: Freedom of Information Act 2000 */}
            <div className="p-4 rounded-lg bg-slate-950/60 border border-cyan-900/40 text-xs sm:text-sm text-slate-200 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sky-300">Related Domain — FOIA 2000 Alignment:</strong>{' '}
                Publishing Caldicott 8 registers and <code className="text-cyan-300">GOVERNANCE_CHARTER.md</code> satisfies proactive s19 publication duties while upholding s40(2) personal data, s41 confidentiality, s22 pre-publication exemptions, and SDC differencing checks.
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#07192f] text-slate-300 border border-cyan-900/50 shrink-0 self-start sm:self-center whitespace-nowrap">
                s19 · s22 · s40(2) · s41
              </span>
            </div>

            {/* Advisory Open Standard: Algorithmic Transparency Recording Standard (ATRS) */}
            <div className="p-4 rounded-lg bg-slate-950/60 border border-sky-800/40 text-xs sm:text-sm text-slate-200 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong className="text-sky-300">Algorithmic Transparency Recording Standard (ATRS) · Open Interoperability Guidance:</strong>{' '}
                Where approved research uses predictive models or AI decision support, UK Government ATRS offers a recommended two-tier public disclosure format (plain-English summary plus technical, data, and risk record) that complements Caldicott Principle 8 Data Use Registers without replacing statutory IG review.
              </div>
              <a
                href="https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 rounded bg-[#07192f] hover:bg-[#123154] text-sky-300 border border-sky-700/50 shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>ATRS Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* LENS B: RUNTIME ANGLE (W3C PROV-O LINEAGE DAG & MACHINE TRIPLE LEDGER) */}
      {lensMode === 'data_technical' && (
        <div className="space-y-6">
          {/* Visual Provenance DAG Node Timeline */}
          <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 sm:p-8 space-y-5 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                  W3C PROV-O Graph Lineage (DAG) — Example Trace
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Cryptographic Traceability Trail: {activeProject.code}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateVerifyLineage}
                  className="px-3.5 py-2 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 border border-cyan-900/60 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>{lineageVerifyStatus === 'verifying' ? 'Verifying DAG...' : 'Simulate Cryptographic Verification'}</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              Every data extract, ingestion filter, analytical transformation, and airlock export emits W3C PROV-O triples (<code>prov:Entity</code>, <code>prov:Activity</code>, <code>prov:Agent</code>). Select any node in the chain to inspect its semantic properties and SHA-256 cryptographic attestation.
            </p>

            {/* Provenance DAG Flow Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 items-stretch">
              {activeProject.provGraph.nodes.filter((n) => n.type !== 'Agent').map((node, idx) => {
                const isSelected = selectedProvNode.id === node.id;
                const isEntity = node.type === 'Entity';

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedProvNodeId(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full ${
                      isSelected
                        ? 'bg-slate-950/95 border-[#00A389] ring-2 ring-[#00A389]/60 shadow-md text-white'
                        : 'bg-[#07192f] border-cyan-900/50 hover:border-cyan-500/40 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded uppercase font-bold whitespace-nowrap ${
                          isEntity
                            ? 'bg-purple-950/90 text-purple-300 border border-purple-800'
                            : 'bg-amber-950/90 text-amber-300 border border-amber-800'
                        }`}>
                          prov:{node.type}
                        </span>
                        <span className="text-xs font-mono text-slate-300 tabular-nums">Step {idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white pt-1">
                        {node.label}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {node.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-cyan-900/40 mt-3 flex items-center justify-between text-xs font-mono text-slate-300 gap-2">
                      <span>Hash Commit:</span>
                      <span className="text-cyan-300 font-bold truncate max-w-[120px] tabular-nums">
                        {node.sha256Hash?.substring(0, 10)}...
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Inspector Card */}
            <div className="p-5 rounded-lg bg-slate-950/90 border border-cyan-500/40 space-y-4 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold font-mono text-cyan-300">
                      {selectedProvNode.id}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#07192f] text-cyan-200 border border-cyan-900/60">
                      prov:{selectedProvNode.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {selectedProvNode.label}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(`hash-${selectedProvNode.id}`, selectedProvNode.sha256Hash || '')}
                    className="px-3 py-1.5 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 border border-cyan-900/60 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === `hash-${selectedProvNode.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        <span>Hash Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy SHA-256</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedProvNode.description}
              </p>

              {/* Node Metadata & Cryptographic Hash */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono items-stretch">
                <div className="p-3.5 bg-[#07192f] rounded-lg border border-cyan-900/60 space-y-1.5 h-full">
                  <span className="text-xs text-slate-300 uppercase block font-semibold">
                    Cryptographic SHA-256 State Commitment:
                  </span>
                  <span className="text-teal-300 break-all select-all font-mono text-xs leading-relaxed">
                    {selectedProvNode.sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                  </span>
                </div>

                <div className="p-3.5 bg-[#07192f] rounded-lg border border-cyan-900/60 space-y-1.5 h-full">
                  <span className="text-xs text-slate-300 uppercase block font-semibold">
                    Node Attributes:
                  </span>
                  <div className="space-y-1 text-xs text-slate-200 tabular-nums">
                    {selectedProvNode.attributes && Object.entries(selectedProvNode.attributes).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">{k}:</span>
                        <strong className="text-white text-right">{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Artifacts Grid (Turtle RDF & SPARQL Audit Query) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* W3C Turtle PROV-O Triples */}
            <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 space-y-4 shadow-xl text-white h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-cyan-900/50 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    W3C PROV-O Turtle RDF (Example)
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    prov_ledger_{activeProject.id}.ttl
                  </h4>
                </div>

                <button
                  onClick={() => handleCopy(`turtle-${activeProject.id}`, activeProject.provGraph.turtleRdf)}
                  className="px-3 py-1.5 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-cyan-900/60 whitespace-nowrap"
                >
                  {copiedId === `turtle-${activeProject.id}` ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `turtle-${activeProject.id}` ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Standardized Subject-Predicate-Object triples modeling entity derivations, activities, and agent attestation for this sample study.
              </p>

              <pre className="p-4 bg-slate-950 rounded-xl border border-cyan-900/60 text-cyan-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[340px] flex-1">
                <code>{activeProject.provGraph.turtleRdf}</code>
              </pre>
            </div>

            {/* SPARQL Audit Query & OPA Rego Rule */}
            <div className="bg-[#0c2340] border border-cyan-900/60 rounded-xl p-6 space-y-4 shadow-xl text-white h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-cyan-900/50 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                    SPARQL Lineage Audit Query (Example)
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    verify_caldicott8_provenance.rq
                  </h4>
                </div>

                <button
                  onClick={() => handleCopy(`sparql-${activeProject.id}`, activeProject.provGraph.sparqlAuditQuery)}
                  className="px-3 py-1.5 rounded-lg bg-[#07192f] hover:bg-[#123154] text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-cyan-900/60 whitespace-nowrap"
                >
                  {copiedId === `sparql-${activeProject.id}` ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `sparql-${activeProject.id}` ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Deterministic SPARQL query executed by automated auditors to verify that every airlocked table traces back to an approved ethics clearance and NDOO ingestion purge.
              </p>

              <pre className="p-4 bg-slate-950 rounded-xl border border-cyan-900/60 text-cyan-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[340px] flex-1">
                <code>{activeProject.provGraph.sparqlAuditQuery}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
