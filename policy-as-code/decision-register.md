# Policy Decision Register

Every open item below is a gate, not a default. Copy the record template for additional decisions. A playbook example or software default is not approval.

## Open decisions

### D-001: First production decision

- **Status:** OPEN
- **Accountable owner:** Service owner and policy owner (to be named)
- **Decision:** Select one bounded operation to control, its subjects, scope, protected resource, and explicit exclusions. Workspace admission and output release are candidates only.
- **Evidence to attach:** service context, threat/risk assessment, process owner, and affected system boundary.
- **Blocks:** input contract, policy behavior, tests, and enforcement integration.

### D-002: Authority and interpretation

- **Status:** OPEN
- **Accountable owner:** Governance/policy owner with qualified legal or data-protection review (to be named)
- **Decision:** Identify the jurisdiction, authoritative source documents and versions, interpretations, applicability, and review cadence for the selected use case.
- **Evidence to attach:** source links or controlled document references, clauses, interpretation, reviewer, and approval date.
- **Blocks:** all normative policy statements and thresholds.

### D-003: Trusted inputs and provenance

- **Status:** OPEN
- **Accountable owner:** System/data owners and security owner (to be named)
- **Decision:** For each input, identify the authoritative system, verification method, freshness period, identity binding, provenance, and behavior if the source cannot be reached.
- **Evidence to attach:** approved schema, source mapping, data-flow review, and sample synthetic records.
- **Blocks:** reliable runtime decisions and input validation.

### D-004: Decision semantics and exceptions

- **Status:** OPEN
- **Accountable owner:** Policy owner and operational owner (to be named)
- **Decision:** Define permit, deny, and defer outcomes; missing, stale, conflicting, or malformed input behavior; and authorized exceptions, approval, expiry, and review.
- **Evidence to attach:** signed decision table and test cases for each branch.
- **Blocks:** executable policy and meaningful tests.

### D-005: Quantitative disclosure rules

- **Status:** OPEN
- **Accountable owner:** Statistical disclosure control lead and governance owner (to be named)
- **Decision:** Approve applicable thresholds, units, denominator, rounding, complementary suppression, differencing, repeated queries, model/graph outputs, and exceptions. Do not treat example values such as `k >= 10` or `80%` as approved local policy.
- **Evidence to attach:** current approved standard, rationale, worked boundary cases, and sign-off.
- **Blocks:** production output-release rules when SDC is in scope; does not block unrelated policy slices.

### D-006: Engine and policy source of truth

- **Status:** OPEN
- **Accountable owner:** Architecture and policy-engineering owners (to be named)
- **Decision:** Select the runtime engine and authoritative representation. Decide whether OWL/RDF, SHACL, OPA/Rego, or a combination is needed; specify any compiler, generated artifacts, and how semantic equivalence is verified.
- **Evidence to attach:** options assessment, operational requirements, support model, and proof-of-concept results.
- **Blocks:** implementation structure and CI tooling.

### D-007: Enforcement point and mode

- **Status:** OPEN
- **Accountable owner:** Service owner and security/operations owners (to be named)
- **Decision:** Choose where the decision is enforced, how bypass is prevented, rollout mode, timeout behavior, evaluator-unavailable behavior, and responsible operator.
- **Evidence to attach:** architecture/data-flow diagram, threat analysis, failure-mode tests, and rollout/rollback plan.
- **Blocks:** production integration and enforcement claims.

### D-008: Audit and retention

- **Status:** OPEN
- **Accountable owner:** Audit, privacy/data-protection, and operations owners (to be named)
- **Decision:** Define which inputs or references, policy version, outcome, reason, timestamp, and correlation identifiers are retained; who may access them; and retention/deletion rules.
- **Evidence to attach:** approved audit schema, access model, retention schedule, and privacy review.
- **Blocks:** production audit implementation.

### D-009: Change and release governance

- **Status:** OPEN
- **Accountable owner:** Policy owner and service release authority (to be named)
- **Decision:** Define reviewers, separation of duties, policy versioning, effective dates, emergency changes, regression criteria, rollback authority, and incident response.
- **Evidence to attach:** approved change procedure, release checklist, and rollback exercise.
- **Blocks:** production release.

## Decision record template

```text
ID: D-nnn
Title:
Status: OPEN | APPROVED | REJECTED | SUPERSEDED
Decision statement:
Options considered:
Rationale and evidence:
Accountable owner:
Required reviewers and approvals:
Approval date:
Effective date:
Affected policy/input/test IDs:
Review trigger or date:
Supersedes / superseded by:
```

## Closing a decision

Change `OPEN` only after the decision statement, rationale, accountable owner, required reviews, approval date, and affected tests or controls are recorded. Link the approved record from the relevant checklist item. If the decision changes later, retain the history and link a superseding record; do not silently edit the meaning of an already released policy.