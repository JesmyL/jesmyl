import { CmComWid, EeStorePack } from 'shared/api/complect/apps';
import { DeviceId } from 'shared/api/complect/enums';
import { SokiAuthLogin } from 'shared/api/complect/soki.model';

export type CmShareEditorTsjrpcModel = {
  editedEEWords: (args: { words: EeStorePack; modifiedAt: number }) => unknown;
  refreshEEPack: (args: { pack: EeStorePack; modifiedAt: number }) => unknown;
  comBusies: (args: { busies: ComEditBusy[] }) => unknown;
};

export type ComEditBusy = {
  comw: CmComWid;
  login: SokiAuthLogin;
  fio: string;
  deviceId: DeviceId;
};
