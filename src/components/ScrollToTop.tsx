import { useState, useEffect } from 'react'

interface ScrollToTopProps {
  threshold?: number
  className?: string
}

export default function ScrollToTop({ threshold = 300, className = '' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    }

    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold])

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-brand text-white rounded-full shadow-lg hover:bg-brand-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand/50 group ${className}`}
      aria-label="Scroll to top"
      title="Back to top"
      type="button"
    >
      <svg
        className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}