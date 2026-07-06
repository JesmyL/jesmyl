import { hostRootDir } from './envJson';

export const systemdPath = '/etc/systemd/system' as const;
export const hostCwdOptions = { cwd: hostRootDir };
