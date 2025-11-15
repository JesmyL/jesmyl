import { atom } from 'atomaric';
import { CmComMetricNums } from '../../../../shared/model/cm/com-metric-nums';

export const metronomeIsPlayAtom = atom(false);
export const metronomeUserMeterSizeAtom = atom<CmComMetricNums>(4);
export const metronomeUserAccentsAtom = atom('1000');
export const metronomeUserBpmAtom = atom(120);
export const metronomeIsOpenAtom = atom<null | boolean>(null);
