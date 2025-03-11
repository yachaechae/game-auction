import React from 'react';
import PlayerList from '@/components/PlayProfile/PlayerList';
import CurrentPlayer from '@/components/CurrentPlayer/CurrentPlayer';
import LeaderBoard from '@/components/PlayProfile/LeaderBoard';

function Join() {
  return (
    <div className="grid items-center justify-items-center min-h-screen !pt-4 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="relative w-fit h-full flex flex-row flex-wrap row-start-1 items-center justify-between sm:items-center">
        <div className="h-screen top-0 bottom-0 sticky">
          <CurrentPlayer />
        </div>
        <div>
          <PlayerList />
          <LeaderBoard />
          <LeaderBoard />
          <LeaderBoard />
          <LeaderBoard />
          <LeaderBoard />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

export default Join;
