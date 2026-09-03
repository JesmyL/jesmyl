import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';

export const bibleBroadcastPlanAddToPlan = async (item: BibleBroadcastAddress) => {
  const plan = await bibleIDB.get.broadcastPlan();

  const previ = plan?.findIndex(planItem => checkIsEq(planItem, item));
  const newPlan = plan ? [...plan] : [];
  if (checkIsNotNil(previ) && previ > -1) newPlan.splice(previ, 1);
  newPlan.unshift(item);

  bibleIDB.set.broadcastPlan(newPlan);
};
