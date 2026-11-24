export type RemotePublishedControl = {
  fio: string;
  ip: string;
  port: number;
  secretCode?: string;
};

export type RemotePublishedControlScoped = RemotePublishedControl & { isConnectable: boolean };

export const remoteAuthCheckRoutePath = '/auth-check';
