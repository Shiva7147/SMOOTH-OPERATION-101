'use client';

import { type ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'button';
  tilt?: boolean;
}

const GlassCard = ({
  children,
  className = '',
  hover = false,
  onClick,
  as = 'div',
  tilt = true,
}: GlassCardProps) => {
  const cardRef = useRef<any>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 3D Motion values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const xSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 20 });

  // Rotate range: -12deg to 12deg
  const rotateX = useTransform(ySpring, [0, 1], [10, -10]);
  const rotateY = useTransform(xSpring, [0, 1], [-10, 10]);

  // Spotlight Glare positions
  const glareX = useTransform(xSpring, [0, 1], ['0%', '100%']);
  const glareY = useTransform(ySpring, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const baseClasses =
    'relative bg-[#181A1F]/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden group transition-all duration-300';

  const transformStyle = tilt && !reducedMotion ? {
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d' as const,
  } : {};

  const hoverAnimations = hover
    ? {
        whileHover: {
          scale: 1.015,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 93, 250, 0.04)',
        },
        transition: {
          type: 'spring' as const,
          stiffness: 200,
          damping: 22,
        },
      }
    : {};

  const hoverClasses = hover ? 'hover:border-purple/30 hover:bg-[#20232A]/60' : '';

  const motionProps: any = {
    ref: cardRef,
    className: `${baseClasses} ${hoverClasses} ${className}`,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      ...transformStyle,
    },
    ...hoverAnimations,
  };

  const glareOverlay = tilt && !reducedMotion && (
    <motion.div
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      style={{
        background: `radial-gradient(circle 200px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.08), transparent)`,
      }}
    />
  );

  const containerContent = (
    <>
      {glareOverlay}
      <div className="relative z-10 w-full h-full" style={tilt && !reducedMotion ? { transform: 'translateZ(10px)', transformStyle: 'preserve-3d' } : {}}>
        {children}
      </div>
    </>
  );

  if (as === 'button') {
    return (
      <motion.button type="button" {...motionProps}>
        {containerContent}
      </motion.button>
    );
  }

  return <motion.div {...motionProps}>{containerContent}</motion.div>;
};

export default GlassCard;
