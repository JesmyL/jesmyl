import { hosts } from 'shared/api';
import { Environment } from './model';

export const __productionEnvironment__: Environment = {
  isTest: false,
  sokiLink: `wss://${hosts.dns}/websocket/`,
};
