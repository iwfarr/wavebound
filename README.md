# Project Seawater: Policy-as-Code Playbook

[![Release Version](https://img.shields.io/badge/version-v2.4.0--prod-06b6d4.svg)](https://github.com/iwfarr/seawater-playbook)
[![Build Status](https://img.shields.io/badge/build-passing-emerald.svg)](https://github.com/iwfarr/seawater-playbook/actions)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)](https://iwfarr.github.io/seawater-playbook/)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)


> **An educational resource based on available literature and resources.**  
> From this, the playbook for implementing a governance policy engine for data analysis & intelligence platforms is presented, compiling semantic graph ontologies into real-time Policy Decision Points (PDPs) and Policy Enforcement Points (PEPs).

---

## 🌐 Live Platform & Documentation

- **Interactive Public Site**: [https://iwfarr.github.io/seawater-playbook/](https://iwfarr.github.io/seawater-playbook/)
- **GitHub Repository**: [https://github.com/iwfarr/seawater-playbook](https://github.com/iwfarr/seawater-playbook)
- **Deployment Guide**: See [deploy_instructions.md](deploy_instructions.md) for step-by-step GitHub Pages instructions.
- **Implementation Guide**: See [policy-as-code/README.md](policy-as-code/README.md) for production cluster integration patterns.

---

## 🧭 Executive Overview

Modern healthcare, genomic, and population-level analytics are transitioning away from static data distribution toward federated **data analysis & intelligence platforms** (such as Trusted Research Environments [TREs], Secure Data Environments [SDEs], and AI sandbox enclaves). Rather than copying sensitive microdata across institutional boundaries, algorithms and accredited researchers are brought into partitioned, secure cloud enclaves.

Traditional governance in these environments relies heavily on manual checklists, periodic spreadsheet audits, and static PDF specifications. These manual approaches create severe bottlenecks for life-saving research or leave subtle gaps when complex automated pipelines and AI workloads are executed.

**Project Seawater solves this challenge through Policy-as-Code (PaC):**
1. **Formalize Legal & Ethical Intent in Knowledge Graphs**: High-level governance concepts (the Five Safes framework, the 8 Caldicott Principles, NHS Section 251 CAG exemptions, and ISO/IEC 42001 AI risk controls) are formalized as immutable, version-controlled RDF/OWL 2 ontologies.
2. **Validate Closed-World Constraints with W3C SHACL**: Inbound research proposals, data schemas, and container specifications are verified against strict Shapes Constraint Language (SHACL) definitions.
3. **Compile to Microsecond Policy Decision Points (PDPs)**: Semantic graphs are compiled into native Open Policy Agent (OPA) Rego policies evaluated in sub-millisecond latencies at Kubernetes Admission Controllers and API Gateways (Policy Enforcement Points, PEPs).
4. **Emit Cryptographic Dual-Persona Lineage**: Every access evaluation and disclosure decision emits W3C PROV-O audit trails for technical certifiers while maintaining plain-English transparency charters for NHS Trust Boards and citizen advocacy groups.

---

## 🌊 The Seawater Problem Space & Tidal Flow Model

Project Seawater models clinical research governance through a grounded **tidal flow navigation framework**:

```
                              [ THE SEAWATER PROBLEM SPACE ]
               Dynamic, continuous healthcare data & intelligence workflows
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
 ┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
 │   INWARD FLOW: INGRESS GOVERNANCE     │   │   OUTWARD FLOW: EGRESS GOVERNANCE     │
 │───────────────────────────────────────│   │───────────────────────────────────────│
 │ • Perimeter Access Controls           │   │ • Automated Statistical Disclosure    │
 │ • Safe People: Researcher identity,   │   │   Control (SDC)                       │
 │   institutional accreditation & IG    │   │ • Primary suppression (k >= 10)       │
 │   training verification               │   │ • Dominance masking & group bounds    │
 │ • Safe Projects: NHS REC ethics,      │   │ • Sub-millisecond OPA Rego evaluation │
 │   statutory basis & s251 exemptions   │   │ • Zero raw microdata leakage          │
 │ • Inbound W3C SHACL schema validation │   │ • Safe outputs for clinical impact    │
 └───────────────────────────────────────┘   └───────────────────────────────────────┘
                                      │
                                      ▼
             [ PARTITIONED SECURE ENCLAVE (SAFE SETTINGS & SAFE DATA) ]
              Isolated compute, ephemeral pods, zero direct external egress
```

- **Ingress Governance (Inward Flow)**:
  Ingress is not merely network data transfer. It strictly enforces perimeter access controls, **Safe People** (researcher accreditation, institutional identity verification, mandatory Information Governance training), and **Safe Projects** (NHS Research Ethics Committee [REC] approvals, Section 251 Confidentiality Advisory Group exemptions, and legitimate research purpose justification). Inbound datasets and query scripts are validated against closed-world W3C SHACL shapes before workspace admission is granted.
- **Egress Governance (Outward Flow)**:
  Analytical findings, statistical summary tables, and trained model parameters must pass automated Statistical Disclosure Control (SDC) checks. Rules enforce cell suppression for small numbers ($k \ge 10$) and dominance masking via microsecond OPA Rego policies to prevent patient re-identification or data exfiltration.

---

## 🚀 Key Modules & Capabilities

The interactive web application includes five integrated modules:

### 1. The Interactive Policy-as-Code Playbook
- **Executive Front Matter**: Core philosophy of machine-executable policy, semantic versioning (SemVer 2.4.0), and governance decoupling.
- **Foundational Architecture**: Separation of enduring governance metadata (RDF ontologies) from ephemeral runtime state (Kubernetes pods and IPs).
- **16-Week Implementation Track**: Four phased implementation stages with clear engineering deliverables, YAML manifests, and formal Decision Gates (D-001 through D-006).
- **Dual-Persona Auditability**: Plain-English summaries for governance officers alongside raw Turtle, SHACL, and Rego artifacts for DevOps engineers.

### 2. Dual Governance Atlas
- **Public & Citizen Trust Portal**: A plain-English interactive journey following patient data from bedside electronic health records to anonymous scientific breakthroughs across the 8 Caldicott Principles. Includes a downloadable NHS Trust Board Governance Charter (`.md`).
- **Technical Knowledge Graph**: Interactive Cytoscape.js network visualizer supporting four specialized layouts (Tiered Pipeline DAG, Hierarchical Tree, Orbital Rings, and Physics Force-Directed) to trace statutory mandates down to runtime admission controllers.

### 3. Policy Sandbox & Rego Rule Synthesizer
- Interactive client-side compiler that translates natural language data governance policies into validated W3C SHACL node shapes and Open Policy Agent (OPA) Rego rules.
- Built-in presets for **ISO/IEC 42001 (AIMS)**, **DCB0129 Clinical Risk Management**, **Digital Economy Act 2017 Data Linkage**, and **$k$-Anonymity Cell Suppression**.

### 4. Interactive Policy & Compliance Quiz Engine
- Curated question bank containing 30+ scenario-driven questions across Five Safes governance, OPA Rego syntax, SHACL validation logic, ISO standards, and clinical risk management.
- Instant feedback with regulatory citations, Caldicott Principle alignments, and detailed technical explanations.

### 5. Statutory & Standards Reference Library
- Comprehensive repository of statutory frameworks, international standards, and accreditation documents, including the official **UKSA Digital Economy Act 2017 Accreditation Trilogy** (Research Accreditation Policy v1.4, SOP v1.4, and SAQ v3.1).
- Integrated, searchable glossary with cross-linked definitions, acronyms, and practical examples.

---

## 📜 Standards & Regulatory Frameworks

Project Seawater incorporates and formalizes requirements from:

| Standard / Statutory Mandate | Domain | Enforcement Mechanism |
| :--- | :--- | :--- |
| **Digital Economy Act 2017 (Part 5)** | Public Interest Data Research | UKSA RAP accreditation & accredited processor checks |
| **The Five Safes Framework** | Enclave Governance | People, Projects, Settings, Data, and Outputs gates |
| **8 Caldicott Principles** | Patient Confidentiality & Sharing | Justified purpose, strict need-to-know, and duty to share |
| **NHS Section 251 (NHS Act 2006)** | Confidential Patient Information | CAG exemption binding verified at container admission |
| **ISO/IEC 42001:2023** | AI Management System (AIMS) | Model risk tier classification and training data lineage |
| **ISO/IEC 27001 / ISO 27701** | ISMS & Privacy Information (PIMS) | Network boundary isolation and cryptographic audit trails |
| **ISO/IEC 5259 Series** | Data Quality for Analytics & ML | Data ingestion quality shapes (completeness and bias) |
| **DCB0129 / DCB0160** | NHS Clinical Risk Management | Clinical Safety Officer (CSO) sign-off and Hazard Log |
| **UK MDR 2002 / MHRA SaMD** | Software as a Medical Device | Regulatory clearance gate prior to algorithm egress |

---

## 💻 Local Development & Quickstart

### Prerequisites
- **Node.js**: Version 22.12 or newer
- **npm**: Version 10 or newer

### Setup & Run
```bash
# 1. Clone the repository
git clone https://github.com/iwfarr/seawater-playbook.git
cd seawater-playbook

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser to `http://localhost:3000`.

### Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server with Vite |
| `npm run build` | Compile and build the static production bundle into `dist/` |
| `npm run preview` | Preview the local production build |
| `npm run lint` | Run TypeScript type checks (`tsc --noEmit`) |
| `npm run claims:check` | Verify compliance claims and architectural assertions |
| `npm run claims:update` | Update and index claims inventory |

---

## 🚢 Deployment to GitHub Pages

The repository is configured for automated, zero-cost deployment to GitHub Pages using GitHub Actions:

1. Push your repository to GitHub.
2. In your repository on GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy-pages.yml` will automatically build the static bundle and deploy it to `https://<your-username>.github.io/<your-repo>/`.

For complete configuration instructions, custom domain setup, and troubleshooting, read the [GitHub Pages Deployment Instructions (deploy_instructions.md)](deploy_instructions.md).

---

## 📁 Repository Directory Structure

```
├── .github/workflows/
│   └── deploy-pages.yml        # Automated GitHub Pages build & deploy workflow
├── deploy_instructions.md      # Detailed GitHub Pages deployment manual
├── index.html                  # HTML entry point with metadata and fonts
├── package.json                # Project dependencies and operational scripts
├── policy-as-code/             # Reference implementation manifests & technical docs
│   └── README.md               # Technical implementation guide
├── public/                     # Static assets, logos, and vector illustrations
├── src/
│   ├── App.tsx                 # Root application component with tab navigation
│   ├── components/             # Modular UI components
│   │   ├── AIPolicyGenerator.tsx   # Policy Sandbox & Rego Rule Synthesizer
│   │   ├── CytoscapeGraph.tsx      # Multi-layout interactive knowledge graph
│   │   ├── GovernanceAtlas.tsx     # Dual Atlas: Citizen Portal & Technical Graph
│   │   ├── Header.tsx              # Application header with dual mode toggles
│   │   ├── LLMSecurityEnclave.tsx  # In-enclave LLM architecture & AST scrubbing
│   │   ├── PlaybookReader.tsx      # 16-Week Playbook with reading tracker
│   │   ├── QuizEngine.tsx          # Interactive compliance assessment engine
│   │   ├── ResourcesTab.tsx        # Statutory documents & DEA accreditation
│   │   ├── SeawaterLogo.tsx        # Official responsive logo component
│   │   └── TabNavigation.tsx       # Accessible application tab bar
│   ├── data/                   # Structured data stores
│   │   ├── glossaryData.ts         # Searchable regulatory and technical glossary
│   │   ├── graphData.ts            # Knowledge graph nodes and edges
│   │   ├── quizBank.ts             # Curated technical & governance quiz questions
│   │   └── resourcesData.ts        # Statutory legislation, ISO standards, and links
│   └── index.css               # Global Tailwind CSS styling rules
└── vite.config.ts              # Vite bundler configuration (relative base './')
```

---

## 👥 Audience & Personas

- **Clinical Safety Officers & IG Leads**: Review plain-English governance charters, NHS REC ethics mappings, and Caldicott safety guarantees.
- **TRE / SDE Architects & DevOps Engineers**: Access production-ready SHACL node shapes, OPA Rego rules, and Kubernetes admission controller patterns.
- **NHS Trust Boards & Citizen Advocates**: Understand how patient confidentiality is strictly preserved while supporting life-saving research.
- **AI / ML Researchers**: Explore compliance requirements for in-enclave LLMs, training data quality gates (ISO 5259), and SaMD clinical safety (DCB0129).

---

## 📄 License & Attribution

Project Seawater is released under the **MIT License**.

Built to advance transparent, secure, and reproducible health data governance across modern data analysis & intelligence platforms.