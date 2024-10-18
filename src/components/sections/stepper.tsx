import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

const steps = [
  { label: 'Get Started' },
  { label: 'Destination' },
  { label: 'Travel Preferences' }
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }} 
    className="flex justify-between mb-6 gap-2">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center space-x-2">
          {index < currentStep ? (
            <>
              <CheckCircle className="text-[#1C423C]" />
            </>
          ) : index === currentStep ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Circle className="text-[#1C423C]" />
            </motion.div>
          ) : (
            <>
              <Circle className="text-gray-400" />
            </>
          )}
        </div>
      ))}
    </motion.div>
  );
}
