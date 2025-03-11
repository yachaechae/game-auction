import React from 'react';
import PlayerList from '@/components/PlayProfile/PlayerList';
import CurrentPlayer from '@/components/CurrentPlayer/CurrentPlayer';

function Join() {
  return (
    <div className="grid items-center justify-items-center min-h-screen !pt-4 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-fit h-full flex flex-row flex-wrap row-start-1 items-center justify-between sm:items-center">
        <div>
          <CurrentPlayer />
        </div>

        <PlayerList />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

export default Join;
