import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useUserProgress } from '../context/ProgressContext';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { WaveboundLogo } from './WaveboundLogo';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  Workflow,
  Users,
  Compass,
  Layers,
  Scale,
  Server,
  Info,
  Database
} from 'lucide-react';

interface PlaybookSection {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  executiveSummary?: string;
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  technicalImplementation?: {
    format: string;
    title: string;
    code: string;
  };
  keyTakeaways: string[];
}

const PLAYBOOK_SECTIONS: PlaybookSection[] = [
  {
    id: 'sec-front-matter',
    number: '0',
    title: 'Executive Front Matter: Ontology-led Information Governance',
    subtitle: 'Connecting governance meaning, accountable human decisions and proposed technical safeguards',
    executiveSummary: 'An ontology-led IG reference architecture connecting legal and ethical requirements, accountable human decisions and proposed safeguards. OWL/RDF examples illustrate governance meaning; executable compilation and production enforcement are not yet delivered.',
    content: [
      'Wavebound is an ontology-led information governance playbook and reference architecture connecting legal and ethical requirements, institutional decisions and technical safeguards for sensitive research data.',
      '• Governance Meaning — IG OWL/RDF Ontology: The proposed semantic model connects people, projects, datasets, purposes, permissions, approvals, responsibilities and evidence. The ontology is the connective tissue of the architecture, not just a diagram: which decision authorises which activity, for which data, under what conditions, and with whose accountability?',
      '• Human Understanding — Playbook & Atlas: Plain-English explanations and graph visualisations support governance leads, researchers, platform teams and public oversight panels. Applicable REC approvals, Caldicott Guardian determinations and Data Access Committee decisions remain accountable human actions, not outcomes inferred from a graph.',
      '• Operational Translation — Proposed Validation & Enforcement: OWL/RDF represents meaning and relationships. SHACL expresses explicit validation constraints; policy-as-code expresses reviewed decision rules for an enforcement point. These are separate functions: OWL reasoning does not itself validate an access request or enforce a permission, and law is not automatically compiled into code.',
      '• Current Maturity: Today the repository provides an interactive application, governance visualisations and illustrative OWL/RDF, SHACL and Rego snippets. A standalone validated IG ontology, executable semantic compiler and production enforcement integration are not yet delivered. The Policy Sandbox is a browser-side demonstration, not a security control. Later sections describe illustrative target patterns; example filenames, thresholds and performance figures are not evidence of deployed controls.',
      '• Dual-Wave Navigation: Inward enclave security concerns what enters a research environment: people, projects, data and workloads. Outward governance concerns what leaves it: outputs, disclosure review, decision evidence and public transparency. The playbook proposes coordinated safeguards across both boundaries; it does not currently grant access or operate an export airlock.',
      '• UK Governance Context: Shared health-information security concerns are distributed across distinct sources rather than represented here as a direct NEN 7510 equivalent. UK GDPR and the Data Protection Act 2018, confidentiality duties, Caldicott guidance, NHS England DSPT assurance and applicable research approvals have different authority and scope. England-specific processes are not a single UK-wide regime; applicability and current source versions require review.',
      '• Authority & Traceability: Semantic mappings should preserve the source, jurisdiction, applicability, approved interpretation and accountable owner. Section 251 support concerns confidentiality in specified circumstances; CAG advises the relevant decision maker. Such support is not a substitute for a UK GDPR lawful basis, and an ethics approval is not a universal data-access permission.',
      '• Implementation Gate: Proposed controls need approved decisions, trusted input contracts, automated tests, enforcement integration, audit evidence and release approval before they can be called operational. Version control supports review but does not by itself prove compliance, prevent policy drift or establish legal authority.'
    ],
    keyTakeaways: [
      'The IG OWL/RDF ontology is the architectural foundation, currently illustrated rather than delivered as a standalone validated ontology.',
      'Governance meaning, human approvals, validation and runtime enforcement are distinct layers.',
      'The dual-wave model connects inward enclave security with outward governance and public accountability.',
      'Legal sources, standards and assurance schemes have different scope; mappings do not establish equivalence or approval.',
      'Operational enforcement remains implementation work subject to decision gates and evidence.'
    ]
  },
  {
    id: 'sec-phase-1-1',
    number: '1.1',
    title: 'Foundational Architecture: Governance Metadata vs. Ephemeral Runtime State',
    subtitle: 'Proposed separation of reviewed governance assertions from transient infrastructure state',
    executiveSummary: 'The proposed architecture separates reviewed OWL/RDF assertions from ephemeral infrastructure. Assertions require source provenance, validity and revocation handling; a graph statement alone does not grant permission.',
    content: [
      '• Plain-English Architecture Principle: Systems break when enduring governance laws are conflated with ephemeral infrastructure plumbing.',
      '• 1. Governance Metadata (Reviewed Assertions): The proposed OWL/RDF model represents project purposes, institutional decisions, permissions and evidence with source provenance and validity conditions. Accreditation, training and approvals can expire or be revoked; graph assertions are not immutable legal truths. The illustrative name tre-core.ttl denotes a proposed artifact, not an existing ontology file.',
      '• 2. Ephemeral Runtime State (The Infrastructure Plumbing): Transient, mechanical facts of the live compute fabric managed by container orchestrators, network CNI, and operating system kernels. Examples include: internal IP addresses (10.244.2.14), ephemeral network sockets, container process IDs, CPU/GPU quotas, and transient JWT bearer tokens. This state is spun up, scaled, rescheduled, and recycled continuously.',
      '• 3. The Classic Infrastructure Trap: Traditional IT configurations mistakenly hardcode governance rules directly into cluster network rules or pod name whitelists (e.g. "allow IP 10.244.2.14 to access clinical database X"). When a container crashes, restarts, or migrates to a different worker node, the IP changes, causing immediate outages or leaving behind orphaned, unverified permissions.',
      '• 4. Proposed Integration Pattern: An admission service could evaluate trusted researcher and project claims against approved policy rules derived from reviewed governance assertions. A graph statement alone is not permission: the organisation must define all relevant conditions, freshness checks, failure behaviour and enforcement tests. This integration is not implemented in the current application.'
    ],
    keyTakeaways: [
      'The reference architecture separates governance meaning from ephemeral runtime state.',
      'Reviewed assertions need provenance, validity and revocation handling, not just version control.',
      'Admission and audit integrations remain proposed, requiring trusted inputs and verified controls.'
    ]
  },
  {
    id: 'sec-phase-1-2',
    number: '1.2',
    title: 'Core Ontologies: Formalizing the Five Safes & SATRE Framework',
    subtitle: 'Illustrative OWL/RDF modelling; proposed filenames and classifications require review',
    executiveSummary: 'Embedded Turtle examples sketch the IG ontology and Five Safes relationships. Proposed ontology files and classifications require review and validation; the visual graph is not a standalone validated ontology.',
    content: [
      '• Illustrative Five Safes Modelling: The embedded Turtle snippet sketches candidate concepts. ontology/tre-core.ttl and governance_core.ttl are proposed artifacts, not delivered files. A validated IG ontology requires reviewed definitions, relationships, provenance and tests; the visual graph is not itself that ontology. The following descriptions are target examples, not approved universal requirements:',
      '   - Safe People: tre:SafePerson with mandatory institutional accreditation and active Information Governance (IG) training. Note: AI models and agents are NEVER Safe People; they operate strictly as delegated machine workloads under an accredited human researcher sponsor.',
      '   - Safe Projects: tre:SafeProject with NHS Research Ethics Committee (REC) approvals and Section 251 exemption bindings.',
      '   - Safe Settings: tre:SafeSetting mandating zero-egress VPC subnets, air-gapped compute, and multi-factor authentication.',
      '   - Safe Data: tre:SafeData classifying records into Hospital Operational Tiers (Tier 1: Aggregate/Synthetic, Tier 2: De-identified Pseudonymous, Tier 3: Sensitive Clinical/Identifiable under s251). Pre-trained foundation models, embeddings, and fine-tuned checkpoints ARE Data Assets subject to disclosure controls.',
      '   - Safe Outputs: tre:SafeOutput requiring quantitative SDC clearance and differential privacy / memorization verification before airlock egress.',
      '• Stanford UIT Agentic AI Security Framework Integration: Formally aligns agentic workloads with Stanford UIT cybersecurity mandates: automated near-instantaneous token revocation, blast radius containment, read-only SELECT permissions, and risk categorization (Section 8702 High Risk vs Section 8938 Very High Risk).',
      '• SATRE Pillars Integration: Aligns tre-core.ttl with the 4 pillars of the Standard Architecture for Trusted Research Environments (Information Governance, Computing Infrastructure, Data Management, Software Operations).'
    ],
    codeBlock: {
      language: 'turtle',
      code: `@prefix tre: <https://w3id.org/tre/core#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:FiveSafesDimension a owl:Class .

tre:SafePerson a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension ;
    rdfs:comment "Accredited researcher holding verified annual IG training." .

tre:SafeSetting a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension ;
    tre:enclaveEgressBlocked true ;
    tre:networkIsolationTier "ZeroEgressVPC" .

tre:SafeData a owl:Class ;
    rdfs:subClassOf tre:FiveSafesDimension ;
    tre:hospitalDataTier "Tier2_Pseudonymised" ;
    tre:directIdentifiersExcluded true .`
    },
    keyTakeaways: [
      'Formalizes the Five Safes and SATRE standards into machine-queryable OWL classes.',
      'Maps clinical datasets to hospital operational sensitivity tiers.',
      'Creates explicit semantic relationships between research projects and required ethical clearances.'
    ]
  },
  {
    id: 'sec-phase-2-1',
    number: '2.1',
    title: 'Validation Logic: Resolving OWA to CWA via SHACL Shapes',
    subtitle: 'Enforcing Closed-World security constraints in access-shapes.ttl and sdc_shapes.ttl',
    content: [
      '• The Open-World Assumption (OWA) Vulnerability: In standard semantic web systems (OWL 2/RDF), the absence of a statement is assumed unknown, NOT false. For security, OWA is disastrous: an unstated accreditation would simply pass unverified.',
      '• Closed-World Assumption (CWA) via SHACL: W3C SHACL (Shapes Constraint Language) turns graph definitions into strict, deterministic pass/fail validation shapes. If any required property is missing or out of bounds, validation immediately aborts.',
      '• Workspace Admission Shape (`access-shapes.ttl`): Validates `sh:minCount 1` on accredited researchers, `sh:hasValue true` on ethics clearance, and `sh:hasValue true` on zero-egress network isolation.',
      '• Quantitative SDC Airlock Shape (`sdc_shapes.ttl`): Validates that tabular exports satisfy `tre:minObservedCellCount >= 10` and `tre:topContributorDominanceRatio <= 0.80`.'
    ],
    codeBlock: {
      language: 'turtle',
      code: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

tre:WorkspaceAdmissionShape a sh:NodeShape ;
    sh:targetClass tre:WorkspaceSession ;
    sh:property [
        sh:path tre:hasAccreditedResearcher ;
        sh:minCount 1 ;
        sh:message "Session must be bound to an accredited researcher with active credentials." ;
    ] ;
    sh:property [
        sh:path tre:hasEthicsApproval ;
        sh:hasValue true ;
        sh:message "Active NHS REC ethics approval is required before cluster launch." ;
    ] ;
    sh:property [
        sh:path tre:enclaveEgressBlocked ;
        sh:hasValue true ;
        sh:message "Zero-trust network violation: Enclave must have external egress blocked." ;
    ] .`
    },
    keyTakeaways: [
      'SHACL resolves the dangerous Open-World Assumption into deterministic Closed-World security.',
      'Shape constraints return structured violation reports with pinpoint error paths.',
      'Guarantees admission and egress gates have mathematical, non-bypassable validation contracts.'
    ]
  },
  {
    id: 'sec-phase-2-2',
    number: '2.2',
    title: 'Automated Verification: PySHACL CI Test Harnesses & Fixtures',
    subtitle: 'Executing continuous pytest validation suites against compliant and non-compliant session graphs',
    content: [
      '• Unit Testing Semantic Policies: Just like application code, governance policies require comprehensive automated unit tests in CI/CD before deployment.',
      '• Test Fixtures (`tests/fixtures/`):',
      '   - `valid-session.ttl`: Compliant test instance with verified researcher, current IG certificate, valid REC approval, and zero-egress enclave configuration.',
      '   - `noncompliant-session.ttl`: Defective test fixture intentionally omitting researcher accreditation and simulating an un-isolated network interface.',
      '• PySHACL Test Runner (`tests/test_shapes.py`): Invokes the W3C SHACL engine in Python, asserting `conforms == True` on valid fixtures and asserting specific shape violation messages on non-compliant fixtures.'
    ],
    codeBlock: {
      language: 'python',
      code: `import pytest
from pyshacl import validate
import rdflib

def test_compliant_session():
    data_graph = rdflib.Graph().parse("tests/fixtures/valid-session.ttl", format="turtle")
    shapes_graph = rdflib.Graph().parse("ontology/shapes/access-shapes.ttl", format="turtle")
    conforms, _, results_text = validate(data_graph, shacl_graph=shapes_graph)
    assert conforms is True, f"Compliant session failed validation: {results_text}"

def test_noncompliant_session_rejected():
    data_graph = rdflib.Graph().parse("tests/fixtures/noncompliant-session.ttl", format="turtle")
    shapes_graph = rdflib.Graph().parse("ontology/shapes/access-shapes.ttl", format="turtle")
    conforms, _, results_text = validate(data_graph, shacl_graph=shapes_graph)
    assert conforms is False, "Defective session unexpectedly passed validation!"
    assert "Session must be bound to an accredited researcher" in results_text`
    },
    keyTakeaways: [
      'Continuous Integration (CI) enforces that no broken policy can be merged to main.',
      'Positive and negative fixtures provide regression protection as policies evolve.',
      'PySHACL provides standardized W3C conformance reporting.'
    ]
  },
  {
    id: 'sec-phase-3-1',
    number: '3.1',
    title: 'Public Transparency: Automated FOI Governance Charters',
    subtitle: 'Synthesizing machine-readable Turtle ontologies into human-readable trust documentation',
    content: [
      '• Bridging Engineers, Trust Boards, and the Public: A major challenge in population data research governance is communicating technical code rules to Caldicott Guardians, NHS Trust Boards, ethics committees, and patient participants.',
      '• Automated Markdown Synthesizer (`compiler/generate_docs.py`): Traverses the RDF graphs and SHACL shape definitions to produce an up-to-date, transparent `GOVERNANCE_CHARTER.md`.',
      '• Freedom of Information (FOI) Readiness: When external audits or FOI queries arrive, the generated charter provides an exact, cryptographic summary of all active data safeguards, data tiering criteria, and disclosure thresholds.'
    ],
    keyTakeaways: [
      'Eliminates the gap between technical firewall rules and public governance promises.',
      'Guarantees documentation is never out of sync with deployed enforcement rules.',
      'Provides Caldicott Guardians and patient advocacy groups with plain-English compliance summaries.'
    ]
  },
  {
    id: 'sec-phase-3-2',
    number: '3.2',
    title: 'Dual-Persona Architecture: Patient Atlas & Knowledge Graph',
    subtitle: 'Interactive Cytoscape network explorer paired with public-facing patient journey maps',
    content: [
      '• Dual-Persona UX Architecture:',
      '   - Public / Patient View (Governance Atlas): A calm, non-technical, 5-step journey explaining how personal health data is guarded (Caldicott Principles, tiered de-identification, and strict export airlocks).',
      '   - Technical / Systems View (Knowledge Graph): An interactive Cytoscape canvas mapping the full compilation pipeline from OWL Policies down to SHACL Shapes, OPA Rego rules, and PROV-O audit trails.',
      '• Interactive Inspection: Users can click any node in the graph to inspect exact source file locations, formal definitions, and executable code snippets.'
    ],
    keyTakeaways: [
      'Meets public transparency obligations without overwhelming non-technical visitors with raw code.',
      'Empowers system architects and security auditors with complete graphical traceability.',
      'Demonstrates full compliance with NHS Caldicott Principle 8 (No surprises for patients).'
    ]
  },
  {
    id: 'sec-phase-4-1',
    number: '4.1',
    title: 'Runtime Decision Engine: OPA Rego Policy Compilation',
    subtitle: 'Translating semantic graph constraints into sub-millisecond PDP decision rules',
    content: [
      '• The Compilation Pipeline (`compiler/rdf_to_rego.py`): While RDF/OWL is ideal for knowledge representation, graph queries are too computationally heavy for real-time packet filtering and container admission. The compiler translates SHACL constraints and SDC math into optimized Open Policy Agent (OPA) Rego rules (`security/opa/authz.rego`).',
      '• Decoupled Policy Decision Point (PDP): OPA operates as a high-performance daemon evaluating incoming JSON context documents against compiled Rego logic in sub-millisecond latency.',
      '• Fail-Closed Default: Rego policies enforce `default allow = false` and `default egress_permitted = false`, ensuring any malformed or unexpected request is rejected by default.'
    ],
    codeBlock: {
      language: 'rego',
      code: `package tre.authz

default allow = false
default egress_permitted = false

# Rule 1: Workspace Admission PDP (Compiled from tre:WorkspaceAdmissionShape)
allow {
    input.request_type == "workspace_admission"
    input.researcher.accreditation_valid == true
    input.researcher.ig_training_expiry > time.now_ns()
    input.project.ethics_approval_active == true
    input.enclave.egress_blocked == true
}

# Rule 2: Quantitative SDC Airlock PDP (Compiled from tre:AirlockOutputShape)
egress_permitted {
    input.request_type == "airlock_export"
    input.dataset.min_cell_count >= 10
    input.dataset.max_dominance_ratio <= 0.80
    not any_unmasked_pii(input.dataset.columns)
}

any_unmasked_pii(columns) {
    dangerous_cols := {"nhs_number", "patient_name", "date_of_birth", "postcode"}
    some col in columns
    dangerous_cols[col]
}`
    },
    keyTakeaways: [
      'Achieves microsecond authorization decisions at line rate.',
      'Enforces fail-closed security: missing inputs immediately trigger authorization denial.',
      'Guarantees compiled runtime rules strictly reflect the underlying semantic ontology.'
    ]
  },
  {
    id: 'sec-phase-4-2',
    number: '4.2',
    title: 'Policy Enforcement Points (PEP): Admission, Network & Airlock',
    subtitle: 'Integrating OPA with Container & Service Admission Webhooks, VPC Firewalls, and Airlock Gates',
    content: [
      '• PEP Architectural Distribution:',
      '   - Workspace Admission PEP: Namespaced Admission Controllers intercept pod creation events (e.g., launching researcher JupyterLab containers in the research sandbox) using an audit-and-alert pattern (`failurePolicy: Ignore`) to avoid blocking cluster operations while enforcing least-privilege RBAC. The controller queries OPA and logs any policy discrepancies.',
      '   - Network & Air-Gapped Safe Setting PEP: Calico CNI NetworkPolicies sever outbound internet access, directing all package installations to internal mirrors (CRAN, PyPI, Harbor). Heavy analytical queries (DuckDB/PostgreSQL) bypass userspace proxies to eliminate TCP connection bottlenecks.',
      '   - SDC Airlock Egress PEP: When researchers submit tables or models for release, the airlock service compiles a standardized evidence pack with automated SDC metrics ($k \\ge 10$, dominance $\\le 80\\%$) to assist human airlock and DAAG panels.'
    ],
    keyTakeaways: [
      'PEPs operate within restricted namespaces without requiring high-risk cluster-admin privileges.',
      'Multi-layer defense: namespaced admission audit, air-gapped network policies with internal mirrors, and airlock export validation.',
      'Automated SDC filtering generates standardized evidence packs for final human panel sign-off.'
    ]
  },
  {
    id: 'sec-phase-4-3',
    number: '4.3',
    title: 'Cryptographic Audit Lineage: W3C PROV-O Triples & Tooling',
    subtitle: 'Emitting immutable provenance records tied to versioned policy Git commit hashes',
    content: [
      '• Immutable W3C PROV-O Audit Lineage: On every major event (workspace admission permitted, access revoked, airlock export approved or blocked), the PEP emits an immutable W3C PROV-O RDF triple to an append-only audit stream.',
      '• Cryptographic Policy Hash: Every audit record contains the SHA-256 hash of the exact policy commit and Rego ruleset that evaluated the decision, guaranteeing non-repudiation.',
      '• Standard Makefile Dev Commands: Developers, security engineers, and CI pipelines run standard operational targets:'
    ],
    codeBlock: {
      language: 'bash',
      code: `# 1. Install dependencies including PySHACL, rdflib, and pytest
make install

# 2. Run SHACL closed-world tests (verifies Five Safes, MCP scopes, and SDC limits)
pytest tests/test_shapes.py -v

# 3. Generate human-readable FOI & Governance Report
python compiler/generate_docs.py

# 4. Compile ontology and SDC rules into native OPA Rego policies & Cytoscape JSON
make build

# 5. Launch the public interface locally
make serve`
    },
    keyTakeaways: [
      'W3C PROV-O creates an unalterable audit trail tying decisions to specific policy git commits.',
      'Enables post-incident forensic replay of any authorization decision.',
      'Clean developer CLI workflow facilitates rapid, verified policy iteration.'
    ]
  }
];

interface PlaybookReaderProps {
  onNavigateToGlossaryTerm: (termId: string) => void;
  onNavigateToConcept: (conceptId: string) => void;
  onNavigateToQuiz: (category?: string) => void;
  onNavigateToImplementationTrack?: () => void;
  targetSectionId?: string | null;
  targetHighlightTerm?: string;
  onClearTargetSection?: () => void;
}

export const PlaybookReader: React.FC<PlaybookReaderProps> = ({
  onNavigateToGlossaryTerm,
  onNavigateToConcept,
  onNavigateToQuiz,
  onNavigateToImplementationTrack,
  targetSectionId,
  targetHighlightTerm,
  onClearTargetSection,
}) => {
  const { readSections, markSectionRead, markAllSectionsRead } = useUserProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTooltipTerm, setActiveTooltipTerm] = useState<GlossaryTerm | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [expandedIntro, setExpandedIntro] = useState(true);
  const [expandedTechnicalSchemas, setExpandedTechnicalSchemas] = useState<Record<string, boolean>>({});
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll and highlight when targetSectionId is received
  useEffect(() => {
    if (targetSectionId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`section-${targetSectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-2', 'ring-cyan-400', 'bg-cyan-950/40');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-cyan-400', 'bg-cyan-950/40');
          }, 3500);
        }
        if (onClearTargetSection) {
          onClearTargetSection();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [targetSectionId, onClearTargetSection]);

  // Search match statistics across all sections
  const searchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const matches: { sectionId: string; textSnippet: string; lineIndex: number }[] = [];

    PLAYBOOK_SECTIONS.forEach((sec) => {
      sec.content.forEach((line, idx) => {
        if (line.toLowerCase().includes(query)) {
          matches.push({ sectionId: sec.id, textSnippet: line, lineIndex: idx });
        }
      });
      if (sec.codeBlock && sec.codeBlock.code.toLowerCase().includes(query)) {
        matches.push({ sectionId: sec.id, textSnippet: 'Code Snippet match', lineIndex: -1 });
      }
    });

    return matches;
  }, [searchQuery]);

  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [searchQuery]);

  const handleJumpToMatch = (index: number) => {
    if (searchMatches.length === 0) return;
    const target = searchMatches[index];
    if (target) {
      const el = document.getElementById(`section-${target.sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Helper to highlight terms and search queries in content
  const renderInteractiveText = (text: string) => {
    // If search query is active, highlight the query matches first
    if (searchQuery.trim()) {
      const parts = text.split(new RegExp(`(${searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
      return parts.map((part, i) => {
        if (part.toLowerCase() === searchQuery.toLowerCase()) {
          return (
            <mark
              key={i}
              className="bg-amber-400 text-slate-950 font-semibold px-1 rounded shadow-sm animate-pulse"
            >
              {part}
            </mark>
          );
        }
        return renderGlossaryBadges(part, i);
      });
    }

    return renderGlossaryBadges(text, 0);
  };

  // Scan text for known glossary terms and create interactive popover links
  const renderGlossaryBadges = (rawText: string, keyPrefix: number) => {
    // Terms ordered by length descending so longer phrases match first
    const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);

    // Create regex matching whole terms or known acronyms
    const termNames = sortedTerms.map((t) => t.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const acronyms = sortedTerms.filter((t) => t.acronym).map((t) => t.acronym!.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const combinedTokens = Array.from(new Set([...termNames, ...acronyms]));

    const regex = new RegExp(`\\b(${combinedTokens.join('|')})\\b`, 'i');
    const pieces = rawText.split(regex);

    if (pieces.length === 1) return rawText;

    return pieces.map((piece, idx) => {
      const matchedTerm = sortedTerms.find(
        (t) => t.term.toLowerCase() === piece.toLowerCase() || (t.acronym && t.acronym.toLowerCase() === piece.toLowerCase())
      );

      if (matchedTerm) {
        return (
          <span key={`${keyPrefix}-${idx}`} className="relative inline-block group">
            <button
              onClick={() => onNavigateToGlossaryTerm(matchedTerm.id)}
              onMouseEnter={() => setActiveTooltipTerm(matchedTerm)}
              className="inline-flex items-baseline text-cyan-300 font-medium underline decoration-cyan-500/50 decoration-1 underline-offset-2 hover:text-cyan-100 hover:decoration-cyan-400 hover:bg-cyan-950/60 px-1 py-0.5 rounded transition-colors cursor-pointer"
              title={`Click to inspect '${matchedTerm.term}' in the Glossary`}
            >
              {piece}
            </button>
          </span>
        );
      }
      return piece;
    });
  };

  const completedCount = readSections.length;
  const totalSections = PLAYBOOK_SECTIONS.length;
  const progressPercent = Math.round((completedCount / totalSections) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8" ref={contentContainerRef}>
      {/* Title & Reading Progress Bar Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <WaveboundLogo variant="badge" size="sm" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SemVer 2.4.0-prod</span>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Project Wavebound: Policy-as-Code Playbook
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                This playbook provides a Policy as Code (PaC) framework, bridging regulatory compliance documentation and real-time execution by compiling human- and machine-readable semantic graph ontologies into Policy Decision Points (PDPs) and Policy Enforcement Points (PEPs) across data intelligence platforms. Please note that this project is a work in progress.
              </p>
            </div>
          </div>

          {/* Reading Tracker Widget */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Playbook Reading</span>
              <span className="font-semibold text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>{completedCount} of {totalSections} sections</span>
              {completedCount < totalSections ? (
                <button
                  onClick={markAllSectionsRead}
                  className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-500/40"
                >
                  Mark All Read
                </button>
              ) : (
                <span className="text-emerald-400 font-medium">All Read ✓</span>
              )}
            </div>
          </div>
        </div>

        {/* Executive Summary & Introduction to the Playbook itself */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60">
                  Executive Brief &amp; Overview
                </span>
                <span className="text-xs text-slate-400">Governance &amp; Engineering Guide</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Introduction to the Wavebound Playbook
              </h2>
            </div>
            <button
              onClick={() => setExpandedIntro(!expandedIntro)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/80 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>{expandedIntro ? 'Hide Overview' : 'Show Overview'}</span>
              {expandedIntro ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {expandedIntro && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {/* Context & Wavebound Problem Space */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>The Wavebound Problem Space &amp; Tidal Flow Model</span>
                  </h3>
                  <p>
                    <strong>Project Wavebound</strong> models population analytics and research through a structured tidal navigation framework. Modern data platforms do not operate in a static vacuum: analytical workloads (from exploratory query scripts to distributed foundation model pipelines) must navigate regulatory requirements, information governance channels, and personal privacy and confidentiality thresholds.
                  </p>
                  <p>
                    Governance operates across two coordinated directional flows:
                  </p>
                  <div className="space-y-2 pl-1">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="font-semibold text-cyan-300 block">
                        • Ingress (Inward Flow): Access Controls, Safe People &amp; Safe Projects
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Inbound flow enforces gateway access controls, researcher accreditation, institutional identity verification, and mandatory Information Governance training (Safe People), alongside approved NHS REC ethics protocols, research purpose justification, and Section 251 CAG exemptions (Safe Projects). Inbound datasets, multi-omics records, and container workloads are verified at the boundary using W3C SHACL shape validation before entering the enclave.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="font-semibold text-emerald-300 block">
                        • Egress (Outward Flow): Disclosure Control &amp; Safe Outputs
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Outbound flow regulates the export of derived analytical findings, statistical summaries, and model parameters. Outputs must pass automated Statistical Disclosure Control (SDC) checks, k-anonymity cell suppression (k ≥ 10), and sub-millisecond Open Policy Agent (OPA) Rego policy evaluations to prevent patient re-identification.
                      </p>
                    </div>
                  </div>
                  <p>
                    This architecture governs modern <strong>data analysis &amp; intelligence platforms</strong>, algorithmically administering the Five Safes, ISO/IEC 42001:2023 (AIMS), ISO 27001/27701, ISO/IEC 5259 data quality, DCB0129 / DCB0160 clinical safety, and UK MDR 2002 SaMD regulations.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-4 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold block">
                    Architecture at a Glance
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Release Version</span>
                      <span className="font-mono text-cyan-300 font-bold">v2.4.0-prod</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Decision Latency</span>
                      <span className="font-mono text-emerald-400 font-bold">&lt; 1.2 ms (OPA PDP)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Disclosure Rule</span>
                      <span className="font-mono text-amber-300 font-bold">k &ge; 10, Dom &le; 80%</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Audit Protocol</span>
                      <span className="font-mono text-purple-300 font-bold">W3C PROV-O Triples</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Architectural Layers */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>The Four Architectural Layers</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-cyan-400">1. Ontological Law</div>
                    <div className="text-xs text-white font-semibold">RDF / OWL 2 Knowledge Graph</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Formalizes Five Safes and Caldicott principles into machine-readable classes (<code className="text-cyan-300 font-mono">tre-core.ttl</code>, <code className="text-cyan-300 font-mono">governance_core.ttl</code>).
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-purple-400">2. Deterministic Verification</div>
                    <div className="text-xs text-white font-semibold">Closed-World SHACL &amp; PySHACL</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Converts open-world assumptions into deterministic pass/fail constraints with automated pytest CI regression suites.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-emerald-400">3. Microsecond PDP</div>
                    <div className="text-xs text-white font-semibold">Compiled OPA Rego Engine</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      The compiler (<code className="text-cyan-300 font-mono">compiler/rdf_to_rego.py</code>) compiles semantic rules into native high-speed Rego policies evaluated in microseconds.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-amber-400">4. Interception PEPs</div>
                    <div className="text-xs text-white font-semibold">Admission, Zero-Egress &amp; Airlock</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      K8s Admission Webhooks, Calico zero-egress VPC routing, and SDC airlock gates intercept operations, emitting W3C PROV-O audit trails.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stakeholder Reading Pathways */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>How to Navigate This Playbook By Role</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Caldicott Guardians &amp; Information Governance (IG) Leads</span>
                    </span>
                    <p className="text-slate-400 leading-normal">
                      Start with <strong>Section 0</strong> (Front Matter), <strong>Section 1.2</strong> (Five Safes &amp; SATRE ontologies), and <strong>Section 3.1</strong> (Automated FOI Charters) to review how statutory compliance and ethical approvals are formalized without technical ambiguity.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-purple-400" />
                      <span>DevOps, Cloud Engineers &amp; Platform Architects</span>
                    </span>
                    <p className="text-slate-400 leading-normal">
                      Focus on <strong>Section 1.1</strong> (Decoupled Metadata vs Runtime State), <strong>Section 4.1</strong> (OPA Rego compilation), and <strong>Section 4.2</strong> (Admission PEPs). Then jump directly to the <strong>Implementation &amp; Rollout Track</strong> for non-breaking evaluate-only webhook deployment patterns.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Airlock Reviewers &amp; Output Disclosure Officers</span>
                    </span>
                    <p className="text-slate-400 leading-normal">
                      Examine <strong>Section 2.1</strong> (SDC Shapes) and <strong>Section 4.2</strong> (Airlock PEP) for exact quantitative primary suppression rules (<code className="text-cyan-300 font-mono">k &ge; 10</code>), dominance checks (<code className="text-cyan-300 font-mono">&le; 80%</code>), and secondary masking.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Security Auditors &amp; Compliance Inspectors</span>
                    </span>
                    <p className="text-slate-400 leading-normal">
                      Inspect <strong>Section 2.2</strong> (PySHACL CI test harnesses) and <strong>Section 4.3</strong> (W3C PROV-O audit triples and SHA-256 policy commit signatures) for non-repudiation and post-incident forensic replay capabilities.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1 md:col-span-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>Clinical Safety Officers (CSO) &amp; AI Governance Leads</span>
                    </span>
                    <p className="text-slate-400 leading-normal">
                      Review <strong>Section 3.2</strong> (AI Workload Bounds &amp; ISO 42001 AIMS), <strong>Section 4.1</strong> (DCB0129 Hazard Log rules), and <strong>Section 4.2</strong> (UK MDR 2002 SaMD airlock clearance) for integrating information risk management with algorithmic model training and egress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operational Bridge Banner to Implementation Track */}
        <div className="bg-slate-950/90 border border-cyan-900/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center shrink-0">
              <Workflow className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>Operational Implementation &amp; Safe Rollout Track</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold">
                  Non-Breaking
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Moving from this overview into code? Review the <strong>granular 16-week sprint deliverables</strong>, <strong>evaluate-only/shadow rollout stages</strong>, and <strong>Decision Register (D-001–D-009)</strong>.
              </p>
            </div>
          </div>
          {onNavigateToImplementationTrack && (
            <button
              onClick={onNavigateToImplementationTrack}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow-sm shadow-cyan-500/20 active:scale-95"
            >
              <span>Explore Implementation Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Specialized Governance Deep Dives: Caldicott & Data Catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/90 border border-purple-900/50 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Statutory Compliance Architecture</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                The 8 Caldicott Principles in Policy-as-Code
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Disaggregated breakdown of all 8 Caldicott principles into population research applications, SHACL shape validation rules, and OPA Rego policies with gatekeeper checklists.
              </p>
            </div>
            <button
              onClick={() => onNavigateToConcept('caldicott')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-between transition-colors self-start w-full sm:w-auto"
            >
              <span>Explore 8 Caldicott Principles</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>

          <div className="bg-slate-950/90 border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Data Governance &amp; Metadata Engine</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                Data Catalogue: Metadata &amp; Dependent Constraints
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 real-world population data assets (GP EHR, Census, Mortality, HES APC, Genomics, Prescribing) with specific cell suppression rules (k ≥ 10), dominance limits, and SHACL targets.
              </p>
            </div>
            <button
              onClick={() => onNavigateToConcept('catalogue')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-between transition-colors self-start w-full sm:w-auto"
            >
              <span>Explore Data Catalogue Assets</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>
        </div>

        {/* Search Bar with Matches Counter and Navigation */}
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search playbook for keywords or phrases (e.g., 'SHACL', 'SDC', 'k >= 10', 'Rego', 'Caldicott', 'PROV-O')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-24 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <span className="font-medium text-slate-200">
                {searchMatches.length} match{searchMatches.length !== 1 ? 'es' : ''} found
              </span>
              {searchMatches.length > 0 && (
                <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
                  <span className="text-slate-400 text-[11px]">
                    {currentMatchIndex + 1}/{searchMatches.length}
                  </span>
                  <button
                    onClick={() => {
                      const next = currentMatchIndex > 0 ? currentMatchIndex - 1 : searchMatches.length - 1;
                      setCurrentMatchIndex(next);
                      handleJumpToMatch(next);
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Previous match"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const next = currentMatchIndex < searchMatches.length - 1 ? currentMatchIndex + 1 : 0;
                      setCurrentMatchIndex(next);
                      handleJumpToMatch(next);
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Next match"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick jump anchor links */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          <span className="text-slate-500">Jump to section:</span>
          {PLAYBOOK_SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#section-${sec.id}`}
              className="text-slate-400 hover:text-cyan-300 bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800/80 transition-colors"
            >
              Sec {sec.number}
            </a>
          ))}
        </div>
      </div>

      {/* Render Playbook Sections */}
      <div className="space-y-8">
        {PLAYBOOK_SECTIONS.map((section) => {
          const isRead = readSections.includes(section.id);

          return (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 transition-all shadow-sm hover:border-slate-700/80"
            >
              {/* Section Header & Mark-as-read control */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                      Section {section.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {section.subtitle}
                  </p>
                </div>

                {/* Mark as read interactive button */}
                <button
                  onClick={() => markSectionRead(section.id, !isRead)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isRead
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/70 hover:bg-emerald-900/60'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {isRead ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Marked as Read</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark as Read</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2-Sentence Executive Summary Banner */}
              {section.executiveSummary && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/30 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300 font-mono uppercase text-[10px] block tracking-wider">Executive Summary:</strong>
                    {section.executiveSummary}
                  </div>
                </div>
              )}

              {/* Text Paragraphs with Term Highlighting */}
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {section.content.map((paragraph, pIdx) => {
                  const isList = paragraph.startsWith('•');
                  const isSublist = paragraph.startsWith('   -');

                  return (
                    <div
                      key={pIdx}
                      className={`${
                        isSublist
                          ? 'pl-8 text-slate-400 text-sm'
                          : isList
                          ? 'pl-4 text-slate-200'
                          : ''
                      }`}
                    >
                      {renderInteractiveText(paragraph)}
                    </div>
                  );
                })}
              </div>

              {/* Collapsible Technical Implementation (OWL/RDF/Code) Accordion */}
              {section.codeBlock && (
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedTechnicalSchemas((prev) => ({
                        ...prev,
                        [section.id]: !prev[section.id]
                      }));
                    }}
                    className="w-full px-4 py-3 bg-slate-900/80 hover:bg-slate-900 flex items-center justify-between text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-mono">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Technical Implementation (OWL / RDF / Shapes)</span>
                      <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {section.codeBlock.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono">
                      <span>{expandedTechnicalSchemas[section.id] ? 'Collapse' : 'Expand Schema'}</span>
                      {expandedTechnicalSchemas[section.id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {expandedTechnicalSchemas[section.id] && (
                    <div className="p-4 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[11px]">
                          {section.id === 'sec-architecture' ? 'Repository Directory Tree' : 'Executable Syntax'}
                        </span>
                        <button
                          onClick={() => handleCopyCode(section.id, section.codeBlock!.code)}
                          className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-700 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {copiedCodeId === section.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Schema</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed border border-slate-800/80 shadow-inner">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Key Takeaways & Interactive Quick Action Links */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key Architectural Takeaways</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                  {section.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">·</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct quick action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <button
                    onClick={() => onNavigateToQuiz(
                      section.id === 'sec-phase-1' ? 'Five Safes & Governance'
                      : section.id === 'sec-phase-2' ? 'Semantic Modeling & SHACL'
                      : section.id === 'sec-phase-4' ? 'OPA Rego & Enforcement'
                      : 'General Architecture'
                    )}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>Take Quiz on Section {section.number}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Tooltip / Quick Definition Card when hovering a term */}
      {activeTooltipTerm && (
        <div className="fixed bottom-6 right-6 max-w-sm bg-slate-900/95 backdrop-blur border border-cyan-500/40 rounded-xl p-4 shadow-2xl z-50 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              {activeTooltipTerm.category}
            </span>
            <button
              onClick={() => setActiveTooltipTerm(null)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          </div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{activeTooltipTerm.term}</span>
            {activeTooltipTerm.acronym && (
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1 py-0.5 rounded">
                {activeTooltipTerm.acronym}
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeTooltipTerm.shortDefinition}
          </p>
          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-800">
            <span className="text-[11px] text-slate-400">{activeTooltipTerm.playbookSection}</span>
            <button
              onClick={() => {
                const id = activeTooltipTerm.id;
                setActiveTooltipTerm(null);
                onNavigateToGlossaryTerm(id);
              }}
              className="text-cyan-400 hover:text-cyan-200 font-medium flex items-center gap-1"
            >
              <span>View in Glossary</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
