
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Launch Announcement Banner */}
      <div className="w-full bg-primary/10 border-b border-primary/30 py-3 px-2 text-center z-[100] relative">
        <span className="block text-sm sm:text-base font-semibold text-primary">
          🚀 Limited Launch Spots Available - Join the Exclusive Waitlist for Early Access & Special Pricing
        </span>
      </div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="ChatLLM Mastery Logo"
                width={40}
                height={40}
                className="object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">ChatLLM Mastery</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            {/* Pricing button removed */}
            <button
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('pricing')}
              className="cta-button"
            >
              Join The Waitlist Now and receive exclusive perks and discounts upon launch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('overview')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                Features
              </button>
              {/* Pricing button removed from mobile menu */}
              <button
                onClick={() => scrollToSection('faq')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                FAQ
              </button>
              <div className="px-3 py-2">
                <Button 
                  onClick={() => scrollToSection('pricing')}
                  className="cta-button w-full"
                >
                  Join The Waitlist Now and receive exclusive perks and discounts upon launch
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      </header>
    </>
  )
}
