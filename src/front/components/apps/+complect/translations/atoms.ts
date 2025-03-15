import { atom, useAtom, useAtomSet, useAtomToggle, useAtomValue } from '#shared/lib/atoms';
import { complectIDB } from '../_idb/complectIDB';

const isCanShowTextTranslationAtom = atom(false);
export const useIsCanShowTextTranslation = () => useAtom(isCanShowTextTranslationAtom);

const currentTranslationConfigiAtom = atom(0);
export const useCurrentTranslationConfigiSet = () => useAtomSet(currentTranslationConfigiAtom);
export const useCurrentTranslationConfigiValue = () => useAtomValue(currentTranslationConfigiAtom);

const isTranslationTextVisibleAtom = atom(true);
export const useIsScreenTranslationTextVisible = () => useAtomValue(isTranslationTextVisibleAtom);

export const useToggleIsScreenTranslationTextVisible = () => useAtomToggle(isTranslationTextVisibleAtom);

export const useScreenTranslationConfigsSet = () => complectIDB.useSet.screenTranslationConfigs();
export const useScreenTranslationConfigsValue = () => complectIDB.useValue.screenTranslationConfigs();
