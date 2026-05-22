import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const registerUser      = (data)  => API.post('/auth/register', data);
export const loginUser         = (data)  => API.post('/auth/login', data);
export const forgotPassword    = (data)  => API.post('/auth/forgot-password', data);
export const resetPassword     = (token, data) => API.post(`/auth/reset-password/${token}`, data);
export const getMyProfile      = ()      => API.get('/auth/me');

export default API;
