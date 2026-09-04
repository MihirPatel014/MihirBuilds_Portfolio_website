'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Download,
  Lock,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Sliders,
  AudioWaveform,
} from 'lucide-react';
import { useWebHaptics } from 'web-haptics/react';

export function TextToSpeechTool() {
  const { trigger } = useWebHaptics();

  const [text, setText] = useState<string>(
    'Hello! Welcome to MihirBuilds agency. We engineer state-of-the-art web applications, seamless automations, and high-performance digital tools.'
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Load available system voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      setVoices(avail);
      if (avail.length > 0 && !selectedVoice) {
        // Default to first English voice or first voice
        const english = avail.find((v) => v.lang.startsWith('en')) || avail[0];
        setSelectedVoice(english.voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedVoice]);

  // Play Speech
  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    trigger('nudge');
    const utterance = new SpeechSynthesisUtterance(text);
    const chosen = voices.find((v) => v.voiceURI === selectedVoice);
    if (chosen) utterance.voice = chosen;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    trigger('nudge');
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleReset = () => {
    trigger('selection');
    setRate(1);
    setPitch(1);
    setVolume(1);
  };

  const faqs = [
    {
      q: 'Does this text to speech tool send my text to external servers?',
      a: 'No. This uses the native HTML5 Web Speech Synthesis API built directly into your browser and operating system. Your text never leaves your device.',
    },
    {
      q: 'How can I change the accent or language of the voice?',
      a: 'Open the Voice dropdown selector. You can choose any voice installed on your operating system (including US, UK, Australian, Indian, Spanish, French, and Japanese voices).',
    },
    {
      q: 'Can I use this for video voiceovers or podcast intros?',
      a: 'Yes, you can test dialogue, proofread scripts by listening, and adjust speed or tone for accessibility.',
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
          <span className="text-gray-900 font-semibold truncate">Text to Speech Demo</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2 shadow-2xs">
            <Volume2 size={14} />
            <span>Native Speech Synthesis</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Real-Time Voice Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-['Asap']">
            Text to Speech Voice Demo
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Convert written text into lifelike natural-sounding human speech. Adjust pitch, playback speed, volume, and choose from diverse accents.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-semibold text-gray-700 self-start md:self-auto">
          <Lock size={14} className="text-emerald-600" />
          <span>Browser Execution • Zero Latency</span>
        </div>
      </div>

      {/* Main Studio */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Script / Text Input
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {text.length} characters • {text.trim() ? text.trim().split(/\s+/).length : 0} words
            </span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste any text you want to convert to voice speech..."
            className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-[#2563EB] leading-relaxed resize-y font-sans"
          />

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {isPlaying ? (
                <button
                  type="button"
                  onClick={handlePause}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Pause size={15} />
                  <span>Stop Speech</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Play size={15} />
                  <span>Play Speech</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 text-gray-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Reset sliders"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {isPlaying && (
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 animate-pulse">
                <AudioWaveform size={18} />
                <span>Speaking...</span>
              </div>
            )}
          </div>
        </div>

        {/* Audio Tuning Sliders */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider pb-3 border-b border-gray-100 font-['Asap'] flex items-center gap-2">
            <Sliders size={16} className="text-blue-600" />
            Voice &amp; Audio Settings
          </h2>

          <div className="space-y-4">
            {/* Voice Dropdown */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Select Voice / Accent ({voices.length} detected)
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]"
              >
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Speed / Rate</span>
                  <span className="font-mono text-blue-600">{rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Pitch</span>
                  <span className="font-mono text-blue-600">{pitch}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Volume</span>
                  <span className="font-mono text-blue-600">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>
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
  );
}
