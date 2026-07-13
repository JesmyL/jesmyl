import { DirStorage } from 'back/complect/DirStorage';
import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComAudioMarkPack,
  CmComWidRefGroupDict,
  CmMp3Rule,
  ComsInSchEvent,
  ComsInSchEventHistory,
  EeStorePack,
  HttpNumLeadLink,
  IExportableCat,
  IScheduleWidgetWid,
} from 'shared/api';

export const catsFileStorage = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const comsInSchEventDirStorage = new DirStorage<ComsInSchEvent, IScheduleWidgetWid, 'schw'>({
  dirPath: '/apps/cm/comsInSchEvent/',
  idKey: 'schw',
  makeNewItem: () => ({ pack: {}, schw: Date.now() + Math.random() }),
});

export const comsInSchEventHistoryDirStorage = new DirStorage<ComsInSchEventHistory, IScheduleWidgetWid, 'schw'>({
  dirPath: '/apps/cm/comsInSchEventHistory/',
  idKey: 'schw',
  makeNewItem: () => ({ d: {}, schw: Date.now() + Math.random() }),
});

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
