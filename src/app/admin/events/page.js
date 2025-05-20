'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Form } from 'react-bootstrap';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/events');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch events');
      }
      
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message || 'An error occurred while fetching events');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event status');
      }

      await fetchEvents();
    } catch (error) {
      console.error('Error updating event status:', error);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Event Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create New Event
        </Button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="alert alert-info">
          No events found. Create your first event to get started!
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>
                  <Badge bg={event.status === 'active' ? 'success' : 'secondary'}>
                    {event.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={event.status === 'active' ? 'outline-danger' : 'outline-success'}
                    size="sm"
                    onClick={() => handleStatusChange(event.id, event.status === 'active' ? 'inactive' : 'active')}
                  >
                    {event.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <h4>{selectedEvent.title || 'N/A'}</h4>
              <p>{selectedEvent.description || 'No description available'}</p>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <h5>Event Information</h5>
                  <p><strong>Date:</strong> {selectedEvent.date ? new Date(selectedEvent.date).toLocaleString() : 'N/A'}</p>
                  <p><strong>Location:</strong> {selectedEvent.location || 'N/A'}</p>
                  <p><strong>Club:</strong> {selectedEvent.club?.name || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <h5>Attendees</h5>
                  {selectedEvent.enrollments?.length > 0 ? (
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEvent.enrollments.map((enrollment) => (
                          <tr key={enrollment.id}>
                            <td>{enrollment.user?.name || 'N/A'}</td>
                            <td>{enrollment.user?.email || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No attendees yet.</p>
                  )}
                </div>
              </div>
            </div>
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