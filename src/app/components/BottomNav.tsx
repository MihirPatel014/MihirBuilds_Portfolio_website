import { Home, Workflow, Info, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

export function BottomNav() {
  const location = useLocation();
  const { trigger } = useWebHaptics();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Workflow', path: '/workflow-automation', icon: Workflow },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden px-4 w-full max-w-sm">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-6 py-3 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => trigger('nudge')}
              className="relative flex flex-col items-center group"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-100 text-blue-600 scale-110' 
                  : 'text-gray-400 group-hover:text-blue-500 hover:bg-blue-50'
              }`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-[10px] mt-1 font-bold tracking-tight transition-all duration-300 ${
                isActive ? 'text-blue-600 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
              }`}>
                {item.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
