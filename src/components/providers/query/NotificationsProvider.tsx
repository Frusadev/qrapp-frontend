"use client";

import {
  NotificationMessage,
  NotificationResponse,
} from "@/lib/api/dto/notification";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { useNotificationsCount } from "@/lib/stores/notification";
import { useCallback } from "react";

export default function NotificationsProvider() {
  const WEB_SOCKET_URL = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_URL;
  const { setNotificationCount } = useNotificationsCount();

  const onMessage = useCallback((data: NotificationResponse) => {
    setNotificationCount(data.count);
  }, []);

  useWebSocket<NotificationResponse, NotificationMessage>(
    WEB_SOCKET_URL ?? "ws://none",
    onMessage,
  );
  return <></>;
}
