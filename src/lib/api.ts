
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ahimsapure.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
