import React from 'react';
import { Avatar } from '@heroui/react';
import { UserDataType } from '@/type';
import dummy from '@/data/dummy.json';
import ProfileImg from '@/components/PlayProfile/ProfileImg';

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

const DEFULT_AVATER =
  'https://i.namu.wiki/i/QW9jS79_492MuFZxNNmTgNGa5ynysDaTfbkjOLJ5CTeYTWQc3rmdkB3ba4vpi8dRXGwlXdjFPZ1bGCCX9jpYSg.svg';

export default function PlayerProfile({ player }: { player: UserDataType }) {
  return (
    <div
      key={player.id}
      className={`flex flex-col items-center justify-center gap-2 `}
    >
      <ProfileImg
        profileImgUrl={
          !!player.profileImgUrl ? player.profileImgUrl : DEFULT_AVATER
        }
        highestTier={player.highestTier}
      />

      <div className={'flex flex-row gap-2'}>
        <Avatar
          classNames={{
            base: 'bg-transparent',
          }}
          radius={'none'}
          src={`/img/Position/${player.primaryLane}.png`}
        />{' '}
        <Avatar
          classNames={{
            base: 'bg-transparent',
          }}
          radius={'none'}
          src={`/img/Position/${player.secondaryLane}.png`}
        />
      </div>
      <div className="text-xl">{player.inGameName}</div>
    </div>
  );
}
