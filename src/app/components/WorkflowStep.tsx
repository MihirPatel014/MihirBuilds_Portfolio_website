import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
  isLast?: boolean;
}

export function WorkflowStep({ icon: Icon, title, description, step, isLast }: WorkflowStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Connecting Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#2563EB] to-[#14B8A6]" />
      )}
      
      {/* Step Circle */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: step * 0.1 }}
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6"
      >
        <Icon size={48} className="text-white" />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2563EB] font-bold text-sm shadow-md">
          {step}
        </div>
      </motion.div>
      
      {/* Content */}
      <h4 className="text-xl font-semibold text-[#0F172A] mb-3">{title}</h4>
      <p className="text-gray-600 text-sm max-w-xs">{description}</p>
    </div>
  );
}
