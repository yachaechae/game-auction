'use client';
import CustomButton from '@/components/CustomButton/CustomButton';
import { useEffect } from 'react';
import { initializeUser } from '@/store/authStore';

export default function Home() {
  useEffect(() => {
    initializeUser();
    console.log();
  }, []);
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="h-full flex flex-col row-start-2 items-center justify-around sm:items-center">
        <CustomButton targetUrl={'/create'} pageName={'경매 등록'} />
        <CustomButton targetUrl={'/register'} pageName={'프로필 등록'} />
        <CustomButton targetUrl={'/join'} pageName={'경매 참여'} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
