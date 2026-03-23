import React from 'react';
import { Clock } from 'lucide-react';

interface UpcomingBadgeProps {
  className?: string;
  text?: string;
}

const UpcomingBadge: React.FC<UpcomingBadgeProps> = ({ 
  className = "", 
  text = "Upcoming Product" 
}) => {
  return (
    <div className={`inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold border border-amber-200 shadow-sm ${className}`}>
      <Clock className="w-4 h-4" />
      {text}
      <span className="flex h-2 w-2 relative">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
    </div>
  );
};

export default UpcomingBadge;
