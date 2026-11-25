import { parseChangesMessage } from 'shared/utils/changesMessage';
import { escapeHtmlLazy } from 'shared/utils/string.utils';

/**
 * Разворачивает явный конверт Changes, пришедший с сервера: заголовок `t` уже локализован и здесь экранируется
 * для `innerHTML`, а готовый HTML диффа `d` вставляется сырым. `null` — секция не является конвертом.
 */
export const makeChangesMessageHtml = (section: string) => {
  const changes = parseChangesMessage(section);
  if (!changes) return null;

  const title = escapeHtmlLazy()(changes.t);

  return changes.d ? `${title}\n${changes.d}` : title;
};

/** Секция сообщения для `innerHTML`: конверт Changes разворачивается, остальной текст сервер уже подготовил. */
export const makeDashboardMessageSectionHtml = (section: string) => makeChangesMessageHtml(section) ?? section;
