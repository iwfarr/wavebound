export interface ResourceItem {
  id: string;
  title: string;
  organization: string;
  category:
    | 'Statutory Legislation & Regulatory Guidance'
    | 'Statistical Disclosure Control (SDC) & Airlocks'
    | 'NHS Information Governance & Security Toolkits'
    | 'AI Governance, Alignment & MCP Security'
    | 'Policy-as-Code, IAM & Fine-Grained Access Control';
  url: string;
  shortDesc: string;
  playbookRelevance: string;
  isStatutory?: boolean;
  isCaseStudy?: boolean;
  citation?: string;
  tags: string[];
}

export const COMPREHENSIVE_RESOURCES: ResourceItem[] = [
  // --- Statutory Legislation & Regulatory Guidance ---
  {
    id: 'res-dpa-2018',
    title: 'Data Protection Act 2018',
    organization: 'UK Parliament / The Stationery Office',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.legislation.gov.uk/ukpga/2018/12/contents',
    shortDesc: 'The UK data protection act implementing the GDPR framework and setting statutory research provisions under Part 2 and Section 19.',
    playbookRelevance: 'Provides statutory exemptions and safeguards for scientific and historical research, requiring technical and organizational protections in TREs.',
    isStatutory: true,
    citation: 'UK Government. Data Protection Act 2018. London: The Stationery Office; 2018.',
    tags: ['UK GDPR', 'DPA 2018', 'Legal Basis', 'Legislation']
  },
  {
    id: 'res-nhs-s251',
    title: 'NHS Act 2006, Section 251: Control of Patient Information',
    organization: 'UK Parliament',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.legislation.gov.uk/ukpga/2006/41/section/251',
    shortDesc: 'Statutory exemption allowing the Common Law Duty of Confidentiality to be set aside for medical research with substantial public interest.',
    playbookRelevance: 'Directly modeled in ontology/governance_core.ttl as the legal basis granting access to Tier 3 sensitive clinical cohorts when direct consent is unfeasible.',
    isStatutory: true,
    citation: 'UK Government. National Health Service Act 2006, section 251: Control of patient information.',
    tags: ['Section 251', 'CAG', 'HRA', 'Confidentiality']
  },
  {
    id: 'res-cldc-nhs',
    title: 'Common Law Duty of Confidentiality (CLDC) Guidance',
    organization: 'NHS England Transformation Directorate',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://transform.england.nhs.uk/information-governance/guidance/common-law-duty-confidentiality/',
    shortDesc: 'Comprehensive NHS guidance on statutory obligations and precedents when handling information disclosed in clinical confidence.',
    playbookRelevance: 'Explains why data must remain inside the TRE setting, ensuring clinical trust is upheld via Caldicott principles and Section 251 exemptions.',
    tags: ['CLDC', 'Caldicott', 'NHS Guidance']
  },
  {
    id: 'res-hscic-confidentiality',
    title: 'Guide to Confidentiality in Health and Social Care',
    organization: 'NHS Transformation Directorate / Information Governance',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://transform.england.nhs.uk/information-governance/guidance/',
    shortDesc: 'National standard operating guidelines and legal precedents for patient confidentiality across NHS Trusts.',
    playbookRelevance: 'Authoritative basis for establishing hospital operational tiers (Tier 1 Aggregate, Tier 2 Pseudonymised, Tier 3 Section 251).',
    tags: ['Confidentiality', 'NHS Digital', 'Hospital Tiers']
  },
  {
    id: 'res-ico-lawful-basis',
    title: 'A Guide to Lawful Basis under UK GDPR',
    organization: 'Information Commissioner’s Office (ICO)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/',
    shortDesc: 'The regulator’s guide on lawful bases for processing personal data, specifically Article 6(1)(e) (Public Task) and Article 9(2)(j) (Health Research).',
    playbookRelevance: 'Maps the exact legal predicates in `governance_core.ttl` required for Project ethics review and automated admission validation.',
    tags: ['ICO', 'Lawful Basis', 'Article 6', 'Article 9']
  },
  {
    id: 'res-ico-controllers-processors',
    title: 'Controllers and Processors Guidance',
    organization: 'Information Commissioner’s Office (ICO)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-are-controllers-and-processors/',
    shortDesc: 'Statutory definitions of data controllers, processors, and their respective liabilities in clinical data networks.',
    playbookRelevance: 'Defines the legal relationship between the NHS Trust (Data Controller) and the TRE cloud hosting infrastructure (Data Processor).',
    tags: ['ICO', 'Data Controller', 'Data Processor']
  },
  {
    id: 'res-gdpr-art26',
    title: 'GDPR Article 26: Joint Controllers',
    organization: 'European Data Protection Board / GDPR-Info',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://gdpr-info.eu/art-26-gdpr/',
    shortDesc: 'Full statutory text and recitals defining transparent joint controller arrangements for multi-institutional clinical consortia.',
    playbookRelevance: 'In multi-site TRE federations, defines how universities and NHS Trusts formally allocate responsibilities in machine-readable governance ontologies.',
    tags: ['Joint Controllers', 'GDPR Article 26', 'Federation']
  },
  {
    id: 'res-hra-criteria-5-1',
    title: 'UK Study-Wide Governance: Information Governance & Data Security',
    organization: 'Health Research Authority (HRA)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.hra.nhs.uk/planning-and-improving-research/policies-standards-legislation/data-protection-and-information-governance/',
    shortDesc: 'National HRA approval criteria evaluating researcher Information Governance compliance, lawful bases, and technical data security.',
    playbookRelevance: 'Directly incorporated into Phase 1 ontology scope and validated as a prerequisite in `access-shapes.ttl`.',
    citation: 'Health Research Authority. Data protection and information governance for health and care research.',
    tags: ['HRA Approval', 'REC', 'Criteria 5.1', 'Data Security']
  },

  // --- Statistical Disclosure Control (SDC) & Airlocks ---
  {
    id: 'res-statbarn',
    title: 'Safe Data Access Professionals (SDAP) & StatBarn Community',
    organization: 'Safe Data Access Professionals (SDAP) Network',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://outputchecking.org/',
    shortDesc: 'The definitive UK community repository of Statistical Disclosure Control rules, statistical edge cases, and airlock checking protocols.',
    playbookRelevance: 'Authoritative source for practical airlock checking methodologies and small-cell suppression edge cases.',
    tags: ['StatBarn', 'SDAP', 'Output Checking', 'SDC']
  },
  {
    id: 'res-ukllc-sdc',
    title: 'UK LLC Statistical Disclosure Control Guidance',
    organization: 'UK Longitudinal Linkage Collaboration (UK LLC)',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://ukllc.ac.uk/researcher-resources/',
    shortDesc: 'Practical operational guide on primary suppression, secondary suppression, and dominance rules for linked clinical cohorts.',
    playbookRelevance: 'Provides real-world examples of how clinical cohort data must be structured prior to airlock export requests.',
    tags: ['UK LLC', 'SDC User Guide', 'Primary Suppression', 'Dominance']
  },
  {
    id: 'res-sail-output-policy',
    title: 'The SAIL Databank Safeguards & Output Review Policy',
    organization: 'SAIL Databank (Swansea University Medical School)',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://saildatabank.com/researchers/safeguards/',
    shortDesc: 'The formal output checking policy enforced by the SAIL Databank, pioneering quantitative thresholds (k >= 10, dominance <= 80%).',
    playbookRelevance: 'The exact source cited in Section 2 and Section 3 of the playbook for the quantitative thresholds encoded in `ontology/sdc_rules.ttl`.',
    tags: ['SAIL Databank', 'Output Review', 'k >= 10', 'Dominance Rule']
  },
  {
    id: 'res-sdap-handbook',
    title: 'The SDC Handbook for Trusted Research Environments',
    organization: 'Safe Data Access Professionals (SDAP) Network',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://outputchecking.org/',
    shortDesc: 'Comprehensive practitioner handbook detailing identification risk, attribute disclosure, and safe publication standards.',
    playbookRelevance: 'Guides human airlock reviewers and automated SHACL rule authors in detecting residual disclosure and difference attacks.',
    tags: ['SDC Handbook', 'SDAP', 'Residual Disclosure']
  },
  {
    id: 'res-ons-srs-guidance',
    title: 'SRS Output Checking Guidance Document: SDC Work Strand',
    organization: 'Office for National Statistics (ONS)',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/disclosurecontrol',
    shortDesc: 'The UK national statistical service formal guidance for checking frequency tables, linear regressions, survival curves, and machine learning models.',
    playbookRelevance: 'Provides the statutory standard for primary cell suppression ($k \\ge 10$) and dominance bounds ($k\% \\le 80\%$) in the playbook.',
    citation: 'Office for National Statistics (ONS). The SRS Output Checking Guidance Document Work strand: Statistical Disclosure Control.',
    tags: ['ONS', 'Secure Research Service', 'Airlock', 'SDC']
  },
  {
    id: 'res-ons-accredited-researcher',
    title: 'Becoming an Accredited Researcher (SRS Program)',
    organization: 'Office for National Statistics (ONS)',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://www.ons.gov.uk/aboutus/whatwedo/statistics/requestingstatistics/secureresearchservice/becominganaccreditedresearcher',
    shortDesc: 'Official pathway for researcher accreditation, training assessment, and research project approval under the Digital Economy Act 2017.',
    playbookRelevance: 'Directly operationalized in `tre:SafePerson` and `tre:hasAccreditedResearcher` within `access-shapes.ttl`.',
    tags: ['Accreditation', 'Safe Person', 'ONS SRS', 'DEA 2017']
  },

  // --- NHS Information Governance & Security Toolkits ---
  {
    id: 'res-dspt-nhs',
    title: 'NHS Data Security and Protection Toolkit (DSPT)',
    organization: 'NHS England',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://www.dsptoolkit.nhs.uk/',
    shortDesc: 'Annual online self-assessment tool that all organizations accessing NHS patient data and systems must complete to verify data security compliance.',
    playbookRelevance: 'A non-negotiable prerequisite in the SATRE Computing Infrastructure and Information Governance pillars.',
    citation: 'NHS England. Data Security and Protection Toolkit.',
    tags: ['DSPT', 'NHS Security', 'Compliance', 'Information Governance']
  },
  {
    id: 'res-nhs-ig-portal',
    title: 'NHS Digital Information Governance Resources',
    organization: 'NHS Digital',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://digital.nhs.uk/data-and-information/information-governance',
    shortDesc: 'Central portal for national NHS Information Governance standards, Caldicott Guardian appointments, and clinical data sharing frameworks.',
    playbookRelevance: 'Guides authoring of `ontology/governance_core.ttl` and institutional oversight roles.',
    tags: ['NHS Digital', 'Information Governance', 'Caldicott']
  },
  {
    id: 'res-mrc-rsc-lms',
    title: 'Medical Research Council & HRA Research Governance Learning',
    organization: 'Medical Research Council (MRC) / HRA',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://www.hra.nhs.uk/planning-and-improving-research/learning/',
    shortDesc: 'Official interactive training modules for UK medical researchers on research governance, human tissue legislation, and clinical trial ethics.',
    playbookRelevance: 'Supplies the verified Information Governance training certificates tested for expiration in `tests/fixtures/valid-session.ttl`.',
    tags: ['MRC', 'Training', 'IG Certification', 'Ethics']
  },
  {
    id: 'res-ibm-data-governance',
    title: 'What Is Data Governance?',
    organization: 'IBM Think',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://www.ibm.com/think/topics/data-governance',
    shortDesc: 'Executive architectural guide to data availability, usability, consistency, data integrity, and security across enterprise architectures.',
    playbookRelevance: 'Provides foundational concepts for managing clinical metadata vs runtime infrastructure state.',
    tags: ['Data Governance', 'IBM Think', 'Data Integrity']
  },
  {
    id: 'res-cybersecurity-precedent',
    title: 'ICO Clinical Data Breach Case Studies & Enforcement Actions',
    organization: 'Information Commissioner’s Office (ICO)',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://ico.org.uk/action-weve-taken/enforcement/',
    shortDesc: 'Official investigations and regulatory penalties illustrating how weak access controls, shared credentials, and legacy accounts trigger major health data disclosures.',
    playbookRelevance: 'Demonstrates why traditional manual checklists fail and why automated Policy-as-Code (zero-trust SHACL and OPA admission controls) is strictly necessary in clinical environments.',
    isCaseStudy: true,
    tags: ['Case Study', 'Zero Trust', 'Password Security', 'Breach Prevention']
  },

  // --- AI Governance, Alignment & MCP Security ---
  {
    id: 'res-eu-ai-act',
    title: 'EU Artificial Intelligence Act Portal & Regulatory Analysis',
    organization: 'European Union / EU AI Act Observatory',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://artificialintelligenceact.eu/',
    shortDesc: 'The definitive legal text, implementation timelines, and risk categorization framework of the European Union AI Act.',
    playbookRelevance: 'Directly informs the AI governance risk tiers (Minimal, Limited, High, Unacceptable) encoded in `ontology/agent_mcp.ttl`.',
    tags: ['EU AI Act', 'AI Regulation', 'Risk Tiers', 'High-Risk AI']
  },
  {
    id: 'res-mcp-authz-spec',
    title: 'Model Context Protocol: Architecture & Authorization Scopes',
    organization: 'Model Context Protocol (Anthropic / Open Source)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://modelcontextprotocol.io/docs/concepts/architecture',
    shortDesc: 'Formal specification defining token-based authorization scopes, client-server topology, and delegated tool execution for AI models.',
    playbookRelevance: 'Forms the technical basis for the `mcp:ExecuteSQL` and `mcp:ExportSummary` tool boundary shapes enforced in Phase 1 and Phase 4.',
    citation: 'Model Context Protocol. Core Architecture & Authorization Specification.',
    tags: ['MCP', 'Authorization', 'Tool Boundaries', 'Autonomous Agents']
  },
  {
    id: 'res-mcp-security-best-practices',
    title: 'Model Context Protocol: Security & Tool Confinement Guidelines',
    organization: 'Model Context Protocol (Anthropic / Open Source)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://modelcontextprotocol.io/docs/concepts/architecture',
    shortDesc: 'Comprehensive security guidelines on prompt injection mitigation, read-only database connections, rate limiting, and memory confinement.',
    playbookRelevance: 'Specifies the security constraints compiled into `security/opa/authz.rego` to prevent autonomous agent data exfiltration.',
    citation: 'Model Context Protocol. Security & Confinement Architecture.',
    tags: ['MCP', 'Security Best Practices', 'Exfiltration', 'Prompt Injection']
  },
  {
    id: 'res-datacise-ai-privacy',
    title: 'Protecting Patient Privacy in AI for Responsible Sharing & Deployment',
    organization: 'Datacise Open Learning',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://datacise.org/',
    shortDesc: 'Curriculum exploring differential privacy, model inversion attacks, membership inference, and clinical data governance in AI.',
    playbookRelevance: 'Informs output airlock checks for trained machine learning models leaving the TRE safe output boundary.',
    tags: ['AI Privacy', 'Differential Privacy', 'Membership Inference', 'Datacise']
  },
  {
    id: 'res-ibm-ai-alignment',
    title: 'What Is AI Alignment?',
    organization: 'IBM Think',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://www.ibm.com/think/topics/ai-alignment',
    shortDesc: 'Exploration of steering artificial intelligence systems towards human values, safety objectives, and strict behavioral guardrails.',
    playbookRelevance: 'Contextualizes how Policy-as-Code acts as an external deterministic alignment scaffold preventing LLMs from bypassing clinical access boundaries.',
    tags: ['AI Alignment', 'Guardrails', 'Safety', 'IBM Think']
  },

  // --- Policy-as-Code, IAM & Fine-Grained Access Control ---
  {
    id: 'res-ibm-policy-as-code',
    title: 'What Is Policy as Code (PaC)?',
    organization: 'IBM Think',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.ibm.com/think/topics/policy-as-code',
    shortDesc: 'Foundational guide explaining how security, compliance, and governance rules are codified into software pipelines and DevOps automation.',
    playbookRelevance: 'Explains the core software architecture pattern used by this playbook to replace manual audits with automated OPA and SHACL evaluation.',
    tags: ['Policy as Code', 'PaC', 'DevOps', 'IBM Think']
  },
  {
    id: 'res-keycloak-authz',
    title: 'Keycloak Authorization Services Guide',
    organization: 'Keycloak / Red Hat',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.keycloak.org/docs/latest/authorization_services',
    shortDesc: 'Comprehensive guide to fine-grained access control, User-Managed Access (UMA), policy providers, and resource server integration.',
    playbookRelevance: 'Illustrates how identity federation and claims can feed token attributes into Open Policy Agent admission reviews.',
    citation: 'Keycloak. Authorization Services Guide.',
    tags: ['Keycloak', 'OAuth2', 'RBAC', 'ABAC', 'Authorization']
  },
  {
    id: 'res-opensearch-dls',
    title: 'OpenSearch Document-Level Security (DLS)',
    organization: 'OpenSearch Project / Linux Foundation',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://docs.opensearch.org/latest/security/access-control/document-level-security/',
    shortDesc: 'Restricting access to specific documents within search indexes based on user roles and query filters.',
    playbookRelevance: 'Technical mechanism for enforcing Safe Data tiering, ensuring researchers only see clinical records for their approved project cohort.',
    citation: 'OpenSearch. Document-level security.',
    tags: ['OpenSearch', 'DLS', 'Row-Level Security', 'Access Control']
  },
  {
    id: 'res-opensearch-fls',
    title: 'OpenSearch Field-Level Security (FLS)',
    organization: 'OpenSearch Project / Linux Foundation',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://docs.opensearch.org/latest/security/access-control/field-level-security/',
    shortDesc: 'Granular column/field masking ensuring sensitive identifiers (NHS number, DOB) are scrubbed from search responses.',
    playbookRelevance: 'Implements data minimization (Caldicott Principle 3) by shielding unauthorized fields at the query layer.',
    citation: 'OpenSearch. Field-level security.',
    tags: ['OpenSearch', 'FLS', 'Column Masking', 'Data Minimization']
  },
  {
    id: 'res-opa-docs',
    title: 'Open Policy Agent (OPA) Documentation & Rego Reference',
    organization: 'Cloud Native Computing Foundation (CNCF)',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.openpolicyagent.org/docs/latest/',
    shortDesc: 'Official reference documentation for OPA, the Rego policy language, and Kubernetes admission controller integrations.',
    playbookRelevance: 'The target runtime engine compiled to in `compiler/rdf_to_rego.py` and evaluated at Kubernetes PEP webhooks.',
    tags: ['OPA', 'Rego', 'CNCF', 'PDP', 'PEP']
  },
  {
    id: 'res-w3c-shacl',
    title: 'W3C Shapes Constraint Language (SHACL) Recommendation',
    organization: 'World Wide Web Consortium (W3C)',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.w3.org/TR/shacl/',
    shortDesc: 'The formal W3C recommendation for validating RDF graphs against closed-world shape constraints.',
    playbookRelevance: 'The exact semantic mechanism used to resolve the Open-World Assumption into deterministic closed-world security checks in Phase 2.',
    tags: ['W3C', 'SHACL', 'Validation', 'Closed World']
  },
  {
    id: 'res-w3c-provo',
    title: 'W3C PROV-O: The Provenance Ontology',
    organization: 'World Wide Web Consortium (W3C)',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.w3.org/TR/prov-o/',
    shortDesc: 'The W3C standard defining classes and properties for modeling entities, activities, and agents involved in producing data.',
    playbookRelevance: 'Emitted on every workspace admission and airlock review to produce immutable cryptographic audit trails in Phase 4.',
    tags: ['W3C', 'PROV-O', 'Provenance', 'Audit Trail']
  },
  {
    id: 'res-satre-spec',
    title: 'SATRE: Standard Architecture for Trusted Research Environments',
    organization: 'DARE UK / UKRI / Alan Turing Institute',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://satre-specification.readthedocs.io/en/latest/',
    shortDesc: 'The UK reference standard specification for Trusted Research Environments across 4 core operational pillars.',
    playbookRelevance: 'The foundational architectural blueprint aligned throughout the entire repository and ontology.',
    tags: ['SATRE', 'DARE UK', 'TRE Architecture', 'Turing Institute']
  }
];
