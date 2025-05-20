"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Clubs & Events Platform');
  const [contactEmail, setContactEmail] = useState('admin@example.com');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Settings saved (not persisted yet).');
  };

  return (
    <div>
      <h2>System Settings</h2>
      <form onSubmit={handleSubmit} style={{maxWidth: 400}}>
        <div className="mb-3">
          <label className="form-label">Site Name</label>
          <input type="text" className="form-control" value={siteName} onChange={e => setSiteName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Email</label>
          <input type="email" className="form-control" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
} 