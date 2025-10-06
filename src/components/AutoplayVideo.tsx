import { useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  src: string;
  posterImage?: string;
  className?: string;
}

export default function AutoplayVideo({ src, posterImage, className = '' }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5 // 50% of the video needs to be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          // Play when video enters viewport
          videoRef.current.play().catch(err => {
            // //console.log('Autoplay prevented:', err);
          });
        } else {
          // Pause when video leaves viewport
          videoRef.current.pause();
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={posterImage}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
