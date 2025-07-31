import { StrRegExp } from 'regexpert';
import { CmBlockStyleKey } from 'shared/values/cm/block-styles/BlockStyles.model';
import { CmCatWid, CmComMod, CmComOrderWid, CmComWid, CmMeetingEventWid } from './enums';

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
  w: CmComOrderWid; // Уникальный айди
  r?: OrderRepeats | null; // Повторения
  p?: (number[] | null)[] | nil; // Позиции аккордов
  v?: num; // Видимость блока
}

export interface IExportableOrderFieldValues {
  md?: number; // Значение модуляции
}

type Inheritancables<K extends keyof InheritancableOrder = keyof InheritancableOrder> = Partial<
  Record<K, Record<number, InheritancableOrder[K]>>
>;

export interface IExportableOrder extends InheritancableOrder {
  a?: CmComOrderWid; // Ссылка на блок
  t?: number; // Текстовый блок
  c?: number; // Блок аккордов
  e?: 1; // Без названия
  f?: IExportableOrderFieldValues; // Особые значения
  m?: 1; // Минималка
  o?: 1; // Открыто в полном режиме
  s?: CmBlockStyleKey; // Тип блока
  inh?: Inheritancables; //
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
  k?: number;
  /** уровень модулирования */
  p?: number;
  /** язык песни */
  l?: number;
  /** бемольная ли песня */
  b?: num;
  /** аудио файлы */
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
  s?: 3 | 4;

  ton?: number;

  isRemoved?: 1;
}

export type ICmComComment = {
  comw: CmComWid;
  comment: string;
  m: number;
  isSavedLocal?: 1;
};

export type TAboutComFavoriteItem = {
  m: number;
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
  k: string;

  isRemoved?: 1;
}

export interface IExportableCols {
  coms: IExportableCom[];
  cats: IExportableCat[];
}

export type MigratableEditableComToolName = 'edit-com';

export type MigratableComToolName = MenuComToolNameList | MigratableEditableComToolName;

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
