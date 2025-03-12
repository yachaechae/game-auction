import { Avatar, Autocomplete, AutocompleteItem } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import { useQuery } from '@tanstack/react-query';
import { AutocompleteProps, Champion, ChampionData } from '@/type';
import { fetchChampionData } from '@/api/championService';
import { useState } from 'react';

export default function AutocompleteBox({
  selectedHeroes,
  label,
  placeholder,
  onChange,
}: AutocompleteProps) {
  const { isLoading, data } = useQuery<ChampionData>({
    queryKey: ['ChampionData'],
    queryFn: fetchChampionData,
  });

  if (isLoading) return <div>is Loading...</div>;

  const sortByName = (a: Champion, b: Champion): number =>
    a.name.localeCompare(b.name);

  const sortedData = data ? Object.values(data).sort(sortByName) : [];

  const filteredData = sortedData.filter(
    (hero) => !selectedHeroes.some((selected) => selected.id === hero.id),
  );

  const onSelectionChange = (key: React.Key | null) => {
    const selectedChampion = sortedData.find((hero) => hero.id === key);
    if (selectedChampion) {
      onChange([...selectedHeroes, selectedChampion]);
    }
  };

  return (
    <Autocomplete
      isDisabled={selectedHeroes.length >= 3}
      label={label}
      labelPlacement="outside"
      classNames={{
        selectorButton: 'text-default-500',
      }}
      defaultItems={filteredData}
      inputProps={{
        classNames: {
          input: 'ml-1',

          inputWrapper: 'h-12',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-medium',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-default-200',
            'data-[selectable=true]:focus:bg-default-100',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      placeholder={placeholder}
      popoverProps={{
        offset: 10,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background',
        },
      }}
      size="md"
      itemHeight={40}
      startContent={
        <SearchIcon
          className="text-default-400"
          strokeWidth={2.5}
          width={20}
          height={20}
        />
      }
      onSelectionChange={onSelectionChange}
    >
      {(item) => {
        return (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <div className="flex justify-between items-center ">
              <div className="flex gap-2 items-center">
                <Avatar
                  src={
                    process.env.NEXT_PUBLIC_RIOT_URL +
                    `cdn/${item.version}/img/champion/${item.image.full}`
                  }
                  className="flex-shrink-0 "
                  size="sm"
                />

                <div className="flex flex-col  my-2">
                  <span className="text-medium">{item.name}</span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
