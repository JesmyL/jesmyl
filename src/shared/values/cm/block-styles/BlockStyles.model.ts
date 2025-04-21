export interface IExportableStyleProp {
  key: CmBlockStyleKey;
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

export const enum CmBlockStyleKey {
  Enter = 'enter',
  OneWithShift = ' one',
  One = 'one',
  PTwo = 'p-two',
  Two = 'two',
  Bridge = 'bridge',
  Play = 'play',
  Modulation = 'trans',
  Final = 'final',
  Thirdo = 'thirdo',
  Insert = 'insert',

  Plus = '+',
  PlusPlus = '++',
  Shift = '>',
  PlusPlusShift = '++>',
}
