import { atom } from 'atomaric';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';

export const metronomeIsPlayAtom = atom(false);
export const metronomeCurrentMeterSizeAtom = atom(CmComMetricNum.Four);
export const metronomeUserMeterAccentsAtom = atom<PRecord<CmComMetricNum, string>>({}, 'metronome:meter-accents');
export const metronomeCurrentBpmAtom = atom(takeCorrectMetronomeBpm());
export const metronomeIsOpenAtom = atom<null | boolean>(null);
