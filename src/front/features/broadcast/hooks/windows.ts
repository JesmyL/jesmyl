import { atom, useAtomValue } from 'atomaric';
import { ScheduleWidgetWid } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { currentBroadcastConfigiAtom } from '../atoms';

export type BroadcastWindow = {
  win?: Window;
  conn?: PresentationConnection;
  focus: () => void;
  blur: () => void;
  send: (liveData: { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue }) => void;
};

const windowsAtom = atom<(nil | BroadcastWindow)[]>([]);

export const useScreenBroadcastWindows = () => useAtomValue(windowsAtom);
export const setScreenBroadcastWindows = windowsAtom.set;
export const useScreenBroadcastCurrentWindow = () =>
  useAtomValue(windowsAtom)[useAtomValue(currentBroadcastConfigiAtom)];
