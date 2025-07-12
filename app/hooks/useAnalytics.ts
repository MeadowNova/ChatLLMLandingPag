'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export function useAnalytics() {
  const pathname = usePathname()

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      analytics.pageview(window.location.href)
    }
  }, [pathname])

  // Analytics tracking functions
  const trackEmailSignup = useCallback((email: string, source: string, experienceLevel?: string) => {
    analytics.emailSignup(email, source, experienceLevel)
  }, [])

  const trackWaitlistJoin = useCallback((email: string, data: Record<string, any>) => {
    analytics.waitlistJoin(email, data)
  }, [])

  const trackChatbotInteraction = useCallback((action: string, details?: Record<string, any>) => {
    analytics.chatbotInteraction(action, details)
  }, [])

  const trackSectionView = useCallback((sectionName: string, timeSpent?: number) => {
    analytics.sectionView(sectionName, timeSpent)
  }, [])

  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: `${buttonName}_${location}`,
        value: 1,
      })
    }
  }, [])

  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', success ? 'form_submit_success' : 'form_submit_error', {
        event_category: 'form',
        event_label: formName,
        value: success ? 1 : 0,
      })
    }
  }, [])

  const trackVideoPlay = useCallback((videoName: string, duration?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: videoName,
        value: duration || 1,
      })
    }
  }, [])

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        event_category: 'engagement',
        event_label: `${fileName}.${fileType}`,
        value: 1,
      })
    }
  }, [])

  const trackExternalLink = useCallback((url: string, linkText: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'outbound',
        event_label: url,
        transport_type: 'beacon',
        value: 1,
      })
    }
  }, [])

  return {
    trackEmailSignup,
    trackWaitlistJoin,
    trackChatbotInteraction,
    trackSectionView,
    trackButtonClick,
    trackFormSubmission,
    trackVideoPlay,
    trackDownload,
    trackExternalLink,
  }
}

// Hook for intersection observer to track section views
export function useSectionTracking(sectionName: string, threshold = 0.5) {
  const { trackSectionView } = useAnalytics()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(sectionName)
          }
        })
      },
      { threshold }
    )

    const element = document.getElementById(sectionName)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [sectionName, trackSectionView, threshold])
}

// Hook for tracking time spent on page/section
export function useTimeTracking(eventName: string) {
  useEffect(() => {
    const startTime = Date.now()

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: eventName,
          value: timeSpent,
        })
      }
    }
  }, [eventName])
}
