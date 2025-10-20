"use client";
import { useEffect, useState } from 'react';
import { getBidsOfActivePortfolio } from '../services/bids';
import './portfolioListDetails.css';

export default function PortfolioListDetails({ fetchPortfolios }) {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBids, setLoadingBids] = useState(false);

  useEffect(() => {
    fetchPortfolios()
      .then(data => setPortfolios(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedPortfolio) {
      setLoadingBids(true);
      getBidsOfActivePortfolio(selectedPortfolio.id)
        .then(response => setBids(response.data))
        .catch(err => console.error(err))
        .finally(() => setLoadingBids(false));
    }
  }, [selectedPortfolio]);

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
