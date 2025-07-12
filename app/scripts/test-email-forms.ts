#!/usr/bin/env tsx

// Email subscription form testing script
// Run with: npx tsx scripts/test-email-forms.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface TestCase {
  name: string
  data: any
  expectedStatus: number
  expectedSuccess: boolean
}

class EmailFormTester {
  private baseUrl: string
  private testResults: Array<{ name: string; passed: boolean; error?: string }> = []

  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl
  }

  async runAllTests() {
    console.log('🧪 Starting Email Subscription Form Tests...\n')

    // Test cases
    const testCases: TestCase[] = [
      {
        name: 'Valid basic email subscription',
        data: {
          email: 'test@example.com',
          source: 'test'
        },
        expectedStatus: 200,
        expectedSuccess: true
      },
      {
        name: 'Valid enhanced subscription with full data',
        data: {
          email: 'enhanced@example.com',
          name: 'John Doe',
          company: 'Test Company',
          experienceLevel: 'SOME_AI_TECH_EXPERIENCE',
          interests: ['Starting AI Agency', 'Technical Skills'],
          source: 'test_enhanced'
        },
        expectedStatus: 200,
        expectedSuccess: true
      },
      {
        name: 'Invalid email format',
        data: {
          email: 'invalid-email',
          source: 'test'
        },
        expectedStatus: 400,
        expectedSuccess: false
      },
      {
        name: 'Missing email field',
        data: {
          source: 'test'
        },
        expectedStatus: 400,
        expectedSuccess: false
      },
      {
        name: 'Duplicate email subscription',
        data: {
          email: 'test@example.com', // Same as first test
          source: 'test_duplicate'
        },
        expectedStatus: 409,
        expectedSuccess: false
      },
      {
        name: 'Valid subscription with firstName and lastName',
        data: {
          email: 'names@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          experienceLevel: 'COMPLETE_BEGINNER',
          source: 'test_names'
        },
        expectedStatus: 200,
        expectedSuccess: true
      }
    ]

    // Clean up test data before starting
    await this.cleanupTestData()

    // Run each test case
    for (const testCase of testCases) {
      await this.runTest(testCase)
    }

    // Test database integrity
    await this.testDatabaseIntegrity()

    // Generate report
    this.generateReport()

    // Clean up test data after tests
    await this.cleanupTestData()
  }

  private async runTest(testCase: TestCase) {
    console.log(`Testing: ${testCase.name}`)
    
    try {
      const response = await fetch(`${this.baseUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data),
      })

      const responseData = await response.json()

      // Check status code
      if (response.status !== testCase.expectedStatus) {
        throw new Error(`Expected status ${testCase.expectedStatus}, got ${response.status}`)
      }

      // Check success field
      if (responseData.success !== testCase.expectedSuccess) {
        throw new Error(`Expected success ${testCase.expectedSuccess}, got ${responseData.success}`)
      }

      // Additional validations for successful cases
      if (testCase.expectedSuccess) {
        if (!responseData.message) {
          throw new Error('Missing success message')
        }

        // Verify data was saved to database
        const subscriber = await prisma.waitlistSubscriber.findUnique({
          where: { email: testCase.data.email }
        })

        if (!subscriber) {
          throw new Error('Subscriber not found in database')
        }

        // Validate saved data
        if (subscriber.email !== testCase.data.email) {
          throw new Error('Email mismatch in database')
        }

        if (testCase.data.firstName && subscriber.firstName !== testCase.data.firstName) {
          throw new Error('FirstName mismatch in database')
        }

        if (testCase.data.lastName && subscriber.lastName !== testCase.data.lastName) {
          throw new Error('LastName mismatch in database')
        }
      }

      this.testResults.push({ name: testCase.name, passed: true })
      console.log(`✅ ${testCase.name} - PASSED\n`)

    } catch (error) {
      this.testResults.push({ 
        name: testCase.name, 
        passed: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      console.log(`❌ ${testCase.name} - FAILED: ${error}\n`)
    }
  }

  private async testDatabaseIntegrity() {
    console.log('Testing: Database integrity')
    
    try {
      // Test database connection
      await prisma.$connect()

      // Test basic queries
      const count = await prisma.waitlistSubscriber.count()
      console.log(`Database contains ${count} subscribers`)

      // Test that all required fields are accessible
      const sample = await prisma.waitlistSubscriber.findFirst()
      if (sample) {
        const requiredFields = ['id', 'email', 'createdAt', 'updatedAt']
        for (const field of requiredFields) {
          if (!(field in sample)) {
            throw new Error(`Missing required field: ${field}`)
          }
        }
      }

      this.testResults.push({ name: 'Database integrity', passed: true })
      console.log('✅ Database integrity - PASSED\n')

    } catch (error) {
      this.testResults.push({ 
        name: 'Database integrity', 
        passed: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      console.log(`❌ Database integrity - FAILED: ${error}\n`)
    }
  }

  private async cleanupTestData() {
    try {
      // Delete test subscribers
      await prisma.waitlistSubscriber.deleteMany({
        where: {
          OR: [
            { email: { contains: '@example.com' } },
            { source: { startsWith: 'test' } }
          ]
        }
      })
      console.log('🧹 Test data cleaned up')
    } catch (error) {
      console.warn('Warning: Could not clean up test data:', error)
    }
  }

  private generateReport() {
    console.log('\n📊 Test Results Summary')
    console.log('=' .repeat(50))

    const passed = this.testResults.filter(r => r.passed).length
    const failed = this.testResults.filter(r => !r.passed).length
    const total = this.testResults.length

    console.log(`Total Tests: ${total}`)
    console.log(`Passed: ${passed}`)
    console.log(`Failed: ${failed}`)
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`)

    if (failed > 0) {
      console.log('\n❌ Failed Tests:')
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => console.log(`  - ${r.name}: ${r.error}`))
    }

    if (passed === total) {
      console.log('\n🎉 All tests passed! Email subscription forms are working correctly.')
    } else {
      console.log('\n⚠️ Some tests failed. Please review and fix the issues.')
    }
  }
}

// Check if server is running
async function checkServerStatus(url: string): Promise<boolean> {
  try {
    const response = await fetch(url)
    return response.status < 500
  } catch {
    return false
  }
}

// Main execution
async function main() {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
  
  console.log(`Checking server status at ${baseUrl}...`)
  const isServerRunning = await checkServerStatus(baseUrl)
  
  if (!isServerRunning) {
    console.error('❌ Server is not running. Please start the development server with:')
    console.error('   npm run dev')
    process.exit(1)
  }

  console.log('✅ Server is running\n')

  const tester = new EmailFormTester(baseUrl)
  await tester.runAllTests()
  
  await prisma.$disconnect()
}

main().catch(console.error)
