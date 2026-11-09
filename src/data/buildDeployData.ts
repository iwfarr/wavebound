/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OntologyClassItem {
  id: string;
  name: string;
  namespace: 'tre' | 'sdc' | 'agent' | 'caldicott' | 'prov';
  label: string;
  description: string;
  subClassOf?: string;
  properties: {
    name: string;
    type: string;
    description: string;
    cardinality?: string;
  }[];
  jsonLdSnippet: string;
  shaclShapeSnippet: string;
  regoSnippet: string;
}

export interface DeploymentEndpointSnippet {
  id: string;
  title: string;
  category: 'Kubernetes Admission' | 'Airlock SDC' | 'eBPF / Calico VPC' | 'PROV-O Audit Emitter' | 'REST / PDP Proxy';
  language: 'yaml' | 'python' | 'bash' | 'rego' | 'json';
  summary: string;
  runtimeLocation: string;
  code: string;
}

export const ONTOLOGY_CLASSES: OntologyClassItem[] = [
  {
    id: 'tre-SafePerson',
    name: 'SafePerson',
    namespace: 'tre',
    label: 'tre:SafePerson',
    description: 'Models a certified researcher holding verified institutional accreditation, annual NHS Information Governance certification, and a cryptographic digital identity.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'tre:hasAccreditedResearcher', type: 'xsd:boolean', description: 'True if researcher identity is validated against ONS Approved Researcher Standard.', cardinality: '1..1' },
      { name: 'tre:hasValidIGCertification', type: 'xsd:boolean', description: 'Requires annual renewal under NHS DSPT Mandate 3.', cardinality: '1..1' },
      { name: 'tre:institutionalAffiliation', type: 'xsd:string', description: 'Verified sponsoring NHS Trust, University, or accredited research institute.', cardinality: '1..n' },
      { name: 'tre:digitalIdentityId', type: 'xsd:string', description: 'OIDC subject claim (sub) bound to researcher cryptographic token.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "tre": "https://w3id.org/tre/core#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "tre:SafePerson",
  "tre:digitalIdentityId": "usr_hra_994821",
  "tre:institutionalAffiliation": "Imperial College London / Imperial NHS Trust",
  "tre:hasAccreditedResearcher": true,
  "tre:hasValidIGCertification": true
}`,
    shaclShapeSnippet: `tre:SafePersonShape a sh:NodeShape ;
  sh:targetClass tre:SafePerson ;
  sh:property [
    sh:path tre:hasAccreditedResearcher ;
    sh:datatype xsd:boolean ;
    sh:hasValue true ;
    sh:message "Safe Person Gate: Researcher must hold verified accreditation." ;
  ] ;
  sh:property [
    sh:path tre:hasValidIGCertification ;
    sh:datatype xsd:boolean ;
    sh:hasValue true ;
    sh:message "Safe Person Gate: Active annual NHS IG certification is mandatory." ;
  ] .`,
    regoSnippet: `package tre.authz

default allow_person = false

allow_person {
    input.researcher.is_accredited == true
    input.researcher.ig_certified == true
    time.now_ns() < input.researcher.ig_expiry_epoch_ns
}`
  },
  {
    id: 'tre-SafeProject',
    name: 'SafeProject',
    namespace: 'tre',
    label: 'tre:SafeProject',
    description: 'Models an ethically approved health data research protocol, mapping IRAS ethics clearance, Section 251 CAG statutory shields, and Caldicott Principle 1 public benefit declarations.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'tre:hasEthicsApproval', type: 'xsd:boolean', description: 'Active NHS Research Ethics Committee (REC) favorable opinion.', cardinality: '1..1' },
      { name: 'tre:hasSection251Authorization', type: 'xsd:boolean', description: 'Mandatory statutory exemption under NHS Act 2006 for identifiable microdata.', cardinality: '0..1' },
      { name: 'tre:irasProjectIdentifier', type: 'xsd:string', description: 'Integrated Research Application System (IRAS) registration identifier.', cardinality: '1..1' },
      { name: 'tre:demonstratesPublicBenefit', type: 'xsd:boolean', description: 'Caldicott Principle 1 compliance assertion.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "tre": "https://w3id.org/tre/core#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "tre:SafeProject",
  "tre:irasProjectIdentifier": "IRAS-381920",
  "tre:hasEthicsApproval": true,
  "tre:hasSection251Authorization": true,
  "tre:demonstratesPublicBenefit": true
}`,
    shaclShapeSnippet: `tre:SafeProjectShape a sh:NodeShape ;
  sh:targetClass tre:SafeProject ;
  sh:property [
    sh:path tre:hasEthicsApproval ;
    sh:hasValue true ;
    sh:message "Safe Project Gate: Unapproved ethics protocol cannot access TRE." ;
  ] ;
  sh:property [
    sh:path tre:demonstratesPublicBenefit ;
    sh:hasValue true ;
    sh:message "Caldicott 1 Gate: Explicit public benefit declaration required." ;
  ] .`,
    regoSnippet: `package tre.authz

default allow_project = false

allow_project {
    input.project.ethics_approved == true
    input.project.public_benefit_declared == true
    valid_data_tier_clearance
}

valid_data_tier_clearance {
    input.data_tier != "tier3_identifiable"
}

valid_data_tier_clearance {
    input.data_tier == "tier3_identifiable"
    input.project.s251_cag_authorized == true
}`
  },
  {
    id: 'tre-SafeSetting',
    name: 'SafeSetting',
    namespace: 'tre',
    label: 'tre:SafeSetting',
    description: 'Models a certified, air-gapped or zero-egress cloud compute enclave conforming to SATRE Specification v1.1 and ISO/IEC 27001.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'tre:networkIsolationTier', type: 'xsd:string', description: 'Classification of subnet routing (ZeroEgressVPC, AirGapped, ProxyControlled).', cardinality: '1..1' },
      { name: 'tre:enclaveEgressBlocked', type: 'xsd:boolean', description: 'True when all outbound internet gateway routing is severed via eBPF/Calico.', cardinality: '1..1' },
      { name: 'tre:mfaEnforced', type: 'xsd:boolean', description: 'Hardware security token / FIDO2 MFA enforcement at gateway perimeter.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "tre": "https://w3id.org/tre/core#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "tre:SafeSetting",
  "tre:networkIsolationTier": "ZeroEgressVPC",
  "tre:enclaveEgressBlocked": true,
  "tre:mfaEnforced": true
}`,
    shaclShapeSnippet: `tre:SafeSettingShape a sh:NodeShape ;
  sh:targetClass tre:SafeSetting ;
  sh:property [
    sh:path tre:enclaveEgressBlocked ;
    sh:hasValue true ;
    sh:message "Safe Setting: Air-gapped zero-egress VPC routing mandatory for clinical datasets." ;
  ] ;
  sh:property [
    sh:path tre:mfaEnforced ;
    sh:hasValue true ;
    sh:message "Safe Setting: FIDO2/MFA required for workspace session ingress." ;
  ] .`,
    regoSnippet: `package tre.authz

default allow_setting = false

allow_setting {
    input.enclave.egress_blocked == true
    input.enclave.network_policy == "calico_zero_egress"
    input.session.mfa_authenticated == true
}`
  },
  {
    id: 'sdc-AirlockOutput',
    name: 'AirlockOutput',
    namespace: 'sdc',
    label: 'sdc:AirlockOutput',
    description: 'Models tabular analytical outputs submitted to the TRE airlock, enforcing automated Statistical Disclosure Control (SDC) thresholds prior to human sign-off.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'sdc:minObservedCellCount', type: 'xsd:integer', description: 'Primary cell suppression threshold (must satisfy k >= 10).', cardinality: '1..1' },
      { name: 'sdc:topContributorDominanceRatio', type: 'xsd:decimal', description: 'Dominance rule (top contributor must not exceed 0.80 / 80%).', cardinality: '1..1' },
      { name: 'sdc:differencingResidualRisk', type: 'xsd:string', description: 'Secondary suppression check across longitudinal historical queries.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "sdc": "https://w3id.org/tre/sdc#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "sdc:AirlockOutput",
  "sdc:minObservedCellCount": 15,
  "sdc:topContributorDominanceRatio": 0.45,
  "sdc:differencingResidualRisk": "LOW"
}`,
    shaclShapeSnippet: `sdc:AirlockOutputShape a sh:NodeShape ;
  sh:targetClass sdc:AirlockOutput ;
  sh:property [
    sh:path sdc:minObservedCellCount ;
    sh:minInclusive 10 ;
    sh:message "SDC Violation: Primary cell suppression requires k >= 10." ;
  ] ;
  sh:property [
    sh:path sdc:topContributorDominanceRatio ;
    sh:maxInclusive 0.80 ;
    sh:message "SDC Violation: Single contributor dominance cannot exceed 80%." ;
  ] .`,
    regoSnippet: `package tre.sdc

default permit_airlock_release = false

permit_airlock_release {
    input.output.min_cell_count >= 10
    input.output.top_dominance_ratio <= 0.80
    input.output.differencing_risk != "HIGH"
}`
  },
  {
    id: 'agent-AgenticWorkload',
    name: 'AgenticWorkload',
    namespace: 'agent',
    label: 'agent:AgenticWorkload',
    description: 'Implements the Stanford UIT Agentic AI Security Framework (#8702/#8938), establishing that autonomous AI agents are NOT Safe Persons and must be bound to human sponsors.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'agent:riskClassification', type: 'xsd:string', description: 'Stanford UIT Risk Tier (Low Risk Assistive vs Autonomous High Risk).', cardinality: '1..1' },
      { name: 'agent:sponsoredByHumanResearcher', type: 'xsd:string', description: 'Cryptographic URI of accredited human researcher bearing statutory liability.', cardinality: '1..1' },
      { name: 'agent:identityRevocableInSession', type: 'xsd:boolean', description: 'Runtime killswitch capability terminating agent token in <10 seconds.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "agent": "https://w3id.org/tre/agent#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "agent:AgenticWorkload",
  "agent:riskClassification": "Stanford_Tier_HighRisk_Autonomous",
  "agent:sponsoredByHumanResearcher": "urn:nhs:researcher:994821",
  "agent:identityRevocableInSession": true
}`,
    shaclShapeSnippet: `agent:AgenticWorkloadShape a sh:NodeShape ;
  sh:targetClass agent:AgenticWorkload ;
  sh:property [
    sh:path agent:sponsoredByHumanResearcher ;
    sh:minCount 1 ;
    sh:message "Stanford UIT Rule: Autonomous AI must have an accredited human sponsor." ;
  ] ;
  sh:property [
    sh:path agent:identityRevocableInSession ;
    sh:hasValue true ;
    sh:message "Stanford UIT Rule: Agent token must support immediate revocation." ;
  ] .`,
    regoSnippet: `package tre.agent

default allow_ai_execution = false

allow_ai_execution {
    input.agent.risk_tier == "assistive"
}

allow_ai_execution {
    input.agent.risk_tier == "autonomous_high_risk"
    input.agent.human_sponsor_verified == true
    input.agent.token_revocable == true
}`
  },
  {
    id: 'tre-SafeData',
    name: 'SafeData',
    namespace: 'tre',
    label: 'tre:SafeData',
    description: 'Models a governed research dataset within the enclave, defining pseudonymisation standards, direct/indirect identifier removal, and dataset-level sensitivity tiers.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'tre:sensitivityTier', type: 'xsd:string', description: 'Tier 1 (Aggregate/Synthetic), Tier 2 (De-identified Microdata), Tier 3 (Sensitive/Clinical).', cardinality: '1..1' },
      { name: 'tre:pseudonymisationSaltId', type: 'xsd:string', description: 'Reference identifier for rotating cryptographic salt held by trusted third-party indexer.', cardinality: '1..1' },
      { name: 'tre:containsDirectIdentifiers', type: 'xsd:boolean', description: 'Strictly false for all analytical workspaces under Safe Data gate.', cardinality: '1..1' },
      { name: 'tre:retentionExpiryDate', type: 'xsd:date', description: 'Mandatory data asset lifecycle horizon.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "tre": "https://w3id.org/tre/core#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "tre:SafeData",
  "tre:sensitivityTier": "Tier2_DeIdentifiedMicrodata",
  "tre:containsDirectIdentifiers": false,
  "tre:pseudonymisationSaltId": "urn:salt:nhse:salt-2026-q1",
  "tre:retentionExpiryDate": "2027-12-31"
}`,
    shaclShapeSnippet: `tre:SafeDataShape a sh:NodeShape ;
  sh:targetClass tre:SafeData ;
  sh:property [
    sh:path tre:containsDirectIdentifiers ;
    sh:hasValue false ;
    sh:message "Safe Data Gate: Direct identifiers (NHS Number, Name, Full Postcode) strictly prohibited in analytical workspace." ;
  ] ;
  sh:property [
    sh:path tre:pseudonymisationSaltId ;
    sh:minCount 1 ;
    sh:message "Safe Data Gate: Verified third-party pseudonymisation salt reference is mandatory." ;
  ] .`,
    regoSnippet: `package tre.safedata

default allow_data_mount = false

allow_data_mount {
    input.dataset.contains_direct_identifiers == false
    input.dataset.pseudonymised == true
    input.dataset.has_valid_retention == true
}`
  },
  {
    id: 'sdc-GraphicalPlotOutput',
    name: 'GraphicalPlotOutput',
    namespace: 'sdc',
    label: 'sdc:GraphicalPlotOutput',
    description: 'Models data visualisations (scatter plots, Kaplan-Meier curves, boxplots, heatmaps) submitted to airlock export, enforcing underlying microdata suppression and point-density thresholds.',
    subClassOf: 'sdc:AirlockOutput',
    properties: [
      { name: 'sdc:plotType', type: 'xsd:string', description: 'Classification of visualisation (e.g. ScatterPlot, SurvivalCurve, BoxPlot, HeatMap).', cardinality: '1..1' },
      { name: 'sdc:underlyingCellCount', type: 'xsd:integer', description: 'Number of observations represented in the sparsest stratum or tail step.', cardinality: '1..1' },
      { name: 'sdc:individualCoordinatesExported', type: 'xsd:boolean', description: 'Strictly false; requires hexbinning, kernel density estimation, or rasterisation.', cardinality: '1..1' },
      { name: 'sdc:censoringTailThresholdSatisfied', type: 'xsd:boolean', description: 'Validates that right-censored survival tails with <10 patients at risk are truncated.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "sdc": "https://w3id.org/tre/sdc#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "sdc:GraphicalPlotOutput",
  "sdc:plotType": "SurvivalCurve",
  "sdc:underlyingCellCount": 14,
  "sdc:individualCoordinatesExported": false,
  "sdc:censoringTailThresholdSatisfied": true
}`,
    shaclShapeSnippet: `sdc:GraphicalPlotShape a sh:NodeShape ;
  sh:targetClass sdc:GraphicalPlotOutput ;
  sh:property [
    sh:path sdc:individualCoordinatesExported ;
    sh:hasValue false ;
    sh:message "SDC Plot Gate: Raw unbinned microdata points / scatter points are prohibited from export." ;
  ] ;
  sh:property [
    sh:path sdc:censoringTailThresholdSatisfied ;
    sh:hasValue true ;
    sh:message "SDC Plot Gate: Survival curves must truncate or blur tails when at-risk patient count falls below threshold." ;
  ] .`,
    regoSnippet: `package tre.sdc.plots

default permit_plot_export = false

permit_plot_export {
    input.plot.individual_coordinates == false
    input.plot.min_points_per_cluster >= 10
    input.plot.tail_censored_compliant == true
}`
  },
  {
    id: 'caldicott-PrincipleGate',
    name: 'CaldicottPrincipleGate',
    namespace: 'caldicott',
    label: 'caldicott:CaldicottPrincipleGate',
    description: 'Represents a formal Caldicott Guardian policy gate evaluating access justification, proportionality, minimum necessary data, and the duty to share.',
    subClassOf: 'tre:FiveSafesDimension',
    properties: [
      { name: 'caldicott:principleNumber', type: 'xsd:integer', description: 'Caldicott Principle index (1 through 8).', cardinality: '1..1' },
      { name: 'caldicott:justificationReference', type: 'xsd:string', description: 'Formal justification entry logged in research protocol approval.', cardinality: '1..1' },
      { name: 'caldicott:isMinimumNecessary', type: 'xsd:boolean', description: 'Affirmation under Principle 3 that columns and rows are strictly constrained to study aim.', cardinality: '1..1' },
      { name: 'caldicott:guardianSignoffEpoch', type: 'xsd:dateTime', description: 'Timestamp of Caldicott Guardian or delegated Caldicott Lead approval.', cardinality: '0..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "caldicott": "https://w3id.org/tre/caldicott#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "caldicott:CaldicottPrincipleGate",
  "caldicott:principleNumber": 3,
  "caldicott:isMinimumNecessary": true,
  "caldicott:justificationReference": "REC-App-2026-Sub3-DataMinimisation"
}`,
    shaclShapeSnippet: `caldicott:PrincipleGateShape a sh:NodeShape ;
  sh:targetClass caldicott:CaldicottPrincipleGate ;
  sh:property [
    sh:path caldicott:isMinimumNecessary ;
    sh:hasValue true ;
    sh:message "Caldicott Principle 3 Violation: Access granted only to the minimum necessary identifiable information." ;
  ] .`,
    regoSnippet: `package tre.caldicott

default caldicott_passed = false

caldicott_passed {
    input.caldicott.is_minimum_necessary == true
    input.caldicott.purpose_justified == true
    input.caldicott.duty_to_share_balanced == true
}`
  },
  {
    id: 'prov-PolicyEnforcementActivity',
    name: 'PolicyEnforcementActivity',
    namespace: 'prov',
    label: 'prov:PolicyEnforcementActivity',
    description: 'Implements W3C PROV-O audit semantics capturing the deterministic execution of a Policy Enforcement Point (PEP) evaluation against an OPA Decision Engine.',
    subClassOf: 'prov:Activity',
    properties: [
      { name: 'prov:wasAssociatedWith', type: 'xsd:anyURI', description: 'URI of the Policy Decision Point (e.g. OPA Daemon instance).', cardinality: '1..1' },
      { name: 'prov:usedInputHash', type: 'xsd:string', description: 'SHA-256 cryptographic hash of the input query document.', cardinality: '1..1' },
      { name: 'prov:generatedDecision', type: 'xsd:string', description: 'Enforcement verdict (PERMIT, DENY, REQUIRE_STEP_UP).', cardinality: '1..1' },
      { name: 'prov:policyRevisionId', type: 'xsd:string', description: 'Git commit SHA of the deployed Rego / SHACL governance bundles.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "prov": "http://www.w3.org/ns/prov#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "prov:PolicyEnforcementActivity",
  "prov:wasAssociatedWith": "urn:seawater:pdp:cluster-uk-south-01",
  "prov:usedInputHash": "sha256:4f8a19b88243cd6201a09d",
  "prov:generatedDecision": "PERMIT",
  "prov:policyRevisionId": "git:e84b901a"
}`,
    shaclShapeSnippet: `prov:EnforcementActivityShape a sh:NodeShape ;
  sh:targetClass prov:PolicyEnforcementActivity ;
  sh:property [
    sh:path prov:usedInputHash ;
    sh:pattern "^sha256:[a-f0-9]{20,64}$" ;
    sh:message "Provenance Gate: Policy audit records must bind cryptographic SHA-256 hash of query input." ;
  ] ;
  sh:property [
    sh:path prov:policyRevisionId ;
    sh:minCount 1 ;
    sh:message "Provenance Gate: Every decision must reference the immutable Git commit SHA of the policy bundle." ;
  ] .`,
    regoSnippet: `package tre.provenance

audit_record := {
    "pdp_id": input.system.pdp_instance,
    "input_sha256": crypto.sha256(json.marshal(input.query)),
    "policy_git_sha": input.system.policy_bundle_sha,
    "decision": data.tre.authz.allow,
    "timestamp_ns": time.now_ns()
}`
  },
  {
    id: 'agent-MCPToolBoundary',
    name: 'MCPToolBoundary',
    namespace: 'agent',
    label: 'agent:MCPToolBoundary',
    description: 'Defines the Model Context Protocol (MCP) server boundary exposing analytical tools to assistive AI agents while barring microdata exfiltration and shell escalation.',
    subClassOf: 'agent:AgenticWorkload',
    properties: [
      { name: 'agent:toolPermissionLevel', type: 'xsd:string', description: 'Permission ceiling (ReadOnlyCalculation, SchemaInspection, NoEgressHttp).', cardinality: '1..1' },
      { name: 'agent:canExecuteRawShell', type: 'xsd:boolean', description: 'Strictly false; prevents direct terminal command injection in research container.', cardinality: '1..1' },
      { name: 'agent:maximumRecordInspectionLimit', type: 'xsd:integer', description: 'Upper bound on single tool payload size to prevent microdata bulk scraping.', cardinality: '1..1' }
    ],
    jsonLdSnippet: `{
  "@context": {
    "agent": "https://w3id.org/tre/agent#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@type": "agent:MCPToolBoundary",
  "agent:toolPermissionLevel": "ReadOnlyCalculation",
  "agent:canExecuteRawShell": false,
  "agent:maximumRecordInspectionLimit": 50
}`,
    shaclShapeSnippet: `agent:MCPToolBoundaryShape a sh:NodeShape ;
  sh:targetClass agent:MCPToolBoundary ;
  sh:property [
    sh:path agent:canExecuteRawShell ;
    sh:hasValue false ;
    sh:message "MCP Tool Boundary Gate: AI tools cannot invoke unconstrained bash/shell commands." ;
  ] ;
  sh:property [
    sh:path agent:maximumRecordInspectionLimit ;
    sh:maxInclusive 100 ;
    sh:message "MCP Tool Boundary Gate: Bulk microdata extraction prohibited via single tool call." ;
  ] .`,
    regoSnippet: `package tre.mcp

default permit_mcp_tool = false

permit_mcp_tool {
    input.tool.allows_raw_shell == false
    input.tool.output_records <= 100
    input.tool.network_egress_requested == false
}`
  }
];

export const DEPLOYMENT_ENDPOINTS: DeploymentEndpointSnippet[] = [
  {
    id: 'k8s-namespaced-admission-audit',
    title: 'Kubernetes Namespaced Audit & Alert Controller (Least-Privilege PEP)',
    category: 'Kubernetes Admission',
    language: 'yaml',
    summary: 'Least-privilege admission controller running in restricted namespaces. Emits non-blocking audit annotations and Prometheus alert events without risking pod launch timeouts or cluster disruption.',
    runtimeLocation: 'deploy/k8s/namespaced-audit-controller.yaml',
    code: `apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: seawater-tre-audit-webhook
  labels:
    tre.governance: policy-as-code
    deployment.scope: least-privilege
webhooks:
  - name: audit.tre.seawater.internal
    # Scoped strictly to research sandbox namespaces to avoid cluster disruption
    namespaceSelector:
      matchExpressions:
        - key: tre.environment/scope
          operator: In
          values: ["research-sandbox", "sde-analytics"]
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE"]
        resources: ["pods"]
        scope: "Namespaced"
    clientConfig:
      service:
        name: seawater-opa-pdp
        namespace: tre-security
        path: "/v1/data/tre/authz/evaluate_pod"
        port: 8443
      caBundle: LS0tLS1CRUdJTi... # Internal PKI CA Certificate
    admissionReviewVersions: ["v1"]
    sideEffects: None
    timeoutSeconds: 2
    # Non-blocking audit-and-alert pattern to satisfy NHS IT least-privilege stability requirements
    failurePolicy: Ignore`
  },
  {
    id: 'airgap-package-mirrors',
    title: 'Air-Gapped Package Mirrors (CRAN, PyPI, Harbor OCI Registry)',
    category: 'eBPF / Calico VPC',
    language: 'yaml',
    summary: 'Provisions maintained internal package mirrors on isolated subnets, allowing researchers to install accredited R packages and Python wheels without outbound internet connectivity.',
    runtimeLocation: 'deploy/network/airgap-package-mirrors.yaml',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: internal-package-mirrors
  namespace: tre-isolated-infra
  labels:
    app.kubernetes.io/component: package-mirror
    satre.pillar: safe-setting
spec:
  replicas: 2
  selector:
    matchLabels:
      app: internal-package-mirrors
  template:
    metadata:
      labels:
        app: internal-package-mirrors
    spec:
      containers:
        # 1. Maintained CRAN Mirror for R analytical workloads
        - name: cran-mirror
          image: internal-harbor.local/mirrors/r-cran:4.3-hardened
          ports:
            - containerPort: 8080
              name: cran-http
          volumeMounts:
            - mountPath: /var/mirrors/cran
              name: cran-storage
              readOnly: true
        # 2. Maintained PyPI Wheel Mirror for Python analytical workloads
        - name: pypi-nexus-mirror
          image: internal-harbor.local/mirrors/pypi-nexus:3.64-hardened
          ports:
            - containerPort: 8081
              name: pypi-http
          volumeMounts:
            - mountPath: /var/mirrors/pypi
              name: pypi-storage
              readOnly: true
      volumes:
        - name: cran-storage
          persistentVolumeClaim:
            claimName: pvc-cran-validated-packages
        - name: pypi-storage
          persistentVolumeClaim:
            claimName: pvc-pypi-validated-wheels`
  },
  {
    id: 'analytics-plane-direct-routing',
    title: 'Direct Analytical Data Plane (DuckDB & PostgreSQL Direct Line)',
    category: 'REST / PDP Proxy',
    language: 'yaml',
    summary: 'Direct data-plane routing for heavy analytical queries (DuckDB, PostgreSQL, Arrow), avoiding userspace Envoy proxies that exhaust TCP connection pools under parallel load.',
    runtimeLocation: 'deploy/network/analytics-plane-direct-routing.yaml',
    code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: direct-analytics-data-plane
  namespace: tre-analytics-workspace
spec:
  podSelector:
    matchLabels:
      tre.workload: research-notebook
  policyTypes:
    - Egress
  egress:
    # 1. Direct high-throughput analytical query connection (Bypasses userspace Envoy)
    - to:
        - podSelector:
            matchLabels:
              app: postgresql-lake-node
      ports:
        - protocol: TCP
          port: 5432
    # 2. Direct internal object store query access (Parquet / Arrow / DuckDB files)
    - to:
        - podSelector:
            matchLabels:
              app: minio-internal-lake
      ports:
        - protocol: TCP
          port: 9000
    # 3. Lightweight PDP policy evaluation (Metadata only through OPA daemon)
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: tre-security
          podSelector:
            matchLabels:
              app: seawater-opa-pdp
      ports:
        - protocol: TCP
          port: 8443`
  },
  {
    id: 'calico-zero-egress',
    title: 'Zero-Egress Calico CNI NetworkPolicy (Air-Gapped Subnet)',
    category: 'eBPF / Calico VPC',
    language: 'yaml',
    summary: 'Hardens research namespaces by dropping all outbound WAN egress routing at the eBPF layer, satisfying SATRE Pillar 2 isolation while permitting internal mirror access.',
    runtimeLocation: 'deploy/network/calico-zero-egress.yaml',
    code: `apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: tre-enclave-zero-egress
spec:
  namespaceSelector: tre.enclave.tier == "clinical-microdata"
  order: 100
  types:
    - Egress
  egress:
    # 1. Permit internal DNS lookup within cluster
    - action: Allow
      protocol: UDP
      destination:
        ports: [53]
        selector: k8s-app == "kube-dns"
    # 2. Permit internal package mirror access (CRAN / PyPI)
    - action: Allow
      protocol: TCP
      destination:
        selector: app == "internal-package-mirrors"
        ports: [8080, 8081]
    # 3. Permit direct internal object store data ingestion
    - action: Allow
      protocol: TCP
      destination:
        selector: app == "minio-internal-lake"
        ports: [9000]
    # 4. Deny and audit all other outbound traffic (WAN airlock severed)
    - action: Log
    - action: Deny`
  },
  {
    id: 'airlock-sdc-validator',
    title: 'Airlock SDC Evaluation Daemon & Evidence Compiler (PySHACL)',
    category: 'Airlock SDC',
    language: 'python',
    summary: 'Compiles a standardized statistical disclosure evidence pack for human airlock reviewers, testing candidate tables against k >= 10 and dominance ceilings.',
    runtimeLocation: 'deploy/airlock/sdc_evaluator.py',
    code: `import pyshacl
import rdflib
import sys
import json

def compile_sdc_evidence_pack(data_graph_ttl: str, shapes_graph_ttl: str) -> dict:
    """
    Evaluates candidate aggregate tables to compile a standardized evidence pack
    for human review panels (Caldicott Guardians and Airlock Officers).
    Technology provides decision-support; it does not replace human accountability.
    """
    g_data = rdflib.Graph().parse(data=data_graph_ttl, format="turtle")
    g_shapes = rdflib.Graph().parse(data=shapes_graph_ttl, format="turtle")
    
    conforms, report_graph, report_text = pyshacl.validate(
        data_graph=g_data,
        shacl_graph=g_shapes,
        inference="rdfs",
        abort_on_first=False
    )
    
    return {
        "conforms": conforms,
        "recommendation": "RECOMMEND_APPROVAL" if conforms else "SDC_FLAGGED_FOR_HUMAN_REVIEW",
        "evidence_summary": report_text if not conforms else "All k >= 10 and dominance constraints verified.",
        "statutory_basis": "ONS SDC Protocol v2.1; Caldicott Principle 2 & 8."
    }

if __name__ == "__main__":
    result = compile_sdc_evidence_pack(sys.stdin.read(), open("ontology/access-shapes.ttl").read())
    print(json.dumps(result, indent=2))`
  },
  {
    id: 'prov-o-audit-emitter',
    title: 'W3C PROV-O Audit Triple Ledger Emitter',
    category: 'PROV-O Audit Emitter',
    language: 'python',
    summary: 'Emits cryptographically signed RDF provenance triples for every PDP policy evaluation to immutable append-only storage.',
    runtimeLocation: 'deploy/audit/prov_emitter.py',
    code: `from rdflib import Graph, URIRef, Literal, Namespace
from rdflib.namespace import RDF, PROV, XSD
import datetime
import hashlib

TRE = Namespace("https://w3id.org/tre/core#")

def emit_audit_record(session_id: str, researcher_id: str, verdict: str, policy_hash: str):
    g = Graph()
    g.bind("prov", PROV)
    g.bind("tre", TRE)
    
    activity = URIRef(f"urn:seawater:eval:{session_id}")
    g.add((activity, RDF.type, PROV.Activity))
    g.add((activity, TRE.evalOutcome, Literal(verdict)))
    g.add((activity, TRE.evaluatedPolicyHash, Literal(policy_hash)))
    g.add((activity, PROV.endedAtTime, Literal(datetime.datetime.utcnow().isoformat(), datatype=XSD.dateTime)))
    
    agent = URIRef(f"urn:seawater:agent:{researcher_id}")
    g.add((agent, RDF.type, PROV.Agent))
    g.add((activity, PROV.wasAssociatedWith, agent))
    
    return g.serialize(format="turtle")`
  }
];
