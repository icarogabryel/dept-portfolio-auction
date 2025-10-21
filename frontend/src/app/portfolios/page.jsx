"use client";
import { useRouter } from 'next/navigation';
import PortfolioListDetails from '../../components/PortfolioListDetails';
import ProtectedRoute from '../../components/ProtectedRoute';
import PageLayout from '../../layouts/PageLayout';
import { fetchActivePortfolios } from '../../services/portfolios';

function PortfoliosContent() {
  const router = useRouter();

  return (
    <PageLayout title="Portfolios in Auction">
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/my-bids')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          🪙 My Bids
        </button>
      </div>

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
