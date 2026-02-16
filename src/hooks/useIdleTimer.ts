import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to detect user inactivity and trigger a callback
 * @param timeout Timeout in milliseconds (default: 15 minutes)
 * @param onIdle Callback function to execute when user is idle
 * @param isActive Whether the timer should be active (e.g., only when logged in)
 */
export function useIdleTimer(
  timeout: number = 15 * 60 * 1000, 
  onIdle: () => void,
  isActive: boolean = true
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    if (!isActive) return;
    
    lastActivityRef.current = Date.now();
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      onIdle();
    }, timeout);
  }, [isActive, timeout, onIdle]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    // Events that reset the timer
    const events = [
      'mousemove', 
      'mousedown', 
      'keypress', 
      'DOMMouseScroll', 
      'mousewheel', 
      'touchmove', 
      'MSPointerMove',
      'click',
      'scroll'
    ];

    // Throttle the event listener to avoid performance issues
    let throttleTimeout: NodeJS.Timeout | null = null;
    
    const handleActivity = () => {
      if (!throttleTimeout) {
        resetTimer();
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
        }, 1000); // Throttle to once per second
      }
    };

    // Attach listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initial start
    resetTimer();

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isActive, resetTimer]);

  return { resetTimer };
}
