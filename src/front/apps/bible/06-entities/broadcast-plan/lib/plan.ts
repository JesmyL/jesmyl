import { mylib } from '#shared/lib/my-lib';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useCallback } from 'react';

export const useBibleBroadcastPlan = () => bibleIDB.useValue.broadcastPlan();

export const useBibleBroadcastPlanAddToPlan = () => {
  return useCallback(async (item: BibleBroadcastAddress) => {
    const plan = await bibleIDB.get.broadcastPlan();

    const previ = plan.findIndex(planItem => mylib.isEq(planItem, item));
    const newPlan = [...plan];
    if (previ > -1) newPlan.splice(previ, 1);
    newPlan.unshift(item);

    bibleIDB.set.broadcastPlan(newPlan);
  }, []);
};

export const useBibleBroadcastPlanClearSetter = () => {
  return useCallback(() => bibleIDB.set.broadcastPlan([]), []);
};
