import { mylib } from '#shared/lib/my-lib';
import { BibleTranslationAddress } from '$bible/shared/model/base';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useCallback } from 'react';

export const useBibleBroadcastPlan = () => bibleIDB.useValue.translationPlan();

export const useBibleBroadcastPlanAddToPlan = () => {
  return useCallback(async (item: BibleTranslationAddress) => {
    const plan = await bibleIDB.get.translationPlan();

    const previ = plan.findIndex(planItem => mylib.isEq(planItem, item));
    const newPlan = [...plan];
    if (previ > -1) newPlan.splice(previ, 1);
    newPlan.unshift(item);

    bibleIDB.set.translationPlan(newPlan);
  }, []);
};

export const useBibleBroadcastPlanClearSetter = () => {
  return useCallback(() => bibleIDB.set.translationPlan([]), []);
};
