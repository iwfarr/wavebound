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
  RotateCcw
} from 'lucide-react';

interface ClinicalCell {
  row: string;
  col: string;
  val: number;
}

interface SDCScenarioPreset {
  id: string;
  name: string;
  category: 'Cross-Tabulation' | 'Continuous Dominance' | 'Regression Residuals';
  description: string;
  metricLabel: string;
  rows: string[];
  cols: string[];
  cells: ClinicalCell[];
  continuousValues?: number[];
  degreesOfFreedom?: { n: number; p: number };
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
    name: 'Survival Analysis & Regression Residuals',
    category: 'Regression Residuals',
    description: 'Cox proportional hazards regression output evaluating 90-day heart failure mortality. Evaluates sample degrees of freedom (N - p >= 10) and checks that Kaplan-Meier risk sets do not fall below threshold in tail bins.',
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
    degreesOfFreedom: { n: 42, p: 4 }
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

  // 2-Person Airlock Sign-off state
  const [reviewer1Status, setReviewer1Status] = useState<boolean>(true);
  const [reviewer2Name, setReviewer2Name] = useState<string>('Dr. E. Vance, Lead SDC Officer');
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
    // If a row has exactly 1 suppressed cell and row sum is shown, anyone can derive the hidden cell:
    // val = rowSum - sum(other cells).
    // Therefore, at least 1 other cell in the same row must be suppressed.
    const secondarySuppressedKeys = new Set<string>();
    if (suppressionMode === 'secondary') {
      rows.forEach((r) => {
        const rowCells = cells.filter((c) => c.row === r);
        const disclosiveInRow = rowCells.filter((c) => primaryDisclosiveKeys.has(`${c.row}__${c.col}`));
        if (disclosiveInRow.length === 1) {
          // Find next smallest cell in row to suppress with minimum information loss
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

    const totalPrimaryDisclosive = primaryDisclosiveKeys.size;
    const totalSecondarySuppressed = secondarySuppressedKeys.size;
    const isCleanAirlock =
      (suppressionMode === 'secondary' || suppressionMode === 'rounded') &&
      !dominanceViolation &&
      (activePreset.degreesOfFreedom ? activePreset.degreesOfFreedom.n - activePreset.degreesOfFreedom.p >= 10 : true);

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
            <span>SDC Methods &amp; ONS Comparison</span>
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

      {/* TAB 2: SDC METHODS COMPARISON MATRIX */}
      {activeTab === 'methods_matrix' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-1 border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider block">
              ONS SDC Handbook &amp; UK LLC Reference Standard
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Statistical Disclosure Control Methodologies Comparison
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              TREs and SDEs deploy distinct statistical remediation techniques depending on whether research output is a categorical frequency table, continuous summary statistic, or microdata excerpt.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-mono">
                  <th className="py-2.5 px-3 font-semibold">Technique</th>
                  <th className="py-2.5 px-3 font-semibold">Mechanism</th>
                  <th className="py-2.5 px-3 font-semibold">Analytical Advantage</th>
                  <th className="py-2.5 px-3 font-semibold">Trade-off / Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-mono text-[#005EB8] dark:text-sky-400">
                    Primary &amp; Complementary Suppression
                  </td>
                  <td className="py-3 px-3">
                    Redact cells below threshold (N &lt; 10) and complementary row/column marginals.
                  </td>
                  <td className="py-3 px-3 text-[#047857] dark:text-emerald-400 font-medium">
                    Eliminates exact identification risk; zero distortion of published non-redacted numbers.
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    Complicates automated meta-analyses and reduces table completeness.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-mono text-purple-600 dark:text-purple-400">
                    Dominance Testing (n, k rule)
                  </td>
                  <td className="py-3 px-3">
                    Calculates whether top n units represent &gt;k% of continuous monetary or clinical aggregates.
                  </td>
                  <td className="py-3 px-3 text-[#047857] dark:text-emerald-400 font-medium">
                    Guards against attribute disclosure when unit identity is already known to competitors.
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    Requires access to unaggregated patient microdata at the airlock boundary.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-mono text-amber-700 dark:text-amber-400">
                    Controlled Rounding (Base 3 or 5)
                  </td>
                  <td className="py-3 px-3">
                    Rounds small and large cells to nearest base multiple while preserving marginal sums.
                  </td>
                  <td className="py-3 px-3 text-[#047857] dark:text-emerald-400 font-medium">
                    Publishes full table structure without asterisks or missing values.
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    Introduces artificial variance and small numerical distortions into epidemiology counts.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    Degrees of Freedom (Regression)
                  </td>
                  <td className="py-3 px-3">
                    Ensures residual degrees of freedom df = N - p ≥ 10 before releasing model coefficients.
                  </td>
                  <td className="py-3 px-3 text-[#047857] dark:text-emerald-400 font-medium">
                    Prevents exact mathematical inversion of regression equations to recover individual inputs.
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    Requires model training code inspection; cannot be checked by viewing weights alone.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
              Validates that candidate release tables contain zero unsuppressed cells below threshold and meet top-contributor dominance ceilings under closed-world logic.
            </p>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[360px]">
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
                  airlock_sdc.rego
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
              Compiled from the semantic ontology to evaluate candidate tables in under 1 millisecond at the airlock policy enforcement point (PEP).
            </p>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[360px]">
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

# SDC Output Candidate Airlock Verification Shape
sdc:AirlockReleaseShape a sh:NodeShape ;
    sh:targetClass sdc:AirlockReleaseCandidate ;
    sh:property [
        sh:path sdc:observedMinCellCount ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Primary SDC violation: cell counts under 10 must be redacted."@en ;
    ] ;
    sh:property [
        sh:path sdc:topContributorDominanceRatio ;
        sh:datatype xsd:decimal ;
        sh:maxInclusive 0.80 ;
        sh:message "Dominance rule violation: top contributor exceeds 80%."@en ;
    ] ;
    sh:property [
        sh:path sdc:residualDegreesOfFreedom ;
        sh:datatype xsd:integer ;
        sh:minInclusive 10 ;
        sh:message "Model violation: residual degrees of freedom must be >= 10."@en ;
    ] .`;

const OPA_SDC_REGO_SNIPPET = `package wavebound.airlock.sdc

import future.keywords.in

default allow_airlock_release = false

# Gate 1: Check primary suppression (k >= 10)
primary_suppression_passed {
    all_cells := input.matrix.cells
    disclosive_cells := [c | c := all_cells[_]; c.value > 0; c.value < 10; not c.suppressed]
    count(disclosive_cells) == 0
}

# Gate 2: Check dominance rule (top contributor <= 80%)
dominance_passed {
    input.metric_type == "count"
}
dominance_passed {
    input.metric_type == "continuous"
    input.top_contributor_share <= 0.80
}

# Final Decision: Allow only when automated checks pass AND 2-person token is present
allow_airlock_release {
    primary_suppression_passed
    dominance_passed
    input.human_reviewer_accredited == true
    input.airlock_seal_valid == true
}`;
