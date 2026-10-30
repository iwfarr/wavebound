# Implementation Plan: Seawater Architecture & Visual Polish

Establish authoritative architectural references, fix resource links and UI rendering bugs, implement the horizontal interlinked wave logo, and deliver an in-depth reference guide contrasting NHS VPN security risks with air-gapped TRE enclaves for AI coding assistants.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed with the user during Phase 1:
> - **Confirmed Decision 1 (NHS VPN Scope)**: Include a dedicated reference section in the LLM Security Enclave contrasting the real-world risks of developer LLM usage on NHS VPN connections (which often permit external internet access) versus air-gapped TRE enclaves.
> - **Confirmed Decision 2 (Logo Presentation)**: The interlinked yin-yang wave logo will feature horizontal opposing wave crests meeting and hooking in the center along a horizontal axis (evoking interlinked index fingers).

---

## 1. Overview & Core Concept

This milestone addresses five interrelated user requirements across functional clarity, visual identity, and security architecture:
1. **Broken Resource Links Repair**: Audit and restore external URLs in `src/data/resourcesData.ts` (SATRE, ONS, SAIL Databank, NHS Caldicott, ICO codes).
2. **Conceptual Explanatory Reference**: Add a visual explanation of *"Formal definitions of research governance metadata versus ephemeral Kubernetes runtime state"* to the Playbook and Implementation Track.
3. **Checkbox Entity Rendering Fix**: Eliminate raw `&check;` and `&bull;` entity strings in `ImplementationTrack.tsx` by replacing them with clean Unicode glyphs (`✓`, `•`) and Lucide icon components.
4. **Horizontal Interlinked Yin-Yang Wave Logo**: Redesign `SeawaterLogo.tsx` with dual wave crests flowing toward each other horizontally and interlocking in the center (left wave: inward security/ingress; right wave: outward transparency/egress).
5. **NHS VPN vs. TRE Enclave Reference Standard**: Create an architectural guide in `LLMSecurityEnclave.tsx` analyzing the "NHS VPN Split-Tunneling Illusion" where developers assume VPN connectivity protects against cloud LLM prompt leaks.

---

## 2. User Experience & Visual Design

### A. Horizontal Interlinked Wave Logo
- **Geometry**: Two opposing ocean waves along a horizontal axis. The left wave (glowing cyan `#22d3ee` to `#06b6d4`) flows inward from the left; the right wave (deep azure `#2563eb` to `#3b82f6`) flows inward from the right. The two crests interlock in the center like hooked index fingers, symbolizing the harmony between inward clinical data protection and outward research transparency.
- **Precision SVG Implementation**: Created in `SeawaterLogo.tsx` with clean cubic Bezier curves, crisp gradient fills, and responsive scaling across `icon`, `badge`, `horizontal`, and `hero` modes.

### B. "Metadata vs. Runtime State" Visual Explainer
- **Location**: Embedded in `TechnicalConcepts.tsx` (under GitOps & Architecture) and `PlaybookReader.tsx` (Phase 1.1).
- **Format**: An interactive comparative panel contrasting:
  - **Governance Metadata (The Ontological Law)**: Who is accredited, what ethics approvals exist, approved data sensitivity tiers, retention horizons. Immutable, version-controlled in Git, machine-readable in RDF/OWL.
  - **Cluster Runtime State (The Infrastructure Telemetry)**: Pod IP addresses, node CPU/GPU quotas, ephemeral egress sockets, container IDs. Dynamic, managed by Kubernetes and Calico CNI, disposable.
  - **The "Why"**: Explaining why coupling policy directly to cluster state causes brittle configurations, false lockouts, and compliance blind spots.

### C. NHS VPN vs. Air-Gapped TRE Enclave Reference
- **Location**: Added as a primary tab/section in `LLMSecurityEnclave.tsx`: *"Architectural Analysis: The NHS VPN Illusion vs. True TRE Enclave Isolation"*.
- **Visuals**: A structured comparison matrix and network flow diagram highlighting:
  - Why standard Trust VPNs do not stop Copilot/Cursor/Cline from streaming code to external endpoints.
  - How split tunneling and default outbound routing allow data exfiltration while appearing "on-network".
  - Defense-in-depth mitigations: in-enclave inference, zero-WAN CNI policies, and local proxy sanitizers.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Dedicated NHS VPN Reference vs. Pure Enclave Focus
- **Chosen Approach**: Add a dedicated reference subsection with a clear architectural diagram and risk matrix.
- **Why**: Many NHS and university developers mistakenly believe being connected to an NHS Trust VPN protects patient data when using cloud LLM plugins. Demystifying this prevents critical compliance breaches.
- **Alternative Considered**: Merely adding a 1-sentence warning bullet (rejected as insufficient to explain the network routing reality).

### Decision 2: SVG Vector Geometry for Interlinked Wave
- **Chosen Approach**: Author a bespoke, mathematically precise SVG component for the interlinked horizontal waves in `SeawaterLogo.tsx`, paired with an updated generated asset.
- **Why**: SVG guarantees pixel-perfect vector rendering at 16px, 24px, 48px, and 128px without compression artifacts, fuzziness, or loading latency.

---

## 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJECT SEAWATER PLATFORM                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌───────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Header & Logo   │    │  Implementation &   │    │ LLM Security Enclave│
│ (SeawaterLogo.tsx)│    │   Rollout Track     │    │(LLMSecurityEnclave) │
├───────────────────┤    ├─────────────────────┤    ├─────────────────────┤
│ • Horizontal      │    │ • Fix &check; bug   │    │ • NHS VPN vs TRE    │
│   interlocking    │    │ • Sprint schedule   │    │   enclave analysis  │
│   wave crests     │    │ • Decision register │    │ • Split-tunnel risk │
│ • Dual-color      │    │ • Metadata vs State │    │ • Zero-WAN CNI rules│
│   cyan/azure flow │    │   architecture card │    │ • Prompt sanitizers │
└───────────────────┘    └─────────────────────┘    └─────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
              ┌─────────────────────┐ ┌─────────────────────┐
              │ Resources Compendium│ │   Playbook Reader   │
              │ (resourcesData.ts)  │ │ (PlaybookReader.tsx)│
              ├─────────────────────┤ ├─────────────────────┤
              │ • Validated URLs    │ │ • Section 1.1 note  │
              │ • Active SATRE/ONS  │ │ • Non-breaking track│
              │ • Fallback archives │ │ • Term deep links   │
              └─────────────────────┘ └─────────────────────┘
```

### Planned File Changes
1. `src/components/SeawaterLogo.tsx`: Implement the horizontal interlocking dual-wave SVG and branding layout.
2. `src/components/ImplementationTrack.tsx`: Replace raw `&check;` and `&bull;` HTML entities with Unicode `✓` / `•` and icon components.
3. `src/data/resourcesData.ts`: Audit and update all resource URLs to active, verified endpoints.
4. `src/data/playbookContent.ts`: Add explicit explanations of Governance Metadata vs. Runtime State.
5. `src/components/LLMSecurityEnclave.tsx`: Add the dedicated architectural reference section on NHS VPN vs. TRE Enclave risks for LLM assistants.

---

## 5. Verification Plan

- Run `npm run lint` (`lint_applet`) to verify zero TypeScript errors.
- Run `npm run build` (`compile_applet`) to confirm clean bundle generation.
- Verify in browser preview:
  - Checkbox icons render cleanly without raw `&check;` text.
  - Resource links open verified destinations with `rel="noopener noreferrer"`.
  - The horizontal interlocking wave logo renders crisply across navbar, badges, and hero.
  - The NHS VPN reference section displays clear network diagrams and actionable mitigations.
