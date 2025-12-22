import { atom, useAtomValue } from 'atomaric';

export const isShowBroadcastTextAtom = atom(true);
export const isShowBroadcastInitialSlideAtom = atom(true);
export const cmInitialSlideAtom = atom<React.ReactNode>(null);

export const useBroadcastInitialSlideValue = () => {
  const initialSlide = useAtomValue(cmInitialSlideAtom);
  const isShow = useAtomValue(isShowBroadcastInitialSlideAtom);

  if (isShow && initialSlide) return initialSlide;

  return null;
};

export const broadcastShowAlertLineConfigIdAtom = atom<number | null>(null);
