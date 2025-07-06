
export interface EmailSubscriber {
  id: string
  email: string
  name?: string | null
  signupDate: Date
  source: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionResponse {
  message: string
  subscriber?: {
    id: string
    email: string
    status: string
  }
  error?: string
  details?: any[]
}

export interface CourseModule {
  number: string
  title: string
  description: string
  duration: string
  lessons: number
  projects: number
  highlights: string[]
}

export interface Testimonial {
  name: string
  role: string
  image: string
  rating: number
  content: string
  highlight: string
}

export interface Feature {
  title: string
  description: string
  image: string
  icon: any
  benefits: string[]
}

export interface FAQ {
  question: string
  answer: string
}
