import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { appVersionFileStore } from './apps/index/file-stores';

export const userVisitStringified = (visit: SokiVisit | nil) => {
  if (visit == null) return '';
  return (
    `${visit.urls[0]}\n\n<blockquote expandable>${JSON.stringify(
      { ...visit, version: `${visit.version}/${appVersionFileStore.getValue().num}` },
      null,
      1,
    )}\n` + `Разница: ${Date.now() - visit.clientTm}мс</blockquote>`
  );
};

export const userAuthStringified = (auth: LocalSokiAuth | nil) => {
  return (
    `${auth ? `${auth.fio}${auth.nick ? ` t.me/${auth.nick}` : ''}` : 'Неизвестный'}\n\n` +
    `<blockquote expandable>${auth ? JSON.stringify(auth, null, 1) : ''}</blockquote>`
  );
};
