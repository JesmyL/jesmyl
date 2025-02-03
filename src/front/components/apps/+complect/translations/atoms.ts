import { atom, useAtom, useAtomSet, useAtomToggle, useAtomValue } from '../../../../complect/atoms';
import { complectIDB } from '../_idb/complectIDB';
import { defaultScreenTranslationBackgroundConfig } from './complect/defaults';
import { AlertLineConfig, ScreenTranslationConfig } from './model';

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

export const defaultAlertLineConfig: OmitOwn<AlertLineConfig, 'id'> = {
  title: 'Срочно!',
  icon: 'Alert01',
  fontSize: 30,
  top: 70,
  speed: 30,
  text: '',
  color: '#ec6969',
  ...defaultScreenTranslationBackgroundConfig,
};

export const useScreenTranslationConfigsSet = () => complectIDB.useSet.screenTranslationConfigs();
export const useScreenTranslationConfigsValue = () => complectIDB.useValue.screenTranslationConfigs();
