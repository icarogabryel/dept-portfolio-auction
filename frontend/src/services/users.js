import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function loginUser({ username, password }) {
  return axios.post(`${API_BASE}/users/token/`, { username, password });
}

export async function registerUser({ username, password, first_name, last_name, email }) {
  return axios.post(`${API_BASE}/users/register/`, { username, password, first_name, last_name, email });
}

export async function getCurrentUser(token) {
  return axios.get(`${API_BASE}/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
