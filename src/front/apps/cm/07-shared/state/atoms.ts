import { cmSecureAtomLevel } from '#shared/const/values';
import { atom } from 'atomaric';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';
import { CmBroadcastShowChordedSlideMode } from '../model';

export const cmConstantsConfigAtom = atom(cmConstantsDefaultConfig, {
  storeKey: 'cm:constantsConfig',
  securifyKeyLevel: cmSecureAtomLevel,
  securifyValueLevel: cmSecureAtomLevel,
});

export const cmComTrackPreSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');
export const cmIsTrackBroadcastAtom = atom(false, 'cm:cmIsTrackBroadcast');
export const cmShowChordedSlideModeAtom = atom(CmBroadcastShowChordedSlideMode.Show, 'cm:showChordedSlideMode');

export const cmOpenComListModeAtom = atom<'all' | 'fav' | 'sel'>('all', 'com-player:openComListMode');
