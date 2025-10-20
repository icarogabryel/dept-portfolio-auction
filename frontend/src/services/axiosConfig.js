import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Flag indicating if a token refresh request is currently in progress
let isRefreshing = false;
let refreshSubscribers = [];

// Add a subscriber callback that will be called when the token is refreshed
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Once the token is refreshed, call all subscriber callbacks with the new token
const onRefreshed = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// Interceptor to handle 401 Unauthorized responses and automatically refresh tokens
axiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses unchanged
  async error => {
    const originalRequest = error.config;

    // If we get a 401 and haven't retried this request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we're already refreshing, queue up this request
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Mark as retried and set the refreshing flag
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get the refresh token from localStorage (if running in browser)
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('tokenRefresh') : null;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call the refresh endpoint to get a new access token
        const response = await axios.post(`${API_BASE}/users/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        // Store the new token for subsequent requests
        localStorage.setItem('tokenAccess', newAccessToken);

        // Update default header on axiosInstance and original request
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Notify all queued requests to retry with the new token
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        // If refresh fails, clear stored tokens and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tokenAccess');
          localStorage.removeItem('tokenRefresh');
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }

    // For other errors, reject the promise normally
    return Promise.reject(error);
  }
);

// Export the configured axios instance for use in other modules
export default axiosInstance;
