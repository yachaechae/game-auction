import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log('요청 시작:', config);
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    console.log('응답 성공:', response);
    return response;
  },
  (error) => {
    console.error('응답 에러:', error);

    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  },
);

export default instance;
