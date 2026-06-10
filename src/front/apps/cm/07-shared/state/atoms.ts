import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { atom } from 'atomaric';

export const cmComTrackPreSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');
export const cmIsTrackBroadcastAtom = atom(false, 'cm:cmIsTrackBroadcast');
export const cmIsShowMyCommentsAtom = atom(true, 'cm:isShowMyComments');
export const cmShowChordedSlideModeAtom = atom(CmBroadcastShowChordedSlideMode.Show, 'cm:showChordedSlideMode');

export const cmOpenComListModeAtom = atom<'all' | 'fav' | 'sel'>('all', 'com-player:openComListMode');
