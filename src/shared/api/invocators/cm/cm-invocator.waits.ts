import { IExportableCat, IExportableCom } from 'shared/api/complect/apps';

export type CmSokiInvocatorWaitsMethods = {
  editedCom: (com: IExportableCom) => unknown;
  editedCat: (com: IExportableCat) => unknown;
};
