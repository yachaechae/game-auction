export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

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
