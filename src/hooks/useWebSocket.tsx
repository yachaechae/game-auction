import { useRef } from 'react';
import Swal from 'sweetalert2';
import * as StompJs from '@stomp/stompjs';
import { useRouter } from 'next/navigation';
import { SocketProps } from '@/type';
import { useStore } from 'zustand/react';
import { authStore } from '@/store/authStore';

const useWebSocket = ({ onChangeAction }: SocketProps) => {
  const router = useRouter();
  const client = useRef<StompJs.Client | null>(null);
  const auctionId = 1;

  const userToken = useStore(authStore);
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ws`,
      // brokerURL: `http://172.30.1.90:24443/ws`,
      connectHeaders: {
        Authorization: `${userToken.token},`,
        auctionId: `${auctionId}`,
      },
      onConnect: () => {
        console.log('connected');
        subscribe();
      },
      onWebSocketError: (error) => {
        console.log('Error with websocket', error);
      },
      onStompError: (frame) => {
        console.dir(`Broker reported error: ${frame.headers.message}`);
        console.dir(`Additional details: ${frame}`);
        if (userToken.isLoggedIn === false) {
          Swal.fire({
            text: '로그인 후 이용해주세요',
            icon: 'error',
            confirmButtonText: '확인',
          }).then(() => {
            router.push('/');
          });
        }
      },
    });
    console.log('Activating...');
    client.current.activate();
  };

  const subscribe = () => {
    console.log('Subscribing...');
    client.current?.subscribe(
      `/user/sub/auction/${auctionId}`,
      (received_message: StompJs.IFrame) => {
        onChangeAction(JSON.parse(received_message.body));
      },
    );
    client.current?.subscribe(
      `/sub/auction/${auctionId}`,
      (received_message: StompJs.IFrame) => {
        onChangeAction(JSON.parse(received_message.body));
      },
    );
    client.current?.subscribe(
      `/user/sub/errors`,
      (received_message: StompJs.IFrame) => {
        const parseMessage = JSON.parse(received_message.body);
        onChangeAction(parseMessage);
        if (parseMessage) {
          console.log(`> Received error message: ${parseMessage}`);

          Swal.fire({
            title: 'Error',
            text: parseMessage.errorMessage,
            icon: 'error',
            confirmButtonText: '확인',
          }).then(() => {
            if (parseMessage.errorCode === 'AU0002') router.push('/');
          });
        } else {
          console.log(`> Received message (errors): ${received_message.body}`);
        }
      },
    );
  };

  const sendMessage = (message: number) => {
    client.current?.publish({
      destination: `/pub/auction/${auctionId}/bidding`,
      body: JSON.stringify({
        bidPoint: message,
      }),
    });
  };

  const auctionStart = () => {
    client.current?.publish({
      destination: `/pub/auction/${auctionId}/start`,
    });
  };

  const biddingStart = () => {
    client.current?.publish({
      destination: `/pub/auction/${auctionId}/start-bidding`,
    });
  };

  const disconnect = () => {
    client.current?.deactivate();
    console.log('Disconnected');
  };

  return {
    connect,
    sendMessage,
    auctionStart,
    biddingStart,
    disconnect,
  };
};

export default useWebSocket;
