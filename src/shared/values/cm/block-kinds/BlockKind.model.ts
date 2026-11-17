import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export interface IExportableKindProp {
  key: CmComBlockKindKey;
  each: BaseLocaleKey.Each0 | BaseLocaleKey.Each1 | BaseLocaleKey.Each2 | BaseLocaleKey.Each3;
  alt?: string;
  isInherit?: boolean;
  group?: number;
  tags?: () => string[];
  isModulation?: boolean;
  forChordedBlock?: number;
  isHeaderNoneForce?: boolean;
  isBlockForTextableOnly?: boolean;
  isBlockForChordedOnly?: boolean;
}

export const enum CmComBlockKindKey {
  /** Вступление */
  Enter = 15,
  /** Куплет */
  OneWithShift = -39,
  /** Куплет */
  One = 39,
  /** Предприпев */
  PTwo = 72,
  /** Припев */
  Two = 94,
  /** Мост */
  Bridge = 31,
  /** Проигрыш */
  Play = 80,
  /** Модуляция */
  Modulation = 60,
  /** Финал */
  Final = 88,
  /** Запев */
  Thirdo = 20,
  /** Вставка */
  Insert = 41,

  /** :ПРОДОЛЖЕНИЕ: */
  Plus = 58,
  /** :ПРОДОЛЖЕНИЕ С ОТСТУПОМ: */
  PlusPlus = 81,
  /** :ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ: */
  Shift = 83,
  /** :ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ И ОТСТУПОМ: */
  PlusPlusShift = 90,
}
