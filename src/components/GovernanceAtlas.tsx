import React, { useState } from 'react';
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
  Activity
} from 'lucide-react';

interface GovernanceAtlasProps {
  onNavigateToGlossary: () => void;
  onNavigateToSection: (sectionId: string) => void;
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

export const GovernanceAtlas: React.FC<GovernanceAtlasProps> = ({
  onNavigateToGlossary,
  onNavigateToSection
}) => {
  const [selectedStep, setSelectedStep] = useState<PublicJourneyStep>(PUBLIC_STEPS[0]);
  const [showFullCharter, setShowFullCharter] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const COMPREHENSIVE_CHARTER_MD = `# TRUSTED RESEARCH ENVIRONMENT (TRE) CLINICAL DATA GOVERNANCE CHARTER
*Standard Operating Protocol & Statutory Compliance Specification*
*Document Reference: TRE-PAC-GOV-2026-V4 | Approved by Trust Board & Caldicott Guardian*

---

## 1. Statutory Mandate & Legal Framework
This Trusted Research Environment (TRE) operates in strict accordance with UK health data legislation:
- **UK General Data Protection Regulation (UK GDPR)**:
  - Article 6(1)(e): Processing is necessary for the performance of a task carried out in the public interest.
  - Article 9(2)(j): Processing of special category health data is necessary for archiving and scientific research purposes in the public interest.
- **Data Protection Act 2018 (DPA 2018)**: Part 2 and Section 19 safeguards for scientific research.
- **National Health Service Act 2006 (Section 251)**: Statutory exemption granted on advice of the Confidentiality Advisory Group (CAG) permitting processing of patient data without consent for essential medical research.
- **Health and Social Care Act 2012**: Mandatory statutory directions on secure health data custody.
- **Common Law Duty of Confidentiality (CLDC)**: Enforced via the Eight Caldicott Principles.

---

## 2. Institutional Roles & Oversight Structure
- **Caldicott Guardian**: Responsible for championing confidentiality and reviewing all Tier 3 data access requests.
- **Senior Information Risk Owner (SIRO)**: Board-level accountability for technical and cyber risks across the cloud enclave.
- **Data Protection Officer (DPO)**: Conducts Data Protection Impact Assessments (DPIA) and audits compliance with UK GDPR.
- **Research Ethics Committee (REC)**: Independent health ethics body reviewing all research questions for demonstrable public benefit.
- **System-Level Security Custodian**: Technical lead maintaining zero-egress VPC controls and Open Policy Agent rule compilation.

---

## 3. The Five Safes Operational Standard
Every project instantiated within the TRE must mathematically satisfy the Five Safes framework:
1. **Safe People**:
   - Mandatory institutional accreditation with verified university or NHS employment.
   - Active, annual NHS Information Governance (IG) training certification.
   - Signed binding Data User Agreements with legal penalties for misuse.
2. **Safe Projects**:
   - Active approval letter from an accredited NHS Research Ethics Committee (REC).
   - Valid Section 251 CAG exemption or explicit patient consent.
   - Documented research protocol demonstrating public health benefit.
3. **Safe Settings**:
   - Isolated Virtual Private Cloud (VPC) with zero external internet routing.
   - Inbound access restricted to multi-factor authenticated (MFA) virtual desktops and notebooks.
   - Prohibition of local disk copying, clipboard exfiltration, or unauthorized external API connections.
4. **Safe Data**:
   - Permanent redaction of direct identifiers (NHS number, patient names, full postcodes, full DOBs).
   - Partitioning into hospital operational tiers (Tier 1 Aggregate, Tier 2 Pseudonymised, Tier 3 Section 251 Sensitive).
   - Minimization: researchers receive only approved study columns and demographic slices.
5. **Safe Outputs**:
   - Compulsory digital airlock review on all summary tables, regression outputs, and machine learning models.
   - Enforced Statistical Disclosure Control (SDC) thresholds prior to release.

---

## 4. Quantitative Statistical Disclosure Control (SDC) Protocol
All analytical outputs submitted to the airlock must conform to national standards (ONS and SAIL Databank):
- **Primary Cell Suppression ($k \\ge 10$)**:
  - Any frequency count or cell in a summary table representing fewer than 10 individuals ($k < 10$) must be suppressed or grouped.
- **Dominance Rule ($(1, 80\\%)$ or $n,k$ rule)**:
  - If a single patient or clinic accounts for more than 80% of an aggregated metric (e.g. expenditure or bed days), the cell must be masked to prevent attribute disclosure.
- **Secondary (Residual) Suppression**:
  - Additional non-sensitive cells must be suppressed to ensure that suppressed cells cannot be deduced by subtracting remaining cells from row or column totals.
- **Tabular Aggregation Limits**:
  - Maxima, minima, and percentiles (p0, p100) are prohibited; interquartile ranges and median figures must be used.

---

## 5. Artificial Intelligence & Autonomous Analytics Agent Policy
When autonomous LLMs or code assistants operate within the TRE:
- Workloads are classified under the **EU AI Act** (Limited Risk for code synthesis; High Risk for diagnostic inference).
- Agent execution is strictly governed by **Model Context Protocol (MCP)** tool boundaries:
  - \`mcp:ExecuteSQL\`: Barred from executing DDL/DML (DROP, ALTER, UPDATE, INSERT); limited to read-only \`SELECT\` with row caps (max 500 rows).
  - \`mcp:ExportSummary\`: Forced through automated SDC shape verification prior to human airlock review.
  - Zero external network egress: LLMs cannot communicate with external model servers or leak data outside the enclave.

---

## 6. Automated Policy-as-Code Technical Architecture
Governance is not maintained on paper; it is compiled into deterministic runtime enforcement code:
1. **Semantic Ontology (\`ontology/*.ttl\`)**: Encodes Five Safes, hospital tiers, and Caldicott principles in OWL 2 RDF.
2. **Closed-World Validation (\`ontology/shapes/*.ttl\`)**: Transforms the Open-World Assumption into deterministic Closed-World SHACL shapes.
3. **Automated Compiler (\`compiler/rdf_to_rego.py\`)**: Compiles semantic shapes into Open Policy Agent (OPA) Rego rules.
4. **Policy Enforcement Points (PEP)**: Kubernetes admission controllers intercept compute pod provisioning in microseconds.
5. **Cryptographic Provenance**: Every admission and airlock decision emits a W3C PROV-O RDF triple to an append-only audit ledger.

---

## 7. Public Transparency, Patient Opt-Out, and FOI Procedures
- **National Data Opt-Out**: Respected in full. Patients who have opted out of secondary research have their records excluded prior to enclave ingestion.
- **Freedom of Information (FOI)**: Under the FOI Act 2000, this Governance Charter and all compiled policy hashes are published openly.
- **Audit Lineage Review**: Trust boards and external auditors receive automated monthly provenance digests generated via \`compiler/generate_docs.py\`.

*Published by the Clinical Information Governance Board.*`;

  const handleDownloadCharter = () => {
    const blob = new Blob([COMPREHENSIVE_CHARTER_MD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TRE_CLINICAL_GOVERNANCE_CHARTER_2026.md';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner - Welcoming & Public Centric */}
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
            A plain-English guide to the safety principles, clinical laws, and computer safeguards
            that enable vital medical discoveries while keeping your confidential health records strictly anonymous.
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

      {/* Simplified Public Journey Map */}
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

        {/* 5-Step Progress Pathway */}
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

      {/* The 8 Caldicott Principles in Action */}
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
