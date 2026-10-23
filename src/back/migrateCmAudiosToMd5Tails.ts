/**
 * @deprecated md5-migration Удалить весь CLI-скрипт, когда в БД не останется numLead-значений.
 */
import { iife } from 'shared/utils';
import { migrateCmAudiosToMd5Tails } from './audio/migrateCmAudiosToMd5Tails';
import { CmAudiosMigrationSummary } from './audio/migrateCmAudiosToMd5Tails.model';
import { closeDb } from './drizzle/drizzle.db';
import { makeGreenLogText, makeRedLogText, makeYellowLogText } from './utils.exec';

const printSummary = (summary: CmAudiosMigrationSummary, isDryRun: boolean) => {
  const lines = [
    `${isDryRun ? '[DRY-RUN] ' : ''}Миграция завершена`,
    `Всего песен: ${summary.totalComs}`,
    `Изменено песен: ${summary.changedComs}`,
    `Без изменений: ${summary.totalComs - summary.changedComs}`,
    `Аудио-значений всего (al): ${summary.audioValuesTotal}`,
    `Мигрировано ссылок (al): ${summary.audioValuesMigrated}`,
    `Уже md5-хвостов (al): ${summary.audioValuesAlreadyTail}`,
    `Переименовано паков маркеров (am): ${summary.markKeysMigrated}`,
    `Ожидают скачивания: ${summary.pendingDownloads}`,
    `Ошибок: ${summary.failures}`,
    `Из них ошибок скачивания: ${summary.downloadFailures}`,
  ];

  console.info((summary.failures ? makeYellowLogText : makeGreenLogText)(lines.join('\n')));
};

const isDryRun = process.argv.includes('--dry');

iife(async () => {
  try {
    const summary = await migrateCmAudiosToMd5Tails({ isDryRun, verbose: true });

    printSummary(summary, isDryRun);

    if (summary.failures) process.exitCode = 1;
  } catch (error) {
    console.error(makeRedLogText(`[КРИТИЧЕСКАЯ ОШИБКА] ${String(error)}`));
    process.exitCode = 1;
  } finally {
    await closeDb();
  }
});
