'use client';

import { Home, Zap, Code2, Info, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

export function BottomNav() {
  const pathname = usePathname();
  const { trigger } = useWebHaptics();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/whatsapp-automation', icon: Zap },
    { name: 'Tools', path: '/tools', icon: Code2 },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden px-3 w-full max-w-md pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-full shadow-[0_12px_40px_rgba(15,23,42,0.18)] px-3 py-2 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/' 
            ? pathname === '/' 
            : item.path === '/whatsapp-automation'
            ? (pathname === '/whatsapp-automation' || pathname === '/email-automation' || pathname === '/workflow-automation')
            : pathname?.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => trigger('nudge')}
              className="relative flex-1 flex flex-col items-center justify-center py-1 group transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-indicator"
                  className="absolute -top-1.5 w-1.5 h-1.5 bg-[#2563EB] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className={`p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                isActive 
                  ? 'bg-blue-50 text-[#2563EB]' 
                  : 'text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-100'
              }`}>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              
              <span className={`text-[10px] mt-0.5 font-semibold tracking-tight transition-colors duration-200 text-center ${
                isActive ? 'text-[#2563EB]' : 'text-slate-600 group-hover:text-slate-900'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
