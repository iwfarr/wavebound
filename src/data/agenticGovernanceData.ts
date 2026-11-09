/**
 * Agentic AI & Data Asset Governance Data Model
 * 
 * Formal resolution of:
 * 1. "Would AI be a Safe Person, or considered a Data Asset with specific constraints?"
 * 2. "Where do Data Assets sit in the Five Safes framework?"
 * 3. Stanford UIT Agentic AI Security Framework integration (revocable identity, blast radius, risk classifications).
 * 
 * References:
 * - Stanford UIT Agentic AI Security Framework: https://uit.stanford.edu/security/agenticai/security-framework
 * - Stanford UIT Agentic AI Risk Classifications: https://uit.stanford.edu/security/agenticai/riskclassifications (#section_8702, #section_8938)
 * - UK Digital Economy Act 2017 (DEA 2017) & ONS Approved Researcher Scheme
 * - Caldicott Principles (Principles 1-8) & UK GDPR
 */

export interface SafePersonComparison {
  dimension: string;
  accreditedHuman: {
    title: string;
    description: string;
    status: 'COMPLIANT' | 'ACCREDITED';
    legalBasis: string;
  };
  agenticAI: {
    title: string;
    description: string;
    status: 'NON_PERSON' | 'DELEGATED_WORKLOAD';
    legalBasis: string;
  };
  architecturalResolution: string;
}

export interface FiveSafesAssetMapping {
  pillar: 'Safe People' | 'Safe Data' | 'Safe Settings' | 'Safe Outputs' | 'Safe Projects';
  subtitle: string;
  whereDataAssetsSit: string;
  whereAIModelsAndAgentsSit: string;
  metadataConstraints: string[];
  enforcementMechanism: string;
}

export interface StanfordRiskTier {
  id: 'low' | 'moderate' | 'high' | 'very-high';
  name: string;
  stanfordSectionRef?: string;
  stanfordSectionUrl?: string;
  autonomyLevel: string;
  targetDataSensitivity: string;
  blastRadius: string;
  humanOversightRequirement: string;
  identityAndCredentialRules: string;
  permittedInTRE: boolean;
  pacControls: string[];
}

export interface AgenticGovernanceData {
  governanceDilemma: {
    question: string;
    shortResolution: string;
    fullResolution: string;
    statutoryDoctrine: string;
  };
  safePersonComparison: SafePersonComparison[];
  fiveSafesMapping: FiveSafesAssetMapping[];
  stanfordFrameworkPrinciples: {
    title: string;
    stanfordRequirement: string;
    treImplementation: string;
    policyAsCodePattern: string;
  }[];
  stanfordRiskTiers: StanfordRiskTier[];
  pacExamples: {
    title: string;
    language: 'turtle' | 'rego';
    code: string;
    explanation: string;
  }[];
}

export const AGENTIC_GOVERNANCE_DATA: AgenticGovernanceData = {
  governanceDilemma: {
    question: 'Would AI be a Safe Person, or considered a Data Asset with specific constraints (and where do Data Assets sit in the Five Safes framework)?',
    shortResolution: 'AI is NEVER a Safe Person. Legally and architecturally, an AI agent is a non-person workload entity operating strictly under the delegated custody of an Accredited Human Researcher (Human Sponsor). Concurrently, AI model weights and fine-tuned checkpoints are treated as Data Assets subject to disclosure control.',
    fullResolution: `Under statutory frameworks (UK Digital Economy Act 2017, ONS Approved Researcher Scheme, Caldicott Principles, and UK GDPR), a "Safe Person" must possess legal personhood, personal duty of confidentiality, and direct criminal/civil liability. An AI model, agent, or LLM possesses no legal personhood, cannot sign statutory undertakings, cannot hold institutional liability, and cannot be prosecuted. 

Therefore, AI operates strictly as an Agentic Workload Entity under the Delegated Authority of an Accredited Human Researcher ("Human Sponsor"). Following the Stanford UIT Agentic AI Security Framework, the AI's identity must be an automated, near-instantaneously revocable machine workload credential tied to the sponsor's verified identity.

Simultaneously, pre-trained weights, fine-tuned checkpoints, embeddings, and vector databases are formally categorized as "Data Assets" within the Safe Data pillar. Because large language models and neural networks are susceptible to training data memorization, membership inference, and model inversion attacks, exporting a model artifact requires the exact same statistical disclosure control (SDC) and airlock verification as exporting a tabular dataset.`,
    statutoryDoctrine: 'Digital Economy Act 2017 Section 70 (Criminal Offences for Unlawful Disclosure), Caldicott Principle 8 (No Decisions About Me Without Me), & Stanford UIT Agentic AI Security Framework (Revocable Machine Identity Doctrine).'
  },

  safePersonComparison: [
    {
      dimension: 'Legal Personhood & Liability',
      accreditedHuman: {
        title: 'Natural Person with Statutory Liability',
        description: 'Holds legal personhood. Personally subject to criminal penalties under Section 70 of the Digital Economy Act 2017 and UK GDPR for intentional re-identification or unauthorized disclosure.',
        status: 'ACCREDITED',
        legalBasis: 'DEA 2017 Part 5; UK GDPR Art. 4(1)'
      },
      agenticAI: {
        title: 'Non-Person Machine Workload',
        description: 'Lacks legal personhood. Cannot sign a binding code of conduct, hold professional indemnity, or be criminally indicted.',
        status: 'NON_PERSON',
        legalBasis: 'Statutory Exclusion (Civil/Criminal Law)'
      },
      architecturalResolution: 'AI can never be granted standalone "Safe Person" status. Any autonomous action must be legally and architecturally backstopped by an Accredited Human Sponsor who remains 100% accountable.'
    },
    {
      dimension: 'Identity & Authentication',
      accreditedHuman: {
        title: 'Federated Human ID (NHSmail / EduGAIN)',
        description: 'Longer-lived institutional identity authenticated via multi-factor authentication (MFA/FIDO2) and annual Information Governance (IG) training re-certification.',
        status: 'ACCREDITED',
        legalBasis: 'NHS DSPT & ONS SRS Criteria'
      },
      agenticAI: {
        title: 'Delegated Revocable Workload Token',
        description: 'Short-lived, cryptographically scoped machine identity (OIDC / SPIFFE) issued on behalf of the human sponsor with automated, near-instantaneous revocation.',
        status: 'DELEGATED_WORKLOAD',
        legalBasis: 'Stanford UIT Security Framework'
      },
      architecturalResolution: 'Stanford UIT Rule: "The identity must be revocable in an automated, near-instantaneous manner... Long-lived credentials are prohibited." If the agent behaves anomalously, its token is instantly severed without invalidating the researcher.'
    },
    {
      dimension: 'Code of Conduct & Ethics',
      accreditedHuman: {
        title: 'Signed Ethical Undertaking',
        description: 'Signs legally binding researcher accreditation agreements, institutional employment contracts, and NHS REC ethics protocols.',
        status: 'ACCREDITED',
        legalBasis: 'ONS Researcher Declaration & IRAS REC'
      },
      agenticAI: {
        title: 'Deterministic Policy Enforcement (PaC)',
        description: 'Cannot "understand" ethics or moral duty. Compliance must be deterministically forced through SHACL semantic bounds, OPA admission controllers, and network airlocks.',
        status: 'DELEGATED_WORKLOAD',
        legalBasis: 'Policy as Code (SHACL / OPA)'
      },
      architecturalResolution: 'Ethics cannot be assumed via LLM system prompts; guardrails must be compiled into deterministic Policy Decision Points (PDPs) that physically block unauthorized tool invocation.'
    },
    {
      dimension: 'Blast Radius & Data Modification',
      accreditedHuman: {
        title: 'Interactive Analytical Discretion',
        description: 'Permitted to write exploratory R/Python scripts, build pipelines, and request aggregated exports via standard airlock channels.',
        status: 'ACCREDITED',
        legalBasis: 'Five Safes Standard Operating Procedure'
      },
      agenticAI: {
        title: 'Strictly Bounded Tool Execution',
        description: 'Confined to read-only database connections (mcp:ExecuteSQL with SELECT/EXPLAIN only) and synthetic staging schemas. Direct write to underlying records of truth is prohibited.',
        status: 'DELEGATED_WORKLOAD',
        legalBasis: 'Stanford UIT Section 8702 & MCP Spec'
      },
      architecturalResolution: 'Direct mutations on source clinical or population tables are architecturally prevented. All agent-generated scripts require human-in-the-loop review before pipeline execution.'
    }
  ],

  fiveSafesMapping: [
    {
      pillar: 'Safe Data',
      subtitle: 'Where Data Assets & AI Model Checkpoints Sit',
      whereDataAssetsSit: 'Data assets (Hospital Episode Statistics, Census cohorts, Genomic variant files, Primary Care records) are catalogued with explicit metadata: classification tier, minimum cell threshold (k >= 10), dominance ceiling (<= 80%), and allowed linkage graphs.',
      whereAIModelsAndAgentsSit: 'Pre-trained base models, fine-tuned weights, embeddings, and vector stores ARE Data Assets! Neural network weights memorize private records. Fine-tuned model checkpoints inherit the classification tier of the underlying training data and are restricted from unreviewed egress.',
      metadataConstraints: [
        'Asset sensitivity classification (Tier 1 Public, Tier 2 Pseudonymised, Tier 3 Section 251)',
        'Model training lineage: prov:wasDerivedFrom linked to specific cohort ID',
        'Differential privacy budget metadata: epsilon <= 1.0, delta <= 1e-5',
        'Membership inference vulnerability score <= 0.05'
      ],
      enforcementMechanism: 'Data Catalogue schema validation (dcat:Dataset / tre:DataAsset) and model registry admission filters.'
    },
    {
      pillar: 'Safe People',
      subtitle: 'Accreditation, Liability & AI Sponsorship',
      whereDataAssetsSit: 'Data assets have designated Data Stewards, Caldicott Guardians, and Information Asset Owners (IAOs) who authorize project-level data access agreements (DSAs).',
      whereAIModelsAndAgentsSit: 'AI has NO standing under Safe People. Instead, Safe People defines the Accredited Human Sponsor who assumes 100% legal liability for the AI agent workload. The agent inherits access rights solely as a delegated workload proxy.',
      metadataConstraints: [
        'Accredited Researcher certification status: tre:hasValidIGCertification true',
        'Human Sponsor linkage: tre:sponsoredByHumanResearcher <URI>',
        'Workload Token Time-to-Live (TTL): max 2 hours, automated revocation endpoint registered',
        'Dual-approval requirement for High-Risk queries'
      ],
      enforcementMechanism: 'SHACL Access Shapes (access-shapes.ttl) checking sponsor accreditation + SPIFFE/OIDC token validator.'
    },
    {
      pillar: 'Safe Settings',
      subtitle: 'Execution Enclave & Blast Radius Containment',
      whereDataAssetsSit: 'Data assets reside in cryptographically isolated storage tiers with access logged to tamper-evident audit ledgers.',
      whereAIModelsAndAgentsSit: 'The AI agent and inference engine (vLLM, Ollama, Triton) execute inside an egress-isolated container sandbox. Zero external network egress; all tool calls route through an MCP proxy enforcing rate limits and row caps.',
      metadataConstraints: [
        'Egress network policy: default deny all outbound traffic to public internet',
        'Tool execution boundary: SELECT/EXPLAIN only, max 500 rows returned',
        'Ephemeral container runtime: scratch disks wiped upon session completion',
        'Prompt sanitization PEP: PII/PHI redaction prior to LLM context ingestion'
      ],
      enforcementMechanism: 'eBPF / Calico NetworkPolicies + OPA sidecar proxies intercepting MCP JSON-RPC messages.'
    },
    {
      pillar: 'Safe Outputs',
      subtitle: 'Airlock Verification & Memorization Checks',
      whereDataAssetsSit: 'Statistical aggregate tables and analytical figures undergo Statistical Disclosure Control (SDC): primary suppression (<10), secondary suppression, and dominance testing.',
      whereAIModelsAndAgentsSit: 'Agent-generated responses and trained model checkpoints exiting the enclave must pass Safe Output verification: memorization tests, prompt leakage checks, differential privacy proofs, and DCB0129 Clinical Hazard Log sign-off.',
      metadataConstraints: [
        'Airlock verification status: tre:AirlockStatus Approved',
        'No direct row or microdata verbatim reproduction in agent context',
        'DCB0129 Clinical Safety Officer (CSO) sign-off for algorithmic outputs',
        'Two-person rule: Independent human reviewer sign-off before export'
      ],
      enforcementMechanism: 'sdc_shapes.ttl automated validation + Airlock human-in-the-loop dual-authorization portal.'
    },
    {
      pillar: 'Safe Projects',
      subtitle: 'Ethical Purpose & Task Bounding',
      whereDataAssetsSit: 'Data assets can only be queried if explicitly included in the project\'s approved Research Ethics Committee (REC) protocol and Data Sharing Agreement (DSA).',
      whereAIModelsAndAgentsSit: 'The AI agent cannot initiate open-ended exploration or cross-dataset linkage. Its task boundary is hard-pinned to the approved project hypothesis. Unapproved multi-hop dataset joining triggers automatic PDP denial.',
      metadataConstraints: [
        'Demonstrable public benefit verification (Caldicott Principle 1)',
        'Approved dataset whitelist: tre:authorizedDataset <URI>',
        'Task scope specification: tre:ProjectScope "Descriptive Epidemiology"',
        'Expiry date verification on research approvals'
      ],
      enforcementMechanism: 'Graph SPARQL ASK queries evaluating project boundary triples against session parameters.'
    }
  ],

  stanfordFrameworkPrinciples: [
    {
      title: 'Automated, Near-Instantaneous Identity Revocation',
      stanfordRequirement: 'Section 1.1: "The identity must be revocable in an automated, near-instantaneous manner... Long-lived credentials or API keys are strictly prohibited for Internal Workflow or External-Facing Agents."',
      treImplementation: 'Agent tokens are generated via an internal OAuth2/OIDC STS with a maximum 120-minute TTL. A centralized Policy Enforcement Point (PEP) maintains an active revocation list; any anomaly detection trigger terminates the agent session within 500ms.',
      policyAsCodePattern: 'OPA Rule: token.exp <= time.now_ns() + 7200000000000 && !revocation_list[token.jti]'
    },
    {
      title: 'Blast Radius Containment & Read-Only Confinement',
      stanfordRequirement: 'Section 2.3: "Agents must operate within a strictly defined blast radius. Direct write access to systems of record is prohibited; actions must take place on staged, reversible, or read-only resources."',
      treImplementation: 'Agent MCP database tools (mcp:ExecuteSQL) are statically bound to a read-only database user. Data transformation pipelines write only to ephemeral user scratch schemas, never to authoritative cohort partitions.',
      policyAsCodePattern: 'SHACL: sh:property [ sh:path mcp:allowedStatements ; sh:in ("SELECT" "EXPLAIN") ]'
    },
    {
      title: 'Mandatory Human Sponsor Accountability',
      stanfordRequirement: 'Section 3.2: "Every autonomous agent must have an identified human sponsor (Principal) who is accountable for its behavior, decisions, and system impacts."',
      treImplementation: 'Every agent workload configuration in GitOps requires an explicit `tre:sponsoredByHumanResearcher` property referencing an accredited researcher with active DSPT and ONS accreditation.',
      policyAsCodePattern: 'SHACL: sh:property [ sh:path tre:sponsoredByHumanResearcher ; sh:minCount 1 ; sh:class tre:AccreditedResearcher ]'
    },
    {
      title: 'Bounded Tool Inventory & Zero External Telemetry',
      stanfordRequirement: 'Section 4.1: "Toolsets exposed to agents must be minimal and statically declared. Agents must not dynamically discover or load arbitrary network protocols."',
      treImplementation: 'Enclave containers run in an isolated VPC with external DNS sinkholed. Coding assistants (Cline/Cursor/Copilot) are configured with local in-enclave inference endpoints (vLLM) and prompt sanitizers.',
      policyAsCodePattern: 'Calico NetworkPolicy: egress [ to: { ipBlock: "10.240.0.0/16" } ] (Private Enclave CIDR only)'
    }
  ],

  stanfordRiskTiers: [
    {
      id: 'low',
      name: 'Low Risk Agentic Workflow',
      stanfordSectionRef: 'Stanford UIT Tier 1 (Low)',
      autonomyLevel: 'Assistive / Deterministic Guidance',
      targetDataSensitivity: 'Public & Metadata Only (Data dictionaries, synthetic toy datasets, documentation)',
      blastRadius: 'Local IDE / ephemeral memory only. Zero database or network interaction.',
      humanOversightRequirement: 'Passive researcher review of code suggestions.',
      identityAndCredentialRules: 'Standard developer workstation identity; no specialized data access tokens required.',
      permittedInTRE: true,
      pacControls: [
        'Static code formatting and linter validation',
        'Local tokenizer checks for synthetic data compliance'
      ]
    },
    {
      id: 'moderate',
      name: 'Moderate Risk Agentic Workflow',
      stanfordSectionRef: 'Stanford UIT Tier 2 (Moderate)',
      autonomyLevel: 'Semi-Autonomous Analytics Assistant',
      targetDataSensitivity: 'De-identified Aggregate Data ($k \\ge 10$) & Synthetic Cohorts',
      blastRadius: 'Read-only access to pre-computed aggregate tables and synthetic patient tables.',
      humanOversightRequirement: 'Human review of synthesized analysis plans before pipeline execution.',
      identityAndCredentialRules: 'Project-scoped workload tokens with 8-hour maximum duration; tied to researcher project ID.',
      permittedInTRE: true,
      pacControls: [
        'OPA verification of aggregate-only database permissions',
        'Audit logging of all generated SQL queries to PROV-O ledger'
      ]
    },
    {
      id: 'high',
      name: 'High Risk Agentic Workflow',
      stanfordSectionRef: 'Stanford UIT Section 8702 (High Risk)',
      stanfordSectionUrl: 'https://uit.stanford.edu/security/agenticai/riskclassifications#section_8702',
      autonomyLevel: 'Autonomous Multi-Step Query & Feature Pipeline Execution',
      targetDataSensitivity: 'Pseudonymised Patient-Level Microdata (Tier 2 Pseudonymised / HES / Longitudinal Cohorts)',
      blastRadius: 'Read-only access to pseudonymised database views. Scratch disk write access for analytical outputs.',
      humanOversightRequirement: 'Mandatory Human-in-the-Loop (HITL) pre-execution sign-off for each analytical query plan.',
      identityAndCredentialRules: 'Short-lived workload token (max 120 minutes); automated instantaneous revocation capability; explicit human sponsor linkage.',
      permittedInTRE: true,
      pacControls: [
        'SHACL enforcement of tre:sponsoredByHumanResearcher with active accreditation',
        'OPA blocking of all non-SELECT SQL statements and wildcards (*)',
        'Prompt sanitization PEP scrubbing quasi-identifiers prior to LLM inference',
        'Automatic token severing if query exceeds 500 rows returned'
      ]
    },
    {
      id: 'very-high',
      name: 'Very High Risk Agentic Workflow',
      stanfordSectionRef: 'Stanford UIT Section 8938 (Very High Risk)',
      stanfordSectionUrl: 'https://uit.stanford.edu/security/agenticai/riskclassifications#section_8938',
      autonomyLevel: 'Autonomous Data Ingestion, Cross-Registry Linkage, or Egress Dispatch',
      targetDataSensitivity: 'Identifiable / Section 251 Health Data, Genomic BAM/VCF Files, or Re-identification Surfaces',
      blastRadius: 'Potential enterprise-wide data disclosure or regulatory breach if compromised.',
      humanOversightRequirement: 'Autonomous execution is STRICTLY PROHIBITED. Requires dual-investigator cryptographic sign-off and Caldicott Guardian approval.',
      identityAndCredentialRules: 'Autonomous machine tokens barred. Operations must be executed interactively by an authenticated human.',
      permittedInTRE: false,
      pacControls: [
        'Hard PDP denial: opa.deny = true for autonomous agent invocations against Tier 3 data',
        'Immediate security alert dispatched to Enclave Operations on invocation attempt',
        'Mandatory airlock review for any model weights trained on very high risk assets'
      ]
    }
  ],

  pacExamples: [
    {
      title: 'SHACL Shape: Enforcing AI Workload Non-Personhood & Mandatory Human Sponsor',
      language: 'turtle',
      code: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/wavebound/tre#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# An AI Agent is an AgenticWorkload, NOT a SafePerson.
# It MUST declare a verified Human Sponsor and an automated revocation endpoint.
tre:AgenticWorkloadShape a sh:NodeShape ;
    sh:targetClass tre:AgenticWorkload ;
    
    # 1. Structural denial: AI cannot be instantiated as a tre:SafePerson
    sh:not [
        sh:class tre:SafePerson ;
        sh:message "Governance Violation: AI Agent cannot be accredited as a SafePerson. AI lacks legal personhood and statutory liability under DEA 2017." ;
    ] ;
    
    # 2. Mandatory Accredited Human Sponsor
    sh:property [
        sh:path tre:sponsoredByHumanResearcher ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:class tre:AccreditedResearcher ;
        sh:message "Stanford Principle: AI workloads must be directly sponsored by a legally accredited human researcher." ;
    ] ;
    
    # 3. Automated Revocation Capability (Stanford UIT Requirement)
    sh:property [
        sh:path tre:revocationEndpoint ;
        sh:minCount 1 ;
        sh:datatype xsd:anyURI ;
        sh:message "Stanford UIT Requirement: Workload identity must possess an automated, near-instantaneous revocation endpoint." ;
    ] ;
    
    # 4. Token Ephemerality (Max TTL 7200 seconds / 2 hours)
    sh:property [
        sh:path tre:tokenTTLSeconds ;
        sh:maxInclusive 7200 ;
        sh:message "Security Policy: Agent session tokens cannot exceed 2 hours TTL." ;
    ] .`,
      explanation: 'Enforces that any AI workload entity explicitly declares an accredited human sponsor and an instant revocation URI, while rejecting any attempt to classify the AI model itself as a Safe Person.'
    },
    {
      title: 'OPA Rego Policy: Near-Instantaneous Token Revocation & Read-Only Confinement',
      language: 'rego',
      code: `package tre.agentic.authz

import future.keywords.in

default allow = false

# Allow agent query only if all Stanford UIT constraints are satisfied:
allow {
    # 1. Verify caller is an active workload identity
    input.subject.type == "agentic_workload"
    
    # 2. Verify human sponsor has active DEA 2017 accreditation
    sponsor := data.researchers[input.subject.sponsor_id]
    sponsor.accreditation_valid == true
    sponsor.ig_training_expiry >= time.now_ns()
    
    # 3. Stanford Rule: Verify token is not in near-instantaneous revocation list
    not data.revoked_tokens[input.token.jti]
    
    # 4. Enforce Token Expiry (short-lived TTL)
    input.token.exp >= time.now_ns()
    
    # 5. Blast Radius: Restrict database tool statements to read-only
    input.action.tool == "mcp:ExecuteSQL"
    input.action.sql_statement_type in ["SELECT", "EXPLAIN"]
    
    # 6. Row limit containment (prevent microdata mass extraction)
    input.action.row_limit <= 500
}

# Reason string for PDP audit logging
reason = "Agent denied: revoked token, missing human sponsor, or destructive SQL statement." {
    not allow
}`,
      explanation: 'Compiles the Stanford UIT principles into real-time Open Policy Agent admission controls. The PDP validates that the token has not been revoked, the sponsor is active, and the tool call is strictly non-destructive.'
    }
  ]
};
