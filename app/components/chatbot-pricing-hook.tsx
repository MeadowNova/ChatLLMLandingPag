'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Users, DollarSign, TrendingUp } from 'lucide-react'

export function ChatbotPricingHook() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-background to-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The SMB Market Opportunity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Small and medium businesses are hungry for AI solutions but lack the technical expertise.
            This creates a massive opportunity for skilled chatbot developers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">32M+</h3>
            <p className="text-muted-foreground">SMBs in the US alone needing AI solutions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">85%</h3>
            <p className="text-muted-foreground">Of SMBs want AI chatbots but don't know how to get them</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">$2,500</h3>
            <p className="text-muted-foreground">Average first project value for our graduates</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">60 Days</h3>
            <p className="text-muted-foreground">Average time to land first paying client</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Your Business-in-a-Box Advantage
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            While others struggle with complex technical setups, you'll have a complete system:
            proven templates, client acquisition strategies, and the technical skills to deliver results fast.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Ready-to-Use Templates</h4>
              <p className="text-muted-foreground">Pre-built chatbot solutions for common SMB needs</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Client Acquisition System</h4>
              <p className="text-muted-foreground">Proven methods to find and close SMB clients</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Technical Mastery</h4>
              <p className="text-muted-foreground">Build professional chatbots with confidence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
