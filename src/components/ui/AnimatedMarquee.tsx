'use client';

import { motion } from 'motion/react';

interface IntegrationLogo {
  name: string;
  category: string;
  badgeColor: string;
}

export function AnimatedMarquee() {
  const integrations: IntegrationLogo[] = [
    { name: 'WhatsApp Business API', category: 'Messaging', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'OpenAI GPT-4o', category: 'AI Models', badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
    { name: 'HubSpot CRM', category: 'Sales & Leads', badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { name: 'Make.com', category: 'Workflows', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'Zapier', category: 'Automation', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { name: 'Slack API', category: 'Team Alerts', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'Google Workspace', category: 'Email & Sheets', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'Salesforce CRM', category: 'Enterprise', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { name: 'Notion API', category: 'Docs & Database', badgeColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
  ];

  // Repeat items for seamless loop
  const list = [...integrations, ...integrations];

  return (
    <div className="relative w-full overflow-hidden py-8 bg-slate-950/80 border-y border-slate-800/80 backdrop-blur-md">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

      <motion.div
        className="flex space-x-6 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-sm hover:border-slate-700 transition-colors shrink-0"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-white">{item.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
              {item.category}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
