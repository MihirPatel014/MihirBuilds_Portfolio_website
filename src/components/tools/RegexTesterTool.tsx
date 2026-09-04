'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  SearchCode,
  Copy,
  Check,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const PRESETS = [
  { name: 'Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', text: 'contact@mihirbuilds.com\ninvalid_email@\ntest.user@domain.co.uk' },
  { name: 'Phone (International)', pattern: '^\\+?[1-9]\\d{1,14}$', text: '+14155552671\n+919876543210\n123' },
  { name: 'URL / Domain', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', text: 'https://www.mihirbuilds.com/tools\nhttp://sub.domain.org/path?id=123' },
  { name: 'IPv4 Address', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', text: '192.168.1.1\n255.255.255.0\n999.1.1.1' },
];

export function RegexTesterTool() {
  const { trigger } = useWebHaptics();
  const [pattern, setPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
  });
  const [testText, setTestText] = useState<string>(
    'Reach us at support@mihirbuilds.com or sales@example.org for questions!'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Parse regex & matches
  const { matches, error, flagString } = useMemo(() => {
    let flagStr = '';
    if (flags.g) flagStr += 'g';
    if (flags.i) flagStr += 'i';
    if (flags.m) flagStr += 'm';
    if (flags.s) flagStr += 's';

    if (!pattern) return { matches: [], error: null, flagString: flagStr };

    try {
      const regex = new RegExp(pattern, flagStr);
      const results: { match: string; index: number; groups?: string[] }[] = [];

      if (flags.g) {
        let m;
        while ((m = regex.exec(testText)) !== null) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      } else {
        const m = regex.exec(testText);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }

      return { matches: results, error: null, flagString: flagStr };
    } catch (err: any) {
      return { matches: [], error: err.message, flagString: flagStr };
    }
  }, [pattern, flags, testText]);

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(`/${pattern}/${flagString}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'What do the regex flags mean?',
      a: '`g` (Global) finds all matches instead of stopping after the first match. `i` (Case Insensitive) matches regardless of upper/lowercase. `m` (Multiline) treats ^ and $ as beginning and end of each line. `s` (Dotall) allows the dot . to match newlines.',
    },
    {
      q: 'Is my input text private?',
      a: 'Yes. Regular expressions execute purely client-side in your browser engine with 0 server uploads.',
    },
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
          <Link href="/tools?category=developer-tools" className="hover:text-blue-600 transition-colors">Developer Tools</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Regex Tester & Explainer</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <SearchCode size={14} />
            <span>Developer Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Regex Tester & Explainer
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Test and debug regular expressions with instant real-time match highlighting, capturing groups, and presets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Engine • Zero Server Calls</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Presets Strip */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 pl-1">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setPattern(p.pattern);
                setTestText(p.text);
                trigger('nudge');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Pattern Input & Flags */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Regular Expression Pattern</span>
            {/* Flags */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400 mr-1">Flags:</span>
              {(['g', 'i', 'm', 's'] as const).map((flag) => (
                <button
                  key={flag}
                  type="button"
                  onClick={() => {
                    setFlags({ ...flags, [flag]: !flags[flag] });
                    trigger('nudge');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    flags[flag]
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                  }`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400 font-mono text-base">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. [a-z0-9]+"
              className="w-full pl-8 pr-12 py-3 bg-slate-50 border border-gray-200 rounded-2xl font-mono text-sm sm:text-base text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
            />
            <span className="absolute right-4 text-gray-400 font-mono text-base">/{flagString}</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Test String Input & Match Highlighting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Test Textarea */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Test Text</span>
                <span className="text-xs font-semibold text-blue-600">{matches.length} matches found</span>
              </div>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Type or paste sample text to test..."
                className="w-full h-64 p-4 bg-slate-50 border border-gray-200 rounded-2xl font-mono text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Matches List */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Extracted Matches & Groups</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Regex'}</span>
                </button>
              </div>

              <div className="h-64 overflow-y-auto space-y-2 pr-1">
                {matches.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400">
                    No matches found for current pattern.
                  </div>
                ) : (
                  matches.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-700">Match #{idx + 1}</span>
                        <span className="text-gray-400 text-[10px]">Index: {m.index}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200 text-gray-900 break-all">
                        {m.match}
                      </div>
                      {m.groups && m.groups.length > 0 && (
                        <div className="text-[11px] text-gray-500 pt-1">
                          Groups: {m.groups.map((g, gi) => `$${gi + 1}: "${g}"`).join(', ')}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
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
