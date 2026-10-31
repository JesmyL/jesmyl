import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';

export const isCmComAudioPlayerOpenMoversAtom = atom(false);

/** Com the player page works from; the URL is only read once on entry and never drives it afterwards. */
export const cmComAudioPlayerCurrentComwAtom = atom<CmComWid | null>(null, 'cm:playerCurrentComw');

/** Origin of the playing session: only one started from the player page walks on to the next com at track end. */
export const cmComAudioPlayerIsFromPlayerPageAtom = atom(false);
