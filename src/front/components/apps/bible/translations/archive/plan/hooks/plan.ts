import { mylib } from '#shared/lib/my-lib';
import { BibleTranslationAddress } from '@bible/model';
import { bibleIDB } from '@bible/shared/lib/bibleIDB';
import { useCallback } from 'react';

export const useBibleTranslationPlan = () => bibleIDB.useValue.translationPlan();

export const useBibleTranslationAddToPlan = () => {
  return useCallback(async (item: BibleTranslationAddress) => {
    const plan = await bibleIDB.get.translationPlan();

    const previ = plan.findIndex(planItem => mylib.isEq(planItem, item));
    const newPlan = [...plan];
    if (previ > -1) newPlan.splice(previ, 1);
    newPlan.unshift(item);

    bibleIDB.set.translationPlan(newPlan);
  }, []);
};

export const useBibleClearTranslationPlanSetter = () => {
  return useCallback(() => bibleIDB.set.translationPlan([]), []);
};
