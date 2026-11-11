# Wavebound: Ontology-led Information Governance

Wavebound is an ontology-led information governance playbook and reference architecture connecting legal and ethical requirements, institutional decisions and technical safeguards for sensitive research data. Its dual-wave model connects inward enclave security and outward governance: what enters a research environment, and what leaves it.

See [branding notes](docs/branding.md) for retained technical identifiers, deployment paths, and logo assets.

[![Project Status](https://img.shields.io/badge/status-reference%20architecture-06b6d4.svg)](policy-as-code/README.md)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)](https://iwfarr.github.io/wavebound-playbook/)
[![License](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)


> **Today: an interactive playbook, governance visualisations and illustrative OWL/RDF, SHACL and Rego examples. The IG ontology is the architectural foundation; a standalone validated ontology, executable policy compiler and production enforcement integration are not yet delivered.**

---

## 🌐 Live Platform & Documentation

- **Interactive Public Site**: [https://iwfarr.github.io/wavebound-playbook/](https://iwfarr.github.io/wavebound-playbook/)
- **GitHub Repository**: [https://github.com/iwfarr/wavebound](https://github.com/iwfarr/wavebound)
- **SDC & Low-Count Methods Guide**: See [docs/statistical_disclosure_control_guide.md](docs/statistical_disclosure_control_guide.md) for small cell disclosure controls and sparse data methodologies.
- **Deployment Guide**: See [deploy_instructions.md](deploy_instructions.md) for step-by-step GitHub Pages instructions.
- **Implementation Status & Decision Gates**: See [policy-as-code/README.md](policy-as-code/README.md) for work required before operational enforcement.
- **Positioning & UK Governance Context**: See [docs/positioning.md](docs/positioning.md) for semantic boundaries, source references and retained follow-on ideas.

---

## 🧭 Executive Overview: Ontology-led Information Governance

Governance decisions should shape how research data is accessed, used and released, rather than sit separately in policy documents. Wavebound explores how a shared semantic model can connect those decisions to practical safeguards while retaining accountable human oversight.

For population data research organisations, governance involves more than security checklists: lawful purpose, confidentiality, ethical review, institutional permissions, proportionate access and public accountability. These requirements have different sources and scopes; they cannot be treated as one universal controls catalogue.

The **IG OWL/RDF ontology** is the connective tissue of the reference architecture. The proposed model relates people, projects, datasets, purposes, permissions, approvals, responsibilities and evidence. It supports questions such as: which decision authorises which activity, for which data, under what conditions, and with whose accountability? The current graph visualisations and embedded Turtle examples illustrate this approach although they are not a deployed RDF store or a validated ontology release.

Modern population data research, longitudinal cohorts, epidemiology, and multi-source analytics are transitioning away from static data distribution toward federated **data analysis & intelligence platforms** (such as secure cloud enclaves, partitioned analytical sandboxes, and sovereign data repositories). Rather than copying sensitive microdata across institutional boundaries, algorithms and accredited researchers are brought into partitioned, secure cloud enclaves.

Traditional governance in these environments relies heavily on manual checklists, periodic spreadsheet audits, and static PDF specifications. These manual approaches create severe bottlenecks for vital research or leave subtle gaps when complex automated pipelines and AI workloads are executed.

**Three connected layers define Wavebound:**
1. **Governance meaning — OWL/RDF**: Model concepts and relationships, preserving source authority, applicability and approved institutional interpretations. Representing a requirement does not establish its legal authority or automatically translate law into code.
2. **Human understanding — playbook and atlas**: Explain responsibilities and proposed safeguards to governance leads, researchers, platform teams and public oversight panels. Human approvals remain distinct from technical checks.
3. **Operational translation — proposed SHACL and policy-as-code**: Explore explicit validation constraints, reviewed decision rules and enforcement points. OWL reasoning, SHACL validation and runtime enforcement are separate functions. Tests, trusted inputs, audit evidence and an approved implementation are required before claiming a control is operational.

The application and examples are available today. Operational translation remains implementation work governed by the [decision register and ready-to-claim gate](policy-as-code/README.md). Policy-as-Code Engine describes a technical direction, not a current production capability. See also the [educational and regulatory disclaimer](DISCLAIMER.md).

---

## 🌊 The Wavebound Problem Space & Tidal Flow Model

Project Wavebound models population data research and epidemiological governance through a grounded **tidal flow navigation framework**. This diagram describes proposed safeguards, not controls running in the application:

```text
                              [ THE WAVEBOUND PROBLEM SPACE ]
               Dynamic, continuous population data & research intelligence workflows
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
 ┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
 │   INWARD FLOW: INGRESS GOVERNANCE     │   │   OUTWARD FLOW: EGRESS GOVERNANCE     │
 │───────────────────────────────────────│   │───────────────────────────────────────│
 │ • Proposed access conditions          │   │ • Proposed disclosure checks          │
 │ • Safe People: identity and evidence  │   │ • Safe Outputs: accountable review    │
 │ • Safe Projects: approved purpose     │   │ • Locally approved thresholds         │
 │ • Applicable institutional decisions  │   │ • Reviewed export decision rules      │
 │ • Reviewed legal and ethical sources  │   │ • Decision evidence and provenance    │
 │ • Illustrative SHACL validation       │   │ • Public transparency                 │
 │ • Trusted inputs before enforcement   │   │ • No disclosure guarantee implied     │
 └───────────────────────────────────────┘   └───────────────────────────────────────┘
                                      │
                                      ▼
             [ PARTITIONED SECURE ENCLAVE (SAFE SETTINGS & SAFE DATA) ]
                  Proposed isolation and governed output-release boundaries
```

- **Ingress Governance (Inward Flow)**:
  Ingress is not merely network data transfer. The proposed architecture connects **Safe People** and **Safe Projects** to access conditions, identity, training, approved purposes and applicable approvals. REC review and Section 251 support are not universal requirements for every project. SHACL examples illustrate possible validation before admission; they do not grant access in the current application.
- **Egress Governance (Outward Flow)**:
  Egress connects analytical findings, statistical tables and model outputs to proposed disclosure checks and accountable output review. Example thresholds are illustrative, not approved universal rules or guarantees against re-identification. The current application does not operate an airlock or enforce export decisions.

---

## 🚀 Key Modules & Capabilities

The interactive web application provides these reference and learning capabilities:

### 1. The Interactive Policy-as-Code Playbook
- **Executive Front Matter**: Ontology-led governance, current maturity, semantic boundaries and accountable human decisions.
- **Foundational Architecture**: Separation of enduring governance metadata (RDF ontologies) from ephemeral runtime state (Kubernetes pods and IPs).
- **16-Week Implementation Track**: Four phased implementation stages with clear engineering deliverables, YAML manifests, and formal Decision Gates (D-001 through D-006).
- **Dual-Persona Explanations**: Plain-English summaries for governance officers alongside illustrative Turtle, SHACL and Rego snippets for engineers.

### 2. Dual Governance Atlas
- **Public & Citizen Trust Portal**: An interactive journey following population and research data from primary source registries to anonymous scientific and policy breakthroughs across the 8 Caldicott Principles. Includes a downloadable Public Interest Data Governance & Population Research Charter (`.md`).
- **Technical Knowledge Graph**: Interactive Cytoscape.js visualisations of proposed relationships between governance sources and technical safeguards; not an executable OWL/RDF ontology or a live enforcement trace.

### 3. Policy Sandbox & Rego Rule Synthesizer
- Browser-side demonstration producing illustrative policy snippets from presets and inputs; not an executable semantic compiler, legal interpretation service or security control.
- Built-in presets for **ISO/IEC 42001 (AIMS)**, **DCB0129 Algorithmic Safety & Hazard Logs**, **Digital Economy Act 2017 Data Linkage**, and **$k$-Anonymity Cell Suppression**.

### 4. Interactive Policy & Compliance Quiz Engine
- Curated question bank containing 30+ scenario-driven questions across Five Safes governance, OPA Rego syntax, SHACL validation logic, ISO standards, and algorithmic risk management.
- Instant feedback with regulatory citations, Caldicott Principle alignments, and detailed technical explanations.

### 5. Statutory & Standards Reference Library
- Comprehensive repository of statutory frameworks, international standards, and accreditation documents, including the official **UKSA Digital Economy Act 2017 Accreditation Trilogy** (Research Accreditation Policy v1.4, SOP v1.4, and SAQ v3.1).
- Integrated, searchable glossary with cross-linked definitions, acronyms, and practical examples.

---

## 📜 Standards & Regulatory Frameworks (Exhaustive Compendium)

Wavebound references these sources when exploring governance mappings. The table describes candidate relationships, not implemented controls, certified coverage or legal equivalence. Applicability and source versions require organisational review; see the [UK context and mapping boundaries](docs/positioning.md#uk-governance-context).

| Source / Framework | Domain | Proposed mapping subject to review |
| :--- | :--- | :--- |
| **Digital Economy Act 2017 (Part 5)** | Public Interest Data Research | UKSA RAP accreditation & accredited processor checks |
| **The Five Safes Framework** | Enclave Governance | People, Projects, Settings, Data, and Outputs gates |
| **8 Caldicott Principles** | Confidentiality & Proportional Sharing | Justified purpose, strict need-to-know, and duty to share |
| **Section 251 / Control of Patient Information Regulations** | Confidential Patient Information | Record applicable support, conditions and decision maker; CAG advises, rather than providing a universal access approval |
| **ISO/IEC 42001:2023** | AI Management System (AIMS) | Model risk tier classification and training data lineage |
| **ISO/IEC 27001 / ISO 27701** | ISMS & Privacy Information (PIMS) | Network boundary isolation and cryptographic audit trails |
| **ISO/IEC 5259 Series** | Data Quality for Analytics & ML | Data ingestion quality shapes (completeness and bias) |
| **DCB0129 / DCB0160** | Algorithmic Risk Management | Clinical Safety Officer (CSO) sign-off and Hazard Log |
| **UK MDR 2002 / MHRA SaMD** | Software as a Medical Device | Classification gate prior to model egress |

---

## 🍴 Fork, Clone, or Branch: Make It Your Own

**You are actively encouraged to fork, clone, or branch this repository to adapt the playbook for your own organization, enclave, or research cohort.** Whether you lead an epidemiological unit, a national statistics bureau, a university data safe haven, or a life sciences analytics team, the platform is structured for modular adaptation:

### 🌟 Which Should You Choose?

- **🍴 Fork (Recommended for Organizations & Deployments)**:
  - **Why**: Create your own independent GitHub repository under your organization or personal account.
  - **Best for**: Hosting your own branded instance on GitHub Pages (zero hosting costs), customizing the Public Interest Governance Charter for your local jurisdiction, or extending the compliance rules for your specific data assets.
  - **How**: Click the **Fork** button at the top right of this repository, then enable GitHub Pages in your fork's settings (`Settings > Pages > Build and deployment > GitHub Actions`).

- **📥 Clone (Recommended for Local Use & Training)**:
  - **Why**: Download the entire codebase, interactive Policy Sandbox, Knowledge Graph visualizer, and test suites to your local workstation.
  - **Best for**: Running internal Information Governance training workshops, evaluating policy-as-code locally without internet access, or running the compliance quiz with research teams.
  - **How**: Run `git clone https://github.com/iwfarr/wavebound-playbook.git && cd wavebound-playbook && npm install && npm run dev`.

- **🌿 Branch (Recommended for Policy Experimentation & Contributions)**:
  - **Why**: Create isolated git branches to experiment with new SHACL shapes, custom OPA Rego rules, or specialized cohort linkage ontologies.
  - **Best for**: Prototyping enclave rules for a specific research grant, testing new disclosure suppression thresholds, or submitting improvements back to the community via Pull Requests.
  - **How**: Run `git checkout -b feature/my-cohort-governance`.

### 🛠️ Common Customization Points
1. **Institutional Governance Charter**: Adapt the illustrative charter in `src/components/GovernanceAtlas.tsx` with your accountable governance leads; wording requires institutional review.
2. **Custom Policy Presets**: Add clearly labelled illustrative presets to `src/components/AIPolicyGenerator.tsx` and explanations to `src/data/glossaryData.ts`; these do not become operational regulatory checks.
3. **Implementation Planning**: Use `policy-as-code/` to record decisions and link approved implementation evidence. Keep executable controls and tests with the service that will operate them.

---

## 💻 Local Development & Quickstart

### Prerequisites
- **Node.js**: Version 22.12 or newer
- **npm**: Version 10 or newer

### Setup & Run
```bash
# 1. Clone the repository
git clone https://github.com/iwfarr/wavebound.git
cd wavebound

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
| `npm run claims:check` | Check inventory freshness; does not verify legal correctness or operational controls |
| `npm run claims:update` | Update and index claims inventory |

---

## 🚢 Deployment Targets: Playbook Web Portal vs. Cluster PaC Engine

Distinguish the deployable reference application from the proposed operational architecture:

### Target A: Deploying the Playbook Documentation & Interactive Web Portal (GitHub Pages)
The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` deploys the **client-side React application** (the interactive Playbook, IG Quick Guide, Quiz Engine, and Cytoscape Atlas) to GitHub Pages or any static CDN:
1. Push your repository to GitHub.
2. In your repository on GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy-pages.yml` will automatically build the static bundle and deploy it to `https://<your-username>.github.io/<your-repo>/`.

For complete web portal configuration instructions, custom domain setup, and troubleshooting, read [deploy_instructions.md](deploy_instructions.md).

### Target B: Proposed Policy-as-Code Integration — Not Yet Delivered
An organisation could use the reference architecture to plan reviewed governance assertions, explicit validation rules, a policy decision service, an enforcement integration and accountable output review. The Build & Deploy workspace and boundary matrix provide illustrative patterns, not an approved cluster deployment or executable ontology-to-policy compiler. The organisation must select and test its controls, trusted inputs and locally approved thresholds before operational use.

For implementation status, decision gates and proposed boundaries, see [policy-as-code/README.md](policy-as-code/README.md) and [docs/architecture/boundary-matrix.md](docs/architecture/boundary-matrix.md).

---

## 📁 Repository Directory Structure

```text
├── .github/workflows/
│   └── deploy-pages.yml        # Automated GitHub Pages build & deploy workflow
├── deploy_instructions.md      # Detailed GitHub Pages deployment manual
├── index.html                  # HTML entry point with metadata and fonts
├── package.json                # Project dependencies and operational scripts
├── policy-as-code/             # Reference implementation manifests & technical docs
│   └── README.md               # Current status, checklist and decision gates
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
│   │   ├── WaveboundLogo.tsx        # Official responsive logo component
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

- **Population Data Scientists & Epidemiologists**: Explore automated disclosure control, cohort linkage patterns, and reproducible analytical pipelines.
- **Information Governance Leads & Policy Makers**: Review statutory compliance mappings (Digital Economy Act 2017, UK GDPR, DPA 2018), ethical approvals, and public benefit charters.
- **Platform Architects & DevOps Engineers**: Explore illustrative OWL/RDF, SHACL, Rego and admission-controller patterns, with implementation decision gates.
- **Citizen Advocates & Oversight Panels**: Understand proposed safeguards, responsibilities and public accountability.
- **Commercial & Life Sciences Partners**: Explore governance conditions for research partnerships; using this playbook does not confer accreditation or eliminate disclosure risk.

---

## 📄 License & Attribution

Project Wavebound is released under the **MIT License**.

Built to advance transparent, secure, and reproducible population data governance across modern data analysis & intelligence platforms.
