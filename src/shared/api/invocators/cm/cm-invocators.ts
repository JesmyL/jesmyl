import { ChordPack } from 'front/components/apps/cm/col/com/chord-card/ChordCard.model';
import { IExportableCat, IExportableCom } from 'shared/api/complect/apps';

export type CmSokiInvocatorMethods = {
  getFreshComList: (lastModfiedMs: number) => IExportableCom[];
  getFreshCatList: (lastModfiedMs: number) => IExportableCat[];
  getFreshChordPackList: (lastModfiedMs: number) => { pack?: ChordPack; modifiedAt: number };
};
