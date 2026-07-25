import { BibleTranslateName, Langi } from 'shared/api';
import {
  LocaleSatisfies,
  LocaleSimpleString,
  LocaleStrRecord,
  LocaleStrWithInterpolation,
  LocaleStrWithTwoInterpolations,
} from './model';

export type LocaleBase<L extends Langi> = LocaleSatisfies<{
  lng: L;
  v: 0;

  cm: {
    com: {
      forEachBlock: LocaleStrWithInterpolation<'n'>;
      maxSel: LocaleStrWithInterpolation<'s'>;
      showPlayer: LocaleSimpleString;
    };
  };

  bible: {
    t: LocaleSimpleString;
    chapter: LocaleSimpleString;
    searchInText: LocaleSimpleString;
    searchInChapter: LocaleSimpleString;
    searchByLink: LocaleSimpleString;
    insertion: LocaleSimpleString;
    txtInBrkts: LocaleSimpleString;
    JesusWords: LocaleSimpleString;
    /** translates */
    tr: LocaleSimpleString;
    /** loaded translates */
    loadedTr: LocaleSimpleString;
    /** translation titles */
    trs: LocaleStrRecord<BibleTranslateName>;

    chapterNum: LocaleStrWithInterpolation<'c'>;
    clearChapter: LocaleStrWithInterpolation<'c'>;
    searchByBook: LocaleStrWithInterpolation<'b'>;
    searchByChapter: LocaleStrWithTwoInterpolations<'c', 'b'>;
  };

  /** **каждое** Вступление */
  each0: LocaleSimpleString;
  /** **каждый** Куплет */
  each1: LocaleSimpleString;
  /** **каждая** Модуляция */
  each2: LocaleSimpleString;
  /** **каждое** Продолжение */
  each3: LocaleSimpleString;

  lasts: LocaleSimpleString;
  msg: LocaleSimpleString;
  authIncorrect: LocaleSimpleString;
  selProgram: LocaleSimpleString;
  accessRights: LocaleSimpleString;
  inoe: LocaleSimpleString;
  name: LocaleSimpleString;
  role: LocaleSimpleString;
  withoutRole: LocaleSimpleString;
  enterRoleName: LocaleSimpleString;
  newRole: LocaleSimpleString;
  interactive: LocaleSimpleString;
  myFiles: LocaleSimpleString;
  downloads: LocaleSimpleString;
  constants: LocaleSimpleString;

  oneForTwo: LocaleStrWithTwoInterpolations<'o', 't'>;
  newVer: LocaleStrWithInterpolation<'v'>;

  settings: LocaleSimpleString;
  aboutApp: LocaleSimpleString;
  otherApps: LocaleSimpleString;
  anims: LocaleSimpleString;
  font: LocaleSimpleString;
  showErrors: LocaleSimpleString;
  chapterEmpty: LocaleSimpleString;
  actualVer: LocaleSimpleString;
  refreshAppConfirm: LocaleSimpleString;
  immediateRefreshOnFinish: LocaleSimpleString;

  toAuth: LocaleSimpleString;
  authSuccess: LocaleSimpleString;
  logout: LocaleSimpleString;

  history: LocaleSimpleString;
  plan: LocaleSimpleString;

  oneTimeCode: LocaleSimpleString;
  enterCode: LocaleSimpleString;
  or: LocaleSimpleString;
  link: LocaleSimpleString;
  txt: LocaleSimpleString;

  setup: LocaleSimpleString;
  preview: LocaleSimpleString;
  slide: LocaleSimpleString;

  showMyQr: LocaleSimpleString;
  readQR: LocaleSimpleString;
  search: LocaleSimpleString;
  globSearch: LocaleSimpleString;
  broadcast: LocaleSimpleString;

  tg: {
    beInChannel: LocaleSimpleString;
    steps: LocaleSimpleString;
    startBot: LocaleSimpleString;
    authNeeds: LocaleSimpleString;
  };

  email: {
    bindedToCurrentAuth: LocaleStrWithInterpolation<'fio'>;
    otpSent: LocaleStrWithInterpolation<'e'>;
    toBind: LocaleSimpleString;
  };
}>;
