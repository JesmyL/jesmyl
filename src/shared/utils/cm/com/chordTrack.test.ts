import { describe, expect, it } from 'vitest';

import chordTracksJson from 'back/apps/cm/+case/chordTracks.json';
import type { ChordTrack } from 'shared/api';
import { chordDiezEquivalent } from 'shared/utils/cm/com/const';

import { chordNameToTrack, chordNameToTracks, decodeChordTrack, normalizeChordName, parseChordName } from './chordTrack';
import { ChordInstrument } from './chordTrack.model';

const openMidis = [64, 59, 55, 50, 45, 40];
const ukuleleOpenMidis = [69, 64, 60, 67];

const pressedFrets = (track: ChordTrack) => decodeChordTrack(track).frets.map(fret => (fret > 0 ? fret : null));

const soundingMidis = (track: ChordTrack) =>
  decodeChordTrack(track).frets
    .map((fret, stringIndex) => (fret >= 0 ? openMidis[stringIndex] + fret : null))
    .filter((midi): midi is number => midi !== null);

const bassPc = (track: ChordTrack) => Math.min(...soundingMidis(track)) % 12;

const hasBarre = (track: ChordTrack) => track.some(value => (value ?? 0) < 0);

const chordPitchClasses = (name: string) => {
  const { rootPc, intervals } = parseChordName(name);

  return [rootPc, ...intervals.map(interval => (rootPc + interval) % 12)];
};

const curated: Record<string, ChordTrack> = {
  C: [0.6, 2, 4, 5],
  G: [0, 0, 5, 16],
  D: [0.56, 0, 13, 2],
  Em: [0, 0, 45],
  Am: [0.6, 2, 34],
  G7: [0, 1, 5, 6],
  Cmaj7: [0.6, 0, 4, 5],
  Dsus4: [0.56, 0, 3, 12],
};

describe('normalizeChordName', () => {
  it.each([
    ['am7', 'Am7'],
    ['bb', 'Bb'],
    ['c#m7b5', 'C#m7b5'],
    ['em/g#', 'Em/G#'],
    ['a#m7/bb', 'A#m7/Bb'],
  ])('%s becomes %s', (name, normalized) => {
    expect(normalizeChordName(name)).toBe(normalized);
  });

  it('makes lowercase input parseable', () => {
    expect(parseChordName(normalizeChordName('em/g#')).name).toBe('Em/G#');
  });
});

describe('chordNameToTrack', () => {
  it('encodes A#m as the lowest-scoring barre shape', () => {
    expect(chordNameToTrack('A#m')).toEqual([0, -6, 2, 34]);
  });

  it.each(Object.keys(curated))('%s exposes the curated fingering third', name => {
    expect(pressedFrets(chordNameToTracks(name)[2])).toEqual(pressedFrets(curated[name]));
  });

  it('finds a lower equivalent Adim7 voicing than the curated one', () => {
    const track = chordNameToTrack('Adim7');

    expect(track).toEqual([0.6, 24, 13]);
    expect(pressedFrets(track!)).toEqual([2, 1, 2, 1, null, null]);
  });

  it.each([...Object.keys(curated), 'Adim7', 'A#m'])('%s sounds every chord tone', name => {
    const track = chordNameToTrack(name);
    const soundingPcs = new Set(soundingMidis(track!).map(midi => midi % 12));

    chordPitchClasses(name).forEach(pc => expect(soundingPcs).toContain(pc));
  });

  it.each([...Object.keys(curated), 'Adim7'])('%s keeps the root in the bass', name => {
    const track = chordNameToTrack(name)!;
    if (hasBarre(track)) return;

    expect(bassPc(track)).toBe(parseChordName(name).rootPc);
  });

  it('supports slash bass notes', () => {
    expect(parseChordName('Am/G')).toMatchObject({ rootPc: 9, bassPc: 7, intervals: [3, 7] });
  });

  it.each(['', 'X', 'Cmm', 'Cb', 'H#'])('%s is rejected', name => {
    expect(() => chordNameToTrack(name)).toThrow();
  });

  it('throws a plain string', () => {
    let thrown: unknown;

    try {
      chordNameToTrack('Xmaj7');
    } catch (error) {
      thrown = error;
    }

    expect(typeof thrown).toBe('string');
  });
});

const variantChordNames = [...Object.keys(curated), 'F', 'A#m', 'Adim7', 'B7', 'E', 'F#m', 'Am/G'];

describe('chordNameToTracks', () => {
  it.each(['A#m', 'C', 'G7'])('%s yields several distinct fingerings', name => {
    const tracks = chordNameToTracks(name);

    expect(tracks.length).toBeGreaterThan(1);
    expect(tracks.length).toBeLessThanOrEqual(5);
  });

  it('keeps A#m variants in the search-score order around its classic', () => {
    expect(chordNameToTracks('A#m')).toEqual([
      [0, -6, 2, 34],
      [2, 4, 5, 0, 1236],
      [0.6, -15, 2, 34],
      [0.16, 5, 2, 34],
      [0.36, 15, 2, 4],
    ]);
  });

  it.each(variantChordNames)('%s starts with the single best track', name => {
    expect(chordNameToTracks(name)[0]).toEqual(chordNameToTrack(name));
  });

  it.each(variantChordNames)('%s returns no duplicate fingerings', name => {
    const keys = chordNameToTracks(name).map(track => JSON.stringify(decodeChordTrack(track)));

    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(variantChordNames)('%s variants all sound the chord tones', name => {
    const chordPcs = chordPitchClasses(name);

    chordNameToTracks(name).forEach(track => {
      const soundingPcs = new Set(soundingMidis(track).map(midi => midi % 12));

      chordPcs.forEach(pc => expect(soundingPcs).toContain(pc));
    });
  });

  it.each(variantChordNames)('%s variants keep the requested bass', name => {
    const { rootPc, bassPc: requiredBassPc } = parseChordName(name);

    chordNameToTracks(name).forEach(track => {
      const lowestPc = bassPc(track);

      if (requiredBassPc !== rootPc) expect(lowestPc).toBe(requiredBassPc);
      else if (!hasBarre(track)) expect(lowestPc).toBe(rootPc);
    });
  });

  it.each(['', 'X', 'Cmm', 'Cb', 'H#'])('%s is rejected', name => {
    expect(() => chordNameToTracks(name)).toThrow();
  });
});

const toChordTrack = ([base, ...columns]: (number | null)[]): ChordTrack =>
  [base ?? 0, ...columns.map(value => value ?? 0)] as ChordTrack;

const classicTracks = Object.fromEntries(
  Object.entries(chordTracksJson).map(([name, values]) => [name, toChordTrack(values)]),
) as Record<string, ChordTrack>;

const classicChordNames = Object.keys(classicTracks).filter(name => {
  try {
    parseChordName(name);
    return true;
  } catch {
    return false;
  }
});

const guaranteedClassicChordNames = ['F', 'A#', 'A', 'B', 'D', 'C', 'Am', 'G7', 'Em'];

/** Пак хранит только диезные имена: `B`/`Hb`/`Bb` — это `A#`, `Db` — `C#` и т.д. */
const packClassic = (name: string) => classicTracks[name] ?? classicTracks[chordDiezEquivalent()[name]];

describe('curated chord pack', () => {
  it.each(guaranteedClassicChordNames)('%s keeps its curated classic exactly third', name => {
    const classic = packClassic(name);
    const tracks = chordNameToTracks(name, classic);

    expect(classic).toBeDefined();
    expect(tracks.length).toBeGreaterThanOrEqual(3);
    expect(decodeChordTrack(tracks[2])).toEqual(decodeChordTrack(classic));
  });

  it.each(classicChordNames)('%s exposes its curated classic as the third variant', name => {
    const classic = classicTracks[name];
    const tracks = chordNameToTracks(name, classic);

    expect(tracks.length).toBeGreaterThan(0);
    expect(decodeChordTrack(tracks[Math.min(2, tracks.length - 1)])).toEqual(decodeChordTrack(classic));
  });

  it.each(classicChordNames)('%s returns no duplicate fingerings around its classic', name => {
    const keys = chordNameToTracks(name, classicTracks[name]).map(track => JSON.stringify(decodeChordTrack(track)));

    expect(new Set(keys).size).toBe(keys.length);
  });

  it.each(classicChordNames)('%s curated classic is playable and matches the chord', name => {
    const classic = classicTracks[name];
    const { rootPc, intervals, bassPc: requiredBassPc } = parseChordName(name);
    const chordPcs = [rootPc, ...intervals.map(interval => (rootPc + interval) % 12)];
    const requiredPcs = [
      rootPc,
      ...intervals
        .filter(interval => intervals.length <= 1 || interval % 12 !== 7)
        .map(interval => (rootPc + interval) % 12),
    ];
    const sounding = soundingMidis(classic);
    const soundingPcs = new Set(sounding.map(midi => midi % 12));
    const allowedPcs = new Set([...chordPcs, requiredBassPc]);

    expect(sounding.length).toBeGreaterThanOrEqual(3);
    requiredPcs.forEach(pc => expect(soundingPcs).toContain(pc));
    [...soundingPcs].forEach(pc => expect(allowedPcs).toContain(pc));
    expect(bassPc(classic)).toBe(requiredBassPc);
  });
});

const ukuleleClassicShapes: Record<string, number[]> = {
  C: [3, 0, 0, 0],
  F: [0, 1, 0, 2],
  G: [2, 3, 2, 0],
  Am: [0, 0, 0, 2],
  C7: [1, 0, 0, 0],
};

const ukuleleFrets = (track: ChordTrack) => decodeChordTrack(track, ChordInstrument.Ukulele).frets;

describe('ukulele chord tracks', () => {
  it('keeps guitar as the default instrument', () => {
    expect(chordNameToTracks('C', undefined, ChordInstrument.Guitar)).toEqual(chordNameToTracks('C'));
  });

  it.each(Object.entries(ukuleleClassicShapes))('%s exposes its canonical ukulele shape', (name, shape) => {
    const variants = chordNameToTracks(name, undefined, ChordInstrument.Ukulele).map(ukuleleFrets);

    expect(variants).toContainEqual(shape);
  });

  it.each(Object.keys(ukuleleClassicShapes))('%s ukulele variants sound the chord tones', name => {
    const chordPcs = chordPitchClasses(name);

    chordNameToTracks(name, undefined, ChordInstrument.Ukulele).forEach(track => {
      const soundingPcs = new Set(
        ukuleleFrets(track)
          .map((fret, stringIndex) => (fret >= 0 ? ukuleleOpenMidis[stringIndex] + fret : null))
          .filter((midi): midi is number => midi !== null)
          .map(midi => midi % 12),
      );

      chordPcs.forEach(pc => expect(soundingPcs).toContain(pc));
    });
  });
});

describe('embedded classic shapes', () => {
  it.each(['F', 'A', 'C', 'Am', 'G7', 'H', 'B'])('%s places the embedded classic third', name => {
    const classic = packClassic(name);

    expect(classic).toBeDefined();
    expect(decodeChordTrack(chordNameToTracks(name)[2])).toEqual(decodeChordTrack(classic!));
  });

  it.each(['A#m', 'Hm', 'Cmaj7', 'Dsus4'])('%s finds its embedded classic without the pack', name => {
    expect(decodeChordTrack(chordNameToTracks(name)[2])).toEqual(decodeChordTrack(packClassic(name)!));
  });
});
