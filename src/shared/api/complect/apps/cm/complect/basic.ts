import { CmCatKind } from '$cm/entities/cat/model/Cat.model';
import { StrRegExp } from 'regexpert';
import { CmBroadcastSlideGrouperKind } from 'shared/model/cm/broadcast';
import { CmComMetricNums } from 'shared/model/cm/com-metric-nums';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { CmCatWid, CmComIntensityLevel, CmComMod, CmComOrderWid, CmComWid, CmMeetingEventWid } from './enums';

export interface CmMp3Rule {
  w: number;
  url: string;
  attr: string;
  repReg: StrRegExp | '';
  repText: string;
  query: string;
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

export type SpecialOrderRepeats = Record<string, number>;
export type OrderRepeats = number | SpecialOrderRepeats;

export interface InheritancableOrder {
  /** Повторения */
  r?: OrderRepeats | null;
  /** Позиции аккордов */
  p?: (number[] | null)[] | nil;
  /** Видимость блока */
  v?: num;
}

export interface IExportableOrderFieldValues {
  /** Значение модуляции */
  md?: number;
}

type Inheritancables<K extends keyof InheritancableOrder = keyof InheritancableOrder> = Partial<
  Record<K, Record<number, InheritancableOrder[K]>>
>;

type WatchInherited<K extends keyof InheritancableOrder> = (InheritancableOrder[K] | nil)[];

export interface IExportableOrder extends InheritancableOrder {
  /** Уникальный айди */
  w: CmComOrderWid;

  /** Ссылка на блок */
  a?: CmComOrderWid;

  /** Текстовый блок */
  t?: number;

  /** Блок аккордов */
  c?: number;

  /** Без названия */
  e?: 1;

  /** Особые значения */
  f?: IExportableOrderFieldValues;

  /** Минималка */
  m?: 1;

  /** Открыто в полном режиме */
  o?: 1;

  /** Тип блока */
  k?: CmComBlockKindKey;

  /** @deprecated */
  s?: string;

  /**
   * @deprecated
   * Значения наследников
   * */
  inh?: Inheritancables;

  _v?: WatchInherited<'v'>;
  _r?: WatchInherited<'r'>;
  _p?: WatchInherited<'p'>;
}

export type IFixedCom = { w: CmComWid } & Partial<{
  ton: number;
}>;

export interface IExportableCom {
  /** название песни */
  n: string;
  /** время создания - уникальный ID */
  w: CmComWid;
  /** время изменения */
  m: CmComMod;
  /** вариант группировки строк для трансляций */
  k?: CmBroadcastSlideGrouperKind;
  k2?: CmBroadcastSlideGrouperKind;
  /** уровень модулирования */
  p?: number;
  /** язык песни */
  l?: number;
  /** бемольная ли песня */
  b?: num;
  /** аудио файлы */
  al?: HttpLink[];
  /** @deprecated */
  a?: string;
  /** список текстов */
  t?: string[];
  /** список аккорлов */
  c?: string[];
  /** порядковые блоки */
  o?: IExportableOrder[];
  /** ударов в минуту */
  bpm?: number;
  /** размерность песни */
  s?: CmComMetricNums;
  /** интенсивность песни */
  d?: CmComIntensityLevel;

  ton?: number;

  isRemoved?: 1;
}

export type IServerSideCom = OmitOwn<IExportableCom, 'al' | 'm'> & { al?: HttpNumLeadLink[] | HttpNumLeadLink };

export const enum CmComCommentBlockSpecialSelector {
  Head = 'head',
  Kinds = 'k',
}

export type CmComCommentBlockSimpleSelector = CmComOrderSelector | CmComCommentBlockSpecialSelector.Head;
export type CmComCommentBlockAnySelector = CmComOrderSelector | CmComCommentBlockSpecialSelector;
export type CmComOrderSelector = CmComOrderWid;

export type CmComCommentBlockDict = PRecord<CmComCommentBlockSimpleSelector, string[]> &
  PRecord<CmComCommentBlockSpecialSelector.Kinds, PRecord<CmComBlockKindKey, string>>;

export type ICmComCommentBlock = {
  comw: CmComWid;
  /** comment block dict */
  d?: CmComCommentBlockDict;
  alt?: PRecord<string, CmComCommentBlockDict>;
  m: number;
};

export type TAboutComFavoriteItem = {
  m: number;
  fio: string;
  comws?: CmComWid[];
  tools?: MigratableComToolName[];
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

export type MigratableEditableComToolName = 'edit-com';

export type MigratableComToolName = MenuComToolNameList | MigratableEditableComToolName;

export type HttpLink = `http${string}`;
export type HttpNumLeadLinkKey = `${number}~`;
export type HttpNumLeadLink = `${HttpNumLeadLinkKey}${string}`;

export type CmComAudioMarkSelector = [CmComOrderSelector] | string;
export const enum CmComAudioMarkPackTime {
  def = 12.3,
  zero = 0,
}

export type CmComAudioMarkPack = PRecord<CmComWid, PRecord<CmComAudioMarkPackTime, CmComAudioMarkSelector>>;

export type CmComAudioMarkEditPack = PRecord<
  CmComWid,
  PRecord<CmComAudioMarkPackTime, CmComAudioMarkSelector | `+${CmComAudioMarkPackTime}+` | null>
>;

export type MenuComToolNameList =
  | 'fullscreen-mode'
  | 'mark-com'
  | 'show-translation'
  | 'chords-variant'
  | 'chord-images'
  | 'selected-toggle'
  | 'is-mini-anchor'
  | 'open-player'
  | 'hide-metronome'
  | 'qr-share'
  | 'com-comment'
  | 'copy-com'
  | 'chord-hard-level'
  | 'cats-binds';
