'use client';
import React from 'react';
import { UserDataType } from '@/type';
import PlayProfile from '@/components/PlayProfile/PlayProfile';
import dummy from '@/data/dummy.json';

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

export default function PlayerList() {
  return (
    <div className="flex flex-col gap-4 items-center flex-wrap scale-75">
      <div className="w-full flex items-center justify-between">
        <div className="text-xl font-bold">대기중인 선수</div>
        <div>경매 순서도</div>
      </div>
      <div className="flex gap-4 items-center justify-between flex-wrap">
        {DUMMY_DATA.map((player) => {
          return <PlayProfile player={player} key={player.id} />;
        })}
      </div>
    </div>
  );
}
