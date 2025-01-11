import { ChordPack } from 'front/components/apps/cm/col/com/chord-card/ChordCard.model';
import { IExportableCat, IExportableCom } from 'shared/api/complect/apps';

export type CmSokiInvocatorWaitsMethods = {
  editedCom: (com: IExportableCom) => unknown;
  editedCat: (com: IExportableCat) => unknown;
  editedChords: (data: { chords: ChordPack; modifiedAt: number }) => unknown;
};
