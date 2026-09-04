'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Copy,
  Check,
  Download,
  Eye,
  Code2,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Sliders,
  ShieldCheck,
  Building2,
  Globe,
  Mail,
  Scale,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function TermsConditionsTool() {
  const { trigger } = useWebHaptics();

  // Basic Business Details
  const [companyName, setCompanyName] = useState<string>('MyCompany Inc.');
  const [websiteName, setWebsiteName] = useState<string>('MyWebsite');
  const [websiteUrl, setWebsiteUrl] = useState<string>('https://example.com');
  const [contactEmail, setContactEmail] = useState<string>('legal@example.com');
  const [jurisdiction, setJurisdiction] = useState<string>('Delaware, United States');
  const [effectiveDate, setEffectiveDate] = useState<string>(
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  );

  // Policy Options
  const [hasUserAccounts, setHasUserAccounts] = useState<boolean>(true);
  const [hasPaidSubscriptions, setHasPaidSubscriptions] = useState<boolean>(true);
  const [hasUserContent, setHasUserContent] = useState<boolean>(false);
  const [hasCopyrightNotice, setHasCopyrightNotice] = useState<boolean>(true);
  const [limitLiability, setLimitLiability] = useState<boolean>(true);
  const [terminationRight, setTerminationRight] = useState<boolean>(true);

  // View mode
  const [outputMode, setOutputMode] = useState<'preview' | 'html' | 'text'>('preview');
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Markdown generator
  const termsMarkdown = useMemo(() => {
    return `# Terms and Conditions for ${companyName}

**Effective Date:** ${effectiveDate}
**Website:** [${websiteName}](${websiteUrl})

Welcome to **${websiteName}**! These terms and conditions outline the rules and regulations for the use of **${companyName}**'s Website and Services, located at **${websiteUrl}**.

By accessing or using this website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access or use our service.

---

## 1. Definitions and Interpretation

- **"Company"** (referred to as either "the Company", "We", "Us" or "Our") refers to **${companyName}**.
- **"Service"** refers to the Website accessible from **${websiteUrl}** and all related digital services, software, and products.
- **"User"** (referred to as "You" or "Your") means the individual accessing or using the Service, or the company on behalf of which such individual is accessing or using the Service.

---

## 2. Intellectual Property Rights

${hasCopyrightNotice ? `Unless otherwise stated, **${companyName}** and/or its licensors own all the intellectual property rights and materials contained in this Website. All intellectual property rights are reserved.

You are granted a limited, non-transferable license only for purposes of viewing and interacting with the material provided on this Service. You must not:
- Republish, sell, rent, or sub-license material from **${websiteName}** without written consent.
- Reproduce, duplicate, or copy proprietary material for commercial exploitation.
- Reverse engineer, decompile, or attempt to extract source code from our software.
` : `All content provided on this Website is subject to applicable intellectual property laws.\n`}
---

${hasUserAccounts ? `## 3. User Accounts & Security

When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.

You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party and must notify us immediately upon becoming aware of any breach of security or unauthorized use.

---
` : ''}${hasPaidSubscriptions ? `## 4. Subscriptions, Fees, and Payments

Certain aspects of the Service may be provided on a paid subscription basis or one-time fee:
- **Billing:** You will be billed in advance on a recurring and periodic basis (such as monthly or annually).
- **Payment Processing:** Payments are processed securely via certified third-party payment gateways.
- **Refund Policy:** Unless required by applicable law, paid subscription fees are non-refundable. You may cancel your subscription renewal at any time via your account settings.
- **Fee Modifications:** **${companyName}** reserves the right to modify subscription fees upon thirty (30) days notice.

---
` : ''}${hasUserContent ? `## 5. User-Generated Content

In these Terms and Conditions, "User Content" shall mean any audio, video, text, images, or other material you choose to display or post on this Website.

By posting User Content, you grant **${companyName}** a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute it in any and all media. Your User Content must be your own and must not infringe on any third party's legal rights.

---
` : ''}${limitLiability ? `## 6. Limitation of Liability and "As-Is" Disclaimer

To the maximum extent permitted by applicable law, in no event shall **${companyName}**, nor its directors, employees, partners, agents, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
1. Your access to or use of or inability to access or use the Service;
2. Any unauthorized access to or use of our secure servers and/or any personal information stored therein;
3. Any bugs, viruses, Trojan horses, or the like transmitted to or through our Service.

The Service is provided on an **"AS IS"** and **"AS AVAILABLE"** basis without warranties of any kind, whether express or implied.

---
` : ''}${terminationRight ? `## 7. Termination

We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

All provisions of the Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

---
` : ''}## 8. Governing Law & Jurisdiction

These Terms shall be governed and construed in accordance with the laws of **${jurisdiction}**, without regard to its conflict of law provisions. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located within **${jurisdiction}**.

---

## 9. Changes to Terms

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

---

## 10. Contact Us

If you have any questions or legal inquiries regarding these Terms and Conditions, please contact us:
- **Company:** ${companyName}
- **Website:** [${websiteUrl}](${websiteUrl})
- **Email:** ${contactEmail}
`;
  }, [
    companyName,
    websiteName,
    websiteUrl,
    contactEmail,
    jurisdiction,
    effectiveDate,
    hasUserAccounts,
    hasPaidSubscriptions,
    hasUserContent,
    hasCopyrightNotice,
    limitLiability,
    terminationRight,
  ]);

  const termsHtml = useMemo(() => {
    return termsMarkdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
      .replace(/\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '<p></p>')
      .replace(/---/gim, '<hr/>');
  }, [termsMarkdown]);

  const handleCopy = () => {
    trigger('success');
    const content = outputMode === 'html' ? termsHtml : termsMarkdown;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    trigger('success');
    const blob = new Blob([outputMode === 'html' ? termsHtml : termsMarkdown], {
      type: outputMode === 'html' ? 'text/html' : 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terms-and-conditions-${websiteName.toLowerCase().replace(/\s+/g, '-')}.${outputMode === 'html' ? 'html' : 'md'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is the purpose of Terms and Conditions?',
      a: 'Terms and Conditions (also known as Terms of Service or Terms of Use) act as a legally binding contract between you and your users. They protect your intellectual property, limit your legal liability, define payment rules, and give you the legal right to terminate abusive accounts.',
    },
    {
      q: 'What governing law should I select?',
      a: 'Choose the state, province, or country where your business is officially registered or incorporated (e.g. "Delaware, United States", "California, USA", or "United Kingdom").',
    },
    {
      q: 'Can I edit this document after generating it?',
      a: 'Yes! You can copy the raw Markdown or HTML into any editor, or download the text file to further tweak specific business policies with your legal advisor.',
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
          <Link href="/tools?category=utilities" className="hover:text-blue-600 transition-colors">Utilities</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">Terms &amp; Conditions Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Scale size={14} />
            <span>Legal Agreement Builder</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Free Forever</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Terms &amp; Conditions Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Generate legally sound terms of service, user agreements, and disclaimer documents customized for SaaS, ecommerce stores, and digital websites.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Generation • Instant Export</span>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
                <Building2 size={16} className="text-blue-600" />
                1. Company Information
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Company / Legal Entity</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Website Name</label>
                  <input
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Website URL</label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Governing Jurisdiction</label>
                  <input
                    type="text"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    placeholder="e.g. Delaware, United States"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Legal Support Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Clauses Toggles */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
                <Sliders size={16} className="text-blue-600" />
                2. Legal Clauses &amp; Policy Rules
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasUserAccounts}
                    onChange={(e) => setHasUserAccounts(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>User Account Registration Rules</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasPaidSubscriptions}
                    onChange={(e) => setHasPaidSubscriptions(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Paid Subscriptions &amp; Billing Clauses</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasUserContent}
                    onChange={(e) => setHasUserContent(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>User-Generated Content Licenses</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasCopyrightNotice}
                    onChange={(e) => setHasCopyrightNotice(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Strict Copyright &amp; IP Protection</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={limitLiability}
                    onChange={(e) => setLimitLiability(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Limitation of Liability &amp; As-Is Disclaimer</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={terminationRight}
                    onChange={(e) => setTerminationRight(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Right to Terminate Abusive Accounts</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Output Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Generated Terms Document
                </span>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200">
                  Ready to Publish
                </span>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOutputMode('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    outputMode === 'preview' ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Formatted Preview
                </button>
                <button
                  type="button"
                  onClick={() => setOutputMode('html')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    outputMode === 'html' ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  HTML Code
                </button>
                <button
                  type="button"
                  onClick={() => setOutputMode('text')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    outputMode === 'text' ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  Markdown
                </button>
              </div>
            </div>

            {/* Display Body */}
            <div className="h-[520px] overflow-y-auto p-4 bg-slate-50 border border-gray-200 rounded-2xl text-xs sm:text-sm leading-relaxed text-gray-800">
              {outputMode === 'preview' && (
                <div className="prose prose-slate max-w-none space-y-3">
                  <pre className="font-sans whitespace-pre-wrap leading-relaxed text-gray-800">
                    {termsMarkdown}
                  </pre>
                </div>
              )}
              {outputMode === 'html' && (
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap">
                  {termsHtml}
                </pre>
              )}
              {outputMode === 'text' && (
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap">
                  {termsMarkdown}
                </pre>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Terms & Conditions'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Download ({outputMode === 'html' ? '.html' : '.md'})</span>
              </button>
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
