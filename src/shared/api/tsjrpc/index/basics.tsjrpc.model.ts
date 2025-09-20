import { DeviceId } from 'shared/api/complect/enums';
import { LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api/complect/soki.model';
import {
  IndexAppAccessRightTitles,
  IndexAppUserAccessRights,
  UpdateUserAccessRight,
} from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { StameskaIconPack } from 'stameska-icon/utils';

export type IndexTsjrpcModel = {
  requestFreshes: (args: {
    lastModfiedAt: number;
    iconPacks: KnownStameskaIconName[] | nil;
    iconsMd5Hash: string;
  }) => void;
  getDeviceId: () => DeviceId;
  authMeByTelegramNativeButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramMiniButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramInScheduleDay: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (args: { secretNumber: number }) => { token: string; auth: LocalSokiAuth };

  getFreshAppVersion: () => number;
  getIndexValues: () => IndexValues;

  getAccessRightTitles: () => IndexAppAccessRightTitles;
  getUserAccessRights: () => IndexAppUserAccessRights;
  updateUserAccessRight: UpdateUserAccessRight;
  getIconExistsPacks: (args: { page: number; pageSize: number; searchTerm: string }) => {
    packs: StameskaIconPack[];
  };
};
