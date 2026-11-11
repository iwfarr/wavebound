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
      "Safe Setting",
      "Safe Person",
      "Safe Project",
      "Safe Data"
    ],
    "correctIndex": 1,
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
      "Justify the purpose(s) for using or transferring confidential information",
      "The duty to share can be as important as the duty to protect patient confidentiality",
      "Inform patients and service users about how their confidential information is used",
      "Use the minimum necessary confidential information"
    ],
    "correctIndex": 0,
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
      "Mandate weekly cryptographic password rotations for all database users",
      "Inform patients and the public about how their confidential data is used and shared",
      "Require machine learning models to be retrained on synthetic data",
      "Enforce zero physical contact between clinical researchers and server racks"
    ],
    "correctIndex": 1,
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
      "Consumer Rights Act 2015 Section 42",
      "NHS Act 2006 Section 251 (administered by the Confidentiality Advisory Group)",
      "Freedom of Information Act 2000 Section 12",
      "Police and Criminal Evidence Act 1984 Section 61"
    ],
    "correctIndex": 1,
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
      "Article 6(1)(a) explicit consent and Article 9(2)(a) explicit consent only",
      "Article 6(1)(e) public task and Article 9(2)(j) scientific research / public interest archiving",
      "Article 6(1)(b) contractual necessity and Article 9(2)(b) employment law",
      "Article 6(1)(f) legitimate interests and Article 9(2)(f) legal defence"
    ],
    "correctIndex": 1,
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
      "A physical library with quiet study booths and locked filing cabinets",
      "A secure environment (such as an air-gapped enclave or TRE) preventing unauthorized egress or data extraction",
      "A shared cloud drive with open read-write permissions for collaborating universities",
      "A high-speed public FTP server with daily backups"
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
      "Opt out of direct clinical treatment by their general practitioner",
      "Opt out of having their confidential patient data used for research and planning purposes",
      "Prevent their NHS number from being used on internal hospital wristbands",
      "Delete their historic electronic health record from local GP surgeries"
    ],
    "correctIndex": 1,
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
      "To replace formal legal data protection impact assessments with informal community votes",
      "To incorporate lived experience, review lay data flows, test public benefit, and build public trust",
      "To provide volunteer developers for writing production SQL code",
      "To eliminate the requirement for institutional ethics committee review"
    ],
    "correctIndex": 1,
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
      "The project must be completed within 30 days without software bugs",
      "The research design must have documented public benefit, legal clearance, and ethical approval",
      "The project must use exclusively commercial proprietary software",
      "The project must be sponsored by an international venture capital firm"
    ],
    "correctIndex": 1,
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
      "There is no distinction; they are two titles for the exact same statutory role",
      "The Caldicott Guardian champions ethical confidentiality of patient data; the DPO oversees statutory UK GDPR compliance",
      "The Caldicott Guardian is only appointed in private software consultancies",
      "The DPO only handles staff payroll records, not patient health microdata"
    ],
    "correctIndex": 1,
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
      "Results must be converted into high-resolution PNG image files",
      "Results must undergo Statistical Disclosure Control (SDC) checks to prevent re-identification of individuals",
      "All numbers in the results must be multiplied by random integers",
      "Outputs must be sent via unencrypted email directly to the lead researcher"
    ],
    "correctIndex": 1,
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
      "Only when purchasing commercial off-the-shelf mouse pads and keyboards",
      "When processing is likely to result in a high risk to individuals, including large-scale processing of special category health data",
      "Only when an organisation experiences a public data breach reported on national television",
      "Whenever an employee updates their LinkedIn work history"
    ],
    "correctIndex": 1,
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
      "Pseudonymised data remains personal data because it can be re-linked with a separate key; truly anonymised data is not personal data",
      "Pseudonymised data can be published freely online; anonymised data cannot",
      "Anonymisation is temporary; pseudonymisation is permanent and irreversible",
      "There is no legal difference between pseudonymisation and anonymisation"
    ],
    "correctIndex": 0,
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
      "Patent office registration and trade union sign-off",
      "HRA Research Ethics Committee (REC) favorable opinion and statutory CAG Section 251 approval (or explicit consent)",
      "A local general practice manager vote and credit bureau clearance",
      "Sole approval by the database software vendor"
    ],
    "correctIndex": 1,
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
      "It grants blanket public access to download all hospital medical records without authentication",
      "It provides a statutory framework for public authorities to share non-health administrative data with accredited researchers via accredited processors (UKSA)",
      "It repeals the Data Protection Act 2018 for medical software startups",
      "It requires all doctors to publish raw patient notes on GitHub"
    ],
    "correctIndex": 1,
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
      "A physical security test where security guards attempt to pick enclave server room door locks",
      "An assessment of whether a reasonably competent person with motivation, public databases, and investigative tools could re-identify an individual",
      "A software penetration test aimed at disabling web server firewalls",
      "A psychological evaluation required for all accredited research applicants"
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
      "Compressing large radiology DICOM images for rapid browser display",
      "Enabling distinct healthcare databases to link records of the same patient without either site revealing clear-text identifiers",
      "Encrypting hard drives to protect against laptop hardware theft",
      "Generating synthetic patient clinical notes using natural language models"
    ],
    "correctIndex": 1,
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
      "Within 24 hours of first suspicion",
      "Without undue delay and, where feasible, not later than 72 hours after becoming aware of it",
      "Within 30 calendar days following internal board approval",
      "Only during the annual data security compliance audit"
    ],
    "correctIndex": 1,
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
      "The SIRO writes all database indexing and SQL query scripts for clinical trials",
      "The SIRO is an Executive Director who takes overall strategic ownership of information risk across the organization",
      "The SIRO handles daily visitor badge printing at hospital reception desks",
      "The SIRO acts as the legal counsel representing patients in clinical negligence claims"
    ],
    "correctIndex": 1,
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
      "By publishing an unredacted copy of every patient’s medical chart on a public website",
      "By publishing a standardized, machine-readable Public Data Use Register detailing project title, applicants, data assets, public benefit, and lay summaries",
      "By sending a monthly physical postcard to every registered UK resident",
      "By requiring all researchers to broadcast their computer screens live on social media"
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
      "No legal consequence; UK GDPR automatically supersedes the common law duty in all circumstances",
      "The processing remains unlawful; UK GDPR and CLDC are separate legal requirements that must both be satisfied",
      "The researcher is automatically exempt from all future audits",
      "The data controller is given a 6-month grace period to retroactively seek consent"
    ],
    "correctIndex": 1,
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
      "Federated models eliminate all security requirements because no data is involved",
      "Data remains behind local hospital firewalls; only aggregated code queries and non-identifiable summary outputs cross organizational boundaries",
      "Federated networks require every patient to have a personal software server at home",
      "Federated analytics is illegal under UK health regulations"
    ],
    "correctIndex": 1,
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
      "The purchase price of server hardware and graphics processing units",
      "The terms, approved purpose, security safeguards, permitted personnel, and breach liabilities between data controllers and recipients",
      "The copyright ownership of open-source Python packages used by researchers",
      "The internet speed provided by local broadband telecommunications providers"
    ],
    "correctIndex": 1,
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
      "Whenever the company pays the standard list price to download the full patient microdata database to their private servers",
      "Only when operating inside the SDE on an accredited, approved project with clear NHS public benefit and no microdata egress",
      "Commercial companies are strictly forbidden by UK law from ever analyzing health data under any circumstances",
      "Only if all company executives hold active medical licenses in the UK"
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
      "Continue research immediately and update documentation after publication",
      "Submit a formal substantial amendment to the HRA Research Ethics Committee and obtain favorable opinion before accessing the new cohort",
      "Delete the original ethical clearance and conduct the project without ethics oversight",
      "Notify the software developer to increase database storage capacity"
    ],
    "correctIndex": 1,
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
      "To design the graphic logo and marketing materials for the research platform",
      "To impartially evaluate whether data access applications fulfill public benefit, ethical, and technical governance standards",
      "To manage the physical payroll of university postdoctoral researchers",
      "To replace the High Court in prosecuting criminal data theft cases"
    ],
    "correctIndex": 1,
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
      "All available clinical variables should be pooled together in case they become useful in the future",
      "Data accessed must be adequate, relevant, and limited to what is strictly necessary in relation to the approved research purposes",
      "Data must be stored on at least five distinct physical hard drives simultaneously",
      "Researchers must only use data collected within the previous 7 calendar days"
    ],
    "correctIndex": 1,
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
      "Raw identifiable patient records should be emailed as encrypted ZIP archives to universities upon request",
      "Secure Data Environments (SDEs / TREs) should become the default mechanism for health data access, replacing the dissemination of cut-down data extracts",
      "All health data research should be discontinued to eliminate cybersecurity risks entirely",
      "Cloud computing should be banned across all UK medical facilities"
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
      "The prosecutor uses physical intimidation; the journalist uses social media leaks",
      "The Prosecutor model assumes the attacker knows a specific target individual is in the dataset; the Journalist model assumes the attacker does not know if the target is present",
      "The Prosecutor model only applies to criminal court records; the Journalist model applies to tabloid press releases",
      "There is no mathematical difference; both calculate identical hypergeometric probabilities"
    ],
    "correctIndex": 1,
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
      "By converting all decisions into MP3 audio recordings for radio broadcast",
      "By formally linking Entities (data subsets, queries), Activities (evaluations, approvals), and Agents (researchers, policies) via prov:wasGeneratedBy and prov:wasAssociatedWith",
      "By automatically deleting all previous audit logs whenever a new decision is recorded",
      "By using proprietary blockchain tokens that require continuous cryptocurrency mining"
    ],
    "correctIndex": 1,
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
      "The maximum number of seconds a database query is allowed to execute",
      "The privacy loss budget: the upper bound on the log-ratio of output probabilities between two neighbouring datasets differing by a single individual",
      "The total number of researchers permitted inside the building at one time",
      "The physical clock drift between distributed database nodes"
    ],
    "correctIndex": 1,
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
      "Genomic data files are too small to be stored on modern SSD drives",
      "Genomic sequence data is inherently unique, permanently immutable, and carries hereditary identifiable inferences about biological family members",
      "Genomic data is classified as open-source public domain software by international treaty",
      "Genomic data expires and becomes invalid exactly 48 hours after sequencing"
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
      "Assume all employees are malicious and disable all computer keyboards",
      "Never trust, always verify: enforce mutual TLS, ephemeral credentials, granular micro-segmentation, and continuous policy evaluation at every access hop",
      "Prohibit all data analysis and replace researchers with mechanical paper punch-cards",
      "Rely exclusively on perimeter corporate VPN firewalls without internal access controls"
    ],
    "correctIndex": 1,
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
      "The algorithm must run on an open-source Linux kernel",
      "The individual has the right to obtain human intervention, express their point of view, and contest the automated decision",
      "The algorithm’s neural network weights must be printed in the national press",
      "Automated processing of any kind is unconditionally forbidden across the United Kingdom"
    ],
    "correctIndex": 1,
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
      "Physical temperature differences between adjacent CPU cores during intense computation",
      "Issuing two queries with slightly differing selection criteria (e.g., N patients vs N-1 patients) and subtracting the results to isolate a single individual’s attributes",
      "Exploiting clock skew between NTP servers to forge cryptographic authorization tokens",
      "Comparing differences in software package versions across GitHub branches"
    ],
    "correctIndex": 1,
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
      "By printing laminated plastic ID cards with holographic foil stickers",
      "By issuing cryptographically signed, tamper-evident digital credentials (e.g., ONS Accredited Researcher status) that can be verified instantaneously without phone calls or paper passports",
      "By requiring researchers to deposit physical passport documents in a bank vault",
      "By replacing digital authentication with retina scanning at hospital gates"
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
      "Synthetic data is automatically classified as public domain text with zero legal restrictions under all circumstances",
      "If the synthetic generation model memorizes real patient microdata or permits statistical inference of real attributes, it may legally still constitute personal data",
      "Synthetic data is classified as medical hardware under the UK Medical Devices Regulations 2002",
      "Generating synthetic data is considered copyright infringement under UK patent statutes"
    ],
    "correctIndex": 1,
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
      "Store administrative passwords on a sticky note attached to the computer screen",
      "Allow instantaneous elevated access upon entering a justified operational reason, while automatically triggering immutable audit logging, SIRO alerting, and post-hoc clinical review",
      "Disable all system logging during the emergency to maximize server execution speed",
      "Require three judges to sign a paper warrant before any database can be unlocked"
    ],
    "correctIndex": 1,
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
      "Simply sending data over an encrypted SSH connection to any foreign university server",
      "Ensuring transfers occur to countries with UK adequacy regulations, or implementing Standard Contractual Clauses (SCCs) / International Data Transfer Agreements (IDTA) with supplementary technical measures",
      "Having the researcher sign a declaration that foreign laws will not be obeyed",
      "International transfers of research data are permanently illegal under UK statutes"
    ],
    "correctIndex": 1,
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
      "All institutions must share their raw plaintext database with a trusted third-party escrow server",
      "Participating parties compute a joint mathematical function over their inputs while keeping their private data inputs hidden from each other",
      "MPC guarantees that data processing runs ten times faster than standard SQL queries",
      "MPC replaces the need for any data encryption algorithms"
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
      "The risk of a pharmaceutical marketing team contacting a physician to advertise medical supplies",
      "The proportion of the population that can be successfully re-identified by matching a sample against a commercial or public voter marketing register",
      "The risk of an online advertisement failing to reach its target audience demographic",
      "The probability that a research paper is cited in commercial trade journals"
    ],
    "correctIndex": 1,
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
      "By converting all RDF triples into a compressed ZIP file",
      "By computing a deterministic, canonical representation of an RDF graph regardless of blank node labeling or triple ordering, allowing SHA-256 digital signature verification",
      "By translating SPARQL queries into binary machine code for x86 processors",
      "By registering the RDF schema on a commercial copyright database"
    ],
    "correctIndex": 1,
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
      "To prevent hard drives from overheating during intense read operations",
      "To guarantee that audit trails cannot be altered, overwritten, or erased by compromised administrator accounts or malicious insider adversaries",
      "To reduce the physical cost of storage media by 90 percent",
      "To allow multiple researchers to write to the same file simultaneously without lock contention"
    ],
    "correctIndex": 1,
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
      "Shapes Constraint Language",
      "Standard Healthcare Audit Check Logic",
      "Schema Hierarchy And Constraint Logic"
    ],
    "correctIndex": 1,
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
      "To declare CSS styles for web user interfaces",
      "To declare constraints that apply directly to target focus nodes in an RDF graph",
      "To route network packets between router nodes",
      "To store cryptographic public keys"
    ],
    "correctIndex": 1,
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
      "sh:targetClass",
      "sh:property",
      "sh:path",
      "sh:datatype"
    ],
    "correctIndex": 1,
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
      "sh:minCount 1",
      "sh:maxCount 1",
      "sh:datatype xsd:integer",
      "sh:hasValue true"
    ],
    "correctIndex": 0,
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
      "OWL is only used for audio files, while SHACL is used for video files",
      "OWL operates under the Open World Assumption (OWA); SHACL operates under closed-world validation semantics suitable for data integrity checks",
      "SHACL cannot express class hierarchies, whereas OWL has no classes",
      "OWL was deprecated by the W3C in 1999"
    ],
    "correctIndex": 1,
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
      "sh:datatype",
      "sh:nodeKind",
      "sh:in"
    ],
    "correctIndex": 1,
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
      "sh:Info, sh:Warning, sh:Violation",
      "Fatal, Retry, Ignore",
      "Level 1, Level 2, Level 3"
    ],
    "correctIndex": 1,
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
      "xsd:",
      "owl:",
      "rdf:"
    ],
    "correctIndex": 1,
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
      "A full stop (.)",
      "A semicolon (;)",
      "A comma (,)",
      "A forward slash (/)"
    ],
    "correctIndex": 1,
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
      "sh:conforms true and zero sh:result entries",
      "A SQL error code",
      "sh:conforms false with a warning",
      "A list of all triples in the graph"
    ],
    "correctIndex": 0,
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
      "An ObjectProperty links individuals to other individuals; a DatatypeProperty links individuals to literal data values",
      "An ObjectProperty is stored on disk; a DatatypeProperty is stored in RAM",
      "ObjectProperty is deprecated in modern OWL 2",
      "DatatypeProperty cannot have domain or range declarations"
    ],
    "correctIndex": 0,
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
      "An alternative choice between two predicates",
      "A traversal along a chain of two consecutive predicates across connected RDF nodes",
      "An inverse relationship traversal",
      "A mathematical division of two property values"
    ],
    "correctIndex": 1,
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
      "It permanently encrypts the RDF file on disk",
      "It rejects any focus node that has predicates other than those explicitly declared in the shape's property declarations",
      "It closes the database connection after 5 seconds",
      "It deletes all outgoing edges from the node"
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
      "sh:pattern",
      "sh:hasValue",
      "sh:maxLength"
    ],
    "correctIndex": 1,
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
      "sh:qualifiedValueShape applies only to floating-point numbers",
      "sh:qualifiedValueShape allows counting how many property values conform to a specific nested shape using sh:qualifiedMinCount/MaxCount",
      "sh:qualifiedValueShape runs ten times slower than sh:node",
      "sh:qualifiedValueShape disables closed-world validation"
    ],
    "correctIndex": 1,
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
      "sh:and",
      "sh:or",
      "sh:xone",
      "sh:not"
    ],
    "correctIndex": 2,
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
      "To declare properties that should be silently erased during validation",
      "To allow specific ubiquitous properties (such as rdf:type) without causing closed-shape validation violations",
      "To prevent SHACL from writing errors to console logs",
      "To disable validation for untrusted external researchers"
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
      "By comparing property values lexicographically or chronologically (e.g., sh:lessThan ex:endDate ensures startDate is strictly prior to endDate)",
      "By counting the number of characters in the date string",
      "By subtracting the two dates in milliseconds",
      "sh:lessThan cannot compare two properties on the same node"
    ],
    "correctIndex": 0,
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
      "The cell count must be strictly less than 10",
      "The cell count must be an integer greater than or equal to 10 (enforcing statistical suppression bounds)",
      "The cell must contain at least 10 decimal places",
      "The table must have at least 10 columns"
    ],
    "correctIndex": 1,
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
      "By downloading external JavaScript libraries directly into SQL databases",
      "By enabling an application ontology to dynamically import and reference foundational schemas (e.g., PROV-O, Dublin Core) without duplication",
      "By converting RDF files into Excel spreadsheets",
      "owl:imports is deprecated and rejected by all triple stores"
    ],
    "correctIndex": 1,
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
      "All nodes that appear as predicates in the graph",
      "All nodes in the RDF graph that have at least one triple where ex:conductedUnderEthicsApproval is the predicate",
      "All nodes that have zero triples",
      "Only nodes of type owl:Class"
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
      "FHIR resources cannot be mapped to RDF",
      "FHIR resources are expressed as RDF graphs using standardized FHIR RDF ontology concepts, with resourceType becoming rdf:type and elements becoming predicates",
      "By converting FHIR JSON directly into raw binary files",
      "By saving FHIR resources as plain text comments"
    ],
    "correctIndex": 1,
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
      "Generate 3D vector graphics from clinical radiology scans",
      "Express customized mappings from relational database tables to RDF datasets",
      "Translate Python code into R scripts",
      "Encrypt data in transit across TLS tunnels"
    ],
    "correctIndex": 1,
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
      "The software developer who wrote the broken shape",
      "The specific RDF resource node in the data graph that failed the constraint check",
      "The URL of the remote API gateway",
      "The CPU core where validation executed"
    ],
    "correctIndex": 1,
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
      "To invert boolean true/false values",
      "To navigate relationships in the backward direction (from object to subject), allowing child nodes to validate their parent relationships",
      "To reverse the spelling of string literals",
      "To sort database rows in descending order"
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
      "It restricts values to specific hardware architectures",
      "It asserts whether values must be IRIs (sh:IRI), blank nodes (sh:BlankNode), or literal values (sh:Literal)",
      "It controls the network bandwidth of database nodes",
      "It enforces user role permissions in Linux"
    ],
    "correctIndex": 1,
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
      "SHACL supports audio streams, while OPA only supports text",
      "SHACL evaluates multi-directed labeled RDF graphs; OPA evaluates hierarchical, tree-structured JSON documents",
      "OPA does not support boolean logic",
      "SHACL only compiles to C++ machine code"
    ],
    "correctIndex": 1,
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
      "It is an obsolete feature that has been removed from W3C recommendations",
      "It embeds customized SPARQL SELECT queries within a shape to evaluate complex cross-entity correlations and graph traversals not expressible in SHACL-Core",
      "It is used exclusively to format web page HTML tables",
      "It replaces the need for any RDF database triple store"
    ],
    "correctIndex": 1,
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
      "Index order has zero impact on evaluation speed",
      "Predicate-based path traversals leverage POS (Predicate-Object-Subject) and OSP (Object-Subject-Predicate) indexes to avoid full table scans during shape matching",
      "All indexes in RDF databases must be recalculated manually after every query",
      "Triple stores only maintain one single index on timestamps"
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
      "By calling external proprietary Excel macros",
      "By evaluating functional expressions (e.g., sh:count, mathematical sums, string joins) directly on value nodes prior to constraint checking",
      "By printing calculation steps in the server terminal",
      "Node expressions are only supported in mobile phones"
    ],
    "correctIndex": 1,
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
      "Turing completeness of SHACL SPARQL blocks",
      "Restriction of SHACL-Core constraints to non-recursive, finite graph pattern matching over bounded RDF graphs",
      "Use of quantum cryptography algorithms",
      "The absence of any numerical values in the RDF graph"
    ],
    "correctIndex": 1,
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
      "Using raw HTTP redirects",
      "Via prov:wasDerivedFrom pointing to the input graph, and prov:wasInformedBy linking the validation activity to the specific SHACL rule version",
      "By deleting previous graph versions from the disk",
      "Using proprietary blockchain NFT tokens"
    ],
    "correctIndex": 1,
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
      "By randomly corrupting hard drive sectors",
      "By systematically mutating valid RDF graphs to violate each boundary constraint (e.g., setting sh:minInclusive 10 to 9, or omitting required fields)",
      "By running external denial-of-service network attacks against the build server",
      "Negative test generation cannot be automated"
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
      "To translate English sentences into French",
      "To specify an inference regime (e.g., RDFS or OWL 2 RL entailment) that expands the data graph with inferred triples prior to constraint evaluation",
      "To restrict the file size of uploaded Turtle files",
      "To disable all constraint error reporting"
    ],
    "correctIndex": 1,
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
      "They cannot; recursion is strictly prohibited in SHACL",
      "A PropertyShape references its parent NodeShape via sh:node, recursively traversing sub-consent structures until base termination criteria are met",
      "By executing an infinite loop until server memory exhausts",
      "By converting the consent tree into a flat text document"
    ],
    "correctIndex": 1,
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
      "The ontologies have completely identical identifiers and cannot be distinguished",
      "Divergent granularity, overlapping semantic domains, and ontological misalignment requiring cross-map bridging (e.g., SKOS exactMatch / closeMatch)",
      "RDF engines cannot read medical terms with more than five letters",
      "SNOMED-CT is copyrighted and cannot be represented in RDF triples"
    ],
    "correctIndex": 1,
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
      "It compresses the RDF file with GZIP",
      "It computes a deterministic hash of blank node graphs regardless of serialisation syntax, enabling immutable ECDSA signatures over compliance certificates",
      "It encrypts the entire triple store database using BitLocker",
      "It uploads the certificate to a public social media website"
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
      "It is a physical hardware card installed in the server",
      "It declares new reusable parameterised constraints (with custom SPARQL or JavaScript validation logic) that can be instantiated across multiple shapes",
      "It disables all W3C validation rules",
      "It converts RDF graphs into MySQL tables"
    ],
    "correctIndex": 1,
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
      "Full graph validation crashes all triple stores",
      "Validating only delta graphs (triples added/removed in the current transaction) reduces validation latency from minutes to milliseconds",
      "Incremental validation skips error reporting to save bandwidth",
      "Incremental validation is required by the Linux operating system kernel"
    ],
    "correctIndex": 1,
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
      "Running the shapes on a production database and waiting for user complaints",
      "Translating the SHACL shapes into Description Logic / First-Order Logic formulas and executing an automated SAT/SMT theorem prover (e.g., Z3)",
      "Printing the shapes on paper and visual inspection by researchers",
      "Re-running validation ten times in parallel"
    ],
    "correctIndex": 1,
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
      "By parsing sh:datatype and sh:class declarations and mapping xsd:string to string, xsd:integer to number, and cardinality bounds to optional properties (?)",
      "By using a screen-scraping tool on browser web pages",
      "TypeScript cannot represent any concepts found in SHACL",
      "By converting the SHACL shapes into JPEG images first"
    ],
    "correctIndex": 0,
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
      "To replace relational databases with flat text files",
      "To decouple policy decision-making from policy enforcement across cloud-native and analytical platforms",
      "To encrypt hard disk drives using AES-256",
      "To serve static HTML pages to web browsers"
    ],
    "correctIndex": 1,
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
      "Rego",
      "Rust",
      "TypeScript"
    ],
    "correctIndex": 1,
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
      "To ensure the policy fails to compile",
      "To implement a secure deny-by-default posture, ensuring requests are rejected unless explicitly authorized by a rule",
      "To save memory on the server",
      "To allow anonymous access to all users"
    ],
    "correctIndex": 1,
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
      "By saving a file to the Linux /tmp folder",
      "By passing a JSON document into the global 'input' variable",
      "By sending an SMS text message to the server administrator",
      "By modifying the OPA source code directly"
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
      "It inverts the boolean truth value of an expression, evaluating true if the referenced query is undefined or false",
      "It prints a warning in the server terminal",
      "It terminates policy evaluation immediately",
      "It restarts the OPA daemon"
    ],
    "correctIndex": 0,
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
      "Tests are written in Java using JUnit",
      "Tests are written in Rego files with rule names prefixed by 'test_' and run via 'opa test'",
      "Tests must be manually executed by human typing in terminal",
      "Rego policies cannot be tested"
    ],
    "correctIndex": 1,
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
      "10 to 30 seconds",
      "Sub-millisecond (often under 1 millisecond)",
      "Exactly 1 hour"
    ],
    "correctIndex": 2,
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
      "By generating audio recordings",
      "By using a set rule that aggregates human-readable reason strings (e.g., 'reasons contains msg if { ... }')",
      "By causing the server to throw a 500 fatal exception",
      "OPA cannot return anything other than true or false"
    ],
    "correctIndex": 1,
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
      "regex.match(pattern, string)",
      "string.find(pattern)",
      "regexp.search(string)",
      "text.matches()"
    ],
    "correctIndex": 0,
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
      "Logical OR (disjunction)",
      "Logical AND (conjunction: all expressions must be true for the rule to fire)",
      "Mathematical subtraction",
      "A comment ignored by the compiler"
    ],
    "correctIndex": 1,
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
      "A fatal syntax error that prevents compilation",
      "Logical OR (disjunction: the rule is satisfied if ANY of the rule bodies evaluate true)",
      "The second rule completely overwrites the first rule",
      "A recursive loop that causes a stack overflow"
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
      "opa eval -i input.json -d policy.rego 'data.governance.allow'",
      "opa compile --output bin",
      "opa run --start-server",
      "opa install policy.rego"
    ],
    "correctIndex": 0,
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
      "To store user session cookies in the browser",
      "To supply static or cached reference datasets (e.g., user rosters, role matrices, policy shapes) loaded alongside rules",
      "To store temporary cache files that are deleted after 1 second",
      "To log error messages to disk"
    ],
    "correctIndex": 1,
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
      "By running directly inside the Linux kernel",
      "Via Kubernetes Admission Webhooks (validating and mutating admission webhooks) using tools like OPA Gatekeeper",
      "By modifying the physical BIOS of cluster nodes",
      "Kubernetes does not support OPA"
    ],
    "correctIndex": 1,
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
      "By sending unencrypted email attachments to server operators",
      "By serving gzipped tarballs containing signed Rego policies and data files, which OPA daemons periodically poll, verify, and reload atomically",
      "By requiring manual Git pulls on every node",
      "By restarting the operating system on all cluster nodes every hour"
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
      "io.jwt.decode_verify(token, constraints)",
      "crypto.verify_jwt(token)",
      "jwt.validate_signature(token)",
      "security.jwt_check()"
    ],
    "correctIndex": 0,
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
      "By deleting the entire database table",
      "By concisely collecting all items that violate compliance criteria into a distinct set for reporting or filtering",
      "By sorting items in alphabetical order",
      "By converting integers into Roman numerals"
    ],
    "correctIndex": 1,
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
      "By reading a mechanical wall clock via webcam",
      "By comparing the credential's expiration timestamp against the current Unix time in nanoseconds via time.now_ns()",
      "By counting how many queries the researcher has run",
      "By terminating user accounts at midnight every night"
    ],
    "correctIndex": 1,
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
      "To test if a researcher's email address contains a valid domain name",
      "To verify whether an IP address belongs to an authorized internal subnet or CIDR block, blocking external egress",
      "To calculate network ping latency",
      "To assign dynamic DHCP addresses to virtual machines"
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
      "It evaluates only half of the policy rules and ignores the rest",
      "It pre-compiles high-level Rego policies against known static data into residual conditions (SQL WHERE clauses or ASTs) for execution directly by database engines",
      "It runs queries on half-power CPU cores",
      "It is an experimental feature that was discontinued in 2018"
    ],
    "correctIndex": 1,
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
      "By editing the Envoy C++ source code directly",
      "Via Envoy's External Authorization (ext_authz) filter, which forwards inbound request metadata to OPA before proxying",
      "By disabling the proxy during peak working hours",
      "By forwarding all traffic to a public cloud load balancer"
    ],
    "correctIndex": 1,
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
      "By writing a separate rule for every single employee in the organization",
      "By defining a graph or lookup table of role-permission mappings in data.roles and querying transitivity via recursive rules",
      "By granting admin rights to everyone who knows the root password",
      "By relying on the operating system file permissions"
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
      "The OPA process crashes with a NullPointerException",
      "The expression evaluates to 'undefined', causing the enclosing rule branch to fail without throwing an uncaught exception",
      "The operating system restarts the server",
      "The missing key is automatically populated with a random number"
    ],
    "correctIndex": 1,
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
      "Decision logging is permanently disabled to improve speed",
      "OPA can be configured to stream JSON decision logs (containing exact input, query, decision, and evaluation metrics) to secure remote logging endpoints or SIEMs",
      "Decision logs are written to unencrypted text files on researchers' desktops",
      "Decision logs are printed on paper"
    ],
    "correctIndex": 1,
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
      "To declare multi-threading options",
      "To temporarily replace or mock 'input' or 'data' values during testing and evaluation (e.g., test_rule if { rule with input as mock_input })",
      "To import external Python packages",
      "To create a permanent database record"
    ],
    "correctIndex": 1,
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
      "By inspecting input.table_summary.min_cell_count and asserting min_cell_count >= 10",
      "By counting the total number of characters in the file name",
      "By checking if the file is smaller than 10 kilobytes",
      "OPA cannot perform numerical comparisons"
    ],
    "correctIndex": 0,
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
      "To run a policy every 10 seconds",
      "To express universal quantification (asserting that a condition holds true for EVERY element in a collection)",
      "To repeat a string ten times",
      "To reboot the server every night"
    ],
    "correctIndex": 1,
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
      "By monitoring input.request_count against data.quotas[input.researcher_id].max_daily_requests",
      "By artificially slowing down the server's CPU clock speed",
      "By sending an email warning to the user",
      "OPA is incapable of reading numbers"
    ],
    "correctIndex": 0,
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
      "Wasm binaries eliminate the need for any policy testing",
      "It allows Rego policies to be executed natively inside high-speed C++, Rust, or Go runtimes without network IPC overhead, executing in microseconds",
      "Wasm policies run only on cloud supercomputers",
      "Wasm replaces SQL database engines entirely"
    ],
    "correctIndex": 1,
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
      "The database drops all tables",
      "Severe CPU instruction cycle spikes and latency degradation during large batch evaluation, which can be mitigated by building intermediate lookup sets (O(N))",
      "A cryptographic hash collision",
      "An automatic cancellation of the researcher's license"
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
      "By requiring researchers to sign paper contracts with ink",
      "By signing the bundle archive with an ephemeral OIDC certificate and recording the cryptographic signature in the Rekor transparency log",
      "By encrypting the bundle so only root can read it",
      "By storing the bundle on an external USB flash drive"
    ],
    "correctIndex": 1,
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
      "eBPF replaces all OPA policies with shell scripts",
      "OPA evaluates high-level governance rules and compiles allowed network targets into CIDR maps pushed into eBPF kernel socket filters, blocking unapproved egress at wire speed",
      "By physically disconnecting all Ethernet cables from the server",
      "eBPF cannot interact with network traffic"
    ],
    "correctIndex": 1,
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
      "Mutating server room physical temperatures",
      "Systematically introducing subtle faults (mutations) into Rego rules (e.g., flipping >= to <, or removing not) and confirming that the test suite detects and fails the mutated policy",
      "Randomly deleting customer databases",
      "Injecting viruses into the operating system"
    ],
    "correctIndex": 1,
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
      "By assigning each tenant a different physical computer monitor",
      "By asserting that input.tenant_id matches both the authenticated JWT claim and the requested resource's metadata.owner_tenant, denying cross-tenant access",
      "By asking researchers to promise not to look at other tenants' folders",
      "Tenant isolation is not possible in cloud environments"
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
      "By restarting all physical servers simultaneously",
      "Through periodic polling or webhook-driven cache eviction, with atomic pointer swaps in memory ensuring zero downtime and zero stale reads",
      "By waiting 24 hours before applying any update",
      "Edge nodes never cache policies"
    ],
    "correctIndex": 1,
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
      "To prevent developers from using capital letters",
      "To enforce strict syntax rules, disallowing deprecated features, unused variables, and ambiguous rule references",
      "To shut down the computer if an error occurs",
      "To restrict OPA to running on Sunday mornings only"
    ],
    "correctIndex": 1,
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
      "By executing the SQL statements to see what happens",
      "By parsing the AST of the SQL payload passed in input.query_ast and asserting that ast.statement_type is strictly 'SELECT'",
      "By checking if the SQL script is longer than 50 characters",
      "OPA cannot inspect query structures"
    ],
    "correctIndex": 1,
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
      "It converts policy decisions into email alerts",
      "It generates distributed trace spans for policy evaluations, recording exact evaluation duration, bundle version, and cache hit metrics in tracing backends (Jaeger/Zipkin)",
      "It replaces the need for data backups",
      "It automatically writes new Rego rules using AI"
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
      "By generating a paper voucher that must be signed by three doctors",
      "By validating that the emergency token contains an explicit justification, checking time.now_ns() against valid_until_ns, and streaming high-priority audit events",
      "By turning off the server power switch after 1 hour",
      "Break-glass access cannot be managed by software"
    ],
    "correctIndex": 1,
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
      "Evaluating policies only on odd-numbered days of the week",
      "Evaluating a candidate policy pull request alongside the production policy against historic traffic replays to detect unintended decision regressions",
      "Subtracting two policy files in a text editor",
      "Measuring the electricity consumed by the server during evaluation"
    ],
    "correctIndex": 1,
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
      "By disabling all internet access when recursion is detected",
      "Rego enforces strict recursion checks: non-stratified negation and arbitrary mutual recursion are disallowed by the compiler",
      "By executing rules for a maximum of 10 milliseconds before crashing",
      "Rego allows unbounded recursion"
    ],
    "correctIndex": 1,
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
      "By checking if the table has more than 80 rows",
      "By calculating (input.top_contributor_value / input.cell_total) * 100 and asserting the percentage is strictly <= 80",
      "By deleting the top contributor's row from the source database",
      "OPA cannot perform mathematical division"
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
      "By allowing developers to rewrite the Linux kernel",
      "By compiling custom Go functions into the OPA binary to perform compute-intensive domain operations (e.g., NHS number checksums, genomic coordinate validation)",
      "By installing mobile apps on the server",
      "OPA does not support custom built-in functions"
    ],
    "correctIndex": 1,
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
      "k >= 10",
      "k >= 100"
    ],
    "correctIndex": 2,
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
      "Deleting the entire database table permanently",
      "Replacing cell values that fall below the minimum threshold (e.g., counts 1 to 9) with a symbol such as '*' or '[c]'",
      "Subtracting 10 from every number in the table",
      "Converting all numbers to percentages"
    ],
    "correctIndex": 1,
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
      "Because computers cannot calculate odd numbers",
      "It protects small counts by rounding all values to a multiple of a base number (masking real small numbers through rounding), while preserving table additivity",
      "It makes tables look visually shorter",
      "It is required for printing on physical paper"
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
      "A physical decontamination chamber for hardware technicians",
      "An isolated staging environment and automated quarantine gate where analytical outputs are inspected before export",
      "A high-speed public FTP download link",
      "A cooling fan inside the server chassis"
    ],
    "correctIndex": 1,
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
      "Two software developers must write the code together",
      "Two independent, accredited Statistical Disclosure Control (SDC) officers must independently review and sign off on candidate release files",
      "The same person must review the file twice on consecutive days",
      "A researcher and their supervisor must sign the invoice"
    ],
    "correctIndex": 1,
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
      "They use too much ink when printed on paper",
      "Individual data points on an unbinned scatterplot represent individual patient coordinates, allowing precise microdata reconstruction and attribute disclosure",
      "Scatterplots are statistically invalid for clinical trials",
      "Plotting libraries are not installed in enclaves"
    ],
    "correctIndex": 1,
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
      "Attributes that explicitly identify a patient on their own (e.g., Name, NHS Number, Full Postal Address, Phone Number)",
      "A patient's blood type and shoe size",
      "The server's IP address and operating system version",
      "The statistical software used by the researcher"
    ],
    "correctIndex": 0,
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
      "Attributes that describe the color of hospital hospital beds",
      "Attributes (e.g., age, postal sector, ethnicity, diagnosis code, admission date) that in combination can uniquely identify an individual",
      "Random strings generated by cryptographic hardware",
      "Software package version numbers"
    ],
    "correctIndex": 1,
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
      "Extreme minimum and maximum values frequently represent unique outlier patients whose distinct attributes make them trivially identifiable",
      "Printers cannot render extreme numbers",
      "Extreme numbers cause division by zero errors",
      "Mathematical formulas only work on numbers between 0 and 100"
    ],
    "correctIndex": 0,
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
      "The researcher's phone number",
      "Median, 25th percentile (Q1), 75th percentile (Q3), and Interquartile Range (IQR)",
      "A random floating-point number",
      "The sum of all patient NHS numbers"
    ],
    "correctIndex": 1,
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
      "That the researcher has freedom to work from home",
      "That the sample size (N) substantially exceeds the number of fitted parameters (k), preventing exact mathematical derivation of individual records",
      "That the software is licensed under open-source terms",
      "That the model is trained on at least five distinct computer servers"
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
      "A physical guest sign-in book at the hospital entrance",
      "A tamper-evident, append-only digital record detailing every file submitted, automated rule checks, review comments, and reviewer signatures",
      "A log file that is deleted every Friday evening",
      "A spreadsheet that can be edited by any researcher"
    ],
    "correctIndex": 1,
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
      "Summary PDF research reports and aggregated CSV tables with k >= 10",
      "Raw microdata CSVs, individual-level parquet files, SQL database dumps, and uncompiled binary executables",
      "Plain text README documentation files",
      "Vector graphics diagrams showing conceptual system workflows"
    ],
    "correctIndex": 1,
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
      "Send the data to colleagues via personal WhatsApp messages",
      "Self-assess outputs against published SDC guidance, perform primary/secondary suppression, remove microdata, and provide clear descriptive metadata",
      "Wait for the IT department to do the analysis for them",
      "Publish the preliminary findings in the national press"
    ],
    "correctIndex": 1,
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
      "Survival curves take too long to compute",
      "Steps in survival curves correspond to individual patient events; small numbers of surviving patients at the tail of the curve can be identified",
      "Survival curves are only permitted in veterinary medicine",
      "Curves cannot be rendered in black and white"
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
      "Suppressing data on a second computer monitor",
      "Suppressing additional non-sensitive cells in a row or column to prevent suppressed small cells from being derived by subtraction from margins/totals",
      "Suppressing data after publication",
      "Deleting the table footnotes"
    ],
    "correctIndex": 1,
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
      "If the table has more than 80 rows, 1 row must be deleted",
      "If a single individual or unit contributes more than 80% to the total aggregate value of a cell, the cell must be suppressed",
      "80% of researchers must agree to publish the paper",
      "If 1 patient lives more than 80 years, their record is deleted"
    ],
    "correctIndex": 1,
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
      "By requiring 85% of hospital beds to be occupied",
      "By suppressing a cell if the top two contributors collectively account for more than 85% of the cell total value",
      "By deleting the top two hospitals from the dataset",
      "By multiplying the cell total by 85%"
    ],
    "correctIndex": 1,
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
      "Delete the entire research study",
      "Truncate the curve at the point where the risk pool drops below 10, or apply statistical smoothing to mask exact event timings",
      "Publish the names of the remaining 9 patients",
      "Interpolate the curve with a straight vertical line to zero"
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
      "Because raw scatterplots take too much disk space",
      "Unbinned residual plots display the exact coordinates (x, y) of each patient's error residual, exposing individual microdata values to re-identification",
      "Binned plots are required by Python plotting libraries",
      "Residual plots cannot display negative numbers"
    ],
    "correctIndex": 1,
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
      "A rule stating that p percent of tables must be published in color",
      "A rule that suppresses a cell if any coalition of respondents can estimate another respondent's value to within p percent accuracy",
      "A rule that requires p percent of patients to give verbal consent",
      "A rule that rounds all numbers to p decimal places"
    ],
    "correctIndex": 1,
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
      "By using optical character recognition to read scanned documents",
      "By formulating table cell relations as integer linear programming (ILP) optimization problems to find the minimum information loss suppression pattern",
      "By randomly deleting cells until no small numbers remain",
      "By uploading tables to a public cloud chatbot"
    ],
    "correctIndex": 1,
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
      "The regression equation must have at least 100 characters",
      "Every cross-tabulated cell of the binary outcome (0 and 1) against categorical predictor variables must satisfy the minimum cell count (k >= 10)",
      "The model must have an R-squared of exactly 1.0",
      "The logistic curve must never touch the x-axis"
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
      "A physical fence surrounding database servers",
      "A mathematical framework that guarantees the output of a computation is virtually identical whether any single individual's data is included or excluded",
      "A method for encrypting computer RAM",
      "A system for deleting old emails"
    ],
    "correctIndex": 1,
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
      "The monetary budget allocated to purchase software licenses",
      "The cumulative metric of total information leakage permitted across all queries executed against a sensitive dataset",
      "The number of days an analyst is allowed to work on a project",
      "The storage capacity of the database server"
    ],
    "correctIndex": 1,
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
      "By turning off GPS satellites over hospitals",
      "By aggregating precise street addresses or postal codes up to broader geographic boundaries (such as Integrated Care Board regions or MSOAs) with populations > 10,000",
      "By deleting all maps from research papers",
      "By shifting all patient coordinates 500 miles to the north"
    ],
    "correctIndex": 1,
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
      "Random rounding chooses random numbers from a lottery",
      "Random rounding rounds each cell up or down to the nearest multiple of base B with probabilities inversely proportional to the distance to those multiples",
      "Deterministic rounding is illegal under UK regulations",
      "Random rounding changes every number to zero"
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
      "Because machine learning models are too large to fit in emails",
      "Overfitted models can memorize training data microdata points, allowing membership inference or training data extraction attacks",
      "Neural networks are strictly forbidden in healthcare research",
      "Model weights contain copyright notices from software vendors"
    ],
    "correctIndex": 1,
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
      "An attack where hackers change the font size of tables",
      "An attack where an adversary subtracts two overlapping published tables (e.g., one published in June and one in July) to deduce the attributes of newly admitted patients",
      "A denial-of-service attack that floods web servers",
      "A dispute between two researchers regarding authorship"
    ],
    "correctIndex": 1,
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
      "By translating Python code into binary machine code",
      "By parsing source code files to detect unauthorized serialization calls (such as df.to_csv(), write.csv(), or pickle.dump() writing to unapproved paths)",
      "By counting the number of comments in the code",
      "By checking if the code was written on a Mac or PC"
    ],
    "correctIndex": 1,
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
      "By using a physical calculator to guess numbers",
      "By modeling marginal totals and cross-tabulations as a system of linear constraints (Ax = b, x in {0, 1}) and solving via SAT/SMT or Integer Linear Programming solvers",
      "By hacking into the researcher's home WiFi network",
      "Microdata reconstruction from aggregates is mathematically impossible"
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
      "epsilon is storage cost, delta is processing time",
      "epsilon represents the maximum privacy loss bound, and delta represents the probability of the privacy guarantee failing (catastrophic failure probability, ideally delta << 1/N)",
      "epsilon is the number of users, delta is the number of tables",
      "epsilon and delta are arbitrary Greek letters with no mathematical meaning"
    ],
    "correctIndex": 1,
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
      "By deleting the neural network weights after every training epoch",
      "By clipping individual per-sample gradient vectors to a maximum Euclidean norm C, and injecting calibrated Gaussian noise to the batch gradients before weight updates",
      "By running the model on an encrypted quantum computer",
      "By only training the model on fake synthetic images"
    ],
    "correctIndex": 1,
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
      "An attack where an attacker attempts to join an exclusive research club",
      "An attack where an adversary uses model confidence scores or prediction loss to determine with statistical significance whether a specific patient's record was in the training set",
      "An attack that changes the passwords of all database members",
      "An attack that deletes the user database table"
    ],
    "correctIndex": 1,
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
      "Turning the computer upside down",
      "Reconstructing identifiable representations of training data (such as high-resolution patient face photos or genomic variants) by optimizing input features to maximize output activations",
      "Deleting the model checkpoint from the server",
      "Changing the sign of the model coefficients from positive to negative"
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
      "By measuring the physical temperature of the server CPU during computation",
      "By calculating the conditional entropy H(Y|X); low conditional entropy indicates that knowing attribute X reveals attribute Y with near certainty",
      "By counting the total number of letters in the table title",
      "Entropy measurements cannot be applied to tables"
    ],
    "correctIndex": 1,
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
      "By requiring tables to have at least t rows",
      "By requiring that the probability distribution of a sensitive attribute within any equivalence class does not deviate from the overall dataset distribution by more than distance threshold t",
      "By encrypting data using Triple-DES",
      "By deleting records that contain the letter 't'"
    ],
    "correctIndex": 1,
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
      "ZKP eliminates all mathematical checks in the airlock",
      "ZKP allows a researcher to mathematically prove to an airlock gateway that an analytical output complies with SDC invariants (e.g., k >= 10) without revealing the underlying raw microdata",
      "ZKP converts all numbers into zeros",
      "ZKP is an unproven theoretical concept that cannot run on computers"
    ],
    "correctIndex": 1,
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
      "By rounding all numbers to the nearest integer",
      "By characterizing privacy loss using the Renyi divergence spectrum of orders alpha, allowing simple additive composition across hundreds of sequential gradient updates",
      "By ignoring the delta parameter entirely",
      "By running only on Linux operating systems"
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
      "Aggregating data on microscopic computer chips",
      "Clustering similar individual records into small groups of size at least k and replacing their individual values with the cluster centroid mean, preserving analytical utility",
      "Deleting records that contain small numbers",
      "Converting microdata into audio files"
    ],
    "correctIndex": 1,
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
      "By changing the letters A, C, G, T into 1, 2, 3, 4",
      "By aggregating variants into allele frequency bands across large reference populations (> 1,000 individuals) and suppressing rare novel mutations (MAF < 0.01)",
      "By deleting the patient's entire genome",
      "Genomic variants do not require disclosure control"
    ],
    "correctIndex": 1,
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
      "Attacking a computer monitor while a graph is displayed",
      "Re-identifying individual patients or clinical practitioners by matching topological graph invariants (e.g., vertex degrees, clique structures, betweenness centrality) against public registries",
      "Deleting edges from a network diagram",
      "Converting network graphs into SQL tables"
    ],
    "correctIndex": 1,
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
      "By locking the export files inside a physical metal safe",
      "By attaching an ECDSA cryptographic signature and review ticket metadata digest to the exported archive, verified against an authorized SDC officer's public key",
      "By requiring the user to type their password every time they open the file",
      "By deleting the file after 24 hours"
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
      "To convert printed books into digital PDFs",
      "To scan submitted PNG, PDF, and SVG plot images to detect unsuppressed small numbers, plain-text patient names, or unbinned microdata dots hidden in image pixels",
      "To adjust the brightness and contrast of graphics",
      "To verify that the graphic designer used the correct corporate fonts"
    ],
    "correctIndex": 1,
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
      "By adding a company logo to the top of every page",
      "By scanning exported documents for hidden zero-width unicode characters, microdot patterns, or semantic steganography used to covertly smuggle confidential patient tokens",
      "By printing documents on watermarked cotton paper",
      "By converting text into encrypted Morse code"
    ],
    "correctIndex": 1,
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
      "Because commercial LLMs run on Windows instead of Linux",
      "Data sent to public multi-tenant APIs traverses the public internet, breaches NHS air-gap boundaries, and risks data retention or training exposure by commercial vendors",
      "Because commercial APIs cannot process medical terminology",
      "Because doctors prefer using paper charts"
    ],
    "correctIndex": 1,
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
      "A physical fiber optic cable standard",
      "An open protocol standardizing how AI models and agents securely query tools, local databases, and contextual file resources",
      "A proprietary programming language developed for medical devices",
      "A medical billing code classification system"
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
      "Full root administrative privileges with DROP and ALTER TABLE rights",
      "Strictly read-only SELECT permissions without write, delete, update, or schema modification privileges",
      "No database user account is required",
      "Write-only permissions"
    ],
    "correctIndex": 1,
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
      "A human must physically pedal an electricity generator to power the server",
      "An accredited human researcher sponsor must review, authorize, and take legal responsibility for agent-generated code and analytical workflows before execution",
      "A human must manually type every single SQL query character by character",
      "Human review is not required if the AI has 99% accuracy"
    ],
    "correctIndex": 1,
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
      "Hosted on public social media websites",
      "Deployed as containerized instances running entirely within the secure, air-gapped enclave with all external outbound network egress blocked",
      "Streamed live from overseas data centers over unencrypted HTTP",
      "Stored on unencrypted USB sticks carried by researchers"
    ],
    "correctIndex": 1,
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
      "To clean and sanitize computer keyboards in hospitals",
      "An accredited clinician who leads the clinical risk management process, maintains the living Hazard Log, and signs off on the Clinical Safety Case Report",
      "A police officer assigned to hospital emergency rooms",
      "A software engineer who writes unit tests for database schemas"
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
      "ISO/IEC 42001:2023",
      "ISO 14001",
      "ISO 31000"
    ],
    "correctIndex": 1,
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
      "When the computer screen flickers unexpectedly",
      "When an LLM generates factually false or nonsensical statements presented with high linguistic confidence, which could lead to flawed epidemiological findings or medical errors",
      "When an LLM runs out of memory",
      "When an LLM speaks in multiple human languages"
    ],
    "correctIndex": 1,
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
      "Injecting liquid medicine into a computer server",
      "Manipulating the model's instructions by embedding adversarial text inside user inputs or retrieved database records, causing the model to bypass safety guardrails",
      "Typing too quickly on a keyboard",
      "Unplugging the network cable during query execution"
    ],
    "correctIndex": 1,
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
      "A commercial marketing brochure and sales presentation",
      "A Clinical Risk Management Plan, a living Hazard Log, and a Clinical Safety Case Report (CSCR)",
      "A certificate of incorporation from Companies House",
      "An invoice for software licensing fees"
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
      "Because Copilot cannot understand SQL code",
      "Code generation assistants send code context and snippets to external cloud servers for processing, violating air-gap invariants and exposing patient PII",
      "Because Copilot only writes computer games",
      "Because Microsoft does not permit doctors to write code"
    ],
    "correctIndex": 1,
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
      "A standard for physical server rack dimensions",
      "A series of international standards establishing data quality measures, bias evaluation, and governance for AI training datasets",
      "A guideline for building hospital air conditioning units",
      "A standard for hospital staff uniforms"
    ],
    "correctIndex": 1,
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
      "Retrieving lost passwords from an email server",
      "An architecture that enhances LLM generation by retrieving authoritative, relevant factual documents from a curated local database before prompting the model",
      "Generating random text without any user input",
      "Translating computer code into spoken audio"
    ],
    "correctIndex": 1,
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
      "To play audio chimes when an email arrives",
      "To output structured JSON arguments adhering to a predefined schema, allowing the host application to invoke specific validated API functions",
      "To rewrite the operating system kernel in assembly code",
      "To place telephone calls to clinical staff"
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
      "Because telemetry uses too much battery power",
      "Telemetry packets send usage logs, prompts, and IP addresses to external third-party servers, directly breaching air-gapped zero-egress security invariants",
      "Because telemetry crashes the GPU drivers",
      "Telemetry is required by UK data protection laws"
    ],
    "correctIndex": 1,
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
      "By changing the color of folder icons in the operating system",
      "By strictly binding tool access to explicit URI patterns (e.g., file:///projects/proj_101/*) and rejecting any path traversal attempts outside the boundary",
      "By asking the model politely not to access other directories",
      "By deleting all files outside the current project"
    ],
    "correctIndex": 1,
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
      "An attack executed by unplugging the router",
      "An adversary embeds adversarial instructions inside an unstructured medical note or PDF; when the RAG system retrieves the note, the LLM executes the hidden payload",
      "A bug in the graphics processing unit",
      "An unauthorized password reset request"
    ],
    "correctIndex": 1,
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
      "By multiplying server storage by processor speed",
      "By cross-referencing Consequence Severity (Catastrophic to Minor) against Likelihood (Very High to Improbable) to determine initial and residual Clinical Risk Scores",
      "By counting the number of software developers on the team",
      "By calculating the monetary cost of computer hardware"
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
      "Vector embeddings consume too much CPU memory",
      "Vector embeddings can be inverted using reconstruction algorithms to recover the original raw clinical text and patient PII",
      "Vector embeddings are only readable by quantum computers",
      "Vector embeddings expire after 24 hours"
    ],
    "correctIndex": 1,
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
      "Replacing all model weights with random integers",
      "Training small low-rank adapter matrices while keeping base model weights frozen; adapter weights must undergo strict SDC review to prevent memorization",
      "A method for printing model weights on paper",
      "A standard for connecting USB cables to servers"
    ],
    "correctIndex": 1,
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
      "By turning off the building's main power circuit breaker",
      "By enforcing deterministic execution limits: maximum step depth, timeout thresholds, memory bounds, and monitoring repeat loop detection in agent scratchpads",
      "By waiting until the server crashes",
      "Runaway loops cannot be detected"
    ],
    "correctIndex": 1,
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
      "An invoice listing the price of computer monitors",
      "A formal machine-readable inventory recording base foundation model weights, pre-training corpora sources, fine-tuning adapters, licenses, and cryptographic hashes",
      "A list of software developers' home addresses",
      "A user manual for medical nurses"
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
      "By translating JSON into Python scripts",
      "By converting the JSON arguments into an RDF graph in memory and evaluating target PropertyShapes to enforce required parameters, ranges, and types",
      "By running an optical scanner over the screen",
      "SHACL cannot validate JSON documents"
    ],
    "correctIndex": 1,
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
      "To prevent computer monitors from falling off desks",
      "A secondary filtering layer that inspects LLM-generated text for forbidden regex patterns (e.g., NHS numbers, names, unsuppressed cell counts) before displaying to users",
      "A software tool for speeding up graphics rendering",
      "A hardware firewall attached to the power cord"
    ],
    "correctIndex": 1,
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
      "Bluetooth wireless pairing",
      "NVIDIA Multi-Instance GPU (MIG) partitioning, which carves physical GPUs into isolated hardware instances with dedicated memory, cores, and crossbar bandwidth",
      "Running multiple programs in the same terminal window",
      "Overclocking the GPU clock speed"
    ],
    "correctIndex": 1,
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
      "By printing physical ink watermarks on paper",
      "By subtly biasing the model's token selection logits based on a pseudo-random key, allowing automated verifiers to detect AI-generated text without human-perceptible degradation",
      "By typing 'AI' at the end of every sentence",
      "By changing all fonts to Comic Sans"
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
      "The ratio between the server's download and upload internet speeds",
      "The ratio of the selection or positive prediction rate for a protected demographic subgroup compared to the rate for the majority subgroup (unacceptable if < 0.80)",
      "The ratio of male to female software developers",
      "The percentage of CPU cores used during model training"
    ],
    "correctIndex": 1,
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
      "Advertising the software on social media after launch",
      "Continuous ongoing monitoring of live model performance, calibration drift, false positive rates, and incident reports across diverse patient populations",
      "Selling patient data to third-party marketing companies",
      "Discontinuing all software maintenance after installation"
    ],
    "correctIndex": 1,
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
      "By saving each document on a different hard drive",
      "By attaching metadata security tags (e.g., permitted_roles: ['oncology_researcher']) to vector embeddings and applying boolean pre-filtering during approximate nearest neighbor search",
      "By encrypting the user's computer screen",
      "Vector databases cannot support access controls"
    ],
    "correctIndex": 1,
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
      "Because natural language takes up too much disk space",
      "Unconstrained natural language allows prompt injection propagation and semantic ambiguity between agents, whereas structured schemas permit rigorous schema validation and policy enforcement",
      "Because computers can only understand binary numbers",
      "Natural language is prohibited by international copyright laws"
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
      "By running code directly on the host operating system with root privileges",
      "By executing code within lightweight virtualized microVMs with dedicated guest kernels, isolated memory address spaces, and restricted seccomp syscall filters",
      "By disabling all CPU instruction caching",
      "By translating Python code into JavaScript"
    ],
    "correctIndex": 1,
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
      "Attacking a physical prison facility",
      "Constructing subtle token sequences (e.g., GCG attacks or cipher encoding) that bypass alignment training and cause the model to output dangerous clinical protocols or PII",
      "Unplugging the server's power cable",
      "Typing in all capital letters"
    ],
    "correctIndex": 1,
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
      "By formatting the hard drive",
      "By applying gradient-ascent unlearning algorithms or Fisher information matrix approximations to scrub the influence of specific patient records from model weights without full retraining",
      "By asking the model to forget the patient's name",
      "By deleting the patient's row from the training CSV file after training has finished"
    ],
    "correctIndex": 1,
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
      "By recording an audio commentary of the agent's thoughts",
      "By creating prov:Activity records for each tool call, capturing exact system prompts, input tokens, model version, temperature, random seed, and output hashes linked to the human sponsor",
      "By deleting previous audit logs after each step",
      "Using public blockchain tokens"
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
      "Measuring the room temperature while the computer runs",
      "Sampling multiple responses from the model at non-zero temperature and computing entropy across semantic equivalence classes (high semantic entropy indicates ungrounded hallucination)",
      "Counting the number of vowels in the text",
      "Measuring network packet latency"
    ],
    "correctIndex": 1,
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
      "Testing whether a researcher is a member of the British Medical Association",
      "Evaluating whether loss values or shadow model predictions can differentiate between patients in the fine-tuning set versus unseen patients, measured via Area Under the ROC Curve (AUC)",
      "Checking the researcher's hospital badge number",
      "Measuring the file size of the model adapter"
    ],
    "correctIndex": 1,
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
      "By running the code on a live production hospital database",
      "By exploring all execution paths through the query AST using symbolic mathematical variables to formally prove that no data modification or privilege escalation states can be reached",
      "By having three programmers read the code aloud",
      "Symbolic execution cannot be applied to SQL"
    ],
    "correctIndex": 1,
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
      "A model that knows zero facts about medicine",
      "A cryptographic technique that allows a platform to verify that a specific approved model architecture and weights executed correctly on private inputs, without exposing model weights or patient data",
      "An AI model that runs without using electricity",
      "A marketing term for open-source software"
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
      "An argument that safety measures were too expensive to implement",
      "A formal clinical risk-benefit demonstration proving that residual risks are tolerable and that further reduction would require disproportionate cost, time, or complexity relative to the risk reduction",
      "A statement that zero risks exist in the software",
      "An apology letter to hospital patients"
    ],
    "correctIndex": 1,
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
      "Stealing hard drives from the server room",
      "Prompting the model with prefix prompts and sampling millions of completions to extract verbatim sequences of confidential patient clinical text memorized during training",
      "Downloading the open-source base model from Hugging Face",
      "Deleting the training dataset from the disk"
    ],
    "correctIndex": 1,
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
      "By using a standard Ethernet cable",
      "By using physical optical hardware (transmitting via LED/photodiode) that physically permits light to travel in only one direction, preventing any reverse-channel exfiltration",
      "By configuring a software firewall in Linux",
      "Data diodes are theoretical devices that do not exist"
    ],
    "correctIndex": 1,
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
      "Requiring all doctors to have equal lottery chances",
      "Asserting that the model's true positive rate and false positive rate are equal across all protected demographic subgroups (e.g., race, sex, age)",
      "Multiplying all prediction probabilities by equal weights",
      "Ensuring equal numbers of male and female software engineers"
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
      "By checking if the server fan is spinning",
      "By tracking the agreement between predicted probabilities and observed empirical event frequencies across moving time windows, alerting when covariate shift degrades predictive reliability",
      "By asking nurses if they like the computer interface",
      "By restarting the database server every morning"
    ],
    "correctIndex": 1,
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
      "A benchmark test of computer graphics card speed",
      "A comprehensive multi-disciplinary audit evaluating societal benefits, systemic human rights risks, data biases, and clinical safety before deploying high-risk AI in public health",
      "A financial audit of company tax returns",
      "A software license agreement for open-source code"
    ],
    "correctIndex": 1,
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
      "By changing the user's password to a random string",
      "By enforcing strict type schemas on method names and arguments, ensuring agents can only invoke predefined functions with validated primitive parameters and never execute raw shell commands",
      "By deleting the command line interface from Linux",
      "JSON-RPC does not provide any security protections"
    ],
    "correctIndex": 1,
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
      "Writing legal contracts on physical parchment paper",
      "Expressing Information Governance policies, statutory rules, and security controls as machine-readable, version-controlled code evaluated automatically in CI/CD pipelines",
      "Employing lawyers to write all software code",
      "Replacing all computer code with English sentences"
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
      "Because databases cannot read text files",
      "Decoupling ensures policies can be audited, versioned, and updated independently of database engines (DuckDB, Postgres, Spark) without code refactoring",
      "Because database vendors charge extra for policy features",
      "To slow down query execution for safety"
    ],
    "correctIndex": 1,
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
      "To send marketing emails to hospital patients",
      "To automatically execute SHACL graph validation, OPA unit tests, and security linters on every pull request before changes are merged",
      "To mine cryptocurrency on server hardware",
      "To print paper copies of all code changes"
    ],
    "correctIndex": 1,
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
      "To make commit messages appear in bold font",
      "To provide cryptographic proof of author identity, ensuring commit provenance and preventing malicious impersonation of compliance officers",
      "Because unsigned commits take up more disk space",
      "Signed commits are required to view web pages"
    ],
    "correctIndex": 1,
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
      "To automatically shut down the computer when work is done",
      "To run local security scanners that catch hardcoded passwords, API keys, or patient PII before code is committed to the Git history",
      "To delete the Git repository if an error occurs",
      "To forward all code to external social media sites"
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
      "They prevent any changes from ever being made to the project",
      "They mandate peer code review approvals, require passing CI status checks, and prohibit direct force-pushes to production branches",
      "They require all developers to use the same computer model",
      "They delete all branches older than 30 days"
    ],
    "correctIndex": 1,
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
      "A physical receipt for computer hardware purchases",
      "A lightweight, version-controlled document capturing the context, options considered, decision, and consequences of a significant architectural choice",
      "A list of employees who resigned from the company",
      "A daily record of computer server temperatures"
    ],
    "correctIndex": 1,
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
      "The number of developers who worked on the release",
      "MAJOR indicates breaking policy changes, MINOR adds backwards-compatible rules, and PATCH contains bug fixes and clarifications",
      "The year, month, and day the software was written",
      "The speed of the computer processor"
    ],
    "correctIndex": 1,
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
      "To ensure the software runs on older computer models",
      "To ensure reproducible builds and prevent malicious upstream package updates or breaking dependencies from entering production enclaves",
      "Because unpinned dependencies are illegal in Europe",
      "Pinned dependencies make downloads ten times faster"
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
      "To compress files for email attachment",
      "To package analytical runtimes (operating system, libraries, code) into isolated, immutable containers that execute identically across diverse hardware environments",
      "To provide a user-friendly text editor for typing papers",
      "To replace physical computer monitors"
    ],
    "correctIndex": 1,
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
      "To control the speed of internet connections",
      "To provide a standardized schema (covering summary, provenance, coverage, accessibility) describing health data assets for public discovery without exposing raw data",
      "To encrypt medical images on hospital servers",
      "To print patient appointment letters"
    ],
    "correctIndex": 1,
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
      "Printing documentation on paper and locking it in a filing cabinet",
      "Maintaining documentation (Markdown, AsciiDoc) in the same Git repository as code, updated in the same pull requests and checked by CI",
      "Paying external agencies to write yearly marketing brochures",
      "Recording audio podcasts about software features"
    ],
    "correctIndex": 1,
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
      "Ensuring all servers are painted the exact same color",
      "Ensuring dev, staging, and production environments share identical operating systems, policy bundles, and security configurations to prevent unexpected production failures",
      "Having an equal number of male and female software engineers",
      "Using identical passwords across all environments"
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
      "A physical brush used to clean dust from computer servers",
      "A static analysis tool that scans code files (Rego, Turtle, TypeScript) for syntax errors, anti-patterns, and formatting violations without executing the code",
      "A program that accelerates internet download speeds",
      "A tool for generating fake synthetic data"
    ],
    "correctIndex": 1,
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
      "Because Git cannot store text files larger than 10 lines",
      "Committing secrets to Git exposes them to anyone with repository access, embeds them permanently in commit history, and risks widespread credential compromise",
      "Because passwords expire after being typed into a computer",
      "Git is only designed to store images, not text"
    ],
    "correctIndex": 1,
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
      "By downloading packages over satellite internet connections during the night",
      "By maintaining local, read-only internal mirrors of PyPI, CRAN, and npm within the enclave perimeter, pre-scanned and synchronized via secure ingestion gates",
      "By allowing researchers to bring USB sticks into the server room",
      "By compiling all software packages from memory"
    ],
    "correctIndex": 1,
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
      "Using two different computer monitors on a researcher's desk",
      "Separating the high-throughput analytical data plane (direct Parquet/DuckDB/SQL data queries) from the administrative control plane (API gateways, auth, and audit telemetry)",
      "Connecting two Ethernet cables to the same computer port",
      "Running half the servers on battery power"
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
      "Writing computer programs that build physical desks",
      "Defining physical infrastructure, firewalls, subnets, and storage accounts declaratively in version-controlled scripts (e.g., Terraform, OpenTofu)",
      "Drawing network diagrams on a whiteboard",
      "Hiring external contractors to configure servers manually by hand"
    ],
    "correctIndex": 1,
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
      "A physical receipt for computer monitors",
      "A standardized, machine-readable inventory of all software components, libraries, and licenses in a system, formatted in CycloneDX or SPDX standards",
      "A list of software developer salaries",
      "A user guide written for hospital patients"
    ],
    "correctIndex": 1,
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
      "By printing passwords on physical paper cards",
      "By generating dynamic, time-limited, and cryptographically rotated credentials on demand, with comprehensive audit trails and zero hardcoded plaintext secrets",
      "By encrypting computer screens when users walk away",
      "By storing all passwords in an unencrypted MySQL database"
    ],
    "correctIndex": 1,
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
      "Deploying software to a laboratory that studies birds",
      "Routing a small fraction of live traffic (e.g., 5%) to a newly released policy bundle while monitoring error rates, before rolling out to 100% of production",
      "Deploying software exclusively on Sunday mornings",
      "Testing software on a developer's laptop only"
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
      "By sending daily emails to computer programmers",
      "By running an automated agent in the cluster that continuously compares desired state in Git with live cluster state, automatically reconciling any drift",
      "By formatting hard drives whenever a git push occurs",
      "GitOps requires manual typing of terminal commands"
    ],
    "correctIndex": 1,
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
      "ROT13 in transit and plain-text at rest",
      "AES-256 (or XChaCha20-Poly1305) encryption at rest, and TLS 1.3 (with strong cipher suites and perfect forward secrecy) in transit",
      "DES encryption with 56-bit keys",
      "Encryption is optional if the building has security guards"
    ],
    "correctIndex": 1,
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
      "By locking the server room door with a physical key",
      "By enforcing object retention policies and compliance locks at the storage hardware/API level, preventing objects from being overwritten or deleted even by root administrators",
      "By deleting logs every 24 hours to save disk space",
      "By converting log files into audio recordings"
    ],
    "correctIndex": 1,
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
      "Compute instances that take three days to boot",
      "Disposable virtual machines or containers provisioned on demand for a single research session and completely destroyed upon session termination, preventing persistent data remnants",
      "Compute instances powered by solar energy",
      "Virtual machines that never save any files to disk"
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
      "By requiring the software developer to visit the hospital in person",
      "By running automated vulnerability scanning (CVEs), malware detection, license compliance checks, and human security committee review before mirroring to internal repositories",
      "By approving all package requests automatically without inspection",
      "By banning all third-party software libraries permanently"
    ],
    "correctIndex": 1,
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
      "Restoring physical paper files from a cardboard box",
      "The ability to restore a database to its exact state at any specific microsecond in the past, leveraging continuous write-ahead logging (WAL) and base backups",
      "Re-running all queries from memory",
      "Taking a backup once every year"
    ],
    "correctIndex": 1,
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
      "By requiring users to create separate passwords for every software tool",
      "By mapping SAML 2.0 or OIDC group claims (e.g., 'accredited_clinical_investigator') dynamically to enclave role permissions and Git repository write access",
      "By having managers verify user identities over phone calls",
      "Identity providers cannot be integrated with Git"
    ],
    "correctIndex": 1,
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
      "A physical sign on the server room door",
      "A forward proxy server (e.g., Squid, Envoy) configured with strict domain name allowlists that inspects outbound HTTP/TLS SNI headers, dropping any connections to unapproved domains",
      "A program that accelerates website loading speed",
      "A tool for sending email newsletters to researchers"
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
      "By running a physical vacuum cleaner over server chassis",
      "By scanning container layers during CI builds against public vulnerability databases (NVD), failing the build if high or critical CVEs are detected",
      "By measuring how fast the container starts",
      "Container scanning can only be done manually by humans"
    ],
    "correctIndex": 1,
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
      "Alpha, Beta, Release Candidate, Final",
      "Stage 1: Evaluate-Only (Local Testing) -> Stage 2: Shadow Mode (Non-Blocking Audit) -> Stage 3: Canary Mode (Fractional Enforcement) -> Stage 4: Active Enforcement (Strict Gating)",
      "Design, Develop, Discard, Repeat",
      "Manual Review, Board Approval, Press Release, Archive"
    ],
    "correctIndex": 1,
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
      "By writing log files to floppy disks",
      "By running a web browser inside the operating system kernel",
      "eBPF only runs on Apple smartphones"
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
      "A software license agreement requiring payment of royalties",
      "A security framework requiring hermetic, isolated build environments, parameterless build triggers, and non-falsifiable cryptographic provenance attestations",
      "A standard for building physical server racks",
      "A metric measuring how many lines of code a programmer writes"
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
      "By keeping hardware in an air-conditioned room",
      "By storing cryptographic private keys within tamper-resistant, certified physical cryptographic hardware (FIPS 140-2 Level 3/4), ensuring keys can never be extracted in plaintext",
      "By changing server passwords every morning",
      "HSMs are software programs downloaded from the internet"
    ],
    "correctIndex": 1,
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
      "Throwing computer hardware out of windows",
      "Intentionally injecting synthetic failures (e.g., simulating proxy crashes, network partitions, or storage outages) to verify that the platform fails-closed and maintains data integrity",
      "Allowing unauthorized users into the server room",
      "Writing randomly broken code to test compilers"
    ],
    "correctIndex": 1,
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
      "By testing a single web browser search",
      "By translating network policy rules and CIDR tables into Satisfiability Modulo Theories (SMT) formulas and proving that no network path exists from enclave pods to external internet IPs",
      "By reading the network configuration manual",
      "Network policies cannot be formally verified"
    ],
    "correctIndex": 1,
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
      "By making ten copies of every file on public cloud storage",
      "By splitting data objects into N data blocks and M parity blocks distributed across failure domains; files can be recovered from any N blocks, with cryptographic encryption per chunk",
      "By compressing files into ZIP archives",
      "Erasure coding deletes files to save space"
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
      "A biological tree planted in front of the research facility",
      "A cryptographic data structure where every leaf node contains a hash of a governance event and parent nodes contain hashes of children; any tampering changes the Merkle root hash",
      "A database that overwrites records every month",
      "A spreadsheet shared on an internal intranet"
    ],
    "correctIndex": 1,
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
      "By running an Ethernet cable through a window",
      "By using one-way cryptographic data diodes or scheduled, digitally signed batch sync bundles that pass through automated scanning and quarantine validation gates",
      "By emailing spreadsheets back and forth",
      "Air-gapped zones can never synchronize data"
    ],
    "correctIndex": 1,
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
      "Disabling the computer screen backlight",
      "Enforcing Mandatory Access Control (MAC) policies, disabling unprivileged user namespaces, and restricting available system calls via strict seccomp profiles",
      "Allowing all users to run sudo commands",
      "Installing third-party computer games"
    ],
    "correctIndex": 1,
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
      "Covering the server with physical wool blankets",
      "Generating millions of randomized, boundary-pushing, or malformed input payloads to bombard policy evaluation gates, testing for crashes, memory leaks, or unexpected access grants",
      "Testing software on fuzzy computer monitors",
      "Writing code with deliberate spelling mistakes"
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
      "An architecture where system administrators receive zero training",
      "An architecture utilizing Confidential Computing (AMD SEV-SNP, Intel SGX/TDX) where data is encrypted in memory, preventing cloud host hypervisors or rogue technicians from inspecting microdata",
      "A computer that does not have a keyboard",
      "An architecture that does not use passwords"
    ],
    "correctIndex": 1,
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
      "ISO 14721:2012 (OAIS Reference Model)",
      "ISO 9001",
      "HTML 5.0",
      "IEEE 802.11"
    ],
    "correctIndex": 0,
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
      "By writing notes on paper envelopes",
      "By passing standardized 'traceparent' and 'tracestate' HTTP headers across all service hops, enabling end-to-end reconstruction of distributed request execution paths",
      "By running all programs on the same processor core",
      "Tracing headers are ignored by modern servers"
    ],
    "correctIndex": 1,
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
      "By setting the server on fire",
      "By running automated CI jobs that periodically restore database snapshots to an isolated sandbox, execute integrity assertion test suites, and measure Recovery Time and Point Objectives (RTO/RPO)",
      "By checking if the backup file name ends in .bak",
      "Disaster recovery does not need to be tested"
    ],
    "correctIndex": 1,
    "explanation": "Automated DR tests regularly restore backups in ephemeral sandboxes and verify data integrity, proving that backups are restorable without waiting for a real crisis.",
    "citation": "Disaster Recovery Validation & Automated Resilience Testing in Healthcare",
    "tags": [
      "Disaster Recovery",
      "PITR",
      "RTO/RPO"
    ]
  }
];
