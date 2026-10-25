export interface GraphNodeData {
  id: string;
  label: string;
  category: 'Policy' | 'Shape' | 'Rule' | 'Tool' | 'Pillar' | 'Dimension' | 'Artifact';
  tier: 'Policy Layer' | 'SHACL Constraint Layer' | 'OPA Rego Layer' | 'Audit Layer';
  title: string;
  description: string;
  fullDefinition: string;
  sourceFile: string;
  codeSnippet?: string;
  glossaryTermId?: string;
  conceptModuleId?: string;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship: string;
}

export interface GraphNodeElement {
  data: GraphNodeData;
  position?: { x: number; y: number };
}

export const GRAPH_ELEMENTS: GraphNodeElement[] = [
  // --- TIER 1: POLICY & GOVERNANCE LAYER (y: 60) ---
  {
    data: {
      id: 'pol_FiveSafes',
      label: 'tre:FiveSafesFramework',
      title: 'Five Safes Governance Core',
      category: 'Dimension',
      tier: 'Policy Layer',
      description: 'Foundational framework mapping clinical data governance, ethics approvals, and operational tiers.',
      fullDefinition: 'Formalized in ontology/tre-core.ttl as the root governance dimension aligning NHS Caldicott Principles, UK GDPR, and SATRE standards across People, Projects, Settings, Data, and Outputs.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'five-safes',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:FiveSafesDimension a owl:Class .

tre:SafePerson rdfs:subClassOf tre:FiveSafesDimension .
tre:SafeSetting rdfs:subClassOf tre:FiveSafesDimension .`
    },
    position: { x: 80, y: 70 }
  },
  {
    data: {
      id: 'pol_SafePerson',
      label: 'tre:SafePerson',
      title: 'Safe Person Policy',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'Mandatory researcher institutional accreditation and verified annual NHS Information Governance (IG) training.',
      fullDefinition: 'Mandates that any researcher accessing clinical records must hold verified institutional affiliation, have undergone Caldicott-aligned IG training, and hold a valid digital identity.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'safe-person',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:SafePerson a owl:Class ;
    tre:requiresAccreditation true ;
    tre:requiresAnnualIGTraining true .`
    },
    position: { x: 220, y: 70 }
  },
  {
    data: {
      id: 'pol_SafeProject',
      label: 'tre:SafeProject',
      title: 'Safe Project & Ethics Policy',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'Policy requiring NHS REC ethics approval, Section 251 exemption, and demonstrative public benefit.',
      fullDefinition: 'Requires that the research protocol is approved by an independent NHS Research Ethics Committee (REC) and has an approved legal basis under UK GDPR Articles 6(1)(e) and 9(2)(j).',
      sourceFile: 'ontology/governance_core.ttl',
      glossaryTermId: 'safe-project',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:SafeProject a owl:Class ;
    tre:hasEthicsApproval true ;
    tre:legalBasis "UK_GDPR_Art9_2_j" .`
    },
    position: { x: 360, y: 70 }
  },
  {
    data: {
      id: 'pol_SafeSetting',
      label: 'tre:SafeSetting',
      title: 'Safe Setting & Enclave Isolation',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'Policy requiring zero external internet egress and microsegmented VPC computing enclaves.',
      fullDefinition: 'Mandates that researcher computing nodes run inside egress-disabled subnets with blocked external routing, prohibiting direct outbound internet connections and USB exfiltration.',
      sourceFile: 'ontology/tre-core.ttl',
      glossaryTermId: 'safe-setting',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:SafeSetting a owl:Class ;
    tre:enclaveEgressBlocked true ;
    tre:networkIsolationTier "ZeroEgressVPC" .`
    },
    position: { x: 500, y: 70 }
  },
  {
    data: {
      id: 'pol_SafeData',
      label: 'tre:SafeData',
      title: 'Safe Data & Clinical Tiering',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'Policy partitioning hospital records into sensitivity tiers (Tier 1 Aggregate, Tier 2 Pseudonymous, Tier 3 s251).',
      fullDefinition: 'Classifies data into hospital operational tiers and ensures all direct identifiers (NHS number, name, DOB) are scrubbed before reaching research enclaves.',
      sourceFile: 'ontology/governance_core.ttl',
      glossaryTermId: 'safe-data',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:SafeData a owl:Class ;
    tre:hospitalDataTier "Tier2_Pseudonymised" ;
    tre:directIdentifiersExcluded true .`
    },
    position: { x: 640, y: 70 }
  },
  {
    data: {
      id: 'pol_SafeOutput',
      label: 'tre:SafeOutput',
      title: 'Safe Output & SDC Policy',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'Mandatory Statistical Disclosure Control (SDC) thresholds for all tabular, model, and graph exports.',
      fullDefinition: 'Governs airlock releases, requiring that every published table or model pass primary cell suppression (k >= 10) and dominance rules (<= 80%) under standard clinical research governance.',
      sourceFile: 'ontology/sdc_rules.ttl',
      glossaryTermId: 'safe-output',
      conceptModuleId: 'quantitative-sdc',
      codeSnippet: `tre:SafeOutput a owl:Class ;
    tre:mandatesPrimarySuppression true ;
    tre:mandatesDominanceCheck true .`
    },
    position: { x: 780, y: 70 }
  },
  {
    data: {
      id: 'pol_AIAgent',
      label: 'mcp:AnalyticsAgent',
      title: 'Autonomous AI Agent Policy',
      category: 'Policy',
      tier: 'Policy Layer',
      description: 'EU AI Act Limited Risk classification and Model Context Protocol (MCP) tool bounds for LLM agents.',
      fullDefinition: 'Establishes governance boundaries for autonomous code and analytics agents, constraining them to read-only queries and mandatory airlock SDC verification.',
      sourceFile: 'ontology/agent_mcp.ttl',
      glossaryTermId: 'eu-ai-act',
      conceptModuleId: 'ai-mcp-governance',
      codeSnippet: `mcp:AnalyticsAgent a owl:Class ;
    mcp:maxRiskTier "LimitedRisk" ;
    mcp:prohibitUnboundedEgress true .`
    },
    position: { x: 920, y: 70 }
  },

  // --- TIER 2: SHACL CONSTRAINT & VALIDATION LAYER (y: 220) ---
  {
    data: {
      id: 'shacl_WorkspaceAdmission',
      label: 'sh:WorkspaceAdmissionShape',
      title: 'Workspace Admission Shape (CWA)',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      description: 'Closed-World SHACL shape validating researcher accreditation, ethics approval, and egress status.',
      fullDefinition: 'Translates the Open-World Assumption (OWA) into deterministic Closed-World validation. Any missing attribute causes immediate validation failure before cluster admission.',
      sourceFile: 'ontology/shapes/access-shapes.ttl',
      glossaryTermId: 'shacl',
      conceptModuleId: 'owa-to-cwa-shacl',
      codeSnippet: `tre:WorkspaceAdmissionShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasAccreditedResearcher ;
        sh:minCount 1 ;
        sh:message "Session must be bound to an accredited researcher." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Active NHS REC approval is mandatory." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Enclave networking must have external egress blocked." ;
    ] .`
    },
    position: { x: 300, y: 220 }
  },
  {
    data: {
      id: 'shacl_DataTierShape',
      label: 'sh:ClinicalDataTierShape',
      title: 'Clinical Data Tiering Shape',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      description: 'Validates that data assets mapped to sessions match the ethics protocol tier and exclude direct identifiers.',
      fullDefinition: 'Ensures that Tier 2 datasets have direct identifiers stripped and that Tier 3 records have explicit NHS Section 251 statutory authorization.',
      sourceFile: 'ontology/shapes/access-shapes.ttl',
      glossaryTermId: 'data-tiers',
      conceptModuleId: 'five-safes',
      codeSnippet: `tre:ClinicalDataTierShape a sh:NodeShape ;
    sh:targetClass tre:DataAsset ;
    sh:property [
        sh:path tre:directIdentifiersExcluded ;
        sh:hasValue true ;
        sh:message "Direct patient identifiers must be stripped before enclave loading." ;
    ] .`
    },
    position: { x: 520, y: 220 }
  },
  {
    data: {
      id: 'shacl_SDCOutput',
      label: 'sh:SDCOutputShape',
      title: 'SDC Quantitative Airlock Shape',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      description: 'Quantitative SHACL constraints enforcing k >= 10 and dominance ratio <= 0.80.',
      fullDefinition: 'Validates candidate tabular export graphs, verifying that every cell count satisfies minInclusive 10 and maxInclusive 0.80 dominance ratio.',
      sourceFile: 'ontology/shapes/sdc_shapes.ttl',
      glossaryTermId: 'primary-suppression',
      conceptModuleId: 'quantitative-sdc',
      codeSnippet: `tre:AirlockOutputShape a sh:NodeShape ;
    sh:targetClass tre:ExportArtifact ;
    sh:property [
        sh:path tre:minObservedCellCount ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Primary cell suppression violation: k must be >= 10." ;
    ] ;
    sh:property [
        sh:path tre:topContributorDominanceRatio ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 0.80 ;
        sh:message "Dominance violation: top contributor must not exceed 80%." ;
    ] .`
    },
    position: { x: 740, y: 220 }
  },
  {
    data: {
      id: 'shacl_MCPToolBoundaries',
      label: 'sh:MCPToolBoundaryShape',
      title: 'MCP Agent Tool Boundary Shape',
      category: 'Shape',
      tier: 'SHACL Constraint Layer',
      description: 'SHACL constraints restricting agent tools to read-only queries and capped result sets.',
      fullDefinition: 'Validates that agent tool invocations only target approved methods (execute_sql_query, export_summary) with read-only statement whitelists.',
      sourceFile: 'ontology/agent_mcp.ttl',
      glossaryTermId: 'mcp-sql',
      conceptModuleId: 'ai-mcp-governance',
      codeSnippet: `tre:MCPToolShape a sh:NodeShape ;
    sh:targetClass mcp:MCPTool ;
    sh:property [
        sh:path mcp:allowedStatements ;
        sh:in ( "SELECT" "EXPLAIN" ) ;
    ] ;
    sh:property [
        sh:path mcp:maxRowsReturned ;
        sh:maxInclusive 500 ;
    ] .`
    },
    position: { x: 920, y: 220 }
  },

  // --- TIER 3: OPA REGO RUNTIME ENFORCEMENT LAYER (y: 370) ---
  {
    data: {
      id: 'opa_AdmissionRule',
      label: 'opa:tre.authz/allow',
      title: 'OPA Admission PDP Rule',
      category: 'Rule',
      tier: 'OPA Rego Layer',
      description: 'Compiled Rego rule evaluated by Kubernetes Admission Webhooks in microseconds.',
      fullDefinition: 'Compiled directly by compiler/rdf_to_rego.py from tre:WorkspaceAdmissionShape. Intercepts pod creation and returns allow=true only when all Five Safes checks pass.',
      sourceFile: 'security/opa/authz.rego',
      glossaryTermId: 'rego',
      conceptModuleId: 'opa-rego-compilation',
      codeSnippet: `package tre.authz
default allow = false

allow {
    input.researcher.accreditation_valid == true
    input.researcher.ig_training_expiry > time.now_ns()
    input.project.ethics_approval_active == true
    input.enclave.egress_blocked == true
}`
    },
    position: { x: 410, y: 370 }
  },
  {
    data: {
      id: 'opa_AirlockRule',
      label: 'opa:tre.authz/egress_permitted',
      title: 'OPA Egress Airlock PDP Rule',
      category: 'Rule',
      tier: 'OPA Rego Layer',
      description: 'Compiled Rego rule verifying SDC thresholds (k >= 10, dominance <= 80%) at airlock gate.',
      fullDefinition: 'Evaluated by the secure airlock microservice when researchers request export. Inspects tabular cell counts and blocks any output violating disclosure limits.',
      sourceFile: 'security/opa/authz.rego',
      glossaryTermId: 'sdc',
      conceptModuleId: 'opa-rego-compilation',
      codeSnippet: `default egress_permitted = false

egress_permitted {
    input.request_type == "airlock_export"
    input.dataset.min_cell_count >= 10
    input.dataset.max_dominance_ratio <= 0.80
    not any_unmasked_pii(input.dataset.columns)
}`
    },
    position: { x: 740, y: 370 }
  },
  {
    data: {
      id: 'opa_MCPAuthzRule',
      label: 'opa:tre.authz/mcp_tool_permitted',
      title: 'OPA Agent Tool PDP Rule',
      category: 'Rule',
      tier: 'OPA Rego Layer',
      description: 'Intercepts MCP JSON-RPC tool calls from LLM agents to enforce read-only execution.',
      fullDefinition: 'Validates that autonomous agent requests do not contain DROP/ALTER statements and stay within memory and token quotas.',
      sourceFile: 'security/opa/authz.rego',
      glossaryTermId: 'mcp',
      conceptModuleId: 'ai-mcp-governance',
      codeSnippet: `mcp_tool_permitted {
    input.agent.risk_tier == "LimitedRisk"
    input.tool_name == "execute_sql_query"
    input.query_type in {"SELECT", "EXPLAIN"}
    input.requested_limit <= 500
}`
    },
    position: { x: 920, y: 370 }
  },

  // --- TIER 4: AUDIT & PROVENANCE LAYER (y: 500) ---
  {
    data: {
      id: 'provo_AuditTriple',
      label: 'prov:Activity (Audit Log)',
      title: 'W3C PROV-O Append-Only Audit',
      category: 'Artifact',
      tier: 'Audit Layer',
      description: 'Immutable RDF provenance triple emitted on every authorization grant or denial.',
      fullDefinition: 'Records who accessed what, when, under which policy version, and with what PDP decision in an append-only cryptographic ledger.',
      sourceFile: 'compiler/rdf_to_rego.py',
      glossaryTermId: 'provo',
      conceptModuleId: 'architecture-gitops-roadmap',
      codeSnippet: `tre:AdmissionEvent a prov:Activity ;
    prov:wasAssociatedWith tre:OPA_Admission_PDP ;
    prov:startedAtTime "2026-10-24T12:00:00Z"^^xsd:dateTime ;
    tre:decisionResult "ALLOW" ;
    tre:policyHash "sha256:7f83b165..." .`
    },
    position: { x: 600, y: 500 }
  }
];

export const GRAPH_EDGES: { data: GraphEdgeData }[] = [
  // --- Tier 1 Dimension Links ---
  {
    data: {
      id: 'e_fivesafes_person',
      source: 'pol_FiveSafes',
      target: 'pol_SafePerson',
      label: 'specifiesDimension',
      relationship: 'Formalizes dimension'
    }
  },
  {
    data: {
      id: 'e_fivesafes_project',
      source: 'pol_FiveSafes',
      target: 'pol_SafeProject',
      label: 'specifiesDimension',
      relationship: 'Formalizes dimension'
    }
  },
  {
    data: {
      id: 'e_fivesafes_setting',
      source: 'pol_FiveSafes',
      target: 'pol_SafeSetting',
      label: 'specifiesDimension',
      relationship: 'Formalizes dimension'
    }
  },
  {
    data: {
      id: 'e_fivesafes_data',
      source: 'pol_FiveSafes',
      target: 'pol_SafeData',
      label: 'specifiesDimension',
      relationship: 'Formalizes dimension'
    }
  },
  {
    data: {
      id: 'e_fivesafes_output',
      source: 'pol_FiveSafes',
      target: 'pol_SafeOutput',
      label: 'specifiesDimension',
      relationship: 'Formalizes dimension'
    }
  },

  // --- Tier 1 Policy to Tier 2 SHACL Shapes ---
  {
    data: {
      id: 'e_pol_safe_person_to_shacl',
      source: 'pol_SafePerson',
      target: 'shacl_WorkspaceAdmission',
      label: 'formalizedAsShape',
      relationship: 'Formalized into Closed-World Shape'
    }
  },
  {
    data: {
      id: 'e_pol_safe_project_to_shacl',
      source: 'pol_SafeProject',
      target: 'shacl_WorkspaceAdmission',
      label: 'formalizedAsShape',
      relationship: 'Formalized into Closed-World Shape'
    }
  },
  {
    data: {
      id: 'e_pol_safe_setting_to_shacl',
      source: 'pol_SafeSetting',
      target: 'shacl_WorkspaceAdmission',
      label: 'formalizedAsShape',
      relationship: 'Formalized into Closed-World Shape'
    }
  },
  {
    data: {
      id: 'e_pol_safe_data_to_shacl',
      source: 'pol_SafeData',
      target: 'shacl_DataTierShape',
      label: 'formalizedAsShape',
      relationship: 'Formalized into Tiering Shape'
    }
  },
  {
    data: {
      id: 'e_pol_safe_output_to_shacl',
      source: 'pol_SafeOutput',
      target: 'shacl_SDCOutput',
      label: 'formalizedAsShape',
      relationship: 'Formalized into SDC Shape'
    }
  },
  {
    data: {
      id: 'e_pol_ai_agent_to_shacl',
      source: 'pol_AIAgent',
      target: 'shacl_MCPToolBoundaries',
      label: 'governedByShape',
      relationship: 'Governed by Tool Boundary Shape'
    }
  },

  // --- Tier 2 SHACL Shapes to Tier 3 OPA Rego Rules ---
  {
    data: {
      id: 'e_shacl_admission_to_opa',
      source: 'shacl_WorkspaceAdmission',
      target: 'opa_AdmissionRule',
      label: 'compilesToRego',
      relationship: 'Compiled by rdf_to_rego.py'
    }
  },
  {
    data: {
      id: 'e_shacl_data_tier_to_opa',
      source: 'shacl_DataTierShape',
      target: 'opa_AdmissionRule',
      label: 'enforcedAtAdmission',
      relationship: 'Enforced at Pod Admission'
    }
  },
  {
    data: {
      id: 'e_shacl_sdc_to_opa',
      source: 'shacl_SDCOutput',
      target: 'opa_AirlockRule',
      label: 'compilesToRego',
      relationship: 'Compiled by rdf_to_rego.py'
    }
  },
  {
    data: {
      id: 'e_shacl_mcp_to_opa',
      source: 'shacl_MCPToolBoundaries',
      target: 'opa_MCPAuthzRule',
      label: 'compilesToRego',
      relationship: 'Compiled by rdf_to_rego.py'
    }
  },

  // --- Tier 3 OPA Rego Rules to Tier 4 PROV-O Audit Triples ---
  {
    data: {
      id: 'e_opa_admission_to_provo',
      source: 'opa_AdmissionRule',
      target: 'provo_AuditTriple',
      label: 'emitsProvenance',
      relationship: 'Emits W3C PROV-O Triple'
    }
  },
  {
    data: {
      id: 'e_opa_airlock_to_provo',
      source: 'opa_AirlockRule',
      target: 'provo_AuditTriple',
      label: 'emitsProvenance',
      relationship: 'Emits W3C PROV-O Triple'
    }
  },
  {
    data: {
      id: 'e_opa_mcp_to_provo',
      source: 'opa_MCPAuthzRule',
      target: 'provo_AuditTriple',
      label: 'emitsProvenance',
      relationship: 'Emits W3C PROV-O Triple'
    }
  }
];
