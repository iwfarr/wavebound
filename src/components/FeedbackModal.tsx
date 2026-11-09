import React, { useState } from 'react';
import {
  X,
  MessageSquarePlus,
  ExternalLink,
  Copy,
  Check,
  Send,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Bug,
  ShieldAlert,
  Sliders
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<'bug' | 'governance' | 'sdc' | 'feature'>('governance');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const getCategoryLabel = () => {
    switch (category) {
      case 'bug':
        return 'Bug Report';
      case 'governance':
        return 'Governance / Policy Clarification';
      case 'sdc':
        return 'Statistical Disclosure Control (SDC)';
      case 'feature':
        return 'Feature Suggestion';
    }
  };

  const generateMarkdownPayload = () => {
    return `### [${getCategoryLabel()}] ${title || 'Untitled Feedback'}

**Category**: ${getCategoryLabel()}
**App Version**: SemVer 2.4.0-prod
**Environment**: Browser Web Client (${typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'})

#### Description / Observation:
${description || 'No description provided.'}

---
*Submitted via Project Wavebound Feedback Engine*`;
  };

  const handleOpenGitHub = () => {
    const issueTitle = encodeURIComponent(`[${getCategoryLabel()}] ${title || 'Feedback Submission'}`);
    const issueBody = encodeURIComponent(generateMarkdownPayload());
    const githubUrl = `https://github.com/iwfarr/seawater-playbook/issues/new?title=${issueTitle}&body=${issueBody}`;
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdownPayload());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('seawater_user_feedback') || '[]');
      const newFeedback = {
        id: 'fb-' + Date.now(),
        timestamp: new Date().toISOString(),
        category,
        title: title || 'Untitled Feedback',
        description
      };
      localStorage.setItem('seawater_user_feedback', JSON.stringify([...existing, newFeedback]));
    } catch {
      // Local storage fallback
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setDescription('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Submit Feedback or Raise an Issue</h3>
              <p className="text-xs text-slate-400">Share suggestions, regulatory queries, or report technical issues</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-300">Feedback Recorded</h4>
              <p className="text-xs text-emerald-200/80">
                Thank you! Your feedback has been stored. You can also raise this directly as an issue on the public GitHub repository.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitLocal} className="space-y-4">
              {/* Category Selection */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Feedback Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('governance')}
                    className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-colors ${
                      category === 'governance'
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-semibold text-[11px]">Governance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('sdc')}
                    className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-colors ${
                      category === 'sdc'
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    <span className="font-semibold text-[11px]">SDC Rules</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('bug')}
                    className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-colors ${
                      category === 'bug'
                        ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bug className="w-4 h-4" />
                    <span className="font-semibold text-[11px]">Bug Report</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('feature')}
                    className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-colors ${
                      category === 'feature'
                        ? 'bg-purple-950/60 border-purple-500/60 text-purple-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold text-[11px]">Feature Idea</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Summary / Title
                </label>
                <input
                  type="text"
                  placeholder="Brief summary of the issue or feedback..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Detailed Description */}
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Details / Steps / Feedback
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your feedback, statutory question, or steps to reproduce..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleOpenGitHub}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Raise on GitHub Issues</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!description.trim()}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Save Locally</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
