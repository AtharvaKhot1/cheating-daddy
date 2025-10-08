import React from 'react';
import { AppState } from '@/types';

interface HelpViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const HelpView: React.FC<HelpViewProps> = (props) => {
  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Help</h2>
      <p className="text-[var(--description-color)]">
        Help documentation and FAQ will be implemented here.
      </p>
    </div>
  );
};

export default HelpView;