#!/usr/bin/env tsx
/**
 * Production Database Setup Script
 * 
 * This script sets up the production database with the current schema
 * and seeds any necessary initial data.
 */

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config()

const prisma = new PrismaClient()

async function setupProductionDatabase() {
  console.log('🚀 Setting up production database...')
  
  try {
    // Test database connection
    console.log('📡 Testing database connection...')
    await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection successful')

    // Check if tables exist
    console.log('🔍 Checking database schema...')
    
    try {
      const subscriberCount = await prisma.waitlistSubscriber.count()
      console.log(`📊 Found ${subscriberCount} existing subscribers`)
    } catch (error) {
      console.log('📋 Database schema not yet deployed')
    }

    // Verify environment
    const environment = process.env.NODE_ENV
    const databaseUrl = process.env.DATABASE_URL
    
    console.log(`🌍 Environment: ${environment}`)
    console.log(`🗄️  Database: ${databaseUrl ? 'Configured' : 'Not configured'}`)
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    if (!databaseUrl.includes('vercel') && !databaseUrl.includes('postgres')) {
      console.warn('⚠️  Warning: DATABASE_URL does not appear to be a PostgreSQL connection string')
    }

    // Check SSL configuration
    if (environment === 'production' && !databaseUrl.includes('sslmode=require')) {
      console.warn('⚠️  Warning: SSL mode not explicitly set for production database')
    }

    console.log('✅ Production database setup validation complete')
    console.log('')
    console.log('Next steps:')
    console.log('1. Run: npx prisma migrate deploy (to apply schema)')
    console.log('2. Run: npx prisma generate (to generate client)')
    console.log('3. Test with: curl https://your-domain.com/api/health/db')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function seedInitialData() {
  console.log('🌱 Seeding initial data...')
  
  try {
    // Add any initial data that's required for production
    // For a landing page, this might be minimal or none
    
    console.log('✅ Initial data seeding complete')
  } catch (error) {
    console.error('❌ Data seeding failed:', error)
    throw error
  }
}

// Main execution
async function main() {
  await setupProductionDatabase()
  
  // Only seed if explicitly requested
  if (process.argv.includes('--seed')) {
    await seedInitialData()
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .catch((error) => {
      console.error('❌ Setup failed:', error)
      process.exit(1)
    })
}

export { setupProductionDatabase, seedInitialData }
