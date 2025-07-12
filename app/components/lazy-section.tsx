'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
  minHeight?: number
  id?: string
  'aria-label'?: string
}

export function LazySection({
  children,
  className,
  threshold = 0.1,
  rootMargin = '100px',
  fallback,
  minHeight = 200,
  id,
  'aria-label': ariaLabel,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Add a small delay to ensure smooth loading
          setTimeout(() => setIsLoaded(true), 100)
          observer.unobserve(currentRef)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  const defaultFallback = (
    <div
      className="flex items-center justify-center bg-gray-50 animate-pulse"
      style={{ minHeight }}
      aria-label="Loading content..."
    >
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        'transition-opacity duration-500',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      aria-label={ariaLabel}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? children : (fallback || defaultFallback)}
    </section>
  )
}

// Specialized lazy section for heavy components
export function HeavyLazySection({
  children,
  className,
  loadingMessage = 'Loading...',
  ...props
}: LazySectionProps & { loadingMessage?: string }) {
  const fallback = (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-12 h-12 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-gray-600 text-sm">{loadingMessage}</p>
    </div>
  )

  return (
    <LazySection
      className={className}
      fallback={fallback}
      threshold={0.2} // Load when 20% visible
      rootMargin="200px" // Start loading earlier for heavy components
      {...props}
    >
      {children}
    </LazySection>
  )
}

// Hook for lazy loading with custom logic
export function useLazyLoad(threshold = 0.1, rootMargin = '50px') {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<Element | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin])

  return { isVisible, ref: setRef }
}

// Component for lazy loading scripts
interface LazyScriptProps {
  src: string
  onLoad?: () => void
  onError?: () => void
  threshold?: number
  rootMargin?: string
}

export function LazyScript({
  src,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '200px',
}: LazyScriptProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = triggerRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.unobserve(currentRef)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    if (!shouldLoad) return

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = onLoad || (() => {})
    script.onerror = onError || (() => {})

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [shouldLoad, src, onLoad, onError])

  return <div ref={triggerRef} style={{ height: 1, visibility: 'hidden' }} />
}
