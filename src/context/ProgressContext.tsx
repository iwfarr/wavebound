import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export interface QuizAttempt {
  id: string;
  timestamp: string;
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
}

export interface UserProgressState {
  readSections: string[];
  completedModules: string[];
  viewedGlossaryTerms: string[];
  quizAttempts: QuizAttempt[];
}

interface ProgressContextValue extends UserProgressState {
  markSectionRead: (sectionId: string, read?: boolean) => void;
  markAllSectionsRead: () => void;
  toggleModuleComplete: (moduleId: string) => void;
  markAllModulesComplete: () => void;
  recordGlossaryTermView: (termId: string) => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => void;
  resetAllProgress: () => void;
  stats: {
    totalAttempts: number;
    totalPassed: number;
    averageScore: number;
    highestScore: number;
    playbookSectionsReadCount: number;
    totalPlaybookSections: number;
    modulesCompletedCount: number;
    totalModules: number;
    glossaryTermsViewedCount: number;
    totalGlossaryTerms: number;
    overallProgressPercentage: number;
    attemptsByCategory: Record<string, { attempts: number; bestScore: number; latestScore: number }>;
  };
}

const STORAGE_KEY = 'tre_pac_user_progress_v2';
const TOTAL_PLAYBOOK_SECTIONS = 7; // sec-overview, sec-architecture, sec-phase-1, sec-phase-2, sec-phase-3, sec-phase-4, sec-workflow
const TOTAL_MODULES = 6;
const TOTAL_GLOSSARY_ESTIMATE = 40;

const ALL_SECTION_IDS = [
  'sec-overview',
  'sec-architecture',
  'sec-phase-1',
  'sec-phase-2',
  'sec-phase-3',
  'sec-phase-4',
  'sec-workflow'
];

const ALL_MODULE_IDS = [
  'five-safes',
  'owa-to-cwa-shacl',
  'opa-rego-compilation',
  'quantitative-sdc',
  'ai-mcp-governance',
  'architecture-gitops-roadmap'
];

const defaultState: UserProgressState = {
  readSections: ['sec-overview'],
  completedModules: ['five-safes'],
  viewedGlossaryTerms: ['tre', 'pac', 'five-safes', 'shacl', 'opa'],
  quizAttempts: []
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.readSections)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored progress, using defaults', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [state]);

  const markSectionRead = (sectionId: string, read = true) => {
    setState((prev) => {
      const exists = prev.readSections.includes(sectionId);
      if (read && !exists) {
        return { ...prev, readSections: [...prev.readSections, sectionId] };
      }
      if (!read && exists) {
        return { ...prev, readSections: prev.readSections.filter((id) => id !== sectionId) };
      }
      return prev;
    });
  };

  const markAllSectionsRead = () => {
    setState((prev) => ({
      ...prev,
      readSections: [...ALL_SECTION_IDS]
    }));
  };

  const toggleModuleComplete = (moduleId: string) => {
    setState((prev) => {
      const exists = prev.completedModules.includes(moduleId);
      return {
        ...prev,
        completedModules: exists
          ? prev.completedModules.filter((id) => id !== moduleId)
          : [...prev.completedModules, moduleId]
      };
    });
  };

  const markAllModulesComplete = () => {
    setState((prev) => ({
      ...prev,
      completedModules: [...ALL_MODULE_IDS]
    }));
  };

  const recordGlossaryTermView = (termId: string) => {
    setState((prev) => {
      if (prev.viewedGlossaryTerms.includes(termId)) return prev;
      return {
        ...prev,
        viewedGlossaryTerms: [...prev.viewedGlossaryTerms, termId]
      };
    });
  };

  const recordQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      quizAttempts: [newAttempt, ...prev.quizAttempts]
    }));
  };

  const resetAllProgress = () => {
    setState({
      readSections: [],
      completedModules: [],
      viewedGlossaryTerms: [],
      quizAttempts: []
    });
  };

  const stats = useMemo(() => {
    const totalAttempts = state.quizAttempts.length;
    const totalPassed = state.quizAttempts.filter((a) => a.passed).length;
    const averageScore = totalAttempts > 0
      ? Math.round(state.quizAttempts.reduce((acc, cur) => acc + cur.percentage, 0) / totalAttempts)
      : 0;
    const highestScore = totalAttempts > 0
      ? Math.max(...state.quizAttempts.map((a) => a.percentage))
      : 0;

    // Fractions for balanced progress
    const sectionsFraction = Math.min(1, state.readSections.length / TOTAL_PLAYBOOK_SECTIONS);
    const modulesFraction = Math.min(1, state.completedModules.length / TOTAL_MODULES);
    const glossaryFraction = Math.min(1, state.viewedGlossaryTerms.length / 15); // reward up to 15 explored terms
    const quizFraction = totalAttempts > 0
      ? Math.min(1, (totalPassed * 0.7 + totalAttempts * 0.3) / 2)
      : 0;

    // Balanced 100% calculation:
    // Sections read: 30%
    // Modules mastered: 30%
    // Glossary explored: 15%
    // Quizzes & exams: 25%
    const computedProgress = Math.min(
      100,
      Math.round(
        sectionsFraction * 30 +
        modulesFraction * 30 +
        glossaryFraction * 15 +
        quizFraction * 25
      )
    );

    const attemptsByCategory: Record<string, { attempts: number; bestScore: number; latestScore: number }> = {};
    for (const att of state.quizAttempts) {
      if (!attemptsByCategory[att.category]) {
        attemptsByCategory[att.category] = {
          attempts: 1,
          bestScore: att.percentage,
          latestScore: att.percentage
        };
      } else {
        attemptsByCategory[att.category].attempts += 1;
        attemptsByCategory[att.category].bestScore = Math.max(attemptsByCategory[att.category].bestScore, att.percentage);
      }
    }

    return {
      totalAttempts,
      totalPassed,
      averageScore,
      highestScore,
      playbookSectionsReadCount: state.readSections.length,
      totalPlaybookSections: TOTAL_PLAYBOOK_SECTIONS,
      modulesCompletedCount: state.completedModules.length,
      totalModules: TOTAL_MODULES,
      glossaryTermsViewedCount: state.viewedGlossaryTerms.length,
      totalGlossaryTerms: TOTAL_GLOSSARY_ESTIMATE,
      overallProgressPercentage: Math.max(8, computedProgress), // Starts with an encouraging initial base
      attemptsByCategory
    };
  }, [state]);

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        markSectionRead,
        markAllSectionsRead,
        toggleModuleComplete,
        markAllModulesComplete,
        recordGlossaryTermView,
        recordQuizAttempt,
        resetAllProgress,
        stats
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useUserProgress must be used within a ProgressProvider');
  }
  return ctx;
};
