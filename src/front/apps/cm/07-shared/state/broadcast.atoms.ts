import { atom } from 'atomaric';
import { CmComWidDef, HttpNumLeadLink } from 'shared/api';

export const cmPlayerBroadcastComwAtom = atom(CmComWidDef);
export const cmPlayerBroadcastAudioSrcAtom = atom<HttpNumLeadLink | null>(null);
