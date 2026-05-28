'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

const ParallaxWrapper = ({
  children,
  intensity = 0.02,
  className = '',
}: ParallaxWrapperProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const translateX = useTransform(mouseX, (val) => val * intensity);
  const translateY = useTransform(mouseY, (val) => val * intensity);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      setIsEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        x: translateX,
        y: translateY,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper;
