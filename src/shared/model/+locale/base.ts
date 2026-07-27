import { BibleTranslateName, Langi } from 'shared/api';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from 'shared/utils/stringTemplater/model';
import { LocaleSatisfies, LocaleSimpleString, LocaleStrRecord } from './model';

export type LocaleBase<L extends Langi> = LocaleSatisfies<{
  lng: L;
  v: 0;

  cm: {
    com: {
      forEachBlock: StringTemplaterInterpolation<'n'>;
      maxSel: StringTemplaterInterpolation<'s'>;
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

    chapterNum: StringTemplaterInterpolation<'c'>;
    clearChapter: StringTemplaterInterpolation<'c'>;
    searchByBook: StringTemplaterInterpolation<'b'>;
    searchByChapter: StringTemplaterWithTwoInterpolations<'c', 'b'>;
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

  oneForTwo: StringTemplaterWithTwoInterpolations<'o', 't'>;
  newVer: StringTemplaterInterpolation<'v'>;

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
    bindedToCurrentAuth: StringTemplaterInterpolation<'fio'>;
    otpSent: StringTemplaterInterpolation<'e'>;
    toBind: LocaleSimpleString;
  };

  fromOf: StringTemplaterWithTwoInterpolations<'f', 'o'>;
}>;
