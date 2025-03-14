import { ImgSelectBoxProps, ImgType } from '@/type';
import { Image, Select, SelectItem } from '@heroui/react';
import React from 'react';

export default function ImgSelectBox({
  data,
  imgWidth,
  value,
  onChange,
  label,
  placeholder,
}: ImgSelectBoxProps) {
  const renderSelectItem = (data: ImgType) => (
    <SelectItem<ImgType> key={data.id} textValue={data.name}>
      <div className="flex gap-2 items-center">
        <Image
          alt={data.name}
          className="flex-shrink-0"
          src={data?.src}
          width={imgWidth}
        />
        <div className="flex flex-col">
          <span className="text-small">{data.name}</span>
        </div>
      </div>
    </SelectItem>
  );

  const renderSelectedValue = (items: Array<{ data: ImgType }>) => {
    return items.map((item) => (
      <div key={item.data.id} className="flex items-center gap-2">
        <Image
          alt={item.data?.name}
          className="flex-shrink-0"
          src={item.data?.src}
          width={imgWidth}
        />
        <div className="flex flex-col">
          <span>{item.data?.name}</span>
        </div>
      </div>
    ));
  };
  const selectedData = (select: string) => {
    const selected = data.filter((item) => item.key === Number(select));
    return onChange(selected[0]);
  };

  return (
    <Select
      classNames={{
        trigger: 'h-12',
      }}
      items={data}
      selectedKeys={value ? [1] : []}
      label={label}
      labelPlacement="outside"
      onChange={(e) => selectedData(e.target.value)}
      placeholder={placeholder}
      renderValue={(items) =>
        renderSelectedValue(
          items.filter((item): item is { data: ImgType } => !!item.data),
        )
      }
    >
      {(data) => renderSelectItem(data)}
    </Select>
  );
}
