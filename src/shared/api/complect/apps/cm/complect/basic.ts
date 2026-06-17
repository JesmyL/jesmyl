import { CmCatKind } from '#shared/model/cm/cat/Cat.model';
import { StrRegExp } from 'regexpert';
import { CmComNewlinerSymbolFreeUpperCaseLine } from 'shared/model/cm/broadcast';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import {
  CmCatWid,
  CmComIntensityLevel,
  CmComLangi,
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

export type SpecialOrderRepeats = PRecord<SpecialOrderRepeatsKey, number>;
export type OrderRepeats = number | SpecialOrderRepeats;

export interface InheritancableOrder {
  /** Повторения */
  r?: OrderRepeats | null;
  /** Позиции аккордов */
  p?: (number[] | null)[] | nil;
  /** Видимость блока */
  v?: num;
}

type WatchInherited<K extends keyof InheritancableOrder> = (InheritancableOrder[K] | nil)[];

export type IExportableOrder = InheritancableOrder & {
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

  /** Значение модуляции */
  md?: number;

  /** Минималка */
  m?: 1;

  /** Открыто в свёрнутом режиме */
  o?: 1;

  /** Тип блока */
  k?: CmComBlockKindKey;

  _v?: WatchInherited<'v'>;
  _r?: WatchInherited<'r'>;
  _p?: WatchInherited<'p'>;

  /**
   * время создания (существует при времени жизни менее суток)
   */
  cre?: number;
};

export type IFixedCom = { w: CmComWid } & Partial<{
  ton: number;
}>;

export type IExportableComInterpretationSimpleValues = {
  /** уровень транспозиции песни */
  p?: number;

  /** ударов в минуту */
  bpm?: number;

  /** бемольная ли песня */
  b?: num;
};

export type IExportableOrderInterpretation = {
  /** видимость блока **в специальной интерпритации** */
  v?: num;
};

export type IExportableComInterpretation = IExportableComInterpretationSimpleValues & {
  /** порядковые блоки **в специальной интерпритации** */
  o?: { [ordi: number]: IExportableOrderInterpretation | nil };
};

export type IExportableCom = IExportableComInterpretationSimpleValues & {
  /** название песни */
  n: string;

  /** время создания - уникальный ID */
  w: CmComWid;

  /** время изменения */
  m: CmComMod;

  /** разбивка текстов на линии и слайды */
  nl?: [PRecord<CmComOrderWid, CmComNewlinerStrConfig.whole>];

  /** язык песни */
  l?: CmComLangi;

  /** аудио файлы */
  al?: HttpNumLeadLink[];

  /** список текстов */
  t?: string[];

  /** список аккорлов */
  c?: string[];

  /** порядковые блоки */
  o?: IExportableOrder[];

  /** размерность песни */
  s?: CmComMetricNum;

  /** интенсивность песни */
  d?: CmComIntensityLevel;

  isRemoved?: 1;
};

export type IServerSideCom = OmitOwn<IExportableCom, 'al' | 'm'> & { al?: HttpNumLeadLink[] | HttpNumLeadLink };

export const enum CmComCommentBlockSpecialSelector {
  Head = 'h',
  Kinds = 'k',
}

export type CmComNewlinerLineTextSetHolder = PRecord<CmComLineText, CmComNewlinerSymbolFreeUpperCaseLine> &
  PRecord<CmComNewlinerSymbolFreeUpperCaseLine, Set<number>>;

export const enum CmComLineText {
  line1 = 'Строка1',
  line2 = 'Вторая строка',
  line3 = 'Строка под номером три',
}

export const enum CmComNewlinerLinei {
  i = 0,
  never = -1,
}

export const enum CmComNewlinerRepeati {
  i = 0,
  never = -1,
}

export const enum CmComNewlinerWordi {
  NewLine = -1,
  i = 0,
  NotNewLine = 1,
}

export const enum CmComNewlinerStrConfig {
  whole = '15.-2/12 9.01//34',
  line = '15.-2/12',
  repeat = '15.-2',
}

export type CmComCommentBlockSimpleSelector = CmComOrderSelector | CmComCommentBlockSpecialSelector.Head;
export type CmComCommentBlockAnySelector = CmComOrderSelector | CmComCommentBlockSpecialSelector;
export type CmComOrderSelector = CmComOrderWid;

export type CmComCommentBlockDict = PRecord<CmComCommentBlockSimpleSelector, string[]> &
  PRecord<CmComCommentBlockSpecialSelector.Kinds, PRecord<CmComBlockKindKey, string>>;

export type ICmComCommentBlock = {
  comw: CmComWid;
  m: number;
  /** comment block dict list */
  dl?: (CmComCommentBlockDict | nil)[];
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

export type CmComWidRefGroupDict = PRecord<CmComWid, CmComWidRefGroupId>;
