"use client";
import React, { useEffect, useState } from 'react';
import './portfolioListDetails.css';

export default function PortfolioListDetails({ fetchPortfolios }) {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios()
      .then(data => setPortfolios(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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

            <div className="detail-row">
              <label>Total Amount:</label>
              <div>${selectedPortfolio.total_amount}</div>
            </div>

            <div className="detail-row">
              <label>Minimum Bid:</label>
              <div>${selectedPortfolio.minimum_bid}</div>
            </div>

            <div className="detail-row">
              <label>Auction End:</label>
              <div>{new Date(selectedPortfolio.auction_end).toLocaleString()}</div>
            </div>

            <div className="detail-row">
              <label>Description:</label>
              <div>{selectedPortfolio.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
