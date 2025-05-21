"use client";
import { useNotificationsCount } from "@/lib/stores/notification";
import { Bell } from "lucide-react";
import Show from "../providers/conditional/Show";

export default function NotificationMenuButton() {
  const { notificationCount } = useNotificationsCount();
  return (
    <div className="relative flex items-center justify-center">
      <Show _if={notificationCount > 0}>
        <div
          className="absolute w-2 h-2 rounded-full top-[-5px]
        text-[10px] flex items-center justify-center text-white
        right-[-5px] bg-red-600"
        />
      </Show>
      <Bell />
    </div>
  );
}
