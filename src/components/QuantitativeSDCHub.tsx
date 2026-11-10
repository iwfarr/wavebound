import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Calculator,
  Table as TableIcon,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Filter,
  Eye,
  EyeOff,
  GitBranch,
  Network,
  Users,
  FileCheck2,
  Lock,
  ArrowRight,
  Sliders,
  HelpCircle,
  Hash,
  FileCode,
  RotateCcw,
  Activity,
  TrendingUp,
  BarChart2,
  PieChart,
  BrainCircuit,
  Percent,
  ExternalLink,
  FileSpreadsheet,
  Code2
} from 'lucide-react';

interface ClinicalCell {
  row: string;
  col: string;
  val: number;
}

interface SDCScenarioPreset {
  id: string;
  name: string;
  category: 'Cross-Tabulation' | 'Continuous Dominance' | 'Regression Residuals' | 'Summary Moments & Extrema' | 'ML Weights & Safe Data';
  description: string;
  metricLabel: string;
  rows: string[];
  cols: string[];
  cells: ClinicalCell[];
  continuousValues?: number[];
  degreesOfFreedom?: { n: number; p: number };
  hasRawExtrema?: boolean;
  survivalMetrics?: { smallestStepDropN: number; tailRiskSetN: number };
  mlMetrics?: { dpEpsilon: number; minLeafSize: number; miaVulnerabilityScore: number };
}

const PRESET_SCENARIOS: SDCScenarioPreset[] = [
  {
    id: 'rare_peds_cardio',
    name: 'Rare Pediatric Cardiology Cohort (Cross-Tabulation)',
    category: 'Cross-Tabulation',
    description: 'Cross-tabulation of rare congenital cardiac conditions by age category across three NHS Trust regions. Contains small cell frequencies (N = 2, 4, 7) that require primary and complementary secondary suppression.',
    metricLabel: 'Patient Cohort Count (N)',
    rows: ['Tetralogy of Fallot', 'Hypoplastic Left Heart', 'Transposition of Arteries'],
    cols: ['Neonate (0–28d)', 'Infant (1–12m)', 'Child (1–5y)'],
    cells: [
      { row: 'Tetralogy of Fallot', col: 'Neonate (0–28d)', val: 4 }, // disclosive (<10)
      { row: 'Tetralogy of Fallot', col: 'Infant (1–12m)', val: 28 },
      { row: 'Tetralogy of Fallot', col: 'Child (1–5y)', val: 42 },

      { row: 'Hypoplastic Left Heart', col: 'Neonate (0–28d)', val: 18 },
      { row: 'Hypoplastic Left Heart', col: 'Infant (1–12m)', val: 2 }, // disclosive (<10)
      { row: 'Hypoplastic Left Heart', col: 'Child (1–5y)', val: 15 },

      { row: 'Transposition of Arteries', col: 'Neonate (0–28d)', val: 7 }, // disclosive (<10)
      { row: 'Transposition of Arteries', col: 'Infant (1–12m)', val: 34 },
      { row: 'Transposition of Arteries', col: 'Child (1–5y)', val: 51 }
    ]
  },
  {
    id: 'specialized_drug_spend',
    name: 'Specialized Biologic Drug Expenditure (Continuous Dominance)',
    category: 'Continuous Dominance',
    description: 'Expenditure distribution for specialized orphan biologics across a regional care board. Tests the (1, 80%) and (2, 85%) dominance rules to ensure one or two high-cost patients do not dominate the aggregate sum.',
    metricLabel: 'Specialized Pharmacy Cost (£k)',
    rows: ['Orphan Biologic Therapy A', 'CAR-T Cell Infusion B', 'Monoclonal Antibody C'],
    cols: ['Region North', 'Region Central', 'Region South'],
    cells: [
      { row: 'Orphan Biologic Therapy A', col: 'Region North', val: 320 },
      { row: 'Orphan Biologic Therapy A', col: 'Region Central', val: 410 },
      { row: 'Orphan Biologic Therapy A', col: 'Region South', val: 290 },

      { row: 'CAR-T Cell Infusion B', col: 'Region North', val: 850 },
      { row: 'CAR-T Cell Infusion B', col: 'Region Central', val: 920 },
      { row: 'CAR-T Cell Infusion B', col: 'Region South', val: 680 },

      { row: 'Monoclonal Antibody C', col: 'Region North', val: 180 },
      { row: 'Monoclonal Antibody C', col: 'Region Central', val: 240 },
      { row: 'Monoclonal Antibody C', col: 'Region South', val: 210 }
    ],
    continuousValues: [780, 85, 32, 24, 18, 12, 10, 8, 6, 5] // Top value 780 out of 980 total = 79.6%
  },
  {
    id: 'survival_regression_residuals',
    name: 'Cox Proportional Hazards & Kaplan-Meier Survival Analysis',
    category: 'Regression Residuals',
    description: 'Cox regression & Kaplan-Meier survival analysis evaluating 90-day heart failure mortality. Evaluates sample degrees of freedom (N - p >= 10), minimum events per step drop, and tail risk set censoring.',
    metricLabel: 'Model Parameters & Degrees of Freedom',
    rows: ['Age at Admission', 'Ejection Fraction %', 'Serum Creatinine', 'Diabetes Comorbidity'],
    cols: ['Hazard Ratio', '95% CI Lower', '95% CI Upper'],
    cells: [
      { row: 'Age at Admission', col: 'Hazard Ratio', val: 1.04 },
      { row: 'Age at Admission', col: '95% CI Lower', val: 1.01 },
      { row: 'Age at Admission', col: '95% CI Upper', val: 1.07 },

      { row: 'Ejection Fraction %', col: 'Hazard Ratio', val: 0.96 },
      { row: 'Ejection Fraction %', col: '95% CI Lower', val: 0.93 },
      { row: 'Ejection Fraction %', col: '95% CI Upper', val: 0.98 },

      { row: 'Serum Creatinine', col: 'Hazard Ratio', val: 1.35 },
      { row: 'Serum Creatinine', col: '95% CI Lower', val: 1.12 },
      { row: 'Serum Creatinine', col: '95% CI Upper', val: 1.62 },

      { row: 'Diabetes Comorbidity', col: 'Hazard Ratio', val: 1.48 },
      { row: 'Diabetes Comorbidity', col: '95% CI Lower', val: 1.05 },
      { row: 'Diabetes Comorbidity', col: '95% CI Upper', val: 2.08 }
    ],
    degreesOfFreedom: { n: 42, p: 4 },
    survivalMetrics: { smallestStepDropN: 3, tailRiskSetN: 6 } // Both disclosive under standard SOP
  },
  {
    id: 'biomarker_moments_extrema',
    name: 'Cardiac Biomarker Moments & Laboratory Extrema SOP',
    category: 'Summary Moments & Extrema',
    description: 'Continuous biomarker distribution statistics for acute coronary syndrome cohort (N = 84). Evaluates the strict ONS prohibition against publishing true Min and Max extrema, requiring replacement with 5th and 95th percentiles.',
    metricLabel: 'Biomarker Level (ng/L or pg/mL) & Moment Bounds',
    rows: ['High-Sensitivity Troponin I (ng/L)', 'NT-proBNP (pg/mL)', 'C-Reactive Protein (mg/L)'],
    cols: ['Mean (SD)', '5th Percentile', 'Median (IQR)', '95th Percentile'],
    cells: [
      { row: 'High-Sensitivity Troponin I (ng/L)', col: 'Mean (SD)', val: 42.6 },
      { row: 'High-Sensitivity Troponin I (ng/L)', col: '5th Percentile', val: 3.2 },
      { row: 'High-Sensitivity Troponin I (ng/L)', col: 'Median (IQR)', val: 28.4 },
      { row: 'High-Sensitivity Troponin I (ng/L)', col: '95th Percentile', val: 148.0 },

      { row: 'NT-proBNP (pg/mL)', col: 'Mean (SD)', val: 1250 },
      { row: 'NT-proBNP (pg/mL)', col: '5th Percentile', val: 110 },
      { row: 'NT-proBNP (pg/mL)', col: 'Median (IQR)', val: 890 },
      { row: 'NT-proBNP (pg/mL)', col: '95th Percentile', val: 3450 },

      { row: 'C-Reactive Protein (mg/L)', col: 'Mean (SD)', val: 8.4 },
      { row: 'C-Reactive Protein (mg/L)', col: '5th Percentile', val: 0.8 },
      { row: 'C-Reactive Protein (mg/L)', col: 'Median (IQR)', val: 5.6 },
      { row: 'C-Reactive Protein (mg/L)', col: '95th Percentile', val: 24.2 }
    ],
    hasRawExtrema: true
  },
  {
    id: 'ml_diagnostic_weights',
    name: 'Cardiovascular Risk AI Model (Differential Privacy & Leaf Bounds)',
    category: 'ML Weights & Safe Data',
    description: 'Trained XGBoost & neural embedding model checkpoint for 5-year ischemic event risk. Evaluates Differential Privacy budget (ε <= 1.0), minimum decision tree leaf count (N >= 10), and Membership Inference Attack (MIA) risk.',
    metricLabel: 'Model Hyperparameters & Privacy Guarantees',
    rows: ['Tree Ensemble Booster', 'Neural Risk Embedding', 'Logistic Calibration Head'],
    cols: ['Min Leaf N', 'DP Epsilon (ε)', 'MIA Score %'],
    cells: [
      { row: 'Tree Ensemble Booster', col: 'Min Leaf N', val: 12 },
      { row: 'Tree Ensemble Booster', col: 'DP Epsilon (ε)', val: 0.85 },
      { row: 'Tree Ensemble Booster', col: 'MIA Score %', val: 51.2 },

      { row: 'Neural Risk Embedding', col: 'Min Leaf N', val: 10 },
      { row: 'Neural Risk Embedding', col: 'DP Epsilon (ε)', val: 1.45 }, // Exceeds 1.0!
      { row: 'Neural Risk Embedding', col: 'MIA Score %', val: 68.4 },

      { row: 'Logistic Calibration Head', col: 'Min Leaf N', val: 15 },
      { row: 'Logistic Calibration Head', col: 'DP Epsilon (ε)', val: 0.50 },
      { row: 'Logistic Calibration Head', col: 'MIA Score %', val: 50.1 }
    ],
    mlMetrics: { dpEpsilon: 1.45, minLeafSize: 10, miaVulnerabilityScore: 68.4 }
  }
];

export const QuantitativeSDCHub: React.FC = () => {
  // Navigation tabs within SDC Hub
  const [activeTab, setActiveTab] = useState<'simulator' | 'methods_matrix' | 'policy_code' | 'airlock_gate'>('simulator');

  // Simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_SCENARIOS[0].id);
  const [kThreshold, setKThreshold] = useState<number>(10);
  const [suppressionMode, setSuppressionMode] = useState<'raw' | 'primary' | 'secondary' | 'rounded'>('secondary');
  const [dominancePPercent, setDominancePPercent] = useState<number>(80);
  const [customTopContributor, setCustomTopContributor] = useState<number>(82); // 82%

  // Interactive SOP state for Tab 2
  const [selectedSopClass, setSelectedSopClass] = useState<
    'tables' | 'regressions' | 'survival' | 'moments' | 'visualizations' | 'ml_models' | 'hypothesis'
  >('tables');

  // Sandbox state for interactive testing in Tab 2:
  const [sandboxRegN, setSandboxRegN] = useState<number>(45);
  const [sandboxRegP, setSandboxRegP] = useState<number>(6);
  const [sandboxResidualPlot, setSandboxResidualPlot] = useState<boolean>(false);

  const [sandboxStepDropN, setSandboxStepDropN] = useState<number>(12);
  const [sandboxTailRiskN, setSandboxTailRiskN] = useState<number>(14);
  const [sandboxCurveSmoothed, setSandboxCurveSmoothed] = useState<boolean>(false);

  const [sandboxIncludeExtrema, setSandboxIncludeExtrema] = useState<boolean>(false);
  const [sandboxMomentsSampleN, setSandboxMomentsSampleN] = useState<number>(35);

  const [sandboxPlotType, setSandboxPlotType] = useState<'hexbin' | 'scatterplot' | 'density_contour' | 'boxplot_clipped'>('hexbin');
  const [sandboxMinBinCount, setSandboxMinBinCount] = useState<number>(15);

  const [sandboxEpsilon, setSandboxEpsilon] = useState<number>(0.85);
  const [sandboxLeafN, setSandboxLeafN] = useState<number>(12);
  const [sandboxMiaScore, setSandboxMiaScore] = useState<number>(52);

  // 2-Person Airlock Sign-off state
  const [reviewer1Status, setReviewer1Status] = useState<boolean>(true);
  const [reviewer2Name, setReviewer2Name] = useState<string>('Designated SDC Output Lead (Accredited Assessor [Example Role])');
  const [reviewer2Approved, setReviewer2Approved] = useState<boolean>(true);
  const [airlockRationale, setAirlockRationale] = useState<string>('Standardized primary (<10) and complementary secondary suppression applied. No marginal derivation possible. Dominance checked.');
  const [airlockSealHash, setAirlockSealHash] = useState<string>('a7f49e0c1b8d2345e6789abcde0123456789abcdef0123456789abcdef012345');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activePreset = PRESET_SCENARIOS.find((p) => p.id === selectedPresetId) || PRESET_SCENARIOS[0];

  // Mathematical Analysis of Active Table
  const tableAnalysis = useMemo(() => {
    const cells = activePreset.cells;
    const rows = activePreset.rows;
    const cols = activePreset.cols;

    // Calculate row sums & col sums
    const rowSums: Record<string, number> = {};
    const colSums: Record<string, number> = {};
    let grandTotal = 0;

    rows.forEach((r) => { rowSums[r] = 0; });
    cols.forEach((c) => { colSums[c] = 0; });

    cells.forEach((cell) => {
      rowSums[cell.row] = (rowSums[cell.row] || 0) + cell.val;
      colSums[cell.col] = (colSums[cell.col] || 0) + cell.val;
      grandTotal += cell.val;
    });

    // Identify primary disclosive cells (val < kThreshold)
    const primaryDisclosiveKeys = new Set<string>();
    cells.forEach((cell) => {
      if (cell.val > 0 && cell.val < kThreshold) {
        primaryDisclosiveKeys.add(`${cell.row}__${cell.col}`);
      }
    });

    // Compute complementary secondary suppression:
    const secondarySuppressedKeys = new Set<string>();
    if (suppressionMode === 'secondary') {
      rows.forEach((r) => {
        const rowCells = cells.filter((c) => c.row === r);
        const disclosiveInRow = rowCells.filter((c) => primaryDisclosiveKeys.has(`${c.row}__${c.col}`));
        if (disclosiveInRow.length === 1) {
          const nonDisclosive = rowCells.filter((c) => !primaryDisclosiveKeys.has(`${c.row}__${c.col}`));
          if (nonDisclosive.length > 0) {
            const sorted = [...nonDisclosive].sort((a, b) => a.val - b.val);
            secondarySuppressedKeys.add(`${sorted[0].row}__${sorted[0].col}`);
          }
        }
      });

      // Do the same for columns
      cols.forEach((c) => {
        const colCells = cells.filter((cell) => cell.col === c);
        const suppressedInCol = colCells.filter(
          (cell) => primaryDisclosiveKeys.has(`${cell.row}__${cell.col}`) || secondarySuppressedKeys.has(`${cell.row}__${cell.col}`)
        );
        if (suppressedInCol.length === 1) {
          const nonSuppressed = colCells.filter(
            (cell) => !primaryDisclosiveKeys.has(`${cell.row}__${cell.col}`) && !secondarySuppressedKeys.has(`${cell.row}__${cell.col}`)
          );
          if (nonSuppressed.length > 0) {
            const sorted = [...nonSuppressed].sort((a, b) => a.val - b.val);
            secondarySuppressedKeys.add(`${sorted[0].row}__${sorted[0].col}`);
          }
        }
      });
    }

    // Dominance calculation if continuous values exist
    let top1Share = 0;
    let top2Share = 0;
    let dominanceViolation = false;
    if (activePreset.continuousValues && activePreset.continuousValues.length > 0) {
      const sortedVals = [...activePreset.continuousValues].sort((a, b) => b - a);
      const totalSum = sortedVals.reduce((acc, v) => acc + v, 0);
      top1Share = Math.round((sortedVals[0] / totalSum) * 100);
      top2Share = Math.round(((sortedVals[0] + (sortedVals[1] || 0)) / totalSum) * 100);
      dominanceViolation = top1Share > dominancePPercent || top2Share > 85;
    }

    // Statistical edge-case violations across non-aggregate outputs:
    const survivalViolation = activePreset.survivalMetrics
      ? (activePreset.survivalMetrics.smallestStepDropN < kThreshold || activePreset.survivalMetrics.tailRiskSetN < kThreshold)
      : false;
    const mlEpsilonViolation = activePreset.mlMetrics
      ? (activePreset.mlMetrics.dpEpsilon > 1.0 || activePreset.mlMetrics.miaVulnerabilityScore > 60)
      : false;
    const extremaViolation = activePreset.hasRawExtrema === true && suppressionMode === 'raw';
    const dfViolation = activePreset.degreesOfFreedom
      ? activePreset.degreesOfFreedom.n - activePreset.degreesOfFreedom.p < 10
      : false;

    const totalPrimaryDisclosive = primaryDisclosiveKeys.size;
    const totalSecondarySuppressed = secondarySuppressedKeys.size;
    const isCleanAirlock =
      (suppressionMode === 'secondary' || suppressionMode === 'rounded') &&
      !dominanceViolation &&
      !survivalViolation &&
      !mlEpsilonViolation &&
      !extremaViolation &&
      !dfViolation;

    return {
      rowSums,
      colSums,
      grandTotal,
      primaryDisclosiveKeys,
      secondarySuppressedKeys,
      totalPrimaryDisclosive,
      totalSecondarySuppressed,
      top1Share,
      top2Share,
      dominanceViolation,
      survivalViolation,
      mlEpsilonViolation,
      extremaViolation,
      dfViolation,
      isCleanAirlock
    };
  }, [activePreset, kThreshold, suppressionMode, dominancePPercent]);

  // Compute live Web Crypto SHA-256 seal
  const generateCryptographicSeal = async () => {
    try {
      const payload = JSON.stringify({
        preset: activePreset.id,
        thresholdK: kThreshold,
        suppressionMode,
        timestamp: new Date().toISOString(),
        reviewer1: 'Automated-SHACL-SDC-PEP',
        reviewer2: reviewer2Name,
        rationale: airlockRationale,
        primaryCount: tableAnalysis.totalPrimaryDisclosive,
        secondaryCount: tableAnalysis.totalSecondarySuppressed
      });
      const encoder = new TextEncoder();
      const data = encoder.encode(payload);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setAirlockSealHash(hashHex);
    } catch {
      // fallback pseudo-hash
      setAirlockSealHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    const md = `# Statistical Disclosure Control (SDC) Airlock Audit Dossier
Generated by Wavebound IG Platform (Phase 6 Quantitative SDC Specification)
Timestamp: ${new Date().toISOString()}
Cryptographic SHA-256 Seal: ${airlockSealHash}

## 1. Output Candidate Metadata
- **Project Scenario**: ${activePreset.name}
- **Category**: ${activePreset.category}
- **Metric**: ${activePreset.metricLabel}
- **Applied k-Threshold**: k >= ${kThreshold}
- **Suppression Mode**: ${suppressionMode.toUpperCase()}

## 2. Quantitative SDC Evaluation Results
- **Primary Disclosive Cells (N < ${kThreshold})**: ${tableAnalysis.totalPrimaryDisclosive}
- **Secondary Complementary Suppressions**: ${tableAnalysis.totalSecondarySuppressed}
- **Top Contributor Dominance (1, ${dominancePPercent}%)**: ${tableAnalysis.top1Share}% (${tableAnalysis.top1Share > dominancePPercent ? 'FAIL - DOMINANCE EXCEEDED' : 'PASS - COMPLIANT'})
- **Top 2 Contributors Dominance (2, 85%)**: ${tableAnalysis.top2Share}% (${tableAnalysis.top2Share > 85 ? 'FAIL' : 'PASS'})
- **Airlock Status**: ${tableAnalysis.isCleanAirlock ? 'APPROVED FOR EGRESS' : 'REJECTED / BLOCKED (DISCLOSURE RISK)'}

## 3. Two-Person Airlock Sign-off Protocol
- **Gate 1 (Automated SDC PEP)**: ${reviewer1Status ? 'CONFIRMED PASS (Zero unsuppressed disclosive cells)' : 'FAILED'}
- **Gate 2 (Human Output Checker)**: ${reviewer2Approved ? 'APPROVED' : 'PENDING'}
- **Signatory**: ${reviewer2Name}
- **Reviewer Rationale**: ${airlockRationale}

---
*Reference Standards: Office for National Statistics (ONS) SDC Handbook, UK LLC Output Checking, Caldicott Principle 8.*`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SDC_Airlock_Dossier_${activePreset.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. EDITORIAL HEADER & ONS/CALDICOTT BASELINE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#005EB8] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Phase 6: Quantitative Statistical Disclosure Control (SDC) &amp; Airlock Review</span>
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              ONS SDC Handbook · k ≥ 10 · (1, 80%) Dominance · 2-Person Airlock
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Quantitative SDC Math &amp; Airlock Governance Gate
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Applies graph-navigated and machine-audited Information Governance to outbound clinical research exports. Mathematically models primary cell suppression, complementary secondary suppression to prevent marginal deduction, top-contributor dominance thresholds, and degrees-of-freedom bounds before candidate tables leave the airlock.
          </p>

          {/* Key Guarantees Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-[#005EB8] dark:text-sky-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Primary Suppression (k ≥ 10)</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Redacts cell counts under 10 (or 5 for local operational audits) to stop individual singling out.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                <span>Secondary Deduction Shield</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Suppresses complementary safe cells so values cannot be calculated from row or column marginal totals.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-[#047857] dark:text-emerald-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>2-Person Cryptographic Airlock</span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Combines automated SHACL/OPA shape checks with human SDC Lead sign-off and SHA-256 seal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Tabular SDC Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('methods_matrix')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'methods_matrix'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>SDC Policy &amp; SOP (7 Output Classes)</span>
          </button>
          <button
            onClick={() => setActiveTab('policy_code')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'policy_code'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>SHACL Shape &amp; OPA Rego SDC</span>
          </button>
          <button
            onClick={() => setActiveTab('airlock_gate')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'airlock_gate'
                ? 'bg-[#005EB8] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>2-Person Airlock Gate &amp; SHA-256 Seal</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Airlock Verdict:</span>
          <span
            className={`px-2.5 py-0.5 rounded font-bold border ${
              tableAnalysis.isCleanAirlock
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#047857] dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
            }`}
          >
            {tableAnalysis.isCleanAirlock ? 'PASSED (SAFE FOR EGRESS)' : 'DISCLOSURE BLOCKED'}
          </span>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE TABULAR SDC SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Preset Selector & Parameter Controls Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider block">
                  Scenario Test Bench
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Select Analytical Scenario to Evaluate
                </h3>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_SCENARIOS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedPresetId === preset.id
                        ? 'bg-[#005EB8] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {preset.name.split('(')[0]}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activePreset.description}
            </p>

            {/* SDC Tuning Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              {/* Primary threshold */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#005EB8]" />
                    <span>Primary Threshold (k)</span>
                  </span>
                  <span className="font-mono font-bold text-[#005EB8] dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    k ≥ {kThreshold}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setKThreshold(5)}
                    className={`flex-1 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      kThreshold === 5
                        ? 'bg-[#005EB8] text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    k ≥ 5 (Local Audit)
                  </button>
                  <button
                    onClick={() => setKThreshold(10)}
                    className={`flex-1 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                      kThreshold === 10
                        ? 'bg-[#005EB8] text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    k ≥ 10 (SDE/TRE Norm)
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  National research enclaves mandate k ≥ 10 to balance public confidentiality with utility.
                </p>
              </div>

              {/* Suppression Algorithm Mode */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-600" />
                  <span>Suppression Mode</span>
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSuppressionMode('raw')}
                    className={`py-1 px-2 rounded text-xs font-medium cursor-pointer transition-colors ${
                      suppressionMode === 'raw'
                        ? 'bg-red-700 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Raw Cell View
                  </button>
                  <button
                    onClick={() => setSuppressionMode('primary')}
                    className={`py-1 px-2 rounded text-xs font-medium cursor-pointer transition-colors ${
                      suppressionMode === 'primary'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Primary Only
                  </button>
                  <button
                    onClick={() => setSuppressionMode('secondary')}
                    className={`py-1 px-2 rounded text-xs font-bold cursor-pointer transition-colors col-span-2 ${
                      suppressionMode === 'secondary'
                        ? 'bg-[#047857] text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Primary + Secondary (Recommended)
                  </button>
                </div>
              </div>

              {/* Dominance threshold */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <PercentIcon className="w-3.5 h-3.5 text-purple-600" />
                    <span>(1, p%) Dominance Rule</span>
                  </span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                    p ≤ {dominancePPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={dominancePPercent}
                  onChange={(e) => setDominancePPercent(parseInt(e.target.value, 10))}
                  className="w-full accent-[#005EB8]"
                />
                <p className="text-[10px] text-slate-500">
                  Prevents attribute disclosure when a single patient represents &gt;{dominancePPercent}% of an aggregate metric.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Output Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {activePreset.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {activePreset.metricLabel}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Rows: {activePreset.rows.length} · Columns: {activePreset.cols.length} · Grand Total: {tableAnalysis.grandTotal}
                </span>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 text-xs">
                {tableAnalysis.totalPrimaryDisclosive > 0 && suppressionMode === 'raw' && (
                  <span className="px-2.5 py-1 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold border border-red-300 dark:border-red-800 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>{tableAnalysis.totalPrimaryDisclosive} Disclosive Cells (Raw)</span>
                  </span>
                )}
                {suppressionMode === 'primary' && (
                  <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Vulnerable to Marginal Deduction</span>
                  </span>
                )}
                {suppressionMode === 'secondary' && (
                  <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected: {tableAnalysis.totalPrimaryDisclosive} Primary + {tableAnalysis.totalSecondarySuppressed} Complementary</span>
                  </span>
                )}
              </div>
            </div>

            {/* Table Rendering */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-mono">
                    <th className="py-2.5 px-3 font-semibold">Cohort / Subgroup</th>
                    {activePreset.cols.map((col) => (
                      <th key={col} className="py-2.5 px-3 font-semibold text-center">{col}</th>
                    ))}
                    <th className="py-2.5 px-3 font-bold text-center bg-slate-100 dark:bg-slate-800">Row Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activePreset.rows.map((row) => {
                    const rowCells = activePreset.cells.filter((c) => c.row === row);
                    return (
                      <tr key={row} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white font-mono">
                          {row}
                        </td>
                        {activePreset.cols.map((col) => {
                          const cell = rowCells.find((c) => c.col === col);
                          const val = cell ? cell.val : 0;
                          const isPrimary = tableAnalysis.primaryDisclosiveKeys.has(`${row}__${col}`);
                          const isSecondary = tableAnalysis.secondarySuppressedKeys.has(`${row}__${col}`);

                          return (
                            <td key={col} className="py-2.5 px-3 text-center font-mono">
                              {suppressionMode === 'raw' && (
                                <span className={isPrimary ? 'text-red-700 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-800' : 'text-slate-800 dark:text-slate-200'}>
                                  {val}
                                </span>
                              )}
                              {suppressionMode === 'primary' && (
                                isPrimary ? (
                                  <span className="text-red-700 dark:text-red-400 font-bold bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded border border-red-300 dark:border-red-800">
                                    &lt;{kThreshold} *
                                  </span>
                                ) : (
                                  <span className="text-slate-800 dark:text-slate-200">{val}</span>
                                )
                              )}
                              {suppressionMode === 'secondary' && (
                                isPrimary ? (
                                  <span className="text-red-700 dark:text-red-400 font-bold bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded border border-red-300 dark:border-red-800" title="Primary suppressed (under k)">
                                    &lt;{kThreshold} *
                                  </span>
                                ) : isSecondary ? (
                                  <span className="text-amber-800 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800" title="Complementary secondary suppression to prevent marginal deduction">
                                    SUPP *
                                  </span>
                                ) : (
                                  <span className="text-slate-800 dark:text-slate-200">{val}</span>
                                )
                              )}
                            </td>
                          );
                        })}
                        {/* Row Total */}
                        <td className="py-2.5 px-3 text-center font-bold font-mono bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                          {tableAnalysis.rowSums[row]}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Column Totals Row */}
                  <tr className="bg-slate-100 dark:bg-slate-800 font-bold font-mono border-t border-slate-200 dark:border-slate-700">
                    <td className="py-2.5 px-3 text-slate-900 dark:text-white">Column Total</td>
                    {activePreset.cols.map((col) => (
                      <td key={col} className="py-2.5 px-3 text-center text-slate-900 dark:text-white">
                        {tableAnalysis.colSums[col]}
                      </td>
                    ))}
                    <td className="py-2.5 px-3 text-center bg-slate-200 dark:bg-slate-750 text-[#005EB8] dark:text-sky-300 font-extrabold">
                      {tableAnalysis.grandTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Explanation Note regarding Marginal Deduction */}
            {suppressionMode === 'primary' && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Deductive Hazard Detected in Primary-Only Mode:</span>
                </div>
                <p className="leading-relaxed">
                  Notice row <em>Tetralogy of Fallot</em>: Neonate count is &lt;10*, Infant is 28, Child is 42, and Row Total is 74. Any external party can trivially compute Neonate = 74 - (28 + 42) = 4! Therefore, <strong>complementary secondary suppression is mathematically required</strong> before airlock release.
                </p>
              </div>
            )}

            {/* Dominance Breakdown if Continuous Scenario */}
            {activePreset.continuousValues && (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <PercentIcon className="w-3.5 h-3.5 text-purple-600" />
                    <span>Continuous Attribute Dominance Analysis</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                      tableAnalysis.dominanceViolation
                        ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {tableAnalysis.dominanceViolation ? 'DOMINANCE VIOLATION' : 'DOMINANCE PASS'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500">Top 1 Contributor Share (Threshold: ≤ {dominancePPercent}%):</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{tableAnalysis.top1Share}%</span>
                      <span className="text-[11px] text-slate-500">(Patient #1 = £780k of £980k total)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500">Top 2 Contributors Combined (Threshold: ≤ 85%):</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{tableAnalysis.top2Share}%</span>
                      <span className="text-[11px] text-slate-500">(Patients #1 &amp; #2 = £865k of £980k total)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SDC POLICY & STANDARD OPERATING PROCEDURE (SOP) RULEBOOK */}
      {activeTab === 'methods_matrix' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header & Literature Citations */}
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Authoritative SOP Egress Standards</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ONS SDC Handbook · UK LLC Output Checking SOP · SDAP StatBarn · Caldicott Principle 8
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Statistical Output Classes &amp; Airlock Egress Rulebook
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              Statistical Disclosure Control in NHS Secure Data Environments (SDEs) extends far beyond simple frequency table cross-tabulation. Every statistical artifact—including survival curves, regression parameter sets, summary moments, scatterplots, and machine learning checkpoints—is governed by strict mathematical disclosure limits before passing the airlock.
            </p>
          </div>

          {/* 7-Class Output Navigation Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {[
              { id: 'tables', label: '1. Tabular Aggregates', icon: TableIcon, desc: 'Cross-tabs, k>=10, secondary' },
              { id: 'regressions', label: '2. Regressions (Lin/Log/Cox)', icon: TrendingUp, desc: 'Residual df>=10, no residual plots' },
              { id: 'survival', label: '3. Kaplan-Meier Survival', icon: Activity, desc: 'Step drop N>=10, tail censoring' },
              { id: 'moments', label: '4. Summary Moments & Extrema', icon: BarChart2, desc: 'Min/Max strictly suppressed' },
              { id: 'visualizations', label: '5. Visualizations & Charts', icon: PieChart, desc: 'Scatterplots blocked, hexbins N>=10' },
              { id: 'ml_models', label: '6. ML Weights & Safe Data', icon: BrainCircuit, desc: 'DP ε<=1.0, leaf N>=10, MIA check' },
              { id: 'hypothesis', label: '7. Hypothesis Tests & ANOVA', icon: Calculator, desc: 'Expected counts>=5, total df' }
            ].map((cls) => {
              const Icon = cls.icon;
              const isSelected = selectedSopClass === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedSopClass(cls.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#005EB8] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-750'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cls.label}</span>
                </button>
              );
            })}
          </div>

          {/* CLASS 1: TABULAR FREQUENCY & AGGREGATES */}
          {selectedSopClass === 'tables' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider block">
                  Class 1 SOP Directive · Categorical Aggregates &amp; Frequency Tables
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Every cell representing patient frequency counts must satisfy the primary threshold ($k \ge 10$, or $k \ge 5$ for internal operational audits with Caldicott sign-off). If a row or column marginal total is published, complementary <strong>secondary suppression</strong> must be applied to at least one non-sensitive cell to prevent algebraic back-calculation ($x = Total - \sum other$). Furthermore, structural zeros (where a condition is biologically impossible) must be distinguished from sampling zeros (which may reveal negative disclosure).
                </p>
              </div>

              {/* Decision Rules Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-mono">
                      <th className="py-2.5 px-3">Rule Directive</th>
                      <th className="py-2.5 px-3">Operational Threshold</th>
                      <th className="py-2.5 px-3">Permitted Output Format</th>
                      <th className="py-2.5 px-3">Prohibited Representation</th>
                      <th className="py-2.5 px-3">Airlock Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-[#005EB8] dark:text-sky-400">Primary Cell Count</td>
                      <td className="py-3 px-3 font-mono">Count N &ge; 10</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Mask as &quot;&lt;10*&quot; or combine categories</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Raw counts 1 to 9 published in table</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Immediate Block</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-amber-700 dark:text-amber-400">Secondary Deduction</td>
                      <td className="py-3 px-3 font-mono">&ge; 2 suppressed cells per marginal line</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Mask second safe cell as &quot;SUPP*&quot; or suppress row/col totals</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">1 suppressed cell with visible row/col sum</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Immediate Block</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-purple-700 dark:text-purple-400">Sampling Zeros</td>
                      <td className="py-3 px-3 font-mono">Context-specific attribute test</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Controlled perturbation or grouping</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Zero in row where all cohort members share stigma</td>
                      <td className="py-3 px-3 font-semibold text-amber-600">Audit Review</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Code Implementation Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#005EB8]" />
                  <span>Standard R &amp; Python Suppression Script (SDAP Compliant):</span>
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto">
{`# R Statistical Disclosure Control Pipeline
library(sdcTable)
dim_list <- list(region = c("North", "Central", "South"), condition = c("ToF", "HLHS", "TGA"))
problem <- makeProblem(data = clinical_cohort, dimList = dim_list, freqVar = "count")
# Enforce primary k >= 10 and optimal complementary secondary suppression
problem <- primarySuppression(problem, type = "k-anonymity", k = 10)
clean_table <- protectTable(problem, method = "HITAS", verbose = FALSE)`}
                </pre>
              </div>
            </div>
          )}

          {/* CLASS 2: REGRESSIONS (LINEAR, LOGISTIC, PROBIT, COX) */}
          {selectedSopClass === 'regressions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider block">
                  Class 2 SOP Directive · Linear, Logistic, Probit &amp; Cox Proportional Hazards
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Published regression models must satisfy the residual degrees of freedom rule: <strong>$df = N - p \ge 10$</strong> (where $N$ is total sample count and $p$ is total estimated parameters including intercepts and factor dummy indicators). Each level of categorical covariates must be backed by $\ge 10$ patients to prevent isolating single individuals. <strong>Crucially: Residual scatterplots and studentized residual diagnostic plots are strictly prohibited microdata</strong> because outlier points directly expose single patients. Only summary fit statistics ($R^2$, AUC-ROC, AIC, BIC) are exportable.
                </p>
              </div>

              {/* Interactive Sandbox Form */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Interactive Regression Egress Rule Evaluator
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Patient Sample Size (N):
                    </label>
                    <input
                      type="number"
                      value={sandboxRegN}
                      onChange={(e) => setSandboxRegN(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Estimated Parameters &amp; Covariates (p):
                    </label>
                    <input
                      type="number"
                      value={sandboxRegP}
                      onChange={(e) => setSandboxRegP(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Residual Diagnostic Scatterplot:
                    </label>
                    <select
                      value={sandboxResidualPlot ? 'included' : 'none'}
                      onChange={(e) => setSandboxResidualPlot(e.target.value === 'included')}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    >
                      <option value="none">No Scatterplots (Summary Metrics Only - Compliant)</option>
                      <option value="included">Raw Residual Scatterplot Included (Prohibited)</option>
                    </select>
                  </div>
                </div>

                {/* Live Verdict Calculation */}
                {(() => {
                  const df = sandboxRegN - sandboxRegP;
                  const dfPass = df >= 10;
                  const plotPass = !sandboxResidualPlot;
                  const pass = dfPass && plotPass;
                  return (
                    <div
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        pass
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5">
                          {pass ? <CheckCircle2 className="w-4 h-4 text-[#047857]" /> : <XCircle className="w-4 h-4 text-red-600" />}
                          <span>Calculated Residual Degrees of Freedom: df = {df} (Threshold: df &ge; 10)</span>
                        </span>
                        <p className="text-[11px] opacity-90">
                          {!dfPass && '• Residual degrees of freedom < 10 allows mathematical inversion of coefficients to reconstruct individual patient responses. '}
                          {!plotPass && '• Raw residual scatterplots are classified as unsuppressed microdata and strictly forbidden.'}
                          {pass && '• Full mathematical compliance with ONS SDC Section 4. Safe for airlock egress.'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-mono font-bold text-xs uppercase shrink-0 ${
                          pass ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                        }`}
                      >
                        {pass ? 'APPROVED FOR EGRESS' : 'EGRESS BLOCKED'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Decision Rules Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-mono">
                      <th className="py-2.5 px-3">Regression Dimension</th>
                      <th className="py-2.5 px-3">Statutory SOP Requirement</th>
                      <th className="py-2.5 px-3">Permitted Egress Format</th>
                      <th className="py-2.5 px-3">Prohibited Element</th>
                      <th className="py-2.5 px-3">Airlock Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-[#005EB8] dark:text-sky-400">Residual Degrees of Freedom</td>
                      <td className="py-3 px-3 font-mono">df = N - p &ge; 10</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Models where sample N exceeds parameters by &ge; 10</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Over-parameterized models (df &lt; 10)</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Immediate Block</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-purple-700 dark:text-purple-400">Subgroup Factor Levels</td>
                      <td className="py-3 px-3 font-mono">N &ge; 10 per dummy level</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Collapsed categorical bins (e.g. Rare variant combined)</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Indicator variable fitted to &lt; 10 patients</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Immediate Block</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-red-700 dark:text-red-400">Diagnostic Residual Plots</td>
                      <td className="py-3 px-3 font-mono">Zero raw microdata points</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">Aggregated fit summaries (AUC, AIC, BIC, RMSE)</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Scatterplots of residuals vs fitted values</td>
                      <td className="py-3 px-3 font-semibold text-red-600">Immediate Block</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CLASS 3: SURVIVAL ANALYSIS & KAPLAN-MEIER */}
          {selectedSopClass === 'survival' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
                  Class 3 SOP Directive · Survival Curves, Kaplan-Meier &amp; Life Tables
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Kaplan-Meier survival curves present unique deductive disclosure vectors because vertical step drops represent individual or clustered deaths, while tick marks represent censored patients. Under standard SDC rules, researchers have <strong>two approved solutions</strong>:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Solution A (Spline / Kernel Curve Smoothing):</strong> Apply non-parametric kernel hazard smoothing or natural cubic splines (e.g. <code>bshazard</code> in R or <code>lifelines</code> spline models in Python). Smoothing converts discrete individual patient steps into a continuous probability band, completely eliminating discrete mortality step disclosure while preserving the clinical curve trajectory.</li>
                  <li><strong>Solution B (Step Aggregation &amp; Tail Truncation):</strong> Ensure discrete step drops represent &ge; 10 events, and truncate / right-censor the curve as soon as the remaining number at risk drops below 10 (N_risk &lt; 10). Individual tick marks for censored subjects are prohibited.</li>
                </ul>
              </div>

              {/* Interactive Sandbox Form */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    Interactive Kaplan-Meier Egress Rule Evaluator
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer bg-purple-100 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 font-semibold">
                    <input
                      type="checkbox"
                      checked={sandboxCurveSmoothed}
                      onChange={(e) => setSandboxCurveSmoothed(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>Apply Spline / Kernel Curve Smoothing</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Smallest Step Drop Event Count (N_events):
                    </label>
                    <input
                      type="number"
                      disabled={sandboxCurveSmoothed}
                      value={sandboxStepDropN}
                      onChange={(e) => setSandboxStepDropN(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white disabled:opacity-50"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {sandboxCurveSmoothed ? 'Discrete steps eliminated by spline smoothing' : 'Mandatory Threshold: ≥ 10 events per step'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Remaining Number at Risk in Tail (N_risk):
                    </label>
                    <input
                      type="number"
                      disabled={sandboxCurveSmoothed}
                      value={sandboxTailRiskN}
                      onChange={(e) => setSandboxTailRiskN(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white disabled:opacity-50"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {sandboxCurveSmoothed ? 'Continuous tail density bounds applied' : 'Mandatory Threshold: ≥ 10 at risk (or truncate curve)'}
                    </span>
                  </div>
                </div>

                {/* Live Verdict Calculation */}
                {(() => {
                  const stepPass = sandboxStepDropN >= 10 || sandboxCurveSmoothed;
                  const tailPass = sandboxTailRiskN >= 10 || sandboxCurveSmoothed;
                  const pass = stepPass && tailPass;
                  return (
                    <div
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        pass
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5">
                          {pass ? <CheckCircle2 className="w-4 h-4 text-[#047857]" /> : <XCircle className="w-4 h-4 text-red-600" />}
                          <span>
                            Kaplan-Meier Airlock Verdict:{' '}
                            {sandboxCurveSmoothed ? 'COMPLIANT (SMOOTHED SPLINE / KERNEL APPLIED)' : pass ? 'COMPLIANT (TRUNCATED)' : 'DISCLOSURE HAZARD'}
                          </span>
                        </span>
                        <p className="text-[11px] opacity-90">
                          {sandboxCurveSmoothed
                            ? '• Spline / kernel smoothing replaces step drops with continuous non-parametric hazard bands, preventing individual mortality derivation.'
                            : !stepPass
                            ? `• Step drop of ${sandboxStepDropN} events (< 10) discloses individual patient deaths. Must smooth curve or merge time intervals. `
                            : !tailPass
                            ? `• Tail risk set of ${sandboxTailRiskN} patients (< 10) reveals survival status of isolated individuals. Must smooth curve or truncate tail.`
                            : '• Curve satisfies UK LLC & ONS SDC survival analysis guidelines.'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-mono font-bold text-xs uppercase shrink-0 ${
                          pass ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                        }`}
                      >
                        {pass ? 'APPROVED FOR EGRESS' : 'EGRESS BLOCKED'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* R Code Transformation Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Compliant Survival Curve Solutions in R (Smoothing vs Truncation):</span>
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto">
{`# SOLUTION 1: Kernel / Spline Smoothing (Approved alternative to truncation)
library(bshazard)
# Fit non-parametric B-spline smoothed hazard rate
smooth_fit <- bshazard(Surv(time, status) ~ 1, data = cohort, nbin = 100)
plot(smooth_fit, conf.int = TRUE, xlab = "Days Post-Op", ylab = "Smoothed Hazard Function")
# Note: Continuous spline removes all individual step drops; safe for egress!

# SOLUTION 2: Step Drop Truncation when risk set N < 10
library(survival)
fit <- survfit(Surv(time, status) ~ treatment, data = cohort)
cutoff_time <- min(fit$time[fit$n.risk < 10], na.rm = TRUE)
plot(fit, xlim = c(0, cutoff_time), mark.time = FALSE, # Suppress individual ticks
     xlab = "Days Post-Intervention", ylab = "Event-Free Survival Probability")`}
                </pre>
              </div>
            </div>
          )}

          {/* CLASS 4: SUMMARY MOMENTS & EXTREMA (MIN/MAX SOP) */}
          {selectedSopClass === 'moments' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Class 4 SOP Directive · Continuous Moments &amp; Strict Min/Max Extrema Suppression
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Non-negotiable statutory rule across all NHS TRE/SDE airlocks: True Minimum and Maximum values are strictly prohibited microdata</strong>. Raw extrema correspond to exact observed attribute values of single, isolated patients (e.g., the oldest patient in the hospital, the longest intensive care stay, the highest blood troponin spike). To maintain utility without compromising confidentiality, researchers must replace Min and Max with <strong>5th and 95th percentiles</strong> (or 10th and 90th), provided the cohort sample size is $N \ge 10$. Mean, Standard Deviation, Median, and IQR are permitted when sample $N \ge 10$.
                </p>
              </div>

              {/* Interactive Sandbox Form */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Interactive Extrema &amp; Moments Egress Evaluator
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Reported Range Format:
                    </label>
                    <select
                      value={sandboxIncludeExtrema ? 'raw' : 'percentiles'}
                      onChange={(e) => setSandboxIncludeExtrema(e.target.value === 'raw')}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    >
                      <option value="percentiles">5th &amp; 95th Percentiles (ONS Compliant)</option>
                      <option value="raw">Raw Observed Minimum &amp; Maximum (Strictly Blocked)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Underlying Cohort Sample Size (N):
                    </label>
                    <input
                      type="number"
                      value={sandboxMomentsSampleN}
                      onChange={(e) => setSandboxMomentsSampleN(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Mandatory Threshold: &ge; 10 observations</span>
                  </div>
                </div>

                {/* Live Verdict Calculation */}
                {(() => {
                  const extremaPass = !sandboxIncludeExtrema;
                  const samplePass = sandboxMomentsSampleN >= 10;
                  const pass = extremaPass && samplePass;
                  return (
                    <div
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        pass
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5">
                          {pass ? <CheckCircle2 className="w-4 h-4 text-[#047857]" /> : <XCircle className="w-4 h-4 text-red-600" />}
                          <span>Moments Egress Verdict: {pass ? 'SAFE FOR EGRESS' : 'HARD EGRESS BLOCK'}</span>
                        </span>
                        <p className="text-[11px] opacity-90">
                          {!extremaPass && '• CRITICAL VIOLATION: Raw Min and Max detected. Raw extrema are direct microdata observations of single individuals. Must be replaced with 5th & 95th percentiles. '}
                          {!samplePass && `• Cohort sample size ${sandboxMomentsSampleN} is < 10. Summary moments cannot be published on cohorts under 10.`}
                          {pass && '• Satisfies ONS SDC Extrema Rule. Safe for research publication.'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-mono font-bold text-xs uppercase shrink-0 ${
                          pass ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                        }`}
                      >
                        {pass ? 'APPROVED FOR EGRESS' : 'EGRESS BLOCKED'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Python Transformation Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Compliant Summary Moments Pipeline in Python:</span>
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto">
{`# Python Pandas pipeline: enforce percentile bounds instead of raw extrema
def safe_moments_export(df, col_name, min_n=10):
    if len(df[col_name].dropna()) < min_n:
        return {"error": "Sample size < 10: suppressed"}
    return {
        "mean": df[col_name].mean(),
        "std": df[col_name].std(),
        "median": df[col_name].median(),
        "p05": df[col_name].quantile(0.05), # Replaces raw min
        "p95": df[col_name].quantile(0.95), # Replaces raw max
        # Do NOT include df[col_name].min() or df[col_name].max()
    }`}
                </pre>
              </div>
            </div>
          )}

          {/* CLASS 5: VISUALIZATIONS & CHARTS */}
          {selectedSopClass === 'visualizations' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
                  Class 5 SOP Directive · Visualizations, Scatterplots &amp; Diagnostic Plots
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Point scatterplots are strictly prohibited as raw microdata egress</strong>. Rendering individual $(x, y)$ coordinate points reveals exact clinical coordinates (e.g., patient age vs tumor size), allowing adversaries to re-identify patients. To publish visual distributions, researchers must convert scatterplots into <strong>2D density contour maps</strong> or <strong>hexagonal binning (hexbins)</strong> where every visible bin contains $\ge 10$ observations (bins with $1 \le N \le 9$ must be suppressed or grouped). In boxplots, outlier points beyond whiskers must NOT be individually plotted; whiskers must terminate at the 5th and 95th percentiles.
                </p>
              </div>

              {/* Interactive Sandbox Form */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Interactive Visualization Egress Rule Evaluator
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Chart Representation Type:
                    </label>
                    <select
                      value={sandboxPlotType}
                      onChange={(e) => setSandboxPlotType(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    >
                      <option value="hexbin">Hexagonal Binned Heatmap (Hexbin N &ge; 10)</option>
                      <option value="density_contour">2D Density Contour Surface (Continuous Smoothing)</option>
                      <option value="boxplot_clipped">Box-and-Whisker (Outliers Clipped at 5th/95th)</option>
                      <option value="scatterplot">Raw Point Scatterplot (Strictly Prohibited Microdata)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Minimum Observation Count per Visible Cell/Bin:
                    </label>
                    <input
                      type="number"
                      value={sandboxMinBinCount}
                      onChange={(e) => setSandboxMinBinCount(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Mandatory Threshold: &ge; 10 per hexbin</span>
                  </div>
                </div>

                {/* Live Verdict Calculation */}
                {(() => {
                  const isScatter = sandboxPlotType === 'scatterplot';
                  const binPass = sandboxMinBinCount >= 10;
                  const pass = !isScatter && binPass;
                  return (
                    <div
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        pass
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5">
                          {pass ? <CheckCircle2 className="w-4 h-4 text-[#047857]" /> : <XCircle className="w-4 h-4 text-red-600" />}
                          <span>Visualization Verdict: {pass ? 'SAFE FOR EGRESS' : 'DISCLOSURE BLOCKED'}</span>
                        </span>
                        <p className="text-[11px] opacity-90">
                          {isScatter && '• Point scatterplots plot raw patient microdata coordinates and cannot be exported outside the enclave. '}
                          {!binPass && `• Visual bins with count ${sandboxMinBinCount} (< 10) violate primary suppression. `}
                          {pass && '• Satisfies ONS SDC Chapter 5 (Graphic Presentations). Safe for airlock release.'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-mono font-bold text-xs uppercase shrink-0 ${
                          pass ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                        }`}
                      >
                        {pass ? 'APPROVED FOR EGRESS' : 'EGRESS BLOCKED'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* R ggplot2 Hexbin Transformation Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Compliant ggplot2 Hexbinning with Primary Suppression in R:</span>
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto">
{`# R ggplot2: Convert scatterplot to hexbin and suppress bins where count < 10
library(ggplot2)
ggplot(cohort, aes(x = age_years, y = ejection_fraction)) +
  stat_bin_hex(aes(fill = after_stat(ifelse(count < 10, NA, count))), bins = 25) +
  scale_fill_viridis_c(na.value = "transparent", name = "Patients (N >= 10)") +
  theme_minimal() + labs(title = "Safe Binned Clinical Distribution")`}
                </pre>
              </div>
            </div>
          )}

          {/* CLASS 6: MACHINE LEARNING WEIGHTS & SAFE DATA */}
          {selectedSopClass === 'ml_models' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
                  Class 6 SOP Directive · Machine Learning Model Checkpoints &amp; Safe Data Assets
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Model weights, neural embeddings, and gradient-boosted decision trees are classified as <strong>Safe Data Assets</strong>. Complex models memorize sensitive training instances, making raw weights vulnerable to Membership Inference Attacks (MIA) and model inversion attacks. Egress approval requires: <strong>(1) Formal Differential Privacy budget certification (&epsilon; &le; 1.0, &delta; &lt; 10&#8315;&#8309;)</strong>; <strong>(2) Minimum sample count per tree leaf (N_leaf &ge; 10)</strong> to stop isolated patient rules; and <strong>(3) Empirical MIA vulnerability score &le; 60%</strong> (near chance baseline).
                </p>
              </div>

              {/* Interactive Sandbox Form */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Interactive AI Model Weights Egress Rule Evaluator
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Differential Privacy Budget (ε):
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={sandboxEpsilon}
                      onChange={(e) => setSandboxEpsilon(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Mandatory Threshold: &epsilon; &le; 1.0</span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Min Decision Tree Leaf Size (N):
                    </label>
                    <input
                      type="number"
                      value={sandboxLeafN}
                      onChange={(e) => setSandboxLeafN(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Mandatory Threshold: &ge; 10 samples</span>
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      MIA Empirical Vulnerability Score (%):
                    </label>
                    <input
                      type="number"
                      value={sandboxMiaScore}
                      onChange={(e) => setSandboxMiaScore(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Mandatory Threshold: &le; 60%</span>
                  </div>
                </div>

                {/* Live Verdict Calculation */}
                {(() => {
                  const epsPass = sandboxEpsilon <= 1.0;
                  const leafPass = sandboxLeafN >= 10;
                  const miaPass = sandboxMiaScore <= 60;
                  const pass = epsPass && leafPass && miaPass;
                  return (
                    <div
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        pass
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5">
                          {pass ? <CheckCircle2 className="w-4 h-4 text-[#047857]" /> : <XCircle className="w-4 h-4 text-red-600" />}
                          <span>ML Weights Airlock Verdict: {pass ? 'APPROVED' : 'MODEL EGRESS BLOCKED'}</span>
                        </span>
                        <p className="text-[11px] opacity-90">
                          {!epsPass && `• Privacy budget ε = ${sandboxEpsilon} exceeds 1.0 limit. Model memorization risk is unacceptable. `}
                          {!leafPass && `• Minimum leaf size of ${sandboxLeafN} (< 10) allows tree to isolate individual clinical subjects. `}
                          {!miaPass && `• MIA score ${sandboxMiaScore}% exceeds 60% threshold: model vulnerable to membership inference.`}
                          {pass && '• Satisfies ISO 42001 & ONS Safe Data machine learning export standards.'}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-mono font-bold text-xs uppercase shrink-0 ${
                          pass ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100'
                        }`}
                      >
                        {pass ? 'APPROVED FOR EGRESS' : 'EGRESS BLOCKED'}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Python Scikit-Learn / PyTorch DP Snippet */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Enforcing Leaf Bounds &amp; Differential Privacy in Python:</span>
                </span>
                <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-[11px] font-mono text-[#005EB8] dark:text-cyan-300 overflow-x-auto">
{`# 1. Enforce min_samples_leaf >= 10 in gradient boosted trees
from sklearn.ensemble import GradientBoostingClassifier
model = GradientBoostingClassifier(min_samples_leaf=10, max_depth=4)

# 2. For PyTorch neural networks: integrate Opacus with bounded epsilon
from opacus import PrivacyEngine
privacy_engine = PrivacyEngine()
model, optimizer, train_loader = privacy_engine.make_private(
    module=model, optimizer=optimizer, data_loader=train_loader,
    noise_multiplier=1.2, max_grad_norm=1.0, target_epsilon=1.0
)`}
                </pre>
              </div>
            </div>
          )}

          {/* CLASS 7: HYPOTHESIS TESTS & ANOVA */}
          {selectedSopClass === 'hypothesis' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-400 uppercase tracking-wider block">
                  Class 7 SOP Directive · Hypothesis Tests, Chi-Square &amp; ANOVA
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Hypothesis tests (such as Pearson&apos;s $\chi^2$ test, Fisher&apos;s Exact Test, Student&apos;s t-test, and ANOVA F-tests) can disclose small underlying sample counts if full test tables are exported without sanitization. In Chi-Square contingency testing, <strong>all expected cell frequencies must be $\ge 5$</strong>, and total cohort size must be $\ge 10$. Test statistics ($t, F, \chi^2$) and $p$-values are safe to publish provided that degrees of freedom $df \ge 10$ and individual cell counts below 10 remain masked.
                </p>
              </div>

              {/* Decision Rules Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-mono">
                      <th className="py-2.5 px-3">Test Type</th>
                      <th className="py-2.5 px-3">SOP Threshold</th>
                      <th className="py-2.5 px-3">Permitted Egress Elements</th>
                      <th className="py-2.5 px-3">Prohibited Elements</th>
                      <th className="py-2.5 px-3">Airlock Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-[#005EB8] dark:text-sky-400">Chi-Square Test (&chi;&sup2;)</td>
                      <td className="py-3 px-3 font-mono">Expected counts &ge; 5; Total N &ge; 10</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">&chi;&sup2; statistic, p-value, df, and collapsed tables</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Raw 2x2 cells with count &lt; 10</td>
                      <td className="py-3 px-3 font-semibold text-amber-600">Mask Small Cells</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold font-mono text-purple-700 dark:text-purple-400">Student&apos;s t-test / ANOVA</td>
                      <td className="py-3 px-3 font-mono">Residual df &ge; 10; Group N &ge; 10</td>
                      <td className="py-3 px-3 text-[#047857] dark:text-emerald-400">t/F statistics, 95% CI of mean difference, p-value</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400">Single patient observations plotted along axis</td>
                      <td className="py-3 px-3 font-semibold text-[#047857]">Permitted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MACHINE POLICY-AS-CODE (SHACL & OPA REGO) */}
      {activeTab === 'policy_code' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* SHACL Closed-World SDC Shape */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase">
                  W3C SHACL Shape
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  sdc_airlock_shape.ttl
                </h4>
              </div>

              <button
                onClick={() => handleCopy(SHACL_SDC_SNIPPET)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Validates that candidate outputs across all <strong>7 SOP classes</strong> (tabular frequencies, regressions, survival curves, summary extrema, visualizations, ML model weights, and hypothesis tests) strictly satisfy mathematical privacy bounds under closed-world logic.
            </p>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[460px]">
              <code>{SHACL_SDC_SNIPPET}</code>
            </pre>
          </div>

          {/* OPA Rego Airlock SDC Rule */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                  Open Policy Agent (OPA)
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  airlock_sdc.rego (7-Part SOP Engine)
                </h4>
              </div>

              <button
                onClick={() => handleCopy(OPA_SDC_REGO_SNIPPET)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compiled from the semantic ontology to evaluate all <strong>7 SOP classes</strong> in under 1 millisecond at the airlock policy enforcement point (PEP) before cryptographic seal generation.
            </p>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[460px]">
              <code>{OPA_SDC_REGO_SNIPPET}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: 2-PERSON AIRLOCK GATE & SHA-256 SEAL */}
      {activeTab === 'airlock_gate' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider block">
                Two-Person Airlock Review Protocol
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Cryptographic Output Release Gate &amp; Compliance Seal
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={generateCryptographicSeal}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recalculate SHA-256</span>
              </button>

              <button
                onClick={handleDownloadDossier}
                className="px-3.5 py-1.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export SDC Audit Dossier (.md)</span>
              </button>
            </div>
          </div>

          {/* Two-Gate Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gate 1: Machine Validation */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#047857]" />
                  <span>Reviewer 1: Automated SDC Shape PEP</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#047857] dark:text-emerald-300 font-mono text-[10px] font-bold">
                  {tableAnalysis.isCleanAirlock ? 'VERIFIED PASSED' : 'BLOCKED'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automated validation executed against <code>sdc_shapes.ttl</code>. Evaluates that zero unsuppressed cells exist below k ≥ {kThreshold} and dominance ratio is compliant.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <div>Primary Violations: <strong>{suppressionMode === 'raw' ? tableAnalysis.totalPrimaryDisclosive : 0}</strong></div>
                <div>Complementary Suppressions: <strong>{tableAnalysis.totalSecondarySuppressed}</strong></div>
                <div>Status: <strong className="text-[#047857]">{tableAnalysis.isCleanAirlock ? 'CONFORMANT' : 'NON-CONFORMANT'}</strong></div>
              </div>
            </div>

            {/* Gate 2: Human Output Checker */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Users className="w-4 h-4 text-[#005EB8]" />
                  <span>Reviewer 2: Human Output Checker (SDC Lead)</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-[#005EB8] dark:text-sky-300 font-mono text-[10px] font-bold">
                  {reviewer2Approved ? 'APPROVED' : 'PENDING'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Accredited Reviewer Name:
                  </label>
                  <input
                    type="text"
                    value={reviewer2Name}
                    onChange={(e) => setReviewer2Name(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Review Rationale &amp; Audit Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={airlockRationale}
                    onChange={(e) => setAirlockRationale(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Release Ticket */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-white font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>CRYPTOGRAPHIC AIRLOCK RELEASE TICKET</span>
              </span>
              <span>SHA-256 Web Crypto Seal</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Digest:</span>
                <span className="text-emerald-400 break-all select-all">{airlockSealHash}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Sign-off Token:</span>
                <span className="text-cyan-400">sde-airlock-tok-{airlockSealHash.substring(0, 16)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Authority:</span>
                <span className="text-slate-200">ONS SDC Standard · Caldicott Principle 8 · DAAG Mandate D-005</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper icon component for percentages
const PercentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const SHACL_SDC_SNIPPET = `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix tre: <https://w3id.org/wavebound/tre#> .
@prefix sdc: <https://w3id.org/wavebound/sdc#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ==============================================================================
# W3C SHACL SHAPE: 7-PART STATISTICAL DISCLOSURE CONTROL (SDC) AIRLOCK VALIDATOR
# ==============================================================================

sdc:AirlockReleaseShape a sh:NodeShape ;
    sh:targetClass sdc:AirlockReleaseCandidate ;
    sh:message "Airlock candidate failed one or more 7-Part SDC SOP requirements."@en ;

    # --- CLASS 1: TABULAR FREQUENCIES & DOMINANCE ---
    sh:property [
        sh:path sdc:observedMinCellCount ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Class 1: Primary SDC violation — cell counts under 10 must be redacted (<10*)."@en ;
    ] ;
    sh:property [
        sh:path sdc:topContributorDominanceRatio ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 0.80 ;
        sh:message "Class 1: Dominance rule violation — top contributor exceeds 80% ceiling."@en ;
    ] ;

    # --- CLASS 2: REGRESSIONS & ECONOMETRICS ---
    sh:property [
        sh:path sdc:residualDegreesOfFreedom ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Class 2: Regression violation — residual degrees of freedom (N - p) must be >= 10."@en ;
    ] ;
    sh:property [
        sh:path sdc:containsRawResidualPlot ;
        sh:datatype xsd:boolean ;
        sh:hasValue false ;
        sh:message "Class 2: Prohibited scatterplot — residual plots reveal individual microdata."@en ;
    ] ;

    # --- CLASS 3: SURVIVAL ANALYSIS (SPLINE SMOOTHED OR TRUNCATED) ---
    sh:or (
        [
            sh:property [
                sh:path sdc:isSplineOrKernelSmoothed ;
                sh:hasValue true ;
                sh:message "Class 3 Approved: Continuous spline smoothing eliminates discrete mortality steps."@en ;
            ]
        ]
        [
            sh:and (
                [
                    sh:property [
                        sh:path sdc:smallestStepDropEvents ;
                        sh:minInclusive 10 ;
                        sh:message "Class 3: Kaplan-Meier discrete step drops must represent >= 10 deaths."@en ;
                    ]
                ]
                [
                    sh:property [
                        sh:path sdc:tailRiskSetCount ;
                        sh:minInclusive 10 ;
                        sh:message "Class 3: Tail risk set must be >= 10 or curve truncated."@en ;
                    ]
                ]
            )
        ]
    ) ;

    # --- CLASS 4: SUMMARY MOMENTS & EXTREMA ---
    sh:property [
        sh:path sdc:rawExtremaIncluded ;
        sh:datatype xsd:boolean ;
        sh:hasValue false ;
        sh:message "Class 4: Extrema violation — raw Min/Max strictly prohibited; replace with 5th/95th percentiles."@en ;
    ] ;
    sh:property [
        sh:path sdc:momentsCohortSize ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Class 4: Moments violation — summary statistics require cohort size >= 10."@en ;
    ] ;

    # --- CLASS 5: CHARTS & VISUALIZATIONS ---
    sh:property [
        sh:path sdc:chartType ;
        sh:not [ sh:in ( "Scatterplot" "RawDotPlot" "UnbinnedSwarm" ) ] ;
        sh:message "Class 5: Chart violation — raw microdata scatterplots strictly prohibited; use hexbin/2D density (N >= 10)."@en ;
    ] ;

    # --- CLASS 6: MACHINE LEARNING MODEL WEIGHTS ---
    sh:property [
        sh:path sdc:differentialPrivacyEpsilon ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 1.0 ;
        sh:message "Class 6: Model violation — differential privacy budget epsilon must be <= 1.0."@en ;
    ] ;
    sh:property [
        sh:path sdc:minTreeLeafSampleCount ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Class 6: Model violation — decision tree leaves must contain >= 10 samples."@en ;
    ] ;
    sh:property [
        sh:path sdc:miaVulnerabilityScore ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 0.60 ;
        sh:message "Class 6: Model violation — membership inference vulnerability must be <= 60%."@en ;
    ] ;

    # --- CLASS 7: HYPOTHESIS TESTS & CONTINGENCY TABLES ---
    sh:property [
        sh:path sdc:minExpectedCellFrequency ;
        sh:datatype xsd:decimal ;
        sh:minInclusive 5.0 ;
        sh:message "Class 7: Test violation — chi-square expected cell frequencies must be >= 5.0."@en ;
    ] .`;

const OPA_SDC_REGO_SNIPPET = `package wavebound.airlock.sdc

import future.keywords.in

default allow_airlock_release = false

# ==============================================================================
# OPA REGO: 7-PART STATISTICAL DISCLOSURE CONTROL (SDC) POLICY ENFORCEMENT POINT
# ==============================================================================

# Class 1: Tabular cell frequency (k >= 10) & Dominance (<= 80%)
class1_tabular_passed {
    disclosive_cells := [c | c := input.matrix.cells[_]; c.value > 0; c.value < 10; not c.suppressed]
    count(disclosive_cells) == 0
    top_share_valid
}
top_share_valid {
    input.metric_type == "count"
}
top_share_valid {
    input.metric_type == "continuous"
    input.top_contributor_share <= 0.80
}

# Class 2: Regression residual df >= 10 and no raw residual scatterplots
class2_regression_passed {
    input.artifact_type != "regression"
}
class2_regression_passed {
    input.artifact_type == "regression"
    input.residual_degrees_of_freedom >= 10
    input.contains_raw_residual_scatterplot == false
}

# Class 3: Survival curve step >= 10 OR continuous spline/kernel smoothed
class3_survival_passed {
    input.artifact_type != "survival"
}
class3_survival_passed {
    input.artifact_type == "survival"
    input.is_spline_or_kernel_smoothed == true
}
class3_survival_passed {
    input.artifact_type == "survival"
    input.is_spline_or_kernel_smoothed == false
    input.smallest_step_drop_events >= 10
    input.tail_risk_set_count >= 10
}

# Class 4: Summary moments strictly suppress raw Min/Max
class4_extrema_passed {
    input.artifact_type != "moments"
}
class4_extrema_passed {
    input.artifact_type == "moments"
    input.raw_extrema_included == false
    input.moments_sample_n >= 10
}

# Class 5: Visualizations forbid raw scatterplots; hexbins must have count >= 10
class5_visualizations_passed {
    input.artifact_type != "visualization"
}
class5_visualizations_passed {
    input.artifact_type == "visualization"
    not input.chart_type in ["Scatterplot", "RawDotPlot", "UnbinnedSwarm"]
    input.min_hexbin_bin_count >= 10
}

# Class 6: ML weights require DP epsilon <= 1.0, min leaf >= 10, MIA <= 60%
class6_ml_weights_passed {
    input.artifact_type != "ml_weights"
}
class6_ml_weights_passed {
    input.artifact_type == "ml_weights"
    input.differential_privacy_epsilon <= 1.0
    input.min_tree_leaf_samples >= 10
    input.mia_vulnerability_score <= 0.60
}

# Class 7: Hypothesis testing expected cell counts >= 5
class7_hypothesis_passed {
    input.artifact_type != "hypothesis_test"
}
class7_hypothesis_passed {
    input.artifact_type == "hypothesis_test"
    input.min_expected_cell_frequency >= 5.0
    input.degrees_of_freedom >= 10
}

# Master Airlock Release Evaluation across all 7 SOP Classes
all_7_sop_classes_passed {
    class1_tabular_passed
    class2_regression_passed
    class3_survival_passed
    class4_extrema_passed
    class5_visualizations_passed
    class6_ml_weights_passed
    class7_hypothesis_passed
}

# Final Decision: Automated 7-Class evaluation AND 2-Person Cryptographic Seal
allow_airlock_release {
    all_7_sop_classes_passed
    input.human_reviewer_accredited == true
    input.airlock_seal_valid == true
}`;
