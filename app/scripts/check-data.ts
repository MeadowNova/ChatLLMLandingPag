import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📊 Checking email subscribers...');
  
  const subscribers = await prisma.waitlistSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: {
      interests: true, // Include the related interests
    },
  });

  console.log('\n--- Latest Subscribers ---');
  if (subscribers.length === 0) {
    console.log('No subscribers found.');
  } else {
    subscribers.forEach((sub: any, index: number) => {
      const interestNames = sub.interests.map((interest: any) => interest.name).join(', ');
      console.log(`${index + 1}. ${sub.firstName} ${sub.lastName} (${sub.email}) - ${sub.experienceLevel} - [${interestNames}]`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
