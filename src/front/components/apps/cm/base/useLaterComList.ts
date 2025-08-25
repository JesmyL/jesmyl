import { cmConstantsConfigAtom, cmLaterComwListAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';

const addLaterComw = async (comw: number) => {
  const { maxLaterComsVizitedCount } = cmConstantsConfigAtom.get();

  cmLaterComwListAtom.set(prev => {
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
    laterComws: useAtomValue(cmLaterComwListAtom),
    addLaterComw,
  };
}
