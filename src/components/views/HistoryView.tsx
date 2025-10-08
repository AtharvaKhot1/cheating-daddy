import React from 'react';
import { AppState } from '@/types';

interface HistoryViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = (props) => {
  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">History</h2>
      <p className="text-[var(--description-color)]">
        Conversation history will be displayed here.
      </p>
    </div>
  );
};

export default HistoryView;