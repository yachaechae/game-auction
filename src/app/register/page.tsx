'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlayerInfoType, ImgTypeKey } from '@/type';
import { getProfileApi, registerAuctionApi } from '@/api/auctionService';
import { uploadProfileImgToS3 } from '@/api/uploadImg/route';
import ImgSelectBox from '@/components/ImgSelectBox/ImgSelectBox';
import AutocompleteBox from '@/components/AutocompleteBox/AutocompleteBox';
import ImgRadio from '@/components/ImgRadio/ImgRadio';
import data from '@/data/tierImg.json';

const TIER_DATA: ImgTypeKey[] = data.map((item) => ({
  key: item.id,
  name: item.name,
  src: item.img,
}));
const DEFAULT_IMAGE_WIDTH = 50;
const DEFAULT_AVATAR =
  'https://i.namu.wiki/i/QW9jS79_492MuFZxNNmTgNGa5ynysDaTfbkjOLJ5CTeYTWQc3rmdkB3ba4vpi8dRXGwlXdjFPZ1bGCCX9jpYSg.svg';

export default function Register() {
  const [tier, setTier] = useState<ImgTypeKey>({ key: 0, name: '', src: '' });
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);
  const [previewImg, setPreviewImg] = useState<File | null>(null);
  const router = useRouter();

  const fileInput = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PlayerInfoType>({
    inGameName: '',
    highestTier: '',
    primaryLane: '',
    secondaryLane: '',
    mostPlayedHeroes: '',
    profileImgUrl: null,
    selfIntroduction: '',
  });

  const { data: profileData, isLoading } = useQuery<PlayerInfoType, Error>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  });

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      const foundTier = TIER_DATA.find(
        (tier) => tier.name === profileData.highestTier,
      );
      if (foundTier) {
        setTier(foundTier);
      }
      const heroes = profileData.mostPlayedHeroes
        ? profileData.mostPlayedHeroes.split(',')
        : [];
      setSelectedHeroes(heroes);
    }
  }, [profileData, isLoading]);

  const mutation = useMutation({
    mutationFn: registerAuctionApi,
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '프로필 등록 완료!',
        confirmButtonText: '확인',
      });
      router.push('/');
    },
  });

  const handleChange = <T extends keyof PlayerInfoType>(
    field: T,
    value: PlayerInfoType[T],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreviewImg(file ? file : null);
    }
  };

  const handleHeroesChange = (updatedHeroes: string[]) => {
    setSelectedHeroes(updatedHeroes);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedHeroes.length < 3) {
      Swal.fire({
        icon: 'warning',
        title: '챔피언 3개를 선택해주세요',
        confirmButtonText: '확인',
      });
      return;
    }

    const data: PlayerInfoType = {
      ...formData,
      profileImageUrl: previewImg && (await uploadProfileImgToS3(previewImg)),
      highestTier: tier.name,
      mostPlayedHeroes: selectedHeroes.join(','),
    };

    mutation.mutate(data);
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:pt-20 sm:pb-8">
      <main className="lg:w-2/5 h-full flex flex-col row-start-2 items-center justify-around sm:items-center sm:w-fit">
        <Form className="w-full m-0 gap-10 items-end" onSubmit={onSubmit}>
          <div className="w-full flex justify-center mb-6">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (fileInput.current) {
                  fileInput.current.click();
                }
              }}
            >
              {formData.profileImgUrl ? (
                <Avatar
                  src={formData.profileImgUrl}
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
              ) : (
                <Avatar
                  src={
                    previewImg instanceof File
                      ? URL.createObjectURL(previewImg)
                      : previewImg || DEFAULT_AVATAR
                  }
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
              )}
            </div>
          </div>

          <Input
            className="hidden"
            labelPlacement="outside"
            type="file"
            label="프로필 이미지 업로드"
            ref={fileInput}
            onChange={handleProfileImageChange}
          />
          <Input
            classNames={{
              inputWrapper: 'h-12',
            }}
            labelPlacement="outside"
            type="text"
            label="아이디"
            placeholder="롤 아이디를 입력해주세요"
            value={formData.inGameName}
            required={true}
            onChange={(e) => handleChange('inGameName', e.target.value)}
          />

          <ImgSelectBox
            data={TIER_DATA}
            imgWidth={DEFAULT_IMAGE_WIDTH}
            value={tier}
            onChange={(value) => value && setTier(value)}
            label={'현 티어'}
            placeholder={'현 티어를 선택해주세요'}
          />

          <div className="w-full flex flex-col gap-2 relative">
            <AutocompleteBox
              label="챔피언 선택"
              placeholder="챔피언을 검색해 주세요"
              selectedHeroes={selectedHeroes}
              onHeroesChangeAction={handleHeroesChange}
            />
          </div>

          <ImgRadio
            label={'주 라인'}
            defaultValue={formData.primaryLane}
            onValueChange={(value: string) =>
              handleChange('primaryLane', value)
            }
          />
          <ImgRadio
            label={'부 라인'}
            defaultValue={formData.secondaryLane}
            onValueChange={(value: string) =>
              handleChange('secondaryLane', value)
            }
          />

          <Input
            classNames={{
              inputWrapper: 'h-12',
            }}
            labelPlacement="outside"
            type="text"
            label="한마디"
            placeholder="하고싶은 말을 적어주세요"
            required={true}
            value={formData.selfIntroduction}
            onChange={(e) =>
              setFormData({ ...formData, selfIntroduction: e.target.value })
            }
          />
          <Button type="submit" color="primary">
            확인
          </Button>
        </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
