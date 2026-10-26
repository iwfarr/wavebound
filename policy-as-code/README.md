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

Each checklist item now names its expected output, format, and evidence location. These are artifacts for the operational PaC implementation, not additional educational content. Keep code, schemas, tests, diagrams, runbooks, and release evidence with the service that will operate the engine; link the exact revisions from the checklist using the [evidence record template](evidence-record-template.md). Use the existing [decision record template](decision-register.md#decision-record-template) for approvals. Do not create empty documents merely to satisfy an output label.

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

## Requirements inventory

The [claim inventory](claim-inventory.md) supports **only the first checklist item**: finding candidate requirements and claims about implemented controls in the playbook. It is not a policy specification, a deployment report, or approval to encode any rule. The other checklist items still require the deployment artifacts and reviews they describe.

### Generate and check

After the normal repository dependency setup, run these commands from the repository root:

```text
npm run claims:update
npm run claims:check
npm run claims:test
```

- `claims:update` creates or updates the Markdown inventory locally. No application code is executed and no external AI service or API key is used.
- `claims:check` checks coverage and candidate freshness without writing. It exits nonzero if the inventory is missing, stale, or invalid; it does **not** check that claims are approved or that the checklist is complete.
- `claims:test` runs the scanner and regeneration tests using Node's built-in test runner.

Review the diff after every update. Do not run concurrent updates. If the utility reports an invalid table or a merge problem, correct the reported issue from version history; do not delete the inventory to bypass validation. The utility refuses to overwrite malformed review data. A leftover `claim-inventory.md.tmp` indicates an interrupted update: inspect it and the current inventory before removing that specific temporary file and rerunning.

### Coverage and limits

The scanner parses `.ts` and `.tsx` files under `src/data` and `src/components` using the existing TypeScript compiler dependency, and scans the original plain-text playbook under `public/assets/aistudio`. It examines string/template literals, JSX text, illustrative policy snippets, and sandbox variable predicates with policy-related names. Small, explicit matching rules flag normative/control words, policy-engine terms, numeric limits, and relevant sandbox calculations. Each row records the match reason and the actual source file/line, not a proposed `ontology/` or `security/opa/` path embedded in an example.

The coverage list records source hashes and candidate counts, including files with no matches. CRLF line endings are normalized to LF before extraction and hashing so different Git checkouts produce the same inventory; otherwise quoted source wording is retained. New source files in the supported directories are included automatically. Unsupported file types there cause an explicit error so coverage can be reviewed. Content outside these locations, images, rendered diagrams, computed/dynamically assembled wording, generated AI quiz responses, and the meaning of a statement in context require manual review. Graph descriptions and snippets are scanned; visual relationships and their implications are not inferred. Structural JSX attributes are skipped, and named calculation extraction is limited to the Policy Sandbox to avoid treating quiz pass scores as PaC rules. This is deliberately a candidate extractor: it can miss claims and include false positives. It does not verify legal correctness, test controls, or establish that any proposed artifact exists.

### Human review

1. Inspect each candidate in its source context, including diagrams, related code, and surrounding qualifications. Add missed requirements or implementation claims manually. In particular, example sandbox limits and apparent implementation claims are not proof of approved rules or deployed controls.
2. Edit only **Classification**, **Authority / approval**, **Reviewer**, **Review date**, and **Disposition** on generated rows. Classification values are `unreviewed`, `illustrative`, `externally sourced`, and `formally approved`. Use Disposition to explain false positives, exclusions, proposed requirements, or the scope/decision records a claim should feed.
3. For any reviewed classification, name the reviewer and provide a real review date in `YYYY-MM-DD` form. For `externally sourced`, link the authoritative document and identify the applicable version/clause. For `formally approved`, link an actual approval record identifying the accountable approver, date, scope, and approved wording. A playbook source link, a citation alone, a software default, or an open decision is not approval. The scanner validates field structure, not the legitimacy of that approval.
4. Select relevant claim IDs in D-001, establish authority and applicability in D-002, and map accepted requirements to the input contract and D-004 decision-table rows. Keep example values provisional until their applicable decisions close.
5. Complete the first checklist item only after a human has reviewed coverage, classifications, sources and approvals, and recorded the manual review evidence. A generated table full of `unreviewed` rows is a starting point, not a completed inventory.

Generated IDs use the source path and exact wording, with occurrence counts to distinguish duplicates. Line movement alone preserves review. A changed statement becomes a new unreviewed candidate and the old statement remains `absent` for history. Changing the number of identical occurrences resets review for that group rather than guessing which approval applies. A reappearing absent claim also requires review; previous review fields are retained in its disposition. `absent` claims are never applicable requirements even if their historical classification was approved. Unchanged text can acquire a different meaning when its context changes: inspect source-hash changes and reassess affected reviews.

### Table editing and manual claims

Do not change generated IDs, source locations, wording, match reasons, or presence fields. Preserve column order and keep one physical line per row. Use numeric HTML entities for special characters inside cells: `&#124;` for a pipe, `&#96;` for a backtick, `&#92;` for a backslash, `&#10;` for a newline, `&#13;` for a carriage return, `&#38;` for an ampersand, `&#60;` and `&#62;` for angle brackets. These render as the original wording and round-trip without loss. Other entity encodings are rejected rather than silently misread. Keep notes in Disposition, not outside the table.

To add a missed claim, copy a row and give it a unique `MANUAL-...` ID (for example, `MANUAL-diagram-1`). Set Presence to `manual`, Source to a repository-relative educational source link in the same format as generated rows, Line to its positive line number, Wording to the exact claim, and Match to the manual review reason. Start Classification as `unreviewed` and leave approval/reviewer/date fields blank. Manual rows survive regeneration but their source location, continued relevance, and review must be maintained by a human. For visual implications without verbatim text, explicitly identify the wording as a reviewer interpretation in Disposition. Keep this inventory free of production data and sensitive evidence.