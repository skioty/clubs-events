"use client";
import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Analytics & Reports</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {stats && (
        <div style={{marginBottom: 32}}>
          <h4>Key Stats</h4>
          <ul>
            <li>Total Users: {stats.totalUsers}</li>
            <li>Total Clubs: {stats.totalClubs}</li>
            <li>Total Events: {stats.totalEvents}</li>
            <li>Active Memberships: {stats.totalMemberships}</li>
          </ul>
        </div>
      )}
      <div>
        <h4>Charts (Coming Soon)</h4>
        <div style={{height: 300, background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span>Chart will be displayed here</span>
        </div>
      </div>
    </div>
  );
} 