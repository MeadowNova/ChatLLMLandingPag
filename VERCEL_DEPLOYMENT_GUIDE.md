# Vercel Deployment Guide

This guide walks you through deploying your ChatLLM Mastery landing page to Vercel.

## Prerequisites

- ✅ GitHub repository with your code
- ✅ Vercel account
- ✅ All fixes from the task list completed

## Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `app`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`

## Step 2: Set Up Vercel Postgres

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **"Create Database"** → **"Postgres"**
3. Choose your region (preferably same as your app)
4. Create the database
5. Copy the connection strings (you'll need them for environment variables)

## Step 3: Configure Environment Variables

### Option A: Using Vercel Dashboard
1. Go to **Settings** → **Environment Variables**
2. Add the following variables for **Production**:

```
DATABASE_URL=postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
NEXTAUTH_SECRET=ZQNfqNAsxGB/pV4hOlZpAa+arutrHgtSr8iR2OQOU9g=
NEXTAUTH_URL=https://your-custom-domain.com
NODE_ENV=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
```

### Option B: Using Vercel CLI
```bash
cd app
chmod +x vercel-env-commands.sh
./vercel-env-commands.sh
```

## Step 4: Set Up GitHub Secrets

For CI/CD to work, add these secrets to your GitHub repository:

1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `VERCEL_TOKEN`: Get from [Vercel Tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID`: From Vercel project settings
   - `VERCEL_PROJECT_ID`: From Vercel project settings  
   - `PRODUCTION_URL`: Your production domain (e.g., `https://your-domain.com`)

## Step 5: Deploy

### Manual Deployment
1. Push your code to the `main` branch
2. Vercel will automatically deploy
3. Check deployment status in Vercel dashboard

### CI/CD Deployment
- Every push to `main` triggers automatic deployment
- Health checks verify the deployment
- Failed deployments will be reported

## Step 6: Set Up Custom Domain (Optional)

1. In Vercel project dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable with your custom domain

## Step 7: Database Migration

After first deployment:
```bash
# Connect to your production database
npx prisma migrate deploy
```

Or use the provided script:
```bash
npm run setup-production
```

## Verification Checklist

- [ ] App loads at your Vercel URL
- [ ] Health endpoints work: `/api/health` and `/api/health/db`
- [ ] Database connection is working
- [ ] Email signup form works
- [ ] Analytics tracking is configured (if applicable)
- [ ] Custom domain is working (if configured)
- [ ] CI/CD pipeline passes all checks

## Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `app` directory is set as root directory

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Vercel Postgres is in same region
- Ensure SSL mode is enabled (`sslmode=require`)

### Health Check Failures
- Verify PRODUCTION_URL secret is set correctly
- Check that health endpoints are accessible
- Review function timeout settings

### NextAuth Issues
- Ensure NEXTAUTH_URL matches your actual domain
- Verify NEXTAUTH_SECRET is set and secure
- Check that the secret is at least 32 characters

## Performance Optimization

The vercel.json includes:
- ✅ Optimized caching headers
- ✅ Security headers
- ✅ Function timeout configurations
- ✅ Helpful redirects and rewrites

## Monitoring

- Use Vercel Analytics for performance monitoring
- Set up Vercel Cron Jobs for health checks
- Monitor function execution times and errors
