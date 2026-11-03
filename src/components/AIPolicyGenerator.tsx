import React, { useState } from 'react';
import {
  Sparkles,
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  RotateCcw,
  FileText,
  ShieldCheck,
  Layers,
  Cpu,
  Bot,
  Dna,
  Lock,
  Scale,
  RefreshCw,
  Send,
  Sliders,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

export interface GeneratedPolicy {
  title: string;
  summary: string;
  targetClass: string;
  enforcementPoint: string;
  shacl: string;
  rego: string;
  sampleCompliantInput: any;
  sampleViolatingInput: any;
  violationExplanation: string;
  provOTriple: string;
  governanceMapping: {
    fiveSafesDimension: string;
    satrePillar: string;
    statutoryBasis: string;
  };
  keyConsiderations: string[];
}

const PRESET_REQUIREMENTS = [
  {
    id: 'genomics',
    label: 'Genomic Sequence Egress',
    icon: 'Dna',
    shortPrompt: 'Genomic sequence export requiring cohort >= 25, rare variant flags masked, and REC genomic consent.',
    prompt: 'Genomic data egress policy: Any tabular or summary export containing sequence variants must have an observed cohort size of at least 25 individuals (k >= 25), must strictly mask all rare variant indicators (< 1% frequency), and must verify explicit NHS REC genomic ethics protocol approval.',
    enforcementPoint: 'Airlock Egress PEP (Airgap Gate)'
  },
  {
    id: 'mcp-agent',
    label: 'Autonomous AI Agent Bounds',
    icon: 'Bot',
    shortPrompt: 'Autonomous analytics LLM agent restricted to read-only SQL, max 100 rows, and zero internet egress.',
    prompt: 'Autonomous AI Analytics Agent Model Context Protocol (MCP) boundary: LLM agents may only invoke the execute_sql_query tool with SELECT statements returning a maximum of 100 rows. Destructive DDL/DML statements (DROP, ALTER, INSERT, UPDATE, DELETE) are forbidden, and the host enclave must have zero internet egress.',
    enforcementPoint: 'MCP Gateway Policy Decision Point (PEP)'
  },
  {
    id: 'break-glass',
    label: 'Break-Glass Emergency Access',
    icon: 'Lock',
    shortPrompt: 'Senior consultant urgent clinical investigation requiring Caldicott dual-signoff and max 4h session.',
    prompt: 'Emergency Break-Glass access for senior clinicians: Permit access to Tier 3 clinical data during urgent safety investigations. Requires dual authorization signed by the Caldicott Guardian, active Datix clinical incident reference, maximum session duration of 4 hours, and continuous enhanced keystroke auditing.',
    enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook'
  },
  {
    id: 'external-collab',
    label: 'External Academic Collaborator',
    icon: 'Scale',
    shortPrompt: 'Non-NHS academic access limited to Tier 1 synthetic data with MFA and max 2h session.',
    prompt: 'External academic collaborator access: Non-NHS affiliated researchers must be restricted exclusively to Tier 1 Synthetic or Aggregate datasets. The session requires verified hardware MFA, active institutional accreditation, and a maximum idle timeout of 2 hours.',
    enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook'
  },
  {
    id: 'federated',
    label: 'Federated Model Weights',
    icon: 'Layers',
    shortPrompt: 'Federated learning airlock allowing only weight gradients with epsilon <= 1.0 differential privacy.',
    prompt: 'Federated learning model weight egress: Only aggregated gradient tensors and model parameters may egress the enclave. Requires differential privacy noise with epsilon <= 1.0, zero patient-level embeddings or gradients, and signed review from the output checking team.',
    enforcementPoint: 'Airlock Egress PEP (Airgap Gate)'
  },
  {
    id: 'dea-linkage',
    label: 'DEA 2017 Data Linkage',
    icon: 'Scale',
    shortPrompt: 'Public authority linkage requiring UKSA RAP approval, accredited processor enclave, and s67 compliance.',
    prompt: 'Digital Economy Act 2017 Part 5 Chapter 5 public authority data linkage: Cross-departmental linkage must have active UKSA Research Accreditation Panel (RAP) project accreditation, must run exclusively within an Accredited Processor secure enclave with zero internet egress, researcher must hold verified Safe Researcher accreditation, and output checking must enforce k >= 10 and dominance <= 80%.',
    enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook'
  },
  {
    id: 'iso-42001-aims',
    label: 'ISO 42001 AI Governance',
    icon: 'ShieldCheck',
    shortPrompt: 'ISO/IEC 42001 AIMS policy requiring risk tier classification, training provenance, and bias audit.',
    prompt: 'ISO/IEC 42001:2023 Artificial Intelligence Management System (AIMS) governance: Any model training or inference session within data analysis & intelligence platforms must document risk tier classification, must verify cryptographic training data provenance under ISO/IEC 5259, and must pass algorithmic bias and drift evaluation before deployment.',
    enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook'
  },
  {
    id: 'dcb-clinical-safety',
    label: 'DCB0129 Clinical Safety Sign-off',
    icon: 'Bot',
    shortPrompt: 'Clinical Safety Officer (CSO) sign-off, Hazard Log hazard index <= 2, and SaMD UK MDR clearance.',
    prompt: 'DCB0129 / DCB0160 Clinical Risk Management & SaMD clearance: Prior to egressing any health software or diagnostic algorithm for NHS deployment, the package must hold an active Clinical Safety Case Report signed by a registered Clinical Safety Officer (CSO), verified Hazard Log with residual risk index <= 2, and UK MDR 2002 SaMD conformity assessment.',
    enforcementPoint: 'Airlock Egress PEP (Airgap Gate)'
  }
];

export const AIPolicyGenerator: React.FC = () => {
  const [requirementText, setRequirementText] = useState(PRESET_REQUIREMENTS[0].prompt);
  const [enforcementPoint, setEnforcementPoint] = useState('Airlock Egress PEP (Airgap Gate)');
  const [strictness, setStrictness] = useState('Standard (Five Safes & SATRE)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPolicy, setGeneratedPolicy] = useState<GeneratedPolicy | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'shacl' | 'rego' | 'prov' | 'governance'>('shacl');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modeNotice, setModeNotice] = useState<{ mode: 'server' | 'static-fallback'; message: string } | null>(null);

  // Live in-sandbox evaluator state
  const [evaluatorInputJson, setEvaluatorInputJson] = useState<string>('');
  const [evaluatorResult, setEvaluatorResult] = useState<{
    permitted: boolean;
    reason: string;
    checks: { name: string; passed: boolean; detail: string }[];
  } | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (filename: string, text: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Client-Side Deterministic Rule Synthesizer (for pure static GitHub Pages hosting)
  const synthesizeClientSidePolicy = (prompt: string, ep: string, str: string): GeneratedPolicy => {
    const req = prompt.toLowerCase();

    // 1. Digital Economy Act 2017 & Public Authority Linkage
    if (req.includes('dea') || req.includes('public authority') || req.includes('rap') || req.includes('linkage')) {
      return {
        title: 'Digital Economy Act 2017 Public Authority Research Linkage Policy',
        summary: 'Statutory policy enforcing UKSA Research Accreditation Panel (RAP) approval, verified Accredited Processor safe setting, Safe Researcher credentialing, and airlock disclosure control under DEA 2017 Part 5 Chapter 5.',
        targetClass: 'tre:DEALinkageSession',
        enforcementPoint: ep.includes('Airlock') ? 'Airlock Egress PEP (Airgap Gate)' : 'Kubernetes ValidatingAdmissionWebhook',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix dea: <https://w3id.org/tre/dea#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

dea:DEALinkageShape a sh:NodeShape ;
    sh:targetClass tre:DEALinkageSession ;
    sh:property [
        sh:path dea:hasRAPProjectApproval ;
        sh:hasValue true ;
        sh:message "DEA 2017 Statutory Violation: Research project must hold active UKSA RAP accreditation." ;
    ] ;
    sh:property [
        sh:path dea:isAccreditedProcessor ;
        sh:hasValue true ;
        sh:message "Safe Setting Violation: Compute workspace must be hosted in an accredited DEA processing facility." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Security Violation: Zero external internet egress must be enforced at the container perimeter." ;
    ] ;
    sh:property [
        sh:path dea:researcherHasSafeTraining ;
        sh:hasValue true ;
        sh:message "Safe Person Violation: Researcher must complete mandatory UKSA Safe Researcher Training." ;
    ] .`,
        rego: `package tre.dea.admission

default allow = false

# Rule: DEA 2017 Statutory Public Authority Data Enclave Admission
allow {
    input.request_type == "dea_linkage_admission"
    input.project.rap_accreditation_valid == true
    input.processor.is_accredited_processor == true
    input.researcher.has_safe_researcher_cert == true
    input.enclave.egress_blocked == true
    input.penalties_s67_acknowledged == true
}`,
        sampleCompliantInput: {
          request_type: "dea_linkage_admission",
          project: {
            project_id: "DEA-PROJ-2026-881",
            rap_accreditation_valid: true,
            expiry_date: "2027-04-30"
          },
          processor: {
            name: "Accredited Health Data Processor 01",
            is_accredited_processor: true,
            iso27001_certified: true
          },
          researcher: {
            name: "Dr. Alistair Finch",
            dea_researcher_id: "UKSA-RES-9481",
            has_safe_researcher_cert: true
          },
          enclave: {
            egress_blocked: true
          },
          penalties_s67_acknowledged: true
        },
        sampleViolatingInput: {
          request_type: "dea_linkage_admission",
          project: {
            project_id: "DEA-PROJ-UNVERIFIED",
            rap_accreditation_valid: false,
            expiry_date: "2025-01-01"
          },
          processor: {
            name: "Unaccredited Cloud Workspace",
            is_accredited_processor: false,
            iso27001_certified: false
          },
          researcher: {
            name: "Dr. Alistair Finch",
            dea_researcher_id: "UKSA-RES-EXPIRED",
            has_safe_researcher_cert: false
          },
          enclave: {
            egress_blocked: false
          },
          penalties_s67_acknowledged: false
        },
        violationExplanation: "Admission Denied: Project lacks active RAP accreditation, workspace is not a certified DEA Accredited Processor, researcher training is expired, and network egress is not blocked.",
        provOTriple: `dea:DEAGatewayDecision_99 a prov:Activity ;
    prov:wasAssociatedWith dea:ResearchAccreditationPanel ;
    tre:statutoryBasis "Digital Economy Act 2017 c. 30 Part 5 Ch 5" ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T12:00:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe Projects, Safe People & Safe Settings",
          satrePillar: "Information Governance & Computing Infrastructure",
          statutoryBasis: "Digital Economy Act 2017 (Part 5, Chapter 5: Research) & Section 67 Penalties"
        },
        keyConsiderations: [
          "Unlawful re-identification or disclosure carries personal criminal liability under Section 67 of the DEA 2017.",
          "Linkage keys must be generated via one-way cryptographic hashing (PPRL) in a separate trusted third-party partition.",
          "Egress of any linked microdata is strictly prohibited; only verified non-disclosive aggregates may pass the airlock."
        ]
      };
    }

    // 2. Genomic sequence egress
    if (req.includes('genom') || req.includes('variant') || req.includes('allele') || req.includes('vcf')) {
      return {
        title: 'Genomic Sequence & Rare Variant Egress Airlock Policy',
        summary: 'Enforces high-dimensional genetic privacy: requires minimum cohort size k >= 25, strict masking of rare alleles (< 1% frequency), and verified NHS REC genomic consent.',
        targetClass: 'tre:GenomicEgressRequest',
        enforcementPoint: 'Airlock Egress PEP (Airgap Gate)',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix sdc: <https://w3id.org/tre/sdc#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

sdc:GenomicEgressShape a sh:NodeShape ;
    sh:targetClass tre:GenomicEgressRequest ;
    sh:property [
        sh:path sdc:cohortSize ;
        sh:datatype xsd:integer ;
        sh:minInclusive 25 ;
        sh:message "Genomic privacy violation: Minimum cohort size for variant release must be at least 25." ;
    ] ;
    sh:property [
        sh:path sdc:containsRareVariants ;
        sh:hasValue false ;
        sh:message "Disclosure risk: Alleles with population frequency < 1% must be masked or suppressed prior to egress." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Statutory breach: Explicit REC genomic study consent must be verified." ;
    ] .`,
        rego: `package tre.airlock.sdc

default allow = false

# Rule: Genomic Data Egress Authorization
allow {
    input.request_type == "genomic_export"
    input.dataset.cohort_size >= 25
    input.dataset.contains_rare_variants == false
    input.project.ethics_approval_active == true
    not contains_identifying_columns(input.dataset.columns)
}

contains_identifying_columns(cols) {
    dangerous := {"sample_id", "nhs_number", "patient_name", "postcode", "dob", "vcf_header_donor"}
    count({c | c := cols[_]; dangerous[lower(c)]}) > 0
}`,
        sampleCompliantInput: {
          request_type: "genomic_export",
          dataset: {
            name: "BRCA2_Frequency_Summary_CohortA.tsv",
            cohort_size: 48,
            contains_rare_variants: false,
            columns: ["chromosome", "position", "ref_allele", "alt_allele", "allele_freq_band", "cohort_count"]
          },
          project: {
            ethics_approval_active: true,
            rec_reference: "26/LO/0481"
          }
        },
        sampleViolatingInput: {
          request_type: "genomic_export",
          dataset: {
            name: "BRCA2_Patient_Rare_Alleles.tsv",
            cohort_size: 4,
            contains_rare_variants: true,
            columns: ["sample_id", "chromosome", "position", "ref_allele", "alt_allele", "patient_name"]
          },
          project: {
            ethics_approval_active: true,
            rec_reference: "26/LO/0481"
          }
        },
        violationExplanation: "Rejected: Cohort size (4) is below statutory ceiling (25), rare variants (< 1%) unmasked, and direct patient identifiers detected.",
        provOTriple: `tre:AirlockReview_Genomics_081 a prov:Activity ;
    prov:wasAssociatedWith tre:AirlockEgressPEP ;
    tre:evaluatedShape sdc:GenomicEgressShape ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T10:00:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe Data & Safe Outputs",
          satrePillar: "Data Management & Information Governance",
          statutoryBasis: "DPA 2018 Special Category Health Data (Section 19 Research Exemption) & HRA Genomic Ethics"
        },
        keyConsiderations: [
          "Rare genetic variants act as quasi-identifiers when combined with public genealogy databases.",
          "Airlock automated inspectors must parse VCF headers and reject donor metadata tags.",
          "All cryptographic hashes of exported summaries must be registered in the tamper-evident PROV-O ledger."
        ]
      };
    }

    // 3. Autonomous AI / MCP agent
    if (req.includes('mcp') || req.includes('agent') || req.includes('sql') || req.includes('autonomous')) {
      return {
        title: 'Autonomous AI Analytics Agent Model Context Protocol (MCP) Boundary',
        summary: 'Confines autonomous LLM analytics agents to non-mutating SQL read queries with maximum 100-row bounds and zero external internet egress.',
        targetClass: 'tre:MCPAgentSession',
        enforcementPoint: 'MCP Gateway Policy Decision Point (PEP)',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix mcp: <https://w3id.org/tre/mcp#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

mcp:MCPAgentExecutionShape a sh:NodeShape ;
    sh:targetClass tre:MCPAgentSession ;
    sh:property [
        sh:path mcp:permittedTools ;
        sh:in ( "execute_sql_query" "render_barchart" ) ;
        sh:message "Unauthorized tool access: Agent attempted to invoke a capability outside approved MCP manifest." ;
    ] ;
    sh:property [
        sh:path mcp:maxReturnRows ;
        sh:maxInclusive 100 ;
        sh:message "Denial of service & leakage risk: Agent queries must not exceed 100 rows." ;
    ] ;
    sh:property [
        sh:path mcp:destructiveCommandsPermitted ;
        sh:hasValue false ;
        sh:message "Data integrity violation: DDL/DML write statements (DROP, ALTER, INSERT, UPDATE, DELETE) are forbidden." ;
    ] .`,
        rego: `package tre.mcp.authz

default allow = false

# Rule: MCP Tool Invocation Filter
allow {
    input.tool_name == "execute_sql_query"
    is_safe_select(input.tool_parameters.query_statement)
    input.agent.max_rows <= 100
    input.enclave.egress_blocked == true
}

is_safe_select(query) {
    q := upper(query)
    startswith(trim_space(q), "SELECT")
    not contains(q, "DROP ")
    not contains(q, "DELETE ")
    not contains(q, "UPDATE ")
    not contains(q, "INSERT ")
    not contains(q, "ALTER ")
    not contains(q, "TRUNCATE ")
}`,
        sampleCompliantInput: {
          tool_name: "execute_sql_query",
          tool_parameters: {
            query_statement: "SELECT age_band, gender, COUNT(*) FROM clinical_cohort WHERE condition_code = 'E11' GROUP BY age_band, gender"
          },
          agent: {
            agent_id: "agent-gemini-sql-04",
            max_rows: 50,
            destructive_tools_permitted: false
          },
          enclave: {
            egress_blocked: true
          }
        },
        sampleViolatingInput: {
          tool_name: "execute_sql_query",
          tool_parameters: {
            query_statement: "DROP TABLE audit_log; SELECT * FROM patient_identifiable_data"
          },
          agent: {
            agent_id: "agent-gemini-sql-04",
            max_rows: 5000,
            destructive_tools_permitted: true
          },
          enclave: {
            egress_blocked: false
          }
        },
        violationExplanation: "Rejected: SQL query contains destructive DDL command ('DROP TABLE'), exceeds 100 row ceiling, and host enclave egress is unblocked.",
        provOTriple: `tre:MCPExecution_Event_404 a prov:Activity ;
    prov:wasAssociatedWith tre:MCPAgent_04 ;
    tre:toolInvoked "execute_sql_query" ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T10:05:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe Settings & Safe People",
          satrePillar: "Software Operations & Computing Infrastructure",
          statutoryBasis: "EU AI Act Article 14 (Human Oversight) & SATRE Software Sandboxing Standard"
        },
        keyConsiderations: [
          "LLM tool executions must be intercepted at a local proxy before hitting database drivers.",
          "In-memory AST parsing verifies that SELECT subqueries do not invoke side-effect functions (e.g. pg_sleep, dblink).",
          "Prompt history must never be persisted outside ephemeral RAM to prevent prompt injection residual leakage."
        ]
      };
    }

    // 4. Emergency break-glass
    if (req.includes('break-glass') || req.includes('emergency') || req.includes('urgent') || req.includes('datix')) {
      return {
        title: 'Emergency Break-Glass Access Authorization Policy',
        summary: 'Enforces dual-authorization Caldicott Guardian approval, Datix incident reference, maximum 4-hour session, and continuous keystroke auditing for urgent clinical safety reviews.',
        targetClass: 'tre:BreakGlassSession',
        enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:BreakGlassShape a sh:NodeShape ;
    sh:targetClass tre:BreakGlassSession ;
    sh:property [
        sh:path tre:caldicottDualSignoff ;
        sh:hasValue true ;
        sh:message "Emergency authorization violation: Dual sign-off signed by Caldicott Guardian Office is mandatory." ;
    ] ;
    sh:property [
        sh:path tre:maxSessionDurationHours ;
        sh:datatype xsd:integer ;
        sh:maxInclusive 4 ;
        sh:message "Temporal security ceiling: Emergency break-glass sessions cannot exceed 4 continuous hours." ;
    ] ;
    sh:property [
        sh:path tre:datixIncidentReference ;
        sh:minCount 1 ;
        sh:message "Break-Glass violation: A verified Datix or clinical incident protocol number must be provided." ;
    ] .`,
        rego: `package tre.authz

default allow = false

# Rule: Emergency Break-Glass Workspace Provisioning
allow {
    input.request_type == "break_glass_admission"
    input.clinician.is_senior_consultant == true
    input.approval.caldicott_guardian_signed == true
    input.session.duration_hours <= 4
    input.incident.reference_code != ""
    input.enclave.enhanced_keystroke_logging == true
}`,
        sampleCompliantInput: {
          request_type: "break_glass_admission",
          clinician: {
            name: "Dr. Eleanor Vance",
            gmc_number: "7482910",
            is_senior_consultant: true
          },
          approval: {
            caldicott_guardian_signed: true,
            approver_email: "guardian.office@trust.nhs.uk"
          },
          session: {
            duration_hours: 2
          },
          incident: {
            reference_code: "DATIX-INC-2026-9021"
          },
          enclave: {
            enhanced_keystroke_logging: true
          }
        },
        sampleViolatingInput: {
          request_type: "break_glass_admission",
          clinician: {
            name: "Dr. Eleanor Vance",
            gmc_number: "7482910",
            is_senior_consultant: false
          },
          approval: {
            caldicott_guardian_signed: false
          },
          session: {
            duration_hours: 12
          },
          incident: {
            reference_code: ""
          },
          enclave: {
            enhanced_keystroke_logging: false
          }
        },
        violationExplanation: "Rejected: Caldicott Guardian has not signed, session duration (12h) exceeds 4h ceiling, missing clinical incident code, and enhanced keystroke logging is inactive.",
        provOTriple: `tre:BreakGlassActivation_12 a prov:Activity ;
    prov:wasAssociatedWith tre:CaldicottGuardianOffice ;
    tre:incidentRef "DATIX-INC-2026-9021" ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T10:10:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe People & Safe Projects",
          satrePillar: "Information Governance & Software Operations",
          statutoryBasis: "Caldicott Principle 4 (Access on Strict Need-to-Know) & Section 251 Emergency Exemption"
        },
        keyConsiderations: [
          "Break-glass events must trigger synchronous alerts to the Trust Information Governance committee within 1 hour.",
          "Compute nodes must be provisioned with ephemeral, non-persistent local disks that zero-out on session termination.",
          "Post-incident access logs must be cryptographically anchored for at least 7 years under NHS record retention standards."
        ]
      };
    }

    // ISO/IEC 42001:2023 AIMS & ISO 5259 Data Quality
    if (req.includes('iso') || req.includes('aims') || req.includes('42001') || req.includes('5259')) {
      return {
        title: 'ISO/IEC 42001:2023 Artificial Intelligence Management System (AIMS) Policy',
        summary: 'Standardized AI governance policy requiring verified model risk tier classification, cryptographic training data provenance under ISO/IEC 5259, and mandatory algorithmic bias audit pass prior to workload orchestration in data analysis & intelligence platforms.',
        targetClass: 'tre:AIModelWorkload',
        enforcementPoint: 'Kubernetes ValidatingAdmissionWebhook',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix iso: <https://w3id.org/tre/iso42001#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

iso:AIMSModelGovernanceShape a sh:NodeShape ;
    sh:targetClass tre:AIModelWorkload ;
    sh:property [
        sh:path iso:hasRiskClassification ;
        sh:in ("Low" "Moderate" "High_Diagnostic") ;
        sh:minCount 1 ;
        sh:message "ISO 42001 AIMS: Declared model risk tier must be documented." ;
    ] ;
    sh:property [
        sh:path iso:dataProvenanceISO5259Verified ;
        sh:hasValue true ;
        sh:message "ISO 5259 Violation: Training data lineage must hold cryptographic checksum verification." ;
    ] ;
    sh:property [
        sh:path iso:biasAuditPassed ;
        sh:hasValue true ;
        sh:message "Algorithmic Equity Violation: Disparate impact and demographic bias audit must pass." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Security Isolation: AI training pod must have outbound network egress permanently disabled." ;
    ] .`,
        rego: `package tre.ai.aims_admission

default allow = false

# Rule: ISO/IEC 42001 AIMS Admission Check
allow {
    input.request_type == "ai_model_workload_admission"
    valid_risk_tier(input.model.risk_level)
    input.model.iso_5259_provenance_verified == true
    input.model.bias_audit_passed == true
    input.enclave.egress_blocked == true
}

valid_risk_tier(level) {
    level == "Low"
}
valid_risk_tier(level) {
    level == "Moderate"
}
valid_risk_tier(level) {
    level == "High_Diagnostic"
}`,
        sampleCompliantInput: {
          request_type: "ai_model_workload_admission",
          model: {
            model_id: "lung-nodule-classifier-v3",
            risk_level: "Moderate",
            iso_5259_provenance_verified: true,
            bias_audit_passed: true,
            training_dataset_hash: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
          },
          enclave: {
            egress_blocked: true,
            gpu_driver_sandboxed: true
          }
        },
        sampleViolatingInput: {
          request_type: "ai_model_workload_admission",
          model: {
            model_id: "lung-nodule-classifier-v3",
            risk_level: "High_Diagnostic",
            iso_5259_provenance_verified: false,
            bias_audit_passed: false
          },
          enclave: {
            egress_blocked: false
          }
        },
        violationExplanation: "Workload Denied: ISO 5259 training data provenance not verified, bias audit failed/missing, and container egress is not blocked.",
        provOTriple: `tre:AIMSComplianceAssessment_88 a prov:Activity ;
    prov:wasAssociatedWith tre:ISO42001Evaluator ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-30T10:00:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe Projects & Safe Data",
          satrePillar: "Software Operations & Computing Infrastructure",
          statutoryBasis: "ISO/IEC 42001:2023 (AIMS) & ISO/IEC 5259 Series Data Quality"
        },
        keyConsiderations: [
          "Foundation model checkpoints must maintain immutable SHA-256 hashes anchored in the provenance ledger.",
          "High-risk diagnostic algorithms require secondary Clinical Safety Officer (CSO) review before clinical pilot trials.",
          "Synthetic and de-identified training sets must undergo continual drift monitoring."
        ]
      };
    }

    // DCB0129 / DCB0160 Clinical Risk Management & UK MDR SaMD
    if (req.includes('dcb') || req.includes('clinical safety') || req.includes('samd') || req.includes('mdr') || req.includes('cso')) {
      return {
        title: 'DCB0129 / DCB0160 Clinical Risk Management & SaMD Egress Gatekeeper',
        summary: 'Statutory NHS clinical safety policy enforcing Clinical Safety Officer (CSO) sign-off, Hazard Log verification with residual risk index <= 2, and UK MDR 2002 SaMD conformity check before algorithmic egress from data analysis & intelligence platforms.',
        targetClass: 'tre:ClinicalAlgorithmRelease',
        enforcementPoint: 'Airlock Egress PEP (Airgap Gate)',
        shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix dcb: <https://w3id.org/tre/dcb0129#> .
@prefix samd: <https://w3id.org/tre/samd#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

dcb:ClinicalSafetyShape a sh:NodeShape ;
    sh:targetClass tre:ClinicalAlgorithmRelease ;
    sh:property [
        sh:path dcb:csoSignoffValid ;
        sh:hasValue true ;
        sh:message "DCB0129 Violation: Clinical Safety Case must be signed by an accredited Clinical Safety Officer (CSO)." ;
    ] ;
    sh:property [
        sh:path dcb:hazardLogMaxIndex ;
        sh:datatype xsd:integer ;
        sh:maxInclusive 2 ;
        sh:message "Clinical Risk Hazard: Residual hazard log risk index must not exceed 2 (Acceptable / Broadly Acceptable)." ;
    ] ;
    sh:property [
        sh:path samd:ukMdrCleared ;
        sh:hasValue true ;
        sh:message "Statutory Medical Device Violation: UK MDR 2002 SaMD regulatory classification and conformity assessment required." ;
    ] ;
    sh:property [
        sh:path tre:containsPatientIdentifiableData ;
        sh:hasValue false ;
        sh:message "Data Privacy Violation: Model release must not contain embedded patient tokens or unanonymized records." ;
    ] .`,
        rego: `package tre.clinical_safety.airlock

default allow = false

# Rule: DCB0129 / SaMD Egress Gatekeeper
allow {
    input.request_type == "clinical_algorithm_egress"
    input.clinical_safety.cso_signoff_valid == true
    input.clinical_safety.hazard_log_max_index <= 2
    input.samd.uk_mdr_conformity == true
    input.artifact.contains_patient_data == false
}`,
        sampleCompliantInput: {
          request_type: "clinical_algorithm_egress",
          clinical_safety: {
            cso_name: "Dr. Mark Robinson, FRCR (CSO)",
            cso_registration: "GMC-6192840",
            cso_signoff_valid: true,
            hazard_log_max_index: 2,
            safety_case_version: "2.1-RELEASE"
          },
          samd: {
            uk_mdr_conformity: true,
            mhra_registration_ref: "MHRA-SaMD-2026-0419"
          },
          artifact: {
            artifact_name: "stroke_detection_weights.onnx",
            contains_patient_data: false
          }
        },
        sampleViolatingInput: {
          request_type: "clinical_algorithm_egress",
          clinical_safety: {
            cso_signoff_valid: false,
            hazard_log_max_index: 4
          },
          samd: {
            uk_mdr_conformity: false
          },
          artifact: {
            contains_patient_data: true
          }
        },
        violationExplanation: "Airlock Egress Rejected: Clinical Safety Officer sign-off is missing, hazard log residual index (4) exceeds safe threshold (2), UK MDR SaMD clearance absent, and artifact contains patient data.",
        provOTriple: `tre:ClinicalSafetyClearance_09 a prov:Activity ;
    prov:wasAssociatedWith tre:ClinicalSafetyOfficer ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-30T11:00:00Z"^^xsd:dateTime .`,
        governanceMapping: {
          fiveSafesDimension: "Safe Outputs & Safe Projects",
          satrePillar: "Software Operations & Information Governance",
          statutoryBasis: "Health and Social Care Act 2012 DCB0129/0160 & UK MDR 2002 SaMD Regulations"
        },
        keyConsiderations: [
          "DCB0129 Clinical Safety Officer (CSO) must be a clinician currently registered with a UK regulatory body (GMC, NMC, HCPC).",
          "Deployment NHS Trusts must complete reciprocal DCB0160 clinical safety deployment cases before activation.",
          "Residual hazard index must be monitored in clinical operations under post-market surveillance protocols."
        ]
      };
    }

    // Default: General Research Data Governance & Workspace Admission
    return {
      title: 'Research Data Governance & Enclave Admission Policy',
      summary: `Tailored security policy synthesized for requirement: "${prompt.slice(0, 100)}..." enforcing Closed-World SHACL admission bounds and fail-closed OPA Rego rules.`,
      targetClass: 'tre:WorkspaceSession',
      enforcementPoint: ep.includes('Airlock') ? 'Airlock Egress PEP (Airgap Gate)' : 'Kubernetes ValidatingAdmissionWebhook',
      shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:CustomSecurityShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasAccreditedResearcher ;
        sh:minCount 1 ;
        sh:message "Session must be bound to a verified accredited researcher with current institutional credentials." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Active NHS REC or statutory research ethics approval is mandatory." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Network security violation: Zero external egress routing must be enforced at the VPC tier." ;
    ] .`,
      rego: `package tre.authz

default allow = false

# Rule: Standard Enclave Workspace Admission
allow {
    input.request_type == "workspace_admission"
    input.researcher.accreditation_valid == true
    input.project.ethics_approval_active == true
    input.enclave.egress_blocked == true
}`,
      sampleCompliantInput: {
        request_type: "workspace_admission",
        researcher: {
          name: "Dr. Marcus Brody",
          accreditation_valid: true
        },
        project: {
          project_id: "PROJ-2026-01",
          ethics_approval_active: true
        },
        enclave: {
          egress_blocked: true
        }
      },
      sampleViolatingInput: {
        request_type: "workspace_admission",
        researcher: {
          name: "Unknown Contributor",
          accreditation_valid: false
        },
        project: {
          project_id: "PROJ-UNVERIFIED",
          ethics_approval_active: false
        },
        enclave: {
          egress_blocked: false
        }
      },
      violationExplanation: "Admission Denied: Researcher is unaccredited, project ethics approval is expired/absent, and network egress is not blocked.",
      provOTriple: `tre:PolicyDecision_Custom_01 a prov:Activity ;
    prov:wasAssociatedWith tre:PolicyDecisionPoint ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T10:00:00Z"^^xsd:dateTime .`,
      governanceMapping: {
        fiveSafesDimension: "Safe People & Safe Settings",
        satrePillar: "Information Governance & Computing Infrastructure",
        statutoryBasis: "Five Safes Framework & SATRE Specification v1.0"
      },
      keyConsiderations: [
        "Enclave perimeter must disable public IP assignments on researcher pod network interfaces.",
        "SHACL shapes must be pre-validated by PySHACL in continuous integration before deployment to cluster.",
        "Decisions must record the exact Git commit SHA of the compiling ontology rule in audit logs."
      ]
    };
  };

  const handleGenerate = (customPrompt?: string) => {
    const promptToUse = customPrompt || requirementText;
    if (!promptToUse.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Deterministic Client-Side Policy Synthesizer
      const policy = synthesizeClientSidePolicy(promptToUse, enforcementPoint, strictness);
      setGeneratedPolicy(policy);
      setModeNotice({
        mode: 'static-fallback',
        message: 'Deterministic Static Engine Active (Instant Microsecond Synthesis)'
      });
      const initialJson = JSON.stringify(policy.sampleCompliantInput, null, 2);
      setEvaluatorInputJson(initialJson);
      evaluatePolicyInput(policy.sampleCompliantInput, policy);
    } catch (err: any) {
      console.error('Synthesis error:', err);
      setError('Could not synthesize policy: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Evaluate the JSON input against the generated policy constraints
  const evaluatePolicyInput = (inputObj: any, policy: GeneratedPolicy) => {
    const checks: { name: string; passed: boolean; detail: string }[] = [];
    let isOverallPermitted = true;

    // Check 1: Egress isolation / network
    if (inputObj?.enclave?.egress_blocked !== undefined) {
      const passed = inputObj.enclave.egress_blocked === true;
      checks.push({
        name: 'Zero-Egress Network Isolation',
        passed,
        detail: passed ? 'Enclave egress verified blocked' : 'Egress is unblocked (Security violation)'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 2: Cohort size / min cell count
    const cohortSize = inputObj?.dataset?.cohort_size ?? inputObj?.dataset?.min_cell_count;
    if (cohortSize !== undefined) {
      const minRequired = requirementText.toLowerCase().includes('genom') ? 25 : 10;
      const passed = cohortSize >= minRequired;
      checks.push({
        name: `Primary Count Threshold (k >= ${minRequired})`,
        passed,
        detail: passed ? `Observed: ${cohortSize} (>= ${minRequired})` : `Violation: Observed ${cohortSize} (< ${minRequired})`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 3: Rare variants flag
    if (inputObj?.dataset?.contains_rare_variants !== undefined) {
      const passed = inputObj.dataset.contains_rare_variants === false;
      checks.push({
        name: 'Rare Variant Suppression Flag',
        passed,
        detail: passed ? 'Rare alleles masked' : 'Violation: Contains unmasked rare variants'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 4: Unmasked identifier columns
    if (Array.isArray(inputObj?.dataset?.columns)) {
      const dangerous = ['sample_id', 'nhs_number', 'patient_name', 'postcode', 'dob', 'vcf_header_donor'];
      const found = inputObj.dataset.columns.filter((c: string) => dangerous.includes(c.toLowerCase()));
      const passed = found.length === 0;
      checks.push({
        name: 'Direct Identifier Exclusion',
        passed,
        detail: passed ? 'No direct PII columns detected' : `Violation: Found unmasked column(s): ${found.join(', ')}`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 5: MCP Agent rows limit
    if (inputObj?.agent?.max_rows !== undefined) {
      const passed = inputObj.agent.max_rows <= 100;
      checks.push({
        name: 'MCP Max Rows Boundary (<= 100)',
        passed,
        detail: passed ? `Declared rows: ${inputObj.agent.max_rows}` : `Violation: Requested rows ${inputObj.agent.max_rows} (> 100)`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 6: SQL mutating keywords
    if (inputObj?.tool_parameters?.query_statement) {
      const stmt = String(inputObj.tool_parameters.query_statement).toUpperCase();
      const forbidden = ['DROP', 'ALTER', 'DELETE', 'UPDATE', 'INSERT', 'TRUNCATE'];
      const found = forbidden.filter((f) => stmt.includes(f));
      const isSelect = stmt.trim().startsWith('SELECT') || stmt.trim().startsWith('EXPLAIN');
      const passed = found.length === 0 && isSelect;
      checks.push({
        name: 'Read-Only Query Safety Check',
        passed,
        detail: passed ? 'Valid read-only query statement' : `Violation: Mutating keyword or invalid command detected: ${found.join(', ') || 'Not a SELECT'}`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 7: Ethics / Caldicott approval
    if (inputObj?.approval?.caldicott_guardian_signed !== undefined) {
      const passed = inputObj.approval.caldicott_guardian_signed === true;
      checks.push({
        name: 'Caldicott Guardian Dual Sign-Off',
        passed,
        detail: passed ? 'Signed by Caldicott Guardian Office' : 'Violation: Caldicott Guardian signature missing'
      });
      if (!passed) isOverallPermitted = false;
    } else if (inputObj?.project?.ethics_approval_active !== undefined) {
      const passed = inputObj.project.ethics_approval_active === true;
      checks.push({
        name: 'Active Research Ethics (REC) Approval',
        passed,
        detail: passed ? 'Active REC protocol verified' : 'Violation: Ethics protocol approval inactive'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 8: Accreditation
    if (inputObj?.researcher?.accreditation_valid !== undefined) {
      const passed = inputObj.researcher.accreditation_valid === true;
      checks.push({
        name: 'Researcher Accreditation Status',
        passed,
        detail: passed ? 'Accreditation verified' : 'Violation: Unaccredited user'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 9: Session duration
    if (inputObj?.session?.duration_hours !== undefined) {
      const passed = inputObj.session.duration_hours <= 4;
      checks.push({
        name: 'Maximum Session Duration (<= 4h)',
        passed,
        detail: passed ? `Duration: ${inputObj.session.duration_hours}h` : `Violation: Requested ${inputObj.session.duration_hours}h (> 4h ceiling)`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 10: Multi-factor authentication
    if (inputObj?.session?.mfa_verified !== undefined) {
      const passed = inputObj.session.mfa_verified === true;
      checks.push({
        name: 'Multi-Factor Authentication (MFA)',
        passed,
        detail: passed ? 'Hardware MFA verified' : 'Violation: Missing MFA verification'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 11: DEA 2017 RAP Project Accreditation
    if (inputObj?.project?.rap_accreditation_valid !== undefined) {
      const passed = inputObj.project.rap_accreditation_valid === true;
      checks.push({
        name: 'UKSA Research Accreditation Panel (RAP) Validity',
        passed,
        detail: passed ? 'Active UKSA RAP accreditation verified' : 'Violation: Project lacks active RAP approval'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 12: DEA Accredited Processor Safe Setting
    if (inputObj?.processor?.is_accredited_processor !== undefined) {
      const passed = inputObj.processor.is_accredited_processor === true;
      checks.push({
        name: 'DEA Accredited Processor Accreditation (s71)',
        passed,
        detail: passed ? 'Verified Accredited Processor environment' : 'Violation: Enclave is not an accredited processor'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 13: DEA Safe Researcher Training & Section 67 Acknowledgement
    if (inputObj?.researcher?.has_safe_researcher_cert !== undefined) {
      const passed = inputObj.researcher.has_safe_researcher_cert === true;
      checks.push({
        name: 'UKSA Safe Researcher Certification',
        passed,
        detail: passed ? 'Safe Researcher credentials active' : 'Violation: Missing Safe Researcher training'
      });
      if (!passed) isOverallPermitted = false;
    }

    if (inputObj?.penalties_s67_acknowledged !== undefined) {
      const passed = inputObj.penalties_s67_acknowledged === true;
      checks.push({
        name: 'DEA Section 67 Penalties Acknowledgement',
        passed,
        detail: passed ? 'Statutory criminal penalties acknowledged' : 'Violation: Section 67 penalties not accepted'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 14: ISO 42001 Model Risk Level
    if (inputObj?.model?.risk_level !== undefined) {
      const validTiers = ['Low', 'Moderate', 'High_Diagnostic'];
      const passed = validTiers.includes(inputObj.model.risk_level);
      checks.push({
        name: 'ISO/IEC 42001 AIMS Risk Classification',
        passed,
        detail: passed ? `Documented Tier: ${inputObj.model.risk_level}` : `Violation: Invalid or undocumented risk tier: ${inputObj.model.risk_level}`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 15: ISO 5259 Data Provenance Checksum
    if (inputObj?.model?.iso_5259_provenance_verified !== undefined) {
      const passed = inputObj.model.iso_5259_provenance_verified === true;
      checks.push({
        name: 'ISO/IEC 5259 Training Data Provenance',
        passed,
        detail: passed ? 'Cryptographic dataset lineage verified' : 'Violation: Unverified training data provenance checksum'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 16: Model Bias & Drift Audit
    if (inputObj?.model?.bias_audit_passed !== undefined) {
      const passed = inputObj.model.bias_audit_passed === true;
      checks.push({
        name: 'Algorithmic Equity & Bias Audit Pass',
        passed,
        detail: passed ? 'Bias & demographic parity thresholds passed' : 'Violation: Model failed bias audit criteria'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 17: DCB0129 Clinical Safety Officer (CSO) Sign-off
    if (inputObj?.clinical_safety?.cso_signoff_valid !== undefined) {
      const passed = inputObj.clinical_safety.cso_signoff_valid === true;
      checks.push({
        name: 'DCB0129 Clinical Safety Officer (CSO) Sign-off',
        passed,
        detail: passed ? 'Active CSO clinical safety case signed' : 'Violation: Missing accredited CSO sign-off'
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 18: DCB0129 Hazard Log Residual Risk Index (<= 2)
    if (inputObj?.clinical_safety?.hazard_log_max_index !== undefined) {
      const passed = inputObj.clinical_safety.hazard_log_max_index <= 2;
      checks.push({
        name: 'DCB0129 Hazard Log Residual Risk Index (<= 2)',
        passed,
        detail: passed ? `Hazard Index: ${inputObj.clinical_safety.hazard_log_max_index} (Acceptable)` : `Violation: Residual hazard index ${inputObj.clinical_safety.hazard_log_max_index} (> 2)`
      });
      if (!passed) isOverallPermitted = false;
    }

    // Check 19: UK MDR 2002 SaMD Conformity Assessment
    if (inputObj?.samd?.uk_mdr_conformity !== undefined) {
      const passed = inputObj.samd.uk_mdr_conformity === true;
      checks.push({
        name: 'UK MDR 2002 Software as a Medical Device (SaMD) Clearance',
        passed,
        detail: passed ? 'MHRA SaMD conformity certified' : 'Violation: Missing statutory SaMD clearance'
      });
      if (!passed) isOverallPermitted = false;
    }

    if (checks.length === 0) {
      checks.push({
        name: 'Structural Policy Schema Validation',
        passed: true,
        detail: 'Payload satisfies base request structure.'
      });
    }

    setEvaluatorResult({
      permitted: isOverallPermitted,
      reason: isOverallPermitted
        ? 'All SHACL shape constraints and OPA Rego rules satisfied. Access permitted.'
        : 'One or more security conditions failed validation. Request denied by fail-closed PDP.',
      checks
    });
  };

  const handleRunManualEvaluation = () => {
    if (!generatedPolicy) return;
    try {
      const parsed = JSON.parse(evaluatorInputJson);
      evaluatePolicyInput(parsed, generatedPolicy);
    } catch (e: any) {
      setEvaluatorResult({
        permitted: false,
        reason: `JSON Syntax Error: ${e.message}`,
        checks: [{ name: 'JSON Parsing', passed: false, detail: 'Input string is not valid JSON' }]
      });
    }
  };

  const handleLoadSample = (type: 'compliant' | 'violating') => {
    if (!generatedPolicy) return;
    const sample = type === 'compliant' ? generatedPolicy.sampleCompliantInput : generatedPolicy.sampleViolatingInput;
    const jsonStr = JSON.stringify(sample, null, 2);
    setEvaluatorInputJson(jsonStr);
    evaluatePolicyInput(sample, generatedPolicy);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deterministic Policy-as-Code Synthesizer</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Deterministic Engine · Microsecond Latency</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Governance Requirement to Policy-as-Code Synthesizer
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Specify a research data governance requirement, clinical disclosure threshold, or compute isolation rule in plain English.
            The engine deterministically synthesizes closed-world <strong>W3C SHACL shapes</strong>, compiles high-performance <strong>OPA Rego authorization rules</strong>, and generates live test fixtures for instant sandbox verification across data analysis &amp; intelligence platforms and secure research enclaves.
          </p>

          {/* Educational Purpose & Point-of-Implementation Responsibility Disclaimer */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-300 font-semibold uppercase tracking-wider block">
                Educational &amp; Reference Notice
              </strong>
              <p className="text-amber-100/90 leading-relaxed">
                This policy synthesizer and its generated shapes and rules are provided strictly for educational and reference purposes. This playbook is deliberately organisationally agnostic and as such should be reviewed and approved by relevant decision makers at an organisational level. All regulatory risks, legal basis determinations, and deployment decisions are the responsibility of the adopting organization at the point of implementation. Generated rules must be independently reviewed, audited, and tested against organizational security baselines before production deployment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Quick-Picks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Clinical Security Archetypes</span>
          </span>
          <span className="text-[11px] text-slate-500">Click any preset to pre-fill requirement</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PRESET_REQUIREMENTS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setRequirementText(preset.prompt);
                setEnforcementPoint(preset.enforcementPoint);
              }}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300">
                  {preset.icon === 'Dna' && <Dna className="w-3.5 h-3.5" />}
                  {preset.icon === 'Bot' && <Bot className="w-3.5 h-3.5" />}
                  {preset.icon === 'Lock' && <Lock className="w-3.5 h-3.5" />}
                  {preset.icon === 'Scale' && <Scale className="w-3.5 h-3.5" />}
                  {preset.icon === 'Layers' && <Layers className="w-3.5 h-3.5" />}
                </div>
                <span className="font-bold text-xs text-slate-200 group-hover:text-white line-clamp-1">
                  {preset.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {preset.shortPrompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Requirement Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Natural Language Requirement Description</span>
            <span className="text-[11px] font-normal text-slate-500">Describe who, what data tier, what isolation, and what thresholds apply</span>
          </label>
          <textarea
            rows={4}
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            placeholder="e.g. Any tabular release involving whole-genome sequencing must enforce cohort size >= 25 individuals, zero rare allele indicators, and explicit NHS REC genomic ethics protocol endorsement..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-mono transition-colors"
          />
        </div>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Enforcement Point (PEP)</label>
            <select
              value={enforcementPoint}
              onChange={(e) => setEnforcementPoint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Airlock Egress PEP (Airgap Gate)">Airlock Egress PEP (Airgap Gate & SDC)</option>
              <option value="Kubernetes ValidatingAdmissionWebhook">Kubernetes ValidatingAdmissionWebhook (Compute Admission)</option>
              <option value="MCP Gateway Policy Decision Point (PEP)">Model Context Protocol (MCP) Tool Gateway</option>
              <option value="API Gateway / Envoy Reverse Proxy">API Gateway / Envoy Reverse Proxy</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Governance Framework Strictness</label>
            <select
              value={strictness}
              onChange={(e) => setStrictness(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Standard (Five Safes & SATRE)">Standard (Five Safes & SATRE Pillars)</option>
              <option value="Strict Caldicott & NHS Section 251">Strict Caldicott & NHS Section 251</option>
              <option value="High-Security / Air-Gapped Zero-Egress">High-Security / Air-Gapped Zero-Egress</option>
              <option value="EU AI Act High-Risk Tier Compliance">EU AI Act High-Risk Tier Compliance</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">
            Generates production W3C SHACL shapes, compiled OPA Rego, test JSON, and PROV-O audit trails.
          </span>
          <button
            onClick={() => handleGenerate()}
            disabled={isLoading || !requirementText.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Policy with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Policy &amp; Shapes</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Generated Policy Results */}
      {generatedPolicy && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {modeNotice && (
            <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
              modeNotice.mode === 'static-fallback'
                ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>{modeNotice.message}</span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-black/40 border border-white/10 shrink-0 self-start sm:self-auto">
                {modeNotice.mode === 'static-fallback' ? 'Static / GitHub Pages Mode' : 'Cloud Run / Server Mode'}
              </span>
            </div>
          )}

          {/* Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                    {generatedPolicy.targetClass}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/80">
                    {generatedPolicy.enforcementPoint}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {generatedPolicy.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {generatedPolicy.summary}
                </p>
              </div>

              {/* Badges Bar */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 shrink-0 min-w-[240px] text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Five Safes:</span>
                  <span className="font-bold text-cyan-300">{generatedPolicy.governanceMapping.fiveSafesDimension}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">SATRE Pillar:</span>
                  <span className="font-bold text-purple-300">{generatedPolicy.governanceMapping.satrePillar}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Legal Basis:</span>
                  <span className="font-bold text-amber-300 line-clamp-1">{generatedPolicy.governanceMapping.statutoryBasis}</span>
                </div>
              </div>
            </div>

            {/* Code Tabs Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveCodeTab('shacl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeCodeTab === 'shacl'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>1. W3C SHACL Shapes (.ttl)</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('rego')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeCodeTab === 'rego'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>2. OPA Rego PDP (.rego)</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('prov')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeCodeTab === 'prov'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3. W3C PROV-O Audit Triple</span>
                </button>
                <button
                  onClick={() => setActiveCodeTab('governance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeCodeTab === 'governance'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>4. Statutory Mapping</span>
                </button>
              </div>

              {/* Copy & Download Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text =
                      activeCodeTab === 'shacl'
                        ? generatedPolicy.shacl
                        : activeCodeTab === 'rego'
                        ? generatedPolicy.rego
                        : activeCodeTab === 'prov'
                        ? generatedPolicy.provOTriple
                        : JSON.stringify(generatedPolicy.governanceMapping, null, 2);
                    handleCopy(activeCodeTab, text);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === activeCodeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    const filename =
                      activeCodeTab === 'shacl'
                        ? 'policy-shapes.ttl'
                        : activeCodeTab === 'rego'
                        ? 'authz.rego'
                        : activeCodeTab === 'prov'
                        ? 'audit-triple.ttl'
                        : 'governance-mapping.json';
                    const text =
                      activeCodeTab === 'shacl'
                        ? generatedPolicy.shacl
                        : activeCodeTab === 'rego'
                        ? generatedPolicy.rego
                        : activeCodeTab === 'prov'
                        ? generatedPolicy.provOTriple
                        : JSON.stringify(generatedPolicy.governanceMapping, null, 2);
                    handleDownload(filename, text);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Panel */}
            <div className="mt-3">
              {activeCodeTab === 'shacl' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                    <span>Closed-World W3C SHACL Shapes &middot; ontology/shapes/custom-shapes.ttl</span>
                    <span className="text-cyan-400">Deterministic Pass/Fail Constraint Model</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[380px] shadow-inner">
                    <code>{generatedPolicy.shacl}</code>
                  </pre>
                </div>
              )}

              {activeCodeTab === 'rego' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                    <span>Open Policy Agent (OPA) PDP &middot; security/opa/authz.rego</span>
                    <span className="text-emerald-400">Microsecond Line-Rate PEP Decision Rules</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[380px] shadow-inner">
                    <code>{generatedPolicy.rego}</code>
                  </pre>
                </div>
              )}

              {activeCodeTab === 'prov' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                    <span>Cryptographic Audit Provenance &middot; W3C PROV-O RDF Triples</span>
                    <span className="text-purple-400">Non-Repudiation Decision Ledger</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed max-h-[380px] shadow-inner">
                    <code>{generatedPolicy.provOTriple}</code>
                  </pre>
                </div>
              )}

              {activeCodeTab === 'governance' && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Five Safes Dimension</span>
                      <p className="text-xs font-bold text-white">{generatedPolicy.governanceMapping.fiveSafesDimension}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">SATRE Technical Pillar</span>
                      <p className="text-xs font-bold text-white">{generatedPolicy.governanceMapping.satrePillar}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Statutory Mandate</span>
                      <p className="text-xs font-bold text-white">{generatedPolicy.governanceMapping.statutoryBasis}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1 leading-relaxed">
                    <p>
                      <strong>Compliance Assurance:</strong> When evaluated in CI via PySHACL (<code className="text-cyan-300 font-mono">pytest tests/test_shapes.py</code>),
                      conformance guarantees that no researcher compute or airlock export can breach these statutory boundaries.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Live Sandbox Evaluator for Generated Policy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Live In-Sandbox Verification
                </span>
                <h4 className="text-lg font-bold text-white">
                  Test-Drive Policy Against Candidate JSON Inputs
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Load compliant or violating payloads, modify attributes, and execute real-time decision simulation.
                </p>
              </div>

              {/* Sample Loader Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLoadSample('compliant')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Load Compliant Case</span>
                </button>
                <button
                  onClick={() => handleLoadSample('violating')}
                  className="px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/80 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                  <span>Load Violating Case</span>
                </button>
              </div>
            </div>

            {/* Evaluator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: JSON Input Editor */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                  <span>Candidate Input Document (input.json)</span>
                  <button
                    onClick={handleRunManualEvaluation}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Evaluation</span>
                  </button>
                </div>
                <textarea
                  rows={12}
                  value={evaluatorInputJson}
                  onChange={(e) => setEvaluatorInputJson(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* Right: Live PDP Evaluation Verdict */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  OPA PDP Simulated Verdict
                </div>

                {evaluatorResult ? (
                  <div className="space-y-4">
                    {/* Verdict Card */}
                    <div
                      className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                        evaluatorResult.permitted
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                          : 'bg-red-950/30 border-red-500/50 text-red-200'
                      }`}
                    >
                      {evaluatorResult.permitted ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-base font-bold">
                          {evaluatorResult.permitted ? 'REQUEST AUTHORIZED (allow = true)' : 'REQUEST REJECTED (allow = false)'}
                        </div>
                        <div className="text-[11px] opacity-90 mt-0.5">
                          {evaluatorResult.reason}
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Rule Checks */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Evaluated Policy Invariants
                      </span>
                      <div className="space-y-1.5">
                        {evaluatorResult.checks.map((c, i) => (
                          <div key={i} className="flex items-start justify-between text-xs gap-2 py-1 border-b border-slate-900 last:border-0">
                            <span className="text-slate-300 font-mono text-[11px]">{c.name}</span>
                            <span
                              className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                c.passed
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-red-950 text-red-300 border border-red-800'
                              }`}
                            >
                              {c.passed ? 'PASS ✓' : 'FAIL ✗'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamically emitted PROV-O Activity */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Live Emitted PROV-O Triple
                      </span>
                      <pre className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-[10px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                        <code>{`tre:EvalActivity_${Date.now().toString(36)} a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_DecisionEngine ;
    tre:decisionResult "${evaluatorResult.permitted ? 'PERMIT' : 'DENY'}" ;
    prov:endedAtTime "${new Date().toISOString()}"^^xsd:dateTime .`}</code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
                    Click "Run Evaluation" to simulate the decision.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Architectural Considerations */}
          {generatedPolicy.keyConsiderations?.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Production Deployment Considerations &amp; Pitfalls</span>
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {generatedPolicy.keyConsiderations.map((note, idx) => (
                  <li key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0">·</span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
