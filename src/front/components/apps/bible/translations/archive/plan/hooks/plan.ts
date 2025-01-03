import { mylib } from 'front/utils';
import { useCallback } from 'react';
import { useAtom, useAtomSet, useAtomValue } from '../../../../../../../complect/atoms';
import { useActualRef } from '../../../../../../../complect/useActualRef';
import { BibleTranslationAddress } from '../../../../model';
import { bibleMolecule } from '../../../../molecules';

const translationPlanAtom = bibleMolecule.select(s => s.translationPlan);

export const useBibleTranslationPlan = () => useAtomValue(translationPlanAtom);

export const useBibleTranslationAddToPlan = () => {
  const planRef = useActualRef(useAtom(translationPlanAtom));

  return useCallback(
    (item: BibleTranslationAddress) => {
      const [plan, setPlan] = planRef.current;

      const previ = plan.findIndex(planItem => mylib.isEq(planItem, item));
      const newPlan = [...plan];
      if (previ > -1) newPlan.splice(previ, 1);
      newPlan.unshift(item);

      setPlan(newPlan);
    },
    [planRef],
  );
};

export const useBibleClearTranslationPlanSetter = () => {
  const setPlan = useAtomSet(translationPlanAtom);

  return useCallback(() => setPlan([]), [setPlan]);
};
