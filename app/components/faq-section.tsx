
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What prerequisites do I need for this course?',
    answer: 'No specific AI experience required! While basic programming knowledge (Python preferred) is helpful, our course starts from fundamentals. We have students from diverse backgrounds - developers, analysts, managers, and career changers. Our AI assistant provides personalized guidance based on your current skill level.'
  },
  {
    question: 'How long does it take to complete the course?',
    answer: 'The course contains 45+ hours of content spread across 5 modules. Most students complete it in 6-12 weeks, dedicating 4-8 hours per week. You have lifetime access, so you can learn at your own pace. Our AI assistant helps you stay on track with personalized scheduling recommendations.'
  },
  {
    question: 'What makes this course different from free online resources?',
    answer: 'Unlike scattered free resources, our course offers: (1) Structured curriculum designed by AI experts, (2) Custom AI assistant for 24/7 personalized guidance, (3) Hands-on projects with real datasets, (4) Abacus.AI platform access worth $500/month, (5) Expert community and mentorship, (6) Industry-recognized certification, and (7) Lifetime updates.'
  },
  {
    question: 'Will I get a certificate upon completion?',
    answer: 'Yes! You\'ll receive an industry-recognized completion certificate from Abacus.AI. This certificate demonstrates your proficiency in ChatLLM technologies and is valued by employers in the AI field. Many of our graduates have used this certificate to land roles at top tech companies.'
  },
  {
    question: 'What if I\'m not satisfied with the course?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied within the first 30 days, we\'ll refund your full payment, no questions asked. We\'re confident in our course quality - over 95% of our students complete the course and rate it 4.5+ stars.'
  },
  {
    question: 'Do I get access to the Abacus.AI platform?',
    answer: 'Absolutely! The course includes full access to the Abacus.AI platform (normally $500/month) for the duration of your learning. You\'ll learn to use the same enterprise-grade tools used by Fortune 500 companies, giving you real-world, production-ready skills.'
  },
  {
    question: 'How does the AI assistant work?',
    answer: 'Our custom AI assistant is integrated throughout the course. It answers your questions instantly, provides code reviews, suggests learning paths based on your progress, and offers personalized feedback. It\'s like having a personal AI mentor available 24/7 to accelerate your learning.'
  },
  {
    question: 'Can I access the course on mobile devices?',
    answer: 'Yes! The course is fully responsive and works on all devices - desktop, tablet, and mobile. You can watch videos, read materials, and even work on some projects from your phone. Progress syncs across all devices so you can learn anywhere, anytime.'
  },
  {
    question: 'What career opportunities will this course prepare me for?',
    answer: 'This course prepares you for high-demand roles like: AI Engineer, ML Engineer, ChatBot Developer, LLM Specialist, AI Product Manager, and AI Consultant. Our graduates work at companies like Google, Microsoft, OpenAI, and leading AI startups. The average salary increase is $25,000+ within 6 months.'
  },
  {
    question: 'How often is the course content updated?',
    answer: 'The AI field evolves rapidly, so we update our course content quarterly. As a lifetime member, you\'ll automatically receive all updates at no extra cost. This ensures you\'re always learning the latest techniques and best practices in ChatLLM development.'
  }
]

export function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="faq" className="py-20 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the ChatLLM Master Course. 
            Can't find the answer you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:bg-card/80"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-foreground font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team and AI assistant are here to help. Get answers to your specific questions 
              about the course content, technical requirements, or career guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <span className="text-sm text-primary font-medium">📧 Email Support</span>
              <span className="text-sm text-primary font-medium">💬 Live Chat</span>
              <span className="text-sm text-primary font-medium">🤖 AI Assistant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
