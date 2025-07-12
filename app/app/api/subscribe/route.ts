
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  source: z.string().default('landing_page')
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = rateLimit(request, 5, 60000) // 5 requests per minute

    if (!rateLimitResult.success) {
      return NextResponse.json({
        error: 'Too many requests. Please try again later.',
        resetTime: rateLimitResult.resetTime
      }, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
        }
      })
    }

    const body = await request.json()
    
    // Validate input
    const { email, name, source } = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscriber = await prisma.emailSubscriber.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      // Update existing subscriber if inactive
      if (existingSubscriber.status === 'unsubscribed') {
        const updatedSubscriber = await prisma.emailSubscriber.update({
          where: { email },
          data: { 
            status: 'active',
            source,
            signupDate: new Date()
          }
        })
        
        return NextResponse.json({
          message: 'Welcome back! You\'ve been resubscribed to our updates.',
          subscriber: {
            id: updatedSubscriber.id,
            email: updatedSubscriber.email,
            status: updatedSubscriber.status
          }
        })
      }
      
      return NextResponse.json({
        message: 'You\'re already subscribed! Thanks for your interest.',
        subscriber: {
          id: existingSubscriber.id,
          email: existingSubscriber.email,
          status: existingSubscriber.status
        }
      })
    }

    // Create new subscriber
    const newSubscriber = await prisma.emailSubscriber.create({
      data: {
        email,
        name: name || null,
        source,
        status: 'active'
      }
    })

    return NextResponse.json({
      message: 'Successfully subscribed! We\'ll keep you updated on course developments.',
      subscriber: {
        id: newSubscriber.id,
        email: newSubscriber.email,
        status: newSubscriber.status
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Subscription error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid input',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      error: 'Failed to process subscription. Please try again.'
    }, { status: 500 })

  }
}

export async function GET() {
  try {
    const stats = await prisma.emailSubscriber.aggregate({
      _count: {
        id: true
      },
      where: {
        status: 'active'
      }
    })

    return NextResponse.json({
      totalSubscribers: stats._count.id
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({
      error: 'Failed to fetch stats'
    }, { status: 500 })

  }
}
