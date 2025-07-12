// Performance monitoring and optimization utilities

export interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

// Web Vitals thresholds
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
}

// Get rating based on metric value
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

// Send metrics to analytics
export function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
      },
    })
  }

  // Send to custom analytics
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'web_vitals',
        properties: {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_id: metric.id,
          url: window.location.href,
        },
      }),
    }).catch(console.error)
  }
}

// Performance observer for custom metrics
export class PerformanceMonitor {
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window === 'undefined') return
    this.initObservers()
  }

  private initObservers() {
    // Long tasks observer
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration, 'ms')
              this.trackLongTask(entry)
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.push(longTaskObserver)
      } catch (e) {
        console.warn('Long task observer not supported')
      }

      // Layout shift observer
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              console.warn('Layout shift detected:', (entry as any).value)
            }
          }
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(layoutShiftObserver)
      } catch (e) {
        console.warn('Layout shift observer not supported')
      }
    }
  }

  private trackLongTask(entry: PerformanceEntry) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'long_task', {
        event_category: 'Performance',
        event_label: 'blocking_time',
        value: Math.round(entry.duration),
      })
    }
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Resource loading optimization
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/inter-var.woff2',
  ]

  fontPreloads.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical images
  const imagePreloads = [
    '/header-logo.png',
    '/dashboard.png',
  ]

  imagePreloads.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = 'image'
    document.head.appendChild(link)
  })
}

// Lazy loading utility
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  })
}

// Image optimization helpers
export function getOptimizedImageProps(
  src: string,
  alt: string,
  width?: number,
  height?: number
) {
  return {
    src,
    alt,
    width,
    height,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    style: {
      maxWidth: '100%',
      height: 'auto',
    },
  }
}

// Critical CSS inlining helper
export function inlineCriticalCSS(css: string) {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}

// Bundle size analyzer
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return

  // Track bundle loading performance
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

    const jsResources = resources.filter(r => r.name.includes('.js'))
    const cssResources = resources.filter(r => r.name.includes('.css'))

    console.log('Performance Analysis:', {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      jsResources: jsResources.length,
      cssResources: cssResources.length,
      totalTransferSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
    })
  })
}
