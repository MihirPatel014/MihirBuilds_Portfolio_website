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
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  Settings2,
  Sliders,
  FileText,
  BookOpen,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

const SAMPLE_TEXT = `<h1>Welcome to <i>MihirBuilds</i> &amp; Partner&#39;s Portal!</h1>
   This   text    contains     irregular    spaces.   
   Contact us at: support@mihirbuilds.com or visit https://mihirbuilds.com/tools

[b]BBCode Forum Header[/b]
• “Smart typography quotes” and ‘single quotes’ test.
• Accents: café, résumé, naïve, façade.
• Unicode Symbols: 𝕳𝖊𝖑𝖑𝖔 Ｗｏｒｌｄ! 🚀✨
• Punctuation test : Hello , world ! How are you ?
• Duplicate line test here
• Duplicate line test here
• Common shorthand: btw, fyi, asap, approx, def, w/o.

<div id="main-content" class="container dark" style="color: red; padding: 20px;">
   <p>HTML paragraph with <a href="https://example.com">links</a> and entities &lt;tag&gt;.</p>
</div>
`;

interface FindReplaceRule {
  id: string;
  find: string;
  replace: string;
  caseSensitive: boolean;
  useRegex: boolean;
}

interface TextCleanerOptions {
  // Whitespace
  trim: boolean;
  removeLeadingSpaces: boolean;
  removeTrailingSpaces: boolean;
  replaceSpacesWithTab: boolean;
  spaceToTabCount: number;
  replaceTabWithSpaces: boolean;
  tabToSpacesCount: number;
  removeBlankLines: boolean;
  replaceLineBreakWithSpace: boolean;
  multipleSpacesToSingle: boolean;
  multipleBlankLinesToSingle: boolean;
  removeAllLineBreaks: boolean;

  // Characters
  removePunctuation: boolean;
  stripAllEmojis: boolean;
  removeLetterAccents: boolean;
  normalizeUnicodeLetters: boolean;
  removeReplacementCharacter: boolean;
  removeNonAscii: boolean;
  removeNonAlphanumeric: boolean;

  // HTML
  unescapeHtmlTags: boolean;
  stripAllHtmlTags: boolean;
  removeAllIds: boolean;
  removeAllClasses: boolean;
  removeInlineStyles: boolean;
  decodeHtmlEntities: boolean;
  decodeUrlEncoded: boolean;

  // Other & Links
  stripEmails: boolean;
  removeBbcodeTags: boolean;
  removeAllWebUrls: boolean;
  convertUrlsToLinks: boolean;

  // Text Formatting Online - Letter Case
  letterCase: 'none' | 'uppercase' | 'lowercase' | 'sentence' | 'capitalize';

  // Duplicates
  removeDuplicateLines: boolean;
  removeRepeatingWords: boolean;

  // Trim character count
  trimLeftChars: boolean;
  trimLeftCount: number;
  trimRightChars: boolean;
  trimRightCount: number;

  // Quotes
  smartQuotesToRegular: boolean;
  regularQuotesToSmart: boolean;

  // Writing
  fixSpacesAfterPunctuation: boolean;
  convertShorthandToFull: boolean;
}

const DEFAULT_OPTIONS: TextCleanerOptions = {
  trim: true,
  removeLeadingSpaces: false,
  removeTrailingSpaces: false,
  replaceSpacesWithTab: false,
  spaceToTabCount: 4,
  replaceTabWithSpaces: false,
  tabToSpacesCount: 4,
  removeBlankLines: true,
  replaceLineBreakWithSpace: false,
  multipleSpacesToSingle: true,
  multipleBlankLinesToSingle: false,
  removeAllLineBreaks: false,

  removePunctuation: false,
  stripAllEmojis: false,
  removeLetterAccents: false,
  normalizeUnicodeLetters: false,
  removeReplacementCharacter: true,
  removeNonAscii: false,
  removeNonAlphanumeric: false,

  unescapeHtmlTags: false,
  stripAllHtmlTags: false,
  removeAllIds: false,
  removeAllClasses: false,
  removeInlineStyles: false,
  decodeHtmlEntities: false,
  decodeUrlEncoded: false,

  stripEmails: false,
  removeBbcodeTags: false,
  removeAllWebUrls: false,
  convertUrlsToLinks: false,

  letterCase: 'none',
  removeDuplicateLines: false,
  removeRepeatingWords: false,

  trimLeftChars: false,
  trimLeftCount: 3,
  trimRightChars: false,
  trimRightCount: 3,

  smartQuotesToRegular: false,
  regularQuotesToSmart: false,

  fixSpacesAfterPunctuation: false,
  convertShorthandToFull: false,
};

const SHORTHAND_MAP: Record<string, string> = {
  '\\bbtw\\b': 'by the way',
  '\\bfyi\\b': 'for your information',
  '\\basap\\b': 'as soon as possible',
  '\\btba\\b': 'to be announced',
  '\\btbd\\b': 'to be determined',
  '\\bapprox\\b': 'approximately',
  '\\bdef\\b': 'definitely',
  '\\bw/o\\b': 'without',
  '\\bw/\\b': 'with',
  '\\be.g.\\b': 'for example',
  '\\bi.e.\\b': 'that is',
  '\\betc.\\b': 'etcetera',
};

export function TextCleanerTool() {
  const { trigger } = useWebHaptics();
  const [inputText, setInputText] = useState<string>(SAMPLE_TEXT);
  const [options, setOptions] = useState<TextCleanerOptions>(DEFAULT_OPTIONS);
  const [findReplaceRules, setFindReplaceRules] = useState<FindReplaceRule[]>([
    { id: '1', find: '', replace: '', caseSensitive: false, useRegex: false },
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Update single option
  const updateOption = <K extends keyof TextCleanerOptions>(
    key: K,
    value: TextCleanerOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const selectAll = () => {
    trigger('selection');
    setOptions((prev) => ({
      ...prev,
      trim: true,
      removeLeadingSpaces: true,
      removeTrailingSpaces: true,
      removeBlankLines: true,
      multipleSpacesToSingle: true,
      removePunctuation: true,
      stripAllEmojis: true,
      removeLetterAccents: true,
      normalizeUnicodeLetters: true,
      removeReplacementCharacter: true,
      stripAllHtmlTags: true,
      removeAllIds: true,
      removeAllClasses: true,
      removeInlineStyles: true,
      decodeHtmlEntities: true,
      decodeUrlEncoded: true,
      stripEmails: true,
      removeBbcodeTags: true,
      removeDuplicateLines: true,
      removeRepeatingWords: true,
      smartQuotesToRegular: true,
      fixSpacesAfterPunctuation: true,
      convertShorthandToFull: true,
    }));
  };

  const selectNone = () => {
    trigger('selection');
    setOptions({
      ...DEFAULT_OPTIONS,
      trim: false,
      removeBlankLines: false,
      multipleSpacesToSingle: false,
      removeReplacementCharacter: false,
      letterCase: 'none',
    });
  };

  const resetToDefault = () => {
    trigger('selection');
    setOptions(DEFAULT_OPTIONS);
  };

  const addFindReplaceRule = () => {
    trigger('nudge');
    setFindReplaceRules((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        find: '',
        replace: '',
        caseSensitive: false,
        useRegex: false,
      },
    ]);
  };

  const removeFindReplaceRule = (id: string) => {
    trigger('nudge');
    setFindReplaceRules((prev) => prev.filter((r) => r.id !== id));
  };

  const updateFindReplaceRule = (
    id: string,
    field: keyof FindReplaceRule,
    value: string | boolean
  ) => {
    setFindReplaceRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  // Transformation Engine
  const cleanedText = useMemo(() => {
    let result = inputText;

    // 1. Unescape HTML tags
    if (options.unescapeHtmlTags) {
      result = result
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    }

    // 2. Decode URL-encoded characters
    if (options.decodeUrlEncoded) {
      try {
        result = decodeURIComponent(result);
      } catch {
        // Ignore malformed URI components
      }
    }

    // 3. Decode HTML entities
    if (options.decodeHtmlEntities) {
      result = result
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&copy;/g, '©')
        .replace(/&reg;/g, '®')
        .replace(/&trade;/g, '™')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–');
    }

    // 4. HTML Attribute & Tag stripping
    if (options.removeInlineStyles) {
      result = result.replace(/\s*style=("|')[^"']*("|')/gi, '');
    }
    if (options.removeAllIds) {
      result = result.replace(/\s*id=("|')[^"']*("|')/gi, '');
    }
    if (options.removeAllClasses) {
      result = result.replace(/\s*class=("|')[^"']*("|')/gi, '');
    }
    if (options.stripAllHtmlTags) {
      result = result.replace(/<[^>]*>/g, '');
    }

    // 5. BBCode stripping
    if (options.removeBbcodeTags) {
      result = result.replace(/\[\/?[a-zA-Z0-9=*_-]+\]/g, '');
    }

    // 6. Email & URL stripping / conversion
    if (options.stripEmails) {
      result = result.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        ''
      );
    }
    if (options.removeAllWebUrls) {
      result = result.replace(/https?:\/\/[^\s]+/g, '');
    }
    if (options.convertUrlsToLinks) {
      result = result.replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );
    }

    // 7. Accents & Unicode Normalization
    if (options.removeLetterAccents) {
      result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    if (options.normalizeUnicodeLetters) {
      result = result.normalize('NFKD');
    }

    // 8. Replacement characters (U+FFFD )
    if (options.removeReplacementCharacter) {
      result = result.replace(/\uFFFD/g, '');
    }

    // 9. Emojis removal
    if (options.stripAllEmojis) {
      result = result.replace(
        /([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\uE000-\uF8FF])/g,
        ''
      );
    }

    // 10. Non-ASCII / Non-Alphanumeric
    if (options.removeNonAscii) {
      result = result.replace(/[^\x00-\x7F]/g, '');
    }
    if (options.removeNonAlphanumeric) {
      result = result.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    // 11. Punctuation removal
    if (options.removePunctuation) {
      result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>@\[\]\\|]/g, '');
    }

    // 12. Smart / Regular quotes
    if (options.smartQuotesToRegular) {
      result = result
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');
    }
    if (options.regularQuotesToSmart) {
      result = result
        .replace(/(^|\s)'/g, '$1‘')
        .replace(/'/g, '’')
        .replace(/(^|\s)"/g, '$1“')
        .replace(/"/g, '”');
    }

    // 13. Writing helper (spacing after punctuation & shorthand)
    if (options.fixSpacesAfterPunctuation) {
      result = result
        .replace(/\s+([.,;:!?])/g, '$1')
        .replace(/([.,;:!?])([A-Za-z])/g, '$1 $2');
    }
    if (options.convertShorthandToFull) {
      Object.entries(SHORTHAND_MAP).forEach(([pattern, replacement]) => {
        result = result.replace(new RegExp(pattern, 'gi'), replacement);
      });
    }

    // 14. Space / Tab replacement
    if (options.replaceSpacesWithTab && options.spaceToTabCount > 0) {
      const spaceRegex = new RegExp(` {${options.spaceToTabCount}}`, 'g');
      result = result.replace(spaceRegex, '\t');
    }
    if (options.replaceTabWithSpaces && options.tabToSpacesCount > 0) {
      result = result.replace(/\t/g, ' '.repeat(options.tabToSpacesCount));
    }

    // 15. Whitespace and line operations
    if (options.removeLeadingSpaces) {
      result = result.replace(/^[ \t]+/gm, '');
    }
    if (options.removeTrailingSpaces) {
      result = result.replace(/[ \t]+$/gm, '');
    }
    if (options.multipleSpacesToSingle) {
      result = result.replace(/[^\S\r\n]+/g, ' ');
    }
    if (options.multipleBlankLinesToSingle) {
      result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
    }
    if (options.removeBlankLines) {
      result = result
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .join('\n');
    }
    if (options.replaceLineBreakWithSpace) {
      result = result.replace(/[\r\n]+/g, ' ');
    }
    if (options.removeAllLineBreaks) {
      result = result.replace(/[\r\n]+/g, '');
    }
    if (options.trim) {
      result = result.trim();
    }

    // 16. Duplicates (Lines & Repeating Words)
    if (options.removeDuplicateLines) {
      const lines = result.split('\n');
      const seen = new Set<string>();
      result = lines
        .filter((l) => {
          if (seen.has(l)) return false;
          seen.add(l);
          return true;
        })
        .join('\n');
    }
    if (options.removeRepeatingWords) {
      result = result.replace(/\b(\w+)(?:\s+\1\b)+/gi, '$1');
    }

    // 17. Trim character counts (Left / Right)
    if (options.trimLeftChars && options.trimLeftCount > 0) {
      result = result
        .split('\n')
        .map((l) => l.slice(options.trimLeftCount))
        .join('\n');
    }
    if (options.trimRightChars && options.trimRightCount > 0) {
      result = result
        .split('\n')
        .map((l) => (l.length > options.trimRightCount ? l.slice(0, -options.trimRightCount) : ''))
        .join('\n');
    }

    // 18. Letter case transformation
    if (options.letterCase === 'uppercase') {
      result = result.toUpperCase();
    } else if (options.letterCase === 'lowercase') {
      result = result.toLowerCase();
    } else if (options.letterCase === 'sentence') {
      result = result.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (options.letterCase === 'capitalize') {
      result = result.replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // 19. Find & Replace custom rules
    findReplaceRules.forEach((rule) => {
      if (!rule.find) return;
      try {
        if (rule.useRegex) {
          const flags = rule.caseSensitive ? 'g' : 'gi';
          const rx = new RegExp(rule.find, flags);
          result = result.replace(rx, rule.replace);
        } else {
          const escaped = rule.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const flags = rule.caseSensitive ? 'g' : 'gi';
          const rx = new RegExp(escaped, flags);
          result = result.replace(rx, rule.replace);
        }
      } catch {
        // Ignore invalid regex in user input
      }
    });

    return result;
  }, [inputText, options, findReplaceRules]);

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyToInput = () => {
    trigger('success');
    setInputText(cleanedText);
  };

  const inputStats = useMemo(() => {
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText.length ? inputText.split('\n').length : 0;
    return { chars, words, lines };
  }, [inputText]);

  const outputStats = useMemo(() => {
    const chars = cleanedText.length;
    const words = cleanedText.trim() ? cleanedText.trim().split(/\s+/).length : 0;
    const lines = cleanedText.length ? cleanedText.split('\n').length : 0;
    return { chars, words, lines };
  }, [cleanedText]);

  const faqs = [
    {
      q: 'What is Text Cleaner and Format Text Online?',
      a: 'Text Cleaner is an all-in-one online text cleaning, unformatting, and text processing suite. It lets you eliminate redundant spaces, remove non-ASCII and special characters, strip HTML tags/classes/styles, decode URL and entity encoding, standardize quotation marks, change letter case, remove duplicate lines or repeating words, and execute custom Find & Replace lists in real time.',
    },
    {
      q: 'How does the live configuration work?',
      a: 'All configuration checkboxes (Whitespace, Characters, HTML, Duplicates, Trim, Quotes, and Writing) apply to your text instantly in your browser. You can click "Apply Result as Input" to chain multiple transformations, or use "Select All / None / Default" for rapid 1-click cleaning.',
    },
    {
      q: 'Is my data private and secure?',
      a: 'Yes, 100%. All text processing, regex operations, and formatting algorithms run strictly client-side in your local web browser. Your text, emails, notes, or client data are never sent to any external server or saved in any remote database.',
    },
    {
      q: 'Can I remove HTML tags while keeping the text content?',
      a: 'Yes! Simply check "Strip all HTML tags". You can also choose to selectively remove only IDs, class attributes, or inline CSS styles while preserving the HTML structure, or decode HTML entities like &copy; and &amp;.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20 font-['Outfit',sans-serif]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
          <ChevronRight size={13} />
          <Link href="/tools?category=text-tools" className="hover:text-blue-600 transition-colors">Text & Formatting</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Clean Text & Formatting Online</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Sparkles size={14} />
            <span>All-In-One Text Cleaner</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Real-Time Client-Side</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Clean Text & Text Formatting Online
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Unformat text, remove extra whitespace, strip HTML tags & styles, eliminate duplicates, convert case, replace characters, and customize find & replace in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Browser Execution • 100% Private</span>
        </div>
      </div>

      {/* Main Dual Editor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600" />
                Input Text ({inputStats.chars} chars • {inputStats.words} words • {inputStats.lines} lines)
              </span>
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  trigger('nudge');
                }}
                className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                title="Clear input"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your raw uncleaned text here..."
              className="w-full h-80 sm:h-96 p-4 bg-slate-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y font-mono"
              spellCheck={false}
            />
          </div>

          {/* Cleaned Result Panel */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Cleaned Result ({outputStats.chars} chars • {outputStats.words} words • {outputStats.lines} lines)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApplyToInput}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-gray-700 font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy result into input box to chain modifications"
                >
                  <RotateCcw size={12} />
                  <span>Apply as Input</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1 text-xs bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={cleanedText}
              readOnly
              placeholder="Cleaned output will appear here in real time..."
              className="w-full h-80 sm:h-96 p-4 bg-emerald-50/30 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden leading-relaxed resize-y font-mono"
              spellCheck={false}
            />
          </div>
        </div>

        {/* SETTINGS CONTROL CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-8">
          {/* Quick Select Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2 font-['Asap']">
                <Settings2 size={18} className="text-blue-600" />
                SETTINGS &amp; CLEANING RULES
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Toggle cleaning rules to apply instant transformation to your text</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-gray-500">Quick Select:</span>
              <button
                type="button"
                onClick={selectAll}
                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
              >
                All
              </button>
              <button
                type="button"
                onClick={selectNone}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors cursor-pointer"
              >
                None
              </button>
              <button
                type="button"
                onClick={resetToDefault}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors cursor-pointer"
              >
                Default
              </button>
            </div>
          </div>

          {/* Section: Clean Text */}
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] font-['Asap'] mb-4 pb-2 border-b border-slate-100">
              Clean Text
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Whitespace */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600">
                  Whitespace
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.trim}
                      onChange={(e) => updateOption('trim', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Trim outer whitespace</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeLeadingSpaces}
                      onChange={(e) => updateOption('removeLeadingSpaces', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove leading spaces</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeTrailingSpaces}
                      onChange={(e) => updateOption('removeTrailingSpaces', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove trailing spaces</span>
                  </label>

                  {/* Replace spaces with tab */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="opt-space-tab"
                      checked={options.replaceSpacesWithTab}
                      onChange={(e) => updateOption('replaceSpacesWithTab', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="opt-space-tab" className="text-xs text-gray-700 flex items-center gap-1.5 cursor-pointer">
                      <span>Replace</span>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={options.spaceToTabCount}
                        onChange={(e) => updateOption('spaceToTabCount', parseInt(e.target.value) || 1)}
                        className="w-12 px-1.5 py-0.5 text-center text-xs bg-slate-50 border border-gray-200 rounded font-mono"
                      />
                      <span>space/s with 1 tab</span>
                    </label>
                  </div>

                  {/* Replace tab with spaces */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="opt-tab-space"
                      checked={options.replaceTabWithSpaces}
                      onChange={(e) => updateOption('replaceTabWithSpaces', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="opt-tab-space" className="text-xs text-gray-700 flex items-center gap-1.5 cursor-pointer">
                      <span>Replace 1 tab with</span>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={options.tabToSpacesCount}
                        onChange={(e) => updateOption('tabToSpacesCount', parseInt(e.target.value) || 1)}
                        className="w-12 px-1.5 py-0.5 text-center text-xs bg-slate-50 border border-gray-200 rounded font-mono"
                      />
                      <span>space/s</span>
                    </label>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={options.removeBlankLines}
                      onChange={(e) => updateOption('removeBlankLines', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove blank/empty lines</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.replaceLineBreakWithSpace}
                      onChange={(e) => updateOption('replaceLineBreakWithSpace', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Replace line break with space</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.multipleSpacesToSingle}
                      onChange={(e) => updateOption('multipleSpacesToSingle', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Multiple spaces to single</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.multipleBlankLinesToSingle}
                      onChange={(e) => updateOption('multipleBlankLinesToSingle', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Multiple blank lines to single</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeAllLineBreaks}
                      onChange={(e) => updateOption('removeAllLineBreaks', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove all line breaks</span>
                  </label>
                </div>
              </div>

              {/* Characters & Unicode */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600">
                  Characters &amp; Symbols
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removePunctuation}
                      onChange={(e) => updateOption('removePunctuation', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove punctuation marks</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.stripAllEmojis}
                      onChange={(e) => updateOption('stripAllEmojis', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Strip all emojis</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeLetterAccents}
                      onChange={(e) => updateOption('removeLetterAccents', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove letter accents (diacritics)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.normalizeUnicodeLetters}
                      onChange={(e) => updateOption('normalizeUnicodeLetters', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Normalize unicode letters/characters</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeReplacementCharacter}
                      onChange={(e) => updateOption('removeReplacementCharacter', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove replacement character ()</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeNonAscii}
                      onChange={(e) => updateOption('removeNonAscii', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove non-ASCII characters</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeNonAlphanumeric}
                      onChange={(e) => updateOption('removeNonAlphanumeric', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove non-alphanumeric characters</span>
                  </label>

                  <div className="pt-2">
                    <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Other &amp; Links</h5>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={options.stripEmails}
                          onChange={(e) => updateOption('stripEmails', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span>Strip all e-mails</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={options.removeBbcodeTags}
                          onChange={(e) => updateOption('removeBbcodeTags', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span>Remove BBCode tags (Forum)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={options.removeAllWebUrls}
                          onChange={(e) => updateOption('removeAllWebUrls', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span>Remove all web URLs</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={options.convertUrlsToLinks}
                          onChange={(e) => updateOption('convertUrlsToLinks', e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span>Convert URLs to HTML links</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTML & Web */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600">
                  HTML &amp; Encoding
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.unescapeHtmlTags}
                      onChange={(e) => updateOption('unescapeHtmlTags', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Unescape HTML tags (&lt; / &gt;)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.stripAllHtmlTags}
                      onChange={(e) => updateOption('stripAllHtmlTags', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Strip all HTML tags</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeAllIds}
                      onChange={(e) => updateOption('removeAllIds', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove all HTML IDs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeAllClasses}
                      onChange={(e) => updateOption('removeAllClasses', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove all HTML classes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.removeInlineStyles}
                      onChange={(e) => updateOption('removeInlineStyles', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Remove inline styles</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.decodeHtmlEntities}
                      onChange={(e) => updateOption('decodeHtmlEntities', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Decode HTML character entities</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={options.decodeUrlEncoded}
                      onChange={(e) => updateOption('decodeUrlEncoded', e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Decode URL-encoded characters (%20)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Text Formatting Online */}
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] font-['Asap'] mb-4 pb-2 border-b border-slate-100">
              Text Formatting Online
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Letter case */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600">
                  Letter Case
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="letterCase"
                      checked={options.letterCase === 'uppercase'}
                      onChange={() => updateOption('letterCase', 'uppercase')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Uppercase (HELLO)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="letterCase"
                      checked={options.letterCase === 'lowercase'}
                      onChange={() => updateOption('letterCase', 'lowercase')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Lowercase (hello)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="letterCase"
                      checked={options.letterCase === 'sentence'}
                      onChange={() => updateOption('letterCase', 'sentence')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Sentence case (Hello world.)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="letterCase"
                      checked={options.letterCase === 'capitalize'}
                      onChange={() => updateOption('letterCase', 'capitalize')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Capitalize Each Word</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="letterCase"
                      checked={options.letterCase === 'none'}
                      onChange={() => updateOption('letterCase', 'none')}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span>Do not change case</span>
                  </label>
                </div>
              </div>

              {/* Duplicates & Trim */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600 mb-2">
                    Duplicates
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.removeDuplicateLines}
                        onChange={(e) => updateOption('removeDuplicateLines', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Remove duplicate lines/paragraphs</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.removeRepeatingWords}
                        onChange={(e) => updateOption('removeRepeatingWords', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Remove repeating words</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600 mb-2">
                    Trim Characters
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="trim-l"
                        checked={options.trimLeftChars}
                        onChange={(e) => updateOption('trimLeftChars', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="trim-l" className="flex items-center gap-1.5 cursor-pointer text-xs">
                        <span>Remove</span>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={options.trimLeftCount}
                          onChange={(e) => updateOption('trimLeftCount', parseInt(e.target.value) || 1)}
                          className="w-12 px-1.5 py-0.5 text-center text-xs bg-slate-50 border border-gray-200 rounded font-mono"
                        />
                        <span>chars from left</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="trim-r"
                        checked={options.trimRightChars}
                        onChange={(e) => updateOption('trimRightChars', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="trim-r" className="flex items-center gap-1.5 cursor-pointer text-xs">
                        <span>Remove</span>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={options.trimRightCount}
                          onChange={(e) => updateOption('trimRightCount', parseInt(e.target.value) || 1)}
                          className="w-12 px-1.5 py-0.5 text-center text-xs bg-slate-50 border border-gray-200 rounded font-mono"
                        />
                        <span>chars from right</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quotes & Writing */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600 mb-2">
                    Quotes
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.smartQuotesToRegular}
                        onChange={(e) => updateOption('smartQuotesToRegular', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Smart quotes to regular (&ldquo; &rdquo; &rarr; &quot;)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.regularQuotesToSmart}
                        onChange={(e) => updateOption('regularQuotesToSmart', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Regular quotes to smart (&quot; &rarr; &ldquo; &rdquo;)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-blue-600 mb-2">
                    Writing &amp; Grammar
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.fixSpacesAfterPunctuation}
                        onChange={(e) => updateOption('fixSpacesAfterPunctuation', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Fix spaces after each punctuation mark</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={options.convertShorthandToFull}
                        onChange={(e) => updateOption('convertShorthandToFull', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span>Convert common shorthand to full words</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Custom Find & Replace List */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-extrabold text-[#0F172A] font-['Asap'] flex items-center gap-2">
                <Search size={18} className="text-blue-600" />
                Find and Replace Rules
              </h3>
              <button
                type="button"
                onClick={addFindReplaceRule}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Replacement Rule</span>
              </button>
            </div>

            <div className="space-y-3">
              {findReplaceRules.map((rule, idx) => (
                <div
                  key={rule.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-3 rounded-2xl bg-slate-50/80 border border-slate-200"
                >
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder={`Find text ${idx + 1}...`}
                      value={rule.find}
                      onChange={(e) => updateFindReplaceRule(rule.id, 'find', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Replace with..."
                      value={rule.replace}
                      onChange={(e) => updateFindReplaceRule(rule.id, 'replace', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-2">
                    <label className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rule.caseSensitive}
                        onChange={(e) => updateFindReplaceRule(rule.id, 'caseSensitive', e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Match Case</span>
                    </label>
                    <label className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rule.useRegex}
                        onChange={(e) => updateFindReplaceRule(rule.id, 'useRegex', e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Regex</span>
                    </label>
                    {findReplaceRules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFindReplaceRule(rule.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Remove rule"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO EXPLANATION ARTICLE & HOW TO USE */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs space-y-8 text-gray-800 leading-relaxed">
          {/* Section: What is Text Cleaner? */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-['Asap']">
                What is Text Cleaner &amp; Online Text Formatter?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <strong>Text Cleaner</strong> (or <em>Clean Text Online</em>) is an all-in-one web utility designed to perform complex text sanitation and formatting tasks directly in your browser. Whether you copied messy text from PDF documents, emails, word processors, web pages, or data entry spreadsheets, this tool enables you to remove unwanted characters, normalize whitespace, standardize quotes, change letter casing, and create your own customizable <strong>find and replace</strong> lists.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              It strips unnecessary spaces, deletes duplicate lines/paragraphs, strips and unescapes HTML tags, decodes character entities (like <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">&amp;copy;</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">&amp;amp;</code>), fixes punctuation spacing, and removes letter accents or emojis in real time.
            </p>
          </section>

          {/* Section: How to use? */}
          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-['Asap']">
              How to Use Clean Text?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <strong>Paste your raw text:</strong> Insert your raw content into the left <em>Input Text</em> box.
              </li>
              <li>
                <strong>Configure settings:</strong> Select from the extensive list of checkboxes below (Whitespace, Characters, HTML, Letter case, Duplicates, Quotes, and Writing options).
              </li>
              <li>
                <strong>Instant real-time output:</strong> Watch your cleaned text generate immediately in the right <em>Cleaned Result</em> box without having to reload the page.
              </li>
              <li>
                <strong>Chain transformations or Copy:</strong> Click <em>Copy Result</em> to paste into your clipboard, or click <em>Apply as Input</em> to chain further cleaning operations.
              </li>
            </ol>
          </section>

          {/* Section: Detailed Options Breakdown */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-['Asap']">
              Complete List of Text Cleaner Options &amp; Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-600">
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">1. Whitespace &amp; Line Cleaning</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Trim:</strong> Strips outer whitespace from the beginning and end of the full text.</li>
                  <li><strong>Remove leading &amp; trailing spaces:</strong> Strips padding whitespace at the start and end of every single line.</li>
                  <li><strong>Convert spaces to tabs / tabs to spaces:</strong> Configurable n-spaces to tab conversion.</li>
                  <li><strong>Remove blank/empty lines:</strong> Clears out unnecessary whitespace rows.</li>
                  <li><strong>Multiple spaces to single:</strong> Collapses repeated consecutive spaces into a single space.</li>
                  <li><strong>Remove line breaks:</strong> Concatenates multi-line text into a single continuous stream.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">2. Characters, Symbols &amp; Accents</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Remove punctuation:</strong> Removes all commas, periods, exclamation marks, and symbols.</li>
                  <li><strong>Strip emojis:</strong> Eliminates UTF-8 and unicode emojis.</li>
                  <li><strong>Remove diacritics / accents:</strong> Converts characters like <code className="bg-slate-100 px-1 rounded">café</code> into <code className="bg-slate-100 px-1 rounded">cafe</code>.</li>
                  <li><strong>Normalize Unicode letters:</strong> Replaces stylized bold/italic unicode glyphs with standard characters.</li>
                  <li><strong>Remove replacement characters:</strong> Removes broken UTF-8 &ldquo;&rdquo; marks.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">3. HTML, BBCode &amp; URLs</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Strip all HTML tags:</strong> Cleans markup like <code className="bg-slate-100 px-1 rounded">&lt;div&gt;</code> and <code className="bg-slate-100 px-1 rounded">&lt;p&gt;</code> leaving plain text.</li>
                  <li><strong>Remove IDs, Classes &amp; Inline Styles:</strong> Sanitizes HTML code while keeping tag names intact.</li>
                  <li><strong>Decode HTML Entities:</strong> Converts entity names &amp; codes back to readable characters.</li>
                  <li><strong>Decode URL-encoding:</strong> Transforms <code className="bg-slate-100 px-1 rounded">%20</code> into spaces.</li>
                  <li><strong>Strip Emails &amp; URLs:</strong> Sanitizes text by removing email addresses and web links.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">4. Formatting, Duplicates &amp; Writing</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>Letter Casing:</strong> Instantly switch between UPPERCASE, lowercase, Sentence case, and Title Case.</li>
                  <li><strong>Remove Duplicate Lines:</strong> Cleans duplicate paragraphs or lines for lists and CSV cleanups.</li>
                  <li><strong>Remove Repeating Words:</strong> Eliminates accidental consecutive double words (e.g. &ldquo;the the&rdquo;).</li>
                  <li><strong>Smart Quotes:</strong> Convert between curly typography quotes (&ldquo;&rdquo;) and straight programming quotes (&quot;).</li>
                  <li><strong>Grammar &amp; Shorthand:</strong> Fixes missing spaces after commas/periods and expands internet acronyms.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Privacy */}
          <section className="space-y-2 pt-4 border-t border-gray-100">
            <h3 className="text-base font-bold text-[#0F172A] font-['Asap']">
              Client-Side Privacy Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              All text cleaning and formatting is executed locally inside your web browser using modern JavaScript algorithms. Your sensitive customer records, confidential documents, passwords, or personal notes never touch any external server.
            </p>
          </section>
        </div>

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
