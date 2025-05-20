'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';

export default function ClubManagement() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch('/api/admin/clubs');
      const data = await response.json();
      setClubs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (clubId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/clubs/${clubId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchClubs();
      }
    } catch (error) {
      console.error('Error updating club status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Club Management</h2>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Members</th>
            <th>Events</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.description}</td>
              <td>{club._count?.memberships || 0}</td>
              <td>{club._count?.events || 0}</td>
              <td>{new Date(club.createdAt).toLocaleDateString()}</td>
              <td>
                <Link href={`/admin/clubs/${club.id}`} passHref legacyBehavior>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    Manage Requests
                  </Button>
                </Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleStatusChange(club.id, 'suspended')}
                >
                  Suspend
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
} 