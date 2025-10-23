import axios from 'axios';

const dunnoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


dunnoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { dunnoApi };
