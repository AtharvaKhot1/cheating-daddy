import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create minimal cheddar object for compatibility with existing code
window.cheddar = {
  stopCapture: () => {
    console.log('stopCapture called');
    // TODO: Implement actual screen capture stopping
  },
  getContentProtection: () => {
    const contentProtection = localStorage.getItem('contentProtection');
    return contentProtection !== null ? contentProtection === 'true' : true;
  },
  setStatus: (status: string) => {
    console.log('Status:', status);
    // Status updates are handled by React state
  },
  setResponse: (response: string) => {
    console.log('Response:', response);
    // Response updates are handled by React state
  }
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);