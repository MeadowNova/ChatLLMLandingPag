
'use client'

import { Brain, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">ChatLLM Master</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Master Large Language Models with the most comprehensive and practical ChatLLM training available. 
              Transform your career with AI-powered learning.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Powered by Abacus.AI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Course Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@chatllmmaster.com"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">Live Chat Available</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">AI Assistant Help</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ChatLLM Master Course. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="text-xs text-muted-foreground">30-Day Money Back Guarantee</span>
            <span className="text-xs text-muted-foreground">Lifetime Access</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
