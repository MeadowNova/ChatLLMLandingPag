# Vercel Import & Deployment Guide

This guide walks you through importing your ChatLLM Landing Page repository into Vercel and configuring it for production deployment.

## 🚀 Quick Import Process

### Step 1: Push to GitHub

```bash
# Ensure all changes are committed
git add .
git commit -m "Add Vercel production configuration"
git push origin main
```

### Step 2: Import to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Git Repository"
   - Select your `ChatLLMLandingPag` repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `chatllm-landing-page` (or your preference)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `app` (important!)
   - **Build Command**: `npm run vercel-build` (auto-configured)
   - **Output Directory**: `.next` (auto-configured)
   - **Install Command**: `npm ci` (auto-configured)

## ⚙️ Configuration Details

### Project Settings (Auto-Configured)

The following settings are automatically configured by our `vercel.json`:

```json
{
  "buildCommand": "npm run vercel-build",
  "framework": "nextjs",
  "rootDirectory": "app",
  "outputDirectory": ".next",
  "installCommand": "npm ci"
}
```

### Build Process

Our custom build command handles:
1. Prisma client generation
2. Database migration deployment
3. Next.js build optimization

```bash
# This runs automatically:
npm run vercel-build
# Which executes: prisma generate && prisma migrate deploy && next build
```

## 🗄️ Database Setup

### Step 1: Create Vercel Postgres

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose region (same as deployment)
   - Click "Create"

2. **Get Connection String**
   - Copy the `POSTGRES_PRISMA_URL` value
   - This will be your `DATABASE_URL`

### Step 2: Set Environment Variables

**Required Variables:**

```
DATABASE_URL=postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
NEXTAUTH_SECRET=[Generate with: openssl rand -base64 32]
NEXTAUTH_URL=https://your-custom-domain.com
NODE_ENV=production
```

**Optional Analytics:**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
```

### Step 3: Generate Secure Values

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or use our script
npm run generate-env-vars your-domain.com
```

## 🌐 Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to Project Settings > Domains
2. Click "Add Domain"
3. Enter your custom domain
4. Click "Add"

### Step 2: Configure DNS

Vercel will provide DNS instructions:

**For Apex Domain (example.com):**
```
Type: A
Name: @
Value: 76.76.19.61
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: SSL Certificate

- SSL is automatically provisioned by Vercel
- Usually takes 5-10 minutes
- Vercel handles renewal automatically

## 🔍 Deployment Verification

### Automatic Checks

Our configuration includes automatic health checks:

1. **Database Connectivity**: `/api/health/db`
2. **Environment Validation**: Built into the app
3. **Build Process**: Prisma + Next.js integration

### Manual Verification

```bash
# Check deployment status
curl https://your-domain.com/api/health/db

# Expected response:
{
  "status": "healthy",
  "message": "Database connected successfully",
  "data": {
    "subscriberCount": 0,
    "environment": "production",
    "hasDatabase": true
  }
}
```

## 🚨 Troubleshooting

### Common Import Issues

**Root Directory Error**
- Ensure "Root Directory" is set to `app`
- Vercel should auto-detect this from `vercel.json`

**Build Failures**
- Check environment variables are set
- Verify DATABASE_URL is correct
- Check build logs for specific errors

**Database Connection Issues**
- Ensure Vercel Postgres is created
- Verify DATABASE_URL includes `sslmode=require`
- Check database region matches deployment region

### Build Log Analysis

Common error patterns:

```bash
# Missing environment variable
Error: Environment variable DATABASE_URL is not defined

# Prisma connection issue
Error: Can't reach database server

# Missing dependency
Error: Cannot find module '@prisma/client'
```

### Solutions

```bash
# For environment issues
# Set variables in Vercel Dashboard > Settings > Environment Variables

# For database issues
# Recreate Vercel Postgres and update DATABASE_URL

# For dependency issues
# Check package.json and ensure all dependencies are listed
```

## 📊 Performance Optimizations

Our configuration includes:

### Caching Strategy
- Static assets: 1 year cache
- API routes: Smart caching
- Health checks: 1 minute cache

### Security Headers
- Content Security Policy
- XSS Protection
- Frame Options
- Referrer Policy

### Function Optimization
- API routes: 30s timeout
- Health checks: 10s timeout
- Automatic cron health monitoring

## ✅ Post-Deployment Checklist

- [ ] Repository imported successfully
- [ ] Build completes without errors
- [ ] Database connection established
- [ ] Environment variables configured
- [ ] Custom domain added and SSL active
- [ ] Health check endpoint responds
- [ ] Email signup form works
- [ ] Analytics tracking active (if configured)

## 🔄 Continuous Deployment

Once imported, Vercel automatically:

1. **Deploys on Push**: Every push to `main` triggers deployment
2. **Preview Deployments**: Pull requests get preview URLs
3. **Rollback Support**: Easy rollback to previous deployments
4. **Build Optimization**: Automatic caching and optimization

---

**Ready to Import?** 
1. Push your changes to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Follow this guide for configuration

**Next Step**: After successful import, proceed to custom domain configuration and final testing.
