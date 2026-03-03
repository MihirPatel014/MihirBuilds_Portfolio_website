import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  link: string;
  gradient: string;
}

export function ServiceCard({ icon: Icon, title, description, benefits, link, gradient }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
        <Icon size={32} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] mt-2 flex-shrink-0" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>
      
      <Link to={link}>
        <Button variant="outline" size="sm" className="w-full">
          Learn More
        </Button>
      </Link>
    </motion.div>
  );
}
