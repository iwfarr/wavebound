# Implementation Checklist

Track progress with the checkboxes. A phase is not complete while any of its decision gates are open. Each `D-nnn` refers to the [decision register](decision-register.md).

Each item below names the artifact needed to complete it. Link the actual artifact and its version, owner, and review or verification result beneath that item using the [evidence record template](evidence-record-template.md). A suggested filename is not evidence that the file exists. Keep implementation artifacts in the selected service's repository and link them here; do not copy sensitive operational evidence into this public playbook. Check an item only after its output satisfies the stated action and required review. For a conditional item, record the approved scope reference and reason it is not applicable instead of leaving its applicability implicit.

## 0. Scope and ownership

- [ ] `[SETUP]` Inventory playbook statements and label each as illustrative, externally sourced, or formally approved; record the source and review date.
  - Search the playbook's narrative, diagrams, examples, and sandbox for claims that could be read as policy. Record each claim's location, exact wording, classification, source or approver, and review date in a shared inventory. Treat a claim as formally approved only when its approval can be linked.
  - **Output:** [Claim inventory](claim-inventory.md), a Markdown table of candidate requirements and implementation claims. Run `npm run claims:update`, then follow the [inventory review instructions](README.md#requirements-inventory). Review candidates, add missed claims, and link authority or approval evidence; generation alone does not complete this item.
- [ ] `[SETUP]` Identify the service owner, policy owner, security reviewer, data-protection/legal reviewer, implementer, and operational approver for the selected control.
  - Name a person for each role and record their responsibilities, decision authority, and a contact or delegate. If one person holds more than one role, make that explicit so required independent review remains visible.
  - **Output:** a role-to-person responsibility table in the implementation scope record; link it here with confirmation from the named owners.
- [ ] `[SETUP]` Map the systems and lifecycle where the control could act; distinguish research policy from platform configuration and runtime state.
  - Draw the request and data flow from user or initiating system through policy evaluation to the protected operation and audit destination. Mark system boundaries, configuration and research sources, runtime inputs, enforcement points, and any paths that must not be treated as controls.
  - **Output:** a versioned system-boundary and data-flow diagram, with a legend distinguishing proposed controls from existing ones; link it from the implementation scope record and D-001.
- [ ] `[DECISION REQUIRED: D-001]` Select and approve the first narrow production decision, its users, protected operation, and explicit out-of-scope behavior.
  - In D-001, name one operation and the subjects and resource it covers; state the intended outcome, exclusions, and why this is the first slice. Attach the service context and risk evidence, obtain the required owners' approval, and link the approved record here. Do not infer approval from a candidate example.
  - **Output:** approved [D-001](decision-register.md#d-001-first-production-decision), linking the scope record, selected inventory claim IDs, exclusions, and risk assessment.
- [ ] `[DECISION REQUIRED: D-002]` Approve applicable jurisdictions, authoritative standards, legal interpretations, and who is qualified to maintain them.
  - In D-002, list the applicable jurisdictions and the exact authoritative documents, versions, and clauses. Record how each source applies, who reviewed the interpretation, who may maintain it, and when or what event triggers review; attach source links and required sign-off.
  - **Output:** approved [D-002](decision-register.md#d-002-authority-and-interpretation), with a source-and-interpretation table linking applicable claim IDs to authoritative clauses, reviewers, and review triggers.

**Exit evidence:** approved scope, named owners, boundaries, and links to authoritative sources.

## 1. Decision and input contract

- [ ] `[SETUP]` Draft a versioned input contract for the selected decision, with field names, types, definitions, provenance, freshness, and validation requirements.
  - Write a schema with a version identifier and one entry per input. For each entry specify its meaning, type and allowed values or units, required/optional status, authoritative source, provenance, maximum age, identity binding where relevant, and validation behavior. Include an example request and response using synthetic values.
  - **Output:** a machine-readable input schema plus a field dictionary and synthetic example in the implementation repository; link their versioned paths here and from D-003.
- [ ] `[DECISION REQUIRED: D-003]` Approve the authoritative source and trust model for every security-relevant input, including identity, training, approvals, data classification, and environment state where applicable.
  - For every security-relevant field in the input contract, record its authoritative system, how the value is verified and bound to the requester or operation, freshness limit, and behavior when the source is unavailable. Attach the source mapping and data-flow review; obtain the named system/data and security owners' approval in D-003.
  - **Output:** approved [D-003](decision-register.md#d-003-trusted-inputs-and-provenance), linking the schema version and a field-to-source trust table covering verification, identity binding, freshness, and source failure.
- [ ] `[DECISION REQUIRED: D-004]` Approve the decision semantics: what permits, denies, or defers a request; treatment of missing, stale, contradictory, or unavailable inputs; and any exception path.
  - Complete a decision table that maps each relevant input condition to permit, deny, or defer, including malformed, missing, stale, conflicting, and unavailable values. For any exception, specify who may authorize it, its scope and expiry, and how it is reviewed. Attach test cases for every branch and obtain policy and operational approval in D-004.
  - **Output:** approved [D-004](decision-register.md#d-004-decision-semantics-and-exceptions), linking a versioned decision table with stable row IDs, expected outcomes, reason codes, and exception requirements.
- [ ] `[DECISION REQUIRED: D-005, if output-release control is in scope]` Approve quantitative disclosure-control rules, scope, units, boundary conditions, and exceptions before encoding example thresholds.
  - If the selected operation releases outputs, record the applicable approved rules in D-005, including thresholds, units, denominators, rounding, boundary behavior, complementary suppression, differencing and repeated-query handling, covered output types, and exceptions. Attach worked examples at and around each boundary and the qualified reviewers' sign-off; otherwise record that this decision is not applicable to this slice.
  - **Output:** approved [D-005](decision-register.md#d-005-quantitative-disclosure-rules), linking a quantitative-rule table and worked boundary cases, or an applicability note linked to D-001.
- [ ] `[SETUP]` Create synthetic input examples that cover expected, boundary, missing, stale, and contradictory values. Do not use personal or production data in fixtures.
  - Build a small fixture set against the draft schema with at least one normal case and one case for each listed condition. Keep values fabricated, label expected outcomes as provisional until D-004 is approved, and verify the fixtures contain no copied identifiers or production records.
  - **Output:** version-controlled synthetic fixture files and a case index mapping each fixture to its input condition and, once approved, its D-004 row and expected outcome; link the directory and index here.

**Exit evidence:** reviewed input schema, source mappings, written decision table, and approved policy values.

## 2. Policy implementation and tests

- [ ] `[SETUP]` Compare policy-engine and modeling options against the approved use case, operational constraints, and team skills.
  - Create a short comparison of viable options using the same criteria: fit to the approved decision, input integration, testing and deployment, operational support, team capability, and relevant performance or licensing constraints. Record evidence, trade-offs, and a recommendation without treating it as the engine decision.
  - **Output:** an options-assessment table with evidence and a recommendation, linked from D-006; mark the recommendation as unapproved until that decision closes.
- [ ] `[DECISION REQUIRED: D-006]` Select the runtime policy engine, policy source of truth, and whether an ontology or SHACL validation adds value. Define generated-artifact ownership if compilation is selected.
  - Record the selected runtime and authoritative policy representation in D-006, explain whether OWL/RDF or SHACL is needed, and name the owners of source and generated files. If compilation is used, specify the reproducible command and how generated behavior is checked against the source; attach the options comparison and proof-of-concept evidence, then obtain architecture and policy-engineering approval.
  - **Output:** approved [D-006](decision-register.md#d-006-engine-and-policy-source-of-truth), linking the architecture decision, proof-of-concept results, authoritative source paths, and any generation instructions.
- [ ] `[IMPLEMENT]` Add the smallest executable policy for the selected decision, with an explicit version and metadata for owner, status, effective date, and source references.
  - Implement only the approved decision-table branches. Store the policy in the selected source of truth and include a stable version, named owner, lifecycle status, effective date, and links or identifiers for the approved sources and decisions. Confirm no example or open decision has become an implicit rule.
  - **Output:** executable policy source and metadata at an immutable revision in the implementation repository, linked here with its approved decision-table version and local evaluation command.
- [ ] `[IMPLEMENT]` Add automated tests for permitted, denied, boundary, missing, malformed, stale, and exception cases from the approved decision table.
  - Turn each applicable decision-table row into a test with a named fixture, expected outcome, and assertion. Include boundary cases and each approved failure or exception path; link test names or IDs back to the decision table so missing coverage is apparent.
  - **Output:** automated test files, a decision-row-to-test mapping, and a passing test report for the policy revision; link all three here.
- [ ] `[VERIFY]` Demonstrate tests fail when a key rule is removed or inverted; check generated artifacts are reproducible if a compiler is used.
  - Temporarily remove or invert a representative rule and run the relevant test to confirm it fails, then restore the rule and confirm the suite passes. If compilation is used, regenerate artifacts from a clean state and confirm there is no unexplained diff; retain the test output or CI link.
  - **Output:** a verification record identifying the rule change, expected failing test, restored passing run, and any clean-regeneration comparison; link the report and commands here.
- [ ] `[SETUP]` Add CI checks for policy formatting, validation, tests, and generated-file consistency after engine selection.
  - Add the selected engine's formatter and validator, the policy test command, and the generated-file consistency check (if applicable) to CI. Run the same checks locally, confirm CI fails on a deliberately invalid policy or failing test, and document the commands contributors should use.
  - **Output:** CI workflow configuration, contributor commands, and links to an intentional failing run and the restored passing run at identified revisions; record any non-applicable generated-file check.

**Exit evidence:** repeatable local and CI checks, test report, and traceable policy source.

## 3. Enforcement integration

- [ ] `[DECISION REQUIRED: D-007]` Select the enforcement point and operating mode: evaluate-only, shadow, staged enforcement, or blocking. Identify the operator and failure response.
  - In D-007, identify the server-side operation that must consult the evaluator, select one rollout mode, and state what happens on timeout, evaluator outage, invalid result, or suspected bypass. Name the operator and escalation route; attach the architecture/data-flow diagram and rollout and rollback plan, then obtain service, security, and operations approval.
  - **Output:** approved [D-007](decision-register.md#d-007-enforcement-point-and-mode), linking the enforcement diagram, mode and failure-response table, and rollout/rollback plan.
- [ ] `[IMPLEMENT]` Integrate the policy at the selected server-side control point; do not trust browser-supplied verdicts or editable client state.
  - Call the evaluator from the approved server-side path before the protected operation can complete. Derive inputs from trusted server-side sources, disregard any client-provided decision or mutable policy state, and ensure every route to the protected operation passes through this check.
  - **Output:** reviewed server-side integration code at an immutable revision, plus a route-to-control-point mapping linked here and from D-007. Record how the selected mode uses the verdict; shadow or evaluate-only operation is not blocking enforcement.
- [ ] `[IMPLEMENT]` Define and test the interface between the enforcement point and policy evaluator, including timeouts, unavailable evaluator, malformed input, and duplicate requests.
  - Specify request and response fields, versioning, authentication, timeout, error representation, and duplicate-request behavior. Add integration tests for valid permit/deny results and each failure condition, asserting the actual operation's outcome matches the approved D-004 and D-007 behavior.
  - **Output:** a versioned evaluator interface specification, integration tests, and a passing failure-mode test report; link these to D-004 and D-007 and record the tested mode.
- [ ] `[VERIFY]` In a non-production environment, prove the real operation is blocked and permitted according to approved fixtures and cannot bypass the decision point.
  - Exercise the protected operation through its real non-production entry point with approved synthetic permit and deny fixtures. Also try each alternate route or direct invocation identified in the system map and confirm no path bypasses the decision point; save test results and the environment/build identifiers.
  - **Output:** a non-production enforcement test report covering allowed, blocked, and bypass attempts, with environment, build, policy version, mode, and actual operation results. Evaluate-only or shadow observations do not satisfy the blocking proof; keep that proof open until it is exercised in an approved non-production enforcement mode.
- [ ] `[VERIFY]` Confirm the educational Policy Sandbox is clearly distinguished from this integration and is never used as the enforcement control.
  - Review the Sandbox's visible labels and accompanying documentation to ensure they identify it as an educational demonstration, not a security decision or enforcement mechanism. Verify production code does not consume its verdicts or state; record the reviewed locations and result.
  - **Output:** a separation-review record linking the reviewed UI/documentation locations and production dependency checks, with reviewer and result; link it here.

**Exit evidence:** integration tests against the actual control point and operator-reviewed failure behavior.

## 4. Audit, release, and operations

- [ ] `[DECISION REQUIRED: D-008]` Approve what decision evidence is logged, access controls, retention, privacy limits, and audit destination.
  - In D-008, define the audit fields and whether each value or only a provenance reference is retained. Specify the destination, authorized roles, access logging, retention and deletion periods, and data that must never be recorded; attach the schema, access model, schedule, and privacy review before approval.
  - **Output:** approved [D-008](decision-register.md#d-008-audit-and-retention), linking the audit schema, role-access table, retention/deletion schedule, and privacy review.
- [ ] `[DECISION REQUIRED: D-009]` Approve change review, release authority, effective-date handling, rollback, emergency changes, and incident response.
  - In D-009, specify required reviewers and separation of duties, policy version and effective-date rules, release authority, regression checks, emergency-change recording, rollback trigger and authority, and incident escalation. Attach the release/change procedure and rollback exercise evidence, then obtain policy-owner and release-authority approval.
  - **Output:** approved [D-009](decision-register.md#d-009-change-and-release-governance), linking the change/release procedure, release criteria, emergency and incident instructions, and rollback exercise record. Draft procedures can support the later exercise; final approval requires its results.
- [ ] `[IMPLEMENT]` Record the policy version, decision outcome, reason codes, input provenance identifiers, timestamp, and correlation ID at the approved level of detail.
  - Emit one audit record for each evaluated request using the D-008 schema. Populate the policy version, outcome, approved reason code, provenance identifiers, timestamp, and correlation ID; exclude disallowed sensitive values and verify the record reaches the approved destination.
  - **Output:** audit-emission code/configuration and a synthetic end-to-end audit test report showing all approved fields reach the destination without excluded data; link revision and test evidence here.
- [ ] `[VERIFY]` Demonstrate authorized operators can investigate a decision without exposing unnecessary sensitive data.
  - Using a representative audit record, have an authorized operator trace the policy version, inputs' provenance, outcome, and related request. Check that an unauthorized role cannot access the record and that the investigation view omits or masks fields excluded by D-008; retain the test result.
  - **Output:** an investigation and access-control test report identifying tested roles, synthetic correlation ID, redaction checks, operator, and outcome; link it here without publishing sensitive logs.
- [ ] `[VERIFY]` Exercise rollback and policy-service failure procedures; document observed results and owners.
  - In a non-production environment, follow the approved rollback procedure and separately simulate policy-service unavailability. Record steps, timestamps, observed request outcomes, recovery checks, deviations, and the operator responsible; resolve deviations or link a tracked follow-up before sign-off.
  - **Output:** a rollback/outage exercise report with previous and restored versions, observed outcomes, recovery checks, responsible operators, and deviations. Link it here and from D-009; unresolved deviations that invalidate release criteria keep release approval open.
- [ ] `[VERIFY]` Publish operator and reviewer documentation, known limitations, escalation routes, and an approved release record.
  - Publish the operating and review instructions where the responsible teams can find them. Include how to check policy and service health, investigate decisions, handle failures, escalate incidents, and recognize known limitations; link the approved release record and verify each named owner can access the documentation.
  - **Output:** accessible operator and reviewer runbooks, a limitations/escalation record, and an approved release record linking the policy revision, CI run, enforcement tests, audit checks, and rollback exercise; link their controlled locations here.

**Exit evidence:** approved operational procedures, audit test results, release record, and successful rollback exercise.

## Completion rule

The policy is ready to be described as deployable only when every applicable decision is approved and linked, CI policy checks pass, the selected enforcement point has passed non-production integration tests, and release and rollback are approved. Otherwise report the exact open decision IDs and call the work a prototype or implementation in progress.