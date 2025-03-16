import React from 'react';
import { Avatar } from '@heroui/react';
import { PlayerProfileProps } from '@/type';
import ProfileImg from '@/components/PlayProfile/ProfileImg';

const DEFAULT_AVATER =
  'https://i.namu.wiki/i/QW9jS79_492MuFZxNNmTgNGa5ynysDaTfbkjOLJ5CTeYTWQc3rmdkB3ba4vpi8dRXGwlXdjFPZ1bGCCX9jpYSg.svg';

export default function PlayerProfile({
  player,
  customStyle,
  testStyle,
}: PlayerProfileProps) {
  return (
    <div
      className={`w-full flex flex-col items-center gap-2 ${customStyle ? customStyle : ''}`}
    >
      <ProfileImg
        profileImgUrl={
          !!player.profileImgUrl ? player.profileImgUrl : DEFAULT_AVATER
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
      <div className={`text-xl text-center ${testStyle ? testStyle : ''}`}>
        {player.inGameName}
      </div>
    </div>
  );
}
