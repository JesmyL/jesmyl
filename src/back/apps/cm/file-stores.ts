import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  CmMp3Rule,
  EeStorePack,
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

export const comsFileStore = new FileStore<IServerSideCom[]>('/apps/cm/coms.json', []);
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

type TCommentBlocksStore = PRecord<SokiAuthLogin, PRecord<CmComWid, OmitOwn<ICmComCommentBlock, 'comw'>>>;
type TUserFavoritesStore = Partial<Record<string, TAboutComFavoriteItem>>;

export const comCommentBlocksFileStore = new FileStore<TCommentBlocksStore>('/apps/cm/comCommentBlocks.json', {});
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
