import { PropsWithChildren, useEffect, useRef, useState, useMemo, memo } from 'react'

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'pop'

type RevealProps = PropsWithChildren<{
  delayMs?: number
  className?: string
  animation?: AnimationType
  duration?: number
  threshold?: number
  /** Disable animation - content shows immediately */
  disabled?: boolean
}>

// Shared reduced motion state to avoid multiple listeners
let cachedReducedMotion: boolean | null = null
let resizeListenerAdded = false
const listeners = new Set<() => void>()

// Check if user prefers reduced motion or is on mobile
const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return true
  
  // Disable animations on mobile and tablet for better performance
  const isMobileOrTablet = window.innerWidth < 1024
  return isMobileOrTablet
}

// Shared resize handler
const handleGlobalResize = () => {
  cachedReducedMotion = shouldReduceMotion()
  listeners.forEach(listener => listener())
}

// Pre-defined animation styles to avoid object recreation
const ANIMATION_STYLES = {
  fade: {
    initial: 'opacity-0',
    animate: 'opacity-100'
  },
  'slide-up': {
    initial: 'opacity-0 translate-y-8',
    animate: 'opacity-100 translate-y-0'
  },
  'slide-down': {
    initial: 'opacity-0 -translate-y-8',
    animate: 'opacity-100 translate-y-0'
  },
  'slide-left': {
    initial: 'opacity-0 translate-x-8',
    animate: 'opacity-100 translate-x-0'
  },
  'slide-right': {
    initial: 'opacity-0 -translate-x-8',
    animate: 'opacity-100 translate-x-0'
  },
  scale: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100'
  },
  pop: {
    initial: 'opacity-0 scale-90',
    animate: 'opacity-100 scale-100'
  }
} as const

const Reveal = memo(function Reveal({ 
  children, 
  delayMs = 0, 
  className = '',
  animation = 'fade',
  duration = 800,
  threshold = 0.1,
  disabled = false
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (cachedReducedMotion === null) {
      cachedReducedMotion = shouldReduceMotion()
    }
    return cachedReducedMotion
  })

  // Use shared resize listener instead of per-component listener
  useEffect(() => {
    const updateReducedMotion = () => setReducedMotion(cachedReducedMotion!)
    listeners.add(updateReducedMotion)
    
    // Add global resize listener only once
    if (!resizeListenerAdded) {
      window.addEventListener('resize', handleGlobalResize, { passive: true })
      resizeListenerAdded = true
    }
    
    return () => {
      listeners.delete(updateReducedMotion)
    }
  }, [])

  // Memoize the style object to prevent re-renders
  const transitionStyle = useMemo(() => ({ 
    transitionDuration: `${duration}ms`,
    willChange: visible ? 'auto' : 'transform, opacity'
  }), [duration, visible])

  const { initial, animate } = ANIMATION_STYLES[animation]

  useEffect(() => {
    // Skip animation if disabled or reduced motion
    if (disabled || reducedMotion) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delayMs)
          obs.disconnect()
        }
      })
    }, { 
      rootMargin: '0px 0px -10% 0px', 
      threshold 
    })
    
    obs.observe(el)
    return () => obs.disconnect()
  }, [delayMs, threshold, disabled, reducedMotion])

  // If disabled or reduced motion, render without animation wrapper overhead
  if (disabled || reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div 
      ref={ref} 
      className={`
        ${visible ? animate : initial}
        transform transition-all
        ${className}
      `}
      style={transitionStyle}
    >
      {children}
    </div>
  )
})

export default Reveal