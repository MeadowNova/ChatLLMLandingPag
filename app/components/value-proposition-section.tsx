
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { DollarSign, Target, Zap, Users, BookOpen, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'Land Your First $2,500 AI Client',
    description: 'Our proven system helps you secure high-value SMB clients within 60 days. Learn the exact strategies our graduates use to close deals.'
  },
  {
    icon: Target,
    title: 'Ready-to-Use Business Templates',
    description: 'Get proven chatbot templates for common SMB needs: customer service, lead generation, appointment booking, and more.'
  },
  {
    icon: Zap,
    title: 'No-Code Technical Mastery',
    description: 'Build professional chatbots using accessible platforms like Abacus.AI. No complex coding required - focus on serving clients.'
  },
  {
    icon: Users,
    title: 'SMB Client Acquisition System',
    description: 'Master the complete sales process: finding prospects, crafting proposals, closing deals, and delivering exceptional results.'
  },
  {
    icon: BookOpen,
    title: 'Complete Business-in-a-Box',
    description: 'From technical skills to business operations - get everything you need to launch and scale your profitable chatbot agency.'
  },
  {
    icon: TrendingUp,
    title: 'Recurring Revenue Strategies',
    description: 'Build sustainable income with monthly retainers, maintenance contracts, and expansion opportunities with existing clients.'
  }
]

export function ValuePropositionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Our SMB Chatbot System Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your income with the most comprehensive chatbot agency system available.
            Here's what makes our business-in-a-box different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover bg-card border border-border rounded-lg p-6 text-center group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Build Your Chatbot Agency?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join 500+ entrepreneurs who are already building profitable chatbot agencies serving the SMB market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <span className="text-sm text-primary font-medium">✓ Complete Business System</span>
              <span className="text-sm text-primary font-medium">✓ Proven Client Templates</span>
              <span className="text-sm text-primary font-medium">✓ 60-Day Success Path</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
