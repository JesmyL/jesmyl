import hostConfigJson from '../../../../host-config.json';
import { makeSubHost } from '../../utils/makeSubHost';

const { host, ip } = hostConfigJson;

export const hostConfig = {
  host,
  ip,
  url: `https://${host}` as const,
  subHost: makeSubHost(host, (hostConfigJson as { subdomain?: string | null }).subdomain),
};
