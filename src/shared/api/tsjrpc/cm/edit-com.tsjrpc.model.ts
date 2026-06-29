import {
  CmComIntensityLevel,
  CmComNewlinerLinei,
  CmComNewlinerRepeati,
  CmComNewlinerWordi,
  CmComOrderWid,
  CmComWid,
  HttpNumLeadLink,
  IExportableCom,
} from 'shared/api/complect/apps';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';

type SimpleComValueSetter<Value> = (args: { comw: CmComWid; value: Value }) => CmComWid;

export type CmEditComTsjrpcModel = {
  newCom: (args: { value: OmitOwn<IExportableCom, 'w'> }) => CmComWid;

  rename: SimpleComValueSetter<string>;
  destroy: (args: { comw: CmComWid }) => string;
  setBpM: SimpleComValueSetter<number>;
  setMeterSize: SimpleComValueSetter<CmComMetricNum>;
  changeLanguage: SimpleComValueSetter<number>;
  changeDrive: SimpleComValueSetter<CmComIntensityLevel>;
  changeTon: SimpleComValueSetter<number>;
  makeBemoled: SimpleComValueSetter<num>;

  toggleAudioLink: (args: { comw: CmComWid; link: HttpNumLeadLink }) => void;

  changeChordBlock: (args: { texti: number; comw: CmComWid; value: string }) => CmComWid;
  changeTextBlock: (args: { texti: number; comw: CmComWid; value: string }) => CmComWid;
  textCaps: (args: { comw: CmComWid; texts: string[] }) => CmComWid;

  removeVerticalBarsFromTexts: (args: { comw: CmComWid }) => void;

  insertChordBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => CmComWid;
  removeChordBlock: (args: { comw: CmComWid; value: string; removei: number }) => CmComWid;

  insertTextBlock: (args: { value: string; comw: CmComWid; insertToi: number }) => CmComWid;
  removeTextBlock: (args: { comw: CmComWid; value: string; removei: number }) => CmComWid;

  remove: (args: { comw: CmComWid }) => CmComWid;
  bringBackToLife: (args: { comw: CmComWid }) => CmComWid;

  takeRemovedComs: () => IExportableCom[];

  switchNLWord: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    linei: CmComNewlinerLinei;
    repeati: CmComNewlinerRepeati;
    wordi: CmComNewlinerWordi;
  }) => void;

  removeNL: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    linei: CmComNewlinerLinei;
    repeati: CmComNewlinerRepeati | null;
  }) => void;

  switchNLBr: (args: {
    comw: CmComWid;
    ordw: CmComOrderWid;
    linei: CmComNewlinerLinei;
    repeati: CmComNewlinerRepeati;
    wordi: CmComNewlinerWordi;
  }) => void;
};
