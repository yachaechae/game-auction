import React from 'react';
import Image from 'next/image';

export default function ProfileImg({
  highestTier,
  profileImgUrl,
}: {
  highestTier: string;
  profileImgUrl: string;
}) {
  return (
    <div className="relative w-44 h-48 py-8">
      <Image
        src={`/img/Wings/${highestTier}.png`}
        alt="큰 이미지"
        fill
        className="absolute object-cover z-20"
      />
      <div className="w-fit absolute bottom-2 left-0 right-0 translate-y-[-2rem] translate-x-[3.5rem]">
        <div className="relative w-16 h-16">
          <Image
            src={`${profileImgUrl}`}
            alt="작은 이미지"
            fill
            className="object-cover z-20 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
