// ChatLLM Mastery - Enhanced Seed Data
// Run with: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ChatLLM Mastery database...');

  // Seed interests from your landing page form
  const interests = [
    {
      name: 'Starting AI Agency',
      description: 'Building a new AI implementation agency from scratch'
    },
    {
      name: 'SMB Consulting',
      description: 'Consulting services for small and medium businesses'
    },
    {
      name: 'Technical Skills',
      description: 'Learning technical AI implementation skills'
    },
    {
      name: 'Business Growth',
      description: 'Growing existing business with AI services'
    },
    {
      name: 'Passive Income',
      description: 'Creating passive income streams with AI'
    },
    {
      name: 'Career Change',
      description: 'Transitioning career into AI field'
    }
  ];

  console.log('📝 Creating interests...');
  for (const interest of interests) {
    await prisma.interest.upsert({
      where: { name: interest.name },
      update: { description: interest.description },
      create: interest
    });
  }

  // Seed segmentation tags
  const tags = [
    {
      name: 'early_bird',
      description: 'Early bird launch participants',
      color: '#3b82f6'
    },
    {
      name: 'high_engagement',
      description: 'Highly engaged subscribers (opens/clicks emails)',
      color: '#10b981'
    },
    {
      name: 'vip',
      description: 'VIP subscribers',
      color: '#8b5cf6'
    },
    {
      name: 'converted',
      description: 'Converted to paid customer',
      color: '#f59e0b'
    },
    {
      name: 'referral_source',
      description: 'Came from referral',
      color: '#ef4444'
    },
    {
      name: 'social_media',
      description: 'Came from social media',
      color: '#06b6d4'
    },
    {
      name: 'organic_search',
      description: 'Found via organic search',
      color: '#84cc16'
    },
    {
      name: 'paid_ads',
      description: 'Came from paid advertising',
      color: '#f7316'
    }
  ];

  console.log('🏷️ Creating segmentation tags...');
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: { description: tag.description, color: tag.color },
      create: tag
    });
  }

  // Seed email campaign templates for your launch sequence
  const campaigns = [
    {
      name: 'Welcome Series - Email 1',
      subject: '🎉 Welcome to ChatLLM Mastery Waitlist!',
      content: 'Thank you for joining our exclusive waitlist for ChatLLM Mastery...',
      sentDate: new Date()
    },
    {
      name: 'Value Email - Week 1',
      subject: 'Behind the Scenes: Creating Your AI Business Templates',
      content: 'This week I wanted to share what goes into creating...',
      sentDate: new Date()
    },
    {
      name: 'Case Study - Week 2',
      subject: 'Case Study: How Sarah Landed Her First $5K AI Client',
      content: 'I want to share an inspiring success story...',
      sentDate: new Date()
    },
    {
      name: 'Early Bird Announcement',
      subject: '🚨 Early Bird Opens Tomorrow - 50% Off First 200!',
      content: 'Get ready! Early bird pricing launches tomorrow...',
      sentDate: new Date()
    },
    {
      name: 'Early Bird Launch',
      subject: 'LIVE NOW: 50% Off ChatLLM Mastery (First 200 Only)',
      content: 'The wait is over! Early bird pricing is now live...',
      sentDate: new Date()
    },
    {
      name: 'Early Bird Urgency - Day 3',
      subject: 'Only [X] Early Bird Spots Remaining',
      content: 'I wanted to give you a quick update...',
      sentDate: new Date()
    },
    {
      name: 'Early Bird Final Hours',
      subject: 'FINAL HOURS: Price Jumps to $999 Tonight',
      content: 'This is your final chance to secure early bird pricing...',
      sentDate: new Date()
    }
  ];

  console.log('📧 Creating email campaign templates...');
  for (const campaign of campaigns) {
    await prisma.emailCampaign.upsert({
      where: { name: campaign.name },
      update: {
        subject: campaign.subject,
        content: campaign.content
      },
      create: campaign
    });
  }

  // Update existing subscribers with default values for new fields
  console.log('🔄 Updating existing subscribers with default values...');
  const updateResult = await prisma.waitlistSubscriber.updateMany({
    where: {
      segment: null // Only update records that haven't been migrated
    },
    data: {
      segment: 'waitlist',
      emailConsent: true,
      marketingConsent: true,
      unsubscribed: false,
      emailOpenCount: 0,
      emailClickCount: 0
    }
  });

  console.log(`✅ Updated ${updateResult.count} existing subscribers with default values`);

  // Get counts for summary
  const interestCount = await prisma.interest.count();
  const tagCount = await prisma.tag.count();
  const campaignCount = await prisma.emailCampaign.count();
  const subscriberCount = await prisma.waitlistSubscriber.count();

  console.log('🎉 Database seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - ${interestCount} interests created`);
  console.log(`   - ${tagCount} segmentation tags created`);
  console.log(`   - ${campaignCount} email campaign templates created`);
  console.log(`   - ${subscriberCount} total subscribers (${updateResult.count} updated with new fields)`);
  console.log('');
  console.log('🚀 Your database is now ready for advanced analytics and segmentation!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
