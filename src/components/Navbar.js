// components/Navbar.jsx
'use client';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import useScrollNavbar from '../lib/useScrollNavbar';
import UserProfileDropdown from './UserProfileDropdown';
import Link from 'next/link';

const Navbar = () => {
  const navbarRef = useRef(null);
  const { data: session } = useSession();
  useScrollNavbar(navbarRef);

  return (
    <nav ref={navbarRef} id="navbar-container" className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <Link className="navbar-brand" href="/">Clubs and Events</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#carousel-container">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#clubs-container">Clubs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#events-container">Events</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#activities-container">Activities</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#footer-container">About</a>
            </li>
            {session?.user?.role === 'ADMIN' && (
              <li className="nav-item">
                <Link href="/admin" className="nav-link text-primary">
                  <i className="fas fa-tachometer-alt me-1"></i>
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center ms-3">
            <button className="btn search-btn me-3" data-bs-toggle="modal" data-bs-target="#searchModal">
              <i className="fas fa-search me-2"></i> Search
            </button>
            
            {session ? (
              <UserProfileDropdown />
            ) : (
              <Link href="/signin" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
