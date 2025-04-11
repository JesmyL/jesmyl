import { CmCatWid, CmComMod, CmComOrderWid, CmComWid, CmMeetingEventWid } from './enums';

export interface CmMp3Rule {
  w: number;
  url: string;
  attr: string;
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
  s?: string; // Тип блока
  inh?: Inheritancables; //
}

export type IFixedCom = { w: CmComWid } & Partial<{
  ton: number;
}>;

export interface IExportableCom {
  n: string;
  w: CmComWid;
  m: CmComMod;
  k?: number; // вариант группировки строк для трансляций
  p?: number; // уровень модулирования
  l?: number; // язык песни
  b?: num; // бемольная песня
  a?: string; // аудио файлы
  t?: string[]; // список текстов
  c?: string[]; // список аккорлов
  o?: IExportableOrder[]; // порядковые блоки
  bpm?: number; // ударов в минуту
  s?: 3 | 4; // размерность песни

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
  w: CmCatWid; // writed time
  m: number; // modified time
  n: string; // name
  s?: CmComWid[]; // comWid stack
  d?: PRecord<CmComWid, number>; // dictionary of numbers
  k: string; // kind of cat

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
  | 'cats-binds';
