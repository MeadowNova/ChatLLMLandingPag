
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { EmailSubscriptionForm } from '@/components/email-subscription-form'
import { Check, Star, Clock, Award, Users, Infinity } from 'lucide-react'

const features = [
  'Complete 5-module curriculum (45+ hours)',
  '69 HD video lessons',
  '19 hands-on projects with real datasets',
  'Custom AI assistant for personalized guidance',
  'Abacus.AI platform access and training',
  'Downloadable resources and code templates',
  'Expert community access',
  'Industry-recognized completion certificate',
  'Lifetime access to all materials',
  'Future course updates included',
  '30-day money-back guarantee',
  'Priority support from instructors'
]

const bonuses = [
  {
    title: 'AI Career Roadmap',
    value: '$197',
    description: 'Exclusive guide to breaking into AI roles'
  },
  {
    title: 'LLM Interview Prep',
    value: '$147',
    description: 'Common questions and expert answers'
  },
  {
    title: 'Industry Connections',
    value: '$297',
    description: 'Network with hiring managers and experts'
  }
]

export function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-20 bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Master ChatLLM Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers. 
            Get lifetime access to everything you need to become a ChatLLM expert.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-primary/20 rounded-xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Popular Badge */}
          <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-2 rounded-full transform rotate-12 text-sm font-bold">
            Most Popular
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              ChatLLM Master Course
            </h3>
            <p className="text-muted-foreground mb-6">
              Complete training program with lifetime access
            </p>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl text-muted-foreground line-through">$1,497</span>
                <span className="text-5xl font-bold text-primary">$497</span>
              </div>
              <p className="text-sm text-muted-foreground">
                One-time payment • Lifetime access • No recurring fees
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-primary mb-1">
                  <Infinity className="w-4 h-4" />
                  <span className="font-semibold">Lifetime</span>
                </div>
                <span className="text-xs text-muted-foreground">Access</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-primary mb-1">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold">Certificate</span>
                </div>
                <span className="text-xs text-muted-foreground">Included</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-primary mb-1">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Community</span>
                </div>
                <span className="text-xs text-muted-foreground">Access</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={scrollToTop}
              size="lg" 
              className="cta-button w-full text-lg py-6 mb-6"
            >
              Get Instant Access - $497
            </Button>

            <p className="text-xs text-muted-foreground">
              🔒 Secure payment • 30-day money-back guarantee
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            <h4 className="font-semibold text-foreground mb-4">Everything included:</h4>
            <div className="grid grid-cols-1 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bonuses */}
          <div className="border-t border-border pt-8">
            <h4 className="font-semibold text-foreground mb-4 text-center">
              🎁 Exclusive Bonuses (Value: $641)
            </h4>
            <div className="space-y-3">
              {bonuses.map((bonus, index) => (
                <div key={index} className="flex items-center justify-between bg-primary/5 rounded-lg p-3">
                  <div>
                    <span className="font-medium text-foreground">{bonus.title}</span>
                    <p className="text-xs text-muted-foreground">{bonus.description}</p>
                  </div>
                  <span className="text-primary font-semibold">{bonus.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alternative CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Not ready to enroll? Join our waitlist for updates
            </h3>
            <div className="max-w-md mx-auto">
              <EmailSubscriptionForm 
                placeholder="Enter your email for course updates"
                source="pricing"
                className="flex gap-2"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Get notified about special offers and free ChatLLM resources
            </p>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Average completion: 8 weeks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 student rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <span>1,200+ successful graduates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
