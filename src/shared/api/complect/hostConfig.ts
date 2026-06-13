import { host, ip, isUpdateAllStarts } from '../../../../host-config.json';

export const hostConfig = {
  host,
  ip,
  isUpdateAllStarts,
  url: `https://${host}` as const,
};
