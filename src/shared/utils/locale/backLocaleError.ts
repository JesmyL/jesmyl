import { Langi } from 'shared/api';
import { LocalePayloadKind } from 'shared/model/+locale/model';
import { dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { checkIsArray, checkIsObject, checkIsStartsWith, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';
import { escapeHtmlLazy } from '../string.utils';
import { type JsonString, jsonParse } from '../utils';

/** Форма самодостаточного locale-payload: четыре заголовка в порядке Langi и необязательные значения подстановки. */
export type BackLocaleErrorPayload = {
  title: [string, string, string, string];
  intr?: Record<string, unknown>;
};

const localeErrorPayloadPrefix = `${LocalePayloadKind.LocaleError} `;

/** Разбирает строку как locale-payload; `null` значит, что это не payload и строку нужно оставить как есть. */
export const parseBackLocaleErrorPayload = (str: string): BackLocaleErrorPayload | null => {
  if (!checkIsStartsWith(str, localeErrorPayloadPrefix)) return null;

  let parsed: unknown;

  try {
    parsed = jsonParse(str.slice(localeErrorPayloadPrefix.length) as JsonString<unknown>);
  } catch {
    return null;
  }

  // Проверка формы: payload — объект ровно с четырьмя строками заголовка и необязательным объектом интерполяции.
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
export const takeBackLocaleErrorTitleText = (payload: BackLocaleErrorPayload, titleIndex: number) => {
  const title = payload.title[titleIndex];

  // Без интерполяции возвращаем заголовок как есть, чтобы не гонять текст через шаблонизатор впустую.
  if (!payload.intr) return title;

  return stringTemplater(title, payload.intr);
};

/** Метка вместо готового HTML диффа из `intr.j` на время шаблонизации и экранирования. */
const diffHtmlPlaceholder = '\u0000diff-html\u0000';

/** Заголовок payload для `innerHTML`: текст шаблона экранируется, а готовый HTML диффа из `intr.j` вставляется сырым. */
export const takeBackLocaleErrorTitleHtml = (payload: BackLocaleErrorPayload, titleIndex: number) => {
  if (!payload.intr) return escapeHtmlLazy()(payload.title[titleIndex]);

  const { j, ...restIntr } = payload.intr;
  const text = stringTemplater(payload.title[titleIndex], {
    ...restIntr,
    ...(checkIsString(j) ? { j: diffHtmlPlaceholder } : {}),
  });
  const escaped = escapeHtmlLazy()(text);

  return checkIsString(j) ? escaped.replace(diffHtmlPlaceholder, () => j) : escaped;
};

/** Translates the payload into the given language; returns the input unchanged when it is not a payload. */
export const localizeBackLocaleErrorPayload = (str: string, langi = Langi.Ru): string => {
  const payload = parseBackLocaleErrorPayload(str);
  if (!payload) return str;

  return takeBackLocaleErrorTitleText(payload, langi);
};

/** Заменяет каждый встроенный payload текстом, который строит `makeReplacement`; текст вне payload остаётся как есть. */
export const mapBackLocalePayloadSegments = (
  str: string,
  makeReplacement: (payload: BackLocaleErrorPayload) => string,
): string =>
  str
    .split(dashMessageSectionSeparator)
    .map(section =>
      section
        .split('\n\n')
        .map(segment => {
          const payload = parseBackLocaleErrorPayload(segment);

          return payload ? makeReplacement(payload) : segment;
        })
        .join('\n\n'),
    )
    .join(dashMessageSectionSeparator);

/** Replaces every embedded payload segment with its single text for the given language; returns the input unchanged when there is none. */
export const localizeBackLocalePayloads = (str: string, langi = Langi.Ru): string =>
  mapBackLocalePayloadSegments(str, payload => takeBackLocaleErrorTitleText(payload, langi));
