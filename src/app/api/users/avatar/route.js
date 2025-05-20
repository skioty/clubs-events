import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { avatar } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: avatar },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating avatar:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 