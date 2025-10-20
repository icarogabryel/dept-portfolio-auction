import axiosInstance from './axiosConfig';

export async function loginUser({ username, password }) {
  return axiosInstance.post(`/users/token/`, { username, password });
}

export async function registerUser({ username, password, first_name, last_name }) {
  return axiosInstance.post(`/users/register/`, { username, password, first_name, last_name });
}

export async function getUserProfile(token) {
  return axiosInstance.get(`/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
