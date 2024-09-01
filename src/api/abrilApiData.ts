import axios from 'axios';

const abrilApiData = axios.create({
  baseURL: 'http://localhost:3000',
});

export { abrilApiData };
