import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  CmMp3Rule,
  EeStorePack,
  ICmComComment,
  ICmComCommentBlock,
  IExportableCat,
  IScheduleWidgetWid,
  IServerSideCom,
  ScheduleComPack,
  ScheduleComPackHistory,
  SokiAuthLogin,
  TAboutComFavoriteItem,
} from 'shared/api';
import { itIt, smylib } from 'shared/utils';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';
import { makeCmComHttpToNumLeadAudioLinks } from './complect/com-http-links';

export const comsFileStore = new FileStore<IServerSideCom[]>('/apps/cm/coms.json', []);
export const catsFileStore = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

comsFileStore.getValue().forEach(com => {
  if (com.al) return;

  com.m = Date.now();
  com.al = 'a' in com ? makeCmComHttpToNumLeadAudioLinks(('' + com.a).split('\n').filter(itIt) as never) : undefined;
});

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

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
/** @deprecated */
type TCommentsStore = PRecord<SokiAuthLogin, PRecord<CmComWid, ICmComComment>>;
/** @deprecated */
export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});

// const blocks = comCommentBlocksFileStore.getValueWithAutoSave();
// SMyLib.entries(comCommentsFileStore.getValue()).forEach(([login, commentDict]) => {
//   if (blocks[login]) return;
//   const block = (blocks[login] = {} as PRecord<CmComWid, OmitOwn<ICmComCommentBlock, 'comw'>>);

//   SMyLib.entries(commentDict!).forEach(([comwStr, comment]) => {
//     const d = {} as PRecord<CmComOrderWid | 'head', string[]>;
//     const { regExp, transform } = ComBlockCommentMakerCleans.commentsAnySpecialNumberParseReg;
//     const ma = comment?.comment?.matchAll(regExp);
//     if (ma == null) return;
//     const arr = Array.from(ma);
//     for (const m of arr) {
//       const re = transform(m);
//       if (re.secretOrdWid) {
//         const ordw = ComBlockCommentMakerCleans.makeSecretToWid(re.secretOrdWid);
//         if (ordw != null) d[ordw] = [re.comment?.trim()];
//       }
//     }
//     d.head = [comment?.comment?.split('#')[0].trim() ?? ''];
//     block[comwStr] = { d, m: Date.now() };
//   });
// });
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
