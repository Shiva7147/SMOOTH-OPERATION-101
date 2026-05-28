'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`
          ${sizeMap[size]}
          rounded-full
          border-transparent
          animate-spin
        `}
        style={{
          borderTopColor: '#8b5cf6',
          borderRightColor: '#3b82f6',
          borderBottomColor: '#14b8a6',
          borderLeftColor: 'transparent',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
