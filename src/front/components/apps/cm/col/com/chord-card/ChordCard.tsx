import { cmIDB } from '@cm/basis/lib/cmIdb';
import { ChordTrack } from 'shared/api';
import './ChordCard.scss';
import { ChordCardTracked } from './ChordCardTracked';

export function ChordCard({
  chordName,
  resource,
  ...props
}: {
  chordName: string;
  resource?: Record<string, ChordTrack>;
  customContent?: (card: JSX.Element | null) => JSX.Element;
  bottomPadding?: number;
}) {
  const chords = cmIDB.useValue.chordPack();
  const track = (resource ?? chords)[chordName];

  return (
    <ChordCardTracked
      {...props}
      track={track}
    />
  );
}
