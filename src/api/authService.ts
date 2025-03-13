import axiosServer from '@/api/axiosServer';
import { AuthDataType } from '@/type';
import { setCookie } from 'cookies-next';
import { authStore } from '@/store/authStore';

export const signUpApi = async (
  userData: AuthDataType,
): Promise<AuthDataType> => {
  try {
    const response = await axiosServer.post('/auth/register', userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('회원가입 요청 실패:', error);
    throw error;
  }
};
export const loginApi = async (userData: AuthDataType): Promise<any> => {
  try {
    const loginResponse = await axiosServer.post('/auth/login', userData);
    console.log('로그인 응답:', loginResponse.data.data);
    const accessToken = loginResponse.data;

    setCookie('accessToken', accessToken);

    authStore.getState().setUser({ name: userData.loginId });
    return loginResponse;
  } catch (error: any) {
    console.error('로그인 중 에러 발생:', error);
    throw error;
  }
};
