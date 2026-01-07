import { atom } from 'atomaric';

export const myTimeStampAtom = atom(0, 'shared:myTimeStamp');
if (myTimeStampAtom.get() === 0) myTimeStampAtom.set(Date.now());
