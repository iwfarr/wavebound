# Implementation Checklist

Track progress with the checkboxes. A phase is not complete while any of its decision gates are open. Each `D-nnn` refers to the [decision register](decision-register.md).

## 0. Scope and ownership

- [ ] `[SETUP]` Inventory playbook statements and label each as illustrative, externally sourced, or formally approved; record the source and review date.
- [ ] `[SETUP]` Identify the service owner, policy owner, security reviewer, data-protection/legal reviewer, implementer, and operational approver for the selected control.
- [ ] `[SETUP]` Map the systems and lifecycle where the control could act; distinguish research policy from platform configuration and runtime state.
- [ ] `[DECISION REQUIRED: D-001]` Select and approve the first narrow production decision, its users, protected operation, and explicit out-of-scope behavior.
- [ ] `[DECISION REQUIRED: D-002]` Approve applicable jurisdictions, authoritative standards, legal interpretations, and who is qualified to maintain them.

**Exit evidence:** approved scope, named owners, boundaries, and links to authoritative sources.

## 1. Decision and input contract

- [ ] `[SETUP]` Draft a versioned input contract for the selected decision, with field names, types, definitions, provenance, freshness, and validation requirements.
- [ ] `[DECISION REQUIRED: D-003]` Approve the authoritative source and trust model for every security-relevant input, including identity, training, approvals, data classification, and environment state where applicable.
- [ ] `[DECISION REQUIRED: D-004]` Approve the decision semantics: what permits, denies, or defers a request; treatment of missing, stale, contradictory, or unavailable inputs; and any exception path.
- [ ] `[DECISION REQUIRED: D-005, if output-release control is in scope]` Approve quantitative disclosure-control rules, scope, units, boundary conditions, and exceptions before encoding example thresholds.
- [ ] `[SETUP]` Create synthetic input examples that cover expected, boundary, missing, stale, and contradictory values. Do not use personal or production data in fixtures.

**Exit evidence:** reviewed input schema, source mappings, written decision table, and approved policy values.

## 2. Policy implementation and tests

- [ ] `[SETUP]` Compare policy-engine and modeling options against the approved use case, operational constraints, and team skills.
- [ ] `[DECISION REQUIRED: D-006]` Select the runtime policy engine, policy source of truth, and whether an ontology or SHACL validation adds value. Define generated-artifact ownership if compilation is selected.
- [ ] `[IMPLEMENT]` Add the smallest executable policy for the selected decision, with an explicit version and metadata for owner, status, effective date, and source references.
- [ ] `[IMPLEMENT]` Add automated tests for permitted, denied, boundary, missing, malformed, stale, and exception cases from the approved decision table.
- [ ] `[VERIFY]` Demonstrate tests fail when a key rule is removed or inverted; check generated artifacts are reproducible if a compiler is used.
- [ ] `[SETUP]` Add CI checks for policy formatting, validation, tests, and generated-file consistency after engine selection.

**Exit evidence:** repeatable local and CI checks, test report, and traceable policy source.

## 3. Enforcement integration

- [ ] `[DECISION REQUIRED: D-007]` Select the enforcement point and operating mode: evaluate-only, shadow, staged enforcement, or blocking. Identify the operator and failure response.
- [ ] `[IMPLEMENT]` Integrate the policy at the selected server-side control point; do not trust browser-supplied verdicts or editable client state.
- [ ] `[IMPLEMENT]` Define and test the interface between the enforcement point and policy evaluator, including timeouts, unavailable evaluator, malformed input, and duplicate requests.
- [ ] `[VERIFY]` In a non-production environment, prove the real operation is blocked and permitted according to approved fixtures and cannot bypass the decision point.
- [ ] `[VERIFY]` Confirm the educational Policy Sandbox is clearly distinguished from this integration and is never used as the enforcement control.

**Exit evidence:** integration tests against the actual control point and operator-reviewed failure behavior.

## 4. Audit, release, and operations

- [ ] `[DECISION REQUIRED: D-008]` Approve what decision evidence is logged, access controls, retention, privacy limits, and audit destination.
- [ ] `[DECISION REQUIRED: D-009]` Approve change review, release authority, effective-date handling, rollback, emergency changes, and incident response.
- [ ] `[IMPLEMENT]` Record the policy version, decision outcome, reason codes, input provenance identifiers, timestamp, and correlation ID at the approved level of detail.
- [ ] `[VERIFY]` Demonstrate authorized operators can investigate a decision without exposing unnecessary sensitive data.
- [ ] `[VERIFY]` Exercise rollback and policy-service failure procedures; document observed results and owners.
- [ ] `[VERIFY]` Publish operator and reviewer documentation, known limitations, escalation routes, and an approved release record.

**Exit evidence:** approved operational procedures, audit test results, release record, and successful rollback exercise.

## Completion rule

The policy is ready to be described as deployable only when every applicable decision is approved and linked, CI policy checks pass, the selected enforcement point has passed non-production integration tests, and release and rollback are approved. Otherwise report the exact open decision IDs and call the work a prototype or implementation in progress.