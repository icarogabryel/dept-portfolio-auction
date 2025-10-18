"use client";
import React, { useState } from 'react';
import './home.css';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="home-container">
      <div className="form-toggle">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="form-box">
        {isLogin ? (
          <form className="form">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="form">
            <h2>Register</h2>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}
