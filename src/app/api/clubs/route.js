import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';

export async function GET() {
  const clubs = await prisma.club.findMany();
  return NextResponse.json(clubs);
}

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await req.json();
  const { name, description } = body;

  try {
    const club = await prisma.club.create({
      data: { name, description },
    });
    return NextResponse.json(club);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating club' }, { status: 500 });
  }
}
