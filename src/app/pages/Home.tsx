import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { ServiceCard } from '../components/ServiceCard';
import { WorkflowStep } from '../components/WorkflowStep';
import { FeatureGridItem } from '../components/FeatureGrid';
import { CTABlock } from '../components/CTABlock';
import { AnimatedWorkflowPreview } from '../components/AnimatedWorkflowPreview';
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
  HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-md"
              >
                <Zap size={18} className="text-[#14B8A6]" />
                <span className="text-sm font-medium text-[#0F172A]">Trusted by 500+ Businesses</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] mb-6 leading-tight">
                Automate Your Business
                <span className="block mt-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                  Save Time & Scale Fast
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
                Transform your customer communication and internal workflows with intelligent automation.
                Never miss a lead, respond instantly, and focus on what matters most.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="min-w-[200px]">
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="min-w-[200px]">
                    Get Free Audit
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">10x</div>
                  <div className="text-sm text-gray-600">Faster Response</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">95%</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768796372362-05c256e61d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MTg2MDA4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Business Automation"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl p-4 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">New Lead Captured</div>
                    <div className="text-xs text-gray-500">Just now</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-xl p-4 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">Auto-Reply Sent</div>
                    <div className="text-xs text-gray-500">2 seconds ago</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Automation Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Powerful Automation Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our suite of intelligent automation tools designed to transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={MessageSquare}
              title="WhatsApp Automation"
              description="Engage customers instantly with intelligent WhatsApp chatbots that handle inquiries 24/7."
              benefits={[
                'Instant customer responses',
                'Automated lead qualification',
                'Multi-language support',
                'CRM integration'
              ]}
              link="/whatsapp-automation"
              gradient="from-green-500 to-emerald-600"
            />

            <ServiceCard
              icon={Mail}
              title="Email Automation"
              description="Streamline your email campaigns with smart automation that nurtures leads and drives conversions."
              benefits={[
                'Personalized sequences',
                'Behavioral triggers',
                'A/B testing',
                'Analytics dashboard'
              ]}
              link="/email-automation"
              gradient="from-blue-500 to-cyan-600"
            />

            <ServiceCard
              icon={Workflow}
              title="Custom Workflow Automation"
              description="Build powerful workflows that connect your tools and automate repetitive tasks across platforms."
              benefits={[
                'No-code automation',
                '1000+ integrations',
                'Conditional logic',
                'Real-time monitoring'
              ]}
              link="/workflow-automation"
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process to transform your business with automation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            <WorkflowStep
              icon={Lightbulb}
              title="Understand"
              description="We analyze your business processes and identify automation opportunities"
              step={1}
            />
            <WorkflowStep
              icon={Rocket}
              title="Design"
              description="Create custom automation workflows tailored to your specific needs"
              step={2}
            />
            <WorkflowStep
              icon={Users}
              title="Integrate"
              description="Seamlessly connect with your existing tools and platforms"
              step={3}
            />
            <WorkflowStep
              icon={TrendingUp}
              title="Optimize"
              description="Launch and continuously improve performance with data-driven insights"
              step={4}
              isLast
            />
          </div>
        </div>
      </section>

      {/* Live Automation Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              See Automation in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our intelligent system captures, responds, and manages leads automatically
            </p>
          </motion.div>

          <AnimatedWorkflowPreview />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Why Choose MihirBuilds?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the benefits that hundreds of businesses are already enjoying
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureGridItem
              icon={Zap}
              title="Instant Replies"
              description="Respond to customer inquiries within seconds, 24/7, ensuring no opportunity is missed."
              index={0}
            />
            <FeatureGridItem
              icon={Target}
              title="No Missed Leads"
              description="Capture and qualify every lead automatically, even outside business hours."
              index={1}
            />
            <FeatureGridItem
              icon={Clock}
              title="Automated Follow-ups"
              description="Schedule and send personalized follow-up messages at the perfect time."
              index={2}
            />
            <FeatureGridItem
              icon={TrendingUp}
              title="Reduced Manual Work"
              description="Eliminate repetitive tasks and free your team to focus on high-value activities."
              index={3}
            />
            <FeatureGridItem
              icon={Users}
              title="Improved Team Efficiency"
              description="Streamline collaboration and workflows across your entire organization."
              index={4}
            />
            <FeatureGridItem
              icon={Shield}
              title="Reliable & Secure"
              description="Enterprise-grade security with 99.9% uptime guarantee for peace of mind."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <CTABlock
        title="Ready to Transform Your Business?"
        description="Join hundreds of businesses that have automated their way to success. Get started with a free consultation and see results in weeks, not months."
        primaryButtonText="Book Your Free Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="View All Services"
        secondaryButtonLink="/whatsapp-automation"
      />
    </div>
  );
}
