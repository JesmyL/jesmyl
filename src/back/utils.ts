import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { appVersionFileStore } from './apps/index/file-stores';

export const userVisitStringified = (visitInfo: SokiVisit | nil) => {
  if (visitInfo == null) return '';
  return (
    `${visitInfo.urls[0]}\n\n<code>${JSON.stringify(
      { ...visitInfo, version: `${visitInfo.version}/${appVersionFileStore.getValue().num}` },
      null,
      1,
    )}\n` + `Разница: ${Date.now() - visitInfo.clientTm}мс</code>`
  );
};

export const userAuthStringified = (auth: LocalSokiAuth | nil) => {
  return (
    `<div style='white-space:pre-line'>${auth ? `${auth.fio}${auth.nick && auth.tgId ? ` https://t.me/${auth.nick}` : ''}` : 'Неизвестный'}\n\n` +
    `<code>${auth ? JSON.stringify(auth, null, 1) : ''}</code></div>`
  );
};
