import React, { useState } from 'react';
import { WaveboundLogo } from './WaveboundLogo';
import {
  Printer,
  Copy,
  Check,
  Download,
  Shield,
  Scale,
  Lock,
  Cpu,
  FileCheck2,
  Users,
  Eye,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Server,
  Layers,
  Database,
  Terminal,
  Activity
} from 'lucide-react';

interface GovernanceCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernanceCharterModal: React.FC<GovernanceCharterModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const CHARTER_SECTIONS = [
    {
      id: 1,
      shortTitle: '1. Statutory Mandates',
      title: '1. Statutory Foundations & Legal Processing Gateways',
      icon: <Scale className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            All analytical processing across <strong>patient and population safe and secure data and intelligence environments</strong> (including Trusted Research Environments [TREs], Secure Data Environments [SDEs], and AI sandbox enclaves) is strictly grounded in statutory legislation and Common Law duties:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 font-bold block flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>UK GDPR Articles 6(1)(e) &amp; 9(2)(j)</span>
              </strong>
              <p className="text-[11.5px] text-slate-400 leading-normal">
                Lawful basis for public-interest archiving, scientific research, and health data linkage with Article 89(1) technical safeguards and strict minimization principles.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-teal-300 font-bold block flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Data Protection Act 2018 (DPA 2018)</span>
              </strong>
              <p className="text-[11.5px] text-slate-400 leading-normal">
                Schedule 1, Part 1, Paragraph 4 (Research purposes in the public interest) providing the domestic legislative exemption for special category population health data.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-amber-300 font-bold block flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>NHS Act 2006 (Section 251)</span>
              </strong>
              <p className="text-[11.5px] text-slate-400 leading-normal">
                Statutory clearance advised by the Confidentiality Advisory Group (CAG) permitting the linkage of confidential patient information without prior explicit consent where obtaining consent is impracticable.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-purple-300 font-bold block flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-purple-400" />
                <span>Digital Economy Act 2017 (Part 5, Ch 5)</span>
              </strong>
              <p className="text-[11.5px] text-slate-400 leading-normal">
                Public authority data sharing under UK Statistics Authority (UKSA) accreditation (§§ 64, 70, 71) with criminal penalties under § 67 for unlawful or unauthorized disclosure.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-900/60 space-y-1 text-xs">
            <span className="font-bold text-white block">Common Law Duty of Confidentiality (CLDC) &amp; Research Ethics:</span>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              Processing must satisfy the Common Law Duty of Confidentiality either via statutory exemption (Section 251), explicit consent, or robust de-identification at source. In addition, every active research protocol requires a formal favorable ethical opinion from a recognized Health Research Authority (HRA) Research Ethics Committee (REC).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      shortTitle: '2. Caldicott Principles',
      title: '2. Caldicott Principles & Public Transparency Mandate',
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Patient and population safe and secure data environments enforce the <strong>Eight Caldicott Principles</strong> across all analytical lifecycles, ensuring human accountability remains paramount:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11.5px]">
            {[
              { num: '1', title: 'Justify the purpose', desc: 'Every data access request must have an explicitly documented, legitimate public-interest objective.' },
              { num: '2', title: 'Do not use personal confidential data unless absolutely necessary', desc: 'Identifiable data items are eliminated unless the research question cannot be answered otherwise.' },
              { num: '3', title: 'Use the minimum necessary data', desc: 'Cohort schemas are trimmed to the minimal essential variables and temporal windows.' },
              { num: '4', title: 'Access on a strict need-to-know basis', desc: 'Granular project workspaces isolate researchers so users access only authorized project tables.' },
              { num: '5', title: 'Everyone must understand their responsibilities', desc: 'Mandatory annual accredited Information Governance training and researcher credentials.' },
              { num: '6', title: 'Understand and comply with the law', desc: 'Every data flow is legally mapped to UK GDPR, DPA 2018, and Section 251 gateways.' },
              { num: '7', title: 'The duty to share is as important as the duty to protect', desc: 'Legitimate research for population health benefit is proactively facilitated, not artificially obstructed.' },
              { num: '8', title: 'Inform patients and the public about data use', desc: 'Public transparency is paramount. Full research summaries are published in an open, public register.' }
            ].map((p) => (
              <div key={p.num} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center text-xs">
                    {p.num}
                  </span>
                  <span>Principle {p.num}: {p.title}</span>
                </span>
                <p className="text-slate-400 text-[11px] pl-6 leading-normal">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-1 text-emerald-100">
            <strong className="block text-emerald-300 font-bold">Public Data Use Register (Caldicott 8 Compliance):</strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              In accordance with National Data Guardian standards, the environment maintains an automated, public-facing Data Use Register. Every approved project emits machine-verifiable W3C PROV-O provenance records recording the study title, lay summary, approving ethics committee, and researcher accreditation.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      shortTitle: '3. Five Safes Framework',
      title: '3. Operational Five Safes Invariants for Secure Intelligence Enclaves',
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            The environment enforces the internationally recognized <strong>Five Safes framework</strong> as continuous, machine-verifiable invariants:
          </p>
          <div className="space-y-2.5 text-[11.5px]">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 shrink-0">Safe People</span>
              <div>
                <strong className="text-white block">Accredited Researchers with Verified Credentials:</strong>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Researchers must hold verified ONS/DEA accreditation or equivalent institutional sponsorship, valid annual Information Governance certificates, and signed user confidentiality agreements.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="font-mono font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800 shrink-0">Safe Projects</span>
              <div>
                <strong className="text-white block">Ethically Approved Public Benefit Research:</strong>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Independent committee sign-off proving public benefit, scientific validity, and lawful basis. Strict statutory prohibition against commercial marketing, insurance underwriting, or individual credit assessment.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800 shrink-0">Safe Settings</span>
              <div>
                <strong className="text-white block">Zero-Egress Air-Gapped Cloud Fabric:</strong>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Workspaces operate in isolated Virtual Private Clouds with outbound internet access completely blocked at the kernel and network layer. All software dependencies are installed from internal, security-scanned mirrors (CRAN, PyPI, Harbor). Local download and clipboard exfiltration are disabled.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 shrink-0">Safe Data</span>
              <div>
                <strong className="text-white block">Tiered Sensitivity &amp; Deterministic Pseudonymisation:</strong>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Direct patient identifiers (names, addresses, NHS numbers) are segregated at source. Research microdata is provisioned under pseudonymized project tokens with strict field-level minimization.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <span className="font-mono font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800 shrink-0">Safe Outputs</span>
              <div>
                <strong className="text-white block">Mathematical SDC &amp; 2-Person Cryptographic Airlock:</strong>
                <p className="text-slate-400 text-[11px] leading-normal">
                  All statistical models, summaries, and plots must pass automated disclosure checks (<code className="text-rose-300 font-mono">k &ge; 10</code>, rounding, dominance bounds) followed by accredited human SDC reviewer sign-off.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      shortTitle: '4. SDC Egress Policy',
      title: '4. Quantitative Statistical Disclosure Control (SDC) & Airlock SOP',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            To prevent spontaneous individual identification or attribute disclosure in published outputs, the platform enforces specific rules across all export categories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11.5px]">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-amber-300 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Suppression &amp; Controlled Rounding</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Raw frequency counts between 1 and 9 are prohibited from egress. Analysts may either redact small counts (<code className="text-amber-300">&lt;10*</code>) with complementary secondary suppression, or apply <strong>Suppression through Controlled Rounding to Base 5 or 10</strong>. Controlled rounding elevates or rounds counts to multiples of 5, disguising true microdata counts while preserving tabular completeness without empty asterisk holes.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dominance Rules: (1, 80%) &amp; (2, 85%)</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                In continuous tabular outputs (costs, bed days, dosages), outputs are blocked if a single patient accounts for &gt;80% of an aggregate metric, or two patients account for &gt;85%, preventing deductive attribute disclosure by external parties.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-emerald-300 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Regression Degrees of Freedom &amp; Residuals</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Published linear, logistic, and Cox models must maintain residual degrees of freedom <code className="text-emerald-300">df = N - p &ge; 10</code>. Categorical factors must be backed by &ge; 10 patients. Raw residual scatterplots and studentized outlier plots are strictly prohibited microdata.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-purple-300 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Survival Curves: Smoothing vs Tail Truncation</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Kaplan-Meier survival curves with risk sets falling below <code className="text-purple-300">N_risk &lt; 10</code> must either be truncated at the critical timepoint, or smoothed continuously (via spline regression or kernel density smoothing) to eliminate vertical step drops that expose exact patient event dates.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11.5px] space-y-1">
            <strong className="text-white block">Extrema, Differential Privacy &amp; 2-Person Sign-Off:</strong>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Raw extrema (<code className="text-rose-300">min() / max()</code>) are strictly forbidden; 5th and 95th percentiles must be substituted. AI model weights must demonstrate Differential Privacy guarantees (<code className="text-cyan-300">&epsilon; &le; 1.0</code>). All exports require automated SHACL/OPA validation followed by accredited human SDC Officer sign-off with a SHA-256 digital seal.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      shortTitle: '5. AI & LLM Governance',
      title: '5. Generative AI, LLMs & Autonomous Agent Governance Position',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-xs text-red-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Strict Prohibition on Consumer &amp; Commercial Multi-Tenant External LLMs</span>
            </div>
            <p className="text-slate-300 text-[11.5px] leading-relaxed">
              Under UK GDPR, the Common Law Duty of Confidentiality, and NHS Information Governance guidance, <strong>identifiable or pseudonymised patient microdata must NEVER be entered into external, multi-tenant commercial LLMs or AI assistants</strong> (including consumer or standard commercial ChatGPT, Claude, GitHub Copilot, or public cloud APIs). Even enterprise agreements promising &quot;no training on customer data&quot; do not waive the statutory requirement for sovereign data boundaries, Section 251 legal gateways, and approved TRE airlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11.5px]">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-purple-300 font-bold block flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>In-Enclave Sovereign LLM Deployment</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Where generative AI or LLMs are deployed for research, model weights must execute completely <strong>in-enclave</strong> within the isolated VPC boundary (e.g. via dedicated local containerized endpoints such as vLLM or Ollama). Zero data or metadata may traverse external public internet backbones.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 font-bold block flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Read-Only Model Context Protocol (MCP) Bounds</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Autonomous agents and MCP tools are strictly restricted to read-only analytical queries (<code className="text-cyan-300">mcp:ExecuteSQL</code>, <code className="text-cyan-300">mcp:ExportSummary</code>). Tool definitions are validated against W3C SHACL shapes; schema modification, file deletion, and direct egress network calls are blocked.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-teal-300 font-bold block flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Zero Training &amp; Prompt Defense</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                No patient records or clinician prompts may be stored, cached, or used to fine-tune foundation models. Real-time prompt injection and jailbreak defenses sanitize inputs, while outbound synthetic outputs are evaluated against SDC thresholds before display.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-emerald-300 font-bold block flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>DCB0129 &amp; ISO 42001 Clinical Safety</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                AI software developed in the platform must maintain an active Clinical Safety Case Report and living Hazard Log overseen by an accredited Clinical Safety Officer (CSO) under DCB0129, complying with ISO/IEC 42001 (AIMS) and ISO/IEC 5259 (bias mitigation).
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      shortTitle: '6. Opt-Outs & PPIE',
      title: '6. Data Subject Rights, National Opt-Outs & PPIE Co-Design',
      icon: <Eye className="w-4 h-4 text-teal-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Maintaining public trust requires that citizens retain transparent control over their data, and that research reflects lived patient experience:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11.5px]">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-teal-300 font-bold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>National Data Opt-Out (NDOO) Compliance</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                The environment automatically ingests the NHS Spine National Data Opt-Out list. Any patient who has registered an opt-out for secondary research purposes is systematically filtered and purged prior to cohort provisioning, satisfying national policy requirements in England and Wales.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 font-bold block flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Patient &amp; Public Involvement &amp; Engagement (PPIE)</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Study designs are co-created with lived-experience patient advisory panels. Representatives review data flow diagrams, eliminate non-essential demographic fields, and co-author plain-English lay summaries published on the open Data Use Register.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-900/60 text-xs space-y-1">
            <span className="font-bold text-white block">Individual Rights Under UK GDPR:</span>
            <p className="text-slate-400 leading-relaxed text-[11.5px]">
              While scientific research under UK GDPR Article 89(1) and DPA 2018 Section 19 provides specific exemptions from individual subject access requests (SARs) and erasure where fulfillment would render research impossible, the environment ensures that general public accountability, opt-outs, and independent ethics governance are never bypassed.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      shortTitle: '7. Policy-as-Code Rollout',
      title: '7. Policy-as-Code Implementation & Non-Breaking Staged Rollout',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Wavebound operationalizes this Charter by decoupling enduring governance ontologies from high-speed runtime enforcement points (PEPs), guaranteeing zero operational downtime during rollout:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11.5px]">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-cyan-300 font-bold block flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dual-Tier Compilation (OWL to OPA Rego)</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Governance policies are authored in readable W3C OWL 2 and closed-world SHACL shapes for institutional boards and auditors, then compiled into sub-millisecond Open Policy Agent (OPA) Rego rules for line-rate authorization.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <strong className="text-emerald-300 font-bold block flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>W3C PROV-O Cryptographic Audit Lineage</span>
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Every authorization decision, admission event, and airlock release emits a cryptographically signed RDF provenance triple to an append-only store, enabling comprehensive regulatory and public scrutiny.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11.5px] space-y-2">
            <strong className="text-white block font-bold">Safe, Non-Breaking 4-Stage Operational Rollout:</strong>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-300 block">Stage 1: Evaluate-Only</span>
                <span className="text-slate-400">Passive telemetry; zero requests blocked.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-teal-300 block">Stage 2: Shadow Mode</span>
                <span className="text-slate-400">Side-by-side discrepancy logging.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-purple-300 block">Stage 3: Canary Pilot</span>
                <span className="text-slate-400">Active checks on single test namespace.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-bold text-emerald-300 block">Stage 4: Multi-PEP Active</span>
                <span className="text-slate-400">Full enforcement with fail-open emergency switch.</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleCopySummary = () => {
    const summary = `PUBLIC INTEREST DATA GOVERNANCE & POPULATION HEALTH RESEARCH CHARTER
Reference: WAVEBOUND-PAC-GOV-2026-V5 | Patient and Population Safe and Secure Data & Intelligence Environments

1. Statutory Mandates: DEA 2017 Part 5, UK GDPR Art 6(1)(e) & 9(2)(j), DPA 2018, NHS Act 2006 s251 (CAG), Common Law Duty of Confidentiality.
2. Caldicott Principles 1–8: Comprehensive adherence with Caldicott Principle 8 (Public Transparency & Open Data Use Register).
3. Five Safes: Safe People, Safe Projects, Safe Settings (air-gapped zero egress), Safe Data (pseudonymisation), Safe Outputs.
4. Quantitative SDC: Primary suppression (k >= 10), Controlled Rounding (Base 5/10), secondary suppression, (1, 80%) & (2, 85%) dominance, residual df >= 10, survival curve smoothing, zero raw extrema, differential privacy (epsilon <= 1.0), 2-person cryptographic airlock seal.
5. AI & LLM Governance: Strict prohibition of external/commercial multi-tenant LLMs on patient records; in-enclave sovereign weights only; read-only MCP bounds; DCB0129/0160 & ISO 42001/5259 clinical safety.
6. Citizen Rights & PPIE: National Data Opt-Out (NDOO) compliance, patient advisory co-design, open transparency registers.
7. Policy-as-Code: Dual-Tier OWL-to-Rego compilation, 4-stage non-breaking rollout (Audit -> Shadow -> Canary -> Active), W3C PROV-O audit lineage.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFullMarkdown = () => {
    const md = `# PUBLIC INTEREST DATA GOVERNANCE & POPULATION HEALTH RESEARCH CHARTER

*Authoritative Governance Specification*  
*Reference: WAVEBOUND-PAC-GOV-2026-V5 · Ratified for Patient & Population Safe & Secure Data and Intelligence Environments*

---

## 1. Statutory Foundations & Legal Processing Gateways

All analytical processing across **patient and population safe and secure data and intelligence environments** (including Trusted Research Environments [TREs], Secure Data Environments [SDEs], and AI sandbox enclaves) is strictly grounded in statutory legislation and Common Law duties:

- **UK GDPR Articles 6(1)(e) & 9(2)(j)**: Lawful basis for public-interest archiving, scientific research, and health data linkage with Article 89(1) technical safeguards and strict minimization principles.
- **Data Protection Act 2018 (DPA 2018)**: Schedule 1, Part 1, Paragraph 4 (Research purposes in the public interest) providing the domestic legislative exemption for special category population health data.
- **NHS Act 2006 (Section 251)**: Statutory clearance advised by the Confidentiality Advisory Group (CAG) permitting the linkage of confidential patient information without prior explicit consent where obtaining consent is impracticable.
- **Digital Economy Act 2017 (Part 5, Ch 5)**: Public authority data sharing under UK Statistics Authority (UKSA) accreditation (§§ 64, 70, 71) with criminal penalties under § 67 for unlawful or unauthorized disclosure.

### Common Law Duty of Confidentiality (CLDC) & Research Ethics
Processing must satisfy the Common Law Duty of Confidentiality either via statutory exemption (Section 251), explicit consent, or robust de-identification at source. In addition, every active research protocol requires a formal favorable ethical opinion from a recognized Health Research Authority (HRA) Research Ethics Committee (REC).

---

## 2. Caldicott Principles & Public Transparency Mandate

Patient and population safe and secure data environments enforce the **Eight Caldicott Principles** across all analytical lifecycles, ensuring human accountability remains paramount:

1. **Principle 1: Justify the purpose** — Every data access request must have an explicitly documented, legitimate public-interest objective.
2. **Principle 2: Do not use personal confidential data unless absolutely necessary** — Identifiable data items are eliminated unless the research question cannot be answered otherwise.
3. **Principle 3: Use the minimum necessary data** — Cohort schemas are trimmed to the minimal essential variables and temporal windows.
4. **Principle 4: Access on a strict need-to-know basis** — Granular project workspaces isolate researchers so users access only authorized project tables.
5. **Principle 5: Everyone must understand their responsibilities** — Mandatory annual accredited Information Governance training and researcher credentials.
6. **Principle 6: Understand and comply with the law** — Every data flow is legally mapped to UK GDPR, DPA 2018, and Section 251 gateways.
7. **Principle 7: The duty to share is as important as the duty to protect** — Legitimate research for population health benefit is proactively facilitated, not artificially obstructed.
8. **Principle 8: Inform patients and the public about data use** — Public transparency is paramount. Full research summaries are published in an open, public register.

### Public Data Use Register (Caldicott 8 Compliance)
In accordance with National Data Guardian standards, the environment maintains an automated, public-facing Data Use Register. Every approved project emits machine-verifiable W3C PROV-O provenance records recording the study title, lay summary, approving ethics committee, and researcher accreditation.

---

## 3. Operational Five Safes Invariants for Secure Intelligence Enclaves

The environment enforces the internationally recognized **Five Safes framework** as continuous, machine-verifiable invariants:

- **Safe People — Accredited Researchers with Verified Credentials:** Researchers must hold verified ONS/DEA accreditation or equivalent institutional sponsorship, valid annual Information Governance certificates, and signed user confidentiality agreements.
- **Safe Projects — Ethically Approved Public Benefit Research:** Independent committee sign-off proving public benefit, scientific validity, and lawful basis. Strict statutory prohibition against commercial marketing, insurance underwriting, or individual credit assessment.
- **Safe Settings — Zero-Egress Air-Gapped Cloud Fabric:** Workspaces operate in isolated Virtual Private Clouds with outbound internet access completely blocked at the kernel and network layer. All software dependencies are installed from internal, security-scanned mirrors (CRAN, PyPI, Harbor). Local download and clipboard exfiltration are disabled.
- **Safe Data — Tiered Sensitivity & Deterministic Pseudonymisation:** Direct patient identifiers (names, addresses, NHS numbers) are segregated at source. Research microdata is provisioned under pseudonymized project tokens with strict field-level minimization.
- **Safe Outputs — Mathematical SDC & 2-Person Cryptographic Airlock:** All statistical models, summaries, and plots must pass automated disclosure checks (\`k >= 10\`, rounding, dominance bounds) followed by accredited human SDC reviewer sign-off.

---

## 4. Quantitative Statistical Disclosure Control (SDC) & Airlock SOP

To prevent spontaneous individual identification or attribute disclosure in published outputs, the platform enforces specific rules across all export categories:

- **Primary Suppression & Controlled Rounding:** Raw frequency counts between 1 and 9 are prohibited from egress. Analysts may either redact small counts (\`<10*\`) with complementary secondary suppression, or apply **Suppression through Controlled Rounding to Base 5 or 10**. Controlled rounding elevates or rounds counts to multiples of 5, disguising true microdata counts while preserving tabular completeness without empty asterisk holes.
- **Dominance Rules: (1, 80%) & (2, 85%):** In continuous tabular outputs (costs, bed days, dosages), outputs are blocked if a single patient accounts for >80% of an aggregate metric, or two patients account for >85%, preventing deductive attribute disclosure by external parties.
- **Regression Degrees of Freedom & Residuals:** Published linear, logistic, and Cox models must maintain residual degrees of freedom \`df = N - p >= 10\`. Categorical factors must be backed by >= 10 patients. Raw residual scatterplots and studentized outlier plots are strictly prohibited microdata.
- **Survival Curves: Smoothing vs Tail Truncation:** Kaplan-Meier survival curves with risk sets falling below \`N_risk < 10\` must either be truncated at the critical timepoint, or smoothed continuously (via spline regression or kernel density smoothing) to eliminate vertical step drops that expose exact patient event dates.

### Extrema, Differential Privacy & 2-Person Sign-Off
Raw extrema (\`min() / max()\`) are strictly forbidden; 5th and 95th percentiles must be substituted. AI model weights must demonstrate Differential Privacy guarantees (\`epsilon <= 1.0\`). All exports require automated SHACL/OPA validation followed by accredited human SDC Officer sign-off with a SHA-256 digital seal.

---

## 5. Generative AI, LLMs & Autonomous Agent Governance Position

> **Strict Prohibition on Consumer & Commercial Multi-Tenant External LLMs:** Under UK GDPR, the Common Law Duty of Confidentiality, and NHS Information Governance guidance, **identifiable or pseudonymised patient microdata must NEVER be entered into external, multi-tenant commercial LLMs or AI assistants** (including consumer or standard commercial ChatGPT, Claude, GitHub Copilot, or public cloud APIs). Even enterprise agreements promising "no training on customer data" do not waive the statutory requirement for sovereign data boundaries, Section 251 legal gateways, and approved TRE airlocks.

- **In-Enclave Sovereign LLM Deployment:** Where generative AI or LLMs are deployed for research, model weights must execute completely **in-enclave** within the isolated VPC boundary (e.g. via dedicated local containerized endpoints such as vLLM or Ollama). Zero data or metadata may traverse external public internet backbones.
- **Read-Only Model Context Protocol (MCP) Bounds:** Autonomous agents and MCP tools are strictly restricted to read-only analytical queries (\`mcp:ExecuteSQL\`, \`mcp:ExportSummary\`). Tool definitions are validated against W3C SHACL shapes; schema modification, file deletion, and direct egress network calls are blocked.
- **Zero Training & Prompt Defense:** No patient records or clinician prompts may be stored, cached, or used to fine-tune foundation models. Real-time prompt injection and jailbreak defenses sanitize inputs, while outbound synthetic outputs are evaluated against SDC thresholds before display.
- **DCB0129 & ISO 42001 Clinical Safety:** AI software developed in the platform must maintain an active Clinical Safety Case Report and living Hazard Log overseen by an accredited Clinical Safety Officer (CSO) under DCB0129, complying with ISO/IEC 42001 (AIMS) and ISO/IEC 5259 (bias mitigation).

---

## 6. Data Subject Rights, National Opt-Outs & PPIE Co-Design

Maintaining public trust requires that citizens retain transparent control over their data, and that research reflects lived patient experience:

- **National Data Opt-Out (NDOO) Compliance:** The environment automatically ingests the NHS Spine National Data Opt-Out list. Any patient who has registered an opt-out for secondary research purposes is systematically filtered and purged prior to cohort provisioning, satisfying national policy requirements in England and Wales.
- **Patient & Public Involvement & Engagement (PPIE):** Study designs are co-created with lived-experience patient advisory panels. Representatives review data flow diagrams, eliminate non-essential demographic fields, and co-author plain-English lay summaries published on the open Data Use Register.

### Individual Rights Under UK GDPR
While scientific research under UK GDPR Article 89(1) and DPA 2018 Section 19 provides specific exemptions from individual subject access requests (SARs) and erasure where fulfillment would render research impossible, the environment ensures that general public accountability, opt-outs, and independent ethics governance are never bypassed.

---

## 7. Policy-as-Code Implementation & Non-Breaking Staged Rollout

Wavebound operationalizes this Charter by decoupling enduring governance ontologies from high-speed runtime enforcement points (PEPs), guaranteeing zero operational downtime during rollout:

- **Dual-Tier Compilation (OWL to OPA Rego):** Governance policies are authored in readable W3C OWL 2 and closed-world SHACL shapes for institutional boards and auditors, then compiled into sub-millisecond Open Policy Agent (OPA) Rego rules for line-rate authorization.
- **W3C PROV-O Cryptographic Audit Lineage:** Every authorization decision, admission event, and airlock release emits a cryptographically signed RDF provenance triple to an append-only store, enabling comprehensive regulatory and public scrutiny.

### Safe, Non-Breaking 4-Stage Operational Rollout
- **Stage 1: Evaluate-Only** — Passive telemetry; zero requests blocked.
- **Stage 2: Shadow Mode** — Side-by-side discrepancy logging.
- **Stage 3: Canary Pilot** — Active checks on single test namespace.
- **Stage 4: Multi-PEP Active** — Full enforcement with fail-open emergency switch.

---

*Authorized by Institutional IG & Ethics Oversight Board*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'WAVEBOUND_GOVERNANCE_CHARTER_2026_V5.md';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const activeSectionObj = CHARTER_SECTIONS.find((s) => s.id === activeSection) || CHARTER_SECTIONS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full p-5 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WaveboundLogo variant="badge" size="xs" />
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800 uppercase tracking-wider">
                Authoritative Governance Specification
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Public Interest Data Governance &amp; Population Health Research Charter
            </h2>
            <span className="text-[11px] text-slate-400 font-mono block">
              Reference: WAVEBOUND-PAC-GOV-2026-V5 · Ratified for Patient &amp; Population Safe &amp; Secure Data and Intelligence Environments
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleDownloadFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Download Full Markdown Charter"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{downloaded ? 'Downloaded!' : 'Download .md'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Print Charter or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-teal-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Section Tabs Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-thin">
          {CHARTER_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {sec.icon}
              <span>{sec.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Section Content Pane */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {activeSectionObj.icon}
                <span>{activeSectionObj.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                Section {activeSectionObj.id} of {CHARTER_SECTIONS.length}
              </span>
            </div>

            {activeSectionObj.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <button
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              Authorized by Institutional IG &amp; Ethics Oversight Board
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs cursor-pointer border border-slate-700 transition-colors"
            >
              Close Charter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
