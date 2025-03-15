import axios from 'axios';
import Swal from 'sweetalert2';

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
    if (error.response) {
      const errorMessage =
        error.response.data.errorMessage ||
        '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.';

      Swal.fire({
        icon: 'error',
        text: errorMessage,
      });
    } else if (error.request) {
      Swal.fire({
        icon: 'error',
        title: '네트워크 오류',
        text: '서버에 연결할 수 없습니다. 다시 시도해주세요.',
      });
    }
    return Promise.reject(error);
  },
);

export default instance;
