import { DeviceId, Langi } from 'shared/api/complect/enums';
import { PushSubscriptionPayload } from 'shared/api/complect/push.model';
import {
  LocalSokiAuth,
  SokiAuthLogin,
  TelegramNativeAuthUserData,
  UserInfoUnsecure,
  UserLogin,
} from 'shared/api/complect/soki.model';
import { Bool } from 'shared/enums';
import { ConstantsConfig } from 'shared/model/constantsConfig';
import { IndexAppAccessRightTitles, UserAccessRole, UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { VisitsDashboard, DashMessageKind, VisitsDashboardMessagesArgs } from 'shared/model/index/visitsDashboard';
import { CRUDOperation } from 'shared/utils/index/utils';
import { StameskaIconPack } from 'stameska-icon/utils';

export interface UserPushInfo {
  isSilent: Bool;
  hasSubscription: Bool;
  isMuted: Bool;
}

export type IndexTsjrpcModel = {
  requestFreshes: (args: {
    lastModfiedAt: number;
    iconPacks: KnownStameskaIconName[] | nil;
    iconsMd5Hash: string;
  }) => void;
  getDeviceId: () => DeviceId;
  getDeviceEmoji: () => string;

  getPushVapidPublicKey: () => string;
  subscribePush: (args: { subscription: PushSubscriptionPayload }) => void;
  unsubscribePush: (args: { endpoint: string }) => void;
  getPushSettings: () => { mutedUntil: number | nil; isSilent: Bool };
  updatePushSettings: (args: { mutedUntil: number | nil; isSilent: Bool }) => void;
  getUserPushInfo: (args: { login: SokiAuthLogin }) => UserPushInfo;

  authMeByTelegramNativeButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramMiniButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramInScheduleDay: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (args: { secretNumber: number }) => { token: string; auth: LocalSokiAuth };

  sendEmailOTP_v1: (args: { email: string }) => { email: string };
  sendBindEmailOTP: (args: { email: string }) => { email: string };
  authByEmailOTP: (args: { otp: number }) => { token: string; auth: LocalSokiAuth };
  bindEmailByOTP: (args: { otp: number }) => { fioOrNick: string };

  getFreshAppVersion: () => number;
  getIndexValues: () => IndexValues;
  getVisitsDashboard_v1: (args?: { messages?: VisitsDashboardMessagesArgs }) => VisitsDashboard;
  markDashMessagesRead_v1: (args: { kind: DashMessageKind }) => PRecord<DashMessageKind, number>;

  getAccessRightTitles: () => IndexAppAccessRightTitles;
  getUserInfoDict: () => PRecord<UserLogin, UserInfoUnsecure>;
  getRoleUnfoDict: () => PRecord<UserAccessRole, UserAccessRoleInfo>;

  updateUserAccessRight: <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof IndexAppAccessRightTitles[Scope],
  >(args: {
    login: SokiAuthLogin;
    scope: Scope;
    rule: Rule;
    operation: CRUDOperation;
  }) => PRecord<UserLogin, UserInfoUnsecure>;

  updateRoleAccessRight: <
    Scope extends keyof IndexAppAccessRightTitles,
    Rule extends keyof IndexAppAccessRightTitles[Scope],
  >(args: {
    role: UserAccessRole;
    scope: Scope;
    rule: Rule;
    operation: CRUDOperation;
  }) => PRecord<UserAccessRole, UserAccessRoleInfo> | null;

  updateUserAccessRole: (args: {
    login: SokiAuthLogin;
    role: UserAccessRole | nil;
  }) => PRecord<UserLogin, UserInfoUnsecure> | null;

  addNewAccessRole: (args: { role: UserAccessRole }) => PRecord<UserAccessRole, UserAccessRoleInfo> | null;

  getIconExistsPacks: (args: { page: number; pageSize: number; searchTerm: string }) => {
    packs: StameskaIconPack[];
  };
  getIconPack: (args: { icon: KnownStameskaIconName }) => { pack: StameskaIconPack };

  writeNounPron: (args: { noun?: string; pron?: string; level: number }) => void;
  getNounPron: (args: { noun?: string; pron?: string }) => {
    nouns?: string[];
    prons?: string[];
    result: string;
  };

  updateConstConfig: (args: { config: Partial<ConstantsConfig> }) => void;

  reqLocaleBaseConfig: () => void;
  reqLocaleEditorConfig: () => void;
  reqLocaleDynConfig: (args: { langi: Langi }) => void;

  requestFreshLocales: (args: { lastModifiedAt: number }) => void;
};
