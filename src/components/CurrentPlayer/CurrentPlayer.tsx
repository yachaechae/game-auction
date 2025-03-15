'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@heroui/react';
import { Champion, ChampionData, CurrentInfoType } from '@/type';
import { fetchChampionData } from '@/api/championService';
import PlayProfile from '@/components/PlayProfile/PlayProfile';

export default function CurrentPlayer({ player }: { player: CurrentInfoType }) {
  const { isLoading, data } = useQuery<ChampionData>({
    queryKey: ['ChampionData'],
    queryFn: fetchChampionData,
  });

  if (isLoading) return <div>is Loading...</div>;

  const currentData = player.bidTarget;
  const matchingHeroesData = data
    ? Object.values(data)
        .map((hero) => hero as Champion)
        .filter((hero) => {
          const mostPlayedHeroes = currentData.mostPlayedHeroes
            .split(',')
            .map((name) => name.trim().toLowerCase());

          return mostPlayedHeroes.includes(hero.name.toLowerCase());
        })
    : [];

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center -mt-12">
      <PlayProfile player={currentData} />
      <div className="flex flex-row gap-2">
        {matchingHeroesData.map((hero: Champion) => {
          return (
            <Avatar
              key={hero.id}
              src={
                process.env.NEXT_PUBLIC_RIOT_URL +
                `cdn/${hero.version}/img/champion/${hero.image.full}`
              }
              size="lg"
            />
          );
        })}
      </div>
      <div>{currentData.selfIntroduction}</div>
    </div>
  );
}
