import { CmCatWid, CmComWid, IExportableCat } from 'shared/api/complect/apps';

export type CmCatSokiInvocatorMethods = {
  toggleComExistence: (comw: CmComWid, catw: CmCatWid) => IExportableCat;
  setNativeComNum: (comw: CmComWid, catw: CmCatWid, value: number) => IExportableCat;
  removeNativeComNum: (comw: CmComWid, catw: CmCatWid) => IExportableCat;
};
