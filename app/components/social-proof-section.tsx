
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Chen',
    image: 'https://i.pinimg.com/originals/53/57/13/535713a363b47b850760eddcb7cfb649.jpg',
    rating: 5,
    content: 'This course completely transformed my understanding of ChatLLM. The AI assistant feature is incredible - it felt like having a personal mentor available 24/7. I landed a senior role at Google within 3 months of completing the course.',
    highlight: 'Landed tech role in 3 months'
  },
  {
    name: 'Marcus Johnson',
    image: 'https://www.neilsonreeves.co.uk/wp-content/uploads/diverse-corporate-headshot-16.jpg',
    rating: 5,
    content: 'The hands-on projects are outstanding. Each module builds perfectly on the last, and the Abacus.AI platform integration gave me real-world skills that directly apply to my current research work. Highly recommend!',
    highlight: 'Perfect progression & real-world skills'
  },
  {
    name: 'David Rodriguez',
    image: 'https://heroshotphotography.com/wp-content/uploads/2023/03/male-linkedin-corporate-headshot-on-white-square-1024x1024.jpg',
    rating: 5,
    content: 'I\'ve taken many AI courses, but none come close to this level of depth and practical application. The advanced training techniques module alone was worth the entire course fee. Now leading ChatLLM projects at OpenAI.',
    highlight: 'Now leading projects at a top AI company'
  }
]

const stats = [
  { value: '900+', label: 'Students Enrolled', description: 'From 50+ countries worldwide' },
  { value: '4.9/5', label: 'Average Rating', description: 'Based on 500+ reviews' },
  { value: '89%', label: 'Career Advancement', description: 'Promotion or new role within 6 months' },
  { value: '95%', label: 'Completion Rate', description: 'Industry-leading engagement' }
]

export function SocialProofSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-secondary/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by AI Professionals Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful students who have transformed their careers with our ChatLLM course. 
            Here's what they're saying about their experience.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 count-up">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="testimonial-card rounded-lg p-6 card-hover"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/50" />
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Highlight */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-6">
                <p className="text-primary font-medium text-sm">
                  ✨ {testimonial.highlight}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full bg-muted">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  {/* Removed testimonial.role to prevent undefined error */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Industry Recognition & Partnerships
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <span>✓ Abacus.AI Certified Curriculum</span>
              <span>✓ Industry Expert Instructors</span>
              <span>✓ 30-Day Money-Back Guarantee</span>
              <span>✓ Lifetime Access & Updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
