'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Copy,
  Check,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1paGlyIFBhdGVsIiwiZW1haWwiOiJtaWhpckBleGFtcGxlLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE3NTY4MDAwMDAsImV4cCI6MTc4ODM2MDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export function JwtDebuggerTool() {
  const { trigger } = useWebHaptics();
  const [token, setToken] = useState<string>(SAMPLE_JWT);
  const [headerJson, setHeaderJson] = useState<string>('');
  const [payloadJson, setPayloadJson] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expStatus, setExpStatus] = useState<{ isExpired: boolean; dateString: string; relative: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Decode JWT base64url
  const base64UrlDecode = (str: string) => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    const bin = atob(output);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  };

  useEffect(() => {
    if (!token.trim()) {
      setHeaderJson('');
      setPayloadJson('');
      setSignature('');
      setError(null);
      setExpStatus(null);
      return;
    }

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      setError('A valid JWT must contain exactly 3 dot-separated segments (Header.Payload.Signature)');
      setHeaderJson('');
      setPayloadJson('');
      setSignature('');
      setExpStatus(null);
      return;
    }

    try {
      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

      setHeaderJson(JSON.stringify(decodedHeader, null, 2));
      setPayloadJson(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
      setError(null);

      // Check exp
      if (decodedPayload.exp) {
        const expDate = new Date(decodedPayload.exp * 1000);
        const now = new Date();
        const isExpired = expDate < now;
        const diffMs = Math.abs(expDate.getTime() - now.getTime());
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

        let rel = '';
        if (diffDays > 0) {
          rel = isExpired ? `${diffDays} days ago` : `in ${diffDays} days`;
        } else {
          rel = isExpired ? `${diffHours} hours ago` : `in ${diffHours} hours`;
        }

        setExpStatus({
          isExpired,
          dateString: expDate.toUTCString(),
          relative: rel,
        });
      } else {
        setExpStatus(null);
      }
    } catch (err: any) {
      setError('Failed to parse JWT parts: ' + (err.message || 'Invalid base64 payload'));
    }
  }, [token]);

  const handleCopy = (text: string, section: string) => {
    trigger('success');
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const faqs = [
    {
      q: 'What is a JSON Web Token (JWT)?',
      a: 'A JWT is an open standard (RFC 7519) for securely transmitting information between parties as a compact, URL-safe JSON object. It consists of three parts separated by dots: Header, Payload (claims), and Signature.',
    },
    {
      q: 'Is it safe to paste production JWTs into this tool?',
      a: 'Yes. All decoding occurs 100% locally in your browser using client-side JavaScript. Tokens, secret keys, and user claims are never sent to or logged on any external server.',
    },
    {
      q: 'What standard claims are decoded?',
      a: 'The tool decodes standard claims such as `sub` (subject/user ID), `iat` (issued-at timestamp), `exp` (expiration date), `iss` (issuer), `aud` (audience), and custom authorization roles.',
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
          <span className="text-gray-900 font-semibold truncate">JWT Token Debugger</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <KeyRound size={14} />
            <span>Developer Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            JWT Token Debugger & Inspector
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Decode, verify, and inspect JSON Web Tokens (JWT) headers and claims without exposing sensitive keys.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Browser Execution • Zero Server Logs</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Token Expiration Banner */}
        {expStatus && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${
              expStatus.isExpired
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Clock size={16} />
              <span>
                {expStatus.isExpired ? 'Token Expired' : 'Token Active & Valid'} ({expStatus.relative})
              </span>
            </div>
            <span className="text-xs font-mono opacity-80 hidden sm:inline">{expStatus.dateString}</span>
          </div>
        )}

        {/* Dual Layout: Encoded Token vs Decoded Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Encoded Input */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Encoded JWT Token</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setToken(SAMPLE_JWT);
                    trigger('nudge');
                  }}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Load Sample
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToken('');
                    trigger('nudge');
                  }}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                  title="Clear"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste JWT here (e.g. eyJhbGciOi...)"
              className="w-full h-96 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl font-mono text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed break-all resize-y"
              spellCheck={false}
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Right Column: Decoded Sections (Header, Payload, Signature) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Header Box */}
            <div className="bg-white rounded-3xl p-5 border border-rose-200 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-xs font-bold text-rose-950 uppercase tracking-wider">HEADER: Algorithm & Token Type</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(headerJson, 'header')}
                  className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'header' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedSection === 'header' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-rose-50/40 border border-rose-100 rounded-2xl text-xs sm:text-sm font-mono text-rose-950 overflow-x-auto leading-relaxed">
                {headerJson || '// Header JSON will appear here'}
              </pre>
            </div>

            {/* Payload Box */}
            <div className="bg-white rounded-3xl p-5 border border-purple-200 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">PAYLOAD: Data Claims</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(payloadJson, 'payload')}
                  className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'payload' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedSection === 'payload' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-purple-50/40 border border-purple-100 rounded-2xl text-xs sm:text-sm font-mono text-purple-950 overflow-x-auto leading-relaxed max-h-72">
                {payloadJson || '// Payload JSON will appear here'}
              </pre>
            </div>

            {/* Signature Box */}
            <div className="bg-white rounded-3xl p-5 border border-cyan-200 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-100 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                  <span className="text-xs font-bold text-cyan-950 uppercase tracking-wider">SIGNATURE</span>
                </div>
              </div>
              <p className="font-mono text-xs text-cyan-900 break-all p-3 bg-cyan-50/40 rounded-xl border border-cyan-100">
                {signature || '// Signature hash string'}
              </p>
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
