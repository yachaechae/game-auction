import axiosRiot from '@/api/axiosRiot';
import { ChampionData } from '@/type';

export const fetchChampionData = async (): Promise<ChampionData> => {
  try {
    const versionsResponse =
      await axiosRiot.get<string[]>('/api/versions.json');

    const version = versionsResponse.data[0];

    const championDataResponse = await axiosRiot.get<{ data: ChampionData }>(
      `/cdn/${version}/data/ko_KR/champion.json`,
    );

    return championDataResponse.data.data;
  } catch (error) {
    console.error('챔피언 데이터 fetching 중 에러 발생:', error);
    console.error('에러 내용:', error);
    throw error;
  }
};
