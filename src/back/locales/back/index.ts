import { Langi } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { checkIsArray, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { parseChangesMessage } from 'shared/utils/changesMessage';
import { translateBaseDefine } from 'shared/utils/locale/translate';
import { stringTemplater } from 'shared/utils/stringTemplater';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { backLocalesEn } from './en';
import { backLocalesKz } from './kz';
import { backLocalesRu } from './ru';
import { backLocalesUa } from './ua';

const backLocales: { [L in Langi]: Record<BackLocaleKey, string> } = {
  [Langi.Ru]: backLocalesRu,
  [Langi.Ua]: backLocalesUa,
  [Langi.Kz]: backLocalesKz,
  [Langi.En]: backLocalesEn,
};

export const translateBackTexts = (
  langi: Langi | nil,
  key: BackLocaleKey,
  interpolation?: Record<string, string | number | boolean>,
) => {
  const text = translateBaseDefine(backLocales[langi ?? Langi.Ru] ?? backLocalesRu)(key);

  return interpolation ? stringTemplater(text, interpolation) : text;
};

const langiList = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En] as const;

/**
 * Собирает самодостаточный locale-payload: тексты идут по порядку Langi (Ru/Ua/Kz/En),
 * а необязательные значения подстановки хранятся один раз в общем объекте `intr`.
 */
const makeBackLocalePayloadJson = (title: readonly string[], intr?: Record<string, string | number | boolean>) =>
  JSON.stringify({ title, ...(intr ? { intr } : null) });

/** Локализованный payload: по одному тексту на язык в порядке Langi (Ru/Ua/Kz/En). */
export const backLocalePayload = (makeText: (langi: Langi) => string) =>
  makeBackLocalePayloadJson(langiList.map(makeText));

/** Self-contained localized error payload: raw texts ordered by the Langi enum (Ru/Ua/Kz/En) plus interpolation values. */
export const backLocaleError = (key: BackLocaleKey, interp?: Record<string, string | number | boolean>) =>
  makeBackLocalePayloadJson(
    langiList.map(langi => backLocales[langi][key]),
    interp,
  );

type BackLocaleErrorPayload = {
  title: [string, string, string, string];
  intr?: Record<string, unknown>;
};

const parseBackLocaleErrorPayload = (str: string): BackLocaleErrorPayload | null => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(str);
  } catch {
    return null;
  }

  if (!checkIsObject(parsed)) return null;

  const { title, intr } = parsed;
  if (!checkIsArray(title) || title.length !== 4) return null;

  const [ru, ua, kz, en] = title;
  if (!checkIsString(ru) || !checkIsString(ua) || !checkIsString(kz) || !checkIsString(en)) return null;
  if (intr !== undefined && !checkIsObject(intr)) return null;

  return { title: [ru, ua, kz, en], intr };
};

/** True when the string is a self-contained localized payload (see `backLocalePayload`/`backLocaleError`). */
export const checkIsBackLocalePayload = (str: string) => parseBackLocaleErrorPayload(str) !== null;

/** Текст заголовка после подстановки `intr`: все значения идут через общий шаблонизатор. */
const takeBackLocaleErrorTitleText = (payload: BackLocaleErrorPayload, titleIndex: number) => {
  const title = payload.title[titleIndex];

  if (!payload.intr) return title;

  return stringTemplater(title, payload.intr);
};

/** Translates the payload into the given language; returns the input unchanged when it is not a payload. */
export const localizeBackLocaleErrorPayload = (str: string, langi: Langi | nil): string => {
  const payload = parseBackLocaleErrorPayload(str);
  if (!payload) return str;

  return takeBackLocaleErrorTitleText(payload, langi ?? Langi.Ru);
};

/** Replaces every embedded payload segment with its single text for the given language; returns the input unchanged when there is none. */
export const localizeBackLocalePayloads = (str: string, langi: Langi | nil): string =>
  str
    .split('\n\n')
    .map(segment => {
      const payload = parseBackLocaleErrorPayload(segment);

      return payload ? takeBackLocaleErrorTitleText(payload, langi ?? Langi.Ru) : segment;
    })
    .join('\n\n');

/**
 * HTML письма для явного конверта Changes: заголовок `t` локализуется и экранируется,
 * готовый HTML диффа `d` вставляется сырым внутри `<pre>`, чтобы письмо сохраняло переносы строк.
 * `null` — сообщение не является конвертом, вызывающий код использует прежний путь.
 */
export const localizeChangesMessageHtml = (message: string, langi: Langi | nil) => {
  const changes = parseChangesMessage(message);
  if (!changes) return null;

  const title = escapeHtmlLazy()(localizeBackLocaleErrorPayload(changes.t, langi));

  return changes.d ? `${title}\n<pre style="white-space:pre-wrap">${changes.d}</pre>` : title;
};

/** Replaces the embedded payload segment (if any) with the text made by the caller; null when there is no payload. */
const replaceBackLocaleErrorPayload = (
  message: string,
  makeReplacement: (payload: BackLocaleErrorPayload) => string,
) => {
  const segments = message.split('\n\n');

  for (let index = 0; index < segments.length; index++) {
    const payload = parseBackLocaleErrorPayload(segments[index]);
    if (!payload) continue;

    segments[index] = makeReplacement(payload);

    return segments.join('\n\n');
  }

  return null;
};

/** Full message body: Ru text first, then the viewer-language text on a new line (collapsed when they match). */
export const makeBackLocaleErrorDuoText = (str: string, langi: Langi | nil): string | null =>
  replaceBackLocaleErrorPayload(str, payload => {
    const ruText = takeBackLocaleErrorTitleText(payload, 0);
    const viewerText = takeBackLocaleErrorTitleText(payload, langi ?? Langi.Ru);

    return ruText === viewerText ? ruText : `${ruText}\n${viewerText}`;
  });
