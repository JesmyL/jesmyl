import { cmIDB } from '$cm/shared/state';
import { JSX } from 'react';
import { ChordTrack } from 'shared/api';
import '../style/ChordCard.scss';
import { CmChordCardTracked } from './ChordCardTracked';

export const CmChordCard = ({
  chordName,
  resource,
  ...props
}: {
  chordName: string;
  resource?: Record<string, ChordTrack>;
  customContent?: (card: JSX.Element | null) => JSX.Element;
  bottomPadding?: number;
}) => {
  const chords = cmIDB.useValue.chordPack();
  const track = (resource ?? chords)[chordName];

  return (
    <CmChordCardTracked
      {...props}
      track={track}
    />
  );
};
