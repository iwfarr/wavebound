export interface CaldicottPrincipleDetail {
  number: number;
  title: string;
  tagline: string;
  officialDefinition: string;
  populationResearchApplication: string;
  technicalEnforcementMechanism: string;
  shaclShapeRule: string;
  opaRegoPolicy: string;
  accountableRole: string;
  decisionGate: string;
  auditEvidence: string;
}

export const CALDICOTT_PRINCIPLES: CaldicottPrincipleDetail[] = [
  {
    number: 1,
    title: 'Justify the Purpose(s)',
    tagline: 'Every proposed use or transfer of confidential data must be clearly defined, scrutinized, and documented.',
    officialDefinition: 'Every proposed use or transfer of confidential information within or from an organization should be clearly defined, scrutinized, and documented, with continuing uses regularly reviewed by an appropriate guardian.',
    populationResearchApplication: 'In epidemiological cohorts and population health platforms, research protocols must articulate a clear scientific question delivering measurable public health or societal benefit. Unfocused speculative data mining without approved ethics registration is strictly barred.',
    technicalEnforcementMechanism: 'Automated Rego admission controller verifies incoming container provisioning tokens against the approved project metadata registry. If project.approved_purpose_id is null or expired, container execution is blocked at admission.',
    shaclShapeRule: 'tre:SafeProjectShape sh:property [ sh:path tre:hasJustifiedPurpose ; sh:minCount 1 ; sh:datatype xsd:string ]',
    opaRegoPolicy: 'default allow = false\nallow if {\n  input.project.status == "ETHICALLY_APPROVED"\n  input.project.justified_purpose != ""\n  time.now_ns() < input.project.expiry_date_ns\n}',
    accountableRole: 'Caldicott Guardian & Research Ethics Committee (REC)',
    decisionGate: 'Gate D-001: Project Protocol & Ethical Purpose Validation',
    auditEvidence: 'Formal NHS REC approval letter or statutory institutional ethics authorization certificate.'
  },
  {
    number: 2,
    title: 'Use Confidential Information Only When It Is Necessary',
    tagline: 'Confidential personal data should not be included unless it is essential for the specified purpose.',
    officialDefinition: 'Confidential information should not be included unless it is essential for the specified purpose(s) of that flow. The need for patients or research participants to be identified should be considered at each stage of satisfying the purpose.',
    populationResearchApplication: 'Identifiable information (names, national insurance or NHS numbers, full addresses) must be removed at the ingress boundary. Whenever aggregated statistics or pseudonymized study tokens suffice, raw identifiers are never ingested into analytical compute partitions.',
    technicalEnforcementMechanism: 'Ingress pipeline executes deterministic pseudonymization algorithms (Salted HMAC-SHA256) inside an isolated ingestion tier. Direct patient identity tables are physically segregated into locked key-vault partitions inaccessible to analytical pods.',
    shaclShapeRule: 'tre:CohortDatasetShape sh:property [ sh:path tre:containsDirectIdentifiers ; sh:hasValue false ]',
    opaRegoPolicy: 'deny[msg] {\n  input.dataset.contains_direct_identifiers == true\n  msg := "Direct personal identifiers detected in analytical dataset (Caldicott Principle 2 breach)"\n}',
    accountableRole: 'Data Protection Officer (DPO) & Ingress Pipeline Architect',
    decisionGate: 'Gate D-002: Pseudonymization & De-Identification Certification',
    auditEvidence: 'Ingress cryptographic hash verification report and zero-PII schema validation certificate.'
  },
  {
    number: 3,
    title: 'Use the Minimum Necessary Confidential Information',
    tagline: 'The inclusion of each item of information must be considered and justified.',
    officialDefinition: 'Where use of confidential information is considered essential, the inclusion of each individual item of information should be considered and justified so that the minimum amount of identifiable information is transferred or accessed.',
    populationResearchApplication: 'Cohort extract queries must enforce column-level minimization. Variables not required for the specific epidemiological hypothesis (e.g. detailed geographic postcodes when region suffices, or exact birthdates when 5-year age bands suffice) are omitted from analytical views.',
    technicalEnforcementMechanism: 'Query-level column projections in database proxies; automated truncation of dates to quarter or year; spatial aggregation of postcodes to Lower Super Output Area (LSOA) or Local Authority District.',
    shaclShapeRule: 'tre:VariableMinimizationShape sh:property [ sh:path tre:isRequestedVariable ; sh:in (tre:PermittedStudyVariables) ]',
    opaRegoPolicy: 'deny[msg] {\n  requested_col := input.query.requested_columns[_]\n  not input.project.approved_variables[requested_col]\n  msg := sprintf("Column %v exceeds project data minimization boundary (Caldicott Principle 3)", [requested_col])\n}',
    accountableRole: 'Data Steward & Principal Investigator',
    decisionGate: 'Gate D-003: Data Minimization & Cohort Extraction Review',
    auditEvidence: 'Approved Variable Specification Dictionary matched against SQL extract query plans.'
  },
  {
    number: 4,
    title: 'Access on a Strict Need-to-Know Basis',
    tagline: 'Only individuals who need access to confidential data should have access to it.',
    officialDefinition: 'Only those individuals who need access to confidential information should have access to it, and they should only have access to the information items that they need to see. This may mean introducing access controls or splitting information into separate components.',
    populationResearchApplication: 'Multi-tenant research enclaves isolate projects into distinct Linux network namespaces and private storage volumes. Analysts working on Study A cannot discover, query, or mount data assets assigned to Study B, even within the same institutional platform.',
    technicalEnforcementMechanism: 'Attribute-Based Access Control (ABAC) and Kubernetes ValidatingAdmissionWebhooks that enforce multi-tenant isolation, ephemeral storage tokens, and mutual TLS between pods.',
    shaclShapeRule: 'tre:EnclaveAccessShape sh:property [ sh:path tre:authorizedUser ; sh:hasValue tre:CurrentResearcher ]',
    opaRegoPolicy: 'default allow = false\nallow if {\n  input.user.assigned_projects[_] == input.target_dataset.project_id\n  input.user.active_session == true\n  input.session.mfa_authenticated == true\n}',
    accountableRole: 'Security Operations & Enclave Infrastructure SRE',
    decisionGate: 'Gate D-004: Tenant Isolation & RBAC/ABAC Accreditation',
    auditEvidence: 'Quarterly user access reconciliation reports and automated identity provider (IdP) role sync logs.'
  },
  {
    number: 5,
    title: 'Everyone Should Be Aware of Their Responsibilities',
    tagline: 'Action must be taken to ensure those handling confidential data understand their obligations.',
    officialDefinition: 'Action should be taken to ensure that those handling confidential information are aware of their responsibilities and obligations to respect patient and participant confidentiality, supported by appropriate training and contractual terms.',
    populationResearchApplication: 'All researchers, data stewards, and system administrators must complete certified Information Governance (IG) and Safe Researcher training (e.g. ONS Safe Researcher, MRC Data & Confidentiality, or NHS DSPT training) annually before being granted platform access.',
    technicalEnforcementMechanism: 'Identity Provider (IdP) integration queries user training registries upon every login attempt. If training completion date exceeds 365 days, SSO tokens are withheld and access is routed to a training recertification gateway.',
    shaclShapeRule: 'tre:AccreditedPersonShape sh:property [ sh:path tre:trainingCertificateValid ; sh:hasValue true ]',
    opaRegoPolicy: 'deny[msg] {\n  training_age_days := (time.now_ns() - input.user.last_training_timestamp_ns) / (1000 * 1000 * 1000 * 86400)\n  training_age_days > 365\n  msg := "User Information Governance (IG) training expired; annual renewal required (Caldicott Principle 5)"\n}',
    accountableRole: 'Information Governance Lead & Training Coordinator',
    decisionGate: 'Gate D-005: Annual IG Training & Researcher Accreditation',
    auditEvidence: 'Digital credential signatures and automated LMS course completion webhooks.'
  },
  {
    number: 6,
    title: 'Comply with the Law',
    tagline: 'Every use of confidential personal information must be lawful.',
    officialDefinition: 'Every use of confidential information must be lawful. Someone in each organization handling confidential information should be responsible for ensuring that the organization complies with legal requirements regarding confidentiality and data protection.',
    populationResearchApplication: 'Every population research study must document its statutory legal basis under UK GDPR Article 6(1)(e) (Public Task) or Article 6(1)(f) (Legitimate Interests), alongside Article 9(2)(j) (Scientific Research Exemption). For unconsented health data, statutory Section 251 CAG approval is mandatory.',
    technicalEnforcementMechanism: 'Semantic ontology models legal bases in governance_core.ttl. Prior to provisioning compute or dataset access, the policy engine verifies the existence of active, signed legal instruments in the project knowledge graph.',
    shaclShapeRule: 'tre:StatutoryBasisShape sh:property [ sh:path tre:hasLawfulBasis ; sh:minCount 1 ]',
    opaRegoPolicy: 'default allow = false\nallow if {\n  valid_bases := {"UK_GDPR_Art6_1_e", "UK_GDPR_Art6_1_f", "DEA_2017_Part5"}\n  valid_special := {"UK_GDPR_Art9_2_j", "DPA_2018_Sch1_Part1"}\n  valid_bases[input.project.legal_basis_article6]\n  valid_special[input.project.special_category_basis_article9]\n}',
    accountableRole: 'Data Protection Officer (DPO) & Legal Counsel',
    decisionGate: 'Gate D-006: Statutory Legal Basis & DPA Compliance Verification',
    auditEvidence: 'Formal DPIA sign-off, Data Sharing Agreement (DSA), and Section 251 Confidentiality Advisory Group decision letters.'
  },
  {
    number: 7,
    title: 'The Duty to Share Information Can Be as Important as the Duty to Protect Confidentiality',
    tagline: 'Share with confidence for direct care, public health protection, and ethical research.',
    officialDefinition: 'Health and care professionals, researchers, and public authorities should have the confidence to share confidential information in the best interests of patients and public health within the framework of these principles. They should be supported by policies of their employers, regulators, and professional bodies.',
    populationResearchApplication: 'Data silos actively harm population health by concealing disease outbreaks, treatment inequalities, and public health trends. Safe, governed research sharing via federated research networks (such as HDR UK and DARE UK) enables rapid epidemiological discovery without compromising privacy.',
    technicalEnforcementMechanism: 'Federated API gateways and Secure Data Environment (SDE) inter-enclave query protocols allow distributed analysis across regional safe havens without moving individual microdata across sovereign organizational perimeters.',
    shaclShapeRule: 'tre:FederatedSharingShape sh:property [ sh:path tre:supportsGovernedFederation ; sh:hasValue true ]',
    opaRegoPolicy: 'allow if {\n  input.request.type == "FEDERATED_QUERY_EXECUTION"\n  input.request.origin_enclave_accredited == true\n  input.request.aggregate_only == true\n  input.request.privacy_budget_available == true\n}',
    accountableRole: 'Senior Information Risk Owner (SIRO) & Network Governance Board',
    decisionGate: 'Gate D-007: Inter-Enclave Federation & Data Sharing Framework',
    auditEvidence: 'Standardized Data Transfer Agreement (DTA) and Inter-Enclave Federation Protocol accreditation.'
  },
  {
    number: 8,
    title: 'Inform Patients and Service Users (The "No Surprises" Principle)',
    tagline: 'Transparency: clear, accessible information on how confidential data is handled and public benefit delivered.',
    officialDefinition: 'A range of steps should be taken to ensure no surprises for patients and research participants, through clear, transparent explanations of how their confidential information is used and shared, and by honoring statutory opt-outs.',
    populationResearchApplication: 'Organizations handling population data must publish an open, up-to-date Public Data Use Register detailing every approved research project, dataset accessed, and intended public benefit. Furthermore, national opt-out choices (such as the UK National Data Opt-Out) must be strictly respected.',
    technicalEnforcementMechanism: 'Automated public register generator serializes project claim graphs into W3C DCAT metadata and publishes human-readable project summaries; ingestion pipelines automatically apply National Data Opt-Out (NDOO) suppression lists.',
    shaclShapeRule: 'tre:PublicTransparencyShape sh:property [ sh:path tre:publicRegisterListed ; sh:hasValue true ]',
    opaRegoPolicy: 'deny[msg] {\n  input.project.published_to_public_register == false\n  msg := "Project not published to open Data Use Register; violates Caldicott Principle 8 (Transparency)"\n}',
    accountableRole: 'Public Engagement Lead, Communications Officer & Caldicott Guardian',
    decisionGate: 'Gate D-008: Public Register Transparency & National Opt-Out Audit',
    auditEvidence: 'Live entry on public data portal and cryptographic proof of National Data Opt-Out list filtration at ingress.'
  }
];
