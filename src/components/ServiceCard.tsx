'use client';

import { motion } from 'motion/react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';
import { BorderBeam } from './ui/BorderBeam';
import { useState } from 'react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  link: string;
  gradient: string;
}

export function ServiceCard({ icon: Icon, title, description, benefits, link, gradient }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl p-8 shadow-xs hover:shadow-2xl transition-all duration-300 border border-slate-200/90 flex flex-col justify-between overflow-hidden"
    >
      {/* 21st.dev Animated Border Beam on Hover */}
      {isHovered && <BorderBeam size={220} duration={6} colorFrom="#2563EB" colorTo="#14B8A6" />}

      {/* Subtle top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md shadow-slate-200 group-hover:scale-105 transition-transform duration-300`}>
            <Icon size={28} />
          </div>
          <Link 
            href={link} 
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-100 transition-colors"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#2563EB] transition-colors">{title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed text-sm">{description}</p>

        <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href={link} className="w-full">
        <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-slate-400">
          <span>Explore Solution</span>
          <ArrowUpRight size={16} />
        </Button>
      </Link>
    </motion.div>
  );
}
