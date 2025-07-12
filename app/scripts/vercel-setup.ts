#!/usr/bin/env tsx
/**
 * Vercel Setup Automation Script
 * 
 * This script helps automate the Vercel project setup process
 * and provides validation for the deployment configuration.
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

interface VercelConfig {
  projectName?: string
  framework: string
  buildCommand: string
  outputDirectory: string
  installCommand: string
  rootDirectory: string
  nodeVersion: string
}

interface DeploymentCheck {
  configExists: boolean
  envTemplateExists: boolean
  schemaValid: boolean
  buildScriptsValid: boolean
  gitRepoClean: boolean
}

function checkVercelCLI(): boolean {
  try {
    execSync('vercel --version', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function getVercelConfig(): VercelConfig {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
  
  return {
    framework: 'nextjs',
    buildCommand: 'npm run vercel-build',
    outputDirectory: '.next',
    installCommand: 'npm ci',
    rootDirectory: 'app',
    nodeVersion: '18.x'
  }
}

function validateDeploymentReadiness(): DeploymentCheck {
  const checks: DeploymentCheck = {
    configExists: existsSync('vercel.json'),
    envTemplateExists: existsSync('.env.production.template'),
    schemaValid: existsSync('prisma/schema.prisma'),
    buildScriptsValid: false,
    gitRepoClean: false
  }
  
  // Check build scripts
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    checks.buildScriptsValid = !!(
      packageJson.scripts?.['vercel-build'] &&
      packageJson.scripts?.['db:migrate'] &&
      packageJson.scripts?.['generate-env-vars']
    )
  } catch {
    checks.buildScriptsValid = false
  }
  
  // Check git status
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' })
    checks.gitRepoClean = gitStatus.trim().length === 0
  } catch {
    checks.gitRepoClean = false
  }
  
  return checks
}

function displayPreImportChecklist() {
  console.log('📋 Pre-Import Checklist for Vercel')
  console.log('================================')
  console.log('')
  
  const checks = validateDeploymentReadiness()
  const config = getVercelConfig()
  
  // Display configuration
  console.log('🔧 Project Configuration:')
  console.log(`  Framework: ${config.framework}`)
  console.log(`  Build Command: ${config.buildCommand}`)
  console.log(`  Output Directory: ${config.outputDirectory}`)
  console.log(`  Install Command: ${config.installCommand}`)
  console.log(`  Root Directory: ${config.rootDirectory}`)
  console.log(`  Node Version: ${config.nodeVersion}`)
  console.log('')
  
  // Display readiness checks
  console.log('✅ Readiness Checks:')
  console.log(`  ${checks.configExists ? '✅' : '❌'} Vercel config exists`)
  console.log(`  ${checks.envTemplateExists ? '✅' : '❌'} Environment template exists`)
  console.log(`  ${checks.schemaValid ? '✅' : '❌'} Prisma schema valid`)
  console.log(`  ${checks.buildScriptsValid ? '✅' : '❌'} Build scripts configured`)
  console.log(`  ${checks.gitRepoClean ? '✅' : '❌'} Git repository clean`)
  console.log('')
  
  const allChecksPass = Object.values(checks).every(Boolean)
  
  if (allChecksPass) {
    console.log('🎉 All checks passed! Ready for Vercel import.')
  } else {
    console.log('⚠️  Some checks failed. Please address issues before importing.')
  }
  
  return allChecksPass
}

function generateImportInstructions() {
  console.log('')
  console.log('📖 Vercel Import Instructions')
  console.log('=============================')
  console.log('')
  console.log('1. Push changes to GitHub:')
  console.log('   git add .')
  console.log('   git commit -m "Add Vercel production configuration"')
  console.log('   git push origin main')
  console.log('')
  console.log('2. Import to Vercel:')
  console.log('   • Go to https://vercel.com/new')
  console.log('   • Click "Import Git Repository"')
  console.log('   • Select your ChatLLMLandingPag repository')
  console.log('   • Configure project settings:')
  console.log('     - Project Name: chatllm-landing-page')
  console.log('     - Framework: Next.js (auto-detected)')
  console.log('     - Root Directory: app')
  console.log('     - Build Command: npm run vercel-build')
  console.log('     - Output Directory: .next')
  console.log('     - Install Command: npm ci')
  console.log('')
  console.log('3. Set Environment Variables:')
  console.log('   • Go to Project Settings > Environment Variables')
  console.log('   • Add variables for Production environment')
  console.log('   • Use the generated values from .env.production.template')
  console.log('')
  console.log('4. Create Vercel Postgres Database:')
  console.log('   • Go to Storage tab in your project')
  console.log('   • Click "Create Database" > "Postgres"')
  console.log('   • Copy connection string to DATABASE_URL')
  console.log('')
  console.log('5. Deploy:')
  console.log('   • Click "Deploy" to start first deployment')
  console.log('   • Monitor build logs for any issues')
  console.log('   • Test deployment at provided URL')
}

function generateVercelCommands() {
  console.log('')
  console.log('🔧 Vercel CLI Commands (Alternative)')
  console.log('===================================')
  console.log('')
  
  if (!checkVercelCLI()) {
    console.log('Install Vercel CLI first:')
    console.log('npm i -g vercel')
    console.log('')
  }
  
  console.log('Setup via CLI:')
  console.log('vercel login')
  console.log('vercel link')
  console.log('vercel env add DATABASE_URL production')
  console.log('vercel env add NEXTAUTH_SECRET production')
  console.log('vercel env add NEXTAUTH_URL production')
  console.log('vercel env add NODE_ENV production')
  console.log('vercel --prod')
}

function generatePostDeploymentChecks() {
  console.log('')
  console.log('🔍 Post-Deployment Verification')
  console.log('===============================')
  console.log('')
  console.log('After successful deployment, verify:')
  console.log('')
  console.log('1. Health Check:')
  console.log('   curl https://your-domain.vercel.app/api/health/db')
  console.log('')
  console.log('2. Database Connection:')
  console.log('   • Should return {"status": "healthy"}')
  console.log('   • Check subscriber count is correct')
  console.log('')
  console.log('3. Form Functionality:')
  console.log('   • Test email signup form')
  console.log('   • Verify data is saved to database')
  console.log('   • Check analytics tracking')
  console.log('')
  console.log('4. Performance:')
  console.log('   • Run Lighthouse audit')
  console.log('   • Check Core Web Vitals')
  console.log('   • Verify caching headers')
}

async function main() {
  console.log('🚀 Vercel Setup Assistant')
  console.log('=========================')
  console.log('')
  
  const isReady = displayPreImportChecklist()
  
  if (!isReady) {
    console.log('')
    console.log('❌ Please fix the issues above before proceeding.')
    process.exit(1)
  }
  
  generateImportInstructions()
  generateVercelCommands()
  generatePostDeploymentChecks()
  
  console.log('')
  console.log('🎯 Next Steps:')
  console.log('1. Review the instructions above')
  console.log('2. Push your changes to GitHub')
  console.log('3. Import repository to Vercel')
  console.log('4. Configure environment variables')
  console.log('5. Deploy and test')
  console.log('')
  console.log('📚 Documentation:')
  console.log('• VERCEL_IMPORT_GUIDE.md - Detailed import guide')
  console.log('• VERCEL_ENV_SETUP.md - Environment variables setup')
  console.log('• DEPLOYMENT_CHECKLIST.md - Complete deployment checklist')
}

// Export for use in other scripts
export { 
  validateDeploymentReadiness, 
  getVercelConfig, 
  checkVercelCLI 
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
