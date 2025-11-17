import { atom } from 'atomaric';
import { CmComMetricNums } from 'shared/model/cm/com-metric-nums';

export const metronomeIsPlayAtom = atom(false);
export const metronomeUserMeterSizeAtom = atom<CmComMetricNums>(4);
export const metronomeUserMeterAccentsAtom = atom<PRecord<CmComMetricNums, string>>({}, 'metronome:meter-accents');
export const metronomeUserBpmAtom = atom(120);
export const metronomeIsOpenAtom = atom<null | boolean>(null);
