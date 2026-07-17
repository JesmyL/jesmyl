import { FileStore } from 'back/complect/FileStore';
import { ChordPack, CmComWidRefGroupDict, CmMp3Rule, EeStorePack, IExportableCat } from 'shared/api';

export const catsFileStorage = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const mp3ResourcesFileStorage = new FileStore<CmMp3Rule[]>('/apps/cm/mp3Rules.json', []);

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

export const cmComWidRefGroupDictFileStore = new FileStore<CmComWidRefGroupDict>(
  '/apps/cm/comWidRefGroupDict.json',
  {},
);
