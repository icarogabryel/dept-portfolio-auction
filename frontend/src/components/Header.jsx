"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/users';
import './header.css';

export default function Header() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('User');

  useEffect(() => {
    const fetchUserName = async () => {
      const tokenAccess = localStorage.getItem('tokenAccess');
      if (tokenAccess) {
        try {
          const res = await getUserProfile(tokenAccess);
          setFirstName(res.data.first_name);
        } catch {
          setFirstName('User');
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tokenAccess');
    localStorage.removeItem('tokenRefresh');
    router.push('/');
  };

  return (
    <header className="main-header">
      <img src="/logoipsum-white.svg" type="image/svg+xml" alt="Site Logo" style={{maxWidth: '10em'}}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span>Hello, {firstName}.</span>
        <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
