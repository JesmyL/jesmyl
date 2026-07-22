import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useCallback } from 'react';
import { checkIsEq } from 'shared/utils/checkIsEq';

export const useBibleBroadcastPlanAddToPlan = () => {
  return useCallback(async (item: BibleBroadcastAddress) => {
    const plan = await bibleIDB.get.broadcastPlan();

    const previ = plan.findIndex(planItem => checkIsEq(planItem, item));
    const newPlan = [...plan];
    if (previ > -1) newPlan.splice(previ, 1);
    newPlan.unshift(item);

    bibleIDB.set.broadcastPlan(newPlan);
  }, []);
};

export const bibleBroadcastPlanClear = () => bibleIDB.set.broadcastPlan([]);
