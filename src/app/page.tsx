import CustomButton from '@/components/CustomButton/CustomButton';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="h-full flex flex-col row-start-2 items-center justify-around sm:items-center">
        <CustomButton
          targetUrl={'/create'}
          pageName={'경매 등록'}
        ></CustomButton>
        <CustomButton targetUrl={'/join'} pageName={'경매 참여'}></CustomButton>
        <CustomButton
          targetUrl={'/register'}
          pageName={'마이페이지'}
        ></CustomButton>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
