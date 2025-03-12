import axiosClient from '@/api/axiosClient';
import { ChampionData } from '@/type';

export const fetchChampionData = async (): Promise<any> => {
  try {
    const versionsResponse =
      await axiosClient.get<string[]>('/api/versions.json');

    const version = versionsResponse.data[0];

    const championDataResponse = await axiosClient.get<ChampionData>(
      `/cdn/${version}/data/ko_KR/champion.json`,
    );
    console.log(
      'championDataResponse 전체 응답:',
      championDataResponse.data.data,
    ); // 추가: championDataResponse 전체 로그

    return championDataResponse.data.data;
  } catch (error: any) {
    console.error('챔피언 데이터 fetching 중 에러 발생:', error);
    console.error('에러 내용:', error); // 추가: 에러 객체 자체를 로그
    throw error;
  }
};
