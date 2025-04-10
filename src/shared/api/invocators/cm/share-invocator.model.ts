import {
  ChordPack,
  ICmComComment,
  IExportableCat,
  IExportableCom,
  ScheduleComPack,
  TAboutComFavoriteItem,
} from 'shared/api/complect/apps';

export type CmShareSokiInvocatorModel = {
  editedCom: (args: { com: IExportableCom }) => unknown;
  refreshComList: (args: { coms: IExportableCom[]; modifiedAt: number }) => unknown;

  editedCat: (args: { cat: IExportableCat }) => unknown;
  refreshCatList: (args: { cats: IExportableCat[]; modifiedAt: number }) => unknown;

  editedChords: (args: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (args: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (args: { comments: ICmComComment[]; modifiedAt: number }) => void;
  refreshAboutComFavorites: (args: { value: TAboutComFavoriteItem }) => void;

  refreshScheduleEventComPacks: (args: { packs: ScheduleComPack[]; modifiedAt: number }) => void;
};
