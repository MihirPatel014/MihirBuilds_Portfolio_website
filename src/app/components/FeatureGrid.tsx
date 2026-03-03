import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FeatureGridItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureGridItem({ icon: Icon, title, description, index }: FeatureGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#14B8A6]/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-[#2563EB]" />
      </div>
      <h4 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
