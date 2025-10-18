import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header className="main-header">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#000000ff"/>
        <text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Montserrat, Arial, sans-serif">Logo</text>
    </svg>
      <button className="logout-btn" type="button">Logout</button>
    </header>
  );
}
