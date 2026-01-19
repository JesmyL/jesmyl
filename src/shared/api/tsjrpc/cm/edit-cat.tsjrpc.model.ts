import { CmCatWid, CmComWid, IExportableCat } from 'shared/api/complect/apps';

export type CmEditCatTsjrpcModel = {
  toggleComExistence: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;
  setNativeComNum: (args: { comw: CmComWid; catw: CmCatWid; value: number }) => IExportableCat;
  removeNativeComNum: (args: { comw: CmComWid; catw: CmCatWid }) => IExportableCat;
};
