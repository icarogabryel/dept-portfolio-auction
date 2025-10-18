"use client";
import React, { useEffect, useState } from 'react';
import { fetchActivePortfolios } from '../../services/portfolios';
import '../home.css';

export default function ActivePortfoliosPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivePortfolios()
      .then(setPortfolios)
      .catch(() => setError('Failed to load portfolios.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      <div className="form-box" style={{ minWidth: 350 }}>
        <h2>Active Portfolios</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && portfolios.length === 0 && <p>No active portfolios found.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {portfolios.map((p) => (
            <li key={p.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <strong>{p.name}</strong>
              <div style={{ fontSize: '0.95em', color: '#333', margin: '0.3em 0' }}>{p.description}</div>
              <div>Total Amount: <b>${Number(p.total_amount).toLocaleString()}</b></div>
              <div>Minimum Bid: <b>${Number(p.minimum_bid).toLocaleString()}</b></div>
              <div>Auction Ends: <b>{new Date(p.auction_end).toLocaleString()}</b></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
