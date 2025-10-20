"use client";
import PortfolioListDetails from '../../components/PortfolioListDetails';
import ProtectedRoute from '../../components/ProtectedRoute';
import PageLayout from '../../layouts/PageLayout';
import { fetchAllPortfolios } from '../../services/portfolios';

function AdminContent() {
  return (
    <PageLayout title="All Portfolios" showBack={false}>
      <PortfolioListDetails
        fetchPortfolios={fetchAllPortfolios}
        showAdminActions={true}
      />
    </PageLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute adminRequired={true}>
      <AdminContent />
    </ProtectedRoute>
  );
}
