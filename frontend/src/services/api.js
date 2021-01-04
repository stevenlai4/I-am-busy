import axios from 'axios';

const api = axios.create({
    // Base URL from backend
    baseURL: 'http://localhost:8000',
});

export default api;
