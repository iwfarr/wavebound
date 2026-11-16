import type { QuizQuestion } from './quizBank';

export const ISO_DEA_QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // FOUNDATION (15 Questions)
  // ==========================================
  {
    id: 'iso27k_f_01',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Under ISO/IEC 27001:2022 Clause 5, which accountability role approves the ISMS scope, signs the top-level Information Security Policy, sets organizational risk appetite, and chairs Management Reviews?',
    options: [
      'Executive Sponsor (Top Management), who bears overall governance accountability and resource authority',
      'Independent Internal Auditor, who reviews Clauses 4–10 evidence prior to external Stage 1 assessment',
      'External UKAS Certification Body Lead Assessor, who issues the final 3-year ISO/IEC 27001 certificate',
      'Site Reliability Engineer on call, who deploys Kubernetes network policies and daily container vulnerability scans'
    ],
    correctIndex: 0,
    explanation: 'ISO/IEC 27001:2022 Clause 5 assigns ultimate accountability to Top Management (Executive Sponsor) to establish policy, approve scope and risk appetite, allocate resources, and chair Management Reviews.',
    citation: 'ISO/IEC 27001:2022 Clause 5.1–5.3 & Governance Role Framework',
    tags: ['ISO 27001:2022', 'Clause 5', 'Executive Sponsor', 'Roles']
  },
  {
    id: 'iso27k_f_02',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What is the strict independence requirement placed on the Internal Auditor under ISO/IEC 27001:2022 Clause 9.2?',
    options: [
      'The internal auditor must operate as a permanent full-time software engineer within the core platform DevOps team',
      'The internal auditor must remain objective and impartial and MUST NOT audit their own operational or policy work',
      'The internal auditor must approve every production pull request before automated CI/CD container builds execute',
      'The internal auditor must sign commercial cloud hosting contracts alongside the external Certification Body assessor'
    ],
    correctIndex: 1,
    explanation: 'Clause 9.2 requires objectivity and impartiality in internal audits: an internal auditor cannot audit controls or processes they personally own or implemented.',
    citation: 'ISO/IEC 27001:2022 Clause 9.2.2 (Internal Audit Programme)',
    tags: ['Internal Audit', 'Independence', 'Clause 9.2']
  },
  {
    id: 'iso27k_f_03',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What is the typical timeline for an SME or single business unit operating a data platform to progress from initial ISO/IEC 27001:2022 scoping to accredited certification?',
    options: [
      'Typically 2 to 4 weeks from initial kickoff, because Stage 1 and Stage 2 audits require policies without live evidence',
      'Typically 36 to 48 months, matching the length of a full three-year ISO/IEC 27001 certificate recertification cycle',
      'Typically 16 to 24 weeks for an SME or single business unit, and 6 to 12 months for multi-site enterprises',
      'Typically 48 to 72 hours once automated vulnerability scanning and cloud disk encryption are enabled in Terraform'
    ],
    correctIndex: 2,
    explanation: 'Most SMEs or single-unit platforms reach Stage 2 certification in 16–24 weeks (including 60–90 days of operational evidence collection), whereas multi-site enterprises typically take 6–12 months.',
    citation: 'ISO/IEC 27001:2022 Implementation Playbook & Stage 1/2 Timeline',
    tags: ['Implementation Timeline', 'Certification', 'Playbook']
  },
  {
    id: 'iso27k_f_04',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Why should an organization keep its initial ISO/IEC 27001:2022 ISMS Scope Statement (Clause 4.3) tightly focused around its core data platform or service?',
    options: [
      'Because ISO/IEC 27001 strictly prohibits including more than one cloud VPC or two engineering teams in a single certificate',
      'Because scoping out non-essential corporate printers and unlinked office Wi-Fi hides security vulnerabilities from external pen testers',
      'Because wider corporate scoping exempts the organization from publishing a Statement of Applicability across Annex A controls',
      'Because locking boundaries tightly around core products, cloud environments, and support teams avoids unnecessary audit complexity and cost'
    ],
    correctIndex: 3,
    explanation: 'A tightly bounded Clause 4.3 Scope Statement concentrates certification effort on the systems, data flows, and teams that protect sensitive assets without pulling unrelated legacy office networks into audit scope.',
    citation: 'ISO/IEC 27001:2022 Clause 4.3 (Determining the Scope of the ISMS)',
    tags: ['Clause 4.3', 'ISMS Scope', 'Phase 1']
  },
  {
    id: 'iso27k_f_05',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What additional requirement was added to Clauses 4.1 and 4.2 of ISO/IEC 27001:2022 by Amendment 1:2024?',
    options: [
      'Organizations must determine whether climate change is a relevant issue affecting context, facilities, or cloud continuity and address related interested-party requirements',
      'Organizations must mandate zero-trust WebAssembly execution inside every Kubernetes sidecar container prior to Stage 1 audit',
      'Organizations must purchase mandatory carbon-offset credits from an accredited UK registry before hosting health datasets',
      'Organizations must eliminate all physical datacenter controls from Annex A.7 whenever workloads run on sovereign UK public clouds'
    ],
    correctIndex: 0,
    explanation: 'ISO/IEC 27001:2022/Amd 1:2024 requires every organization to assess whether climate change is a relevant context issue (Clause 4.1) and whether interested parties have climate-related requirements (Clause 4.2), such as extreme-weather facility or cloud resilience.',
    citation: 'ISO/IEC 27001:2022/Amd 1:2024 (Climate Action Changes, Clauses 4.1–4.2)',
    tags: ['Amendment 1:2024', 'Climate Change', 'Clause 4.1', 'Clause 4.2']
  },
  {
    id: 'iso27k_f_06',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'How many controls exist in ISO/IEC 27001:2022 Annex A, and into which four themes are they structured?',
    options: [
      '114 controls distributed across 14 security domains covering A.5 Information Security Policies through A.18 Compliance',
      '93 controls organized across four themes: Organizational (A.5), People (A.6), Physical (A.7), and Technological (A.8)',
      '64 controls split evenly between Administrative Governance (A.1) and Cryptographic Technical Enforcements (A.2)',
      '128 controls mapped strictly to UK NHS Data Security Standards 1 through 10 and Statutory Section 251 CAG rules'
    ],
    correctIndex: 1,
    explanation: 'ISO/IEC 27001:2022 consolidated the 114 controls / 14 domains of the 2013 edition into 93 controls grouped across 4 themes: A.5 Organizational (37), A.6 People (8), A.7 Physical (14), and A.8 Technological (34).',
    citation: 'ISO/IEC 27001:2022 Annex A Reference Controls',
    tags: ['Annex A', '93 Controls', 'ISO 27001:2022']
  },
  {
    id: 'iso27k_f_07',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What must be documented in the Statement of Applicability (SoA) under ISO/IEC 27001:2022 Clause 6.1.3(d)?',
    options: [
      'Only the technical Annex A.8 controls currently automated in CI/CD pipelines, omitting excluded physical or HR controls',
      'A list of commercial cybersecurity software vendors alongside annual procurement licensing expenditures for Management Review',
      'All 93 Annex A controls, whether each is included or excluded with justification, implementation status, and supporting control owners/evidence',
      'An executive marketing summary assuring external data controllers that zero critical vulnerabilities remain in production clusters'
    ],
    correctIndex: 2,
    explanation: 'Clause 6.1.3(d) mandates that the Statement of Applicability contains all necessary controls from Annex A, justifications for inclusions and exclusions, and whether controls are implemented.',
    citation: 'ISO/IEC 27001:2022 Clause 6.1.3(d) (Statement of Applicability)',
    tags: ['Statement of Applicability', 'SoA', 'Clause 6.1.3']
  },
  {
    id: 'iso27k_f_08',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Which Clause of ISO/IEC 27001:2022 requires maintaining Evidence of Competence (role descriptions, CVs/certifications, and security training completion logs)?',
    options: [
      'Clause 4.3 (Determining the Scope of the ISMS across physical offices and cloud accounts)',
      'Clause 6.1.2 (Information Security Risk Assessment methodology and risk acceptance criteria)',
      'Clause 10.2 (Nonconformity and Corrective Action root-cause investigation register)',
      'Clause 7.2 (Competence of personnel whose work affects information security performance)'
    ],
    correctIndex: 3,
    explanation: 'Clause 7.2 requires organizations to determine necessary competence for security-impacting roles, ensure personnel are competent via education/training/experience, and retain documented evidence.',
    citation: 'ISO/IEC 27001:2022 Clause 7.2 (Competence)',
    tags: ['Clause 7.2', 'Competence', 'Mandatory Artifacts']
  },
  {
    id: 'iso27k_f_09',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What is the purpose of Clause 6.2 Information Security Objectives in a data intelligence platform?',
    options: [
      'To establish 3–5 concrete, measurable security KPIs (such as critical vulnerability remediation <= 14 days and 100% MFA coverage) with owners and timelines',
      'To replace quantitative risk scoring with qualitative aspirational mission statements exempt from quarterly tracking',
      'To record ad-hoc software feature backlog estimates during agile sprint planning across product engineering squads',
      'To satisfy UK Freedom of Information Act Section 19 duties by publishing raw user IP addresses every quarter'
    ],
    correctIndex: 0,
    explanation: 'Clause 6.2 requires measurable security objectives aligned with policy, specifying what will be done, resources required, responsible owners, completion dates, and how results are evaluated.',
    citation: 'ISO/IEC 27001:2022 Clause 6.2 (Information Security Objectives)',
    tags: ['Clause 6.2', 'KPIs', 'Security Objectives']
  },
  {
    id: 'iso27k_f_10',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What is the primary distinction between a Stage 1 Audit and a Stage 2 Audit conducted by an accredited ISO/IEC 27001 Certification Body?',
    options: [
      'Stage 1 evaluates internal financial budgets exclusively, whereas Stage 2 reviews software engineering velocity and uptime metrics',
      'Stage 1 reviews mandatory ISMS documentation readiness, whereas Stage 2 interviews staff, inspects live configurations, and samples operational evidence',
      'Stage 1 is performed entirely by the internal engineering team, whereas Stage 2 is conducted by anonymous patient representatives',
      'Stage 1 grants a full 3-year certificate immediately, whereas Stage 2 occurs optionally during Year 3 recertification'
    ],
    correctIndex: 1,
    explanation: 'Stage 1 is the documentation readiness audit checking Scope, Policy, Risk/RTP, SoA, Internal Audit, and Management Review minutes; Stage 2 (typically 2–6 weeks later) verifies operational effectiveness via interviews, system inspection, and evidence sampling.',
    citation: 'ISO/IEC 17021-1 & ISO/IEC 27001 Stage 1 / Stage 2 Certification Process',
    tags: ['Stage 1 Audit', 'Stage 2 Audit', 'Certification Body']
  },
  {
    id: 'iso27k_f_11',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Who is responsible in daily operations for implementing Annex A controls and producing timestamped audit evidence (tickets, access reviews, patching logs)?',
    options: [
      'The external UKAS Certification Body lead auditor conducting annual surveillance inspections',
      'Only the Information Security Manager, acting independently without engineering, HR, IT, or legal participation',
      'Control Owners across Engineering, IT, HR, Legal, and Facilities embedded in daily platform workflows',
      'Autonomous AI monitoring assistants operating without named human institutional sponsorship'
    ],
    correctIndex: 2,
    explanation: 'Control Owners across Engineering, IT, HR, Legal, and Facilities implement Annex A controls in day-to-day operations and generate the timestamped evidence auditors sample during Stage 2.',
    citation: 'ISO/IEC 27001:2022 Governance & Core Roles Framework',
    tags: ['Control Owners', 'Roles', 'Audit Evidence']
  },
  {
    id: 'iso27k_f_12',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Which statutory UK Act provides the Part 5, Chapter 5 gateway enabling public authorities to share de-identified personal data for public-benefit research?',
    options: [
      'The Freedom of Information Act 2000 (Section 19 proactive institutional publication scheme)',
      'The Computer Misuse Act 1990 (Section 1 unauthorized computer material access offences)',
      'The Public Health (Control of Disease) Act 1984 (notifiable infectious disease reporting rules)',
      'The Digital Economy Act 2017 (Part 5, Chapter 5, Sections 64–73 overseen via the UK Statistics Authority)'
    ],
    correctIndex: 3,
    explanation: 'Part 5, Chapter 5 (Sections 64–73) of the Digital Economy Act 2017 establishes the statutory gateway for UK public authorities to share de-identified personal data for public-good research under UKSA accreditation.',
    citation: 'Digital Economy Act 2017, Part 5 Chapter 5 (Sections 64–73)',
    tags: ['DEA 2017', 'Statutory Gateway', 'UKSA']
  },
  {
    id: 'iso27k_f_13',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Under Digital Economy Act 2017 Section 67, what legal consequence applies to a person who knowingly or recklessly discloses personal information received under DEA research powers without lawful authority?',
    options: [
      'Criminal prosecution carrying a potential custodial prison sentence, fine, or both on conviction',
      'Mandatory attendance at an administrative ethics refresher workshop without statutory sanction',
      'Automatic suspension of research institutional journal publishing privileges for a fixed 90-day period',
      'A purely civil copyright notice issued by the hosting university library committee'
    ],
    correctIndex: 0,
    explanation: 'Section 67 of the Digital Economy Act 2017 creates a strict statutory criminal offence for unlawful disclosure of personal information obtained under Chapter 5 research powers, punishable by fine and/or imprisonment.',
    citation: 'Digital Economy Act 2017, Section 67 (Offence of wrongful disclosure)',
    tags: ['DEA 2017', 'Section 67', 'Criminal Liability']
  },
  {
    id: 'iso27k_f_14',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'Which independent panel established by the UK Statistics Authority (UKSA) evaluates accreditation of processors, researchers, and research projects under DEA 2017?',
    options: [
      'The Confidentiality Advisory Group (CAG) hosted by the Health Research Authority',
      'The Research Accreditation Panel (RAP), operating under the statutory Research Code of Practice',
      'The National Institute for Health and Care Excellence (NICE) Technology Appraisal Committee',
      'The Medicines and Healthcare products Regulatory Agency (MHRA) SaMD Device Board'
    ],
    correctIndex: 1,
    explanation: 'The UKSA Research Accreditation Panel (RAP) assesses and approves accredited processors, accredited researchers, and research projects under the DEA 2017 Research Code of Practice.',
    citation: 'UKSA Research Code of Practice and Accreditation Criteria (DEA 2017 s70–71)',
    tags: ['RAP', 'UKSA', 'DEA 2017', 'Accreditation']
  },
  {
    id: 'iso27k_f_15',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Foundation',
    question: 'What happens during an external ISO/IEC 27001:2022 Stage 1 audit if any single one of the 11 mandatory Clauses 4–10 documented artifacts is missing?',
    options: [
      'The assessor automatically waives the missing clause if the cloud provider holds SOC 2 certification',
      'The assessor completes the Stage 2 operational audit immediately and defers documentation review until Year 2',
      'Missing any mandatory Clauses 4–10 artifact typically triggers an immediate major nonconformity halting progression to Stage 2',
      'The organization receives a temporary provisional certificate valid for 180 days without corrective action'
    ],
    correctIndex: 2,
    explanation: 'External auditors check the 11 mandatory Clauses 4–10 documented artifacts first during Stage 1; omitting Scope, Policy, Risk Assessment, SoA, Internal Audit Report, or Management Review Minutes results in a major nonconformity.',
    citation: 'ISO/IEC 27001:2022 Mandatory Documented Information & Stage 1 Readiness Gate',
    tags: ['Mandatory Artifacts', 'Stage 1', 'Major Nonconformity']
  },

  // ==========================================
  // INTERMEDIATE (15 Questions)
  // ==========================================
  {
    id: 'iso27k_i_01',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'What are the core elements required in an ISO/IEC 27001:2022 Clause 6.1.2 Risk Assessment Methodology before scoring platform assets?',
    options: [
      'A purely narrative list of software bugs exported weekly from GitHub issues without severity scoring',
      'Criteria for performing risk assessments (Likelihood x Impact across Confidentiality, Integrity, Availability) plus explicit criteria for accepting risk',
      'A hardware asset serial-number spreadsheet listing only physical datacenter server racks and laptops',
      'An automated Kubernetes admission script blocking all outbound HTTP traffic without documenting threat scenarios'
    ],
    correctIndex: 1,
    explanation: 'Clause 6.1.2 requires repeatable criteria for risk evaluation (typically Likelihood x Impact over Confidentiality, Integrity, Availability) and explicit risk acceptance thresholds so scoring is consistent.',
    citation: 'ISO/IEC 27001:2022 Clause 6.1.2 (Information Security Risk Assessment)',
    tags: ['Clause 6.1.2', 'Risk Methodology', 'CIA Triad']
  },
  {
    id: 'iso27k_i_02',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Why do ISO/IEC 27001:2022 auditors insist on 60 to 90 days of operational evidence (Phase 4) prior to Stage 2 certification?',
    options: [
      'Because Certification Body billing regulations mandate a fixed 90-day waiting fee before scheduling interviews',
      'Because cloud backup snapshots take 60 days to finish initial AES-256 disk encryption across UK zones',
      'Because auditors verify operational effectiveness over time—proving access reviews, patching, restores, and monitoring genuinely operate in practice',
      'Because UKSA DEA 2017 forbids platform engineers from editing Terraform configurations during the first quarter'
    ],
    correctIndex: 2,
    explanation: 'Written policies alone fail Stage 2. Auditors sample 60–90 days of timestamped evidence (user access reviews, patching logs, backup restore tests, tabletop drills, vendor checks) to verify the ISMS operates effectively.',
    citation: 'ISO/IEC 27001:2022 Phase 4 Operational Proof & Clauses 8.1–8.3',
    tags: ['Phase 4', 'Audit Evidence', 'Operational Effectiveness']
  },
  {
    id: 'iso27k_i_03',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'If an organization streams server logs into a SIEM (Annex A.8.15) but keeps zero records proving engineers or SecOps actually inspect alerts or metrics, which Clause 9.1 gap occurs?',
    options: [
      'Clause 4.3 physical boundary exclusion failure requiring immediate datacenter relocation',
      'Clause 7.2 HR recruitment verification failure for university academic researchers',
      'Annex A.7.1 visitor reception badge log omission inside clinical hospital wards',
      'Missing Clause 9.1 analysis and evaluation evidence—collecting raw telemetry without documented review and follow-up action'
    ],
    correctIndex: 3,
    explanation: 'Clause 9.1 requires not only monitoring and measurement, but also documented analysis and evaluation results—auditors look for monthly/quarterly metric packs and signed SIEM alert review records.',
    citation: 'ISO/IEC 27001:2022 Clause 9.1 & Annex A.8.15–A.8.16',
    tags: ['Clause 9.1', 'Monitoring', 'SIEM', 'Evidence']
  },
  {
    id: 'iso27k_i_04',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'How does an organization operating exclusively on managed UK sovereign public cloud regions treat physical datacenter security controls (Annex A.7) inside its Statement of Applicability?',
    options: [
      'Retain all A.7 controls in the SoA, mark datacenter physical perimeters as Inherited/Shared (backed by cloud provider ISO 27001/SOC 2 reports) while keeping office/endpoint A.7 rules applicable',
      'Delete all 14 Annex A.7 physical security rows from the Statement of Applicability spreadsheet to reduce documentation length',
      'Mark every A.7 control as Fully Implemented internally without reviewing the cloud provider attestation reports',
      'Transfer full UK GDPR Data Controller legal liability for clinical datasets onto the hyperscale cloud hardware landlord'
    ],
    correctIndex: 0,
    explanation: 'All 93 Annex A controls remain listed in the SoA. Cloud datacenter physical controls are documented via shared responsibility (reviewing the cloud vendor ISO 27001/SOC 2 under A.5.22), while VDI, clear-desk, and office access remain locally governed.',
    citation: 'ISO/IEC 27001:2022 Clause 6.1.3(d) & Annex A.7 / A.5.22',
    tags: ['Annex A.7', 'SoA', 'Cloud Shared Responsibility']
  },
  {
    id: 'iso27k_i_05',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Which activities belong on a Monthly vs. Quarterly vs. Semi-Annual post-certification operating cadence?',
    options: [
      'Monthly Management Reviews; Quarterly UKAS external Stage 2 audits; Semi-Annual FIDO2 MFA checks',
      'Monthly CVE SLA, alert & JML ticket reviews; Quarterly privileged UARs, KPIs & Clause 6.3 changes; Semi-Annual incident tabletop, restore drill & vendor SOC 2 reviews',
      'Monthly 93-control SoA rewrites; Quarterly Stage 1 external audits; Semi-Annual researcher NDA elimination',
      'Monthly physical server hardware replacement; Quarterly cancellation of internal audits; Semi-Annual deletion of SIEM logs'
    ],
    correctIndex: 1,
    explanation: 'Sustainable run-state operations inspect CVEs/alerts/JML monthly, run privileged access reviews/KPIs/planned changes quarterly, execute tabletop drills/backup restores/vendor reviews semi-annually, and refresh Risk/SoA/Internal Audit/Management Review annually.',
    citation: 'ISO/IEC 27001:2022 Post-Certification Run-State Calendar',
    tags: ['Operating Cadence', 'Surveillance Audits', 'Run-State']
  },
  {
    id: 'iso27k_i_06',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'What 3-year cycle governs external Certification Body assessments after an organization passes initial ISO/IEC 27001:2022 Stage 2 certification?',
    options: [
      'A one-time lifetime certificate requiring zero follow-up external assessments unless a breach is reported',
      'Annual full Stage 1 documentation audits every 6 months with no sampling of operational tickets',
      'Surveillance Audit 1 in Year 1, Surveillance Audit 2 in Year 2, and a full Recertification Audit in Year 3',
      'A five-year exemption window supervised solely by the internal Data Protection Officer without UKAS/ANAB assessors'
    ],
    correctIndex: 2,
    explanation: 'ISO/IEC 27001 certificates run on a 3-year cycle consisting of Surveillance Audit 1 in Year 1, Surveillance Audit 2 in Year 2, and a comprehensive Recertification Audit in Year 3.',
    citation: 'ISO/IEC 17021-1 & ISO/IEC 27001 3-Year Certification Cycle',
    tags: ['Surveillance Audit', 'Recertification', '3-Year Cycle']
  },
  {
    id: 'iso27k_i_07',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Before proceeding to Stage 1 certification, what must occur regarding findings uncovered during the Phase 5 Internal Audit (Clause 9.2)?',
    options: [
      'Internal audit findings must be scrubbed from logs so external Stage 1 assessors see zero historical nonconformities',
      'Minor observations trigger immediate project cancellation under Digital Economy Act Section 67 penalties',
      'Findings are held indefinitely without root-cause analysis until after Year 2 external surveillance completes',
      'Every finding is recorded in the Clause 10.2 Corrective Action Log with root-cause analysis, and all major nonconformities are resolved prior to Stage 1'
    ],
    correctIndex: 3,
    explanation: 'Auditors expect an honest Clause 10.2 Nonconformity & Corrective Action Log showing root-cause analysis and verified closure of all major nonconformities before Stage 1 begins.',
    citation: 'ISO/IEC 27001:2022 Clauses 9.2 & 10.2 (Corrective Action Log)',
    tags: ['Clause 10.2', 'CAPA', 'Nonconformity', 'Phase 5']
  },
  {
    id: 'iso27k_i_08',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'What typically happens if an external Certification Body raises one or more minor nonconformities during a Stage 2 Certification Audit?',
    options: [
      'The organization receives a corrective-action window (typically 30 to 90 days) to submit remediation and root-cause evidence before certificate issuance',
      'The organization is permanently barred from reapplying to UKAS or ANAB certification bodies for 36 months',
      'Minor nonconformities are ignored until the Year 3 Recertification Audit without requiring corrective action plans',
      'The Stage 2 auditor directly edits the organization’s Terraform cloud infrastructure to patch the configuration'
    ],
    correctIndex: 0,
    explanation: 'During Stage 2, minor nonconformities do not block eventual certification provided the organization resolves them with root-cause fixes and evidence within the auditor’s corrective-action window (commonly 30–90 days).',
    citation: 'ISO/IEC 27001 Stage 2 Audit Remediation Protocol',
    tags: ['Stage 2 Audit', 'Minor Nonconformity', 'Remediation']
  },
  {
    id: 'iso27k_i_09',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'What does ISO/IEC 27001:2022 Clause 6.3 (Planning of Changes) require on a data intelligence platform?',
    options: [
      'Freezing all software dependencies and prohibiting clinical dataset updates for 12 months after certification',
      'Carrying out changes to the ISMS—such as new cloud regions, AI tools, or data linkages—in a planned, risk-assessed manner',
      'Re-issuing physical staff badges every quarter regardless of whether employee roles changed',
      'Bypassing peer review on emergency infrastructure pull requests whenever project deadlines approach'
    ],
    correctIndex: 1,
    explanation: 'Clause 6.3 requires planned governance when modifying the ISMS (evaluating scope, risk, competence, and resource impacts before shipping major architectural or dataset onboarding changes).',
    citation: 'ISO/IEC 27001:2022 Clause 6.3 (Planning of Changes)',
    tags: ['Clause 6.3', 'Change Planning', 'Governance']
  },
  {
    id: 'iso27k_i_10',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Which ISO/IEC 27001:2022 Annex A controls govern information security in supplier relationships and cloud service monitoring?',
    options: [
      'Annex A.7.1 through A.7.4 covering physical security perimeters, office entry badges, and CCTV cameras',
      'Annex A.6.1 through A.6.3 covering employee background verification checks and disciplinary processes',
      'Annex A.5.19 through A.5.23 covering supplier security policies, agreements, ICT supply chain, monitoring/review, and cloud service acquisition',
      'Annex A.8.28 through A.8.30 covering secure application coding standards and outsourced software debugging'
    ],
    correctIndex: 2,
    explanation: 'Annex A.5.19–A.5.23 provide the 2022 Organizational framework for supplier risk, contracts, supply chain, ongoing SOC 2/ISO 27001 review (A.5.22), and cloud services security (A.5.23, new in 2022).',
    citation: 'ISO/IEC 27001:2022 Annex A.5.19–A.5.23 (Supplier & Cloud Security)',
    tags: ['Annex A.5.19', 'Annex A.5.23', 'Cloud Suppliers']
  },
  {
    id: 'iso27k_i_11',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Which mandatory inputs and outputs must be recorded in Clause 9.3 Management Review Minutes?',
    options: [
      'Raw database SQL query logs, individual patient NHS Numbers, and unaggregated clinic admission timestamps',
      'Informal Slack channel acknowledgments from developers stating that systems appeared stable over the quarter',
      'Solely the external Certification Body pricing invoice and projected marketing press release dates',
      'Audit results, risk posture & RTP changes, Clause 6.2 KPI trends, nonconformities, supplier performance, resource needs, and Executive Sponsor improvement decisions'
    ],
    correctIndex: 3,
    explanation: 'Clause 9.3 specifies exact inputs (prior actions, context changes, KPIs, audits, nonconformities, supplier feedback, risk changes) and outputs (continual improvement decisions and ISMS resource/change actions) captured in signed minutes.',
    citation: 'ISO/IEC 27001:2022 Clause 9.3 (Management Review)',
    tags: ['Clause 9.3', 'Management Review', 'Mandatory Artifacts']
  },
  {
    id: 'iso27k_i_12',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'How does the UKSA TRE Accreditation Self-Assessment Questionnaire (SAQ V3.1) relate to ISO/IEC 27001:2022 controls?',
    options: [
      'SAQ V3.1 evaluates operational proof across the Five Safes—mapping people vetting, network air-gapping, cryptography, logging, and airlock SDC to evidence-based controls aligned with ISO 27001',
      'SAQ V3.1 replaces the entire ISO/IEC 27001 Clauses 4–10 ISMS management framework with a 10-question research ethics checklist',
      'SAQ V3.1 applies only to hospital outpatient clinics seeking NHS England DCB0129 medical device software registration',
      'SAQ V3.1 permits public authorities to disclose identifiable microdata over unencrypted university email once an NDA is signed'
    ],
    correctIndex: 0,
    explanation: 'UKSA TRE SAQ V3.1 is the canonical evidence questionnaire evaluating Five Safes operational adherence (Safe People, Projects, Settings, Data, Outputs), aligning technical security questions with ISO/IEC 27001.',
    citation: 'UKSA TRE Accreditation SAQ V3.1 & TRE SOP V1.4',
    tags: ['SAQ V3.1', 'DEA 2017', 'Five Safes', 'UKSA']
  },
  {
    id: 'iso27k_i_13',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Which set of ISO/IEC 27001:2022 Annex A controls underpins a secure platform’s technical rollout in Phase 3 (Weeks 7–14)?',
    options: [
      'Removing endpoint encryption, disabling MFA for power users, and enabling public SSH ingress on worker clusters',
      'Vulnerability management (A.8.8), configuration management (A.8.9), logging & monitoring (A.8.15–8.16), network segregation (A.8.20–8.22), cryptography (A.8.24), and secure coding (A.8.28)',
      'Publishing internal private TLS signing keys in Git repositories alongside researcher personal phone numbers',
      'Delegating full root database credentials permanently to unvetted external guest collaborators'
    ],
    correctIndex: 1,
    explanation: 'Phase 3 operationalizes the 2022 Annex A.8 technological baseline: vulnerability scanning (A.8.8), hardening/configuration (A.8.9), centralized logging/monitoring (A.8.15–8.16), network isolation (A.8.20–8.22), AES-256 cryptography (A.8.24), and secure development (A.8.28).',
    citation: 'ISO/IEC 27001:2022 Annex A.8 (Technological Controls) & Phase 3 Playbook',
    tags: ['Phase 3', 'Annex A.8', 'Technical Controls']
  },
  {
    id: 'iso27k_i_14',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'Why must a data intelligence platform run isolated sandbox backup restore tests (Annex A.8.13) rather than merely verifying automated nightly snapshot creation?',
    options: [
      'Because cloud object storage vendors purge AES-256 encrypted database backups automatically after 14 days unless restored manually',
      'Because UKSA DEA Section 70 mandates copying full unencrypted research cohorts onto external developer laptops quarterly',
      'Because auditors and continuity plans require verifiable proof that backups restore cleanly with intact data within target RTO/RPO windows',
      'Because restoring backups into production clusters weekly improves DuckDB analytical query throughput'
    ],
    correctIndex: 2,
    explanation: 'Untested backups are a classic ISMS failure. Semi-annual or quarterly sandbox restoration drills prove snapshot integrity, key availability, and Recovery Time / Point Objectives without risking live environments.',
    citation: 'ISO/IEC 27001:2022 Annex A.8.13 (Information Backup) & A.5.30 (ICT Continuity)',
    tags: ['Annex A.8.13', 'Backups', 'PITR', 'Continuity']
  },
  {
    id: 'iso27k_i_15',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Intermediate',
    question: 'In a Risk Treatment Plan (Clause 6.1.3), what must accompany every mitigated or accepted risk entry?',
    options: [
      'Only a high-level risk title without residual risk score recalculation or named accountability',
      'An automatic SoA exclusion claiming technical controls are unnecessary for high-impact threats',
      'A signed waiver from external researchers absolving the platform operator of all security duties',
      'The chosen treatment option, mapped Annex A controls, assigned action owner, target completion due date, and resulting residual risk score'
    ],
    correctIndex: 3,
    explanation: 'Clause 6.1.3 requires selecting appropriate risk treatment options, mapping controls against Annex A, gaining risk owner approval of the Risk Treatment Plan and residual risks, and tracking owners and dates.',
    citation: 'ISO/IEC 27001:2022 Clause 6.1.3 (Information Security Risk Treatment)',
    tags: ['Risk Treatment Plan', 'Clause 6.1.3', 'Residual Risk']
  },

  // ==========================================
  // ADVANCED (15 Questions)
  // ==========================================
  {
    id: 'iso27k_a_01',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'Which statement accurately describes the legal and operational relationship between formal ISO/IEC 27001 certification and becoming an Accredited Processor under the Digital Economy Act 2017 (DEA)?',
    options: [
      'DEA 2017 delegates criteria to the UKSA Research Code of Practice, which benchmarks security against ISO 27001 controls (standard baseline for TREs under SOP V1.4), yet UKSA explicitly states certification is NOT an automatic waiver—applicants must still pass evidence-based DEA assessment',
      'Holding any UKAS-accredited ISO/IEC 27001 certificate automatically grants DEA Section 71 Accredited Processor status for 5 years without completing UKSA SAQ V3.1 questionnaires or operational checks',
      'ISO/IEC 27001 certification is explicitly outlawed under DEA 2017 Section 70 because public authorities must invent bespoke non-ISO security frameworks for every linked administrative dataset',
      'Formal ISO/IEC 27001 certification is hardcoded by name inside Section 71(4) of the DEA 2017 primary statute text as the sole legal criterion, eliminating technical or data-capability reviews'
    ],
    correctIndex: 0,
    explanation: 'Primary DEA 2017 legislation delegates criteria to the UKSA Research Code of Practice & Accreditation Criteria. UKSA benchmarks processor security against ISO/IEC 27001 (with certification expected/standard for TREs under SOP V1.4), but explicitly confirms ISO 27001 is never a blanket bypass—evidence-based SAQ V3.1 assessment is still mandatory.',
    citation: 'DEA 2017 Part 5 Ch. 5 (s70–71), UKSA Research Code of Practice & UKSA Processor Guidance',
    tags: ['DEA 2017', 'ISO 27001', 'UKSA', 'Accredited Processor', 'SOP V1.4']
  },
  {
    id: 'iso27k_a_02',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'An organization builds a secure data intelligence platform without using Open Policy Agent (OPA). How should its ISO/IEC 27001:2022 & DEA 2017 preparation differ from an OPA-enabled platform?',
    options: [
      'A non-OPA platform cannot obtain ISO/IEC 27001:2022 certification because Annex A.8 mandates declarative Rego policy bundles for cloud compliance',
      'Core ISO/IEC 27001 & DEA readiness is completely technology-agnostic: any platform still requires Clauses 4–10 governance, 93-control SoA, vetted roles, MFA/RBAC, logging, backups, internal audit, and auditable outputs regardless of policy engine',
      'A non-OPA platform is exempt from Clauses 6.1, 9.2, and 9.3 provided engineers run nightly manual SQL database exports',
      'A non-OPA platform only needs physical datacenter controls (A.7) and may omit Access Control (A.5.15) and Safe Outputs (A.8.12)'
    ],
    correctIndex: 1,
    explanation: 'ISO/IEC 27001:2022 and DEA 2017 accreditation are strictly technology-agnostic. Policy engines like OPA/SHACL are optional automation layers; the human roles, Clauses 4–10 artifacts, Annex A controls, and operational evidence apply equally to any secure platform.',
    citation: 'ISO/IEC 27001:2022 Technology-Neutral Management Standard & UKSA TRE SOP V1.4',
    tags: ['Tech-Agnostic', 'ISMS Build-Up', 'Platform Security']
  },
  {
    id: 'iso27k_a_03',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'If an organization excludes researcher university laptops from its Clause 4.3 ISMS Scope Statement, what compensating controls justify that exclusion cleanly during Stage 2 and UKSA audits?',
    options: [
      'Trusting researchers via signed honor codes while permitting direct encrypted SFTP downloads of pseudonymised microdata onto personal laptops',
      'Disabling MFA checks for university IP ranges so external academics can query raw enclave PostgreSQL ports directly',
      'Enforcing pixel-only Virtual Desktop Infrastructure (VDI), blocking clipboard/USB/file downloads, enforcing FIDO2 MFA, and routing all exports through auditable airlocks',
      'Deleting Annex A.8.1 (User endpoint devices) and Annex A.8.12 (Data leakage prevention) from the Statement of Applicability'
    ],
    correctIndex: 2,
    explanation: 'External university laptops can only be excluded cleanly from ISMS scope if technical containment guarantees microdata never touches external disks—using pixel-only VDI, blocked clipboard/egress, FIDO2 MFA, and dual-checked airlocks.',
    citation: 'ISO/IEC 27001:2022 Clause 4.3 Scoping & Annex A.8.1 / A.8.12 Containment',
    tags: ['Clause 4.3', 'VDI', 'Compensating Controls', 'Annex A.8.12']
  },
  {
    id: 'iso27k_a_04',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'During Stage 2 audit sampling, an assessor notices that a contractor left 20 days ago but retained cloud console access for 9 days after exit. Which ISO/IEC 27001:2022 clauses and Annex A controls are directly implicated?',
    options: [
      'Exclusively Annex A.7.12 (Cabling security) and Clause 4.1 Amendment 1:2024 environmental hazard planning',
      'Exclusively DEA 2017 Section 70 public-benefit journal citations and NHS Act 2006 Section 251 CAG exemption notices',
      'Solely Annex A.8.24 (Use of cryptography) requiring immediate re-encryption of static archival backups',
      'Annex A.5.18 (Access rights removal), Clause 8.1/9.1 operational control & monitoring, and Clause 10.2 CAPA requiring root-cause remediation of the JML workflow'
    ],
    correctIndex: 3,
    explanation: 'Delayed offboarding violates Annex A.5.18 (timely removal of access rights upon termination/change) and triggers Clause 10.2 Corrective Action analysis—e.g., automating HR-to-IdP webhook revocation and monthly JML reconciliation.',
    citation: 'ISO/IEC 27001:2022 Annex A.5.18 & Clauses 8.1, 9.1, 10.2',
    tags: ['Annex A.5.18', 'JML', 'Clause 10.2', 'CAPA']
  },
  {
    id: 'iso27k_a_05',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'When migrating an older healthcare enclave compliance matrix from ISO/IEC 27001:2013 to ISO/IEC 27001:2022, which control mappings are exact?',
    options: [
      'A.10.1 Cryptography -> A.8.24; A.12.1.2 Change Management -> A.8.32; A.13.1 Network Security -> A.8.20–A.8.22; plus new 2022 controls such as A.5.7 Threat Intelligence, A.5.23 Cloud Services, and A.8.9 Configuration Management',
      'A.10.1 Cryptography -> A.5.1; A.12.1.2 Change Management -> A.6.3; A.13.1 Network Security -> A.7.14 across physical server racks',
      'All 2013 Annex A domain numbers A.5 through A.18 remained identical in the 2022 revision with only minor editorial punctuation changes',
      'The 2022 revision removed all cryptographic and change-management controls from Annex A, delegating them solely to Clause 4.3'
    ],
    correctIndex: 0,
    explanation: 'ISO/IEC 27001:2022 remapped 2013 domains into A.5–A.8: A.10 became A.8.24, A.12.1.2 became A.8.32, A.13.1 became A.8.20–A.8.22, and 11 new controls (including A.5.7, A.5.23, A.8.9, A.8.12, A.8.28) were introduced.',
    citation: 'ISO/IEC 27001:2022 Annex A Transition & Correlation Guide',
    tags: ['2013 to 2022 Migration', 'Annex A.8.24', 'Annex A.8.32', 'Annex A.5.23']
  },
  {
    id: 'iso27k_a_06',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'In a governance architecture that bridges human ISMS processes with optional Policy-as-Code (OPA/SHACL), how are Clauses 6.2, 7.2, and Amendment 1:2024 actually connected to OPA?',
    options: [
      'By feeding raw PDF Management Review slide decks directly into the Go Rego compiler to parse natural-language sentences at request time',
      'Design-time documents define approved thresholds and scope (including Amendment 1:2024 resilience), while live processes emit structured JSON input.* claims for Clause 6.2 KPI SLAs and Clause 7.2 staff/role competence evaluated fail-closed',
      'OPA eliminates Clauses 6.2 and 7.2 completely because Kubernetes validating webhooks automatically certify employee CVs and cybersecurity budgets',
      'Clause 6.2 and Clause 7.2 JSON claims are stored client-side in unauthenticated researcher browser cookies and trusted blindly by the cluster'
    ],
    correctIndex: 1,
    explanation: 'Human policies and registers never compile verbatim into Rego. Instead, signed baseline documents set policy rules while operational systems (HR/LMS, vulnerability scanners, context registers) emit verified JSON input.* claims evaluated by OPA.',
    citation: 'Wavebound Docs-to-OPA Pipeline & ISO/IEC 27001:2022 Clauses 4.1, 6.2, 7.2',
    tags: ['Docs-to-OPA', 'Clause 6.2', 'Clause 7.2', 'Amendment 1:2024']
  },
  {
    id: 'iso27k_a_07',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'Why must Safe Outputs (airlock releases) combine disclosure mathematics with auditable procedural approval hand-offs?',
    options: [
      'Because once small-cell counts exceed 10, researchers are legally permitted to email individual-level patient rows without recording release provenance',
      'Because Freedom of Information Act Section 41 requires releasing raw researcher workbench scripts alongside confidential patient records',
      'Because regulators and ISO/UKSA auditors inspect non-repudiable provenance: who submitted the output, quantitative triage results, independent second-person checker verification, and cryptographic release manifest',
      'Because automated mathematical scans eliminate the need for human context assessment against differencing attacks across prior project publications'
    ],
    correctIndex: 2,
    explanation: 'Safe Outputs require both disclosure protection (k >= 10, dominance <= 80%, differencing checks) AND auditable procedural hand-offs capturing intake provenance, quantitative report, dual independent officer sign-off, and immutable release records.',
    citation: 'Five Safes Safe Outputs, SDAP SACRO Protocol & ISO/IEC 27001 Annex A.8.12 / A.8.15',
    tags: ['Safe Outputs', 'Procedural Hand-offs', 'Auditable Outputs', 'Airlock']
  },
  {
    id: 'iso27k_a_08',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'How do ISO/IEC 27001:2022, ISO/IEC 27701:2019, and ISO/IEC 42001:2023 complement one another in an AI-enabled health & public data intelligence platform?',
    options: [
      'ISO/IEC 42001 replaces both ISO/IEC 27001 and UK GDPR entirely so platforms deploying LLMs no longer maintain a Statement of Applicability',
      'ISO/IEC 27701 governs physical datacenter cooling exclusively while ISO/IEC 27001 applies solely to clinical software UI accessibility',
      'All three standards share identical 93 Annex A control IDs and cannot be audited alongside UKSA DEA 2017 processor criteria',
      'ISO/IEC 27001:2022 provides the core ISMS security foundation, ISO/IEC 27701:2019 extends it into a PIMS for UK GDPR controller/processor privacy duties, and ISO/IEC 42001:2023 adds AIMS lifecycle & algorithmic risk governance'
    ],
    correctIndex: 3,
    explanation: 'ISO/IEC 27001:2022 anchors information security (ISMS); ISO/IEC 27701:2019 extends it for PII privacy accountability (PIMS); and ISO/IEC 42001:2023 establishes an AI Management System (AIMS) for bias, drift, and AI governance.',
    citation: 'ISO/IEC 27001:2022, ISO/IEC 27701:2019 & ISO/IEC 42001:2023 Integration Architecture',
    tags: ['ISO 27001', 'ISO 27701', 'ISO 42001', 'AIMS', 'PIMS']
  },
  {
    id: 'iso27k_a_09',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'What distinguishes the statutory legal gateway under Digital Economy Act 2017 Part 5 Chapter 5 from NHS Act 2006 Section 251 (CAG) in UK health/public data platforms?',
    options: [
      'DEA 2017 Part 5 Ch. 5 specifically covers sharing de-identified public authority data for public-benefit research via UKSA RAP (not strictly restricted to health), whereas Section 251 sets aside Common Law Duty of Confidentiality for confidential NHS patient information via HRA CAG',
      'DEA 2017 Section 71 automatically authorizes hospitals to share identifiable clinical records for commercial pharmaceutical marketing without patient opt-outs',
      'Section 251 CAG approval permanently supersedes UKSA Research Accreditation Panel checks for all Treasury, HMRC, and Ministry of Justice administrative microdata',
      'Neither DEA 2017 nor Section 251 requires a lawful basis under UK GDPR Articles 6 and 9 once data enters a cloud environment'
    ],
    correctIndex: 0,
    explanation: 'DEA 2017 Part 5 Ch. 5 enables de-identified public authority data sharing for public-benefit research under UKSA RAP oversight (and specifically restricts health/adult social care disclosures under DEA s64 boundaries), whereas NHS Act s251 sets aside CLDC for confidential patient data.',
    citation: 'DEA 2017 Part 5 Ch. 5 & NHS Act 2006 Section 251 Statutory Boundaries',
    tags: ['DEA 2017', 'Section 251', 'CAG', 'Statutory Gateways']
  },
  {
    id: 'iso27k_a_10',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'Which engineering failure most commonly causes Stage 2 nonconformities regarding Annex A.8.8 (Management of technical vulnerabilities) and Clause 6.2 objectives?',
    options: [
      'Running encrypted Trivy vulnerability scans nightly in GitHub Actions and patching critical flaws within 48 hours',
      'Generating noisy scanner vulnerability PDFs without defined SLA remediation windows, tracked ownership tickets, or evidence that critical CVEs were actually patched on schedule',
      'Retaining signed SHA-256 container attestations inside a sovereign UK artifact mirror after passing security triage',
      'Isolating analytical enclaves from outbound WAN internet connectivity using kernel eBPF egress filters'
    ],
    correctIndex: 1,
    explanation: 'Running scanners alone does not satisfy A.8.8 or Clause 6.2. Stage 2 assessors check whether findings have risk-based remediation SLAs (e.g., Critical <= 14d), assigned tickets, and timestamped proof of timely closure.',
    citation: 'ISO/IEC 27001:2022 Annex A.8.8 & Clause 6.2 Audit Sampling Practice',
    tags: ['Annex A.8.8', 'Vulnerability Management', 'Stage 2', 'Clause 6.2']
  },
  {
    id: 'iso27k_a_11',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'When a platform hosts third-party cloud LLM APIs or external SaaS tooling within an ISO/IEC 27001:2022 & NHS/DEA governed boundary, what must be verified under Annex A.5.19–A.5.23?',
    options: [
      'Only that the vendor website displays a privacy badge without inspecting contractual Zero Data Retention (ZDR) terms or sub-processor residency',
      'Exclusively that developer IDE plugins autocomplete SQL queries quickly inside local researcher laptops',
      'UK data residency or lawful transfer mechanism, contractual Zero Data Retention (no secondary model training), verified Data Processing Agreements, and annual SOC 2 / ISO 27001 review',
      'Allowing commercial AI APIs to retain patient prompts for 90 days in US regions under an informal Slack exemption'
    ],
    correctIndex: 2,
    explanation: 'Annex A.5.19–A.5.23 together with NHS/ICO AI guidance require formal supplier due diligence: contractual DPAs, Zero Data Retention guarantees against training on platform prompts, data residency controls, and ongoing assurance monitoring.',
    citation: 'ISO/IEC 27001:2022 Annex A.5.19–A.5.23 & NHS/ICO Generative AI Guidance',
    tags: ['Cloud Suppliers', 'ZDR', 'Annex A.5.23', 'AI Governance']
  },
  {
    id: 'iso27k_a_12',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'How does split-file Privacy-Preserving Record Linkage (PPRL) under DEA 2017 Data Preparation satisfy Annex A.5.14 (Information Transfer) and Annex A.8.24 (Use of Cryptography)?',
    options: [
      'By concatenating patient full names, NHS numbers, and clinical diagnoses in a single unencrypted CSV file before uploading to shared academic object storage',
      'By allowing research investigators inside analytical compute pods to decrypt raw NHS numbers on demand to check linkage quality',
      'By disabling cryptographic hashing so longitudinal cohort joins run exclusively on fuzzy plain-text street addresses',
      'By separating identifiable linkage keys from clinical attributes—having a Trusted Third Party generate project-scoped salted HMAC tokens so the analytical enclave never holds direct identifiers'
    ],
    correctIndex: 3,
    explanation: 'Split-file / Trusted Third Party linkage separates direct PII (handled only by an accredited indexing/linkage processor) from de-identified analytical payload attributes, projecting project-scoped HMAC tokens into the enclave.',
    citation: 'ISO/TS 25237 PPRL, ADR UK DEA Linkage Guidelines & ISO 27001 Annex A.5.14 / A.8.24',
    tags: ['PPRL', 'DEA 2017', 'Annex A.8.24', 'Trusted Third Party']
  },
  {
    id: 'iso27k_a_13',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'Under Clause 4.1–4.2 (Amendment 1:2024), how should a cloud-hosted UK data intelligence platform practically address climate change resilience without over-engineering?',
    options: [
      'Record the assessment in the Clause 4.1 context log—verifying multi-AZ UK cloud resilience, cooling/power failover SLAs under A.5.30 ICT continuity, and stakeholder expectations—then note it in Management Review',
      'Exclude cloud hosting from the ISMS scope completely because climate risks only affect on-premise paper filing cabinets',
      'Replace all risk scoring with mandatory quarterly greenhouse gas audits of every external university collaborator',
      'Treat Amendment 1:2024 as an optional marketing checklist ignored during Stage 1 and Year 1 surveillance audits'
    ],
    correctIndex: 0,
    explanation: 'Certification Bodies check that Amendment 1:2024 was explicitly considered in Clause 4.1/4.2 context and linked to facility/cloud continuity (A.5.30) and Management Review—even when the pragmatic conclusion is that multi-AZ cloud SLAs mitigate physical weather risk.',
    citation: 'ISO/IEC 27001:2022/Amd 1:2024 Implementation Guidance',
    tags: ['Amendment 1:2024', 'Clause 4.1', 'Annex A.5.30', 'Cloud Resilience']
  },
  {
    id: 'iso27k_a_14',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'Which Clause 9.2 Internal Audit defect immediately undermines audit validity during an external Stage 1 UKAS Certification Body review?',
    options: [
      'Maintaining structured audit checklists mapped systematically across Clauses 4–10 and sampled Annex A controls',
      'Having the ISMS Lead or Platform Security Engineer audit their own work rather than engaging an independent internal auditor or external advisor',
      'Recording three minor nonconformities with root-cause fixes verified closed inside the Clause 10.2 CAPA log',
      'Cross-referencing sampled Git pull requests and User Access Review exports inside the signed Internal Audit Report'
    ],
    correctIndex: 1,
    explanation: 'Clause 9.2 explicitly prohibits self-auditing. If the person who designed or operates the ISMS also signed off as the Internal Auditor for those same controls, UKAS/ANAB assessors treat the internal audit as invalid.',
    citation: 'ISO/IEC 27001:2022 Clause 9.2.2(c) (Objectivity and Impartiality)',
    tags: ['Clause 9.2', 'Internal Audit', 'Independence', 'Stage 1']
  },
  {
    id: 'iso27k_a_15',
    category: 'ISO 27001 & DEA 2017',
    difficulty: 'Advanced',
    question: 'When organizing an ISMS Evidence Repository (Phase 4) for efficient Stage 2 Certification Body and UKSA DEA inspection, what folder & metadata design minimizes audit friction?',
    options: [
      'A single shared unsorted folder containing unlabelled screenshot images uploaded on the morning of the external audit',
      'Storing sensitive operational access logs strictly on local engineer laptops without retention timestamps or owner attribution',
      'Indexing timestamped artifacts cleanly by ISO Clauses 4–10 and Annex A IDs (matching SoA evidence links) alongside UKSA SAQ V3.1 cross-references covering 60–90 days of live operation',
      'Deleting closed nonconformity tickets and old access review logs monthly so external assessors see only active week-one records'
    ],
    correctIndex: 2,
    explanation: 'Structuring an immutable Evidence Repository directly by Clauses 4–10 and Annex A control IDs—mirrored from the Statement of Applicability and SAQ V3.1—lets external assessors sample 60–90 days of timestamped operational proof effortlessly.',
    citation: 'ISO/IEC 27001:2022 Phase 4 Evidence Repository & UKSA DEA SAQ Traceability',
    tags: ['Evidence Repository', 'Phase 4', 'Stage 2', 'SAQ V3.1']
  }
];
