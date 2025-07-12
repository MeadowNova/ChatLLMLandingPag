import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📊 Checking email subscribers...');
  
  const subscribers = await prisma.emailSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  console.log(`Found ${subscribers.length} subscribers:`);
  subscribers.forEach((sub, index) => {
    console.log(`${index + 1}. ${sub.name} (${sub.email}) - ${sub.experience} - [${sub.interests.join(', ')}]`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
