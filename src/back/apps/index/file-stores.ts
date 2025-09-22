import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { IndexAppAccessRightTitles, IndexAppUserAccessRights } from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { emptyFunc } from 'shared/utils';

export const nounsFileStore = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStore = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });
export const userAccessRightsFileStore = new FileStore<IndexAppUserAccessRights>(
  '/apps/index/rights.json',
  {} as never,
);
export const accessRightTitlesFileStore = new FileStore<IndexAppAccessRightTitles>(
  '/apps/index/rightTitles.json',
  {} as never,
);

accessRightTitlesFileStore.watchFile(emptyFunc);

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', {});

// valuesFileStore.setValue(prev => ({
//   ...prev,
//   // chatUrl: '',
//   // iconSearchLink: '',
// }));
