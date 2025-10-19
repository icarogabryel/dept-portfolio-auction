"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, getCurrentUser } from '../services/users';
import './page.css';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', first_name: '', last_name: '', email: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser({ username: form.username, password: form.password });
      const token = res.data.access;
      const refreshToken = res.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      const userRes = await getCurrentUser(token);
      const user = userRes.data;
      if (user.is_superuser || user.is_staff) {
        router.push('/admin');
      } else {
        router.push('/portfolios');
      }
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser({
        username: form.username,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email
      });
      const token = res.data.access;
      const refreshToken = res.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/portfolios');
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="form-toggle">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
      </div>
      <div className="form-box">
        {isLogin ? (
          <form className="form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="submit" disabled={loading}>Sign In</button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <form className="form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="first_name" type="text" placeholder="First Name" value={form.first_name} onChange={handleChange} />
            <input name="last_name" type="text" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="submit" disabled={loading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
