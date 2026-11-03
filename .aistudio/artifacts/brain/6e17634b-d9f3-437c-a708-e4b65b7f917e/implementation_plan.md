# Implementation Plan: Curated Multi-Lens Cytoscape Knowledge Graph (Option A)

Expand the Cytoscape knowledge graph from a single Five Safes policy compiler into a **user-friendly, educational multi-lens explorer** of the Trusted Research Environment (TRE) ecosystem. Rather than overwhelming learners with an exhaustive 50-node network, this plan curates **5 focused lenses with 5–8 high-impact nodes each**, prioritizing visual clarity, intuitive comprehension, and zero clutter.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Confirmed Approach (Option A - Multi-Faceted Subsystem Switcher)**: Users navigate between distinct, curated perspectives using a clean top-bar lens switcher.
> - **Educational Focus (Not Exhaustive)**: To prevent visual clutter and cognitive fatigue, each lens is deliberately curated to **5–8 essential nodes** with clear plain-English definitions and intuitive relationship labels.
> - **Curated Subsystem Lenses**:
>   1. **Policy-as-Code Pipeline** *(The existing 4-tier flow: Policy → SHACL → OPA → PROV-O)*
>   2. **Cloud & Computing Fabric** *(VDI Bastion, Zero-Egress VPC, Ephemeral Storage, In-Enclave AI Cluster)*
>   3. **Data Lifecycle & Linkage** *(Secure Ingest, De-ID Engine, Data Catalogue, Honest Broker, Airlock Egress)*
>   4. **Human Roles, Decision Gates & PPIE** *(Data Access Committee, Caldicott Guardian, Patient/Public Panel, 2-Person Airlock Panel)*
>   5. **Unified TRE Overview** *(An interconnected macro-view linking all 4 domains)*
> - **Zero Code Modification in this Turn**: Following planning mode guidelines for `Plan action: revise`, source code is untouched pending plan confirmation.

---

## 1. Overview & Core Concept

### What It Does
Transforms the Cytoscape canvas from a static, compiler-skewed view into an interactive **TRE Systems & Governance Explorer**. A prominent lens toolbar allows students, researchers, policy makers, and auditors to view the exact facet of the TRE they care about without visual tangle.

### Target Personas
* **Epidemiologists & Population Researchers**: Understand how their code runs inside isolated VPCs and how outputs pass disclosure control.
* **Information Governance & Caldicott Guardians**: Inspect decision gates (DAC, Caldicott, PPIE, Airlock).
* **Data Engineers & Platform Architects**: Trace data flows from quarantined ingest through de-identification, linkage, and workspace provisioning.
* **Citizens & Patient Advocates**: View how patient safeguards and National Data Opt-Outs are preserved.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Lens Selection**: User clicks one of 5 perspective tabs at the top of the Cytoscape component:
   * 🛡️ `Policy Compilation Pipeline`
   * ☁️ `Cloud & Infrastructure Fabric`
   * 🔄 `Data Lifecycle & Linkage`
   * 👥 `Human Roles & Patient Panels (PPIE)`
   * 🌐 `Full TRE Ecosystem Overview`
2. **Instant Focused Transition**: Cytoscape smoothly animates nodes and edges into a curated, non-overlapping preset layout tailored for that lens.
3. **Node Inspection**: Clicking any node opens the side inspector panel displaying:
   * Plain-English title and summary
   * Role in the TRE ecosystem
   * Technical / Governance details
   * Executable code snippet or policy rule
   * Direct deep links to Glossary terms and Playbook sections
4. **Layout Freedom**: Learners can toggle between **Curated Flow (Preset DAG)**, **Hierarchical Tree**, **Orbital Rings (Concentric)**, or **Physics Force (COSE)** for any active lens.

### Color-Coded Domain Tokens (High Contrast & Theme Compatible)
* **Cyan (`#06b6d4`)**: Statutory Policies & Governance Standards
* **Purple (`#8b5cf6`)**: SHACL Constraint Shapes & Closed-World Validation
* **Indigo (`#6366f1`)**: Cloud Infrastructure & VDI Workspace Fabrics
* **Emerald (`#10b981`)**: Data Lifecycle, De-ID & Honest Broker Linkage
* **Amber (`#f59e0b`)**: Human Decision Gates, Caldicott Guardians & SIRO
* **Rose (`#f43f5e`)**: Public & Patient Involvement (PPIE) & Citizen Safeguards
* **Sky (`#0ea5e9`)**: Autonomous AI Workloads & MCP Boundaries

---

## 3. Curated Node Topology per Lens (5–8 Nodes Each)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              5 CURATED EDUCATIONAL LENSES                              │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Lens 1: Policy Pipeline        │ Policy Core → SHACL Shape → OPA Rule → PROV-O Audit   │
│ Lens 2: Cloud Infrastructure   │ VDI Bastion → Zero-Egress VPC → Scratch Disk → AI GPU  │
│ Lens 3: Data Lifecycle        │ Secure Ingest → Salted De-ID → Catalogue → Egress Gate│
│ Lens 4: Human Roles & PPIE     │ DAC Gate → Caldicott Guardian → PPIE Panel → Airlock  │
│ Lens 5: Unified Macro-Overview │ The 4 Hubs Interconnected at Major Transition Points  │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

### Lens 1: Policy-as-Code Compilation (Existing Refined)
* `pol_FiveSafes`: Root statutory governance framework.
* `pol_SafePerson` / `pol_SafeSetting` / `pol_SafeData` / `pol_SafeOutput`: 4 policy dimensions.
* `shacl_WorkspaceAdmission` / `shacl_SDCOutput`: Closed-world validation shapes.
* `opa_AdmissionRule` / `opa_AirlockRule`: Sub-millisecond runtime PDP evaluators.
* `provo_AuditTriple`: Append-only audit trail.

### Lens 2: Cloud & Computing Infrastructure Fabric (New)
* `infra_VDI`: Virtual Desktop (Guacamole) streaming pixels only with copy-paste blocked.
* `infra_ZeroEgressVPC`: Hardened private cloud subnet with external internet routes severed.
* `infra_CalicoPEP`: eBPF/Calico network policy blocking all outbound WAN traffic.
* `infra_WorkspacePod`: Ephemeral Jupyter/RStudio container runtime.
* `infra_EncryptedStorage`: Project-scoped encrypted storage with ephemeral scratch wipe.
* `infra_GPUCluster`: Air-gapped accelerator fabric hosting in-enclave LLMs.

### Lens 3: End-to-End Data Lifecycle (New)
* `data_SecureLandzone`: Quarantine zone for incoming SFTP transfers with virus/checksum scanning.
* `data_DeIDEngine`: Cryptographic pseudonymisation pipeline replacing NHS numbers with salted IDs.
* `data_HonestBroker`: Independent linkage agent joining disparate datasets (e.g., GP records + Census).
* `data_Catalogue`: DCAT-AP metadata catalogue indexing data dictionaries and sensitivity tiers.
* `data_ResearchEnclave`: Active research workspace containing approved analytical cohort partitions.
* `data_AirlockEgress`: Secure export gateway verifying statistical disclosure control ($k \ge 10$).

### Lens 4: Human Roles, Decision Gates & PPIE (New)
* `role_DAC`: Data Access Committee approving research ethics and demonstrative public benefit.
* `role_PPIEPanel`: Lay citizen and patient advisory group testing public value.
* `role_OptOutRegistry`: National Data Opt-Out service verifying patient research choices.
* `role_CaldicottGuardian`: Senior conscience overseeing confidentiality and proportionate sharing.
* `role_HumanSponsor`: Accredited researcher legally accountable for AI agent workloads.
* `role_AirlockPanel`: Independent 2-person review team inspecting statistical output tables.

### Lens 5: Unified TRE Ecosystem Overview
* Connects the 4 primary hubs with cross-cutting bridges:
  * `Human Approval (DAC)` $\rightarrow$ unlocks $\rightarrow$ `Policy Rules (SHACL/OPA)`
  * `Policy Rules` $\rightarrow$ configures $\rightarrow$ `VPC Infrastructure`
  * `Data Pipeline` $\rightarrow$ loads cohort into $\rightarrow$ `Workspace Pod`
  * `Airlock Panel` $\rightarrow$ verifies output with $\rightarrow$ `OPA Egress Rule`

---

## 4. Technical Implementation Steps

1. **`src/data/graphData.ts`**:
   * Add a `subsystem` attribute to `GraphNodeData`: `'policy' | 'infrastructure' | 'data-lifecycle' | 'governance' | 'unified'`.
   * Add curated nodes and edges for Infrastructure, Data Lifecycle, and Human Roles/PPIE.
   * Provide pre-calculated `preset` coordinates for each lens to guarantee zero overlap.
2. **`src/components/CytoscapeGraph.tsx`**:
   * Add a responsive lens selection toolbar at the top:
     * `Policy Compilation` | `Infrastructure` | `Data Lifecycle` | `Human Roles & PPIE` | `Full Ecosystem`
   * Filter visible elements based on the active lens before initializing or updating the Cytoscape graph.
   * Update node style selectors to support the new domain colors (Indigo for Infra, Emerald for Data, Amber for Roles, Rose for PPIE).
   * Ensure node selection, inspection sidebar, copy code snippets, and layout resets update smoothly.
3. **Verification**:
   * Run `lint_applet` (`tsc --noEmit`) to verify zero type mismatches.
   * Run `compile_applet` (`npm run build`) to ensure clean bundle production.

---

## 5. Summary of Benefits
* **Educational & Approachable**: Each view presents a coherent story with 5–8 clear concepts instead of overwhelming newcomers.
* **Zero Visual Clutter**: Eliminates overlapping nodes and intersecting edge spaghetti.
* **Multi-Audience Appeal**: Researchers, engineers, clinical leaders, and patient advocates can immediately find their respective domain.
