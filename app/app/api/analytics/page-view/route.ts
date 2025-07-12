import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, referrer, utmParams, sessionId } = body
    
    // Get client IP and user agent
    const headersList = headers()
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     request.ip || 
                     'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    
    // Create page view record
    const pageView = await prisma.pageView.create({
      data: {
        page: page || '/',
        ipAddress: ipAddress.split(',')[0].trim(), // Get first IP if multiple
        userAgent,
        referrer: referrer || null,
        utmSource: utmParams?.utm_source || null,
        utmMedium: utmParams?.utm_medium || null,
        utmCampaign: utmParams?.utm_campaign || null,
        utmTerm: utmParams?.utm_term || null,
        utmContent: utmParams?.utm_content || null,
        sessionId: sessionId || null
      }
    })
    
    return NextResponse.json({
      success: true,
      pageViewId: pageView.id
    })
    
  } catch (error) {
    console.error('Page view tracking error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track page view' 
      },
      { status: 500 }
    )
  }
}

// GET endpoint for analytics dashboard (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    const page = searchParams.get('page')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const whereClause = {
      viewedAt: {
        gte: startDate
      },
      ...(page && { page })
    }
    
    // Get page view statistics
    const [totalViews, uniqueVisitors, topPages] = await Promise.all([
      // Total page views
      prisma.pageView.count({
        where: whereClause
      }),
      
      // Unique visitors (by IP)
      prisma.pageView.groupBy({
        by: ['ipAddress'],
        where: whereClause,
        _count: true
      }).then(results => results.length),
      
      // Top pages
      prisma.pageView.groupBy({
        by: ['page'],
        where: whereClause,
        _count: {
          page: true
        },
        orderBy: {
          _count: {
            page: 'desc'
          }
        },
        take: 10
      })
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        totalViews,
        uniqueVisitors,
        topPages: topPages.map(p => ({
          page: p.page,
          views: p._count.page
        })),
        period: `${days} days`
      }
    })
    
  } catch (error) {
    console.error('Analytics retrieval error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve analytics' 
      },
      { status: 500 }
    )
  }
}
