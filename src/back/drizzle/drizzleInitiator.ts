import { hostCwdOptions } from 'back/const';
import { hostRootDir } from 'back/envJson';
import { makeCyanLogText, makeGreenLogText, makeRedLogText, runCommand } from 'back/utils.exec';
import * as path from 'path';
import { checkIsObject } from 'shared/utils/checkIs';

export const drizzleInitiator = async () => {
  console.info(makeCyanLogText('[Drizzle] Запуск автоматической генерации миграций...'));

  try {
    const drizzleKitMain = require.resolve('drizzle-kit');
    const binPath = path.resolve(path.dirname(drizzleKitMain), 'bin.cjs');

    const makeCommand = (command: string) =>
      `node "${binPath}" ${command} --config="${hostRootDir}/drizzle.config.cjs"`;

    await runCommand(makeCommand('generate'), '', { stdio: 'inherit', ...hostCwdOptions });

    console.info(makeGreenLogText('[Drizzle Успешно]: SQL-миграции успешно сгенерированы по конфигу .cjs!'));

    try {
      await runCommand(makeCommand('migrate'), '', {
        stdio: 'inherit',
        ...hostCwdOptions,
        env: {
          ...process.env,
          PGOPTIONS: '-c client_min_messages=warning',
        },
      });

      await runCommand(makeCommand('push'), '', { stdio: 'inherit', ...hostCwdOptions });
    } catch (error) {
      console.error(makeRedLogText(`${error}`, ''));
      console.error(
        makeRedLogText('👆👆👆 Ошибка при выполнении команды. Можно выполнить в ручную небезопасную команду:', ''),
      );
      console.error(makeGreenLogText(makeCommand('push')));
    }

    return true;
  } catch (error) {
    console.error(makeRedLogText('[Drizzle Ошибка]: Не удалось сгенерировать миграции на бэкенде:'));
    console.error((checkIsObject(error) && error.message) || error);

    throw error;
  }
};
