"use client";
import Show from "@/components/providers/conditional/Show";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NotificationMessage,
  NotificationResponse,
} from "@/lib/api/dto/notification";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { useNotificationsCount } from "@/lib/stores/notification";
import { timeAgo } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function NotificationsPage() {
  const WEB_SOCKET_URL = process.env.NEXT_PUBLIC_NOTIFICATIONS_WS_URL;
  const [notifications, setNotifications] =
    useState<NotificationResponse | null>(null);

  const onMessage = useCallback((message: NotificationResponse) => {
    setNotifications(message);
  }, []);

  const { setNotificationCount } = useNotificationsCount();

  const notifWebSocket = useWebSocket<
    NotificationResponse,
    NotificationMessage
  >(WEB_SOCKET_URL ?? "ws://none", onMessage);
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col px-4 relative">
      <span className="font-medium text-xl p-5 sticky top-0 bg-background">
        Notifications
      </span>
      <Show _if={notifications?.count === 0 || notifications === null}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-foreground/50 text-lg select-none">
            Aucune notification
          </span>
        </div>
      </Show>
      <Show _if={(notifications?.count ?? 0) > 0}>
        <div
          className="flex w-full flex-col justify-start h-[82%]
          overflow-y-auto items-center"
        >
          {notifications?.data.map((notificationData) => (
            <div
              className={`border-b border-b-border min-h-20 sm:w-[425px]
              rounded-none hover:bg-muted transition-colors w-full
              items-start flex-col flex select-none relative
              p-1 px-2 gap-2`}
              key={notificationData.notification_id}
            >
              <Button
                variant={"ghost"}
                className="w-5 h-6 absolute right-2 top-1
                rounded-full hover:cursor-pointer
                hover:bg-gray-200"
                onClick={() => {
                  notifWebSocket.send({
                    action: "delete",
                    notif_id: notificationData.notification_id,
                  });
                  setNotificationCount(notifications.count);
                }}
              >
                <X className="stroke-gray-400" />
              </Button>
              <span className="font-medium">{notificationData.message}</span>
              <div className="w-full flex justify-between">
                <span className="text-foreground/50 text-sm justify-self-end">
                  {timeAgo(notificationData.created_at)}
                </span>
                <Link
                  href={notificationData.action_link}
                  className={`${buttonVariants({ variant: "default" })}
                  justify-self-end self-center`}
                  onClick={(e) => {
                    e.preventDefault();
                    notifWebSocket.send({
                      action: "view",
                      notif_id: notificationData.notification_id,
                    });
                    window.location.href = notificationData.action_link;
                  }}
                >
                  Voir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Show>
    </div>
  );
}
