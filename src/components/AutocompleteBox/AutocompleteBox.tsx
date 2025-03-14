'use client';
import { Avatar, Autocomplete, AutocompleteItem } from '@heroui/react';
import { CloseIcon, SearchIcon } from '@heroui/shared-icons';
import { useQuery } from '@tanstack/react-query';
import { AutocompleteProps, Champion, ChampionData } from '@/type';
import { fetchChampionData } from '@/api/championService';
import { useEffect, useState } from 'react';

export default function AutocompleteBox({
  label,
  placeholder,
  selectedHeroes,
  onHeroesChangeAction,
}: AutocompleteProps) {
  const [internalSelectedHeroes, setInternalSelectedHeroes] =
    useState<string[]>(selectedHeroes);

  const { isLoading, data } = useQuery<ChampionData>({
    queryKey: ['ChampionData'],
    queryFn: fetchChampionData,
  });
  useEffect(() => {
    setInternalSelectedHeroes(selectedHeroes);
  }, [selectedHeroes]);

  if (isLoading) return <div>is Loading...</div>;

  const sortByName = (a: Champion, b: Champion): number =>
    a.name.localeCompare(b.name);

  const sortedData = data ? Object.values(data).sort(sortByName) : [];

  const filteredData = sortedData.filter(
    (hero) => !internalSelectedHeroes.includes(hero.name),
  );
  const onSelectionChange = (key: React.Key | null) => {
    const selectedChampion = sortedData.find((hero) => hero.name === key);
    if (selectedChampion && internalSelectedHeroes.length < 3) {
      const updatedHeroes = [...internalSelectedHeroes, selectedChampion.name];
      setInternalSelectedHeroes(updatedHeroes);
      onHeroesChangeAction(updatedHeroes);
    }
  };

  const removeHero = (heroName: string) => {
    const updatedHeroes = internalSelectedHeroes.filter(
      (name) => name !== heroName,
    );
    setInternalSelectedHeroes(updatedHeroes);
    onHeroesChangeAction(updatedHeroes);
  };
  return (
    <div>
      <div className="flex gap-4 mt-4 justify-end -mb-5">
        {internalSelectedHeroes.map((heroName) => {
          const champion = sortedData.find((hero) => hero.name === heroName);
          return (
            champion && (
              <div key={heroName} className="relative">
                <CloseIcon
                  className={`absolute top-0 right-0 z-10 cursor-pointer bg-foreground text-background rounded-full`}
                  onClick={() => removeHero(heroName)}
                />
                <Avatar
                  src={
                    champion
                      ? `${process.env.NEXT_PUBLIC_RIOT_URL}cdn/${champion.version}/img/champion/${champion.image.full}`
                      : ''
                  }
                  className="w-14 h-14"
                />
              </div>
            )
          );
        })}
      </div>
      <Autocomplete
        isDisabled={internalSelectedHeroes.length >= 3}
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
            <AutocompleteItem key={item.name} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar
                    src={
                      process.env.NEXT_PUBLIC_RIOT_URL +
                      `cdn/${item.version}/img/champion/${item.image.full}`
                    }
                    className="flex-shrink-0"
                    size="sm"
                  />
                  <div className="flex flex-col my-2">
                    <span className="text-medium">{item.name}</span>
                  </div>
                </div>
              </div>
            </AutocompleteItem>
          );
        }}
      </Autocomplete>
    </div>
  );
}
