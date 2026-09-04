'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Database,
  Copy,
  Check,
  Download,
  Trash2,
  Lock,
  ChevronRight,
  HelpCircle,
  Wand2,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_SQL = `SELECT u.id, u.username, u.email, o.order_id, o.total_amount, o.created_at FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.status = 'completed' AND o.total_amount >= 100.00 GROUP BY u.id, u.username, u.email, o.order_id, o.total_amount, o.created_at ORDER BY o.created_at DESC LIMIT 50;`;

export function SqlFormatterTool() {
  const { trigger } = useWebHaptics();
  const [sql, setSql] = useState<string>(SAMPLE_SQL);
  const [uppercaseKeywords, setUppercaseKeywords] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Beautify SQL
  const formatSql = (rawSql: string, upper: boolean) => {
    if (!rawSql.trim()) return '';

    let formatted = rawSql.trim();

    // Replace multiple spaces/newlines with single space
    formatted = formatted.replace(/\s+/g, ' ');

    // Main SQL keywords to break line
    const majorKeywords = [
      'SELECT',
      'FROM',
      'WHERE',
      'GROUP BY',
      'HAVING',
      'ORDER BY',
      'LIMIT',
      'OFFSET',
      'INSERT INTO',
      'VALUES',
      'UPDATE',
      'SET',
      'DELETE FROM',
      'UNION ALL',
      'UNION',
      'INNER JOIN',
      'LEFT JOIN',
      'RIGHT JOIN',
      'FULL OUTER JOIN',
      'CROSS JOIN',
      'JOIN',
      'ON',
      'AND',
      'OR',
    ];

    majorKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${upper ? kw.toUpperCase() : kw.toLowerCase()} `);
    });

    // Indent clauses
    const lines = formatted.split('\n').map((line) => line.trim()).filter(Boolean);
    const indented = lines.map((line) => {
      const isSub = /^(AND|OR|ON|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)/i.test(line);
      return isSub ? `  ${line}` : line;
    });

    return indented.join('\n');
  };

  const handleFormat = () => {
    trigger('nudge');
    setSql(formatSql(sql, uppercaseKeywords));
  };

  const handleMinify = () => {
    trigger('nudge');
    const minified = sql.replace(/\s+/g, ' ').trim();
    setSql(minified);
  };

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    trigger('nudge');
    const blob = new Blob([sql], { type: 'text/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'Which SQL dialects are supported?',
      a: 'The formatter works with standard ANSI SQL, PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server (T-SQL), MariaDB, and Snowflake.',
    },
    {
      q: 'Does it change query execution logic?',
      a: 'No. The tool only modifies whitespace and casing for human readability. No table names, column names, or logic predicates are altered.',
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
          <span className="text-gray-900 font-semibold truncate">SQL Query Formatter</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Database size={14} />
            <span>Developer Tool</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            SQL Query Formatter & Beautifier
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Format, indent, and prettify messy database queries with uppercase keyword capitalization and clean clause nesting.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Execution • Zero Server Queries</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Actions Toolbar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFormat}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              <Wand2 size={14} />
              <span>Format SQL</span>
            </button>

            <button
              type="button"
              onClick={handleMinify}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Minimize2 size={14} />
              <span>Minify</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUppercaseKeywords(!uppercaseKeywords);
                trigger('nudge');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                uppercaseKeywords
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
              }`}
            >
              {uppercaseKeywords ? 'UPPERCASE Keywords: ON' : 'Keywords: AS-IS'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSql(SAMPLE_SQL);
                trigger('nudge');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Sample Query
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Download SQL File"
            >
              <Download size={15} />
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                copied ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-gray-800 hover:bg-slate-200'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSql('');
                trigger('nudge');
              }}
              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
              title="Clear editor"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Editor Box */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs">
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="Paste your SQL query here..."
            className="w-full h-96 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl font-mono text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y"
            spellCheck={false}
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
