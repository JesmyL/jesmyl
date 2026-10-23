import { eq } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import {
  CmAudioSrc,
  CmAudioTail,
  HttpLink,
  HttpNumLeadLink,
  parseCmAudioTail,
} from 'shared/api';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { makeCmComHttpLinkFromNumLead, makeCmComNumLeadLinkFromHttp } from '../apps/cm/complect/com-http-links';
import { audioLinkDB } from '../drizzle.schema';
import { db, dbUpsert } from '../drizzle/drizzle.db';
import { AudioLinkKeyRow, AudioLinkRow } from './md5LinkRedirectDict.model';

const audioSaveDir = 'audio/';
const audioExtensionsStr = 'mp3 m4a ogg wav';

/** Расширения аудио-файлов, отбрасываемые при выделении md5 из имени; собирается один раз из компактного литерала. */
const audioExtensionReg = makeRegExp(`/\\.(?:${audioExtensionsStr.split(' ').join('|')})$/i`);

/** Полный md5-хэш аудио-файла. */
const audioMd5Reg = makeRegExp('/^[0-9a-f]{32}$/i');

const takeMd5FromFileName = (fileName: string) => fileName.replace(audioExtensionReg, '');

/** Значение трека из URL запроса `/track/...`: query-строка отбрасывается, расширение — только у md5-хвоста. */
export const takeAudioTailFromRequestPath = (requestPath: string) => {
  const [pathValue] = requestPath.split('?');
  const extensionlessPathValue = pathValue.replace(audioExtensionReg, '');

  return parseCmAudioTail(extensionlessPathValue) ? extensionlessPathValue : pathValue;
};

/**
 * Ключ аудио-ссылки: для известного md5 берётся уже выданный ключ, новый md5 получает самый короткий
 * свободный хвост (3 символа, при совпадении — 4, 5, …). Ключи append-only, повторный вызов идемпотентен.
 */
const takeAudioLinkKey = (md5: string, rows: readonly AudioLinkKeyRow[]): CmAudioTail => {
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
const downloadAndResolveCmAudioKey = async (
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

/** Ссылка по ключу таблицы; `nil`, если такого ключа нет. */
export const takeAudioLinkByTail = async (requestedKey: string): Promise<HttpLink | HttpNumLeadLink | nil> => {
  const tail = parseCmAudioTail(requestedKey);
  if (!tail) return null;

  const [knownRow] = await db
    .select({ link: audioLinkDB.link })
    .from(audioLinkDB)
    .where(eq(audioLinkDB.key, tail))
    .limit(1);

  return knownRow?.link ?? null;
};

/** Куда редиректить запрос аудио: ссылка по точному ключу таблицы; `nil` — ключ неизвестен. */
export const takeCmComHttpLinkFromAudioRequest = async (requested: string): Promise<HttpLink | nil> => {
  const link = await takeAudioLinkByTail(requested);

  return link ? makeCmComHttpLinkFromNumLead(link) : null;
};
