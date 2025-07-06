
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Target, Zap, Users, BookOpen, Award } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Guidance',
    description: 'Learn with a custom AI assistant that adapts to your learning style and provides personalized feedback throughout your journey.'
  },
  {
    icon: Target,
    title: 'Hands-On Learning',
    description: 'Build real-world projects and applications while mastering ChatLLM concepts through practical, interactive exercises.'
  },
  {
    icon: Zap,
    title: 'Career-Ready Skills',
    description: 'Gain in-demand expertise in Large Language Models that top tech companies are actively seeking in today\'s market.'
  },
  {
    icon: Users,
    title: 'Expert Community',
    description: 'Join a vibrant community of AI practitioners and get mentorship from industry experts and Abacus.AI professionals.'
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Master everything from fundamentals to advanced topics with our structured 5-module curriculum designed by AI experts.'
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Earn a certificate recognized by leading tech companies and demonstrate your expertise in ChatLLM technologies.'
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
            Why Choose Our ChatLLM Course?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your AI knowledge with the most comprehensive and practical ChatLLM training available. 
            Here's what makes our course different.
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
              Ready to Start Your AI Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of professionals who have already transformed their careers with our ChatLLM expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <span className="text-sm text-primary font-medium">✓ Lifetime Access</span>
              <span className="text-sm text-primary font-medium">✓ 30-Day Money Back</span>
              <span className="text-sm text-primary font-medium">✓ Expert Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
