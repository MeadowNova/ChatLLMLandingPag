#!/usr/bin/env tsx
/**
 * Build Configuration Validator
 * 
 * This script validates that all build settings are optimized for Vercel deployment
 * and provides recommendations for improvements.
 */

import { readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'

interface BuildConfig {
  vercelConfig: any
  packageJson: any
  nextConfig: any
  prismaConfig: any
}

interface ValidationResult {
  category: string
  passed: boolean
  message: string
  recommendation?: string
}

function loadConfigurations(): BuildConfig {
  const configs: BuildConfig = {
    vercelConfig: null,
    packageJson: null,
    nextConfig: null,
    prismaConfig: null
  }
  
  try {
    if (existsSync('vercel.json')) {
      configs.vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'))
    }
    
    if (existsSync('package.json')) {
      configs.packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    }
    
    if (existsSync('next.config.js')) {
      // Read as text since it's a JS file
      configs.nextConfig = readFileSync('next.config.js', 'utf8')
    }
    
    if (existsSync('prisma/schema.prisma')) {
      configs.prismaConfig = readFileSync('prisma/schema.prisma', 'utf8')
    }
  } catch (error) {
    console.error('Error loading configurations:', error)
  }
  
  return configs
}

function validateVercelConfig(config: any): ValidationResult[] {
  const results: ValidationResult[] = []
  
  if (!config) {
    return [{
      category: 'Vercel Config',
      passed: false,
      message: 'vercel.json not found',
      recommendation: 'Create vercel.json with build configuration'
    }]
  }
  
  // Check build command
  if (config.buildCommand === 'npm run vercel-build') {
    results.push({
      category: 'Vercel Config',
      passed: true,
      message: 'Build command correctly configured'
    })
  } else {
    results.push({
      category: 'Vercel Config',
      passed: false,
      message: 'Build command not optimized',
      recommendation: 'Set buildCommand to "npm run vercel-build"'
    })
  }
  
  // Check framework
  if (config.framework === 'nextjs') {
    results.push({
      category: 'Vercel Config',
      passed: true,
      message: 'Framework correctly set to Next.js'
    })
  } else {
    results.push({
      category: 'Vercel Config',
      passed: false,
      message: 'Framework not set to Next.js',
      recommendation: 'Set framework to "nextjs"'
    })
  }
  
  // Check output directory
  if (config.outputDirectory === '.next') {
    results.push({
      category: 'Vercel Config',
      passed: true,
      message: 'Output directory correctly configured'
    })
  } else {
    results.push({
      category: 'Vercel Config',
      passed: false,
      message: 'Output directory not set correctly',
      recommendation: 'Set outputDirectory to ".next"'
    })
  }
  
  // Check functions configuration
  if (config.functions && config.functions['app/api/**/*.ts']) {
    results.push({
      category: 'Vercel Config',
      passed: true,
      message: 'API functions timeout configured'
    })
  } else {
    results.push({
      category: 'Vercel Config',
      passed: false,
      message: 'API functions timeout not configured',
      recommendation: 'Add functions timeout configuration'
    })
  }
  
  // Check headers
  if (config.headers && config.headers.length > 0) {
    results.push({
      category: 'Vercel Config',
      passed: true,
      message: 'Security headers configured'
    })
  } else {
    results.push({
      category: 'Vercel Config',
      passed: false,
      message: 'Security headers not configured',
      recommendation: 'Add security headers configuration'
    })
  }
  
  return results
}

function validatePackageJson(config: any): ValidationResult[] {
  const results: ValidationResult[] = []
  
  if (!config) {
    return [{
      category: 'Package.json',
      passed: false,
      message: 'package.json not found'
    }]
  }
  
  // Check required scripts
  const requiredScripts = [
    'vercel-build',
    'build',
    'start',
    'dev',
    'db:migrate',
    'db:generate'
  ]
  
  for (const script of requiredScripts) {
    if (config.scripts?.[script]) {
      results.push({
        category: 'Package.json',
        passed: true,
        message: `Script "${script}" configured`
      })
    } else {
      results.push({
        category: 'Package.json',
        passed: false,
        message: `Missing script: ${script}`,
        recommendation: `Add "${script}" script to package.json`
      })
    }
  }
  
  // Check vercel-build script content
  if (config.scripts?.['vercel-build']?.includes('prisma generate')) {
    results.push({
      category: 'Package.json',
      passed: true,
      message: 'vercel-build includes Prisma generation'
    })
  } else {
    results.push({
      category: 'Package.json',
      passed: false,
      message: 'vercel-build missing Prisma generation',
      recommendation: 'Include "prisma generate" in vercel-build script'
    })
  }
  
  // Check Node.js version
  if (config.engines?.node) {
    results.push({
      category: 'Package.json',
      passed: true,
      message: `Node.js version specified: ${config.engines.node}`
    })
  } else {
    results.push({
      category: 'Package.json',
      passed: false,
      message: 'Node.js version not specified',
      recommendation: 'Add engines.node to specify Node.js version'
    })
  }
  
  return results
}

function validateNextConfig(config: string): ValidationResult[] {
  const results: ValidationResult[] = []
  
  if (!config) {
    return [{
      category: 'Next.js Config',
      passed: false,
      message: 'next.config.js not found'
    }]
  }
  
  // Check for Prisma external packages
  if (config.includes('serverComponentsExternalPackages')) {
    results.push({
      category: 'Next.js Config',
      passed: true,
      message: 'Server components external packages configured'
    })
  } else {
    results.push({
      category: 'Next.js Config',
      passed: false,
      message: 'Server components external packages not configured',
      recommendation: 'Add @prisma/client to serverComponentsExternalPackages'
    })
  }
  
  // Check for powered by header disabled
  if (config.includes('poweredByHeader: false')) {
    results.push({
      category: 'Next.js Config',
      passed: true,
      message: 'Powered by header disabled for security'
    })
  } else {
    results.push({
      category: 'Next.js Config',
      passed: false,
      message: 'Powered by header not disabled',
      recommendation: 'Set poweredByHeader: false for security'
    })
  }
  
  // Check for compression
  if (config.includes('compress: true')) {
    results.push({
      category: 'Next.js Config',
      passed: true,
      message: 'Compression enabled'
    })
  } else {
    results.push({
      category: 'Next.js Config',
      passed: false,
      message: 'Compression not enabled',
      recommendation: 'Set compress: true for better performance'
    })
  }
  
  return results
}

function validatePrismaConfig(config: string): ValidationResult[] {
  const results: ValidationResult[] = []
  
  if (!config) {
    return [{
      category: 'Prisma Config',
      passed: false,
      message: 'prisma/schema.prisma not found'
    }]
  }
  
  // Check binary targets
  if (config.includes('linux-musl-arm64-openssl-3.0.x')) {
    results.push({
      category: 'Prisma Config',
      passed: true,
      message: 'Vercel binary target configured'
    })
  } else {
    results.push({
      category: 'Prisma Config',
      passed: false,
      message: 'Vercel binary target not configured',
      recommendation: 'Add "linux-musl-arm64-openssl-3.0.x" to binaryTargets'
    })
  }
  
  // Check provider
  if (config.includes('provider = "postgresql"')) {
    results.push({
      category: 'Prisma Config',
      passed: true,
      message: 'PostgreSQL provider configured'
    })
  } else {
    results.push({
      category: 'Prisma Config',
      passed: false,
      message: 'PostgreSQL provider not configured',
      recommendation: 'Set provider to "postgresql"'
    })
  }
  
  return results
}

function validateBuildProcess(): ValidationResult[] {
  const results: ValidationResult[] = []
  
  try {
    // Test Prisma generation
    execSync('npx prisma generate --dry-run', { stdio: 'pipe' })
    results.push({
      category: 'Build Process',
      passed: true,
      message: 'Prisma client generation works'
    })
  } catch {
    results.push({
      category: 'Build Process',
      passed: false,
      message: 'Prisma client generation failed',
      recommendation: 'Fix Prisma schema errors'
    })
  }
  
  try {
    // Test TypeScript compilation
    execSync('npx tsc --noEmit', { stdio: 'pipe' })
    results.push({
      category: 'Build Process',
      passed: true,
      message: 'TypeScript compilation successful'
    })
  } catch {
    results.push({
      category: 'Build Process',
      passed: false,
      message: 'TypeScript compilation failed',
      recommendation: 'Fix TypeScript errors'
    })
  }
  
  return results
}

function displayResults(allResults: ValidationResult[]): boolean {
  console.log('🔧 Build Configuration Validation')
  console.log('=================================')
  console.log('')
  
  const categories = [...new Set(allResults.map(r => r.category))]
  let allPassed = true
  
  for (const category of categories) {
    const categoryResults = allResults.filter(r => r.category === category)
    const categoryPassed = categoryResults.every(r => r.passed)
    
    console.log(`${categoryPassed ? '✅' : '❌'} ${category}`)
    
    for (const result of categoryResults) {
      const icon = result.passed ? '  ✅' : '  ❌'
      console.log(`${icon} ${result.message}`)
      
      if (!result.passed && result.recommendation) {
        console.log(`     💡 ${result.recommendation}`)
      }
      
      if (!result.passed) {
        allPassed = false
      }
    }
    
    console.log('')
  }
  
  if (allPassed) {
    console.log('🎉 All build configurations are optimized!')
  } else {
    console.log('⚠️  Some configurations need attention.')
  }
  
  return allPassed
}

async function main() {
  console.log('🔍 Validating build configuration...')
  console.log('')
  
  const configs = loadConfigurations()
  
  const allResults = [
    ...validateVercelConfig(configs.vercelConfig),
    ...validatePackageJson(configs.packageJson),
    ...validateNextConfig(configs.nextConfig),
    ...validatePrismaConfig(configs.prismaConfig),
    ...validateBuildProcess()
  ]
  
  const success = displayResults(allResults)
  
  if (!success) {
    console.log('')
    console.log('📚 For detailed configuration guides, see:')
    console.log('• VERCEL_IMPORT_GUIDE.md')
    console.log('• DEPLOYMENT_CHECKLIST.md')
    
    process.exit(1)
  }
}

// Export for use in other scripts
export { validateVercelConfig, validatePackageJson, validateNextConfig, validatePrismaConfig }

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
