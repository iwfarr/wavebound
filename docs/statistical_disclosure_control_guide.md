# Statistical Disclosure Control (SDC) & Low-Count Analytical Guide

A practitioner reference standard for population data research organizations, epidemiologists, data stewards, and governance committees when presenting aggregate tables, public reports, and analytical outputs containing low cell counts ($N < 5$ or $N < 10$).

---

## 1. Executive Context: The Small Cell Disclosure Risk

When presenting aggregate tables, epidemiological reports, or public dashboards derived from individual-level records, small cell counts (typically $N < 5$ or $N < 10$) create acute re-identification risks. Even when direct identifiers (names, national ID numbers) have been removed, combinations of indirect attributes (such as geographical district, birth month, rare diagnosis, or appointment timestamp) create high-dimensional fingerprints. 

Outside observers possessing auxiliary knowledge (such as local news reports, electoral registers, or community knowledge) can achieve direct identification or indirect deduction. Statistical Disclosure Control (SDC) provides the mathematical and operational safeguards to preserve analytical validity while preventing subject re-identification.

---

## 2. Statistical Disclosure Control (SDC) Techniques

### 2.1 Cell Suppression
Hiding disclosive cell counts from public view to prevent direct observation or reverse calculation:

1. **Primary Suppression**:
   - Replacing small values below the declared threshold ($N < 5$ or $N < 10$) with a masking symbol (e.g., `*`, `<5`, or `<10`).
   - Ensures that sparse cohort categories cannot be linked to specific individuals.

2. **Secondary (Complementary) Suppression**:
   - Masking adjacent non-sensitive cells within the same row or column total.
   - Prevents users from deducing the suppressed primary value by subtracting visible cells from row or column totals.

### 2.2 Data Aggregation
Combining granular categories into broader groupings to increase cell sizes above disclosure thresholds:

1. **Spatial Aggregation**:
   - Reporting data at broader administrative boundaries (e.g., county, health board, or regional tier rather than census output area or granular postal code).

2. **Temporal Aggregation**:
   - Pooling observations across multi-year intervals (e.g., 3-year or 5-year moving averages) instead of volatile monthly or annual counts.

3. **Demographic Recoding**:
   - Grouping narrow single-year age brackets into 5- or 10-year bands, collapsing clinical sub-diagnoses into top-level ICD categories, or aggregating specific event codes into broader classifications.

### 2.3 Data Perturbation & Noise Addition
Introducing minor mathematical modifications to obscure exact counts while preserving overall distribution properties:

1. **Targeted / Controlled Rounding**:
   - Rounding all table counts to a predetermined fixed base (e.g., base 3 or base 5), ensuring row and column marginal totals match internal sums.

2. **Random Swapping / Post-Randomization Method (PRAM)**:
   - Swapping select attribute values between similar individual records, introducing plausible deniability while preserving marginal frequency distributions.

3. **Differential Privacy**:
   - Injecting mathematically calibrated noise (e.g., Laplace or Gaussian mechanism) into query outputs so that an individual's presence or absence in the underlying dataset cannot be reliably inferred.

---

## 3. SDC Technique Comparison Matrix

| SDC Technique | Primary Mechanism | Main Advantage | Key Limitation |
| :--- | :--- | :--- | :--- |
| **Primary & Secondary Suppression** | Redact cells below threshold ($N < 5$ or $N < 10$) | Prevents exact identification | Reduces table utility; complicates downstream missing data handling |
| **Category Aggregation** | Group geographical, temporal, or demographic bands | Preserves overall population totals and marginal integrity | Eliminates localized, high-resolution, or subgroup-specific detail |
| **Perturbation & Controlled Rounding** | Adjust cell values by small calibrated random noise | Allows publication of full table layouts without asterisks | Distorts precise counts in tiny subgroups; introduces artificial variance |
| **Synthetic Microdata** | Generate artificial datasets matching real distributions | Zero risk of direct individual identification | Requires complex statistical modeling; may fail to capture rare interactions |

---

## 4. Methodological Approaches for Low-Count Data

Analyzing small numbers without losing statistical rigor requires specialized analytical frameworks designed for sparse data environments:

### 4.1 Bayesian Hierarchical Modeling
- **Mechanism**: Employs "borrowing strength" techniques (such as Empirical Bayes estimation or Spatial Conditional Autoregressive [CAR] models) to stabilize high variance in small populations.
- **Application**: Smooths unstable, extreme rate estimates across neighboring geographic areas or small demographic subgroups toward a shared grand mean or spatial neighborhood average.

### 4.2 International Consortia & Registries
- **Mechanism**: Standardized data collection protocols deployed across federated multi-center networks or international rare condition registries (e.g., European Reference Networks).
- **Application**: Aggregates statistical power across national borders while maintaining data localization and applying uniform data protection and safe governance protocols.

### 4.3 Qualitative & Mixed-Methods Frameworks
- **Mechanism**: Structured qualitative and comparative research methodologies deployed when cohort sizes ($N < 30$) are too small for traditional frequentist statistical significance testing.
- **Application**: Utilizes detailed clinical case series, process tracing, and Qualitative Comparative Analysis (QCA) to uncover causal mechanisms without requiring massive sample sizes.

---

## 5. Data Governance & Safe Access Models

When raw microdata must be analyzed in its unmasked form, organizations rely on controlled access environments rather than open data publication:

### 5.1 The Five Safes Framework
Evaluates and manages data access across five complementary operational dimensions:
1. **Safe People**: Vetted, identity-verified, and accredited researchers with mandatory Information Governance training.
2. **Safe Projects**: Legitimate, approved research questions with documented public benefit and ethical justification.
3. **Safe Settings**: Partitioned, zero-egress cloud computing enclaves preventing raw file copy or unauthorized transfer.
4. **Safe Data**: De-identified, pseudonymized datasets stripped of direct identifiers and high-risk quasi-identifiers.
5. **Safe Outputs**: Automated statistical disclosure screening and human review on all tables, graphs, and model weights prior to egress.

### 5.2 Secure Data Enclaves & Sovereign Research Environments
- Specialized remote virtual desktop or container enclaves that allow researchers to run statistical code (R, Python, Stata) directly on raw, low-count datasets.
- Egress network traffic is blocked, preventing microdata from leaving the secure infrastructure perimeter.

### 5.3 Independent Human Output Checking & Airlock Gateways
- All candidate exports (summary tables, plots, regression outputs, and machine learning models) pass through automated SHACL validation shapes and sub-millisecond Open Policy Agent (OPA) Rego rules.
- Qualified human airlock reviewers conduct final sanity reviews against SDC standards before approving egress to public domains.

---

## 6. Policy-as-Code Implementation Mapping

Within the Seawater framework, these SDC techniques are encoded directly as machine-executable rules:

```turtle
# SHACL Shape for Airlock Output Verification (sdc_shapes.ttl)
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/tre/core#> .

tre:AirlockOutputShape a sh:NodeShape ;
    sh:targetClass tre:ExportArtifact ;
    sh:property [
        sh:path tre:minObservedCellCount ;
        sh:minInclusive 10 ;
        sh:message "Primary suppression violated: All table counts must be >= 10." ;
    ] ;
    sh:property [
        sh:path tre:topContributorDominanceRatio ;
        sh:maxInclusive 0.80 ;
        sh:message "Dominance rule violated: Top contributor accounts for > 80%." ;
    ] .
```

```rego
# OPA Rego Airlock Policy (policy.rego)
package seawater.airlock

default allow = false

# Allow output only if SDC validation passed and human airlock reviewer signed off
allow {
    input.artifact.min_cell_count >= 10
    input.artifact.dominance_ratio <= 0.80
    input.artifact.direct_identifiers_count == 0
    input.review.human_reviewer_approved == true
}
```

---

## 7. SDC for Graphical Visualisations & Plots (Evaluated via the Same Policy Engine)

A critical failure point in research data environments occurs when researchers assume that Statistical Disclosure Control applies exclusively to numeric tables. **Graphical visualisations carry identical disclosure liabilities under UK GDPR and national research governance standards.**

### 7.1 Common Visual Disclosure Vectors
1. **Scatter Plots & Dot Plots**: An unbinned scatter plot of age vs. biomarker concentration plots single individual data points. An adversary possessing partial knowledge (e.g., patient age 94 with a specific condition) can instantly identify their exact value.
2. **Survival Curves (Kaplan-Meier)**: When the right tail of a survival curve drops to low numbers of patients at risk ($N < 10$), each vertical drop directly exposes the exact timestamp of an individual patient death or censoring event.
3. **Box-and-Whisker Outliers**: Outlier points plotted individually beyond $1.5 \times \text{IQR}$ expose extreme patients.
4. **Heatmaps & Small-Area Choropleths**: Dense spatial tiles representing fewer than 10 individuals create granular geographic disclosure.

### 7.2 Can Plots Go Through the Same Policy-as-Code Engine?
**Yes.** The Seawater Policy-as-Code engine evaluates visualisations using the exact same OPA PDP daemon through an automated plot metadata extraction pipeline:

```
+------------------+      +---------------------------+      +----------------------+
|  R (ggplot2) /   | ---> | Plot Metadata Extractor   | ---> | Seawater OPA PDP     |
| Python (seaborn) |      | (Parses SVG/Data Pipeline)|      | (sdc.plots.rego)     |
+------------------+      +---------------------------+      +----------------------+
                                                                        |
                                                Permit / Block Decision v
                                                - Point count >= 10 per bin
                                                - No raw (x,y) coordinates
                                                - Truncated tail at k < 10
```

### 7.3 Prescribed Visual Transformation Rules
- **Scatter Plots**: Must be converted to 2D hexagonal binning (`hexbin`), 2D kernel density heatmaps, or aggregated centroid contours where every rendered bin represents $k \ge 10$ subjects.
- **Kaplan-Meier Curves**: The plot must truncate the horizontal time axis once the risk table falls below $N = 10$, or suppress the at-risk row values below 10.
- **Box Plots**: Outliers must not be plotted as individual dots; fences should stop at the percentiles or be suppressed.
- **Vector vs. Raster Inspection**: Vector outputs (PDF, SVG) that embed individual datapoints in their underlying DOM/paths are blocked; airlock pipelines require rasterised flattened PNG formats or validated aggregated geometries.
