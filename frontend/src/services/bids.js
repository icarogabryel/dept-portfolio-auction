import axiosInstance from './axiosConfig';

export async function createBid({ portfolioId, amount }) {
  return axiosInstance.post(`/bids/`, { portfolio: portfolioId, amount });
}

export async function updateBid({ bidId, amount }) {
  return axiosInstance.patch(`/bids/${bidId}/`, { amount });
}

export async function getBidsForPortfolio(portfolioId) {
  return axiosInstance.get(`/bids/?portfolio=${portfolioId}`);
}
