export interface TierImgType {
    id:number;
    name: string;
    src: string;
}


export interface ImgSelectBoxProps {
    data: TierImgType[];
    imgWidth:number;
    value: number | undefined;
    onChange: (value: number | undefined) => void;
    label: string;
}