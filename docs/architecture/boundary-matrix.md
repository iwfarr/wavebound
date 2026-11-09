# Architecture Specification: NHS & UK Public Sector Boundary Matrix

## Executive Summary & Statutory Mandate

In Trusted Research Environments (TREs) and Secure Data Environments (SDEs), the boundary between **Authoritative Governance Metadata** and **Ephemeral Runtime State** is a foundational statutory partition.

Under UK GDPR Article 25 (Data Protection by Design and by Default), the Digital Economy Act 2017 (Part 5, Chapter 5), and the 8 NHS Caldicott Principles (notably Principle 8: Public Transparency), safe & secure data intelligence environments must guarantee that raw patient microdata, transient analytical in-memory variables, and secret keys never leak into policy repositories, audit ledgers, or discovery catalogues.

Technology serves human accountability—it does not replace it. Seawater operates strictly as a **decision-support platform**, compiling **standardized evidence packs** and **compliance dossiers** to provide a **governance baseline** for statutory human panels, including Data Access Advisory Groups (DAAG) and local Caldicott Guardians.

---

## Architectural Planes in Safe Data Environments

```
+-----------------------------------------------------------------------------------+
|                        PLANE 1: STATUTORY GOVERNANCE & METADATA                   |
|       (Immutable, Declarative, Version-Controlled, Closed-World Determinism)       |
|                                                                                   |
|  - W3C SHACL IG Tags (Caldicott 1-8, s251) - OPA Rego Policies (.rego)            |
|  - Standardized Evidence Packs             - W3C PROV-O Audit Activity Records    |
|  - CAG / REC / DAAG Approval Metadata      - Public PPIE Transparency Registers   |
+-----------------------------------------------------------------------------------+
                                         |
             Decision-Support Baseline Evaluation (OPA PDP Engine)
                                         v
+-----------------------------------------------------------------------------------+
|                        PLANE 2: ISOLATED ANALYTICAL RUNTIME                       |
|           (Air-Gapped, Direct Data-Plane, Least-Privilege Namespaces)             |
|                                                                                   |
|  - Direct Analytical Engine (DuckDB / PG)  - Ephemeral NVMe Scratch Volumes       |
|  - Internal Package Mirrors (CRAN/PyPI)    - Namespaced Admission Controller      |
|  - Air-Gapped SDC Airlock Egress           - Human Airlock Review Queue           |
+-----------------------------------------------------------------------------------+
```

---

## The Four NHS & Public Sector Architectural Realities

### 1. Kubernetes & Least-Privilege Realities
* **Assumption of Restricted Rights:** NHS Trusts and university IT departments operate heavily locked-down, multi-tenant clusters where cluster-admin rights are strictly prohibited.
* **No Fragile Cluster-Wide Webhooks:** Seawater explicitly rejects cluster-wide `ValidatingAdmissionWebhooks` that could block critical clinical or administrative pods on intermittent timeouts.
* **Namespaced Audit-and-Alert Pattern:** Policy enforcement controllers operate exclusively within scoped namespaces (e.g. `research-sandbox`) using an audit-and-alert pattern (`failurePolicy: Ignore`), surfacing policy discrepancies to the security information and event management (SIEM) pipeline without inducing cluster-wide denial-of-service risks.

### 2. Analytical Networking & Workload Realities
* **Bypass Userspace Proxies for Analytics:** High-throughput analytical workloads (parallel R scripts querying DuckDB, PostgreSQL, or Arrow tables) are routed directly over dedicated internal network policies to database and storage endpoints.
* **Eliminate TCP Connection Exhaustion:** Userspace proxies (Envoy/Kong) are strictly limited to metadata checks and lightweight control-plane traffic. Routing heavy analytical streams through Envoy exhausts userspace TCP connection pools.

### 3. Air-Gapped Safe Setting Realities
* **Outbound Internet Severed:** In compliance with the Five Safes (Safe Setting) and SATRE v1.1, analytical enclaves operate without internet access.
* **Curated Internal Package Mirrors:** Deployment architectures explicitly provision and maintain local mirrors for CRAN, PyPI, and private container registries (Harbor), ensuring researchers have access to approved scientific libraries without compromising air-gap isolation.

### 4. Semantic Metadata & Closed-World Determinism
* **Decoupled from Volatile Clinical Schemas:** Seawater does not attempt to model or traverse frequently updated clinical database schemas (e.g., SNOMED CT releases, local EHR customizations) in browser graphs or admission interceptors.
* **High-Level Information Governance Tags:** SHACL shapes and metadata schemas are strictly scoped to statutory Information Governance tags (e.g., Caldicott Principles 1–8, NHS Act 2006 Section 251, Digital Economy Act 2017 accreditation).
* **Strict Closed-World Determinism:** ABAC and RBAC access evaluations rely on closed-world semantics, keeping policy graph complexity minimal so that decision-support baselines execute in sub-millisecond latency.

---

## Comprehensive Boundary Matrix

| Boundary Dimension | Plane 1: Governance & Metadata | Plane 2: Isolated Analytical Runtime | Enforced Boundary Guardrail |
| :--- | :--- | :--- | :--- |
| **Storage Medium** | Git repositories, OPA Bundles, OCI Artifact Registries, Graph Triplestores | Encrypted ephemeral block storage (KMS-sealed), tmpfs RAM volumes | No patient identifiers or microdata rows may ever be serialized into Git or triplestores. |
| **Persistence Horizon** | Permanent immutable audit history (W3C PROV-O ledger) | Ephemeral: destroyed at workspace session teardown or pod termination | Session termination issues cryptographic shredding of scratch volumes (`shred -u`). |
| **Data Types Handled** | Schemas, cell counts, cryptographic hashes, CAG/REC identifiers, access roles | Raw EHR rows, genomic BAM/CRAM files, imaging DICOM slices, tabular queries | Strict schema validation ensures only statistical metadata flows outward. |
| **Network Visibility** | Internal cluster VPC; read-only policy synchronization plane | Air-gapped safe setting; internal CRAN/PyPI mirrors; direct database connections | Analytical pods have zero outbound internet route; heavy queries bypass userspace Envoy. |
| **Cryptographic Provenance** | Signed commits (GPG), SHA-256 hashes of input queries and policy revisions | Ephemeral TLS 1.3 mTLS session tokens with 15-minute rotation | Every query decision binds the commit SHA of the exact policy active at evaluation. |
| **Human Accountability** | Standardized evidence pack compiled for DAAG and Caldicott Guardian review | Isolated execution; statistical disclosure control evaluation ($k \ge 10$, dominance $\le 80\%$) | Technology provides decision-support; human committees retain statutory release authority. |

---

## Information Governance & SDC Implementation Standards

1. **Zero Raw Microdata in Audit Ledgers:**
   When emitting W3C PROV-O audit trails or OpenTelemetry traces, the decision-support engine records `crypto.sha256(json.marshal(input.query))` and summary counts, **never** raw observation values.

2. **Standardized Evidence Packs for DAAG & Caldicott Guardians:**
   Every access request and egress candidate generates a self-contained compliance dossier with cryptographic hashes, SHACL conformance results, and OPA policy evaluation traces to support human panel decision-making.

3. **Quantitative SDC Baseline:**
   Before tabular data or graphical plots leave Plane 2 to cross into Plane 1 for public release, they must satisfy statistical disclosure control checks ($k \ge 10$, $(k, n)$-dominance $\le 80\%$, and plot point de-identification). Outputs failing baseline thresholds are flagged for human airlock reviewer intervention.
