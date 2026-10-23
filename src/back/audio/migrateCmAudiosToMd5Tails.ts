import { eq } from 'drizzle-orm';
import {
  CmAudioTail,
  CmComAudioMarkPack,
  CmComWid,
  HttpNumLeadLink,
  parseCmAudioTail,
  parseHttpNumLeadLink,
} from 'shared/api';
import { objectEntries, objectLength } from 'shared/utils/object.utils';
// Схема импортируется раньше drizzle.db: эти модули ссылаются друг на друга, и такой порядок разрывает цикл.
import { comDB } from '../drizzle.schema';
import { db, dbUpdate } from '../drizzle/drizzle.db';
import { makeRedLogText } from '../utils.exec';
import { downloadAndResolveCmAudioKey, takeKnownCmAudioKeyFromLink } from './md5LinkRedirectDict';
import { CmAudiosMigrationOptions, CmAudiosMigrationSummary } from './migrateCmAudiosToMd5Tails.model';

type ComRow = {
  w: CmComWid;
  n: string;
  al: CmAudioTail[] | nil;
  am: CmComAudioMarkPack | nil;
};

type MigrationFailure = { value: string; reason: string };

type ComPlan = {
  comw: CmComWid;
  title: string;
  nextAl: CmAudioTail[] | nil;
  nextAm: CmComAudioMarkPack | nil;
  audioValuesTotal: number;
  audioValuesMigrated: number;
  audioValuesAlreadyTail: number;
  markKeysMigrated: number;
  pendingDownloads: number;
  downloadFailures: number;
  audioChanges: string[];
  markChanges: string[];
  markFailures: MigrationFailure[];
  failures: MigrationFailure[];
};

type ResolveLegacyLink = (link: HttpNumLeadLink, title: string) => Promise<CmAudioTail | nil>;

/**
 * Резолвит numLead-ссылку в md5-хвост. Известные ссылки берутся без скачивания;
 * неизвестные разрешаются скачиванием только когда оно разрешено, иначе возвращают `nil`.
 */
const makeLegacyLinkResolver = (isDryRun: boolean, allowDownloads: boolean): ResolveLegacyLink => {
  const keyByLink: Record<string, CmAudioTail> = {};

  return async (link, title) => {
    const cachedKey = keyByLink[link];
    if (cachedKey) return cachedKey;

    const knownKey = await takeKnownCmAudioKeyFromLink(link);
    if (knownKey) {
      keyByLink[link] = knownKey;
      return knownKey;
    }

    if (isDryRun || !allowDownloads) return null;

    const downloadedKey = await downloadAndResolveCmAudioKey(link, title);
    keyByLink[link] = downloadedKey;

    return downloadedKey;
  };
};

const planAudioListMigration = async (
  al: CmAudioTail[] | nil,
  title: string,
  resolve: ResolveLegacyLink,
) => {
  let audioValuesTotal = 0;
  let audioValuesMigrated = 0;
  let audioValuesAlreadyTail = 0;
  let pendingDownloads = 0;
  let downloadFailures = 0;
  const failures: MigrationFailure[] = [];
  const changes: string[] = [];
  let nextAl: CmAudioTail[] | nil = null;

  if (!al)
    return {
      nextAl,
      audioValuesTotal,
      audioValuesMigrated,
      audioValuesAlreadyTail,
      pendingDownloads,
      downloadFailures,
      failures,
      changes,
    };

  const tails = new Set<CmAudioTail>();
  const plannedAl = [...al];

  for (const value of al) {
    const tail = parseCmAudioTail(value);
    if (tail) tails.add(tail);
  }

  for (let index = 0; index < al.length; ++index) {
    audioValuesTotal++;

    const value = al[index];
    if (parseCmAudioTail(value)) {
      audioValuesAlreadyTail++;
      continue;
    }

    const link = parseHttpNumLeadLink(value);
    if (!link) {
      failures.push({
        value,
        reason: value.startsWith('http')
          ? 'полная http-ссылка: поддерживаются только numLead-ссылки и md5-хвосты'
          : 'значение не является ни md5-хвостом, ни numLead-ссылкой',
      });
      continue;
    }

    try {
      const key = await resolve(link, title);

      if (!key) {
        pendingDownloads++;
        changes.push(`${value} → (нужно скачать)`);
        continue;
      }

      if (tails.has(key)) {
        failures.push({ value, reason: `md5-хвост "${key}" уже присутствует в al` });
        continue;
      }

      tails.add(key);
      plannedAl[index] = key;
      audioValuesMigrated++;
      changes.push(`${value} → ${key}`);
    } catch (error) {
      downloadFailures++;
      failures.push({ value, reason: String(error) });
    }
  }

  if (audioValuesMigrated) nextAl = plannedAl;

  return {
    nextAl,
    audioValuesTotal,
    audioValuesMigrated,
    audioValuesAlreadyTail,
    pendingDownloads,
    downloadFailures,
    failures,
    changes,
  };
};

const planAudioMarksMigration = async (
  am: CmComAudioMarkPack | nil,
  title: string,
  resolve: ResolveLegacyLink,
) => {
  let markKeysMigrated = 0;
  let pendingDownloads = 0;
  let downloadFailures = 0;
  const failures: MigrationFailure[] = [];
  const changes: string[] = [];
  let nextAm: CmComAudioMarkPack | nil = null;

  if (!am) return { nextAm, markKeysMigrated, pendingDownloads, downloadFailures, failures, changes };

  const tails = new Set<CmAudioTail>();
  const plannedAm: CmComAudioMarkPack = {};

  for (const [src] of objectEntries(am)) {
    const tail = parseCmAudioTail(src);
    if (!tail) continue;

    tails.add(tail);
    plannedAm[tail] = am[src];
  }

  for (const [src, marks] of objectEntries(am)) {
    if (parseCmAudioTail(src)) continue;

    const link = parseHttpNumLeadLink(src);
    if (!link) {
      failures.push({ value: src, reason: 'ключ не является ни md5-хвостом, ни numLead-ссылкой' });
      continue;
    }

    try {
      const key = await resolve(link, title);

      if (!key) {
        pendingDownloads++;
        changes.push(`${src} → (нужно скачать)`);
        continue;
      }

      if (tails.has(key)) {
        failures.push({ value: src, reason: `пак маркеров "${key}" уже существует` });
        continue;
      }

      tails.add(key);
      plannedAm[key] = marks;
      markKeysMigrated++;
      changes.push(`${src} → ${key}`);
    } catch (error) {
      downloadFailures++;
      failures.push({ value: src, reason: String(error) });
    }
  }

  // Любая неоднозначность в паках маркеров оставляет исходный пак нетронутым.
  if (failures.length) markKeysMigrated = 0;
  else if (markKeysMigrated) nextAm = plannedAm;

  return { nextAm, markKeysMigrated, pendingDownloads, downloadFailures, failures, changes };
};

const planComMigration = async (com: ComRow, resolve: ResolveLegacyLink): Promise<ComPlan> => {
  const audioPlan = await planAudioListMigration(com.al, com.n, resolve);
  const marksPlan = await planAudioMarksMigration(com.am, com.n, resolve);

  return {
    comw: com.w,
    title: com.n,
    nextAl: audioPlan.nextAl,
    nextAm: marksPlan.nextAm,
    audioValuesTotal: audioPlan.audioValuesTotal,
    audioValuesMigrated: audioPlan.audioValuesMigrated,
    audioValuesAlreadyTail: audioPlan.audioValuesAlreadyTail,
    markKeysMigrated: marksPlan.markKeysMigrated,
    pendingDownloads: audioPlan.pendingDownloads + marksPlan.pendingDownloads,
    downloadFailures: audioPlan.downloadFailures + marksPlan.downloadFailures,
    audioChanges: audioPlan.changes,
    markChanges: marksPlan.changes,
    markFailures: marksPlan.failures,
    failures: [...audioPlan.failures, ...marksPlan.failures],
  };
};

const applyComPlan = async (plan: ComPlan) => {
  const patch: Partial<typeof comDB.$inferInsert> = {};

  if (plan.nextAl) {
    patch.al = plan.nextAl;
    patch.m = Date.now();
  }

  if (plan.nextAm) {
    patch.am = plan.nextAm;
    patch.amMod = Date.now();
  }

  if (!objectLength(patch)) return;

  await dbUpdate(comDB, patch, eq(comDB.w, plan.comw));
};

const logComPlan = (plan: ComPlan, isDryRun: boolean) => {
  const parts = [
    plan.nextAl ? `al → ${plan.audioValuesMigrated}` : '',
    plan.nextAm ? `am → ${plan.markKeysMigrated}` : '',
    plan.pendingDownloads ? `требуют скачивания: ${plan.pendingDownloads}` : '',
  ].filter(Boolean);

  console.info(`${isDryRun ? '[DRY] ' : ''}com ${plan.comw} "${plan.title}": ${parts.join(', ')}`);

  if (!isDryRun) return;

  plan.audioChanges.forEach(detail => console.info(`    al: ${detail}`));
  if (!plan.markFailures.length) plan.markChanges.forEach(detail => console.info(`    am: ${detail}`));
};

/**
 * Переводит устаревшие numLead-ссылки в `com.al`/`com.am` на md5-хвосты.
 * Без разрешённых скачиваний мигрирует только уже известные ссылки — без сети и без записи,
 * если мигрировать нечего. Ошибки по отдельным песням собираются в сводку и логируются.
 *
 * @deprecated md5-migration Удалить функцию вместе со всем модулем, когда в БД не останется numLead-значений.
 */
export const migrateCmAudiosToMd5Tails = async (
  options: CmAudiosMigrationOptions = {},
): Promise<CmAudiosMigrationSummary> => {
  const isDryRun = options.isDryRun ?? false;
  const allowDownloads = options.allowDownloads ?? !isDryRun;
  const verbose = options.verbose ?? false;
  const resolve = makeLegacyLinkResolver(isDryRun, allowDownloads);
  const summary: CmAudiosMigrationSummary = {
    totalComs: 0,
    changedComs: 0,
    audioValuesTotal: 0,
    audioValuesMigrated: 0,
    audioValuesAlreadyTail: 0,
    markKeysMigrated: 0,
    pendingDownloads: 0,
    downloadFailures: 0,
    failures: 0,
  };

  const coms = await db.select({ w: comDB.w, n: comDB.n, al: comDB.al, am: comDB.am }).from(comDB);

  for (const com of coms) {
    summary.totalComs++;

    try {
      const plan = await planComMigration(com, resolve);

      summary.audioValuesTotal += plan.audioValuesTotal;
      summary.audioValuesMigrated += plan.audioValuesMigrated;
      summary.audioValuesAlreadyTail += plan.audioValuesAlreadyTail;
      summary.markKeysMigrated += plan.markKeysMigrated;
      summary.pendingDownloads += plan.pendingDownloads;
      summary.downloadFailures += plan.downloadFailures;
      summary.failures += plan.failures.length;

      plan.failures.forEach(failure =>
        console.error(makeRedLogText(`[ОШИБКА] com ${plan.comw} "${plan.title}": ${failure.value} — ${failure.reason}`)),
      );

      const hasChanges = !!plan.nextAl || !!plan.nextAm;
      if (!hasChanges && !(isDryRun && plan.pendingDownloads)) continue;

      if (hasChanges) {
        summary.changedComs++;
        if (!isDryRun) await applyComPlan(plan);
      }

      if (verbose) logComPlan(plan, isDryRun);
    } catch (error) {
      summary.failures++;
      console.error(makeRedLogText(`[ОШИБКА] com ${com.w} "${com.n}": ${String(error)}`));
    }
  }

  return summary;
};
