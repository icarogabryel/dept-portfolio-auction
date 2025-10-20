import React from 'react';
import { useRouter } from 'next/navigation';
import './header.css';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('tokenAccess');
    localStorage.removeItem('tokenRefresh');
    router.push('/');
  };

  return (
    <header className="main-header">
      <img src="/logoipsum-white.svg" type="image/svg+xml" alt="Site Logo" style={{maxWidth: '10em'}}/>
      <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
    </header>
  );
}
