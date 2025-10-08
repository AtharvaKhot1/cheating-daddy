import React from 'react';
import { ViewType } from '@/types';

interface AppHeaderProps {
  currentView: ViewType;
  statusText: string;
  isRecording: boolean;
  sessionActive: boolean;
  layoutMode: 'normal' | 'compact';
  onCustomizeClick: () => void;
  onHelpClick: () => void;
  onHistoryClick: () => void;
  onAdvancedClick: () => void;
  onClose: () => void;
  onHideToggle: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  currentView,
  statusText,
  isRecording,
  sessionActive,
  layoutMode,
  onCustomizeClick,
  onHelpClick,
  onHistoryClick,
  onAdvancedClick,
  onClose,
  onHideToggle,
}) => {
  return (
    <header className="bg-[var(--header-background)] p-[var(--header-padding)] flex justify-between items-center gap-[var(--header-gap)]">
      <div className="flex items-center gap-[var(--header-gap)]">
        <span className="text-[var(--header-font-size)] font-medium text-[var(--text-color)]">
          Cheating Daddy
        </span>
        {statusText && (
          <span className="text-[var(--header-font-size-small)] text-[var(--header-actions-color)]">
            {statusText}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {currentView === 'main' && (
          <>
            <button
              onClick={onCustomizeClick}
              className="px-[var(--header-button-padding)] text-[var(--header-font-size-small)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
            >
              Settings
            </button>
            <button
              onClick={onHelpClick}
              className="px-[var(--header-button-padding)] text-[var(--header-font-size-small)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
            >
              Help
            </button>
            <button
              onClick={onHistoryClick}
              className="px-[var(--header-button-padding)] text-[var(--header-font-size-small)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
            >
              History
            </button>
            <button
              onClick={onAdvancedClick}
              className="px-[var(--header-button-padding)] text-[var(--header-font-size-small)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
            >
              Advanced
            </button>
          </>
        )}
        
        <button
          onClick={onHideToggle}
          className="p-[var(--header-icon-padding)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
        >
          ⌄
        </button>
        
        <button
          onClick={onClose}
          className="p-[var(--header-icon-padding)] bg-[var(--button-background)] border border-[var(--button-border)] rounded text-[var(--icon-button-color)] hover:bg-[var(--hover-background)] transition-colors"
        >
          ✕
        </button>
      </div>
    </header>
  );
};

export default AppHeader;