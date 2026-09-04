'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutTemplate,
  Copy,
  Check,
  Eye,
  Code2,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Sliders,
  Plus,
  Trash2,
  Send,
  Download,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  placeholder: string;
  options?: string[]; // for select
}

export function ContactFormGeneratorTool() {
  const { trigger } = useWebHaptics();

  // Form Settings
  const [formTitle, setFormTitle] = useState<string>('Send Us a Message');
  const [formSubtitle, setFormSubtitle] = useState<string>(
    'Fill out the form below and our team will get back to you within 24 hours.'
  );
  const [buttonText, setButtonText] = useState<string>('Submit Inquiry');
  const [actionUrl, setActionUrl] = useState<string>('https://formspree.io/f/your-form-id');
  const [accentColor, setAccentColor] = useState<string>('#2563EB');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Fields Builder
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
    { id: '2', name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'jane@example.com' },
    { id: '3', name: 'phone', label: 'Phone Number', type: 'tel', required: false, placeholder: '+1 555 000 1234' },
    { id: '4', name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Project Consultation' },
    { id: '5', name: 'message', label: 'Your Message', type: 'textarea', required: true, placeholder: 'Describe your project or questions...' },
  ]);

  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Field manipulation
  const addField = () => {
    trigger('nudge');
    const newId = Math.random().toString();
    setFields((prev) => [
      ...prev,
      {
        id: newId,
        name: `field_${prev.length + 1}`,
        label: 'New Field',
        type: 'text',
        required: false,
        placeholder: 'Enter value...',
      },
    ]);
  };

  const removeField = (id: string) => {
    trigger('nudge');
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateField = (id: string, prop: keyof FormField, value: any) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [prop]: value } : f)));
  };

  // Generate Pure HTML/CSS Embed Code
  const generatedFormCode = useMemo(() => {
    const isDark = themeMode === 'dark';
    const bg = isDark ? '#0f172a' : '#ffffff';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const subColor = isDark ? '#94a3b8' : '#64748b';
    const inputBg = isDark ? '#1e293b' : '#f8fafc';
    const inputBorder = isDark ? '#334155' : '#e2e8f0';

    return `<!-- Responsive Contact Form by MihirBuilds -->
<div class="mb-contact-form-wrapper" style="max-width: 580px; margin: 0 auto; background: ${bg}; padding: 32px; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); font-family: system-ui, -apple-system, sans-serif; box-sizing: border-box;">
  <h2 style="margin: 0 0 8px; color: ${textColor}; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">${formTitle}</h2>
  ${formSubtitle ? `<p style="margin: 0 0 24px; color: ${subColor}; font-size: 14px; line-height: 1.5;">${formSubtitle}</p>` : ''}
  
  <form action="${actionUrl}" method="POST" style="display: flex; flex-direction: column; gap: 16px;">
${fields
  .map((field) => {
    if (field.type === 'textarea') {
      return `    <div>
      <label for="${field.name}" style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: ${textColor};">
        ${field.label}${field.required ? ' <span style="color: #ef4444;">*</span>' : ''}
      </label>
      <textarea id="${field.name}" name="${field.name}" rows="4" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} style="width: 100%; box-sizing: border-box; padding: 12px 14px; font-size: 14px; background: ${inputBg}; border: 1px solid ${inputBorder}; border-radius: 12px; color: ${textColor}; outline: none; font-family: inherit; resize: vertical;"></textarea>
    </div>`;
    }
    return `    <div>
      <label for="${field.name}" style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: ${textColor};">
        ${field.label}${field.required ? ' <span style="color: #ef4444;">*</span>' : ''}
      </label>
      <input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} style="width: 100%; box-sizing: border-box; padding: 12px 14px; font-size: 14px; background: ${inputBg}; border: 1px solid ${inputBorder}; border-radius: 12px; color: ${textColor}; outline: none; font-family: inherit;" />
    </div>`;
  })
  .join('\n')}
    <button type="submit" style="margin-top: 8px; width: 100%; background: ${accentColor}; color: #ffffff; border: none; padding: 14px 20px; font-size: 15px; font-weight: 700; border-radius: 12px; cursor: pointer; transition: opacity 0.2s ease;">
      ${buttonText}
    </button>
  </form>
</div>`;
  }, [formTitle, formSubtitle, buttonText, actionUrl, accentColor, themeMode, fields]);

  const handleCopyCode = () => {
    trigger('success');
    navigator.clipboard.writeText(generatedFormCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadHtml = () => {
    trigger('success');
    const blob = new Blob([generatedFormCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-form.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'How does form submission work without a backend server?',
      a: 'You can connect your form to free backend endpoints such as Formspree, Formkeep, Getform, or Google Apps Script by pasting your form ID in the Action URL field.',
    },
    {
      q: 'Can I use this generated form on WordPress or Shopify?',
      a: 'Yes! Simply copy the code and paste it into a "Custom HTML" block or widget inside your WordPress page, Webflow embed, or Shopify theme.',
    },
    {
      q: 'Is the generated form mobile responsive?',
      a: 'Yes, 100%. The layout automatically adapts to smartphones, tablets, and full desktop displays.',
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
          <span className="text-gray-900 font-semibold truncate">Contact Form Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <LayoutTemplate size={14} />
            <span>Visual Form Designer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Ready-to-Paste HTML</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Free Contact Form Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Create responsive, validated HTML/CSS contact forms with custom fields, themes, and instant clean embed snippets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Zero Dependencies • Fast Load</span>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Settings & Field Builder (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* General Styling */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
                <Sliders size={16} className="text-blue-600" />
                1. Form Titles &amp; Endpoints
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Form Heading</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Subtitle / Instructions</label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Action URL (Formspree, Getform, or API)</label>
                  <input
                    type="text"
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                    placeholder="https://formspree.io/f/your-id"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Submit Button Text</label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Accent Button Color</label>
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
                        className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fields Builder */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-['Asap']">
                  2. Customize Form Fields
                </h2>
                <button
                  type="button"
                  onClick={addField}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add Field</span>
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-700">Field #{idx + 1}</span>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField(field.id)}
                          className="text-rose-600 hover:bg-rose-50 p-1 rounded cursor-pointer"
                          title="Remove field"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-gray-500 font-semibold block mb-0.5">Label</label>
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(field.id, 'label', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-500 font-semibold block mb-0.5">Input Type</label>
                        <select
                          value={field.type}
                          onChange={(e) => updateField(field.id, 'type', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs"
                        >
                          <option value="text">Text (Single Line)</option>
                          <option value="email">Email Address</option>
                          <option value="tel">Phone Number</option>
                          <option value="textarea">Textarea (Multi-line)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-gray-500 font-semibold block mb-0.5">Placeholder</label>
                        <input
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs"
                        />
                      </div>

                      <div className="flex items-center pt-3">
                        <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700 select-none">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                            className="rounded text-blue-600"
                          />
                          <span>Required Field</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview & Code Panel (6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
            {/* Live Form Preview */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye size={15} className="text-blue-600" />
                  Live Form Preview
                </span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  Responsive Box
                </span>
              </div>

              {/* Rendered Form Box */}
              <div
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-inner"
                dangerouslySetInnerHTML={{ __html: generatedFormCode }}
              />
            </div>

            {/* Generated Code Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={15} className="text-blue-600" />
                  Ready-to-Use HTML &amp; Inline CSS
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadHtml}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1 text-xs bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied HTML!' : 'Copy Snippet'}</span>
                  </button>
                </div>
              </div>

              <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-60">
                {generatedFormCode}
              </pre>
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
