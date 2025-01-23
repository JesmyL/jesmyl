import { CmComWid, ICmComComment, IExportableCat, IExportableCom } from 'shared/api/complect/apps';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';

export type CmSokiInvocatorSharesModel = {
  editedCom: (com: IExportableCom) => unknown;
  freshComList: (coms: IExportableCom[]) => unknown;

  editedCat: (com: IExportableCat) => unknown;
  freshCatList: (cats: IExportableCat[]) => unknown;

  editedChords: (data: { chords: ChordPack; modifiedAt: number }) => unknown;
  freshChordPack: (data: { pack: ChordPack; modifiedAt: number }) => unknown;

  freshComComments: (comments: ICmComComment[]) => void;
  freshComFavorites: (list: CmComWid[], modifiedAt: number) => void;
};
