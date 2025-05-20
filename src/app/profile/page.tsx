import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  // Redirect to sign-in page if no session
  if (!session) {
    redirect("/signin");
  }

  // Fetch user and enrolled clubs from database using session user id
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      enrollments: {
        include: { club: true },
      },
    },
  });

  if (!user) {
    return <div className="container mt-5">User not found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Welcome, {user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <hr />

        <h4>Enrolled Clubs</h4>
        {user.enrollments.length === 0 ? (
          <p className="text-muted">You are not enrolled in any clubs yet.</p>
        ) : (
          <ul className="list-group">
            {user.enrollments.map((enroll) => (
              <li key={enroll.club.id} className="list-group-item">
                {enroll.club.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
