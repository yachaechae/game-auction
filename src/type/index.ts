export interface ModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export interface AuthDataType {
  loginId: string;
  password: string;
  confirmPassword?: string;
}

export interface ImgType {
  id: number;
  name: string;
  src: string;
}

export interface ImgSelectBoxProps {
  data: ImgType[];
  imgWidth: number;
  value: ImgType | undefined;
  onChange: (value: ImgType | undefined) => void;
  label: string;
  placeholder: string;
}

export interface AutocompleteProps {
  selectedHeroes: string[];
  onHeroesChange: (updatedHeroes: string[]) => void;
  label: string;
  placeholder: string;
}

export interface PostCreateData {
  maxTeam: number;
  minTier?: ImgType;
  initialPoint: number;
}

export interface Champion {
  version: string;
  id: string;
  name: string;
  image: {
    full: string;
  };
}

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
export interface PlayerProfileProps {
  player: UserDataType;
  customStyle?: string;
}

export interface ChampionData {
  [key: string]: Champion;
}

export interface RegisterFormData {
  inGameName: string;
  highestTier: string;
  primaryLane: string;
  secondaryLane: string;
  mostPlayedHeroes: string;
  profileImgUrl: string | null;
  selfIntroduction: string;
}
export interface ImgRadioProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  label?: string;
}
export interface DefaultResponse<T> {
  resultCode: string;
  data: T;
}

export interface CustomRadioProps {
  imgSrc: string;
  value: string;
  children: React.ReactNode;
}
