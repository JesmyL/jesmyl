import { complectIDB } from '$index/shared/state';
import { useCallback } from 'react';
import { BroadcastViewApp } from '../Broadcast.model';

export const useSwitchCurrentBroadcastTextApp = () => {
  const app = complectIDB.useValue.currentBroadcastTextApp();

  return useCallback(
    (setApp?: BroadcastViewApp) => complectIDB.set.currentBroadcastTextApp(setApp ?? (app === 'cm' ? 'bible' : 'cm')),
    [app],
  );
};
