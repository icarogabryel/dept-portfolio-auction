"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../layouts/PageLayout';
import { getUserBids } from '../../services/bids';
import ProtectedRoute from '../../components/ProtectedRoute';

function MyBidsContent() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getUserBids()
      .then(res => setBids(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLayout title="My Bids"><p>Loading...</p></PageLayout>;

  return (
    <PageLayout title="My Bids" showBack={false}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/portfolios')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          ← Back to Portfolios
        </button>
      </div>
      {bids.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', marginTop: 50 }}>No bids yet</p>
      ) : (
        <table style={{ width: '100%', background: 'white', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f7fa', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: 15, textAlign: 'left' }}>Portfolio</th>
              <th style={{ padding: 15, textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bids.map(bid => (
              <tr key={bid.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 15 }}>{bid.portfolio_name}</td>
                <td style={{ padding: 15, textAlign: 'right', fontWeight: 600, color: '#4caf50' }}>${bid.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <MyBidsContent />
    </ProtectedRoute>
  );
}
