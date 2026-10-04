import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
    ? 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]'
    : 'bg-[#0F172A]';

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${bgClass} rounded-3xl p-10 sm:p-14 md:p-16 text-center relative overflow-hidden shadow-2xl border border-slate-800`}
        >
          {/* Decorative Glow Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-teal-400" />
              <span className="text-teal-300 text-xs sm:text-sm font-semibold tracking-wide">Accelerate Business Growth</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={primaryButtonLink} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-all group"
                >
                  <span>{primaryButtonText}</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform text-[#2563EB]" />
                </motion.button>
              </Link>

              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink} className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-white border border-slate-700 bg-slate-800/60 hover:bg-slate-800 transition-all"
                  >
                    {secondaryButtonText}
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
