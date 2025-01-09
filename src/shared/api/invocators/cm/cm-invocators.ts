import { IExportableCat, IExportableCom } from 'shared/api/complect/apps';

export type CmSokiInvocatorStreamMethods = {
  editedCom: (com: IExportableCom) => unknown;
  editedCat: (com: IExportableCat) => unknown;
};
