import axiosInstance from './axiosConfig';

export async function fetchActivePortfolios() {
  const res = await axiosInstance.get(`/portfolios/active/`);
  return res.data;
}

export async function fetchAllPortfolios() {
  const res = await axiosInstance.get(`/portfolios/`);
  return res.data;
}

export async function updatePortfolio(portfolioId, data) {
  const res = await axiosInstance.put(`/portfolios/${portfolioId}/`, data);
  return res.data;
}

export async function deletePortfolio(portfolioId) {
  const res = await axiosInstance.delete(`/portfolios/${portfolioId}/`);
  return res.data;
}

export async function uploadCsv(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axiosInstance.post('/portfolios/upload-csv/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
