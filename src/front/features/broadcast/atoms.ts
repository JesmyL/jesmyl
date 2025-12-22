import { complectIDB } from '$index/shared/state';
import { atom, useAtom } from 'atomaric';
import { BroadcastViewApp } from './Broadcast.model';

const isCanShowTextBroadcastAtom = atom(false);
export const useIsCanShowTextBroadcast = () => useAtom(isCanShowTextBroadcastAtom);

export const currentBroadcastConfigiAtom = atom(0);
export const isBroadcastTextVisibleAtom = atom(true);

export const useScreenBroadcastConfigsSet = () => complectIDB.useSet.screenBroadcastConfigs();
export const useScreenBroadcastConfigsValue = () => complectIDB.useValue.screenBroadcastConfigs();

export const broadcastCurrentTextAppAtom = atom('cm' as BroadcastViewApp, {
  storeKey: 'index:broadcastCurrentTextApp',
  do: (set, get) => ({ switch: () => set(get() === 'cm' ? 'bible' : 'cm') }),
});
