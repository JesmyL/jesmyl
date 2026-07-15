import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComAudioMarkPack,
  CmComWidRefGroupDict,
  CmMp3Rule,
  EeStorePack,
  HttpNumLeadLink,
  IExportableCat,
} from 'shared/api';

export const catsFileStorage = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const cmComAudioMarkPacksFileStore = new FileStore<
  PRecord<HttpNumLeadLink, { m: number; cMarks?: CmComAudioMarkPack }>
>('/apps/cm/comAudioMarkPacks.json', {});

export const mp3ResourcesFileStorage = new FileStore<CmMp3Rule[]>('/apps/cm/mp3Rules.json', []);

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

export const cmComWidRefGroupDictFileStore = new FileStore<CmComWidRefGroupDict>(
  '/apps/cm/comWidRefGroupDict.json',
  {},
);
