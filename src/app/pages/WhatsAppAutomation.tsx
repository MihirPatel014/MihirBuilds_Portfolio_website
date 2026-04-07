import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FeatureGridItem } from '../components/FeatureGrid';
import { CTABlock } from '../components/CTABlock';
import {
  MessageCircle,
  Clock,
  Users,
  Globe,
  BarChart3,
  CheckCircle,
  Smartphone,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function WhatsAppAutomation() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                <MessageCircle size={18} className="text-green-600" />
                <span className="text-sm font-medium text-green-800">WhatsApp Business API</span>
              </div>
              
              <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
                WhatsApp
                <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Automation That Converts
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Engage your customers on the world's most popular messaging platform. Automate conversations,
                capture leads, and provide instant support—all through WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 min-w-[200px]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-600 min-w-[200px]">
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
                src="https://images.unsplash.com/photo-1642724978770-e27d781662d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGF0c2FwcCUyMG1vYmlsZSUyMHBob25lJTIwY2hhdHxlbnwxfHx8fDE3NzE5NDA3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="WhatsApp Automation"
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
              Powerful WhatsApp Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to automate customer conversations and scale your business
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureGridItem
              icon={Clock}
              title="24/7 Instant Responses"
              description="Never miss a customer inquiry. Auto-respond to messages instantly, any time of day."
              index={0}
            />
            <FeatureGridItem
              icon={Users}
              title="Smart Lead Qualification"
              description="Automatically collect customer information and qualify leads through intelligent conversations."
              index={1}
            />
            <FeatureGridItem
              icon={Globe}
              title="Multi-Language Support"
              description="Communicate with customers in their preferred language with automatic translation."
              index={2}
            />
            <FeatureGridItem
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Track message performance, response rates, and customer engagement in real-time."
              index={3}
            />
            <FeatureGridItem
              icon={Zap}
              title="Quick Reply Templates"
              description="Save time with pre-built message templates for common customer questions."
              index={4}
            />
            <FeatureGridItem
              icon={Shield}
              title="Secure & Compliant"
              description="Enterprise-grade security with full WhatsApp Business API compliance."
              index={5}
            />
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Perfect For Every Business
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Smartphone size={24} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">E-commerce & Retail</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Order confirmations and tracking updates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Abandoned cart recovery messages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Product recommendations and promotions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Customer support and FAQs</span>
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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Service Businesses</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Appointment booking and reminders</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Lead capture and qualification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Quote requests and follow-ups</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Customer feedback collection</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Teaser Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Flexible Plans for Every Business Size
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              From startups to enterprises, we have a plan that fits your needs and budget.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600">
                View Pricing & Plans
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABlock
        title="Start Automating WhatsApp Today"
        description="Join hundreds of businesses using WhatsApp automation to engage customers, capture leads, and drive sales."
        primaryButtonText="Book a Demo"
        primaryButtonLink="/contact"
        secondaryButtonText="View All Services"
        secondaryButtonLink="/"
        background="dark"
      />
    </div>
  );
}
