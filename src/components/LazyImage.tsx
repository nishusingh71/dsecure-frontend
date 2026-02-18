import React, { useState, useRef, useEffect, forwardRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: "lazy" | "eager";
}

const LazyImage = React.memo(
  forwardRef<HTMLImageElement, LazyImageProps>(
    (
      {
        src,
        alt,
        className = "",
        placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==",
        loading = "lazy",
      },
      ref,
    ) => {
      const [isLoaded, setIsLoaded] = useState(false);
      const [isInView, setIsInView] = useState(false);
      const internalRef = useRef<HTMLImageElement>(null);
      const imgRef = (ref as React.RefObject<HTMLImageElement>) || internalRef;

      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 },
        );

        if (imgRef.current) {
          observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
      }, []);

      return (
        <img
          ref={imgRef}
          src={isInView ? src : placeholder}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
        />
      );
    },
  ),
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
