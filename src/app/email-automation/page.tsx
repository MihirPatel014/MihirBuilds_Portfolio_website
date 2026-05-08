'use client';
import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { FeatureGridItem } from '@/components/FeatureGrid';
import { CTABlock } from '@/components/CTABlock';
import {
    Mail,
    Send,
    Users,
    Zap,
    BarChart3,
    CheckCircle,
    Smartphone,
    Clock,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function EmailAutomation() {
    return (
        <div className="bg-[#F8FAFC]">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                                <Mail size={18} className="text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">Advanced Email Marketing</span>
                            </div>

                            <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
                                Email
                                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Automation Simplified
                                </span>
                            </h1>

                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Nurture your leads and engage your customers with personalized email sequences.
                                Automate your marketing funnel and drive more sales on autopilot.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact">
                                    <Button variant="primary" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 min-w-[200px]">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 min-w-[200px]">
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
                                src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzE5NDA3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">Powerful Email Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to automate your email marketing and grow your business</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureGridItem
                            icon={Send}
                            title="Personalized Sequences"
                            description="Create automated email series that adapt to your subscribers' behavior and interests."
                            index={0}
                        />
                        <FeatureGridItem
                            icon={Zap}
                            title="Behavioral Triggers"
                            description="Send the right message at the right time based on actions your customers take."
                            index={1}
                        />
                        <FeatureGridItem
                            icon={Users}
                            title="Smart Segmentation"
                            description="Automatically group your audience based on their preferences and activity."
                            index={2}
                        />
                        <FeatureGridItem
                            icon={BarChart3}
                            title="Detailed Analytics"
                            description="Track open rates, clicks, and conversions with our comprehensive reporting."
                            index={3}
                        />
                        <FeatureGridItem
                            icon={Clock}
                            title="Timed Delivery"
                            description="Optimize your send times to ensure your emails land when your audience is most active."
                            index={4}
                        />
                        <FeatureGridItem
                            icon={Shield}
                            title="Deliverability Focused"
                            description="Ensure your emails land in the inbox with our industry-leading sender reputation."
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
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">Email Templates & Flows</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
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
                                    <span className="text-sm text-gray-700">Brand introduction</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">Value proposition delivery</span>
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
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                <Smartphone size={24} className="text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Re-engagement Flows</h3>
                            <p className="text-gray-600 mb-4">Automatically bring back inactive customers with targeted offers and personalized content.</p>
                            <ul className="space-y-2">
                                <li className="flex items-start space-x-2">
                                    <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">Win-back campaigns</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">Abandoned cart recovery</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">Preference updates</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTABlock
                title="Start Automating Your Emails Today"
                description="Join hundreds of businesses using email automation to engage subscribers, nurture leads, and drive sales."
                primaryButtonText="Get Started"
                primaryButtonLink="/contact"
                secondaryButtonText="View All Services"
                secondaryButtonLink="/"
                background="gradient"
            />
        </div>
    );
}
