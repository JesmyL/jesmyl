export const electronAppInterfaceWindowKey = 'TheElectronAppApi';
export const electronAppServerEventKey = 'el-server-tsjrpc-invoke';
export const electronAppClientEventKey = 'el-client-tsjrpc-invoke';

export const remoteBroadcastDefaultPort = 4738;
export const remoteBroadcastPath = 'remote';
export const remoteBroadcastSecretCodeSearchParam = 'from-list';

export const parseRemoteControlTarget = (value: string): { ip: string; port: number } | nil => {
  const separatori = value.lastIndexOf(':');
  if (separatori <= 0) return null;

  const port = Number(value.slice(separatori + 1));
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;

  return { ip: value.slice(0, separatori), port };
};

const remoteBroadcastCertHostRegExp = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/;

export const makeRemoteBroadcastCertHost = (value: unknown): string | nil => {
  if (typeof value !== 'string') return null;

  const certHost = value.trim().toLowerCase();

  return remoteBroadcastCertHostRegExp.test(certHost) ? certHost : null;
};

export const remoteBroadcastDeviceIdMaxLength = 128;

export const remoteBroadcastSecretCodeLength = 16;

export const remoteBroadcastJesmylTokenMaxLength = 4096;

export const remoteBroadcastUserIdentityFieldMaxLength = 100;

export const remoteBroadcastSearchTermMaxLength = 100;

export class ElectronTsjrpcClientError extends Error {}
