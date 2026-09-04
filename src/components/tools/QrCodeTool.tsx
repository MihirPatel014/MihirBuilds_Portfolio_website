'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Lock,
  Globe,
  Wifi,
  Mail,
  Phone,
  MessageCircle,
  CreditCard,
  MapPin,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Share2,
  FileCode,
  ShieldCheck,
  Palette,
  CheckCircle2,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

type QrTab = 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'phone' | 'whatsapp' | 'upi' | 'location';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export function QrCodeTool() {
  const { trigger } = useWebHaptics();

  // Active Type Tab
  const [activeTab, setActiveTab] = useState<QrTab>('url');

  // Fields for various QR types
  const [urlInput, setUrlInput] = useState<string>('https://mihirbuilds.com');
  const [textInput, setTextInput] = useState<string>('Welcome to MihirBuilds! Fast, secure and premium web solutions.');
  
  // WiFi fields
  const [wifiSsid, setWifiSsid] = useState<string>('MihirBuilds_WiFi');
  const [wifiPassword, setWifiPassword] = useState<string>('SecurePass2026!');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // vCard fields
  const [vcardName, setVcardName] = useState<string>('Mihir Patel');
  const [vcardOrg, setVcardOrg] = useState<string>('MihirBuilds Agency');
  const [vcardPhone, setVcardPhone] = useState<string>('+91 98765 43210');
  const [vcardEmail, setVcardEmail] = useState<string>('hello@mihirbuilds.com');
  const [vcardUrl, setVcardUrl] = useState<string>('https://mihirbuilds.com');

  // Email fields
  const [emailTo, setEmailTo] = useState<string>('contact@mihirbuilds.com');
  const [emailSubject, setEmailSubject] = useState<string>('Project Inquiry');
  const [emailBody, setEmailBody] = useState<string>('Hi Mihir, I would like to build a project with you.');

  // Phone
  const [phoneNumber, setPhoneNumber] = useState<string>('+919876543210');

  // WhatsApp
  const [waPhone, setWaPhone] = useState<string>('919876543210');
  const [waMessage, setWaMessage] = useState<string>('Hello! I came across MihirBuilds tools.');

  // UPI Payment
  const [upiId, setUpiId] = useState<string>('mihirpatel@okaxis');
  const [upiName, setUpiName] = useState<string>('Mihir Patel');
  const [upiAmount, setUpiAmount] = useState<string>('500');
  const [upiNote, setUpiNote] = useState<string>('Invoice Payment');

  // Location
  const [locLat, setLocLat] = useState<string>('23.0225');
  const [locLng, setLocLng] = useState<string>('72.5714');

  // Customization Options
  const [size, setSize] = useState<number>(320);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [darkColor, setDarkColor] = useState<string>('#0F172A');
  const [lightColor, setLightColor] = useState<string>('#FFFFFF');
  const [margin, setMargin] = useState<number>(2);

  // Generated QR outputs
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Compute Raw String based on active tab
  const computedQrPayload = (): string => {
    switch (activeTab) {
      case 'url':
        return urlInput.trim();
      case 'text':
        return textInput;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardUrl}\nEND:VCARD`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNumber.replace(/\s+/g, '')}`;
      case 'whatsapp': {
        const cleanWa = waPhone.replace(/[^0-9]/g, '');
        return `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;
      }
      case 'upi': {
        const params = new URLSearchParams();
        params.set('pa', upiId.trim());
        params.set('pn', upiName.trim());
        if (upiAmount) params.set('am', upiAmount.trim());
        params.set('cu', 'INR');
        if (upiNote) params.set('tn', upiNote.trim());
        return `upi://pay?${params.toString()}`;
      }
      case 'location':
        return `https://www.google.com/maps/search/?api=1&query=${locLat},${locLng}`;
      default:
        return urlInput;
    }
  };

  // Generate QR Code on any input change
  useEffect(() => {
    let isMounted = true;
    const payload = computedQrPayload();
    if (!payload) return;

    const generate = async () => {
      setGenerating(true);
      try {
        const opts = {
          errorCorrectionLevel: errorLevel,
          margin: margin,
          width: size,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        };

        const pngUrl = await QRCode.toDataURL(payload, opts);
        const svg = await QRCode.toString(payload, { ...opts, type: 'svg' });

        if (isMounted) {
          setDataUrl(pngUrl);
          setSvgString(svg);
        }
      } catch (err) {
        console.error('QR generation error:', err);
      } finally {
        if (isMounted) setGenerating(false);
      }
    };

    const timer = setTimeout(generate, 80);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [
    activeTab,
    urlInput,
    textInput,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    vcardName,
    vcardOrg,
    vcardPhone,
    vcardEmail,
    vcardUrl,
    emailTo,
    emailSubject,
    emailBody,
    phoneNumber,
    waPhone,
    waMessage,
    upiId,
    upiName,
    upiAmount,
    upiNote,
    locLat,
    locLng,
    size,
    errorLevel,
    darkColor,
    lightColor,
    margin,
  ]);

  // Download Handlers
  const handleDownloadPng = () => {
    if (!dataUrl) return;
    trigger('success');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${activeTab}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = () => {
    if (!svgString) return;
    trigger('success');
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${activeTab}-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyImage = async () => {
    if (!dataUrl) return;
    trigger('success');
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy text payload
      navigator.clipboard.writeText(computedQrPayload());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs: { id: QrTab; label: string; icon: React.ElementType }[] = [
    { id: 'url', label: 'URL / Website', icon: Globe },
    { id: 'text', label: 'Plain Text', icon: FileCode },
    { id: 'wifi', label: 'WiFi Network', icon: Wifi },
    { id: 'vcard', label: 'Contact (vCard)', icon: ShieldCheck },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'upi', label: 'UPI Payment', icon: CreditCard },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone Call', icon: Phone },
    { id: 'location', label: 'Google Maps', icon: MapPin },
  ];

  const faqs = [
    {
      q: 'Is this QR code generator completely free with no watermark?',
      a: 'Yes, 100% free forever. There are no watermarks, no registration or email sign-ups required, and no scan limits. The generated QR codes are yours to use commercially for marketing flyers, restaurant menus, product packaging, and websites.',
    },
    {
      q: 'Do these QR codes ever expire?',
      a: 'No! These are standard static QR codes. The encoded information (like your URL, WiFi credentials, vCard, or UPI address) is stored directly inside the visual matrix pattern. As long as your destination website or network exists, the QR code will work permanently.',
    },
    {
      q: 'What is the best error correction level to select?',
      a: 'Level M (~15% recovery) is the industry standard balance for digital and print materials. Use Level Q (~25%) or Level H (~30%) if you plan to print QR codes on outdoor signs, vehicle wraps, or surfaces that might get scratched or folded.',
    },
    {
      q: 'Should I download PNG or SVG?',
      a: 'Download PNG for websites, emails, presentations, and standard social media graphics. Download vector SVG for high-resolution commercial printing on banners, posters, billboards, and brochures because SVGs can be enlarged to any size without pixelation.',
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
          <span className="text-gray-900 font-semibold truncate">Free QR Code Generator</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <QrCode size={14} />
            <span>High-Resolution Vector QR Maker</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>No Watermark • 100% Free</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Free Online QR Code Generator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
            Create custom QR codes for URLs, WiFi passwords, vCards, WhatsApp chat, UPI payments, and Google Maps. Customize colors, error correction, and download instant high-res PNG or SVG.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Client-Side Processing • Never Expires</span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form & Configuration (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Type Selector Tabs */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-xs">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">
                1. Select QR Code Type
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        trigger('selection');
                      }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border text-left ${
                        isActive
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-slate-50/70 hover:bg-slate-100 text-gray-700 border-gray-200/80'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-white' : 'text-blue-600'} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Input Form */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                2. Enter Information
              </span>

              {/* URL Form */}
              {activeTab === 'url' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Website URL</label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <p className="text-[11px] text-gray-500">Include https:// for automatic browser redirection upon scanning.</p>
                </div>
              )}

              {/* Text Form */}
              {activeTab === 'text' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Plain Text Message</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={4}
                    placeholder="Enter any text, notes, serial numbers, or instructions..."
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] resize-y"
                  />
                </div>
              )}

              {/* WiFi Form */}
              {activeTab === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder="MyHomeWiFi"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Password</label>
                      <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder="WiFi Password"
                        className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Encryption</label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password (Open)</option>
                      </select>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Hidden SSID Network</span>
                  </label>
                </div>
              )}

              {/* vCard Form */}
              {activeTab === 'vcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Company / Organization</label>
                    <input
                      type="text"
                      value={vcardOrg}
                      onChange={(e) => setVcardOrg(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">Website URL</label>
                    <input
                      type="url"
                      value={vcardUrl}
                      onChange={(e) => setVcardUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* WhatsApp Form */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">WhatsApp Phone Number (with country code)</label>
                    <input
                      type="text"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      placeholder="e.g. 919876543210 (no + sign)"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Pre-filled Chat Message</label>
                    <textarea
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      rows={3}
                      placeholder="Hello! I would like to know more about your services."
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {activeTab === 'upi' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700">UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="merchant@okhdfcbank"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Payee Name</label>
                      <input
                        type="text"
                        value={upiName}
                        onChange={(e) => setUpiName(e.target.value)}
                        placeholder="Store or Person Name"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Amount (INR ₹, Optional)</label>
                      <input
                        type="number"
                        value={upiAmount}
                        onChange={(e) => setUpiAmount(e.target.value)}
                        placeholder="e.g. 500"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700">Note / Reference (Optional)</label>
                      <input
                        type="text"
                        value={upiNote}
                        onChange={(e) => setUpiNote(e.target.value)}
                        placeholder="e.g. Order #1042"
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Works seamlessly with Google Pay, PhonePe, Paytm, BHIM, and any UPI-compatible banking app.
                  </p>
                </div>
              )}

              {/* Email Form */}
              {activeTab === 'email' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Recipient Email</label>
                    <input
                      type="email"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      placeholder="support@example.com"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Inquiry"
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Email Message Body</label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={3}
                      placeholder="Hello..."
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* Phone Form */}
              {activeTab === 'phone' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Phone Number to Dial</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 800 555 0199"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <p className="text-[11px] text-gray-500">Scanning will open the native phone dialer with this number.</p>
                </div>
              )}

              {/* Location Form */}
              {activeTab === 'location' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Latitude</label>
                    <input
                      type="text"
                      value={locLat}
                      onChange={(e) => setLocLat(e.target.value)}
                      placeholder="23.0225"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Longitude</label>
                    <input
                      type="text"
                      value={locLng}
                      onChange={(e) => setLocLng(e.target.value)}
                      placeholder="72.5714"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                3. Custom Appearance &amp; Settings
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Resolution ({size}px)</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="180">180px (Thumbnail)</option>
                    <option value="256">256px (Business Card)</option>
                    <option value="320">320px (Standard)</option>
                    <option value="512">512px (Flyers &amp; Web)</option>
                    <option value="1024">1024px (Ultra HD Print)</option>
                  </select>
                </div>

                {/* Error Correction Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Error Correction</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setErrorLevel(lvl);
                          trigger('selection');
                        }}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                          errorLevel === lvl
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-slate-50 text-gray-700 border-gray-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dark Color */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Foreground Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-9 h-8 p-0.5 rounded-lg border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Light Color */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-9 h-8 p-0.5 rounded-lg border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live QR Preview & Export (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-5">
              <div className="w-full flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <QrCode size={15} className="text-blue-600" />
                  Live Preview
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Ready to Scan
                </span>
              </div>

              {/* QR Image Frame */}
              <div
                className="p-4 rounded-3xl border border-gray-200/90 shadow-inner flex items-center justify-center relative transition-all"
                style={{ backgroundColor: lightColor }}
              >
                {dataUrl ? (
                  <img
                    src={dataUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto rounded-xl object-contain"
                    style={{ maxHeight: '280px' }}
                  />
                ) : (
                  <div className="w-64 h-64 flex flex-col items-center justify-center text-gray-400">
                    <RefreshCw className="animate-spin mb-2" size={24} />
                    <span className="text-xs">Generating code...</span>
                  </div>
                )}
              </div>

              {/* Quick Summary Pill */}
              <div className="text-xs text-gray-500 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-gray-100 w-full truncate">
                <span className="font-semibold text-gray-700">Data:</span> {computedQrPayload()}
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    disabled={!dataUrl}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer disabled:opacity-40"
                  >
                    <Download size={14} />
                    <span>Download PNG</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSvg}
                    disabled={!svgString}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer disabled:opacity-40"
                  >
                    <FileCode size={14} />
                    <span>Download SVG</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyImage}
                  disabled={!dataUrl}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
                </button>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 text-xs text-blue-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Sparkles size={13} className="text-blue-600" />
                Scanning Pro Tip
              </span>
              <p className="text-blue-800/90 leading-relaxed text-[11px]">
                Always test scan your QR code with a phone camera before printing bulk materials. Maintain high contrast between dark foreground and light background.
              </p>
            </div>
          </div>
        </div>

        {/* GUIDES, TABLES & SEO SECTION */}
        <div className="mt-14 space-y-8">
          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-base font-['Asap']">100% Free &amp; Unlimited</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Generate as many QR codes as you need for personal or commercial projects. No signup, no paywalls, and zero ads or watermarks.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-base font-['Asap']">Privacy-First Architecture</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All QR rendering runs entirely inside your browser. Your WiFi passwords, private links, and contact vCards are never sent to external servers.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Palette size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-base font-['Asap']">Vector SVG &amp; PNG Export</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Export scalable vector graphics (SVG) ready for large billboards and printing presses, or download high-density PNG for web and mobile.
              </p>
            </div>
          </div>

          {/* Size & Print Distance Guide Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] font-['Asap']">
                QR Code Size &amp; Print Distance Guide
              </h2>
              <p className="text-xs text-gray-500 mt-1">Recommended physical print sizes and scan distances for 100% reliable camera detection.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-slate-50/70 text-gray-700">
                    <th className="py-3 px-4 font-bold">Use Case</th>
                    <th className="py-3 px-4 font-bold">Min Print Size</th>
                    <th className="py-3 px-4 font-bold">Recommended Scan Distance</th>
                    <th className="py-3 px-4 font-bold">Recommended Export</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Business Cards &amp; Badges</td>
                    <td className="py-3 px-4">2.0 cm x 2.0 cm</td>
                    <td className="py-3 px-4">15 cm &ndash; 25 cm</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold text-xs">256px PNG / SVG</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Restaurant Table Menus</td>
                    <td className="py-3 px-4">3.5 cm x 3.5 cm</td>
                    <td className="py-3 px-4">30 cm &ndash; 50 cm</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold text-xs">512px PNG</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Flyers, Brochures &amp; Mailers</td>
                    <td className="py-3 px-4">4.0 cm x 4.0 cm</td>
                    <td className="py-3 px-4">40 cm &ndash; 75 cm</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold text-xs">512px PNG</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Posters (A3 / A2 / A1)</td>
                    <td className="py-3 px-4">10.0 cm x 10.0 cm</td>
                    <td className="py-3 px-4">1.0 m &ndash; 2.5 m</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-semibold text-xs">1024px PNG / SVG</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-900">Outdoor Billboards &amp; Banners</td>
                    <td className="py-3 px-4">30.0 cm+</td>
                    <td className="py-3 px-4">3.0 m &ndash; 15.0 m</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-semibold text-xs">Vector SVG Only</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Error Correction Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] font-['Asap']">
              Understanding QR Code Error Correction Levels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-base font-bold text-blue-600">Level L (Low)</span>
                <p className="font-semibold text-gray-800">Recovers up to ~7% of damaged data</p>
                <p className="text-gray-500 text-xs">Best for clean digital screens and compact QR code sizes.</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <span className="text-base font-bold text-blue-600">Level M (Medium)</span>
                <p className="font-semibold text-gray-800">Recovers up to ~15% of damaged data</p>
                <p className="text-gray-500 text-xs">Recommended default balance between density and reliability.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-base font-bold text-blue-600">Level Q (Quartile)</span>
                <p className="font-semibold text-gray-800">Recovers up to ~25% of damaged data</p>
                <p className="text-gray-500 text-xs">Ideal for hand-held flyers, brochures, and retail product packaging.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-base font-bold text-blue-600">Level H (High)</span>
                <p className="font-semibold text-gray-800">Recovers up to ~30% of damaged data</p>
                <p className="text-gray-500 text-xs">Required for outdoor decals, vehicles, and worn surfaces.</p>
              </div>
            </div>
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
    </div>
  );
}
