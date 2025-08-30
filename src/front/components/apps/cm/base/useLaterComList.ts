import { cmConstantsConfigAtom, cmLaterComwListAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { itIt, itNIt } from 'shared/utils';

const addLaterComw = async (comw: number) => {
  const { maxLaterComsVizitedCount } = cmConstantsConfigAtom.get();

  cmLaterComwListAtom.set(prev => {
    const set = new Set(prev.toReversed());

    set.delete(comw);
    set.add(comw);
    const result = Array.from(set).reverse();
    if (result.length > maxLaterComsVizitedCount) {
      result.length = maxLaterComsVizitedCount;
    }

    return result;
  });
};

export function useLaterComList() {
  const laterComws = useAtomValue(cmLaterComwListAtom);

  useEffect(() => {
    if (!laterComws.some(itNIt)) return;
    cmLaterComwListAtom.set(prev => prev.filter(itIt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { laterComws, addLaterComw };
}
