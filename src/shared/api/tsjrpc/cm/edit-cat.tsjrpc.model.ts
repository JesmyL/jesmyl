import { CmCatKind, CmCatWid, CmComWid, IExportableCat } from 'shared/api/complect/apps';

export type CmEditCatTsjrpcModel = {
  toggleComExistence: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;
  setNativeComNum: (args: { comw: CmComWid; catw: CmCatWid; value: number }) => IExportableCat;
  removeNativeComNum: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;
  create: (args: { n: string; k: CmCatKind }) => IExportableCat;
  rename: (args: { catw: CmCatWid; n: string }) => IExportableCat;
  remove: (args: { catw: CmCatWid }) => IExportableCat;
  setKind: (args: { catw: CmCatWid; k: CmCatKind }) => IExportableCat;
};
