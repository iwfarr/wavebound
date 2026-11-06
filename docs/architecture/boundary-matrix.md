# Architecture Specification: Metadata vs. Runtime State Boundary Matrix

## Executive Summary & Boundary Mandate

In Trusted Research Environments (TREs) and Secure Data Environments (SDEs), the boundary between **Authoritative Governance Metadata** and **Ephemeral Runtime State** is a vital security and compliance partition.

Under UK GDPR Article 25 (Data Protection by Design and by Default) and NHS Caldicott Principle 3 (Minimum Necessary Data), data intelligence platforms must guarantee that raw patient microdata, transient analytical in-memory variables, and secret keys never leak into policy repositories, audit ledgers, or discovery catalogues. Conversely, governance metadata must be immutable, version-controlled, and cryptographically verifiable.

---

## The Two Distinct Architectural Planes

```
+-----------------------------------------------------------------------------------+
|                            PLANE 1: GOVERNANCE & POLICY                           |
|       (Immutable, Declarative, Version-Controlled, Cryptographically Signed)     |
|                                                                                   |
|  - W3C SHACL Shapes (.ttl)            - OPA Rego Policies (.rego)                |
|  - DCAT-AP Asset Metadata Schemas     - W3C PROV-O Audit Activity Records         |
|  - Approval Statuses (REC/CAG/DAC)    - User Identity Claims (OIDC / OAuth)       |
+-----------------------------------------------------------------------------------+
                                         |
                       Compiled Evaluation (OPA PDP Engine)
                                         v
+-----------------------------------------------------------------------------------+
|                            PLANE 2: EPHEMERAL RUNTIME                             |
|          (Transient, Sandboxed, Zero-Egress, Air-Gapped Compute Pods)            |
|                                                                                   |
|  - Clinical Microdata Tables (SQL/Parquet) - Scratch /tmp NVMe Volumes            |
|  - Python / R / Julia Memory Processes    - Model Weights in VRAM                 |
|  - Graphical Intermediate Rendering Data   - Airlock Output Candidates             |
+-----------------------------------------------------------------------------------+
```

---

## Comprehensive Boundary Matrix

| Boundary Dimension | Plane 1: Governance & Metadata | Plane 2: Ephemeral Runtime State | Enforced Boundary Guardrail |
| :--- | :--- | :--- | :--- |
| **Storage Medium** | Git repositories, OPA Bundles, OCI Artifact Registries, Graph Triplestores | Encrypted ephemeral block storage (KMS-sealed), tmpfs RAM volumes | No patient identifiers or rows may ever be serialized into Git or triplestores. |
| **Persistence Horizon** | Permanent immutable audit history (W3C PROV-O ledger) | Ephemeral: destroyed at workspace session teardown or pod termination | Session termination issues cryptographic shredding of scratch volumes (`shred -u`). |
| **Data Types Handled** | Schemas, cell counts, hashes, approval identifiers, access roles | Raw EHR rows, genomic BAM/CRAM files, imaging DICOM slices, tabular queries | Strict schema validation ensures only statistical metadata flows outward. |
| **Network Visibility** | Internal cluster VPC; read-only policy synchronization plane | Zero-egress network namespace; blocked default gateway via eBPF/Calico | Analytical pods cannot connect to external internet endpoints. |
| **Cryptographic Provenance** | Signed commits (GPG), SHA-256 hashes of input queries and policy revisions | Ephemeral TLS 1.3 mTLS session tokens with 15-minute rotation | Every query decision binds the commit SHA of the exact policy active at evaluation. |
| **AI / Agentic Scope** | Declarative tool schemas, Stanford UIT risk tiers, rate-limits | Transient tool execution buffers, in-memory context windows | Agents are prohibited from altering policy definitions or bypassing PDP intercepts. |

---

## Policy-as-Code Implementation Rules

1. **Zero Raw Microdata in Audit Ledgers**:
   When emitting W3C PROV-O audit trails or OpenTelemetry traces, the PDP must record `crypto.sha256(json.marshal(input.query))` and statistical counts, **never** raw observation values.

2. **Decoupled Deployment Lifecycles**:
   - The **Seawater Policy-as-Code Engine** is deployed into the TRE Kubernetes control plane as an admission webhook and envoy sidecar.
   - The **Playbook Web Portal** is deployed as a static or containerized documentation and governance compendium for stakeholders.
   - Changes to governance policies follow GitOps PR workflows with automated unit tests before container deployment.

3. **Airlock Boundary Verification**:
   Before tabular data or graphical plots leave Plane 2 to cross into Plane 1 for public release, they must satisfy automated Statistical Disclosure Control (SDC) checks ($k \ge 10$, dominance thresholds, and plot point de-identification).
