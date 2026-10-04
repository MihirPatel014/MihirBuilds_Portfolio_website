'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Code2, 
  FileCode2, 
  Sparkles, 
  Binary, 
  KeyRound, 
  ArrowRight,
  MessageSquare,
  Mail,
  Workflow,
  Zap
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';
import { Button } from './Button';

export function Navbar() {
  const { trigger } = useWebHaptics();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      name: 'WhatsApp Automation',
      description: 'AI chatbots, lead capture & 24/7 instant auto-replies',
      path: '/whatsapp-automation',
      icon: MessageSquare,
      color: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600',
    },
    {
      name: 'Email Automation',
      description: 'Smart automated drip campaigns & lead nurture flows',
      path: '/email-automation',
      icon: Mail,
      color: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600',
    },
    {
      name: 'Workflow Automation',
      description: 'Custom multi-app integrations & business logic',
      path: '/workflow-automation',
      icon: Workflow,
      color: 'text-purple-600 bg-purple-50 group-hover:bg-purple-600',
    },
  ];

  const featuredTools = [
    {
      name: 'JSON Formatter & Validator',
      description: 'Format, beautify, validate & fix JSON instantly',
      path: '/tools/json-formatter',
      icon: FileCode2,
      badge: 'Popular',
    },
    {
      name: 'Base64 Encoder / Decoder',
      description: 'Encode and decode strings & files in real time',
      path: '/tools/base64-converter',
      icon: Binary,
      badge: null,
    },
    {
      name: 'JWT Debugger',
      description: 'Inspect and verify tokens securely client-side',
      path: '/tools/jwt-debugger',
      icon: KeyRound,
      badge: 'New',
    },
  ];

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = pathname === '/whatsapp-automation' || pathname === '/email-automation' || pathname === '/workflow-automation';
  const isToolsActive = pathname?.startsWith('/tools');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 shadow-xs bg-white group-hover:border-blue-500 transition-colors">
              <img src="/apple-touch-icon.png" alt="MihirBuilds Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#0F172A] tracking-tight">MihirBuilds</span>
          </Link>

          {/* Desktop Navigation - Strictly guaranteed 1-line layout */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`relative text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
            >
              Home
              {pathname === '/' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer py-2 ${isServicesActive ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                {isServicesActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-96 rounded-2xl bg-white shadow-xl border border-slate-100 p-3 z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                      <Zap size={15} className="text-[#2563EB]" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Automation Solutions</span>
                    </div>

                    <div className="space-y-1 mt-2">
                      {services.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all"
                          >
                            <div className={`p-2.5 rounded-lg shrink-0 group-hover:text-white transition-colors ${item.color}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2563EB] transition-colors block">
                                {item.name}
                              </span>
                              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools Dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setToolsDropdownOpen((prev) => !prev)}
                className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer py-2 ${isToolsActive ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
              >
                <span>Tools</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-200/60">Free</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                {isToolsActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 rounded-2xl bg-white shadow-xl border border-slate-100 p-3 z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 size={16} className="text-[#2563EB]" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Developer Tools</span>
                      </div>
                      <Link
                        href="/tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
                      >
                        All Tools <ArrowRight size={12} />
                      </Link>
                    </div>

                    <div className="space-y-1 mt-2">
                      {featuredTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.name}
                            href={tool.path}
                            onClick={() => setToolsDropdownOpen(false)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all"
                          >
                            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                                  {tool.name}
                                </span>
                                {tool.badge && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 truncate mt-0.5">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 bg-slate-50/70 -mx-3 -mb-3 p-3 rounded-b-2xl">
                      <Link
                        href="/tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#2563EB]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={14} className="text-amber-500" />
                          Explore 100+ Free Online Tools
                        </span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className={`relative text-sm font-medium transition-colors ${pathname === '/about' ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
            >
              About
              {pathname === '/about' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                />
              )}
            </Link>

            <Link
              href="/contact"
              className={`relative text-sm font-medium transition-colors ${pathname === '/contact' ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
            >
              Contact
              {pathname === '/contact' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.6rem] left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                />
              )}
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">Book a Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              trigger('nudge');
            }}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium text-sm ${pathname === '/' ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-slate-50'}`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#2563EB]" />
                    <span>Automation Services</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileServicesOpen && (
                  <div className="mt-2 space-y-1 pl-2 border-t border-slate-200/60 pt-2">
                    {services.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-slate-800 hover:bg-white rounded-lg transition-colors"
                      >
                        • {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Tools Accordion */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2">
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-[#2563EB]" />
                    <span>Free Tools & Utilities</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">New</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileToolsOpen && (
                  <div className="mt-2 space-y-1 pl-2 border-t border-slate-200/60 pt-2">
                    <Link
                      href="/tools"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-white rounded-lg"
                    >
                      → All Tools Directory
                    </Link>
                    {featuredTools.map((tool) => (
                      <Link
                        key={tool.path}
                        href={tool.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-white rounded-lg"
                      >
                        • {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium text-sm ${pathname === '/about' ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-slate-50'}`}
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium text-sm ${pathname === '/contact' ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-slate-50'}`}
              >
                Contact
              </Link>

              <div className="pt-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Book a Demo</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
