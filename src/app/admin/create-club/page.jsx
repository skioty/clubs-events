'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateClubPage() {
  const { data: session, status } = useSession(); // ✅ Added `status`
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // ✅ Wait for session to load
  if (status === 'loading') return <p>Loading...</p>;

  // ✅ Block access if not authenticated or not an admin
  if (!session || session.user.role !== 'ADMIN') {
    return <p>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    } else {
      router.push('/admin'); // ✅ Redirect after successful creation
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Club Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Club
        </button>
      </form>
    </div>
  );
}
