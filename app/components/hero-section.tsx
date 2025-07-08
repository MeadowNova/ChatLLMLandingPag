
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-current" />
            <span>AI-Powered Learning Experience</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Master ChatLLM: From{' '}
            <span className="text-primary">Novice to Expert</span>{' '}
            with AI-Powered Training
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of Large Language Models with our hands-on course, featuring a custom AI assistant to guide you every step of the way.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">5</span>
              <span className="text-sm text-muted-foreground">Comprehensive Modules</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">50+</span>
              <span className="text-sm text-muted-foreground">Hands-On Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary count-up">1000+</span>
              <span className="text-sm text-muted-foreground">Students Enrolled</span>
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
              <span className="block text-lg sm:text-xl font-bold text-primary mb-1">The Shocking Truth About Chatbot Pricing</span>
              <span className="block font-semibold text-primary">What "Experts" on Fiverr Charge: <span className="font-extrabold text-2xl" style={{ color: '#ef4444' }}>$18,000+</span> <span className="text-foreground font-semibold">for Custom AI Chatbots</span></span>
            </div>
            <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <p className="text-base text-foreground font-semibold mb-2">
                This price arbitrage opportunity exists because most business owners don't know how simple chatbot building has become. But that's changing fast.
              </p>
              <p className="text-base text-muted-foreground mb-2">
                Every day, more people discover they can build professional chatbots for $20/month instead of paying $18,000.
              </p>
              <p className="text-base text-muted-foreground">
                Six months from now, this won't be a secret anymore. The question is: do you want to be ahead of the curve or behind it?
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Join 5,000+ professionals already learning
            </p>
            <EmailSubscriptionForm 
              placeholder="Enter your email for course updates"
              source="hero"
              className="flex gap-2"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
