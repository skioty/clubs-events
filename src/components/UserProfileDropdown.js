'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import AvatarSelector from './AvatarSelector';

const UserProfileDropdown = () => {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAvatarSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarSelect = async (newAvatar) => {
    try {
      const response = await fetch('/api/users/avatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: newAvatar }),
      });

      if (response.ok) {
        await update({
          ...session,
          user: {
            ...session.user,
            image: newAvatar,
          },
        });
        setShowAvatarSelector(false);
        setUserData(prev => ({ ...prev }));
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  if (!session) return null;

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-link nav-link d-flex align-items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="position-relative">
          <Image
            src={session.user.image || '/Avatar1.png'}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-circle"
          />
        </div>
      </button>

      {isOpen && (
        <div 
          className="bg-white shadow rounded p-3"
          style={{ 
            width: '300px',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'absolute',
            top: '100%',
            right: '0',
            zIndex: 1000,
            marginTop: '10px'
          }}
        >
          <div className="text-center mb-3">
            <div className="position-relative d-inline-block">
              <Image
                src={session.user.image || '/Avatar1.png'}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-circle mb-2"
              />
              <button
                className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle"
                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                title="Change Avatar"
              >
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <h6 className="mb-1">{session.user.name}</h6>
            <p className="text-muted small mb-0">{session.user.email}</p>
          </div>

          {showAvatarSelector && (
            <div className="mb-3 bg-light p-3 rounded">
              <h6 className="dropdown-header">Select Avatar</h6>
              <AvatarSelector onSelect={handleAvatarSelect} currentAvatar={session.user.image} />
            </div>
          )}

          <hr className="my-2" />

          {loading ? (
            <div className="text-center">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            session.user.role === 'ADMIN' ? (
              <div className="mb-3">
                <p className="text-muted small mb-0">Admin accounts do not enroll in clubs.</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <h6 className="dropdown-header">Enrolled Clubs ({userData?.memberships?.length || 0}/3)</h6>
                  {userData?.memberships?.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {userData.memberships.map((membership) => (
                        <div key={membership.club.id} className="list-group-item px-0 py-2">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-users me-2 text-primary"></i>
                            <span>{membership.club.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">Not enrolled in any clubs</p>
                  )}
                </div>

                <div className="mb-3">
                  <h6 className="dropdown-header">Upcoming Events</h6>
                  {userData?.events?.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {userData.events.map((event) => (
                        <div key={event.id} className="list-group-item px-0 py-2">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-calendar-alt me-2 text-primary"></i>
                            <span>{event.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">No upcoming events</p>
                  )}
                </div>

                <div className="mb-3">
                  <h6 className="dropdown-header">Pending Requests</h6>
                  {userData?.pendingRequests?.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {userData.pendingRequests.map((request) => (
                        <div key={request.id} className="list-group-item px-0 py-2">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-clock me-2 text-warning"></i>
                            <span>{request.club.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">No pending requests</p>
                  )}
                </div>
              </>
            )
          )}

          <hr className="my-2" />

          <div className="d-grid">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => signOut({ callbackUrl: '/signin' })}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown; 