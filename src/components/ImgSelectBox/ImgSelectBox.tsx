import { ImgSelectBoxProps, ImgType } from '@/type';
import { Image, Select, SelectItem } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export default function ImgSelectBox({
  data,
  imgWidth,
  value,
  onChange,
  label,
  placeholder,
}: ImgSelectBoxProps) {
  const selectedData = (select: string) => {
    const selected = data.filter((item) => item.key === Number(select));
    return onChange(selected[0]);
  };

  const [selected, setSelected] = useState<number | null>(value?.key ?? null);
  useEffect(() => {
    if (value && value.key !== selected) {
      setSelected(value.key);
    }
  }, [value]);

  return (
    <Select
      classNames={{
        trigger: 'h-12',
      }}
      items={data}
      selectedKeys={selected !== null ? [selected] : undefined}
      defaultSelectedKeys={selected !== null ? [selected] : undefined}
      label={label}
      labelPlacement="outside"
      onChange={(e) => selectedData(e.target.value)}
      placeholder={placeholder}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
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
      }}
    >
      {(data) => (
        <SelectItem<ImgType> textValue={data.name}>
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
      )}
    </Select>
  );
}
