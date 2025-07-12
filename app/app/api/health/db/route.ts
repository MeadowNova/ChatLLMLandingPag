import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test basic database connectivity
    await prisma.$queryRaw`SELECT 1 as test`
    
    // Test table access (check if our main table exists)
    const subscriberCount = await prisma.waitlistSubscriber.count()
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Database connected successfully',
      timestamp: new Date().toISOString(),
      data: {
        subscriberCount,
        environment: process.env.NODE_ENV,
        hasDatabase: true
      }
    })
  } catch (error) {
    console.error('Database health check failed:', error)

    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
        error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : 'Database error',
        data: {
          hasDatabase: false,
          environment: process.env.NODE_ENV
        }
      },
      { status: 500 }
    )
  }
}

// Optional: Add a simple health check that doesn't require database
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
