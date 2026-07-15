export const enum CmComLangi {
  Ru = 0,
  Ua,
}

export type CmComWid = NumberBrand<'CmComWid'>;

export const CmComWidZero = 0 as CmComWid;
export const CmComWidDef = -1 as CmComWid;

export type CmComInSchDayEvWr = NumberBrand<'CmComInSchDayEvWr'>;

export const enum CmComIntensityLevel {
  TooSlow = 1,
  Slow = 2,
  Medium = 3,
  Fast = 4,
  TooFast = 5,
}

export const enum CmComMod {
  def = -1,
}

export const enum CmComOrderWid {
  def = -1,
  never = -100000,
}

export const enum CmCatWid {
  def = -1,
  all = 0,
}

export const enum CmMeetingWid {
  def = -1,
}

export const enum CmMeetingEventWid {
  def = -1,
}

export const enum CmComWidRefGroupId {
  min = 0,
}
