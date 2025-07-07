
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Mail, Loader2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailSubscriptionFormProps {
  placeholder?: string
  source?: string
  className?: string
}

export function EmailSubscriptionForm({ 
  placeholder = "JOIN THE WAITLIST TODAY!", 
  source = "general",
  className 
}: EmailSubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "JOIN THE WAITLIST TODAY! Please enter a valid email address.",
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
          source,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }

      setIsSuccess(true)
      setEmail('')
      
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
