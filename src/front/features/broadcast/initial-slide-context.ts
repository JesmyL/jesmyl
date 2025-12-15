import { atom, useAtomSet, useAtomValue } from 'atomaric';

export const isShowTranslatedTextAtom = atom(true);
const isShowAtom = atom(true);
export const cmInitialSlideAtom = atom<React.ReactNode>(null);

export const useBroadcastIsInitialSlideShowSet = () => useAtomSet(isShowAtom);
export const useBroadcastIsInitialSlideShow = () => useAtomValue(isShowAtom);

export const useBroadcastInitialSlideValue = () => {
  const initialSlide = useAtomValue(cmInitialSlideAtom);
  const isShow = useAtomValue(isShowAtom);

  if (isShow && initialSlide) return initialSlide;

  return null;
};

export const broadcastShowAlertLineConfigIdAtom = atom<number | null>(null);
