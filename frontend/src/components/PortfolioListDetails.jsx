"use client";
import { useEffect, useState } from 'react';
import { getBidsOfActivePortfolio, createBid, updateBid } from '../services/bids';
import { getUserProfile } from '../services/users';
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
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    // Get logged username info for bid comparison
    const fetchCurrentUser = async () => {
      const tokenAccess = localStorage.getItem('tokenAccess');
      if (tokenAccess) {
        try {
          const res = await getUserProfile(tokenAccess);
          setCurrentUsername(res.data.username || '');
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchCurrentUser();

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

  const handleCreateUpdateBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(bidAmount);

    // Validation before submitting
    if (bids.length === 0) {
      // If there are no bids, validate against minimum_bid
      if (amount < parseFloat(selectedPortfolio.minimum_bid)) {
        setError(`Bid must be at least the minimum bid of $${selectedPortfolio.minimum_bid}`);
        return;
      }
    } else {
      // If there are existing bids, validate against highest bid (first in the list)
      const highestBid = parseFloat(bids[0].amount);
      if (amount <= highestBid) {
        setError(`Bid must be greater than the current highest bid of $${highestBid}`);
        return;
      }
    }

    setSubmitting(true);
    setError('');

    try {
      // Check if the user already has a bid on this portfolio
      const userBid = bids.find(bid => bid.user === currentUsername);

      if (userBid) {
        // If they already have a bid, update it
        await updateBid({
          bidId: userBid.id,
          amount: amount
        });
      } else {
        // If they don't have a bid, create a new one
        await createBid({
          portfolioId: selectedPortfolio.id,
          amount: amount
        });
      }

      // Reload bids after successful create/update
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

  // Check if the user is winning (first bid in the list)
  const winningBid = bids.length > 0 ? bids[0] : null;
  const isUserWinning = winningBid && winningBid.user === currentUsername;

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
                  {bids.map((bid, index) => {
                    const isWinning = index === 0;
                    const isCurrentUserBid = bid.user === currentUsername;
                    return (
                      <div
                        key={bid.id}
                        className={`bid-item ${isWinning ? 'winning' : ''}`}
                      >
                        <div className="bid-content">
                          ${bid.amount} by {bid.user}
                          {isWinning && (
                            <span className="winning-badge">
                              ✓ This bid is winning
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="bid-form">
                {error && <p className="error-message">{error}</p>}
                <input
                  type="number"
                  step="0.01"
                  placeholder={isUserWinning ? "You're winning!" : "Enter amount"}
                  value={isUserWinning ? '' : bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  disabled={submitting || isUserWinning}
                  className="bid-input"
                  readOnly={isUserWinning}
                />
                <button
                  onClick={handleCreateUpdateBid}
                  disabled={submitting || !bidAmount || isUserWinning}
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
