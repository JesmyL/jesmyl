import { cmIDB } from '$cm/basis/lib/cmIDB';

const maxStack = 4;
const addLaterComw = (comw: number) => {
  cmIDB.set.laterComwList(prev => {
    const set = new Set(prev.toReversed());

    set.delete(comw);
    set.add(comw);
    const result = Array.from(set).reverse();
    result.length = maxStack;
    return result;
  });
};

export function useLaterComList() {
  return { laterComws: cmIDB.useValue.laterComwList(), addLaterComw };
}
