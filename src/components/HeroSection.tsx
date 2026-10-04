'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90dvh] pt-28 pb-16 flex items-center overflow-hidden bg-slate-950 text-white">
      {/* Animated Radial Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full mb-6 text-xs sm:text-sm font-medium text-teal-400 shadow-sm">
              <Sparkles size={15} className="text-teal-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen Automation Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Scale Your Business With Intelligent
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-[length:200%_auto] animate-pulse bg-clip-text text-transparent">
                WhatsApp, Email & Workflow Systems
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              We design custom automation pipelines that handle customer communications, lead qualification, and cross-platform workflows 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/30">
                  <span>Book a Free Demo</span>
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/whatsapp-automation" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-200 bg-slate-900/60 hover:bg-slate-800 hover:text-white">
                  Explore Solutions
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-6 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">10x</div>
                <div className="text-xs text-slate-400 mt-0.5">Faster Response</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-teal-400">95%</div>
                <div className="text-xs text-slate-400 mt-0.5">Time Saved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">24/7</div>
                <div className="text-xs text-slate-400 mt-0.5">Uptime & Ops</div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTg2MDA4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business Automation Pipeline"
                width={1080}
                height={720}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Live Workflow Engine</div>
                    <div className="text-[11px] text-slate-400">Automated lead qualification active</div>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Running
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
