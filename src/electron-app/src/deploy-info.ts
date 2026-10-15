import { hostConfig } from '../../../freshHostConfig';
import { iife, wait } from './const';

const { host, ip } = hostConfig;

iife(async () => {
  console.info(`Deploy to ${host} (${ip})`);
  await wait(3000);
});
