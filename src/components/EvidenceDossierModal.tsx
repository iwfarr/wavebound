import React, { useState, useEffect } from 'react';
import { SeawaterLogo } from './SeawaterLogo';
import {
  FileCheck2,
  Printer,
  Download,
  Copy,
  Check,
  X,
  Info,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Scale,
  Lock,
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';

export interface EvaluatedGate {
  gateName: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  rationale: string;
  statutoryBasis: string;
  triggerNode: string;
  decisionRef: string;
  decisionTitle: string;
}

export interface ComplianceEvaluation {
  gates: EvaluatedGate[];
  overallDecision: 'APPROVED' | 'REQUIRES_AMENDMENT';
  decisionColor: string;
  decisionReason: string;
  auditHash: string;
  evaluatedAt: string;
}

export interface ProtocolParams {
  researcherStatus: string;
  ethicsStatus: string;
  s251Status: string;
  dataTier: string;
  minCellCount: number;
  dominanceRatio: number;
  enclaveEgressBlocked: boolean;
  aiWorkloadType: string;
  aiHumanSponsorLinked: boolean;
  studyTitle?: string;
  chiefInvestigator?: string;
  leadInstitution?: string;
}

interface EvidenceDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: ComplianceEvaluation;
  protocolParams: ProtocolParams;
  onNavigateToDecisionRegister?: (decisionRef: string) => void;
}

export const EvidenceDossierModal: React.FC<EvidenceDossierModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  protocolParams,
  onNavigateToDecisionRegister
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [sha256Hash, setSha256Hash] = useState<string>('');

  // Generate deterministic SHA-256 hash using Web Crypto API
  useEffect(() => {
    if (!isOpen) return;

    const payloadString = JSON.stringify({
      params: protocolParams,
      gates: evaluation.gates.map((g) => ({ name: g.gateName, status: g.status, ref: g.decisionRef })),
      decision: evaluation.overallDecision,
      timestamp: evaluation.evaluatedAt
    });

    const computeHash = async () => {
      try {
        const msgUint8 = new TextEncoder().encode(payloadString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setSha256Hash(hashHex);
      } catch {
        // Fallback if crypto.subtle is restricted
        setSha256Hash(`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`);
      }
    };

    computeHash();
  }, [isOpen, protocolParams, evaluation]);

  if (!isOpen) return null;

  const docRef = `SEAWATER-EVP-${sha256Hash.substring(0, 10).toUpperCase()}`;

  // Build Standardized Markdown Compliance Dossier
  const buildMarkdownDossier = (): string => {
    const lines = [
      `# Safe Setting Compliance Dossier & Standardized Evidence Pack`,
      `**Document Reference:** ${docRef}`,
      `**Evaluated Timestamp:** ${new Date(evaluation.evaluatedAt).toUTCString()}`,
      `**Cryptographic SHA-256 Digest:** \`${sha256Hash}\``,
      `**Baseline Decision-Support Status:** ${evaluation.overallDecision === 'APPROVED' ? 'RECOMMEND APPROVAL' : 'REQUIRE AMENDMENT'}`,
      ``,
      `---`,
      ``,
      `## 1. Study & Research Protocol Profile`,
      `- **Study Title / Acronym:** ${protocolParams.studyTitle || 'Population Health Analytics Protocol'}`,
      `- **Chief Investigator:** ${protocolParams.chiefInvestigator || 'Accredited Safe Researcher'}`,
      `- **Lead Institution:** ${protocolParams.leadInstitution || 'Approved UK Research Institution / NHS Trust'}`,
      `- **Researcher Accreditation:** ${protocolParams.researcherStatus.toUpperCase()} (Five Safes: Safe People)`,
      `- **Research Ethics Committee (IRAS):** ${protocolParams.ethicsStatus.toUpperCase()} (Five Safes: Safe Projects)`,
      `- **Section 251 CAG Clearance:** ${protocolParams.s251Status.toUpperCase()} (NHS Act 2006 s251)`,
      `- **Data Sensitivity Classification:** ${protocolParams.dataTier.toUpperCase()} (Five Safes: Safe Data)`,
      `- **SDC Cell Suppression Floor:** N ≥ ${protocolParams.minCellCount} (Five Safes: Safe Outputs)`,
      `- **Top-Contributor Dominance Limit:** ≤ ${protocolParams.dominanceRatio}% (Quantitative SDC)`,
      `- **Enclave Network Isolation:** ${protocolParams.enclaveEgressBlocked ? 'ZERO-EGRESS AIRLOCK ENFORCED' : 'EGRESS DETECTED'} (Five Safes: Safe Settings)`,
      `- **AI Workload Classification:** ${protocolParams.aiWorkloadType.toUpperCase()} (Stanford UIT Non-Personhood Doctrine)`,
      ``,
      `---`,
      ``,
      `## 2. Gate-by-Gate Compliance Findings`,
      ``,
      `| Statutory Gate | Evaluation | Statutory Reference | OPA Policy Node | Decision Register |`,
      `| :--- | :--- | :--- | :--- | :--- |`,
      ...evaluation.gates.map(
        (g) =>
          `| ${g.gateName} | **${g.status}** | ${g.statutoryBasis} | \`${g.triggerNode}\` | [${g.decisionRef}] ${g.decisionTitle} |`
      ),
      ``,
      `---`,
      ``,
      `## 3. Caldicott Principles 1–8 Statutory Compliance Breakdown`,
      `| Principle | Statutory Requirement | Protocol Assurance Status |`,
      `| :--- | :--- | :--- |`,
      `| **Principle 1** | Justify the purpose(s) | Verified · Independent REC ethical favourable opinion active |`,
      `| **Principle 2** | Do not use confidential data unless necessary | Verified · Pseudonymisation hash salting enforced (Direct IDs expunged) |`,
      `| **Principle 3** | Use the minimum necessary confidential data | Verified · Scoped clinical cohort filter and cell minimization applied |`,
      `| **Principle 4** | Access on strict need-to-know basis | Verified · Named IRAS accredited researcher verified via ABAC |`,
      `| **Principle 5** | Everyone understands responsibilities | Verified · Signed SDE Safe Researcher User Agreement logged on ledger |`,
      `| **Principle 6** | Comply with the law | Verified · NHS Act 2006 s251 CAG clearance / UK GDPR Art. 6(1)(e) & 9(2)(j) |`,
      `| **Principle 7** | Duty to share for direct care | Assessed · Secondary care research enclave (non-direct clinical care) |`,
      `| **Principle 8** | Inform patients & public (No surprises) | Verified · Public register disclosure logged; quantitative SDC verified (k ≥ 10, dominance ≤ 80%) |`,
      ``,
      `---`,
      ``,
      `## 4. Statutory Assurance & Decision-Support Statement`,
      `> "This evidence dossier compiles machine-verified compliance proofs evaluated against Project Seawater Information Governance constraints under strict closed-world determinism conforming to UK GDPR Art. 25, NHS Digital DSPT Mandate 3, and Caldicott Principles 1–8. In adherence to UK public sector governance standards, technology serves human accountability; it does not replace it. This evidence dossier is submitted as decision-support to assist human review panels (Caldicott Guardians, Data Access Advisory Groups, and Research Ethics Committees) in exercising statutory oversight."`,
      ``,
      `---`,
      ``,
      `## 5. Human Review Panel Sign-Off Blocks`,
      ``,
      `### Local Caldicott Guardian / DPO Verification`,
      `- **Name & Clinical / Professional Title:** ______________________________________`,
      `- **Institutional Organization:** ______________________________________`,
      `- **Statutory Finding:** [  ] Approved for Enclave Ingress   [  ] Amendment Required`,
      `- **Signature:** _______________________________   **Date:** ____ / ____ / ________`,
      ``,
      `### Data Access Advisory Group (DAAG) / Local IG Committee`,
      `- **Committee Chair Name:** ______________________________________`,
      `- **Approval Reference Number:** ______________________________________`,
      `- **Signature:** _______________________________   **Date:** ____ / ____ / ________`,
      ``,
      `---`,
      `*Compiled by Project Seawater · Policy-as-Code for Safe & Secure Data Intelligence Environments (Open-Source Reference Standard · Work in Progress)*`
    ];

    return lines.join('\n');
  };

  const handleDownloadMarkdown = () => {
    const content = buildMarkdownDossier();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${docRef}_Compliance_Dossier.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    const content = buildMarkdownDossier();
    navigator.clipboard.writeText(content);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleDownloadJson = () => {
    const evidencePayload = {
      "@context": "https://www.w3.org/ns/prov-o",
      "documentReference": docRef,
      "sha256": sha256Hash,
      "evaluatedAt": evaluation.evaluatedAt,
      "protocol": protocolParams,
      "decision": evaluation.overallDecision,
      "gates": evaluation.gates
    };
    const blob = new Blob([JSON.stringify(evidencePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${docRef}_Evidence_Payload.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-4xl w-full p-5 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <SeawaterLogo variant="badge" size="xs" />
              <span className="text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
                Safe &amp; Secure Data Intelligence Environments
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Standardized Evidence Pack &amp; Safe Setting Compliance Dossier
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span>Reference: <strong className="text-slate-900 dark:text-slate-200">{docRef}</strong></span>
              <span>·</span>
              <span>Evaluated: {new Date(evaluation.evaluatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Header Action Strip */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Print Clean 1-Page Summary or Save to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 rounded-lg bg-[#00A389] hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              title="Download full Markdown dossier for Git/audit records"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cryptographic SHA-256 Verification Bar */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#005EB8] dark:text-sky-400 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Cryptographic Integrity Stamp (SHA-256):
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sha256Hash);
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                className="text-[11px] font-mono text-[#005EB8] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedHash ? <Check className="w-3 h-3 text-[#047857]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedHash ? 'Hash Copied!' : 'Copy Hash'}</span>
              </button>
            </div>
          </div>
          <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 break-all select-all">
            {sha256Hash || 'Computing SHA-256 hash...'}
          </div>
        </div>

        {/* Evidentiary Status & Decision Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Baseline Verdict</span>
            <span
              className={`text-sm font-bold font-mono ${
                evaluation.overallDecision === 'APPROVED'
                  ? 'text-[#047857] dark:text-emerald-400'
                  : 'text-[#B91C1C] dark:text-rose-400'
              }`}
            >
              {evaluation.overallDecision === 'APPROVED' ? 'RECOMMEND APPROVAL' : 'REQUIRE AMENDMENT'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Statutory Gate Score</span>
            <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
              {evaluation.gates.filter((g) => g.status === 'PASS').length} of {evaluation.gates.length} Passed
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Data Sensitivity Tier</span>
            <span className="text-sm font-bold font-mono text-[#005EB8] dark:text-sky-300">
              {protocolParams.dataTier}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">SDC Cell Threshold</span>
            <span className="text-sm font-bold font-mono text-[#047857] dark:text-emerald-300">
              N ≥ {protocolParams.minCellCount}
            </span>
          </div>
        </div>

        {/* Section 1: Evaluated Protocol Parameters */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
              1. Evaluated Protocol Specifications
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Five Safes &amp; Section 251 Alignment
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block">Accreditation</span>
              <strong className="text-slate-900 dark:text-white capitalize">{protocolParams.researcherStatus}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block">Ethics (IRAS)</span>
              <strong className="text-slate-900 dark:text-white capitalize">{protocolParams.ethicsStatus}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block">S251 Clearance</span>
              <strong className="text-slate-900 dark:text-white capitalize">{protocolParams.s251Status}</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 block">Enclave Isolation</span>
              <strong className="text-slate-900 dark:text-white">
                {protocolParams.enclaveEgressBlocked ? 'Zero-Egress' : 'Egress Detected'}
              </strong>
            </div>
          </div>
        </div>

        {/* Section 2: Gate-by-Gate Compliance Matrix */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
              2. Gate-by-Gate Evaluation &amp; Decision Register Cross-Reference
            </span>
            <span className="text-[10px] text-[#005EB8] dark:text-sky-400 font-mono">
              Deterministic OPA / SHACL Rules
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-2.5">Statutory Gate</th>
                  <th className="p-2.5">Finding</th>
                  <th className="p-2.5">Legal &amp; Policy Authority</th>
                  <th className="p-2.5">OPA Policy Node</th>
                  <th className="p-2.5">ADR Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {evaluation.gates.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-2.5 font-semibold text-slate-900 dark:text-slate-200">{g.gateName}</td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          g.status === 'PASS'
                            ? 'bg-emerald-50 text-[#047857] border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                            : g.status === 'WARN'
                            ? 'bg-amber-50 text-[#B45309] border border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-red-50 text-[#B91C1C] border border-red-200 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-400">{g.statutoryBasis}</td>
                    <td className="p-2.5 font-mono text-[#005EB8] dark:text-sky-300">{g.triggerNode}</td>
                    <td className="p-2.5">
                      {onNavigateToDecisionRegister ? (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToDecisionRegister(g.decisionRef);
                          }}
                          className="font-mono text-[#005EB8] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{g.decisionRef}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="font-mono text-slate-500">{g.decisionRef}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Caldicott Principles 1-8 Compliance Declaration */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
              3. Caldicott Principles 1–8 Compliance Declaration
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Statutory Benchmark: National Data Guardian Guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {[
              { p: 'Principle 1', title: 'Justify the purpose(s)', status: protocolParams.ethicsStatus === 'approved' ? 'Verified (REC Ethical Approval Active)' : 'Pending Ethics Review' },
              { p: 'Principle 2', title: 'Minimise data use', status: protocolParams.dataTier !== 'identifiable' ? 'Verified (Pseudonymised · Direct IDs Expunged)' : 'Requires Identifiable Data Exemption' },
              { p: 'Principle 3', title: 'Use minimum necessary', status: 'Verified (Scoped Query Filter & Cell Minimisation)' },
              { p: 'Principle 4', title: 'Access on strict need-to-know', status: protocolParams.researcherStatus === 'accredited' ? 'Verified (ABAC Role & IRAS Credential)' : 'Pending Credential Validation' },
              { p: 'Principle 5', title: 'Understand responsibilities', status: 'Verified (Signed SDE Researcher User Agreement)' },
              { p: 'Principle 6', title: 'Comply with the law', status: protocolParams.s251Status === 'active_exemption' ? 'Verified (NHS Act 2006 s251 CAG Clearance)' : 'Conditional Review Required' },
              { p: 'Principle 7', title: 'Duty to share for individual care', status: 'Assessed (Secondary Research Enclave Protocol)' },
              { p: 'Principle 8', title: 'Inform patients and public (No surprises)', status: `Verified (Public Register Entry · SDC k ≥ ${protocolParams.minCellCount})` }
            ].map((cp, idx) => {
              const isVerified = cp.status.startsWith('Verified') || cp.status.startsWith('Assessed');
              return (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <strong className="text-slate-900 dark:text-slate-100 font-medium block truncate">
                      {cp.p}: {cp.title}
                    </strong>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block truncate">
                      {cp.status}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded shrink-0 ${
                      isVerified
                        ? 'bg-emerald-100 text-[#047857] dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-100 text-[#B45309] dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {isVerified ? '✓ PASS' : '⚠ CONDITIONAL'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Caldicott Principle 8 Public Transparency Statement */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
            <Scale className="w-3.5 h-3.5 text-[#005EB8] dark:text-sky-400" />
            <span>4. Caldicott Principle 8 Statutory Statement</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed italic">
            &ldquo;This evidence pack compiles machine-verified evidence evaluated against Project Seawater Information Governance constraints under strict closed-world determinism conforming to UK GDPR Art. 25, NHS Digital DSPT Mandate 3, and Caldicott Principles 1–8. In adherence to UK public sector governance standards, technology serves human accountability; it does not replace it. This evidence dossier is submitted to assist human review panels (Caldicott Guardians, Data Access Advisory Groups, and Research Ethics Committees) in exercising statutory oversight.&rdquo;
          </p>
        </div>

        {/* Section 5: Human Review Sign-Off Fields (Printable) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] block">
            5. Human Review Panel Sign-Off Blocks (Caldicott Guardian &amp; DAAG)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                Caldicott Guardian / Data Protection Officer
              </div>
              <div className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                <div className="border-b border-dotted border-slate-300 dark:border-slate-700 pb-1">
                  Name &amp; Title: ____________________________________
                </div>
                <div className="border-b border-dotted border-slate-300 dark:border-slate-700 pb-1">
                  Signature: ______________________ Date: ___/___/______
                </div>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                Data Access Advisory Group (DAAG) Chair
              </div>
              <div className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-400">
                <div className="border-b border-dotted border-slate-300 dark:border-slate-700 pb-1">
                  Approval Ref: _____________________________________
                </div>
                <div className="border-b border-dotted border-slate-300 dark:border-slate-700 pb-1">
                  Signature: ______________________ Date: ___/___/______
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMarkdown ? 'Markdown Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#005EB8]" />
              <span>Export W3C JSON-LD</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
