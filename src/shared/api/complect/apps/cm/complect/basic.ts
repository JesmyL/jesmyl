import { CmCatKind } from '#shared/model/cm/cat/Cat.model';
import { StrRegExp } from 'regexpert';
import { Langi } from 'shared/api';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api/complect/schedule-widget';
import {
  CmBroadcastMonolineSlide,
  CmBroadcastMonolineSlideSelectorId,
  CmComNewlinerSymbolFreeUpperCaseLine,
} from 'shared/model/cm/broadcast';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import {
  CmCatWid,
  CmComIntensityLevel,
  CmComMod,
  CmComOrderWid,
  CmComWid,
  CmComWidRefGroupId,
  CmMeetingEventWid,
} from './enums';

export interface CmMp3Rule {
  w: number;
  url: string;
  attr: string;
  repReg: StrRegExp | '';
  repText: string;
  query: string;
  rdir?: string;
  textQuery?: string;
  isHTML?: 1;
}

export interface CmMp3ContainsPageResult {
  html: string;
  rule: CmMp3Rule;
}

export interface CmComBindAttach {
  comws?: CmComWid[];
  eventw?: CmMeetingEventWid;
}

export const enum SpecialOrderRepeatsKey {
  Self = '.',
  StartToEndLine = '2-3',
  Diapason = '2:0-3:2',
  LineWord = '2:0',
  Line = '2',
  Flag = '~3:2',

  // portal
  PortalStart = 'a0:0',
  PortalEnd = '0:0b',
}

export type SpecialOrderRepeatsInnerAnyKey =
  | SpecialOrderRepeatsKey.Diapason
  | SpecialOrderRepeatsKey.Flag
  | SpecialOrderRepeatsKey.StartToEndLine
  | SpecialOrderRepeatsKey.Self
  | SpecialOrderRepeatsKey.LineWord
  | SpecialOrderRepeatsKey.Line;

export type SpecialOrderRepeats = SPRecord<SpecialOrderRepeatsKey, number>;
export type OrderRepeats = number | SpecialOrderRepeats;

export interface InheritancableOrder {
  /** Повторения */
  r?: OrderRepeats | nil;
  /** Позиции аккордов */
  p?: (number[] | nil)[] | nil;
  /** Видимость блока */
  v?: boolean | num | nil;
}

type WatchInherited<K extends keyof InheritancableOrder> = (InheritancableOrder[K] | nil)[];

export type IExportableOrder = NullifyOptionals<
  InheritancableOrder & {
    /** Уникальный айди */
    w: CmComOrderWid;

    /** Ссылка на блок */
    a?: CmComOrderWid;

    /** Текстовый блок */
    t?: number;

    /** Блок аккордов */
    c?: number;

    /** Без названия */
    e?: boolean | num;

    /** Значение модуляции */
    md?: number;

    /** Минималка */
    m?: 1;

    /** Открыто в свёрнутом режиме */
    o?: boolean | num;

    /** Тип блока */
    k?: CmComBlockKindKey;

    _v?: WatchInherited<'v'>;
    _r?: WatchInherited<'r'>;
    _p?: WatchInherited<'p'>;

    /**
     * время создания (существует при времени жизни менее суток)
     */
    cre?: number;
  }
>;

export type IFixedCom = { w: CmComWid } & Partial<{
  ton: number;
}>;

export type IExportableComInterpretationSimpleValues = {
  /** уровень транспозиции песни */
  p?: number | nil;

  /** ударов в минуту */
  bpm?: number | nil;

  /** бемольная ли песня */
  b?: num | nil;
};

export type IExportableOrderInterpretation = {
  /** видимость блока **в специальной интерпритации** */
  v?: num | nil;
};

export type IExportableComInterpretation = IExportableComInterpretationSimpleValues & {
  /** порядковые блоки **в специальной интерпритации** */
  o?: { [ordi: number]: IExportableOrderInterpretation | nil } | nil;
};

export type IExportableCom = NullifyOptionals<
  IExportableComInterpretationSimpleValues & {
    /** название песни */
    n: string;

    /** время создания - уникальный ID */
    w: CmComWid;

    /** время изменения */
    m: CmComMod;

    /** разбивка текстов на линии и слайды */
    nl?: (PRecord<CmComOrderWid, CmComNewlinerStrConfig.whole> | nil)[];

    /** язык песни */
    l: Langi;

    /** аудио файлы */
    al?: HttpNumLeadLink[];

    /** список текстов */
    t: string[];

    /** список аккорлов */
    c: string[];

    /** порядковые блоки */
    o?: IExportableOrder[];

    /** размерность песни */
    s?: CmComMetricNum;

    /** интенсивность песни */
    d?: CmComIntensityLevel;

    isRemoved?: Bool;

    am?: CmComAudioMarkPack;
  }
>;

export const enum CmComCommentBlockSpecialSelector {
  Head = 'h',
  Kinds = 'k',
}

export type CmComNewlinerLineTextSetHolder = PRecord<CmComLineText, CmComNewlinerSymbolFreeUpperCaseLine> &
  PRecord<CmComNewlinerSymbolFreeUpperCaseLine, Set<CmComNewlinerWordi>>;

export const enum CmComLineText {
  line1 = 'Строка1',
  line2 = 'Вторая строка',
  line3 = 'Строка под номером три',
}

export type CmComLinei = NumberBrand<'CmComLinei'>;

export const CmComLineiNe = -1 as CmComLinei;
export const CmComLineiZero = 0 as CmComLinei;

export type CmComNewlinerRepeati = NumberBrand<'CmComNewlinerRepeati'>;

export const CmComNewlinerRepeatiZero = 0 as 0 & CmComNewlinerRepeati;

export type CmComNewlinerWordi = NumberBrand<'CmComNewlinerWordi'>;

export const CmComNewlinerWordiZero = 0 as 0 & CmComNewlinerWordi;
export const CmComNewlinerWordiNewLine = -1 as -1 & CmComNewlinerWordi;
export const CmComNewlinerWordiNotNewLine = 1 as 1 & CmComNewlinerWordi;

export type CmComNewlinerSamei = NumberBrand<'CmComNewlinerSamei'>;
export const CmComNewlinerSameiZero = 0 as CmComNewlinerSamei;

export const enum CmComNewlinerStrConfig {
  whole = '15.-2/12 9.01//34',
  line = '15.-2/12',
  repeat = '15.-2',
}

export const enum CmComTextSquareBracketsMode {
  AsIs = 0,
  BrBrackets,
  NlBrackets,
  Remove,
}

export type CmComBracketLevelHolder = { level: number };

export type CmComCommentBlockSimpleSelector = CmComOrderWid | CmComCommentBlockSpecialSelector.Head;
export type CmComCommentBlockAnySelector = CmComOrderWid | CmComCommentBlockSpecialSelector;

export type CmComCommentBlockDict = SPRecord<CmComCommentBlockSimpleSelector, string[]> &
  SPRecord<CmComCommentBlockSpecialSelector.Kinds, SPRecord<CmComBlockKindKey, string>>;

export type ICmComCommentBlock = {
  comw: CmComWid;
  m: number;
  /** comment block dict list */
  dl?: (CmComCommentBlockDict | nil)[];
};

export interface IExportableCat {
  /** время создания - уникальный ID */
  w: CmCatWid;
  /** время изменения */
  m: number;
  /** название категории */
  n: string;
  /** список песен */
  s?: CmComWid[];
  /** номера песен */
  d?: PRecord<CmComWid, number>;
  /** вид категории (список, по номерам из сборника, итд) */
  k: CmCatKind;

  isRemoved?: 1;
}

export interface IExportableCols {
  coms: IExportableCom[];
  cats: IExportableCat[];
}

export type HttpLink = `http${string}`;
export type HttpNumLeadLinkKey = `${number}~`;
export type HttpNumLeadLink = `${HttpNumLeadLinkKey}${string}`;

export type CmComAudioMarkSelector = CmBroadcastMonolineSlideSelectorId | string;

export type CmComAudioMarkPackTime = NumberBrand<'CmComAudioMarkPackTime'>;
export const CmComAudioMarkPackTimeZero = 0 as CmComAudioMarkPackTime;
export const CmComAudioMarkPackTimeOne = 1 as CmComAudioMarkPackTime;

export type CmComAudioMarkPack = SPRecord<HttpNumLeadLink, SPRecord<CmComAudioMarkPackTime, CmComAudioMarkSelector>>;

export type CmComAudioMarkEditPackValue = CmComAudioMarkSelector | null;

export type CmComAudioMarkEditPack = SPRecord<
  CmComWid,
  PRecord<HttpNumLeadLink, PRecord<SKey<CmComAudioMarkPackTime>, CmComAudioMarkEditPackValue>>
>;

export const enum MenuComToolName {
  MarkCom = 93,
  FullscreenMode = 42,
  ChordsVariant = 92,
  ShowTranslation = 61,
  ChordImages = 50,
  SelectedToggle = 20,
  OpenPlayer = 87,
  HideMetronome = 69,
  IsMiniAnchor = 53,
  QrShare = 90,
  CatsBinds = 76,
  ComComment = 11,
  CopyCom = 84,
  ChordHardLevel = 98,
  EditCom = 77,
}

export type CmComWidRefGroupDict = SPRecord<CmComWid, CmComWidRefGroupId>;

export type CmScheduleDayEventComwsPack = {
  schw: ScheduleWidgetWid;
  dayi: ScheduleWidgetDayi;
  eventMi: ScheduleWidgetDayEventMi;
  comws: CmComWid[];
  fio: string;
  w: number;
};

export type CmAudioSlide = {
  slide?: CmBroadcastMonolineSlide;
  text: string;
  r?: { r: number };
  minText?: string;
  /** repeats remaining */
  rem?: number;
  time: CmComAudioMarkPackTime;
  timei: number;
  isChorded: boolean;
};
