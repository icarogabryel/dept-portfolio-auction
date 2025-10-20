"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getIsAdmin, loginUser, registerUser } from '../services/users';
import './page.css';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to route user based on their role
  const routeUser = async (tokenAccess) => {
    const userRes = await getIsAdmin(tokenAccess);
    const user = userRes.data;
    if (user.is_staff) {
      router.push('/admin');
    } else {
      router.push('/portfolios');
    }
  };

  // If user is already logged in, redirect based on role
  useEffect(() => {
    const checkAuth = async () => {
      const tokenAccess = localStorage.getItem('tokenAccess');
      if (tokenAccess) {
        try {
          await routeUser(tokenAccess);
        } catch {
          // Invalid token, stay on login page
        }
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.target);
      const username = formData.get('username');
      const password = formData.get('password');

      const res = await loginUser({ username, password });
      const tokenAccess = res.data.access;
      const tokenRefresh = res.data.refresh;
      localStorage.setItem('tokenAccess', tokenAccess);
      localStorage.setItem('tokenRefresh', tokenRefresh);
      await routeUser(tokenAccess);
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
      const formData = new FormData(e.target);
      const username = formData.get('username');
      const password = formData.get('password');
      const first_name = formData.get('first_name');
      const last_name = formData.get('last_name');

      const res = await registerUser({
        username,
        password,
        first_name,
        last_name
      });
      const tokenAccess = res.data.access;
      const tokenRefresh = res.data.refresh;
      localStorage.setItem('tokenAccess', tokenAccess);
      localStorage.setItem('tokenRefresh', tokenRefresh);
      await routeUser(tokenAccess);
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
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit" disabled={loading}>Sign In</button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <form className="form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input name="username" type="text" placeholder="Username" />
            <input name="first_name" type="text" placeholder="First Name" />
            <input name="last_name" type="text" placeholder="Last Name" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit" disabled={loading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
