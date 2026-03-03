import { motion } from 'motion/react';
import { Button } from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

interface CTABlockProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  background?: 'gradient' | 'dark';
}

export function CTABlock({
  title,
  description,
  primaryButtonText = 'Get Started',
  primaryButtonLink = '/contact',
  secondaryButtonText,
  secondaryButtonLink,
  background = 'gradient'
}: CTABlockProps) {
  const bgClass = background === 'gradient'
    ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6]'
    : 'bg-[#0F172A]';
  
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${bgClass} rounded-3xl p-12 md:p-16 text-center relative overflow-hidden`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={20} className="text-white" />
              <span className="text-white text-sm font-medium">Limited Time Offer</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={primaryButtonLink}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-[#2563EB] hover:bg-white/90 border-white min-w-[200px] group"
                >
                  {primaryButtonText}
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {secondaryButtonText && secondaryButtonLink && (
                <Link to={secondaryButtonLink}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-white border-white hover:bg-white/10 min-w-[200px]"
                  >
                    {secondaryButtonText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
