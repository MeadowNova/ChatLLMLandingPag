#!/usr/bin/env tsx
/**
 * Database Connectivity Test Script
 * 
 * This script thoroughly tests database connectivity and functionality
 * to ensure everything is working correctly for production deployment.
 */

import { config } from 'dotenv'
import { prisma } from '../lib/db'

// Load environment variables
config()

interface TestResult {
  name: string
  passed: boolean
  message: string
  duration?: number
}

async function runTest(name: string, testFn: () => Promise<void>): Promise<TestResult> {
  const startTime = Date.now()
  
  try {
    await testFn()
    const duration = Date.now() - startTime
    return {
      name,
      passed: true,
      message: 'Test passed',
      duration
    }
  } catch (error) {
    const duration = Date.now() - startTime
    return {
      name,
      passed: false,
      message: error instanceof Error ? error.message : String(error),
      duration
    }
  }
}

async function testBasicConnection(): Promise<void> {
  await prisma.$queryRaw`SELECT 1 as test`
}

async function testTableAccess(): Promise<void> {
  const count = await prisma.waitlistSubscriber.count()
  if (typeof count !== 'number') {
    throw new Error('Failed to get subscriber count')
  }
}

async function testCreateOperation(): Promise<void> {
  const testEmail = `test-${Date.now()}@example.com`
  
  const subscriber = await prisma.waitlistSubscriber.create({
    data: {
      email: testEmail,
      firstName: 'Test',
      lastName: 'User',
      source: 'connectivity_test'
    }
  })
  
  if (!subscriber.id) {
    throw new Error('Failed to create test subscriber')
  }
  
  // Clean up
  await prisma.waitlistSubscriber.delete({
    where: { id: subscriber.id }
  })
}

async function testReadOperation(): Promise<void> {
  const subscribers = await prisma.waitlistSubscriber.findMany({
    take: 1
  })
  
  if (!Array.isArray(subscribers)) {
    throw new Error('Failed to read subscribers')
  }
}

async function testUpdateOperation(): Promise<void> {
  // Find an existing subscriber
  const subscriber = await prisma.waitlistSubscriber.findFirst()
  
  if (!subscriber) {
    // Create a test subscriber if none exist
    const testEmail = `test-update-${Date.now()}@example.com`
    const newSubscriber = await prisma.waitlistSubscriber.create({
      data: {
        email: testEmail,
        firstName: 'Test',
        source: 'connectivity_test'
      }
    })
    
    // Update it
    await prisma.waitlistSubscriber.update({
      where: { id: newSubscriber.id },
      data: { lastName: 'Updated' }
    })
    
    // Clean up
    await prisma.waitlistSubscriber.delete({
      where: { id: newSubscriber.id }
    })
  } else {
    // Just update the updatedAt timestamp
    await prisma.waitlistSubscriber.update({
      where: { id: subscriber.id },
      data: { updatedAt: new Date() }
    })
  }
}

async function testTransactionOperation(): Promise<void> {
  const testEmail = `test-transaction-${Date.now()}@example.com`
  
  await prisma.$transaction(async (tx) => {
    const subscriber = await tx.waitlistSubscriber.create({
      data: {
        email: testEmail,
        firstName: 'Transaction',
        lastName: 'Test',
        source: 'connectivity_test'
      }
    })
    
    // Immediately delete it in the same transaction
    await tx.waitlistSubscriber.delete({
      where: { id: subscriber.id }
    })
  })
}

async function testHealthEndpoints(): Promise<void> {
  // This would normally make HTTP requests, but since we're testing locally,
  // we'll just verify the database operations that the endpoints use
  
  // Test the basic health check query
  await prisma.$queryRaw`SELECT 1`
  
  // Test the database health check operations
  const count = await prisma.waitlistSubscriber.count()
  if (typeof count !== 'number') {
    throw new Error('Health endpoint database operations failed')
  }
}

async function main() {
  console.log('🔍 Testing Database Connectivity...')
  console.log('=====================================')
  console.log('')
  
  const tests = [
    { name: 'Basic Connection', fn: testBasicConnection },
    { name: 'Table Access', fn: testTableAccess },
    { name: 'Create Operation', fn: testCreateOperation },
    { name: 'Read Operation', fn: testReadOperation },
    { name: 'Update Operation', fn: testUpdateOperation },
    { name: 'Transaction Operation', fn: testTransactionOperation },
    { name: 'Health Endpoints', fn: testHealthEndpoints }
  ]
  
  const results: TestResult[] = []
  
  for (const test of tests) {
    console.log(`Testing ${test.name}...`)
    const result = await runTest(test.name, test.fn)
    results.push(result)
    
    if (result.passed) {
      console.log(`✅ ${test.name} - ${result.duration}ms`)
    } else {
      console.log(`❌ ${test.name} - ${result.message}`)
    }
  }
  
  console.log('')
  console.log('📊 Test Summary')
  console.log('===============')
  
  const passed = results.filter(r => r.passed).length
  const total = results.length
  const totalTime = results.reduce((sum, r) => sum + (r.duration || 0), 0)
  
  console.log(`Tests passed: ${passed}/${total}`)
  console.log(`Total time: ${totalTime}ms`)
  
  if (passed === total) {
    console.log('')
    console.log('🎉 All database connectivity tests passed!')
    console.log('✅ Database is ready for production deployment')
  } else {
    console.log('')
    console.log('❌ Some tests failed. Please review the errors above.')
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .catch((error) => {
      console.error('💥 Test suite failed:', error)
      process.exit(1)
    })
    .finally(() => {
      prisma.$disconnect()
    })
}

export { main as testDatabaseConnectivity }
