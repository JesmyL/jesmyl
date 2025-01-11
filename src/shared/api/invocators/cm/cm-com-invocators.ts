import { CmComWid, CmMp3ContainsPageResult, CmMp3Rule, IExportableCom } from 'shared/api/complect/apps';

type SimpleComValueSetter<Value> = (comw: CmComWid, value: Value) => IExportableCom;

export type CmComSokiInvocatorMethods = {
  newCom: (value: OmitOwn<IExportableCom, 'w'>) => IExportableCom;

  getResourceHTMLString: (src: string) => CmMp3ContainsPageResult;
  getMp3RulesList: () => CmMp3Rule[];

  rename: SimpleComValueSetter<string>;
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
};
