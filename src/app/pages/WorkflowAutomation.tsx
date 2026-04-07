import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FeatureGridItem } from '../components/FeatureGrid';
import { CTABlock } from '../components/CTABlock';
import {
  Workflow,
  Link as LinkIcon,
  Zap,
  GitBranch,
  Clock,
  CheckCircle,
  Database,
  Settings,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function WorkflowAutomation() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                <Workflow size={18} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Custom Workflows</span>
              </div>
              
              <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
                Custom Workflow
                <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Automation Made Easy
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Connect your favorite tools and automate complex business processes without writing code.
                Build powerful workflows that save time and eliminate manual tasks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 min-w-[200px]">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-600 min-w-[200px]">
                    See Examples
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
                src="https://images.unsplash.com/photo-1743385779431-45d26d9775b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZmxvdyUyMGRpYWdyYW0lMjB3aGl0ZWJvYXJkfGVufDF8fHx8MTc3MTk0MDc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workflow Automation"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Powerful Workflow Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build, automate, and optimize workflows with our comprehensive automation platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureGridItem
              icon={Settings}
              title="No-Code Builder"
              description="Create complex workflows with an intuitive drag-and-drop interface. No programming required."
              index={0}
            />
            <FeatureGridItem
              icon={LinkIcon}
              title="1000+ Integrations"
              description="Connect with popular tools like Slack, Salesforce, Google Sheets, and hundreds more."
              index={1}
            />
            <FeatureGridItem
              icon={GitBranch}
              title="Conditional Logic"
              description="Add if/then logic, filters, and branches to create intelligent automation workflows."
              index={2}
            />
            <FeatureGridItem
              icon={Zap}
              title="Real-Time Triggers"
              description="Execute workflows instantly based on events, schedules, or webhooks."
              index={3}
            />
            <FeatureGridItem
              icon={BarChart3}
              title="Performance Monitoring"
              description="Track workflow execution, identify bottlenecks, and optimize for better results."
              index={4}
            />
            <FeatureGridItem
              icon={Database}
              title="Data Transformation"
              description="Format, filter, and transform data between different apps seamlessly."
              index={5}
            />
          </div>
        </div>
      </section>
      
      {/* Popular Workflows Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Popular Workflow Examples
            </h2>
            <p className="text-xl text-gray-600">
              Get inspired by these common automation workflows
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-600"
            >
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Lead Management Flow</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">New form submission received</div>
                    <div className="text-sm text-gray-600">Website contact form or landing page</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Create contact in CRM</div>
                    <div className="text-sm text-gray-600">Add lead to Salesforce, HubSpot, or Pipedrive</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Send notification to sales team</div>
                    <div className="text-sm text-gray-600">Alert via Slack, Teams, or Email</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Start email nurture sequence</div>
                    <div className="text-sm text-gray-600">Automated welcome and education emails</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-pink-600"
            >
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Customer Onboarding Flow</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">New customer signup detected</div>
                    <div className="text-sm text-gray-600">Payment processed successfully</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Create account and set permissions</div>
                    <div className="text-sm text-gray-600">Auto-provision in your platform</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Send welcome email with resources</div>
                    <div className="text-sm text-gray-600">Include getting started guide and login info</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-pink-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0F172A]">Schedule follow-up tasks</div>
                    <div className="text-sm text-gray-600">Create check-in reminders for success team</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Integration Logos Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
              Integrates With Your Favorite Tools
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Connect to 1000+ apps including:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="text-xl font-semibold">Salesforce</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">HubSpot</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Slack</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Google Workspace</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Microsoft Teams</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 mt-6 text-gray-500">
              <div className="text-xl font-semibold">Shopify</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Mailchimp</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Zapier</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">Airtable</div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-xl font-semibold">And 900+ more</div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTABlock
        title="Start Building Powerful Workflows Today"
        description="Automate repetitive tasks, connect your tools, and scale your business with custom workflow automation."
        primaryButtonText="Create Your First Workflow"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore Templates"
        secondaryButtonLink="/contact"
        background="gradient"
      />
    </div>
  );
}
