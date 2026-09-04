'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Baseline,
  Copy,
  Check,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Wand2,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_TEXT = 'convert this text into multiple cases easily with mihir builds!';

export function CaseConverterTool() {
  const { trigger } = useWebHaptics();
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Conversion functions
  const toUpperCase = (str: string) => str.toUpperCase();
  const toLowerCase = (str: string) => str.toLowerCase();

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      )
      .replace(/[\s\-_]+/g, '');
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
      .replace(/[\s\-_]+/g, '');
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s\-]+/g, '_')
      .replace(/[^\w_]/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w\-]/g, '');
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('');
  };

  const applyCase = (caseFunc: (s: string) => string) => {
    trigger('nudge');
    setText(caseFunc(text));
  };

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'What is the difference between Title Case and Sentence case?',
      a: 'Title Case capitalizes the first letter of every word (e.g. "Hello World From MihirBuilds"), while Sentence case only capitalizes the first letter of each sentence following periods or punctuation.',
    },
    {
      q: 'When should you use camelCase vs snake_case vs kebab-case?',
      a: '`camelCase` is standard for JavaScript/TypeScript variables. `snake_case` is common in Python, database columns, and APIs. `kebab-case` is standard for URLs, slugs, and CSS classes.',
    },
  ];

  const caseActions = [
    { name: 'UPPERCASE', fn: toUpperCase },
    { name: 'lowercase', fn: toLowerCase },
    { name: 'Title Case', fn: toTitleCase },
    { name: 'Sentence case', fn: toSentenceCase },
    { name: 'camelCase', fn: toCamelCase },
    { name: 'PascalCase', fn: toPascalCase },
    { name: 'snake_case', fn: toSnakeCase },
    { name: 'kebab-case', fn: toKebabCase },
    { name: 'aLtErNaTiNg cAsE', fn: toAlternatingCase },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
          <ChevronRight size={13} />
          <Link href="/tools?category=text-tools" className="hover:text-blue-600 transition-colors">Text & Formatting</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Case Converter</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Baseline size={14} />
            <span>Text Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Instant Transform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Case Converter & Text Transformer
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Instantly convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Browser Execution • Zero Server Logs</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Quick Transform Button Toolbar */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-xs flex flex-wrap items-center gap-2">
          {caseActions.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => applyCase(c.fn)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#2563EB] hover:text-white text-gray-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Text Area Box */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Text Editor ({text.length} characters • {text.trim() ? text.trim().split(/\s+/).length : 0} words)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy Result'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setText('');
                  trigger('nudge');
                }}
                className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                title="Clear"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to transform..."
            className="w-full h-80 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y font-sans"
          />
        </div>

        {/* FAQ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4 mt-12">
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-[#0F172A] font-['Asap']">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="rounded-2xl border border-gray-100 bg-slate-50/60 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight size={16} className={`text-gray-400 ${isOpen ? 'rotate-90 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/50 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
