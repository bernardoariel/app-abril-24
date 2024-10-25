import axios from 'axios';
import { refreshToken } from '@/modules/Auth/services/actions'; // La función para manejar la renovación del token

const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    return import.meta.env.VITE_API_BASE_URL_PROD;
  }
  return import.meta.env.VITE_API_BASE_URL_LOCAL;
};

const abrilApiData = axios.create({
  baseURL: getApiBaseUrl(),
});

// Interceptor para agregar el token en las solicitudes
abrilApiData.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
abrilApiData.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

abrilApiData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const newTokens = await refreshToken(storedRefreshToken);

        localStorage.setItem('authToken', newTokens.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
export { abrilApiData };
