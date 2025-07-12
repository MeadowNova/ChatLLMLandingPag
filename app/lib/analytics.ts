// Analytics configuration and utilities
export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production',
  },
  
  // Facebook Pixel
  facebookPixel: {
    pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '000000000000000',
    enabled: process.env.NODE_ENV === 'production',
  },
  
  // Custom analytics
  customAnalytics: {
    enabled: true,
    apiEndpoint: '/api/analytics',
  }
}

// Google Analytics event tracking
export const gtag = {
  // Page view tracking
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
        page_location: url,
      })
    }
  },

  // Event tracking
  event: (action: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, parameters)
    }
  },

  // Conversion tracking
  conversion: (conversionId: string, value?: number, currency = 'USD') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency,
      })
    }
  },

  // Custom events for ChatLLM Mastery
  trackEmailSignup: (email: string, source: string) => {
    gtag.event('email_signup', {
      event_category: 'engagement',
      event_label: source,
      user_email: email,
      value: 1,
    })
  },

  trackWaitlistJoin: (email: string, experienceLevel: string) => {
    gtag.event('join_waitlist', {
      event_category: 'conversion',
      event_label: experienceLevel,
      user_email: email,
      value: 5,
    })
  },

  trackChatbotInteraction: (action: string) => {
    gtag.event('chatbot_interaction', {
      event_category: 'engagement',
      event_label: action,
      value: 1,
    })
  },

  trackSectionView: (sectionName: string) => {
    gtag.event('section_view', {
      event_category: 'engagement',
      event_label: sectionName,
      value: 1,
    })
  },
}

// Facebook Pixel tracking
export const fbPixel = {
  // Page view tracking
  pageview: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  },

  // Event tracking
  event: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters)
    }
  },

  // Custom events for ChatLLM Mastery
  trackEmailSignup: (email: string) => {
    fbPixel.event('CompleteRegistration', {
      content_name: 'Email Signup',
      content_category: 'Lead Generation',
      value: 1,
      currency: 'USD',
    })
  },

  trackWaitlistJoin: (email: string) => {
    fbPixel.event('Lead', {
      content_name: 'Waitlist Join',
      content_category: 'Lead Generation',
      value: 5,
      currency: 'USD',
    })
  },

  trackChatbotInteraction: () => {
    fbPixel.event('Contact', {
      content_name: 'Chatbot Interaction',
      content_category: 'Engagement',
    })
  },
}

// Custom analytics for internal tracking
export const customAnalytics = {
  track: async (eventName: string, properties: Record<string, any> = {}) => {
    if (!analyticsConfig.customAnalytics.enabled) return

    try {
      const response = await fetch(analyticsConfig.customAnalytics.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventName,
          properties: {
            ...properties,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          },
        }),
      })

      if (!response.ok) {
        console.warn('Custom analytics tracking failed:', response.statusText)
      }
    } catch (error) {
      console.warn('Custom analytics tracking error:', error)
    }
  },

  // Page view tracking
  pageview: (url: string) => {
    customAnalytics.track('page_view', { url })
  },

  // Email signup tracking
  emailSignup: (email: string, source: string, experienceLevel?: string) => {
    customAnalytics.track('email_signup', {
      email,
      source,
      experienceLevel,
    })
  },

  // Waitlist join tracking
  waitlistJoin: (email: string, data: Record<string, any>) => {
    customAnalytics.track('waitlist_join', {
      email,
      ...data,
    })
  },

  // Chatbot interaction tracking
  chatbotInteraction: (action: string, details?: Record<string, any>) => {
    customAnalytics.track('chatbot_interaction', {
      action,
      ...details,
    })
  },

  // Section view tracking (for scroll tracking)
  sectionView: (sectionName: string, timeSpent?: number) => {
    customAnalytics.track('section_view', {
      section: sectionName,
      timeSpent,
    })
  },
}

// Combined analytics function for easy use
export const analytics = {
  pageview: (url: string) => {
    gtag.pageview(url)
    fbPixel.pageview()
    customAnalytics.pageview(url)
  },

  emailSignup: (email: string, source: string, experienceLevel?: string) => {
    gtag.trackEmailSignup(email, source)
    fbPixel.trackEmailSignup(email)
    customAnalytics.emailSignup(email, source, experienceLevel)
  },

  waitlistJoin: (email: string, data: Record<string, any>) => {
    gtag.trackWaitlistJoin(email, data.experienceLevel)
    fbPixel.trackWaitlistJoin(email)
    customAnalytics.waitlistJoin(email, data)
  },

  chatbotInteraction: (action: string, details?: Record<string, any>) => {
    gtag.trackChatbotInteraction(action)
    fbPixel.trackChatbotInteraction()
    customAnalytics.chatbotInteraction(action, details)
  },

  sectionView: (sectionName: string, timeSpent?: number) => {
    gtag.trackSectionView(sectionName)
    customAnalytics.sectionView(sectionName, timeSpent)
  },
}

// Type declarations for global objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}
