
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Clock, FileText, Video } from 'lucide-react'

const modules = [
  {
    number: '01',
    title: 'Foundation & Strategy',
    description: 'Master the fundamentals of AI chatbots and develop your SMB market strategy. Learn to identify opportunities and position yourself as the go-to expert.',
    duration: '9 hours',
    lessons: 12,
    projects: 3,
    highlights: [
      'SMB Market Analysis & Opportunities',
      'Chatbot Fundamentals for Business',
      'Competitive Positioning Strategy',
      'Value Proposition Development'
    ]
  },
  {
    number: '02',
    title: 'Technical Mastery',
    description: 'Build professional chatbots using Abacus.AI and other accessible platforms. Master the technical skills needed to deliver quality solutions.',
    duration: '12 hours',
    lessons: 15,
    projects: 4,
    highlights: [
      'Abacus.AI Platform Mastery',
      'No-Code Chatbot Development',
      'Integration & API Management',
      'Testing & Quality Assurance'
    ]
  },
  {
    number: '03',
    title: 'Integration & Automation',
    description: 'Connect chatbots to business systems and create automated workflows. Learn to deliver comprehensive solutions that drive real ROI.',
    duration: '10 hours',
    lessons: 13,
    projects: 4,
    highlights: [
      'CRM & Database Integration',
      'Payment Processing Setup',
      'Workflow Automation',
      'Multi-Channel Deployment'
    ]
  },
  {
    number: '04',
    title: 'Client Management',
    description: 'Master the business side: finding clients, closing deals, and delivering exceptional service. Build a sustainable chatbot agency.',
    duration: '8 hours',
    lessons: 11,
    projects: 3,
    highlights: [
      'Lead Generation Strategies',
      'Sales Process & Closing Techniques',
      'Project Management Systems',
      'Client Onboarding & Support'
    ]
  },
  {
    number: '05',
    title: 'Business Growth',
    description: 'Scale your chatbot agency with advanced strategies, team building, and recurring revenue models. Build a thriving business.',
    duration: '6 hours',
    lessons: 9,
    projects: 2,
    highlights: [
      'Scaling & Team Building',
      'Recurring Revenue Models',
      'Advanced Marketing Strategies',
      'Business Operations & Systems'
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
            Complete Business-in-a-Box System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the complete system to build and scale your AI chatbot agency for SMBs.
            Each module builds upon the previous one to create a profitable, sustainable business.
          </p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">45+ Hours Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">60 Video Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">16 Real SMB Projects</span>
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
            By the end of this course, you'll have a complete chatbot agency business with proven templates,
            client acquisition systems, and the technical skills to serve SMBs profitably and confidently.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
