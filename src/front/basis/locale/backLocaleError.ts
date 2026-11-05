import { Langi } from 'shared/api';
import { checkIsArray, checkIsObject, checkIsString } from 'shared/utils/checkIs';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { stringTemplater } from 'shared/utils/stringTemplater';

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

/** Interpolated payload titles are plain text: safe as React text, escaped only where they land in `dangerouslySetInnerHTML`. */
const takeBackLocaleErrorTitleText = (payload: BackLocaleErrorPayload, titleIndex: number) =>
  payload.intr ? stringTemplater(payload.title[titleIndex], payload.intr) : payload.title[titleIndex];

/** Replaces the embedded payload segment (if any) with the text made by the caller. */
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

  return message;
};

/** Full message body: Ru text first, then a duplicate line in the viewer language. Rendered via `dangerouslySetInnerHTML`, so titles are escaped. */
export const makeBackLocaleErrorMessageDuoText = (message: string, langi: Langi) =>
  replaceBackLocaleErrorPayload(message, payload => {
    const escapeHtml = escapeHtmlLazy();

    return `${escapeHtml(takeBackLocaleErrorTitleText(payload, 0))}\n${escapeHtml(
      takeBackLocaleErrorTitleText(payload, langi),
    )}`;
  });

/** Message summary always uses the Ru text. */
export const makeBackLocaleErrorMessageRuText = (message: string) =>
  replaceBackLocaleErrorPayload(message, payload => takeBackLocaleErrorTitleText(payload, 0));
