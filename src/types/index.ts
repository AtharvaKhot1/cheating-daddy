export type ViewType = 'onboarding' | 'main' | 'assistant' | 'customize' | 'help' | 'history' | 'advanced';

export interface AppState {
  currentView: ViewType;
  statusText: string;
  startTime: number | null;
  isRecording: boolean;
  sessionActive: boolean;
  selectedProfile: string;
  selectedLanguage: string;
  responses: string[];
  currentResponseIndex: number;
  selectedScreenshotInterval: string;
  selectedImageQuality: string;
  layoutMode: 'normal' | 'compact';
  advancedMode: boolean;
  isClickThrough: boolean;
  awaitingNewResponse: boolean;
  shouldAnimateResponse: boolean;
}

export interface ElectronAPI {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) => Promise<any>;
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
    removeAllListeners: (channel: string) => void;
  };
}

declare global {
  interface Window {
    require?: (module: string) => any;
    electron?: ElectronAPI;
    cheddar?: {
      stopCapture: () => void;
      getContentProtection: () => boolean;
    };
  }
}