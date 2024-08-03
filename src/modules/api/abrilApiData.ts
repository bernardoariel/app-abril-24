import axios from 'axios';

const abrilApiData = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export { abrilApiData };
