import React, { useState } from 'react';
import TechPack from '../main';
import LandingPage from './LandingPage';
import TechPackGenerator from './components/generator/TechPackGenerator';
import TechPackPreview from './components/generator/TechPackPreview';
import { TechPackData } from './types/TechPackData';

type AppView = 'landing' | 'generator' | 'preview' | 'static';

function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [generatedData, setGeneratedData] = useState<TechPackData | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleCreateNew = () => {
    setCurrentView('generator');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleGeneratorComplete = (data: TechPackData) => {
    setGeneratedData(data);
    setCurrentView('preview');
  };

  const handlePreviewFromGenerator = (data: TechPackData) => {
    setGeneratedData(data);
    setCurrentView('preview');
  };

  const handleEditFromPreview = () => {
    setCurrentView('generator');
  };

  const handleSaveDraft = (data?: TechPackData) => {
    const toSave = data || generatedData;
    if (toSave) {
      try {
        // Clear all existing drafts and save only the current one
        const newDraft = {
          id: Date.now().toString(),
          savedAt: new Date().toISOString(),
          data: toSave,
        };
        
        localStorage.setItem('techPackDrafts', JSON.stringify([newDraft]));
        setToastType('success');
        setToastMessage('Draft saved');
        window.setTimeout(() => setToastMessage(''), 2500);
      } catch (error) {
        console.error('Error saving draft:', error);
        setToastType('error');
        setToastMessage('Error saving draft. Storage is full.');
        window.setTimeout(() => setToastMessage(''), 3000);
      }
    }
  };

  const handleViewStatic = () => {
    setCurrentView('static');
  };

  const handleEditDraft = (draft: { id: string; savedAt: string; data: TechPackData }) => {
    setGeneratedData(draft.data);
    setCurrentView('generator');
  };

  if (currentView === 'generator') {
    return (
      <TechPackGenerator
        onComplete={handleGeneratorComplete}
        onBack={handleBackToLanding}
        initialData={generatedData}
        onPreview={handlePreviewFromGenerator}
      />
    );
  }

  if (currentView === 'preview' && generatedData) {
    return (
      <TechPackPreview
        data={generatedData}
        onBack={handleBackToLanding}
        onEdit={handleEditFromPreview}
        onSaveDraft={handleSaveDraft}
        message={toastMessage}
        messageType={toastType}
      />
    );
  }

  if (currentView === 'static') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TechPack onBack={handleBackToLanding} />
      </div>
    );
  }

  return (
    <LandingPage
      onCreateNew={handleCreateNew}
      onViewStatic={handleViewStatic}
      onEditDraft={handleEditDraft}
    />
  );
}

export default App;
