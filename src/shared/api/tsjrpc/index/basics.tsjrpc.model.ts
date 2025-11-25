import { DeviceId } from 'shared/api/complect/enums';
import { LocalSokiAuth, SokiAuthLogin, TelegramNativeAuthUserData } from 'shared/api/complect/soki.model';
import {
  IndexAppAccessRightTitles,
  IndexAppUserAccessRightsAndRoles,
  UserAccessRole,
} from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { CRUDOperation } from 'shared/utils/index/utils';
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
  getUserAccessRightsAndRoles: () => IndexAppUserAccessRightsAndRoles;

  updateUserAccessRight: <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof IndexAppAccessRightTitles[Scope],
  >(args: {
    login: SokiAuthLogin;
    scope: Scope;
    rule: Rule;
    operation: CRUDOperation;
  }) => IndexAppUserAccessRightsAndRoles | null;

  updateRoleAccessRight: <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof IndexAppAccessRightTitles[Scope],
  >(args: {
    role: UserAccessRole;
    scope: Scope;
    rule: Rule;
    operation: CRUDOperation;
  }) => IndexAppUserAccessRightsAndRoles | null;

  updateUserAccessRole: (args: {
    login: SokiAuthLogin;
    role: UserAccessRole | nil;
  }) => IndexAppUserAccessRightsAndRoles | null;

  addNewAccessRole: (args: { role: UserAccessRole }) => IndexAppUserAccessRightsAndRoles | null;

  getIconExistsPacks: (args: { page: number; pageSize: number; searchTerm: string }) => {
    packs: StameskaIconPack[];
  };
  getIconPack: (args: { icon: KnownStameskaIconName }) => { pack: StameskaIconPack };

  writeNounPron: (args: { noun?: string; pron?: string }) => void;
  getNounPron: (args: { noun?: string; pron?: string }) => {
    nouns?: string[];
    prons?: string[];
    result: string;
  };
};
