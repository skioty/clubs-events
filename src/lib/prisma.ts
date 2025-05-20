// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  try {
    globalForPrisma.prisma = new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    throw new Error('Database connection failed');
  }
}

export const prisma = globalForPrisma.prisma;

// Handle cleanup on process termination
if (process.env.NODE_ENV !== 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}
