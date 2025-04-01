import { CmCatWid, CmComWid, IExportableCat } from 'shared/api/complect/apps';

export type CmCatSokiInvocatorModel = {
  rename: (args: { catw: CmCatWid; name: string }) => IExportableCat;
  setKind: (args: { catw: CmCatWid; kind: string }) => IExportableCat;
  clearStack: (args: { catw: CmCatWid }) => IExportableCat;

  toggleComExistence: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;
  setNativeComNum: (args: { comw: CmComWid; catw: CmCatWid; value: number }) => IExportableCat;
  removeNativeComNum: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;

  remove: (args: { catw: CmCatWid }) => IExportableCat;
  bringBackToLife: (args: { catw: CmCatWid }) => IExportableCat;
};
