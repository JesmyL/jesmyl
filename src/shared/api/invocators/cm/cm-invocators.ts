import { CmComWid, IExportableCom } from 'shared/api/complect/apps';

export type CmComSokiInvocatorMethods = {
  rename: (comw: CmComWid, name: string) => IExportableCom;
};

export type CmSokiInvocatorStreamMethods = {
  editedCom: (com: IExportableCom) => unknown;
};
