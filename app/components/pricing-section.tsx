
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { EmailSubscriptionForm } from '@/components/email-subscription-form'
import { Check, Star, Clock, Award, Users, Infinity } from 'lucide-react'

const features = [
  'Complete 5-module curriculum (45+ hours)',
  '69 HD video lessons (Coming Soon)',
  '19 hands-on projects with real datasets',
  'Custom AI assistant for personalized guidance',
  'Abacus.AI platform access and training',
  'Downloadable resources and code templates',
  'Expert community access',
  'Lifetime access to all materials',
  'Future course updates included',
  '30-day money-back guarantee',
  'Priority support from instructors'
]

const bonuses = [
  {
    title: 'AI Career Roadmap',
    value: '$197',
    description: 'Exclusive guide to breaking into AI roles'
  },
  {
    title: 'LLM Interview Prep',
    value: '$147',
    description: 'Common questions and expert answers'
  },
  {
    title: 'Industry Connections',
    value: '$297',
    description: 'Network with hiring managers and experts'
  }
]

// Pricing section removed as per user request
export function PricingSection() {
  return null;
}
