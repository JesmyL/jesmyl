import { atom, useAtom, useAtomSet, useAtomToggle, useAtomValue } from '../../../../complect/atoms';
import { ScreenTranslationConfig } from './model';

const isCanShowTextTranslationAtom = atom(false);
export const useIsCanShowTextTranslation = () => useAtom(isCanShowTextTranslationAtom);

const currentTranslationConfigiAtom = atom(0);
export const useCurrentTranslationConfigiSet = () => useAtomSet(currentTranslationConfigiAtom);
export const useCurrentTranslationConfigiValue = () => useAtomValue(currentTranslationConfigiAtom);

const isTranslationTextVisibleAtom = atom(true);
export const useIsScreenTranslationTextVisible = () => useAtomValue(isTranslationTextVisibleAtom);

export const useToggleIsScreenTranslationTextVisible = () => useAtomToggle(isTranslationTextVisibleAtom);

export const defaultComplectConfig: ScreenTranslationConfig = {
  title: 'Трансляция',
  proportion: 1,
};

const screenTranslationConfigsAtom = atom([defaultComplectConfig], 'complect', 'screenTranslationConfigs');

export const useScreenTranslationConfigsSet = () => useAtomSet(screenTranslationConfigsAtom);
export const useScreenTranslationConfigsValue = () => useAtomValue(screenTranslationConfigsAtom);
