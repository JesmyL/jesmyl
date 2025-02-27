import { CmComWid, IExportableCom } from 'shared/api/complect/apps';

type SimpleComValueSetter<Value> = (comw: CmComWid, value: Value) => IExportableCom;

export type CmComSokiInvocatorModel = {
  newCom: (value: OmitOwn<IExportableCom, 'w'>) => IExportableCom;

  rename: SimpleComValueSetter<string>;
  destroy: (comw: CmComWid) => string;
  setBpM: SimpleComValueSetter<number>;
  setMeterSize: SimpleComValueSetter<3 | 4>;
  changeLanguage: SimpleComValueSetter<number>;
  changeTon: SimpleComValueSetter<number>;
  makeBemoled: SimpleComValueSetter<num>;
  changePushKind: SimpleComValueSetter<number>;
  setAudioLinks: SimpleComValueSetter<string>;

  changeChordBlock: (texti: number, comw: CmComWid, value: string) => IExportableCom;
  changeTextBlock: (texti: number, comw: CmComWid, value: string) => IExportableCom;

  insertChordBlock: (value: string, comw: CmComWid, insertToi: number) => IExportableCom;
  insertTextBlock: (value: string, comw: CmComWid, insertToi: number) => IExportableCom;

  removeTextBlock: (comw: CmComWid, value: string, removei: number) => IExportableCom;
  removeChordBlock: (comw: CmComWid, value: string, removei: number) => IExportableCom;

  remove: (comw: CmComWid) => IExportableCom;
  bringBackToLife: (comw: CmComWid) => IExportableCom;

  printComwVisit: (comw: CmComWid) => void;
  takeComwVisitsCount: (comw: CmComWid) => number;
  takeRemovedComs: () => IExportableCom[];
};
