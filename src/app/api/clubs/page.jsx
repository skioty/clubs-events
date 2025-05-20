'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ClubsPage() {
  const { data: session } = useSession();
  const [clubs, setClubs] = useState([]);
  const [status, setStatus] = useState({}); // tracks join request statuses

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch('/api/clubs');
      const data = await res.json();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const handleJoin = async (clubId) => {
    const res = await fetch('/api/memberships', {
      method: 'POST',
      body: JSON.stringify({ clubId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      setStatus((prev) => ({ ...prev, [clubId]: 'Requested' }));
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">All Clubs</h1>
      {clubs.map((club) => (
        <div
          key={club.id}
          className="mb-4 border p-4 rounded shadow bg-white flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-semibold">{club.name}</h2>
            <p className="text-sm text-gray-600">{club.description}</p>
          </div>
          {session?.user?.role !== 'admin' && (
            <button
              onClick={() => handleJoin(club.id)}
              disabled={status[club.id]}
              className={`px-4 py-2 rounded ${
                status[club.id]
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white'
              }`}
            >
              {status[club.id] || 'Request to Join'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
