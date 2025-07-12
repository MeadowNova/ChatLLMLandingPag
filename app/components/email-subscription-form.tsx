
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Mail, Loader2, Check, User, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailSubscriptionFormProps {
  placeholder?: string
  source?: string
  className?: string
  enhanced?: boolean // New prop to show enhanced form
}

export function EmailSubscriptionForm({
  placeholder = "Enter your email to secure your spot",
  source = "general",
  className,
  enhanced = false
}: EmailSubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [experience, setExperience] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleInterestChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (enhanced && !name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: enhanced ? name : undefined,
          source,
          experience: enhanced ? experience : undefined,
          interests: enhanced ? interests : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }

      setIsSuccess(true)
      setEmail('')
      setName('')
      setExperience('')
      setInterests([])

      toast({
        title: "Successfully subscribed!",
        description: data.message || "Thanks for joining our community.",
      })

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)

    } catch (error) {
      console.error('Subscription error:', error)
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={cn("flex items-center justify-center p-4 bg-primary/10 rounded-lg", className)}>
        <Check className="w-5 h-5 text-primary mr-2" />
        <span className="text-primary font-medium">Successfully subscribed!</span>
      </div>
    )
  }

  if (enhanced) {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-11"
            disabled={isLoading}
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11"
            disabled={isLoading}
            required
          />
        </div>

        {/* Experience Level */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full pl-10 h-11 bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="">Select your experience level</option>
            <option value="beginner">Complete Beginner</option>
            <option value="some-experience">Some Tech Experience</option>
            <option value="experienced">Experienced Developer</option>
            <option value="business-owner">Business Owner/Entrepreneur</option>
          </select>
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">What interests you most? (Select all that apply)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Building chatbots for SMBs',
              'Starting a chatbot agency',
              'Learning AI/ML technologies',
              'Scaling an existing business',
              'Freelancing opportunities',
              'Passive income streams'
            ].map((interest) => (
              <label key={interest} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="rounded border-input"
                  disabled={isLoading}
                />
                <span className="text-muted-foreground">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          {isLoading ? 'Securing Your Spot...' : 'Secure My Exclusive Spot'}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-11"
          disabled={isLoading}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 px-6"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  )
}
