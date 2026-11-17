import React, { useState } from 'react';
import { useUserProgress, QuizAttempt } from '../context/ProgressContext';
import {
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  TrendingUp,
  History,
  FileCheck2,
  Printer,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WaveboundLogo } from './WaveboundLogo';
import confetti from 'canvas-confetti';

interface ProgressDashboardProps {
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToQuiz: (category?: string) => void;
  onNavigateToGlossary: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  onNavigateToSection,
  onNavigateToQuiz,
  onNavigateToGlossary
}) => {
  const {
    readSections,
    completedModules,
    viewedGlossaryTerms,
    quizAttempts,
    resetAllProgress,
    markAllSectionsRead,
    markAllModulesComplete,
    stats
  } = useUserProgress();

  const [showCertificate, setShowCertificate] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Determine user rank based on overall progress
  const getRank = (progress: number) => {
    if (progress >= 85) {
      return {
        title: 'Lead TRE Governance & PaC Architect',
        badge: 'Master Architect',
        color: 'text-amber-300 border-amber-500/50 bg-amber-950/40',
        desc: 'Exceptional mastery across semantic ontologies, SHACL closed-world validation, quantitative SDC, and OPA Rego compilers.'
      };
    }
    if (progress >= 40) {
      return {
        title: 'Certified TRE Policy Engineer',
        badge: 'Practitioner',
        color: 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40',
        desc: 'Proficient in the Five Safes, SATRE pillars, and translating clinical governance into automated security policies.'
      };
    }
    return {
      title: 'TRE Policy-as-Code Apprentice',
      badge: 'Foundation',
      color: 'text-slate-300 border-slate-700 bg-slate-900/40',
      desc: 'Developing initial understanding of Trusted Research Environments, hospital data tiers, and semantic rule compilation.'
    };
  };

  const userRank = getRank(stats.overallProgressPercentage);

  const handlePrintCertificate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Clean Editorial Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <WaveboundLogo variant="badge" size="sm" />
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Project Wavebound: Progress Tracker &amp; Mastery
              </h1>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Track your journey through the Wavebound Policy-as-Code Playbook. Review your section completion,
                quiz attempt history, highest test scores, and earned certifications.
              </p>
            </div>
          </div>

          {/* User Rank Card */}
          <div className={`p-5 rounded-xl border ${userRank.color} min-w-[280px] lg:max-w-sm shrink-0 space-y-2`}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                {userRank.badge}
              </span>
              <span className="font-mono font-bold tabular-nums">{stats.overallProgressPercentage}% Mastery</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{userRank.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{userRank.desc}</p>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-800 dark:text-slate-300 font-bold">Overall Playbook Mastery Score</span>
            <span className="text-teal-700 dark:text-cyan-400 font-mono font-bold text-lg tabular-nums">{stats.overallProgressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div
              className="bg-gradient-to-r from-teal-500 via-blue-500 to-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${stats.overallProgressPercentage}%` }}
            />
          </div>

          {/* 4 Pillars Scoring Explanation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs items-stretch">
            <div className="h-full p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between gap-2">
                <span className="text-slate-700 dark:text-slate-400">Playbook Reading</span>
                <span className="font-mono text-teal-700 dark:text-cyan-400 font-bold tabular-nums whitespace-nowrap">30% Max</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-medium tabular-nums">{stats.playbookSectionsReadCount}/{stats.totalPlaybookSections} sections read</div>
            </div>

            <div className="h-full p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between gap-2">
                <span className="text-slate-700 dark:text-slate-400">Concept Pillars</span>
                <span className="font-mono text-purple-700 dark:text-purple-400 font-bold tabular-nums whitespace-nowrap">30% Max</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-medium tabular-nums">{stats.modulesCompletedCount}/{stats.totalModules} mastered</div>
            </div>

            <div className="h-full p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between gap-2">
                <span className="text-slate-700 dark:text-slate-400">Glossary Explored</span>
                <span className="font-mono text-[#047857] dark:text-emerald-400 font-bold tabular-nums whitespace-nowrap">15% Max</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-medium tabular-nums">{viewedGlossaryTerms.length} terms visited</div>
            </div>

            <div className="h-full p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between gap-2">
                <span className="text-slate-700 dark:text-slate-400">Quizzes &amp; Exams</span>
                <span className="font-mono text-amber-700 dark:text-amber-400 font-bold tabular-nums whitespace-nowrap">25% Max</span>
              </div>
              <div className="text-slate-900 dark:text-slate-200 font-medium tabular-nums">{stats.totalPassed} passed ({stats.totalAttempts} taken)</div>
            </div>
          </div>

          {/* Quick Mark All helpers */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <button
              onClick={markAllSectionsRead}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-800 dark:text-cyan-300 rounded-md border border-slate-300 dark:border-slate-700 font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Mark All Sections Read
            </button>
            <button
              onClick={markAllModulesComplete}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-purple-800 dark:text-purple-300 rounded-md border border-slate-300 dark:border-slate-700 font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Mark All Concept Pillars Mastered
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-1 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
            <span>Total Quiz Attempts</span>
            <History className="w-4 h-4 text-teal-600 dark:text-cyan-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{stats.totalAttempts}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Across all categories</div>
        </div>

        <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-1 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
            <span>Highest Score</span>
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            {stats.highestScore > 0 ? `${stats.highestScore}%` : 'N/A'}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Personal best</div>
        </div>

        <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-1 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.averageScore > 0 ? `${stats.averageScore}%` : 'N/A'}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Across completed exams</div>
        </div>

        <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-1 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-medium">
            <span>Glossary Terms Explored</span>
            <BookOpen className="w-4 h-4 text-[#005EB8] dark:text-cyan-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-[#005EB8] dark:text-cyan-300 tabular-nums">
            {viewedGlossaryTerms.length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Scanned and verified</div>
        </div>
      </div>

      {/* Main Grid: Breakdown & History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category Performance & Reading Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category Performance Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
              <span>Category Performance Breakdown</span>
            </h3>

            {Object.keys(stats.attemptsByCategory).length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <p>No quiz attempts recorded yet.</p>
                <button
                  onClick={() => onNavigateToQuiz()}
                  className="mt-3 text-teal-700 dark:text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  Start your first quiz <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.attemptsByCategory).map(([catName, catData]) => (
                  <div key={catName} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-900 dark:text-slate-200">{catName}</span>
                      <span className="font-mono text-teal-700 dark:text-cyan-300 font-bold tabular-nums whitespace-nowrap">{catData.bestScore}% Best</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#00A389] h-full rounded-full"
                        style={{ width: `${catData.bestScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                      <span>{catData.attempts} attempt{catData.attempts !== 1 ? 's' : ''}</span>
                      <span>Latest: {catData.latestScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onNavigateToQuiz()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00A389] hover:bg-[#008f77] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              Take Another Quiz
            </button>
          </div>

          {/* Playbook Reading Section Status */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#005EB8] dark:text-cyan-400" />
              <span>Playbook Section Tracker</span>
            </h3>

            <div className="space-y-2 text-sm">
              {[
                { id: 'sec-overview', label: 'Section 1. Project Overview & Objectives' },
                { id: 'sec-architecture', label: 'Section 2. Project Architecture & Repository' },
                { id: 'sec-phase-1', label: 'Section 3.1. Phase 1: Knowledge Modeling' },
                { id: 'sec-phase-2', label: 'Section 3.2. Phase 2: Validation Logic & SHACL' },
                { id: 'sec-phase-3', label: 'Section 3.3. Phase 3: Public Documentation' },
                { id: 'sec-phase-4', label: 'Section 3.4. Phase 4: Runtime Enforcement' },
                { id: 'sec-workflow', label: 'Section 4. Verification & Dev Commands' }
              ].map((item) => {
                const isRead = readSections.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigateToSection(item.id)}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <span className={isRead ? 'text-slate-900 dark:text-slate-200 font-medium' : 'text-slate-600 dark:text-slate-400'}>
                      {item.label}
                    </span>
                    {isRead ? (
                      <span className="flex items-center gap-1 text-xs text-[#047857] dark:text-emerald-400 font-semibold shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Read
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono shrink-0">Unread</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Quiz Attempts History Table */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
                  <span>Recorded Quiz Attempts ({quizAttempts.length})</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Every quiz you take records scores, accuracy, and timestamps.
                </p>
              </div>

              {quizAttempts.length > 0 && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="text-xs font-semibold text-teal-800 dark:text-cyan-400 bg-teal-50 dark:bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-cyan-800/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              )}
            </div>

            {quizAttempts.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-3">
                <Clock className="w-8 h-8 mx-auto text-slate-400" />
                <h4 className="font-semibold text-slate-900 dark:text-slate-200">No attempts yet</h4>
                <p className="text-xs max-w-sm mx-auto text-slate-600 dark:text-slate-400">
                  Complete an interactive quiz to see your scores, time spent, and pass/fail audit history here.
                </p>
                <button
                  onClick={() => onNavigateToQuiz()}
                  className="mt-2 px-4 py-2 bg-[#00A389] hover:bg-[#008f77] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Launch Quiz Engine
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                {quizAttempts.map((attempt) => {
                  const dateStr = new Date(attempt.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div
                      key={attempt.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                            {attempt.category}
                          </span>
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-semibold">
                            {attempt.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                          <span>{dateStr}</span>
                          <span>·</span>
                          <span>{attempt.score}/{attempt.totalQuestions} questions correct</span>
                          {attempt.timeSpentSeconds > 0 && (
                            <>
                              <span>·</span>
                              <span>{attempt.timeSpentSeconds}s</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className={`text-base font-extrabold font-mono tabular-nums ${
                            attempt.passed ? 'text-[#047857] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                          }`}>
                            {attempt.percentage}%
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold whitespace-nowrap">
                            {attempt.passed ? 'PASSED (≥80%)' : 'NEEDS REVIEW'}
                          </div>
                        </div>

                        {attempt.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#047857] dark:text-emerald-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset Progress Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span>Want to start fresh or retest from scratch?</span>
            </div>
            {showResetConfirm ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetAllProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-2.5 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900 text-red-800 dark:text-red-300 rounded font-semibold border border-red-300 dark:border-red-800 transition-colors cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-300 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All History</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-lg cursor-pointer"
            >
              ✕
            </button>

            <div className="border-2 border-dashed border-cyan-500/40 p-8 rounded-xl text-center space-y-4 bg-slate-950/60">
              <div className="flex justify-center">
                <WaveboundLogo variant="icon" size="xl" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  Certificate of Professional Achievement
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  Project Wavebound: Policy-as-Code
                </h2>
              </div>

              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                This acknowledges demonstrated technical comprehension of OWL 2 semantic ontologies,
                Closed-World SHACL shape verification, OPA Rego compilation, and Quantitative Statistical Disclosure Control (SDC).
              </p>

              <div className="py-3 border-y border-slate-800 text-xs text-slate-400 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div>
                  <div className="text-slate-500">Current Rank</div>
                  <div className="text-white font-bold mt-0.5">{userRank.title}</div>
                </div>
                <div>
                  <div className="text-slate-500">Mastery Level</div>
                  <div className="text-cyan-400 font-bold tabular-nums mt-0.5">{stats.overallProgressPercentage}%</div>
                </div>
                <div>
                  <div className="text-slate-500">High Score</div>
                  <div className="text-amber-400 font-bold tabular-nums mt-0.5">{stats.highestScore}%</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Verified via AI Studio Playbook Test Suite · Reference ID: TRE-PAC-{Date.now().toString(36).toUpperCase()}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
