'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bot, Code, BarChart3, Users, Shield, Zap } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    title: 'Custom AI Assistant (Of Course We Had To...This Is A Custom AI Chatbot Course!',
    description: 'Your personal AI mentor available 24/7 to answer questions, provide code reviews, and guide you through complex concepts. Get instant feedback and personalized learning paths.',
    image: '/feature-1.png',
    icon: Bot,
    benefits: [
      'Instant answers to your questions',
      'Personalized learning recommendations',
      'Code review and optimization tips',
      'Progress tracking and guidance'
    ]
  },
  {
    title: 'Hands-On Projects',
    description: 'Build real-world ChatLLM applications from scratch. Work with actual datasets, implement production-ready solutions, and create a portfolio that showcases your skills.',
    image: 'https://cdn.abacus.ai/images/8e08df38-abb9-4a87-9f90-abf5efeb0e0c.png',
    icon: Code,
    benefits: [
      'Build 5 real-world projects',
      'Work with production datasets',
      'Create portfolio-worthy applications',
      'Learn industry best practices'
    ]
  },
  {
    title: 'Abacus.AI Platform Mastery',
    description: 'Master the enterprise-grade Abacus.AI platform used by Fortune 500 companies. Learn advanced analytics, deployment strategies, and scaling techniques.',
    image: '/dashboard.png',
    icon: BarChart3,
    benefits: [
      'Enterprise platform expertise',
      'Advanced analytics and monitoring',
      'Scalable deployment strategies',
      'Industry-standard tooling'
    ]
  }
]

const additionalFeatures = [
  {
    icon: Users,
    title: 'Expert Community',
    description: 'Connect with fellow learners and industry experts in our exclusive community.'
  },
  {
    icon: Shield,
    title: 'Lifetime Access',
    description: 'Get lifetime access to all course materials and future updates at no extra cost.'
  },
  {
    icon: Zap,
    title: 'Fast-Track Learning',
    description: 'Accelerate your learning with our proven methodology and structured curriculum.'
  }
]

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="features" className="py-20 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Course Features That Set Us Apart
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the most advanced and comprehensive ChatLLM training available. 
            Our unique features ensure you master both theory and practical application.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1 max-w-lg">
                <div
                  className="relative bg-muted rounded-lg overflow-hidden card-hover group"
                  style={{ aspectRatio: '16/9', width: '100%', minHeight: '250px' }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="section-separator mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center bg-card border border-border rounded-lg p-6 card-hover"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Experience the Difference
            </h3>
            <p className="text-muted-foreground mb-6">
              These features aren't just nice-to-haves – they're game-changers that will accelerate your learning and ensure you master ChatLLM faster than ever before.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                ⚡ 3x Faster Learning
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                🎯 100% Practical
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                🚀 Career Ready
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
