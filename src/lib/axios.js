import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // ✅ Ensure Flask backend runs on this
  withCredentials: true, // optional: use only if needed
});

export default axiosInstance;
