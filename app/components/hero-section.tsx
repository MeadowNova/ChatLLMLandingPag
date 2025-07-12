
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmailSubscriptionForm } from '@/components/email-subscription-form'
import { ArrowRight, Play, Star } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToFeatures = () => {
    const element = document.getElementById('features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full aspect-video bg-muted">
          <Image
            src="https://media.slidesgo.com/storage/28642471/ai-tech-agency-infographics1669823813.jpg"
            alt="AI Technology Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-current" />
            <span>Complete Business-in-a-Box System</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Build & Scale{' '}
            <span className="text-primary">AI Chatbots</span>{' '}
            for SMBs
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Master the complete system to launch your profitable chatbot agency. From technical skills to client acquisition - everything you need to succeed.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">500+</span>
              <span className="text-sm text-muted-foreground">Students Enrolled</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">95%</span>
              <span className="text-sm text-muted-foreground">Success Rate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">$2.5K</span>
              <span className="text-sm text-muted-foreground">Avg First Project</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">60</span>
              <span className="text-sm text-muted-foreground">Days to Results</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={scrollToPricing}
              size="lg" 
              className="cta-button text-lg px-8 py-3 h-auto"
            >
              Join The Waitlist Now and receive exclusive perks and discounts upon launch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <div className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
              <span className="block text-lg sm:text-xl font-bold text-primary mb-1">🚀 Limited Launch Spots Available</span>
              <span className="block font-semibold text-foreground">Join the exclusive waitlist for early access and special pricing</span>
            </div>
            <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <p className="text-base text-foreground font-semibold mb-2">
                Get the complete business-in-a-box system to build and scale your AI chatbot agency.
              </p>
              <p className="text-base text-muted-foreground mb-2">
                From technical mastery to client acquisition - everything you need to succeed in the SMB market.
              </p>
              <p className="text-base text-muted-foreground">
                Early birds get exclusive bonuses worth $500+ and special launch pricing.
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Join 500+ aspiring chatbot entrepreneurs
            </p>
            <div className="flex justify-center">
              <EmailSubscriptionForm
                placeholder="Enter your email to secure your spot"
                source="hero"
                className="flex items-center space-x-3 max-w-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
