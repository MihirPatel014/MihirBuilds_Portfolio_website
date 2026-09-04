'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Copy,
  Check,
  Eye,
  Code2,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Sliders,
  Phone,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function WhatsAppWidgetTool() {
  const { trigger } = useWebHaptics();

  // Widget settings
  const [phoneNumber, setPhoneNumber] = useState<string>('919876543210');
  const [businessName, setBusinessName] = useState<string>('MihirBuilds Support');
  const [headerTitle, setHeaderTitle] = useState<string>('Chat with us on WhatsApp');
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    'Hi there! 👋 How can we help you with your next web project?'
  );
  const [prefilledMessage, setPrefilledMessage] = useState<string>(
    'Hello! I would like to schedule a consultation.'
  );
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [themeColor, setThemeColor] = useState<string>('#25D366'); // WhatsApp Brand Green
  const [callToAction, setCallToAction] = useState<string>('Need help? Chat with us');

  // Preview toggle
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Compute Clean WA Link
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const waDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledMessage)}`;

  // Generate HTML/CSS embed snippet
  const embedCode = `<!-- Floating WhatsApp Widget by MihirBuilds -->
<div id="mb-whatsapp-widget" style="position: fixed; bottom: 24px; ${position}: 24px; z-index: 99999; font-family: system-ui, -apple-system, sans-serif;">
  <!-- Trigger Button -->
  <a href="${waDirectUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 10px; background-color: ${themeColor}; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 50px; box-shadow: 0 4px 14px rgba(0,0,0,0.2); font-size: 14px; font-weight: 600; transition: transform 0.2s ease;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.771.867 2.796.867 3.182 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.393 8.3c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.967-.399-1.637-1.373-1.685-1.438-.049-.064-.913-1.213-.913-2.314 0-1.102.576-1.644.78-1.868.204-.224.444-.28.592-.28.148 0 .296.002.426.008.136.006.319-.052.499.38.188.452.645 1.572.702 1.687.057.115.096.25.02.402-.075.152-.113.247-.225.377-.113.13-.237.29-.339.39-.113.111-.231.232-.099.458.132.227.587.969 1.258 1.568.864.772 1.593 1.011 1.82 1.124.226.113.359.094.492-.058.133-.153.57-1.428.723-1.802.152-.375.304-.313.513-.235.209.078 1.325.624 1.551.737.227.113.378.17.434.266.057.096.057.556-.087.961z"/>
    </svg>
    <span>${callToAction}</span>
  </a>
</div>`;

  const handleCopyCode = () => {
    trigger('success');
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const faqs = [
    {
      q: 'How do I add this WhatsApp widget to my website?',
      a: 'Simply copy the ready-to-use HTML code snippet and paste it right before the closing </body> tag of your website (HTML, WordPress, Webflow, Shopify, or Next.js).',
    },
    {
      q: 'Does it require any external JavaScript libraries or API keys?',
      a: 'No! It is 100% pure HTML, inline CSS, and SVG. It contains zero external dependencies, meaning it loads instantly with zero impact on your site’s Google PageSpeed scores.',
    },
    {
      q: 'Will it work on mobile phones and desktop computers?',
      a: 'Yes. On mobile devices, scanning or clicking opens the native WhatsApp app. On desktops, it seamlessly opens WhatsApp Web.',
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
          <span className="text-gray-900 font-semibold truncate">WhatsApp Widget Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2 shadow-2xs">
            <MessageCircle size={14} />
            <span>Click-to-Chat Widget</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>No Coding Needed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            WhatsApp Floating Widget Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Create custom floating WhatsApp chat buttons for your website. Customize branding colors, welcome messages, pre-filled text, and copy ready-to-use HTML/CSS.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Zero Dependencies • Fast Load</span>
        </div>
      </div>

      {/* Main Studio */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
              <Sliders size={16} className="text-blue-600" />
              Configure WhatsApp Button
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">WhatsApp Phone Number (with Country Code)</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 919876543210 (without + or spaces)"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
                <p className="text-[11px] text-gray-500 mt-0.5">Example: 91 for India, 1 for USA/Canada, 44 for UK.</p>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Button Call-To-Action Text</label>
                <input
                  type="text"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  placeholder="Need help? Chat with us"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Pre-filled Chat Message (Sent by Customer)</label>
                <textarea
                  value={prefilledMessage}
                  onChange={(e) => setPrefilledMessage(e.target.value)}
                  rows={2}
                  placeholder="Hello! I want to inquire about..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Screen Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPosition('left')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        position === 'left' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      Bottom Left
                    </button>
                    <button
                      type="button"
                      onClick={() => setPosition('right')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        position === 'right' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      Bottom Right
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Button Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-10 h-8 p-0.5 rounded-lg border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Embed Code Output */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={15} className="text-blue-600" />
                  Generated Embed Code (Copy &amp; Paste)
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Copied HTML!' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* Interactive Preview Panel (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye size={15} className="text-blue-600" />
                  Live Website Preview
                </span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  Simulated Page
                </span>
              </div>

              {/* Fake Browser Container */}
              <div className="relative h-96 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex flex-col justify-between p-4">
                {/* Fake Webpage content */}
                <div className="space-y-3 opacity-40">
                  <div className="h-4 bg-slate-300 rounded-md w-3/4"></div>
                  <div className="h-3 bg-slate-300 rounded-md w-full"></div>
                  <div className="h-3 bg-slate-300 rounded-md w-5/6"></div>
                  <div className="h-20 bg-slate-200 rounded-xl w-full mt-4"></div>
                </div>

                {/* Floating WhatsApp Trigger Button */}
                <div
                  className={`flex ${position === 'left' ? 'justify-start' : 'justify-end'} z-10`}
                >
                  <a
                    href={waDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white font-semibold text-xs px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
                    style={{ backgroundColor: themeColor }}
                  >
                    <MessageCircle size={18} />
                    <span>{callToAction}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Test Link in WhatsApp <ExternalLink size={12} />
                </a>
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
