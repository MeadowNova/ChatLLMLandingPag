# Production Deployment Checklist

## ✅ Database Setup (Current Task)

### Vercel Postgres Setup
- [ ] Create Vercel Postgres database in dashboard
- [ ] Copy connection strings from Vercel
- [ ] Set DATABASE_URL in Vercel environment variables
- [ ] Test database connectivity

### Environment Variables
- [ ] Generate secure NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Set NEXTAUTH_URL to your custom domain
- [ ] Configure analytics IDs (GA4, Facebook Pixel)
- [ ] Set NODE_ENV=production

### Database Migration
- [ ] Run `npx prisma generate` locally to test
- [ ] Deploy schema: `npx prisma migrate deploy` or `npx prisma db push`
- [ ] Test health endpoint: `/api/health/db`

## 🚀 Quick Start Commands

### 1. Set up Vercel Postgres
```bash
# Via Vercel CLI (optional)
vercel storage create postgres --name chatllm-production

# Or use Vercel Dashboard (recommended)
# Go to Project > Storage > Create Database > Postgres
```

### 2. Configure Environment Variables
```bash
# In Vercel Dashboard > Project Settings > Environment Variables
# Add for Production environment:

DATABASE_URL=postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-custom-domain.com
NODE_ENV=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
```

### 3. Test Database Setup
```bash
# Run setup script
npm run tsx scripts/setup-production-db.ts

# Or test manually
npx prisma generate
npx prisma migrate deploy
```

### 4. Deploy to Vercel
```bash
# Push to main branch (triggers auto-deploy)
git add .
git commit -m "Add Vercel Postgres configuration"
git push origin main

# Or deploy manually
vercel --prod
```

## 🔍 Verification Steps

### Database Health Check
- [ ] Visit: `https://your-domain.vercel.app/api/health/db`
- [ ] Should return: `{"status": "healthy", "message": "Database connected successfully"}`

### Environment Check
- [ ] Verify all environment variables are set in Vercel dashboard
- [ ] Check build logs for any missing variables
- [ ] Confirm SSL is enabled for database connection

### Functionality Test
- [ ] Test email signup form
- [ ] Verify data is saved to database
- [ ] Check form validation works
- [ ] Test responsive design

## 📋 Database Schema Summary

Current schema includes:
- `WaitlistSubscriber` (mapped to `email_subscribers` table)
- Basic fields: email, name, company, experience
- Timestamps: createdAt, updatedAt
- Status tracking: source, status

## 🔧 Troubleshooting

### Common Issues:

**Database Connection Failed**
- Check DATABASE_URL format
- Verify SSL mode is set
- Confirm database is created in Vercel

**Build Failures**
- Ensure `prisma generate` runs in build
- Check binary targets in schema.prisma
- Verify all dependencies are installed

**Migration Errors**
- Use `prisma db push` for initial setup
- Check database permissions
- Verify schema syntax

### Support Commands:
```bash
# Check database status
npx prisma db pull

# Reset database (development only)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

## 📞 Next Steps After Database Setup

1. **Test database connectivity** ✅
2. **Configure Vercel deployment settings**
3. **Set up custom domain**
4. **Run SEO and performance audits**
5. **Launch to production**

---

**Current Status**: Setting up Vercel Postgres database
**Next Task**: Configure Vercel deployment settings
**Estimated Time**: 15-20 minutes for database setup
