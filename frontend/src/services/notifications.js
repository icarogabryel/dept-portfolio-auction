import axiosInstance from './axiosConfig';

export async function getUserNotifications() {
  const res = await axiosInstance.get('/notifications/');
  return res.data;
}
