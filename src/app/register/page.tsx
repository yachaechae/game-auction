'use client';
import React, { useRef, useState } from 'react';
import { Avatar, Button, Form, Input } from '@heroui/react';
import { Champion, RegisterFormData, TierImgType } from '@/type';
import ImgSelectBox from '@/components/ImgSelectBox/ImgSelectBox';
import AutocompleteBox from '@/components/AutocompleteBox/AutocompleteBox';
import ImgRadio from '@/components/ImgRadio/ImgRadio';
import { CloseIcon } from '@heroui/shared-icons';
import data from '@/data/tierImg.json';

const TIER_DATA: TierImgType[] = data.map((item) => ({
  id: item.id,
  name: item.name,
  src: item.img,
}));
const DEFAULT_IMAGE_WIDTH = 50;
const DEFULT_AVATER =
  'https://i.namu.wiki/i/QW9jS79_492MuFZxNNmTgNGa5ynysDaTfbkjOLJ5CTeYTWQc3rmdkB3ba4vpi8dRXGwlXdjFPZ1bGCCX9jpYSg.svg';

export default function Register() {
  const [submitted, setSubmitted] = useState<RegisterFormData | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    inGameName: '',
    highestTier: { id: 0, name: '', src: '' },
    primaryLane: '',
    secondaryLane: null,
    mostPlayedHeroes: [],
    profileImgUrl: null,
    selfIntroduction: '',
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData({
            ...formData,
            profileImgUrl: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeHero = (name: string) => {
    setFormData({
      ...formData,
      mostPlayedHeroes: formData.mostPlayedHeroes.filter(
        (hero) => hero.name !== name,
      ),
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(formData);
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-2/5 h-full flex flex-col row-start-2 items-center justify-around sm:items-center">
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
                  src={DEFULT_AVATER}
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
            required={true}
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
            onChange={(e) =>
              setFormData({ ...formData, inGameName: e.target.value })
            }
          />

          <ImgSelectBox
            data={TIER_DATA}
            imgWidth={DEFAULT_IMAGE_WIDTH}
            value={formData.highestTier}
            onChange={(value) =>
              setFormData({
                ...formData,
                highestTier: value ?? { id: 0, name: '', src: '' },
              })
            }
            label={'현 티어'}
            placeholder={'현 티어를 선택해주세요'}
          />

          <div className="w-full flex flex-col gap-2 relative">
            <div className="flex gap-4 justify-end -mb-6">
              {formData.mostPlayedHeroes.map((hero) => (
                <div className="relative" key={hero.name}>
                  <CloseIcon
                    className={`absolute top-0 right-0 z-10 cursor-pointer bg-foreground text-background rounded-full`}
                    onClick={() => {
                      removeHero(hero.name);
                    }}
                  />
                  <Avatar
                    src={
                      process.env.NEXT_PUBLIC_RIOT_URL +
                      `cdn/${hero.version}/img/champion/${hero.image.full}`
                    }
                    className="w-14 h-14"
                  />
                </div>
              ))}
            </div>
            <AutocompleteBox
              selectedHeroes={formData.mostPlayedHeroes}
              label={'MOST 3'}
              placeholder={'MOST 3 를 선택해주세요'}
              onChange={(value: Champion[]) =>
                setFormData({
                  ...formData,
                  mostPlayedHeroes: value,
                })
              }
            />
          </div>

          <ImgRadio
            label={'주 라인'}
            onValueChange={(value) => {
              setFormData({ ...formData, primaryLane: value });
            }}
          />
          <ImgRadio
            label={'부 라인'}
            onValueChange={(value) => {
              setFormData({ ...formData, secondaryLane: value });
            }}
          />

          <Input
            classNames={{
              inputWrapper: 'h-12',
            }}
            labelPlacement="outside"
            type="text"
            label="한마디"
            placeholder="하고싶은 말을 적어주세요"
            value={formData.selfIntroduction}
            required={true}
            onChange={(e) =>
              setFormData({ ...formData, selfIntroduction: e.target.value })
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
