'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Code2, FileCode2, Sparkles, Binary, KeyRound, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';
import { Button } from './Button';

export function Navbar() {
  const { trigger } = useWebHaptics();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'WhatsApp Automation', path: '/whatsapp-automation' },
    { name: 'Email Automation', path: '/email-automation' },
    { name: 'Workflow Automation', path: '/workflow-automation' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isToolsActive = pathname?.startsWith('/tools');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-xs bg-white">
              <img src="/apple-touch-icon.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#0F172A]">MihirBuilds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            <Link
              href="/"
              className={`relative text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
            >
              Home
              {pathname === '/' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.4rem] left-0 right-0 h-0.5 bg-[#2563EB]"
                />
              )}
            </Link>

            {/* Tools Dropdown Menu */}
            <div
              ref={dropdownRef}
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
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-200">Free</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                {isToolsActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.4rem] left-0 right-0 h-0.5 bg-[#2563EB]"
                  />
                )}
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 rounded-2xl bg-white shadow-xl border border-gray-100 p-3 z-50"
                  >
                    <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 size={16} className="text-[#2563EB]" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Developer Tools</span>
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
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                                  {tool.name}
                                </span>
                                {tool.badge && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate mt-0.5">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 bg-slate-50/70 -mx-3 -mb-3 p-3 rounded-b-2xl">
                      <Link
                        href="/tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="flex items-center justify-between text-xs font-semibold text-gray-700 hover:text-[#2563EB]"
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

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition-colors ${pathname === link.path ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1.4rem] left-0 right-0 h-0.5 bg-[#2563EB]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">Book a Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              trigger('nudge');
            }}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg font-medium ${pathname === '/' ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-gray-100'}`}
              >
                Home
              </Link>

              {/* Mobile Tools Collapsible */}
              <div className="rounded-lg border border-gray-100 bg-slate-50/60 p-2">
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-[#2563EB]" />
                    <span>Free Tools & Utilities</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">New</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileToolsOpen && (
                  <div className="mt-2 space-y-1.5 pl-2 border-t border-gray-200/60 pt-2">
                    <Link
                      href="/tools"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-white rounded-md"
                    >
                      → All Tools Directory
                    </Link>
                    <Link
                      href="/tools/json-formatter"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-white rounded-md"
                    >
                      • JSON Formatter & Validator
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg font-medium ${pathname === link.path ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-gray-100'}`}
                >
                  {link.name}
                </Link>
              ))}

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

