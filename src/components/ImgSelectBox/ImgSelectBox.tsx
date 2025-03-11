import { ImgSelectBoxProps, TierImgType } from '@/type';
import {
  Image,
  Select,
  SelectItem as SelectItemComponent,
} from '@heroui/react';
import React from 'react';
import placeholder from 'lodash/fp/placeholder';

export const ImgSelectBox: React.FC<ImgSelectBoxProps> = ({
  data,
  imgWidth,
  value,
  onChange,
  label,
  placeholder,
}) => {
  const renderSelectItem = (data: TierImgType) => (
    <SelectItemComponent<TierImgType> key={data.id} textValue={data.name}>
      <div className="flex gap-2 items-center">
        <Image
          alt={data.name}
          className="flex-shrink-0"
          src={`img/Tier/${data?.src}`}
          width={imgWidth}
        />
        <div className="flex flex-col">
          <span className="text-small">{data.name}</span>
        </div>
      </div>
    </SelectItemComponent>
  );

  const renderSelectedValue = (items: Array<{ data: TierImgType }>) => {
    return items.map((item) => {
      return (
        <div key={item.data.id} className="flex items-center gap-2">
          <Image
            alt={item.data?.name}
            className="flex-shrink-0"
            src={`img/Tier/${item.data?.src}`}
            width={imgWidth}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
          </div>
        </div>
      );
    });
  };
  const selectedData = (select: string) => {
    const selected = data.filter((item) => item.id === Number(select));
    return onChange(selected[0]);
  };

  return (
    <Select
      classNames={{
        label: 'pb-3',
        trigger: ' min-h-16',
      }}
      items={data}
      onChange={(e) => selectedData(e.target.value)}
      value={value?.id}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      variant="bordered"
      renderValue={(items) =>
        renderSelectedValue(
          items.filter((item): item is { data: TierImgType } => !!item.data),
        )
      }
    >
      {(data) => renderSelectItem(data)}
    </Select>
  );
};
