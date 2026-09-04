'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Hash,
  Copy,
  Check,
  Download,
  RefreshCw,
  Lock,
  ChevronRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function UuidGeneratorTool() {
  const { trigger } = useWebHaptics();
  const [version, setVersion] = useState<'v4' | 'v7'>('v4');
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [braces, setBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Generate UUID v4
  const generateV4 = () => {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    );
  };

  // Generate UUID v7 (Time-sortable Unix Epoch ms)
  const generateV7 = () => {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, '0');
    const rand = crypto.getRandomValues(new Uint8Array(10));
    let randHex = '';
    for (let i = 0; i < rand.length; i++) {
      randHex += rand[i].toString(16).padStart(2, '0');
    }
    // format: 8-4-4-4-12
    const p1 = timeHex.substring(0, 8);
    const p2 = timeHex.substring(8, 12);
    const p3 = '7' + randHex.substring(0, 3);
    const p4 = ((rand[2] & 0x3f) | 0x80).toString(16).padStart(2, '0') + randHex.substring(3, 5);
    const p5 = randHex.substring(5, 17);
    return `${p1}-${p2}-${p3}-${p4}-${p5}`;
  };

  const generateList = () => {
    trigger('nudge');
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let val = version === 'v4' ? generateV4() : generateV7();
      if (!hyphens) {
        val = val.replace(/-/g, '');
      }
      if (uppercase) {
        val = val.toUpperCase();
      } else {
        val = val.toLowerCase();
      }
      if (braces) {
        val = `{${val}}`;
      }
      list.push(val);
    }
    setUuids(list);
  };

  useEffect(() => {
    generateList();
  }, [version, count, uppercase, hyphens, braces]);

  const handleCopyAll = () => {
    trigger('success');
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = (u: string, idx: number) => {
    trigger('success');
    navigator.clipboard.writeText(u);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleDownload = () => {
    trigger('nudge');
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${version}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is the difference between UUID v4 and UUID v7?',
      a: 'UUID v4 is completely pseudo-randomly generated (122 bits of entropy). UUID v7 is the new RFC 9562 standard which encodes a millisecond Unix timestamp in the leading bits, making UUIDs naturally time-sortable and optimal for database primary keys.',
    },
    {
      q: 'Are the generated UUIDs cryptographically secure?',
      a: 'Yes. All random bytes are sourced directly from your browser’s `crypto.getRandomValues()` Web Crypto API.',
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
          <span className="text-gray-900 font-semibold truncate">UUID / GUID Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Hash size={14} />
            <span>Developer Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side Web Crypto</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            UUID / GUID Bulk Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Generate secure, cryptographically random v4 and time-sortable v7 UUIDs in bulk with custom casing.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Web Crypto • Zero Server Logging</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Settings Bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          {/* Version & Count */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setVersion('v4')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  version === 'v4' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Version 4 (Random)
              </button>
              <button
                type="button"
                onClick={() => setVersion('v7')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  version === 'v7' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Version 7 (Time-Sortable)
              </button>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl text-xs">
              <span className="text-gray-500 font-medium">Quantity:</span>
              {[1, 5, 10, 25, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCount(num)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    count === num ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Formatting Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setUppercase(!uppercase)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                uppercase ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
              }`}
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={() => setHyphens(!hyphens)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                hyphens ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
              }`}
            >
              Hyphens
            </button>
            <button
              type="button"
              onClick={() => setBraces(!braces)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                braces ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
              }`}
            >
              &#123;Braces&#125;
            </button>

            <button
              type="button"
              onClick={generateList}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* UUID List Display */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Generated UUIDs ({uuids.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="p-1.5 rounded-lg bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Download txt file"
              >
                <Download size={14} />
              </button>
              <button
                type="button"
                onClick={handleCopyAll}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  copied ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-gray-800 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied All' : 'Copy All'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {uuids.map((uuid, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <span className="font-mono text-xs sm:text-sm text-gray-900 break-all select-all font-medium">
                  {uuid}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySingle(uuid, idx)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                  title="Copy this UUID"
                >
                  {copiedIndex === idx ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            ))}
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
