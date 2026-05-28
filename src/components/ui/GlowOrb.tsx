'use client';

import { motion } from 'framer-motion';

interface GlowOrbProps {
  color?: string;
  size?: number;
  className?: string;
  intensity?: number;
}

const colorPresets: Record<string, { from: string; to: string }> = {
  purple: { from: '#8b5cf6', to: '#6d28d9' },
  blue: { from: '#3b82f6', to: '#2563eb' },
  teal: { from: '#14b8a6', to: '#0d9488' },
  amber: { from: '#f59e0b', to: '#d97706' },
  orange: { from: '#f97316', to: '#ea580c' },
  pink: { from: '#ec4899', to: '#db2777' },
};

const GlowOrb = ({
  color = 'purple',
  size = 300,
  className = '',
  intensity = 0.3,
}: GlowOrbProps) => {
  const preset = colorPresets[color] || { from: color, to: color };
  const clampedIntensity = Math.min(1, Math.max(0, intensity));

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${preset.from} 0%, ${preset.to} 40%, transparent 70%)`,
        opacity: clampedIntensity,
        filter: `blur(${Math.round(size * 0.3)}px)`,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [clampedIntensity, clampedIntensity * 1.3, clampedIntensity],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  );
};

export default GlowOrb;
