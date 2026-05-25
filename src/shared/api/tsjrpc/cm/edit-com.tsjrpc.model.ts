import {
  CmComIntensityLevel,
  CmComOrderWid,
  CmComWid,
  HttpNumLeadLink,
  IExportableCom,
} from 'shared/api/complect/apps';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';

type SimpleComValueSetter<Value> = (args: { comw: CmComWid; value: Value }) => IExportableCom;

export type CmEditComTsjrpcModel = {
  newCom: (args: { value: OmitOwn<IExportableCom, 'w'> }) => IExportableCom;

  rename: SimpleComValueSetter<string>;
  destroy: (args: { comw: CmComWid }) => string;
  setBpM: SimpleComValueSetter<number>;
  setMeterSize: SimpleComValueSetter<CmComMetricNum>;
  changeLanguage: SimpleComValueSetter<number>;
  changeDrive: SimpleComValueSetter<CmComIntensityLevel>;
  changeTon: SimpleComValueSetter<number>;
  makeBemoled: SimpleComValueSetter<num>;

  toggleAudioLink: (args: { comw: CmComWid; link: HttpNumLeadLink }) => void;

  changeChordBlock: (args: { texti: number; comw: CmComWid; value: string }) => IExportableCom;
  changeTextBlock: (args: { texti: number; comw: CmComWid; value: string }) => IExportableCom;
  textCaps: (args: { comw: CmComWid; texts: string[] }) => IExportableCom;

  removeVerticalBarsFromTexts: (args: { comw: CmComWid }) => void;

  insertChordBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => IExportableCom;
  removeChordBlock: (args: { comw: CmComWid; value: string; removei: number }) => IExportableCom;

  insertTextBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => IExportableCom;
  removeTextBlock: (args: { comw: CmComWid; value: string; removei: number }) => IExportableCom;

  remove: (args: { comw: CmComWid }) => IExportableCom;
  bringBackToLife: (args: { comw: CmComWid }) => IExportableCom;

  takeRemovedComs: () => IExportableCom[];

  switchNLWord: (args: { comw: CmComWid; ordw: CmComOrderWid; linei: number; repeati: number; wordi: number }) => void;

  removeNL: (args: { comw: CmComWid; ordw: CmComOrderWid; linei: number; repeati: number }) => void;

  switchNLBr: (args: { comw: CmComWid; ordw: CmComOrderWid; repeati: number; wordi: number; linei: number }) => void;
};
