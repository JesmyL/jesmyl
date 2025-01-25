import { CmComWid, ICmComComment, IExportableCat, IExportableCom, ScheduleComPack } from 'shared/api/complect/apps';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';

export type CmSokiInvocatorSharesModel = {
  editedCom: (com: IExportableCom) => unknown;
  refreshComList: (coms: IExportableCom[]) => unknown;

  editedCat: (com: IExportableCat) => unknown;
  refreshCatList: (cats: IExportableCat[]) => unknown;

  editedChords: (data: { chords: ChordPack; modifiedAt: number }) => unknown;
  refreshChordPack: (data: { pack: ChordPack; modifiedAt: number }) => unknown;

  refreshComComments: (comments: ICmComComment[]) => void;
  refreshComFavorites: (list: CmComWid[], modifiedAt: number) => void;

  refreshScheduleEventComPacks: (packs: ScheduleComPack[]) => void;
};
