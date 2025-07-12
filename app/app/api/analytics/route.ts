import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties } = body

    // Validate required fields
    if (!event || typeof event !== 'string') {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      )
    }

    // Extract common properties
    const {
      url,
      userAgent,
      referrer,
      timestamp,
      email,
      ...customProperties
    } = properties || {}

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Parse URL for UTM parameters
    let utmParams = {}
    if (url) {
      try {
        const urlObj = new URL(url)
        utmParams = {
          utmSource: urlObj.searchParams.get('utm_source'),
          utmMedium: urlObj.searchParams.get('utm_medium'),
          utmCampaign: urlObj.searchParams.get('utm_campaign'),
          utmTerm: urlObj.searchParams.get('utm_term'),
          utmContent: urlObj.searchParams.get('utm_content'),
        }
      } catch (error) {
        console.warn('Failed to parse URL for UTM parameters:', error)
      }
    }

    // Handle different event types
    switch (event) {
      case 'page_view':
        await handlePageView({
          url,
          userAgent,
          referrer,
          ipAddress: ip,
          timestamp,
          ...utmParams,
        })
        break

      case 'email_signup':
      case 'waitlist_join':
        await handleEmailEvent(event, {
          email,
          userAgent,
          referrer,
          ipAddress: ip,
          timestamp,
          ...utmParams,
          ...customProperties,
        })
        break

      case 'chatbot_interaction':
        await handleChatbotInteraction({
          action: customProperties.action,
          userAgent,
          ipAddress: ip,
          timestamp,
          ...customProperties,
        })
        break

      case 'section_view':
        await handleSectionView({
          section: customProperties.section,
          timeSpent: customProperties.timeSpent,
          userAgent,
          ipAddress: ip,
          timestamp,
        })
        break

      default:
        // Log unknown events for debugging
        console.log('Unknown analytics event:', event, properties)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handlePageView(data: any) {
  try {
    await prisma.pageView.create({
      data: {
        page: data.url || '/',
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        referrer: data.referrer,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmTerm: data.utmTerm,
        utmContent: data.utmContent,
        viewedAt: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    })
  } catch (error) {
    console.error('Failed to save page view:', error)
  }
}

async function handleEmailEvent(eventType: string, data: any) {
  try {
    // Find or create subscriber
    if (data.email) {
      const subscriber = await prisma.waitlistSubscriber.findUnique({
        where: { email: data.email },
      })

      if (subscriber) {
        // Update subscriber with analytics data
        await prisma.waitlistSubscriber.update({
          where: { email: data.email },
          data: {
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
            referralSource: data.utmSource,
            referralMedium: data.utmMedium,
            referralCampaign: data.utmCampaign,
            lastEngagement: new Date(),
          },
        })
      }
    }

    // Also log as page view for tracking
    await handlePageView(data)
  } catch (error) {
    console.error('Failed to handle email event:', error)
  }
}

async function handleChatbotInteraction(data: any) {
  try {
    // Log chatbot interactions for analytics
    await prisma.pageView.create({
      data: {
        page: '/chatbot-interaction',
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        viewedAt: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    })
  } catch (error) {
    console.error('Failed to save chatbot interaction:', error)
  }
}

async function handleSectionView(data: any) {
  try {
    // Log section views for engagement tracking
    await prisma.pageView.create({
      data: {
        page: `/section/${data.section}`,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        viewedAt: data.timestamp ? new Date(data.timestamp) : new Date(),
      },
    })
  } catch (error) {
    console.error('Failed to save section view:', error)
  }
}
