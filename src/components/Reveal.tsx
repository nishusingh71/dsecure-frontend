import { PropsWithChildren, useEffect, useRef, useState } from 'react'

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'pop'

type RevealProps = PropsWithChildren<{
  delayMs?: number
  className?: string
  animation?: AnimationType
  duration?: number
  threshold?: number
}>

export default function Reveal({ 
  children, 
  delayMs = 0, 
  className = '',
  animation = 'fade',
  duration = 800,
  threshold = 0.1 
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const animationStyles = {
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
  }

  useEffect(() => {
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
  }, [delayMs, threshold])

  const { initial, animate } = animationStyles[animation]

  return (
    <div 
      ref={ref} 
      className={`
        ${visible ? animate : initial}
        transform transition-all will-change-transform
        ${className}
      `}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}


