import React from 'react';
import Header from '../components/Header';

export default function PageLayout({ title, showBack, backAction, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, width: '100%', background: '#f7f7fa', display: 'flex', flexDirection: 'column' }}>
        {(title || showBack) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 70 }}>
            {showBack && (
              <button
                style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: '#0158bd', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer' }}
                onClick={backAction}
              >
                Back
              </button>
            )}
            {title && <h1 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem', color: '#0158bd' }}>{title}</h1>}
          </div>
        )}
        <div style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
