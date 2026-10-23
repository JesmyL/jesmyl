import { eq } from 'drizzle-orm';
import fs from 'fs';
import { makeRegExp } from 'regexpert';
import {
  CmAudioSrc,
  CmAudioTail,
  CmComWid,
  HttpLink,
  HttpNumLeadLink,
  parseCmAudioTail,
  parseHttpNumLeadLink,
} from 'shared/api';
import { checkIsObject, checkIsStartsWith, checkIsString } from 'shared/utils/checkIs';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { makeCmComHttpLinkFromNumLead, makeCmComNumLeadLinkFromHttp } from '../apps/cm/complect/com-http-links';
import { audioLinkDB, comDB } from '../drizzle.schema';
import { db, dbUpdate, dbUpsert } from '../drizzle/drizzle.db';
import { hostRootDir } from '../envJson';
import { AudioLinkKeyRow, AudioLinkRow } from './md5LinkRedirectDict.model';

const audioDirPath = '/audio';
const audioSaveDir = 'audio/';
const audioExtensionsStr = 'mp3 m4a ogg wav';

/** Расширения аудио-файлов, отбрасываемые при выделении md5 из имени; собирается один раз из компактного литерала. */
const audioExtensionReg = makeRegExp(`/\\.(?:${audioExtensionsStr.split(' ').join('|')})$/i`);

/** Полный md5-хэш аудио-файла. */
const audioMd5Reg = makeRegExp('/^[0-9a-f]{32}$/i');

const takeMd5FromFileName = (fileName: string) => fileName.replace(audioExtensionReg, '');

/**
 * Значение трека из URL запроса `/track/...`: query-строка отбрасывается, необязательное расширение
 * снимается только у md5-хвоста — устаревшие numLead-ссылки содержат `.mp3` в самом имени файла.
 */
export const takeAudioTailFromRequestPath = (requestPath: string) => {
  const [pathValue] = requestPath.split('?');
  const extensionlessPathValue = pathValue.replace(audioExtensionReg, '');

  return parseCmAudioTail(extensionlessPathValue) ? extensionlessPathValue : pathValue;
};

/**
 * Ключ аудио-ссылки: для известного md5 берётся уже выданный ключ, новый md5 получает самый короткий
 * свободный хвост (3 символа, при совпадении — 4, 5, …). Ключи append-only, повторный вызов идемпотентен.
 */
export const takeAudioLinkKey = (md5: string, rows: readonly AudioLinkKeyRow[]): CmAudioTail => {
  const knownKey = rows.find(row => row.md5 === md5)?.key;
  if (knownKey) return knownKey;

  const usedKeys = new Set<string>(rows.map(row => row.key));

  let tailLength = 3;
  while (usedKeys.has(md5.slice(-tailLength))) tailLength++;
  if (tailLength > md5.length) throw new Error(`Не удалось подобрать уникальный ключ для md5 "${md5}"`);

  const key = parseCmAudioTail(md5.slice(-tailLength));
  if (!key) throw new Error(`Некорректный md5 "${md5}"`);

  return key;
};

const selectAudioLinksKeys = () => db.select({ key: audioLinkDB.key, md5: audioLinkDB.md5 }).from(audioLinkDB);

const registerAudioLink = async (md5: string, link: HttpNumLeadLink): Promise<AudioLinkRow> => {
  if (!audioMd5Reg.test(md5)) throw new Error(`Некорректный md5 "${md5}"`);

  const key = takeAudioLinkKey(md5, await selectAudioLinksKeys());
  await dbUpsert(audioLinkDB, { key, md5, link }, ['key']);

  return { key, md5, link };
};

/** Скачивает аудио при необходимости, регистрирует ссылку в таблице и возвращает md5-хэш файла. */
export const downloadCmAudioFile = async (numLeadLink: HttpNumLeadLink, title?: string): Promise<string> =>
  (await resolveDownloadedAudioLink(numLeadLink, title)).md5;

/** Скачивает аудио при необходимости, регистрирует ссылку и возвращает её ключ. */
export const downloadAndResolveCmAudioKey = async (
  numLeadLink: HttpNumLeadLink,
  title?: string,
): Promise<CmAudioTail> => (await resolveDownloadedAudioLink(numLeadLink, title)).key;

const resolveDownloadedAudioLink = async (numLeadLink: HttpNumLeadLink, title?: string): Promise<AudioLinkRow> => {
  const [knownRow] = await db.select().from(audioLinkDB).where(eq(audioLinkDB.link, numLeadLink)).limit(1);
  if (knownRow) return knownRow;

  let md5FileName: string;

  try {
    md5FileName = await downloadFileMd5Rename(audioSaveDir, makeCmComHttpLinkFromNumLead(numLeadLink), { title });
  } catch (error) {
    throw new Error(`Не удалось скачать аудио "${numLeadLink}": ${error}`);
  }

  return registerAudioLink(takeMd5FromFileName(md5FileName), numLeadLink);
};

/** Ключ таблицы для добавляемой ссылки: уже готовый ключ берётся как есть, иначе ссылка скачивается и разрешается. */
export const takeCmAudioKeyFromLink = async (link: CmAudioSrc, title?: string): Promise<CmAudioTail> => {
  const tail = parseCmAudioTail(link);

  if (tail) {
    const [knownRow] = await db
      .select({ key: audioLinkDB.key })
      .from(audioLinkDB)
      .where(eq(audioLinkDB.key, tail))
      .limit(1);

    if (knownRow) return tail;

    throw new Error(`Ключ аудио "${link}" отсутствует в таблице аудио-ссылок`);
  }

  return downloadAndResolveCmAudioKey(makeCmComNumLeadLinkFromHttp(link), title);
};

/**
 * Ключ таблицы для ссылки, если её md5 уже известен; `nil` — ссылка/файл ещё не зарегистрированы (без скачивания).
 *
 * @deprecated md5-migration Используется только миграцией и ленивой миграцией; удалить, когда в БД не останется numLead-значений.
 */
export const takeKnownCmAudioKeyFromLink = async (link: string): Promise<CmAudioTail | nil> => {
  const numLeadLink = parseHttpNumLeadLink(makeCmComNumLeadLinkFromHttp(link));
  if (!numLeadLink) return null;

  const [knownRow] = await db
    .select({ key: audioLinkDB.key })
    .from(audioLinkDB)
    .where(eq(audioLinkDB.link, numLeadLink))
    .limit(1);

  return knownRow?.key ?? null;
};

/** numLead-ссылка по полному ключу таблицы; `nil`, если ключа нет (например, строка ещё содержит устаревшую ссылку). */
export const takeNumLeadLinkByAudioTail = async (requestedKey: string): Promise<HttpLink | HttpNumLeadLink | nil> => {
  const tail = parseCmAudioTail(requestedKey);
  if (!tail) return null;

  const [knownRow] = await db
    .select({ link: audioLinkDB.link })
    .from(audioLinkDB)
    .where(eq(audioLinkDB.key, tail))
    .limit(1);

  return knownRow?.link ?? null;
};

/** Куда редиректить запрос аудио: точный ключ таблицы либо устаревшая numLead-ссылка; `nil` — ничего не подходит. */
export const takeCmComHttpLinkFromAudioRequest = async (requested: string): Promise<HttpLink | nil> => {
  const numLeadLink = await takeNumLeadLinkByAudioTail(requested);
  if (numLeadLink) return makeCmComHttpLinkFromNumLead(numLeadLink);

  // @deprecated md5-migration Убрать legacy-fallback, когда в БД не останется numLead-значений.
  const legacyLink = parseHttpNumLeadLink(requested);

  return legacyLink ? makeCmComHttpLinkFromNumLead(legacyLink) : null;
};

/** Ленивая миграция: заменяет устаревшую numLead-ссылку в `com.al` на разрешённый ключ словаря.
 *
 * @deprecated md5-migration Удалить вместе с блоком ленивой миграции в роуте `/audio/`, когда в БД не останется numLead-значений.
 */
export const migrateLegacyCmAudioValue = (comw: CmComWid, index: number, al: CmAudioTail[], key: CmAudioTail) => {
  const nextAl = [...al];
  nextAl[index] = key;

  return dbUpdate(comDB, { al: nextAl }, eq(comDB.w, comw));
};

const readLegacyAudioJson = (fileName: `${string}.json`): unknown => {
  const filePath = `${hostRootDir}${audioDirPath}/${fileName}`;
  if (!fs.existsSync(filePath)) return null;

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const makeLegacyRedirectRows = (rawDict: unknown): AudioLinkRow[] => {
  const rows: AudioLinkRow[] = [];
  if (!checkIsObject(rawDict)) return rows;

  forEachObjectEntries(rawDict, (rawKey, rawEntry) => {
    if (!checkIsObject(rawEntry)) return;

    const key = parseCmAudioTail(rawKey);
    const rawLink = rawEntry.link;
    const link = checkIsString(rawLink)
      ? (parseHttpNumLeadLink(rawLink) ?? (checkIsStartsWith(rawLink, 'http') ? rawLink : null))
      : null;
    const md5 = rawEntry.md5;

    if (!key || !link || !checkIsString(md5) || !audioMd5Reg.test(md5)) {
      console.warn(`[Аудио] Пропущена некорректная запись словаря "${rawKey}"`);
      return;
    }

    rows.push({ key, md5, link });
  });

  return rows;
};

const appendLegacyLinkRows = (rows: AudioLinkRow[], rawLinkDict: unknown) => {
  if (!checkIsObject(rawLinkDict)) return;

  const knownMd5Set = new Set(rows.map(row => row.md5));

  forEachObjectEntries(rawLinkDict, (rawLink, rawFileName) => {
    const link = parseHttpNumLeadLink(rawLink);
    if (!link || !checkIsString(rawFileName)) return;

    const md5 = takeMd5FromFileName(rawFileName);
    if (!audioMd5Reg.test(md5) || knownMd5Set.has(md5)) return;

    knownMd5Set.add(md5);
    rows.push({ key: takeAudioLinkKey(md5, rows), md5, link });
  });
};

/** Одноразовый импорт старых JSON-словарей в таблицу, пока она пуста.
 *
 * @deprecated md5-migration Удалить после переноса всех сред на таблицу `audioLinks`.
 */
export const seedAudioLinkDBFromLegacyFiles = async () => {
  const [existingRow] = await db.select({ key: audioLinkDB.key }).from(audioLinkDB).limit(1);
  if (existingRow) return;

  const rows = makeLegacyRedirectRows(readLegacyAudioJson('md5LinkRedirectDict.json'));
  appendLegacyLinkRows(rows, readLegacyAudioJson('__linkDict.json'));

  if (!rows.length) return;

  await db.insert(audioLinkDB).values(rows).onConflictDoNothing();
  console.info(`[Аудио] Импортировано ссылок из JSON-словарей: ${rows.length}`);
};
