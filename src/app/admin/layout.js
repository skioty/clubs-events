'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role?.toUpperCase() !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role?.toUpperCase() !== 'ADMIN')) {
    return null;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4 className="mb-4">Admin Dashboard</h4>
          <nav className="nav flex-column">
            <Link href="/admin" className="nav-link text-white">
              <i className="fas fa-tachometer-alt me-2"></i>
              Dashboard
            </Link>
            <Link href="/admin/users" className="nav-link text-white">
              <i className="fas fa-users me-2"></i>
              User Management
            </Link>
            <Link href="/admin/clubs" className="nav-link text-white">
              <i className="fas fa-user-friends me-2"></i>
              Club Management
            </Link>
            <Link href="/admin/events" className="nav-link text-white">
              <i className="fas fa-calendar-alt me-2"></i>
              Event Management
            </Link>
          </nav>
          <button
            className="btn btn-outline-danger w-100 mt-4"
            onClick={async () => {
              const { signOut } = await import('next-auth/react');
              signOut({ callbackUrl: '/signin' });
            }}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
} 