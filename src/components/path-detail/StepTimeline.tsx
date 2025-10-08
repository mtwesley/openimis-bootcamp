import React from 'react';
import type { Step } from '../../types';

interface StepTimelineProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (stepRank: number) => void;
}

const StepTimeline: React.FC<StepTimelineProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {steps.map((step, index) => (
        <li key={step.rank} className="mb-10 ml-4">
          <div
            className={`absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700 ${activeStep === index ? 'bg-blue-500' : ''}`}>
          </div>
          <button onClick={() => onStepClick(index)} className="text-left">
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Step {index + 1}</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
          </button>
        </li>
      ))}
    </ol>
  );
};

export default StepTimeline;
