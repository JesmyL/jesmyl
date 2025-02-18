import { cmIDB } from '#basis/lib/idb/cm';

const maxStack = 4;
const addLaterComw = (comw: number) => {
  if (comw === 0) return;
  cmIDB.set.laterComwList(prev => {
    const set = new Set(prev.toReversed());

    set.delete(comw);
    set.add(comw);
    const result = Array.from(set).reverse();
    result.length = maxStack;

    return result;
  });
};

export default function useLaterComList() {
  return {
    laterComws: cmIDB.useValue.laterComwList(),
    addLaterComw,
  };
}
