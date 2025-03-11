import { Environment } from './model';

export const __testEnvironment__: Environment = {
  isTest: true,
  sokiLink: `ws://${window.location.hostname}:4446/`,
};
