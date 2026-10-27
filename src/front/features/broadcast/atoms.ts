import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { complectIDB } from '$index/shared/state';
import { Atom, atom } from 'atomaric';
import { ScheduleWidgetWidDef } from 'shared/api';
import { PresentationBroadcastLiveData } from 'shared/model/presentations';
import { BroadcastLiveData, BroadcastViewApp } from './Broadcast.model';

let isCanShowTextBroadcastAtom: Atom<boolean>;
export const takeIsCanShowTextBroadcastAtom = () => (isCanShowTextBroadcastAtom ??= atom(false));

export const currentBroadcastConfigiAtom = atom(0);
export const isBroadcastTextVisibleAtom = atom(true);

export const useScreenBroadcastConfigsSet = () => complectIDB.useSet.screenBroadcastConfigs();
export const useScreenBroadcastConfigsValue = () => complectIDB.useValue.screenBroadcastConfigs();

export const broadcastCurrentTextAppAtom = atom((): BroadcastViewApp => 'cm', {
  storageKey: 'index:broadcastCurrentTextApp',
  unzipValue: (value: BroadcastViewApp): BroadcastViewApp =>
    value === 'presentations' && !isElectronApp ? 'cm' : value,
});

export const broadcastNextLiveDataAtom = atom(
  (): BroadcastLiveData => ({
    data: { fio: '', isHide: false },
    schw: ScheduleWidgetWidDef,
  }),
);

export const broadcastPresentationsLiveDataAtom = atom<PresentationBroadcastLiveData | nil>(null);
