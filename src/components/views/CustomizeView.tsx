import React from 'react';
import { AppState } from '@/types';

interface CustomizeViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const CustomizeView: React.FC<CustomizeViewProps> = (props) => {
  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Settings</h2>
      <p className="text-[var(--description-color)]">
        Settings and customization options will be implemented here.
      </p>
    </div>
  );
};

export default CustomizeView;