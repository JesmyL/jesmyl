import {
  ICmComComment,
  IExportableCat,
  IExportableCom,
  ScheduleComPack,
  TAboutComFavoriteItem,
} from 'shared/api/complect/apps';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';

export type CmSokiInvocatorSharesModel = {
  editedCom: (com: IExportableCom) => unknown;
  refreshComList: (coms: IExportableCom[], modifiedAt: number) => unknown;

  editedCat: (com: IExportableCat) => unknown;
  refreshCatList: (cats: IExportableCat[], modifiedAt: number) => unknown;

  editedChords: (data: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (data: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (comments: ICmComComment[], modifiedAt: number) => void;
  refreshAboutComFavorites: (value: TAboutComFavoriteItem) => void;

  refreshScheduleEventComPacks: (packs: ScheduleComPack[], modifiedAt: number) => void;
};
