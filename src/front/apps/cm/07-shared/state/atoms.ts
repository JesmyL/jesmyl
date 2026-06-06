import { cmSecureAtomLevel } from '#shared/const/values';
import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { atom } from 'atomaric';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const cmConstantsConfigAtom = atom(cmConstantsDefaultConfig, {
  storageKey: 'cm:constantsConfig',
  securifyKeyLevel: cmSecureAtomLevel,
  securifyValueLevel: cmSecureAtomLevel,
});

export const cmComTrackPreSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');
export const cmIsTrackBroadcastAtom = atom(false, 'cm:cmIsTrackBroadcast');
export const cmIsShowMyCommentsAtom = atom(true, 'cm:isShowMyComments');
export const cmShowChordedSlideModeAtom = atom(CmBroadcastShowChordedSlideMode.Show, 'cm:showChordedSlideMode');

export const cmOpenComListModeAtom = atom<'all' | 'fav' | 'sel'>('all', 'com-player:openComListMode');
