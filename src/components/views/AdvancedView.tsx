import React from 'react';
import { AppState } from '@/types';

interface AdvancedViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const AdvancedView: React.FC<AdvancedViewProps> = (props) => {
  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Advanced Settings</h2>
      <p className="text-[var(--description-color)]">
        Advanced configuration options will be implemented here.
      </p>
    </div>
  );
};

export default AdvancedView;