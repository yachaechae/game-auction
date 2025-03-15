import axiosServer from '@/api/axiosServer';
import { authStore } from '@/store/authStore';
import { DefaultResponse, PostCreateData, PlayerInfoType } from '@/type';

export const createAuctionApi = async (
  auctionData: PostCreateData,
): Promise<PostCreateData> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.post('api/v1/auction', auctionData, {
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
  userData: PlayerInfoType,
): Promise<PlayerInfoType> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.put(
      'api/v1/user/auction-profile',
      userData,
      {
        headers: {
          Authorization: ` ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileApi = async (): Promise<PlayerInfoType> => {
  const token = authStore.getState().token;
  try {
    const response = await axiosServer.get<DefaultResponse<PlayerInfoType>>(
      'api/v1/user/auction-profile',
      {
        headers: {
          Authorization: ` ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
