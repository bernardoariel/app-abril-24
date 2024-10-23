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

// Interceptor para manejar tokens expirados
abrilApiData.interceptors.response.use(
  (response) => response, // Pasamos las respuestas exitosas sin cambios
  async (error) => {
    const originalRequest = error.config; // Guardar la solicitud original

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Si recibimos un error 401 (token expirado o no autorizado) y aún no reintentamos
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');

        // Intentar refrescar el token con el refresh token guardado
        const newTokens = await refreshToken(storedRefreshToken);

        // Guardar el nuevo token en localStorage
        localStorage.setItem('authToken', newTokens.accessToken);

        // Actualizar el header de autorización con el nuevo access token
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;

        // Reintentar la solicitud original con el nuevo token
        return axios(originalRequest);
      } catch (refreshError) {
        // Si la renovación falla, limpiar los tokens y redirigir al login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    // Para cualquier otro error, retornamos el error original
    if (error.message === 'Network Error') {
      console.error(
        'No se pudo conectar al servidor. Verifica tu conexión o si el servidor está activo.',
      );
    }
    // Para cualquier otro error, retornamos el error original
    return Promise.reject(error);
  },
);

export { abrilApiData };
