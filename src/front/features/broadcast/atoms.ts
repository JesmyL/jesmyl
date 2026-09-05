import { complectIDB } from '$index/shared/state';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { ScheduleWidgetWid, ScheduleWidgetWidDef, ScheduleWidgetWidNone } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { BroadcastViewApp } from './Broadcast.model';

let isCanShowTextBroadcastAtom: Atom<boolean>;
export const takeIsCanShowTextBroadcastAtom = () => (isCanShowTextBroadcastAtom ??= atom(false));

export const currentBroadcastConfigiAtom = atom(0);
export const isBroadcastTextVisibleAtom = atom(true);

export const useScreenBroadcastConfigsSet = () => complectIDB.useSet.screenBroadcastConfigs();
export const useScreenBroadcastConfigsValue = () => complectIDB.useValue.screenBroadcastConfigs();

export const broadcastCurrentTextAppAtom = atom((): BroadcastViewApp => 'cm', {
  storageKey: 'index:broadcastCurrentTextApp',
  do: (set, get) => ({ switch: () => set(get() === 'cm' ? 'bible' : 'cm') }),
});

export const broadcastNextLiveDataAtom = atom(
  (): { schw: ScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue } => ({
    data: { fio: '', isHide: false },
    schw: ScheduleWidgetWidDef,
  }),
);

broadcastNextLiveDataAtom.subscribe(value => {
  if (value.schw === ScheduleWidgetWidNone || value.schw === ScheduleWidgetWidDef) return;
  schLiveTsjrpcClient.next(value);
});
