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
  w: CmComOrderWid; // Уникальный айди
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
}

export interface IExportableCat {
  w: CmCatWid; // writed time
  m: number; // modified time
  n: string; // name
  s?: CmComWid[]; // comWid stack
  d?: Partial<Record<CmComWid, number>>; // dictionary of numbers
  k: string; // kind of cat
}

export interface IExportableCols {
  coms: IExportableCom[];
  cats: IExportableCat[];
}
