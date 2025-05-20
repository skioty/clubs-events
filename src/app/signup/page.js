'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
        data = { message: "Unexpected response from server" };
      }

      if (res.ok) {
        alert("Account created successfully!");
        router.push('/signin');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-6 col-lg-5 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-3 text-primary">Create an account</h2>
        <p className="text-center text-muted mb-4">Join and manage your clubs & events</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Sign up</button>
        </form>

        <div className="text-center">
          <span className="text-muted">Already have an account? </span>
          <Link href="/signin" className="text-decoration-none">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
