import { makeRegExp } from 'regexpert';
import type { ChordTrack } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { chordDiezEquivalent } from 'shared/utils/cm/com/const';
import { translateBase } from 'shared/utils/locale/base';

import type { ChordFingering, ParsedChordName } from './chordTrack.model';

const notePcs: Record<string, number> = {
  C: 0,
  'C#': 1,
  D: 2,
  'D#': 3,
  E: 4,
  F: 5,
  'F#': 6,
  G: 7,
  'G#': 8,
  A: 9,
  'A#': 10,
  B: 10,
  H: 11,
};

/** Интервалы качества без основного тона: он подразумевается в любом аккорде. */
const qualityIntervals: Record<string, number[]> = {
  '': [4, 7],
  maj: [4, 7],
  m: [3, 7],
  min: [3, 7],
  5: [7],
  '6': [4, 7, 9],
  m6: [3, 7, 9],
  '7': [4, 7, 10],
  m7: [3, 7, 10],
  min7: [3, 7, 10],
  maj7: [4, 7, 11],
  '7/6': [4, 7, 9, 10],
  dim: [3, 6],
  dim7: [3, 6, 9],
  '+': [4, 8],
  aug: [4, 8],
  sus: [5, 7],
  sus2: [2, 7],
  sus4: [5, 7],
  '2': [2, 7],
  '4': [5, 7],
  add2: [2, 4, 7],
  add4: [4, 5, 7],
  add9: [4, 7, 14],
  add11: [4, 7, 17],
  add13: [4, 7, 21],
  madd9: [3, 7, 14],
  '9': [4, 7, 10, 14],
  m9: [3, 7, 10, 14],
  maj9: [4, 7, 11, 14],
  '11': [4, 7, 10, 14, 17],
  m11: [3, 7, 10, 14, 17],
  '13': [4, 7, 10, 14, 21],
  m13: [3, 7, 10, 14, 21],
  '7sus': [5, 7, 10],
  '7sus4': [5, 7, 10],
  '9sus4': [5, 7, 10, 14],
  '7b5': [4, 6, 10],
  '7#5': [4, 8, 10],
  '7b9': [4, 7, 10, 13],
  '7#9': [4, 7, 10, 15],
  m7b5: [3, 6, 10],
  'maj7#5': [4, 8, 11],
};

const openMidis = [64, 59, 55, 50, 45, 40];
const maxPosition = 12;
const maxTracksCount = 5;

const normalizeNote = (note: string) => chordDiezEquivalent()[note] ?? note;

const parseNotePc = (note: string): number | null => {
  const pc = notePcs[normalizeNote(note)];

  return pc === undefined ? null : pc;
};

export const parseChordName = (name: string): ParsedChordName => {
  const match = name.match(makeRegExp('/^([A-H])([#b]?)(.*)$/'));
  if (!match) throw translateBase(BaseLocaleKey.InvalidChordName, { n: name });

  const [, letter, accidental, tail] = match;
  const rootNote = letter + accidental;
  const rootPc = parseNotePc(rootNote);
  if (rootPc === null) throw translateBase(BaseLocaleKey.InvalidChordName, { n: name });

  let quality = tail;
  let bassPc = rootPc;
  const bassSeparatorIndex = tail.lastIndexOf('/');

  if (bassSeparatorIndex !== -1) {
    const parsedBassPc = parseNotePc(tail.slice(bassSeparatorIndex + 1));

    if (parsedBassPc !== null) {
      bassPc = parsedBassPc;
      quality = tail.slice(0, bassSeparatorIndex);
    }
  }

  if (quality[0] === '/') quality = quality.slice(1);

  const intervals = qualityIntervals[quality];
  if (!intervals) throw translateBase(BaseLocaleKey.InvalidChordName, { n: name });

  return { name: normalizeNote(rootNote) + tail, rootPc, intervals: [...intervals], bassPc };
};

const countRunsWeighted = (mask: number) => {
  let fingers = 0;

  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    if (!(mask & (1 << stringIndex))) continue;

    let runLength = 1;
    while (stringIndex + runLength < 6 && mask & (1 << (stringIndex + runLength))) runLength++;

    fingers += runLength < 3 ? runLength : 1;
    stringIndex += runLength - 1;
  }

  return fingers;
};

const lowestBitIndex = (mask: number) => {
  let index = 0;
  while (!(mask & (1 << index))) index++;

  return index;
};

const highestBitIndex = (mask: number) => {
  let index = 5;
  while (!(mask & (1 << index))) index--;

  return index;
};

const fingeringKey = ({ baseFret, frets }: ChordFingering) => baseFret + ':' + frets.join();

type ChordTrackVariant = {
  score: number;
  track: ChordTrack;
};

const findChordTracks = ({ rootPc, intervals, bassPc }: ParsedChordName): ChordTrack[] => {
  const requiredIntervals = intervals.length > 3 ? intervals.filter(interval => interval % 12 !== 7) : intervals;
  const rootMask = 1 << rootPc;
  const requiredMask = requiredIntervals.reduce((mask, interval) => mask | (1 << (rootPc + interval) % 12), rootMask);
  const chordMask = intervals.reduce((mask, interval) => mask | (1 << (rootPc + interval) % 12), rootMask);
  const allowedMask = chordMask | (1 << bassPc);
  const minPressedCount = requiredIntervals.length >= 2 ? 2 : 1;
  const frets: number[] = [-1, -1, -1, -1, -1, -1];

  const bestVariants: ChordTrackVariant[] = [];
  const fingeringKeys = new Set<string>();

  const evaluate = () => {
    let sounding = 0;
    let muted = 0;
    let pressed = 0;
    let lowestMidi = Infinity;
    let pcMask = 0;
    let minPressed = Infinity;
    let maxPressed = 0;
    const fretMasks: number[] = [];

    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
      const fret = frets[stringIndex];

      if (fret < 0) {
        muted++;
        continue;
      }

      const midi = openMidis[stringIndex] + fret;
      if (midi < lowestMidi) lowestMidi = midi;
      sounding++;
      pcMask |= 1 << midi % 12;

      if (fret > 0) {
        pressed++;
        if (fret < minPressed) minPressed = fret;
        if (fret > maxPressed) maxPressed = fret;
        fretMasks[fret] = (fretMasks[fret] ?? 0) | (1 << stringIndex);
      }
    }

    if (sounding < 3) return;
    if (pressed < minPressedCount) return;
    if ((pcMask & requiredMask) !== requiredMask) return;
    if (pcMask & ~allowedMask) return;

    const lowestPc = lowestMidi % 12;
    const minMask = fretMasks[minPressed] ?? 0;
    const barreLow = lowestBitIndex(minMask);
    const barreHigh = highestBitIndex(minMask);
    let isBarre = false;

    if (barreLow !== barreHigh && barreHigh - barreLow + 1 >= 4) {
      isBarre = true;

      for (let stringIndex = barreLow; stringIndex <= barreHigh; stringIndex++) {
        if (frets[stringIndex] <= 0) {
          isBarre = false;
          break;
        }
      }
    }

    let fingers = isBarre ? 1 : countRunsWeighted(minMask);

    if (bassPc !== rootPc ? lowestPc !== bassPc : lowestPc !== rootPc && !isBarre) return;

    for (let fret = minPressed + 1; fret <= maxPressed; fret++) {
      const mask = fretMasks[fret];
      if (mask) fingers += countRunsWeighted(mask);
    }

    if (fingers > 4) return;

    const baseFret = frets.includes(0) && minPressed <= 3 ? 0 : minPressed - 1;
    const inversionPenalty = bassPc === rootPc && lowestPc !== rootPc ? 8 : 0;
    const score = baseFret * 10 + fingers * 6 + muted * 6 + (6 - sounding) * 6 + (isBarre ? 2 : 0) + inversionPenalty;

    if (bestVariants.length === maxTracksCount && score >= bestVariants[maxTracksCount - 1].score) return;

    const mutes: number[] = [];
    for (let stringIndex = 0; stringIndex < 6; stringIndex++) if (frets[stringIndex] < 0) mutes.push(stringIndex + 1);

    const track: ChordTrack = [mutes.length ? Number(`${baseFret}.${mutes.join('')}`) : baseFret];

    for (let fret = baseFret + 1; fret <= maxPressed; fret++) {
      const mask = fretMasks[fret] ?? 0;

      if (!mask) {
        track.push(0);
        continue;
      }

      if (isBarre && fret === minPressed) {
        track.push(barreLow === 0 && barreHigh === 5 ? -6 : -((barreLow + 1) * 10 + (barreHigh + 1)));
        continue;
      }

      const digits: number[] = [];
      for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
        if (mask & (1 << stringIndex)) digits.push(stringIndex + 1);
      }

      track.push(Number(digits.join('')));
    }

    const fingering = decodeChordTrack(track);
    const key = fingeringKey(fingering);
    if (fingeringKeys.has(key)) return;

    fingeringKeys.add(key);

    let insertIndex = bestVariants.length;
    while (insertIndex > 0 && bestVariants[insertIndex - 1].score > score) insertIndex--;

    bestVariants.splice(insertIndex, 0, { score, track });
    if (bestVariants.length > maxTracksCount) bestVariants.pop();
  };

  const walk = (stringIndex: number, isOpenPosition: boolean, minFret: number, maxFret: number) => {
    if (stringIndex === 6) {
      evaluate();
      return;
    }

    frets[stringIndex] = -1;
    walk(stringIndex + 1, isOpenPosition, minFret, maxFret);

    if (isOpenPosition) {
      frets[stringIndex] = 0;
      walk(stringIndex + 1, isOpenPosition, minFret, maxFret);
    }

    for (let fret = minFret; fret <= maxFret; fret++) {
      frets[stringIndex] = fret;
      walk(stringIndex + 1, isOpenPosition, minFret, maxFret);
    }
  };

  for (let position = 0; position <= maxPosition; position++) {
    const isOpenPosition = position === 0;
    walk(0, isOpenPosition, isOpenPosition ? 1 : position, isOpenPosition ? 3 : position + 3);
  }

  return bestVariants.map(({ track }) => track);
};

/**
 * Классические (основные) аппликатуры простых аккордов: подсказка, чтобы основной вариант
 * встал третьим в карусели. Ключи — как в `chordTracks.json` (B → A#, бемоли → диезы).
 */
const classicChordTracks: Record<string, ChordTrack> = {
  A: [0.6, 0, 234],
  'A#': [0.6, -15, 0, 234],
  C: [0.6, 2, 4, 5],
  D: [0.56, 0, 13, 2],
  E: [0, 3, 45],
  F: [0, -6, 3, 45],
  G: [0, 0, 5, 16],
  H: [1.6, -15, 0, 234],

  Am: [0.6, 2, 34],
  'A#m': [0.6, -15, 2, 34],
  Cm: [2.6, -15, 2, 34],
  Dm: [0.56, 1, 3, 2],
  Em: [0, 0, 45],
  Fm: [0, -6, 0, 45],
  Gm: [2, -6, 0, 45],
  Hm: [1.6, -15, 2, 34],

  A7: [0.6, 0, 24],
  'A#7': [0.6, -15, 0, 24],
  C7: [0.6, 2, 4, 35],
  D7: [0.56, 2, 13],
  E7: [0, 3, 5, 2],
  F7: [0, -6, 3, 5, 2],
  G7: [0, 1, 5, 6],
  H7: [0.6, 4, 135],

  Cmaj7: [0.6, 0, 4, 5],
  Fmaj7: [0.56, 2, 3, 4],
  Dsus4: [0.56, 0, 3, 12],
  Esus4: [0, 0, 345],
};

const classicThirdIndex = 2;

const placeClassicThird = (tracks: ChordTrack[], classicTrack: ChordTrack) => {
  const keys = new Set([fingeringKey(decodeChordTrack(classicTrack))]);
  const variants = tracks.filter(track => {
    const key = fingeringKey(decodeChordTrack(track));
    if (keys.has(key)) return false;

    keys.add(key);

    return true;
  });

  variants.splice(Math.min(classicThirdIndex, variants.length), 0, classicTrack);

  return variants.slice(0, maxTracksCount);
};

export const chordNameToTracks = (name: string, classicTrack?: ChordTrack): ChordTrack[] => {
  const parsed = parseChordName(name);
  const tracks = findChordTracks(parsed);
  const classic = classicTrack ?? classicChordTracks[parsed.name];

  return classic ? placeClassicThird(tracks, classic) : tracks;
};

export const chordNameToTrack = (name: string): ChordTrack | null => chordNameToTracks(name)[0] ?? null;

export const decodeChordTrack = (track: ChordTrack): ChordFingering => {
  const [trackBase, ...columns] = track;
  const [baseFretStr, mutesStr] = ('' + trackBase).split('.');
  const baseFret = +baseFretStr;
  const mutes = mutesStr ? mutesStr.split('').map(Number) : [];
  const frets = [0, 0, 0, 0, 0, 0];

  mutes.forEach(string => (frets[string - 1] = -1));

  columns.forEach((value, columnIndex) => {
    if (!value) return;

    const fret = baseFret + columnIndex + 1;

    if (value < 0) {
      const digits = ('' + -value).split('').map(Number);
      const start = digits.length > 1 ? digits[0] : 1;
      const finish = value === -1 ? 6 : digits.length > 1 ? digits[1] : digits[0];

      for (let string = start; string <= finish; string++) {
        if (frets[string - 1] >= 0) frets[string - 1] = fret;
      }

      return;
    }

    for (const digit of '' + value) {
      if (frets[+digit - 1] >= 0) frets[+digit - 1] = fret;
    }
  });

  return { baseFret, mutes, frets };
};
