# DCB0129 / DCB0160 Clinical Safety Hazard Log & Risk Assessment Matrix

## Document Metadata
- **System Name**: Wavebound Policy-as-Code Enclave Engine
- **Clinical Safety Officer (CSO)**: [Nominated Clinician - GMC / NMC Registered]
- **Clinical Safety Case Report (CSCR) Reference**: CSCR-TRE-2026-V1
- **Standard Applied**: NHS England DCB0129 (Manufacture of Health IT Systems) & DCB0160 (Deployment)

---

## 1. Clinical Risk Matrix (Likelihood vs. Consequence)

| Severity / Consequence | Negligible (1) | Minor (2) | Moderate (3) | Major (4) | Catastrophic (5) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Very High (5)** | Medium | High | Very High | Very High | Very High |
| **High (4)** | Low | Medium | High | Very High | Very High |
| **Medium (3)** | Very Low | Low | Medium | High | Very High |
| **Low (2)** | Very Low | Very Low | Low | Medium | High |
| **Very Low (1)** | Very Low | Very Low | Very Low | Low | Medium |

---

## 2. Active Clinical Hazard Log

| Hazard ID | Hazard Description | Potential Clinical Consequence | Initial Risk Score | Mitigating Engineering & Governance Controls | Residual Risk Score | Status |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: |
| **HAZ-001** | Erroneous cell suppression algorithm releases identifiable rare disease patient record | Breach of confidentiality, patient distress, potential discrimination in insurance/employment | **High (4x3=12)** | Automated OPA Rego gate enforces $k \ge 10$ cell suppression + human-in-the-loop airlock review sign-off. | **Very Low (1x2=2)** | Controlled |
| **HAZ-002** | Machine learning model extracts and memorizes training weights containing patient PII | Model inversion attack extracts genomic markers or diagnosis codes | **High (4x3=12)** | Differential privacy budgeting ($\epsilon \le 1.0$), weight inspection gates, and model airlock audits. | **Low (2x2=4)** | Controlled |
| **HAZ-003** | Algorithmic hallucination in clinical NLP cohort selection omits high-risk patients | Skewed epidemiological findings mislead clinical guidelines | **Major (4x4=16)** | Deterministic SQL/OMOP-CDM ontology shapes validate cohort inclusion logic; human clinician validation required. | **Low (1x3=3)** | Controlled |
| **HAZ-004** | Agentic AI analytical assistant modifies data pipeline transformation without audit record | Untracked data mutation invalidates clinical research reproducibility | **Medium (3x3=9)** | Stanford UIT framework enforcement: AI agents held in read-only compute tier; mutative actions barred by PDP. | **Very Low (1x2=2)** | Controlled |
| **HAZ-005** | Scatter plot export reveals individual patient survival outliers through unbinned coordinates | Small cell deductive re-identification of terminal prognosis | **High (4x3=12)** | Automated SDC image pipeline rasterizes scatter plots, truncates tail censoring ($<10$ at risk), and converts to hexbins. | **Very Low (1x2=2)** | Controlled |

---

## 3. Clinical Safety Officer (CSO) Sign-off

- **CSO Name**: ___________________________
- **Professional Registration PIN**: ___________________________
- **Assessment Verdict**: Accepted with mandatory automated gating controls
- **Review Interval**: 12 months or upon major policy schema revision
