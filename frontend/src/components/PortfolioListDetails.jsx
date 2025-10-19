function EditPortfolioModal({ portfolio, onClose, onSave }) {
  const [name, setName] = useState(portfolio.name);
  const [description, setDescription] = useState(portfolio.description);
  const [totalAmount, setTotalAmount] = useState(portfolio.total_amount);
  const [minimumBid, setMinimumBid] = useState(portfolio.minimum_bid);
  const [auctionEnd, setAuctionEnd] = useState(portfolio.auction_end);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
        <h3 style={{ marginTop: 0, color: '#0158bd' }}>Edit Portfolio</h3>
        <form onSubmit={e => { e.preventDefault(); onSave({ ...portfolio, name, description, total_amount: totalAmount, minimum_bid: minimumBid, auction_end: auctionEnd }); }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Description:</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem', minHeight: 60 }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Total Amount:</label>
            <input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Minimum Bid:</label>
            <input type="number" value={minimumBid} onChange={e => setMinimumBid(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Auction End:</label>
            <input type="datetime-local" value={auctionEnd} onChange={e => setAuctionEnd(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0158bd', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
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
  rightCustom,
  showAdminActions = false
}) {
  const [portfolios, setPortfolios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editPortfolio, setEditPortfolio] = useState(null);
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
      <div style={{ flex: 2, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem', minWidth: 350, display: 'flex', flexDirection: 'column', minHeight: 600 }}>
        {!selected ? (
          rightCustom || <div style={{ color: '#888', fontSize: '1.1rem', margin: 'auto' }}>Select a portfolio to see details.</div>
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
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              {showAdminActions ? (
                <>
                  <button style={{ background: '#0158bd', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 600 }} onClick={() => setEditPortfolio(selected)}>Edit</button>
                  <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 600 }} onClick={() => alert('Delete portfolio (not implemented)')}>Delete</button>
                </>
              ) : (
                (() => {
                  const userBid = null;
                  const highestBid = selected.bids && selected.bids.length > 0 ? Math.max(...selected.bids.map(b => Number(b.amount))) : null;
                  if (!userBid) {
                    return <button style={{background:'#1a237e',color:'#fff',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'pointer'}}>Do Bid</button>;
                  }
                  if (userBid && userBid < highestBid) {
                    return <button style={{background:'#eee',color:'#888',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'not-allowed'}} disabled>Outbid</button>;
                  }
                  if (userBid && userBid >= highestBid) {
                    return <button style={{background:'#1a237e',color:'#fff',border:'none',borderRadius:4,padding:'0.7rem 1.5rem',fontWeight:600,cursor:'not-allowed'}} disabled>You are winning!</button>;
                  }
                })()
              )}
            </div>
            {editPortfolio && (
              <EditPortfolioModal
                portfolio={editPortfolio}
                onClose={() => setEditPortfolio(null)}
                onSave={updatedPortfolio => { setEditPortfolio(null); alert('Portfolio updated (not implemented)'); }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
