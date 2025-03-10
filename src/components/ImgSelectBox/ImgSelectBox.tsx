import { ImgSelectBoxProps, TierImgType } from "@/type";
import { Image, Select,SelectItem as SelectItemComponent }      from "@heroui/react";
import React from "react";

export const ImgSelectBox: React.FC<ImgSelectBoxProps> = ({ data, imgWidth ,value, onChange, label }) => {

    const renderSelectItem = (data: TierImgType) => (
        <SelectItemComponent<TierImgType> key={data.id} textValue={data.name}>
            <div className="flex gap-2 items-center">
                <Image alt={data.name} className="flex-shrink-0" src={`img/Tier/${data?.src}`} width={imgWidth} />
                <div className="flex flex-col">
                    <span className="text-small">{data.name}</span>
                </div>
            </div>
        </SelectItemComponent>
    );

    const renderSelectedValue = (
        items: Array<{ data: TierImgType }>
    ) => {
        return items.map((item) => {
            return(

                <div key={item.data.id} className="flex items-center gap-2">
                    <Image alt={item.data?.name} className="flex-shrink-0" src={`img/Tier/${item.data?.src}`} width={imgWidth} />
                    <div className="flex flex-col">
                        <span>{item.data?.name}</span>
                    </div>
                </div>
            )});
    };
    return (
        <Select
            classNames={{
                label: 'group-data-[filled=true]:-translate-y-5',
                trigger: 'min-h-16',
            }}
            items={data}
            onChange={(e) => onChange(Number(e.target.value))}
            value={value}
            label={label}
            listboxProps={{
                itemClasses: {
                    base: [
                        'rounded-md',
                        'text-default-500',
                        'transition-opacity',
                        'data-[hover=true]:text-foreground',
                        'data-[hover=true]:bg-default-100',
                        'dark:data-[hover=true]:bg-default-50',
                        'data-[selectable=true]:focus:bg-default-50',
                        'data-[pressed=true]:opacity-70',
                        'data-[focus-visible=true]:ring-default-500',
                    ],
                },
            }}
            popoverProps={{
                classNames: {
                    base: 'before:bg-default-200',
                    content: 'p-0 border-small border-divider bg-background',
                },
            }}
            renderValue={(items) => renderSelectedValue(items.filter((item): item is { data: TierImgType } => !!item.data))}
            variant="bordered"
        >
            {(data) => renderSelectItem(data)}
        </Select>
    );
};