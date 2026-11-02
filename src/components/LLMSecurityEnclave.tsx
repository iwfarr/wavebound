import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Lock,
  Server,
  FileCode2,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  Database,
  Bot
} from 'lucide-react';

interface LLMSecurityEnclaveProps {
  onNavigateToGlossaryTerm?: (termId: string) => void;
  onNavigateToSandbox?: () => void;
}

export const LLMSecurityEnclave: React.FC<LLMSecurityEnclaveProps> = ({
  onNavigateToGlossaryTerm,
  onNavigateToSandbox
}) => {
  const [activeTab, setActiveTab] = useState<'in-enclave-inference' | 'simulator' | 'safeguards' | 'taxonomy' | 'config-generator'>('in-enclave-inference');

  // Interactive Prompt Sanitizer Simulator State
  const [inputCode, setInputCode] = useState<string>(`# Data analysis script for Cohort 12
import pandas as pd

# Load patient cohort sample
patient_df = pd.DataFrame({
    'patient_name': ['Jane Doe', 'John Smith'],
    'nhs_number': ['485 777 3456', '943 211 8890'],
    'dob': ['1984-03-12', '1962-11-29'],
    'postcode': ['SW1A 1AA', 'EC1A 1BB'],
    'diagnosis': ['Type 2 Diabetes', 'Pancreatic Neoplasm'],
    'cohort_count': [4, 18] # Warning: small cell < 10
})

def calculate_risk(df):
    # TODO: generate logistic regression model using Copilot/Cline
    return df.describe()
`);

  const [sanitizerMode, setSanitizerMode] = useState<'block' | 'scrub'>('scrub');
  const [simulationResult, setSimulationResult] = useState<{
    status: 'CLEAN' | 'BLOCKED' | 'SANITIZED';
    violations: string[];
    sanitizedCode: string;
  } | null>(null);

  const [activeToolConfig, setActiveToolConfig] = useState<'cline' | 'copilot' | 'cursor' | 'vllm'>('cline');
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Run PEP Simulation
  const handleRunSimulation = () => {
    const violations: string[] = [];

    // Regex checks for NHS numbers (10 digits or 3-3-4 pattern)
    if (/\b\d{3}\s?\d{3}\s?\d{4}\b/.test(inputCode)) {
      violations.push('Direct Identifier Detected: NHS 10-digit Number Pattern');
    }

    // Check for patient names / full names
    if (/['"][A-Z][a-z]+\s[A-Z][a-z]+['"]/.test(inputCode)) {
      violations.push('Direct Identifier Detected: Full Patient Name Literal');
    }

    // Check for postcodes
    if (/\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/i.test(inputCode)) {
      violations.push('Quasi-Identifier Detected: Full UK Postcode');
    }

    // Check for dates of birth
    if (/\b(19\d\d|20\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])\b/.test(inputCode)) {
      violations.push('Quasi-Identifier Detected: Exact Date of Birth');
    }

    // Check for small cohort counts < 10
    if (/cohort_count.*\[.*[1-9]\b/.test(inputCode)) {
      violations.push('SDC Disclosure Violation: Primary Cell Count < 10 Detected');
    }

    if (violations.length === 0) {
      setSimulationResult({
        status: 'CLEAN',
        violations: [],
        sanitizedCode: inputCode
      });
      return;
    }

    if (sanitizerMode === 'block') {
      setSimulationResult({
        status: 'BLOCKED',
        violations,
        sanitizedCode: `# PROMPT BLOCKED BY ENCLAVE PEP
# Violations detected:
${violations.map((v) => `# - ${v}`).join('\n')}
# Transfer to LLM cancelled. Zero person-level data emitted.`
      });
    } else {
      // Scrubbing mode: replace with synthetic tokens
      let scrubbed = inputCode
        .replace(/\b\d{3}\s?\d{3}\s?\d{4}\b/g, 'SYNTHETIC_NHS_NUM_001')
        .replace(/['"][A-Z][a-z]+\s[A-Z][a-z]+['"]/g, "'SYNTHETIC_PATIENT_ALIAS'")
        .replace(/\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/gi, 'SW1A_XXX')
        .replace(/\b(19\d\d|20\d\d)[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])\b/g, '1980-01-01')
        .replace(/(\[|\s)4,/, '$110, /* Cell adjusted to k>=10 */');

      setSimulationResult({
        status: 'SANITIZED',
        violations,
        sanitizedCode: scrubbed
      });
    }
  };

  const handleCopyConfig = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>AI Coding Assistants & Enclave Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Using LLMs in Coding & Protecting Person-Level Data
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A comprehensive guide to using tools like <strong>GitHub Copilot, Cline, Cursor, and OpenAI Codex</strong>{' '}
            safely inside secure digital enclaves without leaking personal healthcare data (PII/PHI) across external network boundaries.
          </p>

          {/* Sub-navigation tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'in-enclave-inference', label: 'In-Enclave Inference & Policy Modes', icon: <Server className="w-3.5 h-3.5" /> },
              { id: 'simulator', label: 'Interactive Pre-Prompt PEP Simulator', icon: <Terminal className="w-3.5 h-3.5" /> },
              { id: 'safeguards', label: '5 Core Enclave Safeguards', icon: <Lock className="w-3.5 h-3.5" /> },
              { id: 'taxonomy', label: 'Safe Enclave Taxonomy (TRE, VDE, DCR, TEE)', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'config-generator', label: 'IDE & Ignore Config Generator', icon: <FileCode2 className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 0: IN-ENCLAVE INFERENCE ARCHITECTURE & COMPARATIVE POLICY MODES */}
      {activeTab === 'in-enclave-inference' && (
        <div className="space-y-8">
          {/* Section 1: In-Enclave Inference Compute Architecture */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  <span>On-Premise / In-Enclave Foundation Model Architecture</span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Air-Gapped In-Enclave Inference Architecture
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Reference specification for self-hosting high-throughput foundation models (vLLM, Triton, or TensorRT-LLM)
                  on dedicated in-enclave accelerator clusters inside the secure TRE boundary with zero external telemetry and zero data egress.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right shrink-0">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Compute Fabric</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">Dedicated In-Enclave Accelerator Cluster</span>
                <span className="text-[10px] text-slate-400 block">Air-gapped private subnet · Zero WAN gateway</span>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>1. Researcher IDE</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Researcher operates in Cline, Cursor, or VS Code Continue on an air-gapped Virtual Desktop (VDI) without copy-paste or local disk mounting.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>2. In-Enclave PEP Proxy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pre-prompt Policy Enforcement Point (PEP) intercepts outgoing JSON context. Performs AST parsing, regex validation, and SDC cell checks.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>3. In-Enclave Model Serving</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  High-throughput container (vLLM / Triton / TensorRT-LLM) hosting open-weight models over a private internal VPC with zero external Internet routes.
                </p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>4. Airlock Output SDC</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Analytical outputs, tables, and serialized models are routed to the airlock for automated SHACL SDC evaluation ($k \ge 10$, dominance $\le 80\%$).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Comparative Analysis of Policy Enforcement Modes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Architecture Reference</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Comparative Analysis of Policy Enforcement Modes
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
                This reference specification analyzes three operational enforcement archetypes for LLM integration in trusted research environments, comparing access mechanics, operational velocity, and residual re-identification exposure.
              </p>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mode 1: Hard Blocking */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-red-900/40 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>Mode A: Hard Blocking</span>
                  </span>
                  <span className="text-[10px] font-mono bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
                    Fail-Closed PEP
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Strict Fail-Closed Rejection</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If the PEP detects any unmasked direct identifier, patient birth date, full postcode, or small cell count ($k &lt; 10$), the request is aborted immediately with HTTP 403.
                </p>
                <div className="pt-2 border-t border-slate-900 space-y-1.5 text-xs">
                  <div className="text-slate-300 font-semibold text-[11px]">Operational Workflow:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Live raw tables cannot be piped directly into prompts. Code is authored against schema definitions, synthetic datasets, or empty frames (`df.head(0)`).
                  </p>
                  <div className="text-emerald-400 font-semibold text-[11px] pt-1">Security Boundary:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Zero microdata ingestion: Confidential patient records never enter accelerator memory or inference KV-caches.
                  </p>
                </div>
              </div>

              {/* Mode 2: Dynamic Scrubbing */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Mode B: Dynamic Scrubbing</span>
                  </span>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    Permissive Masking
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">On-The-Fly Pseudonymization</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The proxy parses outgoing prompt buffers in real time, replacing primary direct identifiers with synthetic surrogates (`&lt;PATIENT_ID_01&gt;`, `&lt;DATE_OFFSET&gt;`).
                </p>
                <div className="pt-2 border-t border-slate-900 space-y-1.5 text-xs">
                  <div className="text-slate-300 font-semibold text-[11px]">Operational Workflow:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Low friction. Queries can be issued directly from interactive analysis notebooks without manual test fixture authoring.
                  </p>
                  <div className="text-amber-400 font-semibold text-[11px] pt-1">Residual Re-Identification Risk:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    <strong>Quasi-Identifier Linkage Exposure:</strong> Direct identifier removal does not confer statistical anonymity. Longitudinal attributes (rare diagnoses, admission timestamps) remain vulnerable to external linkage.
                  </p>
                </div>
              </div>

              {/* Mode 3: Schema-Only RAG */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/40 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>Mode C: Schema-Only</span>
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                    Zero-Data RAG
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Metadata &amp; Script Synthesis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The in-enclave model receives only table schemas, column types, and data dictionary descriptions (excluding row instances and records).
                </p>
                <div className="pt-2 border-t border-slate-900 space-y-1.5 text-xs">
                  <div className="text-slate-300 font-semibold text-[11px]">Operational Workflow:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    The model generates analytical scripts (PySpark, SQL, R); the researcher executes the synthesized code locally within their isolated container kernel.
                  </p>
                  <div className="text-cyan-400 font-semibold text-[11px] pt-1">Security Boundary:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Decouples code synthesis from raw data instances, preventing patient microdata from ever entering model context buffers.
                  </p>
                </div>
              </div>
            </div>

            {/* Crucial Concept Box: Quasi-Identifiers & SDC Rules */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Regulatory Reference: Multi-Dimensional Quasi-Identifiers &amp; Linkage Vectors</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Under UK GDPR Article 4(1), NHS Information Governance standards, and Sweeney’s $k$-anonymity theorem, removing direct names does not establish statistical anonymity. High-entropy combinations of indirect quasi-identifiers create deterministic re-identification fingerprints:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-cyan-300 block">Appointment Timestamps</span>
                  <p className="text-[10px] text-slate-400">
                    Exact admission and discharge date-times can be cross-referenced with public dispatch logs or municipal registries.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-cyan-300 block">Partial Postcodes</span>
                  <p className="text-[10px] text-slate-400">
                    A 3-digit postcode district combined with birth month/year narrows individual identity down to minimal household sets.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-cyan-300 block">Survival Analysis Tails</span>
                  <p className="text-[10px] text-slate-400">
                    When the Kaplan-Meier risk set falls below 10, individual step-down drops disclose the exact timing of clinical events.
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-cyan-300 block">Extreme Logistic Odds</span>
                  <p className="text-[10px] text-slate-400">
                    Extreme odds ratios and quasi-complete separation in regression reveal sparse contingency cells ($k &lt; 10$).
                  </p>
                </div>
              </div>
            </div>

            {/* Defense in depth architectural standard box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Defense-in-Depth Specification: Layered Isolation vs. Advisory Client Filters</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In a production data analysis platform, security boundaries must be structured hierarchically. Client-side ignore files (<code>.clineignore</code>, <code>.copilotignore</code>, <code>.cursorignore</code>) are advisory developer hints, not cryptographic or security guarantees:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-purple-300 block">Layer 1: Advisory Client Filters</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <code>.clineignore</code>, <code>.copilotignore</code> prevent IDE plugins from routinely scraping data folders into prompt windows. (Can be bypassed by subshells or misconfiguration).
                  </p>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-300 block">Layer 2: Filesystem Permissions</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    POSIX read-only bind mounts (<code>chmod 400</code>), separate user UID/GID namespaces, and SELinux policies preventing unprivileged processes from reading raw data vaults.
                  </p>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-cyan-300 block">Layer 3: Network Zero-Egress</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Calico CNI GlobalNetworkPolicies enforce zero outbound WAN egress. Model traffic is restricted to internal mTLS endpoints with no external routing.
                  </p>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 block">Layer 4: AST Proxy &amp; Airlock</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Pre-prompt AST tokenizer proxies scrub residual PII, and airlock export gates validate all outbound artifacts against SHACL SDC rules ($k \ge 10$, dominance $\le 80\%$).
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: The NHS VPN Split-Tunneling Illusion vs. True Air-Gapped TRE Enclaves */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-900/40 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Information Governance &amp; Network Topology Analysis</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    The NHS VPN Split-Tunneling Illusion vs. True Air-Gapped TRE Enclaves
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                    Addressing developer LLM/CLI use: Why working over an NHS Trust VPN connection creates a deceptive false sense of security, and how true Trusted Research Environments (TREs) physically and cryptographically prevent data exfiltration.
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/60 text-right shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Governance Warning</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">NHS VPN ≠ TRE Security</span>
                  <span className="text-[10px] text-slate-400 block">Outbound WAN egress remains active</span>
                </div>
              </div>

              {/* Explanatory Context: Why NHS VPN Oddly Allows Internet Access */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <span>The Core Hazard: Split-Tunneling &amp; Developer AI Tooling</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  NHS Trust, ICB, and regional health board VPNs (e.g., Cisco AnyConnect, FortiClient, Pulse Secure) are configured to authenticate trusted clinical staff and grant access to internal intranet portals, pathology databases, and electronic patient records (EPRs).
                  Crucially, <strong>most NHS VPN configurations permit split-tunneling or route general internet egress through an outbound corporate web gateway</strong> to allow standard web browsing, package installations (<code>pip</code>, <code>npm</code>), and email.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When a data scientist or software engineer runs modern AI-assisted coding extensions (such as <strong>GitHub Copilot, Cursor, Cline, or Claude Code</strong>) on a laptop connected to the NHS VPN, <strong>the IDE silently transmits active editor buffers, open diagnostic files, SQL queries, and terminal logs across external commercial LLM APIs</strong> hosted on public cloud infrastructure outside the NHS sovereign boundary.
                </p>
              </div>

              {/* Side-by-Side Architectural Contrast Table */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card: NHS VPN Workstation Scenario */}
                <div className="p-5 rounded-xl bg-slate-950 border border-red-900/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Developer Laptop on NHS VPN (High Risk)</span>
                    </span>
                    <span className="text-[10px] font-mono bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-800">
                      Uncontrolled Egress
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Network Perimeter:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        VPN grants access to internal NHS shares, but local workstation retains active default route to the public internet (split-tunneling) or permits HTTPS port 443 egress to arbitrary web domains.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">AI Coding Tool Behavior:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Cursor, Copilot, or Cline automatically scan open tabs, local <code>.env</code> files, and SQL extracts for context window indexing, sending payloads directly to <code>api.openai.com</code>, <code>api.anthropic.com</code>, or Microsoft telemetry servers.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Data Protection Impact:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Person-level NHS numbers, unmasked patient demographics, and confidential cohort definitions leave the UK sovereign boundary without DPA/DSA coverage.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Inspection &amp; Auditability:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Zero prompt inspection. No Caldicott oversight. No record of which patient records were ingested into commercial LLM model context caches.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-red-400 font-mono font-semibold">
                      <span>Status: Non-Compliant</span>
                      <span>UK GDPR Art. 32 / 33 Breach Risk</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: True Air-Gapped TRE Enclave */}
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Seawater TRE Enclave (Zero-Egress Isolation)</span>
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      SATRE 2.0 Compliant
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Network Perimeter:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Calico CNI <code>GlobalNetworkPolicy</code> drops all outbound WAN packets at the Linux kernel level. No external IP routing exists; internet DNS queries are sinkholed.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">AI Coding Tool Behavior:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        IDE extensions are reconfigured with <code>baseURL</code> pointed exclusively to an <strong>in-enclave vLLM / Triton cluster</strong> running open-weight models (Llama-3, DeepSeek-Coder) over private mTLS.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Data Protection Impact:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Data remains within the certified enclave boundary. No token, prompt buffer, or gradient can ever traverse beyond the private cluster subnets.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Inspection &amp; Auditability:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Pre-prompt PEP AST validator scrubs any residual direct PII before inference; all prompt requests and model completions are logged in immutable, cryptographically sealed audit ledgers.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-emerald-400 font-mono font-semibold">
                      <span>Status: Fully Compliant</span>
                      <span>Goldacre Review Rec 1 &amp; SATRE Standard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Packet Route Comparison Visual */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Packet Egress Trace Comparison</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-[11px] font-mono space-y-1">
                    <span className="text-red-400 font-bold block">[VULNERABLE] Laptop over NHS VPN (Split-Tunneling Active):</span>
                    <div className="text-slate-300 flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">IDE Editor / Terminal</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Local OS Network Stack</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-amber-800 text-amber-300">NHS VPN Adapter (Bypassed)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-200 border border-red-700 font-bold">Public Cloud LLM API (Data Exfiltrated)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] font-mono space-y-1">
                    <span className="text-emerald-400 font-bold block">[SECURE] Seawater Air-Gapped TRE Enclave Architecture:</span>
                    <div className="text-slate-300 flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Air-Gapped VDI Session</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-purple-800 text-purple-300">Pre-Prompt PEP Proxy (AST Scrubber)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-emerald-800 text-emerald-300">In-Enclave vLLM Cluster</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-700 font-bold">Local Ephemeral Memory (0% Egress)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guidance for Institutional Governance Boards */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Actionable Policy Directive for NHS Trusts &amp; Research Sponsors:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>Prohibit raw patient cohort extracts on developer laptops:</strong> Never download or decompress patient-level datasets onto local machines, regardless of active VPN status.
                  </li>
                  <li>
                    <strong>Enforce domain-level egress blocks at the corporate gateway:</strong> Configure trust DNS firewalls to deny developer IDE telemetry endpoints (<code>*.cursor.sh</code>, <code>api.githubcopilot.com</code>, <code>api.openai.com</code>) unless explicitly piped through an auditing data scrubbing proxy.
                  </li>
                  <li>
                    <strong>Mandate self-hosted in-enclave inference:</strong> If researchers require LLM coding assistance, provide in-enclave open-weight model endpoints inside the accredited TRE boundary as specified in this reference manual.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: INTERACTIVE PROMPT SANITIZER & PEP SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Interactive Policy Enforcement Point (PEP)</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Pre-Prompt PII Redactor & LLM Egress Interceptor
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              See what happens when a developer using an AI assistant (Copilot, Cline, Cursor) has confidential patient records
              or small cohort counts in their active editor buffer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Input Code Editor */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <span>Developer Editor Buffer (Active Workspace)</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setInputCode(`# Clean mock script
import pandas as pd
df = pd.DataFrame({'cohort_id': [1, 2], 'sample_rate': [0.1, 0.2]})
def process(data): return data.mean()`)
                    }
                    className="text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    Load Clean Sample
                  </button>
                </div>
              </div>

              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                rows={14}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Enforcement Mode:</span>
                  <select
                    value={sanitizerMode}
                    onChange={(e) => setSanitizerMode(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="scrub">AST Scrubbing & Token Masking</option>
                    <option value="block">Zero-Trust Hard Block (Deny Egress)</option>
                  </select>
                </div>

                <button
                  onClick={handleRunSimulation}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Intercept & Evaluate Prompt</span>
                </button>
              </div>
            </div>

            {/* Right: PEP Inspection Verdict */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Enclave PEP Interceptor & Local LLM Dispatch</span>
                </span>
                {simulationResult && (
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      simulationResult.status === 'CLEAN'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : simulationResult.status === 'BLOCKED'
                        ? 'bg-red-950 text-red-400 border-red-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {simulationResult.status}
                  </span>
                )}
              </div>

              {simulationResult ? (
                <div className="space-y-4">
                  {/* Status Box */}
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      simulationResult.status === 'CLEAN'
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : simulationResult.status === 'BLOCKED'
                        ? 'bg-red-950/20 border-red-500/40 text-red-200'
                        : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    {simulationResult.status === 'CLEAN' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : simulationResult.status === 'BLOCKED' ? (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-sm">
                        {simulationResult.status === 'CLEAN'
                          ? 'Prompt Cleared: No Person-Level Data'
                          : simulationResult.status === 'BLOCKED'
                          ? 'Prompt Rejected: Person-Level Data Intercepted'
                          : 'Prompt Sanitized: PII Replaced with Synthetic Tokens'}
                      </div>
                      <p className="text-slate-300">
                        {simulationResult.status === 'CLEAN'
                          ? 'Prompt context contains zero patient identifiers and conforms to Statistical Disclosure Control rules.'
                          : simulationResult.status === 'BLOCKED'
                          ? 'Direct patient identifiers were detected in the prompt context. Egress blocked before reaching external model API.'
                          : 'Direct identifiers and small cohort cells were safely substituted with non-identifiable synthetic mock tokens.'}
                      </p>
                    </div>
                  </div>

                  {/* Violations List */}
                  {simulationResult.violations.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                        Detected Enclave Violations ({simulationResult.violations.length}):
                      </span>
                      <ul className="space-y-1 text-red-300 font-mono text-[11px] bg-slate-950 p-3 rounded-xl border border-red-900/40">
                        {simulationResult.violations.map((v, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-red-400">&bull;</span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sanitized Payload Preview */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] block">
                      Actual Transmitted Payload (To In-Enclave LLM):
                    </span>
                    <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-56 shadow-inner">
                      <code>{simulationResult.sanitizedCode}</code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400 space-y-3 bg-slate-950/40 rounded-xl border border-slate-800">
                  <Terminal className="w-8 h-8 mx-auto text-slate-600" />
                  <h4 className="text-sm font-semibold text-slate-200">Test Your Prompt</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Click &ldquo;Intercept &amp; Evaluate Prompt&rdquo; to test how the enclave Policy Enforcement Point (PEP)
                    protects NHS patient data from leaking to LLM coding assistants.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5 CORE ENCLAVE SAFEGUARDS */}
      {activeTab === 'safeguards' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Architectural Blueprint</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              5 Architectural Safeguards for AI Coding Tools in Enclaves
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Concrete architectural patterns ensuring researchers and developers can benefit from AI code completion
              without violating Caldicott principles or UK GDPR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800 font-bold font-mono">
                1
              </div>
              <h3 className="font-bold text-white text-base">In-Enclave Air-Gapped LLM Inference</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than connecting developer IDEs to public cloud endpoints (e.g. OpenAI, GitHub Copilot multi-tenant cloud),
                the enclave hosts an open-weights coding model (e.g. <strong>Qwen-2.5-Coder 32B, DeepSeek-Coder-V2, or Llama-3-Code</strong>)
                on dedicated internal GPU nodes via <strong>vLLM or Ollama</strong>.
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                zero-egress: true | All prompt tokens remain inside the VPC perimeter.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-800 font-bold font-mono">
                2
              </div>
              <h3 className="font-bold text-white text-base">Content Exclusion Policies (.clineignore, .copilotignore)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developer tools honor client exclusion files (<strong>.clineignore, .copilotignore, .cursorignore</strong>) to omit data folders
                (<code className="text-purple-300">/data/**, *.csv, *.parquet</code>) from IDE indexing buffers during interactive coding.
              </p>
              <div className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/50 leading-relaxed">
                <strong>Enclave Security Standard:</strong> Client-side ignore files are an advisory developer heuristic, not an isolation guarantee. In accredited enclaves, they must be backed by non-bypassable host controls: read-only POSIX directory mounts (<code className="text-amber-200">chmod 400</code>) and network-level air-gapping.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800 font-bold font-mono">
                3
              </div>
              <h3 className="font-bold text-white text-base">Pre-Prompt AST & Regex Redaction Proxy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An outbound LSP or local reverse proxy intercepts all requests dispatched to the LLM. It parses the
                Abstract Syntax Tree (AST), identifying string literals that resemble <strong>NHS numbers, dates of birth, full postcodes,
                or patient names</strong>, replacing them with synthetic aliases before transmission.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                Automated DLP: Prevents developer copy-paste accidents into chat panels.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950 flex items-center justify-center text-amber-400 border border-amber-800 font-bold font-mono">
                4
              </div>
              <h3 className="font-bold text-white text-base">Model Context Protocol (MCP) Sandboxing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                For agentic assistants like <strong>Cline, Cursor Agent, or Codex</strong> that execute terminal tools,
                MCP boundaries (<code className="text-amber-300">ontology/agent_mcp.ttl</code>) restrict filesystem operations
                strictly to <code className="text-amber-300">/workspace/src</code>, barring directory traversal to raw data vaults.
              </p>
              <div className="text-[11px] font-mono text-amber-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                mcp:allowedStatements: SELECT, EXPLAIN only | No curl/wget egress.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 md:col-span-2">
              <div className="w-9 h-9 rounded-xl bg-pink-950 flex items-center justify-center text-pink-400 border border-pink-800 font-bold font-mono">
                5
              </div>
              <h3 className="font-bold text-white text-base">Zero Data Retention (ZDR) & Enterprise Private Endpoints</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If sovereign cloud APIs (such as Azure OpenAI or AWS Bedrock) must be accessed, connections are routed strictly over
                <strong> VPC Private Service Connect (Private Endpoints)</strong> without traversing the public internet.
                The agreement must legally enforce <strong>Zero Data Retention (ZDR)</strong> (prompts are never cached on disk)
                and be backed by a <strong>Business Associate Agreement (BAA) / NHS Data Processing Addendum</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SAFE DIGITAL DATA ENCLAVES TAXONOMY */}
      {activeTab === 'taxonomy' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Domain Terminology</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Safe Digital Data Enclaves: Architectural Taxonomy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Understanding the broader landscape of secure processing environments beyond healthcare TREs and SDEs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 bg-slate-950/70">
                  <th className="py-3 px-4 font-bold">Enclave Term</th>
                  <th className="py-3 px-4 font-bold">Acronym</th>
                  <th className="py-3 px-4 font-bold">Primary Domain</th>
                  <th className="py-3 px-4 font-bold">Core Defining Characteristic</th>
                  <th className="py-3 px-4 font-bold">Enforcement Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Trusted Research Environment</td>
                  <td className="py-3 px-4 font-mono text-cyan-400">TRE</td>
                  <td className="py-3 px-4">NHS & Clinical Research</td>
                  <td className="py-3 px-4">Five Safes, SATRE pillars, zero-egress VPC, automated SDC airlocks.</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Policy-as-Code & Network</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Secure Data Environment</td>
                  <td className="py-3 px-4 font-mono text-cyan-400">SDE</td>
                  <td className="py-3 px-4">NHS England Data Space</td>
                  <td className="py-3 px-4">Regional health data platforms, standardized national data access agreements.</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Statutory & Access Tiering</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Virtual Data Enclave</td>
                  <td className="py-3 px-4 font-mono text-purple-400">VDE</td>
                  <td className="py-3 px-4">Census, Social Sciences, Economics</td>
                  <td className="py-3 px-4">Remote virtual desktops preventing export of raw census or survey microdata.</td>
                  <td className="py-3 px-4 text-cyan-400 font-semibold">Virtual Machine Isolation</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Data Clean Room</td>
                  <td className="py-3 px-4 font-mono text-amber-400">DCR</td>
                  <td className="py-3 px-4">Commercial, Marketing & Health Partnerships</td>
                  <td className="py-3 px-4">Multi-party computation where parties query combined data without viewing raw rows.</td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">Cryptographic & Query-Level</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Data Safe Haven</td>
                  <td className="py-3 px-4 font-mono text-sky-400">DSH</td>
                  <td className="py-3 px-4">NHS Scotland & Regional Trusts</td>
                  <td className="py-3 px-4">Accredited regional repositories operating under the SHIP governance charter.</td>
                  <td className="py-3 px-4 text-cyan-400 font-semibold">Five Safes & Institutional</td>
                </tr>
                <tr className="hover:bg-slate-950/40">
                  <td className="py-3 px-4 font-bold text-white">Confidential Computing / TEE</td>
                  <td className="py-3 px-4 font-mono text-pink-400">TEE</td>
                  <td className="py-3 px-4">Cloud Infrastructure & Silicon Security</td>
                  <td className="py-3 px-4">Hardware memory encryption protecting data in use from hypervisors and root admins.</td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">Silicon CPU Register Encryption</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: IDE & IGNORE CONFIG GENERATOR */}
      {activeTab === 'config-generator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <FileCode2 className="w-4 h-4" />
              <span>Developer Workspace Configuration</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Ready-to-Use IDE & Agent Lockdown Configurations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Copy and deploy these configuration files into your enclave coding workspace to lock down
              Cline, GitHub Copilot, Cursor, and local vLLM instances.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {[
                  { id: 'cline', label: '.clineignore (Cline Agent)' },
                  { id: 'copilot', label: '.copilotignore (GitHub Copilot)' },
                  { id: 'cursor', label: '.cursorignore (Cursor IDE)' },
                  { id: 'vllm', label: 'Local vLLM Private Endpoint (.env)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveToolConfig(item.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeToolConfig === item.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const snippets: Record<string, string> = {
                    cline: `# .clineignore: Advisory Developer Exclusion Filter
# NOTE: Client-side ignore files are an advisory filter, NOT an enclave isolation guarantee.
# Enclaves must enforce POSIX read-only mounts (chmod 400) and zero-egress VPC rules on host containers.
/data/**
/raw_clinical/**
*.csv
*.parquet
*.feather
*.jsonl
*.ttl
*.sql
.env*
/tests/fixtures/**`,
                    copilot: `# .copilotignore: Prevent GitHub Copilot Context Ingestion (Advisory)
# Pairs with host read-only storage permissions to protect clinical microdata
/data/**
/patients/**
*.csv
*.tsv
*.parquet
*.sqlite
/audit/**`,
                    cursor: `# .cursorignore: Cursor AI Agent Context Filter (Advisory)
# Excludes data fixtures; must be backed by host namespace isolation
/data/**
/clinical_records/**
*.parquet
*.feather
*.pkl`,
                    vllm: `# Environment config pointing IDE to In-Enclave Local Inference Cluster
OPENAI_BASE_URL="http://vllm-service.enclave.internal:8000/v1"
OPENAI_API_KEY="enclave-airgap-internal-token"
MODEL_NAME="Qwen/Qwen2.5-Coder-32B-Instruct"`
                  };
                  handleCopyConfig(snippets[activeToolConfig]);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                {copiedConfig ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
              {activeToolConfig === 'cline' && (
                <code>{`# .clineignore: Advisory Developer Exclusion Filter
# NOTE: Client-side ignore files are an advisory filter, NOT an enclave isolation guarantee.
# Enclaves must enforce POSIX read-only mounts (chmod 400) and zero-egress VPC rules on host containers.
/data/**
/raw_clinical/**
*.csv
*.parquet
*.feather
*.jsonl
*.ttl
*.sql
.env*
/tests/fixtures/**`}</code>
              )}
              {activeToolConfig === 'copilot' && (
                <code>{`# .copilotignore: Prevent GitHub Copilot Context Ingestion
# Enforces Safe Data dimension in editor tabs
/data/**
/patients/**
*.csv
*.tsv
*.parquet
*.sqlite
/audit/**`}</code>
              )}
              {activeToolConfig === 'cursor' && (
                <code>{`# .cursorignore: Cursor AI Agent Context Lockdown
# Restricts indexing to source application code only
/data/**
/clinical_records/**
*.parquet
*.feather
*.pkl`}</code>
              )}
              {activeToolConfig === 'vllm' && (
                <code>{`# Local Enclave Air-Gapped Inference (.env)
# Connects Cline, Cursor, or Continue.dev to In-Enclave GPU node (Zero Egress)
OPENAI_BASE_URL="http://vllm-service.enclave.internal:8000/v1"
OPENAI_API_KEY="enclave-airgap-internal-token"
MODEL_NAME="Qwen/Qwen2.5-Coder-32B-Instruct"`}</code>
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
