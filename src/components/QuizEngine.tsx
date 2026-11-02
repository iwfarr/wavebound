import React, { useState, useEffect, useRef } from 'react';
import { CURATED_QUIZ_BANK, QuizQuestion } from '../data/quizBank';
import { useUserProgress } from '../context/ProgressContext';
import {
  HelpCircle,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  ArrowRight,
  Bookmark,
  Award,
  Zap,
  BookOpen,
  Filter,
  BarChart3,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizEngineProps {
  initialCategory?: string;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToGlossaryTerm: (termId: string) => void;
  onViewProgress: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  initialCategory,
  onNavigateToSection,
  onNavigateToGlossaryTerm,
  onViewProgress
}) => {
  const { recordQuizAttempt } = useUserProgress();

  const categories = [
    'All Categories (Comprehensive Exam)',
    'Five Safes & Governance',
    'Semantic Modeling & SHACL',
    'OPA Rego & Enforcement',
    'Quantitative SDC & Airlock',
    'AI & MCP Governance',
    'Repository & Architecture'
  ];

  // Quiz Setup State
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All Categories (Comprehensive Exam)'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Foundation' | 'Intermediate' | 'Advanced'>('All');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Status Notice
  const [notice, setNotice] = useState<string | null>(null);

  // Active Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedIndex, setSubmittedIndex] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (quizActive && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizActive, quizCompleted]);

  // Compute available question count dynamically for the UI
  const availableMatchingCount = React.useMemo(() => {
    return CURATED_QUIZ_BANK.filter((q) => {
      const matchCat = selectedCategory === 'All Categories (Comprehensive Exam)' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    }).length;
  }, [selectedCategory, selectedDifficulty]);

  // Start Standard / Filtered Curated Quiz with robust fallback
  const handleStartCuratedQuiz = (countOverride?: number) => {
    let pool = CURATED_QUIZ_BANK.filter((q) => {
      const matchCat = selectedCategory === 'All Categories (Comprehensive Exam)' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });

    let notice: string | null = null;

    // Defensive fallback: if exact combo has no questions, or fewer than requested, backfill intelligently
    if (pool.length === 0) {
      if (selectedDifficulty !== 'All') {
        // Fall back to all questions in that category
        pool = CURATED_QUIZ_BANK.filter((q) => selectedCategory === 'All Categories (Comprehensive Exam)' || q.category === selectedCategory);
        notice = `No ${selectedDifficulty} questions found for "${selectedCategory}". Loaded all available difficulty levels.`;
      } else {
        pool = [...CURATED_QUIZ_BANK];
        notice = `Loaded full comprehensive question bank.`;
      }
    } else if (pool.length < questionCount) {
      // If we have fewer than requested, pad with questions from same category or same difficulty
      const extra = CURATED_QUIZ_BANK.filter(
        (q) => !pool.some((p) => p.id === q.id) && (q.category === selectedCategory || q.difficulty === selectedDifficulty)
      );
      pool = [...pool, ...extra.sort(() => Math.random() - 0.5)];
      notice = `Loaded ${availableMatchingCount} matching ${selectedDifficulty} question(s) plus related practice items to reach ${Math.min(questionCount, pool.length)}.`;
    }

    if (pool.length === 0) {
      pool = [...CURATED_QUIZ_BANK];
    }

    // Shuffle and slice
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(countOverride || questionCount, shuffled.length));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedIndex(null);
    setQuizCompleted(false);
    setElapsedSeconds(0);
    setStartTime(Date.now());
    setQuizActive(true);
    setNotice(notice);
  };

  // Submit answer for current question
  const handleSelectOption = (optionIndex: number) => {
    if (submittedIndex !== null) return; // already answered
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    setSubmittedIndex(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSubmittedIndex(userAnswers[currentIndex + 1] !== undefined ? userAnswers[currentIndex + 1] : null);
    } else {
      // Finish quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    setQuizActive(false);

    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const total = activeQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 80;

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // Save attempt to user progress tracker
    recordQuizAttempt({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      score: correctCount,
      totalQuestions: total,
      percentage,
      passed,
      timeSpentSeconds: elapsedSeconds
    });
  };

  const currentQ = activeQuestions[currentIndex];
  const isAnswered = submittedIndex !== null;
  const isCurrentCorrect = isAnswered && submittedIndex === currentQ?.correctIndex;

  // Calculate results if finished
  const correctCount = activeQuestions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length;
  const finalScorePercent = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;
  const passed = finalScorePercent >= 80;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Quiz Engine Main Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Technical Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              TRE Policy-as-Code Quiz Engine
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Challenge yourself on Five Safes governance, SHACL closed-world validation,
              quantitative SDC math ($k \ge 10$), OPA Rego compilation, and international standards (ISO 42001, DCB0129/0160).
            </p>
          </div>

          <button
            onClick={onViewProgress}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-colors shrink-0"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>View Attempt History</span>
          </button>
        </div>

        {notice && (
          <div className="text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 p-2.5 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{notice}</span>
          </div>
        )}
      </div>

      {!quizActive && !quizCompleted ? (
        /* Setup / Configuration Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Configure Assessment Parameters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category Domain</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Target Difficulty</label>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                  {availableMatchingCount} in bank
                </span>
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Levels (Mixed)</option>
                <option value="Foundation">Foundation</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced (Architect)</option>
              </select>
            </div>

            {/* Question Count Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Question Count</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value={3}>3 Questions (Quick Drill)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (In-Depth Assessment)</option>
                <option value={15}>15 Questions (Mastery Exam)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleStartCuratedQuiz()}
              className="flex-1 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Start Curated Playbook Exam</span>
            </button>

            <button
              onClick={() => handleStartCuratedQuiz(3)}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>3-Question Quick Drill</span>
            </button>
          </div>
        </div>
      ) : quizActive && currentQ ? (
        /* Active Quiz Taking Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Progress & Timer Bar */}
          <div className="flex items-center justify-between text-xs pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800/60">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-slate-400">{currentQ.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {currentQ.difficulty}
              </span>
              <div className="flex items-center gap-1 text-slate-400 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{elapsedSeconds}s</span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = submittedIndex === optIdx;
              const isCorrect = isAnswered && optIdx === currentQ.correctIndex;
              const isWrongSelected = isAnswered && isSelected && !isCorrect;

              let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50';
              } else if (isWrongSelected) {
                btnStyle = 'bg-red-950/70 border-red-500 text-red-100 ring-1 ring-red-500/50';
              } else if (isAnswered) {
                btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="font-mono font-bold text-xs shrink-0 w-6 h-6 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed flex-1">{opt}</span>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isWrongSelected && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Box after Answer Submission */}
          {isAnswered && (
            <div
              className={`p-5 rounded-xl border space-y-3 animate-in fade-in duration-300 ${
                isCurrentCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-red-950/20 border-red-500/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isCurrentCorrect ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {isCurrentCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> Incorrect
                    </>
                  )}
                </span>

                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-cyan-400" />
                  {currentQ.citation}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>
                    {currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completed & Detailed Score Breakdown */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100">
          <div className="text-center space-y-3 max-w-md mx-auto">
            {passed ? (
              <Trophy className="w-14 h-14 text-emerald-400 mx-auto" />
            ) : (
              <HelpCircle className="w-14 h-14 text-amber-400 mx-auto" />
            )}

            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Assessment Complete
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {passed ? 'Exam Passed!' : 'Assessment Complete'}
              </h2>
            </div>

            <div className="py-2">
              <div
                className={`text-5xl font-extrabold font-mono ${
                  passed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {finalScorePercent}%
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {correctCount} of {activeQuestions.length} questions answered correctly · {elapsedSeconds}s elapsed
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {passed
                ? 'Outstanding performance. Your score and passing attempt have been recorded to your progress ledger.'
                : 'Good effort. Review the question explanations below and consult the playbook sections to improve.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <button
                onClick={() => handleStartCuratedQuiz()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onViewProgress}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Progress Dashboard</span>
              </button>
            </div>
          </div>

          {/* Question Review List */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="font-bold text-white text-base">Comprehensive Question Review</h3>

            <div className="space-y-4">
              {activeQuestions.map((q, qIdx) => {
                const selected = userAnswers[qIdx];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border space-y-3 ${
                      isCorrect
                        ? 'bg-slate-950/60 border-emerald-900/40'
                        : 'bg-slate-950/60 border-red-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-400">Q{qIdx + 1}.</span>
                        <span className="font-bold text-slate-200">{q.question}</span>
                      </div>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold flex items-center gap-1 shrink-0">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1 text-slate-300">
                      <div>
                        Your choice:{' '}
                        <strong className={isCorrect ? 'text-emerald-300' : 'text-red-300'}>
                          {selected !== undefined ? q.options[selected] : 'No answer'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div>
                          Correct answer:{' '}
                          <strong className="text-emerald-400">{q.options[q.correctIndex]}</strong>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed space-y-1">
                      <p>{q.explanation}</p>
                      <div className="text-[11px] font-mono text-cyan-400 pt-1">
                        Citation: {q.citation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
