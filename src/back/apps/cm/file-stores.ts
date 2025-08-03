import { ComBlockCommentMakerCleans } from '$cm/col/com/complect/comment-parser/Cleans';
import { FileStore } from 'back/complect/FileStore';
import {
  ChordPack,
  CmComOrderWid,
  CmComWid,
  CmConstantsConfig,
  CmMp3Rule,
  EeStorePack,
  ICmComComment,
  ICmComCommentBlock,
  IExportableCat,
  IExportableCom,
  IScheduleWidgetWid,
  ScheduleComPack,
  ScheduleComPackHistory,
  SokiAuthLogin,
  TAboutComFavoriteItem,
} from 'shared/api';
import { SMyLib } from 'shared/utils';
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

/** @deprecated */
type TCommentsStore = PRecord<SokiAuthLogin, PRecord<CmComWid, ICmComComment>>;

type TCommentBlocksStore = PRecord<SokiAuthLogin, PRecord<CmComWid, ICmComCommentBlock>>;
type TUserFavoritesStore = Partial<Record<string, TAboutComFavoriteItem>>;

/** @deprecated */
export const comCommentsFileStore = new FileStore<TCommentsStore>('/apps/cm/comComments.json', {});
export const comCommentBlocksFileStore = new FileStore<TCommentBlocksStore>('/apps/cm/comCommentBlocks.json', {});
export const aboutComFavoritesFileStore = new FileStore<TUserFavoritesStore>('/apps/cm/aboutComFavorites.json', {});

const blocks = comCommentBlocksFileStore.getValueWithAutoSave();
SMyLib.entries(comCommentsFileStore.getValue()).forEach(([login, commentDict]) => {
  if (blocks[login]) return;
  const block = (blocks[login] = {} as PRecord<CmComWid, ICmComCommentBlock>);

  SMyLib.entries(commentDict!).forEach(([comwStr, comment]) => {
    const d = {} as PRecord<CmComOrderWid | 'head', string[]>;
    const { regExp, transform } = ComBlockCommentMakerCleans.commentsAnySpecialNumberParseReg;
    const ma = comment?.comment?.matchAll(regExp);
    if (ma == null) return;
    const arr = Array.from(ma);
    for (const m of arr) {
      const re = transform(m);
      if (re.secretOrdWid) {
        const ordw = ComBlockCommentMakerCleans.makeSecretToWid(re.secretOrdWid);
        if (ordw != null) d[ordw] = [re.comment?.trim()];
      }
    }
    d.head = [comment?.comment?.split('#')[0].trim() ?? ''];
    block[comwStr] = { comw: +comwStr, d, m: Date.now() };
  });
});
