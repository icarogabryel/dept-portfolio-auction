"use client";
import { useRouter } from 'next/navigation';
import PortfolioListDetails from '../../components/PortfolioListDetails';
import ProtectedRoute from '../../components/ProtectedRoute';
import PageLayout from '../../layouts/PageLayout';
import { getBidsOfPortfolio } from '../../services/bids';
import { fetchAllPortfolios } from '../../services/portfolios';

function AdminContent() {
  const router = useRouter();

  return (
    <PageLayout title="All Portfolios">
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/upload-csv')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          📁 Criar Lotes
        </button>
      </div>

      <PortfolioListDetails
        fetchPortfolios={fetchAllPortfolios}
        fetchBids={getBidsOfPortfolio}
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
