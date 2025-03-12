export interface ImageType {
  id: number;
  name: string;
  src: string;
}

export type TierImgType = ImageType;
export type PositionImgType = ImageType;

export interface ImgSelectBoxProps {
  data: TierImgType[];
  imgWidth: number;
  value: TierImgType | undefined;
  onChange: (value: TierImgType | undefined) => void;
  label: string;
  placeholder: string;
}

export interface AutocompleteProps {
  selectedHeroes: Champion[];
  onChange: (value: Champion[]) => void;
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

export interface RegisterFormData {
  inGameName: string;
  highestTier: TierImgType;
  primaryLane: string;
  secondaryLane: string | null;
  mostPlayedHeroes: Champion[];
  profileImgUrl: string | null;
  selfIntroduction: string;
}

export interface CustomRadioProps {
  imgSrc: string;
  value: string;
  children: React.ReactNode;
}
