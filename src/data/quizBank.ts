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
  // Category 1: Five Safes & Governance
  {
    id: 'q1',
    category: 'Five Safes & Governance',
    difficulty: 'Foundation',
    question: 'Which of the Five Safes dimensions specifically deals with ensuring researchers possess up-to-date Information Governance (IG) training and verified credentials?',
    options: [
      'Safe Setting',
      'Safe Person',
      'Safe Project',
      'Safe Data'
    ],
    correctIndex: 1,
    explanation: 'Safe Person verifies that only accredited researchers with active credentials and current Information Governance (IG) training are permitted access to sensitive data enclaves.',
    citation: 'Playbook Section 1 (Key Goals) & Section 3 (Phase 1)',
    tags: ['Five Safes', 'Accreditation', 'Caldicott']
  },
  {
    id: 'q2',
    category: 'Five Safes & Governance',
    difficulty: 'Intermediate',
    question: 'In the TRE Policy-as-Code architecture, how are clinical data assets categorized across hospital operational boundaries?',
    options: [
      'Single flat access with password protection',
      'Tiered sensitivity mapping (e.g., aggregate/synthetic, de-identified pseudonymised, and identifiable under Section 251)',
      'Unrestricted internal network access with IP whitelisting',
      'Direct SQL database sharing with external universities'
    ],
    correctIndex: 1,
    explanation: 'Data is structured into formal operational tiers (Tier 1: Aggregate/Synthetic, Tier 2: De-identified Pseudonymised, Tier 3: Sensitive Clinical/Identifiable under NHS Section 251) within the OWL ontology to match project ethics approvals.',
    citation: 'Playbook Section 1 & Section 2 (tre-core.ttl and governance_core.ttl)',
    tags: ['Data Tiers', 'NHS s251', 'Governance']
  },
  {
    id: 'q3',
    category: 'Five Safes & Governance',
    difficulty: 'Intermediate',
    question: 'Which SATRE (Standard Architecture for Trusted Research Environments) pillar encompasses Caldicott principles, NHS Section 251 exemptions, and ethics approvals?',
    options: [
      'Computing Infrastructure',
      'Data Management',
      'Information Governance',
      'Software Operations'
    ],
    correctIndex: 2,
    explanation: 'The SATRE Information Governance pillar explicitly covers legal bases, ethics approvals, NHS Section 251 support, and Caldicott guardian alignments.',
    citation: 'Playbook Section 1 & Section 3 (Phase 1)',
    tags: ['SATRE', 'Information Governance']
  },

  // Category 2: Semantic Modeling (OWL, OWA to CWA, SHACL)
  {
    id: 'q4',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Advanced',
    question: 'Why is standard OWL 2 / RDF reasoning under the Open-World Assumption (OWA) insufficient for enforcing zero-trust cybersecurity policies in a TRE?',
    options: [
      'OWL 2 cannot represent boolean attributes like true or false.',
      'Under OWA, the absence of an accreditation assertion is treated merely as unknown rather than definitively false, which would fail to block unauthorized access.',
      'OWL 2 ontologies can only be written in XML, which modern web browsers cannot parse.',
      'OWL reasoners are incapable of running in cloud computing environments.'
    ],
    correctIndex: 1,
    explanation: 'Under the Open-World Assumption (OWA), an unstated fact is treated as "currently unknown" rather than "false". In security, lack of positive proof of accreditation must trigger a strict DENY (Closed-World Assumption). SHACL resolves this by enforcing explicit closed-world shape constraints.',
    citation: 'Playbook Section 1 (Key Goals: Deterministic Enforcement)',
    tags: ['OWL 2', 'OWA vs CWA', 'SHACL']
  },
  {
    id: 'q5',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Intermediate',
    question: 'Which SHACL constraint in access-shapes.ttl guarantees that a session graph contains an explicit binding to at least one accredited researcher?',
    options: [
      'sh:minCount 1 on property tre:hasAccreditedResearcher',
      'sh:maxCount 0 on property tre:isPublicUser',
      'sh:pattern "^researcher-[0-9]+$"',
      'sh:datatype xsd:string'
    ],
    correctIndex: 0,
    explanation: '`sh:minCount 1` on path `tre:hasAccreditedResearcher` validates that the session node is linked to at least one accredited researcher instance in the RDF graph.',
    citation: 'Playbook Section 2 (ontology/shapes/access-shapes.ttl) & Section 3 (Phase 2)',
    tags: ['SHACL', 'access-shapes.ttl']
  },
  {
    id: 'q6',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Advanced',
    question: 'What tool is integrated into the pytest test harness (`tests/test_shapes.py`) to validate session fixtures against SHACL shapes during CI?',
    options: [
      'Jasmine',
      'PySHACL',
      'SonarQube',
      'ESLint'
    ],
    correctIndex: 1,
    explanation: 'PySHACL is the W3C SHACL implementation in Python used by `tests/test_shapes.py` to evaluate whether `valid-session.ttl` and `noncompliant-session.ttl` conform to the access and SDC shapes.',
    citation: 'Playbook Section 2 (tests/test_shapes.py) & Section 4 (Command 2)',
    tags: ['PySHACL', 'Testing', 'CI']
  },

  // Category 3: OPA Rego & Compilation
  {
    id: 'q7',
    category: 'OPA Rego & Enforcement',
    difficulty: 'Intermediate',
    question: 'What is the role of `compiler/rdf_to_rego.py` in the project architecture?',
    options: [
      'It downloads open-source datasets from the internet directly into the clinical enclave.',
      'It translates high-level semantic Turtle definitions and quantitative SDC rules into executable Open Policy Agent (OPA) Rego code.',
      'It converts PDF consent forms into scanned images.',
      'It executes Python scripts directly inside the patient record database.'
    ],
    correctIndex: 1,
    explanation: '`compiler/rdf_to_rego.py` is the full compiler that compiles OWL/SDC semantic constraints into production Rego policies for low-latency runtime evaluation at Policy Enforcement Points (PEPs).',
    citation: 'Playbook Section 2 (compiler/rdf_to_rego.py) & Section 3 (Phase 4)',
    tags: ['Compiler', 'OPA', 'Rego']
  },
  {
    id: 'q8',
    category: 'OPA Rego & Enforcement',
    difficulty: 'Advanced',
    question: 'At which architectural point is the compiled OPA policy (`security/opa/authz.rego`) evaluated when a researcher launches a cloud compute workspace?',
    options: [
      'At the web browser client using client-side JavaScript cookies',
      'At Policy Enforcement Points (PEPs) such as Kubernetes admission controllers or API gateways intercepting workspace provisioning',
      'In an overnight batch job run once per month',
      'Within the patient hospital wristband scanner'
    ],
    correctIndex: 1,
    explanation: 'Policy Enforcement Points (PEPs), specifically Kubernetes admission controllers or API gateways, intercept requests in real-time and query OPA (the Policy Decision Point, PDP) before provisioning workspaces.',
    citation: 'Playbook Section 3 (Phase 4: Policy Enforcement Points)',
    tags: ['PEP', 'PDP', 'Kubernetes']
  },
  {
    id: 'q9',
    category: 'OPA Rego & Enforcement',
    difficulty: 'Intermediate',
    question: 'What standard is utilized by the TRE Policy-as-Code platform to record append-only cryptographic audit lineage on every major authorization event?',
    options: [
      'W3C PROV-O RDF triples',
      'Plaintext syslog files with no timestamps',
      'CSV spreadsheets saved to researcher desktop',
      'Unstructured Slack webhooks'
    ],
    correctIndex: 0,
    explanation: 'The platform emits W3C PROV-O (Provenance Ontology) RDF triples on every major event (project provisioned, access revoked, egress granted) to guarantee immutable audit lineage.',
    citation: 'Playbook Section 3 (Phase 4: Audit Lineage)',
    tags: ['PROV-O', 'Audit', 'Lineage']
  },

  // Category 4: Quantitative SDC & Airlocks
  {
    id: 'q10',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Foundation',
    question: 'According to the playbook, what is the mandatory primary cell suppression threshold ($k$) for tabular outputs leaving the TRE airlock?',
    options: [
      'k >= 2',
      'k >= 5',
      'k >= 10',
      'k >= 100'
    ],
    correctIndex: 2,
    explanation: 'The playbook specifies primary cell suppression threshold of $k \\ge 10$ (aligned with ONS and SAIL Databank standards) to prevent re-identification of small patient cohorts.',
    citation: 'Playbook Section 3 (Phase 1 & Phase 4) & sdc_rules.ttl',
    tags: ['SDC', 'k-anonymity', 'Primary Suppression']
  },
  {
    id: 'q11',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Intermediate',
    question: 'What does the dominance rule ($k% \\le 80%$) in `sdc_rules.ttl` enforce?',
    options: [
      'That at least 80% of project researchers must hold a PhD.',
      'That no single individual or unit contributes more than 80% to the total aggregate value of an output cell.',
      'That CPU utilization in the Kubernetes cluster must not exceed 80%.',
      'That 80% of database queries must be cached in memory.'
    ],
    correctIndex: 1,
    explanation: 'The dominance rule (or $p\\%$ / $n,k$ rule) prevents attribute disclosure by ensuring that a single top contributor does not account for more than 80% of an aggregated metric (e.g. clinical costs or prescription volumes).',
    citation: 'Playbook Section 1 (Key Goals) & Section 3 (Phase 1: Quantitative SDC)',
    tags: ['SDC', 'Dominance Rule']
  },
  {
    id: 'q12',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Advanced',
    question: 'A research output table shows a row with three cells: Subgroup A = 7, Subgroup B = 25, Total = 32. What SDC remediation is required before airlock release?',
    options: [
      'Release the table because the Total (32) is greater than 10.',
      'Primary suppression on Subgroup A alone (replacing 7 with *), leaving Subgroup B and Total unchanged.',
      'Both primary suppression on Subgroup A AND secondary suppression on Subgroup B (or suppressing the row total), because otherwise 7 is trivially derived by subtraction (32 - 25 = 7).',
      'Convert the entire table to a pie chart without changing numbers.'
    ],
    correctIndex: 2,
    explanation: 'Residual/secondary disclosure occurs when a suppressed cell can be deduced by subtracting remaining cells from row/column totals. Therefore, secondary suppression is mathematically mandatory.',
    citation: 'Playbook Section 2 (sdc_rules.ttl) & Section 3 (Phase 1: Quantitative SDC)',
    tags: ['SDC', 'Secondary Suppression', 'Airlock']
  },

  // Category 5: AI & MCP Governance
  {
    id: 'q13',
    category: 'AI & MCP Governance',
    difficulty: 'Intermediate',
    question: 'Which regulatory framework is incorporated into the playbook to categorize the risk tiers of autonomous analytics agents operating in the TRE?',
    options: [
      'EU AI Act',
      'PCI-DSS Version 4',
      'SOX Compliance Section 404',
      'Bluetooth Core Specification 5.3'
    ],
    correctIndex: 0,
    explanation: 'The playbook explicitly incorporates EU AI Act risk tiers (e.g. Minimal, Limited, High) to structure autonomous agent capabilities and audit obligations.',
    citation: 'Playbook Section 1 & Section 3 (Phase 1: AI Governance)',
    tags: ['EU AI Act', 'AI Governance']
  },
  {
    id: 'q14',
    category: 'AI & MCP Governance',
    difficulty: 'Intermediate',
    question: 'What does the Model Context Protocol (MCP) tool `mcp:ExecuteSQL` enforce when invoked by an autonomous analytics agent?',
    options: [
      'Full root administrative access to drop and recreate database tables',
      'Strict read-only boundaries (e.g. SELECT, EXPLAIN only), row limits, and prohibition of destructive DDL/DML statements',
      'Direct connection to external public internet APIs',
      'Bypassing all Information Governance audits'
    ],
    correctIndex: 1,
    explanation: '`mcp:ExecuteSQL` enforces read-only query bounds, row caps (e.g. max 500 rows), and network isolation, barring DROP, UPDATE, and external exfiltration.',
    citation: 'Playbook Section 2 (agent_mcp.ttl) & Section 3 (Phase 1)',
    tags: ['MCP', 'agent_mcp.ttl', 'ExecuteSQL']
  },
  {
    id: 'q15',
    category: 'AI & MCP Governance',
    difficulty: 'Advanced',
    question: 'When an autonomous agent invokes `mcp:ExportSummary` to release a synthesized report, what validation pipeline is triggered?',
    options: [
      'The file is automatically emailed to external news outlets.',
      'The request is intercepted and validated against `sdc_shapes.ttl` to guarantee primary cell suppression ($k \\ge 10$) and dominance bounds ($k% \\le 80%$) before airlock handoff.',
      'The agent increases its own token budget by 10x.',
      'The database schema is upgraded automatically.'
    ],
    correctIndex: 1,
    explanation: '`mcp:ExportSummary` is mapped in `agent_mcp.ttl` to require `sh:SDCOutputShape`, ensuring that even autonomous AI agents cannot bypass statistical disclosure checks.',
    citation: 'Playbook Section 2 (ontology/agent_mcp.ttl) & Section 3 (Phase 1 & Phase 4)',
    tags: ['MCP', 'ExportSummary', 'SDC']
  },

  // Category 6: Architecture, Repository & Workflow
  {
    id: 'q16',
    category: 'Repository & Architecture',
    difficulty: 'Foundation',
    question: 'In the repository layout defined in Section 2, where do the core OWL 2 ontology definitions reside?',
    options: [
      'Inside `.github/workflows/ci.yml`',
      'Inside the `ontology/` directory (e.g., `tre-core.ttl`, `governance_core.ttl`)',
      'Inside `web/style.css`',
      'Inside `security/opa/policy.rego`'
    ],
    correctIndex: 1,
    explanation: 'The `ontology/` directory contains `tre-core.ttl`, `governance_core.ttl`, `sdc_rules.ttl`, `agent_mcp.ttl`, and the `shapes/` directory.',
    citation: 'Playbook Section 2 (Repository Structure)',
    tags: ['Repository', 'Ontology', 'Turtle']
  },
  {
    id: 'q17',
    category: 'Repository & Architecture',
    difficulty: 'Intermediate',
    question: 'What is the purpose of `compiler/generate_docs.py` according to Phase 3 of the implementation roadmap?',
    options: [
      'To compile C++ code into WebAssembly binaries',
      'To synthesize human-readable FOI (Freedom of Information) and Governance Markdown (`GOVERNANCE_CHARTER.md`) for Trust boards and auditors',
      'To automatically purchase domain names on the internet',
      'To send marketing emails to clinical patients'
    ],
    correctIndex: 1,
    explanation: '`compiler/generate_docs.py` extracts governance metadata into human-readable Markdown (`GOVERNANCE_CHARTER.md`) for hospital Trust boards, auditors, and Freedom of Information (FOI) public inquiries.',
    citation: 'Playbook Section 2 & Section 3 (Phase 3: Public Documentation)',
    tags: ['FOI', 'Compiler', 'Documentation']
  },
  {
    id: 'q18',
    category: 'Repository & Architecture',
    difficulty: 'Foundation',
    question: 'Which terminal command compiles the semantic ontology and SDC rules into native OPA Rego policies and Cytoscape JSON?',
    options: [
      'npm start',
      'make build',
      'git push origin main --force',
      'docker prune -a'
    ],
    correctIndex: 1,
    explanation: '`make build` triggers the compilation pipeline (`generate_opa.py` and `build_graph.py`), converting Turtle ontologies into OPA Rego policies and Cytoscape graph data.',
    citation: 'Playbook Section 4 (Developer Workflow Commands: Command 4)',
    tags: ['Makefile', 'make build', 'Workflow']
  },
  {
    id: 'q19',
    category: 'Repository & Architecture',
    difficulty: 'Intermediate',
    question: 'Why does the web interface adopt a "Dual-Persona" design pattern in Phase 3?',
    options: [
      'To allow users to log in with two different passwords simultaneously',
      'To expose a clean, plain-English Governance Atlas for the public and Trust boards alongside an interactive Cytoscape knowledge graph viewer for technical engineers and auditors',
      'To run both light mode and dark mode side-by-side on two separate monitors',
      'To split web traffic across two different cloud hosting providers'
    ],
    correctIndex: 1,
    explanation: 'The Dual-Persona portal satisfies two distinct user types: plain-English governance cards for NHS Trust boards and citizen inquiries, and deep Cytoscape graph inspection for data stewards and security engineers.',
    citation: 'Playbook Section 1 (Key Goals) & Section 3 (Phase 3)',
    tags: ['Dual Persona', 'Cytoscape', 'Governance Atlas']
  },
  {
    id: 'q20',
    category: 'Five Safes & Governance',
    difficulty: 'Advanced',
    question: 'What duration is allocated to Phase 1 (Knowledge Modeling & Baseline Ontology) in the 16-week project implementation roadmap?',
    options: [
      'Weeks 1–4',
      'Weeks 5–8',
      'Weeks 9–12',
      'Weeks 13–16'
    ],
    correctIndex: 0,
    explanation: 'Phase 1 spans Weeks 1–4, establishing scope (Policy Metadata vs Runtime State), Turtle ontologies, Five Safes, SATRE pillars, SDC thresholds, and GitOps CI linting.',
    citation: 'Playbook Section 3 (Implementation Roadmap & Phases)',
    tags: ['Roadmap', 'Phase 1', 'Timeline']
  },
  {
    id: 'q21',
    category: 'Repository & Architecture',
    difficulty: 'Advanced',
    question: 'What is the exact sequence of Phase 4 deliverables leading up to full production release (Weeks 13–16)?',
    options: [
      'Deleting the repository, rewriting in Fortran, deploying to physical mainframe',
      'OPA Compilation via rdf_to_rego.py, Workspace Admission PEP integration, Network/Egress airlock controls, and W3C PROV-O audit lineage',
      'Creating paper binders for hospital nurses without any digital enforcement',
      'Disabling all firewalls to improve network download speeds'
    ],
    correctIndex: 1,
    explanation: 'Phase 4 focuses on runtime enforcement: compiling to Rego, integrating admission PEPs (Kubernetes/Gateways), locking down egress airlocks with SDC, and streaming PROV-O audit triples.',
    citation: 'Playbook Section 3 (Phase 4: Runtime Enforcement Integration)',
    tags: ['Phase 4', 'Enforcement', 'PROV-O']
  },
  {
    id: 'q22',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Advanced',
    question: 'In SHACL terminology, what is a `sh:NodeShape` and how does it relate to incoming workspace session requests?',
    options: [
      'A CSS stylesheet rule that changes the shape of HTML buttons from rectangles to circles',
      'A declarative shape target that selects target graph nodes (e.g. `tre:WorkspaceSession`) and applies property constraints that every session instance must satisfy',
      'A Kubernetes container image format',
      'An encrypted database connection string'
    ],
    correctIndex: 1,
    explanation: 'A `sh:NodeShape` targets specific RDF classes (via `sh:targetClass`) and specifies constraints across its property paths. If any constraint fails, PySHACL generates a formal validation report detailing the offending node.',
    citation: 'Playbook Section 2 & Section 3 (Phase 2: SHACL Shapes)',
    tags: ['SHACL', 'NodeShape', 'Validation']
  },
  {
    id: 'q23',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Intermediate',
    question: 'Which authoritative organizations provide the benchmark guidelines used for the quantitative SDC thresholds in the playbook?',
    options: [
      'Office for National Statistics (ONS) and SAIL Databank',
      'The International Olympic Committee and FIFA',
      'The Federal Aviation Administration and NASA',
      'The Motion Picture Association and Spotify'
    ],
    correctIndex: 0,
    explanation: 'ONS (Office for National Statistics) and the SAIL (Secure Anonymised Information Linkage) Databank are the standard UK clinical research governance bodies cited for SDC limits ($k \\ge 10$, dominance $k% \\le 80%$).',
    citation: 'Playbook Section 2 (sdc_rules.ttl) & Section 3 (Phase 1)',
    tags: ['ONS', 'SAIL', 'SDC']
  },
  {
    id: 'q24',
    category: 'AI & MCP Governance',
    difficulty: 'Foundation',
    question: 'Why are autonomous analytics agents explicitly prohibited from having unrestricted network egress in a TRE?',
    options: [
      'Because internet cables inside hospital server rooms are physically unplugged.',
      'To prevent inadvertent or adversarial exfiltration of raw patient microdata, model weights, or private database credentials.',
      'To save on cloud Wi-Fi bandwidth costs.',
      'Because LLMs cannot process HTTP packets.'
    ],
    correctIndex: 1,
    explanation: 'Unrestricted egress could allow autonomous agents to leak sensitive patient health information or bypass airlock SDC inspection through external API calls.',
    citation: 'Phase 1 (Section 1.xx: AI Governance) & Section 4.2',
    tags: ['Agent', 'Egress', 'Exfiltration']
  },
  {
    id: 'q25',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Foundation',
    question: 'What is the core building block of an RDF graph used to represent policies in the TRE playbook?',
    options: [
      'Subject-Predicate-Object triples',
      'Relational SQL foreign key tables',
      'HTML div elements',
      'Compiled binary C executables'
    ],
    correctIndex: 0,
    explanation: 'W3C RDF models knowledge as Subject-Predicate-Object triples (e.g., `tre:Session1 tre:hasEthicsApproval true`), creating an auditable, machine-traversable semantic graph.',
    citation: 'Phase 1 (Section 1.2: Baseline Ontologies)',
    tags: ['RDF', 'Triples', 'Semantic Modeling']
  },
  {
    id: 'q26',
    category: 'Semantic Modeling & SHACL',
    difficulty: 'Foundation',
    question: 'What is Turtle (.ttl) in the context of the TRE Policy-as-Code repository?',
    options: [
      'A slow database server engine',
      'A compact, human-readable textual syntax for expressing RDF ontologies and shapes',
      'A programming language used only for graphical video games',
      'A hardware dongle plugged into the researcher laptop'
    ],
    correctIndex: 1,
    explanation: 'Turtle (Terse RDF Triple Language) is the standard textual serialization format used throughout the playbook for files like `tre-core.ttl` and `access-shapes.ttl`.',
    citation: 'Phase 1 (Section 1.2)',
    tags: ['Turtle', 'Serialization', 'Syntax']
  },
  {
    id: 'q27',
    category: 'OPA Rego & Enforcement',
    difficulty: 'Foundation',
    question: 'In Open Policy Agent (OPA) Rego policies, what does `default allow = false` signify?',
    options: [
      'The policy will crash with a runtime error on any request.',
      'A zero-trust fail-closed posture: access is strictly denied unless positive matching rules grant permission.',
      'Users are allowed access only on weekends.',
      'The policy server operates without checking any certificates.'
    ],
    correctIndex: 1,
    explanation: 'Fail-closed design is fundamental to security: setting `default allow = false` guarantees that any missing attribute, unexpected request, or network timeout results in immediate denial.',
    citation: 'Phase 4 (Section 4.1: OPA Rego Compilation)',
    tags: ['Rego', 'Zero-Trust', 'Fail-Closed']
  },
  {
    id: 'q28',
    category: 'OPA Rego & Enforcement',
    difficulty: 'Foundation',
    question: 'What is the role of a Policy Decision Point (PDP) compared to a Policy Enforcement Point (PEP)?',
    options: [
      'The PDP evaluates policies and returns an allow/deny verdict, while the PEP intercepts actions and enforces that verdict.',
      'The PDP encrypts hard drives, while the PEP is a physical security guard.',
      'The PDP is for billing, while the PEP is for software licensing.',
      'They are identical and cannot be decoupled.'
    ],
    correctIndex: 0,
    explanation: 'In the classic XACML/zero-trust model, the PEP (Kubernetes Admission controller / API gateway) intercepts requests and asks the PDP (OPA) for a decision, cleanly separating decision logic from enforcement.',
    citation: 'Phase 4 (Section 4.1 & 4.2)',
    tags: ['PDP', 'PEP', 'Architecture']
  },
  {
    id: 'q29',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Foundation',
    question: 'What is the primary rationale for the primary cell suppression threshold ($k \\ge 10$) in clinical research outputs?',
    options: [
      'To prevent hard drives from running out of storage space.',
      'To avoid disclosing identifiable facts about small cohorts where an individual could be easily singled out.',
      'Because numbers under 10 cannot be displayed in standard PDF fonts.',
      'To make research papers shorter in length.'
    ],
    correctIndex: 1,
    explanation: 'When a cell frequency is very small (1 to 9), anyone with background knowledge (or the subjects themselves) can determine who had a rare diagnosis, breaching patient confidentiality.',
    citation: 'Phase 1 (Section 1.2) & Phase 4 (Section 4.2)',
    tags: ['SDC', 'Primary Suppression', 'Thresholds']
  },
  {
    id: 'q30',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Advanced',
    question: 'Why does removing patient names and addresses from a research dataset NOT guarantee that the dataset is anonymous?',
    options: [
      'Because computers can read handwritten notes.',
      'Because combinations of quasi-identifiers (e.g. appointment date/time, birth month/year, 3-digit postcode, rare diagnosis) form unique fingerprints that allow re-identification via data linkage.',
      'Because researchers can guess the names randomly.',
      'Because UK GDPR does not permit mathematical de-identification.'
    ],
    correctIndex: 1,
    explanation: 'Quasi-identifiers (dates of hospital visits, demographic traits, geographic codes) can be cross-referenced with public voter rolls, obituaries, or social media to identify individuals with high statistical confidence (Sweeney theorem).',
    citation: 'Phase 1 (Section 1.2: Clinical Tiers) & SDC Principles',
    tags: ['Quasi-Identifiers', 'Re-identification', 'Linkage']
  },
  {
    id: 'q31',
    category: 'Quantitative SDC & Airlock',
    difficulty: 'Advanced',
    question: 'In survival analysis (Kaplan-Meier curves), what SDC hazard occurs near the tail of the curve, and how is it mitigated?',
    options: [
      'The graph line turns red; mitigated by changing printer ink.',
      'When the number of patients at risk falls below 10, individual step-down drops disclose the exact timing of individual deaths; mitigated by smoothing or truncating the curve when risk set < 10.',
      'Mathematical logarithms become negative; mitigated by adding 100 to all numbers.',
      'Researchers cannot read the x-axis; mitigated by zooming in.'
    ],
    correctIndex: 1,
    explanation: 'As the risk set decreases, each discrete step on a Kaplan-Meier plot represents an individual patient event. SDC guidelines require truncating curves or applying smoothing algorithms when the active risk set drops below $k = 10$.',
    citation: 'SDC Analytical Guidelines & Phase 4 Airlock Controls',
    tags: ['Kaplan-Meier', 'Survival Analysis', 'SDC Rules']
  },
  {
    id: 'q32',
    category: 'AI & MCP Governance',
    difficulty: 'Intermediate',
    question: 'What is the Model Context Protocol (MCP) and how does it protect TRE enclaves from rogue LLM actions?',
    options: [
      'A protocol that automatically publishes patient records to public forums.',
      'An open standard for agent tool communication that allows enclaves to jail tool capabilities to read-only statements, cap row counts, and block raw data exfiltration.',
      'A programming language replacing Python for deep learning.',
      'A proprietary graphics driver developed by video game consoles.'
    ],
    correctIndex: 1,
    explanation: 'MCP standardizes how LLM agents interact with tools. The TRE architecture applies SHACL and OPA constraints on MCP tool payloads (restricting queries to SELECT/EXPLAIN and capping row returns to 500).',
    citation: 'Phase 1 (Section 1.1) & Phase 4 (Section 4.1)',
    tags: ['MCP', 'LLM Security', 'Tool Jailing']
  },
  {
    id: 'q33',
    category: 'Repository & Architecture',
    difficulty: 'Foundation',
    question: 'Which file in the repository layout contains the compiled, production-ready Rego rules for the Open Policy Agent?',
    options: [
      'security/opa/authz.rego',
      'README.md',
      '.gitignore',
      'web/style.css'
    ],
    correctIndex: 0,
    explanation: '`security/opa/authz.rego` is the compiled target policy file containing evaluated rules for workspace admission, egress airlocks, and MCP tool boundaries.',
    citation: 'Section 0 & Phase 4 (Section 4.1)',
    tags: ['authz.rego', 'Repository Layout', 'OPA']
  },
  {
    id: 'q-iso-42001',
    category: 'AI & MCP Governance',
    difficulty: 'Advanced',
    question: 'Under ISO/IEC 42001:2023 (Artificial Intelligence Management System) and ISO/IEC 5259 series, what is mandatory before an AI model training workload is orchestrated inside a data analysis & intelligence platform?',
    options: [
      'The model weights must be pre-published on a public registry and training data must be transferred to external developer laptops.',
      'A formal model risk tier classification must be documented, cryptographic training data provenance verified under ISO 5259, algorithmic bias audits passed, and egress network isolation enforced.',
      'Only unaccredited researchers may initiate model training provided they do not use GPU accelerators.',
      'ISO 42001 permits complete exemption from Five Safes governance provided the model parameters exceed 70 billion tokens.'
    ],
    correctIndex: 1,
    explanation: 'ISO/IEC 42001:2023 requires rigorous lifecycle governance for AI systems: establishing explicit risk tier classifications, validating data quality and cryptographic provenance via ISO/IEC 5259, conducting bias audits, and enforcing closed-world network egress isolation.',
    citation: 'Section 3. Phase 3: AI & Dual-Persona Enclave Governance & ISO 42001',
    tags: ['ISO 42001', 'ISO 5259', 'AIMS', 'AI Governance']
  },
  {
    id: 'q-dcb-0129-0160',
    category: 'Five Safes & Governance',
    difficulty: 'Advanced',
    question: 'What statutory role and artifact are legally required under NHS Information Standards DCB0129 and DCB0160 before an algorithmic health software tool developed in the platform can be deployed in clinical NHS care?',
    options: [
      'An unverified self-declaration from the lead machine learning researcher without clinical input.',
      'A registered Clinical Safety Officer (CSO) must sign off on a formal Clinical Safety Case Report and Hazard Log with acceptable residual risk (hazard index <= 2).',
      'A verbal agreement from any hospital IT technician at the time of pod deployment.',
      'DCB0129 only applies to paper medical record filing systems and does not govern health software or ML algorithms.'
    ],
    correctIndex: 1,
    explanation: 'DCB0129 is a mandatory NHS Information Standard requiring health software manufacturers to employ an accredited Clinical Safety Officer (CSO) who oversees hazard identification and approves the formal Clinical Safety Case Report before deployment.',
    citation: 'Section 3 (Phase 4 Runtime Enforcement) & DCB0129 / DCB0160 Standard',
    tags: ['DCB0129', 'DCB0160', 'CSO', 'Clinical Risk Management']
  },
  {
    id: 'q-samd-uk-mdr',
    category: 'AI & MCP Governance',
    difficulty: 'Intermediate',
    question: 'When an AI model trained within a data analysis & intelligence platform provides diagnostic predictions or influences clinical decision-making, which UK regulation governs its medical device classification?',
    options: [
      'UK Medical Devices Regulations 2002 (UK MDR 2002, as amended) and MHRA Software as a Medical Device (SaMD) guidance.',
      'The Open Source Initiative (OSI) Apache 2.0 license exclusively.',
      'The W3C Semantic Web RDF Primer.',
      'Local hospital procurement guidelines with no statutory regulatory standing.'
    ],
    correctIndex: 0,
    explanation: 'Software that processes clinical data to provide diagnostic, prognostic, or treatment recommendations is classified as Software as a Medical Device (SaMD) regulated by the MHRA under the UK MDR 2002.',
    citation: 'Section 3. Phase 3 & MHRA SaMD Guidance',
    tags: ['UK MDR 2002', 'SaMD', 'MHRA', 'Medical Devices']
  },
  {
    id: 'q-seawater-metaphor',
    category: 'Repository & Architecture',
    difficulty: 'Foundation',
    question: 'How does Project Wavebound model the clinical research data problem space through its tidal navigation metaphor?',
    options: [
      'As a completely static, isolated offline pond where data never enters and results never leave.',
      'As an open, turbulent sea where vessels (research workloads) navigate the flood tide of data ingress and the ebb tide of model egress, protected by SHACL and OPA breakwaters.',
      'As an uncontrolled open internet torrent with zero privacy or disclosure control locks.',
      'As a submarine cable that bypasses all NHS Information Governance approvals.'
    ],
    correctIndex: 1,
    explanation: 'Project Wavebound models clinical data governance as navigating an open maritime problem space: incoming data enters on the flood tide (ingress) through salinity gatekeepers, while outgoing models and statistics exit on the ebb tide (egress) through mathematical sea-locks and breakwaters.',
    citation: 'Section 0. Executive Summary & Problem Space',
    tags: ['Project Wavebound', 'Tidal Metaphor', 'Ingress', 'Egress']
  }
];
