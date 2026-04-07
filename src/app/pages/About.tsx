import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Target, Users, Lightbulb, TrendingUp, Award, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
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
              MihirBuilds was founded with a simple mission: to make powerful automation accessible to every business,
              regardless of size or technical expertise.
            </p>

            <Link to="/contact">
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
                  Founded in 2020, MihirBuilds emerged from a simple observation: small and medium businesses
                  were losing countless hours to manual, repetitive tasks that could easily be automated.
                </p>
                <p>
                  Our founders, who came from backgrounds in software engineering and business operations,
                  saw an opportunity to democratize automation. They believed that every business should have
                  access to the same powerful tools that enterprise companies use, without the enterprise price tag.
                </p>
                <p>
                  Today, we've helped over 500 businesses automate their workflows, save thousands of hours,
                  and focus on what really matters: growing their business and serving their customers better.
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
                alt="Our Team"
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
              These principles guide everything we do
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
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly push the boundaries of what's possible with automation technology,
                making complex solutions simple and accessible.
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
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Customer Success</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our success. We're committed to providing exceptional support and
                ensuring you get maximum value from our platform.
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
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards in everything we do, from product development
                to customer service and beyond.
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
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Users size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-white/80">Active Clients</div>
              </div>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">2M+</div>
                <div className="text-white/80">Tasks Automated</div>
              </div>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Target size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">95%</div>
                <div className="text-white/80">Client Satisfaction</div>
              </div>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-2">
                  <Award size={32} />
                </div>
                <div className="text-5xl font-bold mb-2">50k+</div>
                <div className="text-white/80">Hours Saved</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate group of automation experts, engineers, and customer success specialists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-Founder', expertise: 'Business Strategy' },
              { name: 'Marcus Johnson', role: 'CTO & Co-Founder', expertise: 'Engineering' },
              { name: 'Emily Rodriguez', role: 'Head of Customer Success', expertise: 'Client Relations' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#14B8A6] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-1">{member.name}</h3>
                <p className="text-[#2563EB] font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </motion.div>
            ))}
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
              Ready to Join Our Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's work together to automate your business and unlock your full potential.
            </p>
            <Link to="/contact">
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
