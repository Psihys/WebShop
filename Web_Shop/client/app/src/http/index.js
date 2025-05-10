// $authHost.js
import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL // Подставьте свой URL API
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Добавляем токен в заголовки для авторизации
$authHost.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { $authHost, $host };
