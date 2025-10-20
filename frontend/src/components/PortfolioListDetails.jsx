"use client";
import { useEffect, useState } from 'react';
import { getBidsOfActivePortfolio, createBid } from '../services/bids';
import './portfolioListDetails.css';

export default function PortfolioListDetails({ fetchPortfolios }) {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBids, setLoadingBids] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolios()
      .then(data => setPortfolios(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedPortfolio) {
      setLoadingBids(true);
      setError('');
      setBidAmount('');
      getBidsOfActivePortfolio(selectedPortfolio.id)
        .then(response => {
          setBids(response.data);
          // If there are no bids, set bid amount with minimum bid
          if (response.data.length === 0) {
            setBidAmount(selectedPortfolio.minimum_bid);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingBids(false));
    }
  }, [selectedPortfolio]);

  const handleCreateBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await createBid({
        portfolioId: selectedPortfolio.id,
        amount: parseFloat(bidAmount)
      });

      // Recarrega os bids após criar com sucesso
      const response = await getBidsOfActivePortfolio(selectedPortfolio.id);
      setBids(response.data);
      setBidAmount('');
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.amount?.[0] || 'Failed to create bid');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="portfolio-container">
      {/* Left - Portfolio List */}
      <div className="portfolio-list">
        <h3>Portfolios</h3>
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className={`portfolio-item ${selectedPortfolio?.id === portfolio.id ? 'selected' : ''}`}
            onClick={() => setSelectedPortfolio(portfolio)}
          >
            <div><strong>{portfolio.name}</strong></div>
            <div>Total Amount: ${portfolio.total_amount}</div>
          </div>
        ))}
      </div>

      {/* Right - Portfolio Details */}
      <div className="portfolio-details">
        {!selectedPortfolio ? (
          <div className="empty-state">
            Select a portfolio to see details
          </div>
        ) : (
          <div>
            <h2>{selectedPortfolio.name}</h2>
            <div className="details-grid">
              <div><strong>Total Amount:</strong> ${selectedPortfolio.total_amount}</div>
              <div><strong>Minimum Bid:</strong> ${selectedPortfolio.minimum_bid}</div>
              <div><strong>Auction End:</strong> {new Date(selectedPortfolio.auction_end).toLocaleString()}</div>
            </div>
            <div className="description">
              <strong>Description:</strong>
              <p>{selectedPortfolio.description}</p>
            </div>

            <div className="bids-section">
              <h3>Bids</h3>
              {loadingBids ? (
                <p>Loading bids...</p>
              ) : bids.length === 0 ? (
                <p className="no-bids">No bids yet</p>
              ) : (
                <div className="bids-list">
                  {bids.map((bid) => (
                    <div key={bid.id} className="bid-item">
                      ${bid.amount} by {bid.user}
                    </div>
                  ))}
                </div>
              )}

              <div className="bid-form">
                {error && <p className="error-message">{error}</p>}
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  disabled={submitting}
                  className="bid-input"
                />
                <button
                  onClick={handleCreateBid}
                  disabled={submitting || !bidAmount}
                  className="bid-button"
                >
                  {submitting ? 'Submitting...' : (bids.length === 0 ? 'Do Bid' : 'Outbid')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
