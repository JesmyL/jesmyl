export type PushSubscriptionPayload = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type PushNotificationAction = {
  action: string;
  title: string;
  url: string;
};

export type SchedulePushPayload = {
  title: string;
  body: string;
  url: string;
  tag?: string;
  silent?: boolean;
  actions?: PushNotificationAction[];
};
