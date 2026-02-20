import React, { useEffect } from 'react';
import { useToast } from './Toast';

const NetworkStatus: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      showToast('Internet back online', 'success', 5000);
    };

    const handleOffline = () => {
      showToast('You are offline', 'error', 10000); // Longer duration for offline warning
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  return null; // Side-effect only component
};

export default NetworkStatus;
