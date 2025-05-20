import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/lib/auth-config';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    console.log('User session:', session);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        memberships: {
          include: {
            club: {
              include: {
                events: {
                  where: {
                    date: {
                      gte: new Date(),
                    },
                  },
                  orderBy: {
                    date: 'asc',
                  },
                },
              },
            },
          },
        },
        enrollments: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Transform the data to match the expected format
    const transformedUser = {
      ...user,
      events: user.memberships.flatMap(membership => membership.club.events),
      pendingRequests: user.memberships.filter(m => m.status === 'pending'),
      clubLimit: {
        current: user.memberships.filter(m => m.status === 'approved').length,
        max: 3,
        canJoinMore: user.memberships.filter(m => m.status === 'approved').length < 3
      }
    };
    console.log('Transformed user data:', transformedUser);

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 