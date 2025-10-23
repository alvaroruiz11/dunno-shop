import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function CustomStepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          <Step
            title={step.title}
            description={step.description}
            isCompleted={index < currentStep}
            isActive={index === currentStep}
            index={index + 1}
          />
          {index < steps.length - 1 && (
            <ChevronRight className="hidden md:block text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

interface Props {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  index: number;
}

export const Step = ({
  title,
  description,
  isActive,
  isCompleted,
  index,
}: Props) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            'w-8.5 h-8.5 rounded-full border flex items-center justify-center',
            isCompleted
              ? 'border-primary bg-primary text-primary-foreground'
              : isActive
              ? 'border-primary'
              : 'border-muted'
          )}
        >
          {isCompleted ? (
            <Check className="w-5 h-5" />
          ) : (
            <span className="font-medium">{index}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p
          className={cn(
            'font-semibold text-xl font-din-next',
            isActive || isCompleted
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};
