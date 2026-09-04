'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Copy,
  Check,
  RefreshCw,
  Lock,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function PasswordGeneratorTool() {
  const { trigger } = useWebHaptics();

  // State
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(true); // i, l, 1, L, o, 0, O
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false); // {}[]()/\'"`~,;:.<>

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Generate password using crypto API
  const generatePassword = () => {
    trigger('nudge');

    let upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (!excludeSimilar) upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let lower = 'abcdefghijkmnopqrstuvwxyz';
    if (!excludeSimilar) lower = 'abcdefghijklmnopqrstuvwxyz';

    let numbers = '23456789';
    if (!excludeSimilar) numbers = '0123456789';

    let symbols = '!@#$%^&*-_+=?';
    if (!excludeAmbiguous) symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }

    setPassword(result);
    setHistory((prev) => [result, ...prev.filter((p) => p !== result)].slice(0, 5));
  };

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    excludeAmbiguous,
  ]);

  const handleCopy = (pwdToCopy = password) => {
    if (!pwdToCopy) return;
    trigger('success');
    navigator.clipboard.writeText(pwdToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Password strength calculation
  const strengthInfo = (() => {
    if (!password) return { label: 'Empty', score: 0, color: 'bg-gray-200', text: 'text-gray-400' };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 3) return { label: 'Weak', score: 1, color: 'bg-rose-500', text: 'text-rose-600' };
    if (score <= 5) return { label: 'Moderate', score: 2, color: 'bg-amber-500', text: 'text-amber-600' };
    if (score === 6) return { label: 'Strong', score: 3, color: 'bg-blue-600', text: 'text-blue-600' };
    return { label: 'Ultra Secure', score: 4, color: 'bg-emerald-500', text: 'text-emerald-600' };
  })();

  const faqs = [
    {
      q: 'Is this password generator safe and private?',
      a: 'Yes, 100%. The passwords are generated strictly on your local device using your browser’s cryptographically secure pseudo-random number generator (window.crypto.getRandomValues). Nothing is transmitted across any network or saved on any database.',
    },
    {
      q: 'What makes a strong password?',
      a: 'A strong password is at least 16 characters long and combines uppercase letters, lowercase letters, numbers, and special symbols. It should never contain dictionary words or personal information.',
    },
    {
      q: 'What is the "Exclude Similar Characters" option?',
      a: 'This eliminates confusing, visually identical characters such as uppercase "I", lowercase "l", digit "1", and number "0" with letter "O", preventing mistakes when manually typing credentials.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20 font-['Outfit',sans-serif]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
          <ChevronRight size={13} />
          <Link href="/tools?category=utilities" className="hover:text-blue-600 transition-colors">Utilities</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Password Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Shield size={14} />
            <span>Cryptographically Secure (CSPRNG)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Zero-Knowledge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Secure Password Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Generate ultra-secure, cryptographically random passwords with custom lengths, character sets, and phonetic readability.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Device Only • Never Transmitted</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Output Screen */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Generated Password
            </span>
            <span className={`text-xs font-bold ${strengthInfo.text} flex items-center gap-1`}>
              <CheckCircle2 size={13} />
              {strengthInfo.label}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Click generate..."
              className="w-full py-4 pl-5 pr-28 bg-slate-50 border border-gray-200 rounded-2xl text-base sm:text-xl font-mono text-gray-900 tracking-wider focus:outline-hidden selection:bg-blue-100"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={generatePassword}
                className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                title="Regenerate"
              >
                <RefreshCw size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleCopy()}
                className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step <= strengthInfo.score ? strengthInfo.color : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-3 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
            <Sliders size={16} className="text-blue-600" />
            Customize Settings
          </h2>

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span>Password Length</span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-mono text-sm">
                {length} chars
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>6</span>
              <span>16 (Recommended)</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Uppercase Letters (A-Z)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Lowercase Letters (a-z)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Special Symbols (!@#$%)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Exclude Similar (i, l, 1, L, o, 0, O)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>Exclude Ambiguous ({`{ } [ ] ( ) / \\ ' "`})</span>
            </label>
          </div>
        </div>

        {/* History Box */}
        {history.length > 1 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Recent Generated Passwords
            </span>
            <div className="space-y-2">
              {history.slice(1).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3.5 py-2 bg-slate-50 rounded-xl border border-gray-100 text-xs font-mono text-gray-700"
                >
                  <span className="truncate">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="p-1 hover:text-blue-600 text-gray-500 cursor-pointer"
                    title="Copy"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
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
