'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  Mail,
  Lock,
  Code2,
  Layers,
  Wrench,
  FileCode2,
} from 'lucide-react';
import { ToolItem, getPopularTools } from '@/data/tools';
import { useWebHaptics } from 'web-haptics/react';

export function ComingSoonTool({ tool }: { tool?: ToolItem }) {
  const { trigger } = useWebHaptics();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const popular = getPopularTools().filter((t) => t.id !== tool?.id).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    trigger('success');
    setSubmitted(true);
  };

  const toolName = tool ? tool.name : 'Online Tool';
  const toolDesc = tool ? tool.description : 'This tool is currently in active development by the MihirBuilds engineering team and will be released shortly.';
  const categoryName = tool ? tool.categoryName : 'Utilities';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
          <ChevronRight size={13} />
          <Link href={`/tools?category=${tool?.categoryId || 'all'}`} className="hover:text-blue-600 transition-colors">{categoryName}</Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-semibold truncate">{toolName}</span>
        </nav>
      </div>

      {/* Main Content Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs">
            <Clock size={14} className="text-amber-600 animate-pulse" />
            <span>In Active Development • Launching Soon</span>
          </div>

          {/* Heading */}
          <div className="max-w-xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
              {toolName}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {toolDesc}
            </p>
          </div>

          {/* Feature Highlights Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-xs text-blue-600 mb-1">
                <CheckCircle2 size={15} /> 100% Client-Side
              </div>
              <p className="text-[11px] text-gray-500">Fast, local in-browser processing with zero server uploads.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-600 mb-1">
                <CheckCircle2 size={15} /> Free & Unlimited
              </div>
              <p className="text-[11px] text-gray-500">No account required, no file limits, no watermarks.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-xs text-indigo-600 mb-1">
                <CheckCircle2 size={15} /> Mobile Optimized
              </div>
              <p className="text-[11px] text-gray-500">Works smoothly across mobile, tablet, and desktop.</p>
            </div>
          </div>

          {/* Notification Form */}
          <div className="max-w-md mx-auto pt-4">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Thank you! We will notify you as soon as this tool is live.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email to get notified..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs shrink-0 cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Explore Ready Tools */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-['Asap']">
              Available Tools Ready to Use Right Now
            </h2>
            <Link href="/tools" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
              View All Directory <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popular.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileCode2 size={18} />
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 text-sm mb-1 font-['Asap']">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Use Tool</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
