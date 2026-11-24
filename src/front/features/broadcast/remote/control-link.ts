import {
  parseRemoteControlTarget,
  remoteBroadcastPath,
  remoteBroadcastSecretCodeLength,
  remoteBroadcastSecretCodeSearchParam,
  remoteBroadcastUserNameSearchParam,
} from 'shared/const/electron';

export const isSameRemoteControlHost = (target: string) =>
  parseRemoteControlTarget(target)?.ip.toLowerCase() === location.hostname.toLowerCase();

const isRemoteScreenIpv4 = (host: string) => {
  if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return false;

  return host.split('.').every(octet => Number(octet) <= 255);
};

const isRemoteScreenHostname = (host: string) =>
  /[a-z]/i.test(host) && /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(host);

const isRemoteScreenHost = (host: string) => isRemoteScreenIpv4(host) || isRemoteScreenHostname(host);

const takeLanPrefix = (host: string) => {
  const octets = host.split('.');
  if (octets.length !== 4) return null;

  for (const octet of octets) {
    const value = Number(octet);
    if (octet === '' || !Number.isInteger(value) || value < 0 || value > 255) return null;
  }

  return octets.slice(0, 3).join('.');
};

export const isSameLanHost = (remote: string) => {
  const target = parseRemoteControlTarget(remote);
  if (target == null) return false;

  const targetHost = target.ip.toLowerCase();
  const pageHost = location.hostname.toLowerCase();

  if (targetHost === pageHost) return true;

  const targetPrefix = takeLanPrefix(targetHost);

  return targetPrefix != null && targetPrefix === takeLanPrefix(pageHost);
};

export const makeRemoteControlLink = (serverUrl: string) => `${serverUrl}/${remoteBroadcastPath}`;

export const makeRemoteScreenLink = (remote: string, secretCode?: string | nil, fio?: string) =>
  `http://${remote}/${remoteBroadcastPath}${
    secretCode == null ? '' : `?${remoteBroadcastSecretCodeSearchParam}=${secretCode}`
  }${fio == null ? '' : `${secretCode == null ? '?' : '&'}${remoteBroadcastUserNameSearchParam}=${encodeURIComponent(fio)}`}`;

const remoteControlPagePaths = ['', '/cm', '/bible'];

const isRemoteControlPagePath = (pathname: string) => {
  const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return remoteControlPagePaths.some(pagePath =>
    normalizedPathname.endsWith(`/${remoteBroadcastPath}${pagePath}`),
  );
};

export const parseRemoteControlLink = (value: string): { remote: string } | nil => {
  try {
    const url = new URL(value, location.href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!isRemoteControlPagePath(url.pathname)) return null;

    const remote = url.searchParams.get(remoteBroadcastPath);
    if (remote == null || parseRemoteControlTarget(remote) == null) return null;

    return { remote };
  } catch {
    return null;
  }
};

export const parseScannedRemoteControlScreen = (
  value: string,
): { remote: string; screenUrl: string; secretCode: string | nil } | nil => {
  if (!value.includes('://')) {
    const target = parseRemoteControlTarget(value);
    if (target == null || !isRemoteScreenHost(target.ip)) return null;

    return { remote: value, screenUrl: makeRemoteScreenLink(value), secretCode: null };
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

    const remoteParam = url.searchParams.get(remoteBroadcastPath);

    let remote = remoteParam;

    if (remote == null) {
      if (!isRemoteControlPagePath(url.pathname)) return null;

      const urlPort = url.port || (url.protocol === 'https:' ? '443' : '80');
      remote = `${url.hostname}:${urlPort}`;
    }

    if (parseRemoteControlTarget(remote) == null) return null;

    const secretCodeParam = url.searchParams.get(remoteBroadcastSecretCodeSearchParam);
    const secretCode =
      secretCodeParam != null &&
      secretCodeParam.length > 0 &&
      secretCodeParam.length <= remoteBroadcastSecretCodeLength
        ? secretCodeParam
        : null;

    return { remote, screenUrl: url.href, secretCode };
  } catch {
    return null;
  }
};
