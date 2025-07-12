'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { EmailSubscriptionForm } from '@/components/email-subscription-form'
import { ArrowRight, Clock, Star, Zap } from 'lucide-react'

export function FinalCTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToPricing = () => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Urgency Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>Limited Time Offer - Ends Soon</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Become a{' '}
            <span className="text-primary">ChatLLM Expert</span>?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the ranks of AI professionals who are shaping the future. 
            Your transformation from novice to expert starts with a single click.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-center">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Start Learning Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-muted-foreground">4.9/5 Student Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Lifetime Access</span>
            </div>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Button 
              onClick={scrollToPricing}
              size="lg" 
              className="cta-button text-lg px-12 py-4 h-auto"
            >
              Join The Waitlist Now and receive exclusive perks and discounts upon launch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              🔒 Secure payment • 30-day money-back guarantee
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <div className="flex-1 h-px bg-border max-w-32" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border max-w-32" />
          </motion.div>

          {/* Alternative CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card border border-border rounded-lg p-6 max-w-lg mx-auto"
          >
            <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded text-center font-semibold text-lg text-primary">
              🎯 Business-in-a-Box System<br />
              <span className="text-2xl text-foreground font-bold">Complete SMB Chatbot Agency</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Secure Your Exclusive Launch Access
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get early access to the complete system, exclusive bonuses, and special launch pricing.
            </p>
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <p className="text-base text-foreground font-semibold mb-2">
                The SMB market is hungry for AI solutions, but most business owners don't know where to start.
              </p>
              <p className="text-base text-muted-foreground mb-2">
                You'll have the complete system to serve this massive market with confidence and expertise.
              </p>
              <p className="text-base text-muted-foreground">
                From technical skills to client acquisition - everything you need to build a profitable chatbot agency.
              </p>
            </div>
            <EmailSubscriptionForm
              placeholder="Enter your email address"
              source="final_cta"
              enhanced={true}
              className="w-full"
            />
          </motion.div>

          {/* Final Trust Signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <p className="text-sm text-muted-foreground">
              Join <span className="text-primary font-semibold">1,200+ professionals</span> who have already 
              transformed their careers with ChatLLM expertise
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
