"use client";
import { useState, useEffect } from 'react';

export default function EditPortfolioModal({ portfolio, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: '', total_amount: '', description: '', minimum_bid: '', auction_end: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (portfolio) {
      const localDateTime = new Date(new Date(portfolio.auction_end).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setFormData({ ...portfolio, auction_end: localDateTime });
    }
  }, [portfolio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave({ ...formData, auction_end: new Date(formData.auction_end).toISOString() });
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (!portfolio) return null;

  const inputStyle = { width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4, fontSize: '1rem' };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: 8, width: '90%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20, borderBottom: '1px solid #ddd' }}>
          <h2 style={{ margin: 0, color: '#0158bd' }}>Edit Portfolio</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 20 }}>
          {error && <p style={{ color: '#d32f2f', padding: 10, background: '#ffebee', borderRadius: 4, marginBottom: 15 }}>{error}</p>}
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={saving} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Total Amount</label>
            <input type="number" step="0.01" value={formData.total_amount} onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })} required disabled={saving} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Minimum Bid</label>
            <input type="number" step="0.01" value={formData.minimum_bid} onChange={(e) => setFormData({ ...formData, minimum_bid: e.target.value })} required disabled={saving} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Auction End</label>
            <input type="datetime-local" value={formData.auction_end} onChange={(e) => setFormData({ ...formData, auction_end: e.target.value })} required disabled={saving} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="4" required disabled={saving} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 15, borderTop: '1px solid #ddd' }}>
            <button type="button" onClick={onClose} disabled={saving} style={{ padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, background: '#e0e0e0' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, background: '#0158bd', color: 'white' }}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
