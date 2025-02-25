import { atom } from '#shared/lib/atoms';

export const metronomeIsPlayAtom = atom(false);
export const metronomeUserMeterSizeAtom = atom<3 | 4>(4);
export const metronomeUserAccentsAtom = atom('1000');
export const metronomeUserBpmAtom = atom(120);
export const metronomeIsOpenAtom = atom<null | boolean>(null);
