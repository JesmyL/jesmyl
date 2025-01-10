import { IExportableCat, IExportableCom } from 'shared/api/complect/apps';

export type CmSokiInvocatorMethods = {
  getFreshComList: (lastModfiedMs: number) => IExportableCom[];
  getFreshCatList: (lastModfiedMs: number) => IExportableCat[];
};
