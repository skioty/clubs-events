// src/app/api/memberships/update/route.js
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth-config';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession(authConfig);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { membershipId, action } = await req.json(); // action = 'accept' or 'reject'
  const status = action === 'accept' ? 'approved' : 'rejected';

  await prisma.membership.update({
    where: { id: membershipId },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
