'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCheck,
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
  FileText,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function PrivacyPolicyTool() {
  const { trigger } = useWebHaptics();

  // Basic Details
  const [companyName, setCompanyName] = useState<string>('MyCompany Inc.');
  const [websiteName, setWebsiteName] = useState<string>('MyWebsite');
  const [websiteUrl, setWebsiteUrl] = useState<string>('https://example.com');
  const [contactEmail, setContactEmail] = useState<string>('privacy@example.com');
  const [effectiveDate, setEffectiveDate] = useState<string>(
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  );

  // Compliance & Features
  const [gdprCompliant, setGdprCompliant] = useState<boolean>(true);
  const [ccpaCompliant, setCcpaCompliant] = useState<boolean>(true);
  const [collectCookies, setCollectCookies] = useState<boolean>(true);
  const [googleAnalytics, setGoogleAnalytics] = useState<boolean>(true);
  const [googleAdSense, setGoogleAdSense] = useState<boolean>(false);
  const [paymentProcessors, setPaymentProcessors] = useState<boolean>(true); // Stripe / PayPal
  const [userAccounts, setUserAccounts] = useState<boolean>(true);
  const [newsletterEmails, setNewsletterEmails] = useState<boolean>(true);

  // Output Format: HTML or Plain Text Markdown
  const [outputMode, setOutputMode] = useState<'preview' | 'html' | 'text'>('preview');
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Generate Policy Text
  const policyMarkdown = useMemo(() => {
    return `# Privacy Policy for ${companyName}

**Effective Date:** ${effectiveDate}
**Website:** [${websiteName}](${websiteUrl})

At **${companyName}**, accessible from **${websiteUrl}**, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of personal information collected and recorded by ${companyName} and how we use, protect, and handle it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at **${contactEmail}**.

---

## 1. Information We Collect

We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.

The personal information we collect may include:
- **Contact Details:** Name, email address (${contactEmail}), phone number, and physical billing/shipping address.
${userAccounts ? '- **Account Credentials:** Passwords, usernames, and account security details.\n' : ''}${paymentProcessors ? '- **Payment Information:** Credit/debit card numbers and billing addresses processed securely through third-party payment gateways (e.g., Stripe, PayPal). We do not store raw financial data on our servers.\n' : ''}${newsletterEmails ? '- **Communications:** Email marketing opt-ins, survey responses, and feedback.\n' : ''}
---

## 2. How We Use Your Information

We use the collected information for various legitimate business purposes, including:
- Operating, maintaining, and providing the features of **${websiteName}**.
- Improving and personalizing user experience.
- Processing financial transactions and order fulfillment.
- Communicating customer service notices, security updates, and administrative alerts.
${newsletterEmails ? '- Sending newsletters, marketing emails, and promotional offers (with opt-out at any time).\n' : ''}- Preventing fraudulent transactions, combating bot attacks, and ensuring legal compliance.

---

${collectCookies ? `## 3. Cookies and Web Beacons

Like any modern website, **${websiteName}** uses "cookies" to store information including visitors' preferences and the specific pages visited. This information is used to optimize the user experience by customizing our web page content based on your browser type and session history.

You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.

---
` : ''}${googleAnalytics || googleAdSense ? `## 4. Third-Party Services & Advertising

We may partner with third-party vendors who use cookies and web tracking technologies:
${googleAnalytics ? '- **Google Analytics:** To analyze site traffic, popular content, and visitor demographics. Google uses cookies to collect anonymous usage telemetry.\n' : ''}${googleAdSense ? '- **Google AdSense & Advertising Networks:** Third-party advertisers may serve ads when you visit our website. These companies may use aggregated cookies (like the DoubleClick cookie) to serve ads based on prior visits.\n' : ''}
---
` : ''}${gdprCompliant ? `## 5. GDPR Data Protection Rights (European Users)

Under the General Data Protection Regulation (GDPR), European Union residents are entitled to the following data protection rights:
- **The right to access:** You have the right to request copies of your personal data.
- **The right to rectification:** You have the right to request that we correct any information you believe is inaccurate.
- **The right to erasure ("Right to be Forgotten"):** You have the right to request that we erase your personal data under certain conditions.
- **The right to restrict processing:** You have the right to request that we restrict the processing of your personal data.
- **The right to data portability:** You have the right to request that we transfer the data that we have collected to another organization, or directly to you.

If you make a request, we have one month to respond to you. Please contact us at **${contactEmail}** to exercise these rights.

---
` : ''}${ccpaCompliant ? `## 6. CCPA/CPRA Privacy Rights (California Consumers)

Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific rights:
- **Right to Know:** You may request disclosure of the categories and specific pieces of personal data collected over the preceding 12 months.
- **Right to Delete:** You may request deletion of personal information collected from you.
- **Right to Opt-Out of Sale or Sharing:** **${companyName} does NOT sell or monetize your personal data to third-party data brokers.**
- **Right to Non-Discrimination:** We will not discriminate against you for exercising any of your CCPA rights.

To submit a verified consumer request, please contact us at **${contactEmail}**.

---
` : ''}## 7. Data Security & Storage

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please remember that no transmission over the Internet or electronic storage method is 100% secure.

---

## 8. Children's Information

Protecting children's privacy online is paramount. **${websiteName}** does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child provided this kind of information on our website, please contact us immediately and we will promptly remove such information from our records.

---

## 9. Contact Us

If you have any questions, suggestions, or concerns regarding this Privacy Policy, please contact our Data Protection team at:
- **Company:** ${companyName}
- **Website:** [${websiteUrl}](${websiteUrl})
- **Email:** ${contactEmail}
`;
  }, [
    companyName,
    websiteName,
    websiteUrl,
    contactEmail,
    effectiveDate,
    gdprCompliant,
    ccpaCompliant,
    collectCookies,
    googleAnalytics,
    googleAdSense,
    paymentProcessors,
    userAccounts,
    newsletterEmails,
  ]);

  // Computed HTML String
  const policyHtml = useMemo(() => {
    return policyMarkdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
      .replace(/\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '<p></p>')
      .replace(/---/gim, '<hr/>');
  }, [policyMarkdown]);

  const handleCopy = () => {
    trigger('success');
    const content = outputMode === 'html' ? policyHtml : policyMarkdown;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    trigger('success');
    const blob = new Blob([outputMode === 'html' ? policyHtml : policyMarkdown], {
      type: outputMode === 'html' ? 'text/html' : 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacy-policy-${websiteName.toLowerCase().replace(/\s+/g, '-')}.${outputMode === 'html' ? 'html' : 'md'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'Do I legally need a Privacy Policy on my website?',
      a: 'Yes. Laws like GDPR (EU), CCPA/CPRA (California), CalOPPA, and PIPEDA require websites that collect any personal data (such as emails, cookies, analytics, or contact form submissions) to display a comprehensive privacy policy.',
    },
    {
      q: 'Does this policy cover Google Analytics and Google AdSense?',
      a: 'Yes. When you check the Google Analytics and Google AdSense options, specific clauses disclosing third-party advertising cookies, DoubleClick tags, and traffic telemetry are automatically inserted into the policy.',
    },
    {
      q: 'Is this Privacy Policy generator completely free?',
      a: 'Yes, 100% free with no subscriptions, recurring fees, or watermarks. You can generate, edit, and export your policy in plain text markdown or HTML.',
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
          <span className="text-gray-900 font-semibold truncate">Privacy Policy Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <ShieldCheck size={14} />
            <span>GDPR &amp; CCPA Compliant</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>100% Free Forever</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Free Privacy Policy Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Generate custom, legally compliant privacy policies for websites, mobile apps, SaaS, and eCommerce stores with GDPR &amp; CCPA clauses.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Local Generation • Instant Export</span>
        </div>
      </div>

      {/* Main Studio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
                <Building2 size={16} className="text-blue-600" />
                1. Business &amp; Website Information
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Company / Business Name</label>
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
                  <label className="font-semibold text-gray-700 block mb-1">Privacy Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Compliance & Features Toggles */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
                <Sliders size={16} className="text-blue-600" />
                2. Data Collection &amp; Compliance Options
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={gdprCompliant}
                    onChange={(e) => setGdprCompliant(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>GDPR Compliance Clauses (EU Users)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ccpaCompliant}
                    onChange={(e) => setCcpaCompliant(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>CCPA / CPRA Clauses (California Users)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={collectCookies}
                    onChange={(e) => setCollectCookies(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Website Uses Cookies &amp; Tracking</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={googleAnalytics}
                    onChange={(e) => setGoogleAnalytics(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Google Analytics Tracking Disclosures</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={googleAdSense}
                    onChange={(e) => setGoogleAdSense(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Google AdSense &amp; Advertising Partners</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paymentProcessors}
                    onChange={(e) => setPaymentProcessors(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Online Payments (Stripe, PayPal, etc.)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={userAccounts}
                    onChange={(e) => setUserAccounts(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>User Accounts / Login Registration</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletterEmails}
                    onChange={(e) => setNewsletterEmails(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>Newsletter &amp; Marketing Emails</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Output Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Generated Policy Document
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
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
                    {policyMarkdown}
                  </pre>
                </div>
              )}
              {outputMode === 'html' && (
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap">
                  {policyHtml}
                </pre>
              )}
              {outputMode === 'text' && (
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap">
                  {policyMarkdown}
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
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Policy'}</span>
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
