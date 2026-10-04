import { host, ip } from '../../../../host-config.json';

export const hostConfig = {
  host,
  ip,
  url: `https://${host}` as const,
};
