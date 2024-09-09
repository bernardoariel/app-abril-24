import axios from 'axios';

const abrilApiData = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://149.50.144.81:3000',
});

// baseURL: 'http://localhost:3000',
export { abrilApiData };
