'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { MessageSquare, Sparkles, Database, Send, CheckCircle2, Play } from 'lucide-react';

export function AnimatedNodePipeline() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 1200);
    setTimeout(() => setActiveStep(3), 2400);
    setTimeout(() => {
      setActiveStep(1);
      setIsSimulating(false);
    }, 3800);
  };

  return (
    <div className="bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-tight">Interactive Workflow Beam Matrix</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">Simulate live trigger packets flowing through your automation pipeline</p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-600 text-white transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          <Play size={14} className={isSimulating ? 'animate-spin' : ''} />
          <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Live Packet'}</span>
        </button>
      </div>

      {/* Node Pipeline Diagram */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {/* Node 1: Trigger */}
        <motion.div
          animate={{ scale: activeStep === 1 ? 1.03 : 1 }}
          className={`p-5 rounded-2xl border transition-all duration-300 relative ${
            activeStep === 1
              ? 'bg-emerald-950/40 border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              STEP 01
            </span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">WhatsApp Lead Inbound</h4>
          <p className="text-xs text-slate-400">Prospect sends pricing request via WhatsApp business chat.</p>
        </motion.div>

        {/* Node 2: AI Processor */}
        <motion.div
          animate={{ scale: activeStep === 2 ? 1.03 : 1 }}
          className={`p-5 rounded-2xl border transition-all duration-300 relative ${
            activeStep === 2
              ? 'bg-blue-950/40 border-blue-500/80 shadow-[0_0_25px_rgba(37,99,235,0.2)]'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              STEP 02
            </span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">AI Logic & Qualification</h4>
          <p className="text-xs text-slate-400">GPT-4o qualifies budget, extracts contact details & generates auto-response.</p>
        </motion.div>

        {/* Node 3: Action */}
        <motion.div
          animate={{ scale: activeStep === 3 ? 1.03 : 1 }}
          className={`p-5 rounded-2xl border transition-all duration-300 relative ${
            activeStep === 3
              ? 'bg-teal-950/40 border-teal-500/80 shadow-[0_0_25px_rgba(20,184,166,0.2)]'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Database size={20} />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
              STEP 03
            </span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">CRM Sync & Team Notification</h4>
          <p className="text-xs text-slate-400">Lead added to CRM database + Slack team notification sent instantly.</p>
        </motion.div>
      </div>

      {/* Execution Console Status */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span className="flex items-center space-x-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>Status: {isSimulating ? `Executing Step 0${activeStep}...` : 'Pipeline Ready (0ms latency)'}</span>
        </span>
        <span className="hidden sm:inline text-slate-500">MihirBuilds Automated Webhook Bus</span>
      </div>
    </div>
  );
}
