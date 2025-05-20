'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminClubPage() {
  const { id: clubId } = useParams();
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch(`/api/memberships/${clubId}`);
      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, [clubId]);

  const handleAction = async (membershipId, action) => {
    const res = await fetch('/api/memberships/update', {
      method: 'POST',
      body: JSON.stringify({ membershipId, action }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setRequests((prev) => prev.filter((r) => r.id !== membershipId));
    }
  };

  if (!session || session.user.role !== 'ADMIN') return <p>Access Denied</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{req.user.name || req.user.email}</p>
              <p className="text-sm text-gray-500">{req.user.email}</p>
              {req.applicationDescription && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <pre className="text-sm whitespace-pre-wrap">{req.applicationDescription}</pre>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(req.id, 'accept')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(req.id, 'reject')}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
