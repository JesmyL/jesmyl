import { atom } from 'atomaric';

export const myTimeStampAtom = atom(0, 'shared:myTimeStamp');
if (myTimeStampAtom.get() === 0) myTimeStampAtom.set(Date.now());

export const serverTimeStampDeltaAtom = atom({ delta: 0, isFinal: false }, 'shared:serverTimestampDelta');
export const serverSuccessCheckTSDeltaTimeAtom = atom(0, 'shared:serverSuccessCheckTSDeltaTime');
