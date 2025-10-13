import React, { memo } from 'react';

interface OptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Memoized card component to prevent unnecessary re-renders
export const OptimizedCard = memo(({ children, className = '', delay = 0 }: OptimizedCardProps) => {
  return (
    <div 
      className={`card hover:shadow-lg transition-transform duration-200 ease-out hover:-translate-y-1 will-change-transform ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {children}
    </div>
  );
});

OptimizedCard.displayName = 'OptimizedCard';

interface FeatureIconProps {
  children: React.ReactNode;
  bgColor: string;
}

// Memoized icon component for better performance
export const FeatureIcon = memo(({ children, bgColor }: FeatureIconProps) => {
  return (
    <div 
      className={`w-16 h-16 rounded-2xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 will-change-transform`}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </div>
  );
});

FeatureIcon.displayName = 'FeatureIcon';
