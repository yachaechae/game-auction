import { RadioGroup, Radio, cn, Image } from '@heroui/react';
import positionImg from '@/data/positionImg.json';
import { CustomRadioProps, PositionImgType } from '@/type';

// Extracted reusable class names for maintainability
const baseClassNames = cn(
  'inline-flex m-0 p-0 hover:bg-content2 items-center justify-between flex-col-reverse',
  'cursor-pointer rounded-lg p-1 border-2 border-transparent',
);

export const CustomRadio = ({
  children,
  imgSrc,
  ...otherProps
}: CustomRadioProps) => {
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: baseClassNames,
        labelWrapper: 'flex-col !ml-0',
      }}
    >
      <div className="flex flex-col items-center justify-between">
        {imgSrc && (
          <Image src={imgSrc} className="w-10 h-10 object-cover rounded-md" />
        )}
        {children}
      </div>
    </Radio>
  );
};

interface ImgRadioProps {
  onValueChange?: (value: string) => void;
  label?: string;
}

export default function ImgRadio({ onValueChange, label }: ImgRadioProps) {
  return (
    <RadioGroup
      color={'primary'}
      label={label}
      orientation="horizontal"
      onValueChange={(value) => {
        onValueChange?.(value);
      }}
      classNames={{
        base: 'w-full',
        wrapper: 'flex flex-row gap-2 justify-between',
      }}
    >
      {positionImg.map((item: PositionImgType) => (
        <CustomRadio key={item.id} imgSrc={item.src} value={item.name}>
          {item.name}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}
