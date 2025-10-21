"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../layouts/PageLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { uploadCsv } from '../../services/portfolios';

function UploadCsvContent() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await uploadCsv(file);
      setMessage(response.message || 'Upload realizado com sucesso!');
      setFile(null);
      document.getElementById('csv-input').value = '';
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Erro ao fazer upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Criar Lotes" showBack={false}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.push('/admin-dashboard')}
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

      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px' }}>
        <input
          id="csv-input"
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'block', marginBottom: '20px', width: '100%' }}
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={{
            padding: '12px',
            backgroundColor: file && !loading ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: file && !loading ? 'pointer' : 'not-allowed',
            width: '100%'
          }}
        >
          {loading ? 'Enviando...' : 'Upload'}
        </button>

        {message && (
          <p style={{ marginTop: '20px', padding: '15px', background: '#d4edda', borderRadius: '4px' }}>
            {message}
          </p>
        )}
      </div>
    </PageLayout>
  );
}

export default function Page() {
  return (
    <ProtectedRoute adminRequired={true}>
      <UploadCsvContent />
    </ProtectedRoute>
  );
}
