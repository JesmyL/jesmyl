import { atom } from 'atomaric';
import { CmComWid, HttpLink } from 'shared/api';

export const cmPlayerBroadcastComwAtom = atom(CmComWid.def);
export const cmPlayerBroadcastAudioSrcAtom = atom<HttpLink | null>(null);
