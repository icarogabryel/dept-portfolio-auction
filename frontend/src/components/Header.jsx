"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/users';
import { getUserNotifications } from '../services/notifications';
import './header.css';

export default function Header() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('User');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleNotificationsClick = async () => {
    if (!showNotifications) {
      try {
        const data = await getUserNotifications();
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    }
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    localStorage.removeItem('tokenAccess');
    localStorage.removeItem('tokenRefresh');
    router.push('/');
  };

  return (
    <header className="main-header">
      <img src="/logoipsum-white.svg" type="image/svg+xml" alt="Site Logo" style={{maxWidth: '10em'}}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        <button onClick={handleNotificationsClick} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', position: 'relative' }}>
          🔔
          {notifications.length > 0 && (
            <span style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {notifications.length}
            </span>
          )}
        </button>
        <span>Hello, {firstName}.</span>
        <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>

        {showNotifications && (
          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 10, background: 'white', border: '1px solid #ddd', borderRadius: 8, width: 350, maxHeight: 400, overflow: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000 }}>
            <div style={{ padding: 15, borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#333' }}>
              Notifications
            </div>
            {notifications.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>No notifications</div>
            ) : (
              <div>
                {notifications.map(notif => (
                  <div key={notif.id} style={{ padding: 15, borderBottom: '1px solid #eee', color: '#333' }}>
                    <div style={{ fontWeight: 600, marginBottom: 5 }}>{notif.portfolio_name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{notif.message}</div>
                    <div style={{ fontSize: '0.8rem', color: '#999', marginTop: 5 }}>
                      {new Date(notif.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
