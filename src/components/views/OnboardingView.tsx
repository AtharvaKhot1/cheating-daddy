import React from 'react';
import { AppState } from '@/types';

interface OnboardingViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = (props) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cheating Daddy</h1>
        <p className="text-xl mb-8">Your AI assistant for interviews and meetings</p>
        <button
          onClick={() => {
            localStorage.setItem('onboardingCompleted', 'true');
            window.location.reload();
          }}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;