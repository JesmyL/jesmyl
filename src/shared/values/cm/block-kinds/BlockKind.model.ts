export interface IExportableKindProp {
  key: CmComBlockKindKey;
  title: [ru: string, ua: string];
  isInherit?: boolean;
  group?: number;
  tags?: string[];
  isModulation?: boolean;
  forChordedBlock?: number;
  isHeaderNoneForce?: boolean;
  isBlockForTextableOnly?: boolean;
  isBlockForChordedOnly?: boolean;
}

export const enum CmComBlockKindKey {
  Enter = 15,
  OneWithShift = -39,
  One = 39,
  PTwo = 72,
  Two = 94,
  Bridge = 31,
  Play = 80,
  Modulation = 60,
  Final = 88,
  Thirdo = 20,
  Insert = 41,

  Plus = 58,
  PlusPlus = 81,
  Shift = 83,
  PlusPlusShift = 90,
}
