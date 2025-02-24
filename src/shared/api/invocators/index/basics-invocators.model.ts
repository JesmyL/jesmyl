import { DeviceId } from 'shared/api/complect/enums';
import { IndexValues, LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api/complect/soki.model';

export type IndexBasicsSokiInvocatorModel = {
  requestFreshes: (lastModfiedAt: number) => void;
  getDeviceId: () => DeviceId;
  authMeByTelegramNativeButton: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramMiniButton: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramInScheduleDay: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (secretNumber: number) => { token: string; auth: LocalSokiAuth };

  getFreshAppVersion: () => number;
  getIndexValues: () => IndexValues;
};
