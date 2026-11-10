import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { hostConfig, LocalSokiAuth, SokiAuthLogin, SokiVisit } from 'shared/api';
import { dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { escapeHtmlLazy } from 'shared/utils/string.utils';
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

export const userAuthStringified = (auth: LocalSokiAuth | nil) =>
  `<div style='white-space:pre-line'>${auth ? `${auth.fio}${auth.nick && auth.tgId ? ` https://t.me/${auth.nick}` : ''}` : translateBackTexts(null, BackLocaleKey.SchUnknownRole)}\n\n` +
  `<code>${auth ? escapeHtmlLazy()(JSON.stringify(auth, null, 1)) : ''}</code></div>`;

/** Appends the shared auth/visit info block to a dashboard message, separated by `dashMessageSectionSeparator`. */
export const dashAuthVisitSuffix = (auth: LocalSokiAuth | nil, visitInfo: SokiVisit | nil) =>
  `${dashMessageSectionSeparator}${userAuthStringified(auth)}\n\n${userVisitStringified(visitInfo)}`;

export const takeLogginedAuthOrThrow = (auth: LocalSokiAuth | nil): LocalSokiAuth & { login: SokiAuthLogin } => {
  if (!auth?.login) throw backLocaleError(BackLocaleKey.NotAuthorized);

  return auth as never;
};

export const makeCertBotFilePath = (fileName: string, host = hostConfig.host) => {
  return `/etc/letsencrypt/live/${host}/${fileName}.pem`;
};
