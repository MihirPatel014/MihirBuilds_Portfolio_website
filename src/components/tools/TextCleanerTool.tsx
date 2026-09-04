'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Copy,
  Check,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Scissors,
  Layers,
  ArrowUpDown,
  Search,
  Replace,
  CheckCircle2,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_TEXT = `<h1>Welcome to MihirBuilds</h1>
   This   text    contains     extra    spaces.

123 Here is a line with numbers 456!
Duplicate line test 🚀
Duplicate line test 🚀
<p>Another <b>HTML</b> paragraph.</p>
`;

export function TextCleanerTool() {
  const { trigger } = useWebHaptics();
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [findQuery, setFindQuery] = useState<string>('');
  const [replaceQuery, setReplaceQuery] = useState<string>('');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Whitespace Cleaning Actions
  const removeExtraSpaces = () => {
    trigger('nudge');
    setText(text.replace(/[^\S\r\n]+/g, ' ').replace(/^ +| +$/gm, ''));
  };

  const removeAllSpaces = () => {
    trigger('nudge');
    setText(text.replace(/[^\S\r\n]/g, ''));
  };

  const removeEmptyLines = () => {
    trigger('nudge');
    setText(
      text
        .split('\n')
        .filter((l) => l.trim().length > 0)
        .join('\n')
    );
  };

  const removeAllLineBreaks = () => {
    trigger('nudge');
    setText(text.replace(/[\r\n]+/g, ' '));
  };

  const trimEachLine = () => {
    trigger('nudge');
    setText(
      text
        .split('\n')
        .map((l) => l.trim())
        .join('\n')
    );
  };

  // Content & Character Cleaning Actions
  const stripHtmlTags = () => {
    trigger('nudge');
    setText(text.replace(/<[^>]*>?/gm, ''));
  };

  const removeNumbers = () => {
    trigger('nudge');
    setText(text.replace(/[0-9]/g, ''));
  };

  const removePunctuation = () => {
    trigger('nudge');
    setText(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>@\[\]\\|]/g, ''));
  };

  const removeEmojis = () => {
    trigger('nudge');
    setText(
      text.replace(
        /([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF])/g,
        ''
      )
    );
  };

  const removeDuplicateLines = () => {
    trigger('nudge');
    const lines = text.split('\n');
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
  };

  const sortLinesAsc = () => {
    trigger('nudge');
    const lines = text.split('\n');
    lines.sort((a, b) => a.localeCompare(b));
    setText(lines.join('\n'));
  };

  const sortLinesDesc = () => {
    trigger('nudge');
    const lines = text.split('\n');
    lines.sort((a, b) => b.localeCompare(a));
    setText(lines.join('\n'));
  };

  const numberLines = () => {
    trigger('nudge');
    const lines = text.split('\n');
    const numbered = lines.map((line, idx) => `${idx + 1}. ${line}`);
    setText(numbered.join('\n'));
  };

  // Find and Replace
  const handleFindReplace = () => {
    if (!findQuery) return;
    trigger('success');
    const flags = caseSensitive ? 'g' : 'gi';
    const escaped = findQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    setText(text.replace(regex, replaceQuery));
  };

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    return { chars, words, lines };
  }, [text]);

  const faqs = [
    {
      q: 'What is the Text Cleaner & Formatter?',
      a: 'It is a comprehensive online text manipulation tool that helps you remove redundant whitespace, strip HTML markup, eliminate duplicate lines, remove numbers/emojis/punctuation, sort lines, and run find & replace in seconds.',
    },
    {
      q: 'Does it support bulk text processing?',
      a: 'Yes. You can paste thousands of lines of raw text, transcripts, CSVs, or code. Processing runs 100% in your local browser with no file size limits or network delays.',
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
          <Link href="/tools?category=text-tools" className="hover:text-blue-600 transition-colors">Text & Formatting</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Text Cleaner & Formatter</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Sparkles size={14} />
            <span>Text Utility</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Text Cleaner & Formatter
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Clean redundant spaces, strip HTML tags, remove empty lines, delete duplicate rows, sort text, and find & replace.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Browser Execution • 100% Private</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Text Area Box */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Text Editor ({stats.chars} characters • {stats.words} words • {stats.lines} lines)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
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
            placeholder="Type or paste your text here..."
            className="w-full h-80 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y font-mono"
            spellCheck={false}
          />
        </div>

        {/* Cleaning Action Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Whitespace & Line Tools */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-['Asap'] pb-2 border-b border-gray-100">
              Whitespace & Line Cleaner
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={removeExtraSpaces}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove Extra Spaces
              </button>
              <button
                type="button"
                onClick={removeEmptyLines}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove Empty Lines
              </button>
              <button
                type="button"
                onClick={trimEachLine}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Trim Leading/Trailing Spaces
              </button>
              <button
                type="button"
                onClick={removeAllLineBreaks}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove All Line Breaks
              </button>
              <button
                type="button"
                onClick={removeAllSpaces}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove All Spaces
              </button>
              <button
                type="button"
                onClick={numberLines}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Add Line Numbers
              </button>
            </div>
          </div>

          {/* Section 2: Character & Content Tools */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-['Asap'] pb-2 border-b border-gray-100">
              Characters & HTML Cleaner
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={stripHtmlTags}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Strip HTML Tags
              </button>
              <button
                type="button"
                onClick={removeDuplicateLines}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove Duplicate Lines
              </button>
              <button
                type="button"
                onClick={sortLinesAsc}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Sort Lines A → Z
              </button>
              <button
                type="button"
                onClick={sortLinesDesc}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Sort Lines Z → A
              </button>
              <button
                type="button"
                onClick={removeNumbers}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove All Numbers
              </button>
              <button
                type="button"
                onClick={removeEmojis}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-gray-800 text-xs font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
              >
                Remove Emojis
              </button>
            </div>
          </div>
        </div>

        {/* Find & Replace Box */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-[#0F172A] font-['Asap'] pb-2 border-b border-gray-100 flex items-center gap-1.5">
            <Replace size={16} className="text-blue-600" />
            Find & Replace Text
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-4">
              <input
                type="text"
                placeholder="Find text..."
                value={findQuery}
                onChange={(e) => setFindQuery(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div className="sm:col-span-4">
              <input
                type="text"
                placeholder="Replace with..."
                value={replaceQuery}
                onChange={(e) => setReplaceQuery(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div className="sm:col-span-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCaseSensitive(!caseSensitive)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  caseSensitive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-gray-700 border-gray-200'
                }`}
              >
                Aa
              </button>
              <button
                type="button"
                onClick={handleFindReplace}
                disabled={!findQuery}
                className="flex-1 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
              >
                Replace All
              </button>
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
