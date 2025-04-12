import { cmIDB } from '$cm/basis/lib/cmIDB';

const addLaterComw = async (comw: number) => {
  const { maxLaterComsVizitedCount } = await cmIDB.get.constantsConfig();

  cmIDB.set.laterComwList(prev => {
    const set = new Set(prev.toReversed());

    set.delete(comw);
    set.add(comw);
    const result = Array.from(set).reverse();
    result.length = maxLaterComsVizitedCount;

    return result;
  });
};

export function useLaterComList() {
  return {
    laterComws: cmIDB.useValue.laterComwList(),
    addLaterComw,
  };
}
