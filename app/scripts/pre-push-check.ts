#!/usr/bin/env tsx
/**
 * Pre-Push Validation Script
 * 
 * This script validates that everything is ready for Vercel deployment
 * before pushing to GitHub.
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { validateEnvironmentVariables } from '../lib/env-validation'

interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
}

function validateFiles(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  const requiredFiles = [
    'vercel.json',
    '.env.production.template',
    'prisma/schema.prisma',
    'package.json',
    '../VERCEL_IMPORT_GUIDE.md',
    '../DEPLOYMENT_CHECKLIST.md'
  ]
  
  for (const file of requiredFiles) {
    if (!existsSync(file)) {
      result.errors.push(`Missing required file: ${file}`)
      result.passed = false
    }
  }
  
  return result
}

function validatePackageJson(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  try {
    const packageJson = require('../package.json')
    
    const requiredScripts = [
      'vercel-build',
      'db:migrate',
      'generate-env-vars',
      'setup-production'
    ]
    
    for (const script of requiredScripts) {
      if (!packageJson.scripts?.[script]) {
        result.errors.push(`Missing package.json script: ${script}`)
        result.passed = false
      }
    }
    
    // Check dependencies
    const requiredDeps = ['@prisma/client', 'prisma', 'next']
    for (const dep of requiredDeps) {
      if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
        result.errors.push(`Missing dependency: ${dep}`)
        result.passed = false
      }
    }
    
  } catch (error) {
    result.errors.push('Failed to read package.json')
    result.passed = false
  }
  
  return result
}

function validatePrismaSchema(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  try {
    // Check if Prisma can generate client
    execSync('npx prisma generate --dry-run', { stdio: 'pipe' })
  } catch (error) {
    result.errors.push('Prisma schema validation failed')
    result.passed = false
  }
  
  return result
}

function validateGitStatus(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  try {
    // Check if we're in a git repository
    execSync('git rev-parse --git-dir', { stdio: 'pipe' })
    
    // Check for uncommitted changes
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    if (status.trim()) {
      result.warnings.push('You have uncommitted changes')
    }
    
    // Check if we're on main branch
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim()
    if (branch !== 'main') {
      result.warnings.push(`You're on branch '${branch}', not 'main'`)
    }
    
    // Check if remote exists
    try {
      execSync('git remote get-url origin', { stdio: 'pipe' })
    } catch {
      result.errors.push('No git remote origin configured')
      result.passed = false
    }
    
  } catch (error) {
    result.errors.push('Not in a git repository')
    result.passed = false
  }
  
  return result
}

function validateBuild(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  try {
    console.log('🔨 Testing build process...')
    
    // Test Prisma generation
    execSync('npx prisma generate', { stdio: 'pipe' })
    
    // Test Next.js build (dry run)
    execSync('npm run build', { stdio: 'pipe' })
    
    console.log('✅ Build test passed')
    
  } catch (error) {
    result.errors.push('Build process failed')
    result.passed = false
  }
  
  return result
}

function validateEnvironment(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: []
  }
  
  // Check if environment template exists
  if (!existsSync('.env.production.template')) {
    result.errors.push('Missing .env.production.template')
    result.passed = false
    return result
  }
  
  // Validate current environment (development)
  try {
    const envValidation = validateEnvironmentVariables()
    if (!envValidation.valid) {
      result.warnings.push('Development environment has validation warnings')
    }
  } catch (error) {
    result.warnings.push('Could not validate development environment')
  }
  
  return result
}

function displayResults(results: ValidationResult[]): boolean {
  console.log('🔍 Pre-Push Validation Results')
  console.log('==============================')
  console.log('')
  
  let allPassed = true
  let totalErrors = 0
  let totalWarnings = 0
  
  for (const result of results) {
    if (!result.passed) {
      allPassed = false
    }
    totalErrors += result.errors.length
    totalWarnings += result.warnings.length
  }
  
  // Display errors
  if (totalErrors > 0) {
    console.log('❌ Errors:')
    for (const result of results) {
      for (const error of result.errors) {
        console.log(`  - ${error}`)
      }
    }
    console.log('')
  }
  
  // Display warnings
  if (totalWarnings > 0) {
    console.log('⚠️  Warnings:')
    for (const result of results) {
      for (const warning of result.warnings) {
        console.log(`  - ${warning}`)
      }
    }
    console.log('')
  }
  
  if (allPassed) {
    console.log('🎉 All validations passed! Ready to push to GitHub.')
    console.log('')
    console.log('Next steps:')
    console.log('1. git add .')
    console.log('2. git commit -m "Add Vercel production configuration"')
    console.log('3. git push origin main')
    console.log('4. Import repository to Vercel')
  } else {
    console.log('❌ Validation failed. Please fix errors before pushing.')
  }
  
  return allPassed
}

async function main() {
  console.log('🚀 Running pre-push validation...')
  console.log('')
  
  const validations = [
    { name: 'Files', fn: validateFiles },
    { name: 'Package.json', fn: validatePackageJson },
    { name: 'Prisma Schema', fn: validatePrismaSchema },
    { name: 'Git Status', fn: validateGitStatus },
    { name: 'Environment', fn: validateEnvironment },
    { name: 'Build Process', fn: validateBuild }
  ]
  
  const results: ValidationResult[] = []
  
  for (const validation of validations) {
    console.log(`Validating ${validation.name}...`)
    try {
      const result = validation.fn()
      results.push(result)
    } catch (error) {
      results.push({
        passed: false,
        errors: [`${validation.name} validation failed: ${error instanceof Error ? error.message : String(error)}`],
        warnings: []
      })
    }
  }
  
  console.log('')
  const success = displayResults(results)
  
  if (!success) {
    process.exit(1)
  }
}

// Export for use in other scripts
export { 
  validateFiles, 
  validatePackageJson, 
  validatePrismaSchema, 
  validateGitStatus,
  validateBuild,
  validateEnvironment 
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
