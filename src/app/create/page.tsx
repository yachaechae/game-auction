'use client';
import React, { useState } from 'react';
import { Button, Form, Input } from '@heroui/react';
import { PostCreateData, TierImgType } from '@/type';
import ImgSelectBox from '@/components/ImgSelectBox/ImgSelectBox';
import data from '@/data/tierImg.json';

const TIER_DATA: TierImgType[] = data.map((item) => ({
  id: item.id,
  name: item.name,
  src: item.img,
}));
const DEFAULT_IMAGE_WIDTH = 50;

export default function Create() {
  const [teamCount, setTeamCount] = useState<number | undefined>(0);
  const [minTier, setMinTier] = useState<TierImgType | undefined>(undefined);
  const [leaderPoints, setLeaderPoints] = useState<number>(0);
  const [submitted, setSubmitted] = useState<PostCreateData | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: PostCreateData = {
      teamCount: teamCount!,
      minTier: minTier!,
      leaderPoints: leaderPoints!,
    };

    setSubmitted(data);
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-2/5 h-full flex flex-col row-start-2 items-center justify-around sm:items-center">
        <Form className="w-full m-0 gap-10 items-end" onSubmit={onSubmit}>
          <Input
            className=""
            labelPlacement="outside"
            type="number"
            label="참가 팀 수"
            placeholder="최대 팀 수를 입력해주세요"
            value={teamCount?.toString()}
            validate={(value: string) => {
              const numValue = parseInt(value, 10);
              if (numValue <= 1) {
                return '1개의 팀은 경매를 진행할 수 없어요';
              }
            }}
            onChange={(e) =>
              setTeamCount(
                isNaN(parseInt(e.target.value, 10))
                  ? 0
                  : parseInt(e.target.value, 10),
              )
            }
          />
          <ImgSelectBox
            data={TIER_DATA}
            imgWidth={DEFAULT_IMAGE_WIDTH}
            value={minTier}
            onChange={setMinTier}
            label={'최소 티어 설정'}
            placeholder={'티어 정보를 입력해주세요'}
          />

          <Input
            labelPlacement="outside"
            type="number"
            label="팀장 기본 포인트 설정"
            placeholder="팀장의 기본 포인트를 설정해주세요"
            validate={(value: string) => {
              const numValue = parseInt(value, 10);
              if (numValue < 1) {
                return '팀장 포인트는 0 이상의 숫자여야 합니다.';
              }
            }}
            value={leaderPoints === null ? '' : leaderPoints?.toString()}
            onChange={(e) =>
              setLeaderPoints(
                isNaN(parseInt(e.target.value, 10))
                  ? 0
                  : parseInt(e.target.value, 10),
              )
            }
          />
          <Button type="submit" className={`bg-gold`}>
            Submit
          </Button>
        </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
