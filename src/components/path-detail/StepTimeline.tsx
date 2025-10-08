import React from 'react';
import type { Step } from '../../types';

interface StepTimelineProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (stepRank: number) => void;
}

const StepTimeline: React.FC<StepTimelineProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <ol className="relative border-l-2 border-primary/20">
      {steps.map((step, index) => (
        <li key={step.rank} className="mb-8 ml-6">
          <div
            className={`absolute w-4 h-4 rounded-full mt-1.5 -left-2 border-2 transition-all duration-200 ${
              activeStep === index
                ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                : 'bg-white border-gray-300'
            }`}>
          </div>
          <button
            onClick={() => onStepClick(index)}
            className={`text-left p-4 rounded-lg transition-all duration-200 hover:bg-primary/5 border border-transparent hover:border-primary/20 ${
              activeStep === index ? 'bg-primary/10 border-primary/30' : ''
            }`}>
            <div className="flex items-center mb-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                activeStep === index
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                Step {index + 1}
              </span>
            </div>
            <h3 className={`text-lg font-semibold transition-colors ${
              activeStep === index
                ? 'text-primary'
                : 'text-gray-900 hover:text-primary'
            }`}>
              {step.title}
            </h3>
          </button>
        </li>
      ))}
    </ol>
  );
};

export default StepTimeline;
