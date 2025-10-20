"use client";

export default function ConfirmModal({ title, message, onConfirm, onCancel, confirming = false }) {
  return (
    <div onClick={(e) => e.target === e.currentTarget && !confirming && onCancel()}
         style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: 8, padding: 30, maxWidth: 400, width: '90%' }}>
        <h2 style={{ margin: '0 0 15px', color: '#d32f2f', fontSize: '1.5rem' }}>{title}</h2>
        <p style={{ margin: '0 0 25px', color: '#666' }}>{message}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} disabled={confirming}
                  style={{ padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, background: '#e0e0e0' }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={confirming}
                  style={{ padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, background: '#d32f2f', color: 'white' }}>
            {confirming ? 'Deleting...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}