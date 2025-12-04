import { atom } from 'atomaric';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';

export const cmConstantsConfigAtom = atom(cmConstantsDefaultConfig, 'cm:constantsConfig');

export const cmComTrackPreSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');
