export type RemotePublishedControl = {
  fio: string;
  ip: string;
  port: number;
  secretCode?: string;
};

export const remoteAuthCheckRoutePath = '/auth-check';
