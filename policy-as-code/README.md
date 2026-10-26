# Policy-as-Code Implementation Track

This folder tracks the work required to turn ideas in the interactive TRE playbook into policy that is tested, reviewed, and enforced by an operational system.

## Current status

This repository currently contains an educational React application and illustrative policy examples. It does not yet contain executable OWL/RDF, SHACL, or OPA/Rego policies, trusted runtime inputs, automated policy tests, or a production enforcement integration. The Policy Sandbox is a browser-side demonstration, not a security control.

No policy threshold, legal interpretation, exception, or enforcement behavior is approved by this checklist. Examples in the playbook are proposals until an accountable owner records and approves the decision.

## How to use this folder

1. Work through [the implementation checklist](checklist.md) in order.
2. Resolve every `[DECISION REQUIRED: D-nnn]` item in the [decision register](decision-register.md) before implementing behavior that depends on it.
3. Link evidence, owners, approval dates, and the tests that prove each accepted decision.
4. Keep open decisions visible. Do not replace a marker with an assumed value or describe an unimplemented control as enforced.

Use these status labels in checklist items and pull requests:

- `[SETUP]`: repo or test infrastructure work that does not decide policy meaning.
- `[DECISION REQUIRED: D-nnn]`: blocked until the listed decision has a named accountable owner and recorded approval.
- `[IMPLEMENT]`: coding that can start once its dependent decisions are accepted.
- `[VERIFY]`: evidence required before a control can be called operational.

## A practical first milestone

Deliver one narrow, end-to-end policy decision rather than trying to encode the whole playbook at once. Workspace admission is one candidate, not a preselected choice. The accountable service and policy owners must select the first use case in D-001. A first slice should include an approved input contract, explicit allow/deny behavior, automated positive and negative tests, an enforcement point, and an auditable decision record.

## Work that can start now

- Maintain this checklist and decision register; inventory statements in the playbook as illustrative, approved, or needing an owner.
- Record candidate use cases, system boundaries, stakeholders, and existing authoritative policies without converting them into enforcement rules.
- Add repository-level build and type-check automation for the existing application independently of policy-engine selection.
- Prepare synthetic, non-sensitive examples once a draft input contract exists; label them as examples until the contract is approved.
- Compare candidate policy engines and modeling approaches against the chosen use case without committing to OWL, SHACL, or OPA as the source of truth.

## Ready-to-claim gate

Do not call a policy deployable or enforced until the checklist's decision gates are closed, the automated policy tests pass, the selected enforcement point blocks or permits the real operation as intended, audit evidence is available, and an owner has approved the release and rollback procedure.