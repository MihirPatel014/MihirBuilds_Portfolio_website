import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FeatureGridItem } from '../components/FeatureGrid';
import { CTABlock } from '../components/CTABlock';
import {
  Mail,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  Zap,
  Database
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EmailAutomation() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <Mail size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Smart Email Marketing</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
                Email Automation
                <span className="block mt-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                  That Drives Results
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your email marketing with intelligent automation. Send personalized campaigns,
                nurture leads, and boost conversions with our powerful email automation platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="min-w-[200px]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    See Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1543269866-487350d6fa5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzE4Nzg5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Email Automation"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Advanced Email Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, automate, and optimize your email campaigns
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureGridItem
              icon={Users}
              title="Personalized Sequences"
              description="Create tailored email journeys based on customer behavior, preferences, and interactions."
              index={0}
            />
            <FeatureGridItem
              icon={Zap}
              title="Behavioral Triggers"
              description="Send emails automatically based on specific actions like clicks, purchases, or sign-ups."
              index={1}
            />
            <FeatureGridItem
              icon={BarChart3}
              title="A/B Testing"
              description="Optimize subject lines, content, and send times with built-in split testing."
              index={2}
            />
            <FeatureGridItem
              icon={Target}
              title="Audience Segmentation"
              description="Target the right people with precision segmentation based on demographics and behavior."
              index={3}
            />
            <FeatureGridItem
              icon={TrendingUp}
              title="Analytics Dashboard"
              description="Track opens, clicks, conversions, and ROI with comprehensive analytics."
              index={4}
            />
            <FeatureGridItem
              icon={Database}
              title="CRM Integration"
              description="Sync seamlessly with your CRM to maintain up-to-date customer data."
              index={5}
            />
          </div>
        </div>
      </section>
      
      {/* Email Types Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Automate Every Type of Email
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Welcome Sequences</h3>
              <p className="text-gray-600 mb-4">Make a great first impression with automated welcome emails that educate and engage new subscribers.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Onboarding series</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Product education</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Brand introduction</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Lead Nurturing</h3>
              <p className="text-gray-600 mb-4">Guide prospects through the sales funnel with targeted content that addresses their needs.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Educational content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Case studies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Product demos</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Clock size={24} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Re-engagement</h3>
              <p className="text-gray-600 mb-4">Win back inactive customers with automated campaigns that reignite interest and drive action.</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Win-back campaigns</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Special offers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Feedback requests</span>
                </li>
              </ul>
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
            className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Proven Results</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">45%</div>
                <div className="text-white/80">Higher Open Rates</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">3x</div>
                <div className="text-white/80">More Conversions</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">80%</div>
                <div className="text-white/80">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80">Happy Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABlock
        title="Ready to Supercharge Your Email Marketing?"
        description="Start creating automated email campaigns that convert. Join hundreds of businesses already using our platform."
        primaryButtonText="Start Free Trial"
        primaryButtonLink="/contact"
        secondaryButtonText="View Pricing"
        secondaryButtonLink="/contact"
        background="dark"
      />
    </div>
  );
}
