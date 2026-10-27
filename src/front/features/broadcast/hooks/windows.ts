import { atom, useAtomValue } from 'atomaric';
import { currentBroadcastConfigiAtom } from '../atoms';
import { BroadcastLiveData } from '../Broadcast.model';

export type BroadcastWindow = {
  win?: Window;
  conn?: PresentationConnection;
  focus: () => void;
  blur: () => void;
  send: (liveData: BroadcastLiveData) => void;
};

const windowsAtom = atom<(nil | BroadcastWindow)[]>([]);

export const useScreenBroadcastWindows = () => useAtomValue(windowsAtom);
export const getScreenBroadcastWindows = windowsAtom.get;
export const setScreenBroadcastWindows = windowsAtom.set;
export const useScreenBroadcastCurrentWindow = () =>
  useAtomValue(windowsAtom)[useAtomValue(currentBroadcastConfigiAtom)];
