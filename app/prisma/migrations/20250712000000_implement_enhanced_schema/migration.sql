-- Enhanced Schema Migration
-- This migration implements the full enhanced schema with analytics, campaigns, and engagement tracking

-- Create ExperienceLevel enum
CREATE TYPE "experience_levels" AS ENUM ('COMPLETE_BEGINNER', 'SOME_AI_TECH_EXPERIENCE', 'EXPERIENCED_PROFESSIONAL');

-- Add new columns to existing email_subscribers table
ALTER TABLE "email_subscribers" ADD COLUMN "firstName" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "lastName" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "company" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "experienceLevel" "experience_levels";

-- Add legacy fields for backward compatibility
ALTER TABLE "email_subscribers" ADD COLUMN "legacyInterests" TEXT[];

-- Add analytics fields
ALTER TABLE "email_subscribers" ADD COLUMN "ipAddress" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "userAgent" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "referralSource" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "referralMedium" TEXT;
ALTER TABLE "email_subscribers" ADD COLUMN "referralCampaign" TEXT;

-- Add engagement tracking
ALTER TABLE "email_subscribers" ADD COLUMN "emailOpenCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "email_subscribers" ADD COLUMN "emailClickCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "email_subscribers" ADD COLUMN "lastEngagement" TIMESTAMP(3);

-- Add conversion tracking
ALTER TABLE "email_subscribers" ADD COLUMN "isConverted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "email_subscribers" ADD COLUMN "conversionDate" TIMESTAMP(3);
ALTER TABLE "email_subscribers" ADD COLUMN "purchaseAmount" DOUBLE PRECISION;
ALTER TABLE "email_subscribers" ADD COLUMN "purchasePlatform" TEXT;

-- Add segmentation
ALTER TABLE "email_subscribers" ADD COLUMN "segment" TEXT DEFAULT 'waitlist';

-- Add communication preferences
ALTER TABLE "email_subscribers" ADD COLUMN "emailConsent" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "email_subscribers" ADD COLUMN "marketingConsent" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "email_subscribers" ADD COLUMN "unsubscribed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "email_subscribers" ADD COLUMN "unsubscribeDate" TIMESTAMP(3);

-- Create interests table
CREATE TABLE "interests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- Create tags table
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- Create email campaigns table
CREATE TABLE "email_campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "totalSent" INTEGER NOT NULL DEFAULT 0,
    "totalOpens" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_campaigns_pkey" PRIMARY KEY ("id")
);

-- Create email opens table
CREATE TABLE "email_opens" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "email_opens_pkey" PRIMARY KEY ("id")
);

-- Create email clicks table
CREATE TABLE "email_clicks" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clickedUrl" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "email_clicks_pkey" PRIMARY KEY ("id")
);

-- Create page views table
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "sessionId" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- Create feedback table
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT,
    "rating" INTEGER,
    "message" TEXT NOT NULL,
    "isTestimonial" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "guestName" TEXT,
    "guestEmail" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- Create many-to-many relationship tables
CREATE TABLE "_InterestToWaitlistSubscriber" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

CREATE TABLE "_TagToWaitlistSubscriber" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- Create unique indexes
CREATE UNIQUE INDEX "interests_name_key" ON "interests"("name");
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
CREATE UNIQUE INDEX "email_campaigns_name_key" ON "email_campaigns"("name");

-- Create relationship indexes
CREATE UNIQUE INDEX "_InterestToWaitlistSubscriber_AB_unique" ON "_InterestToWaitlistSubscriber"("A", "B");
CREATE INDEX "_InterestToWaitlistSubscriber_B_index" ON "_InterestToWaitlistSubscriber"("B");
CREATE UNIQUE INDEX "_TagToWaitlistSubscriber_AB_unique" ON "_TagToWaitlistSubscriber"("A", "B");
CREATE INDEX "_TagToWaitlistSubscriber_B_index" ON "_TagToWaitlistSubscriber"("B");

-- Add foreign key constraints
ALTER TABLE "email_opens" ADD CONSTRAINT "email_opens_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "email_subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "email_opens" ADD CONSTRAINT "email_opens_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "email_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "email_clicks" ADD CONSTRAINT "email_clicks_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "email_subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "email_clicks" ADD CONSTRAINT "email_clicks_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "email_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "feedback" ADD CONSTRAINT "feedback_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "email_subscribers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "_InterestToWaitlistSubscriber" ADD CONSTRAINT "_InterestToWaitlistSubscriber_A_fkey" FOREIGN KEY ("A") REFERENCES "interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_InterestToWaitlistSubscriber" ADD CONSTRAINT "_InterestToWaitlistSubscriber_B_fkey" FOREIGN KEY ("B") REFERENCES "email_subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_TagToWaitlistSubscriber" ADD CONSTRAINT "_TagToWaitlistSubscriber_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_TagToWaitlistSubscriber" ADD CONSTRAINT "_TagToWaitlistSubscriber_B_fkey" FOREIGN KEY ("B") REFERENCES "email_subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
