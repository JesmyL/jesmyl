import { makeRegExp } from 'shared/utils';

export const chordLikeStr = '([ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d(/\\d)?)?))';
export const textedChordReg = makeRegExp(
  `/^\\.*-?${chordLikeStr}(/${chordLikeStr})?((\\.+|-|\\.+-)${chordLikeStr}(/${chordLikeStr})?)*$/`,
);
export const correctChordNameReg = makeRegExp(`/^${chordLikeStr}(/${chordLikeStr})?$/`);
export const checkIsChordLineReg = makeRegExp('/^[-+A-Ha-z# /\\d]+$/');
export const slavicLowerLettersStr = 'а-яёіґїє';
export const ruDifferentLowerLettersStr = 'ъыэё';
export const uaDifferentLowerLettersStr = 'іґїє';
export const correctNotSlavicNameReg_i = makeRegExp(`/([^${slavicLowerLettersStr} !?]+\\s*)+$/i`);

export const cleanChords = ['A', 'C', 'D', 'E', 'F', 'G', 'H'];
