import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') return import.meta.env.VITE_API_BASE_URL_PROD;
  if (window.location.href.includes('capacitor://'))
    return import.meta.env.VITE_API_BASE_URL_CAPACITOR;

  return import.meta.env.VITE_API_BASE_URL_LOCAL;
};
console.log(import.meta.env.MODE);

const abrilApiData = axios.create({
  baseURL: getApiBaseUrl(),
});
console.log(abrilApiData.defaults.baseURL);

export { abrilApiData };
