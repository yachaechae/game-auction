'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from '@heroui/react';
import { PostCreateData } from '@/type';
import { createAuctionApi } from '@/api/auctionService';
import { useRouter } from 'next/navigation';

export default function Create() {
  const [maxTeam, setMaxTeam] = useState<number | undefined>(0);
  const [initialPoint, setInitialPoint] = useState<number>(0);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createAuctionApi,
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '경매 생성 완료!',
        confirmButtonText: '확인',
      });
      router.push('/');
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!maxTeam || initialPoint < 1) {
    //   setError('모든 항목을 정확히 입력해주세요.');
    //   return;
    // }

    const data: PostCreateData = {
      maxTeam: maxTeam!,
      // minTier: minTier!,
      initialPoint: initialPoint!,
    };

    mutation.mutate(data);
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
            value={maxTeam?.toString()}
            validate={(value: string) => {
              const numValue = parseInt(value, 10);
              if (numValue <= 1) {
                return '1개의 팀은 경매를 진행할 수 없어요';
              }
            }}
            onChange={(e) =>
              setMaxTeam(
                isNaN(parseInt(e.target.value, 10))
                  ? 0
                  : parseInt(e.target.value, 10),
              )
            }
          />
          {/*<ImgSelectBox*/}
          {/*    data={TIER_DATA}*/}
          {/*    imgWidth={DEFAULT_IMAGE_WIDTH}*/}
          {/*    value={minTier}*/}
          {/*    onChange={setMinTier}*/}
          {/*    label={'최소 티어 설정'}*/}
          {/*    placeholder={'티어 정보를 입력해주세요'}*/}
          {/*/>*/}

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
            value={initialPoint === null ? '' : initialPoint?.toString()}
            onChange={(e) =>
              setInitialPoint(
                isNaN(parseInt(e.target.value, 10))
                  ? 0
                  : parseInt(e.target.value, 10),
              )
            }
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
