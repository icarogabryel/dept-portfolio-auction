import React from 'react';
import Header from '../components/Header';
import './PageLayout.css';

export default function PageLayout({ title, showBack, backAction, children }) {
  return (
    <div className="page-layout-root">
      <Header />
      <div className="page-layout-content-wrapper">
        {(title || showBack) && (
          <div className="page-layout-header-section">
            {showBack && (
              <button className="page-layout-back-button" onClick={backAction}>
                Back
              </button>
            )}
            {title && <h1 className="page-layout-title">{title}</h1>}
          </div>
        )}
        <div className="page-layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}
