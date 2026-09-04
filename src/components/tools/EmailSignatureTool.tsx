'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Copy,
  Check,
  Eye,
  Code2,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Sliders,
  User,
  Building2,
  Phone,
  Globe,
  Upload,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function EmailSignatureTool() {
  const { trigger } = useWebHaptics();

  // Signature Data
  const [fullName, setFullName] = useState<string>('Mihir Patel');
  const [jobTitle, setJobTitle] = useState<string>('Full-Stack Engineer & Automation Architect');
  const [company, setCompany] = useState<string>('MihirBuilds Agency');
  const [email, setEmail] = useState<string>('mihir@mihirbuilds.com');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [website, setWebsite] = useState<string>('https://mihirbuilds.com');
  const [avatarUrl, setAvatarUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
  const [accentColor, setAccentColor] = useState<string>('#2563EB');

  // Social Links
  const [linkedin, setLinkedin] = useState<string>('https://linkedin.com/in/mihirpatel');
  const [github, setGithub] = useState<string>('https://github.com/mihirpatel');
  const [twitter, setTwitter] = useState<string>('https://x.com/mihirbuilds');

  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Pure HTML Email Signature Markup (Compatible with Gmail, Outlook, Apple Mail)
  const signatureHtml = `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 18px; color: #334155;">
  <tbody>
    <tr>
      <td valign="top" style="padding-right: 16px; border-right: 2px solid ${accentColor};">
        <img src="${avatarUrl}" alt="${fullName}" width="72" height="72" style="border-radius: 50%; display: block; object-fit: cover;" />
      </td>
      <td valign="top" style="padding-left: 16px;">
        <div style="font-size: 16px; font-weight: bold; color: #0f172a; line-height: 20px;">${fullName}</div>
        <div style="font-size: 12px; color: ${accentColor}; font-weight: 600; margin-bottom: 6px;">${jobTitle} | ${company}</div>
        <table cellpadding="0" cellspacing="0" border="0" style="font-size: 12px; line-height: 16px; color: #64748b;">
          <tr>
            <td style="padding-bottom: 2px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #64748b; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding-bottom: 2px;"><strong>Phone:</strong> <a href="tel:${phone.replace(/\s+/g, '')}" style="color: #64748b; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding-bottom: 4px;"><strong>Website:</strong> <a href="${website}" target="_blank" rel="noopener noreferrer" style="color: ${accentColor}; font-weight: 600; text-decoration: none;">${website.replace(/^https?:\/\//, '')}</a></td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;

  const handleCopy = () => {
    trigger('success');
    navigator.clipboard.writeText(signatureHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const faqs = [
    {
      q: 'How do I add this email signature to Gmail?',
      a: 'In Gmail, go to Settings (gear icon) > See all settings > General tab > scroll down to Signature > Click "Create New", paste the signature directly or paste the HTML code, and hit Save Changes.',
    },
    {
      q: 'Will my signature look identical across Outlook and Apple Mail?',
      a: 'Yes. The generated HTML uses inline CSS and standard table structures which is the universal standard for all email clients.',
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
          <span className="text-gray-900 font-semibold truncate">Email Signature Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Mail size={14} />
            <span>HTML Email Designer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Universal Client Compatibility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Email Signature Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Create professional, responsive HTML email signatures for Gmail, Outlook, and Apple Mail with custom logos and contact details.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Client-Side • No Tracking</span>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
              <Sliders size={16} className="text-blue-600" />
              Personal &amp; Company Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Website URL</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Avatar / Logo Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Accent Border Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-8 p-0.5 rounded-lg border border-gray-200 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Code Output */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={15} className="text-blue-600" />
                  Generated HTML Signature
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedHtml ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedHtml ? 'Copied HTML!' : 'Copy HTML Signature'}</span>
                </button>
              </div>
              <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {signatureHtml}
              </pre>
            </div>
          </div>

          {/* Preview (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye size={15} className="text-blue-600" />
                  Live Signature Preview
                </span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  Inbox Ready
                </span>
              </div>

              {/* Rendered HTML inside white frame */}
              <div
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
                dangerouslySetInnerHTML={{ __html: signatureHtml }}
              />

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                {copiedHtml ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHtml ? 'Copied to Clipboard!' : 'Copy Email Signature'}</span>
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
