#!/usr/bin/env tsx

// Performance audit script for ChatLLM Mastery
// Run with: npx tsx scripts/performance-audit.ts

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

interface AuditResult {
  category: string
  issues: string[]
  suggestions: string[]
  score: number
}

class PerformanceAuditor {
  private results: AuditResult[] = []

  async runAudit() {
    console.log('🔍 Starting Performance Audit for ChatLLM Mastery...\n')

    await this.auditImages()
    await this.auditBundleSize()
    await this.auditDependencies()
    await this.auditCodeSplitting()
    await this.auditCaching()
    await this.auditSEO()

    this.generateReport()
  }

  private async auditImages() {
    console.log('📸 Auditing Images...')
    const issues: string[] = []
    const suggestions: string[] = []

    const publicDir = path.join(process.cwd(), 'public')
    const imageFiles = this.getImageFiles(publicDir)

    for (const file of imageFiles) {
      const stats = fs.statSync(file)
      const sizeInMB = stats.size / (1024 * 1024)

      if (sizeInMB > 1) {
        issues.push(`Large image: ${path.basename(file)} (${sizeInMB.toFixed(2)}MB)`)
        suggestions.push(`Optimize ${path.basename(file)} - consider WebP format and compression`)
      }
    }

    // Check for missing alt texts in components
    const componentFiles = this.getComponentFiles()
    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf-8')
      const imageMatches = content.match(/<Image[^>]*>/g) || []
      
      for (const match of imageMatches) {
        if (!match.includes('alt=')) {
          issues.push(`Missing alt text in ${path.basename(file)}`)
          suggestions.push(`Add descriptive alt text to all images in ${path.basename(file)}`)
        }
      }
    }

    this.results.push({
      category: 'Images',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 10))
    })
  }

  private async auditBundleSize() {
    console.log('📦 Auditing Bundle Size...')
    const issues: string[] = []
    const suggestions: string[] = []

    try {
      // Check if bundle analyzer is available
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

      // Check for heavy dependencies
      const heavyDeps = [
        'lodash', 'moment', 'jquery', 'bootstrap', 'material-ui'
      ]

      for (const dep of heavyDeps) {
        if (deps[dep]) {
          issues.push(`Heavy dependency detected: ${dep}`)
          suggestions.push(`Consider lighter alternatives to ${dep}`)
        }
      }

      // Check for unused dependencies
      const nodeModulesSize = this.getDirectorySize(path.join(process.cwd(), 'node_modules'))
      if (nodeModulesSize > 500) {
        issues.push(`Large node_modules directory: ${nodeModulesSize}MB`)
        suggestions.push('Run npm audit and remove unused dependencies')
      }

    } catch (error) {
      issues.push('Could not analyze bundle size')
      suggestions.push('Install @next/bundle-analyzer for detailed analysis')
    }

    this.results.push({
      category: 'Bundle Size',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 15))
    })
  }

  private async auditDependencies() {
    console.log('📚 Auditing Dependencies...')
    const issues: string[] = []
    const suggestions: string[] = []

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      const deps = packageJson.dependencies || {}
      const devDeps = packageJson.devDependencies || {}

      // Check for outdated packages
      const outdatedOutput = execSync('npm outdated --json', { encoding: 'utf-8' })
      const outdated = JSON.parse(outdatedOutput || '{}')

      Object.keys(outdated).forEach(pkg => {
        issues.push(`Outdated package: ${pkg}`)
        suggestions.push(`Update ${pkg} to latest version`)
      })

      // Check for security vulnerabilities
      try {
        execSync('npm audit --audit-level=moderate', { stdio: 'pipe' })
      } catch (error) {
        issues.push('Security vulnerabilities detected')
        suggestions.push('Run npm audit fix to resolve security issues')
      }

    } catch (error: unknown) { // Explicitly type error as unknown
      // npm outdated returns non-zero exit code when packages are outdated
      if (error instanceof Error && error.message.includes('npm outdated')) { // Type guard
        suggestions.push('Some packages may be outdated - check manually')
      }
    }

    this.results.push({
      category: 'Dependencies',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 10))
    })
  }

  private async auditCodeSplitting() {
    console.log('✂️ Auditing Code Splitting...')
    const issues: string[] = []
    const suggestions: string[] = []

    const componentFiles = this.getComponentFiles()
    let hasLazyLoading = false
    let hasDynamicImports = false

    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf-8')
      
      if (content.includes('lazy(') || content.includes('dynamic(')) {
        hasDynamicImports = true
      }
      
      if (content.includes('LazySection') || content.includes('loading=')) {
        hasLazyLoading = true
      }
    }

    if (!hasDynamicImports) {
      issues.push('No dynamic imports detected')
      suggestions.push('Implement code splitting with React.lazy() or Next.js dynamic()')
    }

    if (!hasLazyLoading) {
      issues.push('Limited lazy loading implementation')
      suggestions.push('Implement lazy loading for images and components')
    }

    this.results.push({
      category: 'Code Splitting',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 20))
    })
  }

  private async auditCaching() {
    console.log('🗄️ Auditing Caching Strategy...')
    const issues: string[] = []
    const suggestions: string[] = []

    // Check Next.js config for caching headers
    const nextConfigPath = path.join(process.cwd(), 'next.config.js')
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf-8')
      
      if (!content.includes('headers()')) {
        issues.push('No custom headers configured')
        suggestions.push('Add caching headers in next.config.js')
      }
      
      if (!content.includes('Cache-Control')) {
        issues.push('No Cache-Control headers found')
        suggestions.push('Implement proper Cache-Control headers for static assets')
      }
    }

    this.results.push({
      category: 'Caching',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 25))
    })
  }

  private async auditSEO() {
    console.log('🔍 Auditing SEO...')
    const issues: string[] = []
    const suggestions: string[] = []

    // Check for sitemap
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'sitemap.xml'))) {
      issues.push('No sitemap.xml found')
      suggestions.push('Generate sitemap.xml for better SEO')
    }

    // Check for robots.txt
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'robots.txt'))) {
      issues.push('No robots.txt found')
      suggestions.push('Create robots.txt file')
    }

    this.results.push({
      category: 'SEO',
      issues,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 15))
    })
  }

  private getImageFiles(dir: string): string[] {
    const files: string[] = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...this.getImageFiles(fullPath))
      } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
        files.push(fullPath)
      }
    }

    return files
  }

  private getComponentFiles(): string[] {
    const files: string[] = []
    const componentsDir = path.join(process.cwd(), 'components')
    const appDir = path.join(process.cwd(), 'app')

    if (fs.existsSync(componentsDir)) {
      files.push(...this.getFilesRecursive(componentsDir, /\.(tsx|jsx)$/))
    }
    if (fs.existsSync(appDir)) {
      files.push(...this.getFilesRecursive(appDir, /\.(tsx|jsx)$/))
    }

    return files
  }

  private getFilesRecursive(dir: string, pattern: RegExp): string[] {
    const files: string[] = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...this.getFilesRecursive(fullPath, pattern))
      } else if (pattern.test(item)) {
        files.push(fullPath)
      }
    }

    return files
  }

  private getDirectorySize(dir: string): number {
    try {
      const output = execSync(`du -sm "${dir}"`, { encoding: 'utf-8' })
      return parseInt(output.split('\t')[0])
    } catch {
      return 0
    }
  }

  private generateReport() {
    console.log('\n📊 Performance Audit Report')
    console.log('=' .repeat(50))

    let totalScore = 0
    for (const result of this.results) {
      console.log(`\n${result.category}: ${result.score}/100`)
      
      if (result.issues.length > 0) {
        console.log('  Issues:')
        result.issues.forEach(issue => console.log(`    ❌ ${issue}`))
      }
      
      if (result.suggestions.length > 0) {
        console.log('  Suggestions:')
        result.suggestions.forEach(suggestion => console.log(`    💡 ${suggestion}`))
      }
      
      totalScore += result.score
    }

    const averageScore = Math.round(totalScore / this.results.length)
    console.log(`\n🎯 Overall Performance Score: ${averageScore}/100`)
    
    if (averageScore >= 90) {
      console.log('🎉 Excellent performance!')
    } else if (averageScore >= 70) {
      console.log('👍 Good performance, minor improvements needed')
    } else if (averageScore >= 50) {
      console.log('⚠️ Moderate performance, several improvements needed')
    } else {
      console.log('🚨 Poor performance, significant improvements required')
    }
  }
}

// Run the audit
const auditor = new PerformanceAuditor()
auditor.runAudit().catch(console.error)
