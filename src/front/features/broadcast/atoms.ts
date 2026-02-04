import { complectIDB } from '$index/shared/state';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { IScheduleWidgetWid } from 'shared/api';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { BroadcastViewApp } from './Broadcast.model';

let isCanShowTextBroadcastAtom: Atom<boolean>;
export const takeIsCanShowTextBroadcastAtom = () => (isCanShowTextBroadcastAtom ??= atom(false));

export const currentBroadcastConfigiAtom = atom(0);
export const isBroadcastTextVisibleAtom = atom(true);

export const useScreenBroadcastConfigsSet = () => complectIDB.useSet.screenBroadcastConfigs();
export const useScreenBroadcastConfigsValue = () => complectIDB.useValue.screenBroadcastConfigs();

export const broadcastCurrentTextAppAtom = atom('cm' as BroadcastViewApp, {
  storeKey: 'index:broadcastCurrentTextApp',
  do: (set, get) => ({ switch: () => set(get() === 'cm' ? 'bible' : 'cm') }),
});

export const broadcastNextLiveDataAtom = atom(
  (): { schw: IScheduleWidgetWid; data: IndexSchWBroadcastLiveDataValue } => ({
    data: { fio: '', isHide: false },
    schw: IScheduleWidgetWid.def,
  }),
);

broadcastNextLiveDataAtom.subscribe(value => schLiveTsjrpcClient.next(value));
