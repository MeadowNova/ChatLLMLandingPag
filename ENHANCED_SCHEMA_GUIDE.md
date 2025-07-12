# Enhanced Prisma Schema Implementation Guide

This guide covers the implementation of the enhanced Prisma schema with advanced analytics, email campaign management, and user engagement tracking.

## 🚀 Schema Overview

The enhanced schema includes:

### Core Models
- **WaitlistSubscriber** - Enhanced user model with analytics
- **Interest** - User interests for segmentation
- **Tag** - Flexible tagging system
- **EmailCampaign** - Email marketing campaigns
- **EmailOpen/EmailClick** - Email engagement tracking
- **PageView** - Website analytics
- **Feedback** - User feedback and testimonials

### Key Features
- 📊 **Analytics Tracking** - IP, user agent, UTM parameters
- 📧 **Email Engagement** - Open/click tracking
- 🏷️ **Segmentation** - Tags and interests
- 🔄 **Conversion Tracking** - Purchase tracking
- 📝 **Feedback System** - Ratings and testimonials

## 🔄 Migration Process

### Step 1: Deploy Schema Migration

```bash
# Deploy the enhanced schema
npm run deploy-enhanced-schema

# Or run steps manually:
npx prisma migrate deploy
npm run migrate-data
```

### Step 2: Verify Migration

```bash
# Check database health
npm run setup-production

# Verify data integrity
npx prisma studio
```

## 📊 New API Endpoints

### Analytics Tracking

**Track Page Views:**
```typescript
POST /api/analytics/page-view
{
  "page": "/",
  "referrer": "https://google.com",
  "utmParams": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "launch"
  },
  "sessionId": "session_123"
}
```

**Get Analytics:**
```typescript
GET /api/analytics/page-view?days=7&page=/
```

### Enhanced Subscription

**Subscribe with Analytics:**
```typescript
POST /api/subscribe
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Corp",
  "experienceLevel": "SOME_AI_TECH_EXPERIENCE",
  "referralSource": "google",
  "referralMedium": "cpc",
  "referralCampaign": "launch"
}
```

## 🏷️ Data Models

### WaitlistSubscriber (Enhanced)

```prisma
model WaitlistSubscriber {
  // Core fields
  email           String           @unique
  firstName       String?
  lastName        String?
  company         String?
  experienceLevel ExperienceLevel?
  
  // Analytics
  ipAddress        String?
  userAgent        String?
  referralSource   String?
  referralMedium   String?
  referralCampaign String?
  
  // Engagement
  emailOpenCount  Int       @default(0)
  emailClickCount Int       @default(0)
  lastEngagement  DateTime?
  
  // Conversion
  isConverted      Boolean   @default(false)
  conversionDate   DateTime?
  purchaseAmount   Float?
  purchasePlatform String?
  
  // Segmentation
  segment String? @default("waitlist")
  tags    Tag[]
  interests Interest[]
  
  // Communication
  emailConsent     Boolean   @default(true)
  marketingConsent Boolean   @default(true)
  unsubscribed     Boolean   @default(false)
}
```

### Experience Levels

```typescript
enum ExperienceLevel {
  COMPLETE_BEGINNER
  SOME_AI_TECH_EXPERIENCE
  EXPERIENCED_PROFESSIONAL
}
```

## 📈 Analytics Features

### Page View Tracking

Automatically tracks:
- Page visits
- UTM parameters
- Referrer information
- Session data
- User agent and IP

### Email Engagement

Track email performance:
- Open rates
- Click-through rates
- Campaign effectiveness
- User engagement patterns

### Conversion Tracking

Monitor business metrics:
- Conversion rates
- Purchase amounts
- Platform attribution
- Customer lifetime value

## 🎯 Segmentation

### Tags System

Flexible tagging for:
- User categorization
- Campaign targeting
- Behavioral segmentation
- Custom attributes

### Interests

Track user interests:
- Course topics
- Skill levels
- Learning goals
- Content preferences

## 🔧 Usage Examples

### Create Subscriber with Analytics

```typescript
import { prisma } from '@/lib/db'

const subscriber = await prisma.waitlistSubscriber.create({
  data: {
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    experienceLevel: 'SOME_AI_TECH_EXPERIENCE',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
    referralSource: 'google',
    segment: 'early_bird',
    interests: {
      connect: [
        { name: 'AI Fundamentals' },
        { name: 'ChatGPT Mastery' }
      ]
    },
    tags: {
      connect: [
        { name: 'VIP' }
      ]
    }
  },
  include: {
    interests: true,
    tags: true
  }
})
```

### Track Page View

```typescript
const pageView = await prisma.pageView.create({
  data: {
    page: '/',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'launch'
  }
})
```

### Get Analytics Data

```typescript
// Get subscriber analytics
const analytics = await prisma.waitlistSubscriber.groupBy({
  by: ['segment', 'experienceLevel'],
  _count: true,
  where: {
    createdAt: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
    }
  }
})

// Get page view statistics
const pageViews = await prisma.pageView.groupBy({
  by: ['page'],
  _count: true,
  orderBy: {
    _count: {
      page: 'desc'
    }
  }
})
```

## 🚨 Migration Notes

### Backward Compatibility

The migration maintains backward compatibility:
- Legacy `name` field preserved
- Legacy `experience` field preserved
- Legacy `interests` array preserved
- Existing data automatically migrated

### Data Transformation

During migration:
- Names split into firstName/lastName
- Experience mapped to enum values
- Default values set for new fields
- Analytics fields initialized

### Validation

Post-migration validation checks:
- All subscribers have valid emails
- Experience levels properly mapped
- Default interests and tags created
- No data loss occurred

## ✅ Testing

### Test Enhanced Features

```bash
# Test subscription with new fields
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "experienceLevel": "COMPLETE_BEGINNER",
    "referralSource": "test"
  }'

# Test analytics tracking
curl -X POST http://localhost:3000/api/analytics/page-view \
  -H "Content-Type: application/json" \
  -d '{
    "page": "/test",
    "utmParams": {
      "utm_source": "test"
    }
  }'
```

## 🔄 Next Steps

After implementing the enhanced schema:

1. **Update Frontend Forms** - Use new fields in signup forms
2. **Implement Analytics Dashboard** - Build admin interface
3. **Set Up Email Campaigns** - Create campaign management
4. **Configure Segmentation** - Set up automated tagging
5. **Monitor Performance** - Track engagement metrics

---

**Schema Status**: Enhanced schema ready for production deployment
**Migration**: Backward compatible with existing data
**Features**: Analytics, segmentation, email tracking, conversion monitoring
