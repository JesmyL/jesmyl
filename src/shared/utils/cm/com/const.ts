import { escapeRegExpNames, makeNamedRegExp, makeRegExp } from 'regexpert';
import { SMyLib } from 'shared/utils/SMyLib';

export const hardModificators =
  `(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))` as const;
export const lightModificators = `(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))`;
export const chordLeadLetter = `[ACDFG]#?|[EH]`;
export const chordLikeStr =
  `(?<simpleChord>(?:${chordLeadLetter})m?7?)${lightModificators}${hardModificators}?` as const;
export const chordInterpretedLikeStr =
  `(?<simpleChord>(?:${chordLeadLetter}|B)m?7?)${lightModificators}${hardModificators}?` as const;

export const doubleQuotesStr = '«»„„“”«»“' as const;
export const singleQuotesStr = '’`‘’' as const;
export const anyQuotesStr = `${doubleQuotesStr}${singleQuotesStr}'"` as const;
export const replacableAvailableCharsStr = '…' as const;
export const ruUaSingLettersStr = 'уеыаоэяиёюіїє ' as const;
export const ruDifferentLowerLettersStr = 'ъыэё' as const;
export const uaDifferentLowerLettersStr = 'іґїє' as const;
export const slavicLowerLettersStr = `а-яё${uaDifferentLowerLettersStr}` as const;
export const displayableTextBlockSingleWritedSymbolsStr = `(),":;'?` as const;
export const displayableTextBlockSymbolsStr = `-.!\\s${displayableTextBlockSingleWritedSymbolsStr}` as const;
export const displayableTextBlockCharsStr = `${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}` as const;

export const textedChordRegs = makeNamedRegExp(
  // regexpert:
  // stringify $0 U23
  `/^\\|?\\.*-?${chordLikeStr}(?<bassChord>/${
    //
    escapeRegExpNames(chordLikeStr, '_bass')
  })?(?<repeats>(?:(?:\\.+|-|\\.+-)${
    //
    escapeRegExpNames(chordLikeStr, '_lastRepeat')
  }(?:/${
    //
    escapeRegExpNames(chordLikeStr, `_lastRepeatBass`)
  })?)*)\\|?$/`,
);
export const correctChordRegs = makeNamedRegExp(
  // regexpert:
  // stringify $0
  `/^${chordLikeStr}(?:/${escapeRegExpNames(chordLikeStr, '_bass')})?$/`,
);
export const chordInterpretedRegs = makeNamedRegExp(
  // regexpert:
  // stringify $0
  `/^${chordInterpretedLikeStr}(?:/${escapeRegExpNames(chordInterpretedLikeStr, '_bass')})?$/`,
);
export const checkIsChordLineReg = makeRegExp('/^[-+A-Ha-z# /\\d]+$/');
export const correctNotSlavicNameReg_i = makeRegExp(`/([^${slavicLowerLettersStr} !?]+\\s*)+$/i`);

export const ruUaReg_i = makeRegExp(`/[${ruUaSingLettersStr}]/i`);
export const simpleHashChordReg_g = makeRegExp('/[ACDEFGH]#?/g');
export const simpleBemoleChordReg_g = makeRegExp('/[A-H]b?/g');
export const simpleHashedEachLetterChordReg_g = makeRegExp('/[A-H]#/g');

export const simpleHashChords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'];
export const cleanChords = ['A', 'C', 'D', 'E', 'F', 'G', 'H'];

export const openAndClosedQuotes = [
  ['«', '»'],
  ['„', '“'],
  ['"', '"'],
  ["'", "'"],
];

export const chordBemoleEquivalent: Record<string, string> = {
  'A#': 'B',
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
};

export const cmComLanguages = ['русский', 'украинский'];

export const chordDiezEquivalent = SMyLib.entries(chordBemoleEquivalent).reduce(
  (acc, [key, val]) => ({ ...acc, [val]: key }),
  {
    Bb: 'A#',
    Hb: 'A#',
  } as Record<string, string>,
);
