
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Clock, FileText, Video } from 'lucide-react'

const modules = [
  {
    number: '01',
    title: 'LLM Fundamentals',
    description: 'Understanding Large Language Models, their architecture, and core concepts. Learn the foundations of transformer models and neural networks.',
    duration: '8 hours',
    lessons: 12,
    projects: 3,
    highlights: [
      'Transformer Architecture Deep Dive',
      'Attention Mechanisms Explained',
      'Neural Network Fundamentals',
      'History and Evolution of LLMs'
    ]
  },
  {
    number: '02',
    title: 'ChatLLM Implementation',
    description: 'Hands-on implementation of ChatLLM systems using modern frameworks. Build your first conversational AI from scratch.',
    duration: '10 hours',
    lessons: 15,
    projects: 4,
    highlights: [
      'Building Chat Interfaces',
      'Prompt Engineering Mastery',
      'Context Management',
      'Response Generation Techniques'
    ]
  },
  {
    number: '03',
    title: 'Advanced Training Techniques',
    description: 'Master fine-tuning, transfer learning, and optimization strategies for ChatLLM models in production environments.',
    duration: '12 hours',
    lessons: 18,
    projects: 5,
    highlights: [
      'Fine-tuning Strategies',
      'Transfer Learning',
      'Model Optimization',
      'Performance Monitoring'
    ]
  },
  {
    number: '04',
    title: 'Real-World Applications',
    description: 'Deploy ChatLLM systems in production with best practices for scalability, security, and performance optimization.',
    duration: '9 hours',
    lessons: 14,
    projects: 4,
    highlights: [
      'Production Deployment',
      'Scalability Patterns',
      'Security Best Practices',
      'Monitoring and Analytics'
    ]
  },
  {
    number: '05',
    title: 'Abacus.AI Platform Mastery',
    description: 'Master the Abacus.AI platform for enterprise-grade ChatLLM development and deployment with advanced features.',
    duration: '6 hours',
    lessons: 10,
    projects: 3,
    highlights: [
      'Platform Integration',
      'Enterprise Features',
      'Advanced Analytics',
      'Custom Model Deployment'
    ]
  }
]

export function CourseOverviewSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="overview" className="py-20 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Complete Course Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master ChatLLM through our comprehensive 5-module curriculum designed by AI experts. 
            Each module builds upon the previous one to ensure deep understanding.
          </p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">45+ Hours Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">69 Video Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">19 Hands-On Projects</span>
            </div>
          </div>
        </motion.div>

        {/* Modules Timeline */}
        <div className="space-y-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Module Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{module.number}</span>
                </div>
              </div>

              {/* Module Content */}
              <div className="flex-1 bg-card border border-border rounded-lg p-6 card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2 sm:mb-0">
                    {module.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>{module.lessons} lessons</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{module.projects} projects</span>
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {module.description}
                </p>

                {/* Module Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {module.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="section-separator mb-8" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            What You'll Build
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            By the end of this course, you'll have built a complete ChatLLM application, 
            deployed it to production, and gained the expertise to tackle any LLM project with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
