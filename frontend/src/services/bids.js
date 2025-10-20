import axiosInstance from './axiosConfig';

export async function createBid({ portfolioId, amount }) {
  return axiosInstance.post(`/bids/actives/`, { portfolio: portfolioId, amount: amount });
}

export async function updateBid({ bidId, amount }) {
  return axiosInstance.patch(`/bids/actives/${bidId}/`, { amount });
}

export async function getBidsOfActivePortfolio(portfolioId) {
  return axiosInstance.get(`/bids/actives/?portfolio=${portfolioId}`);
}
