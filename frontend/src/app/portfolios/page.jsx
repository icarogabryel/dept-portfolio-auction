"use client";
import PortfolioListDetails from '../../components/PortfolioListDetails';
import ProtectedRoute from '../../components/ProtectedRoute';
import PageLayout from '../../layouts/PageLayout';
import { fetchActivePortfolios } from '../../services/portfolios';

function PortfoliosContent() {
  return (
    <PageLayout title="Portfolios in Auction">
      <PortfolioListDetails
        fetchPortfolios={fetchActivePortfolios}
      />
    </PageLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <PortfoliosContent />
    </ProtectedRoute>
  );
}
