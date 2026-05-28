'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  triggerOnView?: boolean;
}

const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = '',
  className = '',
  triggerOnView = true,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const shouldAnimate = triggerOnView ? isInView : true;

    if (shouldAnimate) {
      hasAnimated.current = true;
      const controls = animate(motionValue, target, {
        duration: duration / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      });

      return () => controls.stop();
    }
  }, [isInView, motionValue, target, duration, triggerOnView]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [rounded, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
};

export default AnimatedCounter;
