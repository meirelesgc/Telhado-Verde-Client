import axios from 'axios';

const api = axios.create({
    baseURL: 'http://seu-backend.com/api',
});

export default api;