import React from 'react';
import { AppState } from '@/types';

interface AssistantViewProps extends AppState {
  onStart: () => void;
  onStatusUpdate: (status: string) => void;
}

const AssistantView: React.FC<AssistantViewProps> = ({ responses, statusText }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {responses.length > 0 ? (
          <div className="space-y-4">
            {responses.map((response, index) => (
              <div
                key={index}
                className="p-4 bg-[var(--input-background)] rounded-lg border border-[var(--button-border)] text-[var(--text-color)]"
              >
                {response}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-[var(--description-color)] text-lg">
                {statusText || 'Waiting for AI response...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantView;