import { Metadata } from 'next'

// Base SEO configuration
export const siteConfig = {
  name: 'ChatLLM Mastery',
  title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
  description: 'Master Large Language Models and build a profitable AI agency. Learn ChatGPT, Claude, and advanced AI implementation strategies from industry experts.',
  url: 'https://chatllmmastery.com',
  ogImage: '/dashboard.png',
  creator: '@ChatLLMMastery',
  keywords: [
    'ChatLLM', 'AI Training', 'Machine Learning', 'Large Language Models',
    'AI Agency', 'ChatGPT Training', 'Claude AI', 'AI Implementation',
    'AI Business', 'AI Consulting', 'Prompt Engineering', 'AI Automation',
    'AI Course', 'AI Certification', 'AI Skills', 'AI Career'
  ],
}

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  keywords = siteConfig.keywords,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  noIndex?: boolean
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const metaDescription = description || siteConfig.description
  const metaImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.creator,
    
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.creator,
      creator: siteConfig.creator,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    
    alternates: {
      canonical: url,
    },
  }
}

// Structured data generators
export function generateCourseStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "ChatLLM Mastery Course",
    "description": siteConfig.description,
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/header-logo.png`,
    },
    "courseMode": "online",
    "educationalLevel": "Beginner to Advanced",
    "teaches": [
      "Large Language Models",
      "AI Implementation",
      "ChatGPT Training",
      "Claude AI",
      "AI Agency Building",
      "Prompt Engineering",
      "AI Automation"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": [
        "Entrepreneurs",
        "Business Owners",
        "AI Enthusiasts",
        "Consultants",
        "Developers"
      ]
    },
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "priceValidUntil": "2025-12-31"
    }
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/header-logo.png`,
    "description": "Leading provider of AI training and Large Language Model education",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@chatllmmastery.com"
    },
    "sameAs": [
      "https://twitter.com/ChatLLMMastery",
      "https://linkedin.com/company/chatllm-mastery"
    ]
  }
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
}
