'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { Target, Users, Lightbulb, TrendingUp, Award, Shield } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function About() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
              We Help Businesses
              <span className="block mt-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                Work Smarter, Not Harder
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              MihirBuilds was founded with a clear mission: to make custom automation accessible to businesses ready to scale, streamline customer communication, and eliminate repetitive tasks.
            </p>

            <Link href="/contact">
              <Button variant="primary" size="lg">
                Work With Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MihirBuilds emerged from a simple observation: modern businesses lose countless hours to manual, repetitive tasks—from chasing leads on WhatsApp and sending follow-up emails, to copy-pasting data across disjointed apps.
                </p>
                <p>
                  We believe that automation shouldn't be a complex luxury reserved only for enterprise giants. Our focus is on building robust, tailor-made solutions using platforms like Make, n8n, and custom API integrations.
                </p>
                <p>
                  Today, we help business owners free up their time, eliminate human errors, and scale operations smoothly by putting their workflows and customer communications on autopilot.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc3MTk0MDc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business Automation Process"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide how we build our automations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                We design workflows to perform tasks in seconds, helping you cut out waste, reduce response times, and run lean.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                We ensure data moves flawlessly between your CRM, marketing platforms, and chat systems, preventing costly mistakes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Reliability</h3>
              <p className="text-gray-600 leading-relaxed">
                Our automations are built to run 24/7 with comprehensive error handling and real-time alerts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Commitment</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Users size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-white/80">Tailored Solutions</div>
              </div>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">10x</div>
                <div className="text-white/80">Faster Turnaround</div>
              </div>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Shield size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Uptime & Monitoring</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Meet the Founder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The expertise behind your business automation systems
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2563EB] to-[#14B8A6] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-4xl font-bold text-white">MP</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-[#0F172A] mb-1">Mihir Patel</h3>
                <p className="text-[#2563EB] font-medium mb-4">Founder & Automation Architect</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mihir is a software engineer with years of experience building scalable applications and workflow integrations. He specializes in designing smart, autonomous systems that sync customer chats, capture marketing leads, and manage database pipelines.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through MihirBuilds, he partners directly with growing agencies and small businesses to implement workflows that drive conversions and scale without expanding overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's build workflows that handle your repetitive tasks so you can focus on growth.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
