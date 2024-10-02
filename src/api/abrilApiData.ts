import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    if (window.location.href.includes('capacitor://')) {
      return import.meta.env.VITE_API_BASE_URL_CAPACITOR;
    }
    return import.meta.env.VITE_API_BASE_URL_PROD;
  }
  return import.meta.env.VITE_API_BASE_URL_LOCAL;
};

const abrilApiData = axios.create({
  baseURL: getApiBaseUrl(),
});
console.log(abrilApiData.defaults.baseURL);

export { abrilApiData };
