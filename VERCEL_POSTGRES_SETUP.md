# Vercel Postgres Setup Guide

This guide walks you through setting up Vercel Postgres for your ChatLLM Landing Page production deployment.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository connected to Vercel
- Vercel CLI installed (optional but recommended)

## Step 1: Create Vercel Postgres Database

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Navigate to your project

2. **Add Postgres Database**
   - Go to "Storage" tab in your project
   - Click "Create Database"
   - Select "Postgres"
   - Choose your region (recommend same as your deployment region)
   - Click "Create"

3. **Get Connection Details**
   - Once created, go to the database settings
   - Copy the connection strings (you'll get multiple variants)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create Postgres database
vercel storage create postgres --name chatllm-production
```

## Step 2: Configure Environment Variables

### In Vercel Dashboard:

1. Go to Project Settings > Environment Variables
2. Add the following variables for **Production** environment:

```
DATABASE_URL=postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
NEXTAUTH_SECRET=your-super-secure-production-secret-key-here
NEXTAUTH_URL=https://your-custom-domain.com
NODE_ENV=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
```

### Generate Secure NEXTAUTH_SECRET:

```bash
# Generate a secure secret
openssl rand -base64 32
```

## Step 3: Update Prisma Configuration

Your current `prisma/schema.prisma` is already configured for PostgreSQL, but ensure the binary targets include Vercel's environment:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]
}
```

## Step 4: Database Migration Strategy

### For Initial Setup (New Database):

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for initial setup)
npx prisma db push

# Or run migrations (if you have migration files)
npx prisma migrate deploy
```

### For Production Deployment:

Add this to your `package.json` scripts:

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

## Step 5: Test Database Connection

Create a simple API route to test the connection:

```typescript
// app/api/health/db/route.ts
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return Response.json({ status: 'Database connected successfully' })
  } catch (error) {
    return Response.json(
      { status: 'Database connection failed', error: error.message },
      { status: 500 }
    )
  }
}
```

## Step 6: Monitoring and Maintenance

### Database Monitoring:
- Monitor connection usage in Vercel dashboard
- Set up alerts for connection limits
- Monitor query performance

### Backup Strategy:
- Vercel Postgres includes automatic backups
- Consider additional backup strategies for critical data

### Scaling Considerations:
- Monitor connection pool usage
- Consider connection pooling optimization
- Plan for database scaling as traffic grows

## Troubleshooting

### Common Issues:

1. **Connection Timeout**
   - Ensure SSL is enabled (`sslmode=require`)
   - Check connection string format

2. **Migration Failures**
   - Verify database permissions
   - Check migration file syntax
   - Ensure database is accessible

3. **Build Failures**
   - Verify Prisma client generation
   - Check binary targets in schema

### Support Resources:
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## Security Best Practices

1. **Never commit production credentials**
2. **Use environment variables for all sensitive data**
3. **Enable SSL for all database connections**
4. **Regularly rotate database credentials**
5. **Monitor database access logs**
6. **Implement proper error handling to avoid credential leaks**

## Next Steps

After completing this setup:
1. Test database connectivity
2. Run initial migrations
3. Seed any required initial data
4. Configure monitoring and alerts
5. Proceed with Vercel deployment configuration
