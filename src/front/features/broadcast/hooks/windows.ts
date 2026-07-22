import { atom, useAtomValue } from 'atomaric';
import { currentBroadcastConfigiAtom } from '../atoms';

export type BroadcastWindow = {
  win?: Window;
  conn?: PresentationConnection;
  focus: () => void;
  blur: () => void;
};

const windowsAtom = atom<(nil | BroadcastWindow)[]>([]);

export const useScreenBroadcastWindows = () => useAtomValue(windowsAtom);
export const setScreenBroadcastWindows = windowsAtom.set;
export const useScreenBroadcastCurrentWindow = () =>
  useAtomValue(windowsAtom)[useAtomValue(currentBroadcastConfigiAtom)];
