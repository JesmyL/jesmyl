import {
  ChordPack,
  CmCatWid,
  CmComWid,
  CmComWidRefGroupDict,
  CmScheduleDayEventComwsPack,
  ComsInScheduleIntp,
  ConstantsConfig,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  MigratableComToolName,
} from 'shared/api/complect/apps';

export type CmShareTsjrpcModel = {
  editedCom: (args: { com: IExportableCom; mod: number }) => unknown;
  refreshComList: (args: { coms: IExportableCom[]; modifiedAt: number }) => unknown;

  editedCat: (args: { cat: IExportableCat }) => unknown;
  refreshCatList: (args: { cats: IExportableCat[]; modifiedAt: number; existCatws: CmCatWid[] }) => unknown;

  editedChords: (args: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (args: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (args: { comments: ICmComCommentBlock[]; mod: number; alts: string[] | nil }) => void;
  comFav_v1: (args: { fav: Record<CmComWid, Bool>; mod: number }) => void;
  favTools: (args: { tools: MigratableComToolName[]; mod: number }) => void;
  refreshComFavs: (args: { comws: CmComWid[]; mod: number }) => void;

  freshSchEvComIntp: (args: { intps: ComsInScheduleIntp[]; mod: number }) => void;
  freshSchDayEvComws: (args: { packs: CmScheduleDayEventComwsPack[] | CmScheduleDayEventComwsPack }) => void;

  /** @deprecated */
  refreshConstConfig: (args: { config: Partial<ConstantsConfig>; mod: number }) => unknown;
  refreshComWidRefDict: (args: { refs: CmComWidRefGroupDict; mod: number }) => unknown;
};
