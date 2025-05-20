'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      await fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">User Management</h2>
      
      {users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <Badge bg={user.role === 'ADMIN' ? 'danger' : 'primary'}>
                    {user.role || 'USER'}
                  </Badge>
                </td>
                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRoleChange(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                  >
                    {user.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.name || 'N/A'}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser.email || 'N/A'}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  defaultValue={selectedUser.role || 'USER'}
                  onChange={(e) => handleRoleChange(selectedUser.id, e.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 