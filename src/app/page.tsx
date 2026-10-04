'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ServiceCard } from '@/components/ServiceCard';
import { WorkflowStep } from '@/components/WorkflowStep';
import { FeatureGridItem } from '@/components/FeatureGrid';
import { CTABlock } from '@/components/CTABlock';
import { AnimatedWorkflowPreview } from '@/components/AnimatedWorkflowPreview';
import { AnimatedMarquee } from '@/components/ui/AnimatedMarquee';
import { AnimatedNodePipeline } from '@/components/ui/AnimatedNodePipeline';
import {
  MessageSquare,
  Mail,
  Workflow,
  Lightbulb,
  Rocket,
  Users,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "MihirBuilds | WhatsApp, Email & Workflow Automation",
        "description": "MihirBuilds helps businesses automate WhatsApp, email, lead management and repetitive workflows with custom automation solutions.",
        "url": "https://www.mihirbuilds.com",
        "isPartOf": {
          "@type": "WebSite",
          "name": "MihirBuilds",
          "alternateName": "Mihir Builds",
          "url": "https://www.mihirbuilds.com"
        }
      },
      {
        "@type": "Organization",
        "name": "MihirBuilds",
        "url": "https://www.mihirbuilds.com",
        "logo": "https://www.mihirbuilds.com/images/logo.png",
        "description": "Premium Business Automation Services"
      }
    ]
  };

  return (
    <div className="bg-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 1. Hero Section - Animated Glowing Grid & Shiny Text */}
      <section className="relative min-h-[90dvh] pt-28 pb-16 flex items-center overflow-hidden bg-slate-950 text-white">
        {/* Animated Radial Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full mb-6 text-xs sm:text-sm font-medium text-teal-400 shadow-sm">
                <Sparkles size={15} className="text-teal-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Next-Gen Automation Engine</span>
              </div>

              {/* 21st.dev Style Animated Shiny Gradient Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                Scale Your Business With Intelligent
                <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-[length:200%_auto] animate-pulse bg-clip-text text-transparent">
                  WhatsApp, Email & Workflow Systems
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                We design custom automation pipelines that handle customer communications, lead qualification, and cross-platform workflows 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/30">
                    <span>Book a Free Demo</span>
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/whatsapp-automation" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-200 bg-slate-900/60 hover:bg-slate-800 hover:text-white">
                    Explore Solutions
                  </Button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">10x</div>
                  <div className="text-xs text-slate-400 mt-0.5">Faster Response</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-teal-400">95%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-0.5">Uptime & Ops</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTg2MDA4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Business Automation Pipeline"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Live Workflow Engine</div>
                      <div className="text-[11px] text-slate-400">Automated lead qualification active</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Running
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 21st.dev Infinite Integration Logo Marquee */}
      <AnimatedMarquee />

      {/* 3. Automation Services Section with Border Beams */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Turn Repetitive Work Into Automated Systems
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tailored business automation engines configured specifically to eliminate bottlenecks in your lead capture, customer support, and internal operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={MessageSquare}
              title="WhatsApp Automation"
              description="Engage prospects instantly on WhatsApp with AI-driven chatbots that capture leads and answer FAQs 24/7."
              benefits={[
                'Instant customer auto-responses',
                'Automated lead qualification',
                'Multi-lingual chat flows',
                'Direct CRM & Sheet sync'
              ]}
              link="/whatsapp-automation"
              gradient="from-emerald-500 to-teal-600"
            />

            <ServiceCard
              icon={Mail}
              title="Email Automation"
              description="Nurture leads and drive recurring sales through intelligent triggered email sequences and behavioral workflows."
              benefits={[
                'Personalized lead nurture sequences',
                'Behavior-triggered drip campaigns',
                'Conversion analytics tracking',
                'Seamless email platform integration'
              ]}
              link="/email-automation"
              gradient="from-blue-500 to-indigo-600"
            />

            <ServiceCard
              icon={Workflow}
              title="Custom Workflow Engine"
              description="Connect your favorite web tools with custom webhook pipelines that execute complex tasks automatically."
              benefits={[
                'Multi-step app integrations',
                'Conditional business logic',
                'Error fallback & monitoring',
                '1000+ API connector webhooks'
              ]}
              link="/workflow-automation"
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        </div>
      </section>

      {/* 4. Interactive Node Pipeline Section */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Interactive Automation Pipeline
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Simulate how our WhatsApp, AI, and CRM integration engine triggers data packets in real-time.
            </p>
          </motion.div>

          <AnimatedNodePipeline />
        </div>
      </section>

      {/* 5. Live Simulation Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Live Chat & Webhook Simulator
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Test how prospects experience instant responses while back-end tasks run automatically.
            </p>
          </motion.div>

          <AnimatedWorkflowPreview />
        </div>
      </section>

      {/* 6. Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Our 4-Step Implementation Process
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              From audit to deployment, we build and test your custom automation pipeline seamlessly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            <WorkflowStep
              icon={Lightbulb}
              title="1. Audit & Map"
              description="We audit your manual bottlenecks and outline the exact workflow steps to automate."
              step={1}
            />
            <WorkflowStep
              icon={Rocket}
              title="2. Build Logic"
              description="We construct custom API triggers, chat responses, and CRM integrations."
              step={2}
            />
            <WorkflowStep
              icon={Users}
              title="3. Test & Connect"
              description="We connect your current software stack and test all conditional edge cases."
              step={3}
            />
            <WorkflowStep
              icon={TrendingUp}
              title="4. Deploy & Scale"
              description="Go live with continuous uptime monitoring, performance optimization, and updates."
              step={4}
              isLast
            />
          </div>
        </div>
      </section>

      {/* 7. Key Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Built For Business Growth & Reliability
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Why leading agencies, e-commerce stores, and service teams trust MihirBuilds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureGridItem
              icon={Zap}
              title="Sub-Second Response Times"
              description="Acknowledge incoming prospects instantly before competitors can reply."
              index={0}
            />
            <FeatureGridItem
              icon={Target}
              title="Zero Missed Leads"
              description="Capture contact info and qualify prospect intent even outside standard working hours."
              index={1}
            />
            <FeatureGridItem
              icon={Clock}
              title="Automated Follow-Up Sequences"
              description="Send timely reminders and follow-ups without manual staff effort."
              index={2}
            />
            <FeatureGridItem
              icon={TrendingUp}
              title="Drastic Time Savings"
              description="Free your human team from administrative data entry to focus on high-ticket sales."
              index={3}
            />
            <FeatureGridItem
              icon={Users}
              title="Multi-Team Sync"
              description="Keep sales, support, and ops synchronized with automated CRM updates."
              index={4}
            />
            <FeatureGridItem
              icon={Shield}
              title="Enterprise Reliability"
              description="Secure webhook connections with built-in retries and 99.9% uptime design."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <CTABlock
        title="Ready to Automate Your Operations?"
        description="Schedule a free strategy call to see how custom WhatsApp, Email, and Workflow automation can save your team hours every single day."
        primaryButtonText="Book Your Free Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All Services"
        secondaryButtonLink="/whatsapp-automation"
      />
    </div>
  );
}
