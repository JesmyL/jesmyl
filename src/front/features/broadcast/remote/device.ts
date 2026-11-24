import { DeviceId } from 'shared/api';
import { RemoteBroadcastPendingDevice } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { RemoteBroadcastOs } from 'shared/model/index/Index.model';
import { takeUserAuthName } from 'shared/utils/user.utils';

// Для авторизованных пользователей auth-имя (fio/nick/email/login) важнее имени из prompt
export const takeRemoteBroadcastDeviceName = (device: RemoteBroadcastPendingDevice) =>
  takeUserAuthName(device) || device.name || device.deviceId;

export const takeRemoteBroadcastOs = (): RemoteBroadcastOs => {
  const source = navigator.platform || navigator.userAgent;

  if (source.includes('Win')) return RemoteBroadcastOs.Win;
  if (source.includes('Mac') || source.includes('iPhone') || source.includes('iPad')) return RemoteBroadcastOs.Mac;
  if (source.includes('Linux') || source.includes('Android') || source.includes('CrOS')) return RemoteBroadcastOs.Linux;

  return RemoteBroadcastOs.Other;
};

const storedValueKeyPrefix = 'atom\\';
const storedDeviceIdKey = 'index:deviceId';
const storedJwtKeyPrefix = 'remote-bro:jwt:';

const takeStoredAtomValue = (key: string): string | nil => {
  try {
    const raw = localStorage.getItem(storedValueKeyPrefix + key);
    if (raw == null) return null;

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && typeof parsed[0] === 'string' ? parsed[0] : null;
  } catch {
    return null;
  }
};

const makeRandomDeviceId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');

let sessionId: string | nil = null;

export const takeRemoteBroadcastSessionId = () => (sessionId ??= makeRandomDeviceId());

export const takeRemoteBroadcastDeviceId = () => {
  const stored = takeStoredAtomValue(storedDeviceIdKey);
  if (stored != null && stored !== DeviceId.def) return stored;

  const deviceId = makeRandomDeviceId();
  try {
    localStorage.setItem(storedValueKeyPrefix + storedDeviceIdKey, JSON.stringify([deviceId]));
  } catch {
    //
  }

  return deviceId;
};

export const takeRemoteBroadcastJwt = (host = location.host) => {
  try {
    return localStorage.getItem(storedJwtKeyPrefix + host);
  } catch {
    return null;
  }
};

export const saveRemoteBroadcastJwt = (token: string, host = location.host) => {
  try {
    localStorage.setItem(storedJwtKeyPrefix + host, token);
  } catch {
    //
  }
};
