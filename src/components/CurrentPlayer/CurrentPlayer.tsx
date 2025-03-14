'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Champion, ChampionData, UserDataType } from '@/type';
import { fetchChampionData } from '@/api/championService';
import PlayProfile from '@/components/PlayProfile/PlayProfile';
import dummy from '@/data/dummy.json';
import { Avatar } from '@heroui/react';

const DUMMY_DATA: UserDataType[] = dummy.map((player: UserDataType) => ({
  id: player.id,
  userId: player.userId,
  inGameName: player.inGameName,
  highestTier: player.highestTier,
  primaryLane: player.primaryLane,
  secondaryLane: player.secondaryLane,
  mostPlayedHeroes: player.mostPlayedHeroes,
  profileImgUrl: player.profileImgUrl,
  selfIntroduction: player.selfIntroduction,
  createdDate: player.createdDate,
  updatedDate: player.updatedDate,
}));

export default function CurrentPlayer() {
  const { isLoading, data } = useQuery<ChampionData>({
    queryKey: ['ChampionData'],
    queryFn: fetchChampionData,
  });

  if (isLoading) return <div>is Loading...</div>;

  const currentData = DUMMY_DATA[1];

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
    <div className="flex flex-col gap-4 items-center justify-center">
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
