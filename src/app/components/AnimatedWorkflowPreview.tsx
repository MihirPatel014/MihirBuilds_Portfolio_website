import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Database, CheckCircle, User, Calendar } from 'lucide-react';

interface AutomationStep {
  id: number;
  icon: any;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export function AnimatedWorkflowPreview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Array<{ id: number; type: 'user' | 'bot'; text: string; time: string }>>([]);

  const steps: AutomationStep[] = [
    { id: 1, icon: MessageCircle, title: 'Customer Message', description: 'New inquiry received', status: 'pending' },
    { id: 2, icon: Mail, title: 'Auto Response', description: 'Instant reply sent', status: 'pending' },
    { id: 3, icon: Database, title: 'CRM Update', description: 'Lead data saved', status: 'pending' },
    { id: 4, icon: Calendar, title: 'Follow-up Scheduled', description: 'Task created', status: 'pending' }
  ];

  const chatSequence = [
    { id: 1, type: 'user' as const, text: "Hi, I'm interested in your automation services", time: '2:34 PM' },
    { id: 2, type: 'bot' as const, text: "Hello! 👋 Thanks for reaching out. I'm here to help you understand how our automation solutions can streamline your business.", time: '2:34 PM' },
    { id: 3, type: 'bot' as const, text: "I've saved your details and our team will reach out within 24 hours with a personalized demo.", time: '2:34 PM' }
  ];

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      if (messages.length < chatSequence.length) {
        setMessages(prev => [...prev, chatSequence[messages.length]]);
      }
    }, messages.length === 0 ? 500 : 2000);

    return () => clearTimeout(messageTimer);
  }, [messages.length]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User size={20} className="text-[#2563EB]" />
          </div>
          <div>
            <h4 className="text-white font-semibold">MihirBuilds Assistant</h4>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-white/80 text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-6 space-y-4 h-80 overflow-y-auto bg-gray-50">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length > 0 && messages.length < chatSequence.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Automation Steps */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <h4 className="text-xl font-semibold text-[#0F172A] mb-6">Behind the Scenes</h4>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${isActive
                  ? 'border-[#2563EB] bg-blue-50'
                  : isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-9 top-full w-0.5 h-4 transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                />
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-br from-[#2563EB] to-[#14B8A6]'
                    : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
              >
                {isCompleted ? (
                  <CheckCircle size={24} className="text-white" />
                ) : (
                  <Icon size={24} className={isActive ? 'text-white' : 'text-gray-500'} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h5 className={`font-semibold ${isActive || isCompleted ? 'text-[#0F172A]' : 'text-gray-500'}`}>
                  {step.title}
                </h5>
                <p className={`text-sm ${isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                  {step.description}
                </p>
              </div>

              {/* Pulse Animation */}
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-3 h-3 bg-[#2563EB] rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
