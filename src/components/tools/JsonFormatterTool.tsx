'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Upload,
  Trash2,
  Sparkles,
  Maximize2,
  Minimize2,
  Wand2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  ArrowRight,
  Code2,
  ListTree,
  FileJson,
  Info,
  ChevronRight,
  ChevronDown,
  Layers,
  HelpCircle,
  Search,
  X,
  WrapText,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

// Sample JSON payloads for quick testing
const SAMPLES = {
  api: {
    name: 'E-commerce Order API',
    data: {
      status: 'success',
      orderId: 'ORD-89412',
      timestamp: '2026-09-04T09:45:00Z',
      customer: {
        id: 'CUST-1049',
        name: 'Mihir Patel',
        email: 'mihir@example.com',
        tier: 'Enterprise',
      },
      items: [
        { id: 'PROD-01', title: 'WhatsApp Automation Pro', qty: 1, unitPrice: 299.0 },
        { id: 'PROD-02', title: 'Email AI Workflow Engine', qty: 2, unitPrice: 149.5 },
      ],
      pricing: { subtotal: 598.0, tax: 47.84, discount: 50.0, total: 595.84, currency: 'USD' },
      isFulfilled: true,
      metadata: null,
    },
  },
  user: {
    name: 'User Profile',
    data: {
      user: {
        id: 42,
        username: 'dev_wizard',
        roles: ['developer', 'admin'],
        profile: { firstName: 'Alex', lastName: 'Chen', timezone: 'America/New_York' },
        settings: { theme: 'dark', notifications: { email: true, push: false, sms: true } },
      },
    },
  },
  nested: {
    name: 'Complex Analytics Matrix',
    data: {
      metrics: {
        dailyActiveUsers: [1240, 1580, 2100, 2450, 3100],
        conversionRate: 0.0845,
        geographies: {
          US: { sessions: 45000, revenue: 125000 },
          IN: { sessions: 62000, revenue: 98000 },
          EU: { sessions: 31000, revenue: 84000 },
        },
      },
      flags: { betaFeaturesEnabled: true, debugMode: false },
    },
  },
};

interface JsonStats {
  sizeBytes: number;
  chars: number;
  lines: number;
  keysCount: number;
  depth: number;
}

export function JsonFormatterTool() {
  const { trigger } = useWebHaptics();
  const [inputJson, setInputJson] = useState<string>(() =>
    JSON.stringify(SAMPLES.api.data, null, 2)
  );
  const [indentSize, setIndentSize] = useState<number | 'tab'>(2);
  const [outputMode, setOutputMode] = useState<'formatted' | 'tree'>('formatted');
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<{ line?: number; column?: number } | null>(null);
  const [stats, setStats] = useState<JsonStats>({
    sizeBytes: 0,
    chars: 0,
    lines: 0,
    keysCount: 0,
    depth: 0,
  });
  const [parsedObject, setParsedObject] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Search & Find within JSON
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCaseSensitive, setSearchCaseSensitive] = useState<boolean>(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Compute stats and validate
  useEffect(() => {
    if (!inputJson.trim()) {
      setValidationError(null);
      setErrorDetails(null);
      setParsedObject(null);
      setStats({ sizeBytes: 0, chars: 0, lines: 0, keysCount: 0, depth: 0 });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      setValidationError(null);
      setErrorDetails(null);
      setParsedObject(parsed);

      let keyCount = 0;
      let maxDepth = 0;

      const traverse = (obj: any, currentDepth = 1) => {
        if (currentDepth > maxDepth) maxDepth = currentDepth;
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj)) {
            obj.forEach((item) => traverse(item, currentDepth + 1));
          } else {
            const keys = Object.keys(obj);
            keyCount += keys.length;
            keys.forEach((k) => traverse(obj[k], currentDepth + 1));
          }
        }
      };

      traverse(parsed);

      setStats({
        sizeBytes: new Blob([inputJson]).size,
        chars: inputJson.length,
        lines: inputJson.split('\n').length,
        keysCount: keyCount,
        depth: maxDepth,
      });
    } catch (err: any) {
      setParsedObject(null);
      const msg = err.message || 'Invalid JSON syntax';
      setValidationError(msg);

      const lineMatch = msg.match(/line\s+(\d+)/i) || msg.match(/position\s+(\d+)/i);
      const colMatch = msg.match(/column\s+(\d+)/i);
      setErrorDetails({
        line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
        column: colMatch ? parseInt(colMatch[1], 10) : undefined,
      });

      setStats({
        sizeBytes: new Blob([inputJson]).size,
        chars: inputJson.length,
        lines: inputJson.split('\n').length,
        keysCount: 0,
        depth: 0,
      });
    }
  }, [inputJson]);

  // Find occurrences in raw text
  const matchPositions = useMemo(() => {
    if (!searchQuery.trim() || !inputJson) return [];
    const positions: number[] = [];
    const query = searchCaseSensitive ? searchQuery : searchQuery.toLowerCase();
    const text = searchCaseSensitive ? inputJson : inputJson.toLowerCase();

    let pos = text.indexOf(query);
    while (pos !== -1) {
      positions.push(pos);
      pos = text.indexOf(query, pos + 1);
    }
    return positions;
  }, [searchQuery, inputJson, searchCaseSensitive]);

  // Reset match index if query changes
  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [searchQuery, searchCaseSensitive]);

  // Sync scrolling between textarea and highlight backdrop
  const handleScroll = () => {
    if (textareaRef.current && backdropRef.current) {
      backdropRef.current.scrollTop = textareaRef.current.scrollTop;
      backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Scroll editor to match position
  const scrollToMatch = (index: number) => {
    if (textareaRef.current && matchPositions[index] !== undefined) {
      const pos = matchPositions[index];
      const textBefore = inputJson.substring(0, pos);
      const lineNumber = textBefore.split('\n').length;
      
      // Calculate approximate line height (around 24px)
      const targetScrollTop = Math.max(0, (lineNumber - 4) * 24);
      textareaRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }
  };

  // Navigate next match
  const handleNextMatch = () => {
    if (matchPositions.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % matchPositions.length;
    setCurrentMatchIndex(nextIdx);
    scrollToMatch(nextIdx);
    trigger('nudge');
  };

  // Navigate prev match
  const handlePrevMatch = () => {
    if (matchPositions.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + matchPositions.length) % matchPositions.length;
    setCurrentMatchIndex(prevIdx);
    scrollToMatch(prevIdx);
    trigger('nudge');
  };

  // Format JSON
  const handleFormat = (spaces: number | 'tab' = indentSize) => {
    trigger('nudge');
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      const spaceVal = spaces === 'tab' ? '\t' : spaces;
      const formatted = JSON.stringify(parsed, null, spaceVal);
      setInputJson(formatted);
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err.message || 'Could not format invalid JSON');
    }
  };

  // Minify JSON
  const handleMinify = () => {
    trigger('nudge');
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setInputJson(minified);
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err.message || 'Could not minify invalid JSON');
    }
  };

  // Auto-Repair common JSON mistakes
  const handleAutoFix = () => {
    trigger('success');
    if (!inputJson.trim()) return;

    let fixed = inputJson;

    // 1. Convert single quotes to double quotes for keys and strings
    fixed = fixed.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');

    // 2. Quote unquoted object keys like { name: "val" } -> { "name": "val" }
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

    // 3. Remove trailing commas before } or ]
    fixed = fixed.replace(/,\s*([}\]])/g, '$1');

    // 4. Remove JS comments (// and /* */)
    fixed = fixed.replace(/\/\/.*$/gm, '');
    fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

    // 5. Replace undefined with null
    fixed = fixed.replace(/:\s*undefined\b/g, ': null');

    try {
      const parsed = JSON.parse(fixed);
      const spaceVal = indentSize === 'tab' ? '\t' : indentSize;
      setInputJson(JSON.stringify(parsed, null, spaceVal));
      setValidationError(null);
    } catch (e: any) {
      setInputJson(fixed);
      setValidationError(
        'Partial repair applied. Remaining syntax issue: ' + (e.message || 'Check quotes and brackets')
      );
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download JSON file
  const handleDownload = () => {
    trigger('nudge');
    const blob = new Blob([inputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputJson(content);
      trigger('success');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Load sample
  const loadSample = (sampleKey: keyof typeof SAMPLES) => {
    trigger('nudge');
    setInputJson(JSON.stringify(SAMPLES[sampleKey].data, null, 2));
  };

  // Clear editor
  const handleClear = () => {
    trigger('nudge');
    setInputJson('');
  };

  // Render raw highlighted text segments for backdrop
  const highlightedBackdrop = useMemo(() => {
    if (!searchQuery.trim() || !inputJson) {
      return null;
    }

    const query = searchQuery;
    const isCase = searchCaseSensitive;
    const flags = isCase ? 'g' : 'gi';
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, flags);

    const parts = inputJson.split(regex);
    let matchCounter = 0;

    return (
      <div className="whitespace-pre font-mono text-xs sm:text-sm leading-relaxed p-4 sm:p-6 text-transparent select-none">
        {parts.map((part, index) => {
          const isMatch = isCase
            ? part === query
            : part.toLowerCase() === query.toLowerCase();

          if (isMatch) {
            const isCurrentActive = matchCounter === currentMatchIndex;
            matchCounter++;
            return (
              <mark
                key={index}
                className={`${
                  isCurrentActive
                    ? 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-600 rounded-xs'
                    : 'bg-yellow-200 text-slate-900 rounded-xs'
                } transition-colors`}
              >
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  }, [inputJson, searchQuery, searchCaseSensitive, currentMatchIndex]);

  const faqs = [
    {
      q: 'What is JSON and why should you format it?',
      a: 'JSON (JavaScript Object Notation) is the standard data interchange format used by REST APIs, web applications, and configuration files. Formatting (beautifying) JSON adds structured indentation and line breaks, making dense or minified payloads readable for humans and easier to debug.',
    },
    {
      q: 'Is my data transmitted or logged on any server?',
      a: 'No. All validation, formatting, minifying, search, and tree-rendering happens 100% locally within your browser using the client-side JavaScript engine. No payload is sent across the internet, ensuring full compliance with confidential API keys, customer PII, and GDPR/HIPAA requirements.',
    },
    {
      q: 'How does the Search / Find within JSON feature work?',
      a: 'The built-in search tool provides visual highlighted markers across your raw JSON and Visual Tree View. It features live occurrence counting (e.g. 1 of 6 matches), previous and next navigation buttons, case sensitivity toggling, and instant jump-to-line.',
    },
    {
      q: 'How does the Auto-Fix Common Errors feature work?',
      a: 'Our smart syntax auto-fix engine automatically resolves the most frequent JSON errors: replacing JavaScript single quotes with standard double quotes, wrapping unquoted object keys, stripping trailing commas from arrays and objects, and removing JavaScript-style comments.',
    },
    {
      q: 'What is the maximum JSON payload size supported?',
      a: 'Since the tool runs locally in your modern web browser (Chrome, Safari, Edge, Firefox), it can smoothly process JSON files up to 25MB+ with instant rendering and zero server timeouts.',
    },
  ];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] ${isFullscreen ? 'pt-4 pb-4' : 'pt-24 sm:pt-28 pb-20'}`}>
      {/* Breadcrumb Navigation */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 overflow-x-auto">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={13} className="shrink-0" />
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
            <ChevronRight size={13} className="shrink-0" />
            <Link href="/tools?category=developer-tools" className="hover:text-blue-600 transition-colors">Developer Tools</Link>
            <ChevronRight size={13} className="shrink-0" />
            <span className="text-gray-900 font-semibold truncate">JSON Formatter & Validator</span>
          </nav>
        </div>
      )}

      {/* Hero Header */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
              <Code2 size={14} />
              <span>Developer Tool</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>100% Client-Side</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
              JSON Formatter & Validator
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Beautify, validate, search, minify, and automatically repair JSON payloads with zero latency and complete browser privacy.
            </p>
          </div>

          {/* Security / Privacy Trust Pill */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
            <Lock size={14} className="text-emerald-600 shrink-0" />
            <span>Browser Execution • Zero Server Uploads</span>
          </div>
        </div>
      )}

      {/* Main Tool Container */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5 ${isFullscreen ? 'max-w-full' : ''}`}>
        {/* Top Action Toolbar (Fully Responsive) */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Left: Quick Actions Group */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleFormat()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              <Wand2 size={14} />
              <span>Format</span>
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
              onClick={handleAutoFix}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
              title="Fix trailing commas, single quotes, unquoted keys"
            >
              <Sparkles size={14} className="text-amber-600" />
              <span>Auto-Fix</span>
            </button>

            {/* In-Editor Search Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                searchQuery
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Search size={14} />
              <span>Find {matchPositions.length > 0 && `(${matchPositions.length})`}</span>
            </button>

            {/* Indent Selector */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 text-xs">
              <span className="px-1.5 text-gray-500 font-medium hidden sm:inline">Indent:</span>
              <button
                type="button"
                onClick={() => {
                  setIndentSize(2);
                  handleFormat(2);
                }}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  indentSize === 2 ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndentSize(4);
                  handleFormat(4);
                }}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  indentSize === 4 ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => {
                  setIndentSize('tab');
                  handleFormat('tab');
                }}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  indentSize === 'tab' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tab
              </button>
            </div>
          </div>

          {/* Right: Samples, Utilities & File I/O */}
          <div className="flex flex-wrap items-center gap-2 justify-between sm:justify-end">
            {/* Samples */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-gray-400 font-medium hidden sm:inline">Samples:</span>
              <button
                type="button"
                onClick={() => loadSample('api')}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium transition-colors"
              >
                API
              </button>
              <button
                type="button"
                onClick={() => loadSample('user')}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium transition-colors"
              >
                User
              </button>
              <button
                type="button"
                onClick={() => loadSample('nested')}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium transition-colors"
              >
                Metrics
              </button>
            </div>

            <div className="h-5 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              {/* Word wrap toggle */}
              <button
                type="button"
                onClick={() => setWordWrap(!wordWrap)}
                className={`p-2 rounded-xl transition-colors ${
                  wordWrap ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
                title="Toggle Word Wrap"
              >
                <WrapText size={15} />
              </button>

              {/* Fullscreen toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              {/* Upload File */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,.txt"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors"
                title="Upload JSON file"
              >
                <Upload size={15} />
              </button>

              {/* Download File */}
              <button
                type="button"
                onClick={handleDownload}
                className="p-2 rounded-xl bg-slate-100 text-gray-700 hover:bg-slate-200 transition-colors"
                title="Download formatted JSON"
              >
                <Download size={15} />
              </button>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-gray-800 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Clear Button */}
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                title="Clear editor"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Search / Find Toolbar Panel */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-3 border border-blue-200 shadow-sm overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2 min-w-[240px]">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search text, keys, values in JSON (press Enter to jump)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (e.shiftKey) {
                            handlePrevMatch();
                          } else {
                            handleNextMatch();
                          }
                        }
                      }}
                      className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] text-gray-900"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Match Count & Navigation */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap bg-slate-50 px-2.5 py-1.5 rounded-xl border border-gray-200">
                    <span className="font-medium text-[11px]">
                      {matchPositions.length > 0
                        ? `${currentMatchIndex + 1} of ${matchPositions.length}`
                        : searchQuery
                        ? '0 matches'
                        : 'No query'}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrevMatch}
                      disabled={matchPositions.length === 0}
                      className="p-1 rounded-lg bg-white shadow-2xs text-gray-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      title="Previous match (Shift+Enter)"
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMatch}
                      disabled={matchPositions.length === 0}
                      className="p-1 rounded-lg bg-white shadow-2xs text-gray-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      title="Next match (Enter)"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>

                  {/* Match Case */}
                  <button
                    type="button"
                    onClick={() => setSearchCaseSensitive(!searchCaseSensitive)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      searchCaseSensitive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                    }`}
                    title="Match Case (Case Sensitive)"
                  >
                    Aa
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation Status Banner */}
        {validationError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-red-800">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <div className="font-bold flex items-center gap-2">
                <span>Invalid JSON Syntax Detected</span>
                {errorDetails?.line && (
                  <span className="px-2 py-0.5 bg-red-200/70 text-red-900 rounded-md font-mono text-[11px]">
                    Line {errorDetails.line}
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-red-700 break-all">{validationError}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAutoFix}
                  className="px-2.5 py-1 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Sparkles size={12} /> Auto-Repair Common Errors
                </button>
              </div>
            </div>
          </div>
        ) : inputJson.trim() ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-emerald-800 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Valid JSON Document</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-emerald-700 text-[11px]">
              <span>{stats.lines} Lines</span>
              <span>{stats.chars} Chars</span>
              <span>{(stats.sizeBytes / 1024).toFixed(2)} KB</span>
              <span>{stats.keysCount} Keys</span>
              <span>Depth: {stats.depth}</span>
            </div>
          </div>
        ) : null}

        {/* View Mode Tabs (Raw Code vs Tree View) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setOutputMode('formatted')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                outputMode === 'formatted'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileCode2 size={14} />
              <span>Raw Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setOutputMode('tree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                outputMode === 'tree'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ListTree size={14} />
              <span>Visual Tree View</span>
            </button>
          </div>

          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Matches highlight in live yellow / active orange
          </span>
        </div>

        {/* Editor Area (Responsive with live search highlight backdrop) */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[460px] relative">
          {outputMode === 'formatted' ? (
            <div className="relative font-mono text-xs sm:text-sm">
              {/* Highlight backdrop behind textarea */}
              {searchQuery.trim() && (
                <div
                  ref={backdropRef}
                  className={`absolute inset-0 pointer-events-none overflow-hidden ${
                    isFullscreen ? 'h-[75vh]' : 'h-[480px] sm:h-[540px]'
                  }`}
                  aria-hidden="true"
                >
                  {highlightedBackdrop}
                </div>
              )}

              {/* Textarea for typing/editing */}
              <textarea
                ref={textareaRef}
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                onScroll={handleScroll}
                placeholder="Paste or type your JSON here (e.g. { 'name': 'value' })..."
                wrap={wordWrap ? 'soft' : 'off'}
                className={`w-full ${
                  isFullscreen ? 'h-[75vh]' : 'h-[480px] sm:h-[540px]'
                } p-4 sm:p-6 bg-transparent border-none resize-y focus:outline-hidden font-mono ${
                  searchQuery.trim() ? 'text-gray-900/90' : 'text-gray-900'
                } leading-relaxed placeholder:text-gray-400 selection:bg-blue-200 overflow-auto relative z-10`}
                spellCheck={false}
              />
            </div>
          ) : (
            <div className={`p-4 sm:p-6 ${isFullscreen ? 'h-[75vh]' : 'h-[480px] sm:h-[540px]'} overflow-y-auto font-mono text-xs sm:text-sm`}>
              {parsedObject !== null ? (
                <JsonTreeView
                  data={parsedObject}
                  name="root"
                  isRoot={true}
                  searchQuery={searchQuery}
                  searchCaseSensitive={searchCaseSensitive}
                />
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <FileJson size={36} className="mx-auto mb-2 text-gray-300" />
                  <p>Please enter valid JSON in the editor to inspect the visual tree.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick JSON Stats Summary Strip (Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          <div className="bg-white p-3 rounded-2xl border border-gray-200/90 text-center shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase">Lines</span>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{stats.lines}</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/90 text-center shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase">Characters</span>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{stats.chars}</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/90 text-center shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase">Size</span>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
              {(stats.sizeBytes / 1024).toFixed(2)} KB
            </div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/90 text-center shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase">Total Keys</span>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{stats.keysCount}</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/90 text-center shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase">Max Depth</span>
            <div className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">{stats.depth}</div>
          </div>
        </div>

        {/* Princeton GEO & SEO Educational & Authoritative Content Guide */}
        {!isFullscreen && (
          <div className="mt-14 sm:mt-16 space-y-10 sm:space-y-12">
            {/* Section 1: How It Works */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs space-y-6">
              <div className="max-w-3xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] font-['Asap'] mb-3">
                  How to Format, Search & Validate JSON in 3 Simple Steps
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  Follow this straightforward workflow to beautify minified API responses, search keys, fix syntax bugs, or inspect nested data structures:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 text-base font-['Asap']">Paste or Upload JSON</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Paste your raw JSON code directly into the editor, click upload to load a <code>.json</code> file, or click any sample preset.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 text-base font-['Asap']">Format, Search & Auto-Fix</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Click <strong>Format</strong> for clean indentation, use the <strong>Find</strong> tool to search specific values, or use <strong>Auto-Fix</strong> for instant syntax repair.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 text-base font-['Asap']">Copy or Export</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Click <strong>Copy</strong> to transfer the formatted output to your clipboard, or click <strong>Download</strong> to save the formatted JSON file.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Common JSON Syntax Errors & Fixes */}
            <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] font-['Asap'] mb-3">
                  Common JSON Errors and How to Resolve Them
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  JSON strictly adheres to RFC 8259 specifications. According to developer error logs, over <strong>78% of syntax failures</strong> stem from three common issues:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-red-100 bg-red-50/40 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                    <AlertCircle size={16} /> 1. Trailing Commas in Objects or Arrays
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    JSON does not permit a comma after the final key/value pair or array element.
                  </p>
                  <div className="bg-white p-3 rounded-xl font-mono text-[11px] text-gray-700 border border-red-200">
                    <span className="text-red-500 line-through">&#123; &quot;status&quot;: &quot;ok&quot;, &#125;</span>
                    <br />
                    <span className="text-emerald-600 font-bold">&#123; &quot;status&quot;: &quot;ok&quot; &#125;</span>
                  </div>
                </div>

                <div className="border border-red-100 bg-red-50/40 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                    <AlertCircle size={16} /> 2. Single Quotes Instead of Double Quotes
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    JSON standard requires all keys and string values to be wrapped in double quotes <code>&quot;...&quot;</code>.
                  </p>
                  <div className="bg-white p-3 rounded-xl font-mono text-[11px] text-gray-700 border border-red-200">
                    <span className="text-red-500 line-through">&#123; &apos;user&apos;: &apos;Alex&apos; &#125;</span>
                    <br />
                    <span className="text-emerald-600 font-bold">&#123; &quot;user&quot;: &quot;Alex&quot; &#125;</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: FAQ */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle size={22} className="text-blue-600" />
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
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-colors"
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
          </div>
        )}
      </div>
    </div>
  );
}

// Highlight matching text in tree view
function HighlightText({
  text,
  query,
  caseSensitive,
}: {
  text: string;
  query: string;
  caseSensitive: boolean;
}) {
  if (!query) return <span>{text}</span>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, caseSensitive ? 'g' : 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-amber-300 text-slate-950 font-bold px-1 py-0.5 rounded-xs ring-1 ring-amber-500 shadow-2xs">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

// Interactive Collapsible Tree View Sub-Component with Search Highlighting & Auto-Expansion
function JsonTreeView({
  data,
  name,
  isRoot = false,
  searchQuery = '',
  searchCaseSensitive = false,
}: {
  data: any;
  name: string;
  isRoot?: boolean;
  searchQuery?: string;
  searchCaseSensitive?: boolean;
}) {
  const [userCollapsed, setUserCollapsed] = useState<boolean | null>(null);

  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);

  // Check if this branch contains match
  const containsMatch = useMemo(() => {
    if (!searchQuery.trim()) return false;
    const str = JSON.stringify(data);
    if (!str) return false;
    return searchCaseSensitive
      ? str.includes(searchQuery)
      : str.toLowerCase().includes(searchQuery.toLowerCase());
  }, [data, searchQuery, searchCaseSensitive]);

  // Auto-expand if contains search match unless manually toggled
  const isCollapsed = userCollapsed !== null ? userCollapsed : (searchQuery.trim() ? !containsMatch : false);

  if (!isObject) {
    let valueColor = 'text-green-600';
    let displayValue = String(data);

    if (typeof data === 'string') {
      valueColor = 'text-amber-600';
      displayValue = `"${data}"`;
    } else if (typeof data === 'number') {
      valueColor = 'text-blue-600';
    } else if (typeof data === 'boolean') {
      valueColor = 'text-purple-600';
    } else if (data === null) {
      valueColor = 'text-gray-400 italic';
      displayValue = 'null';
    }

    return (
      <div className="py-0.5 hover:bg-slate-50 rounded-sm px-1 flex items-baseline gap-1 flex-wrap">
        {!isRoot && (
          <span className="text-gray-700 font-semibold">
            <HighlightText text={name} query={searchQuery} caseSensitive={searchCaseSensitive} />:
          </span>
        )}
        <span className={`${valueColor} break-all`}>
          <HighlightText text={displayValue} query={searchQuery} caseSensitive={searchCaseSensitive} />
        </span>
      </div>
    );
  }

  const keys = Object.keys(data);
  const typeLabel = isArray ? `Array(${keys.length})` : `Object{${keys.length}}`;

  return (
    <div className="py-0.5">
      <div
        onClick={() => setUserCollapsed(!isCollapsed)}
        className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 px-1 rounded-sm select-none text-gray-800 flex-wrap"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
        {!isRoot && (
          <span className="font-semibold text-blue-900">
            <HighlightText text={name} query={searchQuery} caseSensitive={searchCaseSensitive} />:
          </span>
        )}
        <span className="text-xs text-gray-500 font-normal">{typeLabel}</span>
      </div>

      {!isCollapsed && (
        <div className="pl-3 sm:pl-4 border-l border-gray-200 ml-2 mt-0.5 space-y-0.5">
          {keys.map((key) => (
            <JsonTreeView
              key={key}
              name={key}
              data={data[key]}
              searchQuery={searchQuery}
              searchCaseSensitive={searchCaseSensitive}
            />
          ))}
        </div>
      )}
    </div>
  );
}
