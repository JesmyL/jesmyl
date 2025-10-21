import { atom, useAtomSet, useAtomValue } from 'atomaric';

export const isShowTranslatedTextAtom = atom(true);
const isShowAtom = atom(true);
const initialSlideAtom = atom<React.ReactNode>(null);

export const useBroadcastIsInitialSlideShowSet = () => useAtomSet(isShowAtom);
export const useBroadcastIsInitialSlideShow = () => useAtomValue(isShowAtom);

export const useBroadcastInitialSlideSet = () => useAtomSet(initialSlideAtom);

export const useBroadcastInitialSlideValue = () => {
  const initialSlide = useAtomValue(initialSlideAtom);
  const isShow = useAtomValue(isShowAtom);

  if (isShow && initialSlide) return initialSlide;

  return null;
};

export const broadcastShowAlertLineConfigIdAtom = atom<number | null>(null);
