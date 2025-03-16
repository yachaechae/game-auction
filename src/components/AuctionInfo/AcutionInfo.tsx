import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, NumberInput } from '@heroui/react';
import { CurrentInfoType } from '@/type';
import Timer from '@/components/Timer/Timer';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function AcutionInfo({
  currentInfo,
  messageLog,
  sendMessage,
  errorMessage,
}: {
  currentInfo: CurrentInfoType;
  messageLog: string[];
  sendMessage: (message: number) => void;
  errorMessage: string | null;
}) {
  const [bid, setBid] = useState<number>(parseInt(currentInfo.bidPoint));
  const [time, setTime] = useState(0);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
    if (messageLog.length > 0) {
      const lastMessage = messageLog[messageLog.length - 1]; // 마지막 메시지 가져오기

      if (lastMessage === '5초 후 입찰이 시작됩니다.') {
        setTime(5);
      }
    }
  }, [messageLog]);

  useEffect(() => {
    const bidEndAt = dayjs(currentInfo.bidEndAt);
    const currentTime = dayjs(); // 현재 시간

    const remainingTime = bidEndAt.diff(currentTime, 'seconds');

    if (currentInfo.bidEndAt !== null) {
      setTime(Math.max(remainingTime, 0));
    } else if (currentInfo.bidEndAt === null) {
      setTime(0);
    }
  }, [currentInfo]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(bid);
    if (!errorMessage && currentInfo.bidEndAt !== null) {
      setTime(5);
    }
  };
  return (
    <div className="w-full text-foreground bg-background bg-opacity-50 rounded-md p-2 text-center text-lg flex flex-col gap-3">
      <div className="flex justify-between px-1 border-b-1 mb-1">
        <div>
          현재 입찰가 :{currentInfo.bidPoint}
          <br />
          현재 입찰 팀: {currentInfo.biddingLeaderName}
        </div>
        <Timer seconds={time} setSeconds={setTime} />
      </div>
      <div
        className="h-64 overflow-y-auto text-base flex flex-col gap-2 px-1 overscroll-x-contain"
        ref={messageEndRef}
      >
        {messageLog.map((message, index) => {
          return (
            <div className="text-left" key={index}>
              {message}
            </div>
          );
        })}
      </div>
      <Form className="flex-row" onSubmit={onSubmit}>
        <NumberInput
          label=""
          labelPlacement="outside"
          isRequired
          fullWidth={false}
          defaultValue={parseInt(currentInfo.bidPoint)}
          name="bid"
          placeholder="입찰가를 입력해주세요"
          step={5}
          isClearable
          onValueChange={(value) => setBid(value)}
        />
        <Button color="primary" type="submit">
          입찰
        </Button>
      </Form>
    </div>
  );
}
