/**
 * @deprecated md5-migration Удалить вместе с `migrateCmAudiosToMd5Tails`, когда в БД не останется numLead-значений.
 */
export type CmAudiosMigrationOptions = {
  /** Только отчёт: не пишет в БД и не скачивает файлы. */
  isDryRun?: boolean;
  /** Разрешить скачивание неизвестных ссылок; по умолчанию — только вне dry-run. */
  allowDownloads?: boolean;
  /** Логировать изменения по каждой песне. */
  verbose?: boolean;
};

/**
 * @deprecated md5-migration Удалить вместе с `migrateCmAudiosToMd5Tails`, когда в БД не останется numLead-значений.
 */
export type CmAudiosMigrationSummary = {
  totalComs: number;
  changedComs: number;
  audioValuesTotal: number;
  audioValuesMigrated: number;
  audioValuesAlreadyTail: number;
  markKeysMigrated: number;
  pendingDownloads: number;
  downloadFailures: number;
  failures: number;
};
