import { BibleTranslateName, IExportableCat, Langi, MenuComToolName } from 'shared/api';
import { StringTemplaterInterpolation, StringTemplaterWithTwoInterpolations } from 'shared/utils/stringTemplater/model';
import { LocaleSatisfies, LocaleSimpleString, LocaleStrOrInterpolationRecord, LocaleStrRecord } from './model';

export type LocaleBase<L extends Langi> = LocaleSatisfies<{
  lng: L;
  v: 0;

  cm: {
    t: LocaleSimpleString;

    com: {
      tool: LocaleStrOrInterpolationRecord<
        MenuComToolName,
        | MenuComToolName.SelectedToggle
        | MenuComToolName.IsMiniAnchor
        | MenuComToolName.ChordHardLevel
        | MenuComToolName.MarkCom,
        'v'
      >;

      forEachBlock: StringTemplaterInterpolation<'n', '"'>;
      maxSel: StringTemplaterInterpolation<'s'>;
      watcheds: StringTemplaterInterpolation<'c', ')'>;
      willAdd: StringTemplaterInterpolation<'c'>;
      willLost: StringTemplaterInterpolation<'c'>;
      addMod: StringTemplaterWithTwoInterpolations<'w', 'm'>;

      showPlayer: LocaleSimpleString;
      sharedListToYou: LocaleSimpleString;
      addToSel: LocaleSimpleString;
      changeSel: LocaleSimpleString;
      dsc: LocaleSimpleString;

      twiceClickPrev: LocaleSimpleString;
      twiceClickNx: LocaleSimpleString;
      clickPrevSlide: LocaleSimpleString;
      clickNxSlide: LocaleSimpleString;
      notFound: LocaleSimpleString;
      expandList: LocaleSimpleString;
      showLiSlides: LocaleSimpleString;
      shareLi: LocaleSimpleString;
      unk: LocaleSimpleString;
      ton: LocaleSimpleString;
      addToolByClick: LocaleSimpleString;
      crossLinks: LocaleSimpleString;

      /// EDITOR:
      /** square brackets in text replacing */
      sqBrInTxtRep: LocaleSimpleString;
      rmTBlock: StringTemplaterInterpolation<'t'>;

      /// :EDITOR
    };

    li: {
      all: LocaleSimpleString;
      li: LocaleSimpleString;
      player: LocaleSimpleString;
      admin: LocaleSimpleString;
    };

    cat: {
      t: LocaleSimpleString;
      li: LocaleStrRecord<IExportableCat['t']>;
    };

    comm: {
      N: StringTemplaterInterpolation<'n'>;
      wordLabel: StringTemplaterInterpolation<'p'>;
      soLongName: StringTemplaterInterpolation<'l'>;
      areHidden: LocaleSimpleString;
      forLine: LocaleSimpleString;
      unreachs: LocaleSimpleString;
      base: LocaleSimpleString;
      addedMaxAlts: LocaleSimpleString;
      addAlt: LocaleSimpleString;
      freshPulled: LocaleSimpleString;
      pull: LocaleSimpleString;
    };

    trackMarksNotSetted: LocaleSimpleString;

    sel: LocaleSimpleString;
    thematics: LocaleSimpleString;
    blocks: LocaleSimpleString;
    showComms: LocaleSimpleString;

    nxBlockConfig: LocaleSimpleString;
    insertNxBlock: LocaleSimpleString;
    hideNxBlock: LocaleSimpleString;

    chBlockConfig: LocaleSimpleString;
    insertChBlock: LocaleSimpleString;
    hideChBlock: LocaleSimpleString;

    linnes: LocaleSimpleString;
    chBlocks: LocaleSimpleString;
    toShow: LocaleSimpleString;
    toPass: LocaleSimpleString;
    toHide: LocaleSimpleString;
    emptySlide: LocaleSimpleString;

    chN: StringTemplaterInterpolation<'n'>;
    chs: LocaleSimpleString;
    maxChCount: LocaleSimpleString;
    noChTxt: LocaleSimpleString;
    minChCount: LocaleSimpleString;
    minChCountDsc: LocaleSimpleString;
    creNxChRule: LocaleSimpleString;
    unkCh: LocaleSimpleString;

    coms: LocaleSimpleString;
    toComList: LocaleSimpleString;

    // EDIT:
    comeBackCh: LocaleSimpleString;
    delCh: LocaleSimpleString;
    chExists: LocaleSimpleString;
    incCh: LocaleSimpleString;
    selChEdit: LocaleSimpleString;
    noEditorsMore: LocaleSimpleString;
    comRemoved: LocaleSimpleString;
    comeBack: LocaleSimpleString;
    unkChN: StringTemplaterInterpolation<'n', ')'>;
    editsToo: StringTemplaterWithTwoInterpolations<'m', 'l'>;
    edits: StringTemplaterInterpolation<'f'>;
    // :EDIT
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

    modulesForLoad: LocaleSimpleString;

    chapterNum: StringTemplaterInterpolation<'c'>;
    clearChapter: StringTemplaterInterpolation<'c', '?'>;
    searchByBook: StringTemplaterInterpolation<'b', '<'>;
    removeModule: StringTemplaterInterpolation<'n', '"'>;
    searchByChapter: StringTemplaterWithTwoInterpolations<'c', 'b'>;
  };

  sch: {
    notFound: LocaleSimpleString;
    evMod: StringTemplaterInterpolation<'m'>;
  };

  bro: {
    followInPhone: LocaleSimpleString;
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
  notAuthed: LocaleSimpleString;
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
  events: LocaleSimpleString;

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

  lineN: StringTemplaterInterpolation<'n'>;
  wordN: StringTemplaterInterpolation<'n'>;
  del: StringTemplaterInterpolation<'t'>;
  Nsec: StringTemplaterInterpolation<'n'>;
  lookedN: StringTemplaterInterpolation<'n'>;
  NDay: StringTemplaterInterpolation<'n'>;

  fromOf: StringTemplaterWithTwoInterpolations<'f', 'o'>;

  fav: LocaleSimpleString;
  favNLim: StringTemplaterInterpolation<'n'>;

  sel: LocaleSimpleString;
  clearSelList: LocaleSimpleString;

  color: LocaleSimpleString;
  before: LocaleSimpleString;
  instead: LocaleSimpleString;
  after: LocaleSimpleString;
  word: LocaleSimpleString;
  lists: LocaleSimpleString;
  txtBefore: LocaleSimpleString;
  txtAfter: LocaleSimpleString;
  close: LocaleSimpleString;
  detailed: LocaleSimpleString;
  fontSize: LocaleSimpleString;
  toAdd: LocaleSimpleString;
  savedLoc: LocaleSimpleString;
  noChanges: LocaleSimpleString;
  backToEdit: LocaleSimpleString;
  cre: LocaleSimpleString;
  redact: LocaleSimpleString;
  noAccess: LocaleSimpleString;
  toSendSmth: StringTemplaterInterpolation<'s'>;
}>;
