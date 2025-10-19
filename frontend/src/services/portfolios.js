import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchActivePortfolios() {
  const res = await axios.get(`${API_BASE}/api/portfolios/active/`);
  return res.data;
}

export async function fetchAllPortfolios() {
  const res = await axios.get(`${API_BASE}/api/portfolios/`);
  return res.data;
}
