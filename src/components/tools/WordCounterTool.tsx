'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Copy,
  Check,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Clock,
  Mic,
  AlignLeft,
  BookOpen,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_TEXT = `MihirBuilds creates cutting-edge workflow automations, intelligent WhatsApp bots, and developer utilities designed to streamline business operations and save thousands of hours every month. Our solutions empower modern teams to work smarter and faster with zero technical overhead.`;

export function WordCounterTool() {
  const { trigger } = useWebHaptics();
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        topKeywords: [],
      };
    }

    const wordsArray = raw.split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = (text.match(/[.!?]+(?:\s+|$)/g) || []).length || (words > 0 ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;
    const lines = text.split('\n').length;

    // Average reading speed: 225 WPM, Speaking speed: 130 WPM
    const readingTimeMin = Math.ceil(words / 225) || 1;
    const speakingTimeMin = Math.ceil(words / 130) || 1;

    // Keyword density
    const freqMap: Record<string, number> = {};
    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean.length > 3 && !['this', 'that', 'with', 'from', 'your', 'have', 'were', 'will'].includes(clean)) {
        freqMap[clean] = (freqMap[clean] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kw, count]) => ({
        keyword: kw,
        count,
        percent: ((count / words) * 100).toFixed(1),
      }));

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTimeMin,
      speakingTimeMin,
      topKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'How are reading and speaking times calculated?',
      a: 'Reading time is calculated using the industry standard average reading speed of 225 words per minute (WPM). Speaking time is based on an average conversational presentation rate of 130 WPM.',
    },
    {
      q: 'Is my text private and secure?',
      a: 'Yes. All text parsing, character counting, and density analysis occurs 100% locally in your browser memory. Nothing is sent to any server.',
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
          <span className="text-gray-900 font-semibold truncate">Word & Character Counter</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <FileSpreadsheet size={14} />
            <span>Text Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Real-time Counter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Word & Character Counter
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Live word counter, character counter (with and without spaces), sentence metrics, reading time, and keyword density analyzer.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Engine • 100% Client-Side</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Words</span>
            <div className="text-2xl font-black text-blue-600 mt-0.5">{stats.words}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Characters</span>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.charsWithSpaces}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Chars (No Spaces)</span>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.charsNoSpaces}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Sentences</span>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.sentences}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Paragraphs</span>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.paragraphs}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase">Reading Time</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">~{stats.readingTimeMin}m</div>
          </div>
        </div>

        {/* Text Area Input */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Source Text Input</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
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
            className="w-full h-72 sm:h-80 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y font-sans"
          />
        </div>

        {/* Keyword Density Table */}
        {stats.topKeywords.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Top Keyword Density</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {stats.topKeywords.map((k) => (
                <div key={k.keyword} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-semibold text-xs text-gray-900 capitalize truncate">{k.keyword}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {k.count}x • <span className="font-bold text-blue-600">{k.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
