import { CmCatWid, CmComWid, IExportableCat } from 'shared/api/complect/apps';

export type CmCatSokiInvocatorMethods = {
  rename: (catw: CmCatWid, name: string) => IExportableCat;
  setKind: (catw: CmCatWid, kind: string) => IExportableCat;
  clearStack: (catw: CmCatWid) => IExportableCat;

  toggleComExistence: (comw: CmComWid, catw: CmCatWid) => IExportableCat;
  setNativeComNum: (comw: CmComWid, catw: CmCatWid, value: number) => IExportableCat;
  removeNativeComNum: (comw: CmComWid, catw: CmCatWid) => IExportableCat;

  remove: (catw: CmCatWid) => IExportableCat;
  bringBackToLife: (catw: CmCatWid) => IExportableCat;
};
