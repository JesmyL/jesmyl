export type CmComWid = NumberBrand<'CmComWid'>;

export const CmComWidZero = 0 as CmComWid;
export const CmComWidDef = -1 as CmComWid;

export type CmComInSchDayEvWr = NumberBrand<'CmComInSchDayEvWr'>;

export const enum CmComIntensityLevel {
  /** Очень медленный темп */
  TooSlow = 1,
  /** Медленный темп */
  Slow = 2,
  /** Средний темп */
  Medium = 3,
  /** Быстрый темп */
  Fast = 4,
  /** Очень быстрый темп */
  TooFast = 5,
}

export const enum CmComMod {
  /** Значение модификации по умолчанию (нет изменений) */
  def = -1,
}

export type CmComOrderWid = NumberBrand<'CmComOrderWid'>;

export const CmComOrderWidDef = -1 as -1 | CmComOrderWid;
export const CmComOrderWidZero = 0 as CmComOrderWid;
export const CmComOrderWidNever = -10000 as CmComOrderWid;

export const enum CmCatWid {
  /** Идентификатор категории по умолчанию (категория не создана) */
  def = -1,
  /** Виртуальная категория «Все» */
  all = 0,
}

export const enum CmCatKind {
  /** Категория-сборник (песни по номерам из сборника) */
  dict = 27,
  /** Категория-список (список песен) */
  list = 38,
}

export const enum CmMeetingWid {
  /** Идентификатор встречи по умолчанию */
  def = -1,
}

export const enum CmMeetingEventWid {
  /** Идентификатор события встречи по умолчанию */
  def = -1,
}

export const enum CmComWidRefGroupId {
  /** Минимальный идентификатор группы ссылок на композиции */
  min = 0,
}
