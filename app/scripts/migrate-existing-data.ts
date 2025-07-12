#!/usr/bin/env tsx
/**
 * Data Migration Script for Enhanced Schema
 * 
 * This script migrates existing data to the enhanced schema format
 * while preserving backward compatibility.
 */

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config()

const prisma = new PrismaClient()

interface LegacySubscriber {
  id: string
  email: string
  name?: string | null
  experience?: string | null
  legacyInterests?: string[]
  signupDate: Date
  source: string
  status: string
  createdAt: Date
  updatedAt: Date
}

async function migrateExistingData() {
  console.log('🔄 Starting data migration for enhanced schema...')
  
  try {
    // Get all existing subscribers
    const existingSubscribers = await prisma.waitlistSubscriber.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        experience: true,
        legacyInterests: true,
        signupDate: true,
        source: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    })

    console.log(`📊 Found ${existingSubscribers.length} existing subscribers to migrate`)

    if (existingSubscribers.length === 0) {
      console.log('✅ No existing data to migrate')
      return
    }

    // Migrate each subscriber
    for (const subscriber of existingSubscribers) {
      await migrateSubscriber(subscriber as LegacySubscriber)
    }

    // Create default interests and tags
    await createDefaultInterestsAndTags()

    console.log('✅ Data migration completed successfully')
    
  } catch (error) {
    console.error('❌ Data migration failed:', error)
    throw error
  }
}

async function migrateSubscriber(subscriber: LegacySubscriber) {
  console.log(`🔄 Migrating subscriber: ${subscriber.email}`)
  
  try {
    // Parse name into firstName and lastName
    const { firstName, lastName } = parseName(subscriber.name || undefined)

    // Map experience to enum
    const experienceLevel = mapExperienceLevel(subscriber.experience || undefined)
    
    // Update subscriber with enhanced fields
    await prisma.waitlistSubscriber.update({
      where: { id: subscriber.id },
      data: {
        firstName,
        lastName,
        experienceLevel,
        legacyInterests: subscriber.legacyInterests || [],
        // Set default values for new fields
        emailConsent: true,
        marketingConsent: true,
        unsubscribed: false,
        segment: 'waitlist',
        emailOpenCount: 0,
        emailClickCount: 0,
        isConverted: false
      }
    })
    
    console.log(`✅ Migrated: ${subscriber.email}`)
    
  } catch (error) {
    console.error(`❌ Failed to migrate ${subscriber.email}:`, error)
    // Continue with other subscribers
  }
}

function parseName(fullName?: string): { firstName?: string; lastName?: string } {
  if (!fullName) return { firstName: undefined, lastName: undefined }
  
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: undefined }
  } else if (parts.length >= 2) {
    return { 
      firstName: parts[0], 
      lastName: parts.slice(1).join(' ') 
    }
  }
  
  return { firstName: fullName, lastName: undefined }
}

function mapExperienceLevel(experience?: string): 'COMPLETE_BEGINNER' | 'SOME_AI_TECH_EXPERIENCE' | 'EXPERIENCED_PROFESSIONAL' | undefined {
  if (!experience) return undefined
  
  const exp = experience.toLowerCase()
  
  if (exp.includes('beginner') || exp.includes('new') || exp.includes('none')) {
    return 'COMPLETE_BEGINNER'
  } else if (exp.includes('some') || exp.includes('intermediate') || exp.includes('basic')) {
    return 'SOME_AI_TECH_EXPERIENCE'
  } else if (exp.includes('experienced') || exp.includes('advanced') || exp.includes('expert')) {
    return 'EXPERIENCED_PROFESSIONAL'
  }
  
  // Default to some experience if unclear
  return 'SOME_AI_TECH_EXPERIENCE'
}

async function createDefaultInterestsAndTags() {
  console.log('🏷️  Creating default interests and tags...')
  
  // Default interests for ChatLLM course
  const defaultInterests = [
    { name: 'AI Fundamentals', description: 'Basic AI and machine learning concepts' },
    { name: 'ChatGPT Mastery', description: 'Advanced ChatGPT techniques and prompting' },
    { name: 'Business Applications', description: 'Using AI for business and productivity' },
    { name: 'Content Creation', description: 'AI-powered content and copywriting' },
    { name: 'Automation', description: 'AI workflow automation and tools' },
    { name: 'Programming', description: 'AI-assisted coding and development' }
  ]
  
  // Default tags for segmentation
  const defaultTags = [
    { name: 'Early Bird', description: 'Early course subscribers', color: '#10b981' },
    { name: 'VIP', description: 'VIP subscribers', color: '#f59e0b' },
    { name: 'Regular', description: 'Regular subscribers', color: '#3b82f6' },
    { name: 'Engaged', description: 'Highly engaged users', color: '#8b5cf6' },
    { name: 'Converted', description: 'Purchased the course', color: '#ef4444' }
  ]
  
  // Create interests (skip if already exist)
  for (const interest of defaultInterests) {
    try {
      await prisma.interest.upsert({
        where: { name: interest.name },
        update: {},
        create: interest
      })
    } catch (error) {
      console.log(`Interest "${interest.name}" already exists`)
    }
  }
  
  // Create tags (skip if already exist)
  for (const tag of defaultTags) {
    try {
      await prisma.tag.upsert({
        where: { name: tag.name },
        update: {},
        create: tag
      })
    } catch (error) {
      console.log(`Tag "${tag.name}" already exists`)
    }
  }
  
  console.log('✅ Default interests and tags created')
}

async function validateMigration() {
  console.log('🔍 Validating migration...')
  
  try {
    // Check subscriber count
    const subscriberCount = await prisma.waitlistSubscriber.count()
    console.log(`📊 Total subscribers: ${subscriberCount}`)
    
    // Check interests count
    const interestCount = await prisma.interest.count()
    console.log(`🏷️  Total interests: ${interestCount}`)
    
    // Check tags count
    const tagCount = await prisma.tag.count()
    console.log(`🏷️  Total tags: ${tagCount}`)
    
    // Check for any subscribers with empty emails
    const subscribersWithEmptyEmail = await prisma.waitlistSubscriber.count({
      where: { email: "" }
    })

    if (subscribersWithEmptyEmail > 0) {
      console.warn(`⚠️  Warning: ${subscribersWithEmptyEmail} subscribers with empty email`)
    }
    
    console.log('✅ Migration validation completed')
    
  } catch (error) {
    console.error('❌ Migration validation failed:', error)
    throw error
  }
}

// Main execution
async function main() {
  try {
    await migrateExistingData()
    await validateMigration()
    
    console.log('')
    console.log('🎉 Enhanced schema migration completed successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Test the enhanced features in your application')
    console.log('2. Update your forms to use the new fields')
    console.log('3. Implement analytics tracking')
    console.log('4. Set up email campaign management')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { migrateExistingData, validateMigration }
