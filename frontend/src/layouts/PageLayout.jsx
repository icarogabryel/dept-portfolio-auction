import React from 'react';
import Header from '../components/Header';

export default function PageLayout({ title, showBack, backAction, children }) {
  return (
    <div>
      <Header />
      <div style={{ width: '100%', background: '#f7f7fa'}}>
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
