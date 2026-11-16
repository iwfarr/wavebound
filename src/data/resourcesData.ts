export interface ResourceItem {
  id: string;
  title: string;
  organization: string;
  category:
    | 'Statutory Legislation & Regulatory Guidance'
    | 'Statistical Disclosure Control (SDC) & Airlocks'
    | 'NHS Information Governance & Security Toolkits'
    | 'AI Governance, Alignment & MCP Security'
    | 'Policy-as-Code, IAM & Fine-Grained Access Control'
    | 'International Standards (ISO) & Clinical Safety (DCB)';
  url: string;
  shortDesc: string;
  playbookRelevance: string;
  isStatutory?: boolean;
  isCaseStudy?: boolean;
  isAdvisoryGuidance?: boolean;
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
    id: 'res-dea-2017',
    title: 'Digital Economy Act 2017 (Part 5, Chapter 5: Research)',
    organization: 'UK Parliament / The Stationery Office',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.legislation.gov.uk/ukpga/2017/30/part/5/chapter/5',
    shortDesc: 'Statutory legal gateway enabling UK public authorities to disclose de-identified data to accredited researchers for public-benefit research.',
    playbookRelevance: 'Directly formalized in ontology/governance_core.ttl as a primary statutory gateway alongside DPA 2018 and Section 251. Establishes the legal requirement for Accredited Processors and RAP approval in Safe Project checks.',
    isStatutory: true,
    citation: 'UK Parliament. Digital Economy Act 2017, c. 30, Part 5, Chapter 5: Research. London: TSO; 2017.',
    tags: ['DEA 2017', 'Statutory Gateway', 'UKSA', 'Accredited Research', 'Public Benefit']
  },
  {
    id: 'res-uksa-code-practice',
    title: 'UKSA Research Code of Practice and Accreditation Criteria',
    organization: 'UK Statistics Authority (UKSA) / Research Accreditation Panel (RAP)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://uksa.statisticsauthority.gov.uk/digitaleconomyact/research-code-of-practice-and-accreditation-criteria/',
    shortDesc: 'Statutory code approved under Section 70 of DEA 2017 governing accreditation criteria for researchers, projects, and secure processing environments.',
    playbookRelevance: 'Supplies the canonical audit criteria for Safe Person (Accredited Researcher), Safe Project (RAP Ethics & Feasibility), and Safe Setting (Accredited Processor/TRE) mapped to SHACL admission shapes.',
    isStatutory: true,
    citation: 'UK Statistics Authority. Research Code of Practice and Accreditation Criteria. Approved by UK Parliament; 2018 (revised 2022).',
    tags: ['DEA 2017', 'UKSA', 'RAP', 'Accredited Processor', 'Code of Practice']
  },
  {
    id: 'res-adruk-framework',
    title: 'ADR UK Research Governance & DEA Data Linkage Guidelines',
    organization: 'Administrative Data Research UK (ADR UK) / ESRC',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.adruk.org/our-work/browse-all-projects/the-digital-economy-act-and-adr-uk/',
    shortDesc: 'Operational standards and governance protocols for de-identifying, linking, and hosting cross-departmental public authority data under the DEA.',
    playbookRelevance: 'Informs cross-domain linkage rules, privacy preserving record linkage (PPRL), and mandatory disclosure thresholds enforced by the airlock proxy.',
    tags: ['DEA 2017', 'ADR UK', 'Data Linkage', 'PPRL', 'Five Safes']
  },
  {
    id: 'res-uksa-accreditation-policy',
    title: 'UKSA Research Accreditation Policy (V1.4)',
    organization: 'UK Statistics Authority (UKSA) / Research Accreditation Panel (RAP)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://s42615.pcdn.co/wp-content/uploads/Accreditation-Policy-V1.4-1.pdf',
    shortDesc: 'Overarching UKSA statutory policy establishing the legal scope, core accreditation principles, review cycles, and governance responsibilities for researchers, projects, and processing environments under the Digital Economy Act 2017.',
    playbookRelevance: 'Supplies the formal statutory governance hierarchy and multi-stakeholder accountability model codified into ontology/governance_core.ttl.',
    isStatutory: true,
    citation: 'UK Statistics Authority. Research Accreditation Policy (V1.4). Approved by the UK Statistics Authority Board; 2023.',
    tags: ['Accreditation Policy', 'Policy V1.4', 'UKSA', 'RAP', 'DEA 2017', 'Statutory Authority']
  },
  {
    id: 'res-uksa-tre-sop',
    title: 'Accreditation of a Trusted Research Environment SOP (V1.4)',
    organization: 'UK Statistics Authority (UKSA) / Research Accreditation Service',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://s42615.pcdn.co/wp-content/uploads/Accreditation-of-a-Trusted-Research-Environment-standard-operating-procedure-V1.4-1.pdf',
    shortDesc: 'Official UKSA statutory operating procedure detailing the end-to-end accreditation workflow, technical assessment, and governance criteria for certifying TREs and SDEs as DEA Accredited Processors under Section 71.',
    playbookRelevance: 'Directly informs Wavebound’s Phase 1-4 milestone gates and decision records (D-001–D-009), ensuring the policy-as-code architecture satisfies UKSA accreditation auditors.',
    isStatutory: true,
    citation: 'UK Statistics Authority. Accreditation of a Trusted Research Environment Standard Operating Procedure (V1.4). UKSA Research Accreditation Service; 2023.',
    tags: ['TRE Accreditation', 'SOP V1.4', 'UKSA', 'Accredited Processor', 'DEA 2017', 'SDE']
  },
  {
    id: 'res-uksa-tre-saq',
    title: 'TRE Accreditation Self-Assessment Questionnaire (SAQ V3.1)',
    organization: 'UK Statistics Authority (UKSA) / Research Accreditation Panel (RAP)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fs42615.pcdn.co%2Fwp-content%2Fuploads%2FTRE-Accreditation-Self-Assessment-Questionnaire-V3.1.xlsx&wdOrigin=BROWSELINK',
    shortDesc: 'The canonical audit instrument used by UKSA to evaluate technical controls across the Five Safes, including network egress containment, compute sandboxing, airlock SDC, and cryptographic audit logging.',
    playbookRelevance: 'Mapped directly to Wavebound’s automated SHACL shape validations and OPA Rego webhooks in Tab 4 (Checklist) and Tab 5 (Code) of the Implementation Track.',
    isStatutory: true,
    citation: 'UK Statistics Authority. TRE Accreditation Self-Assessment Questionnaire (SAQ V3.1). UKSA Research Accreditation Panel; 2023.',
    tags: ['SAQ V3.1', 'Audit Checklist', 'Five Safes', 'UKSA', 'TRE Accreditation', 'Compliance Matrix']
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
  {
    id: 'res-hra-iras-ig-guide',
    title: 'HRA Pilot: A Draft Guide to Providing Effective IG Assurances in IRAS Submissions',
    organization: 'Health Research Authority (HRA)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://www.hra.nhs.uk/planning-and-improving-research/policies-standards-legislation/data-protection-and-information-governance/pilot-a-draft-guide-to-providing-effective-ig-assurances-in-iras-submissions/',
    shortDesc: 'Official HRA guidance establishing the core Information Governance criteria, transparency evidence, and data protection assurances required for IRAS ethical review submissions.',
    playbookRelevance: 'Defines the exact IG questions, lawful basis documentation, and technical security assurances required by RECs, informing automated admission checks.',
    isStatutory: true,
    citation: 'Health Research Authority (HRA). Pilot: A draft guide to providing effective Information Governance assurances in IRAS submissions. London: HRA; 2023.',
    tags: ['HRA', 'IRAS', 'IG Assurances', 'REC Ethics', 'Research Governance']
  },
  {
    id: 'res-hdr-gateway',
    title: 'Health Data Research Innovation Gateway (HDR UK Gateway)',
    organization: 'Health Data Research UK (HDR UK)',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://healthdatagateway.org/en',
    shortDesc: 'The unified UK national health and population data discovery portal, providing standardized metadata catalogues, cohort discovery, and Data Use Registers.',
    playbookRelevance: 'The primary UK discovery portal for health data assets. Wavebound integrates at the execution layer by binding machine-readable governance constraints to catalogue metadata records.',
    citation: 'Health Data Research UK. Health Data Research Innovation Gateway. London: HDR UK; 2024.',
    tags: ['HDR UK', 'Data Discovery', 'Metadata Catalogue', 'Data Use Register', 'Population Health']
  },
  {
    id: 'res-ehds',
    title: 'European Health Data Space (EHDS) Regulation',
    organization: 'European Commission / European Parliament & Council',
    category: 'Statutory Legislation & Regulatory Guidance',
    url: 'https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en',
    shortDesc: 'EU statutory regulation establishing standardized rules for primary clinical interoperability and secondary use of electronic health data via Health Data Access Bodies (HDABs), Data Permits, and air-gapped Secure Processing Environments (SPEs).',
    playbookRelevance: 'Demonstrates direct international structural overlap with UK Five Safes, CAG/HRA permits, and accredited TRE/SDE settings—enabling harmonized cross-border federated analytics ontologies.',
    isStatutory: true,
    citation: 'European Union. Regulation on the European Health Data Space (EHDS). Brussels: European Commission DG SANTE; 2024.',
    tags: ['EHDS', 'EU Regulation', 'HDAB', 'Data Permit', 'SPE', 'Secondary Use', 'Federated Analytics']
  },

  // --- Statistical Disclosure Control (SDC) & Airlocks ---
  {
    id: 'res-statbarn',
    title: 'Safe Data Access Professionals (SDAP) & StatBarn Community',
    organization: 'Safe Data Access Professionals (SDAP) Network',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://outputchecking.org/',
    shortDesc: 'The definitive UK community repository of Statistical Disclosure Control rules, grouping research outputs into standardized "Statistical Barns" (Frequencies, Position, Means/Totals, Correlation, Shape/Survival).',
    playbookRelevance: 'Authoritative classification taxonomy used by automated SDC checkers (like SACRO) and airlock reviewers to evaluate tabular, regression, and survival model disclosures.',
    citation: 'Safe Data Access Professionals. Statistical Disclosure Control Handbook & Statbarn Classification. UK SDAP Community; 2024.',
    tags: ['StatBarn', 'SDAP', 'Output Checking', 'SDC', 'SACRO', 'Safe Outputs']
  },
  {
    id: 'res-statbarn-srt',
    title: 'Safe Researcher Training: Output SDC & Statbarns Guide',
    organization: 'Safe Researcher Training (SRT) & DARE UK SACRO',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://saferesearchertraining.org/',
    shortDesc: 'The national UK curriculum for accredited researchers and SDC officers, explaining the 5 Statbarns and practical risk mitigation for health and population outputs.',
    playbookRelevance: 'Informs researcher preparation of aggregate tables, survival curves, and regression residuals prior to airlock submission.',
    citation: 'DARE UK SACRO Project & Safe Researcher Training. Output SDC Guidelines and Statbarn Classifications. 2024.',
    tags: ['StatBarn', 'DARE UK', 'SACRO', 'Researcher Training', 'SDC']
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
    url: 'https://saildatabank.com/wp-content/uploads/2022/08/SAIL-POL-024-Output-Review-Policy-v1.2-3.pdf',
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
    playbookRelevance: 'Provides operational rules-of-thumb and principles-based output checking guidance for primary cell suppression ($k \\ge 10$) and dominance bounds ($k\\% \\le 80\\%$) in the playbook.',
    citation: 'Office for National Statistics (ONS). The SRS Output Checking Guidance Document Work strand: Statistical Disclosure Control.',
    tags: ['ONS', 'Secure Research Service', 'Airlock', 'SDC']
  },
  {
    id: 'res-ritchie-principles-sdc',
    title: 'Principles- vs. Rules-Based Output SDC & The Present and Future of the Five Safes',
    organization: 'Felix Ritchie & Mark Elliot / Elizabeth Green (UWE Bristol & University of Manchester)',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://journalprivacyconfidentiality.org/index.php/jpc/article/view/822',
    shortDesc: 'Foundational Five Safes scholarship distinguishing rigid mechanical thresholds from principles-based triage, where k ≥ 10 acts as an initial rule-of-thumb alongside researcher partnership and human output-checker judgement.',
    playbookRelevance: 'Directly informs Govern & Assure’s Principles-Based Triage mode, DARE UK SACRO human-in-the-loop airlock workflows, and compensating Five Safes controls.',
    citation: 'Ritchie, F. & Elliot, M. (2015). Principles- versus rules-based output statistical disclosure control in remote access environments; Green, E. & Ritchie, F. (2023), Journal of Privacy and Confidentiality.',
    tags: ['Five Safes', 'Principles-Based SDC', 'Felix Ritchie', 'SACRO', 'Rules of Thumb']
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
  {
    id: 'res-datashield',
    title: 'DataSHIELD: Distributed Non-Disclosive Federated Data Analysis',
    organization: 'DataSHIELD Community / DARE UK / ELIXIR',
    category: 'Statistical Disclosure Control (SDC) & Airlocks',
    url: 'https://datashield.org/',
    shortDesc: 'Open-source federated analysis infrastructure enabling researchers to run pre-approved statistical models across distributed data custodian servers without pooling row-level microdata, guarded by server-side nfilter disclosure traps.',
    playbookRelevance: 'Complements interactive enclave SDC and airlock review for structured multi-node epidemiological studies; distinct from interactive developer IDEs or LLM coding environments.',
    citation: 'DataSHIELD Consortium. DataSHIELD: Privacy-preserving distributed multi-site analysis platform. 2024.',
    tags: ['DataSHIELD', 'Federated Analytics', 'nfilter', 'Non-Disclosive', 'Distributed Compute']
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
    id: 'res-nhs-data-services',
    title: 'NHS England Data Services & National Datasets Directory',
    organization: 'NHS England',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://digital.nhs.uk/data',
    shortDesc: 'The official national hub for NHS data collections, national data platforms, secondary care feeds (HES/SUS), community prescribing datasets, and national data access governance.',
    playbookRelevance: 'The statutory source catalog for national NHS dataset collections. Wavebound bridges this data discovery directory to runtime enforcement by compiling dataset governance constraints into executable Policy-as-Code admission rules.',
    citation: 'NHS England. Data and information services. Leeds: NHS England; 2024.',
    tags: ['NHS Data', 'NHS England', 'HES', 'SUS', 'Secondary Care', 'Data Platform', 'National Datasets']
  },
  {
    id: 'res-nhs-dtac',
    title: 'NHS Digital Technology Assessment Criteria (DTAC)',
    organization: 'NHS England Transformation Directorate',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://digital.nhs.uk/services/digital-technology-assessment-criteria-dtac',
    shortDesc: 'The national standard baseline assessment across Clinical Safety (DCB0129), Data Protection (DPIA/UK GDPR), Technical Security (Cyber Essentials Plus), Interoperability, and Usability for digital health technologies entering the NHS.',
    playbookRelevance: 'Establishes the unified statutory procurement and governance benchmark for digital health architectures and analytical platforms, aligning DCB0129 clinical risk management, NHS DSPT assurances, and zero-trust cloud security.',
    isStatutory: true,
    citation: 'NHS England. Digital Technology Assessment Criteria (DTAC) for health and social care. London: NHS England Transformation Directorate; 2023.',
    tags: ['DTAC', 'NHS Digital', 'Clinical Safety', 'Cyber Essentials Plus', 'DCB0129', 'Information Governance']
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
  {
    id: 'res-dsa-group',
    title: 'UK Data Standards Authority (DSA) & Open Standards Guidance',
    organization: 'Cabinet Office / CDDO / DSIT Data Standards Authority',
    category: 'NHS Information Governance & Security Toolkits',
    url: 'https://www.gov.uk/government/groups/data-standards-authority',
    shortDesc: 'Cross-government coordination body (alongside the Open Standards Board) publishing recommended open standards and practical guidance for sharing and describing data cleanly across the UK public sector. Referenced as advisory open interoperability guidance rather than mandatory health IG legislation.',
    playbookRelevance: 'Complements health-specific statutory rules (UK GDPR, NHS Act 2006 s251, DSPT) with shared public-sector conventions for open APIs, tabular metadata schemas, data quality ownership, and algorithmic transparency.',
    isAdvisoryGuidance: true,
    citation: 'UK Government. Data Standards Authority (DSA). GOV.UK; 2024.',
    tags: ['DSA', 'Data Standards Authority', 'Open Standards', 'Interoperability', 'Advisory Guidance']
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
    id: 'res-stanford-agentic-ai-framework',
    title: 'Stanford UIT Agentic AI Security Framework',
    organization: 'Stanford University Information Technology (UIT)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://uit.stanford.edu/security/agenticai/security-framework',
    shortDesc: 'Institutional cybersecurity framework for autonomous and agentic AI systems, mandating revocable machine workload identities, blast radius containment, least-privilege tool execution, and clear human accountability.',
    playbookRelevance: 'Authoritative resolution to the Safe Person dilemma: AI cannot hold legal personhood or statutory researcher accreditation under DEA 2017. AI operates strictly under short-lived, automated-revocable workload identities sponsored by an accredited human researcher.',
    citation: 'Stanford University IT. Agentic AI Security Framework. Stanford: Stanford UIT Information Security Office; 2024.',
    tags: ['Stanford UIT', 'Agentic AI', 'Revocable Identity', 'Security Framework', 'AI Governance']
  },
  {
    id: 'res-stanford-agentic-ai-risk-classifications',
    title: 'Stanford UIT Agentic AI Risk Classifications (Sections 8702 & 8938)',
    organization: 'Stanford University Information Technology (UIT)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://uit.stanford.edu/security/agenticai/riskclassifications',
    shortDesc: 'Four-tier classification matrix (Low, Moderate, High, Very High) evaluating autonomous agent autonomy, target data classification, blast radius, and potential harm.',
    playbookRelevance: 'Sections 8702 & 8938 mandate that High and Very High risk agents processing sensitive health or population data require mandatory human-in-the-loop approvals, no direct write access to systems of record, and cryptographic auditability.',
    citation: 'Stanford University IT. Agentic AI Risk Classifications. Stanford: Stanford UIT Information Security Office; 2024.',
    tags: ['Stanford UIT', 'Risk Classification', 'Section 8702', 'Section 8938', 'High-Risk AI']
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
  },
  {
    id: 'res-dare-uk',
    title: 'DARE UK (Data and Analytics Research Environments UK)',
    organization: 'UK Research and Innovation (UKRI)',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://dareuk.org.uk/',
    shortDesc: 'National programme establishing an interoperable network of trustworthy, federated data research environments across the United Kingdom.',
    playbookRelevance: 'Coordinates SATRE, Five Safes RO-Crate, and cross-enclave federation patterns referenced across Wavebound.',
    tags: ['DARE UK', 'UKRI', 'SATRE', 'Federation']
  },
  {
    id: 'res-ro-crate',
    title: 'RO-Crate (Research Object Crate) & Five Safes RO-Crate Profile',
    organization: 'RO-Crate Community / DARE UK / HDR UK',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.researchobject.org/ro-crate/',
    shortDesc: 'Community standard using Schema.org JSON-LD (`ro-crate-metadata.json`) to bundle computational workflows, approvals, datasets, and W3C PROV-O lineage; extended by DARE UK as the Five Safes RO-Crate profile for trusted federated TRE workflows.',
    playbookRelevance: 'Serves as the portable packaging envelope for Wavebound’s PROV-O audit graphs and signed airlock release manifests without replacing closed-world SHACL or OPA policy enforcement.',
    citation: 'Sefton P, Carragáin EÓ, Soiland-Reyes S, et al. RO-Crate Metadata Specification & Five Safes RO-Crate Profile. ResearchObject.org; 2024.',
    tags: ['RO-Crate', 'Five Safes RO-Crate', 'JSON-LD', 'PROV-O', 'W3C', 'DARE UK']
  },
  {
    id: 'res-dsa-csvw-openapi',
    title: 'UK Open Standards for Government Data & APIs (CSVW & OpenAPI 3)',
    organization: 'UK Government Open Standards Board / W3C / OpenAPI Initiative',
    category: 'Policy-as-Code, IAM & Fine-Grained Access Control',
    url: 'https://www.gov.uk/government/publications/open-standards-for-government-data-and-technology',
    shortDesc: 'Recommended UK public-sector open standards pairing CSV on the Web (CSVW, W3C) for machine-readable tabular metadata with OpenAPI 3 for consistent RESTful API contracts. Advisory open interoperability guidance only, leaving fail-closed TRE controls authoritative.',
    playbookRelevance: 'Supports Playbook Phase 3.2 interoperability: CSVW pairs with DCAT/SHACL tabular descriptions, while OpenAPI 3 standardizes HTTP interface contracts around OPA Policy Decision Points (PDPs) and airlock gateways.',
    isAdvisoryGuidance: true,
    citation: 'UK Government Data Standards Authority / Open Standards Board. Open standards for government data and technology. GOV.UK; 2024.',
    tags: ['CSVW', 'OpenAPI 3', 'DSA', 'Open Standards', 'Interoperability', 'DCAT']
  },

  // --- International Standards (ISO) & Clinical Safety (DCB) ---
  {
    id: 'res-iso-42001',
    title: 'ISO/IEC 42001:2023: Artificial Intelligence Management System (AIMS)',
    organization: 'International Organization for Standardization (ISO / IEC)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.iso.org/standard/81230.html',
    shortDesc: 'The premier international certifiable standard specifying requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System (AIMS) across analytics platforms.',
    playbookRelevance: 'Governs AI model training and inferencing inside data analysis & intelligence platforms, establishing auditable controls for model risk classification, algorithmic bias evaluation, and continuous drift monitoring.',
    citation: 'ISO/IEC 42001:2023. Information technology - Artificial intelligence - Management system. Geneva: ISO; 2023.',
    tags: ['ISO 42001', 'AIMS', 'AI Management', 'Algorithmic Risk', 'International Standards']
  },
  {
    id: 'res-iso-27001-27701',
    title: 'ISO/IEC 27001:2022 & ISO/IEC 27701:2019: ISMS & Privacy Information Management',
    organization: 'International Organization for Standardization (ISO / IEC)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.iso.org/standard/27001',
    shortDesc: 'Foundational information security management system (ISMS) controls augmented by ISO 27701 for privacy information management (PIMS) and PII processing.',
    playbookRelevance: 'Mandatory technical baseline required for DEA Accredited Processors and NHS DSPT accreditation; directly mapped to Safe Setting network isolation and cryptographic audit logging.',
    citation: 'ISO/IEC 27001:2022. Information security, cybersecurity and privacy protection - Information security management systems. Geneva: ISO; 2022.',
    tags: ['ISO 27001', 'ISO 27701', 'ISMS', 'PIMS', 'Cybersecurity']
  },
  {
    id: 'res-dcb-0129',
    title: 'DCB0129: Clinical Risk Management in the Manufacture of Health IT Systems',
    organization: 'NHS England / Health and Social Care Information Standards Board',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems',
    shortDesc: 'Mandatory statutory clinical safety standard in England requiring software manufacturers, analytical platform creators, and health algorithm developers to establish a formal Clinical Risk Management Plan, Hazard Log, and Clinical Safety Case Report signed off by a Clinical Safety Officer (CSO).',
    playbookRelevance: 'Directly verified at the airlock before releasing diagnostic or predictive algorithms trained inside data analysis & intelligence platforms. Requires Clinical Safety Officer (CSO) sign-off.',
    isStatutory: true,
    citation: 'NHS England. DCB0129: Clinical Risk Management: Its Application in the Manufacture of Health IT Systems. London: NHS England; 2021.',
    tags: ['DCB0129', 'Clinical Safety', 'CSO', 'Hazard Log', 'NHS Standard']
  },
  {
    id: 'res-dcb-0160',
    title: 'DCB0160: Clinical Risk Management in Healthcare Organisations (Deploying Health IT)',
    organization: 'NHS England / Health and Social Care Information Standards Board',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0160-clinical-risk-management-its-application-in-the-deployment-and-use-of-health-it-systems',
    shortDesc: 'Mandatory standard governing health organisations deploying data analysis platforms, AI tools, and clinical systems, ensuring organizational safety cases and incident management procedures.',
    playbookRelevance: 'Enforced during Phase 4 deployment and Decision Gate D-006 to ensure the host Trust or healthcare institution maintains operational clinical safety governance.',
    isStatutory: true,
    citation: 'NHS England. DCB0160: Clinical Risk Management: Its Application in the Deployment and Use of Health IT Systems. London: NHS England; 2021.',
    tags: ['DCB0160', 'Clinical Safety', 'Deployer Standard', 'NHS Trust', 'Risk Management']
  },
  {
    id: 'res-iso-13485',
    title: 'ISO 13485:2016: Medical Devices - Quality Management Systems (QMS)',
    organization: 'International Organization for Standardization (ISO)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.iso.org/standard/59752.html',
    shortDesc: 'Harmonized international QMS standard for medical device design and manufacture, applicable to Software as a Medical Device (SaMD) pipelines developed inside secure research enclaves.',
    playbookRelevance: 'Provides design controls, document traceability, and validation records for AI and predictive analytics transitioning into regulated clinical software.',
    citation: 'ISO 13485:2016. Medical devices - Quality management systems - Requirements for regulatory purposes. Geneva: ISO; 2016.',
    tags: ['ISO 13485', 'SaMD', 'Medical Devices', 'QMS', 'Regulatory Compliance']
  },
  {
    id: 'res-iso-14971',
    title: 'ISO 14971:2019: Application of Risk Management to Medical Devices',
    organization: 'International Organization for Standardization (ISO)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.iso.org/standard/72704.html',
    shortDesc: 'Comprehensive framework for estimating, evaluating, controlling, and monitoring risks associated with medical devices and Software as a Medical Device (SaMD).',
    playbookRelevance: 'Coupled with DCB0129 to structure algorithmic risk matrices, clinical harm assessments, and risk/benefit ratios for AI models tested in intelligence platforms.',
    citation: 'ISO 14971:2019. Medical devices - Application of risk management to medical devices. Geneva: ISO; 2019.',
    tags: ['ISO 14971', 'Risk Management', 'Medical Devices', 'SaMD', 'Harm Mitigation']
  },
  {
    id: 'res-uk-mdr-samd',
    title: 'UK Medical Devices Regulations 2002 & MHRA Software as a Medical Device (SaMD) Guidance',
    organization: 'Medicines and Healthcare products Regulatory Agency (MHRA)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.gov.uk/government/publications/software-and-artificial-intelligence-ai-as-a-medical-device',
    shortDesc: 'Statutory framework and regulatory guidance governing whether health software, diagnostic algorithms, or AI applications qualify as medical devices in the UK.',
    playbookRelevance: 'Formalized in Wavebound airlock shapes to verify CE/UKCA marking prerequisites and clinical investigation approvals before algorithmic weights can egress the platform.',
    isStatutory: true,
    citation: 'MHRA. Software and Artificial Intelligence (AI) as a Medical Device. London: Department of Health and Social Care; 2023.',
    tags: ['UK MDR 2002', 'MHRA', 'SaMD', 'Medical Device Regulation', 'UKCA']
  },
  {
    id: 'res-iso-5259-22989',
    title: 'ISO/IEC 5259 Series & ISO/IEC 22989: Data Quality for Analytics & ML',
    organization: 'International Organization for Standardization (ISO / IEC)',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.iso.org/standard/81289.html',
    shortDesc: 'Standards for data quality management in analytics, data science, and machine learning pipelines, ensuring completeness, accuracy, and representativeness.',
    playbookRelevance: 'Guides Phase 1 and 2 semantic data profiling, ensuring datasets meet quality thresholds before training sensitive health intelligence algorithms. Pairs with the UK Government Data Quality Framework (six core dimensions and IAO/Data Steward roles) as advisory guidance for operational datasets.',
    citation: 'ISO/IEC 5259-1:2024. Artificial intelligence - Data quality for analytics and machine learning (ML). Geneva: ISO; 2024.',
    tags: ['ISO 5259', 'ISO 22989', 'Data Quality', 'Data Quality Framework', 'Machine Learning', 'Data Governance']
  },
  {
    id: 'res-gov-data-quality-framework',
    title: 'The Government Data Quality Framework',
    organization: 'UK Government Data Quality Hub / Data Standards Authority',
    category: 'International Standards (ISO) & Clinical Safety (DCB)',
    url: 'https://www.gov.uk/government/publications/the-government-data-quality-framework',
    shortDesc: 'UK public-sector framework defining six core data quality dimensions (accuracy, completeness, consistency, timeliness, uniqueness, validity), fitness-for-purpose principles, and Information Asset Owner (IAO) / Data Steward accountability. Advisory interoperability guidance alongside ISO/IEC 5259.',
    playbookRelevance: 'Pairs alongside ISO/IEC 5259 to give non-ML operational, administrative, and linked health datasets a shared public-sector quality vocabulary for ingestion profiling and steward sign-off.',
    isAdvisoryGuidance: true,
    citation: 'UK Government Data Quality Hub. The Government Data Quality Framework. GOV.UK; 2020 (updated 2023).',
    tags: ['Data Quality Framework', 'ISO 5259', 'DSA', 'IAO', 'Data Steward', 'Advisory Guidance']
  },

  // --- Authoritative Resources: AI & LLMs in NHS Healthcare ---
  {
    id: 'res-nhse-generative-ai',
    title: 'NHS England Guidance: Using Generative AI in Health and Social Care',
    organization: 'NHS England & Department of Health and Social Care (DHSC)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://www.england.nhs.uk/long-read/guidance-for-using-generative-ai-in-health-and-care/',
    shortDesc: 'Official NHS England guidance establishing binding rules for generative AI and LLMs: strictly prohibits inputting confidential patient data or identifiable information (PID) into commercial, public, or uncontracted third-party AI tools (such as public ChatGPT, Claude, or GitHub Copilot on developer laptops). Mandates DSPT-accredited sovereign boundaries or certified in-enclave inference.',
    playbookRelevance: 'Authoritative statutory baseline establishing that commercial cloud LLMs cannot process patient identifiable data outside a certified TRE/SDE boundary without explicit Section 251 CAG exemption and Article 28 data processing agreements.',
    isStatutory: true,
    citation: 'NHS England. Guidance for using generative AI in health and care. London: Transformation Directorate; 2024.',
    tags: ['NHS Generative AI', 'Commercial LLMs', 'Patient Confidentiality', 'PID Prohibition', 'DSPT', 'Sovereignty']
  },
  {
    id: 'res-ico-generative-ai',
    title: 'ICO Guidance on Generative AI and Data Protection (Special Category Health Data)',
    organization: 'Information Commissioner’s Office (ICO)',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/',
    shortDesc: 'Statutory guidance from the UK Data Protection Authority outlining purpose limitation, lawful basis under Article 6 & 9 for training or fine-tuning models on health data, the prohibition of unconsented secondary model training, and developer liability under UK GDPR.',
    playbookRelevance: 'Mandates that third-party AI coding extensions (e.g. Copilot, Codex) that capture editor buffers, terminal logs, or SQL queries containing patient microdata constitute unauthorized international transfers and unlawful secondary processing.',
    isStatutory: true,
    citation: 'Information Commissioner’s Office. Guidance on AI and data protection. Wilmslow: ICO; 2024.',
    tags: ['ICO', 'Generative AI', 'UK GDPR', 'Special Category Data', 'Article 9', 'Model Memorization']
  },
  {
    id: 'res-ndg-ai-guidance',
    title: 'National Data Guardian (NDG) Position: Artificial Intelligence and Patient Confidentiality',
    organization: 'National Data Guardian for Health and Care',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://www.gov.uk/government/organisations/national-data-guardian',
    shortDesc: 'Authoritative guidance on applying the Eight Caldicott Principles to clinical AI systems: mandates that patient data must remain safe (Principle 7) and patients must not be surprised by how their data is analyzed or used in algorithmic pipelines (Principle 8: No Surprises).',
    playbookRelevance: 'Reinforces the requirement that AI workloads operate strictly under named human Clinical Safety Officer (CSO) sponsorship, precluding autonomous patient data processing outside certified environments.',
    isStatutory: true,
    citation: 'National Data Guardian. Guidance on clinical AI, transparency and Caldicott stewardship. London: NDG; 2023.',
    tags: ['Caldicott 8', 'NDG', 'Patient Trust', 'Clinical AI', 'Confidentiality', 'Human Sponsorship']
  },
  {
    id: 'res-atrs-hub',
    title: 'Algorithmic Transparency Recording Standard (ATRS) Hub',
    organization: 'Government Digital Service (GDS) / DSIT / CDDO',
    category: 'AI Governance, Alignment & MCP Security',
    url: 'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub',
    shortDesc: 'UK public-sector transparency standard providing a structured two-tier public record (plain-English Tier 1 summary plus Tier 2 technical, data, and risk details) for algorithmic and AI tools. Referenced here as optional open transparency guidance complementing NHS Caldicott Principle 8.',
    playbookRelevance: 'Complements Wavebound’s Caldicott Principle 8 Public Data Use Register and AI governance views by offering an established public-sector structure for explaining model purpose, datasets, and human oversight.',
    isAdvisoryGuidance: true,
    citation: 'Government Digital Service & Central Digital and Data Office. Algorithmic Transparency Recording Standard (ATRS) Hub. GOV.UK; 2024.',
    tags: ['ATRS', 'Algorithmic Transparency', 'Caldicott 8', 'AI Governance', 'DSA', 'Advisory Guidance']
  }
];
