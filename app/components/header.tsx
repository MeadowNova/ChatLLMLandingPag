
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <div className="w-full bg-primary/10 border-b border-primary/30 py-2 px-1 text-center z-[100] relative">
        <span className="block text-sm sm:text-base font-semibold text-primary">
        </span>
      </div>
      <header className="relative w-full bg-background border-b border-border/50">
        <div className="max-w-6xl mx-auto px-1 sm:px-5 lg:px-8">
          <div className="flex items-center h-16 relative">
          {/* Logo */}
          <div className="flex items-center justify-center flex-1">
            <div className="relative h-20 w-auto">
              <Image
                src="/header-logo.png"
                alt="ChatLLM Mastery Logo"
                width={600}
                height={160}
                className="h-20 w-auto object-contain"
                priority
                onError={() => {
                  console.log('Logo failed to load');
                }}
              />
            </div>
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center space-x-8 absolute right-0">
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
            <button
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </nav>

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
              <button
                onClick={() => scrollToSection('faq')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                FAQ
              </button>
            </div>
          </div>
        )}
      </div>
      </header>
    </>
  )
}
