import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7279',
  withCredentials: true, // ضروري لجلب الكوكيز للتحقق من المصادقة

});

export default api;
