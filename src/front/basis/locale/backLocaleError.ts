import { Langi } from 'shared/api';
import { checkIsArray, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { parseChangesMessage } from 'shared/utils/changesMessage';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { stringTemplater } from 'shared/utils/stringTemplater';
import { makeDiffSectionHtml } from 'shared/utils/textDiff';

type BackLocaleErrorPayload = {
  title: [string, string, string, string];
  intr?: Record<string, unknown>;
};

/** Разбирает кандидата в payload; `null` означает, что это не валидный payload, и вызывающий код пробует следующее вхождение. */
const parseBackLocaleErrorPayload = (str: string): BackLocaleErrorPayload | null => {
  let parsed: unknown;

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

/** Метка, на которую при шаблонизации заменяется `$j` legacy-payload'а: готовая HTML-разметка диффа вставляется после неё, чтобы ни шаблонизатор, ни экранирование её не портили. */
const diffHtmlPlaceholder = '\u0000diff-html\u0000';

/** Заголовки payload после интерполяции с сырым `j`: используется там, где результат экранируется целиком (дубли ошибок) или где `j` ещё нужно разобрать как legacy-JSON. */
const takeBackLocaleErrorTitleText = (payload: BackLocaleErrorPayload, titleIndex: number) => {
  if (!payload.intr) return payload.title[titleIndex];

  // `j` подставляем как есть, поэтому на время шаблонизации заменяем его меткой, а после — вставляем через функцию, чтобы `$`-последовательности не портились.
  const { j, ...restIntr } = payload.intr;
  const text = stringTemplater(payload.title[titleIndex], {
    ...restIntr,
    ...(checkIsString(j) ? { j: diffHtmlPlaceholder } : {}),
  });

  return checkIsString(j) ? text.replace(diffHtmlPlaceholder, () => j) : text;
};

/** Заголовок для `innerHTML`: экранируется только текст шаблона, а готовая HTML-разметка диффа из `intr.j` вставляется сырой. */
const takeBackLocaleErrorTitleHtml = (payload: BackLocaleErrorPayload, titleIndex: number) => {
  if (!payload.intr) return escapeHtmlLazy()(payload.title[titleIndex]);

  // `j` — готовый HTML, поэтому его прячем за меткой, экранируем весь шаблон и только потом возвращаем разметку на место.
  const { j, ...restIntr } = payload.intr;
  const text = stringTemplater(payload.title[titleIndex], {
    ...restIntr,
    ...(checkIsString(j) ? { j: diffHtmlPlaceholder } : {}),
  });
  const escaped = escapeHtmlLazy()(text);

  return checkIsString(j) ? escaped.replace(diffHtmlPlaceholder, () => j) : escaped;
};

/** Начало JSON-payload'а локализованной ошибки — по нему ищем вхождения в теле сообщения. */
const payloadStartText = '{"title":';

/** Возвращает первый сбалансированный JSON-объект, начинающийся с `{"title":`, начиная с `fromIndex` — legacy-payload'ы с одиночным переводом строки могут быть склеены с остальным сообщением. */
const takeBackLocaleErrorPayloadSpan = (message: string, fromIndex = 0) => {
  const start = message.indexOf(payloadStartText, fromIndex);
  if (start < 0) return null;

  let depth = 0;
  let isInString = false;

  // Обход фигурных скобок: depth считает только скобки вне строк, поэтому кавычки и скобки внутри значений не закрывают диапазон раньше времени.
  for (let index = start; index < message.length; index++) {
    const char = message[index];

    if (isInString) {
      if (char === '\\') index++;
      else if (char === '"') isInString = false;
    } else if (char === '"') isInString = true;
    else if (char === '{') depth++;
    else if (char === '}' && !--depth) return { start, end: index + 1, text: message.slice(start, index + 1) };
  }

  return null;
};

/** Заменяет встроенный payload (если он есть) текстом, который строит вызывающий код; неразбираемые вхождения пропускаются. */
const replaceBackLocaleErrorPayload = (
  message: string,
  makeReplacement: (payload: BackLocaleErrorPayload) => string,
) => {
  // В теле может встретиться литеральный дамп `{"title":` раньше настоящего payload'а, поэтому вхождения перебираются по одному.
  let fromIndex = 0;

  while (fromIndex >= 0) {
    const span = takeBackLocaleErrorPayloadSpan(message, fromIndex);
    if (!span) break;

    const payload = parseBackLocaleErrorPayload(span.text);
    if (payload) return `${message.slice(0, span.start)}${makeReplacement(payload)}${message.slice(span.end)}`;

    // Переходим за неудачный диапазон к следующему префиксу `{"title":`.
    fromIndex = message.indexOf(payloadStartText, span.start + payloadStartText.length);
  }

  return message;
};

/** Полное тело сообщения: сначала русский текст, затем дубль строки на языке визита (langi передаёт вызывающий код). Рендерится через `dangerouslySetInnerHTML`, поэтому заголовки экранируются. */
export const makeBackLocaleErrorMessageDuoText = (message: string, langi: Langi) =>
  replaceBackLocaleErrorPayload(message, payload => {
    const escapeHtml = escapeHtmlLazy();

    return `${escapeHtml(takeBackLocaleErrorTitleText(payload, 0))}\n${escapeHtml(
      takeBackLocaleErrorTitleText(payload, langi),
    )}`;
  });

/** Однострочное тело на языке визита (langi передаёт вызывающий код): готовая HTML-разметка диффа из `intr.j` вставляется сырой, а текст шаблона экранируется для `dangerouslySetInnerHTML`. */
export const makeBackLocaleErrorMessageText = (message: string, langi: Langi) =>
  replaceBackLocaleErrorPayload(message, payload => {
    // Legacy-payload'ы держали в `j` сырой JSON: его по-прежнему размечает `makeDiffSectionHtml`, который сам экранирует текст вокруг диффа.
    if (checkIsString(payload.intr?.j)) {
      const legacyHtml = makeDiffSectionHtml(takeBackLocaleErrorTitleText(payload, langi), false, true);
      if (legacyHtml) return legacyHtml;
    }

    // Если `j` — уже готовый HTML (промежуточный формат), экранируется только шаблон, а разметка вставляется как есть.
    return takeBackLocaleErrorTitleHtml(payload, langi);
  });

/**
 * Локализует самостоятельный payload заголовка для `innerHTML`: `t` из конверта Changes — ровно JSON-payload,
 * поэтому разбирается целиком без поиска вхождений в тексте; не-payload экранируется как обычный текст.
 */
const takeBackLocaleErrorPayloadHtml = (payloadText: string, langi: Langi) => {
  const payload = parseBackLocaleErrorPayload(payloadText);

  return payload ? takeBackLocaleErrorTitleHtml(payload, langi) : escapeHtmlLazy()(payloadText);
};

/**
 * Рендерит новое сообщение Changes из явного конверта `{ t, d }`: заголовок `t` локализуется как самостоятельный payload,
 * а готовый HTML диффа `d` вставляется сырым.
 * `null` — сообщение не является конвертом, и вызывающий код переходит к legacy-путям.
 */
export const makeChangesMessageHtml = (message: string, langi: Langi) => {
  const changes = parseChangesMessage(message);
  if (!changes) return null;

  const title = takeBackLocaleErrorPayloadHtml(changes.t, langi);

  return changes.d ? `${title}\n${changes.d}` : title;
};
