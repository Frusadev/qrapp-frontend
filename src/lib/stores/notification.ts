import { create } from "zustand";

export interface NotificationCountStore {
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

export const useNotificationsCount = create<NotificationCountStore>((set) => ({
  notificationCount: 0,
  setNotificationCount: (count: number) => set({ notificationCount: count }),
}));
