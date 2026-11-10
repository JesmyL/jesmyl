import { checkIsNil, checkIsObject, checkIsString } from 'shared/utils/checkIs';

/**
 * Собирает сообщение Changes в явном JSON-конверте: `t` — locale-payload заголовка,
 * `d` — готовый HTML диффа, посчитанный на бэке. Структура передаётся полями, а не разметкой внутри текста.
 */
export const makeChangesMessage = (titlePayload: string, diffHtml: string) =>
  JSON.stringify({ t: titlePayload, d: diffHtml });

/**
 * Разбирает сообщение Changes как явный конверт `{ t, d? }`.
 * `null` — это не конверт (legacy-сообщение или tsjrpc-секция), и вызывающий код идёт прежним путём.
 */
export const parseChangesMessage = (message: string) => {
  let parsed: unknown;

  // Обычный текст не является JSON — это штатный legacy-случай, а не ошибка разбора конверта.
  try {
    parsed = JSON.parse(message);
  } catch {
    return null;
  }

  if (!checkIsObject(parsed)) return null;

  const { t, d } = parsed;
  if (!checkIsString(t)) return null;
  if (!checkIsNil(d) && !checkIsString(d)) return null;

  return { t, d: checkIsString(d) ? d : null };
};
