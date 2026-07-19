import { hostRootDir } from 'back/envJson';
import { makeCyanLogText } from 'back/utils.exec';
import * as path from 'path';

export const drizzleInitiator = async () => {
  const drizzleKitMain = require.resolve('drizzle-kit');
  const binPath = path.resolve(path.dirname(drizzleKitMain), 'bin.cjs');

  const makeCommand = (command: string) => `node "${binPath}" ${command} --config="${hostRootDir}/drizzle.config.cjs"`;

  setTimeout(() => {
    console.info(makeCyanLogText('.'.repeat(100)), '\n');
    console.info(makeCyanLogText(makeCommand('generate'), ''));
    console.info(makeCyanLogText(makeCommand('migrate'), ''));
    console.info(makeCyanLogText(makeCommand('push')));
    console.info(makeCyanLogText('.'.repeat(100)));
  }, 5000);
};
