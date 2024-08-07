import { CmCatWid, CmComWid, CmMeetingEventWid } from './Cm.enums';

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

export type SpecielOrderRepeats = Record<string, number>;
export type OrderRepeats = number | SpecielOrderRepeats;

export interface InheritancableOrder {
  r?: OrderRepeats | null; // Повторения
  p?: (number[] | null)[] | nil; // Позиции аккордов
  v?: num; // Видимость блока
}

export interface IExportableOrderFieldValues {
  md?: number; // Значение модуляции
}

export type Inheritancables<K extends keyof InheritancableOrder = keyof InheritancableOrder> = Partial<
  Record<K, Record<number, InheritancableOrder[K]>>
>;

export interface IExportableOrder extends InheritancableOrder {
  a?: number; // Ссылка на блок
  c?: number; // Блок аккордов
  e?: num; // Без названия
  f?: IExportableOrderFieldValues; // Особые значения
  m?: num; // Минималка
  o?: num; // Открыто в полном режиме
  s?: string; // Тип блока
  t?: number | null; // Текстовый блок
  u?: number; // Целевой айди
  w: number; // Уникальный айди
  inh?: Inheritancables; //
  originWid?: number; // Неизменяемый уникальный айди
}

export interface IExportableCom {
  n: string;
  w: CmComWid;
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
  n: string;
  s?: CmComWid[];
  d?: Partial<Record<CmComWid, number>>;
  t?: string[] | null;
  k: string;
  w: CmCatWid;
}

export interface IExportableCols {
  coms: IExportableCom[];
  cats: IExportableCat[];
}
