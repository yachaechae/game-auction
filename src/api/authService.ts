import axiosServer from '@/api/axiosServer';
import { AuthDataType } from '@/type';
import { setCookie } from 'cookies-next';
import { authStore } from '@/store/authStore';
import Swal from 'sweetalert2';

export const signUpApi = async (
  userData: AuthDataType,
): Promise<AuthDataType> => {
  try {
    const response = await axiosServer.post('/auth/register', userData);
    Swal.fire({
      title: '회원가입 완료!',
      text: '축하합니다, 회원가입이 성공적으로 완료되었습니다.',
      icon: 'success',
      confirmButtonText: '확인',
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const loginApi = async (
  userData: AuthDataType,
): Promise<{ data: { data: { accessToken: string } } }> => {
  try {
    const loginResponse = await axiosServer.post('/auth/login', userData);
    const accessToken = loginResponse.data.data.accessToken;

    setCookie('accessToken', accessToken);

    authStore.getState().setToken(accessToken);
    return loginResponse;
  } catch (error) {
    throw error;
  }
};
