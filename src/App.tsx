/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header, ActiveTab } from './components/Header';
import { GatewayPortal } from './components/GatewayPortal';
import { PlaybookReader } from './components/PlaybookReader';
import { TechnicalConcepts } from './components/TechnicalConcepts';
import { CytoscapeGraph } from './components/CytoscapeGraph';
import { PolicySandbox } from './components/PolicySandbox';
import { QuizEngine } from './components/QuizEngine';
import { GlossaryPage } from './components/GlossaryPage';
import { ProgressDashboard } from './components/ProgressDashboard';
import { IGQuickGuide } from './components/IGQuickGuide';
import { ResourcesPage } from './components/ResourcesPage';
import { LLMSecurityEnclave } from './components/LLMSecurityEnclave';
import { ImplementationTrack } from './components/ImplementationTrack';
import { GovernAssureWorkspace } from './components/GovernAssureWorkspace';
import { BuildDeployWorkspace } from './components/BuildDeployWorkspace';
import { FeedbackModal } from './components/FeedbackModal';
import { getSectionIdForGlossaryTerm } from './data/glossaryData';
import { ShieldCheck, BookOpen, Layers, Cpu, HelpCircle, Bookmark, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('gateway');
  const [activeGlossaryTermId, setActiveGlossaryTermId] = useState<string | null>(null);
  const [activeQuizCategory, setActiveQuizCategory] = useState<string | undefined>(undefined);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);
  const [targetHighlightTerm, setTargetHighlightTerm] = useState<string | undefined>(undefined);
  const [targetDecisionId, setTargetDecisionId] = useState<string | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleNavigateToGlossaryTerm = (termId: string) => {
    setActiveGlossaryTermId(termId);
    setActiveTab('glossary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToConcept = (conceptId: string) => {
    setActiveModuleId(conceptId);
    setActiveTab('concepts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToQuiz = (category?: string) => {
    setActiveQuizCategory(category);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (rawSectionId: string, highlightKeyword?: string) => {
    const resolvedSectionId = rawSectionId.startsWith('sec-') 
      ? rawSectionId 
      : getSectionIdForGlossaryTerm(rawSectionId);
    
    setTargetSectionId(resolvedSectionId);
    setTargetHighlightTerm(highlightKeyword || rawSectionId);
    setActiveTab('playbook');
  };

  return (
    <ThemeProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col transition-colors duration-200">
        {/* Main Header with Global Search and Navigation */}
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'playbook') {
              setTargetSectionId(null);
              setTargetHighlightTerm(undefined);
            }
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
          onNavigateToSection={handleNavigateToSection}
          onOpenFeedback={() => setIsFeedbackOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 pb-16">
          {activeTab === 'gateway' && (
            <GatewayPortal
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToConcept={handleNavigateToConcept}
              onNavigateToSection={handleNavigateToSection}
              onNavigateToGlossary={handleNavigateToGlossaryTerm}
            />
          )}

          {activeTab === 'govern-assure' && (
            <GovernAssureWorkspace
              onNavigateToBuildDeploy={() => {
                setActiveTab('build-deploy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToDecisionRegister={(decisionId) => {
                setTargetDecisionId(decisionId || 'D-001');
                setActiveTab('implementation-track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToSandbox={() => {
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToPlaybook={(secId) => {
                handleNavigateToSection(secId || 'sec-caldicott');
              }}
            />
          )}

          {activeTab === 'build-deploy' && (
            <BuildDeployWorkspace
              onNavigateToGovernAssure={() => {
                setActiveTab('govern-assure');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToImplementation={() => {
                setTargetDecisionId(null);
                setActiveTab('implementation-track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToGraph={() => {
                setActiveTab('graph');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToSandbox={() => {
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'playbook' && (
            <PlaybookReader
              onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
              onNavigateToConcept={handleNavigateToConcept}
              onNavigateToQuiz={handleNavigateToQuiz}
              onNavigateToImplementationTrack={() => {
                setTargetDecisionId(null);
                setActiveTab('implementation-track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              targetSectionId={targetSectionId}
              targetHighlightTerm={targetHighlightTerm}
              onClearTargetSection={() => setTargetSectionId(null)}
            />
          )}

          {activeTab === 'concepts' && (
            <TechnicalConcepts
              initialModuleId={activeModuleId}
              onNavigateToQuiz={handleNavigateToQuiz}
              onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
              onNavigateToImplementationTrack={() => {
                setTargetDecisionId(null);
                setActiveTab('implementation-track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'implementation-track' && (
            <ImplementationTrack
              onNavigateToSection={handleNavigateToSection}
              onNavigateToGlossary={handleNavigateToGlossaryTerm}
              initialTab={targetDecisionId ? 'decisions' : 'timeline'}
              targetDecisionId={targetDecisionId}
            />
          )}

          {activeTab === 'graph' && (
            <CytoscapeGraph
              onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
              onNavigateToConcept={handleNavigateToConcept}
              onNavigateToSandbox={() => {
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'sandbox' && <PolicySandbox />}

          {activeTab === 'llm-security' && (
            <LLMSecurityEnclave
              onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
              onNavigateToSandbox={() => {
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizEngine
              initialCategory={activeQuizCategory}
              onNavigateToSection={handleNavigateToSection}
              onNavigateToGlossaryTerm={handleNavigateToGlossaryTerm}
              onViewProgress={() => setActiveTab('progress')}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossaryPage
              initialTermId={activeGlossaryTermId}
              onNavigateToSection={handleNavigateToSection}
              onNavigateToConcept={handleNavigateToConcept}
            />
          )}

          {activeTab === 'resources' && <ResourcesPage />}

          {activeTab === 'progress' && (
            <ProgressDashboard
              onNavigateToSection={handleNavigateToSection}
              onNavigateToQuiz={handleNavigateToQuiz}
              onNavigateToGlossary={() => setActiveTab('glossary')}
            />
          )}

          {activeTab === 'governance-atlas' && (
            <IGQuickGuide
              onNavigateToGlossary={(termId) => handleNavigateToGlossaryTerm(termId)}
              onNavigateToSection={handleNavigateToSection}
              onNavigateToQuiz={handleNavigateToQuiz}
              onNavigateToGovernAssure={() => {
                setActiveTab('govern-assure');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>
                Trusted Research Environment (TRE) Policy-as-Code Playbook Platform
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button
                onClick={() => setActiveTab('playbook')}
                className="hover:text-cyan-300"
              >
                Playbook
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('llm-security')}
                className="hover:text-cyan-300"
              >
                LLM & Enclave Security
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('glossary')}
                className="hover:text-cyan-300"
              >
                Glossary
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('quiz')}
                className="hover:text-cyan-300"
              >
                Quiz Engine
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('progress')}
                className="hover:text-cyan-300"
              >
                Progress
              </button>
            </div>
          </div>
        </footer>

        {/* Global Feedback & Issue Submission Modal */}
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      </div>
      </ProgressProvider>
    </ThemeProvider>
  );
}
