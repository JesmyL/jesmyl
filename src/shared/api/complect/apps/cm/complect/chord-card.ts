export interface ChordCardProps {
  chordName: string;
  chordLabel: string;
}

type ChordTrackPoint = number;
export type ChordTrack = [
  number,
  ChordTrackPoint?,
  ChordTrackPoint?,
  ChordTrackPoint?,
  ChordTrackPoint?,
  ChordTrackPoint?,
];
export type ChordPack = Record<string, ChordTrack>;
