'use client';
import React, { useEffect, useState } from 'react';
import PlayerList from '@/components/PlayProfile/PlayerList';
import CurrentPlayer from '@/components/CurrentPlayer/CurrentPlayer';
import LeaderBoard from '@/components/PlayProfile/LeaderBoard';
import { Button } from '@heroui/react';
import AcutionInfo from '@/components/AuctionInfo/AcutionInfo';
import { useStore } from 'zustand/react';
import { authStore } from '@/store/authStore';
import useWebSocket from '@/hooks/useWebSocket';
import {
  AuctionPlayerResponse,
  CurrentInfoType,
  DefaultSocketResponse,
  PlayerInfoType,
  TeamInfoType,
} from '@/type';

function Join() {
  const [messageLog, setMessageLog] = useState<string[]>([]);
  const [auctionPlayersInfo, setAuctionPlayersInfo] =
    useState<PlayerInfoType[]>();
  const [teamInfo, setTeamInfo] = useState<TeamInfoType[]>();
  const [currentInfo, setCurrentInfo] = useState<CurrentInfoType>();
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userId = useStore(authStore).userId;

  const handleAuctionPlayers = (
    message: DefaultSocketResponse<
      AuctionPlayerResponse | CurrentInfoType | string
    >,
  ) => {
    switch (message.messageType) {
      case 'GENERAL': {
        setMessageLog((prevState) => [...prevState, message.message as string]);
        break;
      }
      case 'AUCTION_PLAYERS_INFO': {
        const data = message.message as AuctionPlayerResponse;
        setAuctionPlayersInfo(data.playerInfo);
        setTeamInfo(data.teamInfo);
        break;
      }
      case 'BID_INFO': {
        const data = message.message as CurrentInfoType;
        setCurrentInfo(data);
        break;
      }
      case 'AUCTION_INFO': {
        const data = message.message as AuctionPlayerResponse;
        setOwnerId(data.ownerId);
        break;
      }
      default: {
        setErrorMessage(message.errorMessage as string);
        break;
      }
    }
  };

  const { connect, auctionStart, biddingStart, sendMessage, disconnect } =
    useWebSocket({
      onChangeAction: handleAuctionPlayers,
    });

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="relative w-fit max-w-[1290px] h-full flex flex-row flex-nowrap row-start-1 items-top justify-between -mb-28">
          <div className="w-full max-w-[300px] flex flex-col items-start gap-5">
            <div className="w-full flex flex-wrap items-center justify-end"></div>
            <div className="w-full flex flex-col items-center gap-5 h-fit top-0 bottom-0 sticky ">
              {currentInfo && (
                <>
                  <CurrentPlayer player={currentInfo} />
                  <AcutionInfo
                    currentInfo={currentInfo}
                    messageLog={messageLog}
                    sendMessage={sendMessage}
                    errorMessage={errorMessage}
                  />
                </>
              )}
              {userId == ownerId && (
                <div className="w-full flex justify-between z-10">
                  <Button onPress={auctionStart}>경매시작</Button>
                  <Button onPress={biddingStart}>입찰시작</Button>
                </div>
              )}
            </div>
          </div>
          <div className="w-3/4 flex gap-10 flex-col scale-90 origin-top-right">
            {auctionPlayersInfo && <PlayerList list={auctionPlayersInfo} />}
            {teamInfo && <LeaderBoard list={teamInfo} />}
          </div>
        </main>
      </div>
    </>
  );
}

export default Join;
