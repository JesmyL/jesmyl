import { DirStorage } from 'back/complect/DirStore';
import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComAudioMarkPack,
  CmComWid,
  CmConstantsConfig,
  CmMp3Rule,
  EeStorePack,
  HttpNumLeadLink,
  ICmComCommentBlock,
  IExportableCat,
  IScheduleWidgetWid,
  IServerSideCom,
  ScheduleComPack,
  ScheduleComPackHistory,
  SokiAuthLogin,
  TAboutComFavoriteItem,
} from 'shared/api';
import { smylib } from 'shared/utils';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const comsDirStore = new DirStorage<IServerSideCom, CmComWid>({
  dirPath: '/apps/cm/coms/',
  makeNewItem: () => ({
    m: Date.now(),
    n: '',
    w: +`${Date.now() + Math.random()}`,
  }),
  cacheTime: 30 * 60 * 60 * 1000,
  idKey: 'w',
});

export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

export const eventPacksFileStore = new FileStore(
  '/apps/cm/schEventPacks.json',
  {} as Record<IScheduleWidgetWid, ScheduleComPack>,
);
export const eventPackHistoryFileStore = new FileStore<ScheduleComPackHistory>('/apps/cm/schEventPackHistory.json', {});
export const cmComAudioMarkPacksFileStore = new FileStore<
  PRecord<HttpNumLeadLink, { m: number; marks?: CmComAudioMarkPack }>
>('/apps/cm/comAudioMarkPacks.json', {});

export const comwVisitsFileStore = new FileStore<PRecord<CmComWid, number>>('/apps/cm/comwVisits.json', {});

export const mp3ResourcesData = new FileStore<CmMp3Rule[]>('/apps/cm/mp3Rules.json', []);

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

type TUserFavoritesStore = Partial<Record<string, TAboutComFavoriteItem>>;

export const comCommentsDirStore = new DirStorage<
  {
    l: SokiAuthLogin;
    fio?: string;
    b: PRecord<CmComWid, OmitOwn<ICmComCommentBlock, 'comw'>>;
  },
  SokiAuthLogin,
  'l'
>({
  dirPath: '/apps/cm/comComments/',
  makeNewItem: () => ({ l: SokiAuthLogin.other, fio: '', b: {} }),
  idKey: 'l',
});

export const aboutComFavoritesFileStore = new FileStore<TUserFavoritesStore>('/apps/cm/aboutComFavorites.json', {});

export const cmConstantsConfigFileStore = new FileStore<CmConstantsConfig>(
  '/apps/cm/constantsConfig.json',
  cmConstantsDefaultConfig,
);

(() => {
  const config = cmConstantsConfigFileStore.getValue();
  let isConfigChanged = false;

  smylib.keys(config).forEach(key => {
    if (cmConstantsDefaultConfig[key] === undefined) {
      delete config[key];
      isConfigChanged = true;
    }
  });

  smylib.keys(cmConstantsDefaultConfig).forEach(key => {
    if (config[key] === undefined) {
      config[key] = cmConstantsDefaultConfig[key];
      isConfigChanged = true;
    }
  });

  if (isConfigChanged) cmConstantsConfigFileStore.saveValue();
})();
