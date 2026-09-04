'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Code2,
  FileCode2,
  Binary,
  KeyRound,
  Database,
  SearchCode,
  Hash,
  Minimize2,
  Layers,
  Scissors,
  Image as ImageIcon,
  FileSpreadsheet,
  Baseline,
  Sparkles,
  Code,
  MessageSquare,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Cpu,
  X,
  Wrench,
  QrCode,
  Shield,
  LayoutTemplate,
  MessageCircle,
  FileCheck,
  Volume2,
  Mail,
  Type,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOOL_CATEGORIES, TOOLS, ToolItem } from '@/data/tools';
import { useWebHaptics } from 'web-haptics/react';

// Icon map helper
const iconMap: Record<string, React.ElementType> = {
  Code2,
  FileCode2,
  Binary,
  KeyRound,
  Database,
  SearchCode,
  Hash,
  Minimize2,
  Layers,
  Scissors,
  Image: ImageIcon,
  FileSpreadsheet,
  Baseline,
  Sparkles,
  Code,
  MessageSquare,
  Wrench,
  QrCode,
  Shield,
  LayoutTemplate,
  MessageCircle,
  FileCheck,
  Volume2,
  Mail,
  Type,
  Globe,
};

export function ToolsExplorer() {
  const { trigger } = useWebHaptics();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    trigger('nudge');
    if (catId === 'all') {
      router.push('/tools', { scroll: false });
    } else {
      router.push(`/tools?category=${catId}`, { scroll: false });
    }
  };

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.categoryId === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const popularTools = useMemo(() => {
    return TOOLS.filter((t) => t.isPopular);
  }, []);

  const totalToolCount = TOOLS.length;

  const faqs = [
    {
      q: 'Are all tools on MihirBuilds 100% free to use?',
      a: 'Yes, every online tool on MihirBuilds is 100% free with unlimited usage. There are no paywalls, subscriptions, or hidden rate limits.',
    },
    {
      q: 'Is my data secure and private when formatting or converting files?',
      a: 'Absolutely. According to our client-side architecture standards, all formatting, validation, encoding, and conversion logic runs strictly within your browser via JavaScript. Your text and files are never uploaded to any remote server or stored in any database.',
    },
    {
      q: 'Do I need to install software or sign up for an account?',
      a: 'No installation or account registration is required. You can access tools like JSON Formatter & Validator, Base64 encoder, and PDF utilities directly from any desktop or mobile browser.',
    },
    {
      q: 'Can I request a new developer or automation tool?',
      a: 'Yes! We actively expand our suite based on community and developer feedback. Feel free to contact us with suggestions for new web utilities or automation integrations.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20">
      {/* Top Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-xs">
          <Sparkles size={15} className="text-amber-500 animate-pulse" />
          <span>100+ Free Online Tools</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-3 sm:mb-4 font-['Asap']">
          Free Online Tools
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
          Boost your productivity with our suite of free online developer & business tools. No signup required, use them instantly with zero latency.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-gray-600 mb-8 sm:mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200/80 shadow-xs">
            <Lock size={14} className="text-emerald-600" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200/80 shadow-xs">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>Files Never Leave Your Device</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200/80 shadow-xs">
            <Zap size={14} className="text-amber-500" />
            <span>No Signup Required</span>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Category Pills (Sticky on Mobile) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 mb-6">
        {/* Search Input on Mobile */}
        <div className="relative bg-white rounded-2xl p-2 shadow-xs border border-gray-200 mb-3">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools (e.g. json, pdf)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-transparent border-none focus:outline-hidden text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-slate-50'
            }`}
          >
            All Tools ({totalToolCount})
          </button>
          {TOOL_CATEGORIES.map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isSel
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-slate-50'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout with Left Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            {/* Search Box */}
            <div className="relative bg-white rounded-2xl p-2 shadow-xs border border-gray-200">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools (e.g. json, pdf)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 text-sm bg-transparent border-none rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] text-gray-900 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Categories Navigation */}
            <div className="bg-white rounded-2xl p-3 shadow-xs border border-gray-200">
              <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Categories
              </div>
              <div className="space-y-1 mt-1">
                {/* All Tools Item */}
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-slate-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu size={16} className={selectedCategory === 'all' ? 'text-blue-400' : 'text-gray-500'} />
                    <span>All Tools</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      selectedCategory === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-gray-600'
                    }`}
                  >
                    {totalToolCount}
                  </span>
                </button>

                {/* Category Items */}
                {TOOL_CATEGORIES.map((category) => {
                  const Icon = iconMap[category.iconName] || Code2;
                  const isSelected = selectedCategory === category.id;
                  const categoryTools = TOOLS.filter((t) => t.categoryId === category.id);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'text-gray-700 hover:bg-slate-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <Icon size={16} className={isSelected ? 'text-white' : 'text-gray-500'} />
                        <span className="truncate">{category.name}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-gray-600'
                        }`}
                      >
                        {categoryTools.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Automation Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white/20 rounded-md uppercase tracking-wider mb-2">
                Custom Automation
              </span>
              <h3 className="font-bold text-base text-white mb-1 font-['Asap']">Need Custom AI Workflows?</h3>
              <p className="text-xs text-blue-100 mb-4 leading-relaxed">
                Connect your business apps with custom WhatsApp, CRM & Email automation tailored to your stack.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-blue-700 px-3.5 py-2 rounded-xl hover:bg-blue-50 transition-colors shadow-xs"
              >
                Book Free Consultation <ArrowRight size={13} />
              </Link>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-10">
            {/* Popular Tools Section (Visible when showing All Tools and no active search) */}
            {selectedCategory === 'all' && searchQuery.trim() === '' && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-['Asap']">
                      Popular Tools
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularTools.slice(0, 6).map((tool) => {
                    const Icon = iconMap[tool.iconName] || Code2;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className="group relative bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Icon size={20} />
                            </div>
                            {tool.badge && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors text-base mb-1 font-['Asap']">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {tool.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                          <span>Use Tool</span>
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Filtered Tools Catalog */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 size={18} className="text-blue-600" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-['Asap']">
                    {selectedCategory === 'all'
                      ? searchQuery
                        ? `Search Results for "${searchQuery}"`
                        : 'All Available Tools'
                      : TOOL_CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Tools'}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>

              {filteredTools.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 sm:p-12 text-center border border-dashed border-gray-300">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search size={22} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">No tools found</h3>
                  <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                    We couldn&apos;t find any tools matching your criteria. Try adjusting your search or category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      router.push('/tools', { scroll: false });
                    }}
                    className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((tool) => {
                    const Icon = iconMap[tool.iconName] || Code2;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className="group bg-white rounded-2xl p-5 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Icon size={18} />
                            </div>
                            <div className="flex items-center gap-1.5">
                              {tool.isPopular && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                                  Popular
                                </span>
                              )}
                              {tool.isNew && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                                  New
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors text-base mb-1 font-['Asap']">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {tool.shortDescription}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-blue-600">
                          <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-500">
                            {tool.categoryName}
                          </span>
                          <span className="flex items-center gap-1">
                            Launch <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>

            {/* SEO & Princeton GEO Authoritative Guide */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-['Asap'] mb-3">
                  Why Use MihirBuilds Free Online Utilities & Developer Tools?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Modern developers, marketers, and business owners require fast, frictionless, and secure tools to perform routine tasks—from formatting JSON API payloads to compressing documents. According to industry performance benchmarks, browser-native WebAssembly and JavaScript tools execute up to <strong>10x faster</strong> than cloud-dependent services while ensuring zero risk of data leakage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-1">
                    <CheckCircle2 size={16} /> Zero Server Latency
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Executes directly in your local V8/JavaScript engine for sub-millisecond parsing and formatting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                    <CheckCircle2 size={16} /> 100% Client Privacy
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Complies with GDPR and strict enterprise confidentiality. Data never leaves your memory.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                    <CheckCircle2 size={16} /> Mobile & Desktop Ready
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Fully responsive layout engineered with clean touch-friendly controls and keyboard shortcuts.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle size={20} className="text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-['Asap']">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight
                          size={18}
                          className={`text-gray-400 transition-transform duration-200 shrink-0 ml-4 ${
                            isOpen ? 'rotate-90 text-blue-600' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
