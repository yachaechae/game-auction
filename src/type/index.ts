export interface TierImgType {
  id: number;
  name: string;
  src: string;
}

export interface ImgSelectBoxProps {
  data: TierImgType[];
  imgWidth: number;
  value: TierImgType | undefined;
  onChange: (value: TierImgType | undefined) => void;
  label: string;
  placeholder: string;
}

export interface PostCreateData {
  teamCount: number;
  minTier: TierImgType;
  leaderPoints: number;
}

export interface Champion {
  version: string;
  id: string;
  name: string;
  image: {
    full: string;
  };
}

export type ChampionData = {
  [key: string]: Champion;
};

export interface UserDataType {
  id: number;
  userId: string;
  inGameName: string;
  highestTier: string;
  primaryLane: string;
  secondaryLane: string;
  mostPlayedHeroes: string;
  profileImgUrl: string | undefined | null;
  selfIntroduction: string;
  createdDate: string;
  updatedDate: string;
}
