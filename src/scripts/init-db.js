const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user created:', admin);

    // Create additional users
    const users = await prisma.user.createMany({
      data: [
        { email: 'user1@example.com', name: 'User One', password: await bcrypt.hash('user1234', 10), role: 'USER' },
        { email: 'user2@example.com', name: 'User Two', password: await bcrypt.hash('user1234', 10), role: 'USER' },
      ],
      skipDuplicates: true,
    });
    console.log('Test users created:', users);

    // Create multiple clubs
    const clubsData = Array.from({ length: 10 }).map((_, i) => ({
      name: `Club ${i + 1}`,
      description: `Description for Club ${i + 1}`,
    }));
    const clubs = await prisma.club.createMany({ data: clubsData });
    console.log('Test clubs created:', clubs);

    // Fetch all clubs
    const allClubs = await prisma.club.findMany();

    // Create multiple events for each club
    for (const club of allClubs) {
      await prisma.event.createMany({
        data: [
          {
            title: `Event 1 for ${club.name}`,
            description: `First event for ${club.name}`,
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            location: 'Main Hall',
            clubId: club.id,
          },
          {
            title: `Event 2 for ${club.name}`,
            description: `Second event for ${club.name}`,
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            location: 'Conference Room',
            clubId: club.id,
          },
        ],
      });
    }
    console.log('Test events created for all clubs');

    // Optionally, create memberships
    const firstClub = allClubs[0];
    await prisma.membership.create({
      data: {
        userId: admin.id,
        clubId: firstClub.id,
        status: 'active',
      },
    });
    console.log('Admin added as member to first club');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 