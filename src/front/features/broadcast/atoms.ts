import { complectIDB } from '$index/shared/state';
import { atom, useAtom, useAtomSet, useAtomValue } from 'atomaric';

const isCanShowTextBroadcastAtom = atom(false);
export const useIsCanShowTextBroadcast = () => useAtom(isCanShowTextBroadcastAtom);

const currentBroadcastConfigiAtom = atom(0);
export const useCurrentBroadcastConfigiSet = () => useAtomSet(currentBroadcastConfigiAtom);
export const useCurrentBroadcastConfigiValue = () => useAtomValue(currentBroadcastConfigiAtom);

const isBroadcastTextVisibleAtom = atom(true);
export const useIsScreenBroadcastTextVisible = () => useAtomValue(isBroadcastTextVisibleAtom);

export const useSetIsScreenBroadcastTextVisible = () => useAtomSet(isBroadcastTextVisibleAtom);

export const useScreenBroadcastConfigsSet = () => complectIDB.useSet.screenBroadcastConfigs();
export const useScreenBroadcastConfigsValue = () => complectIDB.useValue.screenBroadcastConfigs();
