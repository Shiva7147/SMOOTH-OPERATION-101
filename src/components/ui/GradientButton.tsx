'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

const spinnerSize: Record<ButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const GradientButton = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
}: GradientButtonProps) => {
  const isDisabled = disabled || loading;

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white shadow-lg shadow-purple-500/25',
    secondary:
      'bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15',
    outline:
      'bg-transparent border border-transparent text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: isDisabled
      ? {}
      : {
          scale: 1.03,
          ...(variant === 'primary'
            ? {
                boxShadow:
                  '0 0 25px rgba(139, 92, 246, 0.35), 0 0 50px rgba(59, 130, 246, 0.15)',
              }
            : {}),
        },
    whileTap: isDisabled ? {} : { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  const content = (
    <>
      {loading && (
        <LoadingSpinner size={spinnerSize[size]} className="absolute" />
      )}
      <span className={loading ? 'invisible' : ''}>{children}</span>
    </>
  );

  // Outline variant needs a gradient border trick
  if (variant === 'outline') {
    const outlineContent = (
      <motion.span
        className={`
          relative inline-flex items-center justify-center
          font-semibold rounded-xl
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          bg-[#0a0a0f] 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
          ${className}
        `}
        {...motionProps}
      >
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          {content}
        </span>
      </motion.span>
    );

    const wrapperClasses = `
      inline-flex rounded-xl p-[1.5px]
      bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500
      ${fullWidth ? 'w-full' : ''}
    `;

    if (href && !isDisabled) {
      return (
        <Link href={href} className={wrapperClasses}>
          {outlineContent}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={wrapperClasses}
      >
        {outlineContent}
      </button>
    );
  }

  if (href && !isDisabled) {
    return (
      <Link href={href}>
        <motion.span className={combinedClasses} role="link" {...motionProps}>
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={combinedClasses}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default GradientButton;
