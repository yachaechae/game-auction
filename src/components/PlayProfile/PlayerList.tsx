'use client';
import React from 'react';
import { PlayerInfoType } from '@/type';
import PlayProfile from '@/components/PlayProfile/PlayProfile';

export default function PlayerList({ list }: { list: PlayerInfoType[] }) {
  return (
    <div className="flex flex-col items-center flex-wrap">
      <div className="w-full flex items-center justify-between ">
        <div className="text-lg font-bold">대기중인 선수</div>
      </div>
      <div className="grid grid-cols-5 gap-x-2">
        {list.map((player, index) => {
          return (
            <PlayProfile
              player={player}
              key={index}
              customStyle={`-mt-8`}
              testStyle={'truncate w-full'}
            />
          );
        })}
      </div>
    </div>
  );
}
