export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  citation: string;
  tags: string[];
}

export const CURATED_QUIZ_BANK: QuizQuestion[] = [
  {
    "id": "fsg_f_01",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Which dimension of the Five Safes framework specifically evaluates whether researchers possess verified professional credentials and up-to-date Information Governance (IG) training?",
    "options": [
      "Safe Person",
      "Safe Setting",
      "Safe Project",
      "Safe Data"
    ],
    "correctIndex": 0,
    "explanation": "Safe Person ensures only accredited researchers with verified identities, institutional backing, and current IG certification are granted access.",
    "citation": "Digital Economy Act 2017 Part 5 & ONS Research Code of Practice",
    "tags": [
      "Five Safes",
      "Accreditation",
      "Safe Person"
    ]
  },
  {
    "id": "fsg_f_02",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Under the Eight Caldicott Principles, what is the primary mandate of Caldicott Principle 1?",
    "options": [
      "Share identifiable patient datasets whenever external commercial or academic partners request them for exploratory pilot studies",
      "Justify the purpose(s) for using or transferring confidential information",
      "Publish aggregated hospital metrics openly without applying statistical disclosure controls or independent governance scrutiny",
      "Retain all historical medical records indefinitely in centralized research lakes regardless of project expiry dates"
    ],
    "correctIndex": 1,
    "explanation": "Caldicott Principle 1 requires that every proposed use or transfer of confidential patient information must be clearly defined, scrutinized, and documented by an appropriate guardian.",
    "citation": "National Data Guardian Caldicott Principles (Principles 1–8)",
    "tags": [
      "Caldicott",
      "Principle 1",
      "Confidentiality"
    ]
  },
  {
    "id": "fsg_f_03",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What is the specific requirement established by Caldicott Principle 8 (introduced in December 2020)?",
    "options": [
      "Mandate quarterly cryptographic key rotations and hardware security module attestations for every research database administrator",
      "Require all predictive healthcare algorithms to be retrained exclusively on statistically perturbed synthetic patient cohorts",
      "Inform patients and the public about how their confidential data is used and shared",
      "Restrict clinical data transfers to physical encrypted media couriers rather than authenticated institutional API gateways"
    ],
    "correctIndex": 2,
    "explanation": "Caldicott Principle 8 establishes the affirmative obligation to inform patients and service users about how their confidential data is utilized (public transparency, plain-English registers, and PPIE engagement).",
    "citation": "National Data Guardian Review (Principle 8: No Surprises)",
    "tags": [
      "Caldicott",
      "Principle 8",
      "Transparency"
    ]
  },
  {
    "id": "fsg_f_04",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Which statutory gateway in the UK permits confidential patient information to be processed for medical research without individual consent when consent is unfeasible?",
    "options": [
      "Consumer Rights Act 2015 Section 42 (enforced by local Trading Standards and NHS Digital Procurement)",
      "Freedom of Information Act 2000 Section 12 (administered by the Information Commissioner's Office)",
      "Mental Capacity Act 2005 Section 30 (exclusively governing emergency pharmaceutical clinical trials)",
      "NHS Act 2006 Section 251 (administered by the Confidentiality Advisory Group)"
    ],
    "correctIndex": 3,
    "explanation": "Section 251 of the NHS Act 2006 allows the Secretary of State for Health (advised by the Confidentiality Advisory Group, CAG) to temporarily lift the common law duty of confidentiality for medical research.",
    "citation": "NHS Act 2006 § 251 & Health Service (Control of Patient Information) Regulations 2002",
    "tags": [
      "Statutory Gateway",
      "Section 251",
      "CAG"
    ]
  },
  {
    "id": "fsg_f_05",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Under UK GDPR, what lawful basis pair is standard for public health bodies processing patient data for health research?",
    "options": [
      "Article 6(1)(e) public task and Article 9(2)(j) scientific research / public interest archiving",
      "Article 6(1)(a) explicit patient opt-in consent and Article 9(2)(a) explicit healthcare marketing consent",
      "Article 6(1)(b) contractual necessity with the NHS Trust and Article 9(2)(b) employment and social security law",
      "Article 6(1)(f) commercial legitimate interests and Article 9(2)(f) establishment or defence of legal claims"
    ],
    "correctIndex": 0,
    "explanation": "Public authority research platforms rely on Article 6(1)(e) (public interest task) and Article 9(2)(j) (research in the public interest with Article 89(1) technical safeguards).",
    "citation": "UK GDPR Articles 6 & 9, Data Protection Act 2018 Section 19",
    "tags": [
      "UK GDPR",
      "Lawful Basis",
      "Article 6",
      "Article 9"
    ]
  },
  {
    "id": "fsg_f_06",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "In the Five Safes framework, what does 'Safe Setting' mandate for an analytical research environment?",
    "options": [
      "A physically isolated clinical records room with locked filing cabinets and manual sign-in logs for visiting investigators",
      "A secure environment (such as an air-gapped enclave or TRE) preventing unauthorized egress or data extraction",
      "A shared institutional cloud storage bucket configured with role-based permissions allowing direct bulk dataset downloads",
      "A federated external SFTP gateway permitting encrypted nightly batch extraction of raw records to university workstations"
    ],
    "correctIndex": 1,
    "explanation": "Safe Setting guarantees that data is processed within a secure perimeter (e.g., zero WAN egress, virtual desktop infrastructure, bastion jump-hosts) that prevents data exfiltration.",
    "citation": "Five Safes Framework & SATRE v1.1 Pillar 2",
    "tags": [
      "Five Safes",
      "Safe Setting",
      "Enclave"
    ]
  },
  {
    "id": "fsg_f_07",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What does the National Data Opt-Out (NDOO) in NHS England allow patients to do?",
    "options": [
      "Opt out of receiving direct clinical treatment or emergency hospital referrals from their local GP practice",
      "Prevent their NHS Number from being recorded on internal hospital inpatient charts or laboratory test orders",
      "Opt out of having their confidential patient data used for research and planning purposes",
      "Demand immediate erasure of their entire historic clinical record from GP systems under absolute right to be forgotten"
    ],
    "correctIndex": 2,
    "explanation": "The National Data Opt-Out enables patients to opt out of their confidential health and care data being used for research and planning purposes beyond their direct individual care.",
    "citation": "NHS England National Data Opt-Out Policy Guidance",
    "tags": [
      "NDOO",
      "Opt-Out",
      "Patient Rights"
    ]
  },
  {
    "id": "fsg_f_08",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What is the purpose of Public, Patient, and Service User Involvement and Engagement (PPIE) in health research governance?",
    "options": [
      "To replace formal Data Protection Impact Assessments with binding community referendums prior to system deployment",
      "To recruit unpaid citizen volunteers to write production database queries and validate statistical regression code",
      "To waive statutory NHS Research Ethics Committee and CAG reviews whenever a patient charity endorses the research",
      "To incorporate lived experience, review lay data flows, test public benefit, and build public trust"
    ],
    "correctIndex": 3,
    "explanation": "PPIE ensures that public and patient representatives review the study design, validate that data use aligns with reasonable expectations of privacy, and verify genuine public benefit.",
    "citation": "HRA UK Standards for Public Involvement & Caldicott Principle 8",
    "tags": [
      "PPIE",
      "Public Engagement",
      "Governance"
    ]
  },
  {
    "id": "fsg_f_09",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "In the context of the Five Safes, what is the defining criterion of a 'Safe Project'?",
    "options": [
      "The research design must have documented public benefit, legal clearance, and ethical approval",
      "The analytical codebase must pass continuous integration tests within 30 days using zero open-source package dependencies",
      "The research consortium must use exclusively certified commercial software licenses and privately owned enclave servers",
      "The proposed study must be financially underwritten by a national life sciences venture capital partner or pharmaceutical firm"
    ],
    "correctIndex": 0,
    "explanation": "Safe Project verifies that the proposed research has clear public benefit, formal ethical clearance (e.g., HRA REC), and adheres to lawful data processing mandates.",
    "citation": "Five Safes Framework & HRA Research Ethics Committee Governance",
    "tags": [
      "Five Safes",
      "Safe Project",
      "Ethics"
    ]
  },
  {
    "id": "fsg_f_10",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Under the UK Data Protection Act 2018, which role is legally responsible for advising the organisation on data protection compliance and monitoring audits?",
    "options": [
      "Senior Information Risk Owner (SIRO)",
      "Data Protection Officer (DPO)",
      "Caldicott Guardian",
      "Chief Technology Officer (CTO)"
    ],
    "correctIndex": 1,
    "explanation": "Under UK GDPR Article 37–39 and DPA 2018, the Data Protection Officer (DPO) independently advises the organisation on data protection obligations and acts as point of contact for the ICO.",
    "citation": "UK GDPR Article 37–39 & Data Protection Act 2018",
    "tags": [
      "DPO",
      "UK GDPR",
      "Roles"
    ]
  },
  {
    "id": "fsg_f_11",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What is the distinction between a Caldicott Guardian and a Data Protection Officer (DPO)?",
    "options": [
      "There is no legal or operational distinction; both titles refer interchangeably to the same statutory GDPR supervisory post",
      "The Caldicott Guardian is appointed solely by private health tech vendors; the DPO manages hospital clinical ward staffing",
      "The Caldicott Guardian champions ethical confidentiality of patient data; the DPO oversees statutory UK GDPR compliance",
      "The DPO only audits HR payroll and corporate procurement files, whereas the Caldicott Guardian manages IT network firewalls"
    ],
    "correctIndex": 2,
    "explanation": "A Caldicott Guardian acts as the conscience of an NHS/social care organisation regarding patient confidentiality and ethical data use; the DPO oversees statutory compliance with data protection legislation.",
    "citation": "UK Caldicott Guardian Council Guidance & UK GDPR",
    "tags": [
      "Caldicott Guardian",
      "DPO",
      "Governance Roles"
    ]
  },
  {
    "id": "fsg_f_12",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What does 'Safe Outputs' require before analytical results can be exported from a secure data enclave?",
    "options": [
      "Results must be rasterized into high-resolution compressed image files to prevent automated text extraction by downstream users",
      "All numeric counts in aggregate tables must be multiplied by randomized calibration constants before leaving the server perimeter",
      "Outputs must be compressed into password-protected archives and transmitted via encrypted email directly to the principal investigator",
      "Results must undergo Statistical Disclosure Control (SDC) checks to prevent re-identification of individuals"
    ],
    "correctIndex": 3,
    "explanation": "Safe Outputs requires rigorous Statistical Disclosure Control (SDC) review to eliminate small cell counts, unbinned microdata, or dominant contributors before results leave the enclave.",
    "citation": "Five Safes Framework & ONS SDC Guidance for Health Research",
    "tags": [
      "Five Safes",
      "Safe Outputs",
      "SDC"
    ]
  },
  {
    "id": "fsg_f_13",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Under UK GDPR Article 35, when is a Data Protection Impact Assessment (DPIA) mandatory?",
    "options": [
      "When processing is likely to result in a high risk to individuals, including large-scale processing of special category health data",
      "Only when procuring off-the-shelf clinical workstation hardware or renewing annual institutional software maintenance contracts across trust sites",
      "Only retrospectively after an organisation experiences a reportable personal data breach involving special category records and external ICO inquiry",
      "Whenever an accredited researcher updates their institutional ORCID profile or changes university departmental affiliation"
    ],
    "correctIndex": 0,
    "explanation": "Article 35 mandates a DPIA when processing operations involve high risks, specifically large-scale processing of special category personal data such as health, genetic, or biometric data.",
    "citation": "UK GDPR Article 35 & ICO DPIA Guidance",
    "tags": [
      "DPIA",
      "UK GDPR",
      "Risk Assessment"
    ]
  },
  {
    "id": "fsg_f_14",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "What is the fundamental difference between pseudonymisation and anonymisation under UK data protection law?",
    "options": [
      "Pseudonymised datasets may be published openly in academic journals under open licences without restriction; anonymised data still requires a full DPIA",
      "Pseudonymised data remains personal data because it can be re-linked with a separate key; truly anonymised data is not personal data",
      "Anonymisation is a reversible masking step performed during ETL ingestion using lookup salts; pseudonymisation permanently destroys all linkage keys",
      "There is no statutory distinction under UK GDPR; both terms carry identical Data Protection Act 2018 compliance obligations"
    ],
    "correctIndex": 1,
    "explanation": "Under UK GDPR Recital 26 and Article 4(5), pseudonymised data retains re-identification potential via additional keys and remains personal data. Fully anonymised data falls outside data protection law.",
    "citation": "UK GDPR Recital 26 & ICO Anonymisation Code of Practice",
    "tags": [
      "Anonymisation",
      "Pseudonymisation",
      "UK GDPR"
    ]
  },
  {
    "id": "fsg_f_15",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "Which Caldicott Principle states: 'The duty to share information for individual care is as important as the duty to protect patient confidentiality'?",
    "options": [
      "Principle 2",
      "Principle 4",
      "Principle 7",
      "Principle 8"
    ],
    "correctIndex": 2,
    "explanation": "Caldicott Principle 7 (added following Dame Fiona Caldicott’s 2013 review) highlights that health professionals should have the confidence to share information in the best interests of patients.",
    "citation": "Information: To Share Or Not To Share? The Information Governance Review (2013)",
    "tags": [
      "Caldicott",
      "Principle 7",
      "Duty to Share"
    ]
  },
  {
    "id": "fsg_i_01",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "When a research team seeks to link primary care GP records with secondary care hospital episode statistics (HES), what dual governance approvals are typically required?",
    "options": [
      "Intellectual property office registration alongside institutional finance committee sign-off on data storage cost recovery",
      "Local practice manager consensus vote paired with a commercial credit reference check on the research grant holder",
      "Unilateral sign-off by the electronic health record database vendor together with an external penetration test certificate",
      "HRA Research Ethics Committee (REC) favorable opinion and statutory CAG Section 251 approval (or explicit consent)"
    ],
    "correctIndex": 3,
    "explanation": "Linking identifiable patient cohorts without universal consent requires statutory Section 251 clearance from CAG (to lift CLDC) alongside an ethical review from an accredited HRA REC.",
    "citation": "Health Research Authority (HRA) & Confidentiality Advisory Group (CAG) Dual Review Framework",
    "tags": [
      "Linkage",
      "Section 251",
      "HRA REC"
    ]
  },
  {
    "id": "fsg_i_02",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "How does Part 5, Chapter 5 of the Digital Economy Act 2017 interact with health and social care research in the UK?",
    "options": [
      "It provides a statutory framework for public authorities to share non-health administrative data with accredited researchers via accredited processors (UKSA)",
      "It grants accredited universities unrestricted rights to download raw hospital clinical microdata extracts to on-premise departmental research servers",
      "It repeals the Common Law Duty of Confidentiality and Data Protection Act 2018 for NHS-commissioned health analytics startups and external collaborators",
      "It mandates that primary care providers publish unlinked episodic clinical notes in open public research repositories"
    ],
    "correctIndex": 0,
    "explanation": "Part 5 of the Digital Economy Act 2017 establishes accreditation for researchers, projects, and secure processing environments through the UK Statistics Authority (UKSA) for public authority data sharing.",
    "citation": "Digital Economy Act 2017 Part 5, Chapter 5 (Sections 64–73)",
    "tags": [
      "DEA 2017",
      "UKSA",
      "Accreditation"
    ]
  },
  {
    "id": "fsg_i_03",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "Under the ICO Anonymisation Code of Practice, what is the 'motivated intruder' test?",
    "options": [
      "A physical security inspection testing whether external penetration auditors can bypass enclave server room biometric doors and badge access controls",
      "An assessment of whether a reasonably competent person with motivation, public databases, and investigative tools could re-identify an individual",
      "An automated external network penetration test attempting to breach TLS termination proxies, defeat mTLS checks, and intercept enclave API credentials",
      "A mandatory psychological integrity screening administered by HR before granting Safe Person accreditation to applicants"
    ],
    "correctIndex": 1,
    "explanation": "The motivated intruder test assesses whether someone without prior insider knowledge, but reasonably motivated, could re-identify individuals by cross-referencing available records.",
    "citation": "ICO Anonymisation and Pseudonymisation Guidance & Code of Practice",
    "tags": [
      "Motivated Intruder",
      "Re-identification",
      "ICO"
    ]
  },
  {
    "id": "fsg_i_04",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is Privacy-Preserving Record Linkage (PPRL) using cryptographic Bloom filters designed to achieve?",
    "options": [
      "Losslessly compressing multi-gigabyte DICOM radiology imaging archives so diagnostic neural networks execute faster inside GPU research enclaves",
      "Encrypting physical database storage volumes at rest using envelope keys to protect hospital servers against unauthorized disk drive removal or theft",
      "Enabling distinct healthcare databases to link records of the same patient without either site revealing clear-text identifiers",
      "Synthesizing realistic longitudinal free-text clinical narratives from structured EHR tables using generative language models"
    ],
    "correctIndex": 2,
    "explanation": "PPRL maps identifiable tokens (e.g., name, birth date) into bit-vector Bloom filters with cryptographic hashing, enabling mathematical similarity matching across silos without disclosing clear-text PII.",
    "citation": "International Journal of Population Data Science (PPRL in Healthcare Research)",
    "tags": [
      "PPRL",
      "Bloom Filters",
      "Linkage"
    ]
  },
  {
    "id": "fsg_i_05",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "Under UK GDPR Article 33, within what timeframe must a personal data breach posing a risk to individuals be reported to the Information Commissioner’s Office (ICO)?",
    "options": [
      "Strictly within 24 hours of the initial automated SIEM anomaly alert, regardless of whether personal data exposure is confirmed",
      "Within 30 calendar days once internal forensic remediation is finished and the Senior Information Risk Owner signs off",
      "Only during the annual NHS Data Security and Protection Toolkit submission unless media coverage occurs earlier",
      "Without undue delay and, where feasible, not later than 72 hours after becoming aware of it"
    ],
    "correctIndex": 3,
    "explanation": "UK GDPR Article 33 requires data controllers to notify the ICO of a personal data breach without undue delay and within 72 hours of becoming aware of it, unless unlikely to result in a risk to rights and freedoms.",
    "citation": "UK GDPR Article 33 & ICO Breach Notification Protocol",
    "tags": [
      "Breach Notification",
      "UK GDPR",
      "72 Hours"
    ]
  },
  {
    "id": "fsg_i_06",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What role does the Senior Information Risk Owner (SIRO) play in health and care organisations?",
    "options": [
      "The SIRO is an Executive Director who takes overall strategic ownership of information risk across the organization",
      "The SIRO authors database schema migrations and optimizes SQL query performance across clinical research data warehouses",
      "The SIRO acts as chief hospital clinical coder supervising ICD-10 and SNOMED-CT diagnosis mapping for national submissions",
      "The SIRO serves as external defense counsel representing the NHS Trust in statutory clinical negligence litigation proceedings"
    ],
    "correctIndex": 0,
    "explanation": "The SIRO is a board-level executive responsible for understanding how strategic business goals may be impacted by information risks and overseeing the risk appetite and incident response.",
    "citation": "NHS England Information Governance Framework & SIRO Guidance",
    "tags": [
      "SIRO",
      "Information Risk",
      "Executive Governance"
    ]
  },
  {
    "id": "fsg_i_07",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "How should a research platform operationalize Caldicott Principle 8 (Public Transparency) under HDR UK Gateway standards?",
    "options": [
      "By publishing a redacted individual-level summary of every patient's longitudinal hospital admissions and diagnoses on an open academic preprint server",
      "By publishing a standardized, machine-readable Public Data Use Register detailing project title, applicants, data assets, public benefit, and lay summaries",
      "By mailing annual paper transparency leaflets containing full database extraction SQL scripts and researcher rosters to every household in the Trust catchment",
      "By streaming live researcher terminal sessions onto a public institutional dashboard for continuous citizen inspection"
    ],
    "correctIndex": 1,
    "explanation": "The HDR UK Data Use Register standard requires publishing structured metadata for all approved data access requests: research questions, data assets utilized, public benefit statement, and lay summaries.",
    "citation": "HDR UK National Data Use Register Standard & Caldicott Principle 8",
    "tags": [
      "Data Use Register",
      "HDR UK",
      "Public Transparency"
    ]
  },
  {
    "id": "fsg_i_08",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is the legal effect of a Common Law Duty of Confidentiality (CLDC) breach, even if UK GDPR lawful basis exists?",
    "options": [
      "No legal consequence arises because statutory UK GDPR Article 9(2)(j) automatically extinguishes the common law duty in all cases",
      "The research team is granted a retroactive six-month grace period to collect individual signatures without pausing data extraction",
      "The processing remains unlawful; UK GDPR and CLDC are separate legal requirements that must both be satisfied",
      "Only civil contract remedies apply to the software supplier; public health controllers face no statutory confidentiality liability"
    ],
    "correctIndex": 2,
    "explanation": "In the UK, data protection legislation (UK GDPR / DPA 2018) and the Common Law Duty of Confidentiality operate concurrently. Having a GDPR lawful basis does not override the common law duty without consent or statutory gateway.",
    "citation": "NHS England Transformation Directorate Information Governance Guidance on CLDC",
    "tags": [
      "CLDC",
      "Common Law",
      "UK GDPR"
    ]
  },
  {
    "id": "fsg_i_09",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "In a federated analytics network (e.g., OpenSAFELY or OHDSI OMOP), how does the governance posture differ from a centralized data repository?",
    "options": [
      "Federated networks waive all UK GDPR, Caldicott, and Data Security Protection Toolkit requirements because queries run remotely on hospital-owned nodes",
      "Federated architectures mandate distributing encrypted copies of raw longitudinal patient tables onto each participating investigator's local workstation",
      "Federated analytics cannot obtain HRA Ethics approval in the UK because data controllers cannot inspect centralized SQL execution logs",
      "Data remains behind local hospital firewalls; only aggregated code queries and non-identifiable summary outputs cross organizational boundaries"
    ],
    "correctIndex": 3,
    "explanation": "Federated analytics moves the analytical code to the data rather than pooling patient microdata into a central repository, drastically reducing centralized re-identification exposure.",
    "citation": "Goldacre Review (Better, Broader, Safer: Using Health Data for Research and Analysis, 2022)",
    "tags": [
      "Federated Analytics",
      "OpenSAFELY",
      "Governance Architecture"
    ]
  },
  {
    "id": "fsg_i_10",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is a Data Access Agreement (DAA) or Data Sharing Agreement (DSA) legally designed to govern?",
    "options": [
      "The terms, approved purpose, security safeguards, permitted personnel, and breach liabilities between data controllers and recipients",
      "The commercial procurement pricing, SLA uptime guarantees, and cloud GPU compute quotas negotiated bilaterally with infrastructure hosting vendors",
      "The open-source intellectual property licensing terms and attribution notices governing third-party Python and R packages installed inside the enclave",
      "The physical network cabling topology and broadband peering agreements linking regional hospital trusts to national backbones"
    ],
    "correctIndex": 0,
    "explanation": "A DSA/DAA sets out the shared purpose, legal basis, data minimization specifications, transfer security, audit rights, and termination procedures between participating data controllers.",
    "citation": "ICO Data Sharing Code of Practice (Statutory Code under DPA 2018 § 121)",
    "tags": [
      "Data Sharing Agreement",
      "Contracts",
      "ICO Code"
    ]
  },
  {
    "id": "fsg_i_11",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "Under what specific condition can a commercial life sciences company access data held within an NHS Secure Data Environment (SDE)?",
    "options": [
      "Whenever a commercial partner pays standard data access fees to download raw pseudonymised microdata extracts to private corporate clouds",
      "Only when operating inside the SDE on an accredited, approved project with clear NHS public benefit and no microdata egress",
      "Commercial pharmaceutical and life sciences firms are categorically prohibited under UK law from analyzing NHS data in any environment",
      "Only when every data scientist employed by the sponsoring commercial firm holds an active UK General Medical Council clinical license"
    ],
    "correctIndex": 1,
    "explanation": "Commercial organizations can analyze NHS data within SDEs/TREs, provided the project is approved, accredited, demonstrates clear public and healthcare benefit, and enforces zero raw microdata egress.",
    "citation": "NHS England Data for R&D Programme: Guidelines for Working with Commercial Partners",
    "tags": [
      "Commercial Access",
      "NHS SDE",
      "Public Benefit"
    ]
  },
  {
    "id": "fsg_i_12",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "When a project’s research protocol expands to investigate an entirely new disease cohort not covered in the original HRA REC application, what is the required governance step?",
    "options": [
      "Proceed immediately with querying the expanded cohort and attach an updated study summary during the annual research closure report",
      "Revoke the original ethical opinion entirely and re-run the new disease cohort analysis solely under internal Caldicott Guardian sign-off",
      "Submit a formal substantial amendment to the HRA Research Ethics Committee and obtain favorable opinion before accessing the new cohort",
      "Notify the database engineering team to widen the enclave's SQL row-level security view without seeking external ethics review"
    ],
    "correctIndex": 2,
    "explanation": "Under UK Governance Arrangements for Research Ethics Committees (GAfREC), any significant change to study population, objectives, or methodology requires a formal substantial amendment approval.",
    "citation": "Governance Arrangements for Research Ethics Committees (GAfREC) § 5.8",
    "tags": [
      "HRA Amendment",
      "REC",
      "Ethics Governance"
    ]
  },
  {
    "id": "fsg_i_13",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is the function of an independent Data Access Advisory Group (DAAG) or Data Access Committee (DAC)?",
    "options": [
      "To author institutional branding guidelines, plain-English privacy notices, and public relations releases for hospital research portals",
      "To administer research grant payroll disbursements, university fellowship stipends, and cross-institutional equipment procurement",
      "To replace the Information Commissioner's Office in adjudicating statutory enforcement notices and criminal data protection prosecutions",
      "To impartially evaluate whether data access applications fulfill public benefit, ethical, and technical governance standards"
    ],
    "correctIndex": 3,
    "explanation": "A DAAG/DAC provides independent, multi-disciplinary scrutiny of data applications, advising data custodians on whether requests meet ethical, legal, and public benefit requirements.",
    "citation": "NHS England Data Access Advisory Group Terms of Reference",
    "tags": [
      "DAAG",
      "DAC",
      "Governance Review"
    ]
  },
  {
    "id": "fsg_i_14",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is the significance of the 'Safe Data' principle regarding data minimization under UK GDPR Article 5(1)(c)?",
    "options": [
      "Data accessed must be adequate, relevant, and limited to what is strictly necessary in relation to the approved research purposes",
      "All historically collected patient variables should be ingested into the project workspace in case exploratory correlations emerge later",
      "Research datasets must be replicated across at least five geographically separate hardware storage arrays to prevent accidental data loss",
      "Analysts may only query clinical episodes recorded within the most recent rolling seven-day window prior to extraction"
    ],
    "correctIndex": 0,
    "explanation": "UK GDPR Article 5(1)(c) enforces data minimization: the Safe Data tier ensures only the exact fields and cohorts justified by the study protocol are made available to investigators.",
    "citation": "UK GDPR Article 5(1)(c) & Caldicott Principle 3 (Minimum Necessary)",
    "tags": [
      "Data Minimization",
      "UK GDPR",
      "Safe Data"
    ]
  },
  {
    "id": "fsg_i_15",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What was the primary conclusion of the Goldacre Review (2022) regarding health data access for research across the NHS?",
    "options": [
      "Raw pseudonymised patient extracts should be transmitted directly to university HPC clusters as encrypted CSV archives upon local trust approval",
      "Secure Data Environments (SDEs / TREs) should become the default mechanism for health data access, replacing the dissemination of cut-down data extracts",
      "Secondary use of NHS clinical data for external academic research should be suspended until individual written opt-in consent is re-collected nationwide",
      "Commercial cloud virtualization should be banned across all NHS Trusts in favor of disconnected departmental desktop workstations"
    ],
    "correctIndex": 1,
    "explanation": "The Goldacre Review strongly recommended moving from data dissemination (sending data files out to researchers) to data access within secure, transparent Secure Data Environments (TREs/SDEs).",
    "citation": "Goldacre Review (2022: Better, Broader, Safer)",
    "tags": [
      "Goldacre Review",
      "TRE",
      "Secure Data Environments"
    ]
  },
  {
    "id": "fsg_a_01",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "In quantitative re-identification risk modeling, what distinguishes the 'Prosecutor Risk' model from the 'Journalist Risk' model?",
    "options": [
      "The Prosecutor model assesses physical facility intrusion and privileged insider theft threats; the Journalist model evaluates external social engineering leaks and media breaches",
      "The Prosecutor model applies solely to forensic toxicology and statutory criminal court records; the Journalist model governs aggregated public health epidemiological press releases",
      "The Prosecutor model assumes the attacker knows a specific target individual is in the dataset; the Journalist model assumes the attacker does not know if the target is present",
      "There is no mathematical distinction between the two threat models; both compute identical hypergeometric population uniqueness bounds"
    ],
    "correctIndex": 2,
    "explanation": "Prosecutor risk calculates the probability of re-identification given the adversary knows the target is in the data. Journalist risk calculates the probability when the adversary does not know if the target is present.",
    "citation": "El Emam et al. (Guide to the De-Identification of Personal Health Information)",
    "tags": [
      "Prosecutor Risk",
      "Journalist Risk",
      "Re-identification Modeling"
    ]
  },
  {
    "id": "fsg_a_02",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "How does W3C PROV-O ontology integration establish non-repudiable audit lineage for governance decisions in a policy-as-code platform?",
    "options": [
      "By archiving daily voice recordings of Data Access Governance Board meetings alongside notarized PDF copies of signed multi-party Data Access Agreements and checklists",
      "By truncating historical audit tables after every quarterly policy bundle release to prevent conflicting policy versions from accumulating across compliance monitoring logs",
      "By publishing hashed query payloads onto public proof-of-work blockchain networks using external cryptocurrency smart contracts",
      "By formally linking Entities (data subsets, queries), Activities (evaluations, approvals), and Agents (researchers, policies) via prov:wasGeneratedBy and prov:wasAssociatedWith"
    ],
    "correctIndex": 3,
    "explanation": "W3C PROV-O provides an interoperable semantic standard to capture provenance: who authorized what, using which specific policy version, at what exact timestamp, and against which data slice.",
    "citation": "W3C PROV-O: The PROV Data Model Recommendation (2013)",
    "tags": [
      "PROV-O",
      "Lineage",
      "Auditability"
    ]
  },
  {
    "id": "fsg_a_03",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "When evaluating differential privacy within an analytical enclave query engine, what does the parameter epsilon (ε) mathematically govern?",
    "options": [
      "The privacy loss budget: the upper bound on the log-ratio of output probabilities between two neighbouring datasets differing by a single individual",
      "The strict wall-clock execution timeout in seconds permitted before an analytical SQL query is terminated by the enclave workload scheduler to prevent resource exhaustion",
      "The maximum concurrency threshold governing how many accredited research investigators may maintain active virtual desktop sessions inside the analytical enclave simultaneously",
      "The allowable NTP clock synchronization drift between distributed Kubernetes worker nodes evaluating OPA policy bundles"
    ],
    "correctIndex": 0,
    "explanation": "In differential privacy, ε quantifies the worst-case privacy leakage: smaller ε values introduce higher noise and greater privacy, while larger values provide higher statistical utility.",
    "citation": "Dwork & Roth (The Algorithmic Foundations of Differential Privacy, 2014)",
    "tags": [
      "Differential Privacy",
      "Epsilon",
      "Privacy Budget"
    ]
  },
  {
    "id": "fsg_a_04",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "Under UK GDPR Recital 35 and Article 9, what exceptional governance challenge distinguishes genomic data from standard episodic health records?",
    "options": [
      "Whole-genome VCF sequence files are too compact to benefit from columnar Parquet compression, creating excessive metadata overhead across distributed enclave object storage",
      "Genomic sequence data is inherently unique, permanently immutable, and carries hereditary identifiable inferences about biological family members",
      "Human reference and patient genomic sequences are legally designated as open-source scientific reference material exempt from UK GDPR Article 9 special category protections",
      "Sequenced genetic variants lose clinical validity and statutory sensitivity precisely 48 hours after laboratory bioinformatic processing"
    ],
    "correctIndex": 1,
    "explanation": "Genomic data is uniquely identifiable down to the individual (with rare variants acting as fingerprints) and reveals health predispositions about unconsented biological relatives, creating unique familial privacy risks.",
    "citation": "UK GDPR Recital 35 & Information Commissioner’s Office Guidance on Genetic Data",
    "tags": [
      "Genomics",
      "Special Category",
      "Familial Privacy"
    ]
  },
  {
    "id": "fsg_a_05",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "What is the core requirement of a Zero-Trust enclave architecture operating under SATRE v1.1 standards?",
    "options": [
      "Treat every accredited internal researcher account as an active insider threat by permanently disabling interactive terminals, ad-hoc SQL consoles, and Python notebooks",
      "Rely primarily on perimeter corporate VPN authentication and static IP allowlists while permitting unauthenticated plaintext microservice communication inside the cluster",
      "Never trust, always verify: enforce mutual TLS, ephemeral credentials, granular micro-segmentation, and continuous policy evaluation at every access hop",
      "Rely on perimeter corporate VPN authentication and static IP allowlists while permitting unauthenticated plaintext traffic inside the cluster"
    ],
    "correctIndex": 2,
    "explanation": "SATRE v1.1 and Zero Trust mandate that perimeter defenses are insufficient: every request must authenticate, authorize, and evaluate policy dynamically based on identity, device posture, and context.",
    "citation": "Standard Architecture for Trusted Research Environments (SATRE v1.1 Pillar 2: Computing Infrastructure)",
    "tags": [
      "Zero Trust",
      "SATRE",
      "Micro-segmentation"
    ]
  },
  {
    "id": "fsg_a_06",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "Under the UK GDPR Article 22, what safeguard is mandated when analytical algorithms or AI models perform automated decision-making producing legal or similarly significant effects?",
    "options": [
      "The predictive model's source code and container build pipeline must run exclusively on an accredited open-source Linux distribution",
      "The model's neural network weights and training hyperparameters must be published openly in a public national algorithmic registry",
      "Automated statistical scoring or clinical triage algorithms of any kind are unconditionally prohibited under UK data protection statutes",
      "The individual has the right to obtain human intervention, express their point of view, and contest the automated decision"
    ],
    "correctIndex": 3,
    "explanation": "Article 22 gives data subjects the right not to be subject to solely automated decisions with legal or significant effects without explicit exceptions and safeguards, including the right to meaningful human intervention.",
    "citation": "UK GDPR Article 22 & ICO Guidance on Automated Decision-Making and Profiling",
    "tags": [
      "Article 22",
      "Automated Decision Making",
      "Human Intervention"
    ]
  },
  {
    "id": "fsg_a_07",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "In a formal security assessment, what vulnerability does a 'differencing attack' exploit against a statistical query interface?",
    "options": [
      "Issuing two queries with slightly differing selection criteria (e.g., N patients vs N-1 patients) and subtracting the results to isolate a single individual’s attributes",
      "Measuring subtle CPU thermal throttling variations between adjacent compute nodes during parallel statistical model training to infer memory access patterns across tenants",
      "Exploiting NTP clock synchronization skew across distributed identity servers to replay expired JWT bearer session tokens at the analytical platform's external API gateway",
      "Comparing dependency lockfile hashes across repository branches to detect unauthorized package version downgrades in CI"
    ],
    "correctIndex": 0,
    "explanation": "Differencing attacks combine aggregate queries over overlapping cohorts to calculate the precise difference, exposing attributes of the single individual excluded from or included in the second query.",
    "citation": "Hundepool et al. (Statistical Disclosure Control, Wiley 2012)",
    "tags": [
      "Differencing Attack",
      "SDC",
      "Re-identification"
    ]
  },
  {
    "id": "fsg_a_08",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "How does W3C Verifiable Credentials (VC) technology modernize federated researcher accreditation across multiple regional research environments?",
    "options": [
      "Printing tamper-resistant holographic plastic smartcards mailed physically to accredited researchers for mandatory smartcard authentication at local hospital terminals",
      "By issuing cryptographically signed, tamper-evident digital credentials (e.g., ONS Accredited Researcher status) that can be verified instantaneously without phone calls or paper passports",
      "Requiring visiting research fellows to deposit notarized physical passport copies in a central custodial vault prior to every multi-institutional enclave onboarding cycle and annual renewal",
      "Replacing cryptographic federated identity providers with mandatory on-site biometric iris scanning at regional hospital data centers"
    ],
    "correctIndex": 1,
    "explanation": "W3C Verifiable Credentials allow accreditation bodies (like UKSA/ONS or universities) to issue cryptographically verifiable credentials that external enclaves can validate offline via decentralized public keys.",
    "citation": "W3C Verifiable Credentials Data Model v1.1 Recommendation",
    "tags": [
      "Verifiable Credentials",
      "Federation",
      "Safe Person"
    ]
  },
  {
    "id": "fsg_a_09",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "What is the legal status of high-fidelity synthetic health data under UK data protection law when evaluated against residual re-identification risk?",
    "options": [
      "Synthetic patient records generated by machine learning models are categorically exempt from UK GDPR under all circumstances because they represent purely fictional individuals",
      "High-fidelity synthetic healthcare datasets are regulated directly as Class IIa diagnostic software artifacts under the UK Medical Devices Regulations 2002 framework",
      "If the synthetic generation model memorizes real patient microdata or permits statistical inference of real attributes, it may legally still constitute personal data",
      "Generating synthetic cohorts from hospital EHR databases constitutes secondary copyright infringement unless cleared by clinical authors"
    ],
    "correctIndex": 2,
    "explanation": "Synthetic data is only truly anonymous if individuals cannot be re-identified or inferred from it; if generative models overfit or leak training records, the outputs may remain personal data under UK GDPR.",
    "citation": "ICO & The Alan Turing Institute: Synthetic Data and Privacy Evaluation Report",
    "tags": [
      "Synthetic Data",
      "Overfitting",
      "Legal Status"
    ]
  },
  {
    "id": "fsg_a_10",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "How should a break-glass emergency access procedure be architected in a policy-as-code clinical data platform to maintain compliance with Caldicott standards?",
    "options": [
      "Store emergency root break-glass credentials inside a shared encrypted spreadsheet accessible to all on-call infrastructure technicians without synchronous SIEM alert logging",
      "Temporarily suspend all SIEM audit log streaming, OPA policy enforcement hooks, and session recording during emergencies to guarantee sub-second clinical database throughput",
      "Require a panel of three High Court judges to countersign a physical emergency warrant before privileged access tokens can be minted",
      "Allow instantaneous elevated access upon entering a justified operational reason, while automatically triggering immutable audit logging, SIRO alerting, and post-hoc clinical review"
    ],
    "correctIndex": 3,
    "explanation": "Break-glass mechanisms must prioritize patient care when urgent access is required, while enforcing strict non-repudiable audit trails, real-time alerting to guardians, and mandatory post-incident justification review.",
    "citation": "NHS England Digital Security & Caldicott Guardian Break-Glass Protocols",
    "tags": [
      "Break-Glass",
      "Auditability",
      "Emergency Access"
    ]
  },
  {
    "id": "fsg_a_11",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "Under what technical and contractual conditions can microdata access be granted across international research consortia without violating UK GDPR Chapter V?",
    "options": [
      "Ensuring transfers occur to countries with UK adequacy regulations, or implementing Standard Contractual Clauses (SCCs) / International Data Transfer Agreements (IDTA) with supplementary technical measures",
      "Transmitting pseudonymised patient CSV extracts over standard encrypted SSH or SFTP tunnels to any overseas academic institution protected by university enterprise VPN controls",
      "Obtaining a signed bilateral declaration from the overseas principal investigator waiving domestic data protection compliance requirements and ICO enforcement jurisdiction during the analysis",
      "All cross-border health research collaboration and federated statistical analysis is categorically prohibited under UK GDPR Chapter V"
    ],
    "correctIndex": 0,
    "explanation": "Chapter V requires either an adequacy decision or appropriate safeguards such as the UK International Data Transfer Addendum to the EU SCCs, backed by technical measures such as end-to-end encryption and enclave processing.",
    "citation": "UK GDPR Chapter V (Articles 44–50) & ICO International Transfer Guidance",
    "tags": [
      "International Transfer",
      "Chapter V",
      "IDTA"
    ]
  },
  {
    "id": "fsg_a_12",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "In multi-party computation (MPC) applied to health data linkage, what cryptographic guarantee is provided to participating institutions?",
    "options": [
      "All participating hospital sites upload their raw unencrypted linkage keys to a single centralized custodial escrow database server operated by a commercial broker",
      "Participating parties compute a joint mathematical function over their inputs while keeping their private data inputs hidden from each other",
      "Cryptographic multi-party computation protocols guarantee tenfold SQL query acceleration over standard single-node analytical engines such as DuckDB and Apache Spark",
      "Deploying multi-party computation removes the requirement to encrypt network traffic with TLS 1.3 or authenticate institutional nodes"
    ],
    "correctIndex": 1,
    "explanation": "MPC protocols (e.g., secret sharing, garbled circuits) allow multiple parties to jointly evaluate functions (such as survival curves or cohort overlap) without any party learning the others’ confidential inputs.",
    "citation": "Evans, Kolesnikov, Rosulek (A Pragmatic Introduction to Secure Multi-Party Computation, 2018)",
    "tags": [
      "MPC",
      "Multi-Party Computation",
      "Cryptography"
    ]
  },
  {
    "id": "fsg_a_13",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "What does the 'Marketer Risk' model evaluate in quantitative statistical disclosure assessment?",
    "options": [
      "The likelihood that a commercial pharmaceutical marketing team contacts prescribing hospital clinicians based on aggregated regional NHS dispensing summaries",
      "The statistical probability that an external commercial sponsorship campaign fails to reach its intended patient recruitment cohort demographic across target regions",
      "The proportion of the population that can be successfully re-identified by matching a sample against a commercial or public voter marketing register",
      "The citation impact risk measured when peer-reviewed epidemiological findings are republished in commercial medical trade journals"
    ],
    "correctIndex": 2,
    "explanation": "Marketer risk assesses the expected number of correct re-identifications an attacker could achieve when attempting to match an entire population registry against the de-identified dataset.",
    "citation": "El Emam (Evaluating Risk of Re-identification in Health Data Releases, 2011)",
    "tags": [
      "Marketer Risk",
      "SDC",
      "Population Linkage"
    ]
  },
  {
    "id": "fsg_a_14",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "How does W3C RDF Dataset Canonicalization (URDNA2015) enable cryptographic signing of semantic governance policies?",
    "options": [
      "By archiving serialized Turtle and JSON-LD governance policy documents inside password-protected ZIP archives hashed with legacy MD5 checksums prior to git tagging",
      "By compiling declarative SPARQL constraint queries directly into architecture-specific x86 binary executables prior to deployment inside immutable container images",
      "By registering institutional ontology IRIs with a commercial intellectual property registrar to prove timestamped authorship",
      "By computing a deterministic, canonical representation of an RDF graph regardless of blank node labeling or triple ordering, allowing SHA-256 digital signature verification"
    ],
    "correctIndex": 3,
    "explanation": "Graphs can be serialized in arbitrary line orders with varied blank node identifiers; URDNA2015 standardizes graph representation so that digital signatures over semantic governance policies remain verifiable.",
    "citation": "W3C RDF Dataset Canonicalization (URDNA2015 / RFC 8785)",
    "tags": [
      "Canonicalization",
      "URDNA2015",
      "Signatures"
    ]
  },
  {
    "id": "fsg_a_15",
    "category": "Five Safes & Governance",
    "difficulty": "Advanced",
    "question": "When implementing continuous compliance telemetry in a policy-as-code environment, why is write-once-read-many (WORM) storage mandated for audit streams?",
    "options": [
      "To guarantee that audit trails cannot be altered, overwritten, or erased by compromised administrator accounts or malicious insider adversaries",
      "To prevent physical SSD wear-leveling degradation during high-concurrency analytical table scans across large multi-million-row longitudinal clinical cohorts",
      "To reduce cloud archival object storage licensing fees by compressing historical telemetry streams into deduplicated cold-tier backup volumes with automated expiry",
      "To allow multiple concurrent researcher notebooks to append uncoordinated entries to shared output logs without mutex lock contention"
    ],
    "correctIndex": 0,
    "explanation": "WORM storage guarantees audit trail immutability: even privileged administrative accounts cannot tamper with, rewrite, or backdate compliance event logs following an intrusion or unauthorized access event.",
    "citation": "SATRE v1.1 Pillar 4 (Governance & Auditing) & NHS DSPT Standard 1.5",
    "tags": [
      "WORM Storage",
      "Immutability",
      "Audit Logs"
    ]
  },
  {
    "id": "sm_f_01",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "In the W3C Resource Description Framework (RDF), what are the three elemental components of a statement (triple)?",
    "options": [
      "Header, Body, Footer",
      "Subject, Predicate, Object",
      "Table, Row, Column",
      "Key, Hash, Value"
    ],
    "correctIndex": 1,
    "explanation": "RDF structures all knowledge assertions into atomic triples consisting of a Subject, Predicate (relationship), and Object.",
    "citation": "W3C RDF 1.1 Concepts and Abstract Syntax",
    "tags": [
      "RDF",
      "Triples",
      "Basics"
    ]
  },
  {
    "id": "sm_f_02",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "What does the acronym SHACL stand for in W3C semantic data standards?",
    "options": [
      "Secure Health Access Control Language",
      "Standard Healthcare Audit Check Logic",
      "Shapes Constraint Language",
      "Schema Hierarchy And Constraint Logic"
    ],
    "correctIndex": 2,
    "explanation": "SHACL stands for Shapes Constraint Language, a W3C standard for describing and validating structural conditions over RDF graphs.",
    "citation": "W3C SHACL Recommendation (2017)",
    "tags": [
      "SHACL",
      "W3C",
      "Standards"
    ]
  },
  {
    "id": "sm_f_03",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "In SHACL terminology, what is the role of a NodeShape?",
    "options": [
      "To define responsive CSS grid layouts and visual theme tokens for ontology documentation portals",
      "To manage low-level TCP packet routing tables between isolated Kubernetes network namespaces",
      "To generate and rotate hardware-backed X.509 cryptographic signing certificates for triple stores",
      "To declare constraints that apply directly to target focus nodes in an RDF graph"
    ],
    "correctIndex": 3,
    "explanation": "A sh:NodeShape specifies validation constraints (and property shapes) that apply directly to focus nodes selected by targets.",
    "citation": "W3C SHACL Recommendation § 2.1",
    "tags": [
      "SHACL",
      "NodeShape",
      "Validation"
    ]
  },
  {
    "id": "sm_f_04",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which SHACL property links a NodeShape to a PropertyShape that evaluates conditions on a node's predicates?",
    "options": [
      "sh:property",
      "sh:targetClass",
      "sh:path",
      "sh:datatype"
    ],
    "correctIndex": 0,
    "explanation": "sh:property specifies the sh:PropertyShape instances associated with a sh:NodeShape to validate predicate values.",
    "citation": "W3C SHACL Recommendation § 2.1.2",
    "tags": [
      "SHACL",
      "sh:property",
      "Shapes"
    ]
  },
  {
    "id": "sm_f_05",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which SHACL constraint ensures that a property must appear at least once on every target focus node?",
    "options": [
      "sh:maxCount 1",
      "sh:minCount 1",
      "sh:datatype xsd:integer",
      "sh:hasValue true"
    ],
    "correctIndex": 1,
    "explanation": "sh:minCount specifies the minimum number of value nodes that must exist for the focused property path (sh:minCount 1 enforces required fields).",
    "citation": "W3C SHACL Recommendation § 4.2",
    "tags": [
      "SHACL",
      "sh:minCount",
      "Cardinality"
    ]
  },
  {
    "id": "sm_f_06",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "What is the primary difference between OWL (Web Ontology Language) and SHACL regarding validation semantics?",
    "options": [
      "OWL is restricted exclusively to multimedia metadata annotations, whereas SHACL exclusively models normalized relational patient demographic tables",
      "SHACL cannot represent rdfs:subClassOf taxonomy hierarchies, whereas OWL natively forbids declaring minimum or maximum property cardinality restrictions",
      "OWL operates under the Open World Assumption (OWA); SHACL operates under closed-world validation semantics suitable for data integrity checks",
      "OWL was formally deprecated by the W3C Semantic Web Working Group in 1999 in favor of pure relational SQL DDL"
    ],
    "correctIndex": 2,
    "explanation": "OWL is an open-world reasoning language (unobserved statements may still be true); SHACL evaluates closed-world constraints (if a required property is missing, validation fails).",
    "citation": "W3C SHACL vs OWL Design Rationale",
    "tags": [
      "SHACL",
      "OWL",
      "Open World Assumption"
    ]
  },
  {
    "id": "sm_f_07",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which SHACL predicate specifies that a property must point to a specific XML Schema datatype, such as xsd:boolean?",
    "options": [
      "sh:class",
      "sh:nodeKind",
      "sh:in",
      "sh:datatype"
    ],
    "correctIndex": 3,
    "explanation": "sh:datatype asserts that each value node must be a literal with the specified datatype URI (e.g., xsd:boolean, xsd:integer, xsd:string).",
    "citation": "W3C SHACL Recommendation § 4.1",
    "tags": [
      "SHACL",
      "sh:datatype",
      "Datatypes"
    ]
  },
  {
    "id": "sm_f_08",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "What SHACL constraint component restricts a property value to a specific finite enumeration of permitted symbols?",
    "options": [
      "sh:in",
      "sh:hasValue",
      "sh:pattern",
      "sh:equals"
    ],
    "correctIndex": 0,
    "explanation": "sh:in specifies a list of permitted values (e.g., controlled vocabularies or state codes); any value outside this list fails validation.",
    "citation": "W3C SHACL Recommendation § 4.3",
    "tags": [
      "SHACL",
      "sh:in",
      "Enumerations"
    ]
  },
  {
    "id": "sm_f_09",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which SHACL property is used to define human-readable diagnostic messages returned when a constraint is violated?",
    "options": [
      "sh:description",
      "sh:message",
      "rdfs:comment",
      "sh:label"
    ],
    "correctIndex": 1,
    "explanation": "sh:message provides human-readable text included in the sh:ValidationResult when a shape constraint fails.",
    "citation": "W3C SHACL Recommendation § 2.1.5",
    "tags": [
      "SHACL",
      "sh:message",
      "Diagnostics"
    ]
  },
  {
    "id": "sm_f_10",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "What are the three standard severity levels defined in the SHACL specification?",
    "options": [
      "Critical, High, Low",
      "Fatal, Retry, Ignore",
      "sh:Info, sh:Warning, sh:Violation",
      "Level 1, Level 2, Level 3"
    ],
    "correctIndex": 2,
    "explanation": "SHACL defines three standardized severity levels: sh:Violation (default failure), sh:Warning (audit advisory), and sh:Info (informational trace).",
    "citation": "W3C SHACL Recommendation § 2.1.4",
    "tags": [
      "SHACL",
      "Severity",
      "Audit"
    ]
  },
  {
    "id": "sm_f_11",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which prefix in Turtle syntax represents standard XML Schema datatypes such as strings, integers, and dates?",
    "options": [
      "sh:",
      "owl:",
      "rdf:",
      "xsd:"
    ],
    "correctIndex": 3,
    "explanation": "The prefix xsd: (http://www.w3.org/2001/XMLSchema#) represents standard W3C XML Schema datatypes.",
    "citation": "W3C XML Schema Part 2: Datatypes",
    "tags": [
      "Turtle",
      "xsd",
      "Datatypes"
    ]
  },
  {
    "id": "sm_f_12",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "In Turtle (TTL) syntax, what punctuation mark separates multiple predicate-object pairs sharing the exact same subject?",
    "options": [
      "A semicolon (;)",
      "A full stop (.)",
      "A comma (,)",
      "A forward slash (/)"
    ],
    "correctIndex": 0,
    "explanation": "In Turtle syntax, semicolons (;) allow repeating predicates and objects for the current subject, while commas (,) repeat objects for the current predicate.",
    "citation": "W3C Turtle Terse RDF Triple Language Recommendation",
    "tags": [
      "Turtle",
      "Syntax",
      "Semicolon"
    ]
  },
  {
    "id": "sm_f_13",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "Which SHACL target declaration selects all instances of an RDF class for shape validation?",
    "options": [
      "sh:targetNode",
      "sh:targetClass",
      "sh:targetSubjectsOf",
      "sh:targetObjectsOf"
    ],
    "correctIndex": 1,
    "explanation": "sh:targetClass selects all nodes that are instances of the specified class (having rdf:type or subclass relations) as focus nodes.",
    "citation": "W3C SHACL Recommendation § 2.1.3",
    "tags": [
      "SHACL",
      "sh:targetClass",
      "Targets"
    ]
  },
  {
    "id": "sm_f_14",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "What does a sh:ValidationReport contain when an RDF graph conforms perfectly to all evaluated SHACL shapes?",
    "options": [
      "A SQL error code",
      "sh:conforms false with a warning",
      "sh:conforms true and zero sh:result entries",
      "A list of all triples in the graph"
    ],
    "correctIndex": 2,
    "explanation": "A conforming graph generates a ValidationReport where sh:conforms is true, and no sh:result violation objects are present.",
    "citation": "W3C SHACL Recommendation § 3.1",
    "tags": [
      "SHACL",
      "ValidationReport",
      "Compliance"
    ]
  },
  {
    "id": "sm_f_15",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Foundation",
    "question": "In semantic web modeling, what distinguishes an ObjectProperty from a DatatypeProperty in OWL?",
    "options": [
      "ObjectProperties persist data directly to disk storage, whereas DatatypeProperties exist solely in transient runtime memory",
      "ObjectProperty declarations have been formally deprecated in OWL 2 DL in favor of generic rdf:Property annotations",
      "DatatypeProperties cannot declare rdfs:domain or rdfs:range axioms inside standard Turtle ontology documents",
      "An ObjectProperty links individuals to other individuals; a DatatypeProperty links individuals to literal data values"
    ],
    "correctIndex": 3,
    "explanation": "In OWL ontologies, ObjectProperties express relationships between two resource entities, whereas DatatypeProperties map resources to primitive literals (numbers, dates, text).",
    "citation": "W3C OWL 2 Web Ontology Language Primer",
    "tags": [
      "OWL",
      "ObjectProperty",
      "DatatypeProperty"
    ]
  },
  {
    "id": "sm_i_01",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "In SHACL property path syntax, what does a sequence path (e.g., ex:hasResearcher / ex:accreditationNumber) represent?",
    "options": [
      "A traversal along a chain of two consecutive predicates across connected RDF nodes",
      "A logical disjunction allowing validation to pass if either one of two alternative predicates exists on the node",
      "A reverse edge traversal navigating backwards from an object literal toward all matching subject IRIs",
      "An arithmetic ratio computed between two numeric datatype properties attached to the same focus node"
    ],
    "correctIndex": 0,
    "explanation": "Sequence paths (represented in SPARQL and SHACL with /) navigate multi-hop graph traversals, following predicate chains from source to target nodes.",
    "citation": "W3C SHACL Recommendation § 2.3.1 (Property Paths)",
    "tags": [
      "SHACL",
      "Property Paths",
      "Sequence Path"
    ]
  },
  {
    "id": "sm_i_02",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "What does the SHACL constraint sh:closed true accomplish on a target NodeShape?",
    "options": [
      "It transparently encrypts the serialized Turtle policy graph on disk using symmetric AES-256 keys before committing changes to continuous integration storage",
      "It rejects any focus node that has predicates other than those explicitly declared in the shape's property declarations",
      "It terminates active SPARQL endpoint connections automatically after five seconds of idle query evaluation time to prevent accidental long-running lockouts",
      "It strips all undeclared outgoing predicates from the focus node prior to executing downstream OPA rules"
    ],
    "correctIndex": 1,
    "explanation": "sh:closed true enforces a strict closed-world boundary: any properties present on a focus node that are not declared in sh:property (or sh:ignoredProperties) cause a validation violation.",
    "citation": "W3C SHACL Recommendation § 5.2 (Closed Shapes)",
    "tags": [
      "SHACL",
      "sh:closed",
      "Closed World"
    ]
  },
  {
    "id": "sm_i_03",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "Which SHACL constraint component is used to validate that an ORCID identifier matches the standardized regex pattern ^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]$?",
    "options": [
      "sh:datatype",
      "sh:hasValue",
      "sh:pattern",
      "sh:maxLength"
    ],
    "correctIndex": 2,
    "explanation": "sh:pattern evaluates regular expressions against string literal representations of property values.",
    "citation": "W3C SHACL Recommendation § 4.4 (sh:pattern)",
    "tags": [
      "SHACL",
      "Regex",
      "sh:pattern"
    ]
  },
  {
    "id": "sm_i_04",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "How does sh:qualifiedValueShape differ from standard sh:node validation in SHACL?",
    "options": [
      "sh:qualifiedValueShape restricts constraint evaluation exclusively to double-precision floating-point numeric range intervals inside statistical nodes",
      "sh:qualifiedValueShape imposes severe graph traversal overhead by disabling all RDFS subclass inference and bypassing closed-world sh:closed checks",
      "sh:qualifiedValueShape disables closed-world sh:closed checks across nested child blank nodes in the graph",
      "sh:qualifiedValueShape allows counting how many property values conform to a specific nested shape using sh:qualifiedMinCount/MaxCount"
    ],
    "correctIndex": 3,
    "explanation": "sh:qualifiedValueShape enables cardinality assertions over subsets of values matching a condition (e.g., verifying a project has at least 1 accredited Lead Investigator).",
    "citation": "W3C SHACL Recommendation § 4.12",
    "tags": [
      "SHACL",
      "sh:qualifiedValueShape",
      "Qualified Cardinality"
    ]
  },
  {
    "id": "sm_i_05",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "Which logical constraint component in SHACL evaluates true if and only if a focus node conforms to EXACTLY ONE shape in a provided list?",
    "options": [
      "sh:xone",
      "sh:and",
      "sh:or",
      "sh:not"
    ],
    "correctIndex": 0,
    "explanation": "sh:xone specifies that a focus node must satisfy exactly one of the provided shapes; if it satisfies zero or more than one, validation fails.",
    "citation": "W3C SHACL Recommendation § 4.9.4 (sh:xone)",
    "tags": [
      "SHACL",
      "sh:xone",
      "Logical Constraints"
    ]
  },
  {
    "id": "sm_i_06",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "What is the purpose of sh:ignoredProperties when defining a closed shape (sh:closed true)?",
    "options": [
      "To declare deprecated legacy predicates that the validation engine should silently purge from incoming RDF graphs",
      "To allow specific ubiquitous properties (such as rdf:type) without causing closed-shape validation violations",
      "To suppress verbose SHACL ValidationReport diagnostic warnings from appearing in continuous integration terminal logs",
      "To bypass closed-world schema enforcement when processing records submitted by external unaccredited guest accounts"
    ],
    "correctIndex": 1,
    "explanation": "When sh:closed is true, sh:ignoredProperties (typically [ rdf:type ]) specifies predicates that are permitted on focus nodes without being flagged as unexpected properties.",
    "citation": "W3C SHACL Recommendation § 5.2.2",
    "tags": [
      "SHACL",
      "sh:ignoredProperties",
      "Closed Shapes"
    ]
  },
  {
    "id": "sm_i_07",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "How does sh:lessThan enable date validity window verification between two properties on the same focus node?",
    "options": [
      "By counting exact UTF-8 byte lengths across both date string literals to confirm strict ISO-8601 date-time formatting parity on the resource",
      "By subtracting Unix epoch timestamps in milliseconds and materializing the derived temporal duration triple automatically back into the target data graph",
      "By comparing property values lexicographically or chronologically (e.g., sh:lessThan ex:endDate ensures startDate is strictly prior to endDate)",
      "sh:lessThan can only compare values across distinct RDF subjects; same-node comparisons require custom SPARQL"
    ],
    "correctIndex": 2,
    "explanation": "Property pair constraints (sh:lessThan, sh:lessThanOrEquals, sh:equals, sh:disjoint) validate relative order or equality between two properties on the same subject.",
    "citation": "W3C SHACL Recommendation § 4.6 (Property Pair Constraints)",
    "tags": [
      "SHACL",
      "sh:lessThan",
      "Temporal Validation"
    ]
  },
  {
    "id": "sm_i_08",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "What does the SHACL constraint sh:minInclusive 10 enforce when applied to an analytical summary cell count?",
    "options": [
      "The exported aggregate cell count must remain strictly below 10 to prevent large cohort re-identification risks",
      "The numeric literal must be serialized with at least 10 significant fractional digits of floating-point precision",
      "The cross-tabulated contingency matrix must declare a minimum width of at least 10 independent demographic columns",
      "The cell count must be an integer greater than or equal to 10 (enforcing statistical suppression bounds)"
    ],
    "correctIndex": 3,
    "explanation": "sh:minInclusive enforces an inclusive lower numeric bound; in healthcare SDC rules, sh:minInclusive 10 guarantees cell suppression of counts under 10.",
    "citation": "W3C SHACL Recommendation § 4.3.1 (Value Range Constraints)",
    "tags": [
      "SHACL",
      "sh:minInclusive",
      "SDC"
    ]
  },
  {
    "id": "sm_i_09",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "In ontology engineering, how does owl:imports support modular policy architecture across clinical health enclaves?",
    "options": [
      "By enabling an application ontology to dynamically import and reference foundational schemas (e.g., PROV-O, Dublin Core) without duplication",
      "By dynamically fetching unverified external JavaScript validation plugins directly into production RDF triple store engines during runtime validation",
      "By transforming hierarchical RDF knowledge graphs into normalized multi-sheet Excel workbooks for manual review by institutional Information Governance boards",
      "owl:imports was removed from the OWL 2 specification due to circular dependency risks in modern triple stores"
    ],
    "correctIndex": 0,
    "explanation": "owl:imports enables modular ontology design: organizations import stable international standards (PROV-O, DCB0129) and layer specialized institutional rules on top.",
    "citation": "W3C OWL 2 Direct Semantics § 3.4 (Imports)",
    "tags": [
      "OWL",
      "owl:imports",
      "Modularity"
    ]
  },
  {
    "id": "sm_i_09_alt",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "In SHACL target selection, what does sh:targetSubjectsOf ex:conductedUnderEthicsApproval select as focus nodes?",
    "options": [
      "Every resource IRI that appears exclusively in the predicate position of at least one RDF triple",
      "All nodes in the RDF graph that have at least one triple where ex:conductedUnderEthicsApproval is the predicate",
      "Every orphan focus node in the data graph that possesses zero incoming or outgoing property assertions",
      "Only abstract vocabulary class definitions explicitly typed as owl:Class or rdfs:Class in the schema"
    ],
    "correctIndex": 1,
    "explanation": "sh:targetSubjectsOf selects all resources that are subjects of triples with the specified predicate, enabling target binding without explicit class declarations.",
    "citation": "W3C SHACL Recommendation § 2.1.3.3",
    "tags": [
      "SHACL",
      "sh:targetSubjectsOf",
      "Targets"
    ]
  },
  {
    "id": "sm_i_11",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "How are HL7 FHIR clinical resources mapped into RDF graphs under W3C / HL7 semantic standards?",
    "options": [
      "HL7 FHIR JSON and XML clinical resources cannot be losslessly serialized as RDF graphs due to deeply nested clinical extensions and repeating array elements",
      "By base64-encoding raw FHIR JSON document payloads as single xsd:base64Binary string literals attached inside opaque PROV-O entity wrapper triples",
      "FHIR resources are expressed as RDF graphs using standardized FHIR RDF ontology concepts, with resourceType becoming rdf:type and elements becoming predicates",
      "By stripping all coded SNOMED-CT references and storing clinical summaries exclusively as plain rdfs:comment strings"
    ],
    "correctIndex": 2,
    "explanation": "The HL7 FHIR RDF specification provides an official W3C RDF representation of FHIR resources, enabling linked health data and SHACL validation across clinical EHR models.",
    "citation": "HL7 FHIR Release 5 RDF Representation Standard",
    "tags": [
      "FHIR",
      "RDF",
      "Healthcare Semantics"
    ]
  },
  {
    "id": "sm_i_12",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "What is W3C R2RML designed to do in enterprise data architecture?",
    "options": [
      "Render interactive 3D clinical topology diagrams directly from structured DICOM radiology metadata",
      "Transpile declarative Python analytical notebooks into sandboxed R statistical scripts for enclave execution",
      "Establish mutual TLS 1.3 encrypted tunnels between distributed federated research triple stores",
      "Express customized mappings from relational database tables to RDF datasets"
    ],
    "correctIndex": 3,
    "explanation": "R2RML (RDB to RDF Mapping Language) is a W3C standard language for expressing customized mappings from relational database schemas to RDF graphs.",
    "citation": "W3C R2RML: RDB to RDF Mapping Language Recommendation (2012)",
    "tags": [
      "R2RML",
      "Relational to RDF",
      "Enterprise Data"
    ]
  },
  {
    "id": "sm_i_13",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "In SHACL error diagnostics, what does the sh:focusNode predicate in a ValidationResult identify?",
    "options": [
      "The specific RDF resource node in the data graph that failed the constraint check",
      "The Git commit author and maintainer responsible for authoring the failing SHACL NodeShape definition",
      "The external REST API endpoint URL that transmitted the malformed JSON-LD governance payload",
      "The specific Kubernetes worker node and CPU thread ID where the validation engine executed"
    ],
    "correctIndex": 0,
    "explanation": "sh:focusNode points directly to the subject resource in the target data graph that triggered the constraint failure.",
    "citation": "W3C SHACL Recommendation § 3.2 (Validation Results)",
    "tags": [
      "SHACL",
      "sh:focusNode",
      "Diagnostics"
    ]
  },
  {
    "id": "sm_i_14",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "What is the function of inverse property paths (e.g., ^ex:assignedProject) in SHACL validation?",
    "options": [
      "To logically invert boolean xsd:boolean property literals during closed-world negation checks across nested ethical approval status flags",
      "To navigate relationships in the backward direction (from object to subject), allowing child nodes to validate their parent relationships",
      "To reverse character sequences of encrypted identifier literals before evaluating regular expression pattern rules inside sh:PropertyShape checks",
      "To sort SPARQL SELECT query result bindings in descending lexicographical order before export"
    ],
    "correctIndex": 1,
    "explanation": "Inverse paths (^property) navigate edges from object to subject, allowing validation rules to inspect incoming relationships.",
    "citation": "W3C SHACL Recommendation § 2.3.1 (Inverse Path)",
    "tags": [
      "SHACL",
      "Inverse Path",
      "Graph Traversal"
    ]
  },
  {
    "id": "sm_i_15",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Intermediate",
    "question": "How does sh:nodeKind restrict permitted RDF node types in a property shape?",
    "options": [
      "It constrains SHACL graph validation execution to designated hardware CPU instruction extensions and isolated enclave NUMA memory pages",
      "It enforces strict ingress payload bandwidth quotas between federated institutional RDF triple store endpoints during SPARQL query federation",
      "It asserts whether values must be IRIs (sh:IRI), blank nodes (sh:BlankNode), or literal values (sh:Literal)",
      "It maps RDF subject identities directly to underlying Linux kernel user and group access permissions"
    ],
    "correctIndex": 2,
    "explanation": "sh:nodeKind restricts value nodes to specific RDF node kinds: sh:IRI, sh:Literal, sh:BlankNode, or compound types like sh:IRIOrLiteral.",
    "citation": "W3C SHACL Recommendation § 4.1.3 (sh:nodeKind)",
    "tags": [
      "SHACL",
      "sh:nodeKind",
      "RDF Constraints"
    ]
  },
  {
    "id": "sm_a_01",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "When compiling declarative SHACL shapes into Open Policy Agent (OPA) AST for sub-millisecond evaluation, what fundamental impedance mismatch must be reconciled?",
    "options": [
      "SHACL is restricted to validating unstructured multimedia streams, while OPA parses only tabular CSV datasets",
      "OPA natively lacks support for boolean conjunction, disjunction, and negation over nested objects",
      "SHACL constraints can only be compiled into native C++ kernel modules rather than interpreted policy ASTs",
      "SHACL evaluates multi-directed labeled RDF graphs; OPA evaluates hierarchical, tree-structured JSON documents"
    ],
    "correctIndex": 3,
    "explanation": "Compiling graph-oriented SHACL to OPA requires projecting graph paths and RDF node identity into hierarchical JSON AST structures without losing relationship semantics.",
    "citation": "Policy-as-Code Compilation Architectures (SHACL to OPA)",
    "tags": [
      "SHACL",
      "OPA",
      "AST Compilation"
    ]
  },
  {
    "id": "sm_a_02",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What is a SHACL-SPARQL constraint component and when is its use justified over SHACL-Core?",
    "options": [
      "It embeds customized SPARQL SELECT queries within a shape to evaluate complex cross-entity correlations and graph traversals not expressible in SHACL-Core",
      "It is a deprecated experimental draft feature removed from the final W3C SHACL 2017 recommendation in favor of standard OWL 2 RL reasoning axioms",
      "It is used exclusively to format and serialize SHACL sh:ValidationReport outputs into styled HTML compliance tables for governance review portals",
      "It replaces the requirement for an underlying RDF triple store by querying raw relational SQL databases directly"
    ],
    "correctIndex": 0,
    "explanation": "SHACL-SPARQL enables arbitrary graph queries within constraint components when complex business logic (e.g., validating multi-hop transitive ethical clearances) exceeds Core features.",
    "citation": "W3C SHACL Recommendation § 5.3 (SPARQL-based Constraints)",
    "tags": [
      "SHACL-SPARQL",
      "Advanced Constraints",
      "Graph Query"
    ]
  },
  {
    "id": "sm_a_03",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "In high-throughput compliance engines, how does triple store index arrangement (e.g., SPO, POS, OSP) impact SHACL validation performance?",
    "options": [
      "Triple store index arrangement has negligible impact on runtime latency because SHACL engines always load the entire graph into a flat in-memory hash table",
      "Predicate-based path traversals leverage POS (Predicate-Object-Subject) and OSP (Object-Subject-Predicate) indexes to avoid full table scans during shape matching",
      "All RDF hexastore permutation indexes must be rebuilt offline from scratch after every individual SPARQL or SHACL validation transaction completes",
      "Production RDF triple stores maintain only a single chronological B-tree index ordered by triple ingestion timestamp"
    ],
    "correctIndex": 1,
    "explanation": "Having comprehensive hexastore indexes (SPO, POS, OSP, SOP, PSO, OPS) allows SHACL property path navigations and inverse queries to execute as direct logarithmic lookups.",
    "citation": "Harth & Decker (Optimized Indexing for Semantic Web Triple Stores)",
    "tags": [
      "Hexastore",
      "Indexing",
      "Performance"
    ]
  },
  {
    "id": "sm_a_04",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "How does SHACL-AF (SHACL Advanced Features) node expressions enable calculation of derived statistical metrics inside shape rules?",
    "options": [
      "By invoking external desktop spreadsheet macros over DDE bridges during triple store validation to summarize numeric research cohort totals",
      "By emitting step-by-step arithmetic evaluation debug traces to standard console output during continuous integration policy bundle build pipelines",
      "By evaluating functional expressions (e.g., sh:count, mathematical sums, string joins) directly on value nodes prior to constraint checking",
      "SHACL-AF node expressions are only implemented in lightweight mobile edge browsers and not server engines"
    ],
    "correctIndex": 2,
    "explanation": "SHACL-AF node expressions allow computing derived values (e.g., total patient count across all project sites) directly within the shape validation pipeline.",
    "citation": "W3C SHACL-AF Advanced Features Note § 3 (Node Expressions)",
    "tags": [
      "SHACL-AF",
      "Node Expressions",
      "Advanced"
    ]
  },
  {
    "id": "sm_a_05",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What formal mathematical property ensures that closed-world SHACL shape validation is decidable and terminates in finite time?",
    "options": [
      "Guaranteed Turing completeness across arbitrary embedded SHACL-SPARQL recursive rule blocks executed over unbounded remote federated endpoints",
      "Applying post-quantum lattice cryptography algorithms to sign every intermediate validation report triple emitted during shape traversal passes",
      "Strictly prohibiting numeric integer or decimal literals anywhere inside the target RDF data graph",
      "Restriction of SHACL-Core constraints to non-recursive, finite graph pattern matching over bounded RDF graphs"
    ],
    "correctIndex": 3,
    "explanation": "SHACL-Core constraints correspond to fragments of first-order logic over finite graphs, ensuring validation is decidable and finishes in deterministic polynomial time.",
    "citation": "Corman et al. (Semantics and Validation of Shapes Schemas for RDF, 2018)",
    "tags": [
      "Decidability",
      "Computational Complexity",
      "Formal Methods"
    ]
  },
  {
    "id": "sm_a_06",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "In W3C PROV-O modeling, how are derived compliance outputs linked back to their authoritative statutory shape definitions?",
    "options": [
      "Via prov:wasDerivedFrom pointing to the input graph, and prov:wasInformedBy linking the validation activity to the specific SHACL rule version",
      "By emitting stateless HTTP 307 redirect chains linking archived compliance summary reports back to superseded static HTML ontology documentation URLs",
      "By purging superseded ontology graph snapshots from object storage whenever a newly tagged governance policy shape release merges onto main",
      "By minting public Ethereum ERC-721 tokens encoding each governance decision on public ledgers"
    ],
    "correctIndex": 0,
    "explanation": "PROV-O represents computational derivation chains: validation results point to input datasets via prov:wasDerivedFrom and execution engines via prov:wasAssociatedWith.",
    "citation": "W3C PROV-O Specification § 3 (Core Concepts)",
    "tags": [
      "PROV-O",
      "Provenance",
      "Lineage"
    ]
  },
  {
    "id": "sm_a_07",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "How can negative test graph generation be automated directly from SHACL property shapes in a CI/CD pipeline?",
    "options": [
      "By injecting randomized bit-flips into triple store physical storage blocks to verify hardware RAID disk checksum recovery during validation runs",
      "By systematically mutating valid RDF graphs to violate each boundary constraint (e.g., setting sh:minInclusive 10 to 9, or omitting required fields)",
      "By launching automated volumetric network denial-of-service floods against internal CI validation runners to stress-test graph query queue timeouts",
      "Negative RDF test synthesis cannot be automated and requires manual Turtle authoring for each edge case"
    ],
    "correctIndex": 1,
    "explanation": "Automated test synthesis inspects SHACL constraint boundaries (minCount, pattern, range) and generates targeted boundary-violating graphs to prove policy test coverage.",
    "citation": "Continuous Compliance Testing in Semantic Healthcare Architectures",
    "tags": [
      "Mutation Testing",
      "CI/CD",
      "Automated Testing"
    ]
  },
  {
    "id": "sm_a_08",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What is the role of sh:entailment in SHACL validation pipelines?",
    "options": [
      "To automatically translate human-readable sh:message violation diagnostics across multilingual national health governance transparency portals",
      "To cap the maximum byte size of serialized Turtle shape files accepted by the continuous integration validation gate prior to bundle compilation",
      "To specify an inference regime (e.g., RDFS or OWL 2 RL entailment) that expands the data graph with inferred triples prior to constraint evaluation",
      "To suppress all sh:Warning and sh:Info diagnostic entries from the final sh:ValidationReport"
    ],
    "correctIndex": 2,
    "explanation": "sh:entailment declares that semantic reasoning (subclass expansion, transitive property materialization) must run before shapes are evaluated against the focus nodes.",
    "citation": "W3C SHACL Recommendation § 1.4 (Entailment Regimes)",
    "tags": [
      "SHACL",
      "Entailment",
      "Inference"
    ]
  },
  {
    "id": "sm_a_09",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "How do recursive SHACL shapes validate deeply nested, tree-structured clinical consent hierarchies?",
    "options": [
      "W3C SHACL strictly forbids any cyclical or recursive sh:node reference between NodeShapes to guarantee finite termination on arbitrary graphs",
      "By permitting unbounded stack recursion depth during validation until host JVM heap memory exhausts and terminates circular graph traversals",
      "By flattening multi-level consent hierarchies into an unvalidated plain-text Markdown summary block",
      "A PropertyShape references its parent NodeShape via sh:node, recursively traversing sub-consent structures until base termination criteria are met"
    ],
    "correctIndex": 3,
    "explanation": "Recursive shape definitions allow validating nested structures (e.g., composite consent directives with sub-clause exemptions) by referencing sh:node recursively.",
    "citation": "W3C SHACL Community Group Notes on Recursive Shapes",
    "tags": [
      "Recursive Shapes",
      "Consent Modeling",
      "Hierarchy"
    ]
  },
  {
    "id": "sm_a_10",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What challenge arises when reconciling clinical terminology ontologies (SNOMED-CT, ICD-10, LOINC) within an RDF knowledge graph?",
    "options": [
      "Divergent granularity, overlapping semantic domains, and ontological misalignment requiring cross-map bridging (e.g., SKOS exactMatch / closeMatch)",
      "Clinical coding terminologies share identical numeric concept identifiers across vocabularies, making programmatic URI differentiation impossible",
      "RDF triple store engines impose a five-character indexing limit that prevents mapping full clinical SNOMED-CT concept hierarchies natively",
      "SNOMED-CT licensing strictly prohibits representing clinical concepts inside W3C RDF triple graphs"
    ],
    "correctIndex": 0,
    "explanation": "Medical terminologies model diseases at different granularities; semantic alignment requires formal SKOS mapping relations and bridging axioms to prevent invalid classification inferences.",
    "citation": "OBO Foundry & Semantic Interoperability in Clinical Research",
    "tags": [
      "SNOMED-CT",
      "SKOS",
      "Terminology Alignment"
    ]
  },
  {
    "id": "sm_a_11",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "How does RDF-Dataset Canonicalization (URDNA2015) guarantee cryptographic non-repudiation of SHACL compliance certificates?",
    "options": [
      "It applies deterministic deflate compression and base64 encoding to serialized Turtle policy documents prior to immutable archival object storage",
      "It computes a deterministic hash of blank node graphs regardless of serialisation syntax, enabling immutable ECDSA signatures over compliance certificates",
      "It enables full-disk AES-256 volume encryption across the underlying virtual machine storage arrays hosting production RDF triple stores",
      "It replicates unhashed JSON-LD validation reports to public external transparency websites"
    ],
    "correctIndex": 1,
    "explanation": "URDNA2015 deterministically labels blank nodes and sorts triples, allowing cryptographic signing of semantic graphs so any tampering invalidates the digital signature.",
    "citation": "W3C Recommendation: RDF Dataset Canonicalization (RFC 8785)",
    "tags": [
      "URDNA2015",
      "Canonicalization",
      "Digital Signatures"
    ]
  },
  {
    "id": "sm_a_12",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What is a custom SHACL Constraint Component (sh:ConstraintComponent) and how does it extend standard SHACL validation?",
    "options": [
      "It is a dedicated FPGA hardware accelerator card installed inside servers to parallelize low-level RDF triple pattern matching during compliance checks",
      "It disables built-in W3C core cardinality and datatype constraints in favor of manual free-text review comments recorded by governance officers",
      "It declares new reusable parameterised constraints (with custom SPARQL or JavaScript validation logic) that can be instantiated across multiple shapes",
      "It automatically migrates RDF knowledge graphs into normalized legacy MySQL relational tables"
    ],
    "correctIndex": 2,
    "explanation": "Constraint components allow architects to encapsulate custom domain logic (e.g., validating UK NHS Number modulus 11 checksums) into clean, reusable shape parameters.",
    "citation": "W3C SHACL Recommendation § 5.1 (Constraint Components)",
    "tags": [
      "Constraint Component",
      "Extensibility",
      "Custom Validation"
    ]
  },
  {
    "id": "sm_a_13",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "In high-throughput streaming environments, why is incremental SHACL validation preferred over full graph validation?",
    "options": [
      "Full-graph SHACL validation inevitably corrupts triple store hexastore indexes whenever analytical datasets exceed ten thousand asserted RDF triples",
      "Incremental delta validation deliberately omits sh:Violation diagnostic messages and focus node pointers to conserve internal network egress bandwidth",
      "Incremental evaluation is a mandatory kernel-level syscall requirement on enterprise Linux hosts",
      "Validating only delta graphs (triples added/removed in the current transaction) reduces validation latency from minutes to milliseconds"
    ],
    "correctIndex": 3,
    "explanation": "Incremental validation evaluates constraints only against focus nodes affected by newly inserted or updated triples, avoiding wasteful re-evaluation of billions of unchanged triples.",
    "citation": "Incremental Validation of Shapes over Dynamic Knowledge Graphs (ISWC 2021)",
    "tags": [
      "Incremental Validation",
      "Performance",
      "Streaming"
    ]
  },
  {
    "id": "sm_a_14",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "What formal verification approach proves that a set of SHACL shapes contains no contradictory constraints (shape satisfiability)?",
    "options": [
      "Translating the SHACL shapes into Description Logic / First-Order Logic formulas and executing an automated SAT/SMT theorem prover (e.g., Z3)",
      "Deploying unverified SHACL shapes straight to live production governance workloads and monitoring researcher helpdesk tickets for false denials",
      "Printing serialized Turtle shape definitions on paper for manual line-by-line logical inspection by institutional ethics committee members",
      "Executing identical SHACL validation pipelines ten times concurrently to check for race conditions"
    ],
    "correctIndex": 0,
    "explanation": "Shape satisfiability can be formally proven by encoding shape constraints into SMT-LIB formulas and checking satisfiability using SMT solvers like Z3.",
    "citation": "Formal Verification of Semantic Shapes using SMT Solvers",
    "tags": [
      "Formal Verification",
      "SMT",
      "Z3"
    ]
  },
  {
    "id": "sm_a_15",
    "category": "Semantic Modeling & SHACL",
    "difficulty": "Advanced",
    "question": "How can TypeScript type interfaces be automatically synthesized from SHACL PropertyShapes?",
    "options": [
      "By executing headless browser DOM scrapers against rendered HTML ontology documentation sites to extract class tables and property descriptions",
      "By parsing sh:datatype and sh:class declarations and mapping xsd:string to string, xsd:integer to number, and cardinality bounds to optional properties (?)",
      "TypeScript's structural type system cannot express optional properties, nested objects, or union enumerations derived from RDF class and SHACL cardinality axioms",
      "By first rasterizing visual ontology class diagrams into JPEG images and extracting text via OCR"
    ],
    "correctIndex": 1,
    "explanation": "SHACL property shapes provide complete type schemas; build tools map xsd types to TypeScript primitives and minCount/maxCount to required or optional fields.",
    "citation": "Schema-Driven Development: Generating TypeScript Types from W3C SHACL",
    "tags": [
      "TypeScript",
      "Code Generation",
      "Type Safety"
    ]
  },
  {
    "id": "opa_f_01",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What is the primary architectural purpose of the Open Policy Agent (OPA)?",
    "options": [
      "To replace relational clinical warehouses with schemaless document stores across analytical clusters and federated trust nodes",
      "To transparently encrypt persistent storage volumes at rest using cluster-wide AES-256 hardware acceleration keys managed locally",
      "To decouple policy decision-making from policy enforcement across cloud-native and analytical platforms",
      "To compile declarative Python analytical notebooks into standalone static HTML research dashboards"
    ],
    "correctIndex": 2,
    "explanation": "OPA decouples policy decisions (evaluating rules against input data) from enforcement (the application or gateway that acts upon the decision).",
    "citation": "Open Policy Agent Documentation (Architecture Overview)",
    "tags": [
      "OPA",
      "Policy-as-Code",
      "Decoupling"
    ]
  },
  {
    "id": "opa_f_02",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What is the name of the declarative policy language used by Open Policy Agent?",
    "options": [
      "Python",
      "Rust",
      "TypeScript",
      "Rego"
    ],
    "correctIndex": 3,
    "explanation": "Rego is OPA's declarative query language designed specifically for expressing policy rules over complex hierarchical JSON datasets.",
    "citation": "Open Policy Agent: The Rego Language Specification",
    "tags": [
      "Rego",
      "OPA",
      "Declarative"
    ]
  },
  {
    "id": "opa_f_03",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "Why is 'default allow = false' standard practice in security and governance Rego policies?",
    "options": [
      "To implement a secure deny-by-default posture, ensuring requests are rejected unless explicitly authorized by a rule",
      "To force the OPA compiler to reject policies containing unindexed array iteration loops during continuous integration build verification",
      "To allocate dedicated host memory buffers for policy bundle caching across multi-tenant clinical research enclaves and virtual desktops",
      "To permit unauthenticated read-only health check queries when identity federation tokens temporarily expire"
    ],
    "correctIndex": 0,
    "explanation": "A default deny posture ('default allow = false') guarantees that unhandled conditions, edge cases, or missing credentials safely fail-closed.",
    "citation": "OPA Security Best Practices & Zero Trust Guidelines",
    "tags": [
      "Rego",
      "Deny-by-Default",
      "Security"
    ]
  },
  {
    "id": "opa_f_04",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "How does an application supply context (e.g., user identity, requested resource, action) to an OPA policy evaluation?",
    "options": [
      "By staging serialized YAML request manifests inside a shared Kubernetes ConfigMap watched by the OPA daemon",
      "By passing a JSON document into the global 'input' variable",
      "By streaming raw encrypted HTTP headers into a PostgreSQL audit table prior to synchronous rule evaluation",
      "By dynamically recompiling the Rego policy bundle binary whenever user session attributes change"
    ],
    "correctIndex": 1,
    "explanation": "Contextual information describing the request is passed to OPA as an arbitrary JSON payload bound to the global variable 'input'.",
    "citation": "Open Policy Agent: Evaluating Input Data",
    "tags": [
      "OPA",
      "input",
      "JSON"
    ]
  },
  {
    "id": "opa_f_05",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What keyword in modern Rego is used to iterate over elements in a collection (array, set, or object)?",
    "options": [
      "while",
      "for (let i = 0; ...)",
      "some ... in ...",
      "repeat"
    ],
    "correctIndex": 2,
    "explanation": "Modern Rego uses the 'some ... in ...' construct for explicit, readable iteration and quantification over collections.",
    "citation": "Rego Language Reference: Iteration with 'some ... in ...'",
    "tags": [
      "Rego",
      "Iteration",
      "Syntax"
    ]
  },
  {
    "id": "opa_f_06",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What does the 'not' keyword achieve when used in a Rego rule body?",
    "options": [
      "It emits a structured warning entry into the OPA decision audit log while allowing the enclosing rule evaluation to succeed gracefully",
      "It immediately aborts policy bundle execution and returns a fatal HTTP 500 error response to the calling analytical API gateway",
      "It triggers a clean in-memory reload of the active policy bundle from the remote distribution server",
      "It inverts the boolean truth value of an expression, evaluating true if the referenced query is undefined or false"
    ],
    "correctIndex": 3,
    "explanation": "In Rego, 'not' expresses negation-as-failure: it evaluates to true if the negated statement cannot be satisfied.",
    "citation": "Rego Language Reference: Negation",
    "tags": [
      "Rego",
      "Negation",
      "Logic"
    ]
  },
  {
    "id": "opa_f_07",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "How are unit tests for Rego policies structured and executed?",
    "options": [
      "Tests are written in Rego files with rule names prefixed by 'test_' and run via 'opa test'",
      "Tests are authored as external JUnit integration suites executing REST requests against a live OPA sidecar",
      "Tests must be compiled into WebAssembly test harnesses and validated manually through the CLI REPL prompt",
      "Rego policies cannot be unit-tested in isolation and require end-to-end staging database replays"
    ],
    "correctIndex": 0,
    "explanation": "OPA provides a built-in testing framework: rules prefixed with 'test_' in policy files are automatically discovered and verified by running 'opa test'.",
    "citation": "Open Policy Agent: Testing Policies (opa test)",
    "tags": [
      "Rego",
      "Testing",
      "Unit Tests"
    ]
  },
  {
    "id": "opa_f_08",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What is the typical execution latency of an in-memory OPA decision evaluation for standard access control rules?",
    "options": [
      "Several minutes",
      "Sub-millisecond (often under 1 millisecond)",
      "10 to 30 seconds",
      "Exactly 1 hour"
    ],
    "correctIndex": 1,
    "explanation": "Because OPA evaluates policies in-memory without external network calls during evaluation, decision latency is typically sub-millisecond.",
    "citation": "Open Policy Agent Performance & Benchmarking Guidelines",
    "tags": [
      "OPA",
      "Latency",
      "Sub-millisecond"
    ]
  },
  {
    "id": "opa_f_09",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "How can an OPA policy return rich diagnostic violation messages rather than a simple boolean true/false?",
    "options": [
      "By encoding structured error codes directly into TLS extension headers returned to the downstream Envoy proxy",
      "By halting policy evaluation on the first failed assertion and raising an uncaught runtime panic exception",
      "By using a set rule that aggregates human-readable reason strings (e.g., 'reasons contains msg if { ... }')",
      "OPA natively supports only boolean allow/deny outputs and delegates error formatting to the gateway code"
    ],
    "correctIndex": 2,
    "explanation": "Rego rules can evaluate to sets of structured violation objects or descriptive strings, allowing gateways to return actionable feedback to researchers.",
    "citation": "OPA Design Patterns: Generating Rich Violation Messages",
    "tags": [
      "Rego",
      "Violations",
      "Diagnostics"
    ]
  },
  {
    "id": "opa_f_10",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "Which built-in function in Rego is used to test string values against regular expressions?",
    "options": [
      "string.find(pattern)",
      "regexp.search(string)",
      "text.matches()",
      "regex.match(pattern, string)"
    ],
    "correctIndex": 3,
    "explanation": "Rego provides regex.match(pattern, string) to evaluate regular expressions against input strings.",
    "citation": "Rego Built-in Functions: Regular Expressions",
    "tags": [
      "Rego",
      "regex.match",
      "Built-ins"
    ]
  },
  {
    "id": "opa_f_11",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "In Rego policy syntax, what does a comma (,) or newline separating expressions inside a rule body represent?",
    "options": [
      "Logical AND (conjunction: all expressions must be true for the rule to fire)",
      "Logical OR (disjunction: the rule evaluates to true whenever at least one expression succeeds)",
      "Sequential pipeline assignment passing the output of the first expression into the next function",
      "An inline compiler directive ignored during WebAssembly compilation and runtime AST evaluation"
    ],
    "correctIndex": 0,
    "explanation": "Within a single rule body in Rego, multiple comma- or newline-separated expressions are evaluated as a logical AND conjunction.",
    "citation": "Rego Language Reference: Rules and Conjunctions",
    "tags": [
      "Rego",
      "Conjunction",
      "Rule Syntax"
    ]
  },
  {
    "id": "opa_f_12",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What does defining multiple rules with the exact same name represent in Rego?",
    "options": [
      "A strict compiler violation causing 'opa check' to abort with a duplicate symbol redeclaration error",
      "Logical OR (disjunction: the rule is satisfied if ANY of the rule bodies evaluate true)",
      "Imperative rule shadowing where the lexicographically later definition permanently overwrites earlier rules",
      "Non-terminating mutual recursion that triggers runtime stack overflow limits on large input payloads"
    ],
    "correctIndex": 1,
    "explanation": "In Rego, defining multiple rules with the same name implements logical OR: if any rule body is satisfied, the rule produces the specified value.",
    "citation": "Rego Language Reference: Disjunction / OR Semantics",
    "tags": [
      "Rego",
      "Disjunction",
      "OR Logic"
    ]
  },
  {
    "id": "opa_f_13",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What command is used to evaluate a query against an input document from the command line using OPA?",
    "options": [
      "opa compile --target wasm --output policy_bundle.tar.gz policy.rego",
      "opa run --start-server",
      "opa eval -i input.json -d policy.rego 'data.governance.allow'",
      "opa install policy.rego"
    ],
    "correctIndex": 2,
    "explanation": "'opa eval' evaluates a Rego query against input (-i) and policy/data (-d) files and outputs the structured result in JSON format.",
    "citation": "OPA CLI Reference: opa eval",
    "tags": [
      "OPA",
      "CLI",
      "opa eval"
    ]
  },
  {
    "id": "opa_f_14",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "What is the global 'data' document in OPA used for?",
    "options": [
      "To persist transient HTTP session cookies and short-lived OAuth bearer tokens across concurrent researcher virtual desktop tabs",
      "To buffer ephemeral SQL query execution telemetry logs for 60 seconds before streaming batches asynchronously to external SIEMs",
      "To store intermediate compiled WebAssembly bytecode fragments generated during partial evaluation passes",
      "To supply static or cached reference datasets (e.g., user rosters, role matrices, policy shapes) loaded alongside rules"
    ],
    "correctIndex": 3,
    "explanation": "The global 'data' document contains external reference data (such as user credentials, project metadata, or role hierarchies) loaded via bundles or flags.",
    "citation": "OPA Documentation: The Data Document",
    "tags": [
      "OPA",
      "data",
      "External Reference"
    ]
  },
  {
    "id": "opa_f_15",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Foundation",
    "question": "How does OPA integrate into Kubernetes clusters to enforce admission control policies?",
    "options": [
      "Via Kubernetes Admission Webhooks (validating and mutating admission webhooks) using tools like OPA Gatekeeper",
      "By embedding compiled Rego evaluation hooks directly inside Linux kernel eBPF cgroup socket filters on worker hosts",
      "By intercepting kubelet container image pulls at the host BIOS firmware and hypervisor hardware attestation boundary",
      "Kubernetes API admission webhooks do not support external Rego engines and rely strictly on static RBAC"
    ],
    "correctIndex": 0,
    "explanation": "OPA Gatekeeper integrates with the Kubernetes API server via Admission Webhooks, intercepting pod/deployment manifests to enforce security policies before creation.",
    "citation": "Kubernetes Admission Controllers & OPA Gatekeeper",
    "tags": [
      "Kubernetes",
      "Gatekeeper",
      "Admission Control"
    ]
  },
  {
    "id": "opa_i_01",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How does OPA’s Bundle API provide secure, synchronized policy distribution across a distributed cluster?",
    "options": [
      "By broadcasting unsigned JSON policy diffs over internal cluster multicast UDP sockets directly to listening worker daemon instances",
      "By serving gzipped tarballs containing signed Rego policies and data files, which OPA daemons periodically poll, verify, and reload atomically",
      "By scheduling automated hourly Git pull operations over SSH across every compute node whenever institutional governance policies update",
      "By rolling an OS-level reboot across every Kubernetes cluster node whenever governance rules change"
    ],
    "correctIndex": 1,
    "explanation": "OPA's Bundle API allows central distribution of versioned, signed bundles (tar.gz) that clients download and activate atomically without downtime.",
    "citation": "OPA Management APIs: Bundle Service",
    "tags": [
      "OPA",
      "Bundles",
      "Deployment"
    ]
  },
  {
    "id": "opa_i_02",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "Which Rego built-in function decodes and cryptographically verifies JSON Web Tokens (JWT) using a public key certificate?",
    "options": [
      "crypto.verify_jwt(token)",
      "jwt.validate_signature(token)",
      "io.jwt.decode_verify(token, constraints)",
      "security.jwt_check()"
    ],
    "correctIndex": 2,
    "explanation": "io.jwt.decode_verify validates the signature, expiration, not-before, and claims of a JWT directly within Rego policy evaluation.",
    "citation": "Rego Built-in Functions: io.jwt.decode_verify",
    "tags": [
      "JWT",
      "Cryptographic Verification",
      "Tokens"
    ]
  },
  {
    "id": "opa_i_03",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How does Rego set comprehension (e.g., { x | some x in input.items; x.violates == true }) help sanitize data exports?",
    "options": [
      "By mutating and dropping non-compliant patient rows directly from the underlying source PostgreSQL clinical research warehouse tables",
      "By sorting nested JSON arrays lexicographically before serializing candidate statistical airlock tickets for human SDC officer review",
      "By converting integer cell counts into categorical frequency bands prior to statistical regression runs",
      "By concisely collecting all items that violate compliance criteria into a distinct set for reporting or filtering"
    ],
    "correctIndex": 3,
    "explanation": "Set and array comprehensions allow declarative filtering of candidate data records, extracting only non-compliant items for airlock quarantine reports.",
    "citation": "Rego Language Reference: Comprehensions",
    "tags": [
      "Rego",
      "Comprehensions",
      "Airlock Filtering"
    ]
  },
  {
    "id": "opa_i_04",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How can an OPA policy enforce time-based credential expiration for visiting research fellows?",
    "options": [
      "By comparing the credential's expiration timestamp against the current Unix time in nanoseconds via time.now_ns()",
      "By querying an external internet-hosted NTP pool server on every incoming researcher authentication request",
      "By tracking cumulative query execution counts and revoking access after a fixed threshold of 1,000 queries",
      "By scheduling nightly cron scripts that disable all visiting researcher accounts at midnight regardless of expiry"
    ],
    "correctIndex": 0,
    "explanation": "time.now_ns() provides the current evaluation timestamp in nanoseconds, allowing policies to verify that input.credentials.expiry_ns > time.now_ns().",
    "citation": "Rego Built-in Functions: Time (time.now_ns)",
    "tags": [
      "Rego",
      "time.now_ns",
      "Time-based Access"
    ]
  },
  {
    "id": "opa_i_05",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What is the function of net.cidr_contains in analytical network enclave policy enforcement?",
    "options": [
      "To validate that a visiting researcher's institutional email address matches an accredited NHS Trust or academic domain suffix",
      "To verify whether an IP address belongs to an authorized internal subnet or CIDR block, blocking external egress",
      "To measure round-trip ICMP network latency between analytical enclave worker pods and central hospital metadata catalog registries",
      "To dynamically allocate ephemeral private IPv4 addresses to newly provisioned JupyterLab workspaces"
    ],
    "correctIndex": 1,
    "explanation": "net.cidr_contains(cidr, ip) evaluates whether an IP address falls within an authorized network subnet, preventing connections to unauthorized IP ranges.",
    "citation": "Rego Built-in Functions: Networking (net.cidr_contains)",
    "tags": [
      "Rego",
      "Networking",
      "Egress Control"
    ]
  },
  {
    "id": "opa_i_06",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What is OPA 'Partial Evaluation' (Compile API) and how does it optimize database queries?",
    "options": [
      "It evaluates only top-level boolean decision rules in a policy bundle while skipping nested helper functions to minimize cluster CPU load across research pods",
      "It schedules asynchronous rule evaluation batches across low-priority background worker threads during off-peak overnight enclave hours",
      "It pre-compiles high-level Rego policies against known static data into residual conditions (SQL WHERE clauses or ASTs) for execution directly by database engines",
      "It was a legacy experimental compile target deprecated in OPA v0.20 in favor of native Go plugins"
    ],
    "correctIndex": 2,
    "explanation": "Partial evaluation compiles Rego policies into residual AST conditions, translating governance rules directly into SQL WHERE clauses executed by DuckDB or Postgres.",
    "citation": "Open Policy Agent: Partial Evaluation & Compile API",
    "tags": [
      "Partial Evaluation",
      "SQL Pushdown",
      "Performance"
    ]
  },
  {
    "id": "opa_i_07",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How is OPA integrated with Envoy Proxy to enforce zero-trust access on analytical HTTP/gRPC APIs?",
    "options": [
      "By patching and recompiling the upstream Envoy C++ proxy filter pipeline with hardcoded institutional access control Rego rules",
      "By routing enclave API requests out through a shared external public cloud load balancer for centralized TLS inspection",
      "By routing enclave API requests out through a shared external cloud load balancer for central inspection",
      "Via Envoy's External Authorization (ext_authz) filter, which forwards inbound request metadata to OPA before proxying"
    ],
    "correctIndex": 3,
    "explanation": "Envoy's ext_authz HTTP/gRPC filter queries OPA before forwarding client requests, allowing OPA to allow, deny, or inject headers into requests dynamically.",
    "citation": "Envoy Proxy: External Authorization Filter (ext_authz) & OPA",
    "tags": [
      "Envoy",
      "ext_authz",
      "Zero Trust"
    ]
  },
  {
    "id": "opa_i_08",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What flag enables test coverage profiling when running OPA test suites in a CI/CD pipeline?",
    "options": [
      "opa test --coverage",
      "opa verify --profile",
      "opa audit --full",
      "opa test --verbose-only"
    ],
    "correctIndex": 0,
    "explanation": "'opa test --coverage' measures code coverage across Rego rules, identifying uncovered lines and policy branches in automated pipelines.",
    "citation": "OPA CLI Reference: Code Coverage (opa test --coverage)",
    "tags": [
      "OPA",
      "Coverage",
      "CI/CD"
    ]
  },
  {
    "id": "opa_i_09",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How does an OPA policy enforce role-based access control (RBAC) with hierarchical role inheritance?",
    "options": [
      "By authoring explicit individual allow rules hardcoded for every named research investigator identity registered in the Trust directory",
      "By defining a graph or lookup table of role-permission mappings in data.roles and querying transitivity via recursive rules",
      "By trusting a single administrative root group claim without resolving inherited sub-role hierarchies or project scope boundaries",
      "By delegating authorization decisions directly to underlying POSIX filesystem UID and GID permissions"
    ],
    "correctIndex": 1,
    "explanation": "RBAC in Rego uses structured data documents containing role-to-role and role-to-permission mappings, resolved cleanly via declarative graph traversal queries.",
    "citation": "OPA Documentation: Role-Based Access Control Patterns",
    "tags": [
      "RBAC",
      "Role Hierarchy",
      "Rego"
    ]
  },
  {
    "id": "opa_i_10",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What happens when a Rego expression attempts to access a non-existent object key (e.g., input.user.missing_field)?",
    "options": [
      "The OPA evaluation runtime immediately throws an unhandled null-reference panic exception and drops the calling gateway HTTP connection",
      "The entire policy bundle safely fails over to permissive allow-by-default mode until the calling gateway supplies the omitted attribute",
      "The expression evaluates to 'undefined', causing the enclosing rule branch to fail without throwing an uncaught exception",
      "The missing field is implicitly coerced to an empty string or zero integer so evaluation continues cleanly"
    ],
    "correctIndex": 2,
    "explanation": "In Rego, accessing undefined keys or paths results in 'undefined' (negation-as-failure), safely failing the branch rather than crashing the evaluation engine.",
    "citation": "Rego Language Reference: Undefined Values & Fail-Closed",
    "tags": [
      "Rego",
      "Undefined",
      "Fail-Closed"
    ]
  },
  {
    "id": "opa_i_11",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How does OPA handle decision logging to ensure tamper-evident compliance auditability?",
    "options": [
      "Decision logging is disabled by default in production research enclaves because serializing JSON payloads degrades sub-millisecond authorization gateway SLA latency",
      "Decision logs are appended locally to unencrypted plaintext CSV files stored inside the submitting researcher's shared home directory volume",
      "OPA emits summary daily counters only and discards exact input payloads to comply with UK GDPR data minimization",
      "OPA can be configured to stream JSON decision logs (containing exact input, query, decision, and evaluation metrics) to secure remote logging endpoints or SIEMs"
    ],
    "correctIndex": 3,
    "explanation": "OPA's Decision Log API captures structured audit records for every evaluation, allowing compliance teams to stream logs to immutable storage for post-hoc audit.",
    "citation": "OPA Management APIs: Decision Logs",
    "tags": [
      "Decision Logs",
      "Auditability",
      "SIEM"
    ]
  },
  {
    "id": "opa_i_12",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What is the purpose of the 'with' keyword in Rego?",
    "options": [
      "To temporarily replace or mock 'input' or 'data' values during testing and evaluation (e.g., test_rule if { rule with input as mock_input })",
      "To spawn parallel worker evaluation threads when iterating across large nested JSON arrays inside Rego comprehension expressions",
      "To import external Python statistical disclosure control libraries dynamically into the OPA runtime during synchronous policy evaluation",
      "To persist derived rule evaluation metrics permanently into the global 'data' document across queries"
    ],
    "correctIndex": 0,
    "explanation": "The 'with' keyword enables programmatic mocking in Rego unit tests, dynamically overriding 'input' or 'data' documents for specific queries.",
    "citation": "Rego Language Reference: The 'with' Keyword & Mocking",
    "tags": [
      "Rego",
      "Mocking",
      "Unit Testing"
    ]
  },
  {
    "id": "opa_i_13",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "In an airlock export pipeline, how can OPA evaluate whether a candidate output table satisfies minimum cell threshold k >= 10?",
    "options": [
      "By hashing the exported table filename and verifying that the output payload exceeds a minimum byte threshold",
      "By inspecting input.table_summary.min_cell_count and asserting min_cell_count >= 10",
      "By checking that the uncompressed CSV attachment size remains smaller than 10 kilobytes before transfer",
      "OPA cannot evaluate arithmetic inequality comparisons on numeric fields and requires Python pre-checks"
    ],
    "correctIndex": 1,
    "explanation": "The airlock pipeline extracts table summary statistics into JSON; OPA rules evaluate numerical constraints (such as min_cell_count >= 10) directly.",
    "citation": "Playbook Section 4 & OPA Airlock Policies",
    "tags": [
      "Airlock",
      "Cell Suppression",
      "OPA"
    ]
  },
  {
    "id": "opa_i_14",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "What is the function of the 'every' keyword introduced in modern Rego syntax?",
    "options": [
      "To schedule recurring background policy re-evaluations every 10 seconds across active enclave sessions",
      "To concatenate every string literal inside an array comprehension into a delimited audit diagnostic summary",
      "To express universal quantification (asserting that a condition holds true for EVERY element in a collection)",
      "To trigger automated nightly pod restarts across worker nodes to purge stale in-memory bundle caches"
    ],
    "correctIndex": 2,
    "explanation": "The 'every' keyword provides concise, explicit universal quantification (e.g., 'every item in input.records { item.anonymized == true }').",
    "citation": "Rego Language Reference: Universal Quantification ('every')",
    "tags": [
      "Rego",
      "Universal Quantification",
      "every"
    ]
  },
  {
    "id": "opa_i_15",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Intermediate",
    "question": "How can an OPA policy enforce rate-limiting or quota policies on statistical export requests?",
    "options": [
      "By throttling virtual machine CPU clock allocations whenever an investigator submits frequent export tickets",
      "By dispatching advisory warning emails to the Caldicott Guardian while allowing all requests to proceed",
      "OPA is stateless by design and cannot perform numerical comparisons against reference quota counters",
      "By monitoring input.request_count against data.quotas[input.researcher_id].max_daily_requests"
    ],
    "correctIndex": 3,
    "explanation": "Quotas are enforced by comparing current request counts against researcher quota limits defined in cached reference data (data.quotas).",
    "citation": "OPA Design Patterns: Rate Limiting & Quotas",
    "tags": [
      "Quotas",
      "Rate Limiting",
      "Rego"
    ]
  },
  {
    "id": "opa_a_01",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does compiling Rego policies to WebAssembly (Wasm) targets enhance performance in edge proxies and analytical runtimes?",
    "options": [
      "It allows Rego policies to be executed natively inside high-speed C++, Rust, or Go runtimes without network IPC overhead, executing in microseconds",
      "WebAssembly compilation automatically verifies mathematical completeness and branch safety across rules so separate Rego unit tests are unnecessary",
      "Compiled WebAssembly policy modules require dedicated GPU compute accelerators and cannot execute inside standard Envoy CPU sidecars",
      "Compiling Rego to WebAssembly replaces relational SQL query engines with client-side browser storage"
    ],
    "correctIndex": 0,
    "explanation": "OPA compiles Rego policies directly into WebAssembly binaries that can be embedded into Envoy, NGINX, or custom Rust/Go proxies for microsecond evaluation.",
    "citation": "Open Policy Agent: Compiling Rego to WebAssembly",
    "tags": [
      "Wasm",
      "WebAssembly",
      "Performance"
    ]
  },
  {
    "id": "opa_a_02",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "What algorithmic vulnerability occurs when a Rego policy evaluates nested iterations across two large unindexed arrays (O(N^2) complexity)?",
    "options": [
      "The underlying clinical metadata database automatically drops unindexed SQL views to recover cluster memory capacity during sustained batch evaluation spikes",
      "Severe CPU instruction cycle spikes and latency degradation during large batch evaluation, which can be mitigated by building intermediate lookup sets (O(N))",
      "It introduces deterministic SHA-256 hash collisions when computing cryptographic integrity digests over streamed OPA decision logs",
      "It triggers immediate revocation of the requesting researcher's federated accreditation credentials"
    ],
    "correctIndex": 1,
    "explanation": "Nested loops over arrays create quadratic time complexity; refactoring to set lookups or dictionary indexing drops complexity to linear time O(N).",
    "citation": "OPA Performance Tuning: Avoiding Quadratic Iteration in Rego",
    "tags": [
      "Performance Tuning",
      "Complexity",
      "Algorithms"
    ]
  },
  {
    "id": "opa_a_03",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does Sigstore / Cosign cryptographic signing verify the supply-chain integrity of OPA policy bundles?",
    "options": [
      "By requiring institutional Data Protection Officers to embed scanned wet-ink PDF approvals inside every policy bundle tarball archive",
      "By encrypting unsigned policy bundles with symmetric pre-shared passwords exchanged manually over institutional engineering channels",
      "By signing the bundle archive with an ephemeral OIDC certificate and recording the cryptographic signature in the Rekor transparency log",
      "By archiving compiled Wasm binaries exclusively onto air-gapped physical USB tokens locked in server vaults"
    ],
    "correctIndex": 2,
    "explanation": "Cosign enables keyless signing of policy bundles using developer OIDC identities, allowing OPA orchestrators to verify bundle provenance before deployment.",
    "citation": "Sigstore Cosign Documentation & OPA Bundle Signing",
    "tags": [
      "Supply Chain",
      "Cosign",
      "Rekor"
    ]
  },
  {
    "id": "opa_a_04",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How can OPA policies be combined with Linux eBPF (Extended Berkeley Packet Filter) to enforce zero-egress network boundaries at the kernel layer?",
    "options": [
      "eBPF kernel programs completely replace high-level declarative Rego policies by hardcoding all governance rules directly in C scripts loaded at boot time",
      "By physically severing external network interface uplinks at the hypervisor switch whenever unapproved outbound connections occur",
      "eBPF operates strictly at the user-space HTTP layer and cannot inspect or drop kernel-level socket packets",
      "OPA evaluates high-level governance rules and compiles allowed network targets into CIDR maps pushed into eBPF kernel socket filters, blocking unapproved egress at wire speed"
    ],
    "correctIndex": 3,
    "explanation": "OPA defines high-level network governance, which orchestrators project into eBPF kernel maps to drop unauthorized outbound TCP/UDP packets directly in the kernel.",
    "citation": "eBPF Network Security Architecture & OPA",
    "tags": [
      "eBPF",
      "Kernel",
      "Egress Control"
    ]
  },
  {
    "id": "opa_a_05",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "What formal technique is used in OPA mutation testing to verify that policy test suites do not have blind spots?",
    "options": [
      "Systematically introducing subtle faults (mutations) into Rego rules (e.g., flipping >= to <, or removing not) and confirming that the test suite detects and fails the mutated policy",
      "Introducing controlled synthetic server rack temperature spikes across cluster nodes to verify hardware thermal resilience under sustained heavy policy evaluation load",
      "Deploying simulated malware payloads into sandboxed worker containers to verify whether endpoint antivirus agents detect policy bypasses",
      "Deploying synthetic malware payloads into sandboxed containers to evaluate runtime endpoint antivirus detection"
    ],
    "correctIndex": 0,
    "explanation": "Mutation testing introduces intentional logic mutations into Rego files; if unit tests still pass on a mutated rule, it reveals inadequate test coverage.",
    "citation": "Mutation Testing in Declarative Policy-as-Code Systems",
    "tags": [
      "Mutation Testing",
      "Test Quality",
      "Verification"
    ]
  },
  {
    "id": "opa_a_06",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "In multi-tenant secure analytical environments, how does Rego enforce strict tenant workspace isolation?",
    "options": [
      "By provisioning physically segregated dual-monitor thin client hardware workstations locked to individual research tenant projects",
      "By asserting that input.tenant_id matches both the authenticated JWT claim and the requested resource's metadata.owner_tenant, denying cross-tenant access",
      "By relying solely on signed contractual investigator non-disclosure undertakings without validating authenticated JWT tenant partition claims inside Rego rules",
      "Strict cryptographic multi-tenant isolation cannot be enforced at the policy layer in shared cluster runtimes"
    ],
    "correctIndex": 1,
    "explanation": "Rego guarantees tenant isolation by strictly validating that the caller's verified tenant token matches the partition tag of the requested dataset.",
    "citation": "Multi-Tenant Authorization Architectures with OPA",
    "tags": [
      "Multi-Tenancy",
      "Isolation",
      "Tenant ID"
    ]
  },
  {
    "id": "opa_a_07",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does OPA handle distributed policy cache invalidation when bundles are updated across hundreds of edge nodes?",
    "options": [
      "By orchestrating simultaneous operating system reboots across all production gateway proxy nodes during scheduled maintenance windows",
      "By enforcing a mandatory 24-hour cooling-off propagation delay before newly signed policy bundles become active across edge sidecars",
      "Through periodic polling or webhook-driven cache eviction, with atomic pointer swaps in memory ensuring zero downtime and zero stale reads",
      "Edge nodes never cache policy bundles locally and instead forward every single query synchronously to a master node"
    ],
    "correctIndex": 2,
    "explanation": "OPA management daemons download new bundles in the background, verify digital signatures, and perform atomic in-memory pointer swaps to switch policies seamlessly.",
    "citation": "OPA Bundle Service: Atomic Cache Reloads",
    "tags": [
      "Cache Invalidation",
      "Atomic Swaps",
      "Distributed Systems"
    ]
  },
  {
    "id": "opa_a_08",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "What is the purpose of OPA's 'strict' mode compiler flag (opa check --strict)?",
    "options": [
      "To forbid uppercase attribute identifiers and camelCase key names across incoming JSON authorization request schema definitions",
      "To configure production OPA daemons to terminate immediately with a fatal exit status upon encountering any denied authorization check",
      "To restrict policy bundle activation strictly to pre-approved weekend maintenance deployment windows",
      "To enforce strict syntax rules, disallowing deprecated features, unused variables, and ambiguous rule references"
    ],
    "correctIndex": 3,
    "explanation": "The --strict flag enables aggressive linting and compiler checks, catching duplicate imports, unused variables, and syntax ambiguities before deployment.",
    "citation": "OPA CLI Reference: Strict Compilation Checks",
    "tags": [
      "Strict Mode",
      "Linting",
      "Best Practices"
    ]
  },
  {
    "id": "opa_a_09",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How can an OPA policy verify that an automated AI agent script does not contain unauthorized SQL mutation statements (e.g., DROP, ALTER, DELETE)?",
    "options": [
      "By parsing the AST of the SQL payload passed in input.query_ast and asserting that ast.statement_type is strictly 'SELECT'",
      "By executing untrusted agent SQL queries inside a throwaway staging transaction and rolling back changes if row counts mutate",
      "By rejecting any analytical SQL string exceeding 500 characters or containing nested parentheses inside common table expressions",
      "OPA evaluates flat JSON requests only and cannot inspect structured SQL Abstract Syntax Trees"
    ],
    "correctIndex": 0,
    "explanation": "Analytical gateways parse SQL queries into structured AST JSON; OPA rules evaluate the AST, verifying that only read-only SELECT operations are executed.",
    "citation": "Playbook Section 5: AI & Database Query Governance",
    "tags": [
      "SQL Governance",
      "AST Inspection",
      "Agent Safety"
    ]
  },
  {
    "id": "opa_a_10",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "What is the benefit of using OPA's OpenTelemetry integration in enterprise production monitoring?",
    "options": [
      "It automatically transforms denied authorization events into formatted SMTP email incident alerts dispatched directly to hospital principal investigators",
      "It generates distributed trace spans for policy evaluations, recording exact evaluation duration, bundle version, and cache hit metrics in tracing backends (Jaeger/Zipkin)",
      "It replaces continuous database snapshots by archiving full analytical patient payloads inside distributed telemetry trace spans",
      "It synthesizes new Rego access control policies automatically from observed production HTTP traffic patterns"
    ],
    "correctIndex": 1,
    "explanation": "OpenTelemetry integration allows platform engineers to trace the exact latency and execution path of policy evaluations across microservice call chains.",
    "citation": "Open Policy Agent: Distributed Tracing with OpenTelemetry",
    "tags": [
      "OpenTelemetry",
      "Observability",
      "Tracing"
    ]
  },
  {
    "id": "opa_a_11",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does OPA enforce break-glass authorization with time-bounded automatic revocation?",
    "options": [
      "By issuing physical laminated emergency access vouchers countersigned in advance by three senior hospital clinical directors and stored in ward safes",
      "By triggering automated power-down scripts across enclave compute nodes precisely 60 minutes after emergency token issuance",
      "By validating that the emergency token contains an explicit justification, checking time.now_ns() against valid_until_ns, and streaming high-priority audit events",
      "Emergency break-glass overrides bypass declarative policy evaluation and must be executed manually by DBAs"
    ],
    "correctIndex": 2,
    "explanation": "Emergency break-glass tokens are verified against cryptographic signatures, explicit justification fields, and strict nanosecond expiration bounds.",
    "citation": "Zero-Trust Break-Glass Patterns in Policy-as-Code",
    "tags": [
      "Break-Glass",
      "Emergency Access",
      "Time-Bounded"
    ]
  },
  {
    "id": "opa_a_12",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "What is differential policy evaluation in automated governance CI/CD pipelines?",
    "options": [
      "Scheduling alternative experimental policy rule branches to execute exclusively during alternating weekly clinical information governance review cycles",
      "Computing standard line-by-line plain-text file diffs between uncompiled Rego rules during automated pull request checks",
      "Benchmarking cumulative CPU watt-hours consumed across policy nodes during peak evaluation bursts",
      "Evaluating a candidate policy pull request alongside the production policy against historic traffic replays to detect unintended decision regressions"
    ],
    "correctIndex": 3,
    "explanation": "Differential evaluation replays production decision logs against proposed policy revisions, generating deltas to ensure no legitimate traffic is accidentally blocked.",
    "citation": "Continuous Compliance: Differential Policy Testing & Replay",
    "tags": [
      "Differential Testing",
      "Regression",
      "CI/CD"
    ]
  },
  {
    "id": "opa_a_13",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does OPA prevent denial-of-service from runaway recursive rules in Rego?",
    "options": [
      "Rego enforces strict recursion checks: non-stratified negation and arbitrary mutual recursion are disallowed by the compiler",
      "By automatically severing external cluster DNS resolution whenever a policy evaluation traverses more than five nested rule hops",
      "By letting unbounded recursive rules run until a hard 10-millisecond watchdog timer terminates the active OPA worker container",
      "Rego is Turing-complete and supports arbitrary unbounded mutual recursion across user-defined functions"
    ],
    "correctIndex": 0,
    "explanation": "Rego's compiler enforces stratification and finiteness constraints: unrestricted general recursion is disallowed, guaranteeing that rule evaluation always terminates.",
    "citation": "Rego Language Specification: Recursion & Stratification",
    "tags": [
      "Recursion",
      "Termination",
      "Compiler Safety"
    ]
  },
  {
    "id": "opa_a_14",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How can an OPA policy enforce that exported tabular aggregates comply with the (1, 80%) dominance rule?",
    "options": [
      "By inspecting whether input.table_summary.row_count strictly exceeds 80 aggregate rows prior to permitting airlock submission",
      "By calculating (input.top_contributor_value / input.cell_total) * 100 and asserting the percentage is strictly <= 80",
      "By dynamically deleting the highest-contributing individual patient record from the underlying SQL table before exporting totals",
      "Rego lacks floating-point division operators and delegates concentration ratio math to external R scripts"
    ],
    "correctIndex": 1,
    "explanation": "Dominance rules evaluate concentration ratios: OPA takes the aggregated cell metrics and computes whether the largest contributor exceeds the safety threshold (e.g., 80%).",
    "citation": "Quantitative SDC SOP & Rego Implementation",
    "tags": [
      "Dominance Rule",
      "SDC",
      "Mathematical Rules"
    ]
  },
  {
    "id": "opa_a_15",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How do custom built-in functions in OPA extend the engine for specialized healthcare informatics tasks?",
    "options": [
      "By permitting policy maintainers to patch and hot-load custom Linux kernel modules directly from declarative Rego bundle manifests during live runs",
      "By sideloading untrusted external Python or Android microservices alongside the OPA sidecar over shared UNIX domain sockets",
      "By compiling custom Go functions into the OPA binary to perform compute-intensive domain operations (e.g., NHS number checksums, genomic coordinate validation)",
      "OPA strictly prohibits custom Go built-ins to preserve portability across WebAssembly runtime targets"
    ],
    "correctIndex": 2,
    "explanation": "Custom built-in functions allow extending OPA with specialized Go code, enabling high-performance domain calculations directly inside Rego queries.",
    "citation": "Open Policy Agent: Extending OPA with Custom Built-in Functions in Go",
    "tags": [
      "Custom Built-ins",
      "Go",
      "Extensibility"
    ]
  },
  {
    "id": "sdc_f_01",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is the standard minimum cell threshold (k) mandated by NHS England and ONS statistical disclosure control guidelines for health research outputs?",
    "options": [
      "k >= 2",
      "k >= 5",
      "k >= 100",
      "k >= 10"
    ],
    "correctIndex": 3,
    "explanation": "The standard threshold across NHS England SDEs and ONS guidelines is k >= 10 (or k >= 5 in low-risk aggregate domains): any cell count between 1 and 9 must be suppressed.",
    "citation": "ONS Working Paper No. 22 & NHS England SDC Handbook",
    "tags": [
      "SDC",
      "Cell Suppression",
      "k-threshold"
    ]
  },
  {
    "id": "sdc_f_02",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is 'primary suppression' in the context of statistical tabular output release?",
    "options": [
      "Replacing cell values that fall below the minimum threshold (e.g., counts 1 to 9) with a symbol such as '*' or '[c]'",
      "Permanently deleting underlying patient cohort records from the analytical database warehouse once subgroup counts fall below ten",
      "Subtracting a uniform constant offset of ten from every numeric frequency across the published contingency cross-tabulation",
      "Converting all absolute patient counts into unrounded floating-point row percentages without disclosing totals"
    ],
    "correctIndex": 0,
    "explanation": "Primary suppression directly masks sensitive cells whose small counts create an unacceptable re-identification risk.",
    "citation": "Hundepool et al. (Statistical Disclosure Control, Wiley 2012)",
    "tags": [
      "Primary Suppression",
      "Tabular Data",
      "SDC"
    ]
  },
  {
    "id": "sdc_f_03",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "Why is 'controlled rounding' (e.g., rounding all counts to Base 5 or Base 10) employed as an alternative to cell suppression?",
    "options": [
      "Because enclave statistical software packages introduce floating-point precision overflow exceptions when tabulating prime or odd patient frequency counts across strata",
      "It protects small counts by rounding all values to a multiple of a base number (masking real small numbers through rounding), while preserving table additivity",
      "It visually compacts wide multi-dimensional cross-tabulations so lengthy clinical manuscripts adhere strictly to academic journal column width and page constraints",
      "It is a typesetting requirement imposed by academic medical publishers prior to print PDF compilation"
    ],
    "correctIndex": 1,
    "explanation": "Controlled rounding masks small counts by rounding values to multiples of 5 or 10, essentially achieving suppression through rounding without missing data symbols.",
    "citation": "Eurostat Handbook on Statistical Disclosure Control",
    "tags": [
      "Controlled Rounding",
      "Base 5",
      "Rounding Suppression"
    ]
  },
  {
    "id": "sdc_f_04",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is an 'egress airlock' in a secure data enclave architecture?",
    "options": [
      "A physically ventilated hardware quarantine suite where servers undergo firmware cryptographic attestation checks prior to racking",
      "An authenticated external SFTP download mirror serving approved aggregate research tables directly to peer reviewers and journal editors",
      "An isolated staging environment and automated quarantine gate where analytical outputs are inspected before export",
      "A thermal airflow baffling unit engineered to cool high-density GPU inference nodes inside data centers"
    ],
    "correctIndex": 2,
    "explanation": "An airlock is a controlled gateway where candidate analytical files (tables, plots, code) are held in quarantine until automated checks and human SDC officers approve export.",
    "citation": "Standard Architecture for Trusted Research Environments (SATRE v1.1 Pillar 3)",
    "tags": [
      "Airlock",
      "Quarantine",
      "Egress Control"
    ]
  },
  {
    "id": "sdc_f_05",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is the dual-reviewer principle for statistical disclosure airlock releases?",
    "options": [
      "Two accredited clinical data engineers must pair-program and countersign all analytical Python extraction scripts prior to enclave batch execution",
      "The submitting investigator must verify their own summary tables independently across two separate enclave sessions separated by at least 24 hours",
      "Both the principal investigator and the university finance grant officer must countersign the export invoice",
      "Two independent, accredited Statistical Disclosure Control (SDC) officers must independently review and sign off on candidate release files"
    ],
    "correctIndex": 3,
    "explanation": "High-risk enclaves enforce dual-reviewer approval: two qualified SDC officers must independently verify that outputs conform to disclosure control rules.",
    "citation": "ONS Safe Output Service & Research Data Governance Guidance",
    "tags": [
      "Dual-Reviewer",
      "Governance",
      "Sign-Off"
    ]
  },
  {
    "id": "sdc_f_06",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "Why are raw unbinned scatterplots prohibited from export in clinical research airlocks?",
    "options": [
      "Individual data points on an unbinned scatterplot represent individual patient coordinates, allowing precise microdata reconstruction and attribute disclosure",
      "Unbinned scatterplots consume excessive vector rendering ink and routinely exceed standard journal manuscript file-size limits during submission",
      "Standard enclave Python containers intentionally omit matplotlib, seaborn, and ggplot2 vector graphics libraries to prevent graphical output exports",
      "Standard enclave Python containers intentionally omit matplotlib and ggplot2 graphics rendering libraries"
    ],
    "correctIndex": 0,
    "explanation": "Each dot on an unbinned scatterplot corresponds to a single individual's measurements; an adversary can measure the exact pixel coordinates to re-identify patients.",
    "citation": "NHS England SDE SDC SOP: Visualisation Rules",
    "tags": [
      "Scatterplots",
      "Visualisation",
      "Microdata Leak"
    ]
  },
  {
    "id": "sdc_f_07",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What are 'direct identifiers' in a patient dataset?",
    "options": [
      "Routine clinical laboratory measurements such as ABO blood group, serum hemoglobin concentration, and recorded height in centimeters",
      "Attributes that explicitly identify a patient on their own (e.g., Name, NHS Number, Full Postal Address, Phone Number)",
      "Enclave infrastructure telemetry metadata recording virtual machine private IPv4 addresses, container hashes, and host kernel patch versions",
      "Analytical environment identifiers recording which statistical package version generated the research table"
    ],
    "correctIndex": 1,
    "explanation": "Direct identifiers uniquely identify an individual without reference to additional information (names, national identity numbers, full street addresses).",
    "citation": "ICO Anonymisation Code of Practice & HIPAA De-identification Standard",
    "tags": [
      "Direct Identifiers",
      "PII",
      "De-identification"
    ]
  },
  {
    "id": "sdc_f_08",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What are 'quasi-identifiers' (or indirect identifiers) in healthcare data?",
    "options": [
      "Physical hospital estate attributes describing inpatient ward bed capacity, outpatient clinic room allocations, and clinical shift schedules",
      "Ephemeral cryptographically random UUID session identifiers generated dynamically during authenticated virtual desktop workspace logins",
      "Attributes (e.g., age, postal sector, ethnicity, diagnosis code, admission date) that in combination can uniquely identify an individual",
      "Semantic version tags tracking installed R and Python analytical package dependencies in container images"
    ],
    "correctIndex": 2,
    "explanation": "Quasi-identifiers do not identify a person alone, but when cross-referenced or linked (e.g., 5-digit postcode + birth date + sex), they uniquely identify over 80% of individuals.",
    "citation": "Sweeney (Simple Demographics Often Identify People Uniquely, 2000)",
    "tags": [
      "Quasi-Identifiers",
      "Re-identification",
      "Linkage Risk"
    ]
  },
  {
    "id": "sdc_f_09",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "Why must minimum and maximum values (range extremes) typically be suppressed in released statistical summaries?",
    "options": [
      "High-magnitude numerical outliers trigger decimal formatting overflow exceptions across automated LaTeX and PDF journal typesetting pipelines",
      "Reporting extreme minimum and maximum endpoints induces floating-point division-by-zero errors inside downstream variance estimation scripts",
      "Standard clinical statistical tests remain mathematically valid only for values normalized between 0 and 100",
      "Extreme minimum and maximum values frequently represent unique outlier patients whose distinct attributes make them trivially identifiable"
    ],
    "correctIndex": 3,
    "explanation": "Extremes (e.g., oldest patient in a rare disease cohort, or highest recorded hospital stay) usually belong to unique individuals, creating severe disclosure risks.",
    "citation": "ONS Guidelines for Statistical Disclosure Control of Tabular Data",
    "tags": [
      "Extremes",
      "Outliers",
      "Disclosure Risk"
    ]
  },
  {
    "id": "sdc_f_10",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What summary statistics should replace raw minimum and maximum values when reporting continuous distributions?",
    "options": [
      "Median, 25th percentile (Q1), 75th percentile (Q3), and Interquartile Range (IQR)",
      "The raw unmasked arithmetic mean alongside the exact individual records of the top and bottom five patients",
      "A calibrated pseudo-random noise offset added independently without preserving the underlying central tendency",
      "The arithmetic sum of all cohort NHS Numbers modulo the total sample count as a verification checksum"
    ],
    "correctIndex": 0,
    "explanation": "Using percentiles (p10, p25, p50, p75, p90) and interquartile ranges avoids disclosing unique extreme values while providing robust distributional metrics.",
    "citation": "SDC Handbook for Health Researchers",
    "tags": [
      "Percentiles",
      "IQR",
      "Safe Statistics"
    ]
  },
  {
    "id": "sdc_f_11",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "In statistical regression analysis, what does a degrees of freedom (df) safety check ensure?",
    "options": [
      "That accredited investigators retain methodological flexibility to adjust regression covariates iteratively after inspecting preliminary p-values",
      "That the sample size (N) substantially exceeds the number of fitted parameters (k), preventing exact mathematical derivation of individual records",
      "That analytical software packages execute exclusively under certified open-source licences enabling independent academic reproducibility audits",
      "That regression models train across at least five distributed hospital compute nodes for cross-validation"
    ],
    "correctIndex": 1,
    "explanation": "If degrees of freedom are too low (N ≈ k), an adversary can set up a system of linear equations to solve for the exact microdata values of the participants.",
    "citation": "ONS SDC Guidelines: Linear and Logistic Regression Output Rules",
    "tags": [
      "Degrees of Freedom",
      "Regression",
      "Linear Equations"
    ]
  },
  {
    "id": "sdc_f_12",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is an 'immutable airlock audit log'?",
    "options": [
      "A physical bound visitor logbook maintained manually by security reception personnel at the hospital research enclave facility entrance",
      "A rolling seven-day diagnostic buffer automatically truncated every Friday evening to conserve high-performance NVMe object storage capacity",
      "A tamper-evident, append-only digital record detailing every file submitted, automated rule checks, review comments, and reviewer signatures",
      "A shared institutional Excel tracker manually updated by investigators after completing external publications"
    ],
    "correctIndex": 2,
    "explanation": "Immutable airlock audit logs guarantee non-repudiation: every export request, automated pass/fail metric, and SDC officer sign-off is permanently recorded.",
    "citation": "SATRE v1.1 Pillar 4 (Auditing and Traceability)",
    "tags": [
      "Audit Log",
      "Immutability",
      "Non-repudiation"
    ]
  },
  {
    "id": "sdc_f_13",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "Which file formats are universally prohibited from direct export through a safe analytical airlock?",
    "options": [
      "Compiled narrative PDF manuscripts and aggregated contingency tables verified with minimum counts k >= 10",
      "Plain-text Markdown README methodological notes documenting analytical inclusion and exclusion criteria",
      "High-level vector SVG architecture diagrams illustrating conceptual clinical data linkage workflows",
      "Raw microdata CSVs, individual-level parquet files, SQL database dumps, and uncompiled binary executables"
    ],
    "correctIndex": 3,
    "explanation": "Raw microdata files (containing individual patient rows) and executable binaries are strictly forbidden from airlock egress.",
    "citation": "NHS England Secure Data Environment Egress Rules",
    "tags": [
      "File Formats",
      "Microdata Prohibition",
      "Egress Invariants"
    ]
  },
  {
    "id": "sdc_f_14",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "What is the researcher's responsibility prior to submitting an airlock export ticket?",
    "options": [
      "Self-assess outputs against published SDC guidance, perform primary/secondary suppression, remove microdata, and provide clear descriptive metadata",
      "Forward preliminary draft regression tables via institutional email to external co-authors to verify epidemiological plausibility before submission",
      "Submit raw unredacted analytical outputs straight to quarantine and rely entirely on enclave SDC officers to suppress sensitive cells manually",
      "Upload preliminary aggregate findings to public preprint repositories prior to final airlock clearance"
    ],
    "correctIndex": 0,
    "explanation": "Researchers must perform preliminary disclosure control before submission, ensuring tables are suppressed, graphs binned, and context documented for the review panel.",
    "citation": "Researcher Guide to Airlock Export Protocol",
    "tags": [
      "Self-Assessment",
      "Researcher Responsibility",
      "SOP"
    ]
  },
  {
    "id": "sdc_f_15",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Foundation",
    "question": "Why must Kaplan-Meier survival curves undergo specific disclosure control review before release?",
    "options": [
      "Time-to-event Cox proportional hazards and Kaplan-Meier calculations require excessive CPU compute time across multi-million-row patient cohorts",
      "Steps in survival curves correspond to individual patient events; small numbers of surviving patients at the tail of the curve can be identified",
      "Non-parametric step-function survival curves cannot be rendered accurately inside greyscale academic medical print journals without visual aliasing",
      "Non-parametric survival step functions cannot be rendered accurately in greyscale academic print journals"
    ],
    "correctIndex": 1,
    "explanation": "Each drop or step in a Kaplan-Meier curve represents an individual event. Towards the tail of the curve, drops represent unique identifiable patient deaths or endpoints.",
    "citation": "NHS England & ONS Guidelines for Survival Analysis Outputs",
    "tags": [
      "Kaplan-Meier",
      "Survival Analysis",
      "Step Drops"
    ]
  },
  {
    "id": "sdc_i_01",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What is 'secondary suppression' (complementary suppression) and why is it mandatory in tabular disclosure control?",
    "options": [
      "Mandating that independent output checkers inspect every candidate CSV export file simultaneously across calibrated dual display monitors during sign-off",
      "Retroactively retracting or masking previously published journal appendix tables whenever secondary linkage vulnerabilities are reported post-publication",
      "Suppressing additional non-sensitive cells in a row or column to prevent suppressed small cells from being derived by subtraction from margins/totals",
      "Stripping descriptive column headers and methodological footnotes from exported summary tables"
    ],
    "correctIndex": 2,
    "explanation": "If only the small cell is suppressed, an attacker can subtract the remaining cells from the row or column total to deduce the exact value of the hidden cell.",
    "citation": "Hundepool et al. (Statistical Disclosure Control § 4.3)",
    "tags": [
      "Secondary Suppression",
      "Complementary Suppression",
      "Margin Derivation"
    ]
  },
  {
    "id": "sdc_i_02",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How is the (1, 80%) dominance rule formulated in statistical output checking?",
    "options": [
      "Whenever a published cross-tabulated contingency matrix exceeds 80 rows, at least one summary marginal subtotal row must be suppressed systematically",
      "At least 80% of the institutional study steering committee must vote to ratify final manuscript summary tables prior to external airlock submission",
      "Any clinical record belonging to a patient aged over 80 years must be removed from survival regressions",
      "If a single individual or unit contributes more than 80% to the total aggregate value of a cell, the cell must be suppressed"
    ],
    "correctIndex": 3,
    "explanation": "The (1, 80%) dominance rule prevents an adversary from closely estimating the attribute value of the single dominant contributor within an aggregate total.",
    "citation": "ONS SDC Tabular Data Guidelines: Dominance Rules",
    "tags": [
      "Dominance Rule",
      "(1, 80%)",
      "Concentration"
    ]
  },
  {
    "id": "sdc_i_03",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How does the (2, 85%) dominance rule protect respondents in economic and healthcare datasets?",
    "options": [
      "By suppressing a cell if the top two contributors collectively account for more than 85% of the cell total value",
      "By verifying that regional acute inpatient bed occupancy rates remain consistently above 85% prior to comparative Trust benchmarking publication",
      "By excluding the two largest contributing NHS hospital Trusts completely from national multi-center aggregate clinical cost and outcome regressions",
      "By scaling every reported financial or clinical total downward by a fixed deterministic factor of 0.85"
    ],
    "correctIndex": 0,
    "explanation": "The (2, 85%) rule protects against coalition attacks: if two respondents dominate 85% of a cell, either of the two could accurately deduce the other's value.",
    "citation": "Federal Committee on Statistical Methodology (Statistical Policy Working Paper 22)",
    "tags": [
      "(2, 85%)",
      "Dominance",
      "Coalition Attacks"
    ]
  },
  {
    "id": "sdc_i_04",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How should Kaplan-Meier survival curves be handled when the number of patients at risk drops below the safety threshold (e.g., N < 10)?",
    "options": [
      "Withdraw the entire survival analysis study from the Trusted Research Environment and discard longitudinal clinical endpoints prior to manuscript submission",
      "Truncate the curve at the point where the risk pool drops below 10, or apply statistical smoothing to mask exact event timings",
      "Annotate the right-hand tail of the Kaplan-Meier survival curve explicitly with the exact ages and admission dates of the remaining nine patients",
      "Interpolate the final tail segment as a vertical drop directly to zero at the cohort midpoint date"
    ],
    "correctIndex": 1,
    "explanation": "Curves must either be truncated when the risk pool drops below N = 10, or smoothed so individual steps cannot be tied to exact calendar event dates.",
    "citation": "Playbook Section 4 & NHS SDC Guidance on Survival Analysis",
    "tags": [
      "Kaplan-Meier",
      "Smoothing",
      "Truncation"
    ]
  },
  {
    "id": "sdc_i_05",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "Why must regression residual plots be converted into binned hexbin or box plots rather than raw scatterplots?",
    "options": [
      "Because high-density vector scatterplots routinely exceed airlock quarantine disk quotas and browser memory limits when rendering national cohorts",
      "Because hexagonal binning aggregation is enforced automatically inside Python seaborn and statsmodels diagnostic routines for clinical regressions",
      "Unbinned residual plots display the exact coordinates (x, y) of each patient's error residual, exposing individual microdata values to re-identification",
      "Because standard scatterplots cannot numerically render negative regression residual error values"
    ],
    "correctIndex": 2,
    "explanation": "A residual scatterplot plots individual patient data points; replacing it with binned residuals (e.g., deciles or hexbins) preserves diagnostic utility without microdata exposure.",
    "citation": "ONS SDC Guidelines: Diagnostic Regression Plots",
    "tags": [
      "Residuals",
      "Hexbin",
      "Safe Visualisation"
    ]
  },
  {
    "id": "sdc_i_06",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What is the 'p-percent rule' in quantitative tabular disclosure control?",
    "options": [
      "A publication formatting standard requiring that at least p percent of exported visual figures incorporate accessible colorblind-safe palettes",
      "A statutory ethics compliance rule verifying that at least p percent of enrolled cohort patients executed signed prospective opt-in consent forms",
      "A rounding standard requiring all exported regression odds ratios to retain exactly p decimal places",
      "A rule that suppresses a cell if any coalition of respondents can estimate another respondent's value to within p percent accuracy"
    ],
    "correctIndex": 3,
    "explanation": "The p-percent rule mathematically guarantees that no respondent can utilize their own contribution to estimate another's value closer than p% of its true magnitude.",
    "citation": "Hundepool et al. (Statistical Disclosure Control: p-Percent Rule)",
    "tags": [
      "p-Percent Rule",
      "Mathematical SDC",
      "Estimation Bound"
    ]
  },
  {
    "id": "sdc_i_07",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How does Tau-Argus automate secondary cell suppression in complex multi-dimensional tables?",
    "options": [
      "By formulating table cell relations as integer linear programming (ILP) optimization problems to find the minimum information loss suppression pattern",
      "By scanning rasterized PDF contingency table images with optical character recognition and masking numeric frequency digits smaller than the threshold",
      "By iteratively zeroing random marginal cells inside a Monte Carlo simulation loop until every published row total appears arithmetically consistent",
      "By querying an external cloud optimization API to propose human-readable cell redaction patterns"
    ],
    "correctIndex": 0,
    "explanation": "Tau-Argus uses linear programming solvers (e.g., HiGHS, CPLEX) to identify the optimal secondary cells to suppress, minimizing total lost information while satisfying safety bounds.",
    "citation": "Statistics Netherlands: Tau-Argus User Guide & Methodology",
    "tags": [
      "Tau-Argus",
      "Integer Linear Programming",
      "Optimization"
    ]
  },
  {
    "id": "sdc_i_08",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "In logistic regression models, what minimum cell requirement applies to categorical covariate contingency tables?",
    "options": [
      "The serialized logistic regression model formula specification must remain concise without multi-way interaction terms exceeding 100 syntax tokens",
      "Every cross-tabulated cell of the binary outcome (0 and 1) against categorical predictor variables must satisfy the minimum cell count (k >= 10)",
      "The fitted classification regression model must achieve a Nagelkerke pseudo R-squared strictly equal to 1.0 across held-out internal validation folds",
      "Predicted probability curves must be truncated so fitted estimates never intersect zero or one bounds"
    ],
    "correctIndex": 1,
    "explanation": "Covariate cells with rare outcomes (e.g., only 1 patient with a specific mutation died) can leak identity; cell frequencies of outcomes per subgroup must satisfy k >= 10.",
    "citation": "ONS Safe Output Service Guidance: Regression Models",
    "tags": [
      "Logistic Regression",
      "Covariate Cells",
      "Contingency Tables"
    ]
  },
  {
    "id": "sdc_i_09",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What is 'differential privacy' and how does it protect individual records in aggregate database queries?",
    "options": [
      "A physical biometric access enclosure and Faraday RF shielding isolating hospital database storage racks from external electromagnetic eavesdropping",
      "A hardware memory encryption controller scrambling active RAM pages so host hypervisor administrators cannot dump live clinical query buffers",
      "A mathematical framework that guarantees the output of a computation is virtually identical whether any single individual's data is included or excluded",
      "An automated lifecycle policy that purges ephemeral analytical scratch volumes upon session logout"
    ],
    "correctIndex": 2,
    "explanation": "Differential privacy mathematically bounds the influence of any single person on the output by introducing calibrated random noise (Laplace or Gaussian mechanisms).",
    "citation": "Dwork (Differential Privacy: A Survey of Results, 2008)",
    "tags": [
      "Differential Privacy",
      "Mathematical Privacy",
      "Noise Injection"
    ]
  },
  {
    "id": "sdc_i_10",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What does the privacy budget (epsilon, ε) represent in differential privacy systems?",
    "options": [
      "The annual institutional grant funding budget allocated specifically to procure commercial privacy-enhancing computational software licences",
      "The maximum cumulative duration in calendar days that an accredited external investigator is authorized to hold active workspace access in a project",
      "The total encrypted SSD storage quota provisioned to each virtual desktop workspace inside the TRE",
      "The cumulative metric of total information leakage permitted across all queries executed against a sensitive dataset"
    ],
    "correctIndex": 3,
    "explanation": "The privacy budget ε tracks cumulative disclosure: as analysts run queries, ε is consumed; when exhausted, no further queries can be executed without compromising privacy.",
    "citation": "Dwork & Roth (The Algorithmic Foundations of Differential Privacy)",
    "tags": [
      "Privacy Budget",
      "Epsilon",
      "Composition"
    ]
  },
  {
    "id": "sdc_i_11",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How does 'geographic masking' or geographic aggregation mitigate spatial re-identification in epidemiological outputs?",
    "options": [
      "By aggregating precise street addresses or postal codes up to broader geographic boundaries (such as Integrated Care Board regions or MSOAs) with populations > 10,000",
      "By disabling public geospatial mapping APIs and street-level coordinate rendering tiles across hospital clinical research intranet networks globally before export",
      "By stripping all cartographic map visualizations and regional disparity appendices completely from published epidemiological surveillance reports",
      "By applying a fixed uniform geographic offset shifting all patient coordinates 500 kilometers northward"
    ],
    "correctIndex": 0,
    "explanation": "Combining rare diseases with granular postal codes allows spontaneous identification; aggregating to MSOAs or regional footprints ensures demographic anonymity.",
    "citation": "ONS SDC Guidelines for Geographic Data",
    "tags": [
      "Geographic Masking",
      "Spatial SDC",
      "Aggregation"
    ]
  },
  {
    "id": "sdc_i_12",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What is 'random rounding' in tabular disclosure control and how does it differ from deterministic rounding?",
    "options": [
      "Random rounding samples arbitrary replacement integers uniformly across a bounded interval without weighting proximity to the original observed count",
      "Random rounding rounds each cell up or down to the nearest multiple of base B with probabilities inversely proportional to the distance to those multiples",
      "Deterministic base-5 rounding is categorically prohibited across all UK public sector statistical releases under ONS disclosure control standards",
      "Random rounding replaces every cell below the suppression threshold deterministically with exact zeros"
    ],
    "correctIndex": 1,
    "explanation": "Random rounding introduces unbiased perturbation: a count of 3 rounded to base 5 has a 60% probability of rounding to 5 and a 40% probability of rounding to 0.",
    "citation": "Statistics Canada: Random Rounding Techniques in Census Outputs",
    "tags": [
      "Random Rounding",
      "Perturbation",
      "Unbiased"
    ]
  },
  {
    "id": "sdc_i_13",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "Why must machine learning model weights (e.g., neural network checkpoints or tree depth) undergo disclosure review prior to airlock export?",
    "options": [
      "Because serialized deep neural network checkpoint archives routinely exceed maximum airlock quarantine transfer quotas and attachment size limits",
      "Because multi-layer neural networks and gradient-boosted tree ensembles are strictly forbidden from training inside accredited NHS Secure Data Environments",
      "Overfitted models can memorize training data microdata points, allowing membership inference or training data extraction attacks",
      "Because binary checkpoint headers embed proprietary copyright notices belonging to GPU driver vendors"
    ],
    "correctIndex": 2,
    "explanation": "Deep neural networks and complex decision trees can memorize individual patient training samples, enabling adversaries to reconstruct sensitive clinical text or records.",
    "citation": "Carlini et al. (Extracting Training Data from Large Language Models, USENIX 2021)",
    "tags": [
      "Model Inversion",
      "Membership Inference",
      "Model Weights"
    ]
  },
  {
    "id": "sdc_i_14",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "What is a 'differencing attack' across sequential analytical table releases?",
    "options": [
      "An integrity tampering attack where malicious external actors modify published CSV cell formatting to distort downstream visual comparisons",
      "An academic publication priority dispute triggered when two independent research teams submit overlapping hospital cohort analyses to medical journals concurrently",
      "An academic authorship dispute triggered when two research teams publish overlapping analyses concurrently",
      "An attack where an adversary subtracts two overlapping published tables (e.g., one published in June and one in July) to deduce the attributes of newly admitted patients"
    ],
    "correctIndex": 3,
    "explanation": "Differencing attacks exploit overlapping releases: subtracting Table A from Table B exposes the exact attribute delta for the individuals entering or leaving the cohort.",
    "citation": "Hundepool et al. (Statistical Disclosure Control: Longitudinal Differencing)",
    "tags": [
      "Differencing Attack",
      "Longitudinal Risk",
      "Table Overlap"
    ]
  },
  {
    "id": "sdc_i_15",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Intermediate",
    "question": "How does an automated airlock scanner use Abstract Syntax Tree (AST) inspection to intercept dangerous code exports?",
    "options": [
      "By parsing source code files to detect unauthorized serialization calls (such as df.to_csv(), write.csv(), or pickle.dump() writing to unapproved paths)",
      "By cross-compiling analytical Python scripts into verified native x86 machine binaries prior to automated runtime quarantine execution checks",
      "By verifying that inline docstring annotations and methodological code comments exceed a minimum completeness threshold across every submitted module",
      "By inspecting Git commit line endings to verify whether scripts were authored on macOS or Linux hosts"
    ],
    "correctIndex": 0,
    "explanation": "AST scanners inspect Python and R scripts for file-writing functions that attempt to bypass airlock filters or serialize raw dataframe objects to disk.",
    "citation": "Playbook Section 4: Automated Code & Pipeline Airlock Verification",
    "tags": [
      "AST Scanner",
      "Static Analysis",
      "Airlock Enforcement"
    ]
  },
  {
    "id": "sdc_a_01",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How can an adversary formulate linear systems of equations to reconstruct microdata from multiple aggregate tables (attribute disclosure)?",
    "options": [
      "By visually inspecting published summary tables across manuscripts and estimating hidden small-cell patient counts using heuristic demographic rules",
      "By modeling marginal totals and cross-tabulations as a system of linear constraints (Ax = b, x in {0, 1}) and solving via SAT/SMT or Integer Linear Programming solvers",
      "Mathematically reconstructing individual-level microdata vectors from exact multi-way marginal aggregates and totals is provably impossible in polynomial time",
      "Mathematically reconstructing individual microdata from exact multi-way marginal aggregates is impossible"
    ],
    "correctIndex": 1,
    "explanation": "Fundamental reconstruction theorems prove that publishing too many high-accuracy aggregate queries allows polynomial-time solvers to reconstruct 100% of underlying microdata.",
    "citation": "Dinur & Nissim (Revealing Information while Preserving Privacy, PODS 2003)",
    "tags": [
      "Reconstruction Attack",
      "Linear Systems",
      "SMT Solvers"
    ]
  },
  {
    "id": "sdc_a_02",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What are the formal parameter definitions in Differential Privacy with (epsilon, delta) guarantees?",
    "options": [
      "epsilon measures encrypted object storage replication overhead across disks, whereas delta measures distributed SQL query execution latency variance",
      "epsilon specifies the maximum concurrent accredited researcher count permitted, whereas delta specifies the upper dimension bound on exported multi-way contingency tables",
      "epsilon represents the maximum privacy loss bound, and delta represents the probability of the privacy guarantee failing (catastrophic failure probability, ideally delta << 1/N)",
      "epsilon and delta are purely theoretical notation constants with no operational impact on calibrated noise"
    ],
    "correctIndex": 2,
    "explanation": "In (ε, δ)-DP, ε bounds the log-likelihood ratio, while δ represents the tiny probability that the guarantee fails to hold, strictly required to be less than the inverse dataset size (δ << 1/N).",
    "citation": "Dwork, Roth (The Algorithmic Foundations of Differential Privacy § 2.1)",
    "tags": [
      "Differential Privacy",
      "(epsilon, delta)",
      "Formal Privacy"
    ]
  },
  {
    "id": "sdc_a_03",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How does DP-SGD (Differentially Private Stochastic Gradient Descent) guarantee privacy during deep learning model training on clinical microdata?",
    "options": [
      "By systematically purging and re-initializing hidden neural network layer weights to random Gaussian priors after every individual clinical training epoch completes",
      "By executing stochastic gradient descent optimization loops exclusively inside dedicated fault-tolerant quantum annealing co-processors inside the enclave",
      "By replacing real clinical training cohorts entirely with unlinked synthetic images generated from noise",
      "By clipping individual per-sample gradient vectors to a maximum Euclidean norm C, and injecting calibrated Gaussian noise to the batch gradients before weight updates"
    ],
    "correctIndex": 3,
    "explanation": "DP-SGD bounds the influence of any single training record by clipping per-example gradient norms to C and adding noise scaled to C * sigma, guaranteeing provable Renyi DP bounds.",
    "citation": "Abadi et al. (Deep Learning with Differential Privacy, ACM CCS 2016)",
    "tags": [
      "DP-SGD",
      "Gradient Clipping",
      "Deep Learning Privacy"
    ]
  },
  {
    "id": "sdc_a_04",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is a 'membership inference attack' against an exported healthcare machine learning model?",
    "options": [
      "An attack where an adversary uses model confidence scores or prediction loss to determine with statistical significance whether a specific patient's record was in the training set",
      "An unauthorized RBAC privilege escalation attempt where an analyst tries to join an accredited senior investigator group via forged SAML group membership claims",
      "A distributed credential stuffing attack aimed at resetting institutional Single Sign-On passwords for registered research cohort study team members",
      "An SQL injection payload attempting to drop user membership tables from the enclave identity database"
    ],
    "correctIndex": 0,
    "explanation": "Membership inference exploits model overfitting: models typically exhibit higher confidence and lower prediction entropy on records that were part of their private training sets.",
    "citation": "Shokri et al. (Membership Inference Attacks Against Machine Learning Models, IEEE S&P 2017)",
    "tags": [
      "Membership Inference",
      "Model Auditing",
      "Overfitting"
    ]
  },
  {
    "id": "sdc_a_05",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is a 'model inversion attack' against clinical diagnostic models?",
    "options": [
      "Partitioning cross-validation training folds chronologically in reverse temporal order to evaluate backward statistical generalization across legacy hospital cohorts",
      "Reconstructing identifiable representations of training data (such as high-resolution patient face photos or genomic variants) by optimizing input features to maximize output activations",
      "Inverting the arithmetic signs of learned logistic regression beta coefficients intentionally prior to submitting model weights for airlock egress review",
      "Reversing the arithmetic sign of learned logistic regression beta coefficients prior to airlock submission"
    ],
    "correctIndex": 1,
    "explanation": "Model inversion algorithms perform gradient ascent over the input feature space to synthesize inputs that produce high target class probabilities, reconstructing identifiable patient phenotypes.",
    "citation": "Fredrikson et al. (Model Inversion Attacks that Exploit Confidence Information, ACM CCS 2015)",
    "tags": [
      "Model Inversion",
      "Feature Reconstruction",
      "Adversarial Machine Learning"
    ]
  },
  {
    "id": "sdc_a_06",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How does Shannon entropy measurement evaluate disclosure risk in published contingency tables?",
    "options": [
      "By sampling hardware GPU and CPU thermal dissipation entropy traces while computing multi-way epidemiological table cross-tabulations across nodes",
      "Information-theoretic Shannon conditional entropy metrics apply exclusively to binary telecommunications channels and cannot evaluate tabular disclosure risk",
      "By calculating the conditional entropy H(Y|X); low conditional entropy indicates that knowing attribute X reveals attribute Y with near certainty",
      "Information-theoretic Shannon entropy applies solely to binary communication channels, not tabular data"
    ],
    "correctIndex": 2,
    "explanation": "Information-theoretic entropy quantifies uncertainty: if the conditional entropy of a sensitive disease given published demographic variables approaches zero, disclosure is imminent.",
    "citation": "Cover & Thomas (Elements of Information Theory, Wiley 2006)",
    "tags": [
      "Shannon Entropy",
      "Information Theory",
      "Conditional Entropy"
    ]
  },
  {
    "id": "sdc_a_07",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "In high-dimensional clinical microdata, how does t-closeness extend the protections of k-anonymity and l-diversity?",
    "options": [
      "By guaranteeing mathematically that every published k-anonymous equivalence class contains at least t distinct patient records across linked demographic quasi-identifiers",
      "By encrypting sensitive clinical diagnosis attribute columns with symmetric Triple-DES ciphers prior to multi-center analytical cohort publication",
      "By purging outlier records whose primary identifier hashes terminate in specific hexadecimal tokens",
      "By requiring that the probability distribution of a sensitive attribute within any equivalence class does not deviate from the overall dataset distribution by more than distance threshold t"
    ],
    "correctIndex": 3,
    "explanation": "l-diversity fails when sensitive attributes are skewed (similarity attack); t-closeness guarantees that the local distribution of sensitive values closely mirrors the global distribution using Earth Mover's Distance.",
    "citation": "Li, Li, Venkatasubramanian (t-Closeness: Privacy Beyond k-Anonymity and l-Diversity, IEEE ICDE 2007)",
    "tags": [
      "t-Closeness",
      "k-Anonymity",
      "l-Diversity"
    ]
  },
  {
    "id": "sdc_a_08",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is the role of Zero-Knowledge Proofs (ZKP) in advanced airlock verification pipelines?",
    "options": [
      "ZKP allows a researcher to mathematically prove to an airlock gateway that an analytical output complies with SDC invariants (e.g., k >= 10) without revealing the underlying raw microdata",
      "Zero-knowledge proof circuits eliminate the operational requirement for quantitative mathematical disclosure checks or dual-reviewer human airlock sign-off in enclaves",
      "Zero-knowledge proofs deterministically hash every numeric cell count in exported tables to zero so no raw statistical aggregates leave the airlock gate",
      "ZKP remains purely theoretical in academic literature and cannot execute over practical statistical tables"
    ],
    "correctIndex": 0,
    "explanation": "zk-SNARKs and zero-knowledge proofs enable verifiable computation: analytical enclaves can produce verifiable proofs that SDC rules were satisfied without exposing confidential internal values.",
    "citation": "Zero-Knowledge Proofs in Verifiable Health Data Governance",
    "tags": [
      "ZKP",
      "zk-SNARKs",
      "Verifiable Privacy"
    ]
  },
  {
    "id": "sdc_a_09",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How does Renyi Differential Privacy (RDP) provide tighter composition bounds than standard advanced composition theorems?",
    "options": [
      "By deterministically rounding cumulative privacy loss parameters to exact integers following each iterative stochastic gradient descent epoch parameter update",
      "By characterizing privacy loss using the Renyi divergence spectrum of orders alpha, allowing simple additive composition across hundreds of sequential gradient updates",
      "By discarding the catastrophic failure probability parameter delta completely across multi-layer neural network training runs inside secure enclaves",
      "By restricting differential privacy enforcement strictly to bare-metal Linux kernel modules"
    ],
    "correctIndex": 1,
    "explanation": "RDP provides exact analytical composition: rather than accumulating loose bounds under standard (ε, δ) composition, RDP moments add linearly, yielding dramatically tighter final ε guarantees.",
    "citation": "Mironov (Renyi Differential Privacy, IEEE CSF 2017)",
    "tags": [
      "Renyi DP",
      "RDP",
      "Advanced Composition"
    ]
  },
  {
    "id": "sdc_a_10",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is 'micro-aggregation' in statistical disclosure control and when is it preferred over cell suppression?",
    "options": [
      "Executing localized contingency table aggregations inside specialized low-power ARM microprocessor enclaves dedicated to statistical preprocessing",
      "Deleting individual outlier patient records permanently whenever any continuous clinical covariate falls below minimum institutional cell suppression thresholds",
      "Clustering similar individual records into small groups of size at least k and replacing their individual values with the cluster centroid mean, preserving analytical utility",
      "Encoding tabular quantitative variables into compressed frequency-domain audio waveforms prior to export"
    ],
    "correctIndex": 2,
    "explanation": "Micro-aggregation replaces individual continuous measurements with group centroids of size k, maintaining multivariate correlation structures while eliminating exact individual values.",
    "citation": "Domingo-Ferrer & Mateo-Sanz (Practical Data-Oriented Microaggregation, IEEE TKDE 2002)",
    "tags": [
      "Micro-aggregation",
      "Centroids",
      "Continuous SDC"
    ]
  },
  {
    "id": "sdc_a_11",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How are rare single nucleotide polymorphisms (SNPs) and structural genomic variants protected during public airlock release?",
    "options": [
      "By recoding nucleotide sequence bases A, C, G, and T deterministically into numeric integers 1, 2, 3, and 4 prior to public tabular summary release",
      "De-identified genomic summary frequency statistics pose negligible re-identification risk to individuals and routinely bypass airlock disclosure review",
      "De-identified genomic summary statistics pose negligible re-identification risk and bypass SDC review",
      "By aggregating variants into allele frequency bands across large reference populations (> 1,000 individuals) and suppressing rare novel mutations (MAF < 0.01)"
    ],
    "correctIndex": 3,
    "explanation": "Rare genomic variants with Minor Allele Frequency (MAF) < 0.01 act as biometric fingerprints; publishing them individually allows Beacon attacks to confirm patient presence in the study cohort.",
    "citation": "Homer et al. (Resolving Individuals Contributing Trace Amounts of DNA to Complex Mixtures, PLOS Genetics 2008)",
    "tags": [
      "Genomics",
      "Minor Allele Frequency",
      "Beacon Attack"
    ]
  },
  {
    "id": "sdc_a_12",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is a 'subgraph disclosure attack' in patient referral and social contact tracing network analytics?",
    "options": [
      "Re-identifying individual patients or clinical practitioners by matching topological graph invariants (e.g., vertex degrees, clique structures, betweenness centrality) against public registries",
      "Inspecting optical screen reflections while hospital clinicians review interactive patient referral topology graph dashboards on unshielded ward workstations",
      "Flattening node-edge clinical referral adjacency structures into normalized relational SQL tables prior to summary statistical journal publication",
      "Flattening node-edge network adjacency structures into normalized relational SQL tables before publication"
    ],
    "correctIndex": 0,
    "explanation": "Anonymizing vertex labels is insufficient in graph analytics: the unique topological fingerprint of an individual's connections (degree, clustering coefficient) can re-identify them in network models.",
    "citation": "Backstrom et al. (Wherefore Art Thou R3579X? Anonymized Networks, ACM KDD 2007)",
    "tags": [
      "Network Anonymization",
      "Graph Topology",
      "Structural Re-identification"
    ]
  },
  {
    "id": "sdc_a_13",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How does Cosign cryptographic container signing enforce non-repudiation on approved airlock export bundles?",
    "options": [
      "By archiving approved airlock output bundles onto offline encrypted tapes stored inside physically locked fireproof safes in hospital basements",
      "By attaching an ECDSA cryptographic signature and review ticket metadata digest to the exported archive, verified against an authorized SDC officer's public key",
      "By enforcing interactive multi-factor password authentication prompts every time an external peer reviewer opens the downloaded statistical archive bundle",
      "By configuring automated object lifecycle expiration rules that purge exported archives after 24 hours"
    ],
    "correctIndex": 1,
    "explanation": "Cosign cryptographically binds the approved export archive to the digital signature and ticket ID of the reviewing SDC officer, guaranteeing that files cannot be modified post-approval.",
    "citation": "Sigstore Cosign & Secure Airlock Release Pipelines",
    "tags": [
      "Cosign",
      "Digital Signatures",
      "Airlock Non-repudiation"
    ]
  },
  {
    "id": "sdc_a_14",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "What is an Optical Character Recognition (OCR) and Computer Vision gate in an airlock pipeline designed to intercept?",
    "options": [
      "To digitize legacy handwritten paper clinical case notes into searchable plain-text archival PDF documents during cohort ingestion workflows",
      "To verify automatically that all exported statistical figures adhere strictly to NHS England corporate typography, margins, and color palette standards",
      "To scan submitted PNG, PDF, and SVG plot images to detect unsuppressed small numbers, plain-text patient names, or unbinned microdata dots hidden in image pixels",
      "To verify that all exported figures adhere to NHS England corporate typography and color branding guides"
    ],
    "correctIndex": 2,
    "explanation": "Computer vision scanners parse exported raster images and plots, detecting if researchers attempted to embed microdata coordinates or unsuppressed data tables as raw images.",
    "citation": "Automated Image & Figure Disclosure Scanning in Trusted Research Environments",
    "tags": [
      "Computer Vision",
      "OCR",
      "Image Inspection"
    ]
  },
  {
    "id": "sdc_a_15",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "How does 'watermarking and steganography detection' protect exported text documents from covert data exfiltration?",
    "options": [
      "By embedding visible institutional NHS Trust branding watermarks across every page header and footer of released statistical PDF summary reports",
      "By encoding plain-English study lay summaries into binary Morse sequences embedded inside audio accessibility tracks attached to exported manuscript documents",
      "By encoding executive lay summaries into binary Morse sequences embedded within audio accessibility tracks",
      "By scanning exported documents for hidden zero-width unicode characters, microdot patterns, or semantic steganography used to covertly smuggle confidential patient tokens"
    ],
    "correctIndex": 3,
    "explanation": "Adversaries can embed exfiltrated PII into benign text using invisible zero-width unicode spaces; airlock sanitizers detect and strip steganographic tokens before release.",
    "citation": "Steganographic Egress Mitigation in Air-Gapped Intelligence Enclaves",
    "tags": [
      "Steganography",
      "Zero-Width Characters",
      "Data Exfiltration"
    ]
  },
  {
    "id": "ai_f_01",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "Why is the use of commercial, multi-tenant public LLM APIs (e.g., ChatGPT, Claude, OpenAI API) strictly prohibited with identifiable patient data outside a secure enclave?",
    "options": [
      "Data sent to public multi-tenant APIs traverses the public internet, breaches NHS air-gap boundaries, and risks data retention or training exposure by commercial vendors",
      "Commercial foundation model vendors operate exclusively on proprietary cloud operating systems that are technically incompatible with NHS Linux enclaves",
      "Commercial language models lack clinical vocabulary tokenization for SNOMED-CT concept identifiers and standard ICD-10 hospital diagnostic classification codes",
      "Statutory clinical governance frameworks prohibit using automated text summarization anywhere inside hospital research networks"
    ],
    "correctIndex": 0,
    "explanation": "Transmitting confidential patient microdata to external multi-tenant cloud APIs violates Caldicott Principle 1, Common Law Duty of Confidentiality, and SATRE air-gap invariants.",
    "citation": "NHS England Guidance on Generative AI & Large Language Models in Healthcare (2023)",
    "tags": [
      "LLM Policy",
      "Air-Gap",
      "Confidentiality"
    ]
  },
  {
    "id": "ai_f_02",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is the Model Context Protocol (MCP) in the context of analytical data platforms?",
    "options": [
      "A physical optical interconnect hardware specification linking dedicated GPU inference clusters to air-gapped NVMe object storage arrays inside enclaves",
      "An open protocol standardizing how AI models and agents securely query tools, local databases, and contextual file resources",
      "A domain-specific declarative policy language engineered strictly for programming Class IIa clinical patient monitoring hardware and bedside medical devices",
      "An international diagnostic classification taxonomy governing automated medical billing and inpatient coding audits"
    ],
    "correctIndex": 1,
    "explanation": "MCP standardizes interactions between AI clients and local tool servers (database connectors, filesystem inspectors), replacing ad-hoc tool integrations with structured protocols.",
    "citation": "Model Context Protocol (MCP) Specification (Anthropic, 2024)",
    "tags": [
      "MCP",
      "Tool Use",
      "AI Architecture"
    ]
  },
  {
    "id": "ai_f_03",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "When an MCP server connects an AI agent to a clinical database, what permissions must be enforced on the database user account?",
    "options": [
      "Full database administrator credentials enabling schema migrations and temporary table creation during exploratory analysis",
      "Anonymous unauthenticated connection pooling to prevent user session identities from leaking into model prompt logs",
      "Strictly read-only SELECT permissions without write, delete, update, or schema modification privileges",
      "Write-only append privileges allowing autonomous agents to insert synthetic diagnostic labels without reading raw charts"
    ],
    "correctIndex": 2,
    "explanation": "MCP database adapters must operate under least privilege: strictly read-only SELECT access prevents autonomous agents from modifying or destroying patient records.",
    "citation": "Playbook Section 5 & Least Privilege Access Principles",
    "tags": [
      "Least Privilege",
      "MCP",
      "Read-Only"
    ]
  },
  {
    "id": "ai_f_04",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is the 'human-in-the-loop' requirement for AI agents operating within health intelligence enclaves?",
    "options": [
      "An on-site hardware operator must physically toggle air-gap optical network switches before each model inference batch job executes inside the enclave",
      "A qualified clinical coder must manually transcribe, syntax-check, and countersign every generated SQL query statement prior to database execution",
      "Human sign-off is waived automatically whenever an enclave LLM achieves over 99% benchmark accuracy on validation datasets",
      "An accredited human researcher sponsor must review, authorize, and take legal responsibility for agent-generated code and analytical workflows before execution"
    ],
    "correctIndex": 3,
    "explanation": "Autonomous agents cannot hold legal accreditation; an accredited human investigator must sponsor, review, and remain accountable for all automated analytical tasks.",
    "citation": "Playbook Section 5 & UKSA Safe Person Framework for Autonomous Workloads",
    "tags": [
      "Human-in-the-Loop",
      "Safe Person",
      "Accountability"
    ]
  },
  {
    "id": "ai_f_05",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "How must foundation AI models (e.g., Llama 3, Mistral) be hosted to comply with air-gapped healthcare security mandates?",
    "options": [
      "Deployed as containerized instances running entirely within the secure, air-gapped enclave with all external outbound network egress blocked",
      "Hosted on public institutional web portals protected solely by university IP address allowlists and shared organizational API gateway bearer keys",
      "Invoked remotely over mutual-TLS encrypted REST endpoints managed by overseas commercial foundation model vendors under standard SaaS data agreements",
      "Distributed directly onto researchers' personal laptops using encrypted external solid-state drives for offline inference"
    ],
    "correctIndex": 0,
    "explanation": "To satisfy SATRE Pillar 2 and NHS data security standards, open-weight models must be self-hosted on local enclave hardware with zero external internet telemetry.",
    "citation": "SATRE v1.1 Pillar 2 & NHS SDE AI Hosting Standards",
    "tags": [
      "Self-Hosting",
      "Zero Egress",
      "Containerization"
    ]
  },
  {
    "id": "ai_f_06",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is the role of a Clinical Safety Officer (CSO) under statutory standards DCB0129 and DCB0160?",
    "options": [
      "An enterprise cybersecurity penetration auditor responsible for conducting annual vulnerability scans across hospital perimeter firewalls and enclaves",
      "An accredited clinician who leads the clinical risk management process, maintains the living Hazard Log, and signs off on the Clinical Safety Case Report",
      "A senior database software architect responsible for writing automated regression tests, CI linting pipelines, and relational clinical schema migrations",
      "A senior software architect responsible for writing automated regression tests and maintaining relational database schemas"
    ],
    "correctIndex": 1,
    "explanation": "DCB0129 mandates that health IT manufacturers appoint an accredited CSO (a registered healthcare professional trained in clinical safety) to oversee risk management.",
    "citation": "DCB0129 & DCB0160: Clinical Risk Management in Health IT (Health and Social Care Act 2012 § 250)",
    "tags": [
      "CSO",
      "DCB0129",
      "Clinical Safety"
    ]
  },
  {
    "id": "ai_f_07",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What international standard defines the requirements for establishing, implementing, and continually improving an Artificial Intelligence Management System (AIMS)?",
    "options": [
      "ISO 9001",
      "ISO 14001",
      "ISO/IEC 42001:2023",
      "ISO 31000"
    ],
    "correctIndex": 2,
    "explanation": "ISO/IEC 42001 is the world's first certifiable standard for Artificial Intelligence Management Systems, establishing governance, transparency, and risk management for AI.",
    "citation": "ISO/IEC 42001:2023 Information Technology — Artificial Intelligence Management System",
    "tags": [
      "ISO 42001",
      "AIMS",
      "AI Standards"
    ]
  },
  {
    "id": "ai_f_08",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is 'hallucination' in large language models and why is it dangerous in health data analytics?",
    "options": [
      "When hardware GPU memory fragmentation induces intermittent graphical rendering artifacts across high-resolution clinical radiology diagnostic viewports in sessions",
      "When an inference server exhausts allocated VRAM buffer capacity during concurrent long-context retrieval-augmented clinical prompt evaluations",
      "When a multilingual healthcare translation model outputs mixed terminology across English and Welsh clinical summaries",
      "When an LLM generates factually false or nonsensical statements presented with high linguistic confidence, which could lead to flawed epidemiological findings or medical errors"
    ],
    "correctIndex": 3,
    "explanation": "Hallucination occurs when generative models invent facts, statistics, or citations; ungrounded analytical conclusions can severely compromise clinical studies.",
    "citation": "Ji et al. (Survey of Hallucination in Natural Language Generation, ACM Computing Surveys 2023)",
    "tags": [
      "Hallucination",
      "Grounding",
      "Clinical Risk"
    ]
  },
  {
    "id": "ai_f_09",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is a 'prompt injection attack' against an AI agent?",
    "options": [
      "Manipulating the model's instructions by embedding adversarial text inside user inputs or retrieved database records, causing the model to bypass safety guardrails",
      "Injecting unvalidated SQL schema migration DDL statements directly into dense vector embedding storage databases during scheduled platform upgrades",
      "Exploiting race conditions inside concurrent browser keyboard event handlers to replay previously authorized clinical triage prompts across enclave user sessions",
      "Physically disconnecting network patch cables mid-inference to force partial responses from stateless API endpoints"
    ],
    "correctIndex": 0,
    "explanation": "Prompt injection occurs when untrusted text (e.g., malicious notes in clinical records) overrides the system prompt, causing the agent to execute unauthorized tools.",
    "citation": "OWASP Top 10 for Large Language Model Applications (LLM01: Prompt Injection)",
    "tags": [
      "Prompt Injection",
      "Adversarial AI",
      "Security"
    ]
  },
  {
    "id": "ai_f_09_alt",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What does standard DCB0129 require health IT organizations to produce before deploying health software?",
    "options": [
      "A comprehensive commercial marketing dossier alongside an external usability report signed by user interface designers",
      "A Clinical Risk Management Plan, a living Hazard Log, and a Clinical Safety Case Report (CSCR)",
      "A certificate of incorporation from Companies House paired with verified corporate professional indemnity insurance",
      "A detailed financial cost-recovery schedule documenting annual cloud hosting fees and per-seat software licensing costs"
    ],
    "correctIndex": 1,
    "explanation": "DCB0129 requires three core deliverables: Clinical Risk Management Plan, comprehensive Hazard Log detailing all identified clinical hazards, and the final Clinical Safety Case Report.",
    "citation": "NHS Digital DCB0129 Standard Requirements § 3.2",
    "tags": [
      "DCB0129",
      "CSCR",
      "Hazard Log"
    ]
  },
  {
    "id": "ai_f_11",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "Why is enterprise GitHub Copilot or Claude Code prohibited from scanning live patient microdata tables?",
    "options": [
      "Because cloud-hosted developer coding assistants cannot parse analytical SQL window functions or recursive common table expressions in warehouses",
      "Because enterprise IDE copilot extensions support general consumer web applications only and lack healthcare statistical language parsing capabilities",
      "Code generation assistants send code context and snippets to external cloud servers for processing, violating air-gap invariants and exposing patient PII",
      "Because enterprise software licensing agreements prohibit hospital clinicians from writing Python data transformations"
    ],
    "correctIndex": 2,
    "explanation": "Cloud-based coding assistants stream active workspace buffers and database schemas to external corporate endpoints, creating serious unauthorized data egress risks.",
    "citation": "NHS England Information Governance Bulletin on Developer AI Tools",
    "tags": [
      "Copilot",
      "Cloud Telemetry",
      "Egress Invariants"
    ]
  },
  {
    "id": "ai_f_12",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is ISO/IEC 5259 and why is it vital for machine learning models trained on health records?",
    "options": [
      "A physical engineering specification defining standardized server rack dimensions, hot-aisle airflow tolerances, and enclave power baselines",
      "A hospital estates and facilities compliance guideline governing HEPA air filtration and ambient cooling across clinical diagnostic imaging suites",
      "An NHS procurement classification standard governing clinical workforce attire and sterile ward equipment labeling",
      "A series of international standards establishing data quality measures, bias evaluation, and governance for AI training datasets"
    ],
    "correctIndex": 3,
    "explanation": "ISO/IEC 5259 establishes quantitative data quality requirements (completeness, accuracy, representativeness, bias minimization) specifically for AI/ML training data.",
    "citation": "ISO/IEC 5259: Artificial Intelligence — Data Quality for Analytics and Machine Learning",
    "tags": [
      "ISO 5259",
      "Data Quality",
      "Bias Mitigation"
    ]
  },
  {
    "id": "ai_f_13",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What is 'Retrieval-Augmented Generation' (RAG) in enterprise clinical analytics?",
    "options": [
      "An architecture that enhances LLM generation by retrieving authoritative, relevant factual documents from a curated local database before prompting the model",
      "Recovering expired user Single Sign-On sessions and cached OAuth bearer tokens from distributed institutional identity provider audit log stores",
      "Synthesizing unconstrained free-text patient clinical histories purely from randomized statistical prior token distributions without clinical grounding",
      "Converting structured tabular laboratory results into synthesized spoken audio briefings for clinician handovers"
    ],
    "correctIndex": 0,
    "explanation": "RAG grounds generative models by retrieving relevant factual context (e.g., clinical guidelines or curated ontology definitions) from local vector databases prior to response generation.",
    "citation": "Lewis et al. (Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, NeurIPS 2020)",
    "tags": [
      "RAG",
      "Grounding",
      "Information Retrieval"
    ]
  },
  {
    "id": "ai_f_14",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "What does 'function calling' (or tool calling) allow an LLM to do in a structured governance platform?",
    "options": [
      "To emit standardized audible clinical alert chimes and visual notification banners inside browser-based hospital ward triage dashboards during shifts",
      "To output structured JSON arguments adhering to a predefined schema, allowing the host application to invoke specific validated API functions",
      "To dynamically patch host Linux kernel syscall filter tables at runtime using model-generated assembly instructions inside isolated worker nodes",
      "To initiate automated outbound telephone voice calls directly to on-call hospital clinicians without human confirmation"
    ],
    "correctIndex": 1,
    "explanation": "Function calling enables models to output machine-readable JSON matching strict tool definitions, allowing platform proxies to validate arguments before tool execution.",
    "citation": "Model Tool-Calling Architectures & API Interfaces",
    "tags": [
      "Function Calling",
      "Tool Use",
      "JSON Schema"
    ]
  },
  {
    "id": "ai_f_15",
    "category": "AI & MCP Governance",
    "difficulty": "Foundation",
    "question": "Why must external telemetry and 'phone-home' analytics be disabled on local AI inference engines (such as vLLM or Ollama)?",
    "options": [
      "Because background diagnostic telemetry daemons consume excessive standby battery power reserves across virtualized enclave compute cluster nodes",
      "Because automated outbound usage analytics packets trigger fatal kernel panics in open-source NVIDIA CUDA display drivers on Linux research hosts",
      "Telemetry packets send usage logs, prompts, and IP addresses to external third-party servers, directly breaching air-gapped zero-egress security invariants",
      "Outbound telemetry logging to model vendors is mandated by UK data protection statutes for continuous AI auditing"
    ],
    "correctIndex": 2,
    "explanation": "Zero-egress enclaves require complete network isolation: background telemetry and diagnostic analytics reporting must be disabled to prevent data leakage.",
    "citation": "Air-Gapped LLM Deployment Guide & Telemetry Mitigation",
    "tags": [
      "Telemetry",
      "Zero Egress",
      "vLLM"
    ]
  },
  {
    "id": "ai_i_01",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How does resource URI scoping in the Model Context Protocol (MCP) restrict AI agent access to authorized files?",
    "options": [
      "By applying visual permission color coding to virtual desktop folder icons inside the accredited researcher's isolated browser workspace session",
      "By appending natural-language system prompt reminders instructing the foundation model not to traverse directories outside its assigned project folder",
      "By automatically deleting any project files located outside the active workspace directory before agent initialization",
      "By strictly binding tool access to explicit URI patterns (e.g., file:///projects/proj_101/*) and rejecting any path traversal attempts outside the boundary"
    ],
    "correctIndex": 3,
    "explanation": "MCP servers enforce URI boundary checks: any file read request attempting path traversal (e.g., ../../etc/passwd) outside the approved project root is rejected.",
    "citation": "MCP Security Best Practices: Resource Scoping & Path Sanitization",
    "tags": [
      "MCP",
      "Path Traversal",
      "Resource Scoping"
    ]
  },
  {
    "id": "ai_i_02",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is an 'indirect prompt injection attack' in a clinical research RAG system?",
    "options": [
      "An adversary embeds adversarial instructions inside an unstructured medical note or PDF; when the RAG system retrieves the note, the LLM executes the hidden payload",
      "A physical hardware sabotage attack executed by disconnecting fiber-optic storage uplinks inside the hospital enclave data center perimeter",
      "A CUDA floating-point rounding precision defect inside GPU tensor cores that silently alters retrieved cosine similarity document rankings in RAG pipelines",
      "An unauthorized institutional credential reset triggered via social engineering against the university IT helpdesk"
    ],
    "correctIndex": 0,
    "explanation": "Indirect prompt injection occurs when malicious instructions are ingested from external or retrieved text documents, hijacking the agent's reasoning loop.",
    "citation": "Greshake et al. (Not What You've Signed Up For: Compromising Real-World LLM Applications via Indirect Prompt Injection, 2023)",
    "tags": [
      "Prompt Injection",
      "Indirect Attack",
      "RAG Security"
    ]
  },
  {
    "id": "ai_i_03",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How does a 5x5 Clinical Risk Matrix evaluate hazards in a DCB0129 Hazard Log?",
    "options": [
      "By multiplying provisioned enclave object storage capacity in terabytes by allocated GPU clock frequency to derive operational risk tiers",
      "By cross-referencing Consequence Severity (Catastrophic to Minor) against Likelihood (Very High to Improbable) to determine initial and residual Clinical Risk Scores",
      "By weighting total platform engineering headcount against historical incident ticket volume during quarterly Trust clinical governance board review meetings",
      "By calculating the amortized capital replacement cost of hospital server hardware relative to clinical ward budgets"
    ],
    "correctIndex": 1,
    "explanation": "DCB0129 defines a 5x5 matrix mapping severity (Catastrophic, Major, Moderate, Minor, Negligible) and likelihood (1 to 5) to categorize risks into Acceptable or Unacceptable bands.",
    "citation": "DCB0129 Standard Specification: Clinical Risk Matrix Methodology",
    "tags": [
      "Risk Matrix",
      "DCB0129",
      "Hazard Log"
    ]
  },
  {
    "id": "ai_i_04",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What privacy risk is associated with high-dimensional dense vector embeddings generated from clinical patient notes?",
    "options": [
      "Dense vector embeddings consume excessive host CPU L3 cache capacity and cannot scale efficiently across standard relational health data warehouses",
      "Vector embeddings are cryptographically bound to experimental quantum processors and cannot be indexed by standard SQL relational extensions",
      "Vector embeddings can be inverted using reconstruction algorithms to recover the original raw clinical text and patient PII",
      "Vector embeddings automatically expire and lose semantic distance fidelity 24 hours after initial model tokenization"
    ],
    "correctIndex": 2,
    "explanation": "Embedding inversion attacks can reconstruct significant portions of original training text from dense vector embeddings, proving embeddings are not inherently anonymous.",
    "citation": "Morris et al. (Text Embeddings Reveal (Almost) As Much As Text, EMNLP 2023)",
    "tags": [
      "Embeddings",
      "Inversion Attack",
      "Vector Privacy"
    ]
  },
  {
    "id": "ai_i_05",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is Parameter-Efficient Fine-Tuning (PEFT / LoRA) and how is it governed in healthcare AI?",
    "options": [
      "Randomly zeroing out 90% of pretrained transformer self-attention weights after training to guarantee formal statistical differential privacy bounds",
      "Archiving printed SHA-256 cryptographic hashes of neural network layer weights inside physical fireproof clinical governance binders for inspections",
      "A low-latency hardware bus standard connecting external storage enclosures directly to hospital inference accelerators",
      "Training small low-rank adapter matrices while keeping base model weights frozen; adapter weights must undergo strict SDC review to prevent memorization"
    ],
    "correctIndex": 3,
    "explanation": "LoRA fine-tunes only small adapter modules; however, because adapters can memorize training microdata, adapter weights must be treated as sensitive assets and audited.",
    "citation": "Hu et al. (LoRA: Low-Rank Adaptation of Large Language Models, ICLR 2022)",
    "tags": [
      "LoRA",
      "PEFT",
      "Model Governance"
    ]
  },
  {
    "id": "ai_i_06",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How can an analytical platform detect and abort a runaway autonomous agent planning loop?",
    "options": [
      "By enforcing deterministic execution limits: maximum step depth, timeout thresholds, memory bounds, and monitoring repeat loop detection in agent scratchpads",
      "By severing primary mains electricity to the server rack whenever autonomous agent execution queues remain active beyond five minutes",
      "By permitting autonomous reasoning loops to iterate unconstrained until host memory exhaustion triggers an OS out-of-memory process termination signal",
      "Runaway multi-step agent planning loops are mathematically undetectable at runtime and require manual termination"
    ],
    "correctIndex": 0,
    "explanation": "Agent orchestration proxies enforce strict guardrails: maximum reasoning iterations (e.g., max 10 steps), wall-clock timeouts, and semantic cycle detection to abort infinite loops.",
    "citation": "Autonomous Agent Governance: Bounding Infinite Planning Loops",
    "tags": [
      "Agent Loops",
      "Guardrails",
      "Timeout"
    ]
  },
  {
    "id": "ai_i_07",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is an AI Software Bill of Materials (AI SBOM) under ISO 42001 recommendations?",
    "options": [
      "An itemized vendor procurement invoice detailing GPU hardware leases, cloud object storage consumption, and enterprise software support maintenance tiers",
      "A formal machine-readable inventory recording base foundation model weights, pre-training corpora sources, fine-tuning adapters, licenses, and cryptographic hashes",
      "A confidential human resources security directory mapping software developer residential addresses and physical hospital enclave access badge IDs",
      "An introductory clinical user training manual explaining how ward nurses interpret automated risk triage alerts"
    ],
    "correctIndex": 1,
    "explanation": "An AI SBOM provides comprehensive traceability for AI assets, documenting exact model architecture, training data lineage, dependency versions, and SHA-256 checksums.",
    "citation": "ISO/IEC 42001:2023 & US Executive Order 14110 (AI Supply Chain Transparency)",
    "tags": [
      "AI SBOM",
      "Supply Chain",
      "Traceability"
    ]
  },
  {
    "id": "ai_i_08",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How do SHACL shapes validate the structured JSON outputs produced by LLM function calling?",
    "options": [
      "By automatically transpiling untrusted JSON tool-call arguments into raw executable Python scripts prior to isolated container sandbox runs",
      "W3C SHACL engines execute strictly over static Turtle graph files stored on disk and cannot validate transient JSON tool-call payloads in memory",
      "By converting the JSON arguments into an RDF graph in memory and evaluating target PropertyShapes to enforce required parameters, ranges, and types",
      "W3C SHACL operates strictly on static disk Turtle files and cannot validate transient JSON tool-call payloads"
    ],
    "correctIndex": 2,
    "explanation": "Platform gateways convert LLM JSON tool calls into temporary RDF graphs and run SHACL validation, rejecting hallucinated arguments or invalid parameter values before execution.",
    "citation": "Playbook Section 5: Semantic Validation of Agent Tool Invocations",
    "tags": [
      "SHACL",
      "Tool Calling",
      "JSON Validation"
    ]
  },
  {
    "id": "ai_i_09",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is the purpose of an 'output guardrail' (or output rail) in clinical LLM middleware?",
    "options": [
      "A physical mechanical retention bracket securing dual-monitor clinician workstations onto mobile hospital ward diagnostic computer carts",
      "A client-side WebGL rendering optimization middleware library that accelerates browser frame rates when displaying multi-panel clinical medical imaging",
      "A hardware inline surge suppressor attached to network power supplies to stabilize enclave inference cluster loads",
      "A secondary filtering layer that inspects LLM-generated text for forbidden regex patterns (e.g., NHS numbers, names, unsuppressed cell counts) before displaying to users"
    ],
    "correctIndex": 3,
    "explanation": "Output guardrails act as a safety net: even if an LLM is prompted to leak personal data, the output rail intercepts and redacts sensitive patterns before transmission.",
    "citation": "NeMo Guardrails & Llama Guard Architecture in Healthcare AI",
    "tags": [
      "Guardrails",
      "Redaction",
      "Output Filtering"
    ]
  },
  {
    "id": "ai_i_10",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What GPU virtualization technology ensures hardware memory isolation between concurrent research projects using local LLMs?",
    "options": [
      "NVIDIA Multi-Instance GPU (MIG) partitioning, which carves physical GPUs into isolated hardware instances with dedicated memory, cores, and crossbar bandwidth",
      "Dedicated short-range wireless pairing enclaves isolating peripheral clinician Bluetooth input devices across adjacent hospital clinical workspace terminals",
      "Launching isolated Python virtual environments inside a shared unprivileged user terminal multiplex session on bare-metal research compute hosts",
      "Dynamically overclocking shared GPU tensor core frequencies to minimize multi-tenant inference queue overlaps"
    ],
    "correctIndex": 0,
    "explanation": "NVIDIA MIG partitions a single GPU (e.g., A100/H100) into up to 7 completely isolated hardware instances, preventing cross-tenant memory leakage or side-channel snooping.",
    "citation": "NVIDIA Multi-Instance GPU (MIG) Architecture & Enclave Isolation",
    "tags": [
      "MIG",
      "GPU Isolation",
      "Hardware Security"
    ]
  },
  {
    "id": "ai_i_11",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How is 'watermarking' applied to AI-generated synthetic text in clinical documentation platforms?",
    "options": [
      "By embedding physical micro-printed invisible ink watermarks onto clinical summary discharge sheets exported from hospital network printers",
      "By subtly biasing the model's token selection logits based on a pseudo-random key, allowing automated verifiers to detect AI-generated text without human-perceptible degradation",
      "By appending mandatory explicit textual disclaimers stating 'Generated by AI' deterministically at the conclusion of every clinical discharge summary sentence",
      "By applying distinctive typographic font families uniformly across all model-generated patient correspondence"
    ],
    "correctIndex": 1,
    "explanation": "Statistical text watermarking green-lists specific token distributions during generation, creating a mathematical fingerprint that proves text origin while preserving readability.",
    "citation": "Kirchenbauer et al. (A Watermark for Large Language Models, ICML 2023)",
    "tags": [
      "Watermarking",
      "Provenance",
      "Synthetic Text"
    ]
  },
  {
    "id": "ai_i_12",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is 'disparate impact ratio' and how is it used to measure demographic bias under ISO/IEC 5259?",
    "options": [
      "The operational throughput ratio comparing outbound airlock network transfer bandwidth against inbound data ingestion speed in federated enclaves",
      "The workforce demographic representation ratio comparing protected characteristics across institutional clinical software engineering teams during audits",
      "The ratio of the selection or positive prediction rate for a protected demographic subgroup compared to the rate for the majority subgroup (unacceptable if < 0.80)",
      "The hardware utilization ratio comparing active tensor core compute cycles against idle memory wait intervals"
    ],
    "correctIndex": 2,
    "explanation": "The four-fifths (80%) rule calculates disparate impact: if a clinical risk prediction algorithm selects a protected demographic group at less than 80% of the majority rate, bias exists.",
    "citation": "ISO/IEC 5259-4: Data Quality Measures for AI Bias Mitigation",
    "tags": [
      "Disparate Impact",
      "Bias Mitigation",
      "Algorithmic Fairness"
    ]
  },
  {
    "id": "ai_i_13",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "What is 'post-market clinical surveillance' under DCB0160 for health organizations deploying AI models?",
    "options": [
      "Executing targeted digital adoption campaigns and clinician onboarding workshops across NHS hospital Trusts following initial software deployment",
      "Handing over validated clinical predictive model weights permanently as static immutable artifacts requiring zero recalibration post-deployment",
      "Handing over model weights permanently as immutable artifacts requiring zero software updates post-deployment",
      "Continuous ongoing monitoring of live model performance, calibration drift, false positive rates, and incident reports across diverse patient populations"
    ],
    "correctIndex": 3,
    "explanation": "DCB0160 requires health organizations to maintain active post-deployment monitoring to catch performance degradation, covariate shift, or emerging clinical hazards in production.",
    "citation": "DCB0160: Clinical Risk Management in the Deployment of Health IT Systems",
    "tags": [
      "DCB0160",
      "Post-Market Surveillance",
      "Drift Monitoring"
    ]
  },
  {
    "id": "ai_i_14",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "How does a vector database enforce role-based access control (RBAC) at the document chunk level during RAG retrieval?",
    "options": [
      "By attaching metadata security tags (e.g., permitted_roles: ['oncology_researcher']) to vector embeddings and applying boolean pre-filtering during approximate nearest neighbor search",
      "By physically partitioning each confidential research project corpus onto separate encrypted external solid-state volumes mounted per session",
      "Dense vector similarity databases evaluate approximate nearest neighbors purely over numeric float arrays and cannot enforce granular role-based access rules",
      "Dense vector databases evaluate similarity over flat numeric arrays and cannot enforce role-based access controls"
    ],
    "correctIndex": 0,
    "explanation": "Metadata pre-filtering ensures that vector similarity searches only compute distance against chunks the user is authorized to read, preventing unauthorized retrieval.",
    "citation": "Enterprise RAG Architectures: Metadata Filtering & Multi-Tenant Vector DBs",
    "tags": [
      "Vector DB",
      "RBAC",
      "Metadata Filtering"
    ]
  },
  {
    "id": "ai_i_15",
    "category": "AI & MCP Governance",
    "difficulty": "Intermediate",
    "question": "Why must multi-agent communication protocols use structured schemas (like JSON-RPC) instead of unconstrained natural language?",
    "options": [
      "Because unconstrained natural-language agent narratives consume excessive NVMe disk capacity across high-volume SIEM security audit log archives",
      "Unconstrained natural language allows prompt injection propagation and semantic ambiguity between agents, whereas structured schemas permit rigorous schema validation and policy enforcement",
      "Unconstrained agent-to-agent natural language dialogue is prohibited under international software copyright statutes and medical device compliance directives",
      "Unconstrained agent-to-agent natural language dialogue is prohibited under international software copyright treaties"
    ],
    "correctIndex": 1,
    "explanation": "Structured message passing allows intermediate policy proxies to validate agent requests against schemas and OPA rules, stopping adversarial prompt escalation between agents.",
    "citation": "Multi-Agent System Safety & Structured Communication Protocols",
    "tags": [
      "Multi-Agent",
      "JSON-RPC",
      "Protocol Safety"
    ]
  },
  {
    "id": "ai_a_01",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How do microVM isolation technologies (e.g., AWS Firecracker or Google gVisor) secure untrusted agent-generated Python code execution in analytical enclaves?",
    "options": [
      "By executing untrusted agent-generated Python scripts directly on the shared Kubernetes host Linux kernel using elevated root namespaces",
      "By disabling CPU L1/L2 branch prediction caches and speculative execution across every bare-metal worker node inside the clinical research enclave cluster",
      "By executing code within lightweight virtualized microVMs with dedicated guest kernels, isolated memory address spaces, and restricted seccomp syscall filters",
      "By transpiling arbitrary researcher Python scripts automatically into sandboxed client-side browser JavaScript"
    ],
    "correctIndex": 2,
    "explanation": "MicroVMs launch in under 5 milliseconds with dedicated Linux kernels, preventing container breakout attacks or unauthorized host kernel privilege escalation.",
    "citation": "Agache et al. (Firecracker: Lightweight Virtualization for Serverless Applications, USENIX NSDI 2020)",
    "tags": [
      "MicroVM",
      "Firecracker",
      "gVisor",
      "Sandboxing"
    ]
  },
  {
    "id": "ai_a_02",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is an 'adversarial jailbreak attack' using recursive or token-level perturbation against a clinical safety LLM?",
    "options": [
      "A coordinated physical perimeter breach targeting secure regional data center facilities housing national linked longitudinal health research warehouses",
      "Submitting uppercase emergency clinical override keywords inside standard chat prompts that bypass lexical punctuation tokenization rules",
      "Submitting uppercase emergency override keywords that bypass standard lexical punctuation tokenizers",
      "Constructing subtle token sequences (e.g., GCG attacks or cipher encoding) that bypass alignment training and cause the model to output dangerous clinical protocols or PII"
    ],
    "correctIndex": 3,
    "explanation": "Adversarial jailbreaks manipulate model representations to bypass safety filters; automated red-teaming tests clinical models against gradient-based and semantic jailbreak vectors.",
    "citation": "Zou et al. (Universal and Transferable Adversarial Attacks on Aligned Language Models, 2023)",
    "tags": [
      "Jailbreak",
      "Adversarial Robustness",
      "Red-Teaming"
    ]
  },
  {
    "id": "ai_a_03",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How does Machine Unlearning address the UK GDPR Article 17 ('Right to Erasure') in fine-tuned foundation models?",
    "options": [
      "By applying gradient-ascent unlearning algorithms or Fisher information matrix approximations to scrub the influence of specific patient records from model weights without full retraining",
      "By securely wiping and reformatting physical RAID storage volumes housing raw clinical cohorts immediately once distributed neural network training completes",
      "By deleting the requesting individual patient's microdata row directly from the original training CSV archive after distributed training finishes",
      "By deleting the individual patient's row from the original CSV file once distributed model training has completed"
    ],
    "correctIndex": 0,
    "explanation": "Machine unlearning mathematically removes the statistical influence of specific training records from neural network parameters, ensuring compliance with erasure mandates.",
    "citation": "Bourtoule et al. (Machine Unlearning, IEEE S&P 2021)",
    "tags": [
      "Machine Unlearning",
      "Right to Erasure",
      "Article 17"
    ]
  },
  {
    "id": "ai_a_04",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How does W3C PROV-O capture cryptographic lineage for autonomous multi-step agent workflows?",
    "options": [
      "By archiving compressed spoken audio transcripts narrating intermediate reasoning chains across multi-step autonomous clinical agent execution workflows",
      "By creating prov:Activity records for each tool call, capturing exact system prompts, input tokens, model version, temperature, random seed, and output hashes linked to the human sponsor",
      "By anchoring raw system prompt strings directly onto public proof-of-stake cryptocurrency blockchain ledgers for open community verification",
      "By anchoring raw system prompts directly onto public proof-of-stake blockchain ledgers for community verification"
    ],
    "correctIndex": 1,
    "explanation": "PROV-O structures agent execution into a non-repudiable directed graph: every prompt, intermediate reasoning step, and tool invocation is recorded with cryptographic hashes.",
    "citation": "Semantic Provenance for Autonomous AI Agents in Scientific Research",
    "tags": [
      "PROV-O",
      "Agent Provenance",
      "Lineage"
    ]
  },
  {
    "id": "ai_a_05",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is 'semantic entropy' and how does it detect LLM hallucinations in clinical query responses?",
    "options": [
      "Monitoring ambient server room thermal fluctuations correlated statistically with intensive transformer multi-head attention GPU computations across racks",
      "Analyzing vowel-to-consonant character frequency ratios inside generated clinical responses to detect non-medical synthetic wording patterns",
      "Sampling multiple responses from the model at non-zero temperature and computing entropy across semantic equivalence classes (high semantic entropy indicates ungrounded hallucination)",
      "Measuring jitter and packet round-trip latency distributions across distributed vector retrieval microservices"
    ],
    "correctIndex": 2,
    "explanation": "Semantic entropy groups generated responses into meaning clusters; if the model produces conflicting semantic meanings across runs, it reveals high uncertainty and probable hallucination.",
    "citation": "Kuhn, Gal, Farquhar (Semantic Uncertainty: Linguistic Invariances for Uncertainty Estimation in LLMs, Nature 2023)",
    "tags": [
      "Semantic Entropy",
      "Hallucination Detection",
      "Uncertainty"
    ]
  },
  {
    "id": "ai_a_06",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is 'membership inference on fine-tuned model adapters' and how is it quantitatively measured?",
    "options": [
      "Verifying programmatically whether a principal investigator holds active clinical fellowship membership in the British Medical Association",
      "Validating an investigator's hospital enclave smartcard badge credentials against federated SAML institutional identity provider assertions before access",
      "Benchmarking uncompressed file size growth when merging LoRA adapter weights back into base model checkpoints",
      "Evaluating whether loss values or shadow model predictions can differentiate between patients in the fine-tuning set versus unseen patients, measured via Area Under the ROC Curve (AUC)"
    ],
    "correctIndex": 3,
    "explanation": "Membership inference exploits low training loss: an AUC significantly above 0.50 indicates that the adapter memorized specific patient records, presenting a severe disclosure risk.",
    "citation": "Carlini et al. (The Secret Sharer: Evaluating and Testing Unintended Memorization in Neural Networks, USENIX 2019)",
    "tags": [
      "Membership Inference",
      "Adapter Privacy",
      "Memorization"
    ]
  },
  {
    "id": "ai_a_07",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How does symbolic execution formally verify that agent-generated analytical SQL code cannot execute dangerous operations?",
    "options": [
      "By exploring all execution paths through the query AST using symbolic mathematical variables to formally prove that no data modification or privilege escalation states can be reached",
      "By executing agent-synthesized SQL queries directly against mirrored production hospital read-replicas inside a staging sandbox first",
      "Symbolic formal execution frameworks apply exclusively to compiled C machine binaries and cannot analyze declarative analytical SQL abstract syntax trees",
      "Symbolic formal execution applies exclusively to compiled C binaries and cannot analyze declarative SQL ASTs"
    ],
    "correctIndex": 0,
    "explanation": "Symbolic execution mathematically proves safety invariants: it verifies that under all possible input parameters, generated queries only access approved read-only views.",
    "citation": "Formal Verification of Database Access Policies via Symbolic Execution",
    "tags": [
      "Symbolic Execution",
      "Formal Verification",
      "SQL Safety"
    ]
  },
  {
    "id": "ai_a_08",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is 'Zero-Knowledge Machine Learning' (zkML) and what governance assurance does it provide?",
    "options": [
      "A baseline foundation language model initialized with zero medical domain pre-training to benchmark zero-shot clinical reasoning capability across cohorts",
      "A cryptographic technique that allows a platform to verify that a specific approved model architecture and weights executed correctly on private inputs, without exposing model weights or patient data",
      "An ultra-low-power neuromorphic hardware inference accelerator engineered to execute quantized transformer weights without grid electricity",
      "A commercial compliance branding label indicating that an open-source model uses permissive Apache 2.0 licensing"
    ],
    "correctIndex": 1,
    "explanation": "zkML produces cryptographic zero-knowledge proofs (zk-SNARKs) proving that an approved AI inference was performed faithfully according to validated weights without leaking proprietary data.",
    "citation": "Zero-Knowledge Machine Learning: Cryptographic Verification of AI Inference",
    "tags": [
      "zkML",
      "zk-SNARKs",
      "Verifiable AI"
    ]
  },
  {
    "id": "ai_a_09",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "In a DCB0129 Clinical Safety Case Report, what constitutes an 'As Low As Reasonably Practicable' (ALARP) justification?",
    "options": [
      "A financial procurement justification demonstrating that additional cybersecurity mitigations exceeded the software project's approved capital governance budget",
      "A formal statutory safety declaration certifying that the deployed clinical AI system introduces zero residual operational clinical risks",
      "A formal clinical risk-benefit demonstration proving that residual risks are tolerable and that further reduction would require disproportionate cost, time, or complexity relative to the risk reduction",
      "A standardized plain-English patient notification explaining inevitable model errors in routine hospital care"
    ],
    "correctIndex": 2,
    "explanation": "ALARP arguments demonstrate that all reasonable engineering mitigations have been deployed and that remaining residual risks are clinically acceptable given the health benefits.",
    "citation": "DCB0129 Clinical Safety Management System: The ALARP Principle",
    "tags": [
      "ALARP",
      "Clinical Safety",
      "DCB0129"
    ]
  },
  {
    "id": "ai_a_10",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is a 'training data extraction attack' against language models fine-tuned on clinical narratives?",
    "options": [
      "Physical exfiltration of unencrypted removable backup drives containing confidential clinical patient research cohorts from regional hospital data centers",
      "Downloading publicly hosted open-weight foundation model checkpoints directly from external Hugging Face community repositories into enclaves",
      "Purging intermediate tokenized training corpora from ephemeral scratch storage once training epochs complete",
      "Prompting the model with prefix prompts and sampling millions of completions to extract verbatim sequences of confidential patient clinical text memorized during training"
    ],
    "correctIndex": 3,
    "explanation": "Adversaries can extract verbatim training sequences by querying models with targeted prefixes; without differential privacy (DP-SGD), models can regurgitate memorized clinical PII.",
    "citation": "Carlini et al. (Extracting Training Data from Large Language Models, USENIX Security 2021)",
    "tags": [
      "Training Data Extraction",
      "Memorization",
      "Privacy Leak"
    ]
  },
  {
    "id": "ai_a_11",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How do cryptographic data diodes enforce physical unidirectional communication between an AI analytics enclave and administrative controls?",
    "options": [
      "By using physical optical hardware (transmitting via LED/photodiode) that physically permits light to travel in only one direction, preventing any reverse-channel exfiltration",
      "By deploying standard full-duplex Cat6a Ethernet copper patch cabling protected solely by static IEEE 802.1Q switch port VLAN tagging",
      "Physical optical unidirectional data diodes remain purely conceptual theoretical designs unavailable for deployment in production clinical research enclaves",
      "Physical optical unidirectional data diodes remain purely conceptual designs unavailable for production enclaves"
    ],
    "correctIndex": 0,
    "explanation": "Hardware data diodes enforce physical unidirectional data flow: packets can physically enter the enclave for processing, but physical laws prevent any outbound exfiltration through the cable.",
    "citation": "Hardware-Enforced Unidirectional Data Diodes in Critical National Infrastructure",
    "tags": [
      "Data Diode",
      "Hardware Security",
      "Physical Egress"
    ]
  },
  {
    "id": "ai_a_12",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is 'Equalized Odds' and how does it formally audit algorithmic fairness in diagnostic clinical AI?",
    "options": [
      "Enforcing uniform randomized tie-breaking lottery weights across hospital clinicians reviewing ambiguous diagnostic risk prediction scores",
      "Asserting that the model's true positive rate and false positive rate are equal across all protected demographic subgroups (e.g., race, sex, age)",
      "Auditing institutional software engineering teams to verify balanced demographic representation across model developers and reviewers",
      "Auditing institutional software engineering teams to ensure balanced demographic representation across developers"
    ],
    "correctIndex": 1,
    "explanation": "Equalized odds guarantees that false positive and false negative error rates are balanced across demographic groups, preventing algorithms from systematically under-diagnosing marginalized cohorts.",
    "citation": "Hardt, Price, Srebro (Equality of Opportunity in Supervised Learning, NeurIPS 2016)",
    "tags": [
      "Equalized Odds",
      "Algorithmic Fairness",
      "ISO 5259"
    ]
  },
  {
    "id": "ai_a_13",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How does continuous calibration monitoring detect 'silent clinical failure' in deployed healthcare AI models?",
    "options": [
      "Monitoring physical cooling fan RPM and server chassis ambient thermal telemetry alerts via SNMP traps across production inference racks",
      "Conducting informal quarterly user satisfaction surveys with hospital ward nurses regarding electronic health record dashboard layout aesthetics and speed",
      "By tracking the agreement between predicted probabilities and observed empirical event frequencies across moving time windows, alerting when covariate shift degrades predictive reliability",
      "Scheduling automated nightly database service restarts to clear stale in-memory prediction lookup caches"
    ],
    "correctIndex": 2,
    "explanation": "Models can maintain high accuracy while suffering severe probability calibration drift; continuous calibration tracking flags when risk scores deviate from true clinical incident frequencies.",
    "citation": "Calibration Drift and Silent Failure in Clinical Decision Support AI",
    "tags": [
      "Calibration",
      "Covariate Shift",
      "Model Monitoring"
    ]
  },
  {
    "id": "ai_a_14",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "What is an Algorithmic Impact Assessment (AIA) and when is it required under international AI governance frameworks?",
    "options": [
      "A synthetic floating-point operations throughput benchmark evaluating GPU tensor core speed across candidate hospital AI inference nodes",
      "A statutory financial compliance audit verifying corporate tax filings, grant disbursements, and capital expenditure allocations for clinical AI grants",
      "A standardized open-source software licensing agreement governing commercial redistribution of model weights",
      "A comprehensive multi-disciplinary audit evaluating societal benefits, systemic human rights risks, data biases, and clinical safety before deploying high-risk AI in public health"
    ],
    "correctIndex": 3,
    "explanation": "An AIA evaluates broader societal impacts, clinical safety risks, and privacy implications, serving as a mandatory governance gateway for high-risk AI under ISO 42001 and EU/UK frameworks.",
    "citation": "Ada Lovelace Institute: Algorithmic Impact Assessment in Healthcare",
    "tags": [
      "AIA",
      "Algorithmic Impact",
      "ISO 42001"
    ]
  },
  {
    "id": "ai_a_15",
    "category": "AI & MCP Governance",
    "difficulty": "Advanced",
    "question": "How do JSON-RPC schema bounds protect Model Context Protocol (MCP) tool servers from arbitrary command execution?",
    "options": [
      "By enforcing strict type schemas on method names and arguments, ensuring agents can only invoke predefined functions with validated primitive parameters and never execute raw shell commands",
      "By rotating ephemeral API session passwords to 64-character random alphanumeric strings prior to each individual autonomous agent inference tool invocation",
      "JSON-RPC acts purely as an application transport framing convention and provides no strict parameter type or method validation safety",
      "JSON-RPC acts purely as an application transport framing convention and provides no argument validation safety"
    ],
    "correctIndex": 0,
    "explanation": "Strict JSON-RPC method dispatch restricts agents to explicit RPC interfaces (e.g., 'query_patient_counts'); arbitrary shell commands or unsanitized system calls are blocked by the dispatcher.",
    "citation": "Model Context Protocol Security Guidelines: RPC Dispatch & Argument Validation",
    "tags": [
      "JSON-RPC",
      "MCP Security",
      "Command Injection"
    ]
  },
  {
    "id": "repo_f_01",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is the core philosophy of 'Policy-as-Code' in health data governance?",
    "options": [
      "Recording binding clinical data sharing agreements on notarized physical parchment deeds stored chronologically inside Trust corporate legal safety archives",
      "Expressing Information Governance policies, statutory rules, and security controls as machine-readable, version-controlled code evaluated automatically in CI/CD pipelines",
      "Training qualified NHS legal counsel and Caldicott Guardians to author production Kubernetes network policies and OPA Rego code directly in branches",
      "Replacing programmatic access control checks with narrative plain-English prose guidelines interpreted manually"
    ],
    "correctIndex": 1,
    "explanation": "Policy-as-Code translates human-written regulations into declarative code (SHACL, Rego) that can be version-controlled, tested, and automatically enforced across platforms.",
    "citation": "Playbook Section 1 & Section 6: Policy-as-Code Foundations",
    "tags": [
      "Policy-as-Code",
      "Governance",
      "Automation"
    ]
  },
  {
    "id": "repo_f_02",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "In a Policy-as-Code repository, why must governance policies be decoupled from the underlying data analytics engine?",
    "options": [
      "Because analytical columnar engines such as DuckDB and Apache Spark lack native runtime parsers for reading UTF-8 governance configuration files",
      "To intentionally introduce deterministic evaluation delays that throttle rapid sequential statistical querying across exploratory clinical notebooks",
      "Decoupling ensures policies can be audited, versioned, and updated independently of database engines (DuckDB, Postgres, Spark) without code refactoring",
      "To intentionally introduce deterministic evaluation delays that throttle rapid sequential statistical querying"
    ],
    "correctIndex": 2,
    "explanation": "Decoupled policy architecture allows the same governance rules to be enforced uniformly across disparate query engines, storage tiers, and airlock gateways.",
    "citation": "Playbook Section 2 & Decoupled Policy Architectures",
    "tags": [
      "Decoupling",
      "Architecture",
      "Modularity"
    ]
  },
  {
    "id": "repo_f_03",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is the purpose of automated Continuous Integration (CI) in a healthcare governance repository?",
    "options": [
      "To dispatch automated public transparency newsletters to enrolled patient cohorts whenever new clinical research studies merge changes",
      "To trigger automated physical archiving of hardcopy paper audit binders whenever a protected governance repository branch receives tagged commits",
      "To trigger automated physical archiving of hardcopy paper printouts whenever a repository branch receives commits",
      "To automatically execute SHACL graph validation, OPA unit tests, and security linters on every pull request before changes are merged"
    ],
    "correctIndex": 3,
    "explanation": "CI pipelines (e.g., GitHub Actions or GitLab CI) run automated test suites against every commit, guaranteeing that policy regressions are caught before reaching production.",
    "citation": "Playbook Section 3 & SATRE v1.1 Pillar 4 (Software Quality)",
    "tags": [
      "CI/CD",
      "Continuous Integration",
      "Automated Testing"
    ]
  },
  {
    "id": "repo_f_04",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "Why are signed Git commits (using GPG or SSH keys) standard practice in health research repositories?",
    "options": [
      "To provide cryptographic proof of author identity, ensuring commit provenance and preventing malicious impersonation of compliance officers",
      "To enforce consistent visual typography formatting and standardized Conventional Commit prefixes across developer terminal commit logs",
      "Because unsigned Git commits introduce redundant binary blob metadata that rapidly inflates repository object storage requirements over time",
      "Cryptographic commit signatures are required by modern web browsers before rendering static documentation sites"
    ],
    "correctIndex": 0,
    "explanation": "Cryptographically signed commits prove author non-repudiation: audit logs can verify exactly which engineer or compliance officer committed each policy rule.",
    "citation": "Git Cryptographic Signatures (GPG/SSH) & Supply Chain Security",
    "tags": [
      "Signed Commits",
      "GPG",
      "Provenance"
    ]
  },
  {
    "id": "repo_f_05",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is the function of a 'pre-commit hook' in a developer's local Git environment?",
    "options": [
      "To schedule automated workstation power-down and screen-lock routines whenever an enclave engineer finishes their daily remote session",
      "To run local security scanners that catch hardcoded passwords, API keys, or patient PII before code is committed to the Git history",
      "To purge the entire local Git working tree and remote branch history automatically whenever a syntax or security linter reports a warning",
      "To mirror committed policy diffs automatically to public open-source code transparency feeds upon commit"
    ],
    "correctIndex": 1,
    "explanation": "Pre-commit hooks intercept local commits to perform secret detection, syntax linting, and PII scanning, preventing sensitive credentials from ever entering Git history.",
    "citation": "Git Hooks Documentation & Secret Detection Guidelines",
    "tags": [
      "Pre-commit",
      "Secret Scanning",
      "Security"
    ]
  },
  {
    "id": "repo_f_06",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What do 'branch protection rules' enforce on the primary 'main' branch of a governance repository?",
    "options": [
      "They freeze the governance repository permanently after initial production launch so approved policy rules can never be modified later",
      "They mandate that every contributing engineer develops code on identical locked-down institutional workstation hardware profiles and OS builds",
      "They mandate peer code review approvals, require passing CI status checks, and prohibit direct force-pushes to production branches",
      "They configure automated cron jobs to purge any unmerged feature branches older than 30 calendar days"
    ],
    "correctIndex": 2,
    "explanation": "Branch protection enforces governance guardrails: changes cannot bypass review, ensuring that at least two accredited engineers approve any policy modification.",
    "citation": "GitHub / GitLab Protected Branches & Enterprise Compliance",
    "tags": [
      "Branch Protection",
      "Code Review",
      "Governance"
    ]
  },
  {
    "id": "repo_f_07",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is an Architectural Decision Record (ADR) and why is it maintained in the codebase?",
    "options": [
      "An itemized capital procurement receipt tracking hospital server hardware warranties, GPU compute leases, and network switch contracts",
      "A human resources separation ledger recording engineering staff departures, offboarding checklists, and revoked enclave security clearances across projects",
      "A continuous environmental telemetry log recording server rack inlet temperatures and cooling power draw",
      "A lightweight, version-controlled document capturing the context, options considered, decision, and consequences of a significant architectural choice"
    ],
    "correctIndex": 3,
    "explanation": "ADRs (e.g., D-001 through D-009) document the rationale behind technical decisions (e.g., choosing SHACL over OWL reasoning), preserving context for future auditors.",
    "citation": "Michael Nygard (Documenting Architecture Decisions) & Wavebound Decision Register",
    "tags": [
      "ADR",
      "Architecture",
      "Decision Register"
    ]
  },
  {
    "id": "repo_f_08",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What does Semantic Versioning (SemVer: MAJOR.MINOR.PATCH) communicate about a policy release (e.g., v2.1.0)?",
    "options": [
      "MAJOR indicates breaking policy changes, MINOR adds backwards-compatible rules, and PATCH contains bug fixes and clarifications",
      "The total headcount of software engineers, information governance leads, and clinical safety reviewers who signed off on the release bundle",
      "The structured calendar year, month, and day timestamp recording exactly when the tagged governance repository bundle was built and published",
      "A benchmark throughput tier classifying target enclave processor speeds supported by the compiled policy bundle"
    ],
    "correctIndex": 0,
    "explanation": "SemVer standardizes version numbers: incrementing MAJOR signals breaking policy changes that require downstream pipeline migrations.",
    "citation": "Semantic Versioning 2.0.0 Specification",
    "tags": [
      "SemVer",
      "Versioning",
      "Release Management"
    ]
  },
  {
    "id": "repo_f_09",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "Why is package dependency pinning (e.g., package-lock.json, poetry.lock, requirements.txt with exact hashes) critical in healthcare data platforms?",
    "options": [
      "To guarantee backward runtime compatibility with legacy 32-bit clinical workstation operating systems across older NHS hospital wards",
      "To ensure reproducible builds and prevent malicious upstream package updates or breaking dependencies from entering production enclaves",
      "Lockfile checksums aggressively compress Python wheel payloads on disk so remote package synchronization downloads finish ten times faster",
      "Lockfile hashes compress Python wheel payloads on disk so remote package downloads complete ten times faster"
    ],
    "correctIndex": 1,
    "explanation": "Lockfiles pin exact package versions and cryptographic checksums, guaranteeing that builds are deterministic and immune to upstream supply-chain tampering.",
    "citation": "Supply Chain Security for Python & Node.js Health Analytics",
    "tags": [
      "Dependency Pinning",
      "Reproducibility",
      "Supply Chain"
    ]
  },
  {
    "id": "repo_f_10",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is the primary role of Docker containerization in reproducible health research architecture?",
    "options": [
      "To compress multi-gigabyte longitudinal patient cohort datasets into portable encrypted ZIP archives suitable for standard institutional email attachment",
      "To supply investigators with an interactive graphical manuscript word processor and citation manager inside air-gapped virtual desktops",
      "To package analytical runtimes (operating system, libraries, code) into isolated, immutable containers that execute identically across diverse hardware environments",
      "To emulate physical multi-monitor clinical workstation hardware peripherals across remote browser connections"
    ],
    "correctIndex": 2,
    "explanation": "Containerization encapsulates the full software stack (R, Python, system libraries), ensuring analytical results can be reproduced bit-for-bit across different platforms.",
    "citation": "Docker & OCI Container Standards in Reproducible Research",
    "tags": [
      "Docker",
      "Containers",
      "Reproducibility"
    ]
  },
  {
    "id": "repo_f_11",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "In a healthcare metadata catalog, what is the role of the HDR UK Metadata Standard?",
    "options": [
      "To regulate maximum network ingress bandwidth limits across regional NHS hospital clinical data extraction gateways during nightly ingestion batches",
      "To manage symmetric key rotation schedules for encrypted DICOM clinical medical imaging archives persisted on enclave object storage",
      "To automate typesetting and postal dispatch of physical patient appointment reminder letters across Trusts",
      "To provide a standardized schema (covering summary, provenance, coverage, accessibility) describing health data assets for public discovery without exposing raw data"
    ],
    "correctIndex": 3,
    "explanation": "The HDR UK metadata standard allows research enclaves to publish discoverable, machine-readable descriptions of their data assets, fulfilling transparency mandates.",
    "citation": "HDR UK Health Data Research Gateway Metadata Specification",
    "tags": [
      "HDR UK",
      "Metadata",
      "Data Discovery"
    ]
  },
  {
    "id": "repo_f_12",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is 'Documentation-as-Code' and how does it prevent governance documentation from becoming stale?",
    "options": [
      "Maintaining documentation (Markdown, AsciiDoc) in the same Git repository as code, updated in the same pull requests and checked by CI",
      "Printing static snapshots of system manuals annually and locking physical ring-binders inside Trust corporate governance compliance safes",
      "Commissioning external technical communications agencies to author annual glossy architectural overview reports for executive Trust boards",
      "Distributing monthly recorded audio briefings summarizing enclave policy changes to accredited investigators"
    ],
    "correctIndex": 0,
    "explanation": "Documentation-as-code keeps architecture guides, SOPs, and governance charters alongside the code, ensuring documentation is versioned, peer-reviewed, and synchronized.",
    "citation": "Documentation-as-Code: Continuous Technical Documentation",
    "tags": [
      "Docs-as-Code",
      "Markdown",
      "Maintainability"
    ]
  },
  {
    "id": "repo_f_13",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What does 'environment parity' mean between development, staging, and production enclaves?",
    "options": [
      "Applying uniform visual UI themes, accessible typography, and corporate NHS color branding across all staging and production user portals",
      "Ensuring dev, staging, and production environments share identical operating systems, policy bundles, and security configurations to prevent unexpected production failures",
      "Sharing identical static database service credentials, API keys, and root TLS certificates across development, staging, and production enclave clusters",
      "Sharing identical static database service passwords across development, staging, and production clusters"
    ],
    "correctIndex": 1,
    "explanation": "Environment parity ensures that code and policies tested in staging behave identically when promoted to production, eliminating environment-specific bugs.",
    "citation": "The Twelve-Factor App: X. Dev/prod parity",
    "tags": [
      "Parity",
      "Environments",
      "Reliability"
    ]
  },
  {
    "id": "repo_f_14",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "What is a 'linter' in a policy-as-code repository?",
    "options": [
      "A scheduled disk maintenance daemon that purges stale temporary scratch files from distributed compute worker node local storage volumes every midnight",
      "A synthetic patient cohort generator tool used to fabricate realistic dummy demographic tables for automated staging integration tests",
      "A static analysis tool that scans code files (Rego, Turtle, TypeScript) for syntax errors, anti-patterns, and formatting violations without executing the code",
      "A synthetic cohort generation tool used to fabricate realistic dummy patient tables for staging environments"
    ],
    "correctIndex": 2,
    "explanation": "Linters (such as ESLint, opa check, and turtle-lint) parse source code to enforce style consistency, detect dead code, and flag common security pitfalls.",
    "citation": "Static Code Analysis & Linting in Enterprise Compliance",
    "tags": [
      "Linting",
      "Static Analysis",
      "Code Quality"
    ]
  },
  {
    "id": "repo_f_15",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "Why must production database passwords and API keys NEVER be committed to a Git repository?",
    "options": [
      "Because Git's internal delta packfile compression corrupts plain-text configuration files containing fewer than 10 newline-delimited credential lines",
      "Git object stores are engineered strictly for binary asset snapshots rather than UTF-8 plain-text application configuration manifests",
      "Git object stores are optimized strictly for binary asset snapshots rather than UTF-8 plain-text config files",
      "Committing secrets to Git exposes them to anyone with repository access, embeds them permanently in commit history, and risks widespread credential compromise"
    ],
    "correctIndex": 3,
    "explanation": "Hardcoded credentials in Git represent one of the most common vectors for enterprise data breaches; secrets must be injected dynamically via secure secret managers.",
    "citation": "OWASP Top 10: Identification and Authentication Failures",
    "tags": [
      "Secrets Management",
      "Git Security",
      "Credentials"
    ]
  },
  {
    "id": "repo_i_01",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How do air-gapped package mirrors (e.g., Nexus, Artifactory) function inside secure research enclaves with zero external WAN connectivity?",
    "options": [
      "By maintaining local, read-only internal mirrors of PyPI, CRAN, and npm within the enclave perimeter, pre-scanned and synchronized via secure ingestion gates",
      "By synchronizing public PyPI Python wheels asynchronously over encrypted satellite uplinks during overnight low-traffic enclave maintenance windows",
      "By permitting accredited investigators to carry scanned personal USB flash drives containing statistical libraries into secure data centers",
      "By recompiling every required Python and R open-source scientific dependency from scratch inside enclave RAM"
    ],
    "correctIndex": 0,
    "explanation": "Researchers cannot access public package repositories; enclaves provide internal mirrors containing pre-vetted, security-scanned versions of approved libraries.",
    "citation": "Playbook Section 3 (Phase 4: Air-Gapped Package Mirror Architecture)",
    "tags": [
      "Air-Gap",
      "Package Mirror",
      "Artifact Repository"
    ]
  },
  {
    "id": "repo_i_02",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is the 'dual-plane' network architecture used in high-throughput research enclaves?",
    "options": [
      "Provisioning dual side-by-side physical monitors on every accredited investigator workstation to visually separate source code windows from study docs",
      "Separating the high-throughput analytical data plane (direct Parquet/DuckDB/SQL data queries) from the administrative control plane (API gateways, auth, and audit telemetry)",
      "Bonding redundant dual Ethernet uplinks onto single network interface cards to double raw analytical SQL query throughput across hosts",
      "Partitioning server rack power distribution so half of the enclave compute nodes run on uninterruptible batteries"
    ],
    "correctIndex": 1,
    "explanation": "Separating data plane from control plane prevents proxy bottlenecks during petabyte analytical scans while maintaining strict administrative isolation.",
    "citation": "Playbook Section 3 & Dual-Plane Analytical Routing",
    "tags": [
      "Dual-Plane",
      "Data Plane",
      "Control Plane"
    ]
  },
  {
    "id": "repo_i_03",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is Infrastructure as Code (IaC) and how does it benefit research enclave auditability?",
    "options": [
      "Executing automated factory robotics scripts that physically assemble, rack, and cable server chassis inside regional hospital data centers",
      "Retaining accredited external infrastructure consultants to click through cloud console configuration wizards manually prior to enclave audits",
      "Defining physical infrastructure, firewalls, subnets, and storage accounts declaratively in version-controlled scripts (e.g., Terraform, OpenTofu)",
      "Retaining accredited external infrastructure consultants to click through cloud console wizards manually by hand"
    ],
    "correctIndex": 2,
    "explanation": "IaC replaces error-prone manual console configuration with declarative code, enabling peer review, automated testing, and reproducible disaster recovery.",
    "citation": "HashiCorp Terraform & Infrastructure as Code Best Practices",
    "tags": [
      "IaC",
      "Terraform",
      "Reproducibility"
    ]
  },
  {
    "id": "repo_i_04",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is a Software Bill of Materials (SBOM) and what standard formats are used for containerized analytics runtimes?",
    "options": [
      "An itemized capital procurement manifest recording workstation monitors, rack servers, and encrypted networking switch hardware assets",
      "A plain-English patient transparency information leaflet explaining how clinical decision software processes hospital inpatient admission records",
      "A plain-English patient information leaflet explaining how clinical software processes hospital admission records",
      "A standardized, machine-readable inventory of all software components, libraries, and licenses in a system, formatted in CycloneDX or SPDX standards"
    ],
    "correctIndex": 3,
    "explanation": "An SBOM lists every package, library, and nested dependency in a container, enabling instant vulnerability auditing when new zero-day CVEs are disclosed.",
    "citation": "CISA Software Bill of Materials (SBOM) Guidance & CycloneDX Standard",
    "tags": [
      "SBOM",
      "CycloneDX",
      "Supply Chain"
    ]
  },
  {
    "id": "repo_i_05",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How does HashiCorp Vault or Cloud KMS improve secret management over static environment variables?",
    "options": [
      "By generating dynamic, time-limited, and cryptographically rotated credentials on demand, with comprehensive audit trails and zero hardcoded plaintext secrets",
      "By printing one-time emergency database recovery credentials onto tamper-evident laminated paper cards locked in corporate safes",
      "By storing symmetrically encrypted database service credentials directly inside a centralized administrative MySQL configuration metadata table",
      "By storing encrypted database service credentials directly inside a centralized administrative MySQL table"
    ],
    "correctIndex": 0,
    "explanation": "Secret managers issue short-lived, ephemeral credentials tied to workload identity, automatically rotating keys and logging every access event.",
    "citation": "HashiCorp Vault Architecture & Enterprise Secrets Management",
    "tags": [
      "KMS",
      "Vault",
      "Secrets Management"
    ]
  },
  {
    "id": "repo_i_06",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is a 'Canary Deployment' in zero-downtime policy-as-code release management?",
    "options": [
      "Validating experimental analytical pipelines inside an isolated test sandbox mimicking veterinary clinical research environments prior to approval",
      "Routing a small fraction of live traffic (e.g., 5%) to a newly released policy bundle while monitoring error rates, before rolling out to 100% of production",
      "Restricting all production policy bundle deployments exclusively to quiet Sunday morning maintenance windows with minimal active users",
      "Conducting manual smoke tests solely on a lead platform engineer's local workstation prior to production tagging"
    ],
    "correctIndex": 1,
    "explanation": "Canary rollouts expose a tiny proportion of production requests to new policy rules, catching regressions or performance degradation with minimal user impact.",
    "citation": "Site Reliability Engineering (SRE) Handbook: Canary Rollouts",
    "tags": [
      "Canary",
      "Deployment",
      "Zero Downtime"
    ]
  },
  {
    "id": "repo_i_07",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How does GitOps (e.g., ArgoCD or Flux) automate infrastructure synchronization against a Git repository?",
    "options": [
      "By mailing automated nightly configuration diff summaries to infrastructure engineers whenever live cluster state drifts from expected manifests",
      "GitOps workflows still require operators to log into production nodes via SSH and type declarative kubectl apply commands manually",
      "By running an automated agent in the cluster that continuously compares desired state in Git with live cluster state, automatically reconciling any drift",
      "GitOps requires operators to log into production nodes via SSH and type declarative kubectl apply commands manually"
    ],
    "correctIndex": 2,
    "explanation": "GitOps uses Git as the single source of truth: software agents reconcile live cluster infrastructure to match Git declarations, eliminating manual cluster drift.",
    "citation": "GitOps Principles & Practices (OpenGitOps Standard)",
    "tags": [
      "GitOps",
      "ArgoCD",
      "Reconciliation"
    ]
  },
  {
    "id": "repo_i_08",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What encryption standards are mandated for health data at rest and in transit across secure research enclaves?",
    "options": [
      "Legacy ROT13 obfuscation for internal microservice REST APIs combined with unencrypted plaintext volumes behind perimeter trust VPNs",
      "Data-at-rest volume encryption remains optional inside physical hospital data centers protected by 24/7 uniformed security guards",
      "Transport and storage encryption remain optional inside physical hospital facilities protected by 24/7 guards",
      "AES-256 (or XChaCha20-Poly1305) encryption at rest, and TLS 1.3 (with strong cipher suites and perfect forward secrecy) in transit"
    ],
    "correctIndex": 3,
    "explanation": "NHS DSPT Standard 1.5 and SATRE require robust cryptographic baselines: minimum AES-256 for persistent volumes and modern TLS 1.3 for all network communications.",
    "citation": "NHS Data Security and Protection Toolkit (DSPT) Standard 1.5 & SATRE v1.1",
    "tags": [
      "Encryption",
      "AES-256",
      "TLS 1.3"
    ]
  },
  {
    "id": "repo_i_09",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How does an immutable WORM (Write-Once-Read-Many) storage bucket prevent log tampering by insider threats?",
    "options": [
      "By enforcing object retention policies and compliance locks at the storage hardware/API level, preventing objects from being overwritten or deleted even by root administrators",
      "By securing physical enclave server room perimeter doors with dual-custody mechanical deadbolts, keypad PINs, and biometric palm vein scanners",
      "By configuring automated nightly retention scripts that purge historical security audit logs every 24 hours to conserve storage space",
      "By transcoding structured JSON audit records into compressed monotonic audio streams archived on cold tape"
    ],
    "correctIndex": 0,
    "explanation": "WORM storage policies prevent deletion or modification of audit logs for a mandated retention period (e.g., 7–25 years), ensuring forensic integrity.",
    "citation": "Cloud Storage Object Retention & Compliance Lock Standards",
    "tags": [
      "WORM",
      "Immutability",
      "Audit Retention"
    ]
  },
  {
    "id": "repo_i_10",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is 'ephemeral analytical compute' and how does it reduce data leakage risks in research enclaves?",
    "options": [
      "High-memory bare-metal compute nodes requiring up to three days of thermal pre-warming and hardware burn-in before interactive user sessions launch",
      "Disposable virtual machines or containers provisioned on demand for a single research session and completely destroyed upon session termination, preventing persistent data remnants",
      "Stateless browser terminals strictly prohibited from writing any temporary variables, outputs, or diagnostic plots to workspace storage",
      "Stateless browser terminals prohibited from writing any temporary variables, outputs, or plots to local storage"
    ],
    "correctIndex": 1,
    "explanation": "Ephemeral environments ensure that user workspace state, temporary cache files, and intermediate scripts are wiped clean at logout, preventing cross-project data leakage.",
    "citation": "SATRE v1.1 Pillar 2: Ephemeral Workspaces & Compute Lifecycles",
    "tags": [
      "Ephemeral Compute",
      "Workspaces",
      "Security"
    ]
  },
  {
    "id": "repo_i_11",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How do dynamic package ingestion gates review and approve new open-source Python or R libraries requested by researchers?",
    "options": [
      "By requiring upstream open-source library maintainers to attend a mandatory on-site clinical information governance induction briefing",
      "By permanently banning every third-party open-source statistical package in favor of custom internally authored C and Fortran computational routines",
      "By running automated vulnerability scanning (CVEs), malware detection, license compliance checks, and human security committee review before mirroring to internal repositories",
      "By permanently banning every third-party open-source statistical package in favor of custom in-house C code"
    ],
    "correctIndex": 2,
    "explanation": "Ingestion gates automatically scan requested packages for vulnerabilities, malicious scripts, and restrictive licenses before syncing them to the air-gapped mirror.",
    "citation": "Playbook Section 3 (Air-Gapped Package Mirror & Ingestion Gate)",
    "tags": [
      "Package Ingestion",
      "Vulnerability Scanning",
      "Supply Chain"
    ]
  },
  {
    "id": "repo_i_12",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is 'point-in-time recovery' (PITR) for health data metadata repositories?",
    "options": [
      "Archiving physical paper printouts of relational database schema diagrams chronologically inside fireproof off-site corporate storage",
      "Replaying entire analytical SQL query histories deterministically from volatile RAM transaction logs following unexpected server hardware reboots",
      "Scheduling a single offline annual cold storage snapshot of the metadata catalog at fiscal year close",
      "The ability to restore a database to its exact state at any specific microsecond in the past, leveraging continuous write-ahead logging (WAL) and base backups"
    ],
    "correctIndex": 3,
    "explanation": "PITR allows database administrators to roll back accidental corruptions or malicious modifications to the exact second prior to the incident.",
    "citation": "PostgreSQL High Availability & Continuous Archiving Documentation",
    "tags": [
      "PITR",
      "Backup",
      "Disaster Recovery"
    ]
  },
  {
    "id": "repo_i_13",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How does Role-Based Access Control (RBAC) synchronization integrate enterprise Identity Providers (IdP) with Git and enclave access tiers?",
    "options": [
      "By mapping SAML 2.0 or OIDC group claims (e.g., 'accredited_clinical_investigator') dynamically to enclave role permissions and Git repository write access",
      "Requiring accredited investigators to register distinct local usernames and passwords separately for Git, JupyterLab, and the airlock",
      "Requiring departmental clinical managers to verify caller identities verbally via telephone before provisioning Git governance repository write access",
      "Enterprise SAML/OIDC identity providers cannot integrate with Git access control and require manual SSH keys"
    ],
    "correctIndex": 0,
    "explanation": "Federated identity (SAML/OIDC) enables centralized user lifecycle management: when an investigator leaves an institution, access is revoked across all enclaves and Git repos instantaneously.",
    "citation": "Enterprise Identity Federation (SAML 2.0 & OIDC) in Healthcare",
    "tags": [
      "IdP",
      "OIDC",
      "SAML",
      "RBAC"
    ]
  },
  {
    "id": "repo_i_14",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "What is an 'egress proxy' and how does it enforce domain allowlists in semi-isolated research environments?",
    "options": [
      "A physical security compliance notice mounted outside enclave server rooms warning staff against unauthorized removable USB storage media usage",
      "A forward proxy server (e.g., Squid, Envoy) configured with strict domain name allowlists that inspects outbound HTTP/TLS SNI headers, dropping any connections to unapproved domains",
      "A transparent caching web accelerator appliance engineered to prefetch and compress external academic medical journal PDFs locally",
      "An outbound SMTP relay server responsible for dispatching automated research digest newsletters to investigators"
    ],
    "correctIndex": 1,
    "explanation": "Egress proxies inspect outbound network requests, blocking any attempt to connect to external servers not explicitly pre-approved on an organizational allowlist.",
    "citation": "Forward Proxies & Network Security Monitoring in Research Enclaves",
    "tags": [
      "Egress Proxy",
      "Allowlist",
      "SNI Inspection"
    ]
  },
  {
    "id": "repo_i_15",
    "category": "Repository & Architecture",
    "difficulty": "Intermediate",
    "question": "How does automated vulnerability scanning (e.g., Trivy, Grype) integrate into container build pipelines?",
    "options": [
      "Performing scheduled physical vacuum cleaning and particulate thermal dust inspection across hospital data center server chassis racks",
      "Container image layer CVE vulnerability auditing can only be executed manually by external penetration testers before annual DSPT reviews",
      "By scanning container layers during CI builds against public vulnerability databases (NVD), failing the build if high or critical CVEs are detected",
      "Container layer CVE auditing can only be executed manually by penetration testers prior to annual audits"
    ],
    "correctIndex": 2,
    "explanation": "Automated vulnerability scanners inspect container layers and installed packages against national CVE databases, blocking vulnerable container images from deployment.",
    "citation": "Container Image Vulnerability Scanning in DevSecOps",
    "tags": [
      "Trivy",
      "CVE",
      "DevSecOps"
    ]
  },
  {
    "id": "repo_a_01",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What are the four non-breaking stages of the policy rollout lifecycle defined in the Wavebound implementation playbook?",
    "options": [
      "Alpha Developer Sandbox -> Closed Beta Clinical Testing -> Release Candidate Code Freeze -> General Availability Production Rollout",
      "Initial Design Specification -> Prototype Sandbox Development -> Production Rollback Discard -> Quarterly Governance Iteration Lifecycle",
      "Manual Committee Review, Executive Board Sign-Off, Public Press Briefing, and Five-Year Cold Archive",
      "Stage 1: Evaluate-Only (Local Testing) -> Stage 2: Shadow Mode (Non-Blocking Audit) -> Stage 3: Canary Mode (Fractional Enforcement) -> Stage 4: Active Enforcement (Strict Gating)"
    ],
    "correctIndex": 3,
    "explanation": "The 4-stage lifecycle ensures zero operational disruption: policies are evaluated against live telemetry without blocking before gradual canary rollout and final enforcement.",
    "citation": "Playbook Section 3 & Implementation Track (4-Stage Rollout)",
    "tags": [
      "Rollout Stages",
      "Canary",
      "Zero Downtime"
    ]
  },
  {
    "id": "repo_a_02",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does eBPF (Extended Berkeley Packet Filter) provide low-overhead kernel-level observability across analytical compute nodes?",
    "options": [
      "By compiling C code into Linux kernel bytecode executed on safe in-kernel virtual machines, hooking system calls and socket events without user-space context switches",
      "By persisting raw kernel syscall ring buffers directly onto removable archival optical media disks for offline forensic incident response triage",
      "By embedding an interactive administrative kernel diagnostics web server directly inside privileged Linux kernel address space",
      "Extended Berkeley Packet Filter telemetry hooks operate exclusively on proprietary mobile operating systems"
    ],
    "correctIndex": 0,
    "explanation": "eBPF hooks kernel tracepoints and network sockets directly, enabling real-time monitoring of file access, network connections, and process launches with sub-1% CPU overhead.",
    "citation": "Gregg (BPF Performance Tools, Addison-Wesley 2019)",
    "tags": [
      "eBPF",
      "Kernel Observability",
      "Performance"
    ]
  },
  {
    "id": "repo_a_03",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What is SLSA (Supply-chain Levels for Software Artifacts) Level 3 and how is it achieved in governance pipeline builds?",
    "options": [
      "A tiered enterprise software licensing framework governing commercial royalty payments and attribution terms for clinical diagnostic algorithms",
      "A security framework requiring hermetic, isolated build environments, parameterless build triggers, and non-falsifiable cryptographic provenance attestations",
      "A physical facility engineering specification standardizing seismic rack bracing and hot-aisle airflow clearance for hospital servers",
      "A software developer productivity metric counting net validated lines of code merged per sprint cycle"
    ],
    "correctIndex": 1,
    "explanation": "SLSA Level 3 guarantees build integrity: builds run in isolated, ephemeral environments that generate cryptographically verifiable attestations of all source inputs and dependencies.",
    "citation": "Supply-chain Levels for Software Artifacts (SLSA v1.0 Specification)",
    "tags": [
      "SLSA",
      "Supply Chain",
      "Build Integrity"
    ]
  },
  {
    "id": "repo_a_04",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does Hardware Security Module (HSM) integration protect master signing keys in health data platforms?",
    "options": [
      "By housing standard software private keystores inside physically temperature-regulated and humidity-monitored Trust server rooms",
      "Hardware Security Modules are lightweight virtualized software key-caching daemons downloaded from public open-source Linux package repositories",
      "By storing cryptographic private keys within tamper-resistant, certified physical cryptographic hardware (FIPS 140-2 Level 3/4), ensuring keys can never be extracted in plaintext",
      "Hardware Security Modules are lightweight virtualized software daemons downloaded from public package registries"
    ],
    "correctIndex": 2,
    "explanation": "HSMs generate and store cryptographic keys in physical silicon; cryptographic operations occur on-chip, preventing key extraction even if operating system root is compromised.",
    "citation": "NIST FIPS 140-2 / FIPS 140-3 Security Requirements for Cryptographic Modules",
    "tags": [
      "HSM",
      "FIPS 140-2",
      "Key Management"
    ]
  },
  {
    "id": "repo_a_05",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What is Chaos Engineering in the context of health research enclave resilience?",
    "options": [
      "Physically disconnecting primary mains power and fiber uplinks unpredictably inside live hospital clinical data centers without advance notice",
      "Temporarily granting unaccredited external guest accounts elevated administrative privileges to verify whether intrusion alerts fire",
      "Committing deliberately broken syntax changes straight to protected main branches to test CI parser resilience",
      "Intentionally injecting synthetic failures (e.g., simulating proxy crashes, network partitions, or storage outages) to verify that the platform fails-closed and maintains data integrity"
    ],
    "correctIndex": 3,
    "explanation": "Chaos engineering validates security invariants under failure: it verifies that when services fail, authorization proxies fail-closed rather than accidentally permitting open data egress.",
    "citation": "Principles of Chaos Engineering & Fail-Closed Validation",
    "tags": [
      "Chaos Engineering",
      "Fail-Closed",
      "Resilience"
    ]
  },
  {
    "id": "repo_a_06",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does formal verification of Calico or Cilium network policies prove the mathematical absence of outbound egress paths?",
    "options": [
      "By translating network policy rules and CIDR tables into Satisfiability Modulo Theories (SMT) formulas and proving that no network path exists from enclave pods to external internet IPs",
      "By executing a single manual curl outbound connectivity probe from an administrative jump host toward an external search engine IP",
      "Kubernetes CNI network policies operate over dynamic ephemeral pod IP addresses and cannot be mathematically verified using formal logic theorem provers",
      "Kubernetes CNI network policies operate over dynamic IPs and cannot be mathematically verified via formal logic"
    ],
    "correctIndex": 0,
    "explanation": "Formal network verification models routing graphs in SMT solvers, providing mathematical proof that all possible egress packet paths terminate in drop rules.",
    "citation": "Formal Verification of Software-Defined Network Policies (SIGCOMM)",
    "tags": [
      "Formal Verification",
      "SMT",
      "Network Policies"
    ]
  },
  {
    "id": "repo_a_07",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does distributed erasure coding (e.g., MinIO or Ceph) guarantee both durability and confidentiality in air-gapped storage clusters?",
    "options": [
      "By replicating ten unencrypted redundant backup copies of every Parquet clinical cohort across geographically distributed public cloud object tiers",
      "By splitting data objects into N data blocks and M parity blocks distributed across failure domains; files can be recovered from any N blocks, with cryptographic encryption per chunk",
      "By archiving inactive research project workspace snapshots inside password-protected multi-volume ZIP archives stored on local disks",
      "Erasure coding achieves storage efficiency by permanently pruning older historical patient episodes automatically"
    ],
    "correctIndex": 1,
    "explanation": "Erasure coding provides high durability against multi-disk hardware failures without replication overhead, combined with chunk-level envelope encryption.",
    "citation": "Ceph & MinIO Distributed Storage Architecture: Erasure Coding",
    "tags": [
      "Erasure Coding",
      "Storage",
      "High Availability"
    ]
  },
  {
    "id": "repo_a_08",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What is an append-only Merkle tree ledger and how does it guarantee tamper-evidence for governance decisions?",
    "options": [
      "A hierarchical organizational governance approval chart tracing study sign-offs from junior data analysts up to the Caldicott Guardian",
      "A rotating relational audit table that systematically overwrites historical governance event records following each monthly airlock export cycle",
      "A cryptographic data structure where every leaf node contains a hash of a governance event and parent nodes contain hashes of children; any tampering changes the Merkle root hash",
      "A shared institutional intranet spreadsheet tracking policy approvals using chronological row numbering"
    ],
    "correctIndex": 2,
    "explanation": "Merkle tree ledgers (used in Certificate Transparency and Rekor) allow instant cryptographic proof of event inclusion and guarantee that past history cannot be rewritten without altering the root hash.",
    "citation": "Merkle (A Digital Signature Based on a Conventional Encryption Function, 1987)",
    "tags": [
      "Merkle Tree",
      "Tamper-Evidence",
      "Auditability"
    ]
  },
  {
    "id": "repo_a_09",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does cross-plane synchronization bridge air-gapped secure analytical zones with central corporate governance registries?",
    "options": [
      "By routing an unmonitored physical Cat6 Ethernet patch cable directly through an air-gapped server room perimeter firewall bulkhead",
      "Strict air-gapped secure analytical zones can never import updated clinical metadata catalogs or policy bundles once initially commissioned online",
      "Strict air-gapped secure zones can never import updated metadata or policy bundles once initially commissioned",
      "By using one-way cryptographic data diodes or scheduled, digitally signed batch sync bundles that pass through automated scanning and quarantine validation gates"
    ],
    "correctIndex": 3,
    "explanation": "Air-gapped enclaves import governance updates via validated, signed batch bundles across controlled transfer gateways, maintaining perimeter isolation.",
    "citation": "Cross-Domain Solutions & Secure Data Transfer in Air-Gapped Networks",
    "tags": [
      "Data Diode",
      "Cross-Domain",
      "Air-Gap Sync"
    ]
  },
  {
    "id": "repo_a_10",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What Linux kernel hardening measures (e.g., SELinux, AppArmor, seccomp) protect analytical compute nodes from container breakouts?",
    "options": [
      "Enforcing Mandatory Access Control (MAC) policies, disabling unprivileged user namespaces, and restricting available system calls via strict seccomp profiles",
      "Dimming remote virtual desktop display contrast and disabling browser clipboard paste shortcuts across interactive VDI sessions",
      "Configuring passwordless sudo root escalation inside researcher containers so analysts can install custom OS statistical packages independently",
      "Permitting unverified graphical utility packages inside analytical containers to simplify user onboarding"
    ],
    "correctIndex": 0,
    "explanation": "Kernel hardening enforces least-privilege syscall boundaries: seccomp blocks dangerous syscalls (ptrace, unshare), preventing malicious workloads from escaping container sandboxes.",
    "citation": "Linux Kernel Security: SELinux, AppArmor, and Seccomp Containment",
    "tags": [
      "SELinux",
      "Seccomp",
      "Container Hardening"
    ]
  },
  {
    "id": "repo_a_11",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What is 'fuzz testing' in automated policy regression testing?",
    "options": [
      "Applying physical electromagnetic RF shielding blankets around enclave server chassis during annual TEMPEST compliance testing",
      "Generating millions of randomized, boundary-pushing, or malformed input payloads to bombard policy evaluation gates, testing for crashes, memory leaks, or unexpected access grants",
      "Deliberately introducing typographical syntax errors into production Rego rule identifiers to evaluate compiler parser error recovery diagnostics",
      "Deliberately introducing typographical spelling errors into Rego rule identifiers to evaluate parser recovery"
    ],
    "correctIndex": 1,
    "explanation": "Fuzzing systematically feeds unpredictable inputs into OPA and SHACL parsers, exposing edge-case crashes, infinite loops, or authorization bypasses before deployment.",
    "citation": "Automated Fuzz Testing for Security Policy Enforcement Gates",
    "tags": [
      "Fuzzing",
      "Regression Testing",
      "Security"
    ]
  },
  {
    "id": "repo_a_12",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What is a 'Zero-Knowledge Enclave Architecture' regarding cloud service provider operators?",
    "options": [
      "An operational staffing model where public cloud infrastructure technicians receive zero domain-specific NHS IG compliance training",
      "A physically disconnected terminal workstation architecture deployed completely without interactive keyboards, mice, or external peripheral buses",
      "An architecture utilizing Confidential Computing (AMD SEV-SNP, Intel SGX/TDX) where data is encrypted in memory, preventing cloud host hypervisors or rogue technicians from inspecting microdata",
      "A passwordless authentication model relying entirely on unencrypted biometric tokens stored in cloud metadata"
    ],
    "correctIndex": 2,
    "explanation": "Confidential computing uses hardware-encrypted memory enclaves; even cloud administrators with physical access to server hardware cannot read data in RAM.",
    "citation": "Confidential Computing Consortium: Hardware-Based Memory Encryption",
    "tags": [
      "Confidential Computing",
      "Intel SGX",
      "AMD SEV"
    ]
  },
  {
    "id": "repo_a_13",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "What standard defines digital preservation requirements (OAIS: Open Archival Information System) for archiving health research audit dossiers for 25+ years?",
    "options": [
      "ISO 9001",
      "HTML 5.0",
      "IEEE 802.11",
      "ISO 14721:2012 (OAIS Reference Model)"
    ],
    "correctIndex": 3,
    "explanation": "ISO 14721 (OAIS) provides the international standard for long-term digital preservation of research dossiers, data packages, and cryptographic audit proofs.",
    "citation": "ISO 14721:2012 Space Data and Information Transfer Systems — Open Archival Information System (OAIS)",
    "tags": [
      "OAIS",
      "Digital Preservation",
      "ISO 14721"
    ]
  },
  {
    "id": "repo_a_14",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does distributed tracing with W3C TraceContext propagate correlation IDs across analytical microservices and policy gates?",
    "options": [
      "By passing standardized 'traceparent' and 'tracestate' HTTP headers across all service hops, enabling end-to-end reconstruction of distributed request execution paths",
      "By enclosing signed physical paper audit routing slips alongside encrypted portable drive couriers transferred physically between hospital sites",
      "Standard HTTP ingress proxy gateways automatically strip incoming distributed tracing headers by default for perimeter minimization",
      "Standard HTTP proxy gateways strip incoming distributed tracing headers by default for perimeter minimization"
    ],
    "correctIndex": 0,
    "explanation": "W3C TraceContext defines universal headers that link microservice calls into a single distributed trace, allowing performance and security analysis of the entire request lifecycle.",
    "citation": "W3C TraceContext Recommendation & Distributed Tracing",
    "tags": [
      "TraceContext",
      "OpenTelemetry",
      "Distributed Tracing"
    ]
  },
  {
    "id": "repo_a_15",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "How does automated disaster recovery testing validate Point-in-Time Recovery (PITR) in compliance-critical platforms?",
    "options": [
      "By executing unannounced live power-off failover drills directly on active production clinical databases during peak hospital outpatient clinic hours",
      "By running automated CI jobs that periodically restore database snapshots to an isolated sandbox, execute integrity assertion test suites, and measure Recovery Time and Point Objectives (RTO/RPO)",
      "Immutable PITR write-ahead logging is cryptographically self-verifying by design and eliminates the need for periodic restore testing",
      "Immutable PITR write-ahead logging is self-verifying by design and does not require periodic restore testing"
    ],
    "correctIndex": 1,
    "explanation": "Automated DR tests regularly restore backups in ephemeral sandboxes and verify data integrity, proving that backups are restorable without waiting for a real crisis.",
    "citation": "Disaster Recovery Validation & Automated Resilience Testing in Healthcare",
    "tags": [
      "Disaster Recovery",
      "PITR",
      "RTO/RPO"
    ]
  },
  {
    "id": "fsg_f_16",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "How does publishing plain-English Data Use Registers and generated governance charters (GOVERNANCE_CHARTER.md) support Freedom of Information Act 2000 (FOIA) compliance in a Trusted Research Environment?",
    "options": [
      "It exempts the hosting Trust from maintaining immutable audit logs, conducting Data Protection Impact Assessments, or securing Information Asset Owner sign-off for internal observational studies",
      "It authorizes automated public disclosure of de-identified individual-level patient records whenever external FOIA requesters submit validated institutional email applications within 20 working days of request",
      "It fulfils FOIA Section 19 proactive publication duties and aligns with Caldicott Principle 8 by making approved study purposes, safeguards, and SDC thresholds routinely accessible without ad-hoc manual delays",
      "It substitutes for UK GDPR Article 6 and Article 9 lawful bases so public bodies can process health data without statutory gateways"
    ],
    "correctIndex": 2,
    "explanation": "Under FOIA Section 19 and Caldicott Principle 8 ('no surprises'), proactively publishing governance charters, active disclosure rules, and approved study registers satisfies public transparency duties efficiently and reduces repetitive administrative FOI burdens.",
    "citation": "Freedom of Information Act 2000 Section 19 & Caldicott Principle 8 (NDG)",
    "tags": [
      "FOI",
      "Freedom of Information",
      "Caldicott 8",
      "Publication Scheme"
    ]
  },
  {
    "id": "fsg_i_16",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "A public authority hosting a health data enclave receives a Freedom of Information (FOI) request for pseudonymised patient-level microdata and unpublished draft study tables scheduled for peer-reviewed journal submission. Which combination of FOIA exemptions is primarily engaged?",
    "options": [
      "FOIA Section 12 cost-of-compliance limit alone, because federated enclave SQL warehouses cannot legally be queried or extracted by public sector FOIA officers for external applicants",
      "FOIA Section 30 criminal investigation exemption exclusively, since pseudonymised research linkage keys automatically fall outside UK GDPR personal data protections and confidentiality duties",
      "No statutory exemptions apply under FOIA, requiring the authority to disclose unaggregated enclave microdata within 20 working days",
      "FOIA Section 40(2) (personal data where disclosure would contravene UK GDPR), Section 41 (information provided in confidence), and Section 22 / 22A (pre-publication research data)"
    ],
    "correctIndex": 3,
    "explanation": "Individual health records inside an enclave remain personal confidential data for third parties: FOIA Section 40(2) prevents unlawful UK GDPR disclosure, Section 41 upholds the Common Law Duty of Confidentiality, and Section 22/22A protects incomplete or scheduled academic research outputs prior to planned publication.",
    "citation": "Freedom of Information Act 2000 Sections 22, 22A, 40(2) & 41; ICO FOIA Health Data Guidance",
    "tags": [
      "FOI",
      "Freedom of Information",
      "Section 40(2)",
      "Section 41",
      "Section 22A"
    ]
  },
  {
    "id": "sdc_a_16",
    "category": "Quantitative SDC & Airlock",
    "difficulty": "Advanced",
    "question": "When an external requester files a Freedom of Information (FOI) request asking for a slightly modified regional age-band breakdown of an already published airlock table, why must the FOI officer run an SDC differencing check against all prior airlock and FOI releases?",
    "options": [
      "Because FOIA disclosures are effectively releases 'to the world at large', overlapping breakdowns can enable subtraction (mosaic/differencing) attacks that reveal suppressed k < 10 small cells, rendering the output personal data under FOIA s40(2) and UK GDPR Recital 26",
      "Freedom of Information public disclosures are exempt from UK GDPR anonymisation and disclosure checks whenever requested aggregate row totals exceed 2, because statutory transparency duties override common law confidentiality for statistical counts",
      "The FOIA officer runs the differencing check exclusively to verify that the external requester holds an active ONS Accredited Researcher certificate and signed Institutional DAA before releasing unaggregated regional age breakdowns",
      "Because FOIA statutory rules prohibit public authorities from releasing statistics containing decimal points"
    ],
    "correctIndex": 0,
    "explanation": "A disclosure under FOIA is considered public to the entire world. If a newly requested tabulation overlaps slightly with prior airlock releases, subtracting the two totals can isolate a single individual or small cell (<10), engaging FOIA Section 40(2) / UK GDPR Recital 26 'means reasonably likely to be used' re-identification limits.",
    "citation": "ICO Anonymisation Guidance, UK GDPR Recital 26 & ONS SDC Handbook (FOIA Public Release Standard)",
    "tags": [
      "FOI",
      "Freedom of Information",
      "Differencing Attack",
      "SDC",
      "Recital 26"
    ]
  },
  {
    "id": "iso_f_01",
    "category": "Five Safes & Governance",
    "difficulty": "Foundation",
    "question": "How does ISO/IEC 27001:2022 organize its 93 Annex A security controls compared with the retired 2013 edition?",
    "options": [
      "It consolidates all security requirements into a single mandatory cloud infrastructure appendix focused exclusively on AES-256 disk encryption and perimeter firewalls",
      "It groups controls into four clear themes—Organizational (A.5), People (A.6), Physical (A.7), and Technological (A.8)—replacing the 14 legacy 2013 domains",
      "It eliminates non-technical organizational and personnel safeguards so accredited healthcare enclaves only verify automated Kubernetes network policies",
      "It separates mandatory UK statutory legislation under Section 251 from NHS Clinical Safety DCB0129 hazard logs across two parallel certification audits"
    ],
    "correctIndex": 1,
    "explanation": "ISO/IEC 27001:2022 reorganized the 114 controls across 14 domains from the 2013 revision into 93 controls across 4 intuitive themes: Organizational (A.5), People (A.6), Physical (A.7), and Technological (A.8).",
    "citation": "ISO/IEC 27001:2022 Annex A (Themes A.5–A.8)",
    "tags": [
      "ISO 27001:2022",
      "Annex A",
      "ISMS",
      "Governance"
    ]
  },
  {
    "id": "iso_i_01",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "What is the specific statutory role of an ISO/IEC 27001:2022 Information Security Management System (ISMS) Statement of Applicability (Clause 6.1.3(d)) in a UKSA DEA 2017 Accredited Processing Environment?",
    "options": [
      "It grants public authorities an automatic exemption from UK GDPR Articles 6 and 9 when sharing unlinked hospital records without Research Accreditation Panel approval",
      "It replaces independent penetration testing and NHS DSPT assertions by allowing engineering teams to self-certify container images without risk assessments",
      "It formally documents which Annex A.5–A.8 controls are included or excluded with justification, supporting continuous ISMS compliance required for Section 71 DEA TRE accreditation",
      "It authorizes researchers accredited outside the United Kingdom to download pseudonymised clinical cohorts onto encrypted institutional laptops for offline regression modeling"
    ],
    "correctIndex": 2,
    "explanation": "Under ISO/IEC 27001:2022 Clause 6.1.3(d), the Statement of Applicability (SoA) justifies inclusion or exclusion of every Annex A control against risk treatment decisions, forming core audit evidence for mandatory ISO 27001 certification under DEA 2017 Section 71.",
    "citation": "ISO/IEC 27001:2022 Clause 6.1.3(d) & DEA 2017 Part 5 Chapter 5 (Sections 70–71)",
    "tags": [
      "Statement of Applicability",
      "SoA",
      "ISMS",
      "DEA 2017",
      "UKSA"
    ]
  },
  {
    "id": "iso_i_02",
    "category": "Five Safes & Governance",
    "difficulty": "Intermediate",
    "question": "Which combination of ISO/IEC 27001:2022 controls replaces the retired 2013 citations (A.10 Cryptography, A.12.1.2 Change Management, and A.13.1 Network Security) in a zero-egress enclave?",
    "options": [
      "Annex A.5.1 (Policies for information security), Annex A.6.3 (Security awareness training), and Annex A.7.4 (Physical security monitoring across sovereign data centers)",
      "Annex A.8.1 (User endpoint devices), Annex A.8.10 (Information deletion routines), and Annex A.8.19 (Installation of software on operational production systems)",
      "Annex A.5.15 (Access control lifecycle), Annex A.6.6 (Confidentiality or non-disclosure agreements), and Annex A.7.11 (Supporting utilities and power continuity)",
      "Annex A.8.24 (Use of cryptography), Annex A.8.32 (Change management), and Annex A.8.20–A.8.22 (Network security, services security, and segregation)"
    ],
    "correctIndex": 3,
    "explanation": "In ISO/IEC 27001:2022, Cryptography moved from A.10 to A.8.24, Change Management moved from A.12.1.2 to A.8.32, and Network Security/Segregation moved from A.13.1 to A.8.20–A.8.22.",
    "citation": "ISO/IEC 27001:2022 Annex A Correlation Matrix (A.8.20–A.8.22, A.8.24, A.8.32)",
    "tags": [
      "ISO 27001:2022",
      "Annex A.8.24",
      "Annex A.8.32",
      "Annex A.8.20"
    ]
  },
  {
    "id": "iso_a_01",
    "category": "OPA Rego & Enforcement",
    "difficulty": "Advanced",
    "question": "How does a Policy-as-Code Trusted Research Environment satisfy ISO/IEC 27001:2022 Clause 9 (Performance Evaluation & Internal Audit) alongside Annex A.8.15 (Logging) and A.8.16 (Monitoring)?",
    "options": [
      "By executing automated PySHACL regression tests in CI and emitting tamper-evident W3C PROV-O policy decision triples to immutable WORM SIEM storage on every admission and export",
      "By exporting all database query audit logs as unhashed CSV spreadsheets to external public cloud drives for quarterly manual inspection by academic supervisors",
      "By disabling Kubernetes validating admission webhooks during peak analytical bursts so unlogged container sessions can bypass policy evaluation without latency spikes",
      "By deleting researcher session lineage graphs every 24 hours to minimize persistent cloud object storage footprint and satisfy NHS DSPT data minimization assertions"
    ],
    "correctIndex": 0,
    "explanation": "Continuous automated PySHACL verification and immutable W3C PROV-O telemetry stored in WORM SIEM archives provide verifiable, non-repudiable evidence for ISMS Clause 9 performance evaluation as well as Annex A.8.15 logging and A.8.16 monitoring.",
    "citation": "ISO/IEC 27001:2022 Clauses 9–10, Annex A.8.15–A.8.16 & W3C PROV-O",
    "tags": [
      "ISO 27001:2022",
      "ISMS Clause 9",
      "PROV-O",
      "WORM",
      "Audit"
    ]
  },
  {
    "id": "iso_f_02",
    "category": "Repository & Architecture",
    "difficulty": "Foundation",
    "question": "Under ISO/IEC 27001:2022 Annex A.6 (People Controls), how are personnel screening (A.6.1), recurring training (A.6.3), and confidentiality undertakings (A.6.6) enforced at TRE workspace admission?",
    "options": [
      "They are treated strictly as post-incident legal remedies audited manually only after a suspected re-identification breach or improper data export occurs",
      "They are encoded as closed-world Safe Person SHACL and OPA Rego checks requiring verified vetting, unexpired annual IG training, and active DEA/DAA undertakings prior to token issuance",
      "They are delegated automatically to autonomous AI coding agents acting as institutional Safe People without requiring an accredited human sponsor",
      "They apply exclusively to external cloud datacenter hardware technicians and exclude university researchers analyzing Tier 2 pseudonymised cohorts"
    ],
    "correctIndex": 1,
    "explanation": "ISO/IEC 27001:2022 Annex A.6 controls reinforce Five Safes 'Safe People': SHACL and Rego admission shapes fail-closed unless researcher vetting, unexpired IG training, and confidentiality undertakings are verified.",
    "citation": "ISO/IEC 27001:2022 Annex A.6.1, A.6.3 & A.6.6; DEA 2017 Accredited Researcher Criteria",
    "tags": [
      "ISO 27001:2022",
      "Annex A.6",
      "Safe People",
      "SHACL"
    ]
  },
  {
    "id": "iso_a_02",
    "category": "Repository & Architecture",
    "difficulty": "Advanced",
    "question": "Which complementary international standard extends an ISO/IEC 27001:2022 ISMS into a Privacy Information Management System (PIMS) to formalize UK GDPR Data Controller and Data Processor obligations inside a TRE?",
    "options": [
      "ISO/IEC 14721:2012 (OAIS Reference Model), which defines 25-year tape archival formatting exclusively for astrophysical telemetry",
      "ISO 13485:2016 (Medical Devices QMS), which governs surgical hardware sterilization rather than PII controller-processor accountability",
      "ISO/IEC 27701:2019 (PIMS), which extends ISO/IEC 27001 ISMS controls with explicit privacy governance requirements for PII controllers and processors",
      "W3C CSV on the Web (CSVW), which serves solely as an advisory UK Data Standards Authority format for describing comma-separated column schemas"
    ],
    "correctIndex": 2,
    "explanation": "ISO/IEC 27701:2019 builds directly upon ISO/IEC 27001 ISMS and ISO/IEC 27002 controls to establish a Privacy Information Management System (PIMS) detailing PII controller and processor responsibilities aligned with UK GDPR.",
    "citation": "ISO/IEC 27701:2019 (PIMS) & UK GDPR Articles 24–28",
    "tags": [
      "ISO 27701",
      "PIMS",
      "ISO 27001",
      "UK GDPR"
    ]
  }
];
