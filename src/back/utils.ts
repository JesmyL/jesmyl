import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { appVersionFileStore } from './apps/index/file-stores';

export const userVisitStringified = (visitInfo: SokiVisit | nil) => {
  if (visitInfo == null) return '';
  return (
    `${visitInfo.urls[0]}\n\n<blockquote expandable>${JSON.stringify(
      { ...visitInfo, version: `${visitInfo.version}/${appVersionFileStore.getValue().num}` },
      null,
      1,
    )}\n` + `Разница: ${Date.now() - visitInfo.clientTm}мс</blockquote>`
  );
};

export const userAuthStringified = (auth: LocalSokiAuth | nil) => {
  return (
    `${auth ? `${auth.fio}${auth.nick ? ` t.me/${auth.nick}` : ''}` : 'Неизвестный'}\n\n` +
    `<blockquote expandable>${auth ? JSON.stringify(auth, null, 1) : ''}</blockquote>`
  );
};
