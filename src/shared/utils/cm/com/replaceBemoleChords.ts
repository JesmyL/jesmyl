import { makeRegExp } from 'regexpert';
import { chordDiezEquivalent, simpleBemoleChordReg_g } from './const';

export const includesBemoleChord = (text: string) => makeRegExp('/[A-H]b/').test(text);

export const replaceBemoleChords = (text: string) =>
  text.replace(simpleBemoleChordReg_g, chord => chordDiezEquivalent()[chord] || chord);
