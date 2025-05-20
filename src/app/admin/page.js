'use client';

import { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClubs: 0,
    totalEvents: 0,
    totalMemberships: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch admin stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3 className="mb-0">{stats.totalUsers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Clubs</Card.Title>
              <h3 className="mb-0">{stats.totalClubs}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Events</Card.Title>
              <h3 className="mb-0">{stats.totalEvents}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Active Memberships</Card.Title>
              <h3 className="mb-0">{stats.totalMemberships}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Recent Activity</h5>
        </Card.Header>
        <Card.Body>
          {stats.recentActivity.length > 0 ? (
            <div className="list-group list-group-flush">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{activity.title}</h6>
                      <p className="mb-0 text-muted small">{activity.description}</p>
                      <small className="text-muted">
                        By {activity.user?.name || 'Unknown'} ({activity.user?.email || 'No email'})
                      </small>
                    </div>
                    <small className="text-muted">
                      {new Date(activity.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">No recent activity</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
} 