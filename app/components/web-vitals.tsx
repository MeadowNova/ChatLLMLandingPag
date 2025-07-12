'use client'

import { useEffect, useState } from 'react'
import { sendToAnalytics, PerformanceMonitor, preloadCriticalResources, analyzeBundleSize } from '@/lib/performance'
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'; // Moved to top level

export function WebVitals() {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = new PerformanceMonitor()
    
    // Preload critical resources
    preloadCriticalResources()
    
    // Analyze bundle size in development
    if (process.env.NODE_ENV === 'development') {
      analyzeBundleSize()
    }

    // Initialize web-vitals (now imported at top level)
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    
    // INP is newer, might not be available
    if (onINP) {
      onINP(sendToAnalytics);
    }

    return () => {
      monitor.disconnect()
    }
  }, [])

  return null
}

// Component for lazy loading sections
interface LazyLoadSectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyLoadSection({ 
  children, 
  className, 
  threshold = 0.1, 
  rootMargin = '50px' 
}: LazyLoadSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

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

  return (
    <div ref={setRef} className={className}>
      {isVisible ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  )
}
