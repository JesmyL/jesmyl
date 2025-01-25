import { DeviceId } from 'shared/api/complect/enums';
import { LocalSokiAuth, TelegramNativeAuthUserData } from 'shared/api/complect/soki';

export type IndexBasicsSokiInvocatorModel = {
  getFreshes: (lastModfiedMs: number) => void;
  getDeviceId: () => DeviceId;
  authMeByTelegramNativeButton: (user: TelegramNativeAuthUserData) => { token: string; auth: LocalSokiAuth };
  authMeByTelegramBotNumber: (secretNumber: number) => { token: string; auth: LocalSokiAuth };
};
