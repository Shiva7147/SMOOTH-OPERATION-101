'use client';

import { motion } from 'framer-motion';

interface FloatingBubbleProps {
  text: string;
  delay?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  variant?: 'incoming' | 'outgoing';
  className?: string;
}

const FloatingBubble = ({
  text,
  delay = 0,
  position = {},
  variant = 'incoming',
  className = '',
}: FloatingBubbleProps) => {
  const isIncoming = variant === 'incoming';

  const bubbleClasses = isIncoming
    ? 'bg-white/10 backdrop-blur-xl border border-white/10 text-white/90'
    : 'bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white';

  const tailPosition = isIncoming ? 'left-4' : 'right-4';

  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut' as const,
          delay: delay + 0.5,
        },
      }}
    >
      <div className={`relative px-5 py-3 rounded-2xl ${bubbleClasses} shadow-lg max-w-xs`}>
        <p className="text-sm font-medium leading-relaxed whitespace-nowrap">{text}</p>

        {/* Chat tail */}
        <div
          className={`absolute -bottom-2 ${tailPosition} w-4 h-4 rotate-45 ${
            isIncoming
              ? 'bg-white/10 border-b border-r border-white/10'
              : 'bg-gradient-to-br from-blue-500 to-teal-500'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default FloatingBubble;
