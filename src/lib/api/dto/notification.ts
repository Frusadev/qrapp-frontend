export interface NotificationMessage {
  notif_id: string;
  action: "view" | "delete";
}

export interface NotificationData {
  notification_id: string; // UUID as string
  recipient_id: string; // UUID as string
  message: string;
  action_link: string;
  viewed: boolean;
  created_at: Date;
}

export interface NotificationResponse {
  count: number;
  data: NotificationData[];
}
