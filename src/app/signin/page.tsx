// src/app/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      console.log("SignIn response:", res);

      if (res?.ok) {
        // Success - redirect to homepage
        router.push('/');
        router.refresh(); // Refresh to update session
      } else {
        // Failed - show error
        setError(res?.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-3 text-primary">Sign in</h2>
        <p className="text-center text-muted mb-4">Stay updated with your clubs and events</p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Your password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <Link href="/forgot-password" className="text-decoration-none">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">New to our platform? </span>
          <Link href="/signup" className="text-decoration-none">Create an account</Link>
        </div>
      </div>
    </div>
  );
}