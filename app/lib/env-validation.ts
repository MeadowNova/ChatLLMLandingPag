/**
 * Environment Variable Validation
 * 
 * This utility validates that all required environment variables are present
 * and properly formatted for production deployment.
 */

interface RequiredEnvVars {
  DATABASE_URL: string
  NEXTAUTH_SECRET: string
  NEXTAUTH_URL: string
  NODE_ENV: string
}

interface OptionalEnvVars {
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
  NEXT_PUBLIC_FB_PIXEL_ID?: string
  SMTP_HOST?: string
  SMTP_PORT?: string
  SMTP_USER?: string
  SMTP_PASS?: string
}

type EnvVars = RequiredEnvVars & OptionalEnvVars

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  envVars: Partial<EnvVars>
}

export function validateEnvironmentVariables(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const envVars: Partial<EnvVars> = {}

  // Required variables
  const requiredVars: (keyof RequiredEnvVars)[] = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'NODE_ENV'
  ]

  // Check required variables
  for (const varName of requiredVars) {
    const value = process.env[varName]
    if (!value) {
      errors.push(`Missing required environment variable: ${varName}`)
    } else {
      envVars[varName] = value as any
    }
  }

  // Validate specific formats
  if (envVars.DATABASE_URL) {
    if (!envVars.DATABASE_URL.startsWith('postgres://') && !envVars.DATABASE_URL.startsWith('postgresql://')) {
      errors.push('DATABASE_URL must be a valid PostgreSQL connection string')
    }
    
    if (process.env.NODE_ENV === 'production' && !envVars.DATABASE_URL.includes('sslmode=require')) {
      warnings.push('DATABASE_URL should include sslmode=require for production')
    }
  }

  if (envVars.NEXTAUTH_SECRET) {
    if (envVars.NEXTAUTH_SECRET.length < 32) {
      errors.push('NEXTAUTH_SECRET must be at least 32 characters long')
    }
    
    if (envVars.NEXTAUTH_SECRET === 'your-secret-key-here' || envVars.NEXTAUTH_SECRET === 'development-secret-key-change-in-production') {
      errors.push('NEXTAUTH_SECRET must be changed from default value')
    }
  }

  if (envVars.NEXTAUTH_URL) {
    try {
      const url = new URL(envVars.NEXTAUTH_URL)
      if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
        errors.push('NEXTAUTH_URL must use HTTPS in production')
      }
    } catch {
      errors.push('NEXTAUTH_URL must be a valid URL')
    }
  }

  if (envVars.NODE_ENV && !['development', 'production', 'test'].includes(envVars.NODE_ENV)) {
    errors.push('NODE_ENV must be one of: development, production, test')
  }

  // Check optional but recommended variables
  const optionalVars: (keyof OptionalEnvVars)[] = [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_FB_PIXEL_ID'
  ]

  for (const varName of optionalVars) {
    const value = process.env[varName]
    if (value) {
      envVars[varName] = value as any
    }
  }

  // Validate analytics IDs
  if (envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    if (!envVars.NEXT_PUBLIC_GA_MEASUREMENT_ID.match(/^G-[A-Z0-9]+$/)) {
      warnings.push('NEXT_PUBLIC_GA_MEASUREMENT_ID should match format G-XXXXXXXXXX')
    }
  } else {
    warnings.push('NEXT_PUBLIC_GA_MEASUREMENT_ID not set - analytics will not work')
  }

  if (envVars.NEXT_PUBLIC_FB_PIXEL_ID) {
    if (!envVars.NEXT_PUBLIC_FB_PIXEL_ID.match(/^\d+$/)) {
      warnings.push('NEXT_PUBLIC_FB_PIXEL_ID should be numeric')
    }
  } else {
    warnings.push('NEXT_PUBLIC_FB_PIXEL_ID not set - Facebook tracking will not work')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    envVars: envVars as EnvVars
  }
}

export function logValidationResults(result: ValidationResult): void {
  if (result.valid) {
    console.log('✅ Environment variables validation passed')
  } else {
    console.error('❌ Environment variables validation failed')
    result.errors.forEach(error => console.error(`  - ${error}`))
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Environment variables warnings:')
    result.warnings.forEach(warning => console.warn(`  - ${warning}`))
  }
}

export function getRequiredEnvVars(): RequiredEnvVars {
  const result = validateEnvironmentVariables()
  
  if (!result.valid) {
    logValidationResults(result)
    throw new Error('Environment validation failed')
  }

  return result.envVars as RequiredEnvVars
}

// Runtime validation for Next.js
export function validateAtRuntime(): void {
  if (typeof window === 'undefined') {
    // Server-side validation
    const result = validateEnvironmentVariables()
    
    if (!result.valid) {
      console.error('🚨 Server environment validation failed:')
      logValidationResults(result)
      
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Production environment validation failed')
      }
    } else if (result.warnings.length > 0) {
      logValidationResults(result)
    }
  }
}
