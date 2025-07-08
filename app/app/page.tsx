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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ValuePropositionSection />
      <CourseOverviewSection />
      <SocialProofSection />
      <ChatbotPricingHook />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
