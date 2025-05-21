import { useEffect, useRef } from "react";

type MessageHandler<T> = (data: T) => void;

export function useWebSocket<T, M>(
  url: string,
  onMessage: MessageHandler<T>,
  onOpen?: () => void,
  onClose?: () => void,
  onError?: (event: Event) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      onOpen?.();
    };

    socket.onmessage = (event) => {
      try {
        const data: T = JSON.parse(event.data);
        onMessage(data);
      } catch {
        console.warn("Invalid JSON:", event.data);
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      onError?.(event);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      onClose?.();
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const send = (type: string, payload: M) => {
    const msg = JSON.stringify({ type, payload });
    socketRef.current?.send(msg);
  };

  return { send };
}
