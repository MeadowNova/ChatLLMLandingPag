import { Metadata } from 'next'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ValuePropositionSection } from '@/components/value-proposition-section'
import { CourseOverviewSection } from '@/components/course-overview-section'
import { SocialProofSection } from '@/components/social-proof-section'
import { FeaturesSection } from '@/components/features-section'
import { PricingSection } from '@/components/pricing-section'
import { FAQSection } from '@/components/faq-section'
import { FinalCTASection } from '@/components/final-cta-section'
import { Footer } from '@/components/footer'
import { ChatbotPricingHook } from '@/components/chatbot-pricing-hook'

// Page-specific metadata
export const metadata: Metadata = {
  title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
  description: 'Join the waitlist for ChatLLM Mastery Course. Master Large Language Models, build a profitable AI agency, and learn advanced AI implementation strategies from industry experts.',
  keywords: [
    'ChatLLM course', 'AI agency training', 'ChatGPT mastery', 'Claude AI training',
    'AI implementation course', 'AI business course', 'prompt engineering',
    'AI automation training', 'AI consulting course', 'machine learning course'
  ],
  openGraph: {
    title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
    description: 'Join the waitlist for ChatLLM Mastery Course. Master Large Language Models and build a profitable AI agency.',
    url: 'https://chatllmmastery.com',
    type: 'website',
    images: [
      {
        url: '/dashboard.png',
        width: 1200,
        height: 630,
        alt: 'ChatLLM Mastery Course Dashboard',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatLLM Mastery Course - Master AI & Build Your Agency',
    description: 'Join the waitlist for ChatLLM Mastery Course. Master Large Language Models and build a profitable AI agency.',
    images: ['/dashboard.png'],
  },
  alternates: {
    canonical: 'https://chatllmmastery.com',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Page Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section - Above the fold content */}
        <section aria-label="Hero section">
          <HeroSection />
        </section>

        {/* Value Proposition */}
        <section aria-label="Value proposition">
          <ValuePropositionSection />
        </section>

        {/* Course Overview */}
        <section aria-label="Course overview">
          <CourseOverviewSection />
        </section>

        {/* Social Proof */}
        <section aria-label="Social proof and testimonials">
          <SocialProofSection />
        </section>

        {/* Chatbot Pricing Hook */}
        <section aria-label="Interactive pricing information">
          <ChatbotPricingHook />
        </section>

        {/* Features */}
        <section aria-label="Course features and benefits">
          <FeaturesSection />
        </section>

        {/* Pricing */}
        <section aria-label="Pricing and enrollment">
          <PricingSection />
        </section>

        {/* FAQ */}
        <section aria-label="Frequently asked questions">
          <FAQSection />
        </section>

        {/* Final CTA */}
        <section aria-label="Final call to action">
          <FinalCTASection />
        </section>
      </main>

      {/* Page Footer */}
      <Footer />
    </>
  )
}
