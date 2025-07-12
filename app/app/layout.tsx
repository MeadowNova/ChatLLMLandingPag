
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { WebVitals } from '@/components/web-vitals'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://chatllmmastery.com'),
  title: {
    default: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
    template: '%s | ChatLLM Mastery'
  },
  description: 'Master Large Language Models and build a profitable AI agency. Learn ChatGPT, Claude, and advanced AI implementation strategies. From beginner to expert with hands-on training.',
  keywords: [
    'ChatLLM', 'AI Training', 'Machine Learning', 'Large Language Models',
    'AI Agency', 'ChatGPT Training', 'Claude AI', 'AI Implementation',
    'AI Business', 'AI Consulting', 'Prompt Engineering', 'AI Automation',
    'AI Course', 'AI Certification', 'AI Skills', 'AI Career'
  ],
  authors: [{ name: 'ChatLLM Mastery', url: 'https://chatllmmastery.com' }],
  creator: 'ChatLLM Mastery',
  publisher: 'ChatLLM Mastery',
  category: 'Education',
  classification: 'AI Training Course',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chatllmmastery.com',
    siteName: 'ChatLLM Mastery',
    title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
    description: 'Master Large Language Models and build a profitable AI agency. Learn ChatGPT, Claude, and advanced AI implementation strategies.',
    images: [
      {
        url: '/dashboard.png',
        width: 1200,
        height: 630,
        alt: 'ChatLLM Mastery Course Dashboard',
        type: 'image/png',
      },
      {
        url: '/feature-1.png',
        width: 800,
        height: 600,
        alt: 'AI Training Features',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@ChatLLMMastery',
    creator: '@ChatLLMMastery',
    title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
    description: 'Master Large Language Models and build a profitable AI agency. Learn ChatGPT, Claude, and advanced AI implementation strategies.',
    images: ['/dashboard.png'],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },

  // App metadata
  applicationName: 'ChatLLM Mastery',
  referrer: 'origin-when-cross-origin',

  // Additional meta tags
  other: {
    'theme-color': '#4ade80',
    'color-scheme': 'dark light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'ChatLLM Mastery',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4ade80',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "ChatLLM Mastery Course",
              "description": "Master Large Language Models and build a profitable AI agency. Learn ChatGPT, Claude, and advanced AI implementation strategies.",
              "provider": {
                "@type": "Organization",
                "name": "ChatLLM Mastery",
                "url": "https://chatllmmastery.com",
                "logo": "https://chatllmmastery.com/header-logo.png",
                "sameAs": [
                  "https://twitter.com/ChatLLMMastery",
                  "https://linkedin.com/company/chatllm-mastery"
                ]
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
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ChatLLM Mastery",
              "url": "https://chatllmmastery.com",
              "logo": "https://chatllmmastery.com/header-logo.png",
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
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ChatLLM Mastery",
              "url": "https://chatllmmastery.com",
              "description": "Master Large Language Models and build a profitable AI agency",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://chatllmmastery.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4ade80" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apps.abacus.ai" />

        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//apps.abacus.ai" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <WebVitals />
        </ThemeProvider>
        <Script
          id="chatbot-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const urlS1 = 'https://apps.abacus.ai/chatllm/?appId=1343e71caa&hideTopBar=2';
              (function() {
                let UserWidgetData = {
                  "topName": "ChatLLM Mastery Mentor",
                  "darkMode": true,
                  "topColor": "#4ade80",
                  "frameWidth": 450,
                  "frameHeight": 700,
                  "circleSizePx": 30,
                  "circleColor": "#4ade80",
                  "promptAskString": "Ask me anything!"
                };

                const style = document.createElement('style');
                style.textContent = \`
                  .floating-circle {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: \${(UserWidgetData?.circleSizePx || 30)*2}px;
                    height: \${(UserWidgetData?.circleSizePx || 30)*2}px;
                    border-radius: 50%;
                    background-color: \${UserWidgetData?.circleColor || '#4ade80'};
                    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
                    cursor: pointer;
                    z-index: 9999;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    border: 2px solid rgba(74, 222, 128, 0.2);
                  }
                  .floating-circle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
                  }
                  .floating-circle:active {
                    transform: scale(0.95);
                  }
                  .floating-iframe {
                    position: fixed;
                    bottom: 85px;
                    right: 20px;
                    width: 0;
                    height: 0;
                    background: white;
                    border: none;
                    z-index: 20000;
                    opacity: 0;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    overflow: hidden;
                  }
                  .floating-iframe.open {
                    width: \${UserWidgetData?.frameWidth || 450}px;
                    height: \${UserWidgetData?.frameHeight || 700}px;
                    opacity: 1;
                  }
                \`;
                document.head.appendChild(style);

                const circle = document.createElement('div');
                circle.className = 'floating-circle';
                circle.innerHTML = '💬';
                circle.title = 'ChatLLM Mastery Mentor - Ask me anything!';
                document.body.appendChild(circle);

                const iframe = document.createElement('iframe');
                iframe.className = 'floating-iframe';
                iframe.src = urlS1;
                iframe.allow = 'microphone; camera';
                document.body.appendChild(iframe);

                let isOpen = false;
                circle.addEventListener('click', () => {
                  isOpen = !isOpen;
                  iframe.classList.toggle('open', isOpen);

                  // Update circle appearance when chat is open
                  if (isOpen) {
                    circle.style.backgroundColor = '#22c55e';
                    circle.innerHTML = '✕';
                  } else {
                    circle.style.backgroundColor = UserWidgetData.circleColor;
                    circle.innerHTML = '💬';
                  }
                });

                // Close chat when clicking outside
                document.addEventListener('click', (e) => {
                  if (isOpen && !circle.contains(e.target) && !iframe.contains(e.target)) {
                    isOpen = false;
                    iframe.classList.remove('open');
                    circle.style.backgroundColor = UserWidgetData.circleColor;
                    circle.innerHTML = '💬';
                  }
                });
              })();
            `
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_location: window.location.href,
                page_title: document.title,
                send_page_view: true
              });
            `
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `
          }}
        />

        {/* Analytics Initialization */}
        <Script
          id="analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize custom analytics
              window.analyticsReady = true;

              // Track initial page view
              if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', {
                  page_location: window.location.href,
                  page_title: document.title
                });
              }

              // Track scroll depth
              let maxScroll = 0;
              let scrollTimer;

              window.addEventListener('scroll', function() {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

                if (scrollPercent > maxScroll) {
                  maxScroll = scrollPercent;

                  clearTimeout(scrollTimer);
                  scrollTimer = setTimeout(() => {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'scroll', {
                        event_category: 'engagement',
                        event_label: 'scroll_depth',
                        value: maxScroll
                      });
                    }
                  }, 1000);
                }
              });

              // Track time on page
              let startTime = Date.now();
              window.addEventListener('beforeunload', function() {
                const timeOnPage = Math.round((Date.now() - startTime) / 1000);
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'timing_complete', {
                    name: 'time_on_page',
                    value: timeOnPage
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
