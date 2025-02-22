import { CmComWid, EeStorePack } from 'shared/api/complect/apps';
import { DeviceId } from 'shared/api/complect/enums';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type CmEditorSokiInvocatorSharesModel = {
  editedEEWords: (data: { words: EeStorePack; modifiedAt: number }) => unknown;
  refreshEEPack: (data: { pack: EeStorePack; modifiedAt: number }) => unknown;
  comBusies: (busies: ComEditBusy[]) => unknown;
};

export type ComEditBusy = {
  comw: CmComWid;
  login: SokiAuthLogin;
  fio: string;
  deviceId: DeviceId;
};
