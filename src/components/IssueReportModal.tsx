import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquarePlus,
  CheckCircle2,
  Copy,
  Check,
  Download,
  AlertCircle,
  Send
} from 'lucide-react';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArea?: string;
}

const ISSUE_CATEGORIES = [
  'Plain-English & Accessibility Clarity',
  'Governance / Statutory Correction',
  'Policy-as-Code (SHACL / Rego) Suggestion',
  'Glossary or Further Resources Addition',
  'UI / Contrast / Navigation Bug'
] as const;

const AFFECTED_AREAS = [
  'Overview',
  'PaC Playbook',
  'Foundations',
  'Concepts Visual Primer',
  'Govern & Assure / Statbarn SDC',
  'OPA Rego Sandbox',
  'Ontology Topology Graph',
  'Build & Deploy',
  'Enclave & LLM Security',
  'Further Resources & Standards',
  'Glossary',
  'Quiz',
  'Other / General'
] as const;

const CONTRIBUTOR_ROLES = [
  'Prefer not to say',
  'Patient / Public Contributor',
  'Researcher / Analyst',
  'IG Lead / Caldicott Guardian / REC',
  'Platform / Security Engineer'
] as const;

interface SubmittedIssue {
  id: string;
  title: string;
  category: string;
  area: string;
  role: string;
  description: string;
  contact?: string;
  createdAt: string;
  markdown: string;
}

export const IssueReportModal: React.FC<IssueReportModalProps> = ({
  isOpen,
  onClose,
  defaultArea = 'Overview'
}) => {
  const [category, setCategory] = useState<string>(ISSUE_CATEGORIES[0]);
  const [area, setArea] = useState<string>(defaultArea);
  const [role, setRole] = useState<string>(CONTRIBUTOR_ROLES[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedIssue, setSubmittedIssue] = useState<SubmittedIssue | null>(null);
  const [copiedMd, setCopiedMd] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildMarkdown = (id: string, createdAt: string) => {
    return `### ${title.trim()}

- **Issue Reference:** ${id}
- **Category:** ${category}
- **Affected Area:** ${area}
- **Contributor Perspective:** ${role}
- **Submitted:** ${createdAt}${contact.trim() ? `\n- **Contact / Handle:** ${contact.trim()}` : ''}

#### Details & Suggested Improvement
${description.trim()}
`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please enter both a short summary title and details before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          area,
          role,
          description: description.trim(),
          contact: contact.trim()
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success || !data.issue) {
        throw new Error(data.error || 'Unable to record issue submission.');
      }

      const md = buildMarkdown(data.issue.id, data.issue.createdAt);
      setSubmittedIssue({
        ...data.issue,
        markdown: md
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Could not submit issue right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setContact('');
    setErrorMsg(null);
    setSubmittedIssue(null);
  };

  const handleCopyMarkdown = () => {
    if (!submittedIssue) return;
    navigator.clipboard.writeText(submittedIssue.markdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!submittedIssue) return;
    const blob = new Blob([submittedIssue.markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${submittedIssue.id.toLowerCase()}-wavebound-issue.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raise-issue-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#00A389] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Contributions Welcome</span>
            </span>
            <h2
              id="raise-issue-modal-title"
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Raise an Issue or Suggest an Improvement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Spot unclear wording, a legal nuance, a broken rule, or an idea to make Wavebound more helpful? Share it here.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close issue form"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedIssue ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#047857] dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  Issue Logged ({submittedIssue.id})
                </div>
                <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Thank you for contributing. Your issue has been recorded under <strong>{submittedIssue.area}</strong> ({submittedIssue.category}). You can also copy or download the formatted summary below.
                </p>
              </div>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {submittedIssue.markdown}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMd ? 'Copied Markdown' : 'Copy Markdown'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#005EB8] dark:text-sky-400 hover:underline cursor-pointer"
                >
                  Raise Another
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-[#0F294A] hover:bg-[#005EB8] text-white text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-200 block">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#005EB8]"
                >
                  {ISSUE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-200 block">
                  Affected Section
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#005EB8]"
                >
                  {AFFECTED_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Summary Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clarify Caldicott Principle 8 review step or contrast in simulator"
                className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#005EB8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">
                Details &amp; Suggested Change <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what looks wrong, confusing, or missing—and how it could work better for patients, researchers, IG leads, or engineers."
                className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#005EB8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-200 block">
                  Your Perspective (Optional)
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#005EB8]"
                >
                  {CONTRIBUTOR_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-200 block">
                  Contact or Handle (Optional)
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Name, email, or GitHub handle"
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#005EB8]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-[#00A389] hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Issue'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
