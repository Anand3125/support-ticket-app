import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Define the type manually for the STOMP message
type StompMessage = {
  body: string;
  headers: Record<string, string>;
};

interface UseWebSocketProps {
  url: string;
  topic: string;
  onMessage: (message: StompMessage) => void;
}

export function useWebSocket({ url, topic, onMessage }: UseWebSocketProps) {
  const clientRef = useRef<Client | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    function connect() {
      if (!isMounted) return;

      const client = new Client({
        webSocketFactory: () => new SockJS(url),
        reconnectDelay: 0,
        onConnect: () => {
          console.log('[WebSocket] Connected');

          client.subscribe(topic, (message) => {
            const parsedMessage: StompMessage = {
              body: message.body,
              headers: message.headers,
            };
            onMessage(parsedMessage);
          });
        },
        onStompError: (frame) => {
          console.error('[WebSocket] STOMP error:', frame.headers['message'], frame.body);
        },
        onWebSocketError: (event) => {
          console.error('[WebSocket] WebSocket error:', event);
        },
        onDisconnect: () => {
          console.log('[WebSocket] Disconnected');
        },
        onWebSocketClose: () => {
          console.log('[WebSocket] Closed — reconnecting in 5s...');
          if (isMounted) {
            reconnectTimeout.current = setTimeout(connect, 5000);
          }
        },
      });

      client.activate();
      clientRef.current = client;
    }

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [url, topic, onMessage]);
}
