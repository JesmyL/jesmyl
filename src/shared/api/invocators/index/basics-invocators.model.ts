import { DeviceId } from 'shared/api/complect/enums';

export type IndexBasicsSokiInvocatorModel = {
  getFreshes: (lastModfiedMs: number) => void;
  getDeviceId: () => DeviceId;
};
