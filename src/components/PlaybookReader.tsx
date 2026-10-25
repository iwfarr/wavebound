import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useUserProgress } from '../context/ProgressContext';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
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
  FolderTree
} from 'lucide-react';

interface PlaybookSection {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  keyTakeaways: string[];
}

const PLAYBOOK_SECTIONS: PlaybookSection[] = [
  {
    id: 'sec-front-matter',
    number: '0',
    title: 'Executive Front Matter: Dynamic & Deployable Governance Policy',
    subtitle: 'Machine-Executable Policy Architecture with Semantic Versioning (SemVer 2.4.0) — Not a Static SDC Spec',
    content: [
      'Clarification of Intent & Scope:',
      '• Dynamic & Deployable Policy Architecture: This playbook is NOT merely a static technical specification or descriptive checklist for Statistical Disclosure Control (SDC). Rather, it defines an active, version-controlled, and machine-executable governance policy platform.',
      '• Semantic Versioning (SemVer 2.4.0): Every policy ontology, SHACL constraint, and OPA Rego rule is versioned as immutable code releases (e.g. v2.4.0-prod). Changes to legal bases, ethics clearances, or SDC thresholds follow strict GitOps PR review, PySHACL validation, and automated continuous deployment.',
      '• Compilation from Knowledge Graph to Microsecond Enforcement: High-level human governance concepts (Caldicott Principles, NHS Section 251, SATRE Pillars, EU AI Act risk tiers) are formalized in OWL 2 ontologies, verified against Closed-World SHACL shapes, and automatically compiled by compiler/rdf_to_rego.py into native OPA Rego policies running at Policy Enforcement Points (PEPs) in sub-millisecond evaluation times.',
      '• Auditable Dual-Persona Lineage: Emits immutable W3C PROV-O cryptographic audit triples for every access grant or rejection, while generating plain-English charters for Trust boards and patient advocacy committees.'
    ],
    keyTakeaways: [
      'Not a static PDF or isolated SDC checklist, but a dynamic, deployable policy-as-code engine.',
      'Semantic versioning (SemVer) guarantees verifiable policy drift detection across releases.',
      'Translates philosophical governance charters into sub-millisecond Kubernetes and Airlock gatekeepers.'
    ]
  },
  {
    id: 'sec-phase-1-1',
    number: '1.1',
    title: 'Phase 1: Knowledge Modeling — Scope & Policy Metadata vs. Runtime State',
    subtitle: 'Weeks 1–2: Distinguishing immutable governance assertions from ephemeral infrastructure state',
    content: [
      '• Defining the Architectural Boundary: In a Trusted Research Environment (TRE) or Secure Data Environment (SDE), systems fail when static governance declarations are conflated with live infrastructure telemetry.',
      '• Policy Metadata (Ontological Domain): Stored in versioned RDF/OWL graphs. Includes researcher accreditation status, institutional affiliations, NHS Section 251 exemption certificates, project ethics protocol numbers, approved clinical data sensitivity tiers, and retention horizons.',
      '• Runtime State (Operational Domain): Dynamic observations managed by Kubernetes, Calico CNI, and API gateways. Includes active pod IPs, CPU/GPU utilization, ephemeral egress connections, and transient session tokens.',
      '• GitOps Repository Setup: Establish modular Git structure (`ontology/`, `compiler/`, `security/opa/`, `tests/`) with automated pre-commit linters for RDF and Turtle serialization syntax.'
    ],
    keyTakeaways: [
      'Policy metadata lives in version-controlled RDF ontologies; runtime state lives in orchestrators.',
      'Decoupling policy definition from cluster state eliminates brittle hardcoded security configurations.',
      'Enables continuous compliance auditing without interrogating production database clusters.'
    ]
  },
  {
    id: 'sec-phase-1-2',
    number: '1.2',
    title: 'Phase 1: Baseline Ontologies — Five Safes & SATRE Formalization',
    subtitle: 'Weeks 3–4: Authoring tre-core.ttl and governance_core.ttl across hospital operational tiers',
    content: [
      '• Five Safes Formalization: Expresses the 5 core dimensions in ontology/tre-core.ttl:',
      '   - Safe People: tre:SafePerson with mandatory institutional accreditation and active Information Governance (IG) training.',
      '   - Safe Projects: tre:SafeProject with NHS Research Ethics Committee (REC) approvals and Section 251 exemption bindings.',
      '   - Safe Settings: tre:SafeSetting mandating zero-egress VPC subnets, air-gapped compute, and multi-factor authentication.',
      '   - Safe Data: tre:SafeData classifying records into Hospital Operational Tiers (Tier 1: Aggregate/Synthetic, Tier 2: De-identified Pseudonymous, Tier 3: Sensitive Clinical/Identifiable under s251).',
      '   - Safe Outputs: tre:SafeOutput requiring quantitative SDC clearance before airlock egress.',
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
    title: 'Phase 2: Validation Logic — Resolving OWA to CWA via SHACL Shapes',
    subtitle: 'Weeks 5–6: Enforcing Closed-World security constraints in access-shapes.ttl and sdc_shapes.ttl',
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
    title: 'Phase 2: Graph Test Suite — Automated PySHACL Test Fixtures in CI',
    subtitle: 'Weeks 7–8: Running pytest harnesses against positive and negative session graphs',
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
    title: 'Phase 3: Public Documentation — Automated FOI Markdown Generation',
    subtitle: 'Weeks 9–10: Synthesizing machine-readable Turtle ontologies into human-readable governance charters',
    content: [
      '• Bridging Engineers, Trust Boards, and the Public: A major challenge in clinical research governance is communicating technical code rules to Caldicott Guardians, NHS Trust Boards, ethics committees, and patient participants.',
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
    title: 'Phase 3: Dual-Persona Portal — Patient Governance Atlas & Knowledge Graph',
    subtitle: 'Weeks 11–12: Interactive Cytoscape network explorer alongside simplified patient journey maps',
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
    title: 'Phase 4: Runtime Enforcement Pipeline — OPA Rego Compilation',
    subtitle: 'Weeks 13–14: Translating semantic ontologies into microsecond PDP decision rules',
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
    title: 'Phase 4: Policy Enforcement Points (PEP) — Admission, Network & Airlock',
    subtitle: 'Weeks 15–16: Integrating OPA with Kubernetes Admission Webhooks, VPC Firewalls, and Airlock Gates',
    content: [
      '• PEP Architectural Distribution:',
      '   - Workspace Admission PEP: Kubernetes ValidatingAdmissionWebhooks intercept pod creation events (e.g., launching researcher JupyterLab containers). The webhook queries OPA; if `allow == false`, pod scheduling is aborted.',
      '   - Network & Zero-Egress PEP: Calico CNI GlobalNetworkPolicies block all outbound egress traffic from researcher namespaces to external IP addresses.',
      '   - Automated Airlock Egress PEP: When researchers submit tables or models for release, the airlock service executes automated SDC checks ($k \ge 10$, dominance $\le 80\%$) before alerting human airlock reviewers.'
    ],
    keyTakeaways: [
      'PEPs intercept actions at the perimeter before any unauthorized compute can execute.',
      'Multi-layer defense: admission control, network policy, and airlock export validation.',
      'Automated SDC filtering prevents human airlock reviewer fatigue and oversight.'
    ]
  },
  {
    id: 'sec-phase-4-3',
    number: '4.3',
    title: 'Phase 4: Audit Lineage & Verification Workflow — W3C PROV-O Triples',
    subtitle: 'Continuous Operations: Emitting cryptographic provenance records and running developer build commands',
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
  targetSectionId?: string | null;
  targetHighlightTerm?: string;
}

export const PlaybookReader: React.FC<PlaybookReaderProps> = ({
  onNavigateToGlossaryTerm,
  onNavigateToConcept,
  onNavigateToQuiz,
  targetSectionId,
  targetHighlightTerm,
}) => {
  const { readSections, markSectionRead, markAllSectionsRead } = useUserProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTooltipTerm, setActiveTooltipTerm] = useState<GlossaryTerm | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll and highlight when targetSectionId is received
  useEffect(() => {
    if (targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(`section-${targetSectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-2', 'ring-cyan-400', 'bg-cyan-950/40');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-cyan-400', 'bg-cyan-950/40');
          }, 3500);
        }
      }, 150);
    }
  }, [targetSectionId]);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Dynamic Deployable Governance Policy • SemVer 2.4.0-prod</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Graph-Based Policy-as-Code Project Playbook
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              An active, version-controlled governance policy engine for Trusted Research Environments (TRE) / Secure Data Environments (SDE)—<span className="text-cyan-300 font-semibold">not a static SDC specification</span>. Compiles semantic graph ontologies into real-time Policy Decision Points (PDPs) and Policy Enforcement Points (PEPs).
            </p>
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

              {/* Code Snippet if present */}
              {section.codeBlock && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="font-mono flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      {section.id === 'sec-architecture' ? 'Repository Directory Tree' : 'CLI Execution'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(section.id, section.codeBlock!.code)}
                      className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 transition-colors"
                    >
                      {copiedCodeId === section.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{section.codeBlock.code}</code>
                  </pre>
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
