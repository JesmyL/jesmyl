import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { hostConfig, LocalSokiAuth, SokiAuthLogin, SokiVisit } from 'shared/api';
import { dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { appVersionFileStore } from './apps/index/file-stores';

export const userVisitStringified = (visitInfo: SokiVisit | nil) =>
  visitInfo
    ? `${visitInfo.urls[0]}\n\n<code>${escapeHtmlLazy()(
        JSON.stringify(
          { ...visitInfo, version: `${visitInfo.version}/${appVersionFileStore.getValue().num}` },
          null,
          1,
        ),
      )}\nРазница: ${Date.now() - visitInfo.clientTm}мс</code>`
    : '';

/** Первая строка сообщения дашборда: имя отправителя или «Неизвестный», чтобы автор был виден до разворачивания auth-блока. */
export const dashUserNameLine = (auth: LocalSokiAuth | nil) => {
  if (!auth) return translateBackTexts(undefined, BackLocaleKey.SchUnknownRole);

  const name = takeUserAuthName(auth) || translateBackTexts(undefined, BackLocaleKey.SchUnknownRole);
  const tgLink = auth.nick && auth.tgId && auth.nick !== name ? ` https://t.me/${auth.nick}` : '';

  return escapeHtmlLazy()(name + tgLink);
};

// Auth-блок без строки имени: имя всегда идёт первой строкой сообщения и не дублируется здесь.
export const userAuthStringified = (auth: LocalSokiAuth | nil) =>
  auth ? `<code>${escapeHtmlLazy()(JSON.stringify(auth, null, 1))}</code>` : '';

/** Добавляет к сообщению дашборда блок visit/auth, отделённый `dashMessageSectionSeparator`. */
export const dashAuthVisitSuffix = (auth: LocalSokiAuth | nil, visitInfo: SokiVisit | nil) =>
  `${dashMessageSectionSeparator}${userVisitStringified(visitInfo)}\n\n${userAuthStringified(auth)}`;

export const takeLogginedAuthOrThrow = (auth: LocalSokiAuth | nil): LocalSokiAuth & { login: SokiAuthLogin } => {
  if (!auth?.login) throw backLocaleError(BackLocaleKey.NotAuthorized);

  return auth as never;
};

export const makeCertBotFilePath = (fileName: string, host = hostConfig.host) => {
  return `/etc/letsencrypt/live/${host}/${fileName}.pem`;
};
