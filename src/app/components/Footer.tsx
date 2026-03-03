
import { Link } from 'react-router';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/apple-touch-icon.png" alt="Logo" className="w-24 h-24 object-cover" style={{ borderRadius: "50%", backgroundColor: "whitesmoke" }} />
            </div>
            <span className="text-2xl font-bold">MihirBuilds</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Automate your business processes with intelligent WhatsApp, Email, and Custom Workflow solutions.
          </p>
          <div className="flex space-x-4">
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


          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/whatsapp-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link to="/email-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link to="/workflow-automation" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Workflow Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
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
                <span className="text-gray-400 text-sm">contact@mihirbuilds.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-[#14B8A6] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#14B8A6] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Business Ave, Suite 100<br />San Francisco, CA 94102</span>
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
