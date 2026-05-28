'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
}

function getScoreCategory(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Smooth Operator 😎', color: 'text-emerald-400' };
  if (score >= 70) return { label: 'Getting There 🔥', color: 'text-blue-400' };
  if (score >= 50) return { label: 'Work In Progress 💪', color: 'text-amber-400' };
  if (score >= 30) return { label: 'Needs Some Polish ✨', color: 'text-orange-400' };
  return { label: 'Fresh Start 🌱', color: 'text-red-400' };
}

const ScoreRing = ({
  score,
  size = 200,
  strokeWidth = 12,
  animated = true,
  className = '',
}: ScoreRingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  const gradientId = `score-gradient-${Math.random().toString(36).slice(2, 9)}`;
  const category = getScoreCategory(normalizedScore);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-3 ${className}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-label={`Score: ${normalizedScore} out of 100`}
          role="img"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset }}
            animate={
              animated && isInView
                ? { strokeDashoffset }
                : animated
                  ? { strokeDashoffset: circumference }
                  : { strokeDashoffset }
            }
            transition={{
              duration: 2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedCounter
            target={normalizedScore}
            suffix="/100"
            duration={2000}
            triggerOnView={animated}
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent"
            />
        </div>
      </div>

      <span className={`text-sm font-semibold ${category.color}`}>
        {category.label}
      </span>
    </div>
  );
};

export default ScoreRing;
