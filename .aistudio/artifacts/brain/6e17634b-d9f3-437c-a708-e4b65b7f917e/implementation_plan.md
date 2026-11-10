# Project Seawater: 10-Phase Simplification & Enterprise Refactor Plan

A phased, pragmatic roadmap for streamlining Information Governance (IG) decision-support across Safe & Secure Data Intelligence Environments (SDEs & TREs), ensuring statutory compliance without masquerading as an official NHS body.

*Status: Work in progress · Open-source reference standard*

---

## Progress Overview

| Phase | Title | Focus & Deliverable | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Dual-Persona Navigation** | Global persona toggle (`IG Handbook` vs `Runtime`) across header, mobile drawer, and Gateway hub | **COMPLETED** |
| **Phase 2** | **Universal Evidence Pack Generator** | Standardized compliance dossier with Web Crypto SHA-256 seal, Caldicott & DAAG sign-offs, 1-click Markdown export, and print summary | **COMPLETED** |
| **Phase 3** | **Five Safes Interactive Evaluator** | Consolidated Statutory Matrix & Five Safes Deep-Dive with live statutory mapping (UK GDPR, S251, Caldicott 1–8) | **COMPLETED** |
| **Phase 4** | **Air-Gapped Package Mirror Architecture** | Dedicated developer guide & manifests for internal package registries with zero internet egress and direct analytics data plane | **COMPLETED** |
| **Phase 5** | **Least-Privilege Enclave Manifests** | Namespaced admission & non-blocking audit-and-alert controllers (`failurePolicy: Ignore`), root-read-only pods, and zero-cluster-admin RBAC | **COMPLETED** |
| **Phase 6** | **Quantitative SDC Math & 7 Output Classes** | Comprehensive SDC Policy & SOP covering 7 statistical output classes (aggregates, regressions, survival curves, extrema, charts, ML weights, tests) with strict min/max suppression | **COMPLETED** |
| **Phase 7** | **Caldicott Principle 8 Transparency Portal** | Public benefit audit register and machine-readable W3C PROV-O provenance triple ledger (dual angle: IG Handbook & Runtime) | **COMPLETED** |
| **Phase 8** | **High-Contrast Editorial Typography & Zero-Pill Polish** | Wavebound Deep Navy & Turquoise brand tokens, Public Sans government scale, high contrast, and strict non-pill badge discipline | **COMPLETED** |
| **Phase 9** | **Curated Knowledge Graph Lenses** | Multi-lens Cytoscape explorer (Statutory Policy, Cloud Fabric, Data Lifecycle, Human Roles) with software-agnostic PEP lens and live sub-ms Rego simulator | **COMPLETED** |
| **Phase 10** | **Procurement & In-House Development Track** | Dual-track hub: Track 1 (Vendor Procurement & Tender Readiness) and Track 2 (In-House NHS Software/AI Development with DCB0129 / DCB0160 Clinical Risk Management) | **COMPLETED** |

---

## Phase 3 Deliverables (Completed)
- **Consolidated Statutory Matrix Component (`StatutoryMatrixView.tsx`)**:
  - Live cross-cutting table linking the Five Safes to UK GDPR (Art 6(1)(e), Art 9(2)(j), Art 25, Art 32), NHS Act 2006 Section 251, Caldicott Principles 1–8, DSPT assertions, and ONS SDC rules.
  - Interactive filters by Five Safes pillar (`All`, `Safe People`, `Safe Projects`, `Safe Settings`, `Safe Data`, `Safe Outputs`) and status (`PASS`, `WARN`, `FAIL`).
  - Search filter across statutes, citations, Caldicott principles, and machine policy nodes.
  - 1-click **Export Matrix .md** and **Copy CSV** for committee reporting.
- **Five Safes Pillar Deep-Dive Component (`FiveSafesPillarsView.tsx`)**:
  - Modular deep-dive cards for each of the 5 Safes:
    - *Safe People*: DEA 2017 accreditation, annual IG certification, Stanford UIT AI non-personhood doctrine.
    - *Safe Projects*: IRAS REC ethical approval, Section 251 CAG clearance, public benefit validation.
    - *Safe Settings*: Zero-egress VPC network routing, eBPF/Calico drops, air-gapped package mirrors.
    - *Safe Data*: Salted HMAC SHA-256 pseudonymisation, direct identifier expungement, clinical tiering.
    - *Safe Outputs*: Quantitative statistical disclosure control ($k \ge 10$, dominance $\le 80\%$), 2-person airlock protocol.
  - Interactive parameter controls directly embedded in each pillar card.
- **Govern & Assure Workspace Sub-navigation**:
  - 3 view tabs: `Interactive Protocol Evaluator`, `Consolidated Statutory Matrix`, and `Five Safes Pillar Deep-Dive`.
  - Immediate synchronisation between simulator state, statutory matrix findings, and evidence pack dossier generation.

---

## Phase 4 Deliverables (Completed)
- **Air-Gapped Package Mirror Architecture Component (`AirGapArchitectureHub.tsx`)**:
  - Zero-WAN egress enforcement architecture for NHS ICBs and university multi-tenant clusters.
  - Dedicated operational guides & configurations for:
    - Internal CRAN Mirror (`Nexus / Posit Package Manager` with airlock hash verification).
    - Internal PyPI Mirror (`Devpi / Artifactory` with pip.conf restricted index).
    - OCI Registry Harbor (`Harbor + Trivy CVE Gates` with Cosign signature enforcement).
  - 4-Stage Quarantined Ingestion Diode (External Request -> Air-Gapped DMZ Scan -> Security Review -> Air-Gapped Internal Sync).
  - Direct Analytics Data Plane (DuckDB, PostgreSQL, Arrow Flight) bypassing Envoy sidecar proxies to eliminate socket exhaustion on billion-row cohort queries.
  - Interactive Package Mirror Configuration Generator with 1-click YAML/Conf download and clipboard copy.

---

## Phase 5 Deliverables (Completed)
- **Least-Privilege Enclave Manifest Hub (`LeastPrivilegeEnclaveHub.tsx`)**:
  - Interactive multi-tenant Kubernetes manifest generator tailored for enterprise NHS and academic TREs:
    - **RStudio Analytical Pod**: Read-only root filesystem, non-root UID 10001, ephemeral 50Gi `/scratch` volume, internal CRAN mirror routing, and dropped Linux capabilities.
    - **DuckDB Analytics Pod**: Direct kernel socket access for heavy columnar aggregations, no Envoy sidecar overhead.
    - **Namespaced Admission Controller**: ValidatingWebhookConfiguration scoped strictly to project namespaces with non-blocking **`failurePolicy: Ignore`** audit-and-alert mechanism to prevent research pod launch timeouts.
    - **Namespace-Scoped RBAC RoleBinding**: Zero `cluster-admin` bindings; strictly namespaced roles for research teams and automated CI/CD pipelines.
  - **8 Statutory Least-Privilege Guardrails Matrix**: Complete mapping of K8s securityContext settings against NHS DSPT and SATRE v1.1 requirements (Root FS Read-Only, Drop ALL Capabilities, No Host Namespaces, No Privilege Escalation, Strict Resource Limits, Namespace Isolation, Audit-and-Alert vs Blocking, Non-Root UID 10001).
  - **Live Admission-and-Alert Event Stream Simulator**: Visual demonstrator showing real-time non-blocking audit events emitted to SIEM/Audit Logs without halting researcher workloads.
  - Integrated into `BuildDeployWorkspace.tsx` under the `manifests` sub-workspace tab.

---

## Phase 6 Deliverables (Completed)
- **Quantitative SDC Hub Component (`QuantitativeSDCHub.tsx`)**:
  - Grounded in Office for National Statistics (ONS) SDC Handbook, UK LLC Output Checking, and Caldicott Principle 8 ("No surprises").
  - **Interactive Tabular SDC Simulator**:
    - Real-world clinical presets: Rare Pediatric Cardiology cohort (cross-tabulation), Specialized Biologic Drug expenditure (continuous dominance), and Survival Analysis & Regression Residuals.
    - **Primary Cell Suppression ($k < 10$)**: Evaluates small cells and suppresses with `<10*` badge.
    - **Complementary Secondary Suppression**: Mathematical solver identifying when row/column marginal totals allow deductive calculation of suppressed cells ($Total - Cell_1 = Cell_2$). Automatically applies `SUPP*` to adjacent non-disclosive cells to eliminate derivation vectors.
    - **Top-Contributor Dominance Testing ($(1, p\%)$ and $(2, 85\%)$ rules)**: Computes continuous financial or clinical metric concentration (e.g. specialized pharmacy spend), flagging when top 1 patient accounts for $> 80\%$ or top 2 accounts for $> 85\%$.
    - **Degrees of Freedom Verification**: Enforces $df = N - p \ge 10$ before statistical model coefficients can leave the airlock.
  - **ONS & NHS SDC Methods Comparison**: Comparative reference matrix contrasting Primary & Complementary Suppression, Dominance Testing, Controlled Rounding (Base 3/5), and Degrees of Freedom.
  - **Machine Policy-as-Code (SHACL & OPA Rego)**:
    - Formal W3C SHACL shape (`sdc_airlock_shape.ttl`) with `sh:minInclusive 10` and `sh:maxInclusive 0.80`.
    - Low-latency OPA Rego policy (`airlock_sdc.rego`) evaluating tabular matrices in $< 1\text{ms}$ at the airlock PEP.
  - **Two-Person Airlock Review Protocol & Cryptographic Seal**:
    - Gate 1: Automated SDC Shape PEP Validation.
    - Gate 2: Accredited SDC Lead / Output Checker review with audit rationale.
    - Real-time **Web Crypto SHA-256 seal** computed over candidate table data, suppression results, and reviewer signatures.
    - 1-click **Export SDC Audit Dossier (.md)** and **Download Release Manifest (.json)**.
  - **Seamless Navigation**: Integrated as a dedicated tab in `GovernAssureWorkspace.tsx`, linked from the Safe Outputs gate card, and rendered directly in `ResourcesPage.tsx`.
- **Clean Mathematical Notation Fix**:
  - Replaced unparsed LaTeX formatting in `quizBank.ts` and `QuizEngine.tsx` with clean unicode math (`k ≥ 10`, `dominance ≤ 80%`), eliminating any broken rendering.
- **De-emphasized Air-Gapped Mirrors**:
  - Default tab in `BuildDeployWorkspace.tsx` shifted to **Semantic Graph Ontology & SHACL Shapes**, positioning graph-navigated, audited Information Governance with OPA, RDF, and OWL front and centre.

---

## Phase 7 Deliverables (Completed)
- **Caldicott Principle 8 Transparency Portal & W3C PROV-O Provenance Ledger (`CaldicottTransparencyPortal.tsx`)**:
  - Delivers the strict dual angle requested by user:
    - **Lens A: `IG Handbook Angle` (Public Benefit & Open Data Use Register)**:
      - Searchable Open Data Use Register complying with HDR UK Gateway and NHS Caldicott 8 standards.
      - Lay summaries written at Reading Age 11 for patients and the public.
      - Explicit Public Benefit & Health Impact statements.
      - Patient & Public Involvement (PPIE) co-design scorecards (e.g. Tiny Tickers & BHF Youth Advisory Board with patient co-authors).
      - National Data Opt-Out (NDOO) compliance audit status with verified record purge counts (14,208 records purged at ingestion).
      - Institutional Caldicott Principle 8 Compliance Verification Checklist.
      - 1-click **Export Open Register (.md)**.
    - **Lens B: `Data Technical Angle` (W3C PROV-O Graph Lineage & Machine Triple Ledger)**:
      - Interactive visual Provenance DAG timeline tracking data from `Entity` (raw HES extract) -> `Activity` (opt-out purge, pseudonymisation, SQL linkage) -> `Entity` (filtered cohort) -> `Activity` (SDC masking) -> `Entity` (airlocked release ticket), accompanied by `Agent` attestations.
      - Cryptographic state commitment viewer displaying SHA-256 state hashes for every node.
      - Cryptographic lineage chain verification simulator.
      - Formal W3C Turtle RDF serialization (`prov_ledger.ttl`).
      - Production SPARQL audit query template (`verify_caldicott8_provenance.rq`).
  - **Seamless Navigation**:
    - Wired into `GovernAssureWorkspace.tsx` as a dedicated workspace view tab (`transparency_ledger`).
    - Added direct shortcut button in the Evaluator's Gate 6 row ("View Public Register").
    - Highlighted in `GatewayPortal.tsx` and linked from `Header.tsx`.
    - Integrated `prov` and `caldicott` namespace filter options into `BuildDeployWorkspace.tsx`.

---

## Phase 8 Deliverables (Completed)
- **High-Contrast Editorial Typography & Zero-Pill Polish**:
  - Maintained Seawater's authentic **Deep Navy (`#0C2340`, `#0F294A`) and Turquoise (`#00A389`, `#0284C7`)** visual identity, deliberately avoiding generic pale HDR UK heather violet washes.
  - Implemented high-contrast `Public Sans` typography tokens with tabular numbers for mathematical SDC metrics.
  - Enforced strict **zero-pill discipline**: converted all rounded pills to crisp, high-density rectangular badges (`rounded-md` / `rounded-lg`) across `ImplementationTrack.tsx`, `PlaybookReader.tsx`, `QuizEngine.tsx`, `GovernanceAtlas.tsx`, and `SeawaterLogo.tsx`.
  - Cleaned all unparsed LaTeX parenthesis math across the quiz bank into clear unicode text (`k ≥ 10`, `dominance ≤ 80%`).

---

## Phase 9 Deliverables (Completed)
- **Curated Knowledge Graph Lenses (`CytoscapeGraph.tsx` & `graphData.ts`)**:
  - Rebuilt the knowledge graph to feature 4 curated, purpose-driven lenses with 6–8 nodes per lens, eliminating visual edge clutter:
    1. **Lens 1: Statutory & Policy-as-Code Lens**: Connects Five Safes Core, DEA 2017 Safe Person, REC/S251 Safe Project, Zero-WAN Egress Safe Setting, SHACL Admission & SDC Shapes, and OPA Rego PDP.
    2. **Lens 2: Cloud Fabric & Enclave PEP Lens**: Traces Perimeter Envoy Gateway, non-blocking admission controller (`failurePolicy: Ignore`), private CRAN/PyPI mirror diode, root-read-only analytical pod, direct Arrow/DuckDB socket, and 2-person airlock PEP.
    3. **Lens 3: Data Lifecycle & SDC Airlock Lens**: Maps secondary uses hospital extract, National Data Opt-Out (14,208 records purged), salted HMAC SHA-256 pseudonymiser, de-identified cohort, primary/secondary SDC solver, and SHA-256 sealed release ticket.
    4. **Lens 4: Human Roles & Governance Accountability Lens**: Models statutory human oversight: Caldicott Guardian / SIRO veto authority, REC/CAG ethics advisory, Accredited Researcher commitments, SDC Output Checker co-signoff, and Patient & Public Advisory Council co-design.
  - **Live Dual-Angle Inspector**:
    - *IG Handbook Angle*: Plain-English summary, direct citizen safeguard reassurance, statutory mandate, and Caldicott principle citation.
    - *Data Technical Angle*: Formal W3C Turtle RDF/OWL class definition, SHACL shape constraint (`sh:minInclusive 10`), compiled OPA Rego rule (`allow { ... }`), and W3C PROV-O audit signature.
  - **Live In-Node Policy Simulator**: Interactive simulator right inside the inspector allowing immediate microsecond Rego decision evaluation (< 0.5ms) with evaluation trace.
  - 1-click **Export Lens (.ttl)** Turtle RDF download.

---

## Phase 10 Deliverables (Completed)
- **End-to-End Enterprise Procurement Readiness Hub (`ProcurementReadinessHub.tsx` & `procurementData.ts`)**:
  - Comprehensive, interactive audit control matrix covering:
    - **SATRE v1.1** (Standard Architecture for Trusted Research Environments: Computing Infrastructure, Data Governance, Output Checking).
    - **NHS Data Security & Protection Toolkit (DSPT 2024/25)**: All 10 National Data Guardian standards including NDOO respect, staff accreditation, and zero cluster-admin RBAC.
    - **ISO/IEC 27001:2022 & ISO 27701:2019**: Annex A controls for DLP, zero-trust network isolation, and secure coding.
    - **DCB0129 & ISO/IEC 42001:2023**: Clinical hazard logging, Clinical Safety Officer (CSO) sign-off, and Stanford UIT AI non-personhood doctrine.
  - **Interactive Vendor Auditing**: Live toggleable compliance states (`COMPLIANT`, `PARTIALLY_COMPLIANT`, `ACTION_REQUIRED`) with automatic recalculation of overall readiness score (100% Mandatory Pass Rate).
  - **Tender-Ready Contractual Schedules**: Pre-written, legally binding clauses for NHS IT tenders (Schedule A: Sovereign Custody & Egress Prohibition, Schedule B: Cryptographic SDC, Schedule C: Least-Privilege Pod Hardening, Schedule D: Caldicott 8 Transparency).
  - **Official Executive Declaration**: Formal Certificate of Conformance for NHS England, HRA, and University IG committees.
  - **Downloadable Evidence Packs**: 1-click **Export Dossier (.md)**, **Download Matrix (.json)**, and **Print Evidence Statement**.
  - **Seamless Integration**: Mounted as a dedicated tab in `GovernAssureWorkspace.tsx`, linked from `ResourcesPage.tsx`, highlighted in `GatewayPortal.tsx`, and accessible in `Header.tsx`.
