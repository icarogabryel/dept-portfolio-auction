import axiosInstance from './axiosConfig';

export async function fetchActivePortfolios() {
  const res = await axiosInstance.get(`/portfolios/active/`);
  return res.data;
}

export async function fetchAllPortfolios() {
  const res = await axiosInstance.get(`/portfolios/`);
  return res.data;
}
