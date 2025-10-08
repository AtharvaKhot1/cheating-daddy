import React, { useState, useEffect, useRef } from 'react';
import { ViewType, AppState, ElectronAPI } from '@/types';
import { cn } from '@/utils/tailwind';

// Import view components (we'll create these next)
import MainView from '@/components/views/MainView.tsx';
import OnboardingView from '@/components/views/OnboardingView.tsx';
import AssistantView from '@/components/views/AssistantView.tsx';
import CustomizeView from '@/components/views/CustomizeView.tsx';
import HelpView from '@/components/views/HelpView.tsx';
import HistoryView from '@/components/views/HistoryView.tsx';
import AdvancedView from '@/components/views/AdvancedView.tsx';
import AppHeader from '@/components/app/AppHeader.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentView: (localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding') as ViewType,
    statusText: '',
    startTime: null,
    isRecording: false,
    sessionActive: false,
    selectedProfile: localStorage.getItem('selectedProfile') || 'interview',
    selectedLanguage: localStorage.getItem('selectedLanguage') || 'en-US',
    responses: [],
    currentResponseIndex: -1,
    selectedScreenshotInterval: localStorage.getItem('selectedScreenshotInterval') || '5',
    selectedImageQuality: localStorage.getItem('selectedImageQuality') || 'medium',
    layoutMode: (localStorage.getItem('layoutMode') || 'normal') as 'normal' | 'compact',
    advancedMode: localStorage.getItem('advancedMode') === 'true',
    isClickThrough: false,
    awaitingNewResponse: false,
    shouldAnimateResponse: false,
  });

  const [currentResponseIsComplete, setCurrentResponseIsComplete] = useState(true);
  const mainViewRef = useRef<any>(null);

  // Apply layout mode to document root
  const updateLayoutMode = () => {
    if (state.layoutMode === 'compact') {
      document.documentElement.classList.add('compact-layout');
    } else {
      document.documentElement.classList.remove('compact-layout');
    }
  };

  useEffect(() => {
    updateLayoutMode();
  }, [state.layoutMode]);

  // Set up IPC listeners
  useEffect(() => {
    if (window.require) {
      const { ipcRenderer }: ElectronAPI = window.require('electron');
      
      const handleUpdateResponse = (_: any, response: string) => {
        setResponse(response);
      };

      const handleUpdateStatus = (_: any, status: string) => {
        setStatus(status);
      };

      const handleClickThroughToggled = (_: any, isEnabled: boolean) => {
        setState(prev => ({ ...prev, isClickThrough: isEnabled }));
      };

      ipcRenderer.on('update-response', handleUpdateResponse);
      ipcRenderer.on('update-status', handleUpdateStatus);
      ipcRenderer.on('click-through-toggled', handleClickThroughToggled);

      return () => {
        ipcRenderer.removeAllListeners('update-response');
        ipcRenderer.removeAllListeners('update-status');
        ipcRenderer.removeAllListeners('click-through-toggled');
      };
    }
  }, []);

  const setStatus = (text: string) => {
    setState(prev => ({ ...prev, statusText: text }));
    
    // Mark response as complete when we get certain status messages
    if (text.includes('Ready') || text.includes('Listening') || text.includes('Error')) {
      setCurrentResponseIsComplete(true);
      console.log('[setStatus] Marked current response as complete');
    }
  };

  const setResponse = (response: string) => {
    // Check if this looks like a filler response (very short responses to hmm, ok, etc)
    const isFillerResponse =
      response.length < 30 &&
      (response.toLowerCase().includes('hmm') ||
        response.toLowerCase().includes('okay') ||
        response.toLowerCase().includes('next') ||
        response.toLowerCase().includes('go on') ||
        response.toLowerCase().includes('continue'));

    setState(prev => {
      if (prev.awaitingNewResponse || prev.responses.length === 0) {
        // Always add as new response when explicitly waiting for one
        const newResponses = [...prev.responses, response];
        setCurrentResponseIsComplete(false);
        console.log('[setResponse] Pushed new response:', response);
        return {
          ...prev,
          responses: newResponses,
          currentResponseIndex: newResponses.length - 1,
          awaitingNewResponse: false,
          shouldAnimateResponse: true,
        };
      } else if (!currentResponseIsComplete && !isFillerResponse && prev.responses.length > 0) {
        // For substantial responses, update the last one (streaming behavior)
        const newResponses = [...prev.responses.slice(0, prev.responses.length - 1), response];
        console.log('[setResponse] Updated last response:', response);
        return {
          ...prev,
          responses: newResponses,
          shouldAnimateResponse: true,
        };
      } else {
        // For filler responses or when current response is complete, add as new
        const newResponses = [...prev.responses, response];
        setCurrentResponseIsComplete(false);
        console.log('[setResponse] Added response as new:', response);
        return {
          ...prev,
          responses: newResponses,
          currentResponseIndex: newResponses.length - 1,
          shouldAnimateResponse: true,
        };
      }
    });
  };

  // Event handlers
  const handleCustomizeClick = () => {
    setState(prev => ({ ...prev, currentView: 'customize' }));
  };

  const handleHelpClick = () => {
    setState(prev => ({ ...prev, currentView: 'help' }));
  };

  const handleHistoryClick = () => {
    setState(prev => ({ ...prev, currentView: 'history' }));
  };

  const handleAdvancedClick = () => {
    setState(prev => ({ ...prev, currentView: 'advanced' }));
  };

  const handleClose = async () => {
    if (state.currentView === 'customize' || state.currentView === 'help' || state.currentView === 'history') {
      setState(prev => ({ ...prev, currentView: 'main' }));
    } else if (state.currentView === 'assistant') {
      window.cheddar?.stopCapture();

      // Close the session
      if (window.require) {
        const { ipcRenderer }: ElectronAPI = window.require('electron');
        await ipcRenderer.invoke('close-session');
      }
      setState(prev => ({ ...prev, sessionActive: false, currentView: 'main' }));
      console.log('Session closed');
    } else {
      // Quit the entire application
      if (window.require) {
        const { ipcRenderer }: ElectronAPI = window.require('electron');
        await ipcRenderer.invoke('quit-application');
      }
    }
  };

  const handleHideToggle = async () => {
    if (window.require) {
      const { ipcRenderer }: ElectronAPI = window.require('electron');
      await ipcRenderer.invoke('toggle-window-visibility');
    }
  };

  const handleStart = async () => {
    // check if api key is empty do nothing
    const apiKey = localStorage.getItem('apiKey')?.trim();
    if (!apiKey || apiKey === '') {
      // Trigger the red blink animation on the API key input
      if (mainViewRef.current && mainViewRef.current.triggerApiKeyError) {
        mainViewRef.current.triggerApiKeyError();
      }
      return;
    }
    setState(prev => ({ ...prev, currentView: 'assistant' }));
  };

  // Render current view
  const renderCurrentView = () => {
    const viewProps = {
      ...state,
      onStart: handleStart,
      onStatusUpdate: setStatus,
    };

    switch (state.currentView) {
      case 'onboarding':
        return <OnboardingView {...viewProps} />;
      case 'main':
        return <MainView ref={mainViewRef} {...viewProps} />;
      case 'assistant':
        return <AssistantView {...viewProps} />;
      case 'customize':
        return <CustomizeView {...viewProps} />;
      case 'help':
        return <HelpView {...viewProps} />;
      case 'history':
        return <HistoryView {...viewProps} />;
      case 'advanced':
        return <AdvancedView {...viewProps} />;
      default:
        return <MainView ref={mainViewRef} {...viewProps} />;
    }
  };

  const getMainContentClasses = () => {
    return cn(
      'flex-1 overflow-y-auto transition-all duration-150',
      'rounded-[var(--content-border-radius)]',
      {
        'p-[var(--main-content-padding)] mt-[var(--main-content-margin-top)]': 
          state.currentView !== 'assistant' && state.currentView !== 'onboarding',
        'p-2.5 border-none': state.currentView === 'assistant',
        'p-0 border-none bg-transparent': state.currentView === 'onboarding',
        'border border-[var(--border-color)]': 
          state.currentView !== 'assistant' && state.currentView !== 'onboarding',
      },
      state.currentView !== 'onboarding' ? 'bg-[var(--main-content-background)]' : ''
    );
  };

  return (
    <div className="block w-full h-screen bg-transparent text-[var(--text-color)]">
      <div className="h-screen rounded-[7px] overflow-hidden">
        <div className="flex flex-col h-full">
          <AppHeader
            currentView={state.currentView}
            statusText={state.statusText}
            isRecording={state.isRecording}
            sessionActive={state.sessionActive}
            layoutMode={state.layoutMode}
            onCustomizeClick={handleCustomizeClick}
            onHelpClick={handleHelpClick}
            onHistoryClick={handleHistoryClick}
            onAdvancedClick={handleAdvancedClick}
            onClose={handleClose}
            onHideToggle={handleHideToggle}
          />
          <main className={getMainContentClasses()}>
            <div className="opacity-100 transform-none transition-all duration-150 h-full">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;