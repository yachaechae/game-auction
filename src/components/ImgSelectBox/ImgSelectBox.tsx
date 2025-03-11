import { ImgSelectBoxProps, TierImgType } from '@/type';
import {
  Image,
  Select,
  SelectItem as SelectItemComponent,
} from '@heroui/react';
import React from 'react';

export default function ImgSelectBox({
  data,
  imgWidth,
  value,
  onChange,
  label,
  placeholder,
}: ImgSelectBoxProps) {
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
    return items.map((item) => (
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
    ));
  };
  const selectedData = (select: string) => {
    const selected = data.filter((item) => item.id === Number(select));
    return onChange(selected[0]);
  };

  return (
    <Select
      items={data}
      onChange={(e) => selectedData(e.target.value)}
      value={value?.id}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      renderValue={(items) =>
        renderSelectedValue(
          items.filter((item): item is { data: TierImgType } => !!item.data),
        )
      }
    >
      {(data) => renderSelectItem(data)}
    </Select>
  );
}
