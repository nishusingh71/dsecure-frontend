import React from "react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "pop";

type RevealProps = PropsWithChildren<{
  delayMs?: number;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  threshold?: number;
  instant?: boolean; // [LCP-FIX] Skip animation — render visible immediately for LCP-critical elements
}>;

const Reveal = React.memo(function Reveal({
  children,
  delayMs = 0,
  className = "",
  animation = "fade",
  duration = 800,
  threshold = 0.1,
  instant = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(instant); // [LCP-FIX] Start visible immediately when instant=true

  const animationStyles = {
    fade: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    "slide-up": {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-down": {
      initial: "opacity-0 -translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-left": {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    "slide-right": {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    scale: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
    },
    pop: {
      initial: "opacity-0 scale-90",
      animate: "opacity-100 scale-100",
    },
  };

  useEffect(() => {
    // [LCP-FIX] Skip IntersectionObserver entirely for instant elements
    if (instant) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delayMs);
            obs.disconnect();
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold,
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs, threshold, instant]);

  const { initial, animate } = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`
        ${visible ? animate : initial}
        transform transition-all
        ${className}
      `}
      style={{
        transitionDuration: instant ? "0ms" : `${duration}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
});

Reveal.displayName = "Reveal";

export default Reveal;
