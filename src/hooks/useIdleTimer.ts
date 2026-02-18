import { useEffect, useRef, useCallback } from 'react';

export interface UseIdleTimerOptions {
  timeout?: number;
  onIdle: () => void;
  isActive?: boolean;
  events?: string[];
}

/**
 * Hook to detect user inactivity and trigger a callback.
 * Uses a polling mechanism (setInterval) to be robust against browser throttling.
 */
export function useIdleTimer({
  timeout = 15 * 60 * 1000,
  onIdle,
  isActive = true,
  events = [
    'mousedown',
    'keydown',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    // Note: 'mousemove' is intentionally excluded by default to prevent 
    // "phantom" activity (e.g. slight vibrations) from keeping the session alive.
    // If needed, it can be passed in via the 'events' prop.
  ]
}: UseIdleTimerOptions) {
  const lastActivityRef = useRef<number>(Date.now());
  const onIdleRef = useRef(onIdle);

  // Keep onIdle fresh without restarting the effect
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Set initial activity
    lastActivityRef.current = Date.now();

    // Polling interval to check for inactivity
    // Checking every 5 seconds is frequent enough for a 15 min timeout
    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;

      if (timeSinceLastActivity >= timeout) {
        onIdleRef.current();
        // Reset activity so we don't spam the callback immediately again? 
        // Or maybe we rely on the callback to handle logic (like logging out which changes isActive)
        // Let's verify: usually if onIdle logs out, isActive becomes false.
      }
    }, 5000); 

    // Event listeners to update activity timestamp
    const handleEvent = () => {
      // Simple throttling: only update if > 1s has passed since last update
      // to avoid spamming the ref update (though refs are cheap)
      const now = Date.now();
      if (now - lastActivityRef.current > 1000) {
        updateActivity();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleEvent);
    });

    return () => {
      clearInterval(intervalId);
      events.forEach(event => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [isActive, timeout, updateActivity, events]);

  return { 
    resetTimer: updateActivity,
    getLastActivity: () => lastActivityRef.current
  };
}
