import { atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { DeviceId, SokiAppName, SokiAuthLogin } from 'shared/api';
import {
  IndexAppUserAccessRightsAndRoles,
  IndexAppUserAccessRightsWithoutInfo,
  UserAccessRole,
} from 'shared/model/index/access-rights';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { authIDB } from './auth-idb';
import { indexIDB } from './index-idb';

export const indexDeviceIdAtom = atom(DeviceId.def, {
  storeKey: 'index:deviceId',
  unchangable: true,
});

export const lastUpdatedIconsMd5HashAtom = atom('', 'index:lastUpdatedIconsMd5Hash');

export const liveDataAtom = atom<IndexSchWBroadcastLiveDataValue | null>(null);
export const liveDataStreamersAtom = atom<{ fio: string; login: SokiAuthLogin }[] | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useValue.fileAssociations();

export const useAuth = () => authIDB.useValue.auth();

export const useAppFontFamily = () => indexIDB.use.appFontFamily();

export const indexIsPlayAnimationsAtom = atom(false, 'index:isPlayAnimations');
export const indexIsShowPlayerInFooterAtom = atom(false, 'index:isShowPlayerInFooter');

export const indexAppUserAccessRightsMatrixAtom = atom<IndexAppUserAccessRightsAndRoles | null>(null);
export const indexUserAccessRightsAtom = atom<IndexAppUserAccessRightsWithoutInfo>({}, 'index:myAccessRights');
export const indexOpenAccessRoleRedactorAtom = atom<UserAccessRole | null>(null);

export const indexFavouriteAppsAtom = atom<SokiAppName[]>([], 'index:favouriteApps');
