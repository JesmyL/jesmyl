import { atom } from 'atomaric';

export const metronomeLeaderTimeStampDictAtom = atom(
  (): PRecord<string, number> => ({}),
  'metronome:leaderTimeStampDict',
);

export const metronomeIsSyncWithGroupAtom = atom(false, 'metronome:isSyncWithGroup');
export const metronomeJoinedToLeaderAtom = atom('', 'metronome:joinedToLeader');
export const metronomeMyNameAtom = atom('', 'metronome:myName');
