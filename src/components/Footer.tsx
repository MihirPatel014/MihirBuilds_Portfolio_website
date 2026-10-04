import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { BUSINESS, LOCATION_LABEL } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img src="/apple-touch-icon.png" alt="Logo" className="w-16 h-16 object-cover rounded-xl bg-white p-1" />
              <span className="text-2xl font-bold">MihirBuilds</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automate your business processes with intelligent WhatsApp, Email, and Custom Workflow solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>


          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/whatsapp-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link href="/email-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link href="/workflow-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Workflow Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Free Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  All Online Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link href="/tools?category=developer-tools" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/tools?category=pdf-tools" className="text-gray-400 hover:text-white transition-colors text-sm">
                  PDF Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-[#14B8A6] mt-1 flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#14B8A6] mt-1 flex-shrink-0" />
                <a
                  href={BUSINESS.mapPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                >
                  {LOCATION_LABEL}
                  <ExternalLink size={12} className="flex-shrink-0" />
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-gray-400 text-sm">
                  <Link href="/contact" className="text-[#14B8A6] hover:underline">
                    Book a Free Demo &rarr;
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MihirBuilds. All rights reserved.</p>
        </div>
      </div>
    </footer >
  );
}
