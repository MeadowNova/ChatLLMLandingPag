#!/usr/bin/env tsx
/**
 * Production Environment Variables Generator
 * 
 * This script generates secure environment variables for production deployment
 * and provides validation for required variables.
 */

import { randomBytes } from 'crypto'
import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface EnvConfig {
  // Database
  DATABASE_URL?: string
  
  // Authentication
  NEXTAUTH_SECRET: string
  NEXTAUTH_URL: string
  
  // Application
  NODE_ENV: string
  
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
  NEXT_PUBLIC_FB_PIXEL_ID?: string
  
  // Optional Email
  SMTP_HOST?: string
  SMTP_PORT?: string
  SMTP_USER?: string
  SMTP_PASS?: string
}

function generateSecureSecret(length: number = 32): string {
  return randomBytes(length).toString('base64')
}

function generateProductionEnvVars(customDomain: string): EnvConfig {
  return {
    // Database - will be provided by Vercel Postgres
    DATABASE_URL: 'postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
    
    // Authentication
    NEXTAUTH_SECRET: generateSecureSecret(32),
    NEXTAUTH_URL: `https://${customDomain}`,
    
    // Application
    NODE_ENV: 'production',
    
    // Analytics (placeholders - update with real values)
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
    NEXT_PUBLIC_FB_PIXEL_ID: '000000000000000'
  }
}

function validateEnvVars(envVars: EnvConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Required variables
  if (!envVars.NEXTAUTH_SECRET || envVars.NEXTAUTH_SECRET.length < 32) {
    errors.push('NEXTAUTH_SECRET must be at least 32 characters long')
  }
  
  if (!envVars.NEXTAUTH_URL || !envVars.NEXTAUTH_URL.startsWith('https://')) {
    errors.push('NEXTAUTH_URL must be a valid HTTPS URL')
  }
  
  if (!envVars.NODE_ENV || envVars.NODE_ENV !== 'production') {
    errors.push('NODE_ENV must be set to "production"')
  }
  
  // Optional but recommended
  if (!envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID || envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('⚠️  Warning: Google Analytics ID not configured')
  }
  
  if (!envVars.NEXT_PUBLIC_FB_PIXEL_ID || envVars.NEXT_PUBLIC_FB_PIXEL_ID === '000000000000000') {
    console.warn('⚠️  Warning: Facebook Pixel ID not configured')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

function formatEnvFile(envVars: EnvConfig): string {
  return `# Production Environment Variables
# Generated on ${new Date().toISOString()}
# 
# IMPORTANT: These are example values. Update with your actual production values.
# Never commit actual production secrets to version control.

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================
# This will be automatically provided by Vercel Postgres
DATABASE_URL="${envVars.DATABASE_URL}"

# =============================================================================
# NEXTAUTH CONFIGURATION
# =============================================================================
NEXTAUTH_SECRET="${envVars.NEXTAUTH_SECRET}"
NEXTAUTH_URL="${envVars.NEXTAUTH_URL}"

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NODE_ENV="${envVars.NODE_ENV}"

# =============================================================================
# ANALYTICS CONFIGURATION
# =============================================================================
# Update these with your actual analytics IDs
NEXT_PUBLIC_GA_MEASUREMENT_ID="${envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID}"
NEXT_PUBLIC_FB_PIXEL_ID="${envVars.NEXT_PUBLIC_FB_PIXEL_ID}"

# =============================================================================
# OPTIONAL: EMAIL SERVICE (for future use)
# =============================================================================
# SMTP_HOST=""
# SMTP_PORT=""
# SMTP_USER=""
# SMTP_PASS=""
`
}

function createVercelEnvCommands(envVars: EnvConfig): string {
  const commands = [
    '# Vercel CLI commands to set environment variables',
    '# Run these commands to set production environment variables',
    '',
    'vercel env add DATABASE_URL production',
    `# Enter: ${envVars.DATABASE_URL}`,
    '',
    'vercel env add NEXTAUTH_SECRET production',
    `# Enter: ${envVars.NEXTAUTH_SECRET}`,
    '',
    'vercel env add NEXTAUTH_URL production',
    `# Enter: ${envVars.NEXTAUTH_URL}`,
    '',
    'vercel env add NODE_ENV production',
    `# Enter: ${envVars.NODE_ENV}`,
    '',
    'vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production',
    `# Enter: ${envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID}`,
    '',
    'vercel env add NEXT_PUBLIC_FB_PIXEL_ID production',
    `# Enter: ${envVars.NEXT_PUBLIC_FB_PIXEL_ID}`,
    ''
  ]
  
  return commands.join('\n')
}

async function main() {
  console.log('🔐 Generating production environment variables...')
  
  // Get custom domain from command line or use placeholder
  const customDomain = process.argv[2] || 'your-custom-domain.com'
  
  if (customDomain === 'your-custom-domain.com') {
    console.log('💡 Usage: npm run generate-env-vars your-domain.com')
    console.log('💡 Using placeholder domain. Update NEXTAUTH_URL manually.')
  }
  
  // Generate environment variables
  const envVars = generateProductionEnvVars(customDomain)
  
  // Validate
  const validation = validateEnvVars(envVars)
  if (!validation.valid) {
    console.error('❌ Validation failed:')
    validation.errors.forEach(error => console.error(`  - ${error}`))
    process.exit(1)
  }
  
  // Create files
  const envContent = formatEnvFile(envVars)
  const commandsContent = createVercelEnvCommands(envVars)
  
  // Write files
  writeFileSync('.env.production.example', envContent)
  writeFileSync('vercel-env-commands.sh', commandsContent)
  
  console.log('✅ Environment variables generated successfully!')
  console.log('')
  console.log('📁 Files created:')
  console.log('  - .env.production.example (example production env file)')
  console.log('  - vercel-env-commands.sh (Vercel CLI commands)')
  console.log('')
  console.log('🔑 Generated NEXTAUTH_SECRET:')
  console.log(`  ${envVars.NEXTAUTH_SECRET}`)
  console.log('')
  console.log('📋 Next steps:')
  console.log('1. Update analytics IDs in .env.production.example')
  console.log('2. Set environment variables in Vercel Dashboard')
  console.log('3. Or run: chmod +x vercel-env-commands.sh && ./vercel-env-commands.sh')
  console.log('4. Update DATABASE_URL with actual Vercel Postgres connection string')
}

// Export for use in other scripts
export { generateProductionEnvVars, validateEnvVars, generateSecureSecret }

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
