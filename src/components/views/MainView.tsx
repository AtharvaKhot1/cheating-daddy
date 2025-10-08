import React, { forwardRef, useImperativeHandle } from 'react';
import { AppState } from '@/types';

interface MainViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

export interface MainViewRef {
  triggerApiKeyError: () => void;
}

const MainView = forwardRef<MainViewRef, MainViewProps>(
  ({ onStart, selectedProfile, selectedLanguage }, ref) => {
    useImperativeHandle(ref, () => ({
      triggerApiKeyError: () => {
        // TODO: Implement API key error animation
        console.log('API key error triggered');
      },
    }));

    return (
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-color)] mb-4">
            Welcome to Cheating Daddy
          </h1>
          <p className="text-[var(--description-color)] mb-6">
            Real-time AI assistant for interviews and meetings
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              API Key
            </label>
            <input
              type="password"
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 bg-[var(--input-background)] border border-[var(--button-border)] rounded text-[var(--text-color)] placeholder-[var(--placeholder-color)] focus:border-[var(--focus-border-color)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Profile
            </label>
            <select
              value={selectedProfile}
              className="w-full px-4 py-2 bg-[var(--input-background)] border border-[var(--button-border)] rounded text-[var(--text-color)] focus:border-[var(--focus-border-color)] focus:outline-none"
            >
              <option value="interview">Interview</option>
              <option value="sales">Sales Call</option>
              <option value="meeting">Business Meeting</option>
              <option value="presentation">Presentation</option>
              <option value="negotiation">Negotiation</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Language
            </label>
            <select
              value={selectedLanguage}
              className="w-full px-4 py-2 bg-[var(--input-background)] border border-[var(--button-border)] rounded text-[var(--text-color)] focus:border-[var(--focus-border-color)] focus:outline-none"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="it-IT">Italian</option>
              <option value="pt-BR">Portuguese (Brazil)</option>
              <option value="ja-JP">Japanese</option>
              <option value="ko-KR">Korean</option>
              <option value="zh-CN">Chinese (Simplified)</option>
            </select>
          </div>

          <button
            onClick={onStart}
            className="w-full py-3 bg-[var(--start-button-background)] text-[var(--start-button-color)] border border-[var(--start-button-border)] rounded font-medium hover:bg-[var(--start-button-hover-background)] transition-colors"
          >
            Start Session
          </button>
        </div>
      </div>
    );
  }
);

MainView.displayName = 'MainView';

export default MainView;