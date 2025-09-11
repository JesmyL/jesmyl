import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { SokiAuthLogin } from 'shared/api';
import { IndexAppUserAccessRights, IndexAppUserAccessRightsWithoutInfo } from 'shared/model/index/access-rights';
import { authIDB } from './db/auth-idb';
import { indexIDB } from './db/index-idb';
import { IndexSchWTranslationLiveDataValue } from './Index.model';

export const liveDataAtom = atom<IndexSchWTranslationLiveDataValue | null>(null);
export const liveDataStreamersAtom = atom<{ fio: string; login: SokiAuthLogin }[] | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useValue.fileAssociations();

export const useAuth = () => authIDB.useValue.auth();

export const useAppFontFamily = () => indexIDB.use.appFontFamily();

export const indexIsPlayAnimationsAtom = atom(false, 'index:isPlayAnimations');
export const indexIsShowPlayerInFooterAtom = atom(false, 'index:isShowPlayerInFooter');

export const indexAppUserAccessRightsMatrixAtom = atom<IndexAppUserAccessRights>({});
export const indexUserAccessRightsAtom = atom<IndexAppUserAccessRightsWithoutInfo>({}, 'index:userRights');
