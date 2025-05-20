import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { clubId, studentName, studentId, applicationDescription } = await req.json();

  // Check club limit
  const membershipCount = await prisma.membership.count({
    where: {
      user: { email: session.user.email },
      status: { in: ['pending', 'approved'] }
    }
  });

  if (membershipCount >= 3) {
    return NextResponse.json(
      { error: 'You have already joined 3 clubs. You cannot join more.' },
      { status: 400 }
    );
  }

  try {
    console.log('Creating membership for:', session.user.email, 'Club:', clubId);
    const membership = await prisma.membership.create({
      data: {
        user: { connect: { email: session.user.email } },
        club: { connect: { id: String(clubId) } },
        applicationDescription: `Name: ${studentName}\nStudent ID: ${studentId}\nReason: ${applicationDescription}`,
      },
    });
    console.log('Membership created:', membership);

    return NextResponse.json(membership);
  } catch (err) {
    return NextResponse.json(
      { error: 'You may have already requested to join this club.' },
      { status: 400 }
    );
  }
}
