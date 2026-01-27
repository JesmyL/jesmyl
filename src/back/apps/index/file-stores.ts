import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { IndexAppAccessRightTitles, IndexAppUserAccessRightsAndRoles } from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { emptyFunc } from 'shared/utils';
import { stameskaIconPack } from 'stameska-icon/pack';

export const nounsFileStore = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStore = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });

export const userAccessRightsAndRolesFileStore = new FileStore<IndexAppUserAccessRightsAndRoles>(
  '/apps/index/rights.json',
  { rights: {}, roles: { TOP: { info: { m: 0 } } } },
);
export const accessRightTitlesFileStore = new FileStore<IndexAppAccessRightTitles>(
  '/apps/index/rightTitles.json',
  {} as never,
).watchFile(emptyFunc);

export const indexStameskaIconsFileStore = new FileStore<typeof stameskaIconPack>('/stameska-icons', null as never);
// if (indexStameskaIconsFileStore.getValue() == null) indexStameskaIconsFileStore.setValue(stameskaIconPack);

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', {});

// valuesFileStore.setValue(prev => ({
//   ...prev,
//   // chatUrl: '',
//   // iconSearchLink: '',
//   // desktopLinuxDownLink: `${hosts.host}/down/JESMYL_PRO.AppImage`,
//   // desktopWindowsDownLink: `${hosts.host}/down/JESMYL_PRO.exe`,
// }));
