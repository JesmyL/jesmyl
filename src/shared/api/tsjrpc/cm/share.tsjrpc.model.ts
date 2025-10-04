import {
  ChordPack,
  CmCatWid,
  CmComWid,
  CmConstantsConfig,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  ScheduleComPack,
  TAboutComFavoriteItem,
} from 'shared/api/complect/apps';

export type CmShareTsjrpcModel = {
  editedCom: (args: { com: IExportableCom }) => unknown;
  refreshComList: (args: { coms: IExportableCom[]; modifiedAt: number; existComws: CmComWid[] }) => unknown;

  editedCat: (args: { cat: IExportableCat }) => unknown;
  refreshCatList: (args: { cats: IExportableCat[]; modifiedAt: number; existCatws: CmCatWid[] }) => unknown;

  editedChords: (args: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (args: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComCommentBlocks: (args: { comments: ICmComCommentBlock[]; modifiedAt: number }) => void;
  refreshAboutComFavorites: (args: { value: TAboutComFavoriteItem }) => void;

  refreshScheduleEventComPacks: (args: { packs: ScheduleComPack[]; modifiedAt: number }) => void;
  refreshConstantsConfig: (args: { config: Partial<CmConstantsConfig>; modifiedAt: number }) => unknown;
};
