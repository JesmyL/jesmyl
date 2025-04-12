import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  CmMp3Rule,
  EeStorePack,
  ICmComComment,
  IExportableCat,
  IExportableCom,
  IScheduleWidgetWid,
  ScheduleComPack,
  ScheduleComPackHistory,
  TAboutComFavoriteItem,
} from 'shared/api';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const comsFileStore = new FileStore<IExportableCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const eventPacksFileStore = new FileStore(
  '/apps/cm/schEventPacks.json',
  {} as Record<IScheduleWidgetWid, ScheduleComPack>,
);
export const eventPackHistoryFileStore = new FileStore<ScheduleComPackHistory>('/apps/cm/schEventPackHistory.json', {});

export const comwVisitsFileStore = new FileStore<PRecord<CmComWid, number>>('/apps/cm/comwVisits.json', {});

export const mp3ResourcesData = new FileStore<CmMp3Rule[]>('/apps/cm/mp3Rules.json', []);

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});
export const cmConstantsConfigFileStore = new FileStore<CmConstantsConfig>(
  '/apps/cm/constantsConfig.json',
  cmConstantsDefaultConfig,
);

type TCommentsStore = PRecord<string, PRecord<CmComWid, ICmComComment>>;
type TUserFavoritesStore = Partial<Record<string, TAboutComFavoriteItem>>;

export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});
export const aboutComFavoritesFileStore = new FileStore<TUserFavoritesStore>('/apps/cm/aboutComFavorites.json', {});
