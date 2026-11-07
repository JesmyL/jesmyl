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
