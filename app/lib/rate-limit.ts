import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(
  request: NextRequest,
  limit: number = 5,
  windowMs: number = 60000 // 1 minute
): { success: boolean; remaining: number; resetTime: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
  const key = `${ip}:${request.nextUrl.pathname}`
  const now = Date.now()

  // Clean up expired entries
  if (store[key] && now > store[key].resetTime) {
    delete store[key]
  }

  // Initialize or get current count
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetTime: now + windowMs
    }
  }

  const current = store[key]
  
  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: current.resetTime
    }
  }

  current.count++
  
  return {
    success: true,
    remaining: limit - current.count,
    resetTime: current.resetTime
  }
}
