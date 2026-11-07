export const enum ChordInstrument {
  Guitar = 0,
  Ukulele = 1,
}

/** Открытые струны от 1-й (верхней) к последней. */
export const chordInstrumentOpenMidis: Record<ChordInstrument, readonly number[]> = {
  [ChordInstrument.Guitar]: [64, 59, 55, 50, 45, 40],
  [ChordInstrument.Ukulele]: [69, 64, 60, 67],
};

export interface ParsedChordName {
  name: string;
  rootPc: number;
  intervals: number[];
  bassPc: number;
}

export interface ChordFingering {
  baseFret: number;
  mutes: number[];
  frets: number[];
}
