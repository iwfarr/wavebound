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
  Loader2,
  Printer,
  Download,
  FileCheck2,
  ShieldCheck,
  Copy,
  Check,
  Info
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
    'ISO 27001 & DEA 2017',
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

  // Certificate State
  const [candidateName, setCandidateName] = useState<string>('');
  const [lastQuizMeta, setLastQuizMeta] = useState<{
    category: string;
    difficulty: string;
    count: number;
    score: number;
    correct: number;
    date: string;
    passed: boolean;
    hash: string;
  } | null>(null);
  const [showCertificateView, setShowCertificateView] = useState(false);

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

  // Unbiased Fisher-Yates (Knuth) shuffle
  const shuffleArray = <T,>(items: readonly T[]): T[] => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Randomize option order for a set of questions so correct positions (A/B/C/D)
  // are unpredictable and well-distributed on every single play.
  const randomizeQuestionOptions = (questions: QuizQuestion[]): QuizQuestion[] => {
    const targetSlots: number[] = [];
    while (targetSlots.length < questions.length) {
      targetSlots.push(...shuffleArray([0, 1, 2, 3]));
    }
    const assignedSlots = shuffleArray(targetSlots.slice(0, questions.length));

    return questions.map((q, idx) => {
      const optionCount = q.options.length;
      if (optionCount <= 1) return q;

      const correctText = q.options[q.correctIndex];
      const distractors = shuffleArray(
        q.options.filter((_, optIdx) => optIdx !== q.correctIndex)
      );
      const targetSlot = assignedSlots[idx] % optionCount;
      const newOptions: string[] = [];
      let distractorPtr = 0;

      for (let i = 0; i < optionCount; i++) {
        if (i === targetSlot) {
          newOptions.push(correctText);
        } else {
          newOptions.push(distractors[distractorPtr++]);
        }
      }

      return {
        ...q,
        options: newOptions,
        correctIndex: targetSlot
      };
    });
  };

  // Start Standard / Filtered Curated Quiz with robust fallback
  const handleStartCuratedQuiz = (countOverride?: number) => {
    const targetCount = countOverride || questionCount;
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
    } else if (pool.length < targetCount) {
      // If we have fewer than requested, pad with questions from same category or same difficulty
      const extra = CURATED_QUIZ_BANK.filter(
        (q) => !pool.some((p) => p.id === q.id) && (q.category === selectedCategory || q.difficulty === selectedDifficulty)
      );
      pool = [...pool, ...shuffleArray(extra)];
      notice = `Loaded ${availableMatchingCount} matching ${selectedDifficulty} question(s) plus related practice items to reach ${Math.min(targetCount, pool.length)}.`;
    }

    if (pool.length === 0) {
      pool = [...CURATED_QUIZ_BANK];
    }

    // Shuffle questions and randomize option positions on every play
    const shuffled = shuffleArray(pool);
    const selected = randomizeQuestionOptions(
      shuffled.slice(0, Math.min(targetCount, shuffled.length))
    );

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

    const hash = 'WVBD-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Date.now().toString(36).substring(4).toUpperCase();
    const dateFormatted = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    setLastQuizMeta({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      count: total,
      score: percentage,
      correct: correctCount,
      date: dateFormatted,
      passed,
      hash
    });

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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Quiz Engine Main Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Technical Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Wavebound Quiz
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Challenge yourself on Five Safes governance, ISO/IEC 27001:2022 ISMS &amp; DEA 2017 accreditation, SHACL closed-world validation,
              quantitative SDC math (<span className="font-mono text-cyan-300 font-semibold">k &ge; 10</span>), OPA Rego compilation, and clinical safety standards (ISO 42001, DCB0129/0160).
            </p>
          </div>

          <button
            onClick={onViewProgress}
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2 transition-colors shrink-0 cursor-pointer whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>View Attempt History</span>
          </button>
        </div>

        {notice && (
          <div className="text-xs sm:text-sm text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category Domain</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
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
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-300">Target Difficulty</label>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50 whitespace-nowrap tabular-nums">
                  {availableMatchingCount} in bank
                </span>
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value={3}>3 Questions (Quick Drill)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (In-Depth Assessment)</option>
                <option value={15}>15 Questions (Mastery Exam)</option>
                <option value={30}>30 Questions (Extended Mock)</option>
                <option value={45}>45 Questions (Full Standalone Category Bank)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleStartCuratedQuiz()}
              className="flex-1 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span>Start Curated Playbook Exam</span>
            </button>

            <button
              onClick={() => handleStartCuratedQuiz(3)}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>3-Question Quick Drill</span>
            </button>
          </div>

          {/* Architectural Notice: Bringing Your Own API vs Running a Local Instance */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-cyan-900/60 text-xs sm:text-sm text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Can I bring my own API key to the Quiz, or should I run a local instance of Wavebound?</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed items-stretch">
              <div className="h-full space-y-1.5 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-emerald-300 block">1. 100% Self-Contained by Default (No Keys Needed)</span>
                <p>
                  Wavebound is designed to run self-contained in your browser with zero external network calls. All 270+ curated questions, randomized answer checks, and certificate downloads execute locally on your device. You do <strong>not</strong> need to supply an OpenAI, Anthropic, or cloud API key to practice or take assessments.
                </p>
              </div>
              <div className="h-full space-y-1.5 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-cyan-300 block">2. Bring Your Own Local Model or Private Endpoint</span>
                <p>
                  By contrast, if you want to dynamically generate custom questions from your own notes or local policy files, avoid pasting personal API keys into hosted web apps where credentials and prompts cross third-party servers. Instead, <strong>run a local copy of Wavebound on your own machine</strong> connected to a local model (e.g. Ollama, LM Studio, or vLLM) or your own private API environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : quizActive && currentQ ? (
        /* Active Quiz Taking Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Progress & Timer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-4 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800/60 whitespace-nowrap tabular-nums">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-slate-400">{currentQ.category}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 whitespace-nowrap">
                {currentQ.difficulty}
              </span>
              <div className="flex items-center gap-1 text-slate-400 font-mono text-xs whitespace-nowrap tabular-nums">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
                  className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base font-medium transition-all flex items-start gap-3 ${btnStyle}`}
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

                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  {currentQ.citation}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <span>
                    {currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completed & Detailed Score Breakdown */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100">
          <div className="text-center space-y-3 max-w-xl mx-auto">
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
                className={`text-5xl font-extrabold font-mono tabular-nums ${
                  passed ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {finalScorePercent}%
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 tabular-nums">
                {correctCount} of {activeQuestions.length} questions answered correctly · {elapsedSeconds}s elapsed
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {passed
                ? 'Outstanding performance. Your score and passing attempt have been recorded to your progress ledger.'
                : 'Good effort. Review the question explanations below and consult the playbook sections to improve.'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <button
                onClick={() => handleStartCuratedQuiz()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onViewProgress}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>View Progress Dashboard</span>
              </button>
            </div>
          </div>

          {/* Certificate of Completion & Assessment Card */}
          {lastQuizMeta && (
            <div className="bg-slate-950 border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Certificate of Technical Governance Proficiency
                    </h3>
                    <p className="text-xs text-slate-400">
                      Download or print an accredited record of this assessment run for governance evidence dossiers
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      try {
                        window.print();
                      } catch (err) {
                        console.warn('Direct print failed, generating standalone HTML download', err);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <Printer className="w-4 h-4 shrink-0" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!lastQuizMeta) return;
                      const name = candidateName.trim() || 'Candidate Name / Designated Enclave Operator';
                      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate of Competence - ${name}</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #f8fafc; color: #0f172a; padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .cert-card { background: #ffffff; border: 3px double #0284c7; border-radius: 16px; padding: 48px; max-width: 800px; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; }
    .badge { display: inline-block; padding: 6px 14px; background: #e0f2fe; color: #0369a1; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    h1 { font-size: 28px; margin: 16px 0 4px 0; color: #0f172a; font-weight: 800; }
    .strapline { font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em; font-family: monospace; }
    .cert-name { font-size: 26px; font-weight: 700; color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin: 24px auto 12px; max-width: 480px; }
    .cert-desc { font-size: 13px; line-height: 1.6; color: #334155; max-width: 580px; margin: 0 auto 24px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; text-align: left; }
    .grid-box { background: #f1f5f9; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .grid-label { font-size: 10px; color: #64748b; text-transform: uppercase; font-family: monospace; font-weight: 600; }
    .grid-val { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 4px; }
    .footer { display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; font-family: monospace; }
    @media print { body { padding: 0; background: #fff; } .cert-card { box-shadow: none; border: 2px solid #000; } }
  </style>
</head>
<body>
  <div class="cert-card">
    <div class="badge">Wavebound Policy-as-Code Enclave Assurance</div>
    <h1>Certificate of Competence & Verification</h1>
    <div class="strapline">safe data intelligence environments</div>
    <p style="font-style: italic; color: #64748b; margin-top: 24px;">This certifies that</p>
    <div class="cert-name">${name}</div>
    <p class="cert-desc">has completed a technical assessment evaluating automated governance policy, information governance safeguards, and line-rate disclosure control enforcement.</p>
    <div class="grid">
      <div class="grid-box"><div class="grid-label">Category Domain</div><div class="grid-val">${lastQuizMeta.category}</div></div>
      <div class="grid-box"><div class="grid-label">Target Difficulty</div><div class="grid-val">${lastQuizMeta.difficulty} Level</div></div>
      <div class="grid-box"><div class="grid-label">Evaluated Questions</div><div class="grid-val">${lastQuizMeta.count} Items (${lastQuizMeta.score}% Score)</div></div>
    </div>
    <div class="footer">
      <div>Date Issued: <strong>${lastQuizMeta.date}</strong></div>
      <div>Audit Hash: <strong>${lastQuizMeta.hash}</strong></div>
    </div>
  </div>
</body>
</html>`;
                      const blob = new Blob([htmlContent], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `wavebound-certificate-${lastQuizMeta.hash}.html`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                    title="Download clean standalone printable HTML file"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Download (.html)</span>
                  </button>
                </div>
              </div>

              {/* Name Customization Input */}
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-semibold text-slate-300 block">
                  Candidate Name or Professional ID:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Dr. Jane Smith, Information Asset Owner"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {candidateName && (
                    <button
                      onClick={() => setCandidateName('')}
                      className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 whitespace-nowrap"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Printable Certificate Template */}
              <div
                id="certificate-print-view"
                className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-500/50 rounded-2xl p-8 sm:p-10 space-y-6 text-center relative print:border-black print:bg-white print:text-black shadow-xl"
              >
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-md border border-cyan-800/60 print:bg-transparent print:text-black whitespace-nowrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 print:text-black shrink-0" />
                    <span>Wavebound Policy-as-Code Enclave Assurance</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-2 print:text-black">
                    Certificate of Competence &amp; Verification
                  </h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-mono print:text-gray-600">
                    safe data intelligence environments
                  </p>
                </div>

                <div className="py-2 space-y-2">
                  <span className="text-xs font-serif italic text-slate-400 print:text-gray-600">
                    This certifies that
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 border-b border-cyan-500/40 pb-2 max-w-md mx-auto print:text-black print:border-black">
                    {candidateName.trim() || 'Candidate Name / Designated Enclave Operator'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1 print:text-gray-700">
                    has completed a rigorous technical assessment evaluating automated governance policy,
                    information governance safeguards, and line-rate disclosure control enforcement.
                  </p>
                </div>

                {/* Certificate Metadata Grid showing combination of Domain, Difficulty, Question Count */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto pt-2 items-stretch">
                  <div className="h-full p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 print:bg-gray-100 print:border-gray-300">
                    <span className="text-xs uppercase font-mono text-slate-500 block">Category Domain</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 print:text-black">
                      {lastQuizMeta.category}
                    </span>
                  </div>

                  <div className="h-full p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 print:bg-gray-100 print:border-gray-300">
                    <span className="text-xs uppercase font-mono text-slate-500 block">Target Difficulty</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300 block mt-0.5 print:text-black">
                      {lastQuizMeta.difficulty} Level
                    </span>
                  </div>

                  <div className="h-full p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 print:bg-gray-100 print:border-gray-300">
                    <span className="text-xs uppercase font-mono text-slate-500 block">Evaluated Questions</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 tabular-nums print:text-black">
                      {lastQuizMeta.count} Items ({lastQuizMeta.score}% Score)
                    </span>
                  </div>
                </div>

                {/* Footer Sign-off & Verification Token */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 print:border-gray-300 print:text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono">Date Issued:</span>
                    <strong className="text-slate-200 print:text-black font-mono tabular-nums">{lastQuizMeta.date}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">Audit Hash:</span>
                    <code className="text-xs font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 print:bg-transparent print:text-black">
                      {lastQuizMeta.hash}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-400 shrink-0 tabular-nums">Q{qIdx + 1}.</span>
                        <span className="font-bold text-slate-200">{q.question}</span>
                      </div>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 shrink-0 whitespace-nowrap">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> Correct
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold flex items-center gap-1 shrink-0 whitespace-nowrap">
                          <XCircle className="w-4 h-4 shrink-0" /> Incorrect
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm space-y-1 text-slate-300">
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

                    <div className="text-xs sm:text-sm text-slate-400 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed space-y-1.5">
                      <p>{q.explanation}</p>
                      <div className="text-xs font-mono text-cyan-400 pt-1">
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
