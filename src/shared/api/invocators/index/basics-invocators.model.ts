import { DeviceId } from 'shared/api/complect/enums';
import { LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api/complect/soki.model';

export type IndexBasicsSokiInvocatorModel = {
  getFreshes: (lastModfiedMs: number) => void;
  getDeviceId: () => DeviceId;
  authMeByTelegramNativeButton: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramMiniButton: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramInScheduleDay: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (secretNumber: number) => { token: string; auth: LocalSokiAuth };
};
