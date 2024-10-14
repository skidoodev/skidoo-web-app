import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

const steps = [
  { label: 'Destination' },
  { label: 'Travel Preferences' },
  { label: 'Traveler Type' }
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center space-x-2">
          {index < currentStep ? (
            <CheckCircle className="text-[#1C423C]" />
          ) : index === currentStep ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Circle className="text-blue-700" />
            </motion.div>
          ) : (
            <Circle className="text-gray-400" />
          )}
          <span></span>
        </div>
      ))}
    </div>
  );
}
