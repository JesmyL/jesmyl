import { atom, useAtom } from 'atomaric';

export const cmBroadcastBlockAtom = atom(0);
export const useCmBroadcastBlock = () => useAtom(cmBroadcastBlockAtom);
