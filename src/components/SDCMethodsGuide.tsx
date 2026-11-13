import React, { useState } from 'react';
import {
  ShieldAlert,
  Calculator,
  Table as TableIcon,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Filter,
  Eye,
  EyeOff,
  GitBranch,
  Network,
  Users
} from 'lucide-react';

interface SDCComparisonRow {
  technique: string;
  category: 'Suppression' | 'Aggregation' | 'Perturbation' | 'Synthetic';
  primaryMechanism: string;
  mainAdvantage: string;
  keyLimitation: string;
}

const COMPARISON_MATRIX: SDCComparisonRow[] = [
  {
    technique: 'Primary & Secondary Suppression',
    category: 'Suppression',
    primaryMechanism: 'Redact cells below threshold (N < 5 or N < 10) and complementary marginals',
    mainAdvantage: 'Prevents exact identification and attribute disclosure from row/column sums',
    keyLimitation: 'Reduces table utility and complicates automated missing data handling'
  },
  {
    technique: 'Category Aggregation',
    category: 'Aggregation',
    primaryMechanism: 'Group geographical, temporal, or demographic bands into broader categories',
    mainAdvantage: 'Preserves overall population totals and marginal mathematical consistency',
    keyLimitation: 'Eliminates localized, high-resolution, or fine subgroup detail'
  },
  {
    technique: 'Perturbation & Controlled Rounding',
    category: 'Perturbation',
    primaryMechanism: 'Adjust cell values by calibrated random noise or round to fixed base (e.g. base 3 or 5)',
    mainAdvantage: 'Allows publication of complete table layouts without asterisks or blank cells',
    keyLimitation: 'Distorts precise counts in tiny subgroups; introduces artificial variance'
  },
  {
    technique: 'Synthetic Microdata',
    category: 'Synthetic',
    primaryMechanism: 'Generate artificial datasets statistically matching real multivariate distributions',
    mainAdvantage: 'Zero risk of direct individual identification from released microdata records',
    keyLimitation: 'Requires complex generative modeling; may fail to capture rare interactions'
  }
];

export const SDCMethodsGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'techniques' | 'matrix' | 'statbarn' | 'low-count' | 'governance' | 'simulator'>('techniques');
  const [copied, setCopied] = useState(false);
  const [simulatorMode, setSimulatorMode] = useState<'raw' | 'primary' | 'secondary' | 'rounded'>('raw');
  const [tableFilter, setTableFilter] = useState<string>('All');

  const renderSimCell = (val: number, isPrimaryDisclosive: boolean, isSecondarySuppressed: boolean) => {
    if (simulatorMode === 'raw') {
      return (
        <span className={isPrimaryDisclosive ? 'text-amber-800 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700' : 'text-slate-800 dark:text-slate-200'}>
          {val}
        </span>
      );
    }
    if (simulatorMode === 'primary') {
      if (isPrimaryDisclosive) {
        return <span className="text-red-700 dark:text-red-400 font-extrabold bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded border border-red-300 dark:border-red-700">&lt;10 *</span>;
      }
      return <span className="text-slate-800 dark:text-slate-200">{val}</span>;
    }
    if (simulatorMode === 'secondary') {
      if (isPrimaryDisclosive) {
        return <span className="text-red-700 dark:text-red-400 font-extrabold bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded border border-red-300 dark:border-red-700">&lt;10 *</span>;
      }
      if (isSecondarySuppressed) {
        return <span className="text-amber-800 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700">SUPP *</span>;
      }
      return <span className="text-slate-800 dark:text-slate-200">{val}</span>;
    }
    if (simulatorMode === 'rounded') {
      const rounded = Math.round(val / 5) * 5;
      return (
        <span className="text-[#005EB8] dark:text-sky-300 font-semibold bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-700">
          {rounded}
        </span>
      );
    }
    return <span>{val}</span>;
  };

  const handleCopyMarkdown = () => {
    const markdownContent = `# Statistical Disclosure Control (SDC) & Low-Count Analytical Guide

A practitioner reference standard for population data research organizations, epidemiologists, data stewards, and governance committees.

## 1. Small Cell Disclosure Risks (N < 5 or N < 10)
When presenting aggregate tables or public reports containing small cell counts, specific disclosure control methods prevent re-identification through direct identification or indirect deduction.

## 2. Core SDC Techniques
- Cell Suppression: Primary (redacting N < 10) and Secondary / Complementary Suppression (masking totals/adjacent cells to prevent subtraction deduction).
- Data Aggregation: Spatial Aggregation (counties/regions instead of postal districts), Temporal Aggregation (3- or 5-year moving averages), Demographic Recoding (broader age bands, top-level ICD chapters).
- Data Perturbation & Noise: Targeted / Controlled Rounding (base 3 or 5), Random Swapping / PRAM, and Differential Privacy (Laplace / Gaussian calibrated noise).

## 3. Methodological Approaches for Low-Count Data
- Bayesian Hierarchical Modeling: Borrowing strength via Empirical Bayes and Spatial Conditional Autoregressive (CAR) models to smooth rate volatility.
- International Consortia & Multi-Center Registries: Standardized protocols pooling rare condition cohorts globally with uniform governance.
- Qualitative & Mixed-Methods Frameworks: Structured case series, process tracing, and Qualitative Comparative Analysis (QCA) when N < 30.

## 4. Data Governance & Safe Access Models
- Five Safes Framework: Safe People, Safe Projects, Safe Settings, Safe Data, Safe Outputs.
- Secure Data Enclaves: Zero-egress sovereign analytical environments.
- Output Checking: Independent disclosure control clearance before external release across the 5 Statbarns (Frequencies, Position & Quantiles, Means & Totals, Correlation, Shape & Survival).
- Federated Non-Disclosive Execution (DataSHIELD): Server-side nfilter disclosure traps for structured distributed multi-node statistics without pooling microdata.`;

    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredMatrix = COMPARISON_MATRIX.filter(row => {
    if (tableFilter === 'All') return true;
    return row.category === tableFilter;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F294A] dark:text-sky-400">
              <Calculator className="w-4 h-4 text-[#005EB8]" />
              <span>Practitioner Reference &amp; Operational SOP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Statistical Disclosure Control (SDC) &amp; Low-Count Methods
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Standard operating procedures for presenting aggregate tables, public reports, and epidemiological analyses containing small cell counts (N &lt; 5 or N &lt; 10), preventing re-identification while preserving scientific validity.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5 text-[#005EB8]" />}
              <span>{copied ? 'Copied SOP to Clipboard!' : 'Copy Markdown SOP'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'techniques'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>SDC Techniques</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Comparison Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('statbarn')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'statbarn'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Statbarn Output Taxonomy</span>
          </button>

          <button
            onClick={() => setActiveTab('low-count')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'low-count'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Low-Count Methodologies</span>
          </button>

          <button
            onClick={() => setActiveTab('governance')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'governance'
                ? 'bg-[#0F294A] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Safe Access Models</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-[#047857] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Techniques */}
      {activeTab === 'techniques' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cell Suppression - pale amber card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                  <EyeOff className="w-4 h-4 text-amber-600" />
                  <span>1. Cell Suppression</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Hiding Disclosive Counts</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Directly suppresses low numbers to prevent re-identification through direct observation or indirect arithmetic deduction.
                </p>
                <div className="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Primary Suppression</strong>
                    Replacing counts below threshold (N &lt; 5 or N &lt; 10) with masking symbols (e.g. &ldquo;*&rdquo; or &ldquo;&lt;10&rdquo;).
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Secondary (Complementary) Suppression</strong>
                    Masking adjacent non-sensitive cells within the same row or column to prevent calculating the suppressed value using marginal totals.
                  </div>
                </div>
              </div>
            </div>

            {/* Data Aggregation - pale purple card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-purple-700" />
                  <span>2. Data Aggregation</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Grouping Granular Categories</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Collapses granular observations into broader categorical buckets to elevate small frequencies safely above threshold.
                </p>
                <div className="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Spatial Aggregation</strong>
                    Reporting data at county, regional, or ICB boundaries rather than census output areas or postal districts.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Temporal Aggregation</strong>
                    Pooling counts across 3-year or 5-year moving averages instead of volatile monthly counts.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Demographic Recoding</strong>
                    Grouping narrow single-year age brackets into 10-year bands or aggregating rare diagnostic subcodes into parent chapters.
                  </div>
                </div>
              </div>
            </div>

            {/* Data Perturbation - pale HDRUK green card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#047857] dark:text-emerald-300 uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-[#047857]" />
                  <span>3. Perturbation &amp; Noise</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Mathematical Modification</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Injects controlled noise or rounds counts to obscure exact frequencies while preserving distribution and statistical properties.
                </p>
                <div className="space-y-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Controlled Rounding</strong>
                    Rounding all table values to a predetermined base (e.g. base 3 or base 5), ensuring row and column totals align.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Random Swapping / PRAM</strong>
                    Post-Randomization Method swapping select attribute values between similar records to provide plausible deniability.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Differential Privacy</strong>
                    Injecting mathematically calibrated noise ensuring an individual&rsquo;s presence cannot be inferred with certainty.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical Plots & Visualisations SDC Mandate Callout */}
          <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Critical Mandate: SDC Applies Equally to Graphical Plots &amp; Visualisations</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-amber-100 leading-relaxed">
              Disclosure control does not stop at tabular numbers. Visualisations such as <strong>scatter plots</strong>, <strong>Kaplan-Meier survival curves</strong>, and <strong>box plots</strong> carry identical re-identification liabilities under UK GDPR if they render single patient points or tail events with fewer than 10 patients at risk.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-900 dark:text-white font-semibold block text-[11px]">Scatter Plots</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed block">
                  Individual (x, y) coordinates must be converted to 2D hexbins or density contours where every bin represents &ge; 10 patients.
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-900 dark:text-white font-semibold block text-[11px]">Survival Curves</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed block">
                  Right-censored tails must be truncated or blurred once the at-risk patient count falls below 10, preventing death date extraction.
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-900 dark:text-white font-semibold block text-[11px]">Same PaC Engine</span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed block">
                  The Wavebound OPA PDP parses plot metadata ASTs and enforces identical k ≥ 10 rules prior to airlock export sign-off.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Comparison Matrix Table */}
      {activeTab === 'matrix' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">SDC Technique Trade-Off Matrix</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Comparing mechanism, utility advantages, and operational limitations across techniques.</p>
            </div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Filter Category:</span>
              {['All', 'Suppression', 'Aggregation', 'Perturbation', 'Synthetic'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setTableFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    tableFilter === cat
                      ? 'bg-[#0F294A] text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">SDC Technique</th>
                  <th className="py-3 px-4">Primary Mechanism</th>
                  <th className="py-3 px-4 text-[#047857] dark:text-emerald-400">Main Advantage</th>
                  <th className="py-3 px-4 text-amber-800 dark:text-amber-400">Key Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {filteredMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#005EB8]" />
                        <span>{row.technique}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 leading-relaxed max-w-xs">{row.primaryMechanism}</td>
                    <td className="py-3.5 px-4 text-[#047857] dark:text-emerald-300 font-medium leading-relaxed max-w-xs">{row.mainAdvantage}</td>
                    <td className="py-3.5 px-4 text-amber-800 dark:text-amber-300 leading-relaxed max-w-xs">{row.keyLimitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2b: Statbarn Output Taxonomy & Federated Non-Disclosive Execution */}
      {activeTab === 'statbarn' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                SDAP &amp; DARE UK SACRO Standard
              </span>
              <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                5 Canonical Statistical Barns (outputchecking.org)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Statbarn Classification &amp; Semi-Automated Airlock Checking
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              Developed by the Safe Data Access Professionals (SDAP) community and Safe Researcher Training, the <strong>Statbarn</strong> taxonomy groups arbitrary research outputs into five structural families (&ldquo;barns&rdquo;) that share identical disclosure mathematics. Automated Policy-as-Code airlocks (including DARE UK SACRO and Wavebound OPA Rego gates) route candidate files to the matching barn validator rather than treating every chart as an ad-hoc exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                barn: 'Barn 1 · Frequencies & Counts',
                examples: 'Cross-tabulations, histograms, cohort consort flowcharts, bar charts',
                primaryRisk: 'Small cells (N < 10), residual differencing across margins, structural vs sampling zeros',
                control: 'Primary suppression (N < 10), complementary secondary suppression, or controlled rounding to base 3 / base 5.'
              },
              {
                barn: 'Barn 2 · Position & Quantiles',
                examples: 'Medians, quartiles, IQR, box plots, minimum/maximum extrema',
                primaryRisk: 'Unweighted min/max values expose exact extreme outlier patient measurements',
                control: 'Suppress raw Min/Max; allow smoothed medians/percentiles only when underlying bin N ≥ 10.'
              },
              {
                barn: 'Barn 3 · Means, Totals & Ratios',
                examples: 'Group means, weighted sums, clinical spend totals, incidence rates',
                primaryRisk: 'Dominance (1–2 outliers drive > 80% of sum) allowing subtraction estimation (p%-rule)',
                control: 'Verify (1, 80%) and (2, 90%) dominance limits; suppress or winzorize concentrated subgroups.'
              },
              {
                barn: 'Barn 4 · Correlation & Covariance',
                examples: 'Pearson/Spearman matrices, variance-covariance tables, PCA loadings',
                primaryRisk: 'High-collinearity near-1.0 fits reconstructing excluded variables from remaining fields',
                control: 'Enforce minimum residual degrees of freedom (df ≥ 10) and reject identity/rank-deficient matrices.'
              },
              {
                barn: 'Barn 5 · Shape, Regression & Survival',
                examples: 'Kaplan-Meier curves, Cox PH models, GLMs, residual plots, ROC curves',
                primaryRisk: 'Single-patient KM step drops leaking death dates; raw scatter/residual points exposing microdata',
                control: 'Require smoothed/binned survival steps or tail truncation (at-risk N ≥ 10); block raw scatter plots.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#0F294A] dark:text-sky-300 block">{item.barn}</span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Outputs:</strong> {item.examples}
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300">
                    <strong>Disclosure Risk:</strong> {item.primaryRisk}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-[#047857] dark:text-emerald-300 font-medium">
                  <strong>Airlock Mitigation:</strong> {item.control}
                </div>
              </div>
            ))}

            {/* Scope Companion: Federated DataSHIELD */}
            <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/70 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#005EB8] dark:text-sky-300">
                  <Network className="w-4 h-4 shrink-0" />
                  <span>Companion Pattern: DataSHIELD Federated SDC</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  For multi-node federated studies that do not require an interactive workspace IDE or generative coding loop, <strong>DataSHIELD</strong> executes pre-approved non-disclosive server-side R functions at each custodian node and returns only aggregate summary statistics.
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Built-in <code className="font-mono text-[#005EB8] dark:text-sky-300">nfilter</code> disclosure traps (e.g. <code className="font-mono">nfilter.tab</code>, <code className="font-mono">nfilter.subset</code>, <code className="font-mono">nfilter.glm</code>) reject small-cell subsets or over-parameterized regressions before results leave the node—complementing airlock SDC for interactive enclaves.
                </p>
              </div>
              <div className="pt-2 border-t border-sky-200 dark:border-sky-800/60 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                Scope boundary: Structured federated API calls only (complements, does not replace, enclave IDEs &amp; LLMs).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Methodological Approaches for Low-Count Data */}
      {activeTab === 'low-count' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Methodological Approaches for Sparse &amp; Low-Count Data</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Analyzing small cohorts without sacrificing statistical rigor requires specialized frameworks designed for sparse event counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-[#005EB8]" />
                <span>Bayesian Hierarchical Modeling</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Borrowing Strength Across Areas</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Employs Empirical Bayes and Spatial Conditional Autoregressive (CAR) models to smooth extreme, unstable rate estimates across sparse geographical areas or rare subgroups toward a common global or neighborhood mean.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-[#005EB8] dark:text-sky-300 font-mono">
                theta_i ~ Normal(mu, sigma^2) + Spatial_CAR(W)
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#f0fdf9] dark:bg-slate-900 border border-[#a7f3d0] dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#047857]" />
                <span>International Consortia &amp; Registries</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Center Sample Aggregation</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Utilizes harmonized protocols across multi-center cohorts and international rare disease registries to aggregate sample sizes globally while enforcing uniform data protection and safe governance standards.
              </p>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-[#a7f3d0] dark:border-slate-700 text-[11px] text-[#065f46] dark:text-emerald-300 font-mono">
                Federated aggregation with localized privacy preservation
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#faf5ff] dark:bg-slate-900 border border-[#e9d5ff] dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-400 uppercase tracking-wider">
                <GitBranch className="w-4 h-4 text-purple-700" />
                <span>Qualitative &amp; Mixed Methods</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Small Cohort Rigor (N &lt; 30)</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                When cohort sizes are too small for frequentist significance testing, structured methods (such as detailed case series, process tracing, or Qualitative Comparative Analysis [QCA]) identify necessary and sufficient conditions without requiring massive sample power.
              </p>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-[#e9d5ff] dark:border-slate-700 text-[11px] text-purple-900 dark:text-purple-300 font-mono">
                Set-theoretic truth tables &amp; Boolean minimization
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Safe Access Models */}
      {activeTab === 'governance' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Data Governance &amp; Safe Access Models</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When raw microdata must be analyzed in its unmasked form, controlled access enclaves replace open public data release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#005EB8] dark:text-sky-400 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-[#005EB8]" />
                <span>The Five Safes Framework</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Comprehensive Access Control</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Evaluates data access across five integrated operational dimensions: Safe People (vetted researchers), Safe Projects (public-benefit purpose), Safe Settings (isolated compute), Safe Data (de-identified files), and Safe Outputs (SDC-screened results).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f0fdf9] dark:bg-slate-900 border border-[#a7f3d0] dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider">
                <Network className="w-4 h-4 text-[#047857]" />
                <span>Secure Enclaves</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero-Egress Compute Enclaves</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Partitioned virtual environments allowing statistical code execution on unmasked microdata without permitting raw files to leave the secure server. Ingress and egress are strictly gated by policy decision points.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>Output Checking &amp; Airlocks</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dual Verification Gateways</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                All generated tables, regression coefficients, and visual plots pass automated threshold validation and undergo independent disclosure control review by trained data custodians before export authorization is granted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Interactive Simulator */}
      {activeTab === 'simulator' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Interactive Cell Suppression &amp; Rounding Simulator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Observe how primary suppression, secondary suppression, and controlled rounding prevent re-identification on a sample 2x2 frequency table.
              </p>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setSimulatorMode('raw')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  simulatorMode === 'raw'
                    ? 'bg-[#0F294A] text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Raw Data (N=3 Risk)
              </button>

              <button
                onClick={() => setSimulatorMode('primary')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  simulatorMode === 'primary'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Primary (&lt;10 *)
              </button>

              <button
                onClick={() => setSimulatorMode('secondary')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  simulatorMode === 'secondary'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Primary + Secondary
              </button>

              <button
                onClick={() => setSimulatorMode('rounded')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  simulatorMode === 'rounded'
                    ? 'bg-[#005EB8] text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Base 5 Rounding
              </button>
            </div>
          </div>

          {/* Interactive Table Display */}
          <div className="p-6 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase">
                    <th className="py-2.5 px-4 text-left">Geographic Region</th>
                    <th className="py-2.5 px-4">Cohort Subgroup A</th>
                    <th className="py-2.5 px-4">Cohort Subgroup B</th>
                    <th className="py-2.5 px-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">Row Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="py-3 px-4 text-left font-sans font-medium text-slate-800 dark:text-slate-300">Region 1 (Sparse Cohort)</td>
                    <td className="py-3 px-4">{renderSimCell(3, true, false)}</td>
                    <td className="py-3 px-4">{renderSimCell(24, false, true)}</td>
                    <td className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-200">
                      {simulatorMode === 'rounded' ? '25' : (simulatorMode === 'secondary' ? 'SUPP *' : '27')}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left font-sans font-medium text-slate-800 dark:text-slate-300">Region 2 (Dense Cohort)</td>
                    <td className="py-3 px-4">{renderSimCell(18, false, true)}</td>
                    <td className="py-3 px-4">{renderSimCell(45, false, false)}</td>
                    <td className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-200">
                      {simulatorMode === 'rounded' ? '65' : '63'}
                    </td>
                  </tr>
                  <tr className="bg-slate-100 dark:bg-slate-900 border-t-2 border-slate-300 dark:border-slate-700 font-bold">
                    <td className="py-3 px-4 text-left font-sans text-slate-900 dark:text-slate-100">Column Total</td>
                    <td className="py-3 px-4">
                      {simulatorMode === 'rounded' ? '20' : (simulatorMode === 'secondary' ? 'SUPP *' : '21')}
                    </td>
                    <td className="py-3 px-4">
                      {simulatorMode === 'rounded' ? '70' : '69'}
                    </td>
                    <td className="py-3 px-4 text-[#005EB8] dark:text-sky-400">
                      {simulatorMode === 'rounded' ? '90' : '90'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Explanation of Current State */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed space-y-1.5">
              {simulatorMode === 'raw' && (
                <div className="flex items-start gap-2 text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>Disclosure Vulnerability:</strong> In Region 1 Subgroup A, only 3 individuals are counted (N &lt; 10). If an adversary knows a specific participant was in Region 1, they can deduce individual participation or health status.
                  </div>
                </div>
              )}
              {simulatorMode === 'primary' && (
                <div className="flex items-start gap-2 text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>Arithmetic Deduction Risk:</strong> Primary suppression masks the 3 as &ldquo;&lt;10 *&rdquo;. However, because the Row Total is 27 and Subgroup B is 24, an attacker simply calculates: <code>27 - 24 = 3</code>, defeating primary suppression.
                  </div>
                </div>
              )}
              {simulatorMode === 'secondary' && (
                <div className="flex items-start gap-2 text-[#047857] dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#047857]" />
                  <div>
                    <strong>Fully Protected:</strong> Secondary suppression masks complementary cells (Region 1 Subgroup B: 24, and Region 2 Subgroup A: 18, plus marginal totals). An attacker cannot deduce the true count of 3 from any linear combination of rows or columns.
                  </div>
                </div>
              )}
              {simulatorMode === 'rounded' && (
                <div className="flex items-start gap-2 text-[#005EB8] dark:text-sky-300">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#005EB8]" />
                  <div>
                    <strong>Controlled Base 5 Rounding:</strong> All cell values are rounded to multiples of 5 (3 becomes 5, 24 becomes 25, 18 becomes 20, 45 remains 45). Marginal totals are adjusted to preserve consistency without blanking cells.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
