import React, { useEffect, useState } from 'react';

function getCurrentValue(portfolio) {
  if (portfolio.bids && portfolio.bids.length > 0) {
    const maxBid = Math.max(...portfolio.bids.map(b => Number(b.amount)));
    return maxBid;
  }
  return Number(portfolio.minimum_bid);
}

export default function PortfolioListDetails({
  fetchPortfolios,
  rightMessage = 'Select a portfolio to see details.',
  rightCustom,
  detailsCustom,
}) {
  const [portfolios, setPortfolios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolios()
      .then(setPortfolios)
      .catch(() => setError('Failed to load portfolios.'))
      .finally(() => setLoading(false));
  }, [fetchPortfolios]);

  return (
    <div style={{ display: 'flex', gap: '2rem', minHeight: 400 }}>
      {/* Left: List */}
      <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1rem', minWidth: 280 }}>
        <h3 style={{ color: '#0158bd', marginBottom: '1rem' }}>Portfolios</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {portfolios.map((p) => (
            <li key={p.id} style={{ marginBottom: '1rem', cursor: 'pointer', padding: '0.5rem', borderRadius: 4, background: selected?.id === p.id ? '#c6d8ffff' : '#ecececff' }} onClick={() => setSelected(p)}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: '0.95em', color: '#333' }}>Current Value: <b>${getCurrentValue(p).toLocaleString()}</b></div>
            </li>
          ))}
        </ul>
      </div>
      {/* Right: Details or message */}
      <div style={{ flex: 2, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem', minWidth: 350, display: 'flex', flexDirection: 'column', minHeight: 650 }}>
        {!selected ? (
          rightCustom || <div style={{ color: '#888', fontSize: '1.1rem', margin: 'auto' }}>{rightMessage}</div>
        ) : (
          <>
            <div style={{ marginBottom: '1.2rem' }}>
              <h3 style={{ color: '#0158bd', marginBottom: '0.5rem' }}>{selected.name}</h3>
              <div>Description: {selected.description}</div>
              <div>Total Amount: <b>${Number(selected.total_amount).toLocaleString()}</b></div>
              <div>Minimum Bid: <b>${Number(selected.minimum_bid).toLocaleString()}</b></div>
              <div>Auction Ends: <b>{new Date(selected.auction_end).toLocaleString()}</b></div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: 200, marginBottom: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <h4>Bids</h4>
              {selected.bids && selected.bids.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {selected.bids.sort((a, b) => Number(a.amount) - Number(b.amount)).map((bid) => (
                    <li key={bid.id} style={{ marginBottom: '0.5rem' }}>
                      <span><b>${Number(bid.amount).toLocaleString()}</b> by {bid.user || 'Unknown'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#888' }}>No bids yet.</div>
              )}
            </div>
            <div style={{ marginTop: 'auto' }}>
              {detailsCustom ? detailsCustom(selected) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
