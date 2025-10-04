import { CmComWid, HttpLink, IExportableCom } from 'shared/api/complect/apps';

type SimpleComValueSetter<Value> = (args: { comw: CmComWid; value: Value }) => IExportableCom;

export type CmEditComTsjrpcModel = {
  newCom: (args: { value: OmitOwn<IExportableCom, 'w'> }) => IExportableCom;

  rename: SimpleComValueSetter<string>;
  destroy: (args: { comw: CmComWid }) => string;
  setBpM: SimpleComValueSetter<number>;
  setMeterSize: SimpleComValueSetter<3 | 4>;
  changeLanguage: SimpleComValueSetter<number>;
  changeTon: SimpleComValueSetter<number>;
  makeBemoled: SimpleComValueSetter<num>;
  changePushKind: SimpleComValueSetter<number>;
  toggleAudioLink: (args: { comw: CmComWid; link: HttpLink }) => void;

  changeChordBlock: (args: { texti: number; comw: CmComWid; value: string }) => IExportableCom;
  changeTextBlock: (args: { texti: number; comw: CmComWid; value: string }) => IExportableCom;

  insertChordBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => IExportableCom;
  removeChordBlock: (args: { comw: CmComWid; value: string; removei: number }) => IExportableCom;

  insertTextBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => IExportableCom;
  removeTextBlock: (args: { comw: CmComWid; value: string; removei: number }) => IExportableCom;

  remove: (args: { comw: CmComWid }) => IExportableCom;
  bringBackToLife: (args: { comw: CmComWid }) => IExportableCom;

  takeRemovedComs: () => IExportableCom[];
};
