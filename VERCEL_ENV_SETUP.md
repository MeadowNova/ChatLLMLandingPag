# Vercel Environment Variables Setup Guide

This guide walks you through setting up all required environment variables for your ChatLLM Landing Page production deployment.

## 🔐 Quick Setup

### Step 1: Generate Environment Variables

```bash
# Generate secure environment variables
npm run generate-env-vars your-domain.com

# This creates:
# - .env.production.example (template with generated secrets)
# - vercel-env-commands.sh (CLI commands for Vercel)
```

### Step 2: Set Variables in Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings > Environment Variables

2. **Add Production Variables**
   - Set environment to "Production"
   - Add each variable below

## 📋 Required Environment Variables

### Database Configuration
```
Variable: DATABASE_URL
Value: postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
Environment: Production
```
*Note: This will be provided by Vercel Postgres after database creation*

### Authentication Configuration
```
Variable: NEXTAUTH_SECRET
Value: [Generated 32+ character secret]
Environment: Production

Variable: NEXTAUTH_URL
Value: https://your-custom-domain.com
Environment: Production
```

### Application Configuration
```
Variable: NODE_ENV
Value: production
Environment: Production
```

## 📊 Optional Analytics Variables

### Google Analytics 4
```
Variable: NEXT_PUBLIC_GA_MEASUREMENT_ID
Value: G-XXXXXXXXXX
Environment: Production, Preview, Development
```

### Facebook Pixel
```
Variable: NEXT_PUBLIC_FB_PIXEL_ID
Value: 000000000000000
Environment: Production, Preview, Development
```

## 🛠️ Setup Methods

### Method 1: Vercel Dashboard (Recommended)

1. Navigate to Project Settings > Environment Variables
2. Click "Add New"
3. Enter variable name and value
4. Select "Production" environment
5. Click "Save"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Add environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NODE_ENV production
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
vercel env add NEXT_PUBLIC_FB_PIXEL_ID production
```

### Method 3: Automated Script

```bash
# Make the script executable
chmod +x vercel-env-commands.sh

# Run the script (after generating)
./vercel-env-commands.sh
```

## 🔍 Validation

### Test Environment Variables

```bash
# Validate environment setup
npm run setup-production

# Check specific variables
vercel env ls
```

### Runtime Validation

The app includes automatic environment validation:

```typescript
// In your app startup
import { validateAtRuntime } from '@/lib/env-validation'

validateAtRuntime() // Throws error if validation fails
```

## 🔒 Security Best Practices

### Secret Generation
```bash
# Generate secure NEXTAUTH_SECRET
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Variable Scoping
- **Production**: Live site variables
- **Preview**: Branch deployment variables (optional)
- **Development**: Local development (use .env.local)

### Security Checklist
- [ ] NEXTAUTH_SECRET is 32+ characters
- [ ] DATABASE_URL includes `sslmode=require`
- [ ] NEXTAUTH_URL uses HTTPS
- [ ] No secrets committed to git
- [ ] Analytics IDs are public-safe (NEXT_PUBLIC_*)

## 🚨 Troubleshooting

### Common Issues

**Environment Variable Not Found**
```bash
# Check if variable is set
vercel env ls

# Add missing variable
vercel env add VARIABLE_NAME production
```

**Build Failures**
```bash
# Check build logs for missing variables
vercel logs

# Validate locally
npm run generate-env-vars
```

**Database Connection Issues**
```bash
# Verify DATABASE_URL format
echo $DATABASE_URL

# Test connection
npm run setup-production
```

### Validation Errors

The app will show specific validation errors:
- Missing required variables
- Invalid URL formats
- Insecure configurations

## 📱 Environment-Specific Configuration

### Production
- All variables required
- HTTPS enforced
- SSL database connections
- Analytics enabled

### Preview (Branch Deployments)
- Same as production
- Optional custom NEXTAUTH_URL
- Can use staging analytics IDs

### Development
- Uses .env.local
- HTTP allowed
- Optional analytics
- Development database

## 🔄 Updates and Rotation

### Rotating Secrets
```bash
# Generate new secret
npm run generate-env-vars

# Update in Vercel
vercel env rm NEXTAUTH_SECRET production
vercel env add NEXTAUTH_SECRET production
```

### Database Updates
```bash
# Update database URL (if needed)
vercel env rm DATABASE_URL production
vercel env add DATABASE_URL production
```

## ✅ Verification Checklist

- [ ] All required variables set in Vercel
- [ ] NEXTAUTH_SECRET is secure (32+ chars)
- [ ] NEXTAUTH_URL matches your domain
- [ ] DATABASE_URL includes SSL mode
- [ ] Analytics IDs configured (optional)
- [ ] Build succeeds with new variables
- [ ] Health check passes: `/api/health/db`

---

**Next Step**: After setting environment variables, proceed to Vercel deployment configuration.
