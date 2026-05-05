import {
  ChordPack,
  CmCatWid,
  CmComWid,
  CmComWidRefGroupDict,
  CmConstantsConfig,
  ComsInSchEvent,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  TAboutComFavoriteItem,
} from 'shared/api/complect/apps';

export type CmShareTsjrpcModel = {
  editedCom: (args: { com: IExportableCom; mod: number }) => unknown;
  refreshComList: (args: {
    coms: IExportableCom[];
    modifiedAt: number;
    /** @deprecated */
    existComws: CmComWid[];
  }) => unknown;

  editedCat: (args: { cat: IExportableCat }) => unknown;
  refreshCatList: (args: { cats: IExportableCat[]; modifiedAt: number; existCatws: CmCatWid[] }) => unknown;

  editedChords: (args: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (args: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (args: { comments: ICmComCommentBlock[]; mod: number; alts: string[] | nil }) => void;
  refreshAboutComFavorites: (args: { value: TAboutComFavoriteItem }) => void;

  refreshScheduleEventComPacks: (args: { packs: ComsInSchEvent[]; modifiedAt: number }) => void;
  refreshConstantsConfig: (args: { config: Partial<CmConstantsConfig>; modifiedAt: number }) => unknown;
  refreshComWidRefDict: (args: { refs: CmComWidRefGroupDict; mod: number }) => unknown;
};
