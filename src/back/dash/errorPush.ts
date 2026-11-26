import { makeRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { parseChangesMessage } from 'shared/utils/changesMessage';
import { localizeBackLocalePayloads } from 'shared/utils/locale/backLocaleError';

const errorPushTextMaxLength = 100;
const errorPushArgsMarker = 'Аргументы:';
const pushDivReg = makeRegExp('/<div[^>]*>[\\s\\S]*?<\\/div>/gi');
const pushBlockquoteReg = makeRegExp('/<blockquote[^>]*>[\\s\\S]*?<\\/blockquote>/gi');
const pushHtmlTagReg = makeRegExp('/<[^>]*>/g');
const pushWhitespaceReg = makeRegExp('/\\s+/g');

/** Короткая однострочная сводка сохранённого сообщения об ошибке для push: берётся только содержательная секция (конверт Changes или текст до `dashMessageSectionSeparator` без первой строки с именем отправителя), payload из backLocale заменяется читаемым текстом на языке получателя (`localizeBackLocalePayloads`), вырезаются html/div/blockquote, отбрасывается всё после маркера аргументов, схлопываются пробелы и текст усекается до `errorPushTextMaxLength` с многоточием. */
export const takeErrorPushSummary = (message: string, langi: Langi) => {
  const changes = parseChangesMessage(message);
  const text = localizeBackLocalePayloads(
    changes ? changes.t : message.split(dashMessageSectionSeparator)[0].split('\n').slice(1).join('\n'),
    langi,
  )
    .replace(pushDivReg, ' ')
    .replace(pushBlockquoteReg, ' ')
    .split(errorPushArgsMarker)[0]
    .replace(pushHtmlTagReg, ' ')
    .replace(pushWhitespaceReg, ' ')
    .trim();

  return text.length > errorPushTextMaxLength ? `${text.slice(0, errorPushTextMaxLength)}…` : text;
};
