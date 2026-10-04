'use client';

import { motion } from 'motion/react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function BorderBeam({
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = '#2563EB',
  colorTo = '#14B8A6',
  className = '',
}: BorderBeamProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}>
      <motion.div
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay,
        }}
        className="absolute aspect-square"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `radial-gradient(circle, ${colorFrom} 0%, ${colorTo} 60%, transparent 100%)`,
        }}
      />
    </div>
  );
}
