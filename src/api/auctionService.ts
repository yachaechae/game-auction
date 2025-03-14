import axiosServer from '@/api/axiosServer';
import { authStore } from '@/store/authStore';
import { DefaultResponse, PostCreateData, RegisterFormData } from '@/type';

export const createAuctionApi = async (
  auctionData: PostCreateData,
): Promise<PostCreateData> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.post('/auction', auctionData, {
      headers: {
        Authorization: ` ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAuctionApi = async (
  userData: RegisterFormData,
): Promise<RegisterFormData> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.put('/user/auction-profile', userData, {
      headers: {
        Authorization: ` ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileApi = async (): Promise<RegisterFormData> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.get<DefaultResponse<RegisterFormData>>(
      '/user/auction-profile',
      {
        headers: {
          Authorization: ` ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};
