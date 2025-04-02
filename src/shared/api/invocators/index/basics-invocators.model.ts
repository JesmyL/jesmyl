import { DeviceId, DeviceInfo } from 'shared/api/complect/enums';
import { IndexValues, LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api/complect/soki.model';

export type IndexBasicsSokiInvocatorModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;
  getDeviceId: (args: { deviceInfo: DeviceInfo }) => DeviceId;
  authMeByTelegramNativeButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramMiniButton: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramInScheduleDay: (args: { user: TelegramNativeAuthUserData }) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (args: { secretNumber: number }) => { token: string; auth: LocalSokiAuth };

  getFreshAppVersion: () => number;
  getIndexValues: () => IndexValues;
};
