import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_RIOT_URL;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  },
);

export default instance;
