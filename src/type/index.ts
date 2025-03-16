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
export interface ImgTypeKey {
  key: number;
  name: string;
  src: string;
}

export interface ImgSelectBoxProps {
  data: ImgTypeKey[];
  imgWidth: number;
  value: ImgTypeKey | undefined;
  onChange: (value: ImgTypeKey | undefined) => void;
  label: string;
  placeholder: string;
}

export interface AutocompleteProps {
  selectedHeroes: string[];
  onHeroesChangeAction: (updatedHeroes: string[]) => void;
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
  player: PlayerInfoType;
  customStyle?: string;
  testStyle?: string;
}

export interface ChampionData {
  [key: string]: Champion;
}

export interface PlayerInfoType {
  inGameName: string;
  highestTier: string;
  primaryLane: string;
  secondaryLane: string;
  mostPlayedHeroes: string;
  profileImgUrl?: string | null;
  profileImageUrl?: string | null;
  selfIntroduction: string;
  playerType?: string;
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

export interface DefaultSocketResponse<T> {
  messageType: 'GENERAL' | 'AUCTION_PLAYERS_INFO' | 'BID_INFO' | 'AUCTION_INFO';
  message: T;
  errorMessage?: string;
}

export interface AuctionPlayerResponse {
  playerInfo: PlayerInfoType[];
  teamInfo: TeamInfoType[];
  ownerId: string;
  // currentInfo: CurrentInfoType;
}

export interface TeamInfoType {
  teammates: PlayerInfoType[];
  point: number;
}
export interface CurrentInfoType {
  bidTarget: PlayerInfoType;
  biddingLeaderName: string;
  bidPoint: string;
  bidEndAt: string;
}

export interface SocketProps {
  onChangeAction: (data: DefaultSocketResponse<AuctionPlayerResponse>) => void;
}
