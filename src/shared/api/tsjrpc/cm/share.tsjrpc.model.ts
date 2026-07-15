import {
  ChordPack,
  CmCatWid,
  CmComWid,
  CmComWidRefGroupDict,
  ComsInScheduleIntp,
  ConstantsConfig,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  MigratableComToolName,
} from 'shared/api/complect/apps';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';

export type CmShareTsjrpcModel = {
  editedCom: (args: { com: IExportableCom; mod: number }) => unknown;
  refreshComList: (args: { coms: IExportableCom[]; modifiedAt: number }) => unknown;

  editedCat: (args: { cat: IExportableCat }) => unknown;
  refreshCatList: (args: { cats: IExportableCat[]; modifiedAt: number; existCatws: CmCatWid[] }) => unknown;

  editedChords: (args: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (args: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (args: { comments: ICmComCommentBlock[]; mod: number; alts: string[] | nil }) => void;
  comFav: (args: { comw: CmComWid; is: boolean; mod: number }) => void;
  favTools: (args: { tools: MigratableComToolName[]; mod: number }) => void;
  refreshComFavs: (args: { comws: CmComWid[]; mod: number }) => void;

  freshSchEvComIntp: (args: { intps: ComsInScheduleIntp[]; mod: number }) => void;
  freshSchDayEvComws: (args: {
    schw: ScheduleWidgetWid;
    dayi: ScheduleWidgetDayi;
    eventMi: ScheduleWidgetDayEventMi;
    comws: CmComWid[];
    fio: string;
    w: number;
  }) => void;

  /** @deprecated */
  refreshConstConfig: (args: { config: Partial<ConstantsConfig>; mod: number }) => unknown;
  refreshComWidRefDict: (args: { refs: CmComWidRefGroupDict; mod: number }) => unknown;
};
