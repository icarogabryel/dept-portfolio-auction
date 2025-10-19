"use client";
import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import PortfolioListDetails from '../../components/PortfolioListDetails';
import { fetchActivePortfolios } from '../../services/portfolios';
import { getCurrentUser } from '../../services/users';

export default function Page() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser(token)
        .then(res => setCurrentUser(res.data.username))
        .catch(err => console.error('Failed to get current user:', err));
    }
  }, []);

  return (
    <PageLayout title="Portfolios in Auction" showBack={false}>
      <PortfolioListDetails
        fetchPortfolios={fetchActivePortfolios}
        showAdminActions={false}
        currentUser={currentUser}
      />
    </PageLayout>
  );
}
