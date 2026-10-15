import { exec } from 'child_process';
import { hostConfig } from '../../../freshHostConfig';
import { makeElectronDownHostUrl } from './lib';

const { host, ip } = hostConfig;
const remotePath = `/var/www/${makeElectronDownHostUrl(host)}/latest-linux.yml`;

exec(`ssh root@${ip} test -f ${remotePath}`, error => process.exit(error ? 1 : 0));
