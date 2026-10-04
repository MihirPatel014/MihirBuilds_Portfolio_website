'use client';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedMarquee } from '@/components/ui/AnimatedMarquee';
import { AnimatedNodePipeline } from '@/components/ui/AnimatedNodePipeline';
import { AnimatedWorkflowPreview } from '@/components/AnimatedWorkflowPreview';
import { ServiceCard } from '@/components/ServiceCard';
import { WorkflowStep } from '@/components/WorkflowStep';
import { FeatureGridItem } from '@/components/FeatureGrid';
import { CTABlock } from '@/components/CTABlock';
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
} from 'lucide-react';

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

      {/* 1. Hero Section with Next.js Priority Image */}
      <HeroSection />

      {/* 2. Infinite Integration Logo Marquee */}
      <AnimatedMarquee />

      {/* 3. Automation Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Turn Repetitive Work Into Automated Systems
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tailored business automation engines configured specifically to eliminate bottlenecks in your lead capture, customer support, and internal operations.
            </p>
          </div>

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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Interactive Automation Pipeline
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Simulate how our WhatsApp, AI, and CRM integration engine triggers data packets in real-time.
            </p>
          </div>

          <AnimatedNodePipeline />
        </div>
      </section>

      {/* 5. Live Simulation Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Live Chat & Webhook Simulator
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Test how prospects experience instant responses while back-end tasks run automatically.
            </p>
          </div>

          <AnimatedWorkflowPreview />
        </div>
      </section>

      {/* 6. Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Our 4-Step Implementation Process
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              From audit to deployment, we build and test your custom automation pipeline seamlessly.
            </p>
          </div>

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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Built For Business Growth & Reliability
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Why leading agencies, e-commerce stores, and service teams trust MihirBuilds.
            </p>
          </div>

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
