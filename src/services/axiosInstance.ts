import axios from 'axios';

const axiosInstance = axios.create({ baseURL: '' });

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
