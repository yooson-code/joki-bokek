"use client";

import Link from "next/link";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function Stepper({ currentStep, totalSteps, steps }: StepperProps) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-light text-sm ${
                  index < currentStep - 1
                    ? "bg-gray-900 text-white"
                    : index === currentStep - 1
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep - 1 ? "✓" : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    index < currentStep - 1 ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <p className="text-center text-xs mt-2 text-gray-600 font-light">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
