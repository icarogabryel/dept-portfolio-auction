"use client";
import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import PortfolioListDetails from '../../components/PortfolioListDetails';
import { fetchAllPortfolios } from '../../services/portfolios';

export default function Page() {
  return (
    <PageLayout title="All Portfolios" showBack={false}>
      <PortfolioListDetails
        fetchPortfolios={fetchAllPortfolios}
        showAdminActions={true}
      />
    </PageLayout>
  );
}
