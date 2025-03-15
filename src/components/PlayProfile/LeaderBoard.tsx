'use client';
import React from 'react';
import { TeamInfoType } from '@/type';
import PlayProfile from '@/components/PlayProfile/PlayProfile';

export default function LeaderBoard({ list }: { list: TeamInfoType[] }) {
  return (
    <div className="flex flex-col items-center flex-wrap ">
      <div className="w-full flex items-center justify-between">
        <div className="text-lg font-bold">팀 현황</div>
      </div>
      <div>
        {list.map((team, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-3">
              <div className="grid grid-cols-5 gap-4">
                {team.teammates.map((player, index) => {
                  return (
                    <PlayProfile
                      player={player}
                      key={index}
                      customStyle={'w-1/6'}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-5 gap-4 text-center text-lg">
                잔여 포인트 <br />
                {team.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
