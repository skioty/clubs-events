import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    console.log('[ADMIN CLUBS] Session:', session);

    if (!session || session.user.role !== 'ADMIN') {
      console.log('[ADMIN CLUBS] Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clubs = await prisma.club.findMany({
      include: {
        _count: {
          select: {
            memberships: true,
            events: true
          }
        },
        events: {
          take: 5,
          orderBy: {
            date: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
} 