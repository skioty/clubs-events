import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    console.log('[ADMIN USERS] Session:', session);

    if (!session) {
      console.log('[ADMIN USERS] No session');
      return NextResponse.json({ error: 'Unauthorized: No session' }, { status: 401 });
    }
    if (!session.user) {
      console.log('[ADMIN USERS] No user in session');
      return NextResponse.json({ error: 'Unauthorized: No user in session' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN') {
      console.log('[ADMIN USERS] Not an admin:', session.user.role);
      return NextResponse.json({ error: 'Unauthorized: Not an admin' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            memberships: true,
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // users will always be an array (empty or with elements)
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
