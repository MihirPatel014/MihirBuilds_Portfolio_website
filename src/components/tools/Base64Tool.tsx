'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Binary,
  Copy,
  Check,
  Download,
  Upload,
  Trash2,
  Sparkles,
  Lock,
  ArrowRight,
  Code2,
  ChevronRight,
  HelpCircle,
  ArrowDownUp,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

export function Base64Tool() {
  const { trigger } = useWebHaptics();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputData, setInputData] = useState<string>('Hello from MihirBuilds! 🚀');
  const [outputData, setOutputData] = useState<string>('');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileMime, setFileMime] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time conversion
  useEffect(() => {
    if (!inputData.trim()) {
      setOutputData('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        // UTF-8 safe base64 encoding
        const bytes = new TextEncoder().encode(inputData);
        let binString = '';
        for (let i = 0; i < bytes.length; i++) {
          binString += String.fromCharCode(bytes[i]);
        }
        let b64 = btoa(binString);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutputData(b64);
        setError(null);
      } else {
        // Decode
        let cleaned = inputData.trim();
        if (urlSafe || cleaned.includes('-') || cleaned.includes('_')) {
          cleaned = cleaned.replace(/-/g, '+').replace(/_/g, '/');
          while (cleaned.length % 4 !== 0) {
            cleaned += '=';
          }
        }
        const binString = atob(cleaned);
        const bytes = new Uint8Array(binString.length);
        for (let i = 0; i < binString.length; i++) {
          bytes[i] = binString.charCodeAt(i);
        }
        const decoded = new TextDecoder().decode(bytes);
        setOutputData(decoded);
        setError(null);
      }
    } catch (err: any) {
      setError(mode === 'decode' ? 'Invalid Base64 string sequence' : 'Failed to encode input');
      setOutputData('');
    }
  }, [inputData, mode, urlSafe]);

  const handleSwap = () => {
    trigger('nudge');
    if (outputData && !error) {
      const currentOut = outputData;
      setMode(mode === 'encode' ? 'decode' : 'encode');
      setInputData(currentOut);
    } else {
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(outputData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    trigger('nudge');
    const blob = new Blob([outputData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'base64-encoded.txt' : 'base64-decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileMime(file.type || 'application/octet-stream');

    const reader = new FileReader();
    if (mode === 'encode') {
      reader.onload = () => {
        const result = reader.result as string;
        // Data URL format: data:...;base64,XXXX
        const base64Only = result.split(',')[1] || result;
        setInputData(`[File: ${file.name}]`);
        setOutputData(base64Only);
        trigger('success');
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => {
        setInputData(reader.result as string);
        trigger('success');
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  const faqs = [
    {
      q: 'What is Base64 encoding used for?',
      a: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is widely used to embed images directly into HTML/CSS (Data URLs), transmit cryptographic keys, and safely pass payloads over HTTP headers and email protocols.',
    },
    {
      q: 'What is the difference between Standard and URL-Safe Base64?',
      a: 'Standard Base64 uses + and / characters with = padding. In URL-Safe Base64 (RFC 4648 §5), + is replaced with -, / is replaced with _, and trailing = padding is stripped so the string can be safely embedded in URL parameters without percent-encoding.',
    },
    {
      q: 'Is my data secure when encoding or decoding?',
      a: 'Yes. All Base64 conversion logic executes 100% locally in your browser using standard JavaScript APIs. No string or file is ever transmitted to a remote server.',
    },
  ];

  const inSize = new Blob([inputData]).size;
  const outSize = new Blob([outputData]).size;

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
          <span className="text-gray-900 font-semibold truncate">Base64 Encoder / Decoder</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Binary size={14} />
            <span>Developer Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Base64 Encoder / Decoder
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Convert strings and files to Base64 and decode Base64 strings with UTF-8 support and URL-safe formatting.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Browser Execution • Zero Server Uploads</span>
        </div>
      </div>

      {/* Main Tool UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Mode Selector & Controls */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMode('encode');
                trigger('nudge');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'encode' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Encode (Text → Base64)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('decode');
                trigger('nudge');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'decode' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Decode (Base64 → Text)
            </button>
          </div>

          {/* Options & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* URL Safe Toggle */}
            <button
              type="button"
              onClick={() => {
                setUrlSafe(!urlSafe);
                trigger('nudge');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                urlSafe
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
              }`}
            >
              URL-Safe (RFC 4648)
            </button>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Swap Input & Output"
            >
              <ArrowDownUp size={15} />
            </button>

            {/* Upload File */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Upload file to encode/decode"
            >
              <Upload size={15} />
            </button>

            {/* Clear Button */}
            <button
              type="button"
              onClick={() => {
                setInputData('');
                setOutputData('');
                setFileName(null);
                trigger('nudge');
              }}
              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Dual Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input Box */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {mode === 'encode' ? 'Plain Text / Source Input' : 'Base64 Encoded Input'}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {inputData.length} chars • {inSize} B
                </span>
              </div>

              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode into Base64...' : 'Enter Base64 string to decode...'}
                className="w-full h-72 sm:h-80 bg-slate-50/70 p-4 rounded-2xl border border-gray-200 text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y"
                spellCheck={false}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>{mode === 'encode' ? 'UTF-8 String' : 'Base64 Format'}</span>
              <button
                type="button"
                onClick={() => setInputData('{"hello": "world", "status": true}')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Load JSON Sample
              </button>
            </div>
          </div>

          {/* Output Box */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Result'}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {outputData.length} chars • {outSize} B
                </span>
              </div>

              {error ? (
                <div className="h-72 sm:h-80 bg-red-50 p-6 rounded-2xl border border-red-200 text-red-800 flex flex-col items-center justify-center text-center">
                  <AlertCircle size={32} className="text-red-500 mb-2" />
                  <p className="font-bold text-sm">{error}</p>
                  <p className="text-xs text-red-600 mt-1">Please ensure the string contains valid Base64 characters.</p>
                </div>
              ) : (
                <textarea
                  value={outputData}
                  readOnly
                  placeholder="Output will appear here automatically..."
                  className="w-full h-72 sm:h-80 bg-slate-50/70 p-4 rounded-2xl border border-gray-200 text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden leading-relaxed resize-y select-all"
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-xs text-gray-400">
                {mode === 'encode' && inSize > 0 && `Size ratio: +${(((outSize - inSize) / inSize) * 100).toFixed(0)}% (standard 4/3 overhead)`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!outputData || !!error}
                  className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 disabled:opacity-40 transition-colors cursor-pointer"
                  title="Download output file"
                >
                  <Download size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!outputData || !!error}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-40'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
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
                <div
                  key={faq.q}
                  className="rounded-2xl border border-gray-100 bg-slate-50/60 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90 text-blue-600' : ''}`}
                    />
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
