import { escapeRegExpNames, makeNamedRegExp, makeRegExp } from 'regexpert';
import { lazyInit } from 'shared/utils/lazyInit';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';

export const hardModificators =
  `(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))` as const;
export const lightModificators = `(?<lightModificators>\\+|(?:(?:min|sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))`;
export const chordLeadLetter = `[ACDFG]#?|[EH]`;
export const chordLikeStr =
  `(?<simpleChord>(?:${chordLeadLetter})m?7?)${lightModificators}${hardModificators}?` as const;
export const chordInterpretedLikeStr =
  `(?<simpleChord>(?:${chordLeadLetter}|B)m?7?)${lightModificators}${hardModificators}?` as const;

export const doubleQuotesStr = '«»„“”' as const;
export const singleQuotesStr = '’`‘’' as const;
export const anyQuotesStr = `${doubleQuotesStr}${singleQuotesStr}'"` as const;
export const replacableAvailableCharsStr = '…' as const;
export const ruSingLettersStr = 'аеёиоуыэюя' as const;
export const ruUaSingLettersStr = `${ruSingLettersStr}іїє` as const;
export const ruUaSingLettersAndSpaceStr = `${ruUaSingLettersStr} ` as const;
export const ruDifferentLowerLettersStr = 'ъыэё' as const;
export const uaDifferentLowerLettersStr = 'іґїє' as const;
export const ruLowerLettersStr = `а-яё` as const;
export const ruConsonantLettersStr = 'йцкнгшщзхъфвпрлджчсмтьб';
export const slavicLowerLettersStr = `${ruLowerLettersStr}${uaDifferentLowerLettersStr}` as const;
export const displayableTextBlockSingleWritedSymbolsStr = `(),":;'?` as const;
export const displayableTextBlockSymbolsStr = `-_.!${displayableTextBlockSingleWritedSymbolsStr}` as const;
export const displayableTextBlockCharsStr = `${displayableTextBlockSymbolsStr}${slavicLowerLettersStr}\\s` as const;

export const nbsp = '&nbsp;';
export const comNbsp = `_` as const;
export const comNbspReg = makeRegExp(`/${comNbsp}/g`);

export const makeCmComTextInnerHtmlProp = (text: string | nil) => ({
  dangerouslySetInnerHTML: text ? { __html: makeCmComNbspHtmlText(text) } : undefined,
});

export const makeCmComNbspHtmlText = (text: string | nil): string => text?.replace(comNbspReg, nbsp) ?? '';

export const textedChordRegsLazy = lazyInit(() =>
  makeNamedRegExp(
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
  ),
);

export const correctChordRegsLazy = lazyInit(() =>
  makeNamedRegExp(
    // regexpert:
    // stringify $0
    `/^${chordLikeStr}(?:/${escapeRegExpNames(chordLikeStr, '_bass')})?$/`,
  ),
);

export const chordInterpretedRegsLazy = lazyInit(() =>
  makeNamedRegExp(
    // regexpert:
    // stringify $0
    `/^${chordInterpretedLikeStr}(?:/${escapeRegExpNames(chordInterpretedLikeStr, '_bass')})?$/`,
  ),
);

export const checkIsChordLineReg = makeRegExp('/^[-+A-Ha-z# /\\d]+$/');
export const correctNotSlavicNameReg_i = makeRegExp(`/([^${slavicLowerLettersStr} !?]+\\s*)+$/i`);

export const ruUaReg_i = makeRegExp(`/[${ruUaSingLettersAndSpaceStr}]/i`);
export const simpleHashChordReg_g = makeRegExp('/[ACDEFGH]#?/g');
export const simpleBemoleChordReg_g = makeRegExp('/[A-H]b?/g');
export const simpleHashedEachLetterChordReg_g = makeRegExp('/[A-H]#/g');

export const openAndClosedQuotes = ['«»', '„“', '""', "''"];

const ASharp = 'A#';

export const aSharpToBChord: Record<string, string> = {
  [ASharp]: 'B',
};

export const bToASharpChord: Record<string, string> = {
  B: ASharp,
};

export const chordBemoleEquivalent: Record<string, string> = {
  C: '',
  'C#': 'Db',
  D: '',
  'D#': 'Eb',
  E: '',
  F: '',
  'F#': 'Gb',
  G: '',
  'G#': 'Ab',
  A: '',
  ...aSharpToBChord,
  H: '',
};

export const chordDiezEquivalent = lazyInit(() => {
  const it = {
    Bb: ASharp,
    Hb: ASharp,
  } as Record<string, string>;

  forEachObjectEntries(chordBemoleEquivalent, (key, val) => {
    if (val) it[val] = key;
  });

  return it;
});

export const simpleHashChords = objectKeys(chordBemoleEquivalent);

export const cmComLanguages = ['русский', 'украинский'];
