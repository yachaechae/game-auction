import { RadioGroup, Radio, cn, Image } from '@heroui/react';
import positionImg from '@/data/positionImg.json';
import { CustomRadioProps, ImgRadioProps, ImgType } from '@/type';

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
          <Image src={imgSrc} className="w-10 h-10 object-cover rounded-md " />
        )}
        {children}
      </div>
    </Radio>
  );
};

export default function ImgRadio({
  onValueChange,
  defaultValue,
  label,
}: ImgRadioProps) {
  const selectedData = positionImg.filter((item) => item.name === defaultValue);
  return (
    <RadioGroup
      color={'primary'}
      label={label}
      orientation="horizontal"
      value={selectedData[0]?.name}
      onValueChange={(value) => {
        onValueChange?.(value);
      }}
      classNames={{
        base: 'w-full',
        wrapper: 'flex flex-row gap-2 justify-between',
        label: 'text-foreground',
      }}
    >
      {positionImg.map((item: ImgType) => (
        <CustomRadio key={item.id} imgSrc={item.src} value={item.name}>
          {item.name}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}
