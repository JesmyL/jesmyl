import { complectIDB } from '#basis/idb';
import { atom, useAtom, useAtomSet, useAtomToggle, useAtomValue } from '../../shared/lib/atom';
import { defaultScreenTranslationBackgroundConfig } from './complect/defaults';
import { AlertLineConfig, ScreenTranslationConfig } from './model';

export const isShowTranslatedTextAtom = atom(true);
const isShowAtom = atom(true);
const initialSlideAtom = atom<React.ReactNode>(null);

export const useTranslationIsInitialSlideShowSet = () => useAtomSet(isShowAtom);
export const useTranslationIsInitialSlideShow = () => useAtomValue(isShowAtom);

export const useTranslationInitialSlideSet = () => useAtomSet(initialSlideAtom);

export const useTranslationInitialSlideValue = () => {
  const initialSlide = useAtomValue(initialSlideAtom);
  const isShow = useAtomValue(isShowAtom);

  if (isShow && initialSlide) return initialSlide;

  return null;
};

export const translationShowAlertLineConfigIdAtom = atom<number | null>(null);

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
