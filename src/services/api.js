import axios from 'axios';

const api = axios.create({
    baseURL: 'http://seu-backend-api.com/api',
    timeout: 10000,
});

export default api;