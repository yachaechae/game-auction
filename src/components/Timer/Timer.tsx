import React, { useEffect, useRef } from 'react';

interface TimerProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ seconds, setSeconds }) => {
  const timerId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [seconds, setSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    }
  }, [seconds]);

  return <div className="timer">{seconds} s</div>;
};

export default Timer;
