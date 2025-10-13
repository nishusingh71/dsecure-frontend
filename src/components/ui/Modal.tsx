import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  showCloseButton = true,
  className = ''
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto scrollbar-hide ${className}`}
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
      >
        <style>
          {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
        </style>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand to-brand-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{title}</h2>
              {subtitle && (
                <p className="mt-2 text-blue-100">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors text-2xl ml-4"
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;