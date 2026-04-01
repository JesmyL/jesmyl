import { atom } from 'atomaric';
import { CmComWid, HttpNumLeadLink } from 'shared/api';

export const cmPlayerBroadcastComwAtom = atom(CmComWid.def);
export const cmPlayerBroadcastAudioSrcAtom = atom<HttpNumLeadLink | null>(null);
