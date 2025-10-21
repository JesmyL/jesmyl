import { atom, useAtomSet, useAtomValue } from 'atomaric';
import { useScreenBroadcastCurrentConfigi } from './configs';

export type BroadcastWindow = {
  win: Window;
  focus: () => void;
  blur: () => void;
};

const windowsAtom = atom<(nil | BroadcastWindow)[]>([]);

export const useScreenBroadcastWindows = () => useAtomValue(windowsAtom);
export const useUpdateScreenBroadcastWindows = () => useAtomSet(windowsAtom);
export const useScreenBroadcastCurrentWindow = () => useAtomValue(windowsAtom)[useScreenBroadcastCurrentConfigi()];
