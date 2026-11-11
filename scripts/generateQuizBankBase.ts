import fs from 'fs';
import path from 'path';

interface QuizQuestion {
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

// Helper to create question
function q(
  id: string,
  category: string,
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced',
  question: string,
  options: [string, string, string, string],
  correctIndex: number,
  explanation: string,
  citation: string,
  tags: string[]
): QuizQuestion {
  return {
    id,
    category,
    difficulty,
    question,
    options,
    correctIndex,
    explanation,
    citation,
    tags
  };
}

const questions: QuizQuestion[] = [];

// =========================================================================
// CATEGORY 1: Five Safes & Governance
// =========================================================================

// --- Foundation (15) ---
questions.push(
  q(
    'fsg_f_01',
    'Five Safes & Governance',
    'Foundation',
    'Which of the Five Safes dimensions specifically ensures that researchers possess verified professional credentials and up-to-date Information Governance (IG) training?',
    ['Safe Setting', 'Safe Person', 'Safe Project', 'Safe Data'],
    1,
    'Safe Person ensures that only accredited researchers with verified identities, institutional backing, and current Information Governance certification are granted access.',
    'Digital Economy Act 2017 Part 5 & ONS Research Code of Practice',
    ['Five Safes', 'Accreditation', 'Safe Person']
  ),
  q(
    'fsg_f_02',
    'Five Safes & Governance',
    'Foundation',
    'Under the Eight Caldicott Principles, what is the core requirement of Principle 1?',
    [
      'Justify the purpose(s) for using or transferring confidential information',
      'The duty to share can be as important as the duty to protect patient confidentiality',
      'Inform patients and service users about how their confidential information is used',
      'Use the minimum necessary confidential information'
    ],
    0,
    'Caldicott Principle 1 states that every proposed use or transfer of confidential patient information must be clearly defined, scrutinized, and documented by an appropriate guardian.',
    'National Data Guardian Caldicott Principles (Principles 1–8)',
    ['Caldicott', 'Principle 1', 'Confidentiality']
  ),
  q(
    'fsg_f_03',
    'Five Safes & Governance',
    'Foundation',
    'What is the primary role of Caldicott Principle 8 (introduced in December 2020)?',
    [
      'Mandate weekly cryptographic password rotations for all database users',
      'Inform patients and the public about how their confidential data is used and shared',
      'Require machine learning models to be retrained on synthetic data',
      'Enforce zero physical contact between clinical researchers and server racks'
    ],
    1,
    'Caldicott Principle 8 establishes the affirmative obligation to inform patients and service users about how their confidential data is utilized (public transparency, plain-English registers, and PPIE engagement).',
    'National Data Guardian Review (Principle 8: No Surprises)',
    ['Caldicott', 'Principle 8', 'Transparency']
  ),
  q(
    'fsg_f_04',
    'Five Safes & Governance',
    'Foundation',
    'Which statutory gateway in the UK permits confidential patient information to be processed for medical research without individual consent when consent is unfeasible?',
    [
      'Consumer Rights Act 2015 Section 42',
      'NHS Act 2006 Section 251 (administered by the Confidentiality Advisory Group)',
      'Freedom of Information Act 2000 Section 12',
      'Police and Criminal Evidence Act 1984 Section 61'
    ],
    1,
    'Section 251 of the NHS Act 2006 allows the Secretary of State for Health (advised by the Confidentiality Advisory Group, CAG) to temporarily lift the common law duty of confidentiality for medical research.',
    'NHS Act 2006 § 251 & Health Service (Control of Patient Information) Regulations 2002',
    ['Statutory Gateway', 'Section 251', 'CAG']
  ),
  q(
    'fsg_f_05',
    'Five Safes & Governance',
    'Foundation',
    'Under UK GDPR, what lawful basis pair is standard for university and public health bodies processing patient data for public health research?',
    [
      'Article 6(1)(a) explicit consent and Article 9(2)(a) explicit consent only',
      'Article 6(1)(e) public task and Article 9(2)(j) scientific research / public interest archiving',
      'Article 6(1)(b) contractual necessity and Article 9(2)(b) employment law',
      'Article 6(1)(f) legitimate interests and Article 9(2)(f) legal defence'
    ],
    1,
    'Public authority research platforms rely on Article 6(1)(e) (public interest task) and Article 9(2)(j) (research in the public interest with Article 89(1) technical safeguards).',
    'UK GDPR Articles 6 & 9, Data Protection Act 2018 Section 19',
    ['UK GDPR', 'Lawful Basis', 'Article 6', 'Article 9']
  ),
  q(
    'fsg_f_06',
    'Five Safes & Governance',
    'Foundation',
    'In the Five Safes framework, what does "Safe Setting" mandate for an analytical research environment?',
    [
      'A physical library with quiet study booths and locked filing cabinets',
      'A secure environment (such as an air-gapped enclave or TRE) preventing unauthorized egress or data extraction',
      'A shared cloud drive with open read-write permissions for collaborating universities',
      'A high-speed public FTP server with daily backups'
    ],
    1,
    'Safe Setting guarantees that data is processed within a secure perimeter (e.g., zero WAN egress, virtual desktop infrastructure, bastion jump-hosts) that prevents data exfiltration.',
    'Five Safes Framework & SATRE v1.1 Pillar 2',
    ['Five Safes', 'Safe Setting', 'Enclave']
  ),
  q(
    'fsg_f_07',
    'Five Safes & Governance',
    'Foundation',
    'What does the National Data Opt-Out (NDOO) in NHS England allow patients to do?',
    [
      'Opt out of direct clinical treatment by their general practitioner',
      'Opt out of having their confidential patient data used for research and planning purposes',
      'Prevent their NHS number from being used on internal hospital wristbands',
      'Delete their historic electronic health record from local GP surgeries'
    ],
    1,
    'The National Data Opt-Out enables patients to opt out of their confidential health and care data being used for research and planning purposes beyond their direct individual care.',
    'NHS England National Data Opt-Out Policy Guidance',
    ['NDOO', 'Opt-Out', 'Patient Rights']
  ),
  q(
    'fsg_f_08',
    'Five Safes & Governance',
    'Foundation',
    'What is the purpose of Public, Patient, and Service User Involvement and Engagement (PPIE) in health research governance?',
    [
      'To replace formal legal data protection impact assessments with informal community votes',
      'To incorporate lived experience, review lay data flows, test public benefit, and build public trust',
      'To provide volunteer developers for writing production SQL code',
      'To eliminate the requirement for institutional ethics committee review'
    ],
    1,
    'PPIE ensures that public and patient representatives review the study design, validate that data use aligns with reasonable expectations of privacy, and verify genuine public benefit.',
    'HRA UK Standards for Public Involvement & Caldicott Principle 8',
    ['PPIE', 'Public Engagement', 'Governance']
  ),
  q(
    'fsg_f_09',
    'Five Safes & Governance',
    'Foundation',
    'In the context of the Five Safes, what is the defining criterion of a "Safe Project"?',
    [
      'The project must be completed within 30 days without software bugs',
      'The research design must have documented public benefit, legal clearance, and ethical approval',
      'The project must use exclusively commercial proprietary software',
      'The project must be sponsored by an international venture capital firm'
    ],
    1,
    'Safe Project verifies that the proposed research has clear public benefit, formal ethical clearance (e.g., HRA REC), and adheres to lawful data processing mandates.',
    'Five Safes Framework & HRA Research Ethics Committee Governance',
    ['Five Safes', 'Safe Project', 'Ethics']
  ),
  q(
    'fsg_f_10',
    'Five Safes & Governance',
    'Foundation',
    'Under the UK Data Protection Act 2018, which role is legally responsible for advising the organisation on data protection compliance and monitoring audits?',
    [
      'Senior Information Risk Owner (SIRO)',
      'Data Protection Officer (DPO)',
      'Caldicott Guardian',
      'Chief Technology Officer (CTO)'
    ],
    1,
    'Under UK GDPR Article 37–39 and DPA 2018, the Data Protection Officer (DPO) independently advises the organisation on data protection obligations and acts as point of contact for the ICO.',
    'UK GDPR Article 37–39 & Data Protection Act 2018',
    ['DPO', 'UK GDPR', 'Roles']
  ),
  q(
    'fsg_f_11',
    'Five Safes & Governance',
    'Foundation',
    'What is the distinction between a Caldicott Guardian and a Data Protection Officer (DPO)?',
    [
      'There is no distinction; they are two titles for the exact same statutory role',
      'The Caldicott Guardian champions ethical confidentiality of patient data; the DPO oversees statutory UK GDPR compliance',
      'The Caldicott Guardian is only appointed in private software consultancies',
      'The DPO only handles staff payroll records, not patient health microdata'
    ],
    1,
    'A Caldicott Guardian acts as the conscience of an NHS/social care organisation regarding patient confidentiality and ethical data use; the DPO oversees statutory compliance with data protection legislation.',
    'UK Caldicott Guardian Council Guidance & UK GDPR',
    ['Caldicott Guardian', 'DPO', 'Governance Roles']
  ),
  q(
    'fsg_f_12',
    'Five Safes & Governance',
    'Foundation',
    'What does "Safe Outputs" require before analytical results can be exported from a secure data enclave?',
    [
      'Results must be converted into high-resolution PNG image files',
      'Results must undergo Statistical Disclosure Control (SDC) checks to prevent re-identification of individuals',
      'All numbers in the results must be multiplied by random integers',
      'Outputs must be sent via unencrypted email directly to the lead researcher'
    ],
    1,
    'Safe Outputs requires rigorous Statistical Disclosure Control (SDC) review to eliminate small cell counts, unbinned microdata, or dominant contributors before results leave the enclave.',
    'Five Safes Framework & ONS SDC Guidance for Health Research',
    ['Five Safes', 'Safe Outputs', 'SDC']
  ),
  q(
    'fsg_f_13',
    'Five Safes & Governance',
    'Foundation',
    'Under UK GDPR Article 35, when is a Data Protection Impact Assessment (DPIA) mandatory?',
    [
      'Only when purchasing commercial off-the-shelf mouse pads and keyboards',
      'When processing is likely to result in a high risk to individuals, including large-scale processing of special category health data',
      'Only when an organisation experiences a public data breach reported on national television',
      'Whenever an employee updates their LinkedIn work history'
    ],
    1,
    'Article 35 mandates a DPIA when processing operations involve high risks, specifically large-scale processing of special category personal data such as health, genetic, or biometric data.',
    'UK GDPR Article 35 & ICO DPIA Guidance',
    ['DPIA', 'UK GDPR', 'Risk Assessment']
  ),
  q(
    'fsg_f_14',
    'Five Safes & Governance',
    'Foundation',
    'What is the fundamental difference between pseudonymisation and anonymisation under UK data protection law?',
    [
      'Pseudonymised data remains personal data because it can be re-linked with a separate key; truly anonymised data is not personal data',
      'Pseudonymised data can be published freely online; anonymised data cannot',
      'Anonymisation is temporary; pseudonymisation is permanent and irreversible',
      'There is no legal difference between pseudonymisation and anonymisation'
    ],
    0,
    'Under UK GDPR Recital 26 and Article 4(5), pseudonymised data retains re-identification potential via additional keys and remains personal data. Fully anonymised data falls outside data protection law.',
    'UK GDPR Recital 26 & ICO Anonymisation Code of Practice',
    ['Anonymisation', 'Pseudonymisation', 'UK GDPR']
  ),
  q(
    'fsg_f_15',
    'Five Safes & Governance',
    'Foundation',
    'Which Caldicott Principle states: "The duty to share information for individual care is as important as the duty to protect patient confidentiality"?',
    [
      'Principle 2',
      'Principle 4',
      'Principle 7',
      'Principle 8'
    ],
    2,
    'Caldicott Principle 7 (added following Dame Fiona Caldicott’s 2013 review) highlights that health professionals should have the confidence to share information in the best interests of patients.',
    'Information: To Share Or Not To Share? The Information Governance Review (2013)',
    ['Caldicott', 'Principle 7', 'Duty to Share']
  )
);

// --- Intermediate (15) ---
questions.push(
  q(
    'fsg_i_01',
    'Five Safes & Governance',
    'Intermediate',
    'When a research team seeks to link primary care GP records with secondary care hospital episode statistics (HES), what dual governance approvals are typically required?',
    [
      'Patent office registration and trade union sign-off',
      'HRA Research Ethics Committee (REC) favorable opinion and statutory CAG Section 251 approval (or explicit consent)',
      'A local general practice manager vote and credit bureau clearance',
      'Sole approval by the database software vendor'
    ],
    1,
    'Linking identifiable patient cohorts without universal consent requires statutory Section 251 clearance from CAG (to lift CLDC) alongside an ethical review from an accredited HRA REC.',
    'Health Research Authority (HRA) & Confidentiality Advisory Group (CAG) Dual Review Framework',
    ['Linkage', 'Section 251', 'HRA REC']
  ),
  q(
    'fsg_i_02',
    'Five Safes & Governance',
    'Intermediate',
    'How does Part 5, Chapter 5 of the Digital Economy Act 2017 interact with health and social care research in the UK?',
    [
      'It grants blanket public access to download all hospital medical records without authentication',
      'It provides a statutory framework for public authorities to share non-health administrative data with accredited researchers via accredited processors (UKSA)',
      'It repeals the Data Protection Act 2018 for medical software startups',
      'It requires all doctors to publish raw patient notes on GitHub'
    ],
    1,
    'Part 5 of the Digital Economy Act 2017 establishes accreditation for researchers, projects, and secure processing environments through the UK Statistics Authority (UKSA) for public authority data sharing.',
    'Digital Economy Act 2017 Part 5, Chapter 5 (Sections 64–73)',
    ['DEA 2017', 'UKSA', 'Accreditation']
  ),
  q(
    'fsg_i_03',
    'Five Safes & Governance',
    'Intermediate',
    'Under the ICO Anonymisation Code of Practice, what is the "motivated intruder" test?',
    [
      'A physical security test where security guards attempt to pick enclave server room door locks',
      'An assessment of whether a reasonably competent person with motivation, public databases, and investigative tools could re-identify an individual',
      'A software penetration test aimed at disabling web server firewalls',
      'A psychological evaluation required for all accredited research applicants'
    ],
    1,
    'The motivated intruder test assesses whether someone without prior insider knowledge, but reasonably motivated, could re-identify individuals by cross-referencing available records.',
    'ICO Anonymisation and Pseudonymisation Guidance & Code of Practice',
    ['Motivated Intruder', 'Re-identification', 'ICO']
  ),
  q(
    'fsg_i_04',
    'Five Safes & Governance',
    'Intermediate',
    'What is Privacy-Preserving Record Linkage (PPRL) using cryptographic Bloom filters designed to achieve?',
    [
      'Compressing large radiology DICOM images for rapid browser display',
      'Enabling distinct healthcare databases to link records of the same patient without either site revealing clear-text identifiers',
      'Encrypting hard drives to protect against laptop hardware theft',
      'Generating synthetic patient clinical notes using natural language models'
    ],
    1,
    'PPRL maps identifiable tokens (e.g., name, birth date) into bit-vector Bloom filters with cryptographic hashing, enabling mathematical similarity matching across silos without disclosing clear-text PII.',
    'International Journal of Population Data Science (PPRL in Healthcare Research)',
    ['PPRL', 'Bloom Filters', 'Linkage']
  ),
  q(
    'fsg_i_05',
    'Five Safes & Governance',
    'Intermediate',
    'Under UK GDPR Article 33, within what timeframe must a personal data breach posing a risk to individuals be reported to the Information Commissioner’s Office (ICO)?',
    [
      'Within 24 hours of first suspicion',
      'Without undue delay and, where feasible, not later than 72 hours after becoming aware of it',
      'Within 30 calendar days following internal board approval',
      'Only during the annual data security compliance audit'
    ],
    1,
    'UK GDPR Article 33 requires data controllers to notify the ICO of a personal data breach without undue delay and within 72 hours of becoming aware of it, unless unlikely to result in a risk to rights and freedoms.',
    'UK GDPR Article 33 & ICO Breach Notification Protocol',
    ['Breach Notification', 'UK GDPR', '72 Hours']
  ),
  q(
    'fsg_i_06',
    'Five Safes & Governance',
    'Intermediate',
    'What role does the Senior Information Risk Owner (SIRO) play in health and care organisations?',
    [
      'The SIRO writes all database indexing and SQL query scripts for clinical trials',
      'The SIRO is an Executive Director who takes overall strategic ownership of information risk across the organization',
      'The SIRO handles daily visitor badge printing at hospital reception desks',
      'The SIRO acts as the legal counsel representing patients in clinical negligence claims'
    ],
    1,
    'The SIRO is a board-level executive responsible for understanding how strategic business goals may be impacted by information risks and overseeing the risk appetite and incident response.',
    'NHS England Information Governance Framework & SIRO Guidance',
    ['SIRO', 'Information Risk', 'Executive Governance']
  ),
  q(
    'fsg_i_07',
    'Five Safes & Governance',
    'Intermediate',
    'How should a research platform operationalize Caldicott Principle 8 (Public Transparency) under HDR UK Gateway standards?',
    [
      'By publishing an unredacted copy of every patient’s medical chart on a public website',
      'By publishing a standardized, machine-readable Public Data Use Register detailing project title, applicants, data assets, public benefit, and lay summaries',
      'By sending a monthly physical postcard to every registered UK resident',
      'By requiring all researchers to broadcast their computer screens live on social media'
    ],
    1,
    'The HDR UK Data Use Register standard requires publishing structured metadata for all approved data access requests: research questions, data assets utilized, public benefit statement, and lay summaries.',
    'HDR UK National Data Use Register Standard & Caldicott Principle 8',
    ['Data Use Register', 'HDR UK', 'Public Transparency']
  ),
  q(
    'fsg_i_08',
    'Five Safes & Governance',
    'Intermediate',
    'What is the legal effect of a Common Law Duty of Confidentiality (CLDC) breach, even if UK GDPR lawful basis exists?',
    [
      'No legal consequence; UK GDPR automatically supersedes the common law duty in all circumstances',
      'The processing remains unlawful; UK GDPR and CLDC are separate legal requirements that must both be satisfied',
      'The researcher is automatically exempt from all future audits',
      'The data controller is given a 6-month grace period to retroactively seek consent'
    ],
    1,
    'In the UK, data protection legislation (UK GDPR / DPA 2018) and the Common Law Duty of Confidentiality operate concurrently. Having a GDPR lawful basis does not override the common law duty without consent or statutory gateway.',
    'NHS England Transformation Directorate Information Governance Guidance on CLDC',
    ['CLDC', 'Common Law', 'UK GDPR']
  ),
  q(
    'fsg_i_09',
    'Five Safes & Governance',
    'Intermediate',
    'In a federated analytics network (e.g., OpenSAFELY or OHDSI OMOP), how does the governance posture differ from a centralized data repository?',
    [
      'Federated models eliminate all security requirements because no data is involved',
      'Data remains behind local hospital firewalls; only aggregated code queries and non-identifiable summary outputs cross organizational boundaries',
      'Federated networks require every patient to have a personal software server at home',
      'Federated analytics is illegal under UK health regulations'
    ],
    1,
    'Federated analytics moves the analytical code to the data rather than pooling patient microdata into a central repository, drastically reducing centralized re-identification exposure.',
    'Goldacre Review (Better, Broader, Safer: Using Health Data for Research and Analysis, 2022)',
    ['Federated Analytics', 'OpenSAFELY', 'Governance Architecture']
  ),
  q(
    'fsg_i_10',
    'Five Safes & Governance',
    'Intermediate',
    'What is a Data Access Agreement (DAA) or Data Sharing Agreement (DSA) legally designed to govern?',
    [
      'The purchase price of server hardware and graphics processing units',
      'The terms, approved purpose, security safeguards, permitted personnel, and breach liabilities between data controllers and recipients',
      'The copyright ownership of open-source Python packages used by researchers',
      'The internet speed provided by local broadband telecommunications providers'
    ],
    1,
    'A DSA/DAA sets out the shared purpose, legal basis, data minimization specifications, transfer security, audit rights, and termination procedures between participating data controllers.',
    'ICO Data Sharing Code of Practice (Statutory Code under DPA 2018 § 121)',
    ['Data Sharing Agreement', 'Contracts', 'ICO Code']
  ),
  q(
    'fsg_i_11',
    'Five Safes & Governance',
    'Intermediate',
    'Under what specific condition can a commercial life sciences company access data held within an NHS Secure Data Environment (SDE)?',
    [
      'Whenever the company pays the standard list price to download the full patient microdata database to their private servers',
      'Only when operating inside the SDE on an accredited, approved project with clear NHS public benefit and no microdata egress',
      'Commercial companies are strictly forbidden by UK law from ever analyzing health data under any circumstances',
      'Only if all company executives hold active medical licenses in the UK'
    ],
    1,
    'Commercial organizations can analyze NHS data within SDEs/TREs, provided the project is approved, accredited, demonstrates clear public and healthcare benefit, and enforces zero raw microdata egress.',
    'NHS England Data for R&D Programme: Guidelines for Working with Commercial Partners',
    ['Commercial Access', 'NHS SDE', 'Public Benefit']
  ),
  q(
    'fsg_i_12',
    'Five Safes & Governance',
    'Intermediate',
    'When a project’s research protocol expands to investigate an entirely new disease cohort not covered in the original HRA REC application, what is the required governance step?',
    [
      'Continue research immediately and update documentation after publication',
      'Submit a formal substantial amendment to the HRA Research Ethics Committee and obtain favorable opinion before accessing the new cohort',
      'Delete the original ethical clearance and conduct the project without ethics oversight',
      'Notify the software developer to increase database storage capacity'
    ],
    1,
    'Under UK Governance Arrangements for Research Ethics Committees (GAfREC), any significant change to study population, objectives, or methodology requires a formal substantial amendment approval.',
    'Governance Arrangements for Research Ethics Committees (GAfREC) § 5.8',
    ['HRA Amendment', 'REC', 'Ethics Governance']
  ),
  q(
    'fsg_i_13',
    'Five Safes & Governance',
    'Intermediate',
    'What is the function of an independent Data Access Advisory Group (DAAG) or Data Access Committee (DAC)?',
    [
      'To design the graphic logo and marketing materials for the research platform',
      'To impartially evaluate whether data access applications fulfill public benefit, ethical, and technical governance standards',
      'To manage the physical payroll of university postdoctoral researchers',
      'To replace the High Court in prosecuting criminal data theft cases'
    ],
    1,
    'A DAAG/DAC provides independent, multi-disciplinary scrutiny of data applications, advising data custodians on whether requests meet ethical, legal, and public benefit requirements.',
    'NHS England Data Access Advisory Group Terms of Reference',
    ['DAAG', 'DAC', 'Governance Review']
  ),
  q(
    'fsg_i_14',
    'Five Safes & Governance',
    'Intermediate',
    'What is the significance of the "Safe Data" principle regarding data minimization under UK GDPR Article 5(1)(c)?',
    [
      'All available clinical variables should be pooled together in case they become useful in the future',
      'Data accessed must be adequate, relevant, and limited to what is strictly necessary in relation to the approved research purposes',
      'Data must be stored on at least five distinct physical hard drives simultaneously',
      'Researchers must only use data collected within the previous 7 calendar days'
    ],
    1,
    'UK GDPR Article 5(1)(c) enforces data minimization: the Safe Data tier ensures only the exact fields and cohorts justified by the study protocol are made available to investigators.',
    'UK GDPR Article 5(1)(c) & Caldicott Principle 3 (Minimum Necessary)',
    ['Data Minimization', 'UK GDPR', 'Safe Data']
  ),
  q(
    'fsg_i_15',
    'Five Safes & Governance',
    'Intermediate',
    'What was the primary conclusion of the Goldacre Review (2022) regarding health data access for research across the NHS?',
    [
      'Raw identifiable patient records should be emailed as encrypted ZIP archives to universities upon request',
      'Secure Data Environments (SDEs / TREs) should become the default mechanism for health data access, replacing the dissemination of cut-down data extracts',
      'All health data research should be discontinued to eliminate cybersecurity risks entirely',
      'Cloud computing should be banned across all UK medical facilities'
    ],
    1,
    'The Goldacre Review strongly recommended moving from data dissemination (sending data files out to researchers) to data access within secure, transparent Secure Data Environments (TREs/SDEs).',
    'Goldacre Review (2022: Better, Broader, Safer)',
    ['Goldacre Review', 'TRE', 'Secure Data Environments']
  )
);

// --- Advanced (15) ---
questions.push(
  q(
    'fsg_a_01',
    'Five Safes & Governance',
    'Advanced',
    'In quantitative re-identification risk modeling, what distinguishes the "Prosecutor Risk" model from the "Journalist Risk" model?',
    [
      'The prosecutor uses physical intimidation; the journalist uses social media leaks',
      'The Prosecutor model assumes the attacker knows a specific target individual is in the dataset; the Journalist model assumes the attacker does not know if the target is present',
      'The Prosecutor model only applies to criminal court records; the Journalist model applies to tabloid press releases',
      'There is no mathematical difference; both calculate identical hypergeometric probabilities'
    ],
    1,
    'Prosecutor risk calculates the probability of re-identification given the adversary knows the target is in the data. Journalist risk calculates the probability when the adversary does not know if the target is present.',
    'El Emam et al. (Guide to the De-Identification of Personal Health Information)',
    ['Prosecutor Risk', 'Journalist Risk', 'Re-identification Modeling']
  ),
  q(
    'fsg_a_02',
    'Five Safes & Governance',
    'Advanced',
    'How does W3C PROV-O ontology integration establish non-repudiable audit lineage for governance decisions in a policy-as-code platform?',
    [
      'By converting all decisions into MP3 audio recordings for radio broadcast',
      'By formally linking Entities (data subsets, queries), Activities (evaluations, approvals), and Agents (researchers, policies) via prov:wasGeneratedBy and prov:wasAssociatedWith',
      'By automatically deleting all previous audit logs whenever a new decision is recorded',
      'By using proprietary blockchain tokens that require continuous cryptocurrency mining'
    ],
    1,
    'W3C PROV-O provides an interoperable semantic standard to capture provenance: who authorized what, using which specific policy version, at what exact timestamp, and against which data slice.',
    'W3C PROV-O: The PROV Data Model Recommendation (2013)',
    ['PROV-O', 'Lineage', 'Auditability']
  ),
  q(
    'fsg_a_03',
    'Five Safes & Governance',
    'Advanced',
    'When evaluating differential privacy within an analytical enclave query engine, what does the parameter $\\varepsilon$ (epsilon) mathematically govern?',
    [
      'The maximum number of seconds a database query is allowed to execute',
      'The privacy loss budget: the upper bound on the log-ratio of output probabilities between two neighbouring datasets differing by a single individual',
      'The total number of researchers permitted inside the building at one time',
      'The physical clock drift between distributed database nodes'
    ],
    1,
    'In differential privacy, $\\varepsilon$ quantifies the worst-case privacy leakage: smaller $\\varepsilon$ values introduce higher noise and greater privacy, while larger values provide higher statistical utility.',
    'Dwork & Roth (The Algorithmic Foundations of Differential Privacy, 2014)',
    ['Differential Privacy', 'Epsilon', 'Privacy Budget']
  ),
  q(
    'fsg_a_04',
    'Five Safes & Governance',
    'Advanced',
    'Under UK GDPR Recital 35 and Article 9, what exceptional governance challenge distinguishes genomic data from standard episodic health records?',
    [
      'Genomic data files are too small to be stored on modern SSD drives',
      'Genomic sequence data is inherently unique, permanently immutable, and carries hereditary identifiable inferences about biological family members',
      'Genomic data is classified as open-source public domain software by international treaty',
      'Genomic data expires and becomes invalid exactly 48 hours after sequencing'
    ],
    1,
    'Genomic data is uniquely identifiable down to the individual (with rare variants acting as fingerprints) and reveals health predispositions about unconsented biological relatives, creating unique familial privacy risks.',
    'UK GDPR Recital 35 & Information Commissioner’s Office Guidance on Genetic Data',
    ['Genomics', 'Special Category', 'Familial Privacy']
  ),
  q(
    'fsg_a_05',
    'Five Safes & Governance',
    'Advanced',
    'What is the core requirement of a Zero-Trust enclave architecture operating under SATRE v1.1 standards?',
    [
      'Assume all employees are malicious and disable all computer keyboards',
      'Never trust, always verify: enforce mutual TLS, ephemeral credentials, granular micro-segmentation, and continuous policy evaluation at every access hop',
      'Prohibit all data analysis and replace researchers with mechanical paper punch-cards',
      'Rely exclusively on perimeter corporate VPN firewalls without internal access controls'
    ],
    1,
    'SATRE v1.1 and Zero Trust mandate that perimeter defenses are insufficient: every request must authenticate, authorize, and evaluate policy dynamically based on identity, device posture, and context.',
    'Standard Architecture for Trusted Research Environments (SATRE v1.1 Pillar 2: Computing Infrastructure)',
    ['Zero Trust', 'SATRE', 'Micro-segmentation']
  ),
  q(
    'fsg_a_06',
    'Five Safes & Governance',
    'Advanced',
    'Under the UK GDPR Article 22, what safeguard is mandated when analytical algorithms or AI models perform automated decision-making producing legal or similarly significant effects?',
    [
      'The algorithm must run on an open-source Linux kernel',
      'The individual has the right to obtain human intervention, express their point of view, and contest the automated decision',
      'The algorithm’s neural network weights must be printed in the national press',
      'Automated processing of any kind is unconditionally forbidden across the United Kingdom'
    ],
    1,
    'Article 22 gives data subjects the right not to be subject to solely automated decisions with legal or significant effects without explicit exceptions and safeguards, including the right to meaningful human intervention.',
    'UK GDPR Article 22 & ICO Guidance on Automated Decision-Making and Profiling',
    ['Article 22', 'Automated Decision Making', 'Human Intervention']
  ),
  q(
    'fsg_a_07',
    'Five Safes & Governance',
    'Advanced',
    'In a formal security assessment, what vulnerability does a "differencing attack" exploit against a statistical query interface?',
    [
      'Physical temperature differences between adjacent CPU cores during intense computation',
      'Issuing two queries with slightly differing selection criteria (e.g., $N$ patients vs $N-1$ patients) and subtracting the results to isolate a single individual’s attributes',
      'Exploiting clock skew between NTP servers to forge cryptographic authorization tokens',
      'Comparing differences in software package versions across GitHub branches'
    ],
    1,
    'Differencing attacks combine aggregate queries over overlapping cohorts to calculate the precise difference, exposing attributes of the single individual excluded from or included in the second query.',
    'Hundepool et al. (Statistical Disclosure Control, Wiley 2012)',
    ['Differencing Attack', 'SDC', 'Re-identification']
  ),
  q(
    'fsg_a_08',
    'Five Safes & Governance',
    'Advanced',
    'How does W3C Verifiable Credentials (VC) technology modernize federated researcher accreditation across multiple regional research environments?',
    [
      'By printing laminated plastic ID cards with holographic foil stickers',
      'By issuing cryptographically signed, tamper-evident digital credentials (e.g., ONS Accredited Researcher status) that can be verified instantaneously without phone calls or paper passports',
      'By requiring researchers to deposit physical passport documents in a bank vault',
      'By replacing digital authentication with retina scanning at hospital gates'
    ],
    1,
    'W3C Verifiable Credentials allow accreditation bodies (like UKSA/ONS or universities) to issue cryptographically verifiable credentials that external enclaves can validate offline via decentralized public keys.',
    'W3C Verifiable Credentials Data Model v1.1 Recommendation',
    ['Verifiable Credentials', 'Federation', 'Safe Person']
  ),
  q(
    'fsg_a_09',
    'Five Safes & Governance',
    'Advanced',
    'What is the legal status of high-fidelity synthetic health data under UK data protection law when evaluated against residual re-identification risk?',
    [
      'Synthetic data is automatically classified as public domain text with zero legal restrictions under all circumstances',
      'If the synthetic generation model memorizes real patient microdata or permits statistical inference of real attributes, it may legally still constitute personal data',
      'Synthetic data is classified as medical hardware under the UK Medical Devices Regulations 2002',
      'Generating synthetic data is considered copyright infringement under UK patent statutes'
    ],
    1,
    'Synthetic data is only truly anonymous if individuals cannot be re-identified or inferred from it; if generative models overfit or leak training records, the outputs may remain personal data under UK GDPR.',
    'ICO & The Alan Turing Institute: Synthetic Data and Privacy Evaluation Report',
    ['Synthetic Data', 'Overfitting', 'Legal Status']
  ),
  q(
    'fsg_a_10',
    'Five Safes & Governance',
    'Advanced',
    'How should a break-glass emergency access procedure be architected in a policy-as-code clinical data platform to maintain compliance with Caldicott standards?',
    [
      'Store administrative passwords on a sticky note attached to the computer screen',
      'Allow instantaneous elevated access upon entering a justified operational reason, while automatically triggering immutable audit logging, SIRO alerting, and post-hoc clinical review',
      'Disable all system logging during the emergency to maximize server execution speed',
      'Require three judges to sign a paper warrant before any database can be unlocked'
    ],
    1,
    'Break-glass mechanisms must prioritize patient care when urgent access is required, while enforcing strict non-repudiable audit trails, real-time alerting to guardians, and mandatory post-incident justification review.',
    'NHS England Digital Security & Caldicott Guardian Break-Glass Protocols',
    ['Break-Glass', 'Auditability', 'Emergency Access']
  ),
  q(
    'fsg_a_11',
    'Five Safes & Governance',
    'Advanced',
    'Under what technical and contractual conditions can microdata access be granted across international research consortia without violating UK GDPR Chapter V?',
    [
      'Simply sending data over an encrypted SSH connection to any foreign university server',
      'Ensuring transfers occur to countries with UK adequacy regulations, or implementing Standard Contractual Clauses (SCCs) / International Data Transfer Agreements (IDTA) with supplementary technical measures',
      'Having the researcher sign a declaration that foreign laws will not be obeyed',
      'International transfers of research data are permanently illegal under UK statutes'
    ],
    1,
    'Chapter V requires either an adequacy decision or appropriate safeguards such as the UK International Data Transfer Addendum to the EU SCCs, backed by technical measures such as end-to-end encryption and enclave processing.',
    'UK GDPR Chapter V (Articles 44–50) & ICO International Transfer Guidance',
    ['International Transfer', 'Chapter V', 'IDTA']
  ),
  q(
    'fsg_a_12',
    'Five Safes & Governance',
    'Advanced',
    'In multi-party computation (MPC) applied to health data linkage, what cryptographic guarantee is provided to participating institutions?',
    [
      'All institutions must share their raw plaintext database with a trusted third-party escrow server',
      'Participating parties compute a joint mathematical function over their inputs while keeping their private data inputs hidden from each other',
      'MPC guarantees that data processing runs ten times faster than standard SQL queries',
      'MPC replaces the need for any data encryption algorithms'
    ],
    1,
    'MPC protocols (e.g., secret sharing, garbled circuits) allow multiple parties to jointly evaluate functions (such as survival curves or cohort overlap) without any party learning the others’ confidential inputs.',
    'Evans, Kolesnikov, Rosulek (A Pragmatic Introduction to Secure Multi-Party Computation, 2018)',
    ['MPC', 'Multi-Party Computation', 'Cryptography']
  ),
  q(
    'fsg_a_13',
    'Five Safes & Governance',
    'Advanced',
    'What does the "Marketer Risk" model evaluate in quantitative statistical disclosure assessment?',
    [
      'The risk of a pharmaceutical marketing team contacting a physician to advertise medical supplies',
      'The proportion of the population that can be successfully re-identified by matching a sample against a commercial or public voter marketing register',
      'The risk of an online advertisement failing to reach its target audience demographic',
      'The probability that a research paper is cited in commercial trade journals'
    ],
    1,
    'Marketer risk assesses the expected number of correct re-identifications an attacker could achieve when attempting to match an entire population registry against the de-identified dataset.',
    'El Emam (Evaluating Risk of Re-identification in Health Data Releases, 2011)',
    ['Marketer Risk', 'SDC', 'Population Linkage']
  ),
  q(
    'fsg_a_14',
    'Five Safes & Governance',
    'Advanced',
    'How does W3C RDF Dataset Canonicalization (URDNA2015) enable cryptographic signing of semantic governance policies?',
    [
      'By converting all RDF triples into a compressed ZIP file',
      'By computing a deterministic, canonical representation of an RDF graph regardless of blank node labeling or triple ordering, allowing SHA-256 digital signature verification',
      'By translating SPARQL queries into binary machine code for x86 processors',
      'By registering the RDF schema on a commercial copyright database'
    ],
    1,
    'Graphs can be serialized in arbitrary line orders with varied blank node identifiers; URDNA2015 standardizes graph representation so that digital signatures over semantic governance policies remain verifiable.',
    'W3C RDF Dataset Canonicalization (URDNA2015 / RFC 8785)',
    ['Canonicalization', 'URDNA2015', 'Signatures']
  ),
  q(
    'fsg_a_15',
    'Five Safes & Governance',
    'Advanced',
    'When implementing continuous compliance telemetry in a policy-as-code environment, why is write-once-read-many (WORM) storage mandated for audit streams?',
    [
      'To prevent hard drives from overheating during intense read operations',
      'To guarantee that audit trails cannot be altered, overwritten, or erased by compromised administrator accounts or malicious insider adversaries',
      'To reduce the physical cost of storage media by 90 percent',
      'To allow multiple researchers to write to the same file simultaneously without lock contention'
    ],
    1,
    'WORM storage guarantees audit trail immutability: even privileged administrative accounts cannot tamper with, rewrite, or backdate compliance event logs following an intrusion or unauthorized access event.',
    'SATRE v1.1 Pillar 4 (Governance & Auditing) & NHS DSPT Standard 1.5',
    ['WORM Storage', 'Immutability', 'Audit Logs']
  )
);

// We will continue generating the remaining categories in the same meticulous fashion!
// Let's create the full data bank file.

console.log(`Loaded ${questions.length} questions so far...`);

// Let's write the node script that generates the complete 270 questions!
fs.writeFileSync('/tmp/quiz_builder_base.json', JSON.stringify(questions, null, 2));
