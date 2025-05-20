import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    console.log('[ADMIN STATS] Session:', session);

    if (!session || session.user.role !== 'ADMIN') {
      console.log('[ADMIN STATS] Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalUsers,
      totalClubs,
      totalEvents,
      totalMemberships,
      recentActivity
    ] = await Promise.all([
      prisma.user.count(),
      prisma.club.count(),
      prisma.event.count(),
      prisma.membership.count({
        where: {
          status: 'active'
        }
      }),
      prisma.activity.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          type: true,
          details: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      })
    ]);

    return NextResponse.json({
      totalUsers,
      totalClubs,
      totalEvents,
      totalMemberships,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
