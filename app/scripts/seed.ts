// ChatLLM Mastery - Database Seed Script
// Run with: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ChatLLM Mastery database...');

  // Sample email subscribers for testing
  const sampleSubscribers = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      source: 'landing_page',
      experience: 'beginner',
      interests: ['Starting AI Agency', 'Technical Skills']
    },
    {
      email: 'sarah.smith@example.com',
      name: 'Sarah Smith',
      source: 'social_media',
      experience: 'some-experience',
      interests: ['SMB Consulting', 'Business Growth']
    },
    {
      email: 'mike.johnson@example.com',
      name: 'Mike Johnson',
      source: 'referral',
      experience: 'experienced',
      interests: ['Passive Income', 'Career Change']
    },
    {
      email: 'lisa.brown@example.com',
      name: 'Lisa Brown',
      source: 'landing_page',
      experience: 'business-owner',
      interests: ['Starting AI Agency', 'Business Growth', 'SMB Consulting']
    },
    {
      email: 'david.wilson@example.com',
      name: 'David Wilson',
      source: 'organic_search',
      experience: 'beginner',
      interests: ['Technical Skills', 'Career Change']
    }
  ];

  console.log('📝 Creating sample email subscribers...');
  
  for (const subscriber of sampleSubscribers) {
    try {
      await prisma.emailSubscriber.upsert({
        where: { email: subscriber.email },
        update: {
          name: subscriber.name,
          source: subscriber.source,
          experience: subscriber.experience,
          interests: subscriber.interests,
          status: 'active'
        },
        create: {
          email: subscriber.email,
          name: subscriber.name,
          source: subscriber.source,
          experience: subscriber.experience,
          interests: subscriber.interests,
          status: 'active'
        }
      });
      console.log(`✅ Created/updated subscriber: ${subscriber.email}`);
    } catch (error) {
      console.error(`❌ Error creating subscriber ${subscriber.email}:`, error);
    }
  }

  // Get final count
  const subscriberCount = await prisma.emailSubscriber.count();

  console.log('🎉 Database seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - ${subscriberCount} total email subscribers`);
  console.log('');
  console.log('🚀 Your database is ready for the ChatLLM Mastery landing page!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
