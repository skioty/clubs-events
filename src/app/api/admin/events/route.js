import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('[ADMIN EVENTS] Session:', session);

    if (!session || session.user.role !== 'ADMIN') {
      console.log('[ADMIN EVENTS] Unauthorized');
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        image: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        club: {
          select: {
            id: true,
            name: true
          }
        },
        enrollments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    const eventsWithCount = events.map(event => ({
      ...event,
      _count: {
        enrollments: event.enrollments.length
      }
    }));

    return NextResponse.json(eventsWithCount);
  } catch (error) {
    console.error('Error in events API:', {
      name: error.name,
      message: error.message
    });
    
    if (error.name === 'PrismaClientKnownRequestError') {
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }
    
    if (error.name === 'PrismaClientValidationError') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 