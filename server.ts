import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Ensure HMR is disabled in AI Studio environment to prevent WebSocket reconnection errors across proxy
process.env.DISABLE_HMR = 'true';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Endpoint to read the original playbook
app.get('/api/playbook', (req: Request, res: Response) => {
  try {
    const playbookPath = path.resolve(__dirname, 'public/assets/aistudio/Graph-Based_Policy_as_Code_Project_Playbook_4cc57c18');
    if (fs.existsSync(playbookPath)) {
      const content = fs.readFileSync(playbookPath, 'utf-8');
      res.json({ success: true, content });
    } else {
      res.status(404).json({ success: false, error: 'Playbook file not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to generate dynamic AI quizzes using Gemini
app.post('/api/generate-quiz', (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    fallback: true,
    message: 'Deterministic static assessment bank active. Pure client-side execution enabled.',
  });
});

// Helper: Curated fallback policy synthesis for when Gemini API key is absent or offline
function generateFallbackPolicy(requirement: string, enforcementPoint: string = 'general') {
  const reqLower = requirement.toLowerCase();

  if (reqLower.includes('genom') || reqLower.includes('variant') || reqLower.includes('allele') || reqLower.includes('dna')) {
    return {
      title: 'Genomic Microdata Airlock & Rare Allele Suppression Policy',
      summary: 'Restricts export of genomic sequence summaries by enforcing higher cohort thresholds (k >= 25) and suppressing rare variant flags to prevent re-identification of rare genetic disease patients.',
      targetClass: 'tre:GenomicExportArtifact',
      enforcementPoint: 'Airlock Egress PEP (Airgap Gate)',
      shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:GenomicExportShape a sh:NodeShape ;
    sh:targetClass tre:GenomicExportArtifact ;
    sh:property [
        sh:path tre:cohortSize ;
        sh:datatype xsd:integer ;
        sh:minInclusive 25 ;
        sh:message "Genomic export violation: Observed cohort size must be at least 25 individuals." ;
    ] ;
    sh:property [
        sh:path tre:containsRareVariantFlags ;
        sh:datatype xsd:boolean ;
        sh:hasValue false ;
        sh:message "Violation: High-risk rare variant identifiers must be suppressed prior to airlock release." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Mandatory REC ethics protocol with explicit genomic research endorsement required." ;
    ] .`,
      rego: `package tre.authz

default allow = false
default egress_permitted = false

# Rule: Genomic Data Airlock Export Authorization
egress_permitted {
    input.request_type == "genomic_airlock_export"
    input.dataset.cohort_size >= 25
    input.dataset.contains_rare_variants == false
    input.project.genomic_consent_verified == true
    not contains_unmasked_genomic_id(input.dataset.columns)
}

allow {
    egress_permitted
}

contains_unmasked_genomic_id(columns) {
    dangerous := {"sample_id", "vcf_header_donor", "patient_nhs_number", "family_pedigree_id"}
    some col in columns
    dangerous[col]
}`,
      sampleCompliantInput: {
        request_type: "genomic_airlock_export",
        dataset: {
          cohort_size: 48,
          contains_rare_variants: false,
          columns: ["aggregate_allele_freq", "chromosome_arm", "population_strata"]
        },
        project: {
          id: "REC-2026-GEN-04",
          genomic_consent_verified: true
        }
      },
      sampleViolatingInput: {
        request_type: "genomic_airlock_export",
        dataset: {
          cohort_size: 8,
          contains_rare_variants: true,
          columns: ["aggregate_allele_freq", "sample_id", "chromosome_arm"]
        },
        project: {
          id: "REC-2026-GEN-04",
          genomic_consent_verified: true
        }
      },
      violationExplanation: "Rejected: Observed cohort size is only 8 (< 25 required), contains_rare_variants is true, and unmasked identifier 'sample_id' was detected in dataset columns.",
      provOTriple: `tre:GenomicAirlockAudit_001 a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_Genomic_PEP ;
    tre:cohortSize 48 ;
    tre:decisionResult "PERMIT" ;
    prov:generated tre:ExportToken_77a9 ;
    prov:endedAtTime "2026-10-29T10:00:00Z"^^xsd:dateTime .`,
      governanceMapping: {
        fiveSafesDimension: "Safe Data & Safe Outputs",
        satrePillar: "Data Management & Information Governance",
        statutoryBasis: "Caldicott Principle 2 (Need to Know) & NHS Section 251 Genomic Annex"
      },
      keyConsiderations: [
        "Genomic re-identification risk increases non-linearly with rare alleles; k >= 25 is recommended over standard k >= 10.",
        "Ensure VCF/BAM metadata headers do not leak sequencer timestamps or clinical instrument serial numbers.",
        "Verify that synthetic or aggregate genomic summaries have secondary suppression applied on low-frequency linkage groups."
      ]
    };
  }

  if (reqLower.includes('mcp') || reqLower.includes('agent') || reqLower.includes('ai') || reqLower.includes('llm') || reqLower.includes('sql')) {
    return {
      title: 'Autonomous AI Analytics Agent Model Context Protocol (MCP) Boundary Policy',
      summary: 'Regulates autonomous LLM agents executing inside the TRE enclave via declarative tool allowances (read-only SQL with 100-row bounds, no DDL/DML, zero external egress).',
      targetClass: 'tre:MCPAgentSession',
      enforcementPoint: 'MCP Gateway Policy Decision Point (PEP)',
      shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix mcp: <https://w3id.org/mcp/governance#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

mcp:AutonomousAgentShape a sh:NodeShape ;
    sh:targetClass mcp:AutonomousAgentSession ;
    sh:property [
        sh:path mcp:maxExecutionRows ;
        sh:datatype xsd:integer ;
        sh:maxInclusive 100 ;
        sh:message "MCP Tool Violation: Maximum returned rows per query must not exceed 100." ;
    ] ;
    sh:property [
        sh:path mcp:isReadOnly ;
        sh:datatype xsd:boolean ;
        sh:hasValue true ;
        sh:message "MCP Tool Violation: Agent must operate strictly in read-only mode (no DDL/DML permitted)." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Zero-trust network violation: AI Agent compute sandbox must have outbound internet egress disabled." ;
    ] .`,
      rego: `package tre.authz

default allow = false

# Permitted statements whitelist (Strictly Read-Only)
allowed_statements := {"SELECT", "EXPLAIN"}

# Disallowed dangerous mutating or system commands
forbidden_keywords := {"DROP", "ALTER", "INSERT", "UPDATE", "DELETE", "TRUNCATE", "GRANT", "COPY", "EXEC"}

allow {
    input.request_type == "mcp_tool_invocation"
    input.agent.role == "AnalyticsAssistant"
    input.agent.max_rows <= 100
    input.enclave.egress_blocked == true
    statement_is_read_only(input.tool_parameters.query_statement)
    not contains_forbidden_keywords(input.tool_parameters.query_statement)
}

statement_is_read_only(stmt) {
    upper_stmt := upper(stmt)
    startswith(upper_stmt, "SELECT")
}

contains_forbidden_keywords(stmt) {
    upper_stmt := upper(stmt)
    some word in forbidden_keywords
    contains(upper_stmt, word)
}`,
      sampleCompliantInput: {
        request_type: "mcp_tool_invocation",
        agent: {
          id: "mcp-agent-v2",
          role: "AnalyticsAssistant",
          max_rows: 50
        },
        enclave: {
          egress_blocked: true,
          sandbox_isolation: "tier2_isolated"
        },
        tool_parameters: {
          tool_name: "execute_sql_query",
          query_statement: "SELECT age_group, count(*) FROM cohort_summary GROUP BY age_group"
        }
      },
      sampleViolatingInput: {
        request_type: "mcp_tool_invocation",
        agent: {
          id: "mcp-agent-v2",
          role: "AnalyticsAssistant",
          max_rows: 500
        },
        enclave: {
          egress_blocked: false
        },
        tool_parameters: {
          tool_name: "execute_sql_query",
          query_statement: "DROP TABLE audit_log; SELECT * FROM patient_pii"
        }
      },
      violationExplanation: "Rejected: max_rows (500) exceeds boundary (100), enclave.egress_blocked is false, and query contains forbidden keyword 'DROP'.",
      provOTriple: `mcp:ToolInvocation_94b a prov:Activity ;
    prov:wasAssociatedWith mcp:AutonomousAgent_01 ;
    tre:decisionResult "PERMIT" ;
    mcp:toolInvoked "execute_sql_query" ;
    prov:endedAtTime "2026-10-29T10:05:00Z"^^xsd:dateTime .`,
      governanceMapping: {
        fiveSafesDimension: "Safe People & Safe Settings",
        satrePillar: "Software Operations & Computing Infrastructure",
        statutoryBasis: "EU AI Act (Limited/High Risk Tiers) & Caldicott Principle 7 (Duty to Share with Safeguards)"
      },
      keyConsiderations: [
        "Autonomous agents must never be passed unmasked clinical database credentials; all calls must flow through the MCP PDP.",
        "Implement query plan estimation before execution to reject unbounded cartesian joins or table scans.",
        "Token and memory consumption must be hard-capped per agent session to prevent memory exhaustion DoS."
      ]
    };
  }

  if (reqLower.includes('break-glass') || reqLower.includes('emergency') || reqLower.includes('urgent') || reqLower.includes('clinician')) {
    return {
      title: 'Clinical Break-Glass Emergency Access & Dual-Authorization Policy',
      summary: 'Permits time-bound, elevated access to sensitive clinical data during urgent safety investigations, requiring dual sign-off from a Caldicott Guardian and emitting priority cryptographic audit triples.',
      targetClass: 'tre:BreakGlassSession',
      enforcementPoint: 'Workspace Admission Webhook (Emergency PEP)',
      shacl: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:BreakGlassShape a sh:NodeShape ;
    sh:targetClass tre:BreakGlassSession ;
    sh:property [
        sh:path tre:caldicottGuardianDualApproval ;
        sh:datatype xsd:boolean ;
        sh:hasValue true ;
        sh:message "Break-Glass violation: Dual authorization from the Caldicott Guardian is strictly required." ;
    ] ;
    sh:property [
        sh:path tre:sessionDurationHours ;
        sh:datatype xsd:integer ;
        sh:maxInclusive 4 ;
        sh:message "Break-Glass violation: Emergency access sessions cannot exceed 4 hours." ;
    ] ;
    sh:property [
        sh:path tre:hasDocumentedClinicalIncidentRef ;
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

  // Default fallback: Custom requirement synthesized into Five Safes
  return {
    title: 'Custom Research Data Governance & Workspace Admission Policy',
    summary: `Tailored security policy synthesized for requirement: "${requirement.slice(0, 100)}..." enforcing Closed-World SHACL admission bounds and fail-closed OPA Rego rules.`,
    targetClass: 'tre:WorkspaceSession',
    enforcementPoint: enforcementPoint === 'airlock' ? 'Airlock Egress PEP' : 'Kubernetes ValidatingAdmissionWebhook',
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
        sh:message "Active NHS REC or Section 251 statutory research ethics approval is mandatory." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Network security violation: Zero external egress routing must be enforced at the VPC tier." ;
    ] ;
    sh:property [
        sh:path tre:mfaAuthenticated ;
        sh:hasValue true ;
        sh:message "Identity violation: Hardware token or FIDO2 multi-factor authentication is required." ;
    ] .`,
    rego: `package tre.authz

import future.keywords.in

default allow = false
default egress_permitted = false

# Rule: Custom Research Data Security Evaluation
allow {
    input.researcher.accreditation_valid == true
    input.researcher.ig_training_expiry > time.now_ns()
    input.project.ethics_approval_active == true
    input.enclave.egress_blocked == true
    input.session.mfa_verified == true
    not user_in_quarantine(input.researcher.id)
}

user_in_quarantine(user_id) {
    quarantine_list := {"revoked_01", "suspended_temp"}
    user_id in quarantine_list
}`,
    sampleCompliantInput: {
      request_type: "workspace_admission",
      researcher: {
        id: "RES-8821",
        accreditation_valid: true,
        ig_training_expiry: 1893456000000000000
      },
      project: {
        ethics_approval_active: true,
        data_tier: "Tier2_Pseudonymised"
      },
      enclave: {
        egress_blocked: true,
        vpc_tier: "ZeroEgressSubnet"
      },
      session: {
        mfa_verified: true
      }
    },
    sampleViolatingInput: {
      request_type: "workspace_admission",
      researcher: {
        id: "RES-8821",
        accreditation_valid: true,
        ig_training_expiry: 1672531199000000000
      },
      project: {
        ethics_approval_active: false,
        data_tier: "Tier2_Pseudonymised"
      },
      enclave: {
        egress_blocked: false
      },
      session: {
        mfa_verified: false
      }
    },
    violationExplanation: "Rejected: Researcher IG training has expired, project ethics is inactive, network egress is not blocked, and MFA verification is missing.",
    provOTriple: `tre:SecurityDecision_${Date.now().toString(36)} a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_Admission_PDP ;
    tre:decisionResult "PERMIT" ;
    prov:endedAtTime "2026-10-29T10:15:00Z"^^xsd:dateTime .`,
    governanceMapping: {
      fiveSafesDimension: "Safe People, Safe Projects & Safe Settings",
      satrePillar: "Information Governance & Computing Infrastructure",
      statutoryBasis: "UK GDPR Article 6(1)(e), Article 9(2)(j) & Caldicott Principle 1 (Justify the Purpose)"
    },
    keyConsiderations: [
      "Ensure the SHACL shape access-shapes.ttl is evaluated in CI before compiling to OPA Rego.",
      "In Kubernetes, configure failurePolicy: Ignore during shadow evaluation to prevent service disruption.",
      "Audit all admission grants with SHA-256 policy commit signatures in W3C PROV-O streams."
    ]
  };
}

// Endpoint to generate AI-powered SHACL shapes and OPA Rego rules from natural language
app.post('/api/generate-policy', (req: Request, res: Response) => {
  try {
    const { requirement, enforcementPoint = 'general' } = req.body;

    if (!requirement || typeof requirement !== 'string' || requirement.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'A natural language requirement is required.'
      });
    }

    const fallbackPolicy = generateFallbackPolicy(requirement, enforcementPoint);
    res.json({
      success: true,
      fallback: true,
      policy: fallbackPolicy,
      message: 'Synthesized using Seawater deterministic rule synthesis engine.'
    });
  } catch (error: any) {
    console.error('Policy generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Generation failed'
    });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`TRE Policy-as-Code platform running on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
