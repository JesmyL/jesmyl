import { Langi } from 'shared/api';
import { checkIsArray, checkIsObject, checkIsString } from '../checkIs';
import { stringTemplater } from '../stringTemplater';

/** Форма самодостаточного locale-payload: четыре заголовка в порядке Langi и необязательные значения подстановки. */
export type BackLocaleErrorPayload = {
  title: [string, string, string, string];
  intr?: Record<string, unknown>;
};

/** Разбирает строку как locale-payload; `null` значит, что это не payload и строку нужно оставить как есть. */
export const parseBackLocaleErrorPayload = (str: string): BackLocaleErrorPayload | null => {
  let parsed: unknown;

  // JSON.parse в try: обычные текстовые ошибки не являются payload и должны безопасно возвращать null.
  try {
    parsed = JSON.parse(str);
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
