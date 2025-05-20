// src/app/api/memberships/[clubId]/route.js
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const clubId = params.clubId;
  console.log('Fetching pending memberships for club:', clubId);
  const members = await prisma.membership.findMany({
    where: { clubId, status: 'pending' },
    include: { user: true },
  });
  console.log('Pending members found:', members);

  return NextResponse.json(members);
}
