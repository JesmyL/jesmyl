import { ChordPack, ChordTrack } from '../../../../../../../shared/api/complect/apps/cm/complect/chord-card';
import { cmIDB } from '../../../_db/cm-idb';
import './ChordCard.scss';
import ChordCardTracked from './ChordCardTracked';

const defChordPack: ChordPack = {};

export default function ChordCard({
  chordName,
  resource,
  ...props
}: {
  chordName: string;
  resource?: Record<string, ChordTrack>;
  customContent?: (card: JSX.Element | null) => JSX.Element;
  bottomPadding?: number;
}) {
  const chords = cmIDB.useSingleValueLiveQuery('chordPack', defChordPack);
  const track = (resource ?? chords)[chordName];

  return (
    <ChordCardTracked
      {...props}
      track={track}
    />
  );
}
